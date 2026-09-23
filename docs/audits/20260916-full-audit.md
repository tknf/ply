# Ply 全体監査報告

監査日：2026年9月16日<br>
監査開始時点：`bbcd1aef7c15aa9f89be9b43910c835188568399`（`main`）<br>
先行修正push：`7507b1a`（`main`）<br>
基準：当時の全体監査指示書、`AGENTS.md`

## 総評

現行のソース、SSR、CSS、配布物は一つの版として揃っている。56分類・Field配下の公開部品、64個のソースCSS、23個の公開controller、85経路を静的に照合し、P1に該当する阻害要因は見つからなかった。Buttonの文字指定、DropdownMenuの上揃え、中央の作業面、サイドバーを置かない構造も、ソース検査と自動画面検査で設計制約に反していない。

今回の監査では実画面の操作確認も実施した。PlaywrightのChromium・Firefox・WebKitで627件を実行し、625件成功、2件は既知の検出限界によるスキップ、失敗0件だった。CommandMenu、DropdownMenu、Disclosure、ActionList、DatePicker、Table、Board、Dialog、Toast、Suggestion、Fieldはブラウザ上でも主要な開閉・選択・移動・フォーカス復帰を確認した。全56分類の狭幅・文字200%・CSS順序・コントラスト・RTL・forced-colors・reduced-motionは自動画面検査で確認した。

一方、カタログ利用者が実際に踏むリンクと公開APIの説明には、P2の不整合が残る。旧検証記録の件数は汚染を招くため削除し、当時の検証値を[カタログ再確認記録](20260916-catalog-review.md)と本報告へ集約した。`/examples/contact`の未定義リンクは、ユーザー判断どおりexamples整備時まで保留している。

優先順は次のとおり。

1. Disclosureのカタログ例から未定義の`/examples/contact`を除去するか、例示用経路を追加する（examples整備時まで保留）。
2. `icon-manifest`のdeclaration生成警告を解消するか、安全性を配布検査へ明記する（P3、保留）。
3. ページ内リンクの到達性を自動検査へ追加する（P3、examples整備時まで保留）。

## 指摘一覧

| ID      | 重大度 | 状態     | 対象                 | 判定                                                                |
| ------- | ------ | -------- | -------------------- | ------------------------------------------------------------------- |
| AUD-001 | P2     | 保留     | カタログの内部リンク | `/examples/contact`がルート一覧に存在せず、3つの表示面から404になる |
| AUD-002 | P2     | 対応済み | ActionListの利用説明 | 旧色名の案内を現行の公開型へ修正した                                |
| AUD-003 | P2     | 解消     | 旧検証記録           | 汚染を招く旧記録を削除し、現行資料へ集約した                        |
| AUD-004 | P3     | 保留     | declaration生成      | `vp run build`は成功するが`icon-manifest`のCommonJS dts警告を出す   |
| AUD-005 | P3     | 部分対応 | SSR検査の境界        | ID検査は修正したが、ページ内リンクの到達性は検査しない              |

P1の指摘はありません。AUD-004とAUD-005は現時点の利用者阻害ではなく、次の変更で壊れ方を見逃しにくくするための保守課題である。

## UIの統一性とアクションの判定

デザイン不整合と主要アクションの不成立は、今回の確認範囲では0件だった。これは監査全体の指摘が0件という意味ではない。

- 上部中央のCommandMenuと中央の作業面を維持し、サイドバーを追加していない。
- Buttonの文字位置・状態色・フォーカス輪郭、DropdownMenuの上揃え、狭幅での折り返しを確認した。
- CommandMenu、DropdownMenu、Disclosure、DatePicker、Table、Board、Dialog、Toast、Suggestion、Field、FileInputの主要操作とフォーカス復帰を確認した。
- 全56分類について、375px・1280px、文字200%、RTL、forced-colors、reduced-motion、CSS読み込み順の自動検査を通過した。

なお、`/examples/contact`へのリンク切れは視覚デザインの不整合ではなく、examplesの未整備に属する導線上のP2課題としてAUD-001に残している。

## 監査で確認した指摘と対応

### AUD-001：Disclosure例の未定義リンク（P2）

