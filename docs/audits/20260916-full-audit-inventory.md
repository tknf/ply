# Ply 全体監査の対象目録

監査開始時点：`bbcd1ae`<br>
先行修正push：`7507b1a`<br>
この目録は`catalog/component-groups.ts`、`src/hono/index.ts`、`src/css`、`src/controllers/index.ts`、`catalog/hono-examples`から作り直した。分類ID、公開runtime value、CSSファイル、カタログ例は同じものではないため、列を分けている。

「静的確認済み」は、ソースの存在、SSR出力、配布型・配布CSSとの関係を確認したという意味である。「実画面未確認」は、全56分類を人手で一つずつ操作・目視していないことを示す。別途、`vp run test:visual`で全分類の自動画面検査を実施し、代表部品は手動ブラウザでも確認した。通常表示を見ただけの部品を、全状態確認済みとは扱わない。

## 56分類

| 領域         | 分類ID          | Hono source                  | 専用CSS                                                                        | カタログ例                                | 動作の所有                                                          | 確認                   |
| ------------ | --------------- | ---------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------- | ---------------------- |
| 作業面と移動 | `app-shell`     | `src/hono/app-shell.tsx`     | `src/css/components/app-shell.css`                                             | `catalog/hono-examples/app-shell.tsx`     | native layout                                                       | 静的済み／実画面未確認 |
| 作業面と移動 | `command-menu`  | `src/hono/command-menu.tsx`  | `src/css/components/command-menu.css`                                          | `catalog/hono-examples/command-menu.tsx`  | `CommandMenuController`                                             | 静的済み／実画面未確認 |
| 作業面と移動 | `split-view`    | `src/hono/split-view.tsx`    | `src/css/components/split-view.css`                                            | `catalog/hono-examples/split-view.tsx`    | native layout。`SplitterController`はUIのみ                         | 静的済み／実画面未確認 |
| 作業面と移動 | `section`       | `src/hono/section.tsx`       | `src/css/components/section.css`                                               | `catalog/hono-examples/section.tsx`       | native HTML                                                         | 静的済み／実画面未確認 |
| 作業面と移動 | `surface`       | `src/hono/surface.tsx`       | `src/css/components/surface.css`                                               | `catalog/hono-examples/surface.tsx`       | native layout                                                       | 静的済み／実画面未確認 |
| 作業面と移動 | `context-bar`   | `src/hono/context-bar.tsx`   | `src/css/components/context-bar.css`                                           | `catalog/hono-examples/context-bar.tsx`   | `Breadcrumb`とchildren                                              | 静的済み／実画面未確認 |
| 作業面と移動 | `page-header`   | `src/hono/page-header.tsx`   | `src/css/components/page-header.css`                                           | `catalog/hono-examples/page-header.tsx`   | native heading                                                      | 静的済み／実画面未確認 |
| 作業面と移動 | `breadcrumb`    | `src/hono/breadcrumb.tsx`    | `src/css/components/breadcrumb.css`                                            | `catalog/hono-examples/breadcrumb.tsx`    | native navigation                                                   | 静的済み／実画面未確認 |
| 作業面と移動 | `navigation`    | `src/hono/navigation.tsx`    | `src/css/components/navigation.css`                                            | `catalog/hono-examples/navigation.tsx`    | native links                                                        | 静的済み／実画面未確認 |
| 作業面と移動 | `tabs`          | `src/hono/tabs.tsx`          | `src/css/components/tabs.css`                                                  | `catalog/hono-examples/tabs.tsx`          | `TabsController`                                                    | 静的済み／実画面未確認 |
| 作業面と移動 | `pagination`    | `src/hono/pagination.tsx`    | `src/css/components/pagination.css`                                            | `catalog/hono-examples/pagination.tsx`    | native links                                                        | 静的済み／実画面未確認 |
| 作業面と移動 | `steps`         | `src/hono/steps.tsx`         | `src/css/components/steps.css`                                                 | `catalog/hono-examples/steps.tsx`         | native links                                                        | 静的済み／実画面未確認 |
| 作業面と移動 | `divider`       | `src/hono/divider.tsx`       | `src/css/components/divider.css`                                               | `catalog/hono-examples/divider.tsx`       | native `hr`                                                         | 静的済み／実画面未確認 |
| 入力と選択   | `field`         | `src/hono/field.tsx`         | `src/css/components/field.css`                                                 | `catalog/hono-examples/field.tsx`         | native form。公開入力は下表                                         | 静的済み／実画面未確認 |
| 入力と選択   | `field-group`   | `src/hono/field.tsx`         | `src/css/components/field.css`                                                 | `catalog/hono-examples/field-group.tsx`   | native `fieldset`                                                   | 静的済み／実画面未確認 |
| 入力と選択   | `input-group`   | `src/hono/input-group.tsx`   | `src/css/components/input-group.css`                                           | `catalog/hono-examples/input-group.tsx`   | native form。number時は`NumberFieldController`                      | 静的済み／実画面未確認 |
| 入力と選択   | `switch`        | `src/hono/switch.tsx`        | `src/css/components/switch.css`                                                | `catalog/hono-examples/switch.tsx`        | native checkbox                                                     | 静的済み／実画面未確認 |
| 入力と選択   | `range`         | `src/hono/range.tsx`         | `src/css/components/range.css`                                                 | `catalog/hono-examples/range.tsx`         | `RangeController` → `SliderController`                              | 静的済み／実画面未確認 |
| 入力と選択   | `suggestion`    | `src/hono/suggestion.tsx`    | `src/css/components/suggestion.css`                                            | `catalog/hono-examples/suggestion.tsx`    | `SuggestionController` → `ComboboxController`                       | 静的済み／実画面未確認 |
| 入力と選択   | `date-picker`   | `src/hono/date-picker.tsx`   | `src/css/components/date-picker.css`                                           | `catalog/hono-examples/date-picker.tsx`   | `DatePickerController` → `CalendarController`                       | 静的済み／実画面未確認 |
| 入力と選択   | `file-input`    | `src/hono/file-input.tsx`    | `src/css/components/file-input.css`                                            | `catalog/hono-examples/file-input.tsx`    | `FileInputController` → `FileDropController`                        | 静的済み／実画面未確認 |
| 入力と選択   | `filter-bar`    | `src/hono/filter-bar.tsx`    | `src/css/components/filter-bar.css`                                            | `catalog/hono-examples/filter-bar.tsx`    | native links                                                        | 静的済み／実画面未確認 |
| 操作と補足   | `button`        | `src/hono/button.tsx`        | `src/css/components/button.css`                                                | `catalog/hono-examples/button.tsx`        | native button                                                       | 静的済み／実画面未確認 |
| 操作と補足   | `toolbar`       | `src/hono/toolbar.tsx`       | `src/css/components/toolbar.css`                                               | `catalog/hono-examples/toolbar.tsx`       | native group。上流Toolbarは未接続                                   | 静的済み／実画面未確認 |
| 操作と補足   | `dropdown-menu` | `src/hono/dropdown-menu.tsx` | `src/css/components/dropdown-menu.css`                                         | `catalog/hono-examples/dropdown-menu.tsx` | Ply独自`DropdownMenuController`                                     | 静的済み／実画面未確認 |
| 操作と補足   | `dialog`        | `src/hono/dialog.tsx`        | `src/css/components/dialog.css`                                                | `catalog/hono-examples/dialog.tsx`        | `DialogController` → upstream Dialog                                | 静的済み／実画面未確認 |
| 操作と補足   | `popover`       | `src/hono/popover.tsx`       | `src/css/components/popover.css`                                               | `catalog/hono-examples/popover.tsx`       | `PopoverController` + Popover API                                   | 静的済み／実画面未確認 |
| 操作と補足   | `disclosure`    | `src/hono/disclosure.tsx`    | `src/css/components/disclosure.css`、`src/css/components/disclosure-group.css` | `catalog/hono-examples/disclosure.tsx`    | native `details`／`name`                                            | 静的済み／実画面未確認 |
| 操作と補足   | `danger-zone`   | `src/hono/danger-zone.tsx`   | `src/css/components/danger-zone.css`                                           | `catalog/hono-examples/danger-zone.tsx`   | native layout                                                       | 静的済み／実画面未確認 |
| 操作と補足   | `keycap`        | `src/hono/keycap.tsx`        | `src/css/components/keycap.css`                                                | `catalog/hono-examples/keycap.tsx`        | native text                                                         | 静的済み／実画面未確認 |
| 内容と一覧   | `card`          | `src/hono/card.tsx`          | `src/css/components/card.css`                                                  | `catalog/hono-examples/card.tsx`          | native article/link                                                 | 静的済み／実画面未確認 |
| 内容と一覧   | `message`       | `src/hono/message.tsx`       | `src/css/components/message.css`                                               | `catalog/hono-examples/message.tsx`       | native article                                                      | 静的済み／実画面未確認 |
| 内容と一覧   | `message-list`  | `src/hono/message-list.tsx`  | `src/css/components/message-list.css`                                          | `catalog/hono-examples/message-list.tsx`  | native links/status                                                 | 静的済み／実画面未確認 |
| 内容と一覧   | `table`         | `src/hono/table.tsx`         | `src/css/components/table.css`                                                 | `catalog/hono-examples/table.tsx`         | `TableController` + `TableSortController` + `TableSelectController` | 静的済み／実画面未確認 |
| 内容と一覧   | `value-list`    | `src/hono/value-list.tsx`    | `src/css/components/value-list.css`                                            | `catalog/hono-examples/value-list.tsx`    | native `dl`                                                         | 静的済み／実画面未確認 |
| 内容と一覧   | `data-list`     | `src/hono/data-list.tsx`     | `src/css/components/data-list.css`                                             | `catalog/hono-examples/data-list.tsx`     | native links                                                        | 静的済み／実画面未確認 |
| 内容と一覧   | `action-list`   | `src/hono/action-list.tsx`   | `src/css/components/action-list.css`                                           | `catalog/hono-examples/action-list.tsx`   | native links                                                        | 静的済み／実画面未確認 |
| 内容と一覧   | `file-item`     | `src/hono/file-item.tsx`     | `src/css/components/file-item.css`                                             | `catalog/hono-examples/file-item.tsx`     | native links/actions                                                | 静的済み／実画面未確認 |
| 内容と一覧   | `image-frame`   | `src/hono/image-frame.tsx`   | `src/css/components/image-frame.css`                                           | `catalog/hono-examples/image-frame.tsx`   | native image/fallback                                               | 静的済み／実画面未確認 |
| 内容と一覧   | `comparison`    | `src/hono/comparison.tsx`    | `src/css/components/comparison.css`                                            | `catalog/hono-examples/comparison.tsx`    | native layout                                                       | 静的済み／実画面未確認 |
| 内容と一覧   | `avatar`        | `src/hono/avatar.tsx`        | `src/css/components/avatar.css`                                                | `catalog/hono-examples/avatar.tsx`        | native image/fallback。上流AvatarはUIのみ                           | 静的済み／実画面未確認 |
| 内容と一覧   | `tag`           | `src/hono/tag.tsx`           | `src/css/components/tag.css`、`src/css/components/tag-group.css`               | `catalog/hono-examples/tag.tsx`           | native text/link                                                    | 静的済み／実画面未確認 |
| 内容と一覧   | `icon`          | `src/hono/icon.tsx`          | `src/css/components/icon.css`                                                  | `catalog/hono-examples/icon.tsx`          | native SVG/use                                                      | 静的済み／実画面未確認 |
| 内容と一覧   | `code-block`    | `src/hono/code-block.tsx`    | `src/css/components/code-block.css`                                            | `catalog/hono-examples/code-block.tsx`    | `CodeBlockController` + `ClipboardController`（copy時）             | 静的済み／実画面未確認 |
| 仕事と予定   | `task-list`     | `src/hono/task-list.tsx`     | `src/css/components/task-list.css`                                             | `catalog/hono-examples/task-list.tsx`     | native checkbox                                                     | 静的済み／実画面未確認 |
| 仕事と予定   | `timeline`      | `src/hono/timeline.tsx`      | `src/css/components/timeline.css`                                              | `catalog/hono-examples/timeline.tsx`      | native ordered list                                                 | 静的済み／実画面未確認 |
| 仕事と予定   | `calendar`      | `src/hono/calendar.tsx`      | `src/css/components/calendar.css`                                              | `catalog/hono-examples/calendar.tsx`      | native table。DatePickerとは別                                      | 静的済み／実画面未確認 |
| 仕事と予定   | `board`         | `src/hono/board.tsx`         | `src/css/components/board.css`、`src/css/components/board-item.css`            | `catalog/hono-examples/board.tsx`         | `BoardController`（movable時）                                      | 静的済み／実画面未確認 |
| 仕事と予定   | `statistic`     | `src/hono/statistic.tsx`     | `src/css/components/statistic.css`                                             | `catalog/hono-examples/statistic.tsx`     | native `dl`                                                         | 静的済み／実画面未確認 |
| 状態と結果   | `badge`         | `src/hono/badge.tsx`         | `src/css/components/badge.css`                                                 | `catalog/hono-examples/badge.tsx`         | native text                                                         | 静的済み／実画面未確認 |
| 状態と結果   | `notice`        | `src/hono/notice.tsx`        | `src/css/components/notice.css`                                                | `catalog/hono-examples/notice.tsx`        | native `aside`                                                      | 静的済み／実画面未確認 |
| 状態と結果   | `error-summary` | `src/hono/error-summary.tsx` | `src/css/components/error-summary.css`                                         | `catalog/hono-examples/error-summary.tsx` | native links/focus target                                           | 静的済み／実画面未確認 |
| 状態と結果   | `empty-state`   | `src/hono/empty-state.tsx`   | `src/css/components/empty-state.css`                                           | `catalog/hono-examples/empty-state.tsx`   | native layout                                                       | 静的済み／実画面未確認 |
| 状態と結果   | `progress`      | `src/hono/progress.tsx`      | `src/css/components/progress.css`                                              | `catalog/hono-examples/progress.tsx`      | native `progress`                                                   | 静的済み／実画面未確認 |
| 状態と結果   | `loading`       | `src/hono/loading.tsx`       | `src/css/components/loading.css`                                               | `catalog/hono-examples/loading.tsx`       | CSS animation + reduced-motion                                      | 静的済み／実画面未確認 |
| 状態と結果   | `toast`         | `src/hono/toast.tsx`         | `src/css/components/toast.css`                                                 | `catalog/hono-examples/toast.tsx`         | native manual popover/status                                        | 静的済み／実画面未確認 |

