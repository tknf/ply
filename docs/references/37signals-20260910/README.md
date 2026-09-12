# 37signals実アプリの観察記録 — 2026-09-10

Basecamp・HEY・Fizzyのログイン済みアプリを操作して記録した28枚。公式サイトの画像とは別の資料。ユーザーから、メール送信以外の作成・編集・削除を含む操作とスクリーンショット保存の許可を受けている。画像はローカル研究用で、カタログの公開資産には含めていない。

## 最初に読む判断

2026-09-11追記：[ButtonのDOM実測とPlyへの反映](button-measurements-20260911.md)。Buttonの寸法はこの実測記録を優先する。以下の44px等は前日の判断の履歴。

- 「37signalsならこのタブ」という共通形はない。Basecamp Calendarは薄い土台＋白い選択面、HEY Calendarは青紫のピル型の帯＋白い選択面、Fizzyは列の展開・縦の状態一覧を使う。
- 横にゆとりがあることと、全ボタンのpaddingを同じ値にすることは別。Basecamp文書は同じ保存操作でも上部と下部で大きさが異なる。内容の密度と置き場所に合わせている。
- 現在位置・対象・選択した表示を保持し、入力・完了など変化する部分をその対象に近づける。PlyのContextBarがボタン有無で動くのはこの基準に反する。
- 今回のPlyの紙タブ形状は独自の提案で、Basecamp/HEYのコピーではない。ユーザーは形を「かわいい」と評価し、余白に不満を示した。左右のゆとりを改善する根拠と、参考製品の形そのものを区別する。
- 画像から正確なCSSのpadding値や全画面の標準値は断定しない。今回の44px・20px・72pxはPlyの設計値。

## 確認した操作

| 製品     | 操作                                                                                  | 保存した確認用データ                                                       |
| -------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Basecamp | ホーム→プロジェクト→To-dos、追加・期限展開・作成、文書作成面、Calendar→Agenda         | To-do「Ply UI確認用（削除可）」、担当・通知先・期限なし                    |
| HEY      | Day→Week、予定追加・予定名編集・通知削除・Notes展開、メール作成・書式展開・下書き保存 | 予定「Ply UI確認用（削除可）」と宛先なしの下書き「Ply UI確認用（未送信）」 |
| Fizzy    | ホーム・メニュー・列展開・フィルター、カード作成・Edit・Save changes・Done            | Playgroundのカード12「Ply UI確認用（削除可）」、現在Done                   |

メールの送信・招待・コメント投稿は行っていない。HEYの予定は追加時にUntitledで作成されたため、編集で確認用の名前へ変更し、通知を外した。Fizzyでは本文の置換を試みたが保存後の本文が元のままだったため、本文変更成功とは扱わない。編集への切替・保存終了・完了状態は確認した。削除操作は今回実施していない。

## 次回の再開

先にこの記録と該当画像を読む。ユーザーにログインや参照先を再説明させない。実装の判断に足りない状態だけアプリで追加確認する。過去の公式紹介画像を「実アプリを見た」根拠にしない。

## 画像一覧

[画像をまとめて見る](index.html)

### Basecamp ホーム

作成・プロジェクト・活動を別の領域に置く。

![Basecamp ホーム](basecamp-01-home.png)

### Basecamp プロジェクト

各道具に中身の異なるプレビュー。上部帯は招待・進捗・期間・メニュー。

![Basecamp プロジェクト](basecamp-02-project.png)

### Basecamp To-dos

追加・表示・検索を見出しの下に集め、現在位置は作業面の縁に置く。

![Basecamp To-dos](basecamp-03-todos.png)

### Basecamp To-do追加

一覧の行から入力が展開。ラベルと値を横に並べ、主操作・取消を直下に置く。

![Basecamp To-do追加](basecamp-04-todo-form.png)

### Basecamp 期限の展開

期限なし・指定日・複数日を分け、日付選択をその場で開く。

![Basecamp 期限の展開](basecamp-05-todo-date.png)

