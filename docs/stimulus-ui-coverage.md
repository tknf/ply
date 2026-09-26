# stimulus-ui全controllerの対応状況

対象は導入済みの`@tknf/stimulus-ui@0.1.0`。配布型・実装・READMEを照合した2026年9月16日の記録です。

2026年9月26日に`0.2.0`へ上げた。0.2.0の変更は`editable`の確定キー（`data-editable-commit-key-value`）だけなので、Editableの行と件数だけを更新した。他の行は9月16日の照合のまま、0.2.0で照合し直していない。

**38種類中、利用・継承は16種類。全UI・全機能は網羅できていません。** TableSort・TableSelectに続いてCodeBlockへClipboardを接続しています。利用数は全モードの提供やデザインの受け入れを意味しません。

| controller                     | 対応       | Ply                                                                                                        |
| ------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `PasswordFieldController`      | 利用       | PasswordFieldで表示切替とアクセシブルな名前を同期。                                                        |
| `TabsController`               | 利用       | Tabsの単一選択、キー操作、パネル同期。                                                                     |
| `DialogController`             | 一部利用   | PlyのDialogControllerが継承。モーダルを利用。上流の非モーダル移動・リサイズのUIは未提供。                  |
| `DisclosureController`         | native代替 | details/summary・nameを使用。上流の公開状態・イベント契約は提供していない。                                |
| `DropdownMenuController`       | 独自実装   | Ply独自。多段、チェック、radio、位置補正、背後クリックの扱いを実装。上流利用として数えない。               |
| `ComboboxController`           | 一部利用   | Comboboxと継承するSuggestionで利用。上流の複数選択を使うPicker UIは未提供。                                |
| `ToastController`              | native代替 | native popover manualとrole=対応。上流の表示・非表示・時間管理イベントとは別。                             |
| `ListboxController`            | 未対応     | 常設の単一/複数選択リストのUIなし。Suggestionのポップアップとは別。                                        |
| `ListReorderController`        | 未対応     | 単一のul/olとliを並べ替える契約。列間移動を持つBoardControllerは別実装で、ここへ含めない。                 |
| `LandmarkNavigationController` | 未対応     | AppShellでF6/Shift+F6のランドマーク移動は未接続。                                                          |
| `TooltipController`            | 未対応     | hover/focus/Escで補足を表示する専用UIなし。                                                                |
| `ToolbarController`            | native代替 | Toolbarはrole=groupと通常のTab順序。APG Toolbarの矢印移動は未提供。                                        |
| `ToggleGroupController`        | 未対応     | FilterBarはURLによる条件移動。単一/複数選択のボタン群とは別。                                              |
| `AccordionController`          | 未対応     | DisclosureGroupはnative detailsの集合。APG Accordionの見出し間操作とは別。                                 |
| `SliderController`             | 利用       | RangeControllerが継承。単値と両端値、数値入力の接続。                                                      |
| `ColorPickerController`        | 未対応     | sRGB・Display-P3・alphaを編集するUIなし。                                                                  |
| `ClipboardController`          | 利用       | CodeBlockの全文コピー。上流が書込とイベント、Plyが成功・失敗のToastを所有。                                |
| `CarouselController`           | 未対応     | スライド切替・自動送り・停止のUIなし。                                                                     |
| `SplitterController`           | UIのみ     | SplitViewは配置と折り返しのみ。境界のドラッグ・キー操作による幅変更は未提供。                              |
| `ImageCropperController`       | UIのみ     | ImageFrameのcontain/coverは表示上の切り抜き。画像選択範囲の編集UIは未提供。                                |
| `TreeController`               | 未対応     | 階層リストの展開・選択・フォーカス移動UIなし。                                                             |
| `GridController`               | 未対応     | Tableは通常のTab順序。セル間の二次元フォーカス移動は未提供。                                               |
| `TableSortController`          | 利用       | 今回接続。見出しの方向・ARIA・取消可能な要求は上流が所有。行比較と選択バーはPlyのTableController。         |
| `NumberFieldController`        | 利用       | NumberFieldのnative number、PageUp/PageDown、変更イベント。                                                |
| `DateFieldController`          | 利用       | DateFieldのnative dateと変更イベント。                                                                     |
| `TimeFieldController`          | 利用       | TimeFieldのnative timeと変更イベント。                                                                     |
| `TreegridController`           | 未対応     | 階層を持つ表の展開と二次元フォーカス移動UIなし。                                                           |
| `FileDropController`           | 利用       | 公開入口と、FileInputControllerの継承でファイル選択・dropを使用。                                          |
| `TableSelectController`        | 利用       | 今回接続。行選択、全選択の三状態、Shift範囲、外部formを含むresetは上流が所有。                             |
| `CalendarController`           | 利用       | DatePickerControllerが継承。月の描画、単日・期間の選択へ接続。予定表示のCalendarとは別。                   |
| `CharacterCountController`     | 利用       | CountedTextareaで文字数・上限状態を表示。                                                                  |
| `TagInputController`           | 未対応     | TagとTagGroupは表示・リンク。追加、削除、chip間のキー操作は未提供。                                        |
| `CheckboxGroupController`      | 利用       | CheckboxGroupで全選択と一部選択を同期。                                                                    |
| `AvatarController`             | UIのみ     | Avatarはあるが、画像の読込・失敗・fallbackの状態同期を上流へ接続していない。                               |
| `TableOfContentsController`    | 未対応     | 文書の目次・スクロールによる現在地追跡のUIなし。                                                           |
| `TimerController`              | 未対応     | 計時、経過、区切り通知のUIなし。                                                                           |
| `EditableController`           | 利用       | EditablePropertyで表示・編集・確定・取消。一行・複数行とも確定は`modifier-enter`（Control / Meta+Enter）。 |
| `HoverCardController`          | 未対応     | Popoverはclick起点。hover/focusで開く対話可能なプレビューとは別。                                          |

## 今回の実装の境界

Tableの並べ替え方向・ARIA・取消可能な要求は上流のTableSortController、三状態・Shift範囲・フォームresetはTableSelectControllerが所有します。PlyのTableControllerは行の比較・移動と選択バーを接続します。独自に追加していたソート方向・選択状態の管理は撤去しました。

ListReorderは単一のnative listを対象にし、項目ごとの持ち手・前・次のボタンを要求します。列間の移動先は扱いません。二軸のBoardは独自controllerを維持し、ListReorder対応として数えません。

## 追加の優先順位

1. Tooltip、TagInput、Tree、Splitter：補足・宛先・階層・可変ペイン。
2. Listbox、ToggleGroup、Grid、Treegrid、TableOfContents、HoverCard：選択、密な表、資料閲覧。
3. Avatarの読込状態、ListReorder、ColorPicker、ImageCropper、Timer、Carousel、LandmarkNavigation：用途に応じた独立コンポーネント・拡張。

Disclosure、Toast、Toolbarはnativeでの簡単な利用を残し、上流の拡張契約が必要な使い方を追加候補にします。既存のUIがあるだけでcontroller対応済みとは扱いません。
