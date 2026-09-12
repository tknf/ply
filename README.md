# Ply

Plyは、業務アプリケーションを中心に、御社が開発する複数のアプリケーションで再利用するデザインシステムです。予約システム、売上管理、CMSなどの入力・確認・比較・操作を、一貫した品質で構成できることを目指します。

基盤はフレームワークに依存しないCSSとセマンティックHTMLです。同じHTML構造を出力するHono JSXのSSRコンポーネントと、必要なJavaScriptによる動作も提供します。

本文はHiragino優先のシステムフォントを使います。Button・Input・InputGroup・DatePickerの操作部品は`--ply-control-font-family`を共有し、欧文をHelvetica Neue／Arial、和文をHiraginoで表示します。macOSのHiraginoに対するブラウザの行メトリクス補正が、操作部品の文字位置の基準になることを避けるためです。LINE Seed JPは採用せず、Hiraginoのない環境では端末のシステムフォントへフォールバックします。

上付きの問題と対策、確認範囲、変更時の注意点は[操作部品の文字位置](docs/control-text-alignment.md)を参照してください。

あずきブックスの出版社向けデザインを切り出し、ブラッシュアップします。中央に置く作業面と上部のコンテキスト領域を継承します。第四版はBasecamp5・HEY・Fizzyの実画面調査を踏まえ、仕事の内容と操作のつながりを見直しています。既存画面の100%再現は目標にせず、書籍・審査などの業務モデルは利用アプリに残します。

## 起動

Node.js 22.18以降または24.11以降とVite+（`vp`）を使います。

```sh
vp install
vp run dev
```

`http://127.0.0.1:5173`にカタログを表示します。ポート変更は`vp run dev --port 5178`。DB・認証・外部サービスは不要です。

- `/`：記事・予約・売上・ファイルの道具箱と部品一覧
- `/components`：50種類の部品を用途別に探す一覧
- `/examples/project`：仕事の追加・状態移動を試せる案件管理
- `/examples/settings`：設定の入力・保存・復元
- `/examples/schedule`：月表示と予定一覧
- `/components/button`等：実物、HTMLコード、型検査済みHonoコード、状態・変種と注意点
- `/example`：第四版の編集画面（本文・読み返し・下書き保存）
- `/search`・`/search/empty`：記事の絞り込みと0件のCMS例
- `/reservation`：CSSと標準HTMLだけの予約条件フォーム（JavaScriptなし）
- `/sales`：月を切り替えて集計と商品別内訳を確認する売上表
- `/files`：ファイル一覧と、選択したファイルの名前・サイズの反映
- `/review`：現在の入力と前回保存した記事の比較

架空のサンプルです。編集画面は、このブラウザのlocalStorageへ記事ごとの下書きを保存します。検索はサンプル6件と保存済み下書きに連動します。公開・予約・アップロードは行いません。保存・検索のデモcontrollerはcatalog内に置き、ライブラリに特定の保存方式を持ち込みません。

ファイルの差し替えは選択した名前・サイズだけを現在の画面に反映し、再読み込みで元に戻ります。内容の読み取り・送信はしません。予約は標準入力検証まで、売上は固定の月別データを切り替える例です。

## フォームと編集の操作

フォームは共有CSSでチェックボックス・ラジオの形と選択印を描画します。HTMLのinputは維持し、ラベルクリック・Space・ラジオの矢印移動・required・disabledは標準の挙動を使います。forced-colors時は端末の選択表示へ戻します。

`Choice`には任意の`description`と`kind="option"`を追加しました。説明付きの選択行を作る場合に使います。単純な同意チェックは既定のまま使えます。CSSのみの場合も`label.ply-choice > input + span`で同じ表示になります。`ply-form`は見出しから送信操作まで幅と左端を揃える配置、`data-size="short"`は人数などの短い入力に使います。

`FileInput`は標準の`input type="file"`を使い、`name`・`multiple`・`accept`・`required`・`form`をそのまま渡します。`help`・`error`はFieldと同じ関連付けです。`FileInputController`を`file-input`として登録すると、Stimulus-uiのドロップ処理に、ファイル名とサイズの一覧・選択解除が加わります。選択し直すと既存の選択を置き換え、ドロップ・解除も標準の`input`/`change`を通知します。外部から選択をクリアした場合も、このイベントで表示を同期できます。JavaScriptなしでは標準のファイル選択を使います。`accept`は選択ダイアログの絞り込み指定で、ファイルの検証・送信・保存は利用アプリ側で行います。

