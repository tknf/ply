import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type BadgeProps = PropsWithChildren<
  ElementProps<"span"> & {
    tone?: Tone;
    /** 下書きなど、まだ確定していない状態。ミシン目の縁で示す。 */
    draft?: boolean;
    /** 承認・完了など、確定した状態。少し傾いたゴム印で示す。 */
    stamped?: boolean;
  }
>;
export const Badge = ({
  children,
  tone = "neutral",
  draft = false,
  stamped = false,
  class: className,
  ...attributes
}: BadgeProps) => (
  <span
    {...attributes}
    class={classes("ply-badge", className)}
    data-tone={tone}
    data-draft={draft ? "true" : undefined}
    data-stamped={stamped ? "true" : undefined}
  >
    {children}
  </span>
);
