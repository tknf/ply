import type { Child } from "hono/jsx";

export type TabItem = { value: string; label: string; content: Child; disabled?: boolean };
export const Tabs = ({
  id,
  label,
  items,
  selected,
}: {
  id: string;
  label: string;
  items: readonly TabItem[];
  selected?: string;
}) => {
  const active =
    items.find((item) => item.value === selected && !item.disabled)?.value ??
    items.find((item) => !item.disabled)?.value;
  return (
    <div class="ply-tabs" data-controller="tabs" data-tabs-value-value={active}>
      <div class="ply-tab-list" role="tablist" aria-label={label} data-tabs-target="tablist">
        {items.map((item, index) => (
          <button
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            data-tabs-target="tab"
            data-tabs-value={item.value}
            data-state={item.value === active ? "active" : "inactive"}
            aria-selected={item.value === active ? "true" : "false"}
            aria-controls={`${id}-panel-${index}`}
            disabled={item.disabled}
            tabindex={item.value === active ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <section
          id={`${id}-panel-${index}`}
          class="ply-tab-panel"
          role="tabpanel"
          data-tabs-target="tabpanel"
          data-tabs-value={item.value}
          data-state={item.value === active ? "active" : "inactive"}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={item.value !== active}
          tabindex={0}
        >
          {item.content}
        </section>
      ))}
    </div>
  );
};
