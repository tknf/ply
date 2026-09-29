import type { ComponentDoc } from "../reference";

export default {
  id: "composer",
  name: "Composer",
  description: "本文・添付・送信操作を一つの入力面にまとめる",
  api: ["Composer"],
  guidance: [
    "メッセージ・コメント・返信のように、本文を書いて送る入力面を置く時に使います。",
    "書式の道具を並べる時は、`TextEditor` を `editor` に入れます。本文の欄を他の項目と並べて入力する普通のフォームでは、`Field` と `Textarea` を使います。",
  ],
  usage: [
    "`id`・`label`・`name`・`submitLabel` を渡します。全体は標準の `form` で、`action`・`method` などの属性はそのまま `form` に付きます。題名の行に `label` を置き、その下に本文の欄、下の行に `actions` と送信ボタンを並べます。",
    "`to` に宛先（人やチャンネル）、`status` に下書きの保存などの状態を渡すと、題名の行に並べます。`attachments` には `FileInput` や選んだファイルの一覧を渡し、本文の下に置きます。",
    "本文の欄は本文と同じ文字の大きさと行の高さで書き、`field-sizing` に対応するブラウザでは4行から書いた分だけ伸びます（20行まで）。",
    "`busy` は送信ボタンを「送信中…」にして押せなくし、二重の送信を防ぎます。`error` は本文の欄の下に出して欄に関連付けます。送信・下書きの保存・送信後に `busy` や `error` を切り替えることは利用側で行います。",
    "`editor` にリッチテキストの編集部品（ProseMirror・Tiptapなど）や `contenteditable` の要素を渡すと、本文の欄と差し替えます。中の書く場所がどの深さにあっても、本文と同じ文字と行の高さ、紙全体のフォーカスの輪をかけ、段落や箇条の間を一定の間隔にそろえます。空の `contenteditable` には `data-placeholder` の文を薄く出します。この時 `name`・`value`・`placeholder`・`rows`・`required`・`error` は使わず、送信する値の受け渡しは編集部品の側で行います。",
    "controllerは持ちません。JavaScriptが無い時も、標準のフォームとして本文と添付を送信できます。",
  ],
  accessibility: [
    '本文の欄は `label` を名前にします。`editor` を渡した時は、`label` を名前にしたまとまり（`role="group"`）で編集部品を包みます。書く場所そのものの名前（`aria-label` など）は編集部品の側で付けます。',
    "`busy` の間は `form` と送信ボタンに `aria-busy` を付けます。",
    "`error` を渡すと、本文の欄に `aria-invalid` を付け、誤りの文を `aria-describedby` に加えます。",
  ],
} satisfies ComponentDoc;
