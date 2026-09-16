import type { Child, PropsWithChildren } from "hono/jsx";
import { Button, type ButtonProps } from "./button";
import { Icon, type IconName } from "./icon";

export type PopoverProps = PropsWithChildren<{
  id: string;
  label: string;
  title?: string;
  description?: string;
  align?: "start" | "end";
  size?: "compact" | "default" | "wide";
  icon?: IconName;
  iconOnly?: boolean;
  disabled?: boolean;
  triggerVariant?: ButtonProps["variant"];
  closeLabel?: string;
  actions?: Child;
  dir?: "ltr" | "rtl";
}>;

/** 非モーダルの補足表示。開閉は標準Popover API、位置指定はCSSを優先する。 */
export const Popover = ({
  id,
  label,
  title = label,
  description,
  align = "start",
  size = "default",
  icon,
  iconOnly = false,
  disabled,
  triggerVariant = "secondary",
  closeLabel = "閉じる",
  actions,
  dir,
  children,
}: PopoverProps) => {
  // 任意のHTML idを、一意で安全なCSSの識別子へ変換する。
  const anchor = `--ply-popover-${id
    .split("")
    .map((character) => character.charCodeAt(0).toString(16))
    .join("-")}`;
  return (
    <div class="ply-popover" data-controller="popover" data-align={align} dir={dir}>
      <Button
        variant={triggerVariant}
        disabled={disabled}
        popovertarget={id}
        style={`anchor-name: ${anchor}`}
        data-popover-target="trigger"
        aria-haspopup="dialog"
        aria-controls={id}
        aria-label={iconOnly ? label : undefined}
        data-icon-only={iconOnly ? "true" : undefined}
      >
        {icon && <Icon name={icon} />}
        {iconOnly ? !icon && <Icon name="info" /> : label}
      </Button>
      <div
        id={id}
        popover="auto"
        class="panel"
        style={`position-anchor: ${anchor}`}
        data-popover-target="panel"
        data-align={align}
        data-size={size}
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        <header class="heading">
          <h3 id={`${id}-title`} tabindex={-1} autofocus>
            {title}
          </h3>
          {description && <p id={`${id}-description`}>{description}</p>}
        </header>
        <div class="body">{children}</div>
        <footer class="actions">
          <Button popovertarget={id} popovertargetaction="hide">
            {closeLabel}
          </Button>
          {actions}
        </footer>
      </div>
    </div>
  );
};
