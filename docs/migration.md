# 9月15〜16日のコンポーネント再構築への移行

CSS、Hono、controllerを同じ版で更新する。内部クラス名とDOM構造が変わっているため、旧HTMLへ新しいCSSだけを差し替えない。カタログのHTMLは実際のHono表示と同じ出力から生成している。

## クラスと構造

| 対象             | 現在の構造                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Surface          | `.ply-surface > .body`                                                                                             |
| PageHeader       | `.ply-page-header > .icon`、`.heading > h1 + p`、`.actions`                                                        |
| Breadcrumb       | `nav.ply-breadcrumb > ol > li`。最後の項目だけが現在地                                                             |
| ContextBar       | `div.ply-context-bar > nav.ply-breadcrumb` と `.actions`                                                           |
| Field            | `.ply-field > .heading`、入力部品、`.messages > .help / .error`                                                    |
| FieldGroup       | `.ply-field-group > legend + .layout`。layout内にdescriptionとfields                                               |
| InputGroup       | `.ply-input-group > .control > .affix / .ply-input`                                                                |
| Tabs             | `.ply-tabs > .list` と `.panel`                                                                                    |
| Dialog / Popover | `.ply-dialog > dialog.panel`、`.ply-popover > .panel`。heading、body、actionsはpanelの直下                         |
| DropdownMenu     | `.ply-dropdown-menu > .ply-menu`。項目は`.ply-menu > li > .item`。入れ子のgroupも`.ply-menu[data-variant="group"]` |
| DatePicker       | `.ply-date-picker > .control / .fallback / .panel`。panel内にeditors、month、grid、actions                         |
| Card             | `.ply-card > .preview / .eyebrow / .title / .body / .meta`                                                         |
| DataList         | `.ply-data-list > li > .start / .body / .end`                                                                      |
| Table / Calendar | `.ply-table > table`、`.ply-calendar > table`。スクロール領域が部品のルート                                        |
| ImageFrame       | `.ply-image-frame > .image > img`                                                                                  |

古い`ply-部品名-部分名`を新しい役割名へ移す。役割名だけをグローバルCSSへ書かない。controllerの接続はクラスの代わりに対応する`data-*-target`を使う。

## CommandMenu

`id`・`label`・`shortcuts`・`groups`を渡す。shortcutsは主要な入口、groupsは最近の仕事・人・ページなど。columnsは3または4。検索はgroupsを絞り込み、主要な入口は保つ。

native dialogから`popover="auto"`を持つパネルへ変更した。背景を暗転せず、通常のTab順序を保つ。検索はcombobox、結果はtree、選択中の項目を`aria-activedescendant`で関連付ける。入力にフォーカスを残して矢印・Enterで選択する。

`CommandMenuController`を`command-menu`へ登録する。操作項目の選択は`command-menu:select`の`detail.value`へ通知する。全体キーは一つのCommandMenuに明示的に`shortcut="shift+j"`または`"mod+k"`で登録する。Shift+Jは入力中に発火しない。Ctrl/Cmd+Kは入力中も開閉できる。IME変換中のキーは奪わない。Tabで候補へ移った後も矢印を使え、Home/Endで先頭・末尾へ移れる。検索欄のHome/Endは文字移動を保つ。

## CodeBlockの色分けとコピー（9月16日）

既存の`code`・`label`はそのまま使用できる。`tokens?: readonly { content: string; color?: string }[]`で着色する。改行も含めて全文を`code`と一致させる。不一致なら元の`code`を表示する。トークンに含むHTMLもエスケープする。

`copy`を指定する場合、`ClipboardController`を`clipboard`、`CodeBlockController`を`code-block`として登録する。既定はコピーUIなし。書込可能な環境でのみボタンを表示する。結果は共通Toastで知らせ、コード欄は動かさない。成功は4秒後に消え、hover/focus中は残る。失敗は閉じるまで残る。再コピーは通知を更新し、複数のコピー通知を重ねない。

カタログはサーバー側でPrettierによる整形とShikiによる着色を行う。両者は配布するPlyのランタイム依存へ追加していない。整形済みHTMLをコピーしても文中の空白とpreの内容を保つ。

