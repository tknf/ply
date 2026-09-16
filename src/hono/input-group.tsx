import type { Child } from "hono/jsx";
import { Button, type ButtonProps } from "./button";
import { Input } from "./field";
import { NumberField } from "./number-field";
import { classes, type ElementProps } from "./types";

export type InputGroupAction = Omit<ButtonProps, "children" | "size"> & { label: string };
export type InputGroupProps = Omit<ElementProps<"input">, "children" | "prefix" | "size"> & {
  id: string;
  prefix?: Child;
  suffix?: Child;
  size?: "default" | "large";
  action?: InputGroupAction;
};

export const InputGroup = ({
  id,
  prefix,
  suffix,
  size = "default",
  action,
  class: className,
  ...attributes
}: InputGroupProps) => {
  const hasPrefix =
    prefix !== undefined && prefix !== null && typeof prefix !== "boolean" && prefix !== "";
  const hasSuffix =
    suffix !== undefined && suffix !== null && typeof suffix !== "boolean" && suffix !== "";
  const describedBy =
    [
      attributes["aria-describedby"],
      hasPrefix ? `${id}-prefix` : undefined,
      hasSuffix ? `${id}-suffix` : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  const Control = attributes.type === "number" ? NumberField : Input;
  const { label: actionLabel, ...actionAttributes } = action ?? { label: "" };

  return (
    <div class={classes("ply-input-group", className)} dir={attributes.dir}>
      <div class="control" data-size={size}>
        {hasPrefix && (
          <span class="affix" id={`${id}-prefix`}>
            {prefix}
          </span>
        )}
        <Control {...attributes} id={id} data-size={size} aria-describedby={describedBy} />
        {hasSuffix && (
          <span class="affix" id={`${id}-suffix`}>
            {suffix}
          </span>
        )}
      </div>
      {action && (
        <Button {...actionAttributes} size={size} disabled={attributes.disabled || action.disabled}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
