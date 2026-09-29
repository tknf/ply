import {
  EmojiPicker,
  Countdown,
  ProfileHeader,
  SearchResults,
  Reactions,
  Prompt,
  OptionalFields,
  InlineSelect,
  Dial,
  DateTimeRange,
  SplitButton,
  CopyField,
  TextEditor,
  ActionDock,
  BackLink,
  SettingList,
  FilterMenu,
  ActionTile,
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
  LayerCard,
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
          { label: "すべて", href: "/apps/search", count: 6, current: true },
          { label: "公開中", href: "/apps/search?state=公開中", count: 3 },
          { label: "下書き", href: "/apps/search?state=下書き", count: 3 },
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
    usage:
      "画像なしは指定した略称を表示。名前を色だけで識別しません。複数の人はAvatarGroupで囲むと、円を少しずつ重ねて並べます（avatar-group.cssも読み込んでください）。labelで誰と誰かを読み上げます。",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "階層をたどって上位へ戻る",
    render: () => (
      <Breadcrumb
        items={[
          { label: "道具箱", href: "/" },
          { label: "記事", href: "/apps/search" },
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
          { label: "すべての記事", href: "/apps/search", current: true, count: 6 },
          { label: "下書き", href: "/apps/search?state=draft", count: 2 },
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
          { label: "日時", state: "complete", href: "/apps/schedule" },
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
      "prefix・suffixで接頭辞や単位、actionで操作の文言とButtonの属性を渡します。入力欄・操作ボタン・読み上げの関連付けはInputGroupが生成します。通常は2rem、size=largeは2.5remで入力とボタンを揃えます。単位はラベルにも含め、値には混ぜません。type=numberはNumberFieldControllerをnumber-fieldとして一度登録すると、PageUp・PageDownと境界状態に対応します。検索の例は、利用例のアプリの検索の画面へ移動します。",
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
        <Tag label="仕事場の記事" href="/apps/search?q=仕事場" />
      </div>
    ),
    usage:
      "分類を表す小さなコンポーネントです。集合にはTagGroupを使い、横0.5em・縦0.125remの余白で折り返します。状態の表示はBadgeを使います。縁は文字と同じ色、文字はMediumです。リンクはhover時に役割の色を淡く敷いて操作可能なことを示します。TagGroupを使う場合はtag-group.cssも読み込んでください。",
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
      <Card title="仕事場の案内を更新する" href="/apps/docs" footer="更新：9月10日">
        <p>利用条件と写真を見直します。</p>
      </Card>
    ),
    usage:
      "見出しリンクと内部操作を区別します。カード全体をクリック対象にして入れ子の操作を壊しません。",
  },
  {
    id: "action-tile",
    name: "ActionTile",
    description: "塗りつぶしの印と名前を縦に積み、格子に並べる入口や操作",
    render: () => <ActionTile href="/" label="カタログ" icon="grid" accent="green" />,
    usage:
      "labelとiconは必須で、印は塗りつぶしで上、名前は下に置きます。accentはblue（既定）・green・amber・coralで、印の色と指を載せた時の淡い地の色が変わります。hrefを渡すと移動のリンク（currentで現在地）、渡さなければtype=buttonのボタンになり、onclickやdata属性で操作を結び付けます。disabledはリンクなら移動しない印、ボタンなら押せない状態にし、どちらも半透明にします。shortcutはKeycapの小さい形で印の終わりの側の上に添え（キーの登録は利用側）、badgeはBadgeの小さい形で印の上に重ねます。ActionDockと同じ密度の、普段は影のない平らな淡い面で、指を載せると印の色を淡く敷き、押すと内側へへこみます。タイルは升いっぱいに広がるので、並べ方と列数は置く側の格子が決めます。名前は文節の切れ目で折り返します。CommandMenuの上段の入口と、TableのselectionActionsの一括操作に使います。文字の指定はaction-tile.cssが持ち、共通Buttonとは別の専用の操作として文字位置の検査に登録しています。",
  },
  {
    id: "layer-card",
    name: "LayerCard",
    description: "見出しを淡い青の層に置き、中身を白い紙に載せる",
    render: () => (
      <LayerCard title="今週の予約">
        <p>秋の読書会 · 9月25日 18:00</p>
      </LayerCard>
    ),
    usage:
      "titleは淡い青の沈んだ層に墨の太字で置き、childrenは層の上に載せた白い紙に入れます。actionsには白いピルのActionLinkやButtonを渡し、見出しの行の終わりの側に置きます。題名が折り返しても操作は一行目に残り（題名の幅が8remを割る時だけ次の行へ送ります）、操作の有無で紙の位置は変わりません。紙の端に接するDataList・ActionListは、始まりと終わりの罫線を紙の端に任せます。題名が中身と同じ面で競うと冗長に見える、一覧や属性のまとまりに使います。一件の物として扱う内容はCard、作業面の中の区切りはSectionを使います。",
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
    usage:
      "順序は渡されたitemsの順です。時刻に機械可読のdatetimeを付けます。出来事は塗りつぶしの青い印で示し、avatarを渡すと印の代わりに起こした人の円を線の上に置きます。節目（milestones）の今の時は、Calendarの今日と同じ蛍光ペンで塗ります。",
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
      "標準checkboxとして操作できます。完了の保存はフォーム送信または利用側controllerで行います。headingを渡すと、開閉できる外側の見出しに、終えた割合だけ塗る円と「終えた数/全体」を添えます（TaskListControllerをtask-listとして登録すると、チェックに合わせて数え直し、全て終えると円にチェックを置きます）。終えた題名は、書き始めの側からペンで引く線で消します。titleは一覧の始まりに置く名前、addは最後の行に置く書き足す欄で、追加は利用側のフォームで扱います。",
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "月・週・年を行き来し、日付と予定を探す",
    render: () => (
      <Calendar
        label="2026年9月・第4週"
        view="week"
        previous={{ label: "前週", href: "/apps/schedule?view=week&week=2" }}
        today={{ label: "今日", href: "/apps/schedule?view=week&week=3" }}
        next={{ label: "翌週", href: "/apps/schedule?view=week&week=4" }}
        views={[
          { label: "月", href: "/apps/schedule" },
          { label: "週", href: "/apps/schedule?view=week&week=3", current: true },
          { label: "年", href: "/apps/schedule?view=year" },
          { label: "一覧", href: "/apps/schedule?view=agenda" },
        ]}
        actions={<ActionLink href="/apps/schedule">予定を追加</ActionLink>}
        selection={{ mode: "single", value: "2026-09-24" }}
        weeks={[
          [21, 22, 23, 24, 25, 26, 27].map((day) => ({
            day,
            date: `2026-09-${day.toString().padStart(2, "0")}`,
            current: day === 24,
            events: day === 25 ? [{ label: "案内公開の確認", href: "/apps/project" }] : [],
          })),
        ]}
      />
    ),
    usage:
      "月・週・年と日付順の一覧、前後期間と今日への移動に対応します。予定はlabel・hrefと任意のstart・end（HH:MM）・accentを持ち、startがなければ終日、endがなければ開始から1時間です。月は各日に一行ずつ、週は時刻の軸を持つ時間割で表示し、時間の重なる予定は横に並べます。週は0〜24時の時間割を画面に収まる高さ（--ply-calendar-scroll-size）でスクロールし、見出しと終日の行を固定します。先頭の一行の日数で列数が決まり、1日なら日、5日なら稼働日の表示です。hoursは稼働時間で、外側を淡く塗ります。nowを渡すと今日の列に現在時刻の線を引き、開いた時にその時刻を表示します（今日を含まない週は稼働時間の始まり）。scroll-initial-targetに対応しないブラウザではCalendarScrollControllerをcalendar-scrollとして登録します。weekStartで月曜・日曜始まりを選び、weeksの各行も同じ曜日から並べます。weekNumbersで月の各行と週の見出しにISO週番号を表示します。年表示は月への入口、一覧は日付ごとに月・週と同じ予定の行を並べます。見た目はHEYのカレンダーに寄せ、外枠を持たずに日の間の淡い線で区切り、今週を墨の角丸の枠で囲み、今日の日付を蛍光ペンの楕円で塗り、月の初日に月の旗を立てます。予定は分類の色で淡く塗った札、仮の予定は破線の縁、現在時刻は破線です。selectionを渡すと既存CalendarControllerで単一日・範囲を選択し、calendar:changeを受け取れます。月の計算と予定の取得は利用側で行います。予定にdetails（idと中身）を渡すと、札は押して詳細の紙を開く操作になり、Popoverと同じ紙に題名・時刻・中身・hrefへの「詳しく見る」を置きます（PopoverControllerをpopoverとして登録します）。",
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
      "columnsのitemsへid・label・任意のcontentを渡し、movableでBoardControllerを接続します。持ち手をドラッグして列間移動と並べ替えができ、Space・矢印・Enterでも操作できます。Escape・外へのドロップで取り消します。board:beforemoveはキャンセル可能、board:moveはid・移動元/先の列IDと順番を通知します。disabledの項目と列へは移動できません。保存処理は利用アプリで接続します。項目は列の色で斜めに淡く染まり、codeを渡すと番号などの札を紙の上の始まりの角に列の色の淡い面で置きます。collapsedの列は件数の丸と縦書きの名前を載せた紙の束になり、collapsibleを渡すと束の「開く」と見出しの「たたむ」で開閉できます。開閉はBoardControllerが表示だけ切り替え、取り消せるboard:toggle（列IDとcollapsed）で知らせるので、保存は利用アプリで行います。",
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
      "送信に失敗した時だけ表示します。表示後のフォーカス移動は利用側が行い、各入力にもエラーを関連付けます。見た目はNoticeの危険の役割（白い紙と、縁をまたぐ印と見出しのピル）で、ErrorSummaryは直す欄への一覧だけを持ちます。",
  },
  {
    id: "loading",
    name: "Loading",
    description: "待っている処理を言葉で示す",
    render: () => <Loading label="ファイル一覧を読み込み中…" />,
    usage:
      "既定の印は青から紫の三つの点で、書き始めの側から順に小さく跳ねます（跳ねていない点は淡くなるだけで消えません）（variantのorbitで回る丸、haloで広がる輪）。短い取得はinline、領域全体の待機はregion（面を敷かず、大きめの印と文を中央に縦に並べます）、送信操作はButtonのbusyを使います。作業量が未確定の継続処理にはvalueなしのProgressを使い、架空の進捗を付けません。完了後は結果に置換します。",
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
        <Toast id="sample-toast" tone="success">
          表示を更新しました。
        </Toast>
        <button type="button" class="ply-button" popovertarget="sample-toast-timed">
          時間で閉じる通知
        </button>
        <Toast id="sample-toast-timed" duration={5000}>
          操作が完了しました。
        </Toast>
        <button type="button" class="ply-button" popovertarget="sample-toast-danger">
          失敗の知らせ
        </button>
        <Toast id="sample-toast-danger" tone="danger" live="assertive">
          保存できませんでした。
        </Toast>
      </div>
    ),
    usage:
      "ToastControllerをtoastとして登録します。toneで知らせの種類（info・success・warning・danger、初期値はinfo）を選び、面をその色で塗ります。初期値は保持し、durationを指定すると時間で閉じます。失敗はlive=assertiveにし、重要なエラーは入力付近やErrorSummaryにも残します。単独のToastは右下（書き終わりの側の下）に出ます。複数のToastはToastStackで囲み、ToastStackControllerをtoast-stackとして登録すると、新しいものを手前に束ねます。束を押すと上へ広がり、外を押すかEscで畳みます。キーボードで束の中へ入った時も広がります。placementで置き場所（end・center・start、既定はend）を選べます。ToastStackを使う場合はtoast-stack.cssも読み込んでください。",
  },
  {
    id: "popover",
    name: "Popover",
    description: "補足や小さな操作を必要な時に開く",
    render: () => (
      <Popover id="sample-popover" label="共有範囲">
        <p>この案件に参加しているメンバーが閲覧できます。</p>
        <a href="/apps/settings">設定を開く</a>
      </Popover>
    ),
    usage:
      "標準Popover APIによる非モーダル表示です。ボタンとパネルを明示的なCSSアンカーで結びます。PopoverControllerをpopoverとして登録すると、CSS未対応・位置合わせ失敗時の補正を行います。alignで始端/末端、sizeでcompact/default/wideを選べます。title・description・actions・iconOnly・disabledにも対応します。iconOnlyの開く操作にはtooltipで名前を出せ、titleHiddenで見出しを読み上げだけに残せ、initialFocusをcontentにすると開いた時に見出しではなく中身のautofocusへ移ります。外側クリックとEscapeで閉じ、背景の通常操作は妨げません。必須確認はDialogを使います。",
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
      "EditableControllerをeditable、EditablePropertyControllerをeditable-propertyとして登録します。確定時のeditable:commitで保存処理を行い、必要ならeditable:beforecommitを取り消します。表示の値は下線も枠もない文字にし、値と鉛筆を包む箱に指を載せると淡い面を出します。鉛筆でも値そのものを押しても書き始め、一行の値は全体を選びます。書いている間は同じ位置の欄を淡い地の面にし、青い縁と淡い青の輪を出します。確定（小さい主操作）と取消（文字だけの操作）は一行・複数行とも欄の下に並べます。表示と編集で文字の大きさ・一行目の高さ・書き始めは変わりません。JavaScriptなしでは通常の入力欄として表示されます。",
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
        action="/apps/people"
        method="get"
        placeholder="メッセージを書く"
        submitLabel="送信する"
        required
      />
    ),
    usage:
      "標準form・Textarea・Buttonを使います。actionとmethodを利用側で指定し、attachmentsへFileInputや選択済みファイルを渡せます。busyは送信ボタンの重複操作を止め、errorは本文に関連付けます。送信・下書き保存は利用側が実装します。本文は書いた分だけ伸びます（field-sizingに対応するブラウザ）。toへ宛先、statusへ下書きの保存などの状態を渡すと、題名の行に並べます。editorへリッチテキストの編集部品（ProseMirror・Tiptap・Lexxyなど）やcontenteditableを渡すと、本文の欄と差し替えます。中の書く場所がどの深さにあっても、本文と同じ文字と行の高さ、紙全体の輪をかけ、段落や箇条の間を一定の間隔にそろえます。送信する値の受け渡しは編集部品の側で行います。",
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
  {
    id: "filter-menu",
    name: "FilterMenu",
    description: "候補を打って絞り込みながら選ぶ、青の面の小さな紙",
    render: () => (
      <FilterMenu
        id="sample-filter-menu"
        label="ラベル"
        title="ラベルを選ぶ"
        multiple
        createLabel="新しく作る"
        options={[
          { value: "guide", label: "案内", selected: true },
          { value: "invoice", label: "請求" },
        ]}
      />
    ),
    usage:
      "HEYのラベル付けやFizzyの担当のように、候補を打って絞り込みながら選びます。見た目はDropdownMenuと同じ青の面で、中に文字の欄を持つため、メニューではなくコンボボックス（絞り込みの欄）とリストボックス（候補）の組み合わせにしています。FilterMenuControllerをfilter-menuとして登録します。開くと絞り込みの欄へ移り、打った文字で候補を絞り、上下の矢印で移ってEnterで選びます。multipleなら開いたまま選んだ印を切り替え、そうでなければ選ぶと閉じます。選ぶたびにfilter-menu:select（valueとselected）を出し、nameを渡すと選んだ値を隠し入力で送ります。createLabelを渡すと絞り込みの欄の隣に作る操作を置き、押すとfilter-menu:create（打った文字）を出します。候補にはicon・shortcut・disabledを添えられます。",
  },
  {
    id: "setting-list",
    name: "SettingList",
    description: "名前と行の終わりの操作を点線でつなぐ設定の行",
    render: () => (
      <SettingList
        label="ボードを見られる人"
        items={[{ label: "全員", control: <Switch label="全員に見せる" checked /> }]}
      />
    ),
    usage:
      "Fizzyの設定と同じく、名前（太字）と淡い補足を始まりの側に、Switch・チェック・役割の丸などの操作を終わりの側に置き、その間を淡い点線でつなぎます。点線は余った幅いっぱいに引き、狭くても1.5remは残します。行の間に罫線は引きません。leadingに人の円や印を渡すと名前の前に置きます。公開範囲・通知・人の役割のような、名前ごとに一つの操作が付く設定に使います。",
  },
  {
    id: "back-link",
    name: "BackLink",
    description: "一つ上の場所へ戻るだけのピル",
    render: () => <BackLink href="/" label="Imbox" />,
    usage:
      'HEYの「‹ Imbox」と同じく、淡い青の面に左向きの印と太字の名前を置いたピルで、一つ上の場所へ戻ります。tone="plain"は面を持たない太字の文字で、Fizzyの「Back to Playground ESC」のようにshortcutでキーの印を添えられます（キーの登録は利用側）。階層を並べて見せる時はBreadcrumbを使います。右から左に読む時は印の向きを変えます。',
  },
  {
    id: "action-dock",
    name: "ActionDock",
    description: "下に浮かぶ、印・名前・キーの印を並べた操作の棚",
    render: () => (
      <ActionDock
        label="このスレッドの操作"
        items={[
          { label: "今すぐ返信", icon: "reply", shortcut: "R" },
          { label: "あとで返信", icon: "clock", shortcut: "L" },
        ]}
      />
    ),
    usage:
      "HEYのスレッドの下の棚と同じく、白い紙を下の中央に浮かべ、ActionTileを横に並べます。棚の中のタイルは浮き上がりを消して平らにし、指を載せた時だけ淡い面を出します。itemsはActionTileと同じ指定で、hrefでリンク、無ければボタンになります。shortcutでキーの印（登録は利用側）、badgeで「下書き」のような状態の札を印の上に重ねます。placementはsticky（置いた場所の下端に留める、既定）とfixed（画面の下に浮かべる）です。狭い場所では横にスクロールします。",
  },
  {
    id: "text-editor",
    name: "TextEditor",
    description: "書式の道具を並べた書く面",
    render: () => (
      <TextEditor
        id="sample-text-editor"
        label="コメント"
        name="comment"
        placeholder="コメントを書く…"
      />
    ),
    usage:
      'HEYの返信や日記、Fizzyのコメントと同じく、書式の道具（太字・斜体・取り消し線・リンク・見出し・引用・コード・箇条書き・番号・添付・元に戻す・やり直す）を並べた書く面です。見た目と道具の並びだけを持ち、特定のエディターには依存しません。editorに任意のリッチテキストのエディターが描く書く面（contenteditableの要素）を渡し、道具のボタンのdata-text-editor-tool（bold・italic・link・bulletsなど）を読んでエディターの操作を呼びます。今の書式の道具にはdata-active="true"を付けると淡い青の面を出します。editorを渡さなければtextareaを置き、その時の道具は見た目だけで働きません。toolsで道具を選び、"|"で区切りを入れます。placementはtop（Fizzyのコメント、既定）とbottom（HEYの返信・日記）で、actionsに送る操作を並べます。Composerのeditorにも入れられます。',
  },
  {
    id: "copy-field",
    name: "CopyField",
    description: "写して使う値の欄と、写す丸い印",
    render: () => (
      <CopyField
        id="sample-copy-field"
        label="公開リンク"
        value="https://example.com/public/boards/6Kq2"
      />
    ),
    usage:
      "公開リンクや招待リンクのような、写して使う値の欄です。読み取り専用の欄の終わりに写す操作の丸い印を置き、写すとペンで描くチェックに変わって、しばらくして元に戻ります。写す動きはClipboardController（clipboard）、結果の表示と読み上げはCopyFieldController（copy-field）が持つので、両方を登録します。クリップボードを使えないブラウザでは写す操作を隠します。欄にフォーカスすると値を全て選ぶので、キーボードでも写せます。actionsに作り直す操作などを添えられます。",
  },
  {
    id: "split-button",
    name: "SplitButton",
    description: "主操作と、ほかのやり方を選ぶ▾をつなげたピル",
    render: () => (
      <SplitButton
        id="sample-split"
        label="送る"
        items={[
          { value: "schedule", label: "送る日時を決める" },
          { value: "draft", label: "下書きとして保存" },
        ]}
      />
    ),
    usage:
      "HEYの「Send email ▾」と同じく、主操作と、ほかのやり方を選ぶ▾を一つのピルにつなげます。主操作は共通Button（type・name・valueなどのButtonの指定をそのまま渡します）、▾は共通DropdownMenuのアイコンだけの操作で、itemsはDropdownMenuと同じ指定です。見た目だけを一体にし、向き合う側の角を落として間に細い区切りを入れます（塗りの操作では白、控えめな操作では墨）。variant・size・disabledは両方にかかり、busyは主操作だけにかかります。選んだやり方はdropdown-menu:selectで受け取ります。",
  },
  {
    id: "date-time-range",
    name: "DateTimeRange",
    description: "開始と終了の日時を矢印でつないだ枠",
    render: () => (
      <DateTimeRange
        legend="日時"
        name="event"
        start={{ date: "2026-09-29", time: "09:00" }}
        end={{ date: "2026-09-29", time: "10:00" }}
      />
    ),
    usage:
      "HEYの予定と同じく、開始と終了の日付と時刻を淡い面の一つの枠に並べ、矢印でつなぎます。日付と時刻の欄は共通のDateField・TimeField（date-field・time-fieldのcontroller）です。nameを頭にして`[start_date]`・`[start_time]`・`[end_date]`・`[end_time]`・`[all_day]`で送ります。allDayで終日のSwitchを入れ、終日の間は時刻の欄を隠します。timezoneを渡すと地球の印とタイムゾーンを添えます。狭い場所（26rem未満）では開始と終了を縦に積み、矢印を下に向けます。開始と終了の前後関係の確かめは利用側で行います。",
  },
  {
    id: "dial",
    name: "Dial",
    description: "周りの目盛りから一つを選ぶ、金属のつまみ",
    render: () => (
      <Dial
        legend="自動で閉じるまで"
        name="auto-close"
        unit="日"
        value="30"
        options={[
          { value: "7", label: "7" },
          { value: "30", label: "30" },
          { value: "90", label: "90" },
        ]}
      />
    ),
    usage:
      "Fizzyの自動で閉じる日数と同じく、押す物と同じ陰影の金属のつまみの周りに目盛りの値を並べ、一つを選ぶとつまみの針がその値へ回ります。値は左下から時計回りに右下まで270度の弧に等しく並べ、3〜8個を想定します。実体は一つを選ぶラジオボタンの束なので、送信・矢印キーでの操作・読み上げは標準のまま使えます。選んだ値は青い太字にします。unitでつまみの下に単位を添え、disabledで全体を使えなくします。値が多い時や細かい数を選ぶ時はRangeを使います。",
  },
  {
    id: "inline-select",
    name: "InlineSelect",
    description: "文の中の語を押して選ぶ選択",
    render: () => (
      <p>
        予定の{" "}
        <InlineSelect
          label="知らせる時"
          name="notify"
          value="30"
          options={[
            { value: "10", label: "10分前に" },
            { value: "30", label: "30分前に" },
          ]}
        />{" "}
        知らせる
      </p>
    ),
    usage:
      "HEYの「30分前に知らせる」「All files sent by everyone」のように、文の中の語を押して選びます。実体は標準のselectで、前後の文と同じ大きさ・行高のまま、選べる語を青い太字にして小さな▾を添えます。下線は引かず、指を載せると淡い青のピルの面を出します。幅は選んだ語に合わせます。labelは読み上げの名前で、何を選ぶかを短く書きます。欄を並べずに、設定を一つの文として読ませる時に使います。",
  },
  {
    id: "optional-fields",
    name: "OptionalFields",
    description: "必要な時だけ足す欄と、足せる項目のチップ",
    render: () => (
      <OptionalFields
        label="予定に足す項目"
        items={[
          { id: "sample-place", label: "場所", field: <p>場所の欄</p> },
          { id: "sample-note", label: "メモ", field: <p>メモの欄</p> },
        ]}
      />
    ),
    usage:
      'HEYの予定（リンク・場所・招待・メモ・繰り返し）や検索の条件のように、必要な時だけ欄を足します。足せる項目を細い縁のピルのチップで並べ、押すとその欄が現れてチップは消え、欄の最初の入力へ移ります。OptionalFieldsControllerをoptional-fieldsとして登録します。足すたびにoptional-fields:add（id）を出します。値が入っている項目はopenで最初から出します。layout="stack"はチップを縦に並べ、HEYの検索の「結果を絞る」の列になります。',
  },
  {
    id: "prompt",
    name: "Prompt",
    description: "問いを層の見出しに置き、答えの行を紙に並べる問いかけ",
    render: () => (
      <Prompt
        question="下のメールはどれに近いですか？"
        pointer={false}
        choices={[
          { value: "person", title: "人からのメール", href: "/" },
          { value: "newsletter", title: "お知らせ", href: "/" },
        ]}
      />
    ),
    usage:
      "判断を依頼する問いかけです。LayerCardそのものの形で、questionを淡い青の層の見出しに、choicesを白い紙の中の行に置きます。行は円の印・太字の要点（title）・淡い説明（description）・進む矢印で、指を載せると淡い青の面と青から紫の印、押すと内側へへこみます。hrefを渡すと移動のリンク、無ければnameとvalueを送る送信のボタンになります（フォームは利用側）。dismissは見出しの行の終わりに置く、選ばずに閉じる操作です。pointerで層の下に尾を付け、すぐ下の対象を指します（尾は層の外に出るので、下の物との間を16px以上空けます）。行は複数行の文を持つ専用の操作で、文字の指定はprompt.cssが持ち、文字位置の検査に登録しています。",
  },
  {
    id: "reactions",
    name: "Reactions",
    description: "同じ絵文字をまとめ、付けた人数を添えた反応の札",
    render: () => (
      <Reactions
        label="このカードへの反応"
        items={[
          { content: "👍", name: "いいね", by: ["田中 遥", "佐藤 健", "自分"], mine: true },
          { content: "🚀", name: "ロケット", by: ["田中 遥"] },
        ]}
      />
    ),
    usage:
      "itemsは反応ごとに一件で、content（絵文字や短い言葉）とby（付けた人の名前の並び）を渡します。同じcontentは一枚の札にまとめ、byの人数を数として添えます。別々の人が同じ絵文字を付けた時は、その札のbyに名前が加わり、数が増えます。自分も付けている札はmineで淡い青の面・青い縁・青い数にします。nameは読み上げの名前で、読み上げは「いいね：田中 遥、佐藤 健」のように付けた人まで読みます。addを渡すと札は押せるボタンになり、自分の札を押すと外し、他の人の札を押すと自分も付けます。数が0になった札は消えます。終わりに「リアクションを追加」の操作（Tooltipで名前を出します）を置き、Popoverで短い言葉の欄（16文字まで、開いた時に移ります）とEmojiPickerを開きます。板の見出しは読み上げだけに残します。選んだ絵文字や書いた言葉は、同じ札があればそこへ自分を加え、なければ新しい札を作ります。付け外しはreactions:toggleで内容とselectedを知らせるので、保存は利用側で行います（ReactionsControllerをreactions、EmojiPickerControllerをemoji-pickerとして登録します）。add.meは自分の名前（既定は「自分」）です。addがない時は読むだけの札です。",
  },
  {
    id: "search-results",
    name: "SearchResults",
    description: "題名・抜粋・補足を並べ、一致した語を強調する検索の結果",
    render: () => (
      <SearchResults
        label="検索の結果"
        query="読書会"
        results={[
          {
            title: "秋の読書会のお知らせ",
            href: "/",
            excerpt: "今年の読書会は10月3日です。",
            meta: "田中 遥 · 9月20日",
          },
        ]}
      />
    ),
    usage:
      'HEYやFizzyの検索の結果と同じく、罫線を引かずに行間で区切り、題名（墨の太字、指を載せると青）・抜粋（二行まで）・淡い補足を積みます。queryを渡すと、題名と文字で渡した抜粋の中の一致した語を、文中の強調（mark）と同じ淡い黄の面で示します（大文字と小文字は区別しません）。leadingに人の円や種類の印を渡すと始まりの側に置きます。条件を足す列は、OptionalFieldsのlayout="stack"をページの側に並べます。',
  },
  {
    id: "profile-header",
    name: "ProfileHeader",
    description: "大きな人の円と名前、この人への設定の帯",
    render: () => (
      <ProfileHeader
        headingLevel={3}
        name="田中 遥"
        avatar={<Avatar name="田中 遥" initials="遥" size="large" />}
        detail="haruka@example.com"
      />
    ),
    usage:
      "HEYの連絡先と同じく、大きな人の円・太字の大きな名前・淡い補足を中央に積み、badgeを始まりの側の上の角、actionsを終わりの側の上の角に置きます。preferencesには、この人への設定（通知・振り分け・メモなど）のDropdownMenuやButtonを渡し、名前の下の灰色の帯に面を持たない形で並べます（狭い場所では折り返します）。名前の見出しの段はheadingLevel（既定はh1）で決めます。",
  },
  {
    id: "countdown",
    name: "Countdown",
    description: "期限や残りを大きな数で示す丸い印",
    render: () => (
      <Countdown value={70} before="閉じるまで" after="日" label="自動で閉じるまであと70日" />
    ),
    usage:
      "Fizzyのカードの「CLOSES IN 70 DAYS」と同じく、白い丸に大きな太い数を置き、beforeを数の上、afterを数の下に小さく添えます。役割の色（tone、既定はwarning）の細い輪で縁取り、紙の影で浮かせます。labelは読み上げの全文です。カードの縁にまたがせる時は、置く側で位置を決め、はみ出す分の余白を置く側で取ります。数の比べや集計はStatistic、状態の短い言葉はBadgeを使います。",
  },
  {
    id: "emoji-picker",
    name: "EmojiPicker",
    description: "絵文字を探して選ぶ板",
    render: () => <EmojiPicker id="catalog-emoji-picker" />,
    usage:
      "idは必須です。上の探す欄（InputGroup）に打った言葉で、絵文字の名前とkeywordsを絞ります。groupsで種類ごとの絵文字（emoji・name・keywords）を渡し、渡さなければ反応によく使う40個（defaultEmojiGroups）を並べます。格子の中は矢印で移り（右から左に読む時は左右が逆になります）、Home・Endで端へ、押すかEnterで選びます。Tabで格子へ入る所は一か所だけです。選ぶとemoji-picker:pickで絵文字と名前を知らせます。板そのものは開閉を持たないので、Popoverの中に置くか、ページにそのまま置きます。Reactionsの追加の操作はこの板をPopoverで開きます。",
  },
];
