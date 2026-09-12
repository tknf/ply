import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type NoticeProps = PropsWithChildren<
  ElementProps<"aside"> & { tone?: Exclude<Tone, "neutral">; label: string }
>;
export const Notice = ({
  children,
  tone = "info",
  label,
  class: className,
  ...attributes
}: NoticeProps) => (
  <aside
    {...attributes}
    class={classes("ply-notice", className)}
    data-tone={tone}
    aria-label={label}
  >
    {children}
  </aside>
);
