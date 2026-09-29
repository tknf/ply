import type { ComponentDoc } from "../reference";

export default {
  id: "profile-header",
  name: "ProfileHeader",
  description: "大きな人の円と名前、この人への設定の帯",
  api: ["ProfileHeader"],
  guidance: [
    "人やグループの画面の上部で、名前と、この人に対する設定（通知・振り分け・メモなど）をまとめる時に使います。",
    "人以外の画面の見出しは`PageHeader`を使います。",
  ],
  usage: [
    '`avatar`に`Avatar`の`size="large"`、`name`に名前を渡します。大きな円・太字の大きな名前・淡い`detail`を中央に積みます。',
    "`badge`（所属などの小さな札）は始まりの側の上の角、`actions`（編集など）は終わりの側の上の角に置きます。",
    "`preferences`には、この人への設定の`DropdownMenu`や`Button`を渡します。名前の下の灰色の帯に、面を持たない形で並べ、狭い場所では折り返します。設定の保存は利用側が担います。",
    "名前の見出しの段は`headingLevel`で決めます。画面の見出しなら`1`、画面の中の一部として置くなら前後の見出しに合わせて`2`・`3`にします。",
  ],
} satisfies ComponentDoc;
