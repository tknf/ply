import { EmojiPicker, type EmojiGroup } from "./emoji-picker";
import { InputGroup } from "./input-group";
import { Popover } from "./popover";
import { classes, type ElementProps } from "./types";

export type Reaction = {
  /** 絵文字や短い言葉。同じ内容の反応は一枚の札にまとめる。 */
  content: string;
  /** 読み上げの名前（絵文字の名前など）。渡さなければcontentを読む。 */
  name?: string;
  /** 付けた人の名前。数はこの人数で、指を載せた時と読み上げで誰が付けたかを伝える。 */
  by: readonly string[];
  /** 自分も付けているもの。 */
  mine?: boolean;
};
export type ReactionsProps = ElementProps<"div"> & {
  label: string;
  items: readonly Reaction[];
  /**
   * 渡すと、札を押して自分の反応を付け外しでき、終わりに反応を追加する操作を置く。
   * 追加の板はEmojiPickerと、短い言葉で反応する欄（16文字まで）を持つ。
   * 付け外しはreactions:toggleで内容と付けたかどうかを知らせる。保存は利用側が持つ。
   */
  add?: {
    id: string;
    me?: string;
    label?: string;
    groups?: readonly EmojiGroup[];
    textLabel?: string;
    submitLabel?: string;
  };
};

const who = (by: readonly string[]) => by.join("、");

/**
 * 項目に付いた反応。同じ絵文字や言葉は一枚の札にまとめ、付けた人数を添える。
 * 別々の人が同じ絵文字を付けると数が増え、自分が付けている札は淡い青にする。自分の札を押すと外し、
 * 他の人の札を押すと自分も同じ反応を付ける。新しい反応はEmojiPickerから選ぶか、短い言葉を書いて追加する。
 */
export const Reactions = ({
  label,
  items,
  add,
  class: className,
  ...attributes
}: ReactionsProps) => {
  const me = add?.me ?? "自分";
  return (
    <div
      {...attributes}
      class={classes("ply-reactions", className)}
      data-controller={add ? "reactions" : undefined}
      data-reactions-me-value={add ? me : undefined}
      data-action={add ? "emoji-picker:pick->reactions#pick" : undefined}
    >
      <ul aria-label={label} data-reactions-target="list">
        {items
          .filter((item) => item.by.length > 0)
          .map((item) => (
            <li>
              {add ? (
                <button
                  type="button"
                  class="reaction"
                  aria-pressed={item.mine ? "true" : "false"}
                  data-mine={item.mine ? "true" : "false"}
                  aria-label={`${item.name ?? item.content}：${who(item.by)}`}
                  title={who(item.by)}
                  data-content={item.content}
                  data-name={item.name}
                  data-by={JSON.stringify(item.by)}
                  data-action="reactions#toggle"
                >
                  <span class="content" aria-hidden="true">
                    {item.content}
                  </span>
                  <span class="count" aria-hidden="true">
                    {item.by.length}
                  </span>
                </button>
              ) : (
                <span
                  class="reaction"
                  data-mine={item.mine ? "true" : undefined}
                  title={who(item.by)}
                >
                  <span class="content" aria-hidden="true">
                    {item.content}
                  </span>
                  <span class="count" aria-hidden="true">
                    {item.by.length}
                  </span>
                  <span class="ply-visually-hidden">
                    {item.name ?? item.content}：{who(item.by)}
                  </span>
                </span>
              )}
            </li>
          ))}
      </ul>
      {add && (
        <Popover
          id={add.id}
          label={add.label ?? "リアクションを追加"}
          title={add.label ?? "リアクションを追加"}
          titleHidden
          icon="smiley"
          iconOnly
          triggerVariant="link"
          initialFocus="content"
          tooltip
        >
          <div class="add">
            {/* 開いた時は言葉の欄へ移る。確定は日本語入力の変換中のEnterを除き、Enterか「追加」で行う。 */}
            <InputGroup
              id={`${add.id}-text`}
              class="text"
              maxlength={16}
              autocomplete="off"
              autofocus
              aria-label={add.textLabel ?? "リアクションを入力"}
              placeholder={add.textLabel ? `${add.textLabel}…` : "リアクションを入力…"}
              data-reactions-target="text"
              data-action="keydown.enter->reactions#addText"
              action={{ label: add.submitLabel ?? "追加", "data-action": "reactions#addText" }}
            />
            <EmojiPicker id={`${add.id}-picker`} groups={add.groups} />
          </div>
        </Popover>
      )}
    </div>
  );
};
