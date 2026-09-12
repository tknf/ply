import type { Child } from "hono/jsx";

export type ValueItem = { label: string; value: Child; description?: string };
export const ValueList = ({ items }: { items: readonly ValueItem[] }) => (
  <dl class="ply-value-list">
    {items.map(({ label, value, description }) => (
      <div>
        <dt>{label}</dt>
        <dd>
          {value ?? "未登録"}
          {description && <p>{description}</p>}
        </dd>
      </div>
    ))}
  </dl>
);
