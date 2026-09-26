# Ply

Plyは、管理画面・業務システム・一般利用者向けのtoCサービスで再利用するデザインシステムです。BasecampやHEYのような個性と親しみやすさを持ち、用途をまたいでもできるだけ統一感のある画面を作れることを目指します。予約システム、売上管理、CMSなどの入力・確認・比較・操作を、共通の文字・余白・操作の作法で構成します。

ButtonやInputなどの基本コンポーネントに加え、ToolbarやDangerZoneなど、特定の用途で情報と操作をまとめるコンポーネントも提供します。採用基準と使う範囲は[設計方針](docs/design-system-direction.md)を参照してください。

メールクライアント、CRM、プロジェクト管理、ドキュメント管理、ファイナンシャルダッシュボード、チャットを適用先として評価します。各アプリのデータモデルは利用側が持ち、Plyは情報の読み順・配置・操作を共通化します。

基盤はフレームワークに依存しないCSSとセマンティックHTMLです。同じHTML構造を出力するHono JSXのSSRコンポーネントと、必要なJavaScriptによる動作も提供します。

UIは行メトリクスを揃えたローカルのシステムフォントを使います。Button・Inputなどの操作コンポーネントも`--ply-control-font-family`を共有し、欧文をHelvetica Neue／Arial、和文をHiraginoで表示します。macOSのHiraginoに対するブラウザの行メトリクス補正が、操作コンポーネントの文字位置の基準になることを避けるためです。LINE Seed JPは採用せず、Hiraginoのない環境では端末のシステムフォントへフォールバックします。

上付きの問題と対策、確認範囲、変更時の注意点は[操作コンポーネントの文字位置](docs/control-text-alignment.md)を参照してください。

あずきブックスの出版社向けデザインを切り出し、ブラッシュアップします。中央に置く作業面と上部のコンテキスト領域を継承します。第四版はBasecamp5・HEY・Fizzyの実画面調査を踏まえ、仕事の内容と操作のつながりを見直しています。既存画面の100%再現は目標にせず、書籍・審査などの業務モデルは利用アプリに残します。

## 起動

Node.js 22.18以降または24.11以降とVite+（`vp`）を使います。

```sh
vp install
vp run dev
```

`http://127.0.0.1:5173`にカタログを表示します。ポート変更は`vp run dev --port 5178`。DB・認証・外部サービスは不要です。

- `/`・`/components`：コンポーネント一覧
- `/components/button`等：実表示、同じ表示のHTML、Honoコード、使い方
- `/review/components`：全コンポーネントをまとめた確認
- `/review/components/group-0`〜`group-5`：用途ごとの確認

[HTMLの移行](docs/migration.md)も参照してください。

## フォームと操作

Buttonは文字・縦配置・状態を、Fieldはラベル・補足・エラーと入力の関連付けを所有します。Choice・Select・数値・日付・時刻は標準HTMLの入力と送信を保ちます。候補選択、パスワード表示切替、文字数、全選択などは対応するcontrollerを登録します。

FileInputは標準ファイル選択と、必要に応じてファイル名一覧・ドロップ・選択解除を提供します。送信先や保存先を持ちません。CommandMenuは上部中央の全体移動、DropdownMenuは対象の操作、Dialogは判断、Popoverは近くの補足を担います。

業務データ・権限・通信・永続化は利用アプリが持ちます。旧来の組み合わせ例はcatalogに残っていますが、特定のアプリ機能をライブラリへ含めません。`ply-writing`や`ply-save-status`など旧編集デモのスタイルもcatalog内の実装です。

## ソースと配布

| パス              | 責務                                     | 公開入口            |
| ----------------- | ---------------------------------------- | ------------------- |
| `src/css`         | フレームワーク非依存の生CSS              | `ply/css/*`         |
| `src/hono`        | HonoのSSRコンポーネントと型              | `ply/hono`          |
| `src/controllers` | 利用するstimulus-ui controllerの公開入口 | `ply/controllers`   |
| `catalog`         | Honoアプリ、利用例、カタログ専用ナビ     | 配布APIには含めない |

`index.ts`は再exportのみです。Honoはブラウザ用コードをimportしません。controllersは自動起動・自動登録しません。上流の対応機能を利用・継承し、Ply固有の配置・操作契約は追加controllerが担当します。現在の接続先は`@tknf/stimulus-ui@0.2.0`、Stimulus 3.2.2です。

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

Dialog・Popover・HoverCard・Toast・Tooltipを個別に読み込む場合は、共通の面と余白を定義する`components/overlay.css`も読み込みます。
TaskList・DataList・MessageListには`components/list-frame.css`、ChartFrame内のデータ表には`components/table.css`を併せて読み込みます。

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

