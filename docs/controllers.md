# controller

動作が必要なコンポーネントは、`ply/controllers`のcontrollerを利用側のStimulus Applicationへ登録して使います。controllerは自動で起動・登録しません。Honoのコンポーネントは下表の登録名を`data-controller`に出力するので、登録名は表のとおりにしてください。

```ts
import { Application } from "@hotwired/stimulus";
import { DropdownMenuController, DialogController } from "ply/controllers";

const application = Application.start();
application.register("dropdown-menu", DropdownMenuController);
application.register("dialog", DialogController);
```

一部のcontrollerは`@tknf/stimulus-ui`のものをそのまま再exportし、Ply固有の配置や操作が要るものはそれを継承・拡張しています。

## コンポーネントと登録名

| コンポーネント      | 登録名とcontroller                                                                                              | 条件                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| AppShell（Wing）    | `wing`：`WingController`                                                                                        | 開閉を保存する時                   |
| Avatar              | `avatar`：`AvatarController`                                                                                    | 画像を指定した時                   |
| Board               | `board`：`BoardController`                                                                                      | 移動・たたむ列がある時             |
| Calendar            | `calendar-scroll`：`CalendarScrollController`、`calendar`：`CalendarController`、`popover`：`PopoverController` | 週の時間割、日付の選択、予定の詳細 |
| Carousel            | `carousel`：`CarouselController`                                                                                | 切り替えを使う時                   |
| CheckboxGroup       | `checkbox-group`：`CheckboxGroupController`                                                                     |                                    |
| CodeBlock           | `clipboard`：`ClipboardController`、`code-block`：`CodeBlockController`                                         | コピーを使う時                     |
| ColorPicker         | `color-picker`：`ColorPickerController`                                                                         |                                    |
| Combobox            | `combobox`：`ComboboxController`                                                                                |                                    |
| CommandMenu         | `command-menu`：`CommandMenuController`                                                                         |                                    |
| CopyField           | `clipboard`：`ClipboardController`、`copy-field`：`CopyFieldController`                                         |                                    |
| CountedTextarea     | `character-count`：`CharacterCountController`                                                                   |                                    |
| DateField           | `date-field`：`DateFieldController`                                                                             |                                    |
| DatePicker          | `date-picker`：`DatePickerController`                                                                           |                                    |
| Dialog              | `dialog`：`DialogController`                                                                                    |                                    |
| DropdownMenu        | `dropdown-menu`：`DropdownMenuController`                                                                       |                                    |
| EditableProperty    | `editable`：`EditableController`、`editable-property`：`EditablePropertyController`                             |                                    |
| EmojiPicker         | `emoji-picker`：`EmojiPickerController`                                                                         |                                    |
| FileInput           | `file-input`：`FileInputController`                                                                             |                                    |
| FilterMenu          | `filter-menu`：`FilterMenuController`                                                                           |                                    |
| Grid                | `grid`：`GridController`                                                                                        | 行がある時                         |
| HoverCard           | `hover-card`：`HoverCardController`                                                                             |                                    |
| ImageCropper        | `image-cropper`：`ImageCropperController`                                                                       |                                    |
| NumberField         | `number-field`：`NumberFieldController`                                                                         |                                    |
| OptionalFields      | `optional-fields`：`OptionalFieldsController`                                                                   |                                    |
| PasswordField       | `password-field`：`PasswordFieldController`                                                                     |                                    |
| Picker              | `combobox`：`ComboboxController`、`picker`：`PickerController`                                                  |                                    |
| Popover             | `popover`：`PopoverController`                                                                                  |                                    |
| Range               | `range`：`RangeController`                                                                                      |                                    |
| Reactions           | `reactions`：`ReactionsController`                                                                              | 追加の操作がある時                 |
| SplitView           | `splitter`：`SplitterController`                                                                                | 幅を変えられる時                   |
| Suggestion          | `suggestion`：`SuggestionController`                                                                            |                                    |
| Table               | `table`：`TableController`、`table-sort`：`TableSortController`、`table-select`：`TableSelectController`        | 並べ替え・選択を使う時             |
| TableOfContents     | `table-of-contents`：`TableOfContentsController`                                                                |                                    |
| Tabs                | `tabs`：`TabsController`                                                                                        |                                    |
| TagInput            | `tag-input`：`TagInputController`、`tag-field`：`TagFieldController`                                            |                                    |
| TaskList            | `task-list`：`TaskListController`                                                                               |                                    |
| TextEditor・Toolbar | `toolbar`：`ToolbarController`                                                                                  |                                    |
| TimeField           | `time-field`：`TimeFieldController`                                                                             |                                    |
| Toast・ToastStack   | `toast`：`ToastController`、`toast-stack`：`ToastStackController`                                               |                                    |
| ToggleGroup         | `toggle-group`：`ToggleGroupController`                                                                         |                                    |
| Tooltip             | `tooltip`：`TooltipController`                                                                                  |                                    |
| Tree                | `tree`：`TreeController`、`tree-presentation`：`TreePresentationController`                                     |                                    |
| Treegrid            | `treegrid`：`TreegridController`                                                                                | 操作を使う時                       |

`FileDropController`は`FileInputController`が継承しているため、FileInputだけなら別に登録する必要はありません。独自のドロップ領域に使う場合だけ`file-drop`として登録します。

## イベント

controllerは選択・移動・変更をカスタムイベントで知らせます。`before`の付くイベントは`preventDefault()`で取り消せます。保存や業務処理は利用側でイベントを受けて行います。

| イベント                               | 内容                                                                                         |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `command-menu:select`                  | 操作の項目を選んだ。`detail.value`                                                           |
| `dropdown-menu:beforeselect`・`select` | 項目を選んだ。`detail`に`value`・`kind`、チェック項目は`checked`、単一選択は`name`           |
| `dropdown-menu:open`・`close`          | メニューを開いた・閉じた                                                                     |
| `filter-menu:select`・`create`         | 候補を選んだ・「新しく作る」を押した                                                         |
| `date-picker:beforechange`・`change`   | 日付を変えた。`detail`に`selection`・`previousSelection`                                     |
| `slider:beforechange`・`change`        | Rangeの値を変えた                                                                            |
| `picker:change`                        | Pickerの選択が変わった                                                                       |
| `tag-field:change`                     | TagInputのタグが変わった                                                                     |
| `file-drop:beforedrop`・`drop`         | ファイルをドロップした（通常の選択は標準の`change`）                                         |
| `table:beforesort`・`sort`             | 並べ替えた。`detail`に`column`・`direction`・`previousColumn`・`previousDirection`・`reason` |
| `table:selectionchange`                | 選択が変わった。`detail`に`ids`・`count`・`scope: "rendered"`（表示中の行だけが対象）        |
| `board:beforemove`・`move`             | 項目を運んだ。`detail`に`id`・`fromColumn`・`toColumn`・`fromIndex`・`toIndex`               |
| `board:toggle`                         | 列をたたむ・開く（取り消し可能）。`detail`に`column`・`collapsed`                            |
| `reactions:toggle`                     | 反応を付けた・外した                                                                         |
| `emoji-picker:pick`                    | 絵文字を選んだ                                                                               |
| `optional-fields:add`                  | 後から足す欄を表示した                                                                       |

各コンポーネントの詳しい使い方は[コンポーネントの詳細](components.md)とカタログの各ページを参照してください。
