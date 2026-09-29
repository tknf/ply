import type { ComponentDoc } from "../reference";

export default {
  id: "message",
  name: "Message",
  description: "人・時刻・本文を同じ読み順で伝える。",
  api: ["Message"],
  guidance: [
    "コメント・チャット・メールのスレッドのように、誰がいつ何を書いたかを一件ずつ見せる時に使います。",
    "受信した連絡を件名とプレビューで並べて選ばせる時は `MessageList`、出来事を時刻の順に並べる時は `Timeline` を使います。",
    "書く欄は `Composer` を組み合わせます。",
  ],
  usage: [
    "`author`・`time`・`datetime` を渡し、本文を `children` に書きます。見出しの行は名前、時刻（`time` 要素）の順です。`avatar` は名前の行の横の2remの列に置き、`conversation` では本文・操作・返信をその列の後ろから書きます。",
    '既定の `layout="conversation"` は、本文を人の側の上の角だけを立てた淡い吹き出しにし、吹き出しを文の長さに合わせて縮めます。幅は48remまでです。`layout="document"` は一通を一枚の紙にし、日付を見出しの行の終わりに寄せ、本文を1rem・行高1.75で紙の幅いっぱいに読ませます。`document` の `Message` を続けて置くと、紙を少し重ねて一束に積みます。',
    "`actions` は本文の下に、`replies` はさらにその下に置きます。`replies` には返信の `Message` を並べ、親と返信の両方に `avatar` がある時は人の円から下ろした糸でつなぎます。",
    "幅が20rem未満の `Message` では、人の円を名前の行の横だけに置き、本文と操作を円の下から全幅で書きます。本文の長い URL は吹き出しの幅で折り返します。",
    "送信・既読・返信・リアクションのデータと保存は利用側が持ちます。controllerを持たないので、JavaScriptなしでも同じように表示されます。",
  ],
  accessibility: [
    "ルートは `article` で、名前は `strong`、時刻は `datetime` 付きの `time` 要素です。",
    "`avatar` は読み上げから外します（名前は `author` で読むため）。円に名前以外の意味を持たせないでください。",
    "`actions` のボタンには、どの投稿への操作か分かる名前を付けてください。同じ文言のボタンが並ぶ時は `aria-label` で投稿者などを補います。",
  ],
  propNotes: {
    Message: {
      children:
        "本文。段落・FileItemなど任意のHTMLを渡せる。conversationでは吹き出しに、documentでは紙の全幅に入れる。",
    },
  },
} satisfies ComponentDoc;
