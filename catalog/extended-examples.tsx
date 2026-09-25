import {
  Button,
  ActionLink,
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
  Tooltip,
  EditableProperty,
  Composer,
  Picker,
  TagInput,
  Tree,
  TableOfContents,
  ChartFrame,
  HoverCard,
  ToggleGroup,
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
      "itemsにlabel・href・current・任意のcountを渡し、共通のActionLinkとして描画します。CSSはbutton.cssとfilter-bar.cssを併用します。currentから選択中の表示とaria-currentを生成し、countは0件も表示します。条件を含むURLと選択状態はサーバーが指定します。通常のリンクなのでJavaScriptなしで移動でき、controllerの登録は不要です。appearanceをsegmentedにすると、表示形式などの切り替えをつながった一組として並べます。childrenでリンクを直接構築する使い方も維持しています。",
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
      "実行する操作をまとめる配置コンポーネントです。FilterBarは現在の絞り込み条件を示すnav、Toolbarは送信・リセット・移動をまとめるrole=toolbarです。両方の操作は同じピル形を使います。Button・ActionLinkなどの操作にdata-toolbar-target=controlを付けると、全体が一つのTab停止点になり、左右矢印とHome/Endで操作を移動できます。フォームの送信・リセットはButtonのtypeで指定します。狭い配置では項目が折り返します。",
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
      "prefix・suffixで接頭辞や単位、actionで操作の文言とButtonの属性を渡します。入力欄・操作ボタン・読み上げの関連付けはInputGroupが生成します。通常は2rem、size=largeは2.5remで入力とボタンを揃えます。単位はラベルにも含め、値には混ぜません。type=numberはNumberFieldControllerをnumber-fieldとして一度登録すると、PageUp・PageDownと境界状態に対応します。検索例は実際に記事の検索結果へ移動します。",
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
      "分類を表す小さなコンポーネントです。集合にはTagGroupを使い、横0.5em・縦0.125remの余白で折り返します。状態の表示はBadgeを使います。リンクはhover時に枠色で操作可能なことを示します。TagGroupを使う場合はtag-group.cssも読み込んでください。",
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
    description: "月・週・年を行き来し、日付と予定を探す",
    render: () => (
      <Calendar
        label="2026年9月・第4週"
        view="week"
        previous={{ label: "前週", href: "/examples/schedule?view=week&week=2" }}
        today={{ label: "今日", href: "/examples/schedule?view=week&week=3" }}
        next={{ label: "翌週", href: "/examples/schedule?view=week&week=4" }}
        views={[
          { label: "月", href: "/examples/schedule" },
          { label: "週", href: "/examples/schedule?view=week&week=3", current: true },
          { label: "年", href: "/examples/schedule?view=year" },
          { label: "一覧", href: "/examples/schedule?view=agenda" },
        ]}
        actions={<ActionLink href="/reservation">予定を追加</ActionLink>}
        selection={{ mode: "single", value: "2026-09-24" }}
        weeks={[
          [21, 22, 23, 24, 25, 26, 27].map((day) => ({
            day,
            date: `2026-09-${day.toString().padStart(2, "0")}`,
            current: day === 24,
            events: day === 25 ? [{ label: "案内公開の確認", href: "/examples/project" }] : [],
          })),
        ]}
      />
    ),
    usage:
      "月・週・年と日付順の一覧、前後期間と今日への移動に対応します。予定はlabel・hrefと任意のstart・end（HH:MM）・accentを持ち、startがなければ終日、endがなければ開始から1時間です。月は各日に一行ずつ、週は時刻の軸を持つ時間割で表示し、時間の重なる予定は横に並べます。週は0〜24時の時間割を画面に収まる高さ（--ply-calendar-scroll-size）でスクロールし、見出しと終日の行を固定します。先頭の一行の日数で列数が決まり、1日なら日、5日なら稼働日の表示です。hoursは稼働時間で、外側を淡く塗ります。nowを渡すと今日の列に現在時刻の線を引き、開いた時にその時刻を表示します（今日を含まない週は稼働時間の始まり）。scroll-initial-targetに対応しないブラウザではCalendarScrollControllerをcalendar-scrollとして登録します。weekStartで月曜・日曜始まりを選び、weeksの各行も同じ曜日から並べます。weekNumbersで月の各行と週の見出しにISO週番号を表示します。年表示は月への入口、一覧は日付ごとに月・週と同じ予定の行を並べます。selectionを渡すと既存CalendarControllerで単一日・範囲を選択し、calendar:changeを受け取れます。月の計算と予定の取得は利用側で行います。",
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
      "短い取得はinline、領域全体の待機はregion、送信操作はButtonのbusyを使います。作業量が未確定の継続処理にはvalueなしのProgressを使い、架空の進捗を付けません。完了後は結果に置換します。",
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
        <button type="button" class="ply-button" popovertarget="sample-toast-timed">
          時間で閉じる通知
        </button>
        <Toast id="sample-toast-timed" duration={5000}>
          操作が完了しました。
        </Toast>
      </div>
    ),
    usage:
      "ToastControllerをtoastとして登録します。初期値は保持し、durationを指定すると時間で閉じます。重要なエラーは入力付近やErrorSummaryに残します。",
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
    id: "tooltip",
    name: "Tooltip",
    description: "操作に添える短い補足を、hoverとfocusで示す",
    render: () => (
      <Tooltip
        id="sample-tooltip"
        text="公開後も共有範囲を変更できます。"
        trigger={(attributes) => (
          <Button {...attributes} type="button">
            共有範囲
          </Button>
        )}
      />
    ),
    usage:
      "triggerが受け取る属性をButtonやActionLinkへ渡します。TooltipControllerをtooltipとして登録するとhover・focusで表示し、Escapeで閉じます。textは短い非対話的な補足に限ります。操作や必須の説明にはPopoverまたは画面上の文を使います。idは画面内で一意にします。",
  },
  {
    id: "editable-property",
    name: "EditableProperty",
    description: "値をその場所で編集し、確定と取消を揃える",
    render: () => (
      <EditableProperty id="sample-property" label="担当者" name="assignee" value="田中 遥" />
    ),
    usage:
      "EditableControllerをeditable、EditablePropertyControllerをeditable-propertyとして登録します。確定時のeditable:commitで保存処理を行い、必要ならeditable:beforecommitを取り消します。JavaScriptなしでは通常の入力欄として表示されます。",
  },
  {
    id: "composer",
    name: "Composer",
    description: "本文・添付・送信操作を一つの入力面にまとめる",
    render: () => (
      <Composer
        id="sample-composer"
        label="メッセージ"
        name="body"
        action="/examples/contact"
        method="get"
        placeholder="メッセージを書く"
        submitLabel="送信する"
        required
      />
    ),
    usage:
      "標準form・Textarea・Buttonを使います。actionとmethodを利用側で指定し、attachmentsへFileInputや選択済みファイルを渡せます。busyは送信ボタンの重複操作を止め、errorは本文に関連付けます。送信・下書き保存は利用側が実装します。",
  },
  {
    id: "picker",
    name: "Picker",
    description: "検索して候補から値を選ぶ",
    render: () => (
      <Picker
        id="sample-picker"
        label="担当者"
        name="assignee"
        options={[
          { value: "tanaka", label: "田中 遥" },
          { value: "sato", label: "佐藤 健" },
          { value: "suzuki", label: "鈴木 美咲" },
        ]}
        value="tanaka"
      />
    ),
    usage:
      "ComboboxControllerをcombobox、PickerControllerをpickerとして登録します。検索欄は送信せず、選択値を標準selectが送信します。multipleの選択表示と解除操作はTagのテンプレートを使います。JavaScriptなしでは標準selectを使えます。候補はoptionsへ渡し、非同期取得後はPickerController.replaceOptions()で更新できます。取得処理は利用側が担当します。tag.cssも読み込んでください。",
  },
  {
    id: "tag-input",
    name: "TagInput",
    description: "自由入力したタグを追加・解除する",
    render: () => (
      <TagInput
        id="sample-tag-input"
        label="キーワード"
        name="keywords"
        values={["案内", "公開"]}
        help="入力後にEnterで追加します。"
      />
    ),
    usage:
      "TagInputControllerをtag-input、TagFieldControllerをtag-fieldとして登録します。選択表示と解除操作はTagのテンプレートを使います。Enterで追加、Backspaceと矢印キーでタグを移動・解除できます。送信値はJavaScriptの有無にかかわらずカンマ区切りです。カンマを含むタグは扱いません。tag.cssも読み込んでください。",
  },
  {
    id: "tree",
    name: "Tree",
    description: "中央の作業面で階層を開閉・選択する",
    render: () => (
      <Tree
        label="資料"
        items={[
          { value: "guide", label: "案内", children: [{ value: "start", label: "はじめに" }] },
          { value: "rules", label: "運用規約" },
        ]}
        expanded={["guide"]}
      />
    ),
    usage:
      "TreeControllerをtree、TreePresentationControllerをtree-presentationとして登録します。親項目の開閉、矢印キー・Home・End・文字入力による移動、Enterによる選択を使えます。選択はtree:changeで利用側が受け取り、画面全体の移動にはCommandMenuを使います。空のitemsは状態文を表示し、重複するvalueは全階層を通じて最初の項目だけ残します。",
  },
  {
    id: "table-of-contents",
    name: "TableOfContents",
    description: "長い資料の見出しへ移動し、現在地を示す",
    render: () => (
      <TableOfContents
        label="この資料の目次"
        sections={[
          {
            id: "toc-purpose",
            title: "この資料の目的",
            level: 3,
            content: <p>公開前の確認事項をまとめます。</p>,
          },
          { id: "toc-check", title: "内容の確認", content: <p>本文とリンク先を読み返します。</p> },
          { id: "toc-file", title: "添付ファイル", level: 3, content: <p>最新版か確認します。</p> },
          { id: "toc-scope", title: "共有範囲", level: 3, content: <p>閲覧対象を確認します。</p> },
          { id: "toc-final", title: "最終確認", content: <p>修正後に公開します。</p> },
        ]}
      />
    ),
    usage:
      "長い資料の本文冒頭に置く番号付きの目次です。sectionsで見出しと本文を渡し、level=3で小見出しを一段下げます。最初の項目がlevel=3でも、親見出しのない0.1にはせず見出し2として表示します。通常のページ内リンクとして動き、TableOfContentsControllerをtable-of-contentsとして登録するとスクロール位置に応じて現在地を示します。各idはページ内で一意にします。",
  },
  {
    id: "chart-frame",
    name: "ChartFrame",
    description: "集計の図と数値表を一緒に読む",
    render: () => (
      <ChartFrame
        title="月別売上"
        description="4月から6月まで"
        tableLabel="月別売上の数値"
        graphic={
          <svg viewBox="0 0 300 100" width="300" height="100">
            <rect x="20" y="45" width="55" height="45" fill="var(--ply-link)" />
            <rect x="120" y="30" width="55" height="60" fill="var(--ply-link)" />
            <rect x="220" y="15" width="55" height="75" fill="var(--ply-link)" />
          </svg>
        }
        table={
          <table>
            <thead>
              <tr>
                <th scope="col">月</th>
                <th scope="col">売上</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">4月</th>
                <td>45万円</td>
              </tr>
              <tr>
                <th scope="row">5月</th>
                <td>60万円</td>
              </tr>
              <tr>
                <th scope="row">6月</th>
                <td>75万円</td>
              </tr>
            </tbody>
          </table>
        }
      />
    ),
    usage:
      "graphicには利用側で描いた図、tableには同じ値の表を渡します。図は読み上げ対象から外し、数値表は見出しから開いて確認できます。広い集計図にはsize=wideを指定します。descriptionには図の要点を書きます。描画ライブラリや集計処理は含みません。",
  },
  {
    id: "hover-card",
    name: "HoverCard",
    description: "対象の概要と関連操作を近くに表示する",
    render: () => (
      <HoverCard id="sample-hover-card" label="案件の概要">
        <p>担当者と確認日をまとめて見られます。</p>
      </HoverCard>
    ),
    usage:
      "HoverCardControllerをhover-cardとして登録します。hover・focusでプレビューを開き、Escapeや見出し横の閉じる操作で戻します。本文構造はPopover・Dialogと共通です。関連操作がある場合だけactionsを渡します。hrefを指定すると移動リンクと明示的なプレビューボタンを並べます。短い非対話的な補足にはTooltipを使います。",
  },
  {
    id: "toggle-group",
    name: "ToggleGroup",
    description: "関連する状態を一つまたは複数切り替える",
    render: () => (
      <ToggleGroup
        label="表示密度"
        items={[
          { value: "comfortable", label: "標準" },
          { value: "compact", label: "コンパクト" },
        ]}
        selected={["comfortable"]}
      />
    ),
    usage:
      "ToggleGroupControllerをtoggle-groupとして登録します。単一・複数選択と矢印キー移動に対応し、変更はtoggle-group:changeで利用側へ渡します。URLで一覧を切り替える用途にはFilterBarを使います。",
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
      "codeとlabelを渡します。tokensに改行を含むcontentとcolorの配列を渡すと色分けできます。例ではサーバー側のShikiを使いますが、ライブラリに整形器やハイライターの依存はありません。tokensの全文がcodeと異なるときは元のcodeを表示します。HTMLも必ず文字としてエスケープします。copyを付ける場合はClipboardControllerをclipboard、CodeBlockControllerをcode-block、ToastControllerをtoastとして登録してください。表示した全文をコピーし、成功・失敗を伝えます。長い行と長いコードはコード領域内でスクロールでき、JavaScriptがない場合も読めます。",
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
    usage: "表記のみのコンポーネントです。ショートカット自体は利用側で接続します。",
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
