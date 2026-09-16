// カタログの表示内容。独立した仕様形式や検証用スキーマとしては扱わない。
export const examples = [
  {
    id: "command-menu",
    name: "CommandMenu",
    description: "アプリ全体の移動・操作を検索する、上部中央の専用パネル。",
    html: '<div class="ply-command-menu" data-controller="command-menu"><button class="ply-button" data-size="large" type="button" data-command-menu-target="trigger" aria-haspopup="dialog" aria-controls="commands" aria-expanded="false">仕事場</button><dialog class="panel" id="commands" aria-label="仕事場のコマンド" data-command-menu-target="panel"><header class="search"><input class="ply-input" data-size="large" type="search" aria-label="移動先・操作を探す" data-command-menu-target="search" /></header><div class="results"><section class="group" data-command-menu-target="group"><h2>移動</h2><ul class="destinations"><li class="entry" data-command-menu-target="entry" data-search="プロジェクト"><a class="destination" href="/review/workspace"><span class="text"><strong>プロジェクト</strong></span></a></li></ul></section><p class="empty" data-command-menu-target="empty" hidden>見つかりませんでした。</p></div><footer class="footer"><span role="status" data-command-menu-target="status">↑↓で移動 · Enterで開く · Escで閉じる</span><button class="ply-button" type="button" data-command-menu-target="close">閉じる</button></footer></dialog></div>',
    usage:
      "id・label・shortcuts・groupsを渡します。shortcutsは主要な入口、groupsは最近の場所などの一覧です。columnsは3または4、shortcutはmod+k（CtrlまたはCmdとK）かshift+jを指定できます。アプリ全体のショートカットは一つのCommandMenuに指定します。各groupはlabelとitemsを持ちます。項目はlabelとhref（移動）またはvalue（操作）を指定し、icon・description・keywords・disabled・accent・currentを付けられます。CommandMenuControllerをcommand-menuとして登録します。操作はcommand-menu:selectのdetail.valueをアプリで受け取って実行します。この例では選択結果を下に表示します。背景を暗転しないnative popoverです。開くと検索欄へ移り、矢印で候補選択、Enterで実行、Escで閉じます。Tabで候補へ移った後も矢印が使え、Home・Endで先頭・末尾へ移れます。検索欄のHome・Endは文字の移動を保ち、日本語の変換中は候補を実行しません。",
  },
  {
    id: "message-list",
    name: "MessageList",
    description: "差出人・件名・プレビュー・時刻をまとめる受信一覧。",
    html: '<ul class="ply-message-list" aria-label="受信した連絡"><li data-message-id="sample" data-unread="true"><a href="/review/mail/categories"><span class="sender">森 美咲</span><span class="body"><strong class="title">カテゴリ案をまとめました</strong><span class="preview">5つのカテゴリに整理しました。</span></span><span class="meta"><time datetime="2026-09-15T10:24:00+09:00">10:24</time><span class="unread"><span class="ply-visually-hidden">未読</span></span></span></a></li></ul>',
    usage:
      "itemsへid・sender・title・href、任意のpreview・time・datetime・avatar・unreadを渡します。件名と差出人の空文字には代替表示を出し、アバターの有無が混在しても列を揃えます。threadCount・attachments・current・state（draft/sending/failed）・unavailableReasonに対応します。hrefなしの行はリンクにしません。一覧のstateはready/loading/error、0件も表示できます。previewLinesは1または2です。",
  },
  {
    id: "app-shell",
    name: "AppShell",
    description: "上部中央のコマンドと、中央の作業面を持つアプリの骨格。",
    html: '<div class="ply-app-shell"><header class="bar"><div class="start">ホーム</div><nav class="commands" aria-label="共通コマンド">コマンドメニュー</nav><div class="end">アカウント</div></header><div class="workspace">作業領域</div></div>',
    usage:
      "commandsを上部中央、任意のhome・accountを左右に配置します。childrenは最大64remの中央の作業面に置き、狭幅では外側の余白を縮めます。サイドバーは提供しません。main要素は利用側で持ちます。",
  },
  {
    id: "split-view",
    name: "SplitView",
    description: "一覧と本文、作業と補足を並べる。",
    html: '<div class="ply-split-view" data-layout="reader"><div class="panes"><div class="primary">一覧</div><div class="secondary">本文</div></div></div>',
    usage:
      "primary・secondaryをDOMの読み順で配置します。layout=readerは一覧を狭く、inspectorは補足を狭くします。52rem未満では縦に積みます。",
  },
  {
    id: "section",
    name: "Section",
    description: "関連する内容を見出し・件数・操作とまとめる。",
    html: '<section class="ply-section" data-tone="info"><header class="heading"><h2>進めている</h2><span class="count">2</span></header><p>関連する内容</p></section>',
    usage:
      "title・count・tone・actionsを受け取ります。count=0も表示します。状態の意味は見出しの文言でも伝えます。",
  },
  {
    id: "message",
    name: "Message",
    description: "人・時刻・本文を同じ読み順で伝える。",
    html: '<article class="ply-message"><header class="heading"><strong>森 美咲</strong><time datetime="2026-09-15T10:24:00+09:00">今日 10:24</time></header><div class="body"><p>カテゴリ案をまとめました。</p></div></article>',
    usage:
      "author・time・datetimeを指定し、avatar・actions・repliesは任意です。layout=documentはメール等の本文を16px／28px、投稿者の下の全幅で読みます。既定はconversationです。本文は任意のHTMLを受け取ります。送信・既読・返信のデータ処理は利用側が持ちます。",
  },
  {
    id: "surface",
    name: "Surface",
    description: "中央の白い作業面。外側の配置は親のContainerが持ちます。",
    html: '<section class="ply-surface"><div class="body">作業の内容</div></section>',
    usage:
      "ContextBarはply-surface-bodyの前に置きます。狭い配置では内側の余白が縮みます。data-kind=panelは補助面、data-tone=warm・coolで設定やプレビューの面を区別します。",
  },
  {
    id: "context-bar",
    name: "ContextBar",
    description: "現在の位置と関連する移動・操作を、作業面の上部にまとめます。",
    html: '<div class="ply-context-bar"><nav class="ply-breadcrumb" aria-label="現在の位置"><ol><li><a href="/search">記事</a></li><li><span aria-current="page">記事一覧</span></li></ol></nav><div class="actions"><a class="ply-button" data-variant="primary" href="/example">記事を書く</a></div></div>',
    usage:
      "itemsで現在地を渡し、childrenにButton・ActionLink・Toolbar・ButtonGroup・DropdownMenuなどを置きます。主要操作は一つに絞り、補助操作の後へ配置します。移動はActionLink、フォーム送信や画面内の操作はButton。フォーム外の送信・リセットはform属性で対象のidと関連付けます。幅が足りなければ現在地、操作の順で折り返します。Surfaceと組み合わせる場合はcontextへ渡してください。Toolbarは関連する複数操作、ContextBarは現在地とその対象の操作をまとめます。領域全体にrole=menuを付けません。",
  },
  {
    id: "page-header",
    name: "PageHeader",
    description: "対象と作業を、強い見出しで伝えます。",
    html: '<header class="ply-page-header"><h1>記事を編集する</h1><p>内容と公開設定を確認できます。</p></header>',
    usage:
      "初期値は左揃えです。data-align=centerで中央に揃えられます。画面見出しとして使い、本文や入力を中央揃えにしません。",
  },
  {
    id: "button",
    name: "Button",
    description: "操作の主従、無効、処理中を表します。",
    html: '<button class="ply-button" type="submit" data-variant="primary">保存する</button>',
    usage:
      "通常・compactは文字0.875rem・行高20/14、largeは文字1rem・行高1.5です。画面幅で文字サイズは変わりません。通常・compactの高さは文字の16/7倍、largeは文字の2.5倍です。左右余白は通常1em・compact0.5em・large1.1em。文字14px時の通常の高さは32px相当です。上のHono例は通常・compact・largeの順です。data-variantはprimary・secondary・danger・link。Iconは文字の前後に配置でき、components/icon.cssと共通SVGスプライトも読み込みます。アイコンだけの操作はdata-icon-only=trueで正方形にし、aria-labelで操作名を付けます。titleはマウス向けの補助で、aria-labelの代わりにはしません。処理中はアイコンを含む内容を処理中文言に置き換えます。data-busy=true、disabled、aria-busy=trueを併記します。移動にはhrefを持つaを使います。",
  },
  {
    id: "field",
    name: "Field",
    description: "ラベル・入力・補足・エラーを関連付けます。",
    html: '<div class="ply-field"><div class="heading"><label for="title">記事名</label></div><input class="ply-input" id="title" name="title" aria-describedby="title-help"><div class="messages"><p class="help" id="title-help"><svg class="ply-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-info" /></svg><span>一覧に表示する名前です。</span></p></div></div>',
    usage:
      "IDは画面内で一意にします。エラーはaria-describedbyで関連付け、入力にdata-invalid=trueとaria-invalid=trueを併記します。現在値を薄い補足へ置きません。",
  },
  {
    id: "badge",
    name: "Badge",
    description: "短い状態を、文言と色の役割で示します。",
    html: '<span class="ply-badge" data-tone="info">確認待ち</span>',
    usage:
      "data-toneはneutral・info・success・warning・danger。審査や予約などの業務状態はアプリ側で文言と役割へ変換します。",
  },
  {
    id: "notice",
    name: "Notice",
    description: "事実・影響・次の操作を、継続して読める形で示します。",
    html: '<aside class="ply-notice" data-tone="info" aria-label="保存について"><p class="title">保存について</p><div class="body"><p>保存すると変更が反映されます。</p></div></aside>',
    usage:
      "data-toneはinfo・success・warning・danger。動的な通知の読み上げや寿命は利用側で扱います。重大なエラーを自動消去しません。",
  },
  {
    id: "table",
    name: "Table",
    description: "数値・短い状態・長文を列の役割に合わせて表示します。",
    html: '<div class="ply-table" role="region" aria-label="売上" tabindex="0"><table class="table"><caption>売上</caption><thead><tr><th scope="col">商品</th><th scope="col" data-cell="numeric">金額</th></tr></thead><tbody><tr><th scope="row">暮らしの記録</th><td data-cell="numeric">¥1,200</td></tr></tbody></table></div>',
    usage:
      '標準tableの構造に、sort="local"の並べ替え、selectableの選択欄、stickyHeaderを追加できます。TableSortはthを出力し、TableSelectionはセル内へ配置します。数値・日付はdata-sort-valueで表示と分け、空の値は末尾に保ちます。選択値は通常のフォームとtable:selectionchangeで受け取り、selectionActionsへ一括操作を置けます。sort="manual"はtable:sortを通知し、サーバー側の並べ替えへ接続します。stateはready/loading/empty/error。TableControllerをtable、TableSortControllerをtable-sort、TableSelectControllerをtable-selectへ登録してください。',
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "変更前後を対応させて確認します。",
    html: '<section class="ply-comparison" data-changed="true" aria-label="記事名"><h3 class="title">記事名 <span class="state">変更あり</span></h3><div class="pair"><div class="before"><h4>現在</h4><div class="body"><p>暮らしの記録</p></div></div><div class="after"><h4>変更後</h4><div class="body"><p>毎日の暮らしを整えるための記録</p></div></div></div></section>',
    usage:
      "広いコンテナでは並列、狭いコンテナでは現在→変更後の順に積みます。差分判定は利用側です。",
  },
  {
    id: "value-list",
    name: "ValueList",
    description: "現在値を補足より明確に表示します。",
    html: '<dl class="ply-value-list"><div><dt>状態</dt><dd>公開中<p class="description">変更内容は確認後に反映されます。</p></dd></div></dl>',
    usage: "値の0と未登録を区別します。数値や日時の書式は利用側で決めます。",
  },
  {
    id: "file-item",
    name: "FileItem",
    description: "既存ファイルの名前と状態を示します。",
    html: '<div class="ply-file-item" data-state="error"><span class="icon"><svg class="ply-icon" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-file" /></svg></span><div class="body"><p class="title"><strong>資料_2026年版.pdf</strong></p><p class="description"><span class="state">送信失敗 · </span>もう一度選択してください。</p></div></div>',
    usage: "名前は折り返します。data-stateはready・pending・error。状態を文言でも説明します。",
  },
  {
    id: "image-frame",
    name: "ImageFrame",
    description: "比率を保って画像を比較します。",
    html: '<figure class="ply-image-frame" data-shape="portrait" data-fit="contain"><div class="image"><img src="/assets/sample-cover.svg" alt="暮らしの記録の表紙"></div></figure>',
    usage:
      "portraitは5:7・幅上限8rem。squareは1:1、landscapeは16:9・16rem。containは全体表示、coverは切り抜きです。",
  },
  {
    id: "disclosure",
    name: "Disclosure",
    description: "補足を標準HTMLで開閉します。",
    html: '<details class="ply-disclosure"><summary><span class="marker" aria-hidden="true"><svg class="ply-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-caret" /></svg></span><span class="label"><span class="title">詳しい条件</span></span></summary><div><p>内容を確認してから操作してください。</p></div></details>',
    usage:
      "標準details/summaryで開閉します。見出しは16px/24px、本文は14px/22px。24pxの開閉マークから8px空け、見出し・説明・本文の左端を揃えます。開いた本文の縦線で所属を示し、DisclosureGroupでは項目を4px間隔で並べます。一つだけ開く場合は同じnameを指定してください。controllerの登録は不要です。CSSはdisclosure.cssと、集合を使う場合のdisclosure-group.css。",
  },
  {
    id: "progress",
    name: "Progress",
    description: "確定または不確定の進行状況です。",
    html: '<label class="ply-progress"><span class="heading"><span>ファイルを送信しています</span><span class="value" aria-hidden="true">60%</span></span><progress value="60" max="100">60%</progress></label>',
    usage:
      "進捗不明ならvalueを省略します。表示値を経過時間から捏造しません。Honoのvalueは0〜maxに収め、有限でない値は未確定にします。maxの初期値は100、不正なmaxはnativeと同じ1です。割合はvalueとmaxから自動表示します。labelには処理名を指定します。",
  },
  {
    id: "pagination",
    name: "Pagination",
    description: "分割された一覧を移動します。",
    html: '<nav class="ply-pagination" aria-label="ページ送り"><ul><li><span data-current="true" aria-current="page">1</span></li><li><a href="/sales">売上の例</a></li></ul></nav>',
    usage: "URLは利用側が渡します。現在地と無効な移動先をリンクにしません。",
  },
  {
    id: "data-list",
    name: "DataList",
    description: "主情報・補足・状態を行で比較します。",
    html: '<ul class="ply-data-list"><li><div class="body"><strong class="title">暮らしの記録</strong><p class="description">2026年9月更新</p></div><div class="end"><span class="ply-badge" data-tone="info">確認待ち</span></div></li></ul>',
    usage: "狭幅では順序を保って積みます。長文を省略せず、意味を保って折り返します。",
  },
  {
    id: "action-list",
    name: "ActionList",
    description: "作業の入口を、一覧や内容の見えるカードで示します。",
    html: '<ul class="ply-action-list"><li><a href="/example"><span class="title">記事を編集する</span><small class="description">内容と公開設定を変更します。</small></a></li></ul>',
    usage:
      "移動する内容を動詞で示します。data-layout=gridで道具の入口を並べられます。accentはblue・green・amber・coralで用途を区別し、状態色には使いません。カード内にボタンなど別の操作を入れません。データ行に操作が付く場合はDataListを使います。",
  },
  {
    id: "empty-state",
    name: "EmptyState",
    description: "情報がない理由と次の行動を示します。",
    html: '<section class="ply-empty-state" data-kind="empty"><h3 class="title">該当する記事はありません</h3><div class="body"><p>検索条件を変更してください。</p></div></section>',
    usage: "0件と検索エラーは区別します。架空の件数を表示しません。",
  },
] as const;
