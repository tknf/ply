import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type ValueItem = { label: string; value: Child; description?: string };
export type ValueListProps = ElementProps<"dl"> & { items: readonly ValueItem[] };
export const ValueList = ({ items, class: className, ...attributes }: ValueListProps) => (
  <dl {...attributes} class={classes("ply-value-list", className)}>
    {items.map(({ label, value, description }) => (
      <div>
        <dt>{label}</dt>
        <dd>
          {value ?? "未登録"}
          {description && <p class="description">{description}</p>}
        </dd>
      </div>
    ))}
  </dl>
);
