# アイコンの選定と配布

2026-09-10。手描きSVGを廃止し、Phosphor Icons 2.1.1のboldを採用した。

## 比較と判断

| 候補                                               | 公式資料で確認した特徴                                  | Plyへの判断                                                                            |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Lucide](https://github.com/lucide-icons/lucide)   | Feather由来の線画、SVG配布、ISC                         | 軽い線で揃える用途に向く。今回の太めの文字と道具の絵柄には、重さを選べる候補を優先した |
| [Tabler](https://github.com/tabler/tabler-icons)   | 24pxを基準にしたアイコン群、MIT                         | 操作アイコンとして有力。今回は同一の絵柄に複数ウェイトを持つPhosphorを選んだ           |
| [Phosphor](https://github.com/phosphor-icons/core) | thin・light・regular・bold・fill・duotoneのSVG配布、MIT | Hiraginoの見出し・操作文字とboldを組み合わせられ、道具の種類にも展開できる             |

これはライブラリの一般的な優劣ではなく、Plyの文字と画面に対する設計判断。編集画面の保存・書く・読み返す・比較で描画を確認した。現時点でウェイトを画面ごとに混在させない。アイコンだけで意味を伝えず、操作名を隣に置く。

## 実装

- `src/icon-manifest.json`で必要な11個だけを指定。2026-09-11に削除操作のtrashを追加。`vp run icons:build`で公式SVGの形状を変更せずsymbol化する。
- `Icon`は外部SVGの`<use>`を出力。各出現箇所にpathを埋め込まない。アイコン用のブラウザJavaScriptは不要。
- `dist/icons.svg`を同一オリジンへ配置する。既定URLは`/assets/ply-icons.svg`。配置先を変える場合は`<Icon name="pencil" sprite="/static/icons.svg" />`。
- 同じURLを参照するため共通リソースとしてキャッシュでき、HTMLの重複も減る。実際のキャッシュ期間は利用側のHTTPヘッダーで設定する。
- CSSだけの場合も`<svg class="ply-icon" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-pencil"></use></svg>`を使用できる。
- selectの矢印はHTML内へSVGを置けないため、同じPhosphorのcaretをCSSの外部背景画像として参照する。チェック・ラジオの状態描画はCSSで維持する。
- MITの著作権・許諾文をスプライト内と`dist/PHOSPHOR-LICENSE`へ同梱する。依存は生成時だけ必要。

外部スプライトのため、利用側ではSVGの同一オリジン配信とパスの設定が必要。JS無効時にも表示される。Chromium・Firefox・WebKitで実際の描画領域を確認する試験を追加した。
