# トークン

Plyの見た目は`--ply-*`のCSSカスタムプロパティで決まります。定義と現在の値は[tokens.css](../src/css/tokens.css)にあり、この文書では値を複製せず、種類と使い方を説明します。

基本色（primitive）から用途のトークンを参照し、必要なコンポーネントだけが専用のトークンを持ちます。利用側で色や大きさを変える時は、用途のトークンを上書きします。

## 色

| 種類     | 主なトークン                                                                                  | 使い方                                              |
| -------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 地と文字 | `--ply-background`、`--ply-surface`、`--ply-text`、`--ply-muted`、`--ply-ink`、`--ply-border` | 画面の地、紙、本文、淡い補足、太字の墨、罫線        |
| 主操作   | `--ply-brand`、`--ply-link`、`--ply-cover`                                                    | 主操作とリンクの青、見出しの層などの淡い青          |
| 状態     | `--ply-info`、`--ply-success`、`--ply-warning`、`--ply-danger`と各`-soft`                     | 知らせ・成功・注意・危険の文字と、その淡い面        |
| 印       | `--ply-mark`                                                                                  | 「今日」と文中の一致した語だけに使う蛍光ペンの黄    |
| 分類     | `--ply-blue`、`--ply-green`、`--ply-amber`、`--ply-coral`など                                 | Avatar・Tag・ActionListの`accent`などで明示した分類 |

背景・本文・リンク・状態の色は用途のトークンで指定します。コンポーネントの背景を変える場合は、利用側でもコントラストを確認してください。

## 塗りと影

| 種類 | 主なトークン                                                        | 使い方                                      |
| ---- | ------------------------------------------------------------------- | ------------------------------------------- |
| 塗り | `--ply-fill-control`                                                | 押す物の縦の淡い陰影                        |
|      | `--ply-fill-primary`、`--ply-fill-danger`、`--ply-fill-success`など | 主操作・危険などの135度の塗り               |
|      | `--ply-emphasis-*`                                                  | 「ここを見て」の面と印                      |
|      | `--ply-fill-menu`                                                   | 操作のメニューとToastの青の面               |
| 影   | `--ply-shadow-paper`、`--ply-shadow-paper-lift`                     | 紙、持ち上げた紙                            |
|      | `--ply-shadow-menu`                                                 | 浮かぶ物（メニュー・ダイアログ・Toastなど） |
|      | `--ply-shadow-sheet`                                                | 作業面                                      |
|      | `--ply-shadow-input`、`--ply-shadow-sunken`                         | 欄の内側の沈み、溝や層の受け皿              |
|      | `--ply-shadow-control*`                                             | 押す物の普段・指を載せた時・押した時        |
| 輪   | `--ply-focus-ring`                                                  | 欄・Switch・選択肢のフォーカス              |

## 書体

- 本文は`--ply-font`（Hiragino Sans優先、無い環境はシステムフォント）を使います。
- 操作コンポーネント（Button・Input・InputGroup・DatePickerなど）は`--ply-control-font-family`を共有します。欧文をHelvetica Neue／Arial、和文をHiraginoで表示し、両者の行メトリクスをそろえて、文字が枠の中で上下の中央に見えるようにしています。フォントのダウンロードは行わず、該当するローカル書体が無い環境ではシステムフォントへフォールバックします。
- 文字の大きさは`--ply-small`・`--ply-label`・`--ply-body`・`--ply-section-title`・`--ply-title`の五段です。画面幅に合わせて範囲の中で連続して変わります。行高は`--ply-leading`・`--ply-label-leading`・`--ply-small-leading`です。

## 大きさと角丸

- 余白の段は`--ply-space-1`（4px）〜`--ply-space-18`（72px）で、番号×4pxの大きさです。
- 操作の高さは`--ply-control-size`（36px）です。Buttonは`--ply-button-font`の文字の大きさを基準に、高さと余白をemで追従させます（通常36px、`size="large"`は40px）。
- 角丸は`--ply-radius-mark`（4px）・`--ply-radius-control`（8px）・`--ply-radius-field`（12px）・`--ply-radius-surface`（16px）・`--ply-radius-sheet`（30px）・`--ply-radius-pill`です。使い分けは[デザインの原則](principles.md#形)を参照してください。
- 作業面の最大幅は`--ply-page`、読む本文の行の長さは`--ply-measure`です。

## 動き

- `--ply-duration`を基準に、出入りの`--ply-duration-pop`・`--ply-duration-out`・`--ply-duration-fade`が決まります。緩急は`--ply-ease-pop`・`--ply-ease-slide`です。
- `prefers-reduced-motion: reduce`の環境では`--ply-duration`が0になり、動きを止めます。

## テーマ

現在はライトテーマのみを提供しています。
