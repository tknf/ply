import {
  Avatar,
  Breadcrumb,
  Navigation,
  Steps,
  InputGroup,
  Field,
  Switch,
  Range,
  Suggestion,
  DatePicker,
  FileInput,
  FilterBar,
  Tag,
  Statistic,
  Card,
  Timeline,
  TaskList,
  Calendar,
  Board,
  ErrorSummary,
  Loading,
  Toast,
  Popover,
  CodeBlock,
  Keycap,
  Divider,
} from "../src/hono";
import ToolbarExample from "./hono-examples/toolbar";
export const extendedExamples = [
  {
    id: "filter-bar",
    name: "FilterBar",
    description: "一覧を絞り込む条件をリンクで切り替える",
    render: () => (
      <FilterBar
        label="記事の状態"
        items={[
          { label: "すべて", href: "/search", count: 6, current: true },
          { label: "公開中", href: "/search?state=公開中", count: 3 },
          { label: "下書き", href: "/search?state=下書き", count: 3 },
        ]}
      />
    ),
    usage:
      "itemsにlabel・href・current・任意のcountを渡し、共通のActionLinkとして描画します。CSSはbutton.cssとfilter-bar.cssを併用します。currentから選択中の表示とaria-currentを生成し、countは0件も表示します。条件を含むURLと選択状態はサーバーが指定します。通常のリンクなのでJavaScriptなしで移動でき、controllerの登録は不要です。childrenでリンクを直接構築する使い方も維持しています。",
  },
  {
    id: "file-input",
    name: "FileInput",
    description: "ファイルを選択し、添付する内容を確認する",
    render: () => (
      <FileInput
        id="sample-file"
        name="attachments"
        label="添付ファイル"
        accept=".pdf,application/pdf"
        multiple
        help="PDFを複数選択できます。"
      />
    ),
    usage:
      "FileInputControllerをfile-inputとして登録すると、Stimulus-uiのFileDropControllerによるドロップに加え、名前・サイズの一覧と選択解除を使えます。ドロップ・解除もinput/changeを通知します。name・multiple・accept・required・formは標準のファイル入力へ渡し、help・errorはFieldと同じ表示と読み上げの関連付けです。JavaScriptなしでは標準のファイル選択を使えます。選び直しは置き換えで、追加・アップロードは行いません。acceptは選択ダイアログの絞り込み指定で、形式・容量の検証は送信先で行います。",
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "人物やチームを名前と一緒に示す",
    render: () => (
      <div class="ply-cluster">
        <Avatar name="田中 遥" initials="田" />
        <span>田中 遥</span>
        <Avatar name="佐藤 健" initials="佐" size="small" />
      </div>
    ),
    usage: "画像なしは指定した略称を表示。名前を色だけで識別しません。",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "階層をたどって上位へ戻る",
    render: () => (
      <Breadcrumb
        items={[
          { label: "道具箱", href: "/" },
          { label: "記事", href: "/search" },
          { label: "編集" },
        ]}
      />
    ),
    usage: "現在地にはリンクを付けず、最後の項目として示します。ContextBar外でも利用できます。",
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "同じ領域のページを切り替える",
    render: () => (
      <Navigation
        label="記事の分類"
        items={[
          { label: "すべての記事", href: "/search", current: true, count: 6 },
          { label: "下書き", href: "/search?state=draft", count: 2 },
          { label: "道具箱へ", href: "/" },
        ]}
      />
    ),
    usage:
      "ページ移動には通常のリンクを使い、アプリ用メニューのroleを付けません。0件も表示します。",
  },
  {
    id: "steps",
    name: "Steps",
    description: "手順と現在の段階を示す",
    render: () => (
      <Steps
        label="申し込みの手順"
        items={[
          { label: "日時", state: "complete", href: "/reservation" },
          { label: "連絡先", state: "current" },
          { label: "確認", state: "upcoming" },
        ]}
      />
    ),
    usage: "段階の意味をテキストでも伝えます。未入力の段階へ移動できるかは利用側で決めます。",
  },
  {
    id: "toolbar",
    name: "Toolbar",
    description: "対象に対する複数の操作をまとめる",
    render: () => <ToolbarExample id="sample-toolbar" />,
    usage:
      "実行する操作をまとめる配置部品です。表示条件と選択状態を持つFilterBarとは役割が異なります。既存のButton・ActionLinkなどをchildrenに渡し、CSSはbutton.cssとtoolbar.cssを併用します。通常のTab移動を保つrole=groupの操作群で、controllerは不要です。フォームの送信・リセットはButtonのtypeで指定します。狭い配置では項目が折り返します。id・class・dir・data属性もルートへ渡せます。",
  },
  {
    id: "input-group",
    name: "InputGroup",
    description: "単位や接頭辞を入力と並べる",
    render: () => (
      <Field id="sample-group-price" label="料金（円）">
        {(attributes) => (
          <InputGroup {...attributes} prefix="¥" type="number" min={0} value={1200} />
        )}
      </Field>
    ),
    usage:
      "prefix・suffixで接頭辞や単位、actionで操作の文言とButtonの属性を渡します。入力欄・操作ボタン・読み上げの関連付けはInputGroupが生成します。通常は32px、size=largeは40pxで入力とボタンを揃えます。単位はラベルにも含め、値には混ぜません。type=numberはNumberFieldControllerをnumber-fieldとして一度登録すると、PageUp・PageDownと境界状態に対応します。検索例は実際に記事の検索結果へ移動します。",
  },
  {
    id: "switch",
    name: "Switch",
    description: "二択の設定を切り替える",
    render: () => <Switch id="sample-switch-digest" label="週次のまとめ" name="digest" checked />,
    usage:
      "ON/OFFの設定に使います。標準checkboxのSpace・フォーム送信・リセット・disabledを保ち、JavaScriptなしで動きます。checkedは初期状態、nameとvalueはON時の送信値です。説明の読み上げへの関連付けと、id省略時のID生成はSwitchが行います。Stimulus-ui 0.1.0にはSwitch専用controllerはありません。保存が必要な設定は設定画面の例を参照してください。",
  },
  {
    id: "range",
    name: "Range",
    description: "連続する数値を調整する",
    render: () => (
      <Range
        id="sample-range-zoom"
        label="表示倍率（%）"
        min={50}
        max={200}
        step={10}
        value={100}
        unit="%"
      />
    ),
    usage:
      "valueに数値を渡すと単一値、[下限, 上限]を渡すと範囲指定になります。範囲指定のnameはname-start・name-endとして送信します。RangeControllerをrangeとして登録すると、Stimulus-uiのSliderControllerによる状態管理・上下限制約に、現在値の表示と数値入力の同期が加わります。矢印キー・Home・Endは標準入力の操作です。JavaScriptなしの範囲指定は独立した2本のスライダーになります。",
  },
  {
    id: "suggestion",
    name: "Suggestion",
    description: "自由入力に候補を添える",
    render: () => (
      <Suggestion
        id="sample-category"
        label="分類（自由入力可）"
        options={["お知らせ", "暮らし", "仕事場"]}
        placeholder="入力または候補から選択"
      />
    ),
    usage:
      "SuggestionControllerをsuggestionとして登録すると、入力による部分一致の絞り込みと候補一覧を使えます。矢印キーで移動、Enterで選択、Escapeで閉じます。右の矢印はすべての候補を開閉します。候補外の値もそのまま送信できます。help・errorはFieldと同じ表示と読み上げの関連付けです。JavaScriptなしでは標準datalistを使います。候補内の値だけを選ばせる場合はSelectを使ってください。",
  },
  {
    id: "date-picker",
    name: "DatePicker",
    description: "単日・期間をひとつの欄で選ぶ",
    render: () => (
      <DatePicker
        id="sample-period"
        label="集計期間"
        mode="range"
        startName="period_start"
        endName="period_end"
        start="2026-09-01"
        end="2026-09-30"
        required
      />
    ),
    usage:
      "DatePickerControllerをdate-pickerとして登録します。modeはsingle・range・flexible。singleはname、rangeはstartName・endName、flexibleはそれらにkindNameと初期selectionを指定します。カレンダー上部で日付を編集し、その場で反映します。flexibleでは下部の「終了日」スイッチで終了日欄を追加します。Shift＋クリックでも終了日が有効になり、クリックした日までの期間になります。矢印キーで日付、PageUp・PageDownで月を移動します。直接入力はYYYY/MM/DD、期間は2つの日付を「–」で区切ります。表示文字列は送らず、指定した名前へYYYY-MM-DDを送信します。未入力・単日の終了日は空文字です。開始日・終了日が独立した任意項目ならsingleを2つ使います。minFrom・maxFromに相手のIDを渡すと、上限・下限を連動できます。offsetDaysで翌日以降・前日以前にもできます。JavaScriptなしでは標準日付入力を使い、制約は保存先でも検証してください。",
  },
  {
    id: "tag",
    name: "Tag",
    description: "分類や選択した条件を短く示す",
    render: () => (
      <div class="ply-cluster">
        <Tag label="暮らし" />
        <Tag label="仕事場の記事" href="/search?q=仕事場" />
      </div>
    ),
    usage:
      "分類を表す部品です。集合にはTagGroupを使い、横6px・縦4pxで折り返します。状態の表示はBadgeを使います。タグのリンクはhover時に下線を追加せず背景色で示します。TagGroupを使う場合はtag-group.cssも読み込んでください。",
  },
  {
    id: "statistic",
    name: "Statistic",
    description: "集計値と単位をひとまとまりにする",
    render: () => (
      <div class="ply-cluster">
        <Statistic label="8月の売上" value="¥128,400" note="税込" />
        <Statistic label="注文" value="54" unit="件" />
      </div>
    ),
    usage: "集計条件と単位を添えます。数値の算出や増減の意味は利用側で決定します。",
  },
  {
    id: "card",
    name: "Card",
    description: "関連する内容と操作を一つにまとめる",
    render: () => (
      <Card title="仕事場の案内を更新する" href="/example" footer="更新：9月10日">
        <p>利用条件と写真を見直します。</p>
      </Card>
    ),
    usage:
      "見出しリンクと内部操作を区別します。カード全体をクリック対象にして入れ子の操作を壊しません。",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "出来事を時系列で読む",
    render: () => (
      <Timeline
        label="変更履歴"
        items={[
          {
            datetime: "2026-09-10T10:00:00+09:00",
            time: "9月10日 10:00",
            title: "田中さんが本文を更新",
            content: <p>利用時間を追記しました。</p>,
          },
          { datetime: "2026-09-09T15:00:00+09:00", time: "9月9日 15:00", title: "記事を作成" },
        ]}
      />
    ),
    usage: "順序は渡されたitemsの順です。時刻に機械可読のdatetimeを付けます。",
  },
  {
    id: "task-list",
    name: "TaskList",
    description: "完了操作と担当・期日を並べる",
    render: () => (
      <TaskList
        label="公開前の確認"
        items={[
          { name: "proof", label: "本文を校正する", detail: "田中 · 9月12日" },
          { name: "photo", label: "写真を選ぶ", checked: true, detail: "佐藤 · 完了" },
          { name: "approval", label: "管理者の確認", disabled: true },
        ]}
      />
    ),
    usage:
      "標準checkboxとして操作できます。完了の保存はフォーム送信または利用側controllerで行います。",
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "日付と予定を月単位で見渡す",
    render: () => (
      <Calendar
        label="2026年9月・第2週"
        weeks={[
          [7, 8, 9, 10, 11, 12, 13].map((day) => ({
            day,
            date: `2026-09-${day.toString().padStart(2, "0")}`,
            current: day === 10,
            events: day === 10 ? [{ label: "編集会議", href: "/reservation" }] : [],
          })),
        ]}
      />
    ),
    usage:
      "月曜始まり・1週7セル。月の計算、祝日、予定の取得は利用側で行います。狭幅は領域内でスクロールします。",
  },
  {
    id: "board",
    name: "Board",
    description: "仕事を状態ごとの列で見る",
    render: () => (
      <Board
        label="制作の進行"
        columns={[
          { title: "これから", count: 1, content: <p>案内ページを書く</p> },
          { title: "作業中", count: 1, content: <p>写真を選ぶ</p> },
          { title: "完了", count: 0, content: <p>完了した仕事はありません。</p> },
        ]}
      />
    ),
    usage:
      "columnsのitemsへid・label・任意のcontentを渡し、movableでBoardControllerを接続します。持ち手をドラッグして列間移動と並べ替えができ、Space・矢印・Enterでも操作できます。Escape・外へのドロップで取り消します。board:beforemoveはキャンセル可能、board:moveはid・移動元/先の列IDと順番を通知します。disabledの項目と列へは移動できません。保存処理は利用アプリで接続します。",
  },
  {
    id: "error-summary",
    name: "ErrorSummary",
    description: "送信時の問題と修正先をまとめる",
    render: () => (
      <div class="ply-stack">
        <ErrorSummary
          errors={[{ label: "記事名を入力してください", href: "#sample-error-title" }]}
        />
        <label class="ply-field" for="sample-error-title">
          記事名
          <input
            id="sample-error-title"
            class="ply-input"
            aria-invalid="true"
            data-invalid="true"
          />
        </label>
      </div>
    ),
    usage:
      "送信に失敗した時だけ表示します。表示後のフォーカス移動は利用側が行い、各入力にもエラーを関連付けます。",
  },
  {
    id: "loading",
    name: "Loading",
    description: "待っている処理を言葉で示す",
    render: () => <Loading label="ファイル一覧を読み込み中…" />,
    usage:
      "処理中だけ配置します。完了後は結果に置換し、割合が分からない処理に架空の進捗を付けません。",
  },
  {
    id: "toast",
    name: "Toast",
    description: "操作結果を閉じるまで読める形で示す",
    render: () => (
      <div>
        <button type="button" class="ply-button" popovertarget="sample-toast">
          結果表示を試す
        </button>
        <Toast id="sample-toast">表示を更新しました。</Toast>
      </div>
    ),
    usage:
      "HTML Popover APIを使います。自動消去しません。重要なエラーは入力付近やErrorSummaryに残します。",
  },
  {
    id: "popover",
    name: "Popover",
    description: "補足や小さな操作を必要な時に開く",
    render: () => (
      <Popover id="sample-popover" label="共有範囲">
        <p>この案件に参加しているメンバーが閲覧できます。</p>
        <a href="/examples/settings">設定を開く</a>
      </Popover>
    ),
    usage:
      "標準Popover APIによる非モーダル表示です。ボタンとパネルを明示的なCSSアンカーで結びます。PopoverControllerをpopoverとして登録すると、CSS未対応・位置合わせ失敗時の補正を行います。alignで始端/末端、sizeでcompact/default/wideを選べます。title・description・actions・iconOnly・disabledにも対応します。外側クリックとEscapeで閉じ、背景の通常操作は妨げません。必須確認はDialogを使います。",
  },
  {
    id: "code-block",
    name: "CodeBlock",
    description: "設定や短いコードを改行を保って読む",
    render: () => (
      <CodeBlock
        label="CSSの読み込み"
        code={'<link rel="stylesheet" href="/ply/components/button.css">'}
      />
    ),
    usage:
      "codeとlabelを渡します。tokensに改行を含むcontentとcolorの配列を渡すと色分けできます。例ではサーバー側のShikiを使いますが、ライブラリに整形器やハイライターの依存はありません。tokensの全文がcodeと異なるときは元のcodeを表示します。HTMLも必ず文字としてエスケープします。copyを付ける場合はClipboardControllerをclipboard、CodeBlockControllerをcode-blockとして登録してください。表示した全文をコピーし、成功・失敗を伝えます。長い行と長いコードはコード領域内でスクロールでき、JavaScriptがない場合も読めます。",
  },
  {
    id: "keycap",
    name: "Keycap",
    description: "キーボード操作の表記を揃える",
    render: () => (
      <p>
        <Keycap keys={["⌘ / Ctrl", "S"]} /> で保存。
        <Keycap keys={["Esc"]} /> で編集に戻ります。
      </p>
    ),
    usage: "表記のみの部品です。ショートカット自体は利用側で接続します。",
  },
  {
    id: "divider",
    name: "Divider",
    description: "意味のある区切りと見出しを置く",
    render: () => (
      <div class="ply-stack">
        <p>現在の設定</p>
        <Divider label="補足" />
        <p>必要な場合だけ変更してください。</p>
        <Divider />
      </div>
    ),
    usage: "単なる余白調整には親のgapを使います。内容の区切りがある時だけ配置します。",
  },
];
