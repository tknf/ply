import type { ComponentDoc } from "../reference";

export default {
  id: "countdown",
  name: "Countdown",
  description: "期限や残りを大きな数で示す丸い印",
  api: ["Countdown"],
  guidance: [
    "締め切りまでの日数や残りの件数を、カードなどの端で目立たせる時に使います。",
    "集計した値を名前・単位・条件と並べて比べる時は `Statistic` を使います。",
    "状態を短い言葉で示す時は `Badge` を使います。",
  ],
  usage: [
    "白い丸に `value` を大きな太い数で置き、`before` を数の上、`after` を数の下に小さく添えます。数の代わりに「完」のような一文字も置けます。",
    "役割の色（`tone`）の細い輪で縁取り、紙の影で浮かせます。期限が迫る時は `danger`、ただの残数は `info` など、意味に合わせて選びます。",
    "残りの数は利用側で数えて渡します。Countdownは時間の経過で数を変えません。",
    "カードの縁にまたがせる時は、置く側で位置（`position` など）を決め、はみ出す分の余白も置く側で取ります。JavaScriptは使いません。",
  ],
  accessibility: [
    '全体を `role="img"` にし、`label` を読み上げ名にします。中の数と言葉は読まないので、`label` に「締め切りまであと3日」のような全文を書きます。',
    "輪の色は補助です。急ぎかどうかは `label` と `before`・`after` の言葉で伝えます。",
  ],
} satisfies ComponentDoc;
