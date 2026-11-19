window.PUBLISHED_DATA={
  "layout": {
    "seq": 91,
    "pages": [
      {
        "id": "cover",
        "label": "表紙",
        "blocks": [
          {
            "type": "cover",
            "uid": "b1"
          },
          {
            "type": "u",
            "eyebrow": "Technical Artist // Graphics Engineer",
            "k": "技術と表現を、\n繋ぐ。",
            "lead": "プログラマー ／ テクニカルアーティスト ポートフォリオ",
            "name": "富岡 栄斗",
            "en": "Eito Tomioka",
            "school": "HAL東京 ゲーム4年制学科　ゲーム制作専攻　3年",
            "img": "assets/portrait.png",
            "fit": "contain",
            "cta1": "作品を見る",
            "cta2": "連絡する",
            "uid": "b2"
          }
        ],
        "uid": "p0"
      },
      {
        "id": "toc",
        "label": "目次",
        "blocks": [
          {
            "type": "toc",
            "uid": "b3"
          }
        ],
        "uid": "p1"
      },
      {
        "id": "profile",
        "label": "プロフィール",
        "blocks": [
          {
            "type": "h1",
            "k": "プロフィール",
            "uid": "b4"
          },
          {
            "type": "cols",
            "r": "0.9 1.1",
            "items": [
              {
                "t": "img",
                "img": "assets/profile-group.jpg",
                "fit": "cover",
                "ratio": "4/3",
                "cap": "※中央が本人です",
                "uid": "b6"
              },
              {
                "t": "spec",
                "rows": [
                  [
                    "氏名",
                    "富岡 栄斗（とみおか えいと）"
                  ],
                  [
                    "生年月日",
                    "2006年3月31日"
                  ],
                  [
                    "職種",
                    "TA ／ グラフィックスエンジニア"
                  ],
                  [
                    "学校",
                    "HAL東京 ゲーム4年制学科　ゲーム制作専攻　3年"
                  ],
                  [
                    "趣味",
                    "服"
                  ],
                  [
                    "連絡先",
                    "eito.tomioka.42728@gmail.com"
                  ]
                ],
                "uid": "b7"
              }
            ],
            "uid": "b5"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "p",
                "k": "好きな技術",
                "p": "シェーダーを用いた表現制作に興味があります。光や影、反射といった視覚表現を制御し、作品の印象や体験そのものを変化させられる点に魅力を感じています。",
                "uid": "b9"
              },
              {
                "t": "p",
                "k": "なりたい将来像",
                "p": "アーティストとエンジニアの架け橋となり、技術と表現の両面から制作を支援できるテクニカルアーティストを目指しています。",
                "uid": "b10"
              }
            ],
            "uid": "b8"
          },
          {
            "type": "tags",
            "k": "使用可能なツール",
            "chips": [
              "C++",
              "C#",
              "C",
              "Python",
              "HLSL",
              "DirectX 12",
              "Unity",
              "Unreal Engine",
              "Blender",
              "Maya",
              "Illustrator",
              "Photoshop",
              "Excel",
              "GitHub",
              "ImGui"
            ],
            "uid": "b11"
          }
        ],
        "uid": "p2"
      },
      {
        "id": "npr-1",
        "label": "NPRToonRenderer｜開発中",
        "blocks": [
          {
            "type": "head",
            "k": "NPRToonRenderer",
            "sub": "開発中｜C++ / ネイティブDirectX 12で制作する、景色を探索・撮影するゲームと専用エディター。NPRとPBRを融合した描画を、キャラクターから街・地形・植生まで共通で調整できます。見た目の制作と、描画負荷の計測・最適化を同じ環境で進めています。",
            "uid": "b12"
          },
          {
            "type": "specs",
            "rows": [
              [
                "開発環境",
                "C++ / DirectX 12 / HLSL / ImGui"
              ],
              [
                "開発状況",
                "開発中・継続更新"
              ],
              [
                "制作形態",
                "個人制作"
              ],
              [
                "担当範囲",
                "描画基盤・シェーダー・ゲーム・エディター"
              ],
              [
                "紹介更新",
                "2026年11月19日"
              ]
            ],
            "uid": "b13"
          },
          {
            "type": "figs",
            "cols": 1,
            "items": [
              {
                "img": "assets/npr-station-hybrid-20261117.png",
                "cap": "2026年11月17日の実行画面｜雪国の白凪駅・標準ハイブリッド描画",
                "uid": "b15",
                "fit": "contain"
              }
            ],
            "uid": "b14"
          },
          {
            "type": "p",
            "k": "目指している体験",
            "p": "景色を歩き、自分で構図を決めて写真を残す体験を制作しています。現在は札幌近郊を参考にした架空の雪国「白凪町」を追加。駅から住宅街、川、森、渓谷を通り、山頂へ向かうフィールドに拡張しました。",
            "uid": "b16"
          },
          {
            "type": "tags",
            "uid": "npr-current-tags",
            "k": "現在の主な実装",
            "chips": [
              "ネイティブDX12",
              "共通NPR / PBR",
              "GPUインスタンシング",
              "近傍ストリーミング",
              "足・腕IK",
              "雪の変形・足跡",
              "CPU / GPU計測"
            ]
          }
        ],
        "uid": "p3"
      },
      {
        "id": "npr-2",
        "label": "NPRToonRenderer — 雪国の探索と撮影",
        "blocks": [
          {
            "type": "h1",
            "k": "景色を巡る、写真を残す",
            "uid": "b17"
          },
          {
            "type": "figs",
            "cols": 3,
            "items": [
              {
                "uid": "b19",
                "img": "assets/npr-river-20261116.png",
                "cap": "白凪川｜橋と、海から独立した川の水面",
                "fit": "contain"
              },
              {
                "uid": "b20",
                "img": "assets/npr-overlook-20261116.png",
                "cap": "見晴らし坂｜住宅街を望む撮影スポット",
                "fit": "contain"
              },
              {
                "uid": "b21",
                "img": "assets/npr-summit-20261116.png",
                "cap": "白凪山頂｜街と谷を見渡す展望",
                "fit": "contain"
              }
            ],
            "uid": "b18"
          },
          {
            "type": "p",
            "k": "駅から山頂まで、道でつながるフィールド",
            "p": "ワールドは1,860 × 1,500 m。白凪駅・住宅街・見晴らし坂・川・森・渓谷・山頂を道でつなぎ、新たに6か所の撮影スポットを追加しました。西側の海岸・草原・旧雪山と、既存の撮影記録も引き継いでいます。",
            "uid": "b22"
          },
          {
            "type": "p",
            "k": "撮影モード",
            "p": "Pキーで自由カメラの撮影モードへ切り替え。画角調整・三分割グリッド・キャラクター非表示に対応し、UIのないPNG画像を保存できます。Mキーで広域マップを開き、撮影スポットの記録を確認できます。",
            "uid": "b23"
          },
          {
            "type": "p",
            "k": "環境の変化",
            "p": "ゲームモードでは朝・昼・夜で光が変化。撮影中は時間や風、水面の動きを止め、構図を調整できます。",
            "uid": "b24"
          },
          {
            "type": "p",
            "uid": "npr-traversal",
            "k": "地面とつながる動き",
            "p": "歩行・走行・待機・ジャンプをつなぎ、段差や斜面ではTwo Bone IKで足と腰を補正。左右の腕は手の目標位置と肘の曲がる方向を指定し、元のモーションへ混ぜます。髪・服の揺れも調整できます。"
          },
          {
            "type": "p",
            "uid": "npr-water",
            "k": "浅瀬の反応",
            "p": "海へ入る・足を着く・水中を移動するタイミングで飛沫と波紋を発生させます。既存の海の描画を保ちつつ、水深による通行制限と移動速度の変化を追加しました。"
          },
          {
            "type": "p",
            "uid": "npr-snow-deform",
            "k": "足の大きさに合わせて、雪を凹ませる",
            "p": "足の接地位置と足裏の大きさを使って雪面を変形し、縁と陰影を付けた足跡を残します。約1秒で消える設定にし、保持・更新する足跡を抑えています。橋やアスファルトには雪の変形を適用しません。"
          }
        ],
        "uid": "p4"
      },
      {
        "id": "npr-3",
        "label": "NPRToonRenderer — NPRとPBRの融合",
        "blocks": [
          {
            "type": "h1",
            "uid": "npr-shading-title",
            "k": "NPRの読みやすさと、PBRの材質感"
          },
          {
            "type": "p",
            "uid": "npr-blend",
            "k": "1本のスライダーで連続的に変える",
            "p": "標準はNPRとPBRの割合0.58。0〜1のスライダーで、段階的な陰影から連続的な光・材質の反応へ変えます。キャラクター・地形・建物・植生・岩は個別の割合に上書きでき、拡散反射、鏡面反射、環境光、反射、細部の法線、影色、リム、輪郭、背景の発光を選べます。"
          },
          {
            "type": "lookcompare",
            "uid": "npr-look-compare",
            "k": "同じカメラ・時刻で、3つのプリセットを比較",
            "p": "ボタンで実行画面を切り替えられます。ここでは撮影した静止画を比較しています。",
            "items": [
              {
                "uid": "npr-look-npr",
                "img": "assets/npr-station-npr-20261117.png",
                "cap": "NPR 0.00｜段階的な陰影と色のある暗部",
                "fit": "contain",
                "label": "NPR 0.00"
              },
              {
                "uid": "npr-look-hybrid",
                "img": "assets/npr-station-hybrid-20261117.png",
                "cap": "Hybrid 0.58｜標準設定",
                "fit": "contain",
                "label": "Hybrid 0.58"
              },
              {
                "uid": "npr-look-pbr",
                "img": "assets/npr-station-pbr-20261117.png",
                "cap": "PBR 1.00｜連続的な陰影と材質の反射",
                "fit": "contain",
                "label": "PBR 1.00"
              }
            ]
          },
          {
            "type": "cols",
            "uid": "npr-parts",
            "r": "1 1",
            "items": [
              {
                "t": "p",
                "uid": "npr-face",
                "k": "顔：SDFで影の形を制御",
                "p": "頭の向きと光の方向から影の閾値を求め、顔専用のSDFテクスチャまたは顔座標による近似で明暗を制御します。影色、境界の柔らかさ、肌の光沢マスクを個別に調整できます。"
              },
              {
                "t": "p",
                "uid": "npr-hair",
                "k": "髪：毛流れに沿ったハイライト",
                "p": "Kajiya–Kayモデルを使った主・副2層の異方性ハイライトを実装。毛流れ、光沢の幅・色・位置、シフトマップやLUTを調整し、拡散反射の法線とは分けて扱います。"
              }
            ]
          },
          {
            "type": "p",
            "uid": "npr-body",
            "k": "体・背景：材質と環境への反応",
            "p": "GGX鏡面反射、粗さに応じた環境反射、金属度・非金属F0を組み合わせます。雪・外壁・金属・窓など10種類の材質を用意。対象や種類をまとめて選んでInherit / Original / Anime / Hybrid / PBRを割り当て、取り消しもできます。"
          },
          {
            "type": "figs",
            "uid": "npr-environment-gallery",
            "cols": 2,
            "items": [
              {
                "uid": "npr-cape",
                "img": "assets/exploration-cape.png",
                "fit": "contain",
                "cap": "海岸の実行画面｜既存の海表現を継続使用"
              },
              {
                "uid": "npr-snow",
                "img": "assets/exploration-snow.png",
                "fit": "contain",
                "cap": "雪原の実行画面｜背景アセットの積雪と空気遠近"
              }
            ]
          },
          {
            "type": "p",
            "uid": "npr-effects",
            "k": "全体の絵づくり",
            "p": "影、輪郭線、補助光、リムライト、Bloom、被写界深度などをImGuiで調整します。MSAA / FXAA / SMAA / TAAなどのアンチエイリアスも比較しながら、描画品質と負荷を確認できます。"
          },
          {
            "type": "note",
            "uid": "npr-material-limit",
            "k": "表現を作るための前提",
            "p": "モデルの法線、UV、材質マスク、顔SDF、毛流れとシェーダーを合わせて調整します。専用マップがない部分は近似を使います。現在の共通描画はLDR出力で、PBR寄りの設定も実写品質を保証するものではありません。環境反射は事前生成した環境マップを使います。"
          }
        ],
        "uid": "p5"
      },
      {
        "id": "npr-4",
        "label": "NPRToonRenderer — エディタと制作範囲",
        "blocks": [
          {
            "type": "h1",
            "uid": "npr-editor-title",
            "k": "作る・調整する・調べるためのエディター"
          },
          {
            "type": "tags",
            "uid": "npr-editor-tags",
            "k": "ImGuiで操作できる機能",
            "chips": [
              "自由カメラ",
              "ゲームプレビュー",
              "ドッキング・タブ",
              "ライト・時刻",
              "マテリアル一括割当て",
              "IK目標",
              "描画範囲の診断"
            ]
          },
          {
            "type": "img",
            "uid": "b-npr-editor-screenshot",
            "img": "assets/npr-editor-workspace.png",
            "fit": "contain",
            "cap": "エディターの構成例｜ドッキングしたシーン・設定・負荷表示（共通NPR/PBR追加前の画面）"
          },
          {
            "type": "p",
            "uid": "npr-editor-modes",
            "k": "ゲームモードと編集モードを分離",
            "p": "探索用の操作と、自由カメラで調整する編集操作を分離。ドッキングしたImGuiパネルから、光・時刻・材質・IKを操作できます。共通NPR/PBR設定はファイルへ保存し、再起動後に復元できます。ゲームカメラのプレビューも用意しています。"
          },
          {
            "type": "img",
            "uid": "npr-profiler-image",
            "img": "assets/npr-profiler-20261102.jpg",
            "fit": "contain",
            "cap": "プロファイラの構成例｜2026年11月2日撮影。現在のGPU計測はDirectX 12へ移行"
          },
          {
            "type": "p",
            "uid": "npr-profiler",
            "k": "描画の負荷を処理単位で確認",
            "p": "CPUの階層スコープとネイティブDirectX 12のGPUタイムスタンプで工程を計測します。240フレームの履歴、タイムライン、CSV出力、RAM・VRAMに加え、描画回数・インスタンス数・PSOキャッシュ数・転送メモリを確認できます。"
          },
          {
            "type": "p",
            "uid": "npr-culling",
            "k": "描画されない理由を見えるようにする",
            "p": "草・低木・樹木・岩・遠景の距離、アセットや草区画の境界、カメラの視野、影の投影範囲を可視化。送信・距離外・視野外・表示OFFを色分けし、判定カメラを固定して外側から調べられます。移動用の当たり判定と石段も表示できます。"
          },
          {
            "type": "p",
            "uid": "npr-current-stage",
            "k": "現在の開発段階",
            "p": "現在はネイティブDX12、GPUインスタンシング、近傍の詳細地形の生成・解放、遠景の簡易モデル、4段階の画質プリセットを実装しています。雪国の建物は区画単位でまとめて保持し、距離で細部の描画を省略します。腕IKは手動ターゲット方式で、自動の壁つかみや遊泳は未対応です。"
          },
          {
            "type": "p",
            "uid": "npr-assets-credit",
            "k": "使用アセットと制作範囲",
            "p": "C++ / HLSLによる描画・動作・エディターを制作。キャラクターと自然物には外部モデルを使用し、樹木・岩・草花はQuaternius「Stylized Nature MegaKit Standard」（CC0）を利用しています。白凪町の建物・橋・看板はコードで生成しています。掲載画像は実際の開発画面です。"
          }
        ],
        "uid": "p6"
      },
      {
        "id": "npr-code",
        "uid": "p-npr-code",
        "label": "NPRToonRenderer — コードの工夫",
        "blocks": [
          {
            "type": "h1",
            "uid": "npr-code-title",
            "k": "プログラムで工夫した5つのこと"
          },
          {
            "type": "p",
            "uid": "npr-code-intro",
            "k": null,
            "p": "見た目だけでなく、設定を変えやすくすること、描画負荷を抑えること、処理の整合性を保つことを意識しています。各項目の「コードを見る」から、現在の実装を確認できます。"
          },
          {
            "uid": "npr-code-blend",
            "k": "光の成分ごとに、NPRとPBRを混ぜる",
            "problem": "単純な切り替えでは、顔・服・背景の見え方を同時に調整しづらい。",
            "approach": "共通の設定を定数バッファb10で渡し、拡散反射と鏡面反射をそれぞれ補間します。物体の種類別に割合を上書きし、NPR専用のリムなどはPBR側へ近づくほど弱めます。",
            "result": "全体の絵柄を1本のスライダーで変えながら、材質ごとの差と個別調整を残せます。",
            "language": "HLSL",
            "source": "shader/Environment/worldMaterial.hlsli / WorldLight",
            "code": "float diffuse=lerp(lerp(LookNpr.z,1,ramp),saturate(nl),mix);\nfloat visibility=lerp(lerp(.35,1,1-shadow),1-shadow,mix);\nfloat3 diffuseTerm=(1-f)*(1-metal)*base*diffuse*tint*LookComponents.x;\nfloat toonLobe=smoothstep(.65,.78,pow(saturate(dot(n,h)),lerp(100,4,rough)))*saturate(nl);\nfloat3 specular=lerp(f*toonLobe,LookGGX(n,v,l,rough,f0)*LookPi,mix)*LookComponents.y;\nreturn (diffuseTerm+specular)*visibility;",
            "codeNote": "実コード抜粋。mixが融合率、roughが粗さ、metalが金属度。色は線形空間で計算します。",
            "type": "engineering"
          },
          {
            "uid": "npr-code-instancing",
            "k": "同じモデルを、材質とLODごとにまとめて描く",
            "problem": "樹木や草花を1個ずつ描くと、配置数に合わせてCPUの描画命令が増える。",
            "approach": "空間クラスターで候補を絞り、見えるインスタンスをシェーダー割り当てと詳細／遠景モデルで分類。共通メッシュとインスタンス用バッファを使ってまとめて描きます。",
            "result": "種類ごとの見た目を変えてもインスタンシングを維持できます。描画回数は物体数ではなく、モデルのサブセットとグループ数に依存します。",
            "language": "C++",
            "source": "src/Game/World/natureAssets.cpp / NatureAssets::Draw",
            "code": "if(reason!=VisibilityDebug::Reason::Submitted)return;\nauto mode=shadow?SceneMaterials::Shader::Inherit:SceneMaterials::Resolve(b.handles[index]);\nr.shaderInstances[size_t(mode)+(proxy?SceneMaterials::ShaderCount:0)].push_back(i);",
            "code2": "ctx->DrawIndexedInstanced(sub.IndexNum,count,sub.StartIndex,0,0);",
            "codeNote": "実コードの分類部分と、別位置にある描画呼び出しを抜粋。proxyは遠景モデルの判定です。",
            "type": "engineering"
          },
          {
            "uid": "npr-code-lifetime",
            "k": "GPUが読み終わるまで、資源を解放しない",
            "problem": "CPUが地形を読み替えても、GPUは前のフレームのデータを使用している可能性がある。",
            "approach": "3組のフレーム資源とフェンスを使い、描画に使ったリソースの参照を保持。同じ組を再利用するときに完了を確認してから、保持参照や転送領域をリセットします。PSOは設定の組み合わせでキャッシュします。",
            "result": "ストリーミングや設定変更を、実行中のGPU処理と衝突させずに扱います。DirectX 12で必要な寿命管理を描画基盤に集約しました。",
            "language": "C++",
            "source": "src/Engine/Graphics/DX12/graphicsDevice.cpp / NativeDevice::ResetFrame",
            "code": "auto& f=Frame();Wait(f.fence);f.retained.clear();f.retainedSet.clear();f.samplerCache.clear();f.constantCache.clear();f.resourceCache.clear();f.queries.clear();",
            "codeNote": "実コード抜粋。Wait(f.fence)の完了後に保持参照をクリアする順序が要点です。",
            "type": "engineering"
          },
          {
            "uid": "npr-code-ao",
            "k": "AOを小さく計算し、奥行きを見て拡大する",
            "problem": "高解像度では、全ピクセルで周囲の深度を何度も調べるAOの負荷が増える。",
            "approach": "縦横半分の画像にAOと奥行きを保存します。拡大時は奥行きの違うサンプルを弱め、適切なサンプルがない細い輪郭ではフル解像度の計算へ戻します。背景は手前から描き、不透明物と草のシェーダー入口を分離しました。",
            "result": "キャラクターの縁へ背景の暗さが混ざるのを抑えつつ、計算量を削減。ImGuiでON/OFFを切り替え、画質とGPU時間を比較できます。",
            "language": "HLSL",
            "source": "shader/PostEffects/animeScreen.hlsl / UpsampleAo",
            "code": "float2 tap=HalfOcclusion.Load(int3(at,0));\nfloat weight=(x?f.x:1-f.x)*(y?f.y:1-f.y);\nweight*=exp2(-abs(tap.y-p.z)/max(.02,AO.x*.08));\nsum+=tap.x*weight;total+=weight;",
            "code2": "[branch]if(total>1e-4)return sum/total;\nreturn Occlusion(uv,p,Normal(uv,p));",
            "codeNote": "実コードの重み付けとフォールバックを抜粋。完全に同じ画素にはならない近似なので、比較用の切り替えを残しています。",
            "type": "engineering"
          },
          {
            "uid": "npr-code-terrain",
            "k": "描画と歩行判定で、地形の式を共有する",
            "problem": "GPU用とCPU用に地形を別々に実装すると、修正のずれが足の浮き・埋まりにつながる。",
            "approach": "道の制御点と高さ関数を1つのHLSLヘッダーに置き、C++からも読み込みます。言語による宣言の違いだけを条件分岐。橋の床面は別に優先し、足IKと雪の足跡へも伝えます。",
            "result": "地形を調整するときの二重修正を減らし、画面に見える地面と歩く高さの整合を保ちやすくしました。",
            "language": "C++ / HLSL",
            "source": "src/Game/World/snowCountry.h / shader/Environment/snowCountryTerrain.hlsli",
            "code": "#include \"../../../shader/Environment/snowCountryTerrain.hlsli\"",
            "code2": "#ifdef __cplusplus\n#include <cmath>\nstruct SCNode { float x,y,z,w; };\n#define SC_INLINE inline\n#define SC_TABLE inline constexpr\n#define SC_NODE(x,y,z,w) {x,y,z,w}\n#else\n#define SCNode float4\n#define SC_INLINE\n#define SC_TABLE static const\n#define SC_NODE(x,y,z,w) float4(x,y,z,w)\n#endif",
            "codeNote": "実コードの読み込み側と共通ヘッダーの宣言を抜粋。足元では、描画メッシュの三角形に合わせた高さ補間も使っています。",
            "type": "engineering"
          }
        ]
      },
      {
        "id": "npr-performance",
        "uid": "p-npr-performance",
        "label": "NPRToonRenderer — 最適化と検証",
        "blocks": [
          {
            "type": "h1",
            "uid": "npr-perf-title",
            "k": "計測して、改善を確かめる"
          },
          {
            "type": "p",
            "uid": "npr-quality",
            "k": "4段階の画質と、近くを詳しく描く仕組み",
            "p": "低・中・高・最高の画質プリセットを用意。近くの詳細地形を区画単位で生成・解放し、遠方は粗い地形と簡易モデルへ切り替えます。エディターでは表示距離や判定理由を可視化し、必要なものまで消していないか確認します。"
          },
          {
            "type": "benchmark",
            "uid": "npr-benchmark",
            "k": "半解像度AO＋背景の描画順最適化",
            "columns": [
              "内部描画サイズ",
              "両方OFF",
              "両方ON",
              "GPU時間の削減"
            ],
            "rows": [
              [
                "1920 × 1080",
                "3.431 ms",
                "3.174 ms",
                "約7.5%"
              ],
              [
                "3840 × 2160",
                "6.224 ms",
                "5.715 ms",
                "約8.2%"
              ]
            ],
            "p": "既存の同一実行ファイルによるON/OFF測定。RTX 5060 Ti / Ryzen 7 5700X、Release x64、ゲームの起点付近、最高画質、MSAA 4x＋SMAA Ultra、時刻10時。100フレーム以上のウォームアップ後、120フレームを3巡計測し、各巡の平均GPU時間の中央値を比較しています。",
            "note": "VSync・自動解像度・DX12デバッグレイヤーはOFF。全条件で描画インスタンス数20,654。雪国追加前の限定したシーンの結果で、最新マップ全域や他GPUで同じ改善率を保証するものではありません。",
            "source": "tools/pipeline_tests/out/gpu-opt-benchmark-final.log"
          },
          {
            "type": "p",
            "uid": "npr-validation",
            "k": "見た目の差と、設定の戻しやすさを確かめる",
            "p": "同じカメラ・時刻でNPR／Hybrid／PBRを撮影し、機能のON/OFF、材質の一括割り当てと取り消し、設定保存・復元、解像度変更を検証しています。高解像度向けの近似処理には元の方式へ戻す操作を残しています。"
          },
          {
            "type": "resource",
            "uid": "npr-notes",
            "k": "実装解説を手元で読む",
            "p": "上の工夫点、コードの場所、測定条件をMarkdownにもまとめました。",
            "label": "実装解説をダウンロード",
            "href": "NPR_TECHNICAL_NOTES.md"
          }
        ]
      },
      {
        "id": "cne-1",
        "label": "Custom Normal Editing Tools",
        "blocks": [
          {
            "type": "head",
            "k": "Custom Normal Editing Tools",
            "sub": "アニメ調モデルの陰影制御を目的として制作した、カスタム分割法線の可視化・編集 Blender アドオンです。法線の可視化に加え、Flatten・Average・Selected Align による編集機能を実装しました。また、Strength パラメータによる影響度調整に対応し、トゥーンモデルの陰影調整を効率化しています。編集結果は FBX 経由で Unity へ反映し、モデリングからシェーダー確認までを一貫して行えるワークフローを構築しました。",
            "uid": "b39"
          },
          {
            "type": "specs",
            "rows": [
              [
                "開発環境",
                "Blender"
              ],
              [
                "開発期間",
                "2026年5月31日〜6月1日"
              ],
              [
                "開発人数",
                "1人"
              ],
              [
                "担当箇所",
                "すべて"
              ]
            ],
            "uid": "b40"
          },
          {
            "type": "figs",
            "cols": 2,
            "items": [
              {
                "img": "assets/cne-before.jpg",
                "cap": "編集前",
                "uid": "b42"
              },
              {
                "img": "assets/cne-after.jpg",
                "cap": "編集後",
                "uid": "b43"
              }
            ],
            "uid": "b41"
          }
        ],
        "uid": "p7"
      },
      {
        "id": "cne-2",
        "label": "CNE — 法線の可視化",
        "blocks": [
          {
            "type": "h1",
            "k": "法線の可視化",
            "uid": "b44"
          },
          {
            "type": "p",
            "k": null,
            "p": "法線編集を行うためには、編集対象の法線がどの方向を向いているかを確認する必要があります。本アドオンでは、頂点法線表示と面の向き表示をワンクリックで切り替えられる機能を実装しました。編集前後の変化を視覚的に確認できるため、Average や Flatten の効果を効率よく検証できます。",
            "uid": "b45"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "img",
                "img": "assets/cne-face-front.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "Vertex Normal — 表面",
                "uid": "b47"
              },
              {
                "t": "img",
                "img": "assets/cne-face-back.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "Face Orientation — 裏面",
                "uid": "b48"
              }
            ],
            "uid": "b46"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "img",
                "img": "assets/cne-before.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "Before",
                "uid": "b50"
              },
              {
                "t": "img",
                "img": "assets/cne-after.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "After",
                "uid": "b51"
              }
            ],
            "uid": "b49"
          }
        ],
        "uid": "p8"
      },
      {
        "id": "cne-3",
        "label": "CNE — 技術解説・設計",
        "blocks": [
          {
            "type": "h1",
            "uid": "cne-class-title",
            "k": "クラス図と、処理の分担"
          },
          {
            "type": "p",
            "uid": "cne-class-intro",
            "k": null,
            "p": "実際のソースコードにある6つのクラスを図にしました。UIとBlenderへの読み書きを __init__.py に、法線の計算を normal_logic.py にまとめています。"
          },
          {
            "type": "diagram",
            "uid": "cne-class-diagram",
            "img": "assets/cne-class-diagram.svg",
            "source": "assets/cne-class-diagram.mmd",
            "cap": "実コードに基づくクラス図。実線の白三角＝継承、破線＝呼び出し・参照。関数とモジュールはクラスと区別しています。"
          },
          {
            "type": "cols",
            "uid": "cne-actual-design",
            "r": "1 1",
            "items": [
              {
                "t": "p",
                "uid": "cne-operators",
                "k": "Blender連携を共通化",
                "p": "5つのOperatorと1つのPanelを登録します。Flatten / Average / Selected Alignは edit_selected_normals(context, modifier) を呼び、モード切替・コーナー法線の取得・書き戻しを共通化しています。"
              },
              {
                "t": "p",
                "uid": "cne-logic",
                "k": "計算の責務を分ける",
                "p": "normal_logic.pyはbpyを直接使わず、法線の平均・整列・補間を関数で処理します。ベクトル演算にはmathutils.Vectorを使うため、他の環境へ移植する際はその部分の置き換えが必要です。"
              }
            ]
          },
          {
            "type": "p",
            "uid": "cne-strength",
            "k": "Strengthの実装",
            "p": "Averageでは元の法線と平均法線をLerpし、結果を正規化します。強さ0で元の向き、1で平均の向きに揃います。Flatten / Selected AlignへのStrength対応は今後の拡張です。"
          }
        ],
        "uid": "p9"
      },
      {
        "id": "cne-4",
        "label": "CNE — 結果と学び",
        "blocks": [
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "img",
                "img": "assets/cne-average.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "Average の結果 — 白くなっている面に Average（平均）をかけた結果",
                "uid": "b59"
              },
              {
                "t": "img",
                "img": "assets/cne-unity.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "Unity 上でどう見えるか — Toon シェーダーをかけ、左から順に強さを上げている（0〜1）",
                "uid": "b60"
              }
            ],
            "uid": "b58"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "p",
                "k": "今後の拡張性",
                "p": "今後はFlatten・Selected AlignへのStrength対応や、プリセット保存を追加したいと考えています。計算部分とBlenderへの読み書きを分けた構成を活かし、ベクトル演算の依存を整理した上で、他のDCCツールへの展開も検討しています。",
                "uid": "b62"
              },
              {
                "t": "p",
                "k": "今回の学び",
                "p": "本制作を通して、Python によるツール開発、Blender アドオン制作、シェーダー開発（HLSL）、Blender → Unity のアセットパイプライン、移植性を意識した設計を実践しました。技術とアートを繋ぐワークフロー構築の重要性を学び、テクニカルアーティストとしての視点を深めることができました。",
                "uid": "b63"
              }
            ],
            "uid": "b61"
          }
        ],
        "uid": "p10"
      },
      {
        "id": "team-works",
        "uid": "p-team-works",
        "label": "チーム制作",
        "blocks": [
          {
            "type": "h1",
            "uid": "b-team-title",
            "k": "チーム制作"
          },
          {
            "type": "p",
            "uid": "b-team-lead",
            "p": "複数人で制作したゲームと、その中で担当した実装・制作支援を紹介します。"
          },
          {
            "type": "cols",
            "uid": "b-team-cards",
            "r": "1 1",
            "items": [
              {
                "t": "worklink",
                "uid": "b-team-bloom",
                "target": "bloom-1",
                "k": "Bl∞m Shift",
                "img": "assets/bloom-anim.jpg",
                "fit": "contain",
                "p": "11人で制作した2Dワイヤーアクション。アニメーション実装、企画・仕様、プロジェクト管理を担当しました。"
              },
              {
                "t": "worklink",
                "uid": "b-team-neo",
                "target": "neo-1",
                "k": "Neo Zip",
                "img": "assets/neozip-play.jpg",
                "fit": "contain",
                "p": "10人で制作する2Dアクションゲーム。Unityでのマップツールとカットシーンシステムなど、演出・ツール制作を担当しています。"
              }
            ]
          },
          {
            "type": "cols",
            "uid": "b-team-autumn-cards",
            "r": "1 1",
            "items": [
              {
                "t": "worklink",
                "uid": "b-hitoriga-card",
                "target": "hitoriga-1",
                "imageTarget": "b-hitoriga-main",
                "k": "ヒトリガ",
                "p": "制作中｜Unity / 2026年9月〜 / 約10人。グラフィックス周りを担当しています。"
              },
              {
                "t": "worklink",
                "uid": "b-balistick-card",
                "target": "balistick-1",
                "imageTarget": "b-balistick-main",
                "k": "Ballistic",
                "p": "制作中｜Unity 6 / URP / 約10人。キャラクター用トゥーンシェーダー、チーム識別ハイライト、制作支援ツールなど、グラフィックス周りを担当しています。"
              }
            ]
          }
        ]
      },
      {
        "id": "bloom-1",
        "label": "Bl∞m Shift",
        "blocks": [
          {
            "type": "head",
            "k": "Bl∞m Shift",
            "logo": "assets/bloom-logo.jpg",
            "sub": "変身を軸とした 2D ワイヤーアクション。爽快な操作感に力を入れ、デザイナーとの連携も強め、雰囲気重視の作品を作り上げました。",
            "uid": "b64"
          },
          {
            "type": "specs",
            "rows": [
              [
                "開発環境",
                "DirectX11"
              ],
              [
                "開発期間",
                "2025年10月〜2026年3月"
              ],
              [
                "開発人数",
                "11人"
              ],
              [
                "担当箇所",
                "プログラマ コアメンバー ／ 企画・仕様"
              ]
            ],
            "uid": "b65"
          },
          {
            "type": "figs",
            "cols": 1,
            "items": [
              {
                "img": "assets/bloom-anim.jpg",
                "cap": "アニメーション実装 — イラストをゲーム内に落とし込み、違和感のない表現を実装",
                "uid": "b67"
              }
            ],
            "uid": "b66"
          },
          {
            "type": "note",
            "k": "担当分野・制作内容",
            "p": "アニメーション実装、企画・仕様書作成、プロジェクト管理、Git管理を担当しました。進行・タスク管理を行いながら、イラストをゲーム内のアニメーションとして実装しました。",
            "uid": "b68"
          }
        ],
        "uid": "p11"
      },
      {
        "id": "bloom-2",
        "label": "Bl∞m Shift — 学び",
        "blocks": [
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "p",
                "k": "アニメーション実装",
                "p": "イラストをゲーム内に落とし込み、違和感のないアニメーション表現を実装しました。",
                "uid": "b70"
              },
              {
                "t": "p",
                "k": "仕様書作成 / プロジェクト管理",
                "p": "仕様書を作成しました。ガントチャート作成、タスク管理、進捗確認を担当しています。",
                "uid": "b71"
              }
            ],
            "uid": "b69"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "img",
                "img": "assets/bloom-gantt.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "ガントチャートによる進行管理",
                "uid": "b73"
              },
              {
                "t": "img",
                "img": "assets/bloom-spec.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "作成した仕様書",
                "uid": "b74"
              }
            ],
            "uid": "b72"
          },
          {
            "type": "note",
            "k": "初めてのチーム制作で学んだこと",
            "p": "本制作では、グラフィックスエンジニアとしてアニメーション実装を担当したほか、仕様書作成やプロジェクト管理も経験しました。初めてのチーム制作だったこともあり、タスク管理やスケジュール設計が不十分で、終盤に作業が集中してしまうなど多くの課題を経験しました。一方で、イラストアニメーションの実装やチーム運営を通して、技術面だけでなく制作全体を俯瞰して考える視点を身につけることができました。この経験は現在のチーム制作にも活かされており、ワークフロー改善や進行管理、役割分担の最適化などに繋がっています。また、アニメーション実装を通して描画処理や補間計算への理解が深まり、現在取り組んでいるシェーダー開発やグラフィックスプログラミングの基礎となっています。",
            "uid": "b75"
          }
        ],
        "uid": "p12"
      },
      {
        "id": "neo-1",
        "label": "Neo Zip",
        "blocks": [
          {
            "type": "head",
            "k": "Neo Zip",
            "logo": "assets/neozip-title.png",
            "sub": "Zip を開閉して進んでいく 2D アクションゲームです。",
            "uid": "b76"
          },
          {
            "type": "specs",
            "rows": [
              [
                "開発環境",
                "Unity"
              ],
              [
                "開発期間",
                "2026年3月〜"
              ],
              [
                "開発人数",
                "10人"
              ],
              [
                "担当箇所",
                "演出 ／ ツール作成"
              ]
            ],
            "uid": "b77"
          },
          {
            "type": "cols",
            "r": "1 1",
            "items": [
              {
                "t": "img",
                "img": "assets/neozip-play.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "ゲーム画面",
                "uid": "b79"
              },
              {
                "fit": "contain",
                "bg": "none",
                "cap": "プレイヤー＆オトモ",
                "type": "figs",
                "cols": 2,
                "items": [
                  {
                    "uid": "neo-character-player",
                    "img": "assets/neozip-player-original.png",
                    "fit": "contain",
                    "cap": "プレイヤー"
                  },
                  {
                    "uid": "neo-character-companion",
                    "img": "assets/neozip-companion-original.png",
                    "fit": "contain",
                    "cap": "オトモ"
                  }
                ],
                "uid": "b80"
              }
            ],
            "uid": "b78"
          },
          {
            "type": "note",
            "k": "担当分野・制作内容",
            "p": "演出・ツール開発を担当しています。Unity Editor拡張によるマップツールと、ScriptableObjectを利用したカットシーンシステムを制作しています。",
            "uid": "b81"
          }
        ],
        "uid": "p13"
      },
      {
        "id": "neo-2",
        "label": "Neo Zip — ツール制作",
        "blocks": [
          {
            "type": "h1",
            "k": "マップツール制作",
            "uid": "b82"
          },
          {
            "type": "cols",
            "r": "1.1 1",
            "items": [
              {
                "t": "p",
                "p": "チーム制作において、プランナーやデザイナーでも扱いやすいレベルエディタの制作を担当しました。既存の TileMap 機能とグリッドスナップを活用し、Excel に近い感覚でマップ配置が行える設計とすることで、プログラマー以外でもステージ制作を行えるワークフローを構築しました。また、地形だけでなく背景オブジェクトやギミック配置にも対応し、ゲーム制作に必要な要素を一元管理できるようにしています。制作では Unity Editor 拡張の実装に苦労しましたが、新しい技術を学びながらツール開発を進める経験を得ることができました。",
                "uid": "b84"
              },
              {
                "t": "img",
                "img": "assets/neozip-maptool.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "マップツール（Unity Editor 拡張）",
                "uid": "b85"
              }
            ],
            "uid": "b83"
          },
          {
            "type": "h1",
            "k": "カットシーン制作",
            "uid": "b86"
          },
          {
            "type": "cols",
            "r": "1 1.1",
            "items": [
              {
                "t": "img",
                "img": "assets/neozip-cutscene.jpg",
                "fit": "contain",
                "bg": "#0e1219",
                "cap": "カットシーン設定（ScriptableObject）",
                "uid": "b88"
              },
              {
                "t": "p",
                "p": "シナリオ担当やデザイナーがコードを編集せずに演出を作成できるカットシーンシステムを制作しました。ScriptableObject（Config）を利用し、セリフ表示、カメラ移動、フェード演出などをデータベース化することで、Unity 上から簡単に演出内容を編集できる構成にしています。これにより、プログラマーへの依存を減らし、複数職種が並行して作業できるワークフローを実現しました。実装時には UI 表示や演出制御に関する不具合が多数発生しましたが、原因を切り分けながら修正を行い、データ駆動型のツール設計について学ぶことができました。",
                "uid": "b89"
              }
            ],
            "uid": "b87"
          }
        ],
        "uid": "p14"
      },
      {
        "id": "hitoriga-1",
        "uid": "p-hitoriga",
        "label": "ヒトリガ｜制作中",
        "blocks": [
          {
            "type": "head",
            "uid": "b-hitoriga-head",
            "k": "ヒトリガ",
            "sub": "制作中｜2026年9月からUnityで開発している、約10人規模のチーム制作作品です。グラフィックス周りを担当しています。"
          },
          {
            "type": "specs",
            "uid": "b-hitoriga-specs",
            "rows": [
              [
                "開発環境",
                "Unity"
              ],
              [
                "開発期間",
                "2026年9月〜（制作中）"
              ],
              [
                "開発人数",
                "約10人"
              ],
              [
                "担当箇所",
                "グラフィックス周り"
              ]
            ]
          },
          {
            "type": "img",
            "uid": "b-hitoriga-main",
            "img": "",
            "fit": "contain",
            "placeholder": "制作中 · 画像準備中",
            "cap": "開発中の実行画面"
          },
          {
            "type": "note",
            "uid": "b-hitoriga-role",
            "k": "担当内容",
            "p": "チーム内でグラフィックス周りの制作を担当しています。"
          },
          {
            "type": "h1",
            "uid": "b-hitoriga-gallery-title",
            "k": "制作ギャラリー"
          },
          {
            "type": "figs",
            "uid": "b-hitoriga-gallery",
            "cols": 2,
            "items": [
              {
                "uid": "b-hitoriga-detail-1",
                "img": "",
                "fit": "contain",
                "placeholder": "画像準備中",
                "cap": "制作画面・表現の詳細"
              },
              {
                "uid": "b-hitoriga-detail-2",
                "img": "",
                "fit": "contain",
                "placeholder": "画像準備中",
                "cap": "制作画面・表現の詳細"
              }
            ]
          }
        ]
      },
      {
        "id": "balistick-1",
        "uid": "p-balistick",
        "label": "Ballistic｜制作中",
        "blocks": [
          {
            "type": "head",
            "uid": "b-balistick-head",
            "k": "Ballistic",
            "sub": "制作中｜約10人規模で開発する対戦アクションゲーム。グラフィックスを担当し、Unity 6 / URP向けのキャラクター用トゥーンシェーダーと、演出・設定を支えるC#・エディタ拡張を制作しています。"
          },
          {
            "type": "specs",
            "uid": "b-balistick-specs",
            "rows": [
              [
                "開発環境",
                "Unity 6 / URP"
              ],
              [
                "開発期間",
                "2026年9月〜（制作中）"
              ],
              [
                "開発人数",
                "約10人"
              ],
              [
                "担当箇所",
                "グラフィックス／トゥーンシェーダー・ツール開発"
              ]
            ]
          },
          {
            "type": "img",
            "uid": "b-balistick-main",
            "img": "",
            "fit": "contain",
            "placeholder": "制作中 · 画像準備中",
            "cap": "開発中の実行画面"
          },
          {
            "type": "note",
            "uid": "b-balistick-role",
            "k": "開発したもの｜キャラクター用トゥーンシェーダー",
            "p": "「アニメ調の絵づくり」と「敵味方がひと目でわかること」の両立を目標に、キャラクター用トゥーンシェーダーを開発しました。1ファイル4パス（ForwardLit / Outline / ShadowCaster / DepthOnly）で構成し、エディタ拡張とゲーム側のC#も含めて実装しています。"
          },
          {
            "type": "tags",
            "uid": "b-ballistic-tech",
            "k": "技術構成",
            "chips": [
              "Unity 6 / URP",
              "HLSL / ShaderLab",
              "C#",
              "4パス構成",
              "ShaderGUI",
              "MaterialPropertyBlock"
            ]
          },
          {
            "type": "h1",
            "uid": "b-ballistic-shader-features",
            "k": "トゥーンシェーダーで工夫した点"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-1",
            "k": "材質ごとのランプ",
            "p": "ランプテクスチャの行をShading IDに対応させ、1枚のテクスチャで肌・布・金属などに異なる陰影を付けられるようにしました。影の色を紫寄りに調整し、アニメ調の印象を作っています。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-2",
            "k": "黒くならない落ち影",
            "p": "落ち影の中の明るさに下限を設け、影に入ってもキャラクターの色が残るようにしました。環境光は真上向きで取得し、セル画らしい平坦さを出しています。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-3",
            "k": "顔の影",
            "p": "顔の法線を球状に置き換え、鼻や目のまわりにまだらな影が出るのを抑えました。当初はUVで顔の範囲を判定していましたが、AI生成テクスチャではUVが散らばっていたため、「頭からの距離＋正面方向」による判定へ切り替えました。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-4",
            "k": "アウトライン",
            "p": "線の太さを画面のピクセル幅で指定し、解像度が変わっても安定するようにしました。角で線が割れないよう、取り込み時にスムーズ法線をUV2へ焼き込みます。Tangentは法線マップ用に確保し、線の色はベースカラーの明度を下げて作っています。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-5",
            "k": "チームハイライト",
            "p": "見るプレイヤーを基準に、敵は赤、味方はターコイズの縁取りで識別できるようにしました。オンラインでチーム情報の確定が遅れた場合も、確定した時点で表示を更新します。値はMaterialPropertyBlockで渡し、ほかのスクリプトの設定と干渉しないようにしています。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-6",
            "k": "ポストエフェクト",
            "p": "Bloomを控えめに調整し、設定画面からオン・オフできるようにしました。古いセーブデータとの互換性も維持しています。トーンマップにはNeutralを採用し、チーム識別に使う赤の色味がずれるのを抑えました。"
          },
          {
            "type": "p",
            "uid": "b-ballistic-feature-7",
            "k": "制作を支えるツール",
            "p": "日本語で項目を出し分けるカスタムShaderGUIと、設定画面を自動で生成するエディタ拡張を制作しました。シェーダーの調整からゲーム内の設定反映までを扱える構成にしています。"
          },
          {
            "type": "h1",
            "uid": "b-balistick-gallery-title",
            "k": "制作ギャラリー"
          },
          {
            "type": "figs",
            "uid": "b-balistick-gallery",
            "cols": 2,
            "items": [
              {
                "uid": "b-balistick-detail-1",
                "img": "",
                "fit": "contain",
                "placeholder": "画像準備中",
                "cap": "制作画面・表現の詳細"
              },
              {
                "uid": "b-balistick-detail-2",
                "img": "",
                "fit": "contain",
                "placeholder": "画像準備中",
                "cap": "制作画面・表現の詳細"
              }
            ]
          }
        ]
      },
      {
        "id": "end",
        "label": "連絡先",
        "blocks": [
          {
            "type": "end",
            "uid": "b90"
          }
        ],
        "uid": "p15"
      }
    ],
    "teamGroupingVersion": 1,
    "teamAutumn2026Version": 1,
    "nprEditorScreenshotVersion": 1,
    "teamRolePresentationVersion": 1,
    "ballisticShaderVersion": 1,
    "multiPageVersion": 1,
    "rendererUpdateVersion": 20261119
  },
  "text": {},
  "set": {
    "fontBase": 16,
    "scaleH1": 3.2,
    "scaleH2": 2.1,
    "scaleH3": 1.28,
    "leading": 1.85,
    "contentMax": 1100,
    "accent": "#8fb8e8",
    "font": "zen",
    "snow": 1
  },
  "rendererPreviousPages": [
    {
      "id": "npr-1",
      "label": "NPRToonRenderer｜開発中",
      "blocks": [
        {
          "type": "head",
          "k": "NPRToonRenderer",
          "sub": "開発中｜C++ / DirectX 11で制作している、アニメ調の景色を探索・撮影するゲームと専用エディターです。NPRとPBRを連続的に混ぜる描画、顔・髪・体に分けた表現、自然な移動とIK、描画負荷を調べるツールを一つの環境で開発しています。",
          "uid": "b12"
        },
        {
          "type": "specs",
          "rows": [
            [
              "開発環境",
              "C++ / DirectX 11 / HLSL / ImGui"
            ],
            [
              "開発状況",
              "開発中・継続更新"
            ],
            [
              "制作形態",
              "個人制作"
            ],
            [
              "担当範囲",
              "描画・探索・撮影・エディター・診断ツール"
            ],
            [
              "紹介更新",
              "2026年11月3日"
            ]
          ],
          "uid": "b13"
        },
        {
          "type": "figs",
          "cols": 1,
          "items": [
            {
              "img": "assets/exploration-forest.png",
              "cap": "開発中の実行画面｜花の回廊と雪山",
              "uid": "b15"
            }
          ],
          "uid": "b14"
        },
        {
          "type": "p",
          "k": "目指している体験",
          "p": "アニメ調の光と色で描く景色を、自分のペースで歩いて撮影する体験。レンダラー単体の表現検証から、探索・撮影を楽しめるゲームへ拡張しています。",
          "uid": "b16"
        },
        {
          "type": "tags",
          "uid": "npr-current-tags",
          "k": "現在の主な実装",
          "chips": [
            "NPR / PBRブレンド",
            "Face SDF",
            "髪の異方性反射",
            "足・腕IK",
            "水しぶき・波紋",
            "CPU / GPUプロファイラ",
            "カリング可視化"
          ]
        }
      ],
      "uid": "p3"
    },
    {
      "id": "npr-2",
      "label": "NPRToonRenderer — 探索と撮影",
      "blocks": [
        {
          "type": "h1",
          "k": "景色を巡る、写真を残す",
          "uid": "b17"
        },
        {
          "type": "figs",
          "cols": 3,
          "items": [
            {
              "img": "assets/exploration-coast.png",
              "cap": "海岸｜波と反射を描く海",
              "uid": "b19"
            },
            {
              "img": "assets/exploration-meadow.png",
              "cap": "草原｜風車と緑の丘",
              "uid": "b20"
            },
            {
              "img": "assets/exploration-highlands.png",
              "cap": "雪山｜白銀の高原",
              "uid": "b21"
            }
          ],
          "uid": "b18"
        },
        {
          "type": "p",
          "k": "広がるフィールド",
          "p": "1,000 × 1,180のワールド領域に、海岸・草原・花の森・雪山と6か所の撮影スポットを配置。エリアを切り替えずに歩きながら、自分の構図を探せるフィールドを制作しています。",
          "uid": "b22"
        },
        {
          "type": "p",
          "k": "撮影モード",
          "p": "Pキーで自由カメラの撮影モードへ切り替え。画角調整・三分割グリッド・キャラクター非表示に対応し、UIのないPNG画像を保存できます。Mキーで広域マップを開き、撮影スポットの記録を確認できます。",
          "uid": "b23"
        },
        {
          "type": "p",
          "k": "環境の変化",
          "p": "ゲームモードでは朝・昼・夜で光が変化。撮影中は時間や風、水面の動きを止め、構図を調整できます。",
          "uid": "b24"
        },
        {
          "type": "p",
          "uid": "npr-traversal",
          "k": "地面とつながる動き",
          "p": "歩行・走行・待機をつなぎ、段差や斜面ではTwo Bone IKで足と腰を補正します。腕も左右別に手の目標位置と肘の曲がる方向を調整でき、元のアニメーションへ滑らかに混ぜられます。"
        },
        {
          "type": "p",
          "uid": "npr-water",
          "k": "浅瀬の反応",
          "p": "海へ入る・足を着く・水中を移動するタイミングで飛沫と波紋を発生させます。既存の海の描画を保ちつつ、水深による通行制限と移動速度の変化を追加しました。"
        }
      ],
      "uid": "p4"
    },
    {
      "id": "npr-3",
      "label": "NPRToonRenderer — アニメ調描画",
      "blocks": [
        {
          "type": "h1",
          "uid": "npr-shading-title",
          "k": "NPRの読みやすさと、PBRの材質感"
        },
        {
          "type": "p",
          "uid": "npr-blend",
          "k": "1本のスライダーで連続的に変える",
          "p": "トゥーンの整理した陰影から、粗さ・金属度・環境反射のある質感へ連続的に調整できます。顔のNPR表現を残しながら、服や装飾にはPBRの反応を与える構成です。"
        },
        {
          "type": "cols",
          "uid": "npr-parts",
          "r": "1 1",
          "items": [
            {
              "t": "p",
              "uid": "npr-face",
              "k": "顔：SDFで影の形を制御",
              "p": "頭の向きと光の方向から影の閾値を求め、顔専用のSDFテクスチャまたは顔座標による近似で明暗を制御します。影色、境界の柔らかさ、肌の光沢マスクを個別に調整できます。"
            },
            {
              "t": "p",
              "uid": "npr-hair",
              "k": "髪：毛流れに沿ったハイライト",
              "p": "Kajiya–Kayモデルを使った主・副2層の異方性ハイライトを実装。毛流れ、光沢の幅・色・位置、シフトマップやLUTを調整し、拡散反射の法線とは分けて扱います。"
            }
          ]
        },
        {
          "type": "p",
          "uid": "npr-body",
          "k": "体・背景：材質と環境への反応",
          "p": "GGXによる鏡面反射とIBLを組み合わせ、粗さ・金属度・法線・材質マスクで表面の見え方を調整します。オブジェクトや種類をまとめて選び、Original / Anime / Hybridを割り当てる操作にも対応しています。"
        },
        {
          "type": "figs",
          "uid": "npr-environment-gallery",
          "cols": 2,
          "items": [
            {
              "uid": "npr-cape",
              "img": "assets/exploration-cape.png",
              "fit": "contain",
              "cap": "海岸の実行画面｜既存の海表現を継続使用"
            },
            {
              "uid": "npr-snow",
              "img": "assets/exploration-snow.png",
              "fit": "contain",
              "cap": "雪原の実行画面｜背景アセットの積雪と空気遠近"
            }
          ]
        },
        {
          "type": "p",
          "uid": "npr-effects",
          "k": "全体の絵づくり",
          "p": "影、輪郭線、補助光、リムライト、Bloom、被写界深度などをImGuiで調整します。MSAA / FXAA / SMAA / TAAなどのアンチエイリアスも比較しながら、描画品質と負荷を確認できます。"
        },
        {
          "type": "note",
          "uid": "npr-material-limit",
          "k": "表現を作るための前提",
          "p": "モデルの法線、UV、材質マスク、顔SDF、毛流れなどのアセット情報とシェーダーを合わせて調整します。専用マップがない部分は近似を使います。特定の商用ゲームのシェーダーを移植したものではなく、自作の描画実装です。"
        }
      ],
      "uid": "p5"
    },
    {
      "id": "npr-4",
      "label": "NPRToonRenderer — エディタと制作範囲",
      "blocks": [
        {
          "type": "h1",
          "uid": "npr-editor-title",
          "k": "作る・調整する・調べるためのエディター"
        },
        {
          "type": "tags",
          "uid": "npr-editor-tags",
          "k": "ImGuiで操作できる機能",
          "chips": [
            "自由カメラ",
            "ゲームプレビュー",
            "ドッキング・タブ",
            "ライト・時刻",
            "マテリアル一括割当て",
            "IK目標",
            "描画範囲の診断"
          ]
        },
        {
          "type": "img",
          "uid": "b-npr-editor-screenshot",
          "img": "assets/npr-editor-workspace.png",
          "fit": "contain",
          "cap": "専用エディター｜シーンと描画設定を同時に確認"
        },
        {
          "type": "p",
          "uid": "npr-editor-modes",
          "k": "ゲームモードと編集モードを分離",
          "p": "探索用の操作と、自由カメラで調整する編集操作を分けています。画面端へドッキングしたパネルから、光・時刻・材質・IKなどを操作し、ゲームカメラのプレビューでも結果を確認できます。"
        },
        {
          "type": "img",
          "uid": "npr-profiler-image",
          "img": "assets/npr-profiler-20261102.jpg",
          "fit": "contain",
          "cap": "2026年11月2日の実行画面｜CPU / GPUの階層タイムラインとフレーム履歴"
        },
        {
          "type": "p",
          "uid": "npr-profiler",
          "k": "描画の負荷を処理単位で確認",
          "p": "CPUの階層スコープとDirect3D 11のGPUタイムスタンプを使い、描画工程を計測します。240フレームの履歴、カテゴリ別グラフ、タイムライン、CSV出力に加え、RAM・VRAM使用量も確認できます。"
        },
        {
          "type": "p",
          "uid": "npr-culling",
          "k": "描画されない理由を見えるようにする",
          "p": "草・低木・樹木・岩・遠景の距離、アセットや草区画の境界、カメラの視野、影の投影範囲を可視化。送信・距離外・視野外・表示OFFを色分けし、判定カメラを固定して外側から調べられます。移動用の当たり判定と石段も表示できます。"
        },
        {
          "type": "p",
          "uid": "npr-current-stage",
          "k": "現在の開発段階",
          "p": "探索・撮影と描画ツールを継続して制作中です。足IKはこのフィールドの地形と石段に対応し、腕IKは手動ターゲット方式です。自動の壁つかみ、遊泳、遮蔽カリング、LOD切替は今後の検討項目です。"
        },
        {
          "type": "p",
          "uid": "npr-assets-credit",
          "k": "使用アセットと制作範囲",
          "p": "背景にはQuaternius「Stylized Nature MegaKit Standard」（CC0）の樹木・岩・草花を使用しています。キャラクター・背景モデル自体の制作ではなく、外部モデルへ適用する描画、ゲーム側の動作、制作支援機能を担当しています。掲載画像は開発途中の実行画面です。"
        }
      ],
      "uid": "p6"
    }
  ]
};
