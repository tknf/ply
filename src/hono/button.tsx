import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type ButtonVariant } from "./types";

export const ButtonGroup = ({
  children,
  label,
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"div"> & { label: string }>) => (
  <div
    {...attributes}
    class={classes("ply-button-group", className)}
    role="group"
    aria-label={label}
  >
    {children}
  </div>
);

export type ButtonProps = PropsWithChildren<
  ElementProps<"button"> & {
    variant?: ButtonVariant;
    size?: "default" | "compact" | "large" | "tag";
    busy?: boolean;
    busyLabel?: string;
  }
>;

export const Button = ({
  children,
  class: className,
  type = "button",
  variant = "secondary",
  size = "default",
  disabled = false,
  busy = false,
  busyLabel = "処理中…",
  ...attributes
}: ButtonProps) => (
  <button
    {...attributes}
    class={classes("ply-button", className)}
    type={type}
    data-variant={variant}
    data-size={size}
    data-busy={busy ? "true" : undefined}
    disabled={disabled || busy}
    aria-busy={busy ? "true" : attributes["aria-busy"]}
  >
    {busy ? busyLabel : children}
  </button>
);

export type ActionLinkProps = PropsWithChildren<
  ElementProps<"a"> & {
    href: string;
    variant?: ButtonVariant;
    size?: "default" | "compact" | "large";
  }
>;
export const ActionLink = ({
  children,
  class: className,
  variant = "secondary",
  size = "default",
  ...attributes
}: ActionLinkProps) => (
  <a
    {...attributes}
    class={classes("ply-button", className)}
    data-variant={variant}
    data-size={size}
  >
    {children}
  </a>
);