- 対象：[`catalog/hono-examples/disclosure.tsx:35`](../../catalog/hono-examples/disclosure.tsx:35)、[`catalog/app.tsx:36`](../../catalog/app.tsx:36)
- 再現：`vp run build`後、`dist/catalog/components/disclosure/index.html`を開き、「問い合わせ先」のリンクを確認する。リンク先は`/examples/contact`だが、`dist/catalog/examples/contact/index.html`は生成されず、`app.request("http://audit.local/examples/contact")`は404を返す。
- 実際の範囲：同じリンクは`/components/disclosure`、`/review/components`、`/review/components/group-2`に現れる。85経路のSSRと静的HTMLを走査した結果、未解決のアプリ内経路はこの3箇所だけだった。
- 期待：カタログ内の操作例からは到達可能な例示ページへ移るか、例示用の連絡先フォームを同じ版で提供する。
- 影響：利用者がDisclosureの例から次の操作を試すと、カタログ内で作業が途切れる。公開ライブラリのruntimeではなく、配布前の利用例とドキュメントの信頼性に影響する。
- 根本原因の仮説：`disclosure.tsx`へリンクだけを追加し、`paths`と対応するHono routeを追加していない。
- 対応：examplesは現時点で整備対象外とし、リンクの削除・route追加・リンク到達性検査の追加を保留する。examples整備時にまとめて対応する。

### AUD-002：ActionListのaccent説明が公開型と不一致（P2）

- 対象：[`catalog/examples.ts:181`](../../catalog/examples.ts:181)、[`src/hono/types.ts:5`](../../src/hono/types.ts:5)、[`src/hono/action-list.tsx:11`](../../src/hono/action-list.tsx:11)、[`docs/migration.md:47`](../migration.md:47)
- 監査開始時の再現：`/components/action-list`の「使い方」に旧色名が表示され、`ActionListItem`の`accent`へ指定しても`ply/hono`の型でコンパイルできなかった。
- 実際：型と実装は`blue | green | amber | coral`で、移行資料も`yellow`を`amber`、`violet`を`coral`へ移すと定義している。現行のHono例は`amber`・`green`などを使用している。
- 期待：カタログの説明、型、CSS、実例が同じ値を案内する。
- 影響：カタログをAPIリファレンスとして使う利用者が、コンパイルできない値をコピーする。色の問題ではなく、公開APIの導入手順の不一致である。
- 根本原因の仮説：移行時に型・CSS・実例は更新したが、旧説明文字列を更新していない。
- 対応済み：説明を`blue・green・amber・coral`へ更新した。旧色名の互換移行注記は追加していない。

### AUD-003：旧検証記録の削除（P2、解消）

- 対象：旧件数と旧検証範囲を含む`docs/component-verification-20260915.md`と`docs/feedback-verification-20260916.md`
- 対応：両記録を削除し、当時のテスト件数・余白件数・controller対応は[カタログ再確認記録](20260916-catalog-review.md)、`docs/spacing-audit.md`、`docs/stimulus-ui-coverage.md`へ集約した。
- 影響：過去の途中結果を参照できなくなるが、現行値と異なる件数や、現行受け入れと混同される検証記述が残らない。参照画像などの証拠資産は削除していない。

## 保守上の課題

### AUD-004：icon-manifestのdeclaration生成警告（P3）

- 対象：[`package.json:34`](../../package.json:34)、[`src/hono/icon.tsx:1`](../../src/hono/icon.tsx:1)
- 再現：`vp run build`を実行する。ビルドは完了し85ページを生成するが、`rolldown-plugin-dts:fake-js plugin`が生成された`src/icon-manifest.json.d.ts`のCommonJS dts構文をbundleできないという警告を出す。
- 実際の影響：今回の`dist/hono/index.d.mts`は生成され、`vp run check:package`も成功したため、直ちに公開型が壊れているとは判定しない。ただし、declaration生成器やJSON型の扱いが更新されたときに、警告がエラー化する余地がある。
- 最小の修正方向：JSON importのdeclaration生成経路を現行のdts bundlerが扱える形へ揃え、警告なしの`vp run build`を受け入れ条件にするか、警告が安全である理由を配布検査へ明記する。

### AUD-005：ページ内リンクの到達性が自動検査の対象外（P3）

