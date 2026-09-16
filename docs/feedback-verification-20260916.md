# 9月15日夜のフィードバックへの対応と確認

9月16日更新。18枚の指摘画像、Disclosureの追加指摘、共有アイコンの大きさと例外禁止に対応した記録。検査の成功をデザインの受け入れ済みとは扱わない。

## 反映した変更

| 指摘               | 変更                                                                                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 入力内のボタン   | PasswordField・DatePicker・Comboboxの操作を入力境界から1px内側へ収めた。hoverと文字200%でも枠を越えない。                                                                               |
| 2 接続したDropdown | ButtonGroupを追加。主操作と矢印の枠を接続し、仕切りを1本にした。                                                                                                                        |
| 3・4 Disclosure    | 全幅の罫線を外し、24pxの開閉マークと本文の縦線で所属を示す。見出し16px/24px、本文14px/22px、集合の間隔4px。本文・説明・見出しの文字開始位置は32pxで揃える。                             |
| 5 MessageList      | 長文、件名・差出人・日時の欠損、添付だけ、画像の有無の混在、会話数、送信状態、閲覧不能、0件・読込・失敗を追加。日時の長さで本文列がずれないようにした。                                 |
| 6 Table            | 外端も左右12px。数値・日付・文字の三段階ソート、選択・全選択・Shift範囲、一括操作欄、フォーム送信・reset、固定見出し、密度、0件・読込・失敗を追加。manualはサーバー側ソートへの接続用。 |
| 7 ActionList       | アイコン・題名・説明・末尾の矢印の列を整理。アイコンがない行も文字の開始位置を揃えた。hoverで下線を追加しない。                                                                         |
| 8 FileItem         | アイコン・本文・操作をGridへ整理し、横と行内の上下は8px。名前と形式は4px。狭幅では操作を名前の下へ回す。                                                                                |
| 9 Comparison       | 一つの枠を左右で共有。両側とも12pxの内側余白。変更の有無で位置を変えず、入れ子は利用可能幅に応じて縦へ並べる。                                                                          |
| 10 Tag・全余白     | TagGroupを横6px・縦4pxにした。全65 CSSの567宣言、82箇所のカタログ配置と採用基準を別紙へ掲載。                                                                                           |
| 11 Calendar        | 予定の左borderを撤去し、淡い面で区別する。                                                                                                                                              |
| 12 Board           | 任意のHono Childを受け取る項目を追加。常設の持ち手、列間DnD、並べ替え、キーボード操作、取消・移動イベントを提供。内容内の入力状態は保持する。                                           |
| 13 Statistic       | 表示例の負号をASCIIの`-`へ変更。                                                                                                                                                        |
| 14 Badge           | 白い上部ハイライト、内側の陰影、1pxの影を追加。文字位置は維持する。                                                                                                                     |
| 15 Notice          | 白い共通枠と小さな状態印に再構成。本文と次の操作を同じ列へ置く。狭幅では本文を全幅へ回す。                                                                                              |
| 16 ErrorSummary    | 小さな状態印、題名、番号付きの修正先一覧へ再構成。既存のFieldのエラー文は維持。                                                                                                         |
| 17 EmptyState      | 検索0件・初回・完了ごとに共通の紙の図と次の操作を組み合わせる。狭幅では一列へ配置。                                                                                                     |
| 18 Toast           | closeをactionsから分離し、本文右上の独立した列へ配置。                                                                                                                                  |
| 共有アイコン       | 全20種をregular、標準1em・小型6em/7へ統一。名前で2種だけを判定する分岐は撤去済み。Stepsも文字のcheckから共有Iconへ移行。CSS用SVGとスプライトはすべて同じ素材・生成経路。                |

[余白の全件説明](spacing-audit.md)、[移行と公開API](migration.md)、[部品の採否と追加候補](component-audit.md)も参照。

## stimulus-uiの対応

導入済み`@tknf/stimulus-ui@0.1.0`の38controllerを型・実装と照合した。利用・継承は14種類で、全機能は網羅していない。[全38種類の対応表](stimulus-ui-coverage.md)に不足と優先順位を記載した。

Tableの方向・ARIA・選択状態は上流のTableSort/TableSelectを使う。Plyは行比較・移動と選択バーを接続する。ListReorderは単一リストの契約で列間移動を扱わないため、Boardを対応数へ含めない。

## 検証結果

| 確認                                      | 結果                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `vp run check` / `vp run check:css`       | format・lint・型・65 CSSの規約を通過                                     |
| `vp run test`                             | 13ファイル・105件成功。文字位置の回帰検査を含む                          |
| 共有アイコン統一後の表示・操作            | Chromium・Firefox・WebKitで115件成功、2件はWebKit専用検査の意図したskip  |
| 最後のSVG配信・check描画・MessageList修正 | 同3エンジンで12件成功                                                    |
| `vp run build`                            | 静的カタログ85ページを生成                                               |
| `vp run check:package`                    | 配布CSSとの一致、56例の公開型、スプライトと単独SVG20種・ライセンスを確認 |

表示・操作の実行コマンド：

```sh
vp run test:visual test/browser/feedback-refinements.spec.ts test/browser/component-redesign.spec.ts test/browser/control-text.spec.ts test/browser/catalog.spec.ts test/browser/dropdown-menu.spec.ts test/browser/date-picker.spec.ts --grep 'Disclosure|Table|Board|入力内|主操作|Toast|全56|部品CSS|アイコン|文字|メニュー|Dropdown|キーボードで月送り|複数行|先頭|上揃え'
vp run test:visual test/browser/control-appearance.spec.ts test/browser/feedback-refinements.spec.ts --grep 'アイコン|描画する|MessageList'
```

検査は375px・1280px、文字200%、RTL、入れ子、CSS読み込み順、タッチの操作寸法、キー操作とpointer操作を含む。全56部品を開いた状態の幅・参照IDも検査した。

実画面でcheckが消えていることを確認し、開発サーバーがCSS用SVGへ404を返す不具合を修正した。状態属性だけの検査では不十分だったため、全20素材のHTTP応答と、Checkbox内側のcheckの画素を確認する検査を追加した。

## 保存資料と確認の範囲

[今回撮影した22枚](references/ply-feedback-20260916/README.md)は、ツールから返った画像の元バイトを保存し、SHA-256を照合した。途中の不具合や切り出しに失敗した画像も残し、最終状態と区別する。[ユーザーの18枚](references/feedback-20260915/manifest.json)も原本のまま保存した。ClickUp・Basecamp・HEYの参照画像を撮り直してはいない。

実機のタッチDnDとスクリーンリーダーの読み上げは未確認。Tableの選択は表示中の行が対象で、巨大な表の仮想化・セル編集・列のドラッグ変更は未提供。Boardの移動結果の保存、メッセージやファイルの通信・権限は利用アプリが接続する。
