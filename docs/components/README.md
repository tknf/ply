<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# コンポーネント

全コンポーネントのリファレンスです。カタログの各ページ（`/components/<id>`）と同じ内容で、見本の表示はカタログで確認できます。

## 作業面と移動

- [AppShell](app-shell.md)：上部中央のコマンドメニューと、中央の作業面を持つアプリの骨格。
- [CommandMenu](command-menu.md)：アプリ全体の移動・操作を検索する、上部中央の専用パネル。
- [SplitView](split-view.md)：一覧と本文、作業と補足を並べる。
- [Wing](wing.md)：中央の作業面の後ろから、左右に開閉できる補助パネルを差し込む。
- [Section](section.md)：関連する内容を見出し・件数・操作とまとめる。
- [Surface](surface.md)：中央の作業面。仕事の中身を一枚の白い面にまとめます。AppShellの作業面と同じ見た目で、AppShellを使わない画面で使います。
- [ContextBar](context-bar.md)：現在の位置と関連する移動・操作を、作業面の上部にまとめます。
- [PageHeader](page-header.md)：対象と作業を、大きな見出しで伝えます。
- [ProfileHeader](profile-header.md)：大きなアバターと名前、この人への設定のバー
- [Breadcrumb](breadcrumb.md)：階層をたどって上位へ戻る
- [BackLink](back-link.md)：一つ上の場所へ戻るだけのピル
- [Navigation](navigation.md)：同じ領域のページを切り替える
- [Tree](tree.md)：中央の作業面で階層を開閉・選択する
- [TableOfContents](table-of-contents.md)：長い資料の見出しへ移動し、現在地を示す
- [Tabs](tabs.md)：同じ場所で関連するパネルを切り替えます。
- [Pagination](pagination.md)：分割された一覧を移動します。
- [Steps](steps.md)：手順と現在の段階を示す
- [Divider](divider.md)：意味のある区切りと見出しを置く

## 入力と選択

- [Field](field.md)：ラベル・入力・補足・エラーを関連付けます。
- [FieldGroup](field-group.md)：見出しと説明、入力欄をひとまとまりのフォームとして配置します。
- [OptionalFields](optional-fields.md)：必要な時だけ追加する欄と、追加できる項目のチップ
- [InputGroup](input-group.md)：単位や接頭辞を入力と並べる
- [CopyField](copy-field.md)：コピーして使う値の欄と、コピーボタン
- [Switch](switch.md)：二択の設定を切り替える
- [ToggleGroup](toggle-group.md)：関連する状態を一つまたは複数切り替える
- [Range](range.md)：連続する数値を調整する
- [Dial](dial.md)：周りの目盛りから一つを選ぶ、金属のつまみ
- [Suggestion](suggestion.md)：自由入力に候補を添える
- [Picker](picker.md)：検索して候補から値を選ぶ
- [EmojiPicker](emoji-picker.md)：絵文字を探して選ぶパネル
- [InlineSelect](inline-select.md)：文の中の語を押して選ぶ選択
- [ColorPicker](color-picker.md)：色相・彩度・明度・不透明度を、見本を確認しながら選びます。
- [TagInput](tag-input.md)：自由入力したタグを追加・解除する
- [DatePicker](date-picker.md)：単日・期間をひとつの欄で選ぶ
- [DateTimeRange](date-time-range.md)：開始と終了の日時を矢印でつないだ枠
- [FileInput](file-input.md)：ファイルを選択し、添付する内容を確認する
- [ImageCropper](image-cropper.md)：画像の切り抜き範囲を、画像面と数値の両方から調整します。
- [Composer](composer.md)：本文・添付・送信操作を一つの入力エリアにまとめる
- [TextEditor](text-editor.md)：書式ツールを並べた入力エリア
- [FilterBar](filter-bar.md)：一覧を絞り込む条件をリンクで切り替える

## 操作と補足

- [Button](button.md)：操作の主従、無効、処理中を表します。
- [SplitButton](split-button.md)：主操作と、ほかのやり方を選ぶ▾をつなげたピル
- [ActionTile](action-tile.md)：塗りつぶしのアイコンと名前を縦に積み、格子に並べるショートカットや操作
- [Toolbar](toolbar.md)：対象に対する複数の操作をまとめる
- [ActionDock](action-dock.md)：画面の下に浮かぶ、アイコン・名前・ショートカットキーの表示を並べた操作バー
- [DropdownMenu](dropdown-menu.md)：現在の対象に関する補助操作をまとめます。
- [FilterMenu](filter-menu.md)：候補を打って絞り込みながら選ぶ、青の面の小さなパネル
- [Dialog](dialog.md)：文脈を保ちながら、影響や内容を確認します。
- [Popover](popover.md)：補足や小さな操作を必要な時に開く
- [Tooltip](tooltip.md)：操作に添える短い補足を、hoverとfocusで示す
- [HoverCard](hover-card.md)：対象の概要と関連操作を近くに表示する
- [Disclosure](disclosure.md)：補足を標準HTMLで開閉します。
- [DangerZone](danger-zone.md)：削除や公開の取り消しなど、影響のある操作を説明と一緒にまとめます。
- [Keycap](keycap.md)：キーボード操作の表記を揃える