- 対象：[`test/ssr.test.tsx:248`](../../test/ssr.test.tsx:248)、[`scripts/check-package.mjs:27`](../../scripts/check-package.mjs:27)
- 実際：SSRテストは`paths`に列挙された85経路が200を返すことを確認するが、各HTML内の`href`・`action`の遷移先は確認しない。`check-package`は配布入口、CSS、型、56件の掲載コード、アイコンを確認するが、カタログリンクは検査しない。この境界がAUD-001を通過させた。
- 対応：`test/ssr.test.tsx:259`の重複ID抽出は属性境界を扱う正規表現へ修正した。ページ内リンクの到達性検査はexamples整備時まで保留する。
- 最小の修正方向：生成済みHTMLを属性境界を扱えるパーサーまたは限定した正規表現で走査し、route・静的asset・fragment・外部URLを区別してリンク到達性を検査する。

## 監査で確認できた範囲

詳細な56分類の行単位の目録は[`20260916-full-audit-inventory.md`](20260916-full-audit-inventory.md)に分けた。各行にHono入口、専用CSS、カタログ例、controllerまたはnativeの所有、静的確認と実画面確認の別を記録している。

| 横断対象     | 現行ソースから確認した事実                                                                                                                                    | 判定                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Hono公開入口 | 63モジュールを再export。`stylesheets`を除くruntime UI valueは73。`ButtonGroup`、`DisclosureGroup`、`TagGroup`、`TableSort`、`TableSelection`とField配下を含む | 静的・自動画面確認済み |
| CSS          | `src/css` 64ファイル、`catalog/catalog.css`を含む検査対象65ファイル。`src/hono/stylesheets.ts`の64項目に欠落・余計な項目なし                                  | 静的・自動画面確認済み |
| 余白         | `design/spacing-rationale.json`の65キー、`docs/spacing-audit.md`の現行値、生成元の対象が一致。現行は570宣言・93カタログ配置                                   | 静的・自動画面確認済み |
| controller   | Plyの公開入口23件。`@tknf/stimulus-ui@0.1.0`は38件で、利用・継承13件＋一部利用2件＝15件。native代替、独自実装、UIのみ、未対応を区別                           | 静的・自動画面確認済み |
| カタログ     | component groupは56 IDで重複なし、`catalog/hono-examples`も56ファイルで1対1。`check:package`で56例を配布型へコンパイル                                        | 静的・自動画面確認済み |
| SSR・配布    | 85経路が200、静的HTMLも85件。実IDの重複0、ARIA参照先の欠落0、ビルド内のCSS・JS・asset参照の欠落0。未解決routeはAUD-001のみ                                    | 静的・自動画面確認済み |
| 設計制約     | `src`と`catalog`にsidebar実装なし。CommandMenuは上部中央のグリッド、AppShellは中央workspace。Buttonの文字所有とDropdownMenuの上揃えは`check:css`を通過        | 静的・自動画面確認済み |

## 6種類の適用先

既存の`catalog/pages/app-patterns.tsx`は、部品の組み合わせを示す入口としては十分だが、業務処理の完了を示すものではない。保存・通信・権限・永続化をライブラリへ持ち込まない境界は妥当である。

| 適用先       | 現在組み合わせられる部品                                           | 監査で残った不足・境界                                                  |
| ------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| メール       | MessageList、Message、Tabs、Field、Textarea、Toolbar、FileItem     | Composer、宛先Picker、添付送信、送信失敗からの再送は追加候補            |
| CRM          | ValueList、Timeline、Field、Disclosure、Badge                      | 顧客・担当者Picker、Property行の編集、権限状態は追加候補                |
| プロジェクト | Board、Card、TaskList、Table、Calendar、Badge                      | 一括操作、保存・同期、可変ペインは利用アプリまたは追加部品の境界        |
| 文書         | FileItem、DataList、ActionList、Comparison、ImageFrame、Disclosure | preview・版比較の導線は組み合わせ可能だが、文書専用の編集・目次は未提供 |
| 財務         | Statistic、Table、Tabs、ValueList、Comparison                      | Chartの外枠・凡例・代替表が未提供。数値の業務計算は利用アプリの責務     |
| チャット     | Message、FileItem、Field、Textarea、ActionLink                     | Composer、メンション、添付、送信中・失敗からの復帰は追加候補            |

追加候補の優先順位は、既存資料の提案と現行の適用範囲が一致している。

- 高：検索して選択するPicker、Composer、編集できるProperty行。
- 中：選択中の項目に対する一括操作、Chartの外枠・凡例・代替表、Tooltip。
- 整理：ActionListは移動リンクの実体に合わせた名前変更を将来検討するが、現行公開名を削除しない。Comboboxは自由入力のSuggestionと選択限定のSelectを分けて案内する。

