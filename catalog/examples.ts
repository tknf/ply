// カタログの表示内容。独立した仕様形式や検証用スキーマとしては扱わない。
export const examples = [
  {
    id: "command-menu",
    name: "CommandMenu",
    description: "アプリ全体の移動・操作を検索する、上部中央の専用パネル。",
    usage:
      "id・label・shortcuts・groupsを渡します。shortcutsは主要な入口、groupsは最近の場所などの一覧です。columnsは3または4、shortcutはmod+k（CtrlまたはCmdとK）かshift+jを指定できます。アプリ全体のショートカットは一つのCommandMenuに指定します。各groupはlabelとitemsを持ちます。項目はlabelとhref（移動）またはvalue（操作）を指定し、icon・description・keywords・disabled・accent・currentを付けられます。CommandMenuControllerをcommand-menuとして登録します。操作はcommand-menu:selectのdetail.valueをアプリで受け取って実行します。この例では選択結果を下に表示します。背景を暗転しないnative popoverです。開くと検索欄へ移り、矢印で候補選択、Enterで実行、Escで閉じます。Tabで候補へ移った後も矢印が使え、Home・Endで先頭・末尾へ移れます。検索欄のHome・Endは文字の移動を保ち、日本語の変換中は候補を実行しません。",
  },
  {
    id: "message-list",
    name: "MessageList",
    description: "差出人・件名・プレビュー・時刻をまとめる受信一覧。",
    usage:
      "itemsへid・sender・title・href、任意のpreview・time・datetime・avatar・unreadを渡します。件名と差出人の空文字には代替表示を出し、アバターの有無が混在しても列を揃えます。threadCount・attachments・current・state（draft/sending/failed）・unavailableReasonに対応します。hrefなしの行はリンクにしません。一覧のstateはready/loading/error、0件も表示できます。previewLinesは1または2です。",
  },
  {
    id: "app-shell",
    name: "AppShell",
    description: "上部中央のコマンドと、中央の作業面を持つアプリの骨格。",
    usage:
      "commandsを上部中央、任意のhome・accountを左右に配置します。childrenは最大64remの中央の作業面に置き、狭幅では外側の余白を縮めます。サイドバーは提供しません。main要素は利用側で持ちます。",
  },
  {
    id: "split-view",
    name: "SplitView",
    description: "一覧と本文、作業と補足を並べる。",
    usage:
      "primary・secondaryをDOMの読み順で配置します。layout=readerは一覧を狭く、inspectorは補足を狭くします。52rem未満では縦に積みます。",
  },
  {
    id: "section",
    name: "Section",
    description: "関連する内容を見出し・件数・操作とまとめる。",
    usage:
      "title・count・tone・actionsを受け取ります。count=0も表示します。状態の意味は見出しの文言でも伝えます。",
  },
  {
    id: "message",
    name: "Message",
    description: "人・時刻・本文を同じ読み順で伝える。",
    usage:
      "author・time・datetimeを指定し、avatar・actions・repliesは任意です。layout=documentはメール等の本文を16px／28px、投稿者の下の全幅で読みます。既定はconversationです。本文は任意のHTMLを受け取ります。送信・既読・返信のデータ処理は利用側が持ちます。",
  },
  {
    id: "surface",
    name: "Surface",
    description: "中央の白い作業面。外側の配置は親のContainerが持ちます。",
    usage:
      "ContextBarはply-surface-bodyの前に置きます。狭い配置では内側の余白が縮みます。data-kind=panelは補助面、data-tone=warm・coolで設定やプレビューの面を区別します。",
  },
  {
    id: "context-bar",
    name: "ContextBar",
    description: "現在の位置と関連する移動・操作を、作業面の上部にまとめます。",
    usage:
      "itemsで現在地を渡し、childrenにButton・ActionLink・Toolbar・ButtonGroup・DropdownMenuなどを置きます。主要操作は一つに絞り、補助操作の後へ配置します。移動はActionLink、フォーム送信や画面内の操作はButton。フォーム外の送信・リセットはform属性で対象のidと関連付けます。幅が足りなければ現在地、操作の順で折り返します。Surfaceと組み合わせる場合はcontextへ渡してください。Toolbarは関連する複数操作、ContextBarは現在地とその対象の操作をまとめます。領域全体にrole=menuを付けません。",
  },
  {
    id: "page-header",
    name: "PageHeader",
    description: "対象と作業を、強い見出しで伝えます。",
    usage:
      "初期値は左揃えです。data-align=centerで中央に揃えられます。画面見出しとして使い、本文や入力を中央揃えにしません。",
  },
  {
    id: "button",
    name: "Button",
    description: "操作の主従、無効、処理中を表します。",
    usage:
      "通常・compactは文字0.875rem・行高20/14、largeは文字1rem・行高1.5です。画面幅で文字サイズは変わりません。通常・compactの高さは文字の16/7倍、largeは文字の2.5倍です。左右余白は通常1em・compact0.5em・large1.1em。文字14px時の通常の高さは32px相当です。上のHono例は通常・compact・largeの順です。data-variantはprimary・secondary・danger・link。Iconは文字の前後に配置でき、components/icon.cssと共通SVGスプライトも読み込みます。アイコンだけの操作はdata-icon-only=trueで正方形にし、aria-labelで操作名を付けます。titleはマウス向けの補助で、aria-labelの代わりにはしません。処理中はアイコンを含む内容を処理中文言に置き換えます。data-busy=true、disabled、aria-busy=trueを併記します。移動にはhrefを持つaを使います。",
  },
  {
    id: "field",
    name: "Field",
    description: "ラベル・入力・補足・エラーを関連付けます。",
    usage:
      "IDは画面内で一意にします。エラーはaria-describedbyで関連付け、入力にdata-invalid=trueとaria-invalid=trueを併記します。現在値を薄い補足へ置きません。",
  },
  {
    id: "badge",
    name: "Badge",
    description: "短い状態を、文言と色の役割で示します。",
    usage:
      "data-toneはneutral・info・success・warning・danger。審査や予約などの業務状態はアプリ側で文言と役割へ変換します。",
  },
  {
    id: "notice",
    name: "Notice",
    description: "事実・影響・次の操作を、継続して読める形で示します。",
    usage:
      "data-toneはinfo・success・warning・danger。動的な通知の読み上げや寿命は利用側で扱います。重大なエラーを自動消去しません。",
  },
  {
    id: "table",
    name: "Table",
    description: "数値・短い状態・長文を列の役割に合わせて表示します。",
    usage:
      '標準tableの構造に、sort="local"の並べ替え、selectableの選択欄、stickyHeaderを追加できます。TableSortはthを出力し、TableSelectionはセル内へ配置します。数値・日付はdata-sort-valueで表示と分け、空の値は末尾に保ちます。選択値は通常のフォームとtable:selectionchangeで受け取り、selectionActionsへ一括操作を置けます。sort="manual"はtable:sortを通知し、サーバー側の並べ替えへ接続します。stateはready/loading/empty/error。TableControllerをtable、TableSortControllerをtable-sort、TableSelectControllerをtable-selectへ登録してください。',
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "変更前後を対応させて確認します。",
    usage:
      "広いコンテナでは並列、狭いコンテナでは現在→変更後の順に積みます。差分判定は利用側です。",
  },
  {
    id: "value-list",
    name: "ValueList",
    description: "現在値を補足より明確に表示します。",
    usage: "値の0と未登録を区別します。数値や日時の書式は利用側で決めます。",
  },
  {
    id: "file-item",
    name: "FileItem",
    description: "既存ファイルの名前と状態を示します。",
    usage: "名前は折り返します。data-stateはready・pending・error。状態を文言でも説明します。",
  },
  {
    id: "image-frame",
    name: "ImageFrame",
    description: "比率を保って画像を比較します。",
    usage:
      "portraitは5:7・幅上限8rem。squareは1:1、landscapeは16:9・16rem。containは全体表示、coverは切り抜きです。",
  },
  {
    id: "disclosure",
    name: "Disclosure",
    description: "補足を標準HTMLで開閉します。",
    usage:
      "標準details/summaryで開閉します。見出しは16px/24px、本文は14px/22px。24pxの開閉マークから8px空け、見出し・説明・本文の左端を揃えます。開いた本文の縦線で所属を示し、DisclosureGroupでは項目を4px間隔で並べます。一つだけ開く場合は同じnameを指定してください。controllerの登録は不要です。CSSはdisclosure.cssと、集合を使う場合のdisclosure-group.css。",
  },
  {
    id: "progress",
    name: "Progress",
    description: "確定または不確定の進行状況です。",
    usage:
      "進捗不明ならvalueを省略します。表示値を経過時間から捏造しません。Honoのvalueは0〜maxに収め、有限でない値は未確定にします。maxの初期値は100、不正なmaxはnativeと同じ1です。割合はvalueとmaxから自動表示します。labelには処理名を指定します。",
  },
  {
    id: "pagination",
    name: "Pagination",
    description: "分割された一覧を移動します。",
    usage: "URLは利用側が渡します。現在地と無効な移動先をリンクにしません。",
  },
  {
    id: "data-list",
    name: "DataList",
    description: "主情報・補足・状態を行で比較します。",
    usage: "狭幅では順序を保って積みます。長文を省略せず、意味を保って折り返します。",
  },
  {
    id: "action-list",
    name: "ActionList",
    description: "作業の入口を、一覧や内容の見えるカードで示します。",
    usage:
      "移動する内容を動詞で示します。data-layout=gridで道具の入口を並べられます。accentはblue・green・amber・coralで用途を区別し、状態色には使いません。カード内にボタンなど別の操作を入れません。データ行に操作が付く場合はDataListを使います。",
  },
  {
    id: "empty-state",
    name: "EmptyState",
    description: "情報がない理由と次の行動を示します。",
    usage: "0件と検索エラーは区別します。架空の件数を表示しません。",
  },
] as const;
