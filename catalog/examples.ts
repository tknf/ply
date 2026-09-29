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
      "itemsへid・sender・title・href、任意のpreview・time・datetime・avatar・unreadを渡します。件名と差出人の空文字には代替表示を出し、アバターの有無が混在しても列を揃えます。threadCount・attachments・current・state（draft/sending/failed）・unavailableReasonに対応します。状態はHEYの「DRAFT」と同じく件名の前に共通のBadgeで示し（送信失敗は赤、下書き・送信中・閲覧不可は灰。送信中は行も控えめに）、閲覧できない理由は書き出しの位置に出します。今開いている行は角丸の淡い青の面です。hrefなしの行はリンクにしません。一覧のstateはready/loading/error、0件も表示できます。previewLinesは1（既定、差出人と書き出しを一行）または2（書き出しを二行）です。",
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
      "primary・secondaryをDOMの読み順で配置します。layout=readerは一覧を狭く、inspectorは補足を狭くします。resizableを指定し、SplitterControllerをsplitterとして登録すると、境界の持ち手のドラッグと矢印キーで幅を変更できます。52rem未満では縦に積みます。",
  },
  {
    id: "wing",
    name: "Wing",
    description: "中央の作業面の後ろから、左右に開閉できる補助パネルを差し込む。",
    usage:
      "childrenを中央の作業面、start・endを左右のWingに置きます。各Wingはlabel・contentと任意のicon・openを受け取り、openの既定は展開です。開閉はdetails/summaryで動き、controllerの登録は不要です。storageKeyを指定し、WingControllerをwingとして登録すると、左右の開閉状態をcookieへ保存します。サーバーでwingCookieName(storageKey)のcookieを読み、savedStateへ渡すと、保存した状態のままSSRしてちらつきません。渡さない場合も接続時にcookieから復元します。キーはサイト内で一意にします。見出しは縦書きで、日本語は正立、英語などは時計回りに回して上から読みます。入り切らない見出しは末尾を省略し、右から左へ書く言語では開閉の印を反転します。56rem以上ではWingを作業面の後ろへ差し込み、閉じると外側の持ち手だけ、開くと持ち手から外側へパネルが出ます。左右の列は開閉に関わらず幅を確保し、作業面を動かしません。Wingは作業面より上下24pxずつ低く、内容はWingの中でスクロールします。作業面には背景を持つSurface等を置きます。56rem未満ではWingを補足として作業面の下へstart・endの順に積みます。AppShellではwingsに同じstart・endを渡すと、作業面の後ろに付きます。画面端に固定する常設のナビゲーションではなく、作業面に付属する補助パネルとして使います。",
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
      "author・time・datetimeを指定し、avatar・actions・repliesは任意です。既定のconversationは本文を、人の側の上の角だけを立てた淡い吹き出しにします。layout=documentはHEYのスレッドと同じく一通を一枚の紙にし、日付を見出しの行の終わりに寄せ、本文を1rem／1.75remで投稿者の下の全幅に読みます。documentのMessageを続けて置くと、紙を少し重ねて積みます。repliesに渡した返信は、人の円から下ろした糸でつなぎます。本文は任意のHTMLを受け取ります。送信・既読・返信のデータ処理は利用側が持ちます。",
  },
  {
    id: "surface",
    name: "Surface",
    description:
      "中央の作業面。仕事の中身を一枚の白い面にまとめます。AppShellの作業面と同じ見た目で、AppShellを使わない画面で使います。",
    usage:
      "パンくずや補助操作（ContextBar）はcontextに渡し、本文には一律の余白を設けます。documentレイアウトでは本文を読みやすい行長に収めます。一件の紙はCard、役割の色の面はNoticeを使い、作業面の中に作業面を重ねません。",
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
      "通常・compactは文字0.875rem・行高20/14、largeは文字1rem・行高1.5です。画面幅で文字サイズは変わりません。通常・compactの高さは文字の18/7倍（約2.25rem）、largeは文字の2.5倍です。左右余白は通常1.25em・compact0.875em・large1.375em。上のHono例は通常・compact・largeの順です。data-variantはprimary（青の塗り）・secondary（白の縦の陰影）・danger（赤の塗り）・link。影の付き方と、指を載せると影が広がり押すと内側へ沈む変化は、primary・secondary・dangerで同じです。Iconは文字の前後に配置でき、components/icon.cssと共通SVGスプライトも読み込みます。アイコンだけの操作はdata-icon-only=trueで正方形にし、aria-labelで操作名を付けます。格子に並べる印と名前のタイルはActionTileを使います。titleはマウス向けの補助で、aria-labelの代わりにはしません。処理中はアイコンを含む内容を処理中文言に置き換えます。data-busy=true、disabled、aria-busy=trueを併記します。移動にはhrefを持つaを使います。",
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
      "data-toneはinfo・success・warning・danger。白い紙に、役割の色で塗った印と題名のピルを上の縁にまたがせ、本文と操作をその下に置きます（ピルの半分の高さだけ上を空けます）。動的な通知の読み上げや寿命は利用側で扱います。重大なエラーを自動消去しません。",
  },
  {
    id: "table",
    name: "Table",
    description: "数値・短い状態・長文を列の役割に合わせて表示します。",
    usage:
      '標準tableの構造に、sort="local"の並べ替え、selectableの選択欄、stickyHeaderを追加できます。TableSortはthを出力し、TableSelectionはセル内へ配置します。数値・日付はdata-sort-valueで表示と分け、空の値は末尾に保ちます。選択値は通常のフォームとtable:selectionchangeで受け取り、selectionActionsへ一括操作を置けます。選択すると、ActionDockと同じ棚が画面の下の中央に浮かんで現れます。始まりに件数、続けてselectionActionsの一括操作を横一列に並べ（ActionTileは面を持たない平らなタイル、Buttonもそのまま同じ列に置きます）、入らない時は操作の列を横にスクロールします。解除の×（aria-labelは「選択を解除」）はDialogと同じく紙の角に置きます。表は動きません。閉じる間も件数と並びは変わりません。sort="manual"はtable:sortを通知し、サーバー側の並べ替えへ接続します。stateはready/loading/empty/errorで、状態表示中もtheadを保ち、本文行だけを隠します。TableControllerをtable、TableSortControllerをtable-sort、TableSelectControllerをtable-selectへ登録してください。',
  },
  {
    id: "grid",
    name: "Grid",
    description: "行と列を保ったまま、二方向にセルを読む作業面です。",
    usage:
      "等列数のtableを使い、GridControllerをgridとして登録すると矢印・Home・End・PageUp・PageDownでセル間を移動できます。値の選択や更新は含めず、必要な場合は既存の操作コンポーネントをセル内で使用します。空状態ではControllerを起動しません。",
  },
  {
    id: "treegrid",
    name: "Treegrid",
    description: "階層を持つ行を、列の対応を保って確認します。",
    usage:
      "TreegridControllerをtreegridへ登録します。項目のvalueは全階層で一意にし、childrenで深さを渡します。行の開閉と二方向のキー移動は上流Controllerが扱い、ready/loading/empty/errorでは表の見出しを保ったまま状態を示します。",
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
    usage:
      "値の0と未登録を区別します。数値や日時の書式は利用側で決めます。各行の下に細い線を引きます。itemsのiconに印（塗りつぶしのIconなど）を渡すと、項目名の前に色の淡い丸に入れて添え、accent（blue・green・amber・coral）で色を選べます。",
  },
  {
    id: "file-item",
    name: "FileItem",
    description: "既存ファイルの名前と状態を示します。",
    usage:
      "名前は折り返します。data-stateはready・pending・error。状態を文言でも説明します。previewに画像やPDFの1ページ目の縮小を渡すと、ファイルの印の代わりに中身を見せます（角丸なしの淡い縁で囲み、正方形に切り抜きます）。",
  },
  {
    id: "image-frame",
    name: "ImageFrame",
    description: "比率を保って画像を比較します。",
    usage:
      "portraitは5:7・幅上限8rem。squareは1:1、landscapeは16:9・16rem。containは全体表示、coverは切り抜きです。",
  },
  {
    id: "image-cropper",
    name: "ImageCropper",
    description: "画像の切り抜き範囲を、画像面と数値の両方から調整します。",
    usage:
      "元画像の実寸とsrcを渡し、ImageCropperControllerをimage-cropperへ登録します。範囲の移動とサイズ変更、5本のnative rangeを同じ値へ同期します。画像なし・無効状態も表示し、切り抜いた画像の生成や保存は利用側が行います。",
  },
  {
    id: "color-picker",
    name: "ColorPicker",
    description: "色相・彩度・明度・不透明度を、見本を確認しながら選びます。",
    usage:
      "ColorPickerControllerをcolor-pickerへ登録します。色の面とnative rangeでHSVA値を調整し、フォームには各値を送信します。色見本だけに頼らず、操作名とスライダー位置でも伝えます。無効・説明・エラー状態にも対応します。",
  },
  {
    id: "carousel",
    name: "Carousel",
    description: "関連する内容を一枚ずつ読み、前後へ移動します。",
    usage:
      "Cardの内容をslideとして渡します。2件以上でCarouselControllerを登録すると前後移動が循環し、任意のintervalは利用者が再生を選んだ場合だけ動きます。1件では操作を表示せず、0件では空状態を示します。スライドは同じ場所に重ねて高さを一番高いスライドにそろえ、切り替えても下の内容を動かしません。新しいスライドは少し横から滑りながら現れます。前後の丸は紙の左右の縁をまたいで載り、狭い幅では紙の下に並びます。",
  },
  {
    id: "disclosure",
    name: "Disclosure",
    description: "補足を標準HTMLで開閉します。",
    usage:
      "標準details/summaryで開閉します。見出しは1rem/1.5rem、本文は0.875rem/1.375rem。1.5remの開閉の矢印から0.5rem空け、見出し・説明・本文の左端を揃えます。枠や縦線は引かず、入れ子は字下げで示します。開く時は高さが伸びながら中身が現れ、閉じる時は縮みます（動きを減らす設定では動きません）。DisclosureGroupでは項目を0.25rem間隔で並べます。一つだけ開く場合は同じnameを指定してください。controllerの登録は不要です。CSSはdisclosure.cssと、集合を使う場合のdisclosure-group.css。",
  },
  {
    id: "progress",
    name: "Progress",
    description: "確定または不確定の進行状況です。",
    usage:
      "進捗不明ならvalueを省略します。表示値を経過時間から捏造しません。Honoのvalueは0〜maxに収め、有限でない値は未確定にします。maxの初期値は100、不正なmaxはnativeと同じ1です。棒は実際の割合で描き、表示は0.1%単位で切り捨てます。完了前に100%とは表示しません。labelには処理名を指定します。帯は青から紫へ塗り、終わると緑になります。終わりが分からない時は、溝いっぱいの帯の中で青と紫の色がゆっくり流れ続けます。",
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
    usage:
      "MessageListと同じく、罫線を引かず行間で区切り、指を載せた行と今開いている行（current）を角丸の淡い面で示します。題名のリンクは行全体を押せる範囲にし、endの操作はその上で押せます。狭幅では順序を保って積みます。長文を省略せず、意味を保って折り返します。",
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
    usage:
      "0件と検索エラーは区別します。架空の件数を表示しません。Fizzyの空の場所と同じく、場面の色（0件は灰、初めては青、終わった時は緑）の破線の札に太字の題名と説明を書き、操作は札の下に置きます。iconは渡した時だけ置き、終わった時はペンで描くチェックを既定にします。",
  },
] as const;
