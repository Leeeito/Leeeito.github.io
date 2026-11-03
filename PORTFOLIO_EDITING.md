# ポートフォリオの編集・公開方法

## 普段の編集

1. https://leeeito.github.io/?edit を開き、画面下の「編集」を押します。
2. 文字をタップすると直接書き換えられます。画像は「差し替え」で変更できます。
3. 作品カードを押すとその作品の詳細へ移動します。URLに ?edit が引き継がれます。
4. 編集中の変更はこの端末・このブラウザーに自動保存されます。
5. 「バックアップ保存」でJSONを手元にも保存してください。別の端末では「バックアップ読込」で復元できます。

閲覧用URLと編集用URLの表示データを分けています。?edit がないURLでは、GitHubに公開済みの内容だけを表示します。
編集URLは認証ではありません。他の人がそのURLを開いて編集しても、その人のブラウザー内に保存されるだけで公開サイトは変わりません。

## 公開サイトに反映する

1. 編集画面の「公開用ZIP」を押します。
2. eito-portfolio-pages.zip を解凍します。
3. GitHub の Leeeito/Leeeito.github.io に、解凍したファイルを同じフォルダー構成で反映します。
4. main ブランチへのコミット後、GitHub Pages の公開処理が終われば反映されます。

ZIP自体をリポジトリに置く操作では公開ページは更新されません。解凍した index.html、works/、assets/、共通のJS・CSSなどをアップロードしてください。
全ページは同じ portfolio-data.js を参照します。作品ページごとに編集内容が食い違わない構成です。
最初に古い編集データを検出した際は、今回更新したNPRToonRendererとアドオンの設計説明を新しい内容に移行します。従来の保存キーは消しません。

## コードで編集する場合

文章とブロック構成は portfolio-data.js の window.PUBLISHED_DATA にあります。
layout.pages は作品内の「節」です。実際のページの振り分けは portfolio.js の FIXED_ROUTES / routeFor が行います。

| URL | 掲載する節 |
| --- | --- |
| / | cover, toc, profile, end |
| /works/nprtoonrenderer/ | npr- で始まる節 |
| /works/normal-tools/ | cne- で始まる節 |
| /works/bloom-shift/ | bloom- で始まる節 |
| /works/neo-zip/ | neo- で始まる節 |
| /works/hitoriga/ | hitoriga- で始まる節 |
| /works/ballistic/ | balistick- で始まる節（既存データIDを保持） |

公開URLは各フォルダーに置いた実際の index.html で開きます。直接アクセス・再読み込み・戻る操作が可能です。
トップの目次は作品別のリンクカードです。画像は object-fit: contain で全体を表示し、PCの横長画面も途中で切りません。
追加した作品は編集中には ?work=... のURLで表示されます。ZIPにも作品用のHTMLを出力します。
独自に画像ファイルを追加するときは、publish-manifest.json の files にも追加してください。ブラウザーの「画像追加」「差し替え」で取り込んだ画像はデータ内に含まれるため、この操作は不要です。

## Blenderアドオンのクラス図

- assets/cne-class-diagram.svg: ベクター画像。拡大しても文字が荒れません。
- assets/cne-class-diagram.mmd: Mermaid形式の構造定義。
- ページの図はスマホで横スクロールできます。「図を大きく開く」で単独表示できます。

実コードの __init__.py にある Panel 1個、Operator 5個をクラスとして表記しています。
edit_selected_normals は共通関数、normal_logic.py は計算モジュールなので、クラスと区別しました。
SVGの実線は継承、点線は操作の呼び出し・参照です。UIから各Operator、各Operatorから共通関数や法線計算への依存を読めます。
計算側は bpy を直接使いませんが、mathutils.Vector に依存します。完全な標準Pythonだけのコードではありません。
SVGとMermaidは両方更新してください。片方を編集しても他方へ自動変換はされません。

## NPRToonRendererに追記した内容

- 部位別のNPR/PBR連続ブレンド、Face SDF、髪の異方性ハイライト、GGX・IBL・材質設定
- エディター／ゲームの分離、自由カメラ、プレビュー、照明・時間、ImGui調整
- 段差と足IK、手・腕・肘のIK、浅瀬の飛沫・波紋
- フレーム履歴、CPU/GPU、メモリなどのプロファイラ
- 植生や背景オブジェクトのカリング範囲、判定理由、固定カメラ、影・当たり判定の可視化

オリジナルのC++ / HLSLと説明MDを確認して反映しました。
公式ゲームのシェーダーを移植したものではなく、自作の近似表現です。
自動で壁をつかむ処理、本格的な遊泳、遮蔽カリング・LODは完成機能として記載していません。
モデルやテクスチャが必要な表現は、その制限も作品ページに記載しています。
