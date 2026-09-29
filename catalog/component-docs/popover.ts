import type { ComponentDoc } from "../reference";

export default {
  id: "popover",
  name: "Popover",
  description: "補足や小さな操作を必要な時に開く",
  api: ["Popover"],
  guidance: [
    "用語の補足、関連するリンク、短い入力のように、必要な時だけ開いて見る内容に使います。背後の画面は操作できるままです。",
    "答えるまで先へ進ませない確認や必須の入力は `Dialog` を使います。",
    "リンクや対象に指を載せた時の概要は `HoverCard`、操作に添える一言の補足は `Tooltip` を使います。",
    "補助の操作を並べるだけなら `DropdownMenu` を使います。",
  ],
  usage: [
    '標準のPopover API（`popover="auto"`）で開閉する、モーダルでない白い紙です。開く操作と紙はCSSのアンカーで結び、開く操作の下に揃えて置きます。`id` は画面内で一意にします。',
    "`PopoverController` を `popover` として登録すると、CSSのアンカーに対応しない環境や、紙が画面に収まらない時に位置を補い、画面の端から8pxの内側に収めます。スクロールと画面の大きさの変化にも追従します。",
    "紙は見出し・本文・操作欄に分けます。`title` を省略すると `label` を見出しにし、`titleHidden` で見出しを読み上げだけに残せます。`description` は見出しの下の説明、`actions` は下の操作欄です。`size` は紙の幅の上限で、`compact` は16rem、`default` は20rem、`wide` は28remです。",
    '`align` の `end` は、行の終わりの側に置いた開く操作に揃えます。`dir="rtl"` では始端と末端が入れ替わります。',
    "開く操作は `icon`・`iconOnly`・`disabled`・`triggerVariant` で変えられます。`iconOnly` の開く操作には `tooltip` で名前を出せます。",
    "開くと見出しへフォーカスを移します。`initialFocus` を `content` にすると、本文の `autofocus` の欄へ移ります。紙の外側を押す・Escape・閉じる操作で閉じます。紙の中に別の `Popover` を開いても、元の紙は開いたままです。",
    "本文のフォームの送信やリンクの移動は、標準の振る舞いのまま利用側が扱います。JavaScriptなしでも標準のPopover APIで開閉し、CSSのアンカーに対応しない環境では紙を画面の中央に出します。",
  ],
  keyboard: [
    [
      "Enter / Space（開く操作）",
      "紙を開き、見出し（`initialFocus` が `content` なら本文の `autofocus` の欄）へ移ります。",
    ],
    ["Escape", "紙を閉じ、開く操作へフォーカスを戻します。"],
  ],
  accessibility: [
    '紙は `role="dialog"` で、見出しを名前（`aria-labelledby`）、`description` を説明（`aria-describedby`）にします。見出しは `tabindex="-1"` で、Tabの巡回には入りません。',
    '開く操作は `aria-haspopup="dialog"`・`aria-controls` を持ちます。`iconOnly` の時は `label` を `aria-label` にします（`icon` が無ければinfoの印を出します）。',
    "`tooltip` で出す名前は見た目だけの補足で、`aria-describedby` には結び付けません。名前は `aria-label` で読み上げます。",
    "見出しの横の閉じる操作は印だけなので、`closeLabel` を `aria-label` にします。閉じる操作とEscapeで閉じると、開く操作へフォーカスを戻します。",
  ],
  propNotes: {
    Popover: {
      children: "紙の本文。リンクや短いフォームを置ける。",
    },
  },
} satisfies ComponentDoc;
