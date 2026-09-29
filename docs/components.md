# コンポーネントの詳細

全コンポーネントの見本・HTML・Honoのコードはカタログの各ページ（`/components/<名前>`）に掲載しています。この文書では、カタログの説明に収まらない動作と受け渡しの約束を補足します。

## Button

- 高さは通常36px、`size="compact"`は同じ高さで左右の余白を狭め、`size="large"`は40pxです。フォーム末尾など大きな操作に`large`を使います。
- `variant`は`primary`（青の塗り）・`secondary`・`danger`（赤の塗り）・`link`（文字だけ）です。違いは塗りの色で出し、形はどれもピルです。
- Buttonは文字・太さ・行高・上下の余白・縦配置を自分で持ちます。他のコンポーネントのCSSから上書きしないでください。

## CommandMenu

`id`・`label`・`shortcuts`・`groups`を渡します。`shortcuts`は主要な入口、`groups`は最近の場所・人・ページなどの一覧です。`columns`は3または4です。

- 背景を暗転しない`popover="auto"`のパネルです。検索はcombobox、結果はtreeで、選択中の項目を`aria-activedescendant`で関連付けます。
- 開くと検索欄へ移り、矢印で候補を選び、Enterで実行、Escで閉じます。Tabで候補へ移った後も矢印が使え、Home・Endで先頭・末尾へ移れます。検索欄のHome・Endは文字の移動を保ちます。
- 全体のキーは一つのCommandMenuに`shortcut="shift+j"`または`"mod+k"`で登録します。Shift+Jは入力中に発火せず、Ctrl/Cmd+Kは入力中も開閉できます。日本語の変換中のキーは奪いません。
- 操作の項目を選ぶと`command-menu:select`の`detail.value`で知らせます。

## DropdownMenu

通常の操作に加え、`kind`で`link`・`separator`・`group`・`submenu`・`checkbox`・`radio`を指定できます。

- サブメニューと見出し付きグループは`items`を持ちます。`id`は画面内で一意にし、単一選択の`name`は同じ階層内のグループを表します。
- 項目には`icon`・`description`・`shortcut`（表示のみ）、通常の操作には`danger`を指定できます。トリガーには`iconOnly`・`size`・`variant`・`disabled`・`busy`を指定できます。
- 通常の操作は選ぶと閉じ、チェック・単一選択は開いたまま更新します。`closeOnSelect`で変更できます。リンクは標準のページ移動を行い、選択イベントを発行しません。
- 上下の矢印・Home/Endで有効な項目へ移り、左右の矢印で階層を移ります（右から左に読む場合は反転）。Escは一段戻り、Tabは閉じて次の操作へ進みます。文字を打つと項目名の先頭で探し、マウスではサブメニューを開きます。
- パネルはPopover APIのトップレイヤーに表示し、画面端では開く方向と位置を調整します。背後に透明な層を置き、層を押すとメニューを閉じます。背後のボタンやリンクは押されません。
- 項目は上揃えです。一行の時は対称な上下余白で中央に見え、説明が増えると同じ上端から下へ伸びます。

## DatePicker

`mode="single"`は単日、`range`は期間、`flexible`は両方を選べます。期間もひとつの欄に表示し、カレンダーの上部で日付を直接編集できます。`flexible`は下部の「終了日」スイッチ、またはShift＋クリックで期間に切り替えます。

```tsx
<DatePicker label="公開日" name="published_on" value="2026-09-12" required />
<DatePicker label="集計期間" mode="range" startName="report_start" endName="report_end"
  start="2026-09-01" end="2026-09-30" required />
<DatePicker label="予定日" mode="flexible" startName="date[start]" endName="date[end]"
  kindName="date[kind]" selection={{ kind: "single", start: "2026-09-12" }} />
```

### 送信する値

- 日付は指定した`name`へ`YYYY-MM-DD`で送信します。角括弧を含むnameもそのまま扱い、ネストへの変換はサーバー側の処理です。表示用の`YYYY/MM/DD – YYYY/MM/DD`は送信しません。
- `flexible`の`selection`は`{ kind: "single", start }`または`{ kind: "range", start, end }`です。同日でもrangeを保持します。`kindName`には`single`または`range`を送ります。
- 未入力の日付と、singleの終了日は空文字を送ります。空の扱いはサーバー側で決めてください。
- 独立した開始日・終了日の片方または両方が任意なら、singleを二つ置き、`required`も個別に指定します。
- 入力欄へ直接入力できます。期間は二つの日付を「–」で区切ります。

### 変更の知らせ

- カレンダーの選択と終了日スイッチはその場で反映し、閉じても保持します。入力途中の不正な文字列は送信値に反映しません。
- `date-picker:beforechange`は取り消せます。`date-picker:change`とともに`{ selection, previousSelection }`を知らせ、送信フィールドにも標準の`input`・`change`を発火します。
- 外部から値を変えた場合は`input`・`change`を発火するか、controllerの`refresh()`を呼んで表示を同期します。
- JavaScriptやPopover APIが使えない場合は標準の日付入力に戻ります。

