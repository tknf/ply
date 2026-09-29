import type { ComponentDoc } from "../reference";

export default {
  id: "toast",
  name: "Toast",
  description: "操作結果を閉じるまで読める形で示す",
  api: ["Toast", "ToastStack"],
  guidance: [
    "保存・送信・コピーなど、今した操作の結果を、作業を止めずに短く知らせる時に使います。",
    "読み続けてほしい事実や注意は、本文のそばに置く `Notice` を使います。",
    "送信で直すところがある時は、入力の近くのエラーと `ErrorSummary` で示します。Toastだけに残しません。",
    "確認や判断を求める時は `Dialog` を使います。",
  ],
  usage: [
    'Toastはページに置いておき、閉じた状態（`popover="manual"`）で描きます。開くのは、`popovertarget` にToastの `id` を指したボタンか、スクリプトからの `showPopover()` です。開いてもフォーカスは移しません。閉じるボタンも、Toastを指した `popovertarget` のボタンです。`ToastController` を `toast` として登録すると、`duration` と開閉のイベントが働きます。',
    "`tone` で知らせの種類を選び、面をその色で塗ります。印は `success` でチェック、`danger` で丸の中のバツ、他はiです。`actions` を渡すと、知らせの後に操作を置きます。",
    '既定では閉じるボタンを押すまで残します。`duration` にミリ秒を渡すと、開いてからその時間で閉じます。フォーカスがToastの中にある間は数えず、外へ出てから数え直します。失敗の知らせは `live="assertive"` にして自動で閉じず、重要なエラーは入力の近くや `ErrorSummary` にも残します。',
    "単独のToastは、画面の下の書き終わりの側（左から右に読む画面では右下）に浮かべます。",
    "複数のToastは `ToastStack` で囲み、`ToastStackController` を `toast-stack` として登録します。開いた順に、新しいものを手前にして束ねます。二枚以上の時、束を押すと上へ広がり、外を押すかEscapeで畳みます。キーボードでフォーカスが束の中へ入った時も広がります。Toastの中のボタンやリンクを押しても、束は開閉しません。`placement` で置き場所を選びます。",
    "Toastを指した `popovertarget` のボタン（閉じるボタンを含む）を押して開閉した時は、`Dialog` と同じく、取り消せる `toast:beforeshow`・`toast:beforehide` と、`toast:show`・`toast:hide` を知らせます。スクリプトからの `showPopover()`・`hidePopover()` と `duration` で開閉した時は知らせません。開き方に関わらず開閉を受け取る時は、標準の `toggle` を使います。",
    "JavaScriptが無い時も、`popovertarget` のボタンと閉じるボタンでToastを開閉できます。`duration`、開閉のイベント、束ねる動きは働きません。",
  ],
  keyboard: [
    ["Tab", "`ToastStack` の中へフォーカスが入ると、束を広げます。"],
    ["Escape", "広げた `ToastStack` を畳みます。Toastそのものは閉じません。"],
  ],
  accessibility: [
    '`live` に合わせて、`polite` は `role="status"`、`assertive` は `role="alert"` と `aria-live` を付けます。',
    "開いてもフォーカスを移さないので、作業を続けたまま読み上げで結果を伝えます。",
    "閉じるボタンは `closeLabel` を読み上げ名にします。",
    "操作を持つToastに `duration` を付ける時は、読んで操作するまでに閉じない長さにします。フォーカスが中にある間は閉じません。",
    "知らせの色は見分けの補助です。成功か失敗かは文言で伝えます。",
  ],
  events: [
    [
      "toast:beforeshow",
      "取り消せます。`popovertarget` のボタンで開く前に知らせ、`preventDefault()` で開きません。`detail` は `{ reason }` で、`reason` は `pointer` か `keyboard` です。",
    ],
    [
      "toast:show",
      "`popovertarget` のボタンで開いた後に知らせます。`detail` は `toast:beforeshow` と同じです。",
    ],
    [
      "toast:beforehide",
      "取り消せます。閉じるボタンか `popovertarget` のボタンで閉じる前に知らせ、`preventDefault()` で閉じません。`detail` は `toast:beforeshow` と同じです。",
    ],
    [
      "toast:hide",
      "閉じるボタンか `popovertarget` のボタンで閉じた後に知らせます。`detail` は `toast:beforeshow` と同じです。",
    ],
  ],
  propNotes: {
    Toast: { children: "知らせの文。印の隣に書きます。" },
    ToastStack: { children: "束ねる `Toast`。Toastだけを置きます。" },
  },
} satisfies ComponentDoc;
