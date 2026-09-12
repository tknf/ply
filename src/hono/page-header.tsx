import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type PageHeaderProps = ElementProps<"header"> & {
  title: string;
  description?: string;
  icon?: Child;
  actions?: Child;
  align?: "center" | "start";
};
export const PageHeader = ({
  title,
  description,
  align = "start",
  icon,
  actions,
  class: className,
  ...attributes
}: PageHeaderProps) => (
  <header {...attributes} class={classes("ply-page-header", className)} data-align={align}>
    {icon && <span class="ply-page-symbol">{icon}</span>}
    <h1>{title}</h1>
    {description && <p>{description}</p>}
    {actions && <div class="ply-page-actions">{actions}</div>}
  </header>
);
