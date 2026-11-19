# NPRToonRenderer：プログラムの工夫と検証

更新日：2026年11月19日。現在のC++ / HLSLと既存の計測ログに基づく説明です。

公開作品ページ：https://leeeito.github.io/works/nprtoonrenderer/

## 現在の構成

ネイティブDirectX 12、NPR/PBR共通調整、GPUインスタンシング、近傍地形のストリーミング、遠景の簡易モデル、4段階の画質、ImGuiエディター、雪国フィールドを実装しています。海の描画は既存実装を継続使用します。

## 光の成分ごとに、NPRとPBRを混ぜる

**課題**：単純な切り替えでは、顔・服・背景の見え方を同時に調整しづらい。

**実装**：共通の設定を定数バッファb10で渡し、拡散反射と鏡面反射をそれぞれ補間します。物体の種類別に割合を上書きし、NPR専用のリムなどはPBR側へ近づくほど弱めます。

**効果**：全体の絵柄を1本のスライダーで変えながら、材質ごとの差と個別調整を残せます。

参照：`shader/Environment/worldMaterial.hlsli / WorldLight`

```hlsl
float diffuse=lerp(lerp(LookNpr.z,1,ramp),saturate(nl),mix);
float visibility=lerp(lerp(.35,1,1-shadow),1-shadow,mix);
float3 diffuseTerm=(1-f)*(1-metal)*base*diffuse*tint*LookComponents.x;
float toonLobe=smoothstep(.65,.78,pow(saturate(dot(n,h)),lerp(100,4,rough)))*saturate(nl);
float3 specular=lerp(f*toonLobe,LookGGX(n,v,l,rough,f0)*LookPi,mix)*LookComponents.y;
return (diffuseTerm+specular)*visibility;
```

実コード抜粋。mixが融合率、roughが粗さ、metalが金属度。色は線形空間で計算します。

## 同じモデルを、材質とLODごとにまとめて描く

**課題**：樹木や草花を1個ずつ描くと、配置数に合わせてCPUの描画命令が増える。

**実装**：空間クラスターで候補を絞り、見えるインスタンスをシェーダー割り当てと詳細／遠景モデルで分類。共通メッシュとインスタンス用バッファを使ってまとめて描きます。

**効果**：種類ごとの見た目を変えてもインスタンシングを維持できます。描画回数は物体数ではなく、モデルのサブセットとグループ数に依存します。

参照：`src/Game/World/natureAssets.cpp / NatureAssets::Draw`

```cpp
if(reason!=VisibilityDebug::Reason::Submitted)return;
auto mode=shadow?SceneMaterials::Shader::Inherit:SceneMaterials::Resolve(b.handles[index]);
r.shaderInstances[size_t(mode)+(proxy?SceneMaterials::ShaderCount:0)].push_back(i);
```

別位置の抜粋：

```cpp
ctx->DrawIndexedInstanced(sub.IndexNum,count,sub.StartIndex,0,0);
```

実コードの分類部分と、別位置にある描画呼び出しを抜粋。proxyは遠景モデルの判定です。

## GPUが読み終わるまで、資源を解放しない

**課題**：CPUが地形を読み替えても、GPUは前のフレームのデータを使用している可能性がある。

**実装**：3組のフレーム資源とフェンスを使い、描画に使ったリソースの参照を保持。同じ組を再利用するときに完了を確認してから、保持参照や転送領域をリセットします。PSOは設定の組み合わせでキャッシュします。

**効果**：ストリーミングや設定変更を、実行中のGPU処理と衝突させずに扱います。DirectX 12で必要な寿命管理を描画基盤に集約しました。

参照：`src/Engine/Graphics/DX12/graphicsDevice.cpp / NativeDevice::ResetFrame`

```cpp
auto& f=Frame();Wait(f.fence);f.retained.clear();f.retainedSet.clear();f.samplerCache.clear();f.constantCache.clear();f.resourceCache.clear();f.queries.clear();
```

実コード抜粋。Wait(f.fence)の完了後に保持参照をクリアする順序が要点です。

## AOを小さく計算し、奥行きを見て拡大する

