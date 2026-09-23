# Ply 全体監査報告

監査日：2026年9月21日
対象：main / c42689c
基準：AGENTS.md、[当時の監査指示書](20260921-full-audit-brief.md)、当時の引き継ぎメモ
対象目録：[20260921-full-audit-inventory.md](20260921-full-audit-inventory.md)

## 総評

現行HEADのソース、CSS、controller、カタログ入口、配布物を照合した。P1に該当する阻害要因は、静的・SSR・配布の範囲では見つからなかった。サイドバーを置かず、AppShellの上部中央コマンドと中央の作業面を維持している。Buttonの文字指定はbutton.cssが所有し、DropdownMenuの項目はblockと上揃えを維持している。

一方、カタログには到達できないリンクが1種類残り、ビルドにはicon-manifestの型生成警告が残る。また、現行表示に使われない旧HTML断片がcatalog/examples.tsへ24件残っている。後者は今すぐ画面へ出る不具合ではないが、現行Hono例と異なるDOMをコピーさせる保守上の危険である。

このセッションでは、AGENTS.mdの「Computer use・ブラウザ操作・Playwright実行は禁止。ユーザーが明示的に解除した場合だけ実行する」という条件に従い、現行版のブラウザ表示・操作確認を実施していない。sandbox内でのPlaywright起動は127.0.0.1:5178のEPERMで失敗し、権限付き再実行も同じAGENTS.mdへの抵触として拒否された。したがって、前回の保存済み画面記録や過去のPlaywright成功を、今回の現行HEADの目視確認とは扱わない。

## 指摘一覧

| ID               | 重大度 | 状態     | 対象               | 判定                                                          |
| ---------------- | ------ | -------- | ------------------ | ------------------------------------------------------------- |
| AUD-20260921-001 | P2     | 未解消   | カタログ内部リンク | examples/contactが生成経路に存在せず、3表示面から到達できない |
| AUD-20260921-002 | P3     | 未解消   | 配布型生成         | vp run buildがCommonJS dts入力の警告を出す                    |
| AUD-20260921-003 | P3     | 新規確認 | カタログ旧HTML断片 | 表示に使われない旧markupが現行例と並存する                    |
| AUD-20260921-004 | P3     | 未解消   | SSR検査の境界      | pathsの200確認だけではページ内リンクの未解決を止められない    |

P1の指摘はない。AUD-20260921-001は利用者が実際に踏む導線の断絶なので、examplesを整備するタイミングを待つ場合も保留理由を明示して管理する。

### AUD-20260921-001：Disclosure例の未定義リンク（P2）

- 対象：catalog/hono-examples/disclosure.tsx:34-36
- 入口：catalog/app.tsx:33-59、365-367
- 再現：vp run build後、生成されたcomponents/disclosure/index.html、review/components/index.html、review/components/group-2/index.htmlの「担当者に問い合わせる」を開く。
- 実際：リンク先は /examples/contact だが、pathsへ登録されたrouteにもdist/catalog/examples/contact/index.htmlにも存在しない。監査用の生成HTMLリンク走査で、未解決先はこの1種類、参照元は3ページだった。
- 期待：カタログ内の表示例からは生成済みの例示ページへ移るか、例示範囲外であることが分かるリンクへ変更する。
- 影響：Disclosureの操作例から次の操作を試す利用者が404で止まる。Ply runtimeではなく、カタログとAPI説明の信頼性に影響する。
- 根本原因の仮説：表示例へリンクを追加した時点で、catalog/app.tsxのpathsとrouteを追加していない。
- 最小の修正方向：問い合わせ先の例示routeを追加するか、既存routeへのリンクへ差し替える。examplesを整備する際に、同じ生成HTMLリンク走査を自動検査へ移す。

### AUD-20260921-002：icon-manifestの型生成警告（P3）

