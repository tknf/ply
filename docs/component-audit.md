# コンポーネント全体の判断と再構築

2026年9月15〜16日。対象はカタログの全56分類と、Field配下の公開入力コンポーネント。Buttonだけを受け入れ済みの方向として扱い、その文字位置と控えめな立体感を維持する。他のコンポーネントの受け入れを検査の成功から推定しない。

## 採用基準

メール、CRM、プロジェクト、資料、財務、チャットで、同じ役割の文字・余白・状態・操作を一括して管理する価値があるものをコンポーネントにする。JavaScriptの有無では決めない。特定の業務名、架空の保存機能、装飾だけの変種はコンポーネントを増やす理由にしない。

## 削除・統合・整理するもの

| 対象                                           | 判断                   | 今回の扱い                                                                                                        |
| ---------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ContextBarの独自パンくず                       | Breadcrumbへ統合       | 統合済み。最後の項目だけが現在地になる                                                                            |
| 各コンポーネントに重複したボタンの文字指定     | 共通Buttonへ統合       | DatePickerの専用文字指定も除去。DropdownMenuの上揃えに必要な対称余白だけを残す                                    |
| FieldやButtonのCSSに混じった文章編集・保存デモ | ライブラリ本体から外す | catalogへ移動。コンポーネントの基準に混ぜない                                                                     |
| 表示例と別管理していたHTML見本                 | 同じSSR出力へ統合      | カタログは一つの実表示、そのHTML、Honoの呼び出しコードを掲載する                                                  |
| ActionListという名前                           | LinkListへの改名を提案 | 中身は移動リンク。互換性のため公開名は維持する                                                                    |
| 現在のCombobox                                 | APIの整理を提案        | 候補付き自由入力はSuggestion、選択肢を限定するならSelectを推奨。現APIは削除せず、文字・候補・状態を共通基準へ移す |
| Notice / DangerZone                            | 残す                   | 継続して読む案内と、重大な操作の影響説明には共有する構造がある。常設説明をすべてNoticeへ入れない                  |

独立した56の役割を、数を減らす目的だけで削除しない。重複する実装と、意味の紛らわしいAPIを整理する。

## 追加を勧めるもの

| 優先度 | コンポーネント               | 必要な理由と境界                                                                                                                   |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 高     | 検索して選択するPicker       | 担当者、顧客、宛先、資料を選ぶ。表示名と送信値、単一・複数選択、非同期候補、選択解除を扱う。自由入力のSuggestionとは分ける         |
| 高     | Composer                     | メール・チャット・文書の入力面。本文、添付、送信・保存、処理中、エラーの配置を共有する。エディターエンジンと通信処理はアプリが選ぶ |
| 高     | 編集できるProperty行         | 担当者・日付・状態を値の位置で編集する。読む状態と編集状態の幅・フォーカス復帰を共通化する。ValueListへ独自イベントを詰め込まない  |
| 中     | 選択中の項目に対する一括操作 | Table・DataListで選択件数と処理対象を明示する。検索条件全体と現在ページの選択を区別する                                            |
| 中     | Chartの外枠・凡例・代替表    | 財務やCRMの集計を同じ文字と数値書式で読む。グラフ描画エンジン自体は再実装しない                                                    |
| 中     | Tooltip                      | アイコンや省略表示の短い補足。hoverだけに依存せずfocus・Escを扱う。重要な説明はTooltipに隠さない                                   |

上記の候補は、その後すべて追加した（Picker、Composer、EditableProperty、Tableの選択の板、ChartFrame、Tooltip）。部品は現在90種類。9月16日にBoardの列間ドラッグとTableの並べ替え・選択を追加した。リッチテキスト編集、巨大な表の仮想スクロールは未提供。

## 今回の変更一覧

