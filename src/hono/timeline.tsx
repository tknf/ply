import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type TimelineProps = ElementProps<"ol"> & {
  label: string;
  items: readonly { datetime: string; time: string; title: string; content?: Child }[];
};
export const Timeline = ({ label, items, class: className, ...attributes }: TimelineProps) => (
  <ol {...attributes} class={classes("ply-timeline", className)} aria-label={label}>
    {items.map((item) => (
      <li>
        <time datetime={item.datetime}>{item.time}</time>
        <div class="body">
          <p class="title">{item.title}</p>
          {item.content}
        </div>
      </li>
    ))}
  </ol>
);
