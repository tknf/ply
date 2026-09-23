# カタログと操作部品の再確認（2026年9月16日）

## 修正した問題

| 対象                       | 問題                                                                                                  | 修正                                                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 全56ページのHTML・Hono JSX | HTMLが1行で、色分けもコピー操作もない                                                                 | 実際の表示に使うHTMLを整形し、112個のコード例を着色する共通CodeBlockへ変更                                                                                    |
| コピー結果                 | 結果の1行が後から増え、見出しとコードの位置が動く                                                     | 共通Toastで通知する。成功・失敗・再コピー・通知を閉じる前後で、見出し・ボタン・コード・外枠の座標と寸法を比較                                                 |
| コピー結果の継続           | 成功と失敗を同じように扱う                                                                            | 成功は4秒、hover/focus中は保持。失敗は手動で閉じるまで保持。コピー通知は重ねず、Escでも閉じられる                                                             |
| CommandMenuの見出し        | 裸のショートカット記号と小さい閉じるアイコンが混在                                                    | 見出しと共通Buttonの「閉じる」を並べ、キーの案内は共通Keycapと動詞で示す                                                                                      |
| CommandMenuのキー操作      | 検索欄からTabで候補へ移ると矢印操作が止まる                                                           | 候補にフォーカスがある場合も矢印・Home・Endを扱い、選択とフォーカスを同期する。WebKitでもリンクをTabで辿れるよう明示                                          |
| CommandMenuの実行例        | 操作イベントを発火するだけで結果を見せていない                                                        | 受け取った値をカタログのoutputへ表示。無効項目を含む候補の移動・実行・閉じた後のフォーカスを確認                                                              |
| リストの角丸               | CommandMenuはピル型、Navigationは8px                                                                  | 区別の根拠がなかったため、CommandMenuの移動先と操作の両方を共通の8pxへ統一                                                                                    |
| ContextBar                 | 現在地とリンクだけで、実際の操作の組み合わせが足りない                                                | 9つの状況、11個のContextBarを掲載。主要操作、Dialog、外部フォームのsubmit/reset、接続Dropdown、前後移動、処理中・権限なし、狭いSurface、長い識別子、RTLを含む |
| Breadcrumb                 | 空白のない長い現在地が操作を押し出す                                                                  | 文字側の最小幅を0にし、文字を折り返す。区切り記号は縮めない                                                                                                   |
| コードの文字色             | 淡い背景では一部の色が4.5:1を下回る                                                                   | コード面を白にし、表示に使う着色文字のコントラストを3エンジンで測定                                                                                           |
| 閉じたコード欄             | DatePicker・DropdownMenuのページで約1万個の着色spanを常に持ち、WebKitの操作検証が30秒で時間切れになる | 着色コードをtemplateに入れ、Disclosureを開く時に展開。同じ2件が2.0秒・0.8秒で通る。JavaScriptなしではnoscriptの整形済みコードを読める                         |

同色の連続トークンをまとめ、空白だけの着色spanも省いた。表示する文字とコピーする全文は変えない。トークンの結合結果が元コードと違う場合は元コードを表示する。

## 全コンポーネントの確認範囲

全56部品に対して、375px・1280px、文字200%、IDの重複と参照先、入れ子、CSSの読み込み順、RTLの検証を行う。各ページのHTML・Hono JSXは、見出しの開閉、改行、着色、HTMLを実行せず文字として扱うことを確認する。

| 領域         | 対象                                                                                                                                 | 操作・状態で確認する点                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| 作業面と移動 | AppShell、CommandMenu、SplitView、Section、Surface、ContextBar、PageHeader、Breadcrumb、Navigation、Tabs、Pagination、Steps、Divider | 中央の作業面、現在地、折り返し、局所幅、フォーカス、移動・操作の区別                               |
| 入力と選択   | Field、FieldGroup、InputGroup、Switch、Range、Suggestion、DatePicker、FileInput、FilterBar                                           | 名前と説明の参照、入力値、無効状態、枠内の末尾操作、文字位置、範囲と候補                           |
| 操作と補足   | Button、Toolbar、DropdownMenu、Dialog、Popover、Disclosure、DangerZone、Keycap                                                       | 共通Buttonの文字指定、操作状態、閉じた後の戻り先、Disclosureの連続・単一展開・入力保持             |
| 内容と一覧   | Card、Message、MessageList、Table、ValueList、DataList、ActionList、FileItem、ImageFrame、Comparison、Avatar、Tag、Icon、CodeBlock   | 長文・欠損・入れ子、列の揃い、表の並び替えと選択、タグの縦横の間隔、コピー結果、独立したスクロール |
| 仕事と予定   | TaskList、Timeline、Calendar、Board、Statistic                                                                                       | キーによる完了切替、予定の横スクロール、任意の内容を持つカードの列間移動と取消                     |
| 状態と結果   | Badge、Notice、ErrorSummary、EmptyState、Progress、Loading、Toast                                                                    | 意味を持つ文言、0・不定・完了、入れ子の色、通知と操作の配置、動きを減らす設定                      |

これは全アプリ機能の実装完了や、全状態の見た目の受け入れを意味しない。stimulus-uiの利用・継承は15/38種類で、未対応は[対応表](../stimulus-ui-coverage.md)へ分けて記載している。

## 実画面と測定の区別

今回の目視確認は、このMacのChromeでCommandMenu・ContextBar・CodeBlockを対象に行った。CommandMenuは実際にCmd+K、Tab、矢印、End、Enterを押し、選択結果と戻り先を確認した。コピー前後の見出し・ボタン・コード・外枠は同じ座標と寸法だった。

全56部品を対象とする配置・参照の検証と、上記3部品の目視確認を区別する。Button・Inputの字形は、既存の14px／16px・タッチ44pxのピクセル検査を使用した。Windows・Android・iOS実機やスクリーンリーダーの実機確認は含まない。

画像は[今回の保存先](../references/command-code-context-20260916/README.md)へ原本のまま保存する。途中段階と失敗時の画像も区別して残す。外部サービスの再撮影は行っていない。

## 最終検証

- `vp run check`：型・lint・formatと65 CSSの規約検査が成功。
- `vp run test`：14ファイル、107件が成功。
- `vp run test:visual test/browser/command-menu.spec.ts test/browser/context-bar.spec.ts test/browser/code-block.spec.ts test/browser/catalog-disclosure.spec.ts`：Chromium・Firefox・WebKitで57件が成功。全56ページ・112個のコード例を含む。
- `vp run test:visual test/browser/feedback-refinements.spec.ts --project=webkit --grep '入力内|主操作'`：コードの遅延展開後、時間切れだった2件が成功。
- `code-block`のコントラスト検査：3エンジンで成功。既定の白背景で4.5:1以上。
- `vp run build`：85ページを生成。`vp run check:package`で公開入口・型・56件の掲載コード・配布CSS・アイコンを確認。
- `vp run docs:spacing`：65 CSS・570宣言・93箇所の配置を記録。

途中の広範囲な走行は127成功・3失敗・2スキップだった。コピー通知、コードの横スクロール、WebKitの時間切れを修正して対象を再実行した。上記の最終結果と途中の失敗画像を混同しない。

## 実装資料

- 全余白の値と採用理由：[余白の全件監査](../spacing-audit.md)
- APIとcontroller登録：[移行資料](../migration.md)
- 整形器のAPI：[Prettier API](https://prettier.io/docs/api)
- HTMLの文中空白：[Prettierの空白の扱い](https://prettier.io/docs/options#html-whitespace-sensitivity)
- サーバーでの着色：[Shiki](https://shiki.style/guide/install)
