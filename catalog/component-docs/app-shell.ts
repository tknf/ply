import type { ComponentDoc } from "../reference";

export default {
  id: "app-shell",
  name: "AppShell",
  description: "上部中央のコマンドと、中央の作業面を持つアプリの骨格。",
  api: ["AppShell"],
  guidance: [
    "アプリの各画面に共通する骨格として、上部中央のコマンドと中央の作業面を置く時に使います。",
    "画面の端に固定するサイドバーは持ちません。画面全体の移動は`commands`の`CommandMenu`、作業面に付属する補助パネルは`wings`（`Wing`）で扱います。",
    "`AppShell`を使わない画面で作業面だけを置く時は`Surface`を使います。",
  ],
  usage: [
    "`commands`に`CommandMenu`を一つ渡し、`home`・`account`を上部の帯の左右に置きます。帯は画面の上端に留まり、左右の内容の幅に関わらず`commands`を画面の中央に置きます。`home`・`account`を省略すると、その枠を出しません。",
    "`children`は中央の作業面に置きます。作業面は白い面で、幅の上限は`--ply-page`（既定は68rem）です。横に広い画面では、ルートの`style`で`--ply-page`を上書きします。作業面の列は作業面の幅に収まるので、広い表などは中身の側で横にスクロールさせます。",
    "`AppShell`の幅が45rem未満では作業面の外側と内側の余白を詰め、28rem未満では`commands`を一段目、`home`・`account`を二段目の左右に置きます。",
    "`wings`に`start`・`end`を渡すと、作業面を`Wing`で包み、左右に開閉できる補助パネルを付けます。開閉の状態を保存する時は`storageKey`・`savedState`も渡し、`WingController`を`wing`として登録します（詳しくは`Wing`のページ）。",
    "`AppShell`自身はcontrollerを使わず、JavaScriptなしでも同じ配置で表示します。",
  ],
  accessibility: [
    '上部の帯は`header`で、`commands`は`aria-label="共通コマンド"`の`nav`に置きます。',
    "作業面は`div`で、`main`を持ちません。画面の本文は`children`の中で利用側が`main`で包みます。",
    "`home`・`account`に文字のないリンクや操作を置く時は、読み上げ名を利用側で付けます。",
  ],
  propNotes: {
    AppShell: {
      children: "中央の作業面に置く、画面の中身。",
    },
  },
} satisfies ComponentDoc;
