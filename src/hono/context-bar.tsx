import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type BreadcrumbItem = { label: string; href?: string };
export type ContextBarProps = PropsWithChildren<
  ElementProps<"nav"> & { items: readonly BreadcrumbItem[]; label?: string }
>;
export const ContextBar = ({
  items,
  children,
  class: className,
  label = "現在の位置と関連する操作",
  ...attributes
}: ContextBarProps) => (
  <nav {...attributes} class={classes("ply-context-bar", className)} aria-label={label}>
    <ol class="ply-breadcrumb">
      {items.map((item, index) => (
        <li>
          {index > 0 && <span aria-hidden="true">／ </span>}
          {item.href && index < items.length - 1 ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
    {children && <div class="ply-context-actions">{children}</div>}
  </nav>
);
