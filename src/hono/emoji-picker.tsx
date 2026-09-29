import { Icon } from "./icon";
import { InputGroup } from "./input-group";
import { classes, type ElementProps } from "./types";

export type Emoji = {
  /** 格子に出し、選んだ時にemoji-picker:pickで知らせる絵文字。 */
  emoji: string;
  /** 読み上げと指を載せた時の名前。 */
  name: string;
  /** 探す時に当てる別の言葉。 */
  keywords?: readonly string[];
};
export type EmojiGroup = {
  /** 種類の見出し。格子のまとまりの読み上げ名にもなる。 */
  label: string;
  /** この種類に並べる絵文字。並べた順に格子へ置く。 */
  emojis: readonly Emoji[];
};

/** 既定の絵文字。反応によく使うものだけに絞る。全ての絵文字を並べたい時は利用側でgroupsを渡す。 */
export const defaultEmojiGroups: readonly EmojiGroup[] = [
  {
    label: "よく使う",
    emojis: [
      { emoji: "👍", name: "いいね", keywords: ["good", "賛成", "了解"] },
      { emoji: "🎉", name: "お祝い", keywords: ["party", "おめでとう"] },
      { emoji: "❤️", name: "ハート", keywords: ["heart", "好き"] },
      { emoji: "😄", name: "笑顔", keywords: ["smile", "うれしい"] },
      { emoji: "🙏", name: "お願い", keywords: ["thanks", "ありがとう", "感謝"] },
      { emoji: "👀", name: "見ています", keywords: ["eyes", "確認中"] },
      { emoji: "🚀", name: "ロケット", keywords: ["rocket", "公開", "出発"] },
      { emoji: "✅", name: "完了", keywords: ["done", "チェック", "済み"] },
    ],
  },
  {
    label: "顔",
    emojis: [
      { emoji: "😀", name: "にっこり", keywords: ["grin"] },
      { emoji: "😂", name: "うれし泣き", keywords: ["joy", "笑"] },
      { emoji: "😊", name: "ほほえみ", keywords: ["blush"] },
      { emoji: "😍", name: "目がハート", keywords: ["love"] },
      { emoji: "🤔", name: "考え中", keywords: ["thinking", "うーん"] },
      { emoji: "😮", name: "驚き", keywords: ["wow", "えっ"] },
      { emoji: "😢", name: "悲しい", keywords: ["sad", "涙"] },
      { emoji: "😅", name: "冷や汗", keywords: ["sweat", "苦笑"] },
      { emoji: "😎", name: "サングラス", keywords: ["cool"] },
      { emoji: "🥳", name: "パーティー", keywords: ["party", "お祝い"] },
      { emoji: "😴", name: "眠い", keywords: ["sleep"] },
      { emoji: "🙂", name: "少しほほえみ", keywords: ["slight smile"] },
    ],
  },
  {
    label: "手",
    emojis: [
      { emoji: "👏", name: "拍手", keywords: ["clap", "すごい"] },
      { emoji: "👎", name: "よくない", keywords: ["bad", "反対"] },
      { emoji: "👌", name: "オーケー", keywords: ["ok"] },
      { emoji: "✌️", name: "ピース", keywords: ["peace", "victory"] },
      { emoji: "🙌", name: "ばんざい", keywords: ["hooray", "やった"] },
      { emoji: "👋", name: "手を振る", keywords: ["wave", "こんにちは", "さようなら"] },
      { emoji: "💪", name: "力こぶ", keywords: ["strong", "がんばる"] },
      { emoji: "🤝", name: "握手", keywords: ["handshake", "合意"] },
    ],
  },
  {
    label: "物と記号",
    emojis: [
      { emoji: "🔥", name: "炎", keywords: ["fire", "熱い"] },
      { emoji: "⭐", name: "星", keywords: ["star", "お気に入り"] },
      { emoji: "💡", name: "ひらめき", keywords: ["idea", "電球"] },
      { emoji: "📌", name: "ピン", keywords: ["pin", "固定"] },
      { emoji: "📎", name: "クリップ", keywords: ["clip", "添付"] },
      { emoji: "⏰", name: "時計", keywords: ["alarm", "締め切り"] },
      { emoji: "☕", name: "コーヒー", keywords: ["coffee", "休憩"] },
      { emoji: "🎯", name: "的", keywords: ["target", "目標"] },
      { emoji: "⚠️", name: "注意", keywords: ["warning"] },
      { emoji: "❓", name: "質問", keywords: ["question", "はてな"] },
      { emoji: "❌", name: "バツ", keywords: ["no", "だめ"] },
      { emoji: "💯", name: "満点", keywords: ["100", "完璧"] },
    ],
  },
];

export type EmojiPickerProps = Omit<ElementProps<"div">, "children"> & {
  /** 探す欄と種類の見出しのIDの頭。ページ内で一意にする。 */
  id: string;
  /** 板全体（role="group"）の読み上げ名。 */
  label?: string;
  /** 種類ごとの絵文字。渡さなければ反応によく使う40個（defaultEmojiGroups）を並べる。 */
  groups?: readonly EmojiGroup[];
  /** 探す欄の薄い文字。欄の読み上げ名にも使う。 */
  placeholder?: string;
  /** 探した言葉に当てはまる絵文字が無い時に出す文。 */
  emptyLabel?: string;
  /** Popoverの中に置く時。開いた時に探す欄へ移る。 */
  autofocus?: boolean;
};

/**
 * 絵文字を探して選ぶ板。上に探す欄、下に種類ごとの絵文字の格子を並べる。
 * 選ぶとemoji-picker:pickで絵文字と名前を知らせる。Popoverの中に置いて反応を追加する時などに使う。
 * 格子の中は矢印で移り、Enterか押して選ぶ。Tabで格子へ入る所は一か所だけにする。
 */
export const EmojiPicker = ({
  id,
  label = "絵文字を選ぶ",
  groups = defaultEmojiGroups,
  placeholder = "絵文字を探す…",
  emptyLabel = "当てはまる絵文字はありません",
  autofocus = false,
  class: className,
  ...attributes
}: EmojiPickerProps) => (
  <div
    {...attributes}
    class={classes("ply-emoji-picker", className)}
    role="group"
    aria-label={label}
    data-controller="emoji-picker"
  >
    <InputGroup
      id={`${id}-search`}
      type="search"
      prefix={<Icon name="search" />}
      aria-label={placeholder}
      placeholder={placeholder}
      autocomplete="off"
      autofocus={autofocus}
      data-emoji-picker-target="input"
      data-action="input->emoji-picker#filter"
    />
    <div class="groups" data-action="keydown->emoji-picker#move">
      {groups.map((group, groupIndex) => (
        <section
          class="group"
          data-emoji-picker-target="group"
          aria-labelledby={`${id}-group-${groupIndex}`}
        >
          <h3 class="title" id={`${id}-group-${groupIndex}`}>
            {group.label}
          </h3>
          <div class="grid">
            {group.emojis.map((item, index) => (
              <button
                type="button"
                class="emoji"
                tabindex={groupIndex === 0 && index === 0 ? 0 : -1}
                aria-label={item.name}
                title={item.name}
                data-emoji={item.emoji}
                data-search={[item.name, ...(item.keywords ?? [])].join(" ").toLocaleLowerCase()}
                data-emoji-picker-target="emoji"
                data-action="emoji-picker#pick"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </section>
      ))}
      <p class="empty" data-emoji-picker-target="empty" hidden>
        {emptyLabel}
      </p>
    </div>
  </div>
);