## 検証結果と未確認範囲

今回実行した基準検査は次のとおり。静的検査に加えて、実画面の表示・操作・フォーカスも確認した。

| Command                    | 結果                                                                    |
| -------------------------- | ----------------------------------------------------------------------- |
| `vp run check:css`         | 成功。65 CSSの規約とトークン参照を確認                                  |
| `vp run check`             | 成功。format、lint、型検査、CSS検査                                     |
| `vp run test`              | 成功。14ファイル、107件                                                 |
| `vp run build`             | 成功。ライブラリと静的カタログ85ページ。AUD-004の警告あり               |
| `vp run check:package`     | 成功。公開入口、配布型、56例、CSS、20アイコン、license                  |
| SSR静的crawl               | 成功。85経路、status 200。AUD-001の未解決リンクを検出                   |
| `vp run test:visual`       | 成功。Chromium・Firefox・WebKitで627件中625件成功、2件スキップ、失敗0件 |
| 手動ブラウザ確認（Chrome） | 成功。代表部品の表示、開閉、選択、移動、状態通知、フォーカス復帰を確認  |

初回の`vp run test:visual`では、現行のルート構成・Dialog名・Field IDと一致しない旧テスト前提、ファイル入力の曖昧なselector、読込直後のtransitionを取得する競合が8テストにあり、3ブラウザで24件の失敗として現れた。製品側の表示・操作不具合ではなかったため、現行DOM・契約に合わせてテストを修正し、全件を再実行した。

自動画面検査は、全56分類の375px・1280px・文字200%、CSS読み込み順、コントラスト、RTL、forced-colors、reduced-motion、主要操作を対象にする。手動確認ではCommandMenu、DropdownMenu、Disclosure、ActionList、DatePicker、Table、Board、Dialog、Toast、Suggestion、Fieldを代表として、状態遷移とフォーカス復帰を再確認した。FileInputを含むその他の状態は自動検査で確認した。

未確認または保留の範囲は次のとおり。

- 全56分類の全状態を、人手で一つずつ目視して承認したものではない。自動検査のスクリーンショットは取得したが、固定画像との差分判定を受け入れ条件にはしていない。
- 実際のスクリーンリーダー音声、物理IME、利用者固有のブラウザ拡張との組み合わせは対象外である。キーボード、pointer、touch、入力イベント、ARIA状態は自動検査で確認した。
- `icon-manifest`のCommonJS dts警告（AUD-004）、ページ内リンクの到達性検査（AUD-005）は保守課題として残る。
- `/examples/contact`の未定義リンク（AUD-001）は、examplesを整備する時点まで保留する。

## 監査後に反映した修正

- `catalog/examples.ts`のActionList説明を、公開型と一致する色名へ修正した。
- `test/ssr.test.tsx`のID抽出を属性境界付きへ修正し、`data-record-id`を誤検出しないようにした。
- 旧検証記録2件を削除し、`docs/component-audit.md`と`docs/stimulus-ui-coverage.md`から旧表現・旧参照を除去した。
- 現行ルートに合わせて`test/browser/draft.spec.ts`と`test/browser/reservation.spec.ts`の遷移前提を更新した。
- `test/browser/workflows.spec.ts`のDialog名・初期フォーカス、Field ID、FileInputのselectorとstatusの対象を現行DOMへ合わせた。
- CSS順序検査では、Buttonが有効化されてからtransition完了後の確定値を比較するようにした。

保存済みの[`ply-feedback-20260916`](../references/ply-feedback-20260916/README.md)、[`ply-library-20260915`](../references/ply-library-20260915/README.md)、[`feedback-20260915`](../references/feedback-20260915/manifest.json)、[`basecamp-20260915`](../references/basecamp-20260915/README.md)は代表状態と過去の証拠として参照した。既存画像・既存記録の確認を、現行セッションでの全状態の目視承認へ置き換えていない。文字位置についても、[`control-text-alignment.md`](../control-text-alignment.md)が記録するMac上の過去検証と、今回の未確認範囲を分けた。

開始時からの既存変更だった引き継ぎメモと、ユーザーが置いた監査指示書は保持している。監査後の修正と本報告の更新は、この後の監査コミットへ含める。
