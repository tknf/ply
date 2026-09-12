import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

/** 基本の開閉はdetails/summaryだけで動く。controller登録は不要。 */
export const Disclosure = ({
  children,
  summary,
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"details"> & { summary: string }>) => (
  <details {...attributes} class={classes("ply-disclosure", className)}>
    <summary>{summary}</summary>
    <div>{children}</div>
  </details>
);
