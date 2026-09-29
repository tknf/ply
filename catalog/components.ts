import type { ComponentEntry } from "./layout";

/** カタログに載せる部品の名前・概要・使い方。分類と表示順はcomponent-groups.tsが持つ。 */
export const catalogComponents = [
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
      "itemsへid・sender・title・href、任意のpreview・time・datetime・avatar・unreadを渡します。件名と差出人の空文字には代替表示を出し、アバターの有無が混在しても列を揃えます。threadCount・attachments・current・state（draft/sending/failed）・unavailableReasonに対応します。状態は件名の前に共通のBadgeで示し（送信失敗は赤、下書き・送信中・閲覧不可は灰。送信中は行も控えめに）、閲覧できない理由は書き出しの位置に出します。今開いている行は角丸の淡い青の面です。hrefなしの行はリンクにしません。一覧のstateはready/loading/error、0件も表示できます。previewLinesは1（既定、差出人と書き出しを一行）または2（書き出しを二行）です。",
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
      "author・time・datetimeを指定し、avatar・actions・repliesは任意です。既定のconversationは本文を、人の側の上の角だけを立てた淡い吹き出しにします。layout=documentは一通を一枚の紙にし、日付を見出しの行の終わりに寄せ、本文を1rem／1.75remで投稿者の下の全幅に読みます。documentのMessageを続けて置くと、紙を少し重ねて積みます。repliesに渡した返信は、人の円から下ろした糸でつなぎます。本文は任意のHTMLを受け取ります。送信・既読・返信のデータ処理は利用側が持ちます。",
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
      "0件と検索エラーは区別します。架空の件数を表示しません。場面の色（0件は灰、初めては青、終わった時は緑）の破線の札に太字の題名と説明を書き、操作は札の下に置きます。iconは渡した時だけ置き、終わった時はペンで描くチェックを既定にします。",
  },
  {
    id: "icon",
    name: "Icon",
    description: "操作や用途の文言を補う小さな図形。",
    usage:
      "Phosphor regularを共通で使います。標準は1em、小型は6em/7。名前によるサイズ・ウェイトの分岐はありません。配布icons.svgを同一オリジンに配置し、spriteでURLを指定できます。装飾は読み上げを省き、用途を伝える文言を添えます。CSSのみでも同じSVG/useを利用でき、CSS背景・mask用の単独SVGも同じ素材から生成します。",
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "文脈を保ちながら、影響や内容を確認します。",
    usage:
      "DialogControllerをdialogとして登録します。idは画面内で一意にします。見出し・本文・操作欄を分け、長文では本文をスクロールします。sizeはcompact/default/wide、closeLabelで閉じる操作の文言、actionsで追加操作を指定できます。初期フォーカスは見出しです。フォームではinitialFocusをcontentにし、必要な入力にautofocusを指定します。Escapeと閉じる操作で元のトリガーへ戻ります。狭いタッチ画面では下端に寄せたシートとして表示し、上端のハンドルと見出しを下へ引くと閉じます（dialog:beforecloseのdetail.reasonはswipe）。保存・削除は利用側で処理してください。",
  },
  {
    id: "dropdown-menu",
    name: "DropdownMenu",
    description: "現在の対象に関する補助操作をまとめます。",
    usage:
      "DropdownMenuControllerをdropdown-menuとして登録します。メニューは青の面に白い文字で、開いた操作の側から膨らんで現れます。通常操作・リンク・区切り・見出し・チェック・単一選択・多段サブメニューに対応します。dropdown-menu:selectのdetail.value、checked、nameを利用側で受け取ります。beforeselectはpreventDefaultで取り消せます。上下矢印・Home/Endで項目移動、左右矢印で階層移動、Escapeで一段戻り、Tabで閉じます。チェックと単一選択は既定で開いたままです。idは画面内で一意、radioのnameは同じ階層の選択グループごとに指定します。ショートカットの補助表記はキー登録を行いません。",
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "同じ場所で関連するパネルを切り替えます。",
    usage:
      "TabsControllerをtabsとして登録します。idとitemsのvalueは一意にします。矢印キーで選択します。JavaScript未接続では選択済みパネルだけを表示するため、重要情報には通常の導線も用意してください。",
  },
  {
    id: "danger-zone",
    name: "DangerZone",
    description: "削除や公開の取り消しなど、影響のある操作を説明と一緒にまとめます。",
    usage:
      "titleで操作名、descriptionで影響、childrenで追加の説明やフォーム、actionsでButton・ActionLink・Dialogを渡します。通常の保存とは区切り線で分け、説明の下に操作を置きます。複数の操作は折り返します。DangerZone自体にcontroller登録は不要です。確認にDialogを使う場合はDialogControllerを登録してください。このHTML例のリンクは下の確認例へ移動します。削除処理・権限判定・状態の更新は利用側が行います。",
  },
  {
    id: "field-group",
    name: "FieldGroup",
    description: "見出しと説明、入力欄をひとまとまりのフォームとして配置します。",
    usage:
      "legendで区切りの見出し、descriptionでグループの説明を指定します。広い配置では説明を左、入力欄を右に揃え、狭い配置では縦に並びます。説明がない場合は入力欄に全幅を使います。配置と区切り線、内部の余白はFieldGroupが持ちます。disabledを渡すと子の入力をまとめて無効化できます。controller登録は不要です。各入力の状態や操作例はFieldのカタログにまとめています。",
  },
  {
    id: "filter-bar",
    name: "FilterBar",
    description: "一覧を絞り込む条件をリンクで切り替える",
    usage:
      "itemsにlabel・href・current・任意のcountを渡し、共通のActionLinkとして描画します。CSSはbutton.cssとfilter-bar.cssを併用します。currentから選択中の表示とaria-currentを生成し、countは0件も表示します。条件を含むURLと選択状態はサーバーが指定します。通常のリンクなのでJavaScriptなしで移動でき、controllerの登録は不要です。appearanceをsegmentedにすると、表示形式などの切り替えをつながった一組として並べます。childrenでリンクを直接組み立てることもできます。",
  },
  {
    id: "file-input",
    name: "FileInput",
    description: "ファイルを選択し、添付する内容を確認する",
    usage:
      "FileInputControllerをfile-inputとして登録すると、Stimulus-uiのFileDropControllerによるドロップに加え、名前・サイズの一覧と選択解除を使えます。ドロップ・解除もinput/changeを通知します。name・multiple・accept・required・formは標準のファイル入力へ渡し、help・errorはFieldと同じ表示と読み上げの関連付けです。JavaScriptなしでは標準のファイル選択を使えます。選び直しは置き換えで、追加・アップロードは行いません。acceptは選択ダイアログの絞り込み指定で、形式・容量の検証は送信先で行います。",
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "人物やチームを名前と一緒に示す",
    usage:
      "画像なしは指定した略称を表示。名前を色だけで識別しません。複数の人はAvatarGroupで囲むと、円を少しずつ重ねて並べます（avatar-group.cssも読み込んでください）。labelで誰と誰かを読み上げます。",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "階層をたどって上位へ戻る",
    usage: "現在地にはリンクを付けず、最後の項目として示します。ContextBar外でも利用できます。",
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "同じ領域のページを切り替える",
    usage:
      "ページ移動には通常のリンクを使い、アプリ用メニューのroleを付けません。0件も表示します。",
  },
  {
    id: "steps",
    name: "Steps",
    description: "手順と現在の段階を示す",
    usage: "段階の意味をテキストでも伝えます。未入力の段階へ移動できるかは利用側で決めます。",
  },
  {
    id: "toolbar",
    name: "Toolbar",
    description: "対象に対する複数の操作をまとめる",
    usage:
      "実行する操作をまとめる配置コンポーネントです。FilterBarは現在の絞り込み条件を示すnav、Toolbarは送信・リセット・移動をまとめるrole=toolbarです。両方の操作は同じピル形を使います。Button・ActionLinkなどの操作にdata-toolbar-target=controlを付けると、全体が一つのTab停止点になり、左右矢印とHome/Endで操作を移動できます。フォームの送信・リセットはButtonのtypeで指定します。狭い配置では項目が折り返します。",
  },
  {
    id: "input-group",
    name: "InputGroup",
    description: "単位や接頭辞を入力と並べる",
    usage:
      "prefix・suffixで接頭辞や単位、actionで操作の文言とButtonの属性を渡します。入力欄・操作ボタン・読み上げの関連付けはInputGroupが生成します。通常は2rem、size=largeは2.5remで入力とボタンを揃えます。単位はラベルにも含め、値には混ぜません。type=numberはNumberFieldControllerをnumber-fieldとして一度登録すると、PageUp・PageDownと境界状態に対応します。検索の例は、利用例のアプリの検索の画面へ移動します。",
  },
  {
    id: "switch",
    name: "Switch",
    description: "二択の設定を切り替える",
    usage:
      "ON/OFFの設定に使います。標準checkboxのSpace・フォーム送信・リセット・disabledを保ち、JavaScriptなしで動きます。checkedは初期状態、nameとvalueはON時の送信値です。説明の読み上げへの関連付けと、id省略時のID生成はSwitchが行います。controllerの登録は不要です。保存が必要な設定は設定画面の例を参照してください。",
  },
  {
    id: "range",
    name: "Range",
    description: "連続する数値を調整する",
    usage:
      "valueに数値を渡すと単一値、[下限, 上限]を渡すと範囲指定になります。範囲指定のnameはname-start・name-endとして送信します。RangeControllerをrangeとして登録すると、Stimulus-uiのSliderControllerによる状態管理・上下限制約に、現在値の表示と数値入力の同期が加わります。矢印キー・Home・Endは標準入力の操作です。JavaScriptなしの範囲指定は独立した2本のスライダーになります。",
  },
  {
    id: "suggestion",
    name: "Suggestion",
    description: "自由入力に候補を添える",
    usage:
      "SuggestionControllerをsuggestionとして登録すると、入力による部分一致の絞り込みと候補一覧を使えます。矢印キーで移動、Enterで選択、Escapeで閉じます。右の矢印はすべての候補を開閉します。候補外の値もそのまま送信できます。help・errorはFieldと同じ表示と読み上げの関連付けです。JavaScriptなしでは標準datalistを使います。候補内の値だけを選ばせる場合はSelectを使ってください。",
  },
  {
    id: "date-picker",
    name: "DatePicker",
    description: "単日・期間をひとつの欄で選ぶ",
    usage:
      "DatePickerControllerをdate-pickerとして登録します。modeはsingle・range・flexible。singleはname、rangeはstartName・endName、flexibleはそれらにkindNameと初期selectionを指定します。カレンダー上部で日付を編集し、その場で反映します。flexibleでは下部の「終了日」スイッチで終了日欄を追加します。Shift＋クリックでも終了日が有効になり、クリックした日までの期間になります。矢印キーで日付、PageUp・PageDownで月を移動します。直接入力はYYYY/MM/DD、期間は2つの日付を「–」で区切ります。表示文字列は送らず、指定した名前へYYYY-MM-DDを送信します。未入力・単日の終了日は空文字です。開始日・終了日が独立した任意項目ならsingleを2つ使います。minFrom・maxFromに相手のIDを渡すと、上限・下限を連動できます。offsetDaysで翌日以降・前日以前にもできます。JavaScriptなしでは標準日付入力を使い、制約は保存先でも検証してください。",
  },
  {
    id: "tag",
    name: "Tag",
    description: "分類や選択した条件を短く示す",
    usage:
      "分類を表す小さなコンポーネントです。集合にはTagGroupを使い、横0.5em・縦0.125remの余白で折り返します。状態の表示はBadgeを使います。縁は文字と同じ色、文字はMediumです。リンクはhover時に役割の色を淡く敷いて操作可能なことを示します。TagGroupを使う場合はtag-group.cssも読み込んでください。",
  },
  {
    id: "statistic",
    name: "Statistic",
    description: "集計値と単位をひとまとまりにする",
    usage: "集計条件と単位を添えます。数値の算出や増減の意味は利用側で決定します。",
  },
  {
    id: "card",
    name: "Card",
    description: "関連する内容と操作を一つにまとめる",
    usage:
      "見出しリンクと内部操作を区別します。カード全体をクリック対象にして入れ子の操作を壊しません。",
  },
  {
    id: "action-tile",
    name: "ActionTile",
    description: "塗りつぶしの印と名前を縦に積み、格子に並べる入口や操作",
    usage:
      "labelとiconは必須で、印は塗りつぶしで上、名前は下に置きます。accentはblue（既定）・green・amber・coralで、印の色と指を載せた時の淡い地の色が変わります。hrefを渡すと移動のリンク（currentで現在地）、渡さなければtype=buttonのボタンになり、onclickやdata属性で操作を結び付けます。disabledはリンクなら移動しない印、ボタンなら押せない状態にし、どちらも半透明にします。shortcutはKeycapの小さい形で印の終わりの側の上に添え（キーの登録は利用側）、badgeはBadgeの小さい形で印の上に重ねます。ActionDockと同じ密度の、普段は影のない平らな淡い面で、指を載せると印の色を淡く敷き、押すと内側へへこみます。タイルは升いっぱいに広がるので、並べ方と列数は置く側の格子が決めます。名前は文節の切れ目で折り返します。CommandMenuの上段の入口と、TableのselectionActionsの一括操作に使います。文字の指定はaction-tile.cssが持ち、共通Buttonとは別の専用の操作として文字位置の検査に登録しています。",
  },
  {
    id: "layer-card",
    name: "LayerCard",
    description: "見出しを淡い青の層に置き、中身を白い紙に載せる",
    usage:
      "titleは淡い青の沈んだ層に墨の太字で置き、childrenは層の上に載せた白い紙に入れます。actionsには白いピルのActionLinkやButtonを渡し、見出しの行の終わりの側に置きます。題名が折り返しても操作は一行目に残り（題名の幅が8remを割る時だけ次の行へ送ります）、操作の有無で紙の位置は変わりません。紙の端に接するDataList・ActionListは、始まりと終わりの罫線を紙の端に任せます。題名が中身と同じ面で競うと冗長に見える、一覧や属性のまとまりに使います。一件の物として扱う内容はCard、作業面の中の区切りはSectionを使います。",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "出来事を時系列で読む",
    usage:
      "順序は渡されたitemsの順です。時刻に機械可読のdatetimeを付けます。出来事は塗りつぶしの青い印で示し、avatarを渡すと印の代わりに起こした人の円を線の上に置きます。節目（milestones）の今の時は、Calendarの今日と同じ蛍光ペンで塗ります。",
  },
  {
    id: "task-list",
    name: "TaskList",
    description: "完了操作と担当・期日を並べる",
    usage:
      "標準checkboxとして操作できます。完了の保存はフォーム送信または利用側controllerで行います。headingを渡すと、開閉できる外側の見出しに、終えた割合だけ塗る円と「終えた数/全体」を添えます（TaskListControllerをtask-listとして登録すると、チェックに合わせて数え直し、全て終えると円にチェックを置きます）。終えた題名は、書き始めの側からペンで引く線で消します。titleは一覧の始まりに置く名前、addは最後の行に置く書き足す欄で、追加は利用側のフォームで扱います。",
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "月・週・年を行き来し、日付と予定を探す",
    usage:
      "月・週・年と日付順の一覧、前後期間と今日への移動に対応します。予定はlabel・hrefと任意のstart・end（HH:MM）・accentを持ち、startがなければ終日、endがなければ開始から1時間です。月は各日に一行ずつ、週は時刻の軸を持つ時間割で表示し、時間の重なる予定は横に並べます。週は0〜24時の時間割を画面に収まる高さ（--ply-calendar-scroll-size）でスクロールし、見出しと終日の行を固定します。先頭の一行の日数で列数が決まり、1日なら日、5日なら稼働日の表示です。hoursは稼働時間で、外側を淡く塗ります。nowを渡すと今日の列に現在時刻の線を引き、開いた時にその時刻を表示します（今日を含まない週は稼働時間の始まり）。scroll-initial-targetに対応しないブラウザではCalendarScrollControllerをcalendar-scrollとして登録します。weekStartで月曜・日曜始まりを選び、weeksの各行も同じ曜日から並べます。weekNumbersで月の各行と週の見出しにISO週番号を表示します。年表示は月への入口、一覧は日付ごとに月・週と同じ予定の行を並べます。外枠を持たずに日の間の淡い線で区切り、今週を墨の角丸の枠で囲み、今日の日付を蛍光ペンの楕円で塗り、月の初日に月の旗を立てます。予定は分類の色で淡く塗った札、仮の予定は破線の縁、現在時刻は破線です。selectionを渡すと既存CalendarControllerで単一日・範囲を選択し、calendar:changeを受け取れます。月の計算と予定の取得は利用側で行います。予定にdetails（idと中身）を渡すと、札は押して詳細の紙を開く操作になり、Popoverと同じ紙に題名・時刻・中身・hrefへの「詳しく見る」を置きます（PopoverControllerをpopoverとして登録します）。",
  },
  {
    id: "board",
    name: "Board",
    description: "仕事を状態ごとの列で見る",
    usage:
      "columnsのitemsへid・label・任意のcontentを渡し、movableでBoardControllerを接続します。持ち手をドラッグして列間移動と並べ替えができ、Space・矢印・Enterでも操作できます。Escape・外へのドロップで取り消します。board:beforemoveはキャンセル可能、board:moveはid・移動元/先の列IDと順番を通知します。disabledの項目と列へは移動できません。保存処理は利用アプリで接続します。項目は列の色で斜めに淡く染まり、codeを渡すと番号などの札を紙の上の始まりの角に列の色の淡い面で置きます。collapsedの列は件数の丸と縦書きの名前を載せた紙の束になり、collapsibleを渡すと束の「開く」と見出しの「たたむ」で開閉できます。開閉はBoardControllerが表示だけ切り替え、取り消せるboard:toggle（列IDとcollapsed）で知らせるので、保存は利用アプリで行います。",
  },
  {
    id: "error-summary",
    name: "ErrorSummary",
    description: "送信時の問題と修正先をまとめる",
    usage:
      "送信に失敗した時だけ表示します。表示後のフォーカス移動は利用側が行い、各入力にもエラーを関連付けます。見た目はNoticeの危険の役割（白い紙と、縁をまたぐ印と見出しのピル）で、ErrorSummaryは直す欄への一覧だけを持ちます。",
  },
  {
    id: "loading",
    name: "Loading",
    description: "待っている処理を言葉で示す",
    usage:
      "既定の印は青から紫の三つの点で、書き始めの側から順に小さく跳ねます（跳ねていない点は淡くなるだけで消えません）（variantのorbitで回る丸、haloで広がる輪）。短い取得はinline、領域全体の待機はregion（面を敷かず、大きめの印と文を中央に縦に並べます）、送信操作はButtonのbusyを使います。作業量が未確定の継続処理にはvalueなしのProgressを使い、架空の進捗を付けません。完了後は結果に置換します。",
  },
  {
    id: "toast",
    name: "Toast",
    description: "操作結果を閉じるまで読める形で示す",
    usage:
      "ToastControllerをtoastとして登録します。toneで知らせの種類（info・success・warning・danger、初期値はinfo）を選び、面をその色で塗ります。初期値は保持し、durationを指定すると時間で閉じます。失敗はlive=assertiveにし、重要なエラーは入力付近やErrorSummaryにも残します。単独のToastは右下（書き終わりの側の下）に出ます。複数のToastはToastStackで囲み、ToastStackControllerをtoast-stackとして登録すると、新しいものを手前に束ねます。束を押すと上へ広がり、外を押すかEscで畳みます。キーボードで束の中へ入った時も広がります。placementで置き場所（end・center・start、既定はend）を選べます。ToastStackを使う場合はtoast-stack.cssも読み込んでください。",
  },
  {
    id: "popover",
    name: "Popover",
    description: "補足や小さな操作を必要な時に開く",
    usage:
      "標準Popover APIによる非モーダル表示です。ボタンとパネルを明示的なCSSアンカーで結びます。PopoverControllerをpopoverとして登録すると、CSS未対応・位置合わせ失敗時の補正を行います。alignで始端/末端、sizeでcompact/default/wideを選べます。title・description・actions・iconOnly・disabledにも対応します。iconOnlyの開く操作にはtooltipで名前を出せ、titleHiddenで見出しを読み上げだけに残せ、initialFocusをcontentにすると開いた時に見出しではなく中身のautofocusへ移ります。外側クリックとEscapeで閉じ、背景の通常操作は妨げません。必須確認はDialogを使います。",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "操作に添える短い補足を、hoverとfocusで示す",
    usage:
      "triggerが受け取る属性をButtonやActionLinkへ渡します。TooltipControllerをtooltipとして登録するとhover・focusで表示し、Escapeで閉じます。textは短い非対話的な補足に限ります。操作や必須の説明にはPopoverまたは画面上の文を使います。idは画面内で一意にします。",
  },
  {
    id: "editable-property",
    name: "EditableProperty",
    description: "値をその場所で編集し、確定と取消を揃える",
    usage:
      "EditableControllerをeditable、EditablePropertyControllerをeditable-propertyとして登録します。確定時のeditable:commitで保存処理を行い、必要ならeditable:beforecommitを取り消します。表示の値は下線も枠もない文字にし、値と鉛筆を包む箱に指を載せると淡い面を出します。鉛筆でも値そのものを押しても書き始め、一行の値は全体を選びます。書いている間は同じ位置の欄を淡い地の面にし、青い縁と淡い青の輪を出します。確定（小さい主操作）と取消（文字だけの操作）は一行・複数行とも欄の下に並べます。表示と編集で文字の大きさ・一行目の高さ・書き始めは変わりません。JavaScriptなしでは通常の入力欄として表示されます。",
  },
  {
    id: "composer",
    name: "Composer",
    description: "本文・添付・送信操作を一つの入力面にまとめる",
    usage:
      "標準form・Textarea・Buttonを使います。actionとmethodを利用側で指定し、attachmentsへFileInputや選択済みファイルを渡せます。busyは送信ボタンの重複操作を止め、errorは本文に関連付けます。送信・下書き保存は利用側が実装します。本文は書いた分だけ伸びます（field-sizingに対応するブラウザ）。toへ宛先、statusへ下書きの保存などの状態を渡すと、題名の行に並べます。editorへリッチテキストの編集部品（ProseMirror・Tiptapなど）やcontenteditableを渡すと、本文の欄と差し替えます。中の書く場所がどの深さにあっても、本文と同じ文字と行の高さ、紙全体の輪をかけ、段落や箇条の間を一定の間隔にそろえます。送信する値の受け渡しは編集部品の側で行います。",
  },
  {
    id: "picker",
    name: "Picker",
    description: "検索して候補から値を選ぶ",
    usage:
      "ComboboxControllerをcombobox、PickerControllerをpickerとして登録します。検索欄は送信せず、選択値を標準selectが送信します。multipleの選択表示と解除操作はTagのテンプレートを使います。JavaScriptなしでは標準selectを使えます。候補はoptionsへ渡し、非同期取得後はPickerController.replaceOptions()で更新できます。取得処理は利用側が担当します。tag.cssも読み込んでください。",
  },
  {
    id: "tag-input",
    name: "TagInput",
    description: "自由入力したタグを追加・解除する",
    usage:
      "TagInputControllerをtag-input、TagFieldControllerをtag-fieldとして登録します。選択表示と解除操作はTagのテンプレートを使います。Enterで追加、Backspaceと矢印キーでタグを移動・解除できます。送信値はJavaScriptの有無にかかわらずカンマ区切りです。カンマを含むタグは扱いません。tag.cssも読み込んでください。",
  },
  {
    id: "tree",
    name: "Tree",
    description: "中央の作業面で階層を開閉・選択する",
    usage:
      "TreeControllerをtree、TreePresentationControllerをtree-presentationとして登録します。親項目の開閉、矢印キー・Home・End・文字入力による移動、Enterによる選択を使えます。選択はtree:changeで利用側が受け取り、画面全体の移動にはCommandMenuを使います。空のitemsは状態文を表示し、重複するvalueは全階層を通じて最初の項目だけ残します。",
  },
  {
    id: "table-of-contents",
    name: "TableOfContents",
    description: "長い資料の見出しへ移動し、現在地を示す",
    usage:
      "長い資料の本文冒頭に置く番号付きの目次です。sectionsで見出しと本文を渡し、level=3で小見出しを一段下げます。最初の項目がlevel=3でも、親見出しのない0.1にはせず見出し2として表示します。通常のページ内リンクとして動き、TableOfContentsControllerをtable-of-contentsとして登録するとスクロール位置に応じて現在地を示します。各idはページ内で一意にします。",
  },
  {
    id: "chart-frame",
    name: "ChartFrame",
    description: "集計の図と数値表を一緒に読む",
    usage:
      "graphicには利用側で描いた図、tableには同じ値の表を渡します。図は読み上げ対象から外し、数値表は見出しから開いて確認できます。広い集計図にはsize=wideを指定します。descriptionには図の要点を書きます。描画ライブラリや集計処理は含みません。",
  },
  {
    id: "hover-card",
    name: "HoverCard",
    description: "対象の概要と関連操作を近くに表示する",
    usage:
      "HoverCardControllerをhover-cardとして登録します。hover・focusでプレビューを開き、Escapeや見出し横の閉じる操作で戻します。本文構造はPopover・Dialogと共通です。関連操作がある場合だけactionsを渡します。hrefを指定すると移動リンクと明示的なプレビューボタンを並べます。短い非対話的な補足にはTooltipを使います。",
  },
  {
    id: "toggle-group",
    name: "ToggleGroup",
    description: "関連する状態を一つまたは複数切り替える",
    usage:
      "ToggleGroupControllerをtoggle-groupとして登録します。単一・複数選択と矢印キー移動に対応し、変更はtoggle-group:changeで利用側へ渡します。URLで一覧を切り替える用途にはFilterBarを使います。",
  },
  {
    id: "code-block",
    name: "CodeBlock",
    description: "設定や短いコードを改行を保って読む",
    usage:
      "codeとlabelを渡します。tokensに改行を含むcontentとcolorの配列を渡すと色分けできます。例ではサーバー側のShikiを使いますが、ライブラリに整形器やハイライターの依存はありません。tokensの全文がcodeと異なるときは元のcodeを表示します。HTMLも必ず文字としてエスケープします。copyを付ける場合はClipboardControllerをclipboard、CodeBlockControllerをcode-block、ToastControllerをtoastとして登録してください。表示した全文をコピーし、成功・失敗を伝えます。長い行と長いコードはコード領域内でスクロールでき、JavaScriptがない場合も読めます。",
  },
  {
    id: "keycap",
    name: "Keycap",
    description: "キーボード操作の表記を揃える",
    usage: "表記のみのコンポーネントです。ショートカット自体は利用側で接続します。",
  },
  {
    id: "divider",
    name: "Divider",
    description: "意味のある区切りと見出しを置く",
    usage: "単なる余白調整には親のgapを使います。内容の区切りがある時だけ配置します。",
  },
  {
    id: "filter-menu",
    name: "FilterMenu",
    description: "候補を打って絞り込みながら選ぶ、青の面の小さな紙",
    usage:
      "ラベル付けや担当の割り当てのように、候補を打って絞り込みながら選びます。見た目はDropdownMenuと同じ青の面で、中に文字の欄を持つため、メニューではなくコンボボックス（絞り込みの欄）とリストボックス（候補）の組み合わせにしています。FilterMenuControllerをfilter-menuとして登録します。開くと絞り込みの欄へ移り、打った文字で候補を絞り、上下の矢印で移ってEnterで選びます。multipleなら開いたまま選んだ印を切り替え、そうでなければ選ぶと閉じます。選ぶたびにfilter-menu:select（valueとselected）を出し、nameを渡すと選んだ値を隠し入力で送ります。createLabelを渡すと絞り込みの欄の隣に作る操作を置き、押すとfilter-menu:create（打った文字）を出します。候補にはicon・shortcut・disabledを添えられます。",
  },
  {
    id: "setting-list",
    name: "SettingList",
    description: "名前と行の終わりの操作を点線でつなぐ設定の行",
    usage:
      "名前（太字）と淡い補足を始まりの側に、Switch・チェック・役割の丸などの操作を終わりの側に置き、その間を淡い点線でつなぎます。点線は余った幅いっぱいに引き、狭くても1.5remは残します。行の間に罫線は引きません。leadingに人の円や印を渡すと名前の前に置きます。公開範囲・通知・人の役割のような、名前ごとに一つの操作が付く設定に使います。",
  },
  {
    id: "back-link",
    name: "BackLink",
    description: "一つ上の場所へ戻るだけのピル",
    usage:
      '淡い青の面に左向きの印と太字の名前を置いたピルで、一つ上の場所へ戻ります。tone="plain"は面を持たない太字の文字で、shortcutでキーの印を添えられます（キーの登録は利用側）。階層を並べて見せる時はBreadcrumbを使います。右から左に読む時は印の向きを変えます。',
  },
  {
    id: "action-dock",
    name: "ActionDock",
    description: "下に浮かぶ、印・名前・キーの印を並べた操作の棚",
    usage:
      "白い紙を下の中央に浮かべ、ActionTileを横に並べます。棚の中のタイルは浮き上がりを消して平らにし、指を載せた時だけ淡い面を出します。itemsはActionTileと同じ指定で、hrefでリンク、無ければボタンになります。shortcutでキーの印（登録は利用側）、badgeで「下書き」のような状態の札を印の上に重ねます。placementはsticky（置いた場所の下端に留める、既定）とfixed（画面の下に浮かべる）です。狭い場所では横にスクロールします。",
  },
  {
    id: "text-editor",
    name: "TextEditor",
    description: "書式の道具を並べた書く面",
    usage:
      '書式の道具（太字・斜体・取り消し線・リンク・見出し・引用・コード・箇条書き・番号・添付・元に戻す・やり直す）を並べた書く面です。見た目と道具の並びだけを持ち、特定のエディターには依存しません。editorに任意のリッチテキストのエディターが描く書く面（contenteditableの要素）を渡し、道具のボタンのdata-text-editor-tool（bold・italic・link・bulletsなど）を読んでエディターの操作を呼びます。今の書式の道具にはdata-active="true"を付けると淡い青の面を出します。editorを渡さなければtextareaを置き、その時の道具は見た目だけで働きません。toolsで道具を選び、"|"で区切りを入れます。placementはtop（既定）とbottom（道具を下に置く）で、actionsに送る操作を並べます。Composerのeditorにも入れられます。',
  },
  {
    id: "copy-field",
    name: "CopyField",
    description: "写して使う値の欄と、写す丸い印",
    usage:
      "公開リンクや招待リンクのような、写して使う値の欄です。読み取り専用の欄の終わりに写す操作の丸い印を置き、写すとペンで描くチェックに変わって、しばらくして元に戻ります。写す動きはClipboardController（clipboard）、結果の表示と読み上げはCopyFieldController（copy-field）が持つので、両方を登録します。クリップボードを使えないブラウザでは写す操作を隠します。欄にフォーカスすると値を全て選ぶので、キーボードでも写せます。actionsに作り直す操作などを添えられます。",
  },
  {
    id: "split-button",
    name: "SplitButton",
    description: "主操作と、ほかのやり方を選ぶ▾をつなげたピル",
    usage:
      "主操作と、ほかのやり方を選ぶ▾を一つのピルにつなげます。主操作は共通Button（type・name・valueなどのButtonの指定をそのまま渡します）、▾は共通DropdownMenuのアイコンだけの操作で、itemsはDropdownMenuと同じ指定です。見た目だけを一体にし、向き合う側の角を落として間に細い区切りを入れます（塗りの操作では白、控えめな操作では墨）。variant・size・disabledは両方にかかり、busyは主操作だけにかかります。選んだやり方はdropdown-menu:selectで受け取ります。",
  },
  {
    id: "date-time-range",
    name: "DateTimeRange",
    description: "開始と終了の日時を矢印でつないだ枠",
    usage:
      "開始と終了の日付と時刻を淡い面の一つの枠に並べ、矢印でつなぎます。日付と時刻の欄は共通のDateField・TimeField（date-field・time-fieldのcontroller）です。nameを頭にして`[start_date]`・`[start_time]`・`[end_date]`・`[end_time]`・`[all_day]`で送ります。allDayで終日のSwitchを入れ、終日の間は時刻の欄を隠します。timezoneを渡すと地球の印とタイムゾーンを添えます。狭い場所（26rem未満）では開始と終了を縦に積み、矢印を下に向けます。開始と終了の前後関係の確かめは利用側で行います。",
  },
  {
    id: "dial",
    name: "Dial",
    description: "周りの目盛りから一つを選ぶ、金属のつまみ",
    usage:
      "押す物と同じ陰影の金属のつまみの周りに目盛りの値を並べ、一つを選ぶとつまみの針がその値へ回ります。値は左下から時計回りに右下まで270度の弧に等しく並べ、3〜8個を想定します。実体は一つを選ぶラジオボタンの束なので、送信・矢印キーでの操作・読み上げは標準のまま使えます。選んだ値は青い太字にします。unitでつまみの下に単位を添え、disabledで全体を使えなくします。値が多い時や細かい数を選ぶ時はRangeを使います。",
  },
  {
    id: "inline-select",
    name: "InlineSelect",
    description: "文の中の語を押して選ぶ選択",
    usage:
      "「30分前に知らせる」のように、文の中の語を押して選びます。実体は標準のselectで、前後の文と同じ大きさ・行高のまま、選べる語を青い太字にして小さな▾を添えます。下線は引かず、指を載せると淡い青のピルの面を出します。幅は選んだ語に合わせます。labelは読み上げの名前で、何を選ぶかを短く書きます。欄を並べずに、設定を一つの文として読ませる時に使います。",
  },
  {
    id: "optional-fields",
    name: "OptionalFields",
    description: "必要な時だけ足す欄と、足せる項目のチップ",
    usage:
      '予定のリンク・場所・招待・メモ・繰り返しや、検索の条件のように、必要な時だけ欄を足します。足せる項目を細い縁のピルのチップで並べ、押すとその欄が現れてチップは消え、欄の最初の入力へ移ります。OptionalFieldsControllerをoptional-fieldsとして登録します。足すたびにoptional-fields:add（id）を出します。値が入っている項目はopenで最初から出します。layout="stack"はチップを縦に並べ、検索の条件を足す列にします。',
  },
  {
    id: "prompt",
    name: "Prompt",
    description: "問いを層の見出しに置き、答えの行を紙に並べる問いかけ",
    usage:
      "判断を依頼する問いかけです。LayerCardそのものの形で、questionを淡い青の層の見出しに、choicesを白い紙の中の行に置きます。行は円の印・太字の要点（title）・淡い説明（description）・進む矢印で、指を載せると淡い青の面と青から紫の印、押すと内側へへこみます。hrefを渡すと移動のリンク、無ければnameとvalueを送る送信のボタンになります（フォームは利用側）。dismissは見出しの行の終わりに置く、選ばずに閉じる操作です。pointerで層の下に尾を付け、すぐ下の対象を指します（尾は層の外に出るので、下の物との間を16px以上空けます）。行は複数行の文を持つ専用の操作で、文字の指定はprompt.cssが持ち、文字位置の検査に登録しています。",
  },
  {
    id: "reactions",
    name: "Reactions",
    description: "同じ絵文字をまとめ、付けた人数を添えた反応の札",
    usage:
      "itemsは反応ごとに一件で、content（絵文字や短い言葉）とby（付けた人の名前の並び）を渡します。同じcontentは一枚の札にまとめ、byの人数を数として添えます。別々の人が同じ絵文字を付けた時は、その札のbyに名前が加わり、数が増えます。自分も付けている札はmineで淡い青の面・青い縁・青い数にします。nameは読み上げの名前で、読み上げは「いいね：田中 遥、佐藤 健」のように付けた人まで読みます。addを渡すと札は押せるボタンになり、自分の札を押すと外し、他の人の札を押すと自分も付けます。数が0になった札は消えます。終わりに「リアクションを追加」の操作（Tooltipで名前を出します）を置き、Popoverで短い言葉の欄（16文字まで、開いた時に移ります）とEmojiPickerを開きます。板の見出しは読み上げだけに残します。選んだ絵文字や書いた言葉は、同じ札があればそこへ自分を加え、なければ新しい札を作ります。付け外しはreactions:toggleで内容とselectedを知らせるので、保存は利用側で行います（ReactionsControllerをreactions、EmojiPickerControllerをemoji-pickerとして登録します）。add.meは自分の名前（既定は「自分」）です。addがない時は読むだけの札です。",
  },
  {
    id: "search-results",
    name: "SearchResults",
    description: "題名・抜粋・補足を並べ、一致した語を強調する検索の結果",
    usage:
      '罫線を引かずに行間で区切り、題名（墨の太字、指を載せると青）・抜粋（二行まで）・淡い補足を積みます。queryを渡すと、題名と文字で渡した抜粋の中の一致した語を、文中の強調（mark）と同じ淡い黄の面で示します（大文字と小文字は区別しません）。leadingに人の円や種類の印を渡すと始まりの側に置きます。条件を足す列は、OptionalFieldsのlayout="stack"をページの側に並べます。',
  },
  {
    id: "profile-header",
    name: "ProfileHeader",
    description: "大きな人の円と名前、この人への設定の帯",
    usage:
      "大きな人の円・太字の大きな名前・淡い補足を中央に積み、badgeを始まりの側の上の角、actionsを終わりの側の上の角に置きます。preferencesには、この人への設定（通知・振り分け・メモなど）のDropdownMenuやButtonを渡し、名前の下の灰色の帯に面を持たない形で並べます（狭い場所では折り返します）。名前の見出しの段はheadingLevel（既定はh1）で決めます。",
  },
  {
    id: "countdown",
    name: "Countdown",
    description: "期限や残りを大きな数で示す丸い印",
    usage:
      "白い丸に大きな太い数を置き、beforeを数の上、afterを数の下に小さく添えます。役割の色（tone、既定はwarning）の細い輪で縁取り、紙の影で浮かせます。labelは読み上げの全文です。カードの縁にまたがせる時は、置く側で位置を決め、はみ出す分の余白を置く側で取ります。数の比べや集計はStatistic、状態の短い言葉はBadgeを使います。",
  },
  {
    id: "emoji-picker",
    name: "EmojiPicker",
    description: "絵文字を探して選ぶ板",
    usage:
      "idは必須です。上の探す欄（InputGroup）に打った言葉で、絵文字の名前とkeywordsを絞ります。groupsで種類ごとの絵文字（emoji・name・keywords）を渡し、渡さなければ反応によく使う40個（defaultEmojiGroups）を並べます。格子の中は矢印で移り（右から左に読む時は左右が逆になります）、Home・Endで端へ、押すかEnterで選びます。Tabで格子へ入る所は一か所だけです。選ぶとemoji-picker:pickで絵文字と名前を知らせます。板そのものは開閉を持たないので、Popoverの中に置くか、ページにそのまま置きます。Reactionsの追加の操作はこの板をPopoverで開きます。",
  },
] satisfies readonly (ComponentEntry & { usage: string })[];