### Basecamp 追加後

追加した行を残し、次の入力欄へ進む。上部の位置は動かない。

![Basecamp 追加後](basecamp-06-todo-added.png)

### Basecamp 文書作成

タイトル・本文・公開範囲。上部は小さな操作、下部は大きめの操作を使い分ける。

![Basecamp 文書作成](basecamp-07-document.png)

### Basecamp Calendar

薄い土台と白い選択面。高さを抑えた切替を横にまとめる。

![Basecamp Calendar](basecamp-08-calendar.png)

### Basecamp Agenda

切替の位置と高さを保って内容を替える。全体の本文幅は表示に応じて変わる。

![Basecamp Agenda](basecamp-09-agenda.png)

### HEY Day

青紫の共通の帯に白い選択面。上部でDay・Week・Yearを切り替える。

![HEY Day](hey-01-calendar-day.png)

### HEY Week

Dayと同じ位置の切替を保持。週の内容は大きく変わる。

![HEY Week](hey-02-calendar-week.png)

### HEY 予定作成の遷移

追加操作の直後の記録。安定したフォーム構造は次の2枚を参照する。

![HEY 予定作成の遷移](hey-03-event-form.png)

### HEY 予定編集

背後の週表示を残す小さな面。日付と時刻を一つの枠で扱う。

![HEY 予定編集](hey-04-event-detail.png)

### HEY Notesの展開

必要な補足欄を足す。任意項目のボタンは小さなピル型。

![HEY Notesの展開](hey-05-event-expanded.png)

### HEY メール作成

大きな本文面、下部に送信・下書き保存・補助アイコン。

![HEY メール作成](hey-06-compose.png)

### HEY 書式ツールバー

本文の下に書式が展開し、送信・保存はそのすぐ下へ。

![HEY 書式ツールバー](hey-07-compose-toolbar.png)

### HEY 保存後のImbox

下書きを保存するとImboxへ戻った。保存値の確認は次の一覧。

![HEY 保存後のImbox](hey-08-draft-saved.png)

### HEY 下書き一覧

確認用下書きが宛先なしで保存されたことを確認。

![HEY 下書き一覧](hey-09-drafts.png)

### Fizzy 活動一覧

追加・変更・完了を時間と列で見せる。

![Fizzy 活動一覧](fizzy-01-home.png)

### Fizzy 移動メニュー

大きな入口と文字中心の一覧を階層で使い分ける。

![Fizzy 移動メニュー](fizzy-02-jump-menu.png)

### Fizzy ボード

カードは四角く、操作は丸い。使わない列は縦の帯になる。

![Fizzy ボード](fizzy-03-board.png)

### Fizzy 列とフィルター展開

絞り込み条件は横長のピル型でまとまり、展開した列に内容が出る。

![Fizzy 列とフィルター展開](fizzy-04-filters-and-column.png)

### Fizzy カード作成

白いカードの下に主操作と連続作成。編集対象が一つの物として見える。

![Fizzy カード作成](fizzy-05-card-form.png)

### Fizzy 作成後のボード

新しいカードが一覧に入り、フォーカス枠で位置が分かる。

![Fizzy 作成後のボード](fizzy-06-card-created.png)

### Fizzy カード詳細

状態を右側、編集・完了を下側へ。担当や付箋的な操作はカードの周りに置く。

![Fizzy カード詳細](fizzy-07-card-detail.png)

### Fizzy 編集URL直接アクセス（例外）

通常のEdit操作ではない。断片的な全幅表示になったため、デザインの根拠に使わない。

![Fizzy 編集URL直接アクセス（例外）](fizzy-08-card-edit.png)

### Fizzy 通常のEdit操作

詳細のカード面を保ち、タイトルと本文を入力へ置換。下部はSave changesに替わる。

![Fizzy 通常のEdit操作](fizzy-09-inline-edit.png)

### Fizzy 完了

カード全体の色・完了印・Undoで結果をその対象に表す。

![Fizzy 完了](fizzy-10-done.png)
