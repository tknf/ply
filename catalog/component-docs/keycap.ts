import type { ComponentDoc } from "../reference";

export default {
  id: "keycap",
  name: "Keycap",
  description: "キーボード操作の表記を揃える",
  api: ["Keycap"],
  guidance: [
    "文中や操作の横で、キーボードの操作を示す時に使います。キーの印を出す所は、どの部品でもこの印を使います。",
    "`DropdownMenu`・`FilterMenu` の `shortcut`、`ActionTile`・`ActionDock` の `shortcut` は、中でこの印の小さい形を使います。",
  ],
  usage: [
    "表記だけのコンポーネントです。`keys` の各キーを `kbd` にして並べます。ショートカットの登録と実行は利用側が行います。",
    '`size="small"` はタイルの角やメニューの行の終わりに添える小さな印です。`inverse` は青のメニューや塗った面の上に置く時に使い、地を塗らず、文字と同じ色の淡い縁にします。',
    "文字の基準線に揃えて文中に置き、幅が足りなければキーの間で折り返します。",
  ],
  accessibility: [
    "キーは `kbd` として並べます。「⌘」のような記号だけの表記は読み上げで伝わりにくいため、文中に読める名前を添えるか、`aria-label` を付けます。",
    '操作の横に添えた表記が操作の名前と重なる時は、`aria-hidden="true"` で読み上げから外します。',
  ],
} satisfies ComponentDoc;
