import type { Child } from "hono/jsx";
import { classes, type ElementProps, type Accent } from "./types";
import { Icon } from "./icon";

export type ActionListItem = {
  title: string;
  href: string;
  description?: string;
  icon?: Child;
  preview?: Child;
  accent?: Accent;
};
export type ActionListProps = ElementProps<"ul"> & {
  items: readonly ActionListItem[];
  layout?: "list" | "grid";
};
export const ActionList = ({
  items,
  layout = "list",
  class: className,
  ...attributes
}: ActionListProps) => (
  <ul {...attributes} class={classes("ply-action-list", className)} data-layout={layout}>
    {items.map(({ title, href, description, icon, preview, accent = "blue" }) => (
      <li>
        <a href={href} data-accent={accent}>
          {icon && <span class="icon">{icon}</span>}
          <span class="title">{title}</span>
          <span class="arrow" aria-hidden="true">
            <Icon name="arrow" />
          </span>
          {description && <small class="description">{description}</small>}
          {preview != null && preview !== false && <div class="preview">{preview}</div>}
        </a>
      </li>
    ))}
  </ul>
);