## Field配下・派生公開value

これらは56分類のカタログ件数へ重複加算せず、実際に使用する親の例で確認する。

| 公開value         | source                          | CSS                            | 使用例                          | 動作の所有                    |
| ----------------- | ------------------------------- | ------------------------------ | ------------------------------- | ----------------------------- |
| `ButtonGroup`     | `src/hono/button.tsx`           | `button-group.css`             | `button.tsx`、`context-bar.tsx` | native group                  |
| `ActionLink`      | `src/hono/button.tsx`           | `button.css`                   | 複数の例                        | native link                   |
| `Input`           | `src/hono/field.tsx`            | `field.css`                    | `field.tsx`ほか                 | native input                  |
| `Textarea`        | `src/hono/field.tsx`            | `field.css`                    | `field.tsx`                     | native textarea               |
| `Select`          | `src/hono/field.tsx`            | `field.css`                    | `field.tsx`                     | native select                 |
| `Choice`          | `src/hono/field.tsx`            | `field.css`                    | `field.tsx`ほか                 | native checkbox/radio         |
| `PasswordField`   | `src/hono/password-field.tsx`   | `field.css`                    | `field.tsx`                     | `PasswordFieldController`     |
| `CountedTextarea` | `src/hono/counted-textarea.tsx` | `field.css`                    | `field.tsx`                     | `CharacterCountController`    |
| `Combobox`        | `src/hono/combobox.tsx`         | `src/css/components/field.css` | `field.tsx`                     | upstream `ComboboxController` |
| `CheckboxGroup`   | `src/hono/checkbox-group.tsx`   | `field.css`                    | `field.tsx`                     | `CheckboxGroupController`     |
| `NumberField`     | `src/hono/number-field.tsx`     | `field.css`                    | `field.tsx`、`input-group.tsx`  | `NumberFieldController`       |
| `DateField`       | `src/hono/date-field.tsx`       | `field.css`                    | `field.tsx`                     | `DateFieldController`         |
| `TimeField`       | `src/hono/time-field.tsx`       | `field.css`                    | `field.tsx`                     | `TimeFieldController`         |
| `DisclosureGroup` | `src/hono/disclosure.tsx`       | `disclosure-group.css`         | `disclosure.tsx`ほか            | native `details`／`name`      |
| `TableSort`       | `src/hono/table.tsx`            | `table.css`                    | `table.tsx`                     | `TableSortController`         |
| `TableSelection`  | `src/hono/table.tsx`            | `table.css`                    | `table.tsx`                     | `TableSelectController`       |
| `TagGroup`        | `src/hono/tag.tsx`              | `tag-group.css`                | `tag.tsx`                       | native group                  |

