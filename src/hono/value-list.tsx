import type { Child } from "hono/jsx";
import { classes, type Accent, type ElementProps } from "./types";

export type ValueItem = {
  label: string;
  value: Child;
  description?: string;
  /** 項目名の前に置く印。塗りつぶしの印を色の淡い丸に入れる。 */
  icon?: Child;
  accent?: Accent;
};
export type ValueListProps = ElementProps<"dl"> & { items: readonly ValueItem[] };
export const ValueList = ({ items, class: className, ...attributes }: ValueListProps) => (
  <dl {...attributes} class={classes("ply-value-list", className)}>
    {items.map(({ label, value, description, icon, accent = "blue" }) => (
      <div data-accent={icon ? accent : undefined}>
        <dt>
          {icon != null && icon !== false && (
            <span class="icon" aria-hidden="true">
              {icon}
            </span>
          )}
          {label}
        </dt>
        <dd data-empty={value == null ? "true" : undefined}>
          {value ?? "未登録"}
          {description && <p class="description">{description}</p>}
        </dd>
      </div>
    ))}
  </dl>
);