[編集画面](http://127.0.0.1:5179/example)で記事名・本文を書き、「読み返す」で内容を確認できます。Escで執筆へ戻ります。「下書きを保存」またはCmd/Ctrl+Sで保存します。保存後の変更は「保存時に戻す」で戻せ、その取り消しもできます。未保存で画面を離れるときだけ、破棄の確認を出します。

[記事一覧](http://127.0.0.1:5179/search)はキーワードと状態で絞り込めます。保存した下書きも検索対象です。別のブラウザ・オリジンとは共有せず、サイトデータを消すと下書きも消えます。

CSSだけでも入力・設定の開閉・読む面を利用できます。デモの保存・プレビュー切替はJavaScriptが必要で、無効時は保存操作を無効化します。静的カタログでの動的な検索にもJavaScriptが必要です。Hono開発サーバーではGET検索も処理します。

`Input` / `Textarea`の`data-kind="title"` / `data-kind="body"`で文書向けの文字と境界にし、`ply-writing`、`ply-writing-page`、`ply-writing-foot`で構成します。`ply-reading`と`ply-reading-body`は読む面です。ラベルを必ず関連付け、モード切替・フォーカス・保存処理は利用側で実装します。実例は`catalog/pages/editor.tsx`を参照してください。

`ply-save-status`は操作のそばの短い状態表示。`data-state="saved"|"error"`で結果を識別します。Noticeは本文中心の補足へ変更し、warning/dangerだけ境界を付けます。入力エラーはField、保存結果は操作付近で扱い、すべてをNoticeへ集約しません。

## ソースと配布

| パス              | 責務                                     | 公開入口            |
| ----------------- | ---------------------------------------- | ------------------- |
| `src/css`         | フレームワーク非依存の生CSS              | `ply/css/*`         |
| `src/hono`        | 部品ごとのHono SSRコンポーネントと型     | `ply/hono`          |
| `src/controllers` | 利用するstimulus-ui controllerの公開入口 | `ply/controllers`   |
| `catalog`         | Honoアプリ、利用例、カタログ専用ナビ     | 配布APIには含めない |

`index.ts`は再exportのみです。Honoはブラウザ用コードをimportしません。controllersは自動起動・自動登録せず、上流を再実装しません。現在の接続先は`@tknf/stimulus-ui@0.1.0`、Stimulus 3.2.2です。

```sh
vp run build
vp run check:package
vp run preview
```

`dist/hono`・`dist/controllers`・`dist/css`がライブラリ、`dist/catalog`が静的カタログです。配布用CSSとカタログは同じファイルを使います。公開パッケージにはしておらず、`private: true`を維持しています。

## CSSだけで使う

ビルドした`dist/css`を利用アプリの静的配信先へコピーします。次はButtonに必要な読み込み例です。

```html
<link rel="stylesheet" href="/ply/layers.css" />
<link rel="stylesheet" href="/ply/reset.css" />
<link rel="stylesheet" href="/ply/tokens.css" />
<link rel="stylesheet" href="/ply/base.css" />
<link rel="stylesheet" href="/ply/components/button.css" />

<button class="ply-button" type="submit" data-variant="primary">保存する</button>
```

`layers.css`は必ず先頭。その後reset・tokens・base・layout、必要なcomponentsを読みます。レイヤー優先順は`reset, base, tokens, layout, components, utilities, overrides`。`@import`は使いません。reset・baseはページ全体へ適用するため、既存アプリにはページ単位で導入してください。

通常のフォームとdetailsはJavaScriptなしで操作できます。`/reservation`では日付・時刻・数値入力、radio・checkbox、fieldsetの無効化、入れ子のdetails、標準入力検証とresetを試せます。HTMLのソースは`catalog/pages/reservation.ts`です。Dialog・DropdownMenu・Tabs・FileDropの追加動作にはcontroller登録が必要です。CSSのみで任意のJavaScriptから操作する場合も、同じHTML構造・状態属性を使用できます。

## Honoで使う

利用アプリでこのパッケージをローカル依存として参照し、`hono`を導入します。TypeScriptは`jsx: "react-jsx"`と`jsxImportSource: "hono/jsx"`を指定します。これはHonoの構文設定で、Reactへの依存はありません。

```tsx
import { Hono } from "hono";
import { Button, Field, Input } from "ply/hono";

const app = new Hono();
app.get("/edit", (c) =>
  c.html(
    <form method="post" action="/items">
      <Field id="title" label="名前" help="一覧に表示する名前です。">
        {(attributes) => <Input {...attributes} name="title" required />}
      </Field>
      <Button type="submit" variant="primary" name="intent" value="save">
        保存する
      </Button>
    </form>,
  ),
);
```

Fieldのidはページ内で一意にします。Input等には標準HTML属性を渡せます。Fieldはラベル、存在する補足・エラーのID、`aria-invalid`と`data-invalid`の対応を組み立てます。検証や保存は利用アプリが行います。

```ts
import { Application } from "@hotwired/stimulus";
import { DialogController, FileInputController } from "ply/controllers";

const application = Application.start(); // 既存Applicationがあればそれを使う
application.register("dialog", DialogController);
application.register("file-input", FileInputController);
```

Rangeは`RangeController`を`range`として登録します。このcontrollerはStimulus-uiの`SliderController`を継承し、現在値の表示と範囲指定の数値入力を担当します。`value`・`start`・`end`の公開API、`slider:beforechange`・`slider:change`は上流の操作に対応します。数値入力の確定は標準の`change`で受け取れます。

file-dropの通常選択は`change`、ドロップ受け取りは`file-drop:drop`を処理します。DropdownMenuは`dropdown-menu:select`を通知します。Turboはカタログで接続検証に使っていますが、ライブラリの必須依存ではありません。

## 検証

```sh
vp run check
vp run test
vp run build
vp run check:package
vp run browsers:install
vp run test:visual
```

`check`は型・lint・formatと、論理プロパティ、ネスト、レイヤー、禁止記法、未定義トークンを確認します。`test:visual`は自分専用の5178番サーバーを起動・終了し、Chromium・Firefox・WebKitで表示と操作を確認します。スクリーンショット・失敗時trace・JSON結果は`test-results`へ出力します。

各部品のカタログには、実際に描画したHonoコードと、その出力HTMLも掲載しています。`check:package`は掲載例を`ply/hono`の配布型でもコンパイルし、ソースと公開型の不一致を検査します。

現在はライトが対象です。Safari 16.5実機、スクリーンリーダー、他OSのフォント、実利用者評価は未確認です。WebKitのテスト結果をSafari 16.5確認済みとは扱いません。文字200%試験はCSSの文字サイズ拡大であり、OS設定や全ブラウザのズームを代替しません。自動テストに全画像の目視やデザイン承認は含まれません。

- [設計方針](docs/design-system-direction.md)
- [トークン仕様](design/tokens.md)
- [移行ガイド](docs/migration.md)

## 主な部品API

- `PageHeader`：左揃えが初期値。`icon={<Icon name="pencil" />}`を指定できる。
- `Button` / `ActionLink`：通常は32px相当、`size="compact"`は同じ高さで左右余白を狭める。フォーム末尾等の大きな操作には`size="large"`（40px相当）を明示する。primaryは青い塗り。寸法の根拠は[Basecampの実測](docs/references/37signals-20260910/button-measurements-20260911.md)。
- `Surface`：`kind="panel" tone="warm"`で設定をまとめ、`tone="cool"`でプレビュー・補足を区別する。
- `ActionList`：`layout="grid"`とitemsの`icon`・`accent`・`preview`で内容の見える入口を作る。カード内に別の操作を入れない。
- `Icon`：文言を補う装飾SVG。独立したアイコンボタンを使う場合は利用側でアクセシブルな名前を付ける。
- `DatePicker`：`DatePickerController`を`date-picker`として登録する。`mode="single"`は単日、`range`は期間、`flexible`は両方を選べる。期間もひとつの欄に表示し、カレンダーの上部で日付を直接編集できる。flexibleの種別は初期値で明示し、下部の「終了日」スイッチまたはShift＋クリックで変更する。required・min・max・readonly・disabled・リセットに対応する。

### DatePickerのバインド

UIのモードと送信先は呼び出し側が指定します。独立した開始日・終了日の片方または両方が任意なら、singleを2つ置き、requiredも個別に指定してください。

```tsx
<DatePicker label="公開日" name="published_on" value="2026-09-12" required />
<DatePicker label="集計期間" mode="range" startName="report_start" endName="report_end"
  start="2026-09-01" end="2026-09-30" required />
<DatePicker label="予定日" mode="flexible" startName="date[start]" endName="date[end]"
  kindName="date[kind]" selection={{ kind: "single", start: "2026-09-12" }} />
```

- 日付は指定したnameへ`YYYY-MM-DD`で送信します。角括弧を含むnameもそのまま扱い、ネストへの変換はサーバー側の処理です。表示用の`YYYY/MM/DD – YYYY/MM/DD`は送信しません。
- flexibleのselectionは`{ kind: "single", start }`または`{ kind: "range", start, end }`。同日でもrangeは保持します。kindNameには`single`または`range`を送ります。
- 未入力の日付とsingleの終了日は空文字を送ります。キー省略やnullへの変換、更新時のクリアの扱いはサーバー側で決めてください。未入力のrangeも、両方空でrequiredがなければ有効です。片側だけのrangeは無効です。
- 入力欄へ直接入力できます。期間は2つの日付を「–」で区切ります。flexibleの直接入力では、1日ならsingle、区切った2日ならrangeという明示的な入力として扱います。
- カレンダーの選択・終了日スイッチはその場で反映します。閉じても有効な選択は保持し、日付欄への入力途中の不正な文字列は送信値に反映しません。`date-picker:beforechange`はキャンセル可能で、`date-picker:change`とともに`{ selection, previousSelection }`を通知します。変更された送信フィールドにも標準input/changeイベントを通知します。
- 外部からバインド先の値を変更した場合はinput/changeを発火するか、controllerの`refresh()`を呼んで表示を同期します。
- JavaScriptやPopover APIが使えない場合は標準日付入力へ戻ります。flexibleは形式のselectと開始日・終了日を表示します。日付・形式・期間の前後関係は保存先でも検証してください。

### 日付同士の上限・下限の連動

`minFrom`は参照日の当日以降、`maxFrom`は当日以前を許可します。参照するのはDatePickerのルートID、または`YYYY-MM-DD`を値に持つ通常のinputのIDです。ラベル・name・必須性から関係を推測しません。

```tsx
<DatePicker id="received" label="受付日" name="received_on" required maxFrom="response" />
<DatePicker id="response" label="対応予定日" name="response_on" minFrom="received" />

<DatePicker id="manuscript" label="原稿締切" name="deadline"
  maxFrom={{ id: "release", offsetDays: -1 }} />
<DatePicker id="release" label="公開予定日" name="published_on"
  minFrom={{ id: "manuscript", offsetDays: 1 }} />
```

- オブジェクト形式の`offsetDays`で日数差を指定できます。`1`なら翌日、`-1`なら前日です。期間の終了日を参照する場合は`{ id: "event-period", bound: "end" }`とします。省略時のboundはstartです。
- 固定のmin/maxと併用すると両方の条件を満たす日だけを許可します。上限と下限が交差する場合は全日を選択不可にします。
- 参照先のinput/change・DatePickerのrefresh・フォームのresetに追従し、カレンダーの選択可能日と直接入力の検証を更新します。相手の値は書き換えません。参照が空・不正・未配置なら、その参照による条件を外して固定境界へ戻します。
- 関連日を変更して既存の入力が条件外になった場合は、入力を残してエラーを表示します。ユーザーが修正するまで標準フォームの送信を止めます。
- JavaScriptなしでは動的な連動は行いません。サーバー側でも関連項目の前後関係を検証してください。

UIの参照元と今回の確認範囲は[DatePickerの設計メモ](docs/date-picker-design.md)に記録しています。

## 共通アイコン

Phosphor Iconsのboldを必要分だけ外部SVGスプライトにしています。`vp run icons:build`で生成し、dev/buildでも自動実行します。配布される`ply/icons.svg`を同一オリジンの`/assets/ply-icons.svg`へ置いてください。配置先が異なる場合は`<Icon name="pencil" sprite="/static/icons.svg" />`で指定します。CSSのみでも同じ`svg/use`を使えます。ライセンスを含む[選定理由と配布方法](docs/icon-selection.md)を参照してください。

第四版の確認は `/search` から記事を開き、「読み返す」「変更を確認」「下書きを保存」の順で操作できます。比較対象は同じ記事の前回保存（初回はサンプル初期内容）です。一覧へ戻ると検索条件を保持します。

## 部品の対象

基本部品の用途と範囲は[対象と実装状況](docs/component-coverage.md)を参照してください。各ページには配布CSSを使う実物、HTML、実際にSSRして公開型でも検査するHonoコードを掲載しています。

追加：Avatar、Breadcrumb、Navigation、Steps、Toolbar、InputGroup、Switch、Range、Suggestion、DatePicker、Tag、Statistic、Card、Timeline、TaskList、Calendar、Board、ErrorSummary、Loading、Toast、Popover、CodeBlock、Keycap、Divider。Fieldが持つInput・Textarea・Select・Choiceを別部品として重複加算していません。

Switch・Range・DatePicker・TaskListは標準入力の送信、キーボード操作、disabledを利用します。Suggestionは自由入力に候補を添えます。`SuggestionController`を`suggestion`として登録すると、Stimulus-uiの候補選択に部分一致の絞り込み、標準input/changeイベントの通知、フォームのリセットが加わります。JavaScriptなしでは標準datalistを使います。Popover・ToastはHTML Popover API対応ブラウザを前提とし、追加controllerは不要です。旧ブラウザではDisclosure等を利用してください。Safari 16.5実機での対応を保証する追加ではありません。

Calendarの週データとBoardの列データは利用側で与えます。案件管理の追加・移動は現在の画面のみ、設定は`ply-demo-workspace-settings`キーでこのブラウザのlocalStorageへ保存します。デモcontrollerはcatalogに限定します。CSSだけの予約、記事の既存保存キー、上流stimulus-uiの公開入口は維持しています。
