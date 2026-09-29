import type { ComponentDoc } from "../reference";

export default {
  id: "action-list",
  name: "ActionList",
  description: "作業の入口を、一覧や内容の見えるカードで示します。",
  api: ["ActionList"],
  guidance: [
    "別の画面へ移って行う作業や道具の入口を、印と名前で並べる時に使います。",
    "各行は一つのリンクです。行に状態やボタンなど別の操作が付く時は `DataList` を使います。",
    "印と名前を縦に積んだ大きな入口や、その場で行う操作には `ActionTile` を使います。",
  ],
  usage: [
    "`items` に入口ごとの `title` と `href` を渡し、`description` と塗りつぶしの `Icon`（`icon`）を添えます。名前は、移った先で行う作業を動詞で書きます。",
    '`layout="list"` は淡い板に行を積み、名前の書き始めから細い線で区切ります。`layout="grid"` は各入口を角丸のタイルにし、13rem以上の幅で格子に並べます。',
    "`accent` は印の丸の色で、`blue`・`green`・`amber`・`coral` で用途を見分けます。状態を示す色には使いません。確かめていない連絡先のように手当てが要る行は `attention` にすると、`accent` より優先して印・名前・説明を危険の色で書きます。",
    "`preview` に直近の数件などを渡すと、説明の下に中身の見本を置きます。行全体がリンクなので、見本の中にボタンやリンクを置きません。",
    "指を載せると行が淡い面になり、押すと内側へへこみます。JavaScriptは使いません。",
  ],
  accessibility: [
    "ルートは `ul` で、各入口は `li` の中の一つの `a` です。一覧の名前は `aria-label` などで利用側が付けます。",
    "`icon` に置く `Icon` は読み上げから外れます。名前だけで移る先が分かるように書きます。",
    "`attention` は色で示すので、手当てが要る理由を `description` に書きます。",
  ],
} satisfies ComponentDoc;
