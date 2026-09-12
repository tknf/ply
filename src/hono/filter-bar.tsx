import type { Child } from "hono/jsx";
import { NavigationItems, type NavigationItem } from "./navigation-items";
import { classes, type ElementProps } from "./types";

export type FilterBarItem = NavigationItem;
export type FilterBarProps = Omit<ElementProps<"nav">, "children" | "aria-label"> & {
  label: string;
} & ({ items: readonly FilterBarItem[]; children?: never } | { items?: never; children: Child });

export const FilterBar = ({
  children,
  items,
  label,
  class: className,
  ...attributes
}: FilterBarProps) => (
  <nav {...attributes} class={classes("ply-filter-bar", className)} aria-label={label}>
    {items ? <NavigationItems items={items} appearance="button" /> : children}
  </nav>
);