DropdownMenuはPlyの`DropdownMenuController`を`dropdown-menu`として登録します。通常操作に加え、`kind`で`link`・`separator`・`group`・`submenu`・`checkbox`・`radio`を指定できます。サブメニューと見出し付きグループは`items`を持ちます。`id`は画面内で一意にし、単一選択の`name`は同じメニュー階層内のグループを表します。項目の`icon`・`description`・`shortcut`、通常操作の`danger`、トリガーの`iconOnly`・`size`・`variant`・`disabled`・`busy`を指定できます。`shortcut`は表示専用です。

選択イベントの`detail`には`value`・`kind`、チェック項目には`checked`、単一選択には`name`も入ります。`dropdown-menu:beforeselect`を`preventDefault()`すると選択を取り消せます。通常操作は選択後に閉じ、チェック・単一選択は開いたまま更新します。`closeOnSelect`で変更できます。リンクは標準のページ移動を行い、選択イベントは発行しません。状態の保存と実際の業務処理は利用側で行います。開閉時は`dropdown-menu:open`・`dropdown-menu:close`を通知します。

上下矢印・Home/Endで有効項目へ移動し、左右矢印で階層を移動します（右から左では方向が反転）。Escapeは一段戻り、Tabは閉じて次の操作へ進みます。文字入力による項目名の先頭検索、マウスでのサブメニュー展開にも対応します。パネルはPopover APIのトップレイヤーへ表示し、画面端では開く方向と位置を調整します。背景とメニューの間に画面全体を覆う透明な実要素を置きます。このレイヤーをクリックするとメニューを閉じます。背後のボタンやリンクはクリック対象にならず、イベントを種類別にキャンセルする処理は使いません。空・全項目無効の場合もパネルにフォーカスして閉じられます。

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

各コンポーネントのカタログには、実際に描画したHonoコードと、その出力HTMLも掲載しています。`check:package`は掲載例を`ply/hono`の配布型でもコンパイルし、ソースと公開型の不一致を検査します。

現在はライトが対象です。Safari 16.5実機、スクリーンリーダー、他OSのフォント、実利用者評価は未確認です。WebKitのテスト結果をSafari 16.5確認済みとは扱いません。文字200%試験はCSSの文字サイズ拡大であり、OS設定や全ブラウザのズームを代替しません。自動テストに全画像の目視やデザイン承認は含まれません。

- [設計方針](docs/design-system-direction.md)
- [トークン仕様](design/tokens.md)
- [移行ガイド](docs/migration.md)

## 主なコンポーネントAPI

- `PageHeader`：左揃えが初期値。`icon={<Icon name="pencil" />}`を指定できる。
- `Button` / `ActionLink`：通常は32px相当、`size="compact"`は同じ高さで左右余白を狭める。フォーム末尾等の大きな操作には`size="large"`（40px相当）を明示する。primaryは青い塗り。
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

## 共通アイコン

Phosphor Iconsのregularを共通で使います。標準1em、小型6em/7とし、名前によるサイズ・ウェイトの分岐はありません。`vp run icons:build`でSVGスプライトとCSS用の単独SVGを同じ素材から生成します。配布される`ply/icons.svg`を同一オリジンの`/assets/ply-icons.svg`へ置いてください。配置先が異なる場合は`<Icon name="pencil" sprite="/static/icons.svg" />`で指定します。CSSのみでも同じ`svg/use`を使えます。ライセンスを含む[選定理由と配布方法](docs/icon-selection.md)を参照してください。

第四版の確認は `/search` から記事を開き、「読み返す」「変更を確認」「下書きを保存」の順で操作できます。比較対象は同じ記事の前回保存（初回はサンプル初期内容）です。一覧へ戻ると検索条件を保持します。

## コンポーネントの対象

各コンポーネントページには配布CSSを使う実物、HTML、公開型でも検査するHonoコードを掲載しています。

公開コンポーネントの一覧はカタログの`/components`を参照してください。Fieldが持つInput・Textarea・Select・ChoiceはFieldの見本に含みます。

Switch・Range・DatePicker・TaskListは標準入力の送信、キーボード操作、disabledを利用します。Suggestionは自由入力に候補を添えます。`SuggestionController`を`suggestion`として登録すると、候補の絞り込み、標準input/changeイベントの通知、フォームのリセットが加わります。JavaScriptなしでは標準datalistを使います。Popover・ToastはHTML Popover API対応ブラウザを前提とし、対応するcontrollerを登録します。

Calendarの週データとBoardの列データは利用側で与えます。案件管理の追加・移動は現在の画面のみ、設定は`ply-demo-workspace-settings`キーでこのブラウザのlocalStorageへ保存します。デモcontrollerはcatalogに限定します。CSSだけの予約、記事の既存保存キー、上流stimulus-uiの公開入口は維持しています。
