import { Button } from "./button";

export type ToggleGroupItem = { value: string; label: string; disabled?: boolean };
export type ToggleGroupProps = {
  label: string;
  items: readonly ToggleGroupItem[];
  selected?: readonly string[];
  multiple?: boolean;
  orientation?: "horizontal" | "vertical";
};

/** 画面内の単一・複数の状態切替。変更結果はtoggle-group:changeで渡す。 */
export const ToggleGroup = ({
  label,
  items,
  selected = [],
  multiple = false,
  orientation = "horizontal",
}: ToggleGroupProps) => {
  const seen = new Set<string>();
  const choices = items.filter((item) => {
    if (item.value.trim() === "" || seen.has(item.value)) return false;
    seen.add(item.value);
    return true;
  });
  const values = multiple ? selected : selected.slice(0, 1);
  return (
    <div
      class="ply-toggle-group"
      role="group"
      aria-label={label}
      data-controller="toggle-group"
      data-toggle-group-multiple-value={multiple}
      data-toggle-group-selected-value={JSON.stringify(values)}
      data-toggle-group-orientation-value={orientation}
      data-orientation={orientation}
    >
      {choices.map((item) => (
        <Button
          type="button"
          data-toggle-group-target="item"
          data-toggle-group-value={item.value}
          data-state={values.includes(item.value) ? "on" : "off"}
          aria-pressed={values.includes(item.value)}
          disabled={item.disabled}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
