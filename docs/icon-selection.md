# アイコンの選定と配布

Phosphor Icons 2.1.1のregularを共通で使用する。旧版のbold採用から変更した。

## 現行のサイズ規則

全アイコンの標準は1em、小型は6em/7。14pxの本文なら14px・12pxのSVG枠になる。アイコン名を判定する分岐、特定の絵だけを縮めるtransform、絵ごとのウェイト指定は置かない。大きい入口や空状態の図は、その役割の親要素がサイズを所有する。

Checkbox・TaskListは同じregularのSVGを14pxのmaskとして使う。Selectは小型の12px。外部SVGに元から含まれる余白があるため、SVG枠の寸法と実際の線の寸法は別である。ラジオの点・一部選択の横棒は状態図形としてCSSが所有する。Stepsの完了も文字の「✓」から共通Iconに統一した。

## 比較と判断

| 候補                                               | 公式資料で確認した特徴                                  | Plyへの判断                                                                            |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Lucide](https://github.com/lucide-icons/lucide)   | Feather由来の線画、SVG配布、ISC                         | 軽い線で揃える用途に向く。今回の太めの文字と道具の絵柄には、重さを選べる候補を優先した |
| [Tabler](https://github.com/tabler/tabler-icons)   | 24pxを基準にしたアイコン群、MIT                         | 操作アイコンとして有力。今回は同一の絵柄に複数ウェイトを持つPhosphorを選んだ           |
| [Phosphor](https://github.com/phosphor-icons/core) | thin・light・regular・bold・fill・duotoneのSVG配布、MIT | Hiraginoの見出し・操作文字とboldを組み合わせられ、道具の種類にも展開できる             |

上表は初回選定時の比較。9月16日は記号が本文より強く見えるという指摘を受け、全種をregularへ変更した。画面・絵柄ごとにウェイトを混在させない。アイコンだけで意味を伝えず、操作名を隣に置く。

## 実装

- `src/internal/icon-manifest.json`で必要な20個を指定。`vp run icons:build`で公式SVGの形状を変更せずsymbol化し、同じ素材を`src/css/assets/<名前>.svg`へも出力する。すべて同じ生成経路を使う。
- `Icon`は外部SVGの`<use>`を出力。各出現箇所にpathを埋め込まない。アイコン用のブラウザJavaScriptは不要。
- `dist/icons.svg`を同一オリジンへ配置する。既定URLは`/assets/ply-icons.svg`。配置先を変える場合は`<Icon name="pencil" sprite="/static/icons.svg" />`。
- 同じURLを参照するため共通リソースとしてキャッシュでき、HTMLの重複も減る。実際のキャッシュ期間は利用側のHTTPヘッダーで設定する。
- CSSだけの場合も`<svg class="ply-icon" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-pencil"></use></svg>`を使用できる。
- Selectの矢印はCSS背景、Checkboxの印はCSS maskとして同じ素材を参照する。SVG枠の大きさはその操作部品の規則で指定する。
- MITの著作権・許諾文をスプライト内と`dist/PHOSPHOR-LICENSE`へ同梱する。依存は生成時だけ必要。

外部スプライトのため、利用側ではSVGの同一オリジン配信とパスの設定が必要。JS無効時にも表示される。Chromium・Firefox・WebKitで実際の描画領域を確認する試験を追加した。
