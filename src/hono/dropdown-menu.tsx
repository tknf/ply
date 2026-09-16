import { Button, ActionLink, type ButtonProps } from "./button";
import { Icon, type IconName } from "./icon";

type MenuItemLabel = {
  label: string;
  disabled?: boolean;
  icon?: IconName;
  description?: string;
  /** 表示用の補助表記。ショートカットの登録は利用側で行う。 */
  shortcut?: string;
};
export type MenuItem =
  | (MenuItemLabel & {
      kind?: "action";
      value: string;
      danger?: boolean;
      closeOnSelect?: boolean;
    })
  | (MenuItemLabel & { kind: "link"; href: string; target?: "_blank" | "_self" })
  | (MenuItemLabel & {
      kind: "checkbox";
      value: string;
      checked?: boolean | "mixed";
      closeOnSelect?: boolean;
    })
  | (MenuItemLabel & {
      kind: "radio";
      value: string;
      name: string;
      checked?: boolean;
      closeOnSelect?: boolean;
    })
  | (MenuItemLabel & { kind: "submenu"; items: readonly MenuItem[] })
  | { kind: "separator" }
  | { kind: "group"; label: string; items: readonly MenuItem[] };

export type DropdownMenuProps = Pick<ButtonProps, "variant" | "size" | "disabled" | "busy"> & {
  id: string;
  label: string;
  items: readonly MenuItem[];
  action?: string;
  align?: "start" | "end";
  dir?: "ltr" | "rtl";
  icon?: IconName;
  iconOnly?: boolean;
};

const MenuItems = ({ items, id }: { items: readonly MenuItem[]; id: string }) => (
  <>
    {items.length === 0 && (
      <li class="empty" role="none">
        利用できる操作はありません
      </li>
    )}
    {items.map((item, index) => {
      const itemId = `${id}-${index}`;
      if (item.kind === "separator") return <li class="separator" role="separator" />;
      if (item.kind === "group")
        return (
          <li role="none">
            <span class="label" id={`${itemId}-label`}>
              {item.label}
            </span>
            <ul
              class="ply-menu"
              data-variant="group"
              role="group"
              aria-labelledby={`${itemId}-label`}
            >
              <MenuItems items={item.items} id={itemId} />
            </ul>
          </li>
        );
      const checkable = item.kind === "checkbox" || item.kind === "radio";
      const checked = checkable ? (item.checked ?? false) : undefined;
      const content = (
        <span class="content" data-leading={checkable || item.icon ? "true" : undefined}>
          <span class="heading">
            {checkable ? (
              <span class="mark" aria-hidden="true">
                {item.kind === "radio" ? <span class="dot" /> : <Icon name="check" />}
                {item.kind === "checkbox" && <span class="mixed">−</span>}
              </span>
            ) : item.icon ? (
              <Icon name={item.icon} />
            ) : null}
            <span class="text">
              <span>{item.label}</span>
            </span>
            {item.shortcut && (
              <span class="shortcut" aria-hidden="true">
                {item.shortcut}
              </span>
            )}
            {item.kind === "submenu" && (
              <span class="caret">
                <Icon name="caret" />
              </span>
            )}
          </span>
          {item.description && <small class="description">{item.description}</small>}
        </span>
      );
      const attributes = {
        id: `${itemId}-item`,
        class: "item",
        role: checkable ? `menuitem${item.kind}` : "menuitem",
        "aria-label": item.label,
        "aria-description": item.description,
        "aria-disabled": item.disabled ? "true" : undefined,
        "data-disabled": item.disabled ? "true" : undefined,
        "data-menu-kind": item.kind ?? "action",
        "data-menu-label": item.label,
        tabindex: -1,
      } as const;
      return (
        <li role="none">
          {item.kind === "link" ? (
            item.disabled ? (
              <Button {...attributes} disabled>
                {content}
              </Button>
            ) : (
              <ActionLink
                {...attributes}
                href={item.href}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {content}
              </ActionLink>
            )
          ) : (
            <Button
              {...attributes}
              disabled={item.disabled}
              data-dropdown-menu-target="item"
              data-dropdown-menu-value={"value" in item ? item.value : undefined}
              data-menu-group={item.kind === "radio" ? item.name : undefined}
              data-close-on-select={"closeOnSelect" in item ? item.closeOnSelect : undefined}
              data-tone={
                (!item.kind || item.kind === "action") && item.danger ? "danger" : undefined
              }
              aria-checked={checked}
              data-checked={checked === undefined ? undefined : String(checked)}
              aria-haspopup={item.kind === "submenu" ? "menu" : undefined}
              aria-expanded={item.kind === "submenu" ? "false" : undefined}
              aria-controls={item.kind === "submenu" ? `${itemId}-menu` : undefined}
            >
              {content}
            </Button>
          )}
          {item.kind === "submenu" && (
            <menu
              id={`${itemId}-menu`}
              class="ply-menu"
              role="menu"
              popover="manual"
              data-menu-panel="submenu"
              aria-labelledby={`${itemId}-item`}
              tabindex={-1}
              hidden
            >
              <MenuItems items={item.items} id={`${itemId}-menu`} />
            </menu>
          )}
        </li>
      );
    })}
  </>
);

/** 選択結果はdropdown-menu:select。チェック項目はcheckedも通知する。 */
export const DropdownMenu = ({
  id,
  label,
  items,
  action,
  align = "start",
  dir,
  icon,
  iconOnly = false,
  variant,
  size,
  disabled,
  busy,
}: DropdownMenuProps) => (
  <div
    class="ply-dropdown-menu"
    data-controller="dropdown-menu"
    data-state="closed"
    data-action={action}
    data-align={align}
    dir={dir}
  >
    <Button
      id={`${id}-trigger`}
      data-dropdown-menu-target="trigger"
      aria-controls={id}
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label={iconOnly ? label : undefined}
      data-icon-only={iconOnly ? "true" : undefined}
      variant={variant}
      size={size}
      disabled={disabled}
      busy={busy}
    >
      {icon && <Icon name={icon} />}
      {!iconOnly && label}
      {(!iconOnly || !icon) && <Icon name="caret" />}
    </Button>
    <div class="shield" data-dropdown-menu-target="shield" popover="manual" tabindex={-1} hidden />
    <menu
      id={id}
      class="ply-menu"
      data-dropdown-menu-target="menu"
      data-menu-panel="root"
      role="menu"
      popover="manual"
      aria-labelledby={`${id}-trigger`}
      tabindex={-1}
      hidden
    >
      <MenuItems items={items} id={id} />
    </menu>
  </div>
);