| 分類               | 対象                                                                                                                                                                                             | 再構築の内容                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 作業面と移動       | AppShell、CommandMenu、SplitView、Section、Surface、ContextBar、PageHeader、Breadcrumb、Navigation、Tabs、Pagination、Steps、Divider                                                             | 中央の作業面。480pxの非モーダルな全体移動。現在地の単一管理。13〜14pxの局所移動と24pxのページ見出し。操作を自然幅で折り返す                                                              |
| 入力と選択         | Field、FieldGroup、InputGroup、Switch、Range、Suggestion、DatePicker、FileInput、FilterBar                                                                                                       | ラベル・補足・エラーの階層、6pxのラベル間隔、32/40pxの入力枠、候補行の密度、専用操作の文字指定、タッチ領域                                                                               |
| Field配下          | Input、Textarea、Select、Choice、PasswordField、CountedTextarea、Combobox、CheckboxGroup、NumberField、DateField、TimeField                                                                      | 共通入力CSSと局所クラスへ移行。パスワード操作は接続後に表示。入力値、境界、送信名、無効状態、リセット、候補選択を保持                                                                    |
| 操作と補足         | Button、Toolbar、DropdownMenu、Dialog、Popover、Disclosure、DangerZone、Keycap                                                                                                                   | Buttonの基準を保持。操作群の二重余白を除去。メニューの上揃え・多段・チェック。DialogとPopoverの外側をルート、内側をpanelへ統一                                                           |
| 内容と一覧         | Card、Message、MessageList、Table、ValueList、DataList、ActionList、FileItem、ImageFrame、Comparison、Avatar、Tag、Icon、CodeBlock                                                               | 一覧14/20px、補足13/20px。Cardの補足を近付ける。表と属性行を圧縮。会話と読む本文を分ける。Avatarへinline/large、Tableへ密度を追加                                                        |
| 仕事と予定         | TaskList、Timeline、Calendar、Board、Statistic                                                                                                                                                   | チェック・出来事・日付・状態列・集計値に別の構造を持たせる。補足と題名の比率、狭幅の折り返し、操作時の短い変化を調整                                                                     |
| 状態と結果         | Badge、Notice、ErrorSummary、EmptyState、Progress、Loading、Toast                                                                                                                                | 状態名、継続する案内、修正先、空の理由、測れる進捗、待機、結果通知を区別。小さな印・短い説明・近い操作を基本にする                                                                       |
| HEY・Fizzyから追加 | ProfileHeader、BackLink、OptionalFields、CopyField、Dial、InlineSelect、DateTimeRange、TextEditor、SplitButton、ActionDock、FilterMenu、SearchResults、SettingList、Reactions、Countdown、Prompt | 9月29日にHEYとFizzyの画面を見直して足した。Divider・ActionList・ActionTile・ToggleGroup・Timelineは拡張した。方針は[設計方針](design-system-direction.md#heyとfizzyから足した部品)に書く |

## クラス名への意見と結論

`.ply-button > .icon`の方向を採用する。コンポーネントの名前を内部の各部分へ繰り返す利点は薄く、構造が読みづらくなる。

ただし、`.icon`や`.body`単独のグローバルCSSは作らない。`.ply-card > .body`のように所有するルートと直下の関係を明示する。内部の独立したIconは`.ply-icon`、Buttonは`.ply-button`を持ち続ける。再帰するDropdownMenuの一覧も`.ply-menu`を独立したルートとして持つ。

全コンポーネントCSSを命名検査の対象にした。FieldGroupなど別の公開コンポーネントのルートを、Fieldの内部部分と混同して禁止しない。命名の移行ではHono・controller・検査を一緒に変える。

## 配置の一貫性

- Gridは列の対応があるところ。項目名と値、人物と本文、日付と内容。縮む列は`minmax(0, 1fr)`。
- Flexは内容の自然幅で並べるところ。操作群、分類名、件数。短い補足を端まで押し離すためだけに`space-between`を使わない。
- 文章は通常のblock。段落や補足の関係には`margin-block-start`。同列の子の間隔は親の`gap`。
- 入力・ボタンの内側はコンポーネント自身が所有し、親は外側の配置だけを持つ。
- Container queryはコンポーネントの利用可能幅で判断する。画面が広くても狭い配置なら折り返す。表・月カレンダーは必要な列の関係を保って領域内をスクロールする。

[実画面の測定値](references/measurements-20260915.md)、[設計方針](design-system-direction.md)、[HTMLの移行](migration.md)を併せて参照する。

## 追加した確認範囲

全件の[余白と採用基準](spacing-audit.md)、[stimulus-uiの全38種類の対応状況](stimulus-ui-coverage.md)を追加した。Tableの選択・並べ替え、Boardの列間移動、ButtonGroup・DisclosureGroup・TagGroupも追加した。
