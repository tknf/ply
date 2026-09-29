import type { ComponentDoc } from "../reference";

export default {
  id: "tag",
  name: "Tag",
  description: "分類や選択した条件を短く示す",
  api: ["Tag", "TagGroup"],
  guidance: [
    "記事の分類や、選んだ絞り込みの条件を短く示す時に使います。",
    "公開中・確認待ちなどの状態は、地を塗った `Badge` で示します。Tagは地を塗らず、縁で分類を示します。",
    "利用者が自由に書いてタグを足す欄は `TagInput` を使います。",
  ],
  usage: [
    "`label` を渡します。縁は文字と同じ色、文字はMediumです。`accent` は `blue`・`green`・`amber`・`coral` から選び、渡さなければ淡い灰にします。",
    "`href` を渡すと分類へ移るリンクになり、指を載せると役割の色を淡く敷きます。",
    "`removeButton` を渡すと札の終わりに外す×を置きます。外した後の処理は利用側が持ちます。`href` と `removeButton` は同時に使えません。",
    "複数の札は `TagGroup` で囲みます。札の間を0.5remあけて折り返し、長い文言も省略しません。",
    "`Tag` は `class`・`id` などのHTML属性を札のルート（`href` がある時は `a`、それ以外は `span`）に渡します。JavaScriptは使いません。",
  ],
  accessibility: [
    '`TagGroup` は `role="group"` で、`label` を名前にします。',
    "外す操作はアイコンだけのボタンなので、「暮らしを解除」のように何を外すかを `aria-label` で付けます。",
    "`accent` の色は見分けの補助です。意味は文言で伝えます。",
  ],
  propNotes: {
    TagGroup: { children: "並べる `Tag`。" },
  },
} satisfies ComponentDoc;
