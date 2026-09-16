# 再開時の確認

2026年9月15日、ユーザーの明示依頼で更新。前担当はここで作業を終了する。

## 現在地

- UIコンポーネントを一つずつ作り直し、ユーザーが画面で確認している。順序は`catalog/component-groups.ts`。
- Toolbar、DropdownMenu、Dialogは次へ進む承認を得た。Popoverは配置不具合の修正後、「微修正はともかく、とりあえずOK」と確認済み。全状態・全ブラウザの保証ではない。
- **現在の対象はDisclosure。まだ承認されていない。** 勝手に次のDangerZoneへ進まない。
- 確認先は`http://127.0.0.1:5179/components/disclosure`。サーバー稼働は未確認。必要なら`vp run dev --port 5179`。
- 入口は`src/hono/disclosure.tsx`、`src/css/components/disclosure.css`、`catalog/hono-examples/disclosure.tsx`。基本HTML例は`catalog/examples.ts`。他のカタログにも生のdetails/summaryがあるため、Hono版だけを見て変更しない。

## Disclosureの未完了事項

- ユーザーは既存部品との統一性、フォントサイズ、余白、変更の根拠を重視している。カード枠に変えた前担当の判断は根拠不足だった。現在は上下罫線に戻している。
- 現在の指定は見出し・本文14px、補足13px、見出しは通常の太さ。開閉行の上下余白12px、本文上8px・下16px、本文内の間隔8px。本文の開始位置は見出しの文字に揃えている。これらは提案中であり、受け入れ済み基準ではない。
- 直近の画像で本文上の詰まりと大きなホバー背景が見えたため、本文上余白を戻し、見出しの太字とホバーの影を外した。ホバーは文字色を変える。**この修正後の実画面は未確認。** ユーザーの短い否定を、特定の原因への同意と扱わない。
- 基本例で矢印・本文余白が欠けた問題は、生のdetails/summaryにも効く疑似要素と直下divのCSSに変更して対応した。生HTMLとHono例の整合も確認対象。
- 作例には初期開閉、説明、複数開閉、同じnameによる排他的開閉、入れ子、フォーム、長文、RTLがある。作例があることを操作確認済みや全パターン網羅と呼ばない。
- 直近のCSS変更は静的チェックと文字指定の回帰テストが通過。ビルドはその一つ前の余白調整時点まで通過しており、最新の太さ・ホバー・本文上余白変更後は未実施。ブラウザ検証は実行していない。

## 後続の明示された計画

- [transition統一計画](docs/component-motion-plan.md)：全コンポーネントの作り直し後にまとめて実施する。最新のユーザー依頼に対して作成した計画で、実装はまだ変更していない。
- 共通CSSはbox-shadowだけをtransition対象にし、一部部品は背景色などを独自指定している。Buttonにも宣言はあるが、primaryの背景色変化が対象外で、反応が不統一。時間・イージング・対象プロパティとreduced-motionを横断して揃える。
- `tokens.css`にreduce時の時間トークン0ms化、Loadingにanimation停止は既にある。全対象への適用確認は未完了。
- [モバイルオーバーレイ計画](docs/mobile-overlays-plan.md)：スマホでのボトムシート化をCSS中心に後続で実施する。標準の意味・フォーカス管理を保つ。全体の矢印縮小も未完了。Disclosureの矢印のみ小さくしたことと混同しない。

## 維持する判断と参照先

- 最初に`AGENTS.md`と[文字位置の規約](docs/control-text-alignment.md)を読む。「文字が上付き」は既知の不具合。再指摘を待って確認を始めない。
- [再発レポート](docs/dropdown-menu-text-alignment-report.md)と、`scripts/control-text.mjs`、Vite検査プラグイン、回帰テストがある。検査を通すための例外追加は禁止。静的検査で実際の字形を確認したとは言わない。
- DropdownMenuの複数行はユーザー指定で上揃え。一行の中央は対称な上下余白で作る。内容全体をalign-items:centerで中央に寄せない。
- DropdownMenuの外側クリックは実体の透明レイヤーで受ける。ユーザーはdocument上のイベントキャンセルを重ねる案を拒否した。背後へのクリックを通す実装へ戻さない。
- Dialogはnative dialogとclosedbyを優先し、未対応環境向けに局所的なbackdrop処理がある。Popoverは非モーダル。Popoverの配置は明示アンカーと実際の配置の判定による補助計算を使う。詳細はそれぞれのHono・CSS・controllerを読む。
- Toolbarは操作の配置、FilterBarは条件・件数を示す部品。共通Button／ActionLinkを使う。本文用フォントで操作用フォントを上書きしない。文字を移動する補正や非対称paddingで辻褄を合わせない。

## 作業上の制約

- **Computer use・ブラウザ操作・Playwright実行は禁止。** ユーザーが明示的に解除した場合だけ実行する。既存の`test/browser`は未実行のものを含む。SSR・寸法の数値テスト・ビルド成功を表示確認済みと言い換えない。
- 将来ブラウザ検証が許可された場合も、出力は`--reporter=line --output=/tmp/ply-check`などプロジェクト外へ置く。
- 応答・コメント・文書は日本語。`package.json`とscript本体を先に読み、`vp`を優先する。JS/TSはアロー関数、any・非null assertion・as unknown asは禁止。
- 「次へ」は制作開始の指示。宣言だけでターンを終えない。通常の設計判断で確認質問を増やさない。一方、否定された見た目を推測だけで承認済みとしない。
- 無断のログや計測記録は作らない。handoffは明示依頼時のみ更新する。
- Gitは初期化済み。多数の未commit変更・新規ファイルがある。今回の引き継ぎでもcommit・pushはしていない。既存変更を消さず、commit・公開は依頼時のみ。秘密情報を読まない。
