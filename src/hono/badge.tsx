import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type BadgeProps = PropsWithChildren<ElementProps<"span"> & { tone?: Tone }>;
export const Badge = ({
  children,
  tone = "neutral",
  class: className,
  ...attributes
}: BadgeProps) => (
  <span {...attributes} class={classes("ply-badge", className)} data-tone={tone}>
    {children}
  </span>
);
