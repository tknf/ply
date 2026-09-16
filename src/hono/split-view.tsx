import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type SplitViewProps = ElementProps<"div"> & {
  primary: Child;
  secondary: Child;
  layout?: "inspector" | "reader";
};

/** inspectorは作業＋補足、readerは一覧＋本文。DOMの読み順は常にprimaryが先。 */
export const SplitView = ({
  primary,
  secondary,
  layout = "inspector",
  class: className,
  ...attributes
}: SplitViewProps) => (
  <div {...attributes} class={classes("ply-split-view", className)} data-layout={layout}>
    <div class="panes">
      <div class="primary">{primary}</div>
      <div class="secondary">{secondary}</div>
    </div>
  </div>
);