## 内容と一覧

- [Card](card.md)：関連する内容と操作を一つにまとめる
- [LayerCard](layer-card.md)：見出しを淡い青の層に置き、中身を白いカードに載せる
- [Message](message.md)：人・時刻・本文を同じ読み順で伝える。
- [MessageList](message-list.md)：差出人・件名・プレビュー・時刻をまとめる受信一覧。
- [SearchResults](search-results.md)：題名・抜粋・補足を並べ、一致した語を強調する検索の結果
- [Table](table.md)：数値・短い状態・長文を列の役割に合わせて表示します。
- [Grid](grid.md)：行と列を保ったまま、二方向にセルを読む作業面です。
- [Treegrid](treegrid.md)：階層を持つ行を、列の対応を保って確認します。
- [ValueList](value-list.md)：現在値を補足より明確に表示します。
- [SettingList](setting-list.md)：名前と行の終わりの操作を点線でつなぐ設定の行
- [EditableProperty](editable-property.md)：値をその場所で編集し、確定と取消を揃える
- [DataList](data-list.md)：主情報・補足・状態を行で比較します。
- [ActionList](action-list.md)：作業へのリンクを、一覧や内容の見えるカードで示します。
- [FileItem](file-item.md)：既存ファイルの名前と状態を示します。
- [ImageFrame](image-frame.md)：比率を保って画像を比較します。
- [Carousel](carousel.md)：関連する内容を一枚ずつ読み、前後へ移動します。
- [Comparison](comparison.md)：変更前後を対応させて確認します。
- [ChartFrame](chart-frame.md)：集計の図と数値表を一緒に読む
- [Avatar](avatar.md)：人物やチームを名前と一緒に示す
- [Tag](tag.md)：分類や選択した条件を短く示す
- [Reactions](reactions.md)：同じ絵文字をまとめ、付けた人数を添えたリアクション
- [Icon](icon.md)：操作や用途の文言を補う小さな図形。
- [CodeBlock](code-block.md)：設定や短いコードを改行を保って読む

## 仕事と予定

- [TaskList](task-list.md)：完了操作と担当・期日を並べる
- [Timeline](timeline.md)：出来事を時系列で読む
- [Calendar](calendar.md)：月・週・年を行き来し、日付と予定を探す
- [Board](board.md)：仕事を状態ごとの列で見る
- [Statistic](statistic.md)：集計値と単位をひとまとまりにする
- [Countdown](countdown.md)：期限や残りを大きな数字で示す丸いバッジ

## 状態と結果

- [Badge](badge.md)：短い状態を、文言と色の役割で示します。
- [Notice](notice.md)：事実・影響・次の操作を、継続して読める形で示します。
- [Prompt](prompt.md)：問いを層の見出しに置き、答えの行をカードに並べる問いかけ
- [ErrorSummary](error-summary.md)：送信時の問題と修正先をまとめる
- [EmptyState](empty-state.md)：情報がない理由と次の行動を示します。
- [Progress](progress.md)：確定または不確定の進行状況です。
- [Loading](loading.md)：待っている処理を言葉で示す
- [Toast](toast.md)：操作結果を閉じるまで読める形で示す

## controllerの登録名

`ply/controllers`のcontrollerを、次の登録名でStimulusのApplicationへ登録します。登録の仕方は[controller](../controllers.md)を参照してください。