## 公開controller

`src/controllers/index.ts`の公開入口は23件である。Ply独自実装、上流controllerの継承、上流controllerの再exportを分けている。

| 種別           | 公開controller                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ply独自実装    | `BoardController`、`CodeBlockController`、`CommandMenuController`、`DropdownMenuController`、`PopoverController`、`TableController`                                                                                                                              |
| 上流を継承     | `DatePickerController`、`DialogController`、`FileInputController`、`RangeController`、`SuggestionController`                                                                                                                                                     |
| 上流の再export | `CheckboxGroupController`、`ClipboardController`、`ComboboxController`、`DateFieldController`、`FileDropController`、`NumberFieldController`、`PasswordFieldController`、`TableSelectController`、`TableSortController`、`TabsController`、`TimeFieldController` |

`@tknf/stimulus-ui@0.1.0`の配布型・README・実装は38件と一致した。既存の対応表での内訳は、利用13、一部利用2、native代替3、独自実装1、UIのみ3、未対応16である。したがって「UIの名前がある」ことをcontrollerの全契約対応とは数えていない。

## CSS・アイコン・生成物

- `src/css`は64 CSS（components 59、共通5）、`catalog/catalog.css`を加えた検査対象は65 CSS。
- `src/hono/stylesheets.ts`は64項目で、64ソースCSSとの欠落・余計な項目はない。
- `design/spacing-rationale.json`は64ソースCSSとcatalog用の65キーを持つ。
- `src/icon-manifest.json`と生成物は20アイコン。regular SVG、共通sprite、CSS用asset、licenseを`vp run check:package`で照合した。
- `catalog/hono-examples`は56ファイルで、56分類IDと1対1。`catalog/app.tsx`は85経路を静的生成対象にする。

## 適用・未提供の境界

| 区分             | 内容                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| 既存の組み合わせ | メール、CRM、プロジェクト、文書、財務、チャットの小さな適用例を`catalog/pages/app-patterns.tsx`に持つ                |
| 高優先の追加候補 | 検索Picker、Composer、編集できるProperty行                                                                           |
| 中優先の追加候補 | 一括操作、Chartの外枠・凡例・代替表、Tooltip                                                                         |
| 明示的な未提供   | 業務データの保存・認証・権限・通信、リッチテキスト編集、巨大な表の仮想スクロール、グラフ描画、非同期の複数選択Picker |

追加候補は実装済みの部品として数えない。`ActionList`の改名や`Combobox`と`Suggestion`の役割整理も、互換性を保つ後続提案であり、今回の監査で公開valueを削除する判断にはしていない。
