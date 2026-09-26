import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type BadgeProps = PropsWithChildren<
  ElementProps<"span"> & {
    tone?: Tone;
    /** 下書きなど、まだ確定していない状態。ミシン目の縁で示す。 */
    draft?: boolean;
  }
>;
export const Badge = ({
  children,
  tone = "neutral",
  draft = false,
  class: className,
  ...attributes
}: BadgeProps) => (
  <span
    {...attributes}
    class={classes("ply-badge", className)}
    data-tone={tone}
    data-draft={draft ? "true" : undefined}
  >
    {children}
  </span>
);
