# コード欄のDisclosureの修正

- [修正前](before.png)：ユーザー提供画像の原本
- [修正後](after.jpg)：実画面から取得した画像の元バイト

Disclosureの構造変更後に残っていた旧HTMLを修正した。全56ページ・112個のコード見出しを共通Disclosureへ移行し、コード欄の集合はDisclosureGroupの4px間隔を使う。利用例とCSSのみの例に残る旧構造も更新した。

3ブラウザで全ページの構造・文字の折り返し、375px・1280px・文字200%の開閉を確認した。SHA-256とバイト数は[manifest.json](manifest.json)に記載。
