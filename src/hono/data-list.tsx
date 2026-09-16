import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type DataListItem = {
  title: string;
  description?: string;
  href?: string;
  start?: Child;
  meta?: Child;
  end?: Child;
  current?: boolean;
};
export type DataListProps = ElementProps<"ul"> & { items: readonly DataListItem[] };
export const DataList = ({ items, class: className, ...attributes }: DataListProps) => (
  <ul {...attributes} class={classes("ply-data-list", className)}>
    {items.map(({ title, description, href, start, meta, end, current }) => (
      <li data-current={current ? "true" : undefined}>
        {start != null && start !== false && <div class="start">{start}</div>}
        <div class="body">
          {href ? (
            <a class="title" href={href} aria-current={current ? "true" : undefined}>
              {title}
            </a>
          ) : (
            <strong class="title">{title}</strong>
          )}
          {description && <p class="description">{description}</p>}
          {meta != null && meta !== false && <div class="meta">{meta}</div>}
        </div>
        {(end || end === 0) && <div class="end">{end}</div>}
      </li>
    ))}
  </ul>
);