- 対象：src/hono/icon.tsx:1、src/icon-manifest.json、package.jsonのbuild script
- 再現：vp run build
- 実際：ライブラリ・カタログのbuildは成功し85ページを生成するが、rolldown-plugin-dtsがsrc/icon-manifest.json.d.tsのCommonJS dts構文をbundleできないという警告を出す。
- 影響：現行のdist/hono/index.d.mtsはmanifestの型を内包し、vp run check:packageも成功しているため、今回の配布物が直ちに壊れているとは判定しない。ただし、declaration bundlerまたはJSON importの扱いが変わった際に警告がエラー化する余地がある。
- 最小の修正方向：JSONの型生成経路をbundlerが警告なく扱える形へ揃える。警告を残すなら、check:packageで安全性を検証している境界と、エラー化を許さない受け入れ条件を明記する。

### AUD-20260921-003：表示に使われない旧HTML断片（P3）

- 対象：catalog/examples.ts:7-187
- 根拠：catalog/examples.tsにはhtmlプロパティが24件あるが、現行の表示とコード欄はcatalog/hono-examplesとgetHonoExampleを使う。catalog/app.tsx:13、365-373で、Honoのrender結果とsourceを整形・着色している。examples.tsのhtmlプロパティを読む処理は現行ソースにない。
- 不整合の例：catalog/examples.ts:7のCommandMenuは旧dialogと旧クラス構造、catalog/examples.ts:149のDisclosureは現行のbody構造を持たない。現行表示の根拠として使うと、実装と異なるDOMをコピーすることになる。
- 影響：今すぐ公開画面へ表示される不具合ではない。しかし、保守者が古いhtmlフィールドを参照すると、カタログの「表示と掲載コードが同じ」という契約を破る。旧構造の残存を検出する検索や新しい例の追加時にもノイズになる。
- 最小の修正方向：htmlフィールドを削除し、現行Hono例から生成する。互換性のため残す場合は現行SSRから自動生成し、手書きmarkupを二重管理しない。

### AUD-20260921-004：ページ内リンク到達性の検査不足（P3）

- 対象：test/ssr.test.tsx:248-253、scripts/check-package.mjs:23-70
- 実際：SSRテストはpathsに列挙した85経路の200とdoctypeを確認する。check-packageは公開入口、CSS、型、掲載コード、アイコン、licenseを確認する。一方、生成HTMLのhref・actionがpathsへ到達できるかは検査しないため、AUD-20260921-001が基準検査を通過する。
- 最小の修正方向：生成済みHTMLの内部href・actionをroute、fragment、asset、外部URLに分類し、routeだけを生成対象と照合する。未整備のexamplesを意図的に許可するなら、許可リストと理由を検査へ明示する。

## 設計制約と横断判定

| 観点             | 現行ソースで確認したこと                                                                         | 判定         |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| 中央構成         | AppShellは上部中央のcommandsと中央workspace。srcとcatalogにsidebar実装なし                       | ソース適合   |
| Buttonの文字所有 | button.cssに操作用font、太さ、行高、最小高さ、上下paddingを集約。check:css成功                   | 静的適合     |
| DropdownMenu     | 項目はply-button、display:block、contentのheadingはalign-items:start、1行時の上下paddingは対称式 | 静的適合     |
| アイコン         | manifest 20件、CSS用SVG 20件、スプライトと配布licenseをcheck:packageで照合                       | 静的適合     |
| CSSと理由        | 64 source CSS + catalog CSS、spacing rationale 65キー、570宣言、配置93箇所                       | 静的照合済み |
| controller       | Ply公開23件、stimulus-ui 0.1.0の38契約との利用・native代替・未対応を対応表と照合                 | 静的照合済み |
| カタログ         | 6分類、56 ID、56 Hono例、85生成ページ。IDの重複と例の欠落なし                                    | 静的照合済み |
| 実画面           | 現行セッションのChromium・Firefox・WebKit操作、字形、狭幅、200%拡大は未実施                      | 未確認       |

デザイン不整合を0件と断定していない。ソース上の設計制約は確認できたが、文字の見た目、密度、クリック後のフォーカス、各状態の視覚的な統一は実画面で確認していない。

