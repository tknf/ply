import type { Child } from "hono/jsx";
import { NavigationItems, type NavigationItem } from "./navigation-items";
import { classes, type ElementProps } from "./types";

export type FilterBarItem = NavigationItem;
export type FilterBarProps = Omit<ElementProps<"nav">, "children" | "aria-label"> & {
  label: string;
  /** chipsは折り返す絞り込み、segmentedは表示の切り替えとしてつながった一組で並べる。 */
  appearance?: "chips" | "segmented";
} & ({ items: readonly FilterBarItem[]; children?: never } | { items?: never; children: Child });

export const FilterBar = ({
  children,
  items,
  label,
  appearance = "chips",
  class: className,
  ...attributes
}: FilterBarProps) => (
  <nav
    {...attributes}
    class={classes("ply-filter-bar", className)}
    aria-label={label}
    data-appearance={appearance === "segmented" ? "segmented" : undefined}
  >
    {items ? <NavigationItems items={items} appearance="button" /> : children}
  </nav>
);