## 公開APIの追加・変更

- Avatarのsizeへ`inline`（20px）と`large`（64px）を追加。smallは32px、defaultは40px。
- Tableに`density="compact" | "comfortable"`を追加。既定はcompact。
- ActionListのaccentをAvatar・Tagと同じ`blue | green | amber | coral`へ統一。yellowはamber、violetはcoralへ移す。
- ContextBarのルートはdiv。パンくずのnavを内側のBreadcrumbが所有する。
- Toastの閉じる操作はアイコンにし、closeLabelをアクセシブルな名前として保持する。
- Buttonの14px／20px、高さ32px、largeの16px／24px・40px、既存の字形補正は保つ。派生CSSから上書きしない。

役割を削除した公開部品はない。ActionListのLinkListへの改名や検索Pickerの追加など、次の提案は[部品監査](component-audit.md)に分けた。

## 9月16日のフィードバック対応

- `DisclosureGroup`は`label`を持つ集合。見出し16px/24px、本文14px/22px、項目間4px。summaryの内部に`.marker`と`.label`を置く。本文はマークから続く縦線と32pxの字下げで所属を示す。単一展開にはnative `name`を使う。
- `ButtonGroup`は共通の枠を接続する。主操作のButtonとDropdownMenuを隣接させ、`button-group.css`も読み込む。ボタンの文字・高さの指定はButtonが所有する。
- `TagGroup`は横6px・縦4pxの集合。`tag-group.css`も読み込む。
- Tableのソートは`sort="local" | "manual"`、選択は`selectable`、選択中の操作は`selectionActions`。`TableSort`自身が`th`を出力するため、別のthで囲まない。`TableSelection`はcheckboxを出力し、rowIdなしが全選択。送信に使う行にはname/valueを渡す。
- Tableには以下の3controllerを登録する。方向・ARIA・選択状態は上流、実際の行比較と選択バーはPlyが担当する。`table:sort`は`{ column, direction, previousColumn, previousDirection, reason }`を通知する。manualでは行を変更しない。`table:selectionchange`は`{ ids, count, scope: "rendered" }`で、表示中の行だけを対象にする。
- Boardは`columns[].items`へ`{ id, label, content, disabled? }`を渡し、`movable`で移動を有効にする。`content`は任意のHono Child。`BoardController`を`board`へ登録し、`board-item.css`も読む。pointerとSpace・矢印・Enterによる移動、Escapeによる取消に対応する。`board:beforemove`は取消可能、`board:move`は`{ id, fromColumn, toColumn, fromIndex, toIndex }`。保存は利用側へ接続する。
- MessageListは欠損時のfallback、添付数、会話数、下書き/送信中/失敗、現在の項目、閲覧不能、0件/読込/失敗を扱う。hrefを省略すると非リンク。`previewLines`は1または2。
- Notice・ErrorSummary・EmptyStateは`.symbol`を追加。Toastの`.close`は`.actions`の外へ出し、独立した右上の列へ置く。
- Iconは全種類をregularに統一、標準1em・小型6em/7。個別の名前によるサイズ分岐はない。CSS用SVGも同じ素材から全件生成する。Selectの参照を`assets/caret-down.svg`から`assets/caret.svg`へ更新し、Checkboxは`assets/check.svg`をmaskに使う。

```ts
import { TableController, TableSortController, TableSelectController } from "ply/controllers";

application.register("table", TableController);
application.register("table-sort", TableSortController);
application.register("table-select", TableSelectController);
```

各間隔の数値・条件・採用理由は[余白の全件監査](spacing-audit.md)、全38controllerとの対応は[対応表](stimulus-ui-coverage.md)を参照する。

## 導入時の確認

`vp run check`、`vp run test`、`vp run build`、`vp run check:package`を実行する。表示検証が許可されている環境では、対応する`test:visual`も実行する。

既存アプリのコピーでreset・baseを含むCSSの影響を確認し、保存・権限・通信は利用アプリへ接続する。元の成果物を保持し、戻すときはアプリの参照先を戻す。ライブラリの動作確認をアプリの移行完了と扱わない。
