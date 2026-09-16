import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type SurfaceProps = PropsWithChildren<
  ElementProps<"div"> & {
    context?: Child;
    layout?: "standard" | "document";
    kind?: "sheet" | "panel";
    tone?: "plain" | "warm" | "cool";
  }
>;
export const Surface = ({
  children,
  context,
  layout = "standard",
  kind = "sheet",
  tone = "plain",
  class: className,
  ...attributes
}: SurfaceProps) => (
  <div
    {...attributes}
    class={classes("ply-surface", className)}
    data-layout={layout}
    data-kind={kind}
    data-tone={tone}
  >
    {context}
    <div class="body">{children}</div>
  </div>
);
