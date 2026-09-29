import type { ComponentDoc } from "../reference";

export default {
  id: "action-tile",
  name: "ActionTile",
  description: "塗りつぶしの印と名前を縦に積み、格子に並べる入口や操作",
  api: ["ActionTile"],
  guidance: [
    "よく使う場所への入口や、選んだ物への一括操作を、印と名前で格子に並べる時に使います。`CommandMenu` の上段の入口と、`Table` の `selectionActions` の一括操作もこのタイルです。",
    "画面の下に浮かぶ操作の棚にする時は、タイルを並べる `ActionDock` を使います。",
    "文の流れの中やフォームの末尾に置く一つの操作は `Button` を使います。",
  ],
  usage: [
    '`label` と `icon` は必須です。印は塗りつぶしで上、名前は下に置きます。`href` を渡すと移動のリンク（`current` で今いる場所）、渡さなければ `type="button"` のボタンになり、`onclick` や `data-*` で操作を結び付けます。残りの標準の属性は `a` または `button` に渡ります。',
    "`accent` は `blue`（既定）・`green`・`amber`・`coral` で、印の色と、指を載せた時の淡い地の色が変わります。",
    "普段は影のない平らな淡い面で、指を載せると印の色を淡く敷き、押すと内側へへこみます。`disabled` はリンクなら移動しない印（`href` の無い `span`）、ボタンなら押せない状態にし、どちらも半透明にします。",
    "`shortcut` は `Keycap` の小さい形で、印の終わりの側の上に添えます。キーの登録は利用側が行います。`badge` は `Badge` の小さい形で、印の上に重ねます。札がある時は、キーの印をタイルの終わりの角へ寄せます。",
    "タイルは升いっぱいに広がるので、並べ方と列数は置く側の格子が決めます。名前は語の途中で切らず、文節の切れ目で折り返します。",
    "文字の指定（書体・大きさ・太さ・行高）は `action-tile.css` が持ちます。共通の `Button` とは別の専用の操作として、文字位置の検査に登録しています。",
  ],
  accessibility: [
    'リンクは `a`、操作は `button` なので、標準のキー操作で押せます。`current` のリンクは `aria-current="page"` を持ちます。',
    '`disabled` のリンクは `role="link"`・`aria-disabled="true"` の `span` になり、フォーカスできません。',
    "`shortcut` の表記は読み上げから外します（`aria-hidden`）。`badge` の文字は名前の前に続けて読み上げます。",
    "強制カラーモードでは、タイルに枠を引きます。",
  ],
} satisfies ComponentDoc;
