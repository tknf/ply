import type { Child } from "hono/jsx";
import { Choice } from "./field";
import { classes, type ElementProps } from "./types";

export type TaskListProps = ElementProps<"ul"> & {
  label: string;
  /** メモの上に書く題名。題名の行の右に、終えた数と全体の数を添える（チェックの操作に合わせて変わる）。 */
  title?: string;
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
  title,
  items,
  class: className,
  ...attributes
}: TaskListProps) => (
  <ul {...attributes} class={classes("ply-task-list", className)} aria-label={label}>
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
  </ul>
);
