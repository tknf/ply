# Ply 全体監査報告

監査日：2026年9月16日<br>
対象：`bbcd1aef7c15aa9f89be9b43910c835188568399`（`main`）<br>
基準：`docs/full-audit-brief.md`、`AGENTS.md`

## 総評

現行のソース、SSR、CSS、配布物は一つの版として揃っている。56分類・Field配下の公開部品、64個のソースCSS、23個の公開controller、85経路を静的に照合し、P1に該当する阻害要因は見つからなかった。Buttonの文字指定、DropdownMenuの上揃え、中央の作業面、サイドバーを置かない構造も、今回のソース検査では設計制約に反していない。

一方、カタログ利用者が実際に踏むリンクと公開APIの説明に、P2の不整合がある。旧検証記録の件数は汚染を招くため削除し、現行値を`catalog-review-20260916.md`と本報告へ集約した。実画面の操作・字形・狭幅・文字200%は、現行セッションの`AGENTS.md`がComputer use・ブラウザ操作・Playwrightを禁止しているため未確認とした。既存記録の「確認済み」は今回の受け入れ結果へ繰り上げていない。

優先順は次のとおり。

1. Disclosureのカタログ例から未定義の`/examples/contact`を除去するか、例示用経路を追加する（examples整備時まで保留）。
2. ActionListの`accent`説明を現行の`blue | green | amber | coral`へ直す（対応済み）。
3. 旧検証記録を削除し、件数を現行資料へ集約する（対応済み）。

## 指摘一覧

| ID      | 重大度 | 状態     | 対象                 | 判定                                                                |
| ------- | ------ | -------- | -------------------- | ------------------------------------------------------------------- |
| AUD-001 | P2     | 保留     | カタログの内部リンク | `/examples/contact`がルート一覧に存在せず、3つの表示面から404になる |
| AUD-002 | P2     | 対応済み | ActionListの利用説明 | 旧色名の案内を現行の公開型へ修正した                                |
| AUD-003 | P2     | 解消     | 旧検証記録           | 汚染を招く旧記録を削除し、現行資料へ集約した                        |
| AUD-004 | P3     | 保留     | declaration生成      | `vp run build`は成功するが`icon-manifest`のCommonJS dts警告を出す   |
| AUD-005 | P3     | 部分対応 | SSR検査の境界        | ID検査は修正したが、ページ内リンクの到達性は検査しない              |

P1の指摘はありません。AUD-004とAUD-005は現時点の利用者阻害ではなく、次の変更で壊れ方を見逃しにくくするための保守課題である。

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
- 対応：両記録を削除し、現行のテスト件数・余白件数・controller対応は`docs/catalog-review-20260916.md`、`docs/spacing-audit.md`、`docs/stimulus-ui-coverage.md`へ集約した。
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

| 横断対象     | 現行ソースから確認した事実                                                                                                                                    | 判定           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Hono公開入口 | 63モジュールを再export。`stylesheets`を除くruntime UI valueは73。`ButtonGroup`、`DisclosureGroup`、`TagGroup`、`TableSort`、`TableSelection`とField配下を含む | 静的確認済み   |
| CSS          | `src/css` 64ファイル、`catalog/catalog.css`を含む検査対象65ファイル。`src/hono/stylesheets.ts`の64項目に欠落・余計な項目なし                                  | 静的確認済み   |
| 余白         | `design/spacing-rationale.json`の65キー、`docs/spacing-audit.md`の現行値、生成元の対象が一致。現行は570宣言・93カタログ配置                                   | 静的確認済み   |
| controller   | Plyの公開入口23件。`@tknf/stimulus-ui@0.1.0`は38件で、利用・継承13件＋一部利用2件＝15件。native代替、独自実装、UIのみ、未対応を区別                           | 静的確認済み   |
| カタログ     | component groupは56 IDで重複なし、`catalog/hono-examples`も56ファイルで1対1。`check:package`で56例を配布型へコンパイル                                        | 静的確認済み   |
| SSR・配布    | 85経路が200、静的HTMLも85件。実IDの重複0、ARIA参照先の欠落0、ビルド内のCSS・JS・asset参照の欠落0。未解決routeはAUD-001のみ                                    | 静的確認済み   |
| 設計制約     | `src`と`catalog`にsidebar実装なし。CommandMenuは上部中央のグリッド、AppShellは中央workspace。Buttonの文字所有とDropdownMenuの上揃えは`check:css`を通過        | ソース上は適合 |

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

今回実行した基準検査は次のとおり。ソース・配布・SSRの確認であり、字形や実画面の受け入れ結果ではない。

| Command                | 結果                                                      |
| ---------------------- | --------------------------------------------------------- |
| `vp run check:css`     | 成功。65 CSSの規約とトークン参照を確認                    |
| `vp run check`         | 成功。format、lint、型検査、CSS検査                       |
| `vp run test`          | 成功。14ファイル、107件                                   |
| `vp run build`         | 成功。ライブラリと静的カタログ85ページ。AUD-004の警告あり |
| `vp run check:package` | 成功。公開入口、配布型、56例、CSS、20アイコン、license    |
| SSR静的crawl           | 成功。85経路、status 200。AUD-001の未解決リンクを検出     |

## 監査後に反映した修正

- `catalog/examples.ts`のActionList説明を、公開型と一致する色名へ修正した。
- `test/ssr.test.tsx`のID抽出を属性境界付きへ修正し、`data-record-id`を誤検出しないようにした。
- 旧検証記録2件を削除し、`docs/component-audit.md`と`docs/stimulus-ui-coverage.md`から旧表現・旧参照を除去した。

現行セッションでは次を実行していない。

- `vp run test:visual`、Computer use、ブラウザ操作、Playwright。
- 375px・1280px・文字200%・RTL・forced-colors・reduced-motionの現行画面確認。
- キーボード、pointer、touch、IME、閉じた後のフォーカス、スクリーンリーダーの現行確認。
- 新しい監査用スクリーンショットの取得。

保存済みの[`ply-feedback-20260916`](../references/ply-feedback-20260916/README.md)、[`ply-library-20260915`](../references/ply-library-20260915/README.md)、[`feedback-20260915`](../references/feedback-20260915/manifest.json)、[`basecamp-20260915`](../references/basecamp-20260915/README.md)は代表状態と過去の証拠として参照した。既存画像・既存記録の確認を、現行セッションでの全状態の目視承認へ置き換えていない。文字位置についても、[`control-text-alignment.md`](../control-text-alignment.md)が記録するMac上の過去検証と、今回の未確認範囲を分けた。

開始時からの既存変更`HANDOFF.md`と、ユーザーが置いた`docs/full-audit-brief.md`は保持している。監査後の修正は未コミットの作業ツリーに残している。
