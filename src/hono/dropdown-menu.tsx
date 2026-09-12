import { Button } from "./button";

export type MenuItem = { label: string; value: string; disabled?: boolean };
export type DropdownMenuProps = {
  id: string;
  label: string;
  items: readonly MenuItem[];
  action?: string;
  align?: "start" | "end";
};
/** 選択結果はdropdown-menu:select。リンクのナビゲーションには使用しない。 */
export const DropdownMenu = ({ id, label, items, action, align = "start" }: DropdownMenuProps) => (
  <div
    class="ply-dropdown"
    data-controller="dropdown-menu"
    data-state="closed"
    data-action={action}
    data-align={align}
  >
    <Button
      id={`${id}-trigger`}
      data-dropdown-menu-target="trigger"
      aria-controls={id}
      aria-haspopup="menu"
      aria-expanded="false"
    >
      {label}
    </Button>
    <menu
      id={id}
      class="ply-menu"
      data-dropdown-menu-target="menu"
      role="menu"
      aria-labelledby={`${id}-trigger`}
      hidden
    >
      {items.map(({ label: text, value, disabled }) => (
        <li role="none">
          <button
            type="button"
            role="menuitem"
            data-dropdown-menu-target="item"
            data-dropdown-menu-value={value}
            disabled={disabled}
            tabindex={-1}
          >
            {text}
          </button>
        </li>
      ))}
    </menu>
  </div>
);
