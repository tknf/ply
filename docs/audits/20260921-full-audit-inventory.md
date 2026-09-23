# Ply 全体監査の対象目録

監査日：2026年9月21日
監査対象HEAD：c42689c（main）
開始時点の未コミット変更：当時の引き継ぎメモ、監査指示書

この目録は、現行の component-groups.ts、src/hono/index.ts、src/css、src/controllers/index.ts、catalog/hono-examples を突き合わせて作成した。分類ID、Honoの公開value、CSSファイル、カタログ例、controllerは同じ数ではないため列を分けている。

静的確認済みは、ソース、CSS、SSR入口、配布型・配布CSS、カタログ例の関係を確認したという意味である。実画面未確認は、現セッションではAGENTS.mdの制約によりブラウザ操作とPlaywrightを実行できなかったことを示す。前回の保存済み画像や記録を今回の現行版の目視承認へ繰り上げていない。

## 56分類

| 領域         | 分類ID        | Hono source                | 専用CSS                              | カタログ例                              | 動作の所有                               | ソース／配布 | 実画面 |
| ------------ | ------------- | -------------------------- | ------------------------------------ | --------------------------------------- | ---------------------------------------- | ------------ | ------ |
| 作業面と移動 | app-shell     | src/hono/app-shell.tsx     | src/css/components/app-shell.css     | catalog/hono-examples/app-shell.tsx     | native layout                            | 済み         | 未確認 |
| 作業面と移動 | command-menu  | src/hono/command-menu.tsx  | src/css/components/command-menu.css  | catalog/hono-examples/command-menu.tsx  | CommandMenuController                    | 済み         | 未確認 |
| 作業面と移動 | split-view    | src/hono/split-view.tsx    | src/css/components/split-view.css    | catalog/hono-examples/split-view.tsx    | native layout、SplitterはUIのみ          | 済み         | 未確認 |
| 作業面と移動 | section       | src/hono/section.tsx       | src/css/components/section.css       | catalog/hono-examples/section.tsx       | native HTML                              | 済み         | 未確認 |
| 作業面と移動 | surface       | src/hono/surface.tsx       | src/css/components/surface.css       | catalog/hono-examples/surface.tsx       | native layout                            | 済み         | 未確認 |
| 作業面と移動 | context-bar   | src/hono/context-bar.tsx   | src/css/components/context-bar.css   | catalog/hono-examples/context-bar.tsx   | Breadcrumbとchildren                     | 済み         | 未確認 |
| 作業面と移動 | page-header   | src/hono/page-header.tsx   | src/css/components/page-header.css   | catalog/hono-examples/page-header.tsx   | native heading                           | 済み         | 未確認 |
| 作業面と移動 | breadcrumb    | src/hono/breadcrumb.tsx    | src/css/components/breadcrumb.css    | catalog/hono-examples/breadcrumb.tsx    | native navigation                        | 済み         | 未確認 |
| 作業面と移動 | navigation    | src/hono/navigation.tsx    | src/css/components/navigation.css    | catalog/hono-examples/navigation.tsx    | native links                             | 済み         | 未確認 |
| 作業面と移動 | tabs          | src/hono/tabs.tsx          | src/css/components/tabs.css          | catalog/hono-examples/tabs.tsx          | TabsController                           | 済み         | 未確認 |
| 作業面と移動 | pagination    | src/hono/pagination.tsx    | src/css/components/pagination.css    | catalog/hono-examples/pagination.tsx    | native links                             | 済み         | 未確認 |
| 作業面と移動 | steps         | src/hono/steps.tsx         | src/css/components/steps.css         | catalog/hono-examples/steps.tsx         | native links                             | 済み         | 未確認 |
| 作業面と移動 | divider       | src/hono/divider.tsx       | src/css/components/divider.css       | catalog/hono-examples/divider.tsx       | native hr                                | 済み         | 未確認 |
| 入力と選択   | field         | src/hono/field.tsx         | src/css/components/field.css         | catalog/hono-examples/field.tsx         | native form、Field配下は下表             | 済み         | 未確認 |
| 入力と選択   | field-group   | src/hono/field.tsx         | src/css/components/field.css         | catalog/hono-examples/field-group.tsx   | native fieldset                          | 済み         | 未確認 |
| 入力と選択   | input-group   | src/hono/input-group.tsx   | src/css/components/input-group.css   | catalog/hono-examples/input-group.tsx   | native form、NumberFieldController       | 済み         | 未確認 |
| 入力と選択   | switch        | src/hono/switch.tsx        | src/css/components/switch.css        | catalog/hono-examples/switch.tsx        | native checkbox                          | 済み         | 未確認 |
| 入力と選択   | range         | src/hono/range.tsx         | src/css/components/range.css         | catalog/hono-examples/range.tsx         | RangeController、SliderController        | 済み         | 未確認 |
| 入力と選択   | suggestion    | src/hono/suggestion.tsx    | src/css/components/suggestion.css    | catalog/hono-examples/suggestion.tsx    | SuggestionController、ComboboxController | 済み         | 未確認 |
| 入力と選択   | date-picker   | src/hono/date-picker.tsx   | src/css/components/date-picker.css   | catalog/hono-examples/date-picker.tsx   | DatePickerController、CalendarController | 済み         | 未確認 |
| 入力と選択   | file-input    | src/hono/file-input.tsx    | src/css/components/file-input.css    | catalog/hono-examples/file-input.tsx    | FileInputController、FileDropController  | 済み         | 未確認 |
| 入力と選択   | filter-bar    | src/hono/filter-bar.tsx    | src/css/components/filter-bar.css    | catalog/hono-examples/filter-bar.tsx    | native links                             | 済み         | 未確認 |
| 操作と補足   | button        | src/hono/button.tsx        | src/css/components/button.css        | catalog/hono-examples/button.tsx        | native button                            | 済み         | 未確認 |
| 操作と補足   | toolbar       | src/hono/toolbar.tsx       | src/css/components/toolbar.css       | catalog/hono-examples/toolbar.tsx       | native group、上流Toolbarは未接続        | 済み         | 未確認 |
| 操作と補足   | dropdown-menu | src/hono/dropdown-menu.tsx | src/css/components/dropdown-menu.css | catalog/hono-examples/dropdown-menu.tsx | Ply独自DropdownMenuController            | 済み         | 未確認 |
| 操作と補足   | dialog        | src/hono/dialog.tsx        | src/css/components/dialog.css        | catalog/hono-examples/dialog.tsx        | DialogController、upstream Dialog        | 済み         | 未確認 |
| 操作と補足   | popover       | src/hono/popover.tsx       | src/css/components/popover.css       | catalog/hono-examples/popover.tsx       | PopoverController、Popover API           | 済み         | 未確認 |
| 操作と補足   | disclosure    | src/hono/disclosure.tsx    | disclosure.css、disclosure-group.css | catalog/hono-examples/disclosure.tsx    | native details、name                     | 済み         | 未確認 |
| 操作と補足   | danger-zone   | src/hono/danger-zone.tsx   | src/css/components/danger-zone.css   | catalog/hono-examples/danger-zone.tsx   | native layout                            | 済み         | 未確認 |
| 操作と補足   | keycap        | src/hono/keycap.tsx        | src/css/components/keycap.css        | catalog/hono-examples/keycap.tsx        | native text                              | 済み         | 未確認 |
| 内容と一覧   | card          | src/hono/card.tsx          | src/css/components/card.css          | catalog/hono-examples/card.tsx          | native article/link                      | 済み         | 未確認 |
| 内容と一覧   | message       | src/hono/message.tsx       | src/css/components/message.css       | catalog/hono-examples/message.tsx       | native article                           | 済み         | 未確認 |
| 内容と一覧   | message-list  | src/hono/message-list.tsx  | src/css/components/message-list.css  | catalog/hono-examples/message-list.tsx  | native links/status                      | 済み         | 未確認 |
| 内容と一覧   | table         | src/hono/table.tsx         | src/css/components/table.css         | catalog/hono-examples/table.tsx         | TableController、TableSort、TableSelect  | 済み         | 未確認 |
| 内容と一覧   | value-list    | src/hono/value-list.tsx    | src/css/components/value-list.css    | catalog/hono-examples/value-list.tsx    | native dl                                | 済み         | 未確認 |
| 内容と一覧   | data-list     | src/hono/data-list.tsx     | src/css/components/data-list.css     | catalog/hono-examples/data-list.tsx     | native links                             | 済み         | 未確認 |
| 内容と一覧   | action-list   | src/hono/action-list.tsx   | src/css/components/action-list.css   | catalog/hono-examples/action-list.tsx   | native links                             | 済み         | 未確認 |
| 内容と一覧   | file-item     | src/hono/file-item.tsx     | src/css/components/file-item.css     | catalog/hono-examples/file-item.tsx     | native links/actions                     | 済み         | 未確認 |
| 内容と一覧   | image-frame   | src/hono/image-frame.tsx   | src/css/components/image-frame.css   | catalog/hono-examples/image-frame.tsx   | native image/fallback                    | 済み         | 未確認 |
| 内容と一覧   | comparison    | src/hono/comparison.tsx    | src/css/components/comparison.css    | catalog/hono-examples/comparison.tsx    | native layout                            | 済み         | 未確認 |
| 内容と一覧   | avatar        | src/hono/avatar.tsx        | src/css/components/avatar.css        | catalog/hono-examples/avatar.tsx        | native image、upstream AvatarはUIのみ    | 済み         | 未確認 |
| 内容と一覧   | tag           | src/hono/tag.tsx           | tag.css、tag-group.css               | catalog/hono-examples/tag.tsx           | native text/link                         | 済み         | 未確認 |
| 内容と一覧   | icon          | src/hono/icon.tsx          | src/css/components/icon.css          | catalog/hono-examples/icon.tsx          | native SVG/use                           | 済み         | 未確認 |
| 内容と一覧   | code-block    | src/hono/code-block.tsx    | src/css/components/code-block.css    | catalog/hono-examples/code-block.tsx    | CodeBlockController、ClipboardController | 済み         | 未確認 |
| 仕事と予定   | task-list     | src/hono/task-list.tsx     | src/css/components/task-list.css     | catalog/hono-examples/task-list.tsx     | native checkbox                          | 済み         | 未確認 |
| 仕事と予定   | timeline      | src/hono/timeline.tsx      | src/css/components/timeline.css      | catalog/hono-examples/timeline.tsx      | native ordered list                      | 済み         | 未確認 |
| 仕事と予定   | calendar      | src/hono/calendar.tsx      | src/css/components/calendar.css      | catalog/hono-examples/calendar.tsx      | native table、DatePickerとは別           | 済み         | 未確認 |
| 仕事と予定   | board         | src/hono/board.tsx         | board.css、board-item.css            | catalog/hono-examples/board.tsx         | BoardController（movable時）             | 済み         | 未確認 |
| 仕事と予定   | statistic     | src/hono/statistic.tsx     | src/css/components/statistic.css     | catalog/hono-examples/statistic.tsx     | native dl                                | 済み         | 未確認 |
| 状態と結果   | badge         | src/hono/badge.tsx         | src/css/components/badge.css         | catalog/hono-examples/badge.tsx         | native text                              | 済み         | 未確認 |
| 状態と結果   | notice        | src/hono/notice.tsx        | src/css/components/notice.css        | catalog/hono-examples/notice.tsx        | native aside                             | 済み         | 未確認 |
| 状態と結果   | error-summary | src/hono/error-summary.tsx | src/css/components/error-summary.css | catalog/hono-examples/error-summary.tsx | native links、focus target               | 済み         | 未確認 |
| 状態と結果   | empty-state   | src/hono/empty-state.tsx   | src/css/components/empty-state.css   | catalog/hono-examples/empty-state.tsx   | native layout                            | 済み         | 未確認 |
| 状態と結果   | progress      | src/hono/progress.tsx      | src/css/components/progress.css      | catalog/hono-examples/progress.tsx      | native progress                          | 済み         | 未確認 |
| 状態と結果   | loading       | src/hono/loading.tsx       | src/css/components/loading.css       | catalog/hono-examples/loading.tsx       | CSS animation、reduced-motion            | 済み         | 未確認 |
| 状態と結果   | toast         | src/hono/toast.tsx         | src/css/components/toast.css         | catalog/hono-examples/toast.tsx         | native manual popover/status             | 済み         | 未確認 |

