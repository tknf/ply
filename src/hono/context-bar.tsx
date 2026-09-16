import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";

export type { BreadcrumbItem } from "./breadcrumb";
export type ContextBarProps = PropsWithChildren<
  ElementProps<"div"> & { items: readonly BreadcrumbItem[]; label?: string }
>;
export const ContextBar = ({
  items,
  children,
  class: className,
  label = "現在の位置と関連する操作",
  ...attributes
}: ContextBarProps) => (
  <div {...attributes} class={classes("ply-context-bar", className)}>
    <Breadcrumb items={items} label={label} />
    {children && <div class="actions">{children}</div>}
  </div>
);
