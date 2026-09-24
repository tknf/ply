import { useId } from "hono/jsx";
import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Icon } from "./icon";
import { classes, type ElementProps, type Tone } from "./types";

export type BoardEntry = { id: string; label: string; content: Child; disabled?: boolean };
type Column = {
  id?: string;
  title: string;
  tone?: Tone;
  current?: boolean;
  empty?: Child;
  disabled?: boolean;
} & (
  | { items: readonly BoardEntry[]; content?: never; count?: never }
  | { content: Child; count: number; items?: never }
);
export type BoardProps = ElementProps<"div"> & {
  label: string;
  columns: readonly Column[];
  movable?: boolean;
};
export const Board = ({
  label,
  columns,
  movable = false,
  id,
  class: className,
  ...attributes
}: BoardProps) => {
  const generated = useId();
  const boardId = id ?? `board-${generated}`;
  return (
    <div
      {...attributes}
      id={boardId}
      class={classes("ply-board", className)}
      role="region"
      aria-label={label}
      tabindex={0}
      data-controller={movable ? "board" : undefined}
    >
      {columns.map((column, index) => (
        <section
          data-column-id={column.id ?? String(index)}
          data-drop-disabled={column.disabled || !column.items ? "true" : undefined}
          data-current={column.current ? "true" : undefined}
          data-tone={column.tone ?? "neutral"}
        >
          <h3 class="title">
            <span class="label">{column.title}</span>
            <small>{column.items?.length ?? column.count}</small>
          </h3>
          <div
            class="items"
            role={column.items ? "list" : undefined}
            aria-label={column.items ? column.title : undefined}
          >
            {column.items
              ? column.items.map((item) => (
                  <article
                    class="ply-board-item"
                    role="listitem"
                    data-board-id={item.id}
                    data-board-label={item.label}
                    data-disabled={item.disabled ? "true" : undefined}
                  >
                    <div class="body">{item.content}</div>
                    {movable && (
                      <Button
                        class="handle"
                        variant="link"
                        data-icon-only="true"
                        data-board-handle
                        aria-label={`「${item.label}」を移動`}
                        aria-describedby={`${boardId}-help`}
                        disabled
                      >
                        <Icon name="grip" />
                      </Button>
                    )}
                  </article>
                ))
              : column.content}
          </div>
          <div class="empty">
            {column.empty ??
              (movable
                ? column.disabled || !column.items
                  ? "この列には移動できません"
                  : "ここへ移動できます"
                : "項目はありません")}
          </div>
        </section>
      ))}
      {movable && (
        <>
          <p id={`${boardId}-help`} class="ply-visually-hidden">
            移動ボタンをドラッグします。キーボードではSpaceで持ち上げ、左右矢印で列、上下矢印で位置を選び、Enterで確定、Escapeで取り消します。
          </p>
          <p class="ply-visually-hidden" role="status" data-board-announcement aria-live="polite" />
        </>
      )}
    </div>
  );
};