## 6種類の適用先

| 適用先       | 現在の組み合わせ                                                   | 不足・境界                                             |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------ |
| メール       | MessageList、Message、Tabs、Field、Textarea、Toolbar、FileItem     | Composer、宛先Picker、添付送信、送信失敗からの再送     |
| CRM          | ValueList、Timeline、Field、Disclosure、Badge                      | 顧客・担当者Picker、Property行の編集、権限状態         |
| プロジェクト | Board、Card、TaskList、Table、Calendar、Badge                      | 一括操作、保存・同期、可変ペインは利用側または追加部品 |
| 文書         | FileItem、DataList、ActionList、Comparison、ImageFrame、Disclosure | 文書編集、目次、版比較の専用導線                       |
| 財務         | Statistic、Table、Tabs、ValueList、Comparison                      | Chartの外枠・凡例・代替表。計算は利用側                |
| チャット     | Message、FileItem、Field、Textarea、ActionLink                     | Composer、メンション、添付、送信中・失敗からの復帰     |

追加候補の優先順位は、Picker・Composer・編集できるProperty行を高、一括操作・Chartの外枠・Tooltipを中とする。既存部品のpropsを増やすこと自体は追加理由にしない。ActionListの改名は将来検討に留め、現行公開名を削除しない。

## 検証結果

| Commandまたは確認        | 結果                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| vp run check:css         | 成功。65 CSSの規約とtoken参照                                                            |
| vp run check             | 成功。340ファイルのformat、226ファイルのlint・型、CSS検査                                |
| vp run test              | 成功。14ファイル、107件                                                                  |
| vp run build             | 成功。85ページ生成。ただしAUD-20260921-002の警告                                         |
| vp run check:package     | 成功。公開入口、型、CSS、56例、20アイコン、license                                       |
| vp run docs:spacing      | 成功。65 CSS、570宣言、93箇所の配置。生成formatterの表整形差分は監査成果ではないため復元 |
| 生成HTMLの内部リンク走査 | 85ページを走査。未解決は /examples/contact の1種類、3ページ                              |
| vp run test:visual       | 未確認。sandboxの127.0.0.1:5178起動がEPERM。権限付き再実行はAGENTS.md違反として拒否      |
| git diff --check         | 成功。監査報告追加後も再実行して成功                                                     |

## 未確認範囲

- 全56分類の現行ブラウザ表示、hover・focus・active・disabled・busy・error、開閉、選択、移動、フォーカス復帰。
- Chromium・Firefox・WebKitの現行HEADに対する375px、1280px、文字200%、狭いコンテナ、RTL、forced-colors、reduced-motion。
- Button・Input・DropdownMenu・DatePickerの現行字形ピクセル位置。control-textの静的検査と過去のMac上の記録は、今回の目視確認ではない。
- スクリーンリーダー音声、物理IME、利用者のブラウザ拡張、Windows・Android・iOS実機。
- 保存済みの外部製品画像を超える新しいClickUp・Basecamp・HEYの回遊・計測。外部画像は再撮影していない。

既存のtest/browserには171個のtest宣言と28ファイルがあり、検査定義の範囲は確認した。しかし、今回の実行失敗を成功扱いにせず、定義の存在を現行画面の合格とは報告しない。

## 次の修正順

1. AUD-20260921-001を解消するか、examples整備までの保留をIssue等で明示する。
2. catalog/examples.tsの未使用htmlフィールドを削除するか、SSRから生成する。
3. page内リンクの到達性検査を追加し、examplesの許可リストを明示する。
4. icon-manifestのdts警告を解消するか、配布検査で安全性の境界を固定する。
5. AGENTS.mdの制約を満たす明示許可が得られた場合だけ、現行HEADの表示・操作監査を再開する。

監査実施時点では、上記の指摘を記録するためのdocsだけを追加し、製品コード・テスト・当時の引き継ぎメモ・監査指示書は変更していない。その後、引き継ぎメモだけを監査結果に合わせて整理した。
