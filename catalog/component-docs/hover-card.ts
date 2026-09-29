import type { ComponentDoc } from "../reference";

export default {
  id: "hover-card",
  name: "HoverCard",
  description: "対象の概要と関連操作を近くに表示する",
  api: ["HoverCard"],
  guidance: [
    "人・案件・資料へのリンクのように、移る前に中身の概要を確かめたい対象に使います。",
    "一言の補足で足りる時は `Tooltip`、押して開く補足や小さな入力は `Popover` を使います。",
    "指を載せなくても分かるよう、欠かせない情報はプレビューだけに置かず、移動先にも置きます。",
  ],
  usage: [
    "`HoverCardController` を `hover-card` として登録します。`id` は画面内で一意にします。指を載せて300ms後、またはフォーカスした時にプレビューの紙を開き、指とフォーカスが離れて150ms後に閉じます。指を紙へ移す間は、斜めに横切っても開いたままです。",
    "`href` が無ければ `label` の操作を押しても開きます。`href` を渡すと、`label` を移動のリンクにし、隣に目の印のプレビュー操作を置きます。リンクを押すと移動し、プレビュー操作を押すと紙を開きます。プレビュー操作はcontrollerが働いた時だけ出します。",
    "紙の見出し・説明・本文・操作欄の組み立ては `Popover`・`Dialog` と同じです。`title` を省略すると `label` を見出しにします。関連する操作がある時だけ `actions` を渡します。`size` は紙の幅の上限で、`compact` は16rem、`default` は20rem、`wide` は28remです。",
    "Escapeと、見出しの横の閉じる操作で閉じます。閉じた後は、指を離すかフォーカスを外すまで再び開きません。",
    "タッチの操作では指を載せても開きません。JavaScriptなしでは紙は開かず、リンクは通常のリンクとして動きます。紙の中身の取得や操作の処理は利用側が行います。",
  ],
  keyboard: [
    ["Tab（リンク・操作へ）", "フォーカスすると紙を開きます。紙の中の操作へもTabで進めます。"],
    ["Enter / Space（プレビュー操作）", "紙を開きます。"],
    ["Escape", "紙を閉じ、紙の中にフォーカスがあれば開いた操作へ戻します。"],
  ],
  accessibility: [
    '紙は `role="dialog"` で、見出しを名前（`aria-labelledby`）、`description` を説明（`aria-describedby`）にします。',
    "開く操作とプレビュー操作は `aria-controls` と `aria-expanded` を持ちます。プレビュー操作は「（label）のプレビューを開く」という名前で読み上げます。",
    "紙の中に `autofocus` を置くと、controllerは働かず、コンソールに警告を出します。",
    "見出しの横の閉じる操作は印だけなので、`closeLabel` を `aria-label` にします。",
  ],
  events: [
    [
      "hover-card:beforetoggle",
      "紙を開く・閉じる直前。取り消せます。`detail` は `open`（次の状態）・`previousOpen`・`reason`（`pointer` または `keyboard`）です。",
    ],
    [
      "hover-card:toggle",
      "紙を開いた・閉じた後。`detail` は `hover-card:beforetoggle` と同じです。",
    ],
  ],
  propNotes: {
    HoverCard: {
      children: "紙の本文。対象の概要を置く。",
    },
  },
} satisfies ComponentDoc;