| 登録名              | controller                   | 使うコンポーネント                                                        |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `avatar`            | `AvatarController`           | [Avatar](avatar.md)                                                       |
| `board`             | `BoardController`            | [Board](board.md)                                                         |
| `calendar`          | `CalendarController`         | [Calendar](calendar.md)                                                   |
| `calendar-scroll`   | `CalendarScrollController`   | [Calendar](calendar.md)                                                   |
| `carousel`          | `CarouselController`         | [Carousel](carousel.md)                                                   |
| `character-count`   | `CharacterCountController`   | [CountedTextarea](field.md)                                               |
| `checkbox-group`    | `CheckboxGroupController`    | [CheckboxGroup](field.md)                                                 |
| `clipboard`         | `ClipboardController`        | [CopyField](copy-field.md)、[CodeBlock](code-block.md)                    |
| `code-block`        | `CodeBlockController`        | [CodeBlock](code-block.md)                                                |
| `color-picker`      | `ColorPickerController`      | [ColorPicker](color-picker.md)                                            |
| `combobox`          | `ComboboxController`         | [Combobox](field.md)、[Picker](picker.md)                                 |
| `command-menu`      | `CommandMenuController`      | [CommandMenu](command-menu.md)                                            |
| `copy-field`        | `CopyFieldController`        | [CopyField](copy-field.md)                                                |
| `date-field`        | `DateFieldController`        | [DateField](field.md)、[DateTimeRange](date-time-range.md)                |
| `date-picker`       | `DatePickerController`       | [DatePicker](date-picker.md)                                              |
| `dialog`            | `DialogController`           | [Dialog](dialog.md)                                                       |
| `dropdown-menu`     | `DropdownMenuController`     | [SplitButton](split-button.md)、[DropdownMenu](dropdown-menu.md)          |
| `editable`          | `EditableController`         | [EditableProperty](editable-property.md)                                  |
| `editable-property` | `EditablePropertyController` | [EditableProperty](editable-property.md)                                  |
| `emoji-picker`      | `EmojiPickerController`      | [EmojiPicker](emoji-picker.md)、[Reactions](reactions.md)                 |
| `file-input`        | `FileInputController`        | [FileInput](file-input.md)                                                |
| `filter-menu`       | `FilterMenuController`       | [FilterMenu](filter-menu.md)                                              |
| `grid`              | `GridController`             | [Grid](grid.md)                                                           |
| `hover-card`        | `HoverCardController`        | [HoverCard](hover-card.md)                                                |
| `image-cropper`     | `ImageCropperController`     | [ImageCropper](image-cropper.md)                                          |
| `number-field`      | `NumberFieldController`      | [NumberField](field.md)                                                   |
| `optional-fields`   | `OptionalFieldsController`   | [OptionalFields](optional-fields.md)                                      |
| `password-field`    | `PasswordFieldController`    | [PasswordField](field.md)                                                 |
| `picker`            | `PickerController`           | [Picker](picker.md)                                                       |
| `popover`           | `PopoverController`          | [Popover](popover.md)、[Reactions](reactions.md)、[Calendar](calendar.md) |
| `reactions`         | `ReactionsController`        | [Reactions](reactions.md)                                                 |
| `splitter`          | `SplitterController`         | [SplitView](split-view.md)                                                |
| `suggestion`        | `SuggestionController`       | [Suggestion](suggestion.md)                                               |
| `table`             | `TableController`            | [Table](table.md)                                                         |
| `table-of-contents` | `TableOfContentsController`  | [TableOfContents](table-of-contents.md)                                   |
| `table-select`      | `TableSelectController`      | [Table](table.md)                                                         |
| `table-sort`        | `TableSortController`        | [Table](table.md)                                                         |
| `tabs`              | `TabsController`             | [Tabs](tabs.md)                                                           |
| `tag-field`         | `TagFieldController`         | [TagInput](tag-input.md)                                                  |
| `tag-input`         | `TagInputController`         | [TagInput](tag-input.md)                                                  |
| `task-list`         | `TaskListController`         | [TaskList](task-list.md)                                                  |
| `time-field`        | `TimeFieldController`        | [TimeField](field.md)、[DateTimeRange](date-time-range.md)                |
| `toast`             | `ToastController`            | [CodeBlock](code-block.md)、[Toast](toast.md)                             |
| `toast-stack`       | `ToastStackController`       | [ToastStack](toast.md)                                                    |
| `toggle-group`      | `ToggleGroupController`      | [ToggleGroup](toggle-group.md)                                            |
| `toolbar`           | `ToolbarController`          | [TextEditor](text-editor.md)、[Toolbar](toolbar.md)                       |
| `tooltip`           | `TooltipController`          | [Popover](popover.md)、[Tooltip](tooltip.md)、[Reactions](reactions.md)   |
| `tree`              | `TreeController`             | [Tree](tree.md)                                                           |
| `tree-presentation` | `TreePresentationController` | [Tree](tree.md)                                                           |
| `treegrid`          | `TreegridController`         | [Treegrid](treegrid.md)                                                   |
| `wing`              | `WingController`             | [AppShell](app-shell.md)、[Wing](wing.md)                                 |
