# 全コンポーネントの余白と採用基準

ユーザーの9月15日夜の指摘に対応した現行ソースの棚卸しです。以前の値には採用理由の記録が不足していました。過去にこの理由で決めたと遡って断定せず、今回、残す値・直す値の判断基準を明文化しています。

## 読み方と対象

- 全82 CSSファイルのgap、row-gap、column-gap、margin、padding、scroll-margin、scroll-padding、border-spacing、insetを抽出しました。該当宣言は752件です。省略した状態別・メディア・コンテナ条件はありません。
- CSSの生の宣言、ネストしたセレクタの階層、条件、ソース位置を掲載します。→は親ルールから子ルールへの経路であり、結合済みCSSセレクタではありません。
- 換算はroot 16pxのremだけです。emはその要素の文字サイズ、lhはその要素の行高、%は包含ブロック、autoは残り幅に依存します。条件外の値や文字拡大時まで同じpxと断定しません。gap二値は縦・横、論理padding二値は開始・終了の順です。
- 同じ要素の状態別上書きを足し合わせないでください。最終値はレイヤー・詳細度・条件・記述順で決まります。0も、追加しない判断として全件掲載します。
- Field配下のInput、Textarea、Select、Choice、PasswordField、CountedTextarea、Combobox、CheckboxGroup、NumberField、DateField、TimeFieldはfield.cssとそれぞれの追加CSSの節に含みます。
- 4pxは直近の補足、6pxは入力ラベル/タグの横、8pxは同じ操作・同じ行、12pxは小さな枠の内側、16pxは異なる役割、20pxはカードの左右、24pxは章、32pxはフォーム群、48pxは大区分。例外の文字比率・境界差分は各部品で説明します。これは観測から導いた自然法則ではなくPlyの設計判断です。
- 余白を持つ親はGrid/Flexのgap、文章の前後関係はmargin-block-start、部品自身の内側はpaddingを所有します。違う軸で同じ値を使うこと自体は目的にしません。

## CSS外の配置計算

DropdownMenu・DatePickerの位置計算は起点から4px、画面端から8pxを確保します。[menuPosition](../src/controllers/dropdown-menu-position.ts)を共用します。PopoverのCSSアンカーの4pxとフォールバックも同じ基準です。Boardのドラッグ表示は指・ポインターを隠さないため12pxずらします。32pxの端判定・1フレーム10pxのスクロールは操作の閾値と速度であり、レイアウトgapではありません。

生成: `vp run docs:spacing`。宣言を変更したら再生成します。

## base

基礎の文字と背景のみを所有する。ここには部品のgap・margin・paddingを置かない。

対象: [src/css/base.css](../src/css/base.css)

