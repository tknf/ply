import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type TimelineProps = ElementProps<"ol"> & {
  label: string;
  variant?: "activity" | "milestones" | "compact";
  items: readonly {
    datetime: string;
    time: string;
    title: string;
    content?: Child;
    state?: "complete" | "current" | "upcoming";
  }[];
};
export const Timeline = ({
  label,
  items,
  variant = "activity",
  class: className,
  ...attributes
}: TimelineProps) => (
  <ol
    {...attributes}
    class={classes("ply-timeline", className)}
    aria-label={label}
    data-variant={variant}
  >
    {items.map((item) => (
      <li data-state={item.state}>
        <span class="marker" aria-hidden="true" />
        <time datetime={item.datetime}>{item.time}</time>
        <div class="body">
          <p class="title">
            {item.state && (
              <span class="ply-visually-hidden">
                {item.state === "complete"
                  ? "完了："
                  : item.state === "current"
                    ? "進行中："
                    : "予定："}
              </span>
            )}
            {item.title}
          </p>
          {item.content}
        </div>
      </li>
    ))}
  </ol>
);
