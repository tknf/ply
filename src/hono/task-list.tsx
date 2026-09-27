import type { Child } from "hono/jsx";
import { Choice } from "./field";
import { Icon } from "./icon";
import { classes, type ElementProps } from "./types";

export type TaskListProps = ElementProps<"div"> & {
  label: string;
  /** 一覧の外側の見出し。開閉でき、未完了の数と進み具合を添える。 */
  heading?: string;
  /** 行の一覧の上に書く、この一覧の名前。 */
  title?: string;
  /** 最後の行に置く、項目を書き足す欄。送信と追加は利用側のフォームで扱う。 */
  add?: { name: string; placeholder: string; form?: string };
  items: readonly {
    name: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    detail?: Child;
    value?: string;
    end?: Child;
  }[];
};
export const TaskList = ({
  label,
  heading,
  title,
  add,
  items,
  class: className,
  ...attributes
}: TaskListProps) => {
  const sheet = (
    <ul class="sheet" aria-label={label}>
      {title && (
        <li class="heading" role="none">
          <h3 class="title">{title}</h3>
        </li>
      )}
      {items.map((item) => (
        <li>
          <Choice
            name={item.name}
            value={item.value}
            checked={item.checked}
            disabled={item.disabled}
            label={item.label}
            description={item.detail}
          />
          {item.end != null && <div class="end">{item.end}</div>}
        </li>
      ))}
      {add && (
        <li class="add">
          <span class="plus" aria-hidden="true">
            <Icon name="plus" />
          </span>
          <input
            class="entry"
            type="text"
            name={add.name}
            form={add.form}
            placeholder={add.placeholder}
            aria-label={add.placeholder}
            autocomplete="off"
          />
        </li>
      )}
    </ul>
  );
  if (!heading)
    return (
      <div {...attributes} class={classes("ply-task-list", className)}>
        {sheet}
      </div>
    );
  const done = items.filter((item) => item.checked).length;
  const action = ["change->task-list#update", attributes["data-action"]].filter(Boolean).join(" ");
  const controller = ["task-list", attributes["data-controller"]].filter(Boolean).join(" ");
  return (
    <details
      {...attributes}
      class={classes("ply-task-list", className)}
      open
      data-controller={controller}
      data-action={action}
      style={`--ply-task-progress: ${items.length ? done / items.length : 0}`}
    >
      <summary>
        <span class="marker" aria-hidden="true">
          <Icon name="caret" />
        </span>
        <span class="name">{heading}</span>
        <span class="remaining" data-task-list-target="remaining">
          未完了{items.length - done}件
        </span>
        <span class="meter" aria-hidden="true" />
      </summary>
      {sheet}
    </details>
  );
};
