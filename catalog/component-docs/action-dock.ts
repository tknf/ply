import type { ComponentDoc } from "../reference";

export default {
  id: "action-dock",
  name: "ActionDock",
  description: "下に浮かぶ、印・名前・キーの印を並べた操作の棚",
  api: ["ActionDock"],
  guidance: [
    "開いている一件（スレッドや記事）に対する主な操作を、内容を読みながらいつでも押せるよう、下に浮かべて並べる時に使います。",
    "格子に並べる入口や一括操作は、棚に載せずに `ActionTile` を並べます。",
    "対象の近くに置く操作の並びは `Toolbar`、補助の操作をしまう時は `DropdownMenu` を使います。",
  ],
  usage: [
    "白い紙を下の中央に浮かべ、`items` の操作を `ActionTile` で横に並べます。`items` の指定は `ActionTile` と同じで、`href` があればリンク、無ければボタンになります。",
    "棚の中のタイルは普段の面を消して平らにし、指を載せた時だけ淡い面を出します。一つのタイルの幅は5.25rem以上です。",
    "`shortcut` でキーの印、`badge` で「下書き」のような状態の札を印の上に重ねます。キーの登録は利用側が行います。",
    "`placement` の `sticky`（既定）は置いた場所の下端に留め、`fixed` は画面の下に浮かべます。`fixed` では端末の下端の安全領域の上に置きます。棚は置き場所の幅いっぱいの透明な枠で、中身の幅で親を押し広げません。狭い場所では横にスクロールします。",
    "操作を押した後の処理は、各タイルの `onclick` や `data-*` で利用側が行います。",
  ],
  accessibility: [
    "棚は `nav` で、`label` を名前として読み上げます。タイルは一覧（`ul`）の項目として並びます。",
    "各タイルは通常のTab停止点です。キーの印は読み上げから外します。",
    "強制カラーモードでは、紙に輪郭線を引きます。",
  ],
} satisfies ComponentDoc;
