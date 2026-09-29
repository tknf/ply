import type { ComponentDoc } from "../reference";

export default {
  id: "divider",
  name: "Divider",
  description: "意味のある区切りと見出しを置く",
  api: ["Divider"],
  guidance: [
    "公開済みと下書きの境など、内容の意味が切り替わる所に、区切りと短い名前を置く時に使います。",
    "余白の調整には使わず、親の`gap`で間を取ります。",
    "見出しと件数を持つまとまりは`Section`を使います。",
  ],
  usage: [
    "`label`を省略すると、線だけの区切り（`actions`があれば線と操作）を出します。`label`を渡すと、始まりの側に名前、残りの幅に線を引きます。名前には文字のほか、`InlineSelect`などの選択も置けます。",
    '`line="solid"`は確定した区切り、`line="dashed"`は破線で、ここから先はまだ確定していないことを示します。',
    "`actions`には、区切りの先の物をまとめて扱う操作（「すべて見る」の`ActionLink`など）だけを置きます。操作は線の終わりに置き、狭い場所では次の行の終わりの側へ回します。",
    "長い名前は折り返し、線は残りの幅に引きます。",
  ],
  accessibility: [
    "`label`も`actions`もない区切りは`hr`で、区切りとして読み上げます。",
    "`label`を持つ区切りは`div`で、名前は見出しではない文字として読みます。見出しで移動できるまとまりにする時は`Section`を使います。",
  ],
} satisfies ComponentDoc;