## Field配下・派生公開value

56分類へ重複加算せず、親の例と公開入口で確認した。

| 公開value                         | source                  | CSS                          | 動作の所有          |
| --------------------------------- | ----------------------- | ---------------------------- | ------------------- |
| ButtonGroup、ActionLink           | src/hono/button.tsx     | button.css、button-group.css | native              |
| Input、Textarea、Select、Choice   | src/hono/field.tsx      | field.css                    | native              |
| PasswordField、CountedTextarea    | 各Field派生tsx          | field.css                    | upstream controller |
| Combobox、CheckboxGroup           | 各Field派生tsx          | field.css                    | upstream controller |
| NumberField、DateField、TimeField | 各Field派生tsx          | field.css                    | upstream controller |
| DisclosureGroup                   | src/hono/disclosure.tsx | disclosure-group.css         | native details/name |
| TableSort、TableSelection         | src/hono/table.tsx      | table.css                    | upstream controller |
| TagGroup                          | src/hono/tag.tsx        | tag-group.css                | native group        |

## 公開controller

Ply独自実装は Board、CodeBlock、CommandMenu、DropdownMenu、Popover、Table の6件。upstream継承は DatePicker、Dialog、FileInput、Range、Suggestion の5件。上流の再exportは11件で、公開入口は23件である。

stimulus-ui 0.1.0の38種類について、利用・継承15、native代替3、独自実装1、UIのみ3、未対応16という前回の対応表を現ソースと照合した。UIの名前が存在するだけで全契約対応とは数えていない。

## CSS・生成物・カタログ

- src/cssは64 CSS、stylesheets.tsも64項目で、欠落・余計な項目はなかった。
- catalog/catalog.cssを加えたspacing監査対象は65 CSS。docs:spacingの現行出力は570宣言、カタログ配置93箇所だった。
- design/spacing-rationale.jsonは65キーで、64 CSSとcatalog・共通CSSの説明を持つ。
- アイコンmanifest、CSS用SVG、スプライトは20件で一致した。
- component-groupsは6分類・56 ID、hono-examplesは56ファイルで一対一だった。
- build後の静的HTMLは85ページだった。内部リンクの未解決はexamples/contactだけである。
