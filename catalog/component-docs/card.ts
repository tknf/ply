import type { ComponentDoc } from "../reference";

export default {
  id: "card",
  name: "Card",
  description: "関連する内容と操作を一つにまとめる",
  api: ["Card"],
  guidance: [
    "予定・記事・依頼のように、一件の物を題名・本文・補足で一枚の紙に見せる時に使います。",
    "見出しを紙の外の層に置き、一覧や属性のまとまりを載せる時は `LayerCard`、作業面の中を区切るだけの時は `Section` を使います。",
    "一覧の中の一件を行で見せる時は `DataList` を使います。",
  ],
  usage: [
    "`title` は見出しの `h3` になります。`href` を渡すと見出しだけをリンクにし、カード全体をクリック対象にはしません。本文や `footer` に置いたリンク・ボタン・フォームは、見出しのリンクと独立して操作できます。見出しのリンクに指を載せると、紙の影が少し強くなります。",
    '中身は上から `preview`（画像や図）、`eyebrow`（小さな補足）、`title`、本文（`children`）、`footer` の順に積みます。`preview`・`eyebrow`・`footer` は渡した時だけ描きます。`footer` に並べた子は縦の罫線で区切り、`class="end"` を付けた子は終わりの側へ寄せます。',
    'ルートの `article` に `data-density="compact"` を付けると紙の余白を詰めます。`data-state="complete"` は完了を淡い成功の色の地で示し、`data-state="new"` は現れた時に黄色の縁を一度だけ出して消します（動きを減らす設定では出しません）。',
    "長い題名や URL は紙の幅で折り返し、紙からはみ出しません。controllerを持たないので、JavaScriptなしでも同じように表示・操作できます。",
  ],
  accessibility: [
    "ルートは `article`、題名は `h3` です。ページの見出しの階層に合わない場合は、置き場所の側で見出しの構成を調整してください。",
    "リンクは見出しだけに付くので、読み上げではリンクの名前が題名になります。",
    "`preview` に画像を渡す時は、意味のある画像なら `alt` を、飾りなら空の `alt` を利用側で付けてください。",
  ],
  propNotes: {
    Card: {
      children: "本文。段落・Badge・ボタンなど任意の内容を渡せ、題名の下に積む。",
    },
  },
} satisfies ComponentDoc;