### 日付同士の上限・下限

`minFrom`は参照する日の当日以降、`maxFrom`は当日以前を許可します。参照するのはDatePickerのルートID、または`YYYY-MM-DD`を値に持つ通常のinputのIDです。ラベル・name・必須性から関係を推測しません。

```tsx
<DatePicker id="received" label="受付日" name="received_on" required maxFrom="response" />
<DatePicker id="response" label="対応予定日" name="response_on" minFrom="received" />

<DatePicker id="manuscript" label="原稿締切" name="deadline"
  maxFrom={{ id: "release", offsetDays: -1 }} />
<DatePicker id="release" label="公開予定日" name="published_on"
  minFrom={{ id: "manuscript", offsetDays: 1 }} />
```

- `offsetDays`で日数の差を指定できます。期間の終了日を参照する場合は`{ id: "event-period", bound: "end" }`とします。
- 固定の`min`・`max`と併用すると、両方の条件を満たす日だけを許可します。
- 参照先の変更・`refresh()`・フォームのリセットに追従します。相手の値は書き換えません。参照が空・不正・未配置なら、その条件を外します。
- 条件外になった既存の入力は残してエラーを表示し、直すまでフォームの送信を止めます。
- JavaScriptなしでは連動しません。サーバー側でも前後関係を検証してください。

## Range

`RangeController`を`range`として登録します。現在値の表示と、範囲指定の数値入力を担当します。`value`・`start`・`end`の公開APIと、`slider:beforechange`・`slider:change`に対応します。数値入力の確定は標準の`change`で受け取れます。

## Suggestion

自由入力に候補を添えます。`SuggestionController`を`suggestion`として登録すると、候補の絞り込み、標準の`input`・`change`の通知、フォームのリセットが加わります。JavaScriptなしでは標準のdatalistを使います。選択肢を限定する場合はSelectを使います。

## Table

- `density="compact" | "comfortable"`で密度を選びます。既定はcompactです。
- 並べ替えは`sort="local" | "manual"`です。`TableSort`自身が`th`を出力するので、別の`th`で囲みません。`manual`では行を並べ替えず、`table:sort`だけを知らせます。
- 選択は`selectable`、選択中の操作は`selectionActions`で渡します。`TableSelection`はチェックボックスを出力し、`rowId`なしが全選択です。送信に使う行には`name`・`value`を渡します。
- 選択中の操作は画面の下の中央に浮かぶ棚に出し、表は動かしません。
- `table`・`table-sort`・`table-select`の三つを登録します。

```ts
import { TableController, TableSortController, TableSelectController } from "ply/controllers";

application.register("table", TableController);
application.register("table-sort", TableSortController);
application.register("table-select", TableSelectController);
```

## Board

- `columns[].items`へ`{ id, label, content, disabled? }`を渡し、`movable`で移動を有効にします。`content`には任意のHonoの要素を渡せます。
- `BoardController`を`board`として登録し、`board-item.css`も読み込みます。
- ポインターと、Space・矢印・Enterのキーボードで運べます。Escで取り消します。
- `board:beforemove`は取り消せます。`board:move`は`{ id, fromColumn, toColumn, fromIndex, toIndex }`を知らせます。保存は利用側で行います。
- `collapsible`の列はたためます。開閉の保存は利用側が持ち、Boardは表示の切り替えと取り消せる`board:toggle`だけを持ちます。

## CodeBlock

- `tokens?: readonly { content: string; color?: string }[]`で着色します。改行も含めて全文を`code`と一致させてください。一致しない場合は元の`code`を表示します。
- `copy`を指定する場合は`ClipboardController`を`clipboard`、`CodeBlockController`を`code-block`として登録します。書き込める環境でだけコピーの操作を表示し、結果をToastで知らせます。

## FileInput

標準のファイル選択に加え、ファイル名の一覧・ドロップ・選択の解除を提供します。送信先や保存先は持ちません。通常の選択は標準の`change`、ドロップは`file-drop:drop`で受け取ります。

## MessageList

`items`へ`id`・`sender`・`title`・`href`、任意の`preview`・`time`・`datetime`・`avatar`・`unread`を渡します。`threadCount`・`attachments`・`current`・`state`（`draft`・`sending`・`failed`）・`unavailableReason`に対応し、一覧全体の`state`は`ready`・`loading`・`error`です。`href`を省略した行はリンクにしません。

## 利用例

カタログの`/apps/project`などには、コンポーネントだけで組んだ利用例のアプリ「つむぐ」があります。プロジェクト・受信トレイ・予定・文書・資料・売上・検索・メンバー・設定の九つの画面で、組み合わせ方を確認できます。利用例の保存（受信トレイの整理・設定の保存など）はカタログの中のデモで、Plyには含みません。
