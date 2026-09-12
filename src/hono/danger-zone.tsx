import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export const DangerZone = ({
  children,
  title = "影響のある操作",
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"section"> & { title?: string }>) => (
  <section {...attributes} class={classes("ply-danger-zone", className)}>
    <h2>{title}</h2>
    {children}
  </section>
);
