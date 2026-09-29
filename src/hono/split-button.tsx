import { Button, type ButtonProps } from "./button";
import { DropdownMenu, type MenuItem } from "./dropdown-menu";
import { classes } from "./types";

export type SplitButtonProps = Omit<ButtonProps, "children"> & {
  id: string;
  label: string;
  /** ▾で開くほかのやり方（「送信の予約」「下書きとして保存」など）。 */
  items: readonly MenuItem[];
  menuLabel?: string;
};

/**
 * HEYの「Send email ▾」と同じく、主操作と、ほかのやり方を選ぶ▾を一つのピルにつなげた操作。
 * 主操作は共通Button、▾は共通DropdownMenuで、見た目だけを一体にする。
 */
export const SplitButton = ({
  id,
  label,
  items,
  menuLabel = "ほかのやり方",
  variant = "primary",
  size,
  disabled,
  class: className,
  ...attributes
}: SplitButtonProps) => (
  <div class={classes("ply-split-button", className)} data-variant={variant}>
    <Button {...attributes} class="main" variant={variant} size={size} disabled={disabled}>
      {label}
    </Button>
    <DropdownMenu
      id={`${id}-menu`}
      label={menuLabel}
      iconOnly
      items={items}
      variant={variant}
      size={size}
      disabled={disabled}
      align="end"
    />
  </div>
);
