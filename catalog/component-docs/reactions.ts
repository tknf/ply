import type { ComponentDoc } from "../reference";

export default {
  id: "reactions",
  name: "Reactions",
  description: "同じ絵文字をまとめ、付けた人数を添えた反応の札",
  api: ["Reactions"],
  guidance: [
    "投稿やコメントに付いた反応を、絵文字や短い言葉ごとにまとめて示し、自分も付け外しさせる時に使います。",
    "絵文字を選ぶ板だけが要る時は `EmojiPicker` を使います。",
  ],
  usage: [
    "`items` に反応ごとの `content`（絵文字や短い言葉）と `by`（付けた人の名前の並び）を渡します。札は `by` の人数を数として添え、指を載せると付けた人の名前を出します。自分も付けている反応は `mine` にすると、淡い青の面・青い縁・青い数にします。",
    "`add` を渡すと札が押せるボタンになります。自分の札を押すと外し、他の人の札を押すと自分も付けます。数が0になった札は消えます。付け外しで `by` に足し引きする自分の名前は `add.me` で、`mine` の反応の `by` にも同じ名前を入れておきます。",
    "`add` がある時は、札の終わりに「リアクションを追加」の操作を置きます。開く板には16文字までの言葉の欄と `EmojiPicker` があり、開くと言葉の欄へ移ります。選んだ絵文字や書いた言葉は、同じ札があればそこへ自分を加え、なければ終わりに新しい札を作ります。",
    "`ReactionsController` を `reactions`、`EmojiPickerController` を `emoji-picker` として登録し、追加の板に使う `PopoverController`・`TooltipController` も登録します。付け外しは `reactions:toggle` で知らせるので、保存は利用側で行います。札はcontrollerがその場で書き換え、保存に失敗した時に戻す処理は含みません。",
    "`add` がない時は読むだけの札です。JavaScriptがない時は札を押しても変わりません。",
  ],
  keyboard: [
    ["Enter / Space", "フォーカスのある札で、自分の反応を付け外しします。"],
    [
      "Enter",
      "言葉の欄で、書いた言葉を反応として追加します。日本語入力の変換を確定するEnterでは追加しません。",
    ],
    ["Esc", "追加の板を閉じます。"],
  ],
  accessibility: [
    "札の並びは `ul` で、`label` を名前にします。`label` は画面には出しません。",
    "札は「いいね：田中 遥、佐藤 健」のように、`name`（無ければ `content`）と付けた人を読み上げ、絵文字と数は読み上げから外します。押せる札は `aria-pressed` で自分が付けているかを伝えます。絵文字の反応には `name` を渡します。",
    "追加の操作はアイコンだけのボタンで、`add.label` を名前にし、Tooltipで名前を見せます。板の見出しは読み上げだけに残します。",
    "札を外して消えた時は次の札か追加の操作へ、反応を追加した時はその札へフォーカスを移します。絵文字の板の中の操作は `EmojiPicker` と同じです。",
  ],
  events: [
    [
      "reactions:toggle",
      "自分の反応を付けた・外した時に知らせます。detailは `content`（反応の内容）と `selected`（付けた時は `true`）です。",
    ],
  ],
} satisfies ComponentDoc;
