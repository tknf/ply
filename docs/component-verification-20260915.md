# 全コンポーネント再構築の確認

2026年9月15日。対象は[部品監査](component-audit.md)の56分類とField配下の入力部品。検査の成功をデザインの受け入れとは扱わない。

## 静的検査と配布物

- `vp run check`：format、型、lint、61 CSSの規約とトークン参照が成功。
- `vp run test`：13ファイル、104件成功。既知の上付きと内部クラス名の回帰検査を含む。
- `vp run build`：ライブラリと静的カタログ85ページを生成。
- `vp run check:package`：公開入口、配布型、CSSの一致、掲載例56件のコンパイル、アイコンとライセンスが成功。
- `git diff --check`：成功。

型定義のビルド時にicon-manifestのCommonJS dtsに関する既存の警告が出る。ビルドと公開型を使う掲載例の検査は成功している。

## 実ブラウザ

Chromium・Firefox・WebKitで、次のspecを実行した。各実行は`vp run test:visual`経由。途中で見つかった問題は修正後に対象を再実行した。

| 対象                                             | spec                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| 全56分類、文字位置、文字拡大、タッチ領域、描画順 | component-redesign、catalog、control-text、control-appearance                               |
| Buttonと入力・選択                               | button、field、field-group、input-group、switch、range、suggestion、date-picker、file-input |
| 開閉・選択・フォーカス                           | command-menu、dropdown-menu、dialog、popover                                                |
| 文字と枠線のコントラスト                         | contrast                                                                                    |

部品別ページは375・768・1280px、まとめた表示は375・1280pxで確認。CSSによる文字200%拡大、右から左、forced colors、JavaScriptなしの標準入力、キー操作とフォームへの値の反映も対象specで確認している。

修正した主な問題は、WebKitの狭幅・文字拡大時のnative入力のはみ出し、Popoverを閉じた後のフォーカス復帰、CommandMenuを開く際のフォーカス競合、Avatarのコーラル色のコントラスト。文字色検査は有限のtransitionの完了を待ち、グラデーションの各色も測る。閾値は引き下げていない。

最後のcontrast・dialogの3ブラウザ再確認は48件成功。control-textのうち、旧WebKitの崩れ方を再現する検査はChromium・Firefoxでは対象外のため2件skip。現行の文字位置検査は3ブラウザとも成功している。

## 目視と保存画像

[分類別の6画面と、開いたパネル等の確認画像](references/ply-library-20260915/README.md)を保存。Buttonの文字位置、一覧の文字と補足の比率、Badgeの幅、FileItemの操作欄、各パネルの余白などを見て修正した。ImageFrameは6画像の読み込み完了後も確認した。途中の画像は最終状態の全ピクセルを保証するものではない。

[参照製品の既存画像と実測](references/measurements-20260915.md)は再撮影せず回収・保存した。今回保存した各manifestの画像はSHA256と一致する。

## 確認の範囲

この記録はライブラリの確認。旧アプリデモの全ワークフロー、Safari実機、他OSの字形、スクリーンリーダー、利用者による評価は今回の完了範囲に含めない。追加候補のPickerやComposer等は未実装として[部品監査](component-audit.md)に分けている。
