import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type ToolbarProps = PropsWithChildren<
  Omit<ElementProps<"div">, "role" | "aria-label"> & { label: string }
>;

/** Button・ActionLinkなどの配置を担う。各操作は標準のTab順序を保つ。 */
export const Toolbar = ({ label, children, class: className, ...attributes }: ToolbarProps) => (
  <div {...attributes} class={classes("ply-toolbar", className)} role="group" aria-label={label}>
    {children}
  </div>
);