**課題**：高解像度では、全ピクセルで周囲の深度を何度も調べるAOの負荷が増える。

**実装**：縦横半分の画像にAOと奥行きを保存します。拡大時は奥行きの違うサンプルを弱め、適切なサンプルがない細い輪郭ではフル解像度の計算へ戻します。背景は手前から描き、不透明物と草のシェーダー入口を分離しました。

**効果**：キャラクターの縁へ背景の暗さが混ざるのを抑えつつ、計算量を削減。ImGuiでON/OFFを切り替え、画質とGPU時間を比較できます。

参照：`shader/PostEffects/animeScreen.hlsl / UpsampleAo`

```hlsl
float2 tap=HalfOcclusion.Load(int3(at,0));
float weight=(x?f.x:1-f.x)*(y?f.y:1-f.y);
weight*=exp2(-abs(tap.y-p.z)/max(.02,AO.x*.08));
sum+=tap.x*weight;total+=weight;
```

別位置の抜粋：

```hlsl
[branch]if(total>1e-4)return sum/total;
return Occlusion(uv,p,Normal(uv,p));
```

実コードの重み付けとフォールバックを抜粋。完全に同じ画素にはならない近似なので、比較用の切り替えを残しています。

## 描画と歩行判定で、地形の式を共有する

**課題**：GPU用とCPU用に地形を別々に実装すると、修正のずれが足の浮き・埋まりにつながる。

**実装**：道の制御点と高さ関数を1つのHLSLヘッダーに置き、C++からも読み込みます。言語による宣言の違いだけを条件分岐。橋の床面は別に優先し、足IKと雪の足跡へも伝えます。

**効果**：地形を調整するときの二重修正を減らし、画面に見える地面と歩く高さの整合を保ちやすくしました。

参照：`src/Game/World/snowCountry.h / shader/Environment/snowCountryTerrain.hlsli`

```cpp
#include "../../../shader/Environment/snowCountryTerrain.hlsli"
```

別位置の抜粋：

```cpp
#ifdef __cplusplus
#include <cmath>
struct SCNode { float x,y,z,w; };
#define SC_INLINE inline
#define SC_TABLE inline constexpr
#define SC_NODE(x,y,z,w) {x,y,z,w}
#else
#define SCNode float4
#define SC_INLINE
#define SC_TABLE static const
#define SC_NODE(x,y,z,w) float4(x,y,z,w)
#endif
```

実コードの読み込み側と共通ヘッダーの宣言を抜粋。足元では、描画メッシュの三角形に合わせた高さ補間も使っています。

## 限定条件でのGPU計測

|内部描画サイズ|両方OFF|両方ON|GPU時間の削減|
|---|---:|---:|---:|
|1920 × 1080|3.431 ms|3.174 ms|約7.5%|
|3840 × 2160|6.224 ms|5.715 ms|約8.2%|

既存の同一実行ファイルによるON/OFF測定。RTX 5060 Ti / Ryzen 7 5700X、Release x64、ゲームの起点付近、最高画質、MSAA 4x＋SMAA Ultra、時刻10時。100フレーム以上のウォームアップ後、120フレームを3巡計測し、各巡の平均GPU時間の中央値を比較しています。

VSync・自動解像度・DX12デバッグレイヤーはOFF。全条件で描画インスタンス数20,654。雪国追加前の限定したシーンの結果で、最新マップ全域や他GPUで同じ改善率を保証するものではありません。

生ログ：`tools/pipeline_tests/out/gpu-opt-benchmark-final.log`

## 制作範囲と現在の制限

キャラクターと自然物は外部アセットです。自然物はQuaternius Stylized Nature MegaKit Standard（CC0）。白凪町の建物・橋・看板はコードで生成。建物は起動時に区画単位のメッシュとして保持し、距離に応じて細部を描画しない方式です。建物をディスクから逐次読み込む方式ではありません。

共通描画はLDR出力、環境反射は事前生成した環境マップです。専用SDF・材質マスクがない部位では近似を使います。腕IKは手動ターゲット方式。自動の壁つかみ・遊泳には未対応です。