| ソース                         | セレクタの階層                                                                                                                                                                                             | 条件 | 宣言値                   | root 16pxでremを換算 | 値の扱い                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------ | -------------------- | -------------------------------------------------------- |
| [L43](../src/css/base.css#L43) | `:where(     .ply-card > .title > a,     .ply-table > table > tbody > tr > :is(th, td) > a:only-child,     .ply-data-list > li > .body > a.title,     .ply-file-item > .body > .title > a   ) → &::before` | 常時 | `inset-block: -0.375rem` | `-6px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。 |
| [L44](../src/css/base.css#L44) | `:where(     .ply-card > .title > a,     .ply-table > table > tbody > tr > :is(th, td) > a:only-child,     .ply-data-list > li > .body > a.title,     .ply-file-item > .body > .title > a   ) → &::before` | 常時 | `inset-inline: -0.25rem` | `-4px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。 |

## action-list

移動先の一覧。行内はアイコンと題名を8px、題名と説明を2pxで結ぶ。縦12pxは二行の入口を読み分ける内側の余白。プレビューは本文と4px、境界の前後は8px。カード表示の外側12pxは隣の入口との区切りで、情報内の8pxより一段広くする。

対象: [src/css/components/action-list.css](../src/css/components/action-list.css)

| ソース                                             | セレクタの階層                                                 | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------------- | -------------------------------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L4](../src/css/components/action-list.css#L4)     | `.ply-action-list`                                             | 常時 | `gap: var(--ply-space-1)`                | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L6](../src/css/components/action-list.css#L6)     | `.ply-action-list`                                             | 常時 | `margin: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L7](../src/css/components/action-list.css#L7)     | `.ply-action-list`                                             | 常時 | `padding: 0`                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L19](../src/css/components/action-list.css#L19)   | `.ply-action-list → & > li → & > a`                            | 常時 | `gap: 0.125rem var(--ply-space-2)`       | `2px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L22](../src/css/components/action-list.css#L22)   | `.ply-action-list → & > li → & > a`                            | 常時 | `padding-block: var(--ply-space-2)`      | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L23](../src/css/components/action-list.css#L23)   | `.ply-action-list → & > li → & > a`                            | 常時 | `padding-inline: var(--ply-space-4)`     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L65](../src/css/components/action-list.css#L65)   | `.ply-action-list → & > li → & > a → & > .preview`             | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L68](../src/css/components/action-list.css#L68)   | `.ply-action-list → & > li → & > a → & > .preview → & > * + *` | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L103](../src/css/components/action-list.css#L103) | `.ply-action-list → &[data-layout="grid"]`                     | 常時 | `gap: var(--ply-space-3)`                | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## app-shell

中央の移動と作業面。上部操作内は8px、バーの内側は縦12px・横16px。作業面のまとまりは24px、ページ末尾32pxは最後の操作とブラウザ端を分ける。狭幅の横8pxは操作幅を残すための明示的な例外。

対象: [src/css/components/app-shell.css](../src/css/components/app-shell.css)

| ソース                                         | セレクタの階層                                      | 条件                                           | 宣言値                                  | root 16pxでremを換算 | 値の扱い                                                   |
| ---------------------------------------------- | --------------------------------------------------- | ---------------------------------------------- | --------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L7](../src/css/components/app-shell.css#L7)   | `.ply-app-shell`                                    | 常時                                           | `gap: var(--ply-space-2)`               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L10](../src/css/components/app-shell.css#L10) | `.ply-app-shell`                                    | 常時                                           | `padding-block-end: var(--ply-space-8)` | `32px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L15](../src/css/components/app-shell.css#L15) | `.ply-app-shell → & > .bar`                         | 常時                                           | `inset-block-start: 0`                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L20](../src/css/components/app-shell.css#L20) | `.ply-app-shell → & > .bar`                         | 常時                                           | `gap: var(--ply-space-2)`               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L23](../src/css/components/app-shell.css#L23) | `.ply-app-shell → & > .bar`                         | 常時                                           | `padding-block: var(--ply-space-3)`     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L24](../src/css/components/app-shell.css#L24) | `.ply-app-shell → & > .bar`                         | 常時                                           | `padding-inline: var(--ply-space-4)`    | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L30](../src/css/components/app-shell.css#L30) | `.ply-app-shell → & > .bar → & > :is(.start, .end)` | 常時                                           | `gap: var(--ply-space-2)`               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L51](../src/css/components/app-shell.css#L51) | `.ply-app-shell → & > .workspace`                   | 常時                                           | `gap: var(--ply-space-6)`               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L54](../src/css/components/app-shell.css#L54) | `.ply-app-shell → & > .workspace`                   | 常時                                           | `padding-block: var(--ply-space-6)`     | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L55](../src/css/components/app-shell.css#L55) | `.ply-app-shell → & > .workspace`                   | 常時                                           | `padding-inline: var(--ply-space-6)`    | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L63](../src/css/components/app-shell.css#L63) | `.ply-app-shell → & > .workspace`                   | @container ply-app-shell (inline-size < 45rem) | `padding-block: var(--ply-space-6)`     | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L64](../src/css/components/app-shell.css#L64) | `.ply-app-shell → & > .workspace`                   | @container ply-app-shell (inline-size < 45rem) | `padding-inline: var(--ply-space-4)`    | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L67](../src/css/components/app-shell.css#L67) | `.ply-app-shell → & > .bar`                         | @container ply-app-shell (inline-size < 45rem) | `padding-inline: var(--ply-space-2)`    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## avatar

略称の文字が円の端に触れないよう横4px。本文に添えるinlineサイズは幅自体が20pxなので横paddingを0にする。Avatar同士や名前との距離は配置側が所有する。

対象: [src/css/components/avatar.css](../src/css/components/avatar.css)

| ソース                                      | セレクタの階層                                        | 条件 | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------- | ----------------------------------------------------- | ---- | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L41](../src/css/components/avatar.css#L41) | `.ply-avatar → & > .initials`                         | 常時 | `padding-inline: var(--ply-space-1)` | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L47](../src/css/components/avatar.css#L47) | `.ply-avatar → & > img`                               | 常時 | `inset-block: 0`                     | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L48](../src/css/components/avatar.css#L48) | `.ply-avatar → & > img`                               | 常時 | `inset-inline: 0`                    | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L62](../src/css/components/avatar.css#L62) | `.ply-avatar → &[data-size="inline"] → & > .initials` | 常時 | `padding-inline: 0`                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## badge

13px/20pxの短い状態表示。上下2pxで高さ24px、左右8pxで短い文言を囲む。印と文言は6px。印の上余白は(行高−印の高さ)/2で先頭行の中心へ置き、複数行でも全体の中央へ移動しない。

対象: [src/css/components/badge.css](../src/css/components/badge.css)

| ソース                                     | セレクタの階層           | 条件 | 宣言値                                        | root 16pxでremを換算      | 値の扱い                                                   |
| ------------------------------------------ | ------------------------ | ---- | --------------------------------------------- | ------------------------- | ---------------------------------------------------------- |
| [L9](../src/css/components/badge.css#L9)   | `.ply-badge`             | 常時 | `gap: 0.375rem`                               | `6px`                     | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/badge.css#L11) | `.ply-badge`             | 常時 | `padding-block: 0.125rem`                     | `2px`                     | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L12](../src/css/components/badge.css#L12) | `.ply-badge`             | 常時 | `padding-inline: 0.5rem`                      | `8px`                     | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L30](../src/css/components/badge.css#L30) | `.ply-badge → &::before` | 常時 | `margin-block-start: calc((1lh - 0.4em) / 2)` | `calc((1lh - 0.4em) / 2)` | 最初の行の高さと印の高さの差から揃える。                   |

## board-item

任意の内容と持ち手の共通枠。枠内8px、本文と持ち手4px。本文側の上下6pxは20pxの先頭行を32pxの持ち手と同じ中心に置く差分。touchでは44pxの持ち手に対して本文上下12pxとする。Buttonの文字は上書きしない。本文内の独立した子同士は8px。

対象: [src/css/components/board-item.css](../src/css/components/board-item.css)

| ソース                                          | セレクタの階層                            | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------------- | ----------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L6](../src/css/components/board-item.css#L6)   | `.ply-board-item`                         | 常時 | `gap: var(--ply-space-1)`                | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L8](../src/css/components/board-item.css#L8)   | `.ply-board-item`                         | 常時 | `padding-block: var(--ply-space-2)`      | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L9](../src/css/components/board-item.css#L9)   | `.ply-board-item`                         | 常時 | `padding-inline: var(--ply-space-4)`     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L16](../src/css/components/board-item.css#L16) | `.ply-board-item → & > .body`             | 常時 | `padding-block: 0.375rem`                | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L19](../src/css/components/board-item.css#L19) | `.ply-board-item → & > .body → & > * + *` | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L22](../src/css/components/board-item.css#L22) | `.ply-board-item → & > .body → & > h4`    | 常時 | `margin: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |

## board

列間16px、列の内側8px、項目間8px。見出しと項目は12pxで区切る。上4px・下12pxは枠と影がスクロール領域で切れないため。空列の内側16px/12pxはドロップ先を認識できる面積を取る。移動プレビューは8px/12pxでラベルを囲む。

対象: [src/css/components/board.css](../src/css/components/board.css)

| ソース                                       | セレクタの階層                                       | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------- | ---------------------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L8](../src/css/components/board.css#L8)     | `.ply-board`                                         | 常時 | `gap: var(--ply-space-4)`                              | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L11](../src/css/components/board.css#L11)   | `.ply-board`                                         | 常時 | `padding-block: var(--ply-space-1) var(--ply-space-3)` | `4px 12px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L19](../src/css/components/board.css#L19)   | `.ply-board → & > section`                           | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L21](../src/css/components/board.css#L21)   | `.ply-board → & > section`                           | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L47](../src/css/components/board.css#L47)   | `.ply-board → & > section → & > .title`              | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L58](../src/css/components/board.css#L58)   | `.ply-board → & > section → & > .title → & > .label` | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L59](../src/css/components/board.css#L59)   | `.ply-board → & > section → & > .title → & > .label` | 常時 | `padding-block: 0.0625rem`                             | `1px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L60](../src/css/components/board.css#L60)   | `.ply-board → & > section → & > .title → & > .label` | 常時 | `padding-inline: 0.375rem`                             | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L82](../src/css/components/board.css#L82)   | `.ply-board → & > section → & > .empty`              | 常時 | `margin-block-start: var(--ply-space-3)`               | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L83](../src/css/components/board.css#L83)   | `.ply-board → & > section → & > .empty`              | 常時 | `padding-block: var(--ply-space-3)`                    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L84](../src/css/components/board.css#L84)   | `.ply-board → & > section → & > .empty`              | 常時 | `padding-inline: var(--ply-space-4)`                   | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L95](../src/css/components/board.css#L95)   | `.ply-board → & > section → & > .items`              | 常時 | `margin-block-start: var(--ply-space-3)`               | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L97](../src/css/components/board.css#L97)   | `.ply-board → & > section → & > .items → & > * + *`  | 常時 | `margin-block-start: var(--ply-space-2)`               | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L106](../src/css/components/board.css#L106) | `.ply-board → & > .drag-preview`                     | 常時 | `inset-block-start: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L107](../src/css/components/board.css#L107) | `.ply-board → & > .drag-preview`                     | 常時 | `inset-inline-start: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L112](../src/css/components/board.css#L112) | `.ply-board → & > .drag-preview`                     | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L113](../src/css/components/board.css#L113) | `.ply-board → & > .drag-preview`                     | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## breadcrumb

階層間は8px。折り返した行間は4pxで、一つの移動経路として読めるよう横より狭くする。リストの既定paddingは0にし、親のContextBarが外側を所有する。

対象: [src/css/components/breadcrumb.css](../src/css/components/breadcrumb.css)

| ソース                                          | セレクタの階層                                  | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------------- | ----------------------------------------------- | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L10](../src/css/components/breadcrumb.css#L10) | `.ply-breadcrumb → & > ol`                      | 常時 | `gap: var(--ply-space-1) var(--ply-space-2)` | `4px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/breadcrumb.css#L11) | `.ply-breadcrumb → & > ol`                      | 常時 | `padding: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L17](../src/css/components/breadcrumb.css#L17) | `.ply-breadcrumb → & > ol > li`                 | 常時 | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L36](../src/css/components/breadcrumb.css#L36) | `.ply-breadcrumb → & > ol > li > a → &::before` | 常時 | `inset-block: -0.5rem`                       | `-8px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L37](../src/css/components/breadcrumb.css#L37) | `.ply-breadcrumb → & > ol > li > a → &::before` | 常時 | `inset-inline: -0.25rem`                     | `-4px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |

## button-group

接続した操作群。gapは0。隣接する1pxの枠線を−1pxで重ねて仕切りを1本にする。負の値は横の枠線に限り、文字の位置を補正するためには使わない。

対象: [src/css/components/button-group.css](../src/css/components/button-group.css)

| ソース                                            | セレクタの階層                                                                                                      | 条件 | 宣言値                            | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/button-group.css#L7)   | `.ply-button-group`                                                                                                 | 常時 | `gap: 0`                          | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L23](../src/css/components/button-group.css#L23) | `.ply-button-group → & > .ply-button:not(:first-child),     & > .ply-dropdown-menu:not(:first-child) > .ply-button` | 常時 | `margin-inline-start: -0.0625rem` | `-1px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## button

受け入れ済みの文字位置を維持する。上下paddingは0、中央配置とmin-block-sizeが高さを作る。左右は通常1em、compact 0.5em、large 1.1em。アイコンとの距離2em/7は14px文字で4px。linkの左右4em/7は14px文字で8px。アイコンだけなら左右0で正方形の最小幅を使う。

対象: [src/css/components/button.css](../src/css/components/button.css)

| ソース                                        | セレクタの階層                                                          | 条件 | 宣言値                          | root 16pxでremを換算 | 値の扱い                                           |
| --------------------------------------------- | ----------------------------------------------------------------------- | ---- | ------------------------------- | -------------------- | -------------------------------------------------- |
| [L10](../src/css/components/button.css#L10)   | `.ply-button,   :where(.ply-filter-bar > a)`                            | 常時 | `gap: calc(2em / 7)`            | `calc(2em / 7)`      | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L14](../src/css/components/button.css#L14)   | `.ply-button,   :where(.ply-filter-bar > a)`                            | 常時 | `padding-block: 0`              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |
| [L15](../src/css/components/button.css#L15)   | `.ply-button,   :where(.ply-filter-bar > a)`                            | 常時 | `padding-inline: 1em`           | `1em`                | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L47](../src/css/components/button.css#L47)   | `.ply-button,   :where(.ply-filter-bar > a) → &[data-size="compact"]`   | 常時 | `padding-inline: 0.5em`         | `0.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L51](../src/css/components/button.css#L51)   | `.ply-button,   :where(.ply-filter-bar > a) → &[data-size="large"]`     | 常時 | `padding-inline: 1.1em`         | `1.1em`              | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L87](../src/css/components/button.css#L87)   | `.ply-button,   :where(.ply-filter-bar > a) → &[data-variant="link"]`   | 常時 | `padding-inline: calc(4em / 7)` | `calc(4em / 7)`      | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L111](../src/css/components/button.css#L111) | `.ply-button,   :where(.ply-filter-bar > a) → &[data-icon-only="true"]` | 常時 | `padding-block: 0`              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |
| [L112](../src/css/components/button.css#L112) | `.ply-button,   :where(.ply-filter-bar > a) → &[data-icon-only="true"]` | 常時 | `padding-inline: 0`             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |

## calendar

月・週のセルは上8px・下4px・左右8pxにして日付から予定へ視線を流す。日付と予定、予定同士は4px。年のセルは4px、月初だけ月名のために上18pxを確保する。期間操作は上12px・下8pxで表と分け、年の横長グリッドは横スクロールを領域内で受ける。

対象: [src/css/components/calendar.css](../src/css/components/calendar.css)

| ソース                                          | セレクタの階層                                                                                                                               | 条件                      | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L12](../src/css/components/calendar.css#L12)   | `.ply-calendar → & > .controls`                                                                                                              | 常時                      | `gap: var(--ply-space-2) var(--ply-space-3)`           | `8px 12px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L13](../src/css/components/calendar.css#L13)   | `.ply-calendar → & > .controls`                                                                                                              | 常時                      | `padding-block: var(--ply-space-3) var(--ply-space-2)` | `12px 8px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L17](../src/css/components/calendar.css#L17)   | `.ply-calendar → & > .controls → & > h2`                                                                                                     | 常時                      | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L18](../src/css/components/calendar.css#L18)   | `.ply-calendar → & > .controls → & > h2`                                                                                                     | 常時                      | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L28](../src/css/components/calendar.css#L28)   | `.ply-calendar → & > .controls → & > .period`                                                                                                | 常時                      | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L42](../src/css/components/calendar.css#L42)   | `.ply-calendar → & > .controls → & > .actions`                                                                                               | 常時                      | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L58](../src/css/components/calendar.css#L58)   | `.ply-calendar → & > .viewport → & > table`                                                                                                  | 常時                      | `border-spacing: 0`                                    | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L67](../src/css/components/calendar.css#L67)   | `.ply-calendar → & > .viewport → & > table → & > caption`                                                                                    | 常時                      | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L73](../src/css/components/calendar.css#L73)   | `.ply-calendar → & > .viewport → & > table → & > thead > tr > th`                                                                            | 常時                      | `padding-block: var(--ply-space-2) var(--ply-space-1)` | `8px 4px`            | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L74](../src/css/components/calendar.css#L74)   | `.ply-calendar → & > .viewport → & > table → & > thead > tr > th`                                                                            | 常時                      | `padding-inline: var(--ply-space-2)`                   | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L87](../src/css/components/calendar.css#L87)   | `.ply-calendar → & > .viewport → & > table → & > tbody > tr > td`                                                                            | 常時                      | `padding-block: var(--ply-space-2) var(--ply-space-1)` | `8px 4px`            | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L88](../src/css/components/calendar.css#L88)   | `.ply-calendar → & > .viewport → & > table → & > tbody > tr > td`                                                                            | 常時                      | `padding-inline: var(--ply-space-2)`                   | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L156](../src/css/components/calendar.css#L156) | `.ply-calendar → & > .viewport → & > table → & > tbody > tr > td → & > .ply-tag-group`                                                       | 常時                      | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L158](../src/css/components/calendar.css#L158) | `.ply-calendar → & > .viewport → & > table → & > tbody > tr > td → & > .ply-tag-group`                                                       | 常時                      | `margin-block-start: var(--ply-space-1)`               | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L176](../src/css/components/calendar.css#L176) | `.ply-calendar → &[data-view="week"] > .viewport > table > tbody > tr > td → & > .weekday`                                                   | 常時                      | `padding-block-end: var(--ply-space-1)`                | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L200](../src/css/components/calendar.css#L200) | `.ply-calendar → & > .year-overview`                                                                                                         | 常時                      | `padding-block: var(--ply-space-3)`                    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L216](../src/css/components/calendar.css#L216) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day`                                                                        | 常時                      | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L217](../src/css/components/calendar.css#L217) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day`                                                                        | 常時                      | `padding-inline: var(--ply-space-1)`                   | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L223](../src/css/components/calendar.css#L223) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → &[data-month-start="true"]`                                           | 常時                      | `padding-block-start: 1.125rem`                        | `18px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L231](../src/css/components/calendar.css#L231) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .month-link`                                                      | 常時                      | `inset: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L246](../src/css/components/calendar.css#L246) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .month-label,           & > .month-link > .month-label`           | 常時                      | `inset-block-start: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L247](../src/css/components/calendar.css#L247) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .month-label,           & > .month-link > .month-label`           | 常時                      | `inset-inline-start: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L249](../src/css/components/calendar.css#L249) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .month-label,           & > .month-link > .month-label`           | 常時                      | `padding-block: 0.0625rem`                             | `1px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L250](../src/css/components/calendar.css#L250) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .month-label,           & > .month-link > .month-label`           | 常時                      | `padding-inline: var(--ply-space-1)`                   | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L261](../src/css/components/calendar.css#L261) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .date-link`                                                       | 常時                      | `inset: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L265](../src/css/components/calendar.css#L265) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .date-link`                                                       | 常時                      | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L266](../src/css/components/calendar.css#L266) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .date-link`                                                       | 常時                      | `padding-inline: var(--ply-space-1)`                   | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L285](../src/css/components/calendar.css#L285) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > time,           & > .date-link > time`                            | 常時                      | `gap: 0.125rem`                                        | `2px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L302](../src/css/components/calendar.css#L302) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .event-mark`                                                      | 常時                      | `inset-block-end: var(--ply-space-1)`                  | `4px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L303](../src/css/components/calendar.css#L303) | `.ply-calendar → & > .year-overview → & > .year-grid → & > .year-day → & > .event-mark`                                                      | 常時                      | `inset-inline-end: var(--ply-space-1)`                 | `4px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L329](../src/css/components/calendar.css#L329) | `.ply-calendar → & > .agenda`                                                                                                                | 常時                      | `gap: var(--ply-space-3)`                              | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L330](../src/css/components/calendar.css#L330) | `.ply-calendar → & > .agenda`                                                                                                                | 常時                      | `padding-block: var(--ply-space-3)`                    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L335](../src/css/components/calendar.css#L335) | `.ply-calendar → & > .agenda → & > .agenda-group`                                                                                            | 常時                      | `gap: var(--ply-space-4)`                              | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L338](../src/css/components/calendar.css#L338) | `.ply-calendar → & > .agenda → & > .agenda-group → & > h3`                                                                                   | 常時                      | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L339](../src/css/components/calendar.css#L339) | `.ply-calendar → & > .agenda → & > .agenda-group → & > h3`                                                                                   | 常時                      | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L355](../src/css/components/calendar.css#L355) | `.ply-calendar → & > .empty`                                                                                                                 | 常時                      | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L356](../src/css/components/calendar.css#L356) | `.ply-calendar → & > .empty`                                                                                                                 | 常時                      | `padding-block: var(--ply-space-6)`                    | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L377](../src/css/components/calendar.css#L377) | `.ply-calendar → & > .agenda > .agenda-group`                                                                                                | @media (max-width: 40rem) | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L382](../src/css/components/calendar.css#L382) | `.ply-calendar → & > .agenda.period-agenda → & > .agenda-heading`                                                                            | @media (max-width: 40rem) | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L391](../src/css/components/calendar.css#L391) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table`                                                      | @media (max-width: 40rem) | `border-spacing: 0`                                    | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L393](../src/css/components/calendar.css#L393) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table → & > thead > tr > th`                                | @media (max-width: 40rem) | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L394](../src/css/components/calendar.css#L394) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table → & > thead > tr > th`                                | @media (max-width: 40rem) | `padding-inline: 0`                                    | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L400](../src/css/components/calendar.css#L400) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table → & > tbody > tr > td`                                | @media (max-width: 40rem) | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L413](../src/css/components/calendar.css#L413) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table → & > tbody > tr > td → &[data-events="true"]::after` | @media (max-width: 40rem) | `inset-block-end: var(--ply-space-1)`                  | `4px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L414](../src/css/components/calendar.css#L414) | `.ply-calendar → &:is([data-view="month"], [data-view="week"]) > .viewport → & > table → & > tbody > tr > td → &[data-events="true"]::after` | @media (max-width: 40rem) | `inset-inline-start: calc(50% - 0.125rem)`             | `calc(50% - 2px)`    | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L429](../src/css/components/calendar.css#L429) | `.ply-calendar → &[data-view="week"] > .viewport > table → & > tbody > tr > td → & > .weekday`                                               | @media (max-width: 40rem) | `padding-block: var(--ply-space-1) 0`                  | `4px 0`              | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## card

通常の枠内16px、密な一覧は12px。題名直下の本文8px、直近の補足4px、プレビューと題名など異なる役割は12px、末尾の独立した操作は16px。meta内は8px。autoは任意の末尾要素だけを端へ寄せる。

対象: [src/css/components/card.css](../src/css/components/card.css)

| ソース                                      | セレクタの階層                                           | 条件 | 宣言値                                    | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------- | -------------------------------------------------------- | ---- | ----------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/card.css#L7)     | `.ply-card`                                              | 常時 | `padding-block: var(--ply-space-3)`       | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L8](../src/css/components/card.css#L8)     | `.ply-card`                                              | 常時 | `padding-inline: var(--ply-space-4)`      | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L28](../src/css/components/card.css#L28)   | `.ply-card → & > .preview → & + :is(.title, .eyebrow)`   | 常時 | `margin-block-start: var(--ply-space-3)`  | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L40](../src/css/components/card.css#L40)   | `.ply-card → & > .eyebrow`                               | 常時 | `gap: var(--ply-space-2)`                 | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L44](../src/css/components/card.css#L44)   | `.ply-card → & > .eyebrow → & + .title`                  | 常時 | `margin-block-start: var(--ply-space-1)`  | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L61](../src/css/components/card.css#L61)   | `.ply-card → & > .body:not(:empty)`                      | 常時 | `margin-block-start: var(--ply-space-2)`  | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L64](../src/css/components/card.css#L64)   | `.ply-card → & > .body > * + *`                          | 常時 | `margin-block-start: var(--ply-space-2)`  | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L71](../src/css/components/card.css#L71)   | `.ply-card → & > .meta`                                  | 常時 | `gap: var(--ply-space-2)`                 | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L72](../src/css/components/card.css#L72)   | `.ply-card → & > .meta`                                  | 常時 | `margin-block-start: auto`                | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L73](../src/css/components/card.css#L73)   | `.ply-card → & > .meta`                                  | 常時 | `padding-block-start: var(--ply-space-4)` | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L78](../src/css/components/card.css#L78)   | `.ply-card → & > .meta → & > .end`                       | 常時 | `margin-inline-start: auto`               | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L86](../src/css/components/card.css#L86)   | `.ply-card → &:has(> .meta)`                             | 常時 | `padding-block-end: 0.625rem`             | `10px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L89](../src/css/components/card.css#L89)   | `.ply-card → &[data-density="compact"]`                  | 常時 | `padding-block: var(--ply-space-2)`       | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L90](../src/css/components/card.css#L90)   | `.ply-card → &[data-density="compact"]`                  | 常時 | `padding-inline: var(--ply-space-3)`      | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L92](../src/css/components/card.css#L92)   | `.ply-card → &[data-density="compact"] → &:has(> .meta)` | 常時 | `padding-block-end: 0.375rem`             | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L100](../src/css/components/card.css#L100) | `.ply-card → &[data-density="compact"] → & > .meta`      | 常時 | `padding-block-start: var(--ply-space-3)` | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## carousel

スライド間16pxを残して隣の面との境界を示す。操作の間は6px、スライドとの間は10px。中のCardとButtonの内側余白は各部品が所有する。

対象: [src/css/components/carousel.css](../src/css/components/carousel.css)

| ソース                                        | セレクタの階層                                                                                 | 条件                                          | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L19](../src/css/components/carousel.css#L19) | `.ply-carousel → & > .viewport > .slide > .ply-card:has(> .preview)`                           | 常時                                          | `column-gap: 1rem`                       | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L28](../src/css/components/carousel.css#L28) | `.ply-carousel → & > .viewport > .slide > .ply-card:has(> .preview) → & > .preview + .eyebrow` | 常時                                          | `margin-block-start: 0`                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L42](../src/css/components/carousel.css#L42) | `.ply-carousel → & > .controls`                                                                | 常時                                          | `gap: 0.375rem`                          | `6px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L43](../src/css/components/carousel.css#L43) | `.ply-carousel → & > .controls`                                                                | 常時                                          | `margin-block-start: 0.625rem`           | `10px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L49](../src/css/components/carousel.css#L49) | `.ply-carousel → & > .controls > .rotation`                                                    | 常時                                          | `margin-inline-start: 0.25rem`           | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L62](../src/css/components/carousel.css#L62) | `.ply-carousel → & > .viewport > .slide > .ply-card:has(> .preview) → & > .preview + .eyebrow` | @container ply-carousel (inline-size < 27rem) | `margin-block-start: var(--ply-space-3)` | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## chart-frame

図の面は上12px・下8px・左右16px。題名と補足は4px、図との間は8px。凡例の項目は12pxで分け、色印と文字は4pxで結ぶ。数値表は境界で分けて内側に余白を重ねない。

対象: [src/css/components/chart-frame.css](../src/css/components/chart-frame.css)

| ソース                                             | セレクタの階層                           | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------------- | ---------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/chart-frame.css#L4)     | `.ply-chart-frame`                       | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L7](../src/css/components/chart-frame.css#L7)     | `.ply-chart-frame`                       | 常時 | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L15](../src/css/components/chart-frame.css#L15)   | `.ply-chart-frame > figcaption`          | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L31](../src/css/components/chart-frame.css#L31)   | `.ply-chart-frame > .graphic`            | 常時 | `padding-block: var(--ply-space-3) var(--ply-space-2)` | `12px 8px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L32](../src/css/components/chart-frame.css#L32)   | `.ply-chart-frame > .graphic`            | 常時 | `padding-inline: var(--ply-space-4)`                   | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L45](../src/css/components/chart-frame.css#L45)   | `.ply-chart-frame > .graphic → & > svg`  | 常時 | `margin-inline: auto`                                  | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L52](../src/css/components/chart-frame.css#L52)   | `.ply-chart-frame > .legend`             | 常時 | `gap: var(--ply-space-3)`                              | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L53](../src/css/components/chart-frame.css#L53)   | `.ply-chart-frame > .legend`             | 常時 | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L54](../src/css/components/chart-frame.css#L54)   | `.ply-chart-frame > .legend`             | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L62](../src/css/components/chart-frame.css#L62)   | `.ply-chart-frame > .legend → & > li`    | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L87](../src/css/components/chart-frame.css#L87)   | `.ply-chart-frame > .data → & > summary` | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L101](../src/css/components/chart-frame.css#L101) | `.ply-chart-frame > .source`             | 常時 | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## code-block

外枠は1px、角丸8px。見出しは上下8px・左右12px、ラベルと操作のgap8px。コピーありの行はButton32px＋上下16px＝48px、タッチ時は44＋16＝60pxをJS起動前にも予約する。コード本文は上下12px・左右16px、既定marginは0。見出しと本文を1pxの境界で分け、28remを超える長文と長い行は領域内でスクロールする。コピー結果は共通Toastで浮かせ、本文へ余白を足さない。

対象: [src/css/components/code-block.css](../src/css/components/code-block.css)

| ソース                                          | セレクタの階層                     | 条件 | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------------- | ---------------------------------- | ---- | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/code-block.css#L4)   | `.ply-code-block`                  | 常時 | `margin: 0`                          | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L12](../src/css/components/code-block.css#L12) | `.ply-code-block → & > figcaption` | 常時 | `gap: var(--ply-space-2)`            | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L13](../src/css/components/code-block.css#L13) | `.ply-code-block → & > figcaption` | 常時 | `padding-block: var(--ply-space-2)`  | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L14](../src/css/components/code-block.css#L14) | `.ply-code-block → & > figcaption` | 常時 | `padding-inline: var(--ply-space-3)` | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L31](../src/css/components/code-block.css#L31) | `.ply-code-block → & > pre`        | 常時 | `margin: 0`                          | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L32](../src/css/components/code-block.css#L32) | `.ply-code-block → & > pre`        | 常時 | `padding-block: var(--ply-space-3)`  | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L33](../src/css/components/code-block.css#L33) | `.ply-code-block → & > pre`        | 常時 | `padding-inline: var(--ply-space-4)` | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## color-picker

編集面は上14px・下12px・左右18pxのカード比率。色面と調整列は18px、スライダー同士は10px、ラベルと操作は2pxで近接させる。見本の印と文字は9px。狭幅では見本タグを次行に送って溢れを防ぐ。

対象: [src/css/components/color-picker.css](../src/css/components/color-picker.css)

| ソース                                              | セレクタの階層                                                                      | 条件                                               | 宣言値                                                                       | root 16pxでremを換算                                      | 値の扱い                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| [L12](../src/css/components/color-picker.css#L12)   | `.ply-color-picker`                                                                 | 常時                                               | `margin: 0`                                                                  | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L13](../src/css/components/color-picker.css#L13)   | `.ply-color-picker`                                                                 | 常時                                               | `padding: 0`                                                                 | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L18](../src/css/components/color-picker.css#L18)   | `.ply-color-picker → & > legend`                                                    | 常時                                               | `padding: 0`                                                                 | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L26](../src/css/components/color-picker.css#L26)   | `.ply-color-picker → & > .editor`                                                   | 常時                                               | `gap: 1.125rem`                                                              | `18px`                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L28](../src/css/components/color-picker.css#L28)   | `.ply-color-picker → & > .editor`                                                   | 常時                                               | `padding-block: 0.875rem 0.75rem`                                            | `14px 12px`                                               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L29](../src/css/components/color-picker.css#L29)   | `.ply-color-picker → & > .editor`                                                   | 常時                                               | `padding-inline: 1.125rem`                                                   | `18px`                                                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L49](../src/css/components/color-picker.css#L49)   | `.ply-color-picker → & > .editor > .visual > .area`                                 | 常時                                               | `padding: 0`                                                                 | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L65](../src/css/components/color-picker.css#L65)   | `.ply-color-picker → & > .editor > .visual > .area > .cursor`                       | 常時                                               | `inset-inline-start: calc(var(--color-picker-saturation, 0.68) * 100%)`      | `calc(var(--color-picker-saturation, 0.68) * 100%)`       | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L66](../src/css/components/color-picker.css#L66)   | `.ply-color-picker → & > .editor > .visual > .area > .cursor`                       | 常時                                               | `inset-block-start: calc((1 - var(--color-picker-brightness, 0.84)) * 100%)` | `calc((1 - var(--color-picker-brightness, 0.84)) * 100%)` | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L83](../src/css/components/color-picker.css#L83)   | `.ply-color-picker → & > .editor > .visual > .preview`                              | 常時                                               | `gap: 0.5625rem`                                                             | `9px`                                                     | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L85](../src/css/components/color-picker.css#L85)   | `.ply-color-picker → & > .editor > .visual > .preview`                              | 常時                                               | `margin-block-start: 0.625rem`                                               | `10px`                                                    | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L104](../src/css/components/color-picker.css#L104) | `.ply-color-picker → & > .editor > .visual > .preview > .swatch::after`             | 常時                                               | `inset: 0`                                                                   | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L117](../src/css/components/color-picker.css#L117) | `.ply-color-picker → & > .editor > .channels`                                       | 常時                                               | `gap: 0.625rem`                                                              | `10px`                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L121](../src/css/components/color-picker.css#L121) | `.ply-color-picker → & > .editor > .channels > .ply-field`                          | 常時                                               | `gap: 0.125rem`                                                              | `2px`                                                     | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L125](../src/css/components/color-picker.css#L125) | `.ply-color-picker → & > .editor > .channels > .ply-field > .ply-range > .controls` | 常時                                               | `margin-block-start: 0`                                                      | `0`                                                       | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L221](../src/css/components/color-picker.css#L221) | `.ply-color-picker > .editor > .channels`                                           | @container ply-color-picker (inline-size >= 28rem) | `column-gap: 1.125rem`                                                       | `18px`                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L238](../src/css/components/color-picker.css#L238) | `.ply-color-picker > .editor`                                                       | @container ply-color-picker (inline-size >= 38rem) | `gap: 1.375rem`                                                              | `22px`                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## command-menu

パネルは上16px・左右autoの中央配置。横幅は最大480px、画面端へ最低8px。見出しは上下8px・左右12px、見出しと閉じる操作のgap8px。主要入口は列間12px、図と文字の間6px、上下12px・左右4px。検索は上12px・下8px・左右12px。一覧はグループ上8px・横12px、別グループの前12px、行間4px。リンク行は16px/24pxに上下4pxを足した32px。行の角丸8pxはNavigationと共通。操作案内は上下8px・左右12px、案内同士は縦8px・横16px、キーと動詞の間4px。ButtonとKeycap自身の寸法は各部品が所有する。

対象: [src/css/components/command-menu.css](../src/css/components/command-menu.css)

| ソース                                              | セレクタの階層                                                                                                   | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L23](../src/css/components/command-menu.css#L23)   | `.ply-command-menu → & > .panel`                                                                                 | 常時 | `inset-block: var(--ply-space-4) auto`                 | `16px auto`          | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L24](../src/css/components/command-menu.css#L24)   | `.ply-command-menu → & > .panel`                                                                                 | 常時 | `inset-inline: 0`                                      | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L30](../src/css/components/command-menu.css#L30)   | `.ply-command-menu → & > .panel`                                                                                 | 常時 | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L31](../src/css/components/command-menu.css#L31)   | `.ply-command-menu → & > .panel`                                                                                 | 常時 | `margin-inline: auto`                                  | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L32](../src/css/components/command-menu.css#L32)   | `.ply-command-menu → & > .panel`                                                                                 | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L51](../src/css/components/command-menu.css#L51)   | `.ply-command-menu → & > .panel → & > .heading`                                                                  | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L53](../src/css/components/command-menu.css#L53)   | `.ply-command-menu → & > .panel → & > .heading`                                                                  | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L54](../src/css/components/command-menu.css#L54)   | `.ply-command-menu → & > .panel → & > .heading`                                                                  | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L65](../src/css/components/command-menu.css#L65)   | `.ply-command-menu → & > .panel → & > .shortcuts`                                                                | 常時 | `gap: var(--ply-space-3)`                              | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L66](../src/css/components/command-menu.css#L66)   | `.ply-command-menu → & > .panel → & > .shortcuts`                                                                | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L87](../src/css/components/command-menu.css#L87)   | `.ply-command-menu → & > .panel → & > .shortcuts → & > .shortcut → & > .link`                                    | 常時 | `gap: 0.375rem`                                        | `6px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L89](../src/css/components/command-menu.css#L89)   | `.ply-command-menu → & > .panel → & > .shortcuts → & > .shortcut → & > .link`                                    | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L90](../src/css/components/command-menu.css#L90)   | `.ply-command-menu → & > .panel → & > .shortcuts → & > .shortcut → & > .link`                                    | 常時 | `padding-inline: var(--ply-space-4)`                   | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L123](../src/css/components/command-menu.css#L123) | `.ply-command-menu → & > .panel → & > .search`                                                                   | 常時 | `padding-block: var(--ply-space-3) var(--ply-space-2)` | `12px 8px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L124](../src/css/components/command-menu.css#L124) | `.ply-command-menu → & > .panel → & > .search`                                                                   | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L128](../src/css/components/command-menu.css#L128) | `.ply-command-menu → & > .panel → & > .results`                                                                  | 常時 | `padding-block-end: var(--ply-space-3)`                | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L130](../src/css/components/command-menu.css#L130) | `.ply-command-menu → & > .panel → & > .results → & > .group`                                                     | 常時 | `padding-block-start: var(--ply-space-2)`              | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L131](../src/css/components/command-menu.css#L131) | `.ply-command-menu → & > .panel → & > .results → & > .group`                                                     | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L133](../src/css/components/command-menu.css#L133) | `.ply-command-menu → & > .panel → & > .results → & > .group → & + .group`                                        | 常時 | `margin-block-start: var(--ply-space-3)`               | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L143](../src/css/components/command-menu.css#L143) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list`                                         | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L144](../src/css/components/command-menu.css#L144) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list`                                         | 常時 | `margin-block-start: var(--ply-space-1)`               | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L145](../src/css/components/command-menu.css#L145) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list`                                         | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L168](../src/css/components/command-menu.css#L168) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list → & > .entry → & > .link`                | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L171](../src/css/components/command-menu.css#L171) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list → & > .entry → & > .link`                | 常時 | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L172](../src/css/components/command-menu.css#L172) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list → & > .entry → & > .link`                | 常時 | `padding-inline: var(--ply-space-2)`                   | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L202](../src/css/components/command-menu.css#L202) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list → & > .entry → & > .link → & > .current` | 常時 | `margin-inline-start: auto`                            | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L215](../src/css/components/command-menu.css#L215) | `.ply-command-menu → & > .panel → & > .results → & > .group → & > .list → & > .entry → & > .command`             | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L227](../src/css/components/command-menu.css#L227) | `.ply-command-menu → & > .panel → & > .results → & > .empty`                                                     | 常時 | `padding-block: var(--ply-space-6)`                    | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L228](../src/css/components/command-menu.css#L228) | `.ply-command-menu → & > .panel → & > .results → & > .empty`                                                     | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L236](../src/css/components/command-menu.css#L236) | `.ply-command-menu → & > .panel → & > .help`                                                                     | 常時 | `gap: var(--ply-space-2) var(--ply-space-4)`           | `8px 16px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L237](../src/css/components/command-menu.css#L237) | `.ply-command-menu → & > .panel → & > .help`                                                                     | 常時 | `padding-block: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L238](../src/css/components/command-menu.css#L238) | `.ply-command-menu → & > .panel → & > .help`                                                                     | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L247](../src/css/components/command-menu.css#L247) | `.ply-command-menu → & > .panel → & > .help → & > .hint`                                                         | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## comparison

比較の両側へ同じ12pxを入れ、変更の有無でpaddingを変えない。共有枠内の列間gapは0、境界線で区切る。題名と比較枠8px、現在/変更後ラベルと値4px。入れ子も同じ基準で、幅に応じて縦へ並べる。

対象: [src/css/components/comparison.css](../src/css/components/comparison.css)

| ソース                                          | セレクタの階層                                                                   | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L13](../src/css/components/comparison.css#L13) | `.ply-comparison → & > .title`                                                   | 常時 | `gap: var(--ply-space-1) var(--ply-space-2)` | `4px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L25](../src/css/components/comparison.css#L25) | `.ply-comparison → & > .pair`                                                    | 常時 | `gap: 0`                                     | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L26](../src/css/components/comparison.css#L26) | `.ply-comparison → & > .pair`                                                    | 常時 | `margin-block-start: var(--ply-space-2)`     | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L33](../src/css/components/comparison.css#L33) | `.ply-comparison → & > .pair → & > :is(.before, .after)`                         | 常時 | `padding-block: var(--ply-space-3)`          | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L34](../src/css/components/comparison.css#L34) | `.ply-comparison → & > .pair → & > :is(.before, .after)`                         | 常時 | `padding-inline: var(--ply-space-4)`         | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L36](../src/css/components/comparison.css#L36) | `.ply-comparison → & > .pair → & > :is(.before, .after) → & > h4`                | 常時 | `margin: 0`                                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L43](../src/css/components/comparison.css#L43) | `.ply-comparison → & > .pair → & > :is(.before, .after) → & > .body`             | 常時 | `margin-block-start: var(--ply-space-1)`     | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L45](../src/css/components/comparison.css#L45) | `.ply-comparison → & > .pair → & > :is(.before, .after) → & > .body → & > * + *` | 常時 | `margin-block-start: var(--ply-space-2)`     | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## composer

入力面は上16px・下12px・左右20pxのカード比率。本文と操作群は8pxで区切り、操作同士も8px。入力自体の文字位置はFieldとButtonへ委ねる。

対象: [src/css/components/composer.css](../src/css/components/composer.css)

| ソース                                        | セレクタの階層                       | 条件                                          | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                   |
| --------------------------------------------- | ------------------------------------ | --------------------------------------------- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/composer.css#L5)   | `.ply-composer`                      | 常時                                          | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L7](../src/css/components/composer.css#L7)   | `.ply-composer`                      | 常時                                          | `padding-block: var(--ply-space-4) var(--ply-space-3)` | `16px 12px`          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L8](../src/css/components/composer.css#L8)   | `.ply-composer`                      | 常時                                          | `padding-inline: var(--ply-space-5)`                   | `20px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L22](../src/css/components/composer.css#L22) | `.ply-composer > .attachments`       | 常時                                          | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L24](../src/css/components/composer.css#L24) | `.ply-composer > .attachments`       | 常時                                          | `padding-block-start: var(--ply-space-2)`              | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L33](../src/css/components/composer.css#L33) | `.ply-composer > .footer`            | 常時                                          | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L39](../src/css/components/composer.css#L39) | `.ply-composer > .footer > .actions` | 常時                                          | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L40](../src/css/components/composer.css#L40) | `.ply-composer > .footer > .actions` | 常時                                          | `margin-inline-end: auto`                              | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L50](../src/css/components/composer.css#L50) | `.ply-composer > .footer > .actions` | @container ply-composer (inline-size < 26rem) | `margin-inline-end: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## context-bar

パンくずと補助操作の横間隔16px、折り返し時8px。バー内側は上下8px・左右16px。補助操作群内は8px。autoは補助操作を末端に置くためで、固定gapとは別。

対象: [src/css/components/context-bar.css](../src/css/components/context-bar.css)

| ソース                                           | セレクタの階層                    | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------------ | --------------------------------- | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L6](../src/css/components/context-bar.css#L6)   | `.ply-context-bar`                | 常時 | `gap: var(--ply-space-2) var(--ply-space-4)` | `8px 16px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L9](../src/css/components/context-bar.css#L9)   | `.ply-context-bar`                | 常時 | `padding-block: var(--ply-space-2)`          | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L10](../src/css/components/context-bar.css#L10) | `.ply-context-bar`                | 常時 | `padding-inline: var(--ply-space-4)`         | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L19](../src/css/components/context-bar.css#L19) | `.ply-context-bar → & > .actions` | 常時 | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L21](../src/css/components/context-bar.css#L21) | `.ply-context-bar → & > .actions` | 常時 | `margin-inline-start: auto`                  | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |

## danger-zone

通常領域との境界の後16px。影響の説明と操作は12pxで区切り、同じ操作群の中は8px。重大な操作だからといって操作部品自体の文字や高さを変えない。

対象: [src/css/components/danger-zone.css](../src/css/components/danger-zone.css)

| ソース                                           | セレクタの階層                | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------------ | ----------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/danger-zone.css#L5)   | `.ply-danger-zone`            | 常時 | `gap: var(--ply-space-3)`                              | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L7](../src/css/components/danger-zone.css#L7)   | `.ply-danger-zone`            | 常時 | `padding-block: var(--ply-space-4) var(--ply-space-3)` | `16px 12px`          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L8](../src/css/components/danger-zone.css#L8)   | `.ply-danger-zone`            | 常時 | `padding-inline: var(--ply-space-5)`                   | `20px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L21](../src/css/components/danger-zone.css#L21) | `.ply-danger-zone > .heading` | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L33](../src/css/components/danger-zone.css#L33) | `.ply-danger-zone > .body`    | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L45](../src/css/components/danger-zone.css#L45) | `.ply-danger-zone > .actions` | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## data-list

一覧行の内側8px。人物・内容・末尾の役割間は横12px、狭幅の折り返しは8px。本文と補足4px。複数列の対応が必要な配置では16px。一覧のインデントは0で、各行が内側を所有する。

対象: [src/css/components/data-list.css](../src/css/components/data-list.css)

| ソース                                         | セレクタの階層                                           | 条件                                            | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| ---------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L10](../src/css/components/data-list.css#L10) | `.ply-data-list → & > li`                                | 常時                                            | `gap: var(--ply-space-2) var(--ply-space-3)` | `8px 12px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L13](../src/css/components/data-list.css#L13) | `.ply-data-list → & > li`                                | 常時                                            | `padding-block: var(--ply-space-2)`          | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L14](../src/css/components/data-list.css#L14) | `.ply-data-list → & > li`                                | 常時                                            | `padding-inline: var(--ply-space-4)`         | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L34](../src/css/components/data-list.css#L34) | `.ply-data-list → & > li → & > .start`                   | 常時                                            | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L58](../src/css/components/data-list.css#L58) | `.ply-data-list → & > li → & > .body → & > .description` | 常時                                            | `margin-block-start: var(--ply-space-1)`     | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L63](../src/css/components/data-list.css#L63) | `.ply-data-list → & > li → & > .body → & > .meta`        | 常時                                            | `margin-block-start: var(--ply-space-1)`     | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L73](../src/css/components/data-list.css#L73) | `.ply-data-list → & > li → & > .end`                     | 常時                                            | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L90](../src/css/components/data-list.css#L90) | `.ply-data-list → & > li`                                | @container ply-data-list (inline-size >= 28rem) | `column-gap: var(--ply-space-4)`             | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## date-picker

ラベルと入力はFieldと同じ6pxへ統一。入力の末尾3emは開くボタンと入力値の重なりを防ぐ予約領域。パネル内側12px、編集欄や月表示のまとまり間8px、日付セル・操作内4px。日付表のborder-spacingは行間2px・列間0で、期間の横方向の連続を切らない。

対象: [src/css/components/date-picker.css](../src/css/components/date-picker.css)

| ソース                                             | セレクタの階層                                                                                | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/date-picker.css#L7)     | `.ply-date-picker`                                                                            | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L13](../src/css/components/date-picker.css#L13)   | `.ply-date-picker → & > legend`                                                               | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L18](../src/css/components/date-picker.css#L18)   | `.ply-date-picker → & > .control,     & > .fallback,     & > .messages:has(> :not([hidden]))` | 常時 | `margin-block-start: 0.375rem`                         | `6px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L31](../src/css/components/date-picker.css#L31)   | `.ply-date-picker > .control → & > .ply-input`                                                | 常時 | `padding-inline-end: 3em`                              | `3em`                | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L41](../src/css/components/date-picker.css#L41)   | `.ply-date-picker > .fallback`                                                                | 常時 | `gap: var(--ply-space-3)`                              | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L46](../src/css/components/date-picker.css#L46)   | `.ply-date-picker > .panel > .editors`                                                        | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L48](../src/css/components/date-picker.css#L48)   | `.ply-date-picker > .panel > .editors → & > .ply-input`                                       | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L71](../src/css/components/date-picker.css#L71)   | `.ply-date-picker > .panel`                                                                   | 常時 | `inset-block: 0 auto`                                  | `0 auto`             | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L72](../src/css/components/date-picker.css#L72)   | `.ply-date-picker > .panel`                                                                   | 常時 | `inset-inline: 0 auto`                                 | `0 auto`             | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L73](../src/css/components/date-picker.css#L73)   | `.ply-date-picker > .panel`                                                                   | 常時 | `margin: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L78](../src/css/components/date-picker.css#L78)   | `.ply-date-picker > .panel`                                                                   | 常時 | `padding-block: var(--ply-space-3) var(--ply-space-2)` | `12px 8px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L79](../src/css/components/date-picker.css#L79)   | `.ply-date-picker > .panel`                                                                   | 常時 | `padding-inline: var(--ply-space-5)`                   | `20px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L92](../src/css/components/date-picker.css#L92)   | `.ply-date-picker > .panel → &:popover-open`                                                  | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L100](../src/css/components/date-picker.css#L100) | `.ply-date-picker > .panel > .month > .ply-button`                                            | 常時 | `padding-inline: var(--ply-space-2)`                   | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L115](../src/css/components/date-picker.css#L115) | `.ply-date-picker > .panel > .month`                                                          | 常時 | `gap: var(--ply-space-1)`                              | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L119](../src/css/components/date-picker.css#L119) | `.ply-date-picker > .panel > .month → & > strong`                                             | 常時 | `padding-inline: var(--ply-space-1)`                   | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L162](../src/css/components/date-picker.css#L162) | `.ply-date-picker > .panel > .grid`                                                           | 常時 | `border-spacing: 0 0.125rem`                           | `0 2px`              | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L165](../src/css/components/date-picker.css#L165) | `.ply-date-picker > .panel > .grid → & th`                                                    | 常時 | `padding-block: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L166](../src/css/components/date-picker.css#L166) | `.ply-date-picker > .panel > .grid → & th`                                                    | 常時 | `padding-inline: 0`                                    | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L174](../src/css/components/date-picker.css#L174) | `.ply-date-picker > .panel > .grid → & td`                                                    | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L184](../src/css/components/date-picker.css#L184) | `.ply-date-picker > .panel > .grid > tbody > tr > td > .day`                                  | 常時 | `padding: 0`                                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L207](../src/css/components/date-picker.css#L207) | `.ply-date-picker > .panel > .grid > tbody > tr > td > .day → &[data-today="true"]::after`    | 常時 | `inset-block-end: 0.1875rem`                           | `3px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L208](../src/css/components/date-picker.css#L208) | `.ply-date-picker > .panel > .grid > tbody > tr > td > .day → &[data-today="true"]::after`    | 常時 | `inset-inline: 0`                                      | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L211](../src/css/components/date-picker.css#L211) | `.ply-date-picker > .panel > .grid > tbody > tr > td > .day → &[data-today="true"]::after`    | 常時 | `margin-inline: auto`                                  | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L279](../src/css/components/date-picker.css#L279) | `.ply-date-picker > .panel > .actions`                                                        | 常時 | `padding-block-start: var(--ply-space-1)`              | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L281](../src/css/components/date-picker.css#L281) | `.ply-date-picker > .panel > .actions`                                                        | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## dialog

見出し・本文・操作欄の内側はoverlay.cssで共用する。Dialogは面の幅と高さ、長文時の本文スクロールを所有し、ルートpaddingは0。狭いタッチ画面では下端に寄せ、安全領域だけ下に足す。

対象: [src/css/components/dialog.css](../src/css/components/dialog.css)

| ソース                                      | セレクタの階層         | 条件                                            | 宣言値                                           | root 16pxでremを換算          | 値の扱い                                                   |
| ------------------------------------------- | ---------------------- | ----------------------------------------------- | ------------------------------------------------ | ----------------------------- | ---------------------------------------------------------- |
| [L9](../src/css/components/dialog.css#L9)   | `.ply-dialog > .panel` | 常時                                            | `padding: 0`                                     | `0`                           | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L44](../src/css/components/dialog.css#L44) | `.ply-dialog > .panel` | @media (max-width: 40rem) and (pointer: coarse) | `margin: 0`                                      | `0`                           | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L45](../src/css/components/dialog.css#L45) | `.ply-dialog > .panel` | @media (max-width: 40rem) and (pointer: coarse) | `margin-inline: auto`                            | `auto`                        | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L46](../src/css/components/dialog.css#L46) | `.ply-dialog > .panel` | @media (max-width: 40rem) and (pointer: coarse) | `margin-block-start: auto`                       | `auto`                        | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L47](../src/css/components/dialog.css#L47) | `.ply-dialog > .panel` | @media (max-width: 40rem) and (pointer: coarse) | `padding-block-end: env(safe-area-inset-bottom)` | `env(safe-area-inset-bottom)` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## disclosure-group

連続するDisclosureはGridのgap4px。通常は40pxの操作行＋4pxで44pxごとに始まり、本文を開いた分だけ後続が下へ動く。項目ごとの全幅の線・外枠は付けず、開閉マークと本文の縦線でまとまりを示す。汎用Stackの24pxを項目間へ持ち込まない。

対象: [src/css/components/disclosure-group.css](../src/css/components/disclosure-group.css)

| ソース                                              | セレクタの階層          | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| --------------------------------------------------- | ----------------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/disclosure-group.css#L4) | `.ply-disclosure-group` | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## disclosure

見出しは24px行＋上下8pxで40px。左右paddingは0で配置側が外端を所有する。開閉マークは24px、見出しまでの横gapは8px、説明までの縦gapは2px。本文は14px/22px、子同士8px。本文の左margin12pxでマーク中央に縦線を置き、1pxの線＋左padding19pxを加えた32pxで見出しの開始位置に一致させる。上padding0はsummary下の8pxを重ねないため、下16pxは開いた本文と次の項目を離すため。touchは上下10pxで44px行。入れ子も同じ32pxの字下げ規則を繰り返す。

対象: [src/css/components/disclosure.css](../src/css/components/disclosure.css)

| ソース                                          | セレクタの階層                               | 条件                     | 宣言値                                        | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------------- | -------------------------------------------- | ------------------------ | --------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L11](../src/css/components/disclosure.css#L11) | `.ply-disclosure → & > summary`              | 常時                     | `gap: var(--ply-space-2)`                     | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L12](../src/css/components/disclosure.css#L12) | `.ply-disclosure → & > summary`              | 常時                     | `padding-block: var(--ply-space-2)`           | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L13](../src/css/components/disclosure.css#L13) | `.ply-disclosure → & > summary`              | 常時                     | `padding-inline: 0`                           | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L56](../src/css/components/disclosure.css#L56) | `.ply-disclosure → & > summary → & > .label` | 常時                     | `gap: 0.125rem`                               | `2px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L76](../src/css/components/disclosure.css#L76) | `.ply-disclosure → & > div`                  | 常時                     | `gap: var(--ply-space-2)`                     | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L78](../src/css/components/disclosure.css#L78) | `.ply-disclosure → & > div`                  | 常時                     | `margin-inline-start: 0.75rem`                | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L79](../src/css/components/disclosure.css#L79) | `.ply-disclosure → & > div`                  | 常時                     | `padding-block: 0 var(--ply-space-4)`         | `0 16px`             | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L80](../src/css/components/disclosure.css#L80) | `.ply-disclosure → & > div`                  | 常時                     | `padding-inline: calc(1.25rem - 0.0625rem) 0` | `calc(20px - 1px) 0` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L90](../src/css/components/disclosure.css#L90) | `.ply-disclosure > summary`                  | @media (pointer: coarse) | `padding-block: 0.625rem`                     | `10px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## divider

区切りに文字がある場合は線との間12px。hrの既定marginは0。区切り前後の章間隔はこの部品ではなく配置側のgapで決める。

対象: [src/css/components/divider.css](../src/css/components/divider.css)

| ソース                                     | セレクタの階層 | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------ | -------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/divider.css#L5) | `.ply-divider` | 常時 | `gap: var(--ply-space-3)` | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L6](../src/css/components/divider.css#L6) | `.ply-divider` | 常時 | `margin: 0`               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## dropdown-menu

パネル内4px、項目の横8px、アイコンと文言8px、見出しと説明4px。通常行の上下は(32−20−2)/2=5px、タッチ時は(44−20−2)/2=11px。境界2pxを差し引き、上揃えと対称余白を保つ。先頭のアイコン枠は14px、説明の開始位置は14＋8=22px。アイコンの上marginは(20pxの先頭行−14pxの図)/2=3pxで、複数行の全文の中央には置かない。

対象: [src/css/components/dropdown-menu.css](../src/css/components/dropdown-menu.css)

| ソース                                               | セレクタの階層                                                              | 条件 | 宣言値                                                                      | root 16pxでremを換算                                    | 値の扱い                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------- | ---- | --------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/dropdown-menu.css#L5)     | `.ply-dropdown-menu > .shield`                                              | 常時 | `inset-block: 0`                                                            | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L6](../src/css/components/dropdown-menu.css#L6)     | `.ply-dropdown-menu > .shield`                                              | 常時 | `inset-inline: 0`                                                           | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L11](../src/css/components/dropdown-menu.css#L11)   | `.ply-dropdown-menu > .shield`                                              | 常時 | `margin: 0`                                                                 | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L12](../src/css/components/dropdown-menu.css#L12)   | `.ply-dropdown-menu > .shield`                                              | 常時 | `padding: 0`                                                                | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L31](../src/css/components/dropdown-menu.css#L31)   | `.ply-menu`                                                                 | 常時 | `inset-block: 0 auto`                                                       | `0 auto`                                                | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L32](../src/css/components/dropdown-menu.css#L32)   | `.ply-menu`                                                                 | 常時 | `inset-inline: 0 auto`                                                      | `0 auto`                                                | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L41](../src/css/components/dropdown-menu.css#L41)   | `.ply-menu`                                                                 | 常時 | `margin: 0`                                                                 | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L42](../src/css/components/dropdown-menu.css#L42)   | `.ply-menu`                                                                 | 常時 | `padding-block: var(--ply-space-1)`                                         | `4px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L43](../src/css/components/dropdown-menu.css#L43)   | `.ply-menu`                                                                 | 常時 | `padding-inline: var(--ply-space-1)`                                        | `4px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L70](../src/css/components/dropdown-menu.css#L70)   | `.ply-menu[data-variant="group"]`                                           | 常時 | `padding: 0`                                                                | `0`                                                     | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L80](../src/css/components/dropdown-menu.css#L80)   | `.ply-menu > li > .item.ply-button`                                         | 常時 | `padding-block: calc((var(--ply-menu-row-size) - 10em / 7 - 0.125rem) / 2)` | `calc((var(--ply-menu-row-size) - 10em / 7 - 2px) / 2)` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L81](../src/css/components/dropdown-menu.css#L81)   | `.ply-menu > li > .item.ply-button`                                         | 常時 | `padding-inline: var(--ply-space-2)`                                        | `8px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L133](../src/css/components/dropdown-menu.css#L133) | `.ply-menu > li > .item > .content`                                         | 常時 | `gap: var(--ply-space-1)`                                                   | `4px`                                                   | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L137](../src/css/components/dropdown-menu.css#L137) | `.ply-menu > li > .item > .content → &[data-leading="true"] > .description` | 常時 | `padding-inline-start: calc(var(--ply-button-font) + var(--ply-space-2))`   | `calc(var(--ply-button-font) + 8px)`                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L143](../src/css/components/dropdown-menu.css#L143) | `.ply-menu > li > .item > .content > .heading`                              | 常時 | `gap: var(--ply-space-2)`                                                   | `8px`                                                   | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L146](../src/css/components/dropdown-menu.css#L146) | `.ply-menu > li > .item > .content > .heading → & > .ply-icon`              | 常時 | `margin-block-start: calc((1lh - 1em) / 2)`                                 | `calc((1lh - 1em) / 2)`                                 | 最初の行の高さと印の高さの差から揃える。                         |
| [L187](../src/css/components/dropdown-menu.css#L187) | `.ply-menu > li > .label,   .ply-menu > .empty`                             | 常時 | `padding-block: var(--ply-space-2)`                                         | `8px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L188](../src/css/components/dropdown-menu.css#L188) | `.ply-menu > li > .label,   .ply-menu > .empty`                             | 常時 | `padding-inline: var(--ply-space-2)`                                        | `8px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L193](../src/css/components/dropdown-menu.css#L193) | `.ply-menu > .separator`                                                    | 常時 | `margin-block-start: var(--ply-space-1)`                                    | `4px`                                                   | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L194](../src/css/components/dropdown-menu.css#L194) | `.ply-menu > .separator`                                                    | 常時 | `padding-block-start: var(--ply-space-1)`                                   | `4px`                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## editable-property

属性名と値は4pxで結び、表示から編集へ変わっても行の内側2px・左右8pxを保つ。複数操作の間は8px。Buttonの文字・高さは共通定義が所有する。

対象: [src/css/components/editable-property.css](../src/css/components/editable-property.css)

| ソース                                                 | セレクタの階層                                | 条件 | 宣言値                                        | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------------------ | --------------------------------------------- | ---- | --------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/editable-property.css#L4)   | `.ply-editable-property`                      | 常時 | `gap: var(--ply-space-1)`                     | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L17](../src/css/components/editable-property.css#L17) | `.ply-editable-property > .preview`           | 常時 | `gap: var(--ply-space-2)`                     | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L20](../src/css/components/editable-property.css#L20) | `.ply-editable-property > .preview`           | 常時 | `padding-block: 0.125rem`                     | `2px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L21](../src/css/components/editable-property.css#L21) | `.ply-editable-property > .preview`           | 常時 | `padding-inline: var(--ply-space-2) 0.125rem` | `8px 2px`            | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L48](../src/css/components/editable-property.css#L48) | `.ply-editable-property > .editor`            | 常時 | `gap: var(--ply-space-2)`                     | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L60](../src/css/components/editable-property.css#L60) | `.ply-editable-property > .editor > .actions` | 常時 | `gap: var(--ply-space-2)`                     | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## empty-state

絵と本文は16px、題名・説明・操作の行間は8px。操作の手前だけ4px追加して説明との距離を12pxにする。全体の上下24pxは一覧の空白を示す領域、横12pxは小さな配置でも端へ触れないため。図の上4pxは枠の影の逃げ。左右autoは最大幅40rem内で中央配置する。22rem未満では図・題名・本文・操作を一列にし、同じ8pxの縦間隔を維持する。

対象: [src/css/components/empty-state.css](../src/css/components/empty-state.css)

| ソース                                           | セレクタの階層                              | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------ | ------------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/empty-state.css#L7)   | `.ply-empty-state`                          | 常時 | `gap: var(--ply-space-2) var(--ply-space-4)`           | `8px 16px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L11](../src/css/components/empty-state.css#L11) | `.ply-empty-state`                          | 常時 | `margin-inline: auto`                                  | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L12](../src/css/components/empty-state.css#L12) | `.ply-empty-state`                          | 常時 | `padding-block: var(--ply-space-6) var(--ply-space-5)` | `24px 20px`          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L13](../src/css/components/empty-state.css#L13) | `.ply-empty-state`                          | 常時 | `padding-inline: var(--ply-space-3)`                   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L27](../src/css/components/empty-state.css#L27) | `.ply-empty-state → & > .symbol`            | 常時 | `margin-block-start: var(--ply-space-1)`               | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L39](../src/css/components/empty-state.css#L39) | `.ply-empty-state → & > .symbol → &::after` | 常時 | `inset-block-start: -0.1875rem`                        | `-3px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L40](../src/css/components/empty-state.css#L40) | `.ply-empty-state → & > .symbol → &::after` | 常時 | `inset-inline-end: -0.1875rem`                         | `-3px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L60](../src/css/components/empty-state.css#L60) | `.ply-empty-state → & > .body → & > * + *`  | 常時 | `margin-block-start: var(--ply-space-2)`               | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L70](../src/css/components/empty-state.css#L70) | `.ply-empty-state → & > .actions`           | 常時 | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L71](../src/css/components/empty-state.css#L71) | `.ply-empty-state → & > .actions`           | 常時 | `margin-block-start: var(--ply-space-1)`               | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## error-summary

案内の共通枠と同じ内側12px、印と題名8px。修正先リストは行間2px、各リンクの上下4px・左右8px。リストの既定margin/paddingは0。赤い大枠ではなく、印・修正先・フォーカスで修正箇所を案内する。

対象: [src/css/components/error-summary.css](../src/css/components/error-summary.css)

| ソース                                             | セレクタの階層                                 | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------------- | ---------------------------------------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/error-summary.css#L4)   | `.ply-error-summary > .body > ul`              | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L5](../src/css/components/error-summary.css#L5)   | `.ply-error-summary > .body > ul`              | 常時 | `margin: 0`               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L6](../src/css/components/error-summary.css#L6)   | `.ply-error-summary > .body > ul`              | 常時 | `padding: 0`              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L11](../src/css/components/error-summary.css#L11) | `.ply-error-summary > .body > ul → & > li > a` | 常時 | `gap: var(--ply-space-2)` | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## field

Fieldのラベル・入力・メッセージは6px。補助メッセージ同士4px、関連操作8px、FieldGroupのまとまり16px/32px。Input/Selectの数式は32px枠−2px境界−20px行の対称配分を基本にする。Choiceの0.5emは14px文字で7px。受け入れ済みエラーの印と本文0.375em=5.25px、印の上3em/14=3pxは維持する。パスワード末尾の2.5emはボタンの予約幅。

対象: [src/css/components/field.css](../src/css/components/field.css)

| ソース                                       | セレクタの階層                                                                                 | 条件                                              | 宣言値                                                  | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/field.css#L5)     | `.ply-field`                                                                                   | 常時                                              | `gap: 0.375rem`                                         | `6px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L11](../src/css/components/field.css#L11)   | `.ply-field → & > .heading`                                                                    | 常時                                              | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L22](../src/css/components/field.css#L22)   | `:is(.ply-field, .ply-date-picker, .ply-character-count) > .messages → & > * + *`              | 常時                                              | `margin-block-start: var(--ply-space-1)`                | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L33](../src/css/components/field.css#L33)   | `:is(.ply-field, .ply-date-picker, .ply-character-count) > .messages → & > .error`             | 常時                                              | `gap: 0.375em`                                          | `0.375em`            | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L41](../src/css/components/field.css#L41)   | `:is(.ply-field, .ply-date-picker, .ply-character-count) > .messages → & > .error > .ply-icon` | 常時                                              | `margin-block-start: calc(3em / 14)`                    | `calc(3em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L50](../src/css/components/field.css#L50)   | `.ply-password,   .ply-combobox → & > .ply-input`                                              | 常時                                              | `padding-inline-end: 2.5em`                             | `2.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L66](../src/css/components/field.css#L66)   | `:is(.ply-password, .ply-combobox, .ply-date-picker > .control) > .toggle`                     | 常時                                              | `inset-block-start: 0.0625rem`                          | `1px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L67](../src/css/components/field.css#L67)   | `:is(.ply-password, .ply-combobox, .ply-date-picker > .control) > .toggle`                     | 常時                                              | `inset-inline-end: 0.0625rem`                           | `1px`                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L72](../src/css/components/field.css#L72)   | `:is(.ply-password, .ply-combobox, .ply-date-picker > .control) > .toggle`                     | 常時                                              | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L101](../src/css/components/field.css#L101) | `.ply-character-count`                                                                         | 常時                                              | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L118](../src/css/components/field.css#L118) | `.ply-combobox > .options`                                                                     | 常時                                              | `inset-block-start: 100%`                               | `100%`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L119](../src/css/components/field.css#L119) | `.ply-combobox > .options`                                                                     | 常時                                              | `inset-inline: 0`                                       | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L124](../src/css/components/field.css#L124) | `.ply-combobox > .options`                                                                     | 常時                                              | `margin: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L125](../src/css/components/field.css#L125) | `.ply-combobox > .options`                                                                     | 常時                                              | `margin-block-start: var(--ply-space-1)`                | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L126](../src/css/components/field.css#L126) | `.ply-combobox > .options`                                                                     | 常時                                              | `padding-block: var(--ply-space-1)`                     | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L127](../src/css/components/field.css#L127) | `.ply-combobox > .options`                                                                     | 常時                                              | `padding-inline: var(--ply-space-1)`                    | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L138](../src/css/components/field.css#L138) | `.ply-combobox > .options → & > li`                                                            | 常時                                              | `padding-block: 0.375rem`                               | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L139](../src/css/components/field.css#L139) | `.ply-combobox > .options → & > li`                                                            | 常時                                              | `padding-inline: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L166](../src/css/components/field.css#L166) | `.ply-field-group,   .ply-choice-group`                                                        | 常時                                              | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L169](../src/css/components/field.css#L169) | `.ply-field-group,   .ply-choice-group → & > legend`                                           | 常時                                              | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L177](../src/css/components/field.css#L177) | `.ply-field-group → & > legend`                                                                | 常時                                              | `padding-inline-end: var(--ply-space-3)`                | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L185](../src/css/components/field.css#L185) | `.ply-field-group → & > .layout`                                                               | 常時                                              | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L187](../src/css/components/field.css#L187) | `.ply-field-group → & > .layout`                                                               | 常時                                              | `margin-block-start: var(--ply-space-4)`                | `16px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L197](../src/css/components/field.css#L197) | `.ply-field-group → & > .layout → & > .fields`                                                 | 常時                                              | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L204](../src/css/components/field.css#L204) | `.ply-field-group → & > .layout:has(> .description)`                                           | @container ply-field-group (inline-size >= 40rem) | `gap: var(--ply-space-8)`                               | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L216](../src/css/components/field.css#L216) | `.ply-choice-group → & > * + *`                                                                | 常時                                              | `margin-block-start: var(--ply-space-2)`                | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L220](../src/css/components/field.css#L220) | `.ply-choice-group → & > .list`                                                                | 常時                                              | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L227](../src/css/components/field.css#L227) | `.ply-choice`                                                                                  | @media (pointer: coarse)                          | `padding-block: var(--ply-space-3)`                     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L231](../src/css/components/field.css#L231) | `.ply-combobox > .options > li`                                                                | @media (pointer: coarse)                          | `padding-block: var(--ply-space-3)`                     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L238](../src/css/components/field.css#L238) | `.ply-choice`                                                                                  | 常時                                              | `gap: 0.5em`                                            | `0.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L248](../src/css/components/field.css#L248) | `.ply-choice → & > input`                                                                      | 常時                                              | `margin: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L249](../src/css/components/field.css#L249) | `.ply-choice → & > input`                                                                      | 常時                                              | `margin-block-start: calc(1em / 14)`                    | `calc(1em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L316](../src/css/components/field.css#L316) | `.ply-choice → & > span > small`                                                               | 常時                                              | `margin-block-start: var(--ply-space-1)`                | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L326](../src/css/components/field.css#L326) | `.ply-choice → &[data-kind="option"]`                                                          | 常時                                              | `padding-block: var(--ply-space-3)`                     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L327](../src/css/components/field.css#L327) | `.ply-choice → &[data-kind="option"]`                                                          | 常時                                              | `padding-inline: var(--ply-space-4)`                    | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L354](../src/css/components/field.css#L354) | `.ply-input`                                                                                   | 常時                                              | `padding-block: calc(5em / 14)`                         | `calc(5em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L355](../src/css/components/field.css#L355) | `.ply-input`                                                                                   | 常時                                              | `padding-inline: 0.75em`                                | `0.75em`             | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L395](../src/css/components/field.css#L395) | `.ply-input → &:where([data-size="large"])`                                                    | 常時                                              | `padding-block: 0.4375em`                               | `0.4375em`           | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L396](../src/css/components/field.css#L396) | `.ply-input → &:where([data-size="large"])`                                                    | 常時                                              | `padding-inline: 0.5em`                                 | `0.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L429](../src/css/components/field.css#L429) | `input.ply-input → &:where(:not([type="file"]))`                                               | 常時                                              | `padding-block: 0`                                      | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L442](../src/css/components/field.css#L442) | `select.ply-input:not([multiple]):not([size])`                                                 | 常時                                              | `padding-inline-end: 2.5em`                             | `2.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L452](../src/css/components/field.css#L452) | `.ply-input[type="file"]`                                                                      | 常時                                              | `padding-block: var(--ply-space-2)`                     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L457](../src/css/components/field.css#L457) | `.ply-input[type="file"] → &::file-selector-button`                                            | 常時                                              | `padding-block: var(--ply-space-1)`                     | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L458](../src/css/components/field.css#L458) | `.ply-input[type="file"] → &::file-selector-button`                                            | 常時                                              | `padding-inline: var(--ply-space-2) var(--ply-space-3)` | `8px 12px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L459](../src/css/components/field.css#L459) | `.ply-input[type="file"] → &::file-selector-button`                                            | 常時                                              | `margin-inline-end: var(--ply-space-3)`                 | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## file-input

ドロップ面の内側12px。名前・状態・操作の間8px、異なるまとまり12px。標準選択ボタンは共通Buttonと同じ高さから対称paddingを算出する。選択ボタンとファイル名は8pxへ統一。横0.75emは標準入力の文字に応じた内側。

対象: [src/css/components/file-input.css](../src/css/components/file-input.css)

| ソース                                          | セレクタの階層                                                            | 条件 | 宣言値                                                                    | root 16pxでremを換算                                  | 値の扱い                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/file-input.css#L5)   | `.ply-file-input`                                                         | 常時 | `gap: var(--ply-space-2)`                                                 | `8px`                                                 | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L6](../src/css/components/file-input.css#L6)   | `.ply-file-input`                                                         | 常時 | `padding-block: var(--ply-space-3)`                                       | `12px`                                                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L7](../src/css/components/file-input.css#L7)   | `.ply-file-input`                                                         | 常時 | `padding-inline: var(--ply-space-4)`                                      | `16px`                                                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L43](../src/css/components/file-input.css#L43) | `.ply-file-input → & > .ply-input[type="file"]`                           | 常時 | `padding: 0`                                                              | `0`                                                   | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L55](../src/css/components/file-input.css#L55) | `.ply-file-input → & > .ply-input[type="file"] → &::file-selector-button` | 常時 | `padding-block: calc((var(--ply-button-size) - 10em / 7 - 0.125rem) / 2)` | `calc((var(--ply-button-size) - 10em / 7 - 2px) / 2)` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L56](../src/css/components/file-input.css#L56) | `.ply-file-input → & > .ply-input[type="file"] → &::file-selector-button` | 常時 | `padding-inline: 0.75em`                                                  | `0.75em`                                              | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L57](../src/css/components/file-input.css#L57) | `.ply-file-input → & > .ply-input[type="file"] → &::file-selector-button` | 常時 | `margin-inline-end: var(--ply-space-2)`                                   | `8px`                                                 | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L89](../src/css/components/file-input.css#L89) | `.ply-file-input > .files`                                                | 常時 | `padding: 0`                                                              | `0`                                                   | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L96](../src/css/components/file-input.css#L96) | `.ply-file-input > .files → & > li`                                       | 常時 | `gap: var(--ply-space-3)`                                                 | `12px`                                                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L97](../src/css/components/file-input.css#L97) | `.ply-file-input > .files → & > li`                                       | 常時 | `padding-block: var(--ply-space-2)`                                       | `8px`                                                 | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## file-item

アイコン・ファイル名・操作をGridで対応付け、間隔8px。上下8pxはMessageListと同じ行の内側。名前と形式・容量は4px。狭幅の操作は名前の列へ移すため、固定marginで字下げしない。

対象: [src/css/components/file-item.css](../src/css/components/file-item.css)

| ソース                                         | セレクタの階層                                  | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ---------------------------------------------- | ----------------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/file-item.css#L7)   | `.ply-file-item`                                | 常時 | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L9](../src/css/components/file-item.css#L9)   | `.ply-file-item`                                | 常時 | `padding-block: var(--ply-space-2)`      | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L45](../src/css/components/file-item.css#L45) | `.ply-file-item → & > .body → & > .description` | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L56](../src/css/components/file-item.css#L56) | `.ply-file-item → & > .actions`                 | 常時 | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## filter-bar

条件ボタン間は4px。各ボタンが左右のpaddingを持つため、外の間隔は通常の操作群8pxより狭くする。折り返し時も一つの条件群として4px。

対象: [src/css/components/filter-bar.css](../src/css/components/filter-bar.css)

| ソース                                        | セレクタの階層    | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| --------------------------------------------- | ----------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L7](../src/css/components/filter-bar.css#L7) | `.ply-filter-bar` | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## grid

セルは上下10px・左右14px。行と列の判読のため、見出し下は12pxを確保する。空状態は上下一律12px・左右16pxで表幅に収め、狭幅の横移動はGrid自身の領域内で受ける。

対象: [src/css/components/grid.css](../src/css/components/grid.css)

| ソース                                    | セレクタの階層                                                      | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------- | ------------------------------------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L14](../src/css/components/grid.css#L14) | `.ply-grid → & > .table`                                            | 常時 | `border-spacing: 0`                      | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L20](../src/css/components/grid.css#L20) | `.ply-grid → & > .table → & > caption`                              | 常時 | `padding-block-end: var(--ply-space-3)`  | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L29](../src/css/components/grid.css#L29) | `.ply-grid → & > .table → & > :is(thead, tbody) > tr > :is(th, td)` | 常時 | `padding-block: 0.625rem`                | `10px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L30](../src/css/components/grid.css#L30) | `.ply-grid → & > .table → & > :is(thead, tbody) > tr > :is(th, td)` | 常時 | `padding-inline: 0.875rem`               | `14px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L42](../src/css/components/grid.css#L42) | `.ply-grid → & > .table → & > thead > tr > th`                      | 常時 | `padding-block: var(--ply-space-2)`      | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L53](../src/css/components/grid.css#L53) | `.ply-grid → & > .table → & > tbody > tr > th`                      | 常時 | `inset-inline-start: 0`                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L84](../src/css/components/grid.css#L84) | `.ply-grid → & > .empty`                                            | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L85](../src/css/components/grid.css#L85) | `.ply-grid → & > .empty`                                            | 常時 | `padding-block: var(--ply-space-3)`      | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L86](../src/css/components/grid.css#L86) | `.ply-grid → & > .empty`                                            | 常時 | `padding-inline: var(--ply-space-4)`     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## hover-card

トリガーに続く補足の間だけ4pxを保つ。開いた面の見出し・本文・閉じる操作の余白はoverlay.cssが共有し、HoverCard固有の内側余白を重ねない。

対象: [src/css/components/hover-card.css](../src/css/components/hover-card.css)

| ソース                                        | セレクタの階層    | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| --------------------------------------------- | ----------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L6](../src/css/components/hover-card.css#L6) | `.ply-hover-card` | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## icon

Icon自身にはgap・margin・paddingを入れない。文言との距離はButton、Field等の所有側で決め、アイコン側と二重に足さない。全アイコンがregular、標準のSVG枠1em、小型6em/7。名前ごとのウェイト・縮小・拡大の例外は設けない。

対象: [src/css/components/icon.css](../src/css/components/icon.css)

gap・margin・padding・insetの宣言はありません。

## image-cropper

画像面は上下16px・左右20px、画像と設定は20pxで分ける。画像なしの面も上16px・下12px・左右20pxとして同じカード比率を使う。狭幅と文字拡大時は画像と説明を折り返し、面の外へ押し出さない。

対象: [src/css/components/image-cropper.css](../src/css/components/image-cropper.css)

| ソース                                               | セレクタの階層                                                       | 条件                                               | 宣言値                                                                                                                                                               | root 16pxでremを換算                                                                                                                      | 値の扱い                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [L13](../src/css/components/image-cropper.css#L13)   | `.ply-image-cropper`                                                 | 常時                                               | `gap: var(--ply-space-3)`                                                                                                                                            | `12px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L27](../src/css/components/image-cropper.css#L27)   | `.ply-image-cropper → & > .layout`                                   | 常時                                               | `gap: var(--ply-space-5)`                                                                                                                                            | `20px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L35](../src/css/components/image-cropper.css#L35)   | `.ply-image-cropper → & > .layout > .stage`                          | 常時                                               | `padding-block: var(--ply-space-4)`                                                                                                                                  | `16px`                                                                                                                                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L36](../src/css/components/image-cropper.css#L36)   | `.ply-image-cropper → & > .layout > .stage`                          | 常時                                               | `padding-inline: var(--ply-space-5)`                                                                                                                                 | `20px`                                                                                                                                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L57](../src/css/components/image-cropper.css#L57)   | `.ply-image-cropper → & > .layout > .stage > .viewport > img`        | 常時                                               | `inset-block-start: calc(var(--image-cropper-offset-y) * 1%)`                                                                                                        | `calc(var(--image-cropper-offset-y) * 1%)`                                                                                                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L58](../src/css/components/image-cropper.css#L58)   | `.ply-image-cropper → & > .layout > .stage > .viewport > img`        | 常時                                               | `inset-inline-start: calc(var(--image-cropper-offset-x) * 1%)`                                                                                                       | `calc(var(--image-cropper-offset-x) * 1%)`                                                                                                | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L69](../src/css/components/image-cropper.css#L69)   | `.ply-image-cropper → & > .layout > .stage > .viewport > .selection` | 常時                                               | `inset-block-start: calc(var(--image-cropper-y) * 1%)`                                                                                                               | `calc(var(--image-cropper-y) * 1%)`                                                                                                       | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L70](../src/css/components/image-cropper.css#L70)   | `.ply-image-cropper → & > .layout > .stage > .viewport > .selection` | 常時                                               | `inset-inline-start: calc(var(--image-cropper-x) * 1%)`                                                                                                              | `calc(var(--image-cropper-x) * 1%)`                                                                                                       | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L74](../src/css/components/image-cropper.css#L74)   | `.ply-image-cropper → & > .layout > .stage > .viewport > .selection` | 常時                                               | `padding: 0`                                                                                                                                                         | `0`                                                                                                                                       | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L88](../src/css/components/image-cropper.css#L88)   | `.ply-image-cropper → & > .layout > .stage > .viewport > .resize`    | 常時                                               | `inset-block-start: clamp(         0rem,         calc((var(--image-cropper-y) + var(--image-cropper-height)) * 1% - 1.125rem),         calc(100% - 2.25rem)       )` | `clamp(         0px,         calc((var(--image-cropper-y) + var(--image-cropper-height)) * 1% - 18px),         calc(100% - 36px)       )` | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L93](../src/css/components/image-cropper.css#L93)   | `.ply-image-cropper → & > .layout > .stage > .viewport > .resize`    | 常時                                               | `inset-inline-start: clamp(         0rem,         calc((var(--image-cropper-x) + var(--image-cropper-width)) * 1% - 1.125rem),         calc(100% - 2.25rem)       )` | `clamp(         0px,         calc((var(--image-cropper-x) + var(--image-cropper-width)) * 1% - 18px),         calc(100% - 36px)       )`  | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L100](../src/css/components/image-cropper.css#L100) | `.ply-image-cropper → & > .layout > .stage > .viewport > .resize`    | 常時                                               | `padding: 0`                                                                                                                                                         | `0`                                                                                                                                       | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L136](../src/css/components/image-cropper.css#L136) | `.ply-image-cropper → & > .layout > .settings`                       | 常時                                               | `gap: var(--ply-space-4)`                                                                                                                                            | `16px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L141](../src/css/components/image-cropper.css#L141) | `.ply-image-cropper → & > .layout > .settings > .position`           | 常時                                               | `padding-block: var(--ply-space-2)`                                                                                                                                  | `8px`                                                                                                                                     | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L155](../src/css/components/image-cropper.css#L155) | `.ply-image-cropper → & > .layout > .settings > .position > .ranges` | 常時                                               | `gap: var(--ply-space-4)`                                                                                                                                            | `16px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L156](../src/css/components/image-cropper.css#L156) | `.ply-image-cropper → & > .layout > .settings > .position > .ranges` | 常時                                               | `padding-block-start: var(--ply-space-4)`                                                                                                                            | `16px`                                                                                                                                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L169](../src/css/components/image-cropper.css#L169) | `.ply-image-cropper → & > .empty`                                    | 常時                                               | `gap: var(--ply-space-4)`                                                                                                                                            | `16px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L171](../src/css/components/image-cropper.css#L171) | `.ply-image-cropper → & > .empty`                                    | 常時                                               | `padding-block: var(--ply-space-4) var(--ply-space-3)`                                                                                                               | `16px 12px`                                                                                                                               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L172](../src/css/components/image-cropper.css#L172) | `.ply-image-cropper → & > .empty`                                    | 常時                                               | `padding-inline: var(--ply-space-5)`                                                                                                                                 | `20px`                                                                                                                                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L196](../src/css/components/image-cropper.css#L196) | `.ply-image-cropper > .layout`                                       | @container ply-image-cropper (inline-size < 40rem) | `gap: var(--ply-space-4)`                                                                                                                                            | `16px`                                                                                                                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## image-frame

画像とcaptionは4px。読込中や代替表示の横8pxは枠に文字が触れないため。figureの既定marginは0。画像自体の比率と外側の間隔は分ける。

対象: [src/css/components/image-frame.css](../src/css/components/image-frame.css)

| ソース                                           | セレクタの階層                             | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------ | ------------------------------------------ | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/image-frame.css#L5)   | `.ply-image-frame`                         | 常時 | `margin: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L17](../src/css/components/image-frame.css#L17) | `.ply-image-frame → & > .image → & > img`  | 常時 | `inset-block: 0`                         | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L18](../src/css/components/image-frame.css#L18) | `.ply-image-frame → & > .image → & > img`  | 常時 | `inset-inline: 0`                        | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L25](../src/css/components/image-frame.css#L25) | `.ply-image-frame → & > .image → & > span` | 常時 | `padding-inline: var(--ply-space-2)`     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L34](../src/css/components/image-frame.css#L34) | `.ply-image-frame → & > figcaption`        | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## input-group

ラベルや補足の間8px。入力枠内のaffixと入力は横6pxへ統一し、旧5.25pxから変更。左右0.75emは通常入力と共通。affixの上下5em/14は14px文字で5px、20px行＋10px＋境界2px=32px。入力自身のpaddingは0で二重加算しない。

対象: [src/css/components/input-group.css](../src/css/components/input-group.css)

| ソース                                             | セレクタの階層                                                                                             | 条件                                             | 宣言値                                | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L7](../src/css/components/input-group.css#L7)     | `.ply-input-group`                                                                                         | 常時                                             | `gap: var(--ply-space-2)`             | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L20](../src/css/components/input-group.css#L20)   | `.ply-input-group > .control`                                                                              | 常時                                             | `column-gap: 0.375rem`                | `6px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L24](../src/css/components/input-group.css#L24)   | `.ply-input-group > .control`                                                                              | 常時                                             | `padding-inline: 0.75em`              | `0.75em`             | 文字サイズまたは行高に追従する比率。式を保持する。         |
| [L40](../src/css/components/input-group.css#L40)   | `.ply-input-group > .control → & > .ply-input`                                                             | 常時                                             | `padding: 0`                          | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L97](../src/css/components/input-group.css#L97)   | `.ply-input-group > .control → &:has(> .affix:first-child + .ply-input + .affix) → & > .affix:first-child` | @container ply-input-group (inline-size < 14rem) | `padding-block-start: calc(5em / 14)` | `calc(5em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。         |
| [L101](../src/css/components/input-group.css#L101) | `.ply-input-group > .control → &:has(> .affix:first-child + .ply-input + .affix) → & > .affix:last-child`  | @container ply-input-group (inline-size < 14rem) | `padding-block-end: calc(5em / 14)`   | `calc(5em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。         |

## keycap

キー表記は文字に追従する小さな部品。キー同士0.25em、枠の左右0.35em。固定pxではなく表記のfont-sizeを基準にするため、13pxなら3.25px/4.55pxになる。

対象: [src/css/components/keycap.css](../src/css/components/keycap.css)

| ソース                                      | セレクタの階層          | 条件 | 宣言値                   | root 16pxでremを換算 | 値の扱い                                           |
| ------------------------------------------- | ----------------------- | ---- | ------------------------ | -------------------- | -------------------------------------------------- |
| [L6](../src/css/components/keycap.css#L6)   | `.ply-keycap`           | 常時 | `gap: 0.25em`            | `0.25em`             | 文字サイズまたは行高に追従する比率。式を保持する。 |
| [L14](../src/css/components/keycap.css#L14) | `.ply-keycap → & > kbd` | 常時 | `padding-inline: 0.35em` | `0.35em`             | 文字サイズまたは行高に追従する比率。式を保持する。 |

## list-frame

TaskList・DataList・MessageListのリスト既定marginとpaddingを0にする。各行の内側と行間はそれぞれの部品が所有し、親で重ねない。

対象: [src/css/components/list-frame.css](../src/css/components/list-frame.css)

| ソース                                        | セレクタの階層                                           | 条件 | 宣言値       | root 16pxでremを換算 | 値の扱い                                           |
| --------------------------------------------- | -------------------------------------------------------- | ---- | ------------ | -------------------- | -------------------------------------------------- |
| [L4](../src/css/components/list-frame.css#L4) | `:is(.ply-task-list, .ply-data-list, .ply-message-list)` | 常時 | `margin: 0`  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |
| [L5](../src/css/components/list-frame.css#L5) | `:is(.ply-task-list, .ply-data-list, .ply-message-list)` | 常時 | `padding: 0` | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |

## loading

回転する印と文言は8px。印の上余白は(行高−16px)/2で先頭行の中心へ揃える。文言が複数行になっても印を全体の中央へ下げない。

対象: [src/css/components/loading.css](../src/css/components/loading.css)

| ソース                                       | セレクタの階層                                                   | 条件 | 宣言値                                       | root 16pxでremを換算     | 値の扱い                                                   |
| -------------------------------------------- | ---------------------------------------------------------------- | ---- | -------------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| [L5](../src/css/components/loading.css#L5)   | `.ply-loading`                                                   | 常時 | `gap: var(--ply-space-2)`                    | `8px`                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L15](../src/css/components/loading.css#L15) | `.ply-loading → & > .indicator`                                  | 常時 | `gap: 0.125rem`                              | `2px`                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L18](../src/css/components/loading.css#L18) | `.ply-loading → & > .indicator`                                  | 常時 | `margin-block-start: calc((1lh - 1rem) / 2)` | `calc((1lh - 16px) / 2)` | 最初の行の高さと印の高さの差から揃える。                   |
| [L26](../src/css/components/loading.css#L26) | `.ply-loading → &[data-layout="region"]`                         | 常時 | `padding-block: 0.6875rem 0.625rem`          | `11px 10px`              | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L27](../src/css/components/loading.css#L27) | `.ply-loading → &[data-layout="region"]`                         | 常時 | `padding-inline: 0.9375rem`                  | `15px`                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L40](../src/css/components/loading.css#L40) | `.ply-loading → &[data-variant="orbit"] > .indicator → &::after` | 常時 | `inset-block-start: -0.1875rem`              | `-3px`                   | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L41](../src/css/components/loading.css#L41) | `.ply-loading → &[data-variant="orbit"] > .indicator → &::after` | 常時 | `inset-inline-start: calc(50% - 0.1875rem)`  | `calc(50% - 3px)`        | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L65](../src/css/components/loading.css#L65) | `.ply-loading → &[data-variant="halo"] > .indicator → &::before` | 常時 | `inset: 0.0625rem`                           | `1px`                    | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L76](../src/css/components/loading.css#L76) | `.ply-loading → &[data-variant="halo"] > .indicator → &::after`  | 常時 | `inset: calc(50% - 0.15625rem)`              | `calc(50% - 2.5px)`      | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |

## message-list

各行の上下左右8px。avatar・差出人・本文・日時の横間隔も8px、折り返し行間4px。題名と短いpreviewは同じメッセージとして追加marginを入れない。会話件数・添付印は4px。状態表示の領域は上下24px・左右12px。広い配置の差出人は一覧幅の18%を6〜12remへ制限、日時は8remの共通列にし、日時の文字数で行ごとの本文位置がずれることを防ぐ。36rem未満では差出人と日時の下へ本文を回し、avatarの字下げだけを維持する。

対象: [src/css/components/message-list.css](../src/css/components/message-list.css)

| ソース                                              | セレクタの階層                                                                | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------- | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L16](../src/css/components/message-list.css#L16)   | `.ply-message-list → & > li → & > .row`                                       | 常時 | `gap: var(--ply-space-1) var(--ply-space-2)` | `4px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L19](../src/css/components/message-list.css#L19)   | `.ply-message-list → & > li → & > .row`                                       | 常時 | `padding-block: var(--ply-space-2)`          | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L20](../src/css/components/message-list.css#L20)   | `.ply-message-list → & > li → & > .row`                                       | 常時 | `padding-inline: var(--ply-space-4)`         | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L52](../src/css/components/message-list.css#L52)   | `.ply-message-list → & > li → & > .row → & > .body → & > .title → & > .count` | 常時 | `margin-inline-start: var(--ply-space-1)`    | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L77](../src/css/components/message-list.css#L77)   | `.ply-message-list → & > li → & > .row → & > .meta`                           | 常時 | `gap: var(--ply-space-1)`                    | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L94](../src/css/components/message-list.css#L94)   | `.ply-message-list → & > li → & > .row → & > .meta → & > .attachment`         | 常時 | `gap: var(--ply-space-1)`                    | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L128](../src/css/components/message-list.css#L128) | `.ply-message-list → & > .state`                                              | 常時 | `padding-block: var(--ply-space-6)`          | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L129](../src/css/components/message-list.css#L129) | `.ply-message-list → & > .state`                                              | 常時 | `padding-inline: var(--ply-space-3)`         | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## message

会話の行は8px、読ませる本文では16pxへ広げる。人物と本文8px、題名や日時の行間4px。返信列は開始側12pxで親子を示す。本文・添付・操作など役割の切れ目は12〜16px。

対象: [src/css/components/message.css](../src/css/components/message.css)

| ソース                                       | セレクタの階層                                                     | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------- | ------------------------------------------------------------------ | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/message.css#L5)   | `.ply-message`                                                     | 常時 | `gap: var(--ply-space-1) var(--ply-space-2)` | `4px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L8](../src/css/components/message.css#L8)   | `.ply-message`                                                     | 常時 | `padding-block: var(--ply-space-2)`          | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L26](../src/css/components/message.css#L26) | `.ply-message → & > .heading`                                      | 常時 | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L39](../src/css/components/message.css#L39) | `.ply-message → & > .body → & > * + *`                             | 常時 | `margin-block-start: var(--ply-space-3)`     | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L45](../src/css/components/message.css#L45) | `.ply-message → & > .actions`                                      | 常時 | `gap: var(--ply-space-2)`                    | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L48](../src/css/components/message.css#L48) | `.ply-message → &[data-layout="document"]`                         | 常時 | `row-gap: var(--ply-space-4)`                | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L49](../src/css/components/message.css#L49) | `.ply-message → &[data-layout="document"]`                         | 常時 | `padding-block: var(--ply-space-4)`          | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L62](../src/css/components/message.css#L62) | `.ply-message → &[data-layout="document"] → & > .body → & > * + *` | 常時 | `margin-block-start: var(--ply-space-4)`     | `16px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L68](../src/css/components/message.css#L68) | `.ply-message → & > .replies`                                      | 常時 | `margin-block-start: var(--ply-space-1)`     | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L69](../src/css/components/message.css#L69) | `.ply-message → & > .replies`                                      | 常時 | `padding-inline-start: var(--ply-space-3)`   | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## navigation

項目間2px、内部のアイコン・件数8px。通常行は20px行に上下6pxを足して32px。タッチ時の上下12pxで44px。左右8px、件数内4px。見出し的な大きいボタンにしない。

対象: [src/css/components/navigation.css](../src/css/components/navigation.css)

| ソース                                          | セレクタの階層                        | 条件                     | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------------- | ------------------------------------- | ------------------------ | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/navigation.css#L5)   | `.ply-navigation`                     | 常時                     | `gap: 0.125rem`                      | `2px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/navigation.css#L11) | `.ply-navigation → & > a`             | 常時                     | `gap: var(--ply-space-2)`            | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L14](../src/css/components/navigation.css#L14) | `.ply-navigation → & > a`             | 常時                     | `padding-block: 0.375rem`            | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L15](../src/css/components/navigation.css#L15) | `.ply-navigation → & > a`             | 常時                     | `padding-inline: var(--ply-space-2)` | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L30](../src/css/components/navigation.css#L30) | `.ply-navigation → & > a → & > small` | 常時                     | `padding-inline: var(--ply-space-1)` | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L47](../src/css/components/navigation.css#L47) | `.ply-navigation → & > a`             | @media (pointer: coarse) | `padding-block: var(--ply-space-3)`  | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L48](../src/css/components/navigation.css#L48) | `.ply-navigation → & > a`             | @media (pointer: coarse) | `padding-inline: var(--ply-space-4)` | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## notice

共通の小さな案内枠として内側12px。印と本文は横8px、題名と本文は縦4px、本文内の次の段落・操作は8px。全幅の色面と左線を廃止し、状態は小さな印と文言で示す。24rem未満では本文を全幅の次行へ、10rem未満では題名も次行へ置く。余白値は変えず、狭幅・文字拡大時に印の列で本文を圧迫しない。

対象: [src/css/components/notice.css](../src/css/components/notice.css)

| ソース                                      | セレクタの階層                        | 条件 | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------- | ------------------------------------- | ---- | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L8](../src/css/components/notice.css#L8)   | `.ply-notice`                         | 常時 | `gap: var(--ply-space-1) var(--ply-space-2)`           | `4px 8px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L10](../src/css/components/notice.css#L10) | `.ply-notice`                         | 常時 | `padding-block: var(--ply-space-3) var(--ply-space-2)` | `12px 8px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L11](../src/css/components/notice.css#L11) | `.ply-notice`                         | 常時 | `padding-inline: var(--ply-space-4)`                   | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L47](../src/css/components/notice.css#L47) | `.ply-notice → & > .body → & > * + *` | 常時 | `margin-block-start: var(--ply-space-2)`               | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## overlay

Dialog・Popover・HoverCardの面は左右20pxを共有する。見出し上は10px、本文の入りは4px、本文末は14px。見出しと閉じる操作の位置は同じ行で計算し、操作欄は上4px・下14pxを共通化する。

対象: [src/css/components/overlay.css](../src/css/components/overlay.css)

| ソース                                         | セレクタの階層                                                                        | 条件                                                                                                                  | 宣言値                                                                                                                   | root 16pxでremを換算                                                                                | 値の扱い                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [L17](../src/css/components/overlay.css#L17)   | `.ply-overlay → & > .heading`                                                         | 常時                                                                                                                  | `gap: var(--ply-space-1)`                                                                                                | `4px`                                                                                               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L19](../src/css/components/overlay.css#L19)   | `.ply-overlay → & > .heading`                                                         | 常時                                                                                                                  | `padding-block-start: 0.625rem`                                                                                          | `10px`                                                                                              | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L20](../src/css/components/overlay.css#L20)   | `.ply-overlay → & > .heading`                                                         | 常時                                                                                                                  | `padding-inline: var(--ply-overlay-inset-inline)`                                                                        | `var(--ply-overlay-inset-inline)`                                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L25](../src/css/components/overlay.css#L25)   | `.ply-overlay → & > .heading → & > .heading-row`                                      | 常時                                                                                                                  | `gap: var(--ply-space-2)`                                                                                                | `8px`                                                                                               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L30](../src/css/components/overlay.css#L30)   | `.ply-overlay → & > .heading → & > .heading-row → & > :is(h2, h3, strong, .message)`  | 常時                                                                                                                  | `padding-block-start: calc(             (var(--ply-overlay-close-size) - var(--ply-overlay-title-line)) / 2           )` | `calc(             (var(--ply-overlay-close-size) - var(--ply-overlay-title-line)) / 2           )` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L57](../src/css/components/overlay.css#L57)   | `.ply-overlay → & > .body`                                                            | 常時                                                                                                                  | `gap: var(--ply-space-2)`                                                                                                | `8px`                                                                                               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L59](../src/css/components/overlay.css#L59)   | `.ply-overlay → & > .body`                                                            | 常時                                                                                                                  | `padding-block: var(--ply-space-1) 0.875rem`                                                                             | `4px 14px`                                                                                          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L60](../src/css/components/overlay.css#L60)   | `.ply-overlay → & > .body`                                                            | 常時                                                                                                                  | `padding-inline: var(--ply-overlay-inset-inline)`                                                                        | `var(--ply-overlay-inset-inline)`                                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L68](../src/css/components/overlay.css#L68)   | `.ply-overlay → &:has(> .body:empty) > .heading,     &:not(:has(> .body)) > .heading` | 常時                                                                                                                  | `padding-block-end: var(--ply-space-2)`                                                                                  | `8px`                                                                                               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L74](../src/css/components/overlay.css#L74)   | `.ply-overlay → & > .actions`                                                         | 常時                                                                                                                  | `gap: var(--ply-space-2)`                                                                                                | `8px`                                                                                               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L76](../src/css/components/overlay.css#L76)   | `.ply-overlay → & > .actions`                                                         | 常時                                                                                                                  | `padding-block: var(--ply-space-1) 0.875rem`                                                                             | `4px 14px`                                                                                          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L77](../src/css/components/overlay.css#L77)   | `.ply-overlay → & > .actions`                                                         | 常時                                                                                                                  | `padding-inline: var(--ply-overlay-inset-inline)`                                                                        | `var(--ply-overlay-inset-inline)`                                                                   | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L85](../src/css/components/overlay.css#L85)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `inset-block: auto`                                                                                                      | `auto`                                                                                              | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L86](../src/css/components/overlay.css#L86)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `inset-inline: auto`                                                                                                     | `auto`                                                                                              | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L87](../src/css/components/overlay.css#L87)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `inset-inline-start: 50%`                                                                                                | `50%`                                                                                               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L88](../src/css/components/overlay.css#L88)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `inset-block-start: 50%`                                                                                                 | `50%`                                                                                               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L94](../src/css/components/overlay.css#L94)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `margin: 0`                                                                                                              | `0`                                                                                                 | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L95](../src/css/components/overlay.css#L95)   | `.ply-overlay[data-placement="anchor"]`                                               | 常時                                                                                                                  | `padding: 0`                                                                                                             | `0`                                                                                                 | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L118](../src/css/components/overlay.css#L118) | `.ply-overlay[data-placement="anchor"]`                                               | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block)                                   | `inset-block-start: calc(anchor(end) + var(--ply-space-1))`                                                              | `calc(anchor(end) + 4px)`                                                                           | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L119](../src/css/components/overlay.css#L119) | `.ply-overlay[data-placement="anchor"]`                                               | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block)                                   | `inset-inline-start: anchor(start)`                                                                                      | `anchor(start)`                                                                                     | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L127](../src/css/components/overlay.css#L127) | `.ply-overlay[data-placement="anchor"] → &[data-align="end"]`                         | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block)                                   | `inset-inline-start: auto`                                                                                               | `auto`                                                                                              | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L128](../src/css/components/overlay.css#L128) | `.ply-overlay[data-placement="anchor"] → &[data-align="end"]`                         | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block)                                   | `inset-inline-end: anchor(end)`                                                                                          | `anchor(end)`                                                                                       | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L132](../src/css/components/overlay.css#L132) | ``                                                                                    | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) / @position-try --ply-overlay-fit | `inset-inline-start: 0.5rem`                                                                                             | `8px`                                                                                               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L133](../src/css/components/overlay.css#L133) | ``                                                                                    | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) / @position-try --ply-overlay-fit | `inset-inline-end: auto`                                                                                                 | `auto`                                                                                              | 可変の残り幅を配置へ使う。固定間隔ではない。               |

## page-header

ページの象徴と題名は12px、操作内は8px。見出しと説明は4px。外側の章間隔はSurfaceが所有し、PageHeaderの中に重複paddingを入れない。

対象: [src/css/components/page-header.css](../src/css/components/page-header.css)

| ソース                                           | セレクタの階層                        | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------ | ------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L7](../src/css/components/page-header.css#L7)   | `.ply-page-header`                    | 常時 | `gap: var(--ply-space-3)`                | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L33](../src/css/components/page-header.css#L33) | `.ply-page-header → & > .heading > p` | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L42](../src/css/components/page-header.css#L42) | `.ply-page-header → & > .actions`     | 常時 | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## pagination

ページ同士4px。各リンクは上下4px・左右8px。現在地の印とリンクの操作領域を取り、全ページを大きなボタンにしない。olのインデントは0。

対象: [src/css/components/pagination.css](../src/css/components/pagination.css)

| ソース                                          | セレクタの階層                                 | 条件 | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------------- | ---------------------------------------------- | ---- | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L10](../src/css/components/pagination.css#L10) | `.ply-pagination → & > ul`                     | 常時 | `gap: var(--ply-space-1)`            | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/pagination.css#L11) | `.ply-pagination → & > ul`                     | 常時 | `padding: 0`                         | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L19](../src/css/components/pagination.css#L19) | `.ply-pagination → & > ul > li > :is(a, span)` | 常時 | `padding-block: var(--ply-space-1)`  | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L20](../src/css/components/pagination.css#L20) | `.ply-pagination → & > ul > li > :is(a, span)` | 常時 | `padding-inline: var(--ply-space-2)` | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## picker

ラベルと候補入力は4px、選択済みTag同士も4px。候補と入力の操作余白はComboboxとTagが持ち、Pickerはフォーム値との接続に必要な配置だけ持つ。

対象: [src/css/components/picker.css](../src/css/components/picker.css)

| ソース                                      | セレクタの階層                                 | 条件 | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ------------------------------------------- | ---------------------------------------------- | ---- | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/picker.css#L4)   | `.ply-picker`                                  | 常時 | `gap: var(--ply-space-1)`            | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L15](../src/css/components/picker.css#L15) | `.ply-picker > .ply-input`                     | 常時 | `padding-inline-end: 1em`            | `1em`                | 文字サイズまたは行高に追従する比率。式を保持する。         |
| [L27](../src/css/components/picker.css#L27) | `.ply-picker > .values`                        | 常時 | `gap: var(--ply-space-1)`            | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L28](../src/css/components/picker.css#L28) | `.ply-picker > .values`                        | 常時 | `margin: 0`                          | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L29](../src/css/components/picker.css#L29) | `.ply-picker > .values`                        | 常時 | `padding: 0`                         | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L47](../src/css/components/picker.css#L47) | `.ply-picker > .messages > .error`             | 常時 | `gap: var(--ply-space-1)`            | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L55](../src/css/components/picker.css#L55) | `.ply-picker > .messages > .error > .ply-icon` | 常時 | `margin-block-start: calc(3em / 14)` | `calc(3em / 14)`     | 文字サイズまたは行高に追従する比率。式を保持する。         |

## popover

見出し・本文・操作欄の内側はoverlay.cssを共有する。Popover固有の面内paddingは重ねず、対象からの距離と位置揃えだけを担う。パネルの既定marginは共通overlay側で0にする。

対象: [src/css/components/popover.css](../src/css/components/popover.css)

gap・margin・padding・insetの宣言はありません。

## progress

ラベルと値の横12px、折り返し行間4px。ラベルと進捗線は8px。値とラベルの関係を保ち、線の高さを外側の余白に流用しない。

対象: [src/css/components/progress.css](../src/css/components/progress.css)

| ソース                                        | セレクタの階層                 | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------- | ------------------------------ | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L12](../src/css/components/progress.css#L12) | `.ply-progress → & > .heading` | 常時 | `gap: var(--ply-space-1) var(--ply-space-3)` | `4px 12px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L24](../src/css/components/progress.css#L24) | `.ply-progress → & > .track`   | 常時 | `margin-block-start: var(--ply-space-2)`     | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## range

名前・現在値・操作の縦間隔8px。両端の値のまとまりは16px。thumb周囲の操作領域は入力自体が持ち、余分なpaddingを加えない。値のautoは末端へ揃えるため。

対象: [src/css/components/range.css](../src/css/components/range.css)

| ソース                                       | セレクタの階層                                                             | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| -------------------------------------------- | -------------------------------------------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L27](../src/css/components/range.css#L27)   | `.ply-range`                                                               | 常時 | `padding: 0`                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L49](../src/css/components/range.css#L49)   | `.ply-range → & > .controls`                                               | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L63](../src/css/components/range.css#L63)   | `.ply-range → &[data-mode="interval"][data-state] → & > .controls::before` | 常時 | `inset-inline: calc(9em / 14)`           | `calc(9em / 14)`     | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L64](../src/css/components/range.css#L64)   | `.ply-range → &[data-mode="interval"][data-state] → & > .controls::before` | 常時 | `inset-block: calc(5em / 7)`             | `calc(5em / 7)`      | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L105](../src/css/components/range.css#L105) | `.ply-range > .heading`                                                    | 常時 | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L110](../src/css/components/range.css#L110) | `.ply-range > .heading > .value`                                           | 常時 | `margin-inline-start: auto`              | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L126](../src/css/components/range.css#L126) | `.ply-range > .controls > .native > .input`                                | 常時 | `margin: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L127](../src/css/components/range.css#L127) | `.ply-range > .controls > .native > .input`                                | 常時 | `padding: 0`                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L229](../src/css/components/range.css#L229) | `.ply-range > .values`                                                     | 常時 | `gap: var(--ply-space-4)`                | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L230](../src/css/components/range.css#L230) | `.ply-range > .values`                                                     | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## section

章の名称・件数・操作は8px。見出し自体の横paddingは0、内容との距離は8px。操作のautoは末端へ置くためで、章全体の間隔は外側で指定する。

対象: [src/css/components/section.css](../src/css/components/section.css)

| ソース                                       | セレクタの階層                               | 条件 | 宣言値                      | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------- | -------------------------------------------- | ---- | --------------------------- | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/section.css#L5)   | `.ply-section`                               | 常時 | `gap: var(--ply-space-2)`   | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L23](../src/css/components/section.css#L23) | `.ply-section → & > .heading`                | 常時 | `gap: var(--ply-space-2)`   | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L27](../src/css/components/section.css#L27) | `.ply-section → & > .heading → & > h2`       | 常時 | `gap: var(--ply-space-2)`   | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L41](../src/css/components/section.css#L41) | `.ply-section → & > .heading → & > .count`   | 常時 | `padding-inline: 0`         | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L49](../src/css/components/section.css#L49) | `.ply-section → & > .heading → & > .actions` | 常時 | `margin-inline-start: auto` | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |

## split-view

各paneは上16px・下12px・左右24pxのカード内側。狭い面では左右20pxにして本文幅を残す。領域間は余白でなく共通境界で区切り、縦積みでもpaneの内側比率を保つ。操作用rangeはpaneの外で幅を調整する。

対象: [src/css/components/split-view.css](../src/css/components/split-view.css)

| ソース                                            | セレクタの階層                                                    | 条件                                             | 宣言値                                                 | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L17](../src/css/components/split-view.css#L17)   | `.ply-split-view → & > .panes → & > :is(.primary, .secondary)`    | 常時                                             | `padding-block: var(--ply-space-4) var(--ply-space-3)` | `16px 12px`          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L18](../src/css/components/split-view.css#L18)   | `.ply-split-view → & > .panes → & > :is(.primary, .secondary)`    | 常時                                             | `padding-inline: var(--ply-space-6)`                   | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L35](../src/css/components/split-view.css#L35)   | `.ply-split-view → & > .panes > :is(.primary, .secondary)`        | @container ply-split-view (inline-size < 32rem)  | `padding-inline: var(--ply-space-5)`                   | `20px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L53](../src/css/components/split-view.css#L53)   | `.ply-split-view → &[data-resizable="true"][data-state] > .panes` | @container ply-split-view (inline-size >= 52rem) | `gap: 0`                                               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L80](../src/css/components/split-view.css#L80)   | `.ply-split-view → & > .panes > .handle → &::before`              | 常時                                             | `inset-block: 0`                                       | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L81](../src/css/components/split-view.css#L81)   | `.ply-split-view → & > .panes > .handle → &::before`              | 常時                                             | `inset-inline-start: calc(50% - 0.0625rem)`            | `calc(50% - 1px)`    | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L115](../src/css/components/split-view.css#L115) | `.ply-split-view → & > .size-control`                             | 常時                                             | `gap: var(--ply-space-2)`                              | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L116](../src/css/components/split-view.css#L116) | `.ply-split-view → & > .size-control`                             | 常時                                             | `margin-block-start: var(--ply-space-2)`               | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## statistic

項目名と主値8px、主値と注記4px。単位は0.35emで数値から少し離す。符号は半角ASCIIの-を表示例で使い、余白のために全角文字を混ぜない。

対象: [src/css/components/statistic.css](../src/css/components/statistic.css)

| ソース                                         | セレクタの階層                            | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ---------------------------------------------- | ----------------------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L12](../src/css/components/statistic.css#L12) | `.ply-statistic → & > .value`             | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L20](../src/css/components/statistic.css#L20) | `.ply-statistic → & > .value → & > small` | 常時 | `margin-inline-start: 0.35em`            | `0.35em`             | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L26](../src/css/components/statistic.css#L26) | `.ply-statistic → & > .note`              | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## steps

工程同士16px、番号と題名8px、説明は題名から4px。リストの既定インデントは0。工程の完了状態で配置を変えない。

対象: [src/css/components/steps.css](../src/css/components/steps.css)

| ソース                                     | セレクタの階層                       | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------ | ------------------------------------ | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/steps.css#L5)   | `.ply-steps`                         | 常時 | `gap: var(--ply-space-4)`                | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L6](../src/css/components/steps.css#L6)   | `.ply-steps`                         | 常時 | `padding: 0`                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L12](../src/css/components/steps.css#L12) | `.ply-steps → & > li`                | 常時 | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L28](../src/css/components/steps.css#L28) | `.ply-steps → & > li > span > small` | 常時 | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## suggestion

補足・状態文は入力から8px。候補パネルと各候補の内側はfield.cssの共通規則を使い、Suggestionだけに追加のpaddingを持たせない。

対象: [src/css/components/suggestion.css](../src/css/components/suggestion.css)

| ソース                                        | セレクタの階層            | 条件 | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------- | ------------------------- | ---- | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L3](../src/css/components/suggestion.css#L3) | `.ply-suggestion > .note` | 常時 | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## surface

独立したカードの本文は上16px・下12px・左右20px。横を広く取り、末尾側は少し締める。内部の別内容は16pxで区切る。文書面は同じ縦の比率を保ち、左右は最低20pxを残しながら行長42remへ収める。空bodyに余白を残さない。

対象: [src/css/components/surface.css](../src/css/components/surface.css)

| ソース                                       | セレクタの階層                                     | 条件 | 宣言値                                                              | root 16pxでremを換算                  | 値の扱い                                                   |
| -------------------------------------------- | -------------------------------------------------- | ---- | ------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| [L12](../src/css/components/surface.css#L12) | `.ply-surface → & > .body`                         | 常時 | `gap: var(--ply-space-4)`                                           | `16px`                                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L14](../src/css/components/surface.css#L14) | `.ply-surface → & > .body`                         | 常時 | `padding-block: var(--ply-space-4) var(--ply-space-3)`              | `16px 12px`                           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L15](../src/css/components/surface.css#L15) | `.ply-surface → & > .body`                         | 常時 | `padding-inline: var(--ply-space-5)`                                | `20px`                                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L35](../src/css/components/surface.css#L35) | `.ply-surface → &[data-layout="document"] > .body` | 常時 | `padding-inline: max(var(--ply-space-5), calc((100% - 42rem) / 2))` | `max(20px, calc((100% - 672px) / 2))` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## switch

スイッチと文言の横8px、説明は4px。track内の上下左右1em/7は14px文字で2pxのthumbの逃げ。タッチ時は外側の上下12pxで操作領域を広げる。input既定marginは0。

対象: [src/css/components/switch.css](../src/css/components/switch.css)

| ソース                                      | セレクタの階層                   | 条件                     | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------- | -------------------------------- | ------------------------ | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L6](../src/css/components/switch.css#L6)   | `.ply-switch`                    | 常時                     | `column-gap: var(--ply-space-2)`         | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L24](../src/css/components/switch.css#L24) | `.ply-switch → & > input`        | 常時                     | `padding-block: calc(1em / 7)`           | `calc(1em / 7)`      | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L25](../src/css/components/switch.css#L25) | `.ply-switch → & > input`        | 常時                     | `padding-inline: calc(1em / 7)`          | `calc(1em / 7)`      | 文字サイズまたは行高に追従する比率。式を保持する。               |
| [L26](../src/css/components/switch.css#L26) | `.ply-switch → & > input`        | 常時                     | `margin: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L74](../src/css/components/switch.css#L74) | `.ply-switch → & > span > small` | 常時                     | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L83](../src/css/components/switch.css#L83) | `.ply-switch`                    | @media (pointer: coarse) | `padding-block: var(--ply-space-3)`      | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## table-of-contents

目次と本文の列間は32px。目次の項目内は縦6px、番号と見出しは8px。階層は16px字下げし、タブ風の囲いを作らず縦に読む順番を保つ。

対象: [src/css/components/table-of-contents.css](../src/css/components/table-of-contents.css)

| ソース                                                 | セレクタの階層                                                        | 条件 | 宣言値                                     | root 16pxでremを換算 | 値の扱い                                                         |
| ------------------------------------------------------ | --------------------------------------------------------------------- | ---- | ------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L4](../src/css/components/table-of-contents.css#L4)   | `.ply-table-of-contents`                                              | 常時 | `gap: var(--ply-space-8)`                  | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L11](../src/css/components/table-of-contents.css#L11) | `.ply-table-of-contents > nav`                                        | 常時 | `gap: var(--ply-space-1)`                  | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L15](../src/css/components/table-of-contents.css#L15) | `.ply-table-of-contents > nav → & > .heading`                         | 常時 | `margin: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L16](../src/css/components/table-of-contents.css#L16) | `.ply-table-of-contents > nav → & > .heading`                         | 常時 | `padding-block-end: var(--ply-space-2)`    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L24](../src/css/components/table-of-contents.css#L24) | `.ply-table-of-contents > nav → & > ol`                               | 常時 | `gap: 0`                                   | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L25](../src/css/components/table-of-contents.css#L25) | `.ply-table-of-contents > nav → & > ol`                               | 常時 | `margin: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L26](../src/css/components/table-of-contents.css#L26) | `.ply-table-of-contents > nav → & > ol`                               | 常時 | `padding: 0`                               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L32](../src/css/components/table-of-contents.css#L32) | `.ply-table-of-contents > nav → & > ol > li > a`                      | 常時 | `gap: var(--ply-space-2)`                  | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L34](../src/css/components/table-of-contents.css#L34) | `.ply-table-of-contents > nav → & > ol > li > a`                      | 常時 | `padding-block: 0.375rem`                  | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L64](../src/css/components/table-of-contents.css#L64) | `.ply-table-of-contents > nav → & > ol > li[data-level="3"] > a`      | 常時 | `padding-inline-start: var(--ply-space-4)` | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L72](../src/css/components/table-of-contents.css#L72) | `.ply-table-of-contents > .body`                                      | 常時 | `gap: var(--ply-space-8)`                  | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L80](../src/css/components/table-of-contents.css#L80) | `.ply-table-of-contents > .body > section → & > :is(h2, h3)`          | 常時 | `margin: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L81](../src/css/components/table-of-contents.css#L81) | `.ply-table-of-contents > .body > section → & > :is(h2, h3)`          | 常時 | `scroll-margin-block-start: 5rem`          | `80px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L92](../src/css/components/table-of-contents.css#L92) | `.ply-table-of-contents > .body > section → & > .content`             | 常時 | `margin-block-start: var(--ply-space-2)`   | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L97](../src/css/components/table-of-contents.css#L97) | `.ply-table-of-contents > .body > section → & > .content → & > * + *` | 常時 | `margin-block-start: var(--ply-space-3)`   | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |

## table

セルは左右12pxを外端にも維持。通常行は上下8px、comfortableは12px。見出しは上下4px＋32pxのsortボタンで40px。sortの左右paddingは0、境界0で本文の文字開始と揃える。選択欄は横8px。選択バー内8px/12px、操作間8px、sortラベルと方向印4px。空・読込・失敗は上下32px。

対象: [src/css/components/table.css](../src/css/components/table.css)

| ソース                                       | セレクタの階層                                                                         | 条件 | 宣言値                                  | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------- | ---- | --------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L14](../src/css/components/table.css#L14)   | `.ply-table → &[data-sticky="true"] > table > thead > tr > th`                         | 常時 | `inset-block-start: 0`                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L23](../src/css/components/table.css#L23)   | `.ply-table → & > .state`                                                              | 常時 | `padding-block: var(--ply-space-6)`     | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L24](../src/css/components/table.css#L24)   | `.ply-table → & > .state`                                                              | 常時 | `padding-inline: var(--ply-space-4)`    | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L33](../src/css/components/table.css#L33)   | `.ply-table → & > .selection-bar`                                                      | 常時 | `gap: var(--ply-space-2)`               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L34](../src/css/components/table.css#L34)   | `.ply-table → & > .selection-bar`                                                      | 常時 | `padding-block: var(--ply-space-2)`     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L35](../src/css/components/table.css#L35)   | `.ply-table → & > .selection-bar`                                                      | 常時 | `padding-inline: var(--ply-space-3)`    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L44](../src/css/components/table.css#L44)   | `.ply-table → & > .selection-bar > .actions`                                           | 常時 | `gap: var(--ply-space-2)`               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L50](../src/css/components/table.css#L50)   | `.ply-table → & > table → & > caption`                                                 | 常時 | `padding-block-end: var(--ply-space-3)` | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L57](../src/css/components/table.css#L57)   | `.ply-table → & > table → & > :is(thead, tbody, tfoot) > tr > :is(th, td)`             | 常時 | `padding-block: var(--ply-space-2)`     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L58](../src/css/components/table.css#L58)   | `.ply-table → & > table → & > :is(thead, tbody, tfoot) > tr > :is(th, td)`             | 常時 | `padding-inline: var(--ply-space-3)`    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L65](../src/css/components/table.css#L65)   | `.ply-table → & > table → & > thead > tr > th`                                         | 常時 | `padding-block: var(--ply-space-1)`     | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L92](../src/css/components/table.css#L92)   | `.ply-table → & > table → &[data-density="comfortable"] > tbody > tr > :is(th, td)`    | 常時 | `padding-block: var(--ply-space-3)`     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L97](../src/css/components/table.css#L97)   | `.ply-table → & > table → & > thead > tr > th > .sort`                                 | 常時 | `gap: var(--ply-space-1)`               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L98](../src/css/components/table.css#L98)   | `.ply-table → & > table → & > thead > tr > th > .sort`                                 | 常時 | `padding-inline: 0`                     | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L107](../src/css/components/table.css#L107) | `.ply-table → & > table → & > thead > tr > th > .sort → &::before`                     | 常時 | `inset-block: 0`                        | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L108](../src/css/components/table.css#L108) | `.ply-table → & > table → & > thead > tr > th > .sort → &::before`                     | 常時 | `inset-inline: -0.375rem`               | `-6px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L143](../src/css/components/table.css#L143) | `.ply-table → & > table → & > :is(thead, tbody) > tr > :is(th, td):has(> .ply-choice)` | 常時 | `padding-inline: var(--ply-space-2)`    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L159](../src/css/components/table.css#L159) | `.ply-table → & > table → & > thead > tr > [data-cell="numeric"] > .sort`              | 常時 | `margin-inline-start: auto`             | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |

## tabs

タブ間4px、アイコン・文言間8px、タブ領域と本文16px。20px行に上下7pxと境界を足して36pxを作る。横12px、狭幅では8px。選択線の有無で余白を変えない。

対象: [src/css/components/tabs.css](../src/css/components/tabs.css)

| ソース                                    | セレクタの階層                       | 条件                                      | 宣言値                               | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------- | ------------------------------------ | ----------------------------------------- | ------------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L5](../src/css/components/tabs.css#L5)   | `.ply-tabs`                          | 常時                                      | `gap: var(--ply-space-4)`            | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L18](../src/css/components/tabs.css#L18) | `.ply-tabs → & > .list`              | 常時                                      | `gap: var(--ply-space-1)`            | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L25](../src/css/components/tabs.css#L25) | `.ply-tabs → & > .list → & > button` | 常時                                      | `gap: var(--ply-space-2)`            | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L29](../src/css/components/tabs.css#L29) | `.ply-tabs → & > .list → & > button` | 常時                                      | `padding-block: 0.4375rem`           | `7px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L30](../src/css/components/tabs.css#L30) | `.ply-tabs → & > .list → & > button` | 常時                                      | `padding-inline: var(--ply-space-3)` | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L74](../src/css/components/tabs.css#L74) | `.ply-tabs → & > .list > button`     | @container ply-tabs (inline-size < 24rem) | `padding-inline: var(--ply-space-2)` | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## tag-group

タグ同士は横6px・縦4px。左右の余白が小さいTagを読み分ける横幅を残し、折り返しは一つの分類群として詰める。FilterBarは各ボタンの内側がより広いため外gap 4px。両者の内側と外側の合計を区別する。

対象: [src/css/components/tag-group.css](../src/css/components/tag-group.css)

| ソース                                       | セレクタの階層   | 条件 | 宣言値                  | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------- | ---------------- | ---- | ----------------------- | -------------------- | ---------------------------------------------------------- |
| [L7](../src/css/components/tag-group.css#L7) | `.ply-tag-group` | 常時 | `gap: 0.25rem 0.375rem` | `4px 6px`            | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## tag-input

タグと入力欄は4px、Tag同士も4px。タグの形と削除操作はTagとButtonを再利用し、TagInputだけに別の内側余白を付けない。

対象: [src/css/components/tag-input.css](../src/css/components/tag-input.css)

| ソース                                         | セレクタの階層            | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| ---------------------------------------------- | ------------------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/components/tag-input.css#L4)   | `.ply-tag-input`          | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/tag-input.css#L11) | `.ply-tag-input > .chips` | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L12](../src/css/components/tag-input.css#L12) | `.ply-tag-input > .chips` | 常時 | `margin: 0`               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L13](../src/css/components/tag-input.css#L13) | `.ply-tag-input > .chips` | 常時 | `padding: 0`              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## tag

13px/20pxの分類ラベル。上下1pxと境界2pxで24px、横0.5emで6.5px。タッチリンクは上下11pxと行20px・境界2pxで44px。隣のタグとの間隔はTagGroupが所有する。

対象: [src/css/components/tag.css](../src/css/components/tag.css)

| ソース                                   | セレクタの階層       | 条件 | 宣言値                         | root 16pxでremを換算 | 値の扱い                                                   |
| ---------------------------------------- | -------------------- | ---- | ------------------------------ | -------------------- | ---------------------------------------------------------- |
| [L8](../src/css/components/tag.css#L8)   | `.ply-tag`           | 常時 | `padding-block: 0.125rem`      | `2px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L9](../src/css/components/tag.css#L9)   | `.ply-tag`           | 常時 | `padding-inline: 0.5em`        | `0.5em`              | 文字サイズまたは行高に追従する比率。式を保持する。         |
| [L58](../src/css/components/tag.css#L58) | `.ply-tag.removable` | 常時 | `gap: 0.125rem`                | `2px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L60](../src/css/components/tag.css#L60) | `.ply-tag.removable` | 常時 | `padding-inline-end: 0.125rem` | `2px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## task-list

行内8px、チェックと本文12px。狭幅の補足はチェック列を除いた2.25rem位置へ置く。親子の項目間に二重gapを作らず、子リストの上marginは0。末尾8pxは操作と隣の行の接触を防ぐ。

対象: [src/css/components/task-list.css](../src/css/components/task-list.css)

| ソース                                         | セレクタの階層                              | 条件                                           | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                   |
| ---------------------------------------------- | ------------------------------------------- | ---------------------------------------------- | ---------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L8](../src/css/components/task-list.css#L8)   | `.ply-task-list → & > li`                   | 常時                                           | `gap: var(--ply-space-3)`                | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L17](../src/css/components/task-list.css#L17) | `.ply-task-list → & > li → & > .end`        | 常時                                           | `gap: var(--ply-space-2)`                | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L18](../src/css/components/task-list.css#L18) | `.ply-task-list → & > li → & > .end`        | 常時                                           | `padding-inline-end: var(--ply-space-3)` | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L24](../src/css/components/task-list.css#L24) | `.ply-task-list → & > li → & > .ply-choice` | 常時                                           | `padding-block: var(--ply-space-2)`      | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L25](../src/css/components/task-list.css#L25) | `.ply-task-list → & > li → & > .ply-choice` | 常時                                           | `padding-inline: var(--ply-space-3)`     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L55](../src/css/components/task-list.css#L55) | `.ply-task-list > li`                       | @container ply-task-list (inline-size < 26rem) | `gap: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L57](../src/css/components/task-list.css#L57) | `.ply-task-list > li → & > .end`            | @container ply-task-list (inline-size < 26rem) | `padding-inline-start: 2.25rem`          | `36px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L58](../src/css/components/task-list.css#L58) | `.ply-task-list > li → & > .end`            | @container ply-task-list (inline-size < 26rem) | `padding-block-end: var(--ply-space-2)`  | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |

## timeline

時系列の線からの開始8px、内容側の開始16px。日付と内容の横16px、題名と補足4px、出来事の上下12px。線の位置を本文のmarginで個別補正しない。

対象: [src/css/components/timeline.css](../src/css/components/timeline.css)

| ソース                                        | セレクタの階層                                                                           | 条件 | 宣言値                                       | root 16pxでremを換算 | 値の扱い                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- | ---- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L5](../src/css/components/timeline.css#L5)   | `.ply-timeline`                                                                          | 常時 | `margin: 0`                                  | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L6](../src/css/components/timeline.css#L6)   | `.ply-timeline`                                                                          | 常時 | `padding: 0`                                 | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L7](../src/css/components/timeline.css#L7)   | `.ply-timeline`                                                                          | 常時 | `padding-inline-start: var(--ply-space-2)`   | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L16](../src/css/components/timeline.css#L16) | `.ply-timeline → & > li`                                                                 | 常時 | `gap: var(--ply-space-1) var(--ply-space-4)` | `4px 16px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L18](../src/css/components/timeline.css#L18) | `.ply-timeline → & > li`                                                                 | 常時 | `padding-block: var(--ply-space-3)`          | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L19](../src/css/components/timeline.css#L19) | `.ply-timeline → & > li`                                                                 | 常時 | `padding-inline-start: var(--ply-space-4)`   | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L23](../src/css/components/timeline.css#L23) | `.ply-timeline → & > li → & > .marker`                                                   | 常時 | `inset-inline-start: -0.3125rem`             | `-5px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L24](../src/css/components/timeline.css#L24) | `.ply-timeline → & > li → & > .marker`                                                   | 常時 | `inset-block-start: 1.125rem`                | `18px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L50](../src/css/components/timeline.css#L50) | `.ply-timeline → & > li → & > .body → & > * + *`                                         | 常時 | `margin-block-start: var(--ply-space-1)`     | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L58](../src/css/components/timeline.css#L58) | `.ply-timeline → &[data-variant="milestones"] > li → &[data-state="complete"] > .marker` | 常時 | `inset-inline-start: -0.53125rem`            | `-8.5px`             | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L59](../src/css/components/timeline.css#L59) | `.ply-timeline → &[data-variant="milestones"] > li → &[data-state="complete"] > .marker` | 常時 | `inset-block-start: 0.9375rem`               | `15px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |
| [L81](../src/css/components/timeline.css#L81) | `.ply-timeline → &[data-variant="compact"] > li`                                         | 常時 | `gap: var(--ply-space-1) var(--ply-space-3)` | `4px 12px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L82](../src/css/components/timeline.css#L82) | `.ply-timeline → &[data-variant="compact"] > li`                                         | 常時 | `padding-block: var(--ply-space-2)`          | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L84](../src/css/components/timeline.css#L84) | `.ply-timeline → &[data-variant="compact"] > li → & > .marker`                           | 常時 | `inset-block-start: 0.875rem`                | `14px`               | 通常フローの余白ではなく、固定・絶対配置の端からの距離。         |

## toast

通知内側12px、本文と閉じるボタンの横12px。操作行まで8px、操作同士8px。閉じる操作は独立した列の先頭に固定し、折り返した操作群へ混ぜない。画面端16pxとsafe areaを残し、左右autoで中央へ置く。

対象: [src/css/components/toast.css](../src/css/components/toast.css)

| ソース                                     | セレクタの階層 | 条件 | 宣言値                                                                  | root 16pxでremを換算                     | 値の扱い                                                 |
| ------------------------------------------ | -------------- | ---- | ----------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| [L4](../src/css/components/toast.css#L4)   | `.ply-toast`   | 常時 | `inset-block-start: auto`                                               | `auto`                                   | 可変の残り幅を配置へ使う。固定間隔ではない。             |
| [L5](../src/css/components/toast.css#L5)   | `.ply-toast`   | 常時 | `inset-block-end: max(var(--ply-space-4), env(safe-area-inset-bottom))` | `max(16px, env(safe-area-inset-bottom))` | 通常フローの余白ではなく、固定・絶対配置の端からの距離。 |
| [L6](../src/css/components/toast.css#L6)   | `.ply-toast`   | 常時 | `inset-inline: var(--ply-space-4)`                                      | `16px`                                   | 通常フローの余白ではなく、固定・絶対配置の端からの距離。 |
| [L11](../src/css/components/toast.css#L11) | `.ply-toast`   | 常時 | `margin: 0`                                                             | `0`                                      | この位置では余白を足さない。上記の所有範囲に従う。       |
| [L12](../src/css/components/toast.css#L12) | `.ply-toast`   | 常時 | `margin-inline: auto`                                                   | `auto`                                   | 可変の残り幅を配置へ使う。固定間隔ではない。             |
| [L13](../src/css/components/toast.css#L13) | `.ply-toast`   | 常時 | `padding: 0`                                                            | `0`                                      | この位置では余白を足さない。上記の所有範囲に従う。       |

## toggle-group

隣接する切替操作の間は4px。押下面の内側・文字位置・高さは共通Buttonが所有する。

対象: [src/css/components/toggle-group.css](../src/css/components/toggle-group.css)

| ソース                                          | セレクタの階層      | 条件 | 宣言値                    | root 16pxでremを換算 | 値の扱い                                                   |
| ----------------------------------------------- | ------------------- | ---- | ------------------------- | -------------------- | ---------------------------------------------------------- |
| [L6](../src/css/components/toggle-group.css#L6) | `.ply-toggle-group` | 常時 | `gap: var(--ply-space-1)` | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |

## toolbar

操作同士8px。Buttonが内側を所有するためToolbarにpaddingを重ねない。明示的な末端群だけautoで分ける。

対象: [src/css/components/toolbar.css](../src/css/components/toolbar.css)

| ソース                                       | セレクタの階層            | 条件 | 宣言値                      | root 16pxでremを換算 | 値の扱い                                                   |
| -------------------------------------------- | ------------------------- | ---- | --------------------------- | -------------------- | ---------------------------------------------------------- |
| [L6](../src/css/components/toolbar.css#L6)   | `.ply-toolbar`            | 常時 | `gap: var(--ply-space-1)`   | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L14](../src/css/components/toolbar.css#L14) | `.ply-toolbar → & > .end` | 常時 | `margin-inline-start: auto` | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |

## tooltip

短い補足は上下8px・左右12px。閉じる操作のない小さな面として、長文用overlayの本文余白は持ち込まない。

対象: [src/css/components/tooltip.css](../src/css/components/tooltip.css)

| ソース                                       | セレクタの階層            | 条件                                                                                | 宣言値                                                      | root 16pxでremを換算      | 値の扱い                                                   |
| -------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------------- |
| [L8](../src/css/components/tooltip.css#L8)   | `.ply-tooltip > .content` | 常時                                                                                | `inset-block: auto 1rem`                                    | `auto 16px`               | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L9](../src/css/components/tooltip.css#L9)   | `.ply-tooltip > .content` | 常時                                                                                | `inset-inline: auto`                                        | `auto`                    | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L10](../src/css/components/tooltip.css#L10) | `.ply-tooltip > .content` | 常時                                                                                | `inset-inline-start: 50%`                                   | `50%`                     | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L14](../src/css/components/tooltip.css#L14) | `.ply-tooltip > .content` | 常時                                                                                | `margin: 0`                                                 | `0`                       | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L15](../src/css/components/tooltip.css#L15) | `.ply-tooltip > .content` | 常時                                                                                | `padding-block: var(--ply-space-2)`                         | `8px`                     | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L16](../src/css/components/tooltip.css#L16) | `.ply-tooltip > .content` | 常時                                                                                | `padding-inline: var(--ply-space-3)`                        | `12px`                    | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L22](../src/css/components/tooltip.css#L22) | `.ply-tooltip > .content` | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) | `inset-block: auto`                                         | `auto`                    | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L23](../src/css/components/tooltip.css#L23) | `.ply-tooltip > .content` | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) | `inset-inline: auto`                                        | `auto`                    | 可変の残り幅を配置へ使う。固定間隔ではない。               |
| [L24](../src/css/components/tooltip.css#L24) | `.ply-tooltip > .content` | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) | `inset-block-start: calc(anchor(end) + var(--ply-space-1))` | `calc(anchor(end) + 4px)` | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |
| [L25](../src/css/components/tooltip.css#L25) | `.ply-tooltip > .content` | @supports (inset-block-start: anchor(end)) and (position-try-fallbacks: flip-block) | `inset-inline-start: anchor(center)`                        | `anchor(center)`          | 通常フローの余白ではなく、固定・絶対配置の端からの距離。   |

## tree

階層リストの既定marginとpaddingは0。各行の操作面は上下8px・左右16px、子階層は開始12pxと境界の内側8pxで示す。開閉矢印と名前の間は4px。

対象: [src/css/components/tree.css](../src/css/components/tree.css)

| ソース                                    | セレクタの階層                             | 条件 | 宣言値                                     | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------- | ------------------------------------------ | ---- | ------------------------------------------ | -------------------- | ---------------------------------------------------------------- |
| [L4](../src/css/components/tree.css#L4)   | `.ply-tree,   .ply-tree ul`                | 常時 | `margin: 0`                                | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L5](../src/css/components/tree.css#L5)   | `.ply-tree,   .ply-tree ul`                | 常時 | `padding: 0`                               | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L11](../src/css/components/tree.css#L11) | `.ply-tree`                                | 常時 | `gap: var(--ply-space-1)`                  | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L20](../src/css/components/tree.css#L20) | `.ply-tree → &[data-empty="true"]`         | 常時 | `padding-block: var(--ply-space-2)`        | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L21](../src/css/components/tree.css#L21) | `.ply-tree → &[data-empty="true"]`         | 常時 | `padding-inline: var(--ply-space-4)`       | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L30](../src/css/components/tree.css#L30) | `.ply-tree li > .row`                      | 常時 | `gap: var(--ply-space-1)`                  | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L35](../src/css/components/tree.css#L35) | `.ply-tree li > .row → & > :is(a, .label)` | 常時 | `padding-block: 0.375rem`                  | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L49](../src/css/components/tree.css#L49) | `.ply-tree li > .row → & > .toggle`        | 常時 | `padding-inline: 0`                        | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L84](../src/css/components/tree.css#L84) | `.ply-tree li > ul`                        | 常時 | `gap: var(--ply-space-1)`                  | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L85](../src/css/components/tree.css#L85) | `.ply-tree li > ul`                        | 常時 | `margin-inline-start: var(--ply-space-3)`  | `12px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L86](../src/css/components/tree.css#L86) | `.ply-tree li > ul`                        | 常時 | `padding-inline-start: var(--ply-space-2)` | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |

## treegrid

階層の深さごとに12pxずつ開始位置を増やし、開閉操作と名称は4pxで結ぶ。セル自体の上下左右は共通Tableが所有する。

対象: [src/css/components/treegrid.css](../src/css/components/treegrid.css)

| ソース                                        | セレクタの階層                                                  | 条件 | 宣言値                                                                       | root 16pxでremを換算                     | 値の扱い                                                   |
| --------------------------------------------- | --------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| [L9](../src/css/components/treegrid.css#L9)   | `.ply-treegrid > table > tbody > tr > th > .node`               | 常時 | `gap: var(--ply-space-1)`                                                    | `4px`                                    | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L11](../src/css/components/treegrid.css#L11) | `.ply-treegrid > table > tbody > tr > th > .node`               | 常時 | `padding-inline-start: calc(var(--ply-treegrid-depth) * var(--ply-space-3))` | `calc(var(--ply-treegrid-depth) * 12px)` | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L14](../src/css/components/treegrid.css#L14) | `.ply-treegrid > table > tbody > tr > th > .node → & > .toggle` | 常時 | `padding-inline: 0`                                                          | `0`                                      | この位置では余白を足さない。上記の所有範囲に従う。         |

## value-list

一つの対象の属性を読むため上下6px。項目名と値は狭幅4px、横並びの列間16px。連続する属性群の区切り8px、同じ値の補足4px。

対象: [src/css/components/value-list.css](../src/css/components/value-list.css)

| ソース                                          | セレクタの階層                                          | 条件                                             | 宣言値                                   | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L11](../src/css/components/value-list.css#L11) | `.ply-value-list → & > div`                             | 常時                                             | `gap: var(--ply-space-1)`                | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L12](../src/css/components/value-list.css#L12) | `.ply-value-list → & > div`                             | 常時                                             | `padding-block: 0.375rem`                | `6px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L20](../src/css/components/value-list.css#L20) | `.ply-value-list → & > div → & > dd → & > * + *`        | 常時                                             | `margin-block-start: var(--ply-space-2)` | `8px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L23](../src/css/components/value-list.css#L23) | `.ply-value-list → & > div → & > dd → & > .description` | 常時                                             | `margin-block-start: var(--ply-space-1)` | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L33](../src/css/components/value-list.css#L33) | `.ply-value-list → & > div`                             | @container ply-value-list (inline-size >= 22rem) | `column-gap: var(--ply-space-4)`         | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## layers

カスケード順序だけを宣言する。余白を所有しない。

対象: [src/css/layers.css](../src/css/layers.css)

gap・margin・padding・insetの宣言はありません。

## layout

汎用配置の所有元。Stackは章間24px、smallは別の小区分12px、largeは48px。Clusterは自然幅の要素間8pxへ統一。Splitは異なる内容の列間24px。フォームの項目群は32px、同じ行の項目は16px。用途の異なる間隔を一つの数に統合しない。

対象: [src/css/layout.css](../src/css/layout.css)

| ソース                             | セレクタの階層                       | 条件 | 宣言値                                    | root 16pxでremを換算 | 値の扱い                                                   |
| ---------------------------------- | ------------------------------------ | ---- | ----------------------------------------- | -------------------- | ---------------------------------------------------------- |
| [L4](../src/css/layout.css#L4)     | `.ply-split`                         | 常時 | `gap: var(--ply-space-6)`                 | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L12](../src/css/layout.css#L12)   | `.ply-workspace`                     | 常時 | `gap: var(--ply-space-8)`                 | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L30](../src/css/layout.css#L30)   | `.ply-stack`                         | 常時 | `gap: var(--ply-space-6)`                 | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L37](../src/css/layout.css#L37)   | `.ply-stack → &[data-space="large"]` | 常時 | `gap: var(--ply-space-12)`                | `48px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L41](../src/css/layout.css#L41)   | `.ply-stack → &[data-space="small"]` | 常時 | `gap: var(--ply-space-3)`                 | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L50](../src/css/layout.css#L50)   | `.ply-cluster`                       | 常時 | `gap: var(--ply-space-2)`                 | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L63](../src/css/layout.css#L63)   | `.ply-form`                          | 常時 | `gap: var(--ply-space-8)`                 | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L76](../src/css/layout.css#L76)   | `.ply-workbar`                       | 常時 | `gap: var(--ply-space-3)`                 | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L77](../src/css/layout.css#L77)   | `.ply-workbar`                       | 常時 | `padding-block: 0`                        | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |
| [L94](../src/css/layout.css#L94)   | `.ply-fields-inline`                 | 常時 | `gap: var(--ply-space-4)`                 | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L103](../src/css/layout.css#L103) | `.ply-form-actions`                  | 常時 | `gap: var(--ply-space-4)`                 | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L104](../src/css/layout.css#L104) | `.ply-form-actions`                  | 常時 | `padding-block-start: var(--ply-space-4)` | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。 |
| [L112](../src/css/layout.css#L112) | `.ply-reading-pane`                  | 常時 | `gap: var(--ply-space-6)`                 | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。 |
| [L124](../src/css/layout.css#L124) | `.ply-visually-hidden`               | 常時 | `padding: 0`                              | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。         |

## reset

ブラウザ既定の見出し・段落・リスト・fieldsetのmarginを0にし、部品または配置の一方だけが余白を所有する。box-sizing:border-boxで境界を二重加算しない。

対象: [src/css/reset.css](../src/css/reset.css)

| ソース                        | セレクタの階層                                          | 条件 | 宣言値      | root 16pxでremを換算 | 値の扱い                                           |
| ----------------------------- | ------------------------------------------------------- | ---- | ----------- | -------------------- | -------------------------------------------------- |
| [L9](../src/css/reset.css#L9) | `:where(body, h1, h2, h3, p, ol, ul, dl, dd, fieldset)` | 常時 | `margin: 0` | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。 |

## tokens

余白トークンは1=4px、2=8px、3=12px、4=16px、5=20px、6=24px、8=32px、12=48px、18=72px（root 16px）。実際の使用箇所は下の全宣言で判断し、トークンが存在することを採用理由にはしない。

対象: [src/css/tokens.css](../src/css/tokens.css)

gap・margin・padding・insetの宣言はありません。

## catalog

カタログ固有の比較枠・章・コード例・旧組み合わせ例の余白。全宣言を分離して掲載する。部品の内側には流用しない。比較する別部品の章間24/48px、コードや補足のまとまり12/16px、局所操作4/8pxを基準にする。旧デモ固有の余白は部品の公開基準に含めない。

対象: [catalog/catalog.css](../catalog/catalog.css)

| ソース                              | セレクタの階層                                                  | 条件                      | 宣言値                                                  | root 16pxでremを換算 | 値の扱い                                                         |
| ----------------------------------- | --------------------------------------------------------------- | ------------------------- | ------------------------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| [L7](../catalog/catalog.css#L7)     | `.catalog-review`                                               | 常時                      | `gap: var(--ply-space-12)`                              | `48px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L13](../catalog/catalog.css#L13)   | `.catalog-specimen → & > h2`                                    | 常時                      | `padding-block-end: var(--ply-space-3)`                 | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L21](../catalog/catalog.css#L21)   | `.catalog-specimen → & > .example`                              | 常時                      | `margin-block-start: var(--ply-space-6)`                | `24px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L28](../catalog/catalog.css#L28)   | `.catalog-person`                                               | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L38](../catalog/catalog.css#L38)   | `.catalog-app-heading`                                          | 常時                      | `gap: var(--ply-space-2) var(--ply-space-4)`            | `8px 16px`           | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L57](../catalog/catalog.css#L57)   | `.catalog-shell`                                                | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L58](../catalog/catalog.css#L58)   | `.catalog-shell`                                                | 常時                      | `padding-block: var(--ply-space-6) var(--ply-space-12)` | `24px 48px`          | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L65](../catalog/catalog.css#L65)   | `.catalog-nav`                                                  | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L76](../catalog/catalog.css#L76)   | `.catalog-nav → & > a:first-child`                              | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L86](../catalog/catalog.css#L86)   | `.catalog-nav > a > span`                                       | 常時                      | `padding-block: var(--ply-space-1)`                     | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L87](../catalog/catalog.css#L87)   | `.catalog-nav > a > span`                                       | 常時                      | `padding-inline: var(--ply-space-2)`                    | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L97](../catalog/catalog.css#L97)   | `.catalog-index`                                                | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L100](../catalog/catalog.css#L100) | `.catalog-index`                                                | 常時                      | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L104](../catalog/catalog.css#L104) | `.catalog-index → & > li > a`                                   | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L106](../catalog/catalog.css#L106) | `.catalog-index → & > li > a`                                   | 常時                      | `padding-block: var(--ply-space-3)`                     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L124](../catalog/catalog.css#L124) | `.catalog-editor-heading,   .catalog-tool-heading`              | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L139](../catalog/catalog.css#L139) | `.catalog-tools`                                                | 常時                      | `gap: var(--ply-space-8)`                               | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L143](../catalog/catalog.css#L143) | `.catalog-tools → & > section`                                  | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L152](../catalog/catalog.css#L152) | `.catalog-tools → & .catalog-tool-heading > h2`                 | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L171](../catalog/catalog.css#L171) | `.catalog-tool-preview`                                         | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L172](../catalog/catalog.css#L172) | `.catalog-tool-preview`                                         | 常時                      | `padding-block: var(--ply-space-6)`                     | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L173](../catalog/catalog.css#L173) | `.catalog-tool-preview`                                         | 常時                      | `padding-inline: var(--ply-space-6)`                    | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L178](../catalog/catalog.css#L178) | `.catalog-file-preview`                                         | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L180](../catalog/catalog.css#L180) | `.catalog-file-preview`                                         | 常時                      | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L183](../catalog/catalog.css#L183) | `.catalog-file-preview → & > li`                                | 常時                      | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L196](../catalog/catalog.css#L196) | `.catalog-paper`                                                | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L197](../catalog/catalog.css#L197) | `.catalog-paper`                                                | 常時                      | `padding-block: var(--ply-space-4)`                     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L198](../catalog/catalog.css#L198) | `.catalog-paper`                                                | 常時                      | `padding-inline: var(--ply-space-6)`                    | `24px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L241](../catalog/catalog.css#L241) | `.catalog-date-preview`                                         | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L261](../catalog/catalog.css#L261) | `.catalog-sales-preview`                                        | 常時                      | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L274](../catalog/catalog.css#L274) | `.catalog-secondary-links`                                      | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L279](../catalog/catalog.css#L279) | `.catalog-search`                                               | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L284](../catalog/catalog.css#L284) | `.catalog-search-input`                                         | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L290](../catalog/catalog.css#L290) | `.catalog-search-options`                                       | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L291](../catalog/catalog.css#L291) | `.catalog-search-options`                                       | 常時                      | `padding-block-start: var(--ply-space-2)`               | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L297](../catalog/catalog.css#L297) | `.catalog-search-options → & > span`                            | 常時                      | `margin-inline-start: auto`                             | `auto`               | 可変の残り幅を配置へ使う。固定間隔ではない。                     |
| [L303](../catalog/catalog.css#L303) | `.catalog-articles`                                             | 常時                      | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L309](../catalog/catalog.css#L309) | `.catalog-articles → & > li`                                    | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L311](../catalog/catalog.css#L311) | `.catalog-articles → & > li`                                    | 常時                      | `padding-block: var(--ply-space-4)`                     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L315](../catalog/catalog.css#L315) | `.catalog-articles → & a`                                       | 常時                      | `padding-block: var(--ply-space-2)`                     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L340](../catalog/catalog.css#L340) | `.catalog-search-empty`                                         | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L341](../catalog/catalog.css#L341) | `.catalog-search-empty`                                         | 常時                      | `padding-block: var(--ply-space-8)`                     | `32px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L349](../catalog/catalog.css#L349) | `.catalog-nav`                                                  | @media (max-width: 42rem) | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L352](../catalog/catalog.css#L352) | `.catalog-nav → & > .ply-cluster`                               | @media (max-width: 42rem) | `column-gap: var(--ply-space-4)`                        | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L353](../catalog/catalog.css#L353) | `.catalog-nav → & > .ply-cluster`                               | @media (max-width: 42rem) | `row-gap: var(--ply-space-2)`                           | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L363](../catalog/catalog.css#L363) | `.catalog-search.ply-workbar`                                   | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L364](../catalog/catalog.css#L364) | `.catalog-search.ply-workbar`                                   | 常時                      | `padding-block: var(--ply-space-4)`                     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L375](../catalog/catalog.css#L375) | `.catalog-article-date`                                         | 常時                      | `padding-block-start: var(--ply-space-1)`               | `4px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L390](../catalog/catalog.css#L390) | `.catalog-sales-total`                                          | 常時                      | `gap: var(--ply-space-8)`                               | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L391](../catalog/catalog.css#L391) | `.catalog-sales-total`                                          | 常時                      | `padding-block: var(--ply-space-4)`                     | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L394](../catalog/catalog.css#L394) | `.catalog-sales-total → & > div`                                | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L401](../catalog/catalog.css#L401) | `.catalog-sales-total → & dd`                                   | 常時                      | `margin: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L407](../catalog/catalog.css#L407) | `.catalog-sales-total → & small`                                | 常時                      | `margin-inline-start: var(--ply-space-1)`               | `4px`                | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L419](../catalog/catalog.css#L419) | `.catalog-nav > .ply-cluster`                                   | 常時                      | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L424](../catalog/catalog.css#L424) | `.catalog-nav > .ply-cluster → & > a`                           | 常時                      | `padding-inline: var(--ply-space-3)`                    | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L446](../catalog/catalog.css#L446) | `.catalog-component-jump`                                       | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L447](../catalog/catalog.css#L447) | `.catalog-component-jump`                                       | 常時                      | `padding-block: var(--ply-space-3)`                     | `12px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L450](../catalog/catalog.css#L450) | `.catalog-component-jump → & > a`                               | 常時                      | `padding-block: var(--ply-space-2)`                     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L457](../catalog/catalog.css#L457) | `.catalog-component-index`                                      | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L459](../catalog/catalog.css#L459) | `.catalog-component-index`                                      | 常時                      | `padding: 0`                                            | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L463](../catalog/catalog.css#L463) | `.catalog-component-index → & > li`                             | 常時                      | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L465](../catalog/catalog.css#L465) | `.catalog-component-index → & > li`                             | 常時                      | `padding-block-end: var(--ply-space-4)`                 | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L469](../catalog/catalog.css#L469) | `.catalog-component-index → & a`                                | 常時                      | `padding-block: var(--ply-space-2)`                     | `8px`                | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L480](../catalog/catalog.css#L480) | `.catalog-task-add`                                             | 常時                      | `gap: var(--ply-space-3)`                               | `12px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L488](../catalog/catalog.css#L488) | `.catalog-settings-layout`                                      | 常時                      | `gap: var(--ply-space-8)`                               | `32px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L500](../catalog/catalog.css#L500) | `.ply-writing`                                                  | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L505](../catalog/catalog.css#L505) | `.ply-writing-page`                                             | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L515](../catalog/catalog.css#L515) | `.ply-input[data-kind="title"],   .ply-input[data-kind="body"]` | 常時                      | `padding-inline: 0`                                     | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L528](../catalog/catalog.css#L528) | `.ply-input[data-kind="title"]`                                 | 常時                      | `padding-block: var(--ply-space-2) var(--ply-space-4)`  | `8px 16px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L540](../catalog/catalog.css#L540) | `.ply-writing-foot`                                             | 常時                      | `gap: var(--ply-space-2)`                               | `8px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L547](../catalog/catalog.css#L547) | `.ply-reading`                                                  | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L565](../catalog/catalog.css#L565) | `.ply-writing-page → & > label:not(:first-child)`               | 常時                      | `margin-block-start: var(--ply-space-6)`                | `24px`               | 前後または隣の要素との関係。上記の段落・区画・境界の規則を適用。 |
| [L571](../catalog/catalog.css#L571) | `.ply-input[data-kind="title"]`                                 | 常時                      | `padding-block: var(--ply-space-1) var(--ply-space-3)`  | `4px 12px`           | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L583](../catalog/catalog.css#L583) | `.ply-review`                                                   | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L588](../catalog/catalog.css#L588) | `.ply-review-pair`                                              | 常時                      | `gap: var(--ply-space-6)`                               | `24px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L592](../catalog/catalog.css#L592) | `.ply-review-pair → & > section`                                | 常時                      | `gap: var(--ply-space-4)`                               | `16px`               | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |
| [L595](../catalog/catalog.css#L595) | `.ply-review-pair → & > section`                                | 常時                      | `padding-block-start: var(--ply-space-4)`               | `16px`               | この要素自身の内側。上記の領域・操作高・境界の計算を適用。       |
| [L607](../catalog/catalog.css#L607) | `.ply-review-pair → & h3`                                       | 常時                      | `margin: 0`                                             | `0`                  | この位置では余白を足さない。上記の所有範囲に従う。               |
| [L637](../catalog/catalog.css#L637) | `.ply-mode-switch`                                              | 常時                      | `gap: var(--ply-space-1)`                               | `4px`                | 並ぶ子の間隔。二値は行・列の順。上記の部品内の役割を適用。       |

## カタログ例に重なる配置の余白

部品のCSSだけでなく、この配置も見た目へ加算されます。TagにはTagGroup、連続DisclosureにはDisclosureGroupを使います。汎用Stack/Clusterを使う例は以下の全箇所です。

| ソース                                                                       | 配置          | data-space | 所有元                                                     |
| ---------------------------------------------------------------------------- | ------------- | ---------- | ---------------------------------------------------------- |
| [action-list.tsx:3](../catalog/hono-examples/action-list.tsx#L3)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [avatar.tsx:3](../catalog/hono-examples/avatar.tsx#L3)                       | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [badge.tsx:3](../catalog/hono-examples/badge.tsx#L3)                         | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [badge.tsx:4](../catalog/hono-examples/badge.tsx#L4)                         | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [board.tsx:12](../catalog/hono-examples/board.tsx#L12)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:4](../catalog/hono-examples/button.tsx#L4)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:5](../catalog/hono-examples/button.tsx#L5)                       | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:9](../catalog/hono-examples/button.tsx#L9)                       | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:15](../catalog/hono-examples/button.tsx#L15)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:21](../catalog/hono-examples/button.tsx#L21)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:37](../catalog/hono-examples/button.tsx#L37)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:40](../catalog/hono-examples/button.tsx#L40)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:42](../catalog/hono-examples/button.tsx#L42)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:70](../catalog/hono-examples/button.tsx#L70)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:72](../catalog/hono-examples/button.tsx#L72)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [button.tsx:98](../catalog/hono-examples/button.tsx#L98)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [calendar.tsx:49](../catalog/hono-examples/calendar.tsx#L49)                 | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [card.tsx:3](../catalog/hono-examples/card.tsx#L3)                           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [card.tsx:4](../catalog/hono-examples/card.tsx#L4)                           | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [card.tsx:19](../catalog/hono-examples/card.tsx#L19)                         | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [carousel.tsx:4](../catalog/hono-examples/carousel.tsx#L4)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [code-block.tsx:17](../catalog/hono-examples/code-block.tsx#L17)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [color-picker.tsx:4](../catalog/hono-examples/color-picker.tsx#L4)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [color-picker.tsx:13](../catalog/hono-examples/color-picker.tsx#L13)         | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [command-menu.tsx:3](../catalog/hono-examples/command-menu.tsx#L3)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [comparison.tsx:4](../catalog/hono-examples/comparison.tsx#L4)               | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [composer.tsx:4](../catalog/hono-examples/composer.tsx#L4)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:17](../catalog/hono-examples/context-bar.tsx#L17)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:18](../catalog/hono-examples/context-bar.tsx#L18)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:22](../catalog/hono-examples/context-bar.tsx#L22)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:31](../catalog/hono-examples/context-bar.tsx#L31)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:49](../catalog/hono-examples/context-bar.tsx#L49)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:70](../catalog/hono-examples/context-bar.tsx#L70)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:91](../catalog/hono-examples/context-bar.tsx#L91)           | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:126](../catalog/hono-examples/context-bar.tsx#L126)         | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:141](../catalog/hono-examples/context-bar.tsx#L141)         | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [context-bar.tsx:144](../catalog/hono-examples/context-bar.tsx#L144)         | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [danger-zone.tsx:4](../catalog/hono-examples/danger-zone.tsx#L4)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [danger-zone.tsx:84](../catalog/hono-examples/danger-zone.tsx#L84)           | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [date-picker.tsx:4](../catalog/hono-examples/date-picker.tsx#L4)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [date-picker.tsx:76](../catalog/hono-examples/date-picker.tsx#L76)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dialog.tsx:4](../catalog/hono-examples/dialog.tsx#L4)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dialog.tsx:63](../catalog/hono-examples/dialog.tsx#L63)                     | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dialog.tsx:78](../catalog/hono-examples/dialog.tsx#L78)                     | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dialog.tsx:118](../catalog/hono-examples/dialog.tsx#L118)                   | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [disclosure.tsx:4](../catalog/hono-examples/disclosure.tsx#L4)               | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [disclosure.tsx:14](../catalog/hono-examples/disclosure.tsx#L14)             | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [disclosure.tsx:25](../catalog/hono-examples/disclosure.tsx#L25)             | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [disclosure.tsx:52](../catalog/hono-examples/disclosure.tsx#L52)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [disclosure.tsx:56](../catalog/hono-examples/disclosure.tsx#L56)             | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [divider.tsx:4](../catalog/hono-examples/divider.tsx#L4)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dropdown-menu.tsx:11](../catalog/hono-examples/dropdown-menu.tsx#L11)       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dropdown-menu.tsx:131](../catalog/hono-examples/dropdown-menu.tsx#L131)     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dropdown-menu.tsx:168](../catalog/hono-examples/dropdown-menu.tsx#L168)     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [dropdown-menu.tsx:183](../catalog/hono-examples/dropdown-menu.tsx#L183)     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [editable-property.tsx:4](../catalog/hono-examples/editable-property.tsx#L4) | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [empty-state.tsx:3](../catalog/hono-examples/empty-state.tsx#L3)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [error-summary.tsx:3](../catalog/hono-examples/error-summary.tsx#L3)         | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [field-group.tsx:4](../catalog/hono-examples/field-group.tsx#L4)             | `ply-form`    | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [field.tsx:19](../catalog/hono-examples/field.tsx#L19)                       | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [field.tsx:45](../catalog/hono-examples/field.tsx#L45)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [field.tsx:89](../catalog/hono-examples/field.tsx#L89)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [field.tsx:179](../catalog/hono-examples/field.tsx#L179)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [file-input.tsx:4](../catalog/hono-examples/file-input.tsx#L4)               | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [file-input.tsx:17](../catalog/hono-examples/file-input.tsx#L17)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [filter-bar.tsx:4](../catalog/hono-examples/filter-bar.tsx#L4)               | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [filter-bar.tsx:5](../catalog/hono-examples/filter-bar.tsx#L5)               | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [filter-bar.tsx:16](../catalog/hono-examples/filter-bar.tsx#L16)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [grid.tsx:14](../catalog/hono-examples/grid.tsx#L14)                         | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [hover-card.tsx:4](../catalog/hono-examples/hover-card.tsx#L4)               | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [icon.tsx:3](../catalog/hono-examples/icon.tsx#L3)                           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [icon.tsx:4](../catalog/hono-examples/icon.tsx#L4)                           | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [icon.tsx:17](../catalog/hono-examples/icon.tsx#L17)                         | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [icon.tsx:25](../catalog/hono-examples/icon.tsx#L25)                         | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [image-cropper.tsx:4](../catalog/hono-examples/image-cropper.tsx#L4)         | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [image-cropper.tsx:15](../catalog/hono-examples/image-cropper.tsx#L15)       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [image-frame.tsx:4](../catalog/hono-examples/image-frame.tsx#L4)             | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [image-frame.tsx:6](../catalog/hono-examples/image-frame.tsx#L6)             | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [input-group.tsx:4](../catalog/hono-examples/input-group.tsx#L4)             | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [input-group.tsx:58](../catalog/hono-examples/input-group.tsx#L58)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [keycap.tsx:3](../catalog/hono-examples/keycap.tsx#L3)                       | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [loading.tsx:3](../catalog/hono-examples/loading.tsx#L3)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [loading.tsx:14](../catalog/hono-examples/loading.tsx#L14)                   | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [message-list.tsx:3](../catalog/hono-examples/message-list.tsx#L3)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [notice.tsx:3](../catalog/hono-examples/notice.tsx#L3)                       | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [picker.tsx:11](../catalog/hono-examples/picker.tsx#L11)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [popover.tsx:4](../catalog/hono-examples/popover.tsx#L4)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [popover.tsx:10](../catalog/hono-examples/popover.tsx#L10)                   | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [popover.tsx:63](../catalog/hono-examples/popover.tsx#L63)                   | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [popover.tsx:88](../catalog/hono-examples/popover.tsx#L88)                   | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [popover.tsx:110](../catalog/hono-examples/popover.tsx#L110)                 | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [progress.tsx:3](../catalog/hono-examples/progress.tsx#L3)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [range.tsx:4](../catalog/hono-examples/range.tsx#L4)                         | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [range.tsx:25](../catalog/hono-examples/range.tsx#L25)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [split-view.tsx:14](../catalog/hono-examples/split-view.tsx#L14)             | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [statistic.tsx:3](../catalog/hono-examples/statistic.tsx#L3)                 | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [suggestion.tsx:4](../catalog/hono-examples/suggestion.tsx#L4)               | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [suggestion.tsx:17](../catalog/hono-examples/suggestion.tsx#L17)             | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [surface.tsx:3](../catalog/hono-examples/surface.tsx#L3)                     | `ply-split`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [switch.tsx:4](../catalog/hono-examples/switch.tsx#L4)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [switch.tsx:17](../catalog/hono-examples/switch.tsx#L17)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [table-of-contents.tsx:4](../catalog/hono-examples/table-of-contents.tsx#L4) | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [table.tsx:57](../catalog/hono-examples/table.tsx#L57)                       | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [tabs.tsx:4](../catalog/hono-examples/tabs.tsx#L4)                           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [tag-input.tsx:4](../catalog/hono-examples/tag-input.tsx#L4)                 | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [timeline.tsx:4](../catalog/hono-examples/timeline.tsx#L4)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [timeline.tsx:5](../catalog/hono-examples/timeline.tsx#L5)                   | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [timeline.tsx:25](../catalog/hono-examples/timeline.tsx#L25)                 | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [timeline.tsx:37](../catalog/hono-examples/timeline.tsx#L37)                 | `ply-stack`   | `small`    | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [toast.tsx:4](../catalog/hono-examples/toast.tsx#L4)                         | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [toggle-group.tsx:4](../catalog/hono-examples/toggle-group.tsx#L4)           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [toolbar.tsx:4](../catalog/hono-examples/toolbar.tsx#L4)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [toolbar.tsx:5](../catalog/hono-examples/toolbar.tsx#L5)                     | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [toolbar.tsx:36](../catalog/hono-examples/toolbar.tsx#L36)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [tooltip.tsx:4](../catalog/hono-examples/tooltip.tsx#L4)                     | `ply-cluster` | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [tree.tsx:4](../catalog/hono-examples/tree.tsx#L4)                           | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
| [treegrid.tsx:4](../catalog/hono-examples/treegrid.tsx#L4)                   | `ply-stack`   | `default`  | layout.cssの該当宣言。部品内の余白に加算される配置側の値。 |
