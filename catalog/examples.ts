// カタログの表示内容。独立した仕様形式や検証用スキーマとしては扱わない。
export const examples = [
  {
    id: "surface",
    name: "Surface",
    description: "中央の白い作業面。外側の配置は親のContainerが持ちます。",
    html: '<section class="ply-surface"><div class="ply-surface-body">作業の内容</div></section>',
    usage:
      "ContextBarはply-surface-bodyの前に置きます。狭い配置では内側の余白が縮みます。data-kind=panelは補助面、data-tone=warm・coolで設定やプレビューの面を区別します。",
  },
  {
    id: "context-bar",
    name: "ContextBar",
    description: "現在の位置と関連する移動・操作を、作業面の上部にまとめます。",
    html: '<nav class="ply-context-bar" aria-label="現在の位置"><ol class="ply-breadcrumb"><li><a href="/">一覧</a></li><li><span aria-current="page">編集</span></li></ol></nav>',
    usage: "移動にはリンク、操作にはbuttonを使います。領域全体にrole=menuを付けません。",
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
      "通常・compactは文字0.875rem・行高20/14、largeは文字1rem・行高1.5です。画面幅で文字サイズは変わりません。通常・compactの高さは文字の16/7倍、largeは文字の2.5倍です。左右余白は通常0.75em・compact0.5em・large0.85em。文字14px時の通常の高さは32px相当です。上のHono例は通常・compact・largeの順です。data-variantはprimary・secondary・danger・link。Iconは文字の前後に配置でき、components/icon.cssと共通SVGスプライトも読み込みます。アイコンだけの操作はdata-icon-only=trueで正方形にし、aria-labelで操作名を付けます。titleはマウス向けの補助で、aria-labelの代わりにはしません。処理中はアイコンを含む内容を処理中文言に置き換えます。data-busy=true、disabled、aria-busy=trueを併記します。移動にはhrefを持つaを使います。",
  },
  {
    id: "field",
    name: "Field",
    description: "ラベル・入力・補足・エラーを関連付けます。",
    html: '<div class="ply-field"><div class="ply-field-heading"><label for="title">記事名</label></div><input class="ply-input" id="title" name="title" aria-describedby="title-help"><div class="ply-field-messages"><p class="ply-field-help" id="title-help"><svg class="ply-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><use href="/assets/ply-icons.svg#ply-info" /></svg><span>一覧に表示する名前です。</span></p></div></div>',
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
    html: '<aside class="ply-notice" data-tone="info" aria-label="保存について"><p>保存すると変更が反映されます。</p></aside>',
    usage:
      "data-toneはinfo・success・warning・danger。動的な通知の読み上げや寿命は利用側で扱います。重大なエラーを自動消去しません。",
  },
  {
    id: "table",
    name: "Table",
    description: "数値・短い状態・長文を列の役割に合わせて表示します。",
    html: '<div class="ply-table-scroll" role="region" aria-label="売上" tabindex="0"><table class="ply-table"><caption>売上</caption><thead><tr><th scope="col">商品</th><th scope="col" data-cell="numeric">金額</th></tr></thead><tbody><tr><th scope="row">暮らしの記録</th><td data-cell="numeric">¥1,200</td></tr></tbody></table></div>',
    usage:
      "スクロールは表の領域内に限定します。数値列はdata-cell=numeric、短い値はshort、長文列はtext。",
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "変更前後を対応させて確認します。",
    html: '<section class="ply-comparison" data-changed="true" aria-label="記事名"><h3>記事名 <span>変更あり</span></h3><div class="ply-comparison-pair"><div><h4>現在</h4><p>暮らしの記録</p></div><div><h4>変更後</h4><p>毎日の暮らしを整えるための記録</p></div></div></section>',
    usage:
      "広いコンテナでは並列、狭いコンテナでは現在→変更後の順に積みます。差分判定は利用側です。",
  },
  {
    id: "value-list",
    name: "ValueList",
    description: "現在値を補足より明確に表示します。",
    html: '<dl class="ply-value-list"><div><dt>状態</dt><dd>公開中<p>変更内容は確認後に反映されます。</p></dd></div></dl>',
    usage: "値の0と未登録を区別します。数値や日時の書式は利用側で決めます。",
  },
  {
    id: "file-item",
    name: "FileItem",
    description: "既存ファイルの名前と状態を示します。",
    html: '<div class="ply-file-item" data-state="error"><p><strong>資料_2026年版.pdf</strong></p><p>送信できませんでした。もう一度選択してください。</p></div>',
    usage: "名前は折り返します。data-stateはready・pending・error。状態を文言でも説明します。",
  },
  {
    id: "image-frame",
    name: "ImageFrame",
    description: "比率を保って画像を比較します。",
    html: '<figure class="ply-image-frame" data-shape="portrait" data-fit="contain"><img src="/assets/sample-cover.svg" alt="暮らしの記録の表紙"></figure>',
    usage:
      "portraitは5:7・幅上限8rem。squareは1:1、landscapeは16:9・16rem。containは全体表示、coverは切り抜きです。",
  },
  {
    id: "disclosure",
    name: "Disclosure",
    description: "補足を標準HTMLで開閉します。",
    html: '<details class="ply-disclosure"><summary>詳しい条件</summary><div><p>内容を確認してから操作してください。</p></div></details>',
    usage: "JavaScriptは不要。初期表示を開くときはopen属性を指定します。",
  },
  {
    id: "progress",
    name: "Progress",
    description: "確定または不確定の進行状況です。",
    html: '<label class="ply-progress"><span>処理中：60%</span><progress value="60" max="100">60%</progress></label>',
    usage:
      "進捗不明ならvalueを省略します。表示値を経過時間から捏造しません。Honoのvalueは0〜maxに収め、有限でない値は未確定にします。maxの初期値は100、不正なmaxはnativeと同じ1です。labelの文言は利用側で値に合わせます。",
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
    html: '<ul class="ply-data-list"><li><div><strong>暮らしの記録</strong><p>2026年9月更新</p></div><div><span class="ply-badge" data-tone="info">確認待ち</span></div></li></ul>',
    usage: "狭幅では順序を保って積みます。長文を省略せず、意味を保って折り返します。",
  },
  {
    id: "action-list",
    name: "ActionList",
    description: "作業の入口を、一覧や内容の見えるカードで示します。",
    html: '<ul class="ply-action-list"><li><a href="/example"><span>記事を編集する</span><small>内容と公開設定を変更します。</small></a></li></ul>',
    usage:
      "移動する内容を動詞で示します。data-layout=gridで道具の入口を並べられます。accentはyellow・blue・green・violetで用途を区別し、状態色には使いません。カード内にボタンなど別の操作を入れません。データ行に操作が付く場合はDataListを使います。",
  },
  {
    id: "empty-state",
    name: "EmptyState",
    description: "情報がない理由と次の行動を示します。",
    html: '<div class="ply-empty-state"><p><strong>該当する記事はありません</strong></p><p>検索条件を変更してください。</p></div>',
    usage: "0件と検索エラーは区別します。架空の件数を表示しません。",
  },
] as const;
