import type { Child } from "hono/jsx";
import { classes, type ElementProps, type Accent } from "./types";

export type ActionListItem = {
  title: string;
  href: string;
  description?: string;
  icon?: Child;
  preview?: Child;
  accent?: Accent;
  /** 手当てが要る行（確かめていない予備の連絡先など）。名前と説明を危険の色で書く。 */
  attention?: boolean;
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
    {items.map(({ title, href, description, icon, preview, accent = "blue", attention }) => (
      <li>
        <a
          href={href}
          data-accent={attention ? "coral" : accent}
          data-attention={attention ? "true" : undefined}
        >
          {icon && <span class="icon">{icon}</span>}
          <span class="title">{title}</span>
          {description && <small class="description">{description}</small>}
          {preview != null && preview !== false && <div class="preview">{preview}</div>}
        </a>
      </li>
    ))}
  </ul>
);
