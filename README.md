# Eito Tomioka Portfolio

富岡栄斗の Technical Artist / Graphics Engineer ポートフォリオです。

公開サイト: https://leeeito.github.io/

## GitHub Pages

main ブランチのルートディレクトリから公開します。

- index.html: 表紙、作品一覧・目次、プロフィール、連絡先
- works/nprtoonrenderer/: NPRToonRenderer
- works/normal-tools/: Custom Normal Editing Tools
- works/bloom-shift/: Bl∞m Shift
- works/neo-zip/: Neo Zip
- works/hitoriga/: ヒトリガ
- works/ballistic/: Ballistic

各作品に固有のURLがあり、作品単位でリンクを共有できます。

## Editing

https://leeeito.github.io/?edit を開いて「編集」を押します。
詳細ページでも末尾の ?edit で編集できます。ページ移動時にも編集用URLを引き継ぎます。
変更は今使っているブラウザーに保存され、閲覧用URLには自動反映されません。
「公開用ZIP」で全ページを書き出し、解凍した中身をこのリポジトリに反映すると更新できます。
index.html だけでなく、works/・assets/ と共通ファイルも必要です。

詳しい操作・データ構成は [PORTFOLIO_EDITING.md](PORTFOLIO_EDITING.md) を参照してください。

## ローカルで確認する

このフォルダーで次を実行して http://localhost:8000/ を開きます。

    python -m http.server 8000

ファイルを直接開く場合も表示できますが、ZIP書き出しにはHTTP経由の表示が必要です。
依存パッケージ・ビルド作業は不要です。

## 構成

- portfolio-data.js: 文章・画像・作品情報
- portfolio.js: ページ振り分け、表示、ブラウザー編集、ZIP書き出し
- style.css / snow.js: レイアウト・雪の演出
- assets/: 画像、Blenderアドオンのクラス図（SVG / Mermaid）
- site-template.html / publish-manifest.json: 全ページの書き出し用テンプレートとファイル一覧

2026-11-03: 作品別ページへの分割、NPRToonRendererの機能更新、実コードに基づくアドオンクラス図を反映。
