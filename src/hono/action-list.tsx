import type { Child } from "hono/jsx";

export type ActionListItem = {
  title: string;
  href: string;
  description?: string;
  icon?: Child;
  preview?: Child;
  accent?: "yellow" | "blue" | "green" | "violet";
};
export const ActionList = ({
  items,
  layout = "list",
}: {
  items: readonly ActionListItem[];
  layout?: "list" | "grid";
}) => (
  <ul class="ply-action-list" data-layout={layout}>
    {items.map(({ title, href, description, icon, preview, accent = "blue" }) => (
      <li>
        <a href={href} data-accent={accent}>
          {icon && <span class="ply-action-symbol">{icon}</span>}
          <span class="ply-action-title">{title}</span>
          {description && <small>{description}</small>}
          {preview && <div class="ply-action-preview">{preview}</div>}
        </a>
      </li>
    ))}
  </ul>
);
