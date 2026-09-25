import { useId, type Child } from "hono/jsx";
import { Icon } from "./icon";
import { classes, type ElementProps } from "./types";

export type SplitViewProps = ElementProps<"div"> & {
  primary: Child;
  secondary: Child;
  layout?: "inspector" | "reader";
  resizable?: boolean;
  initialSize?: number;
};

/** inspectorは作業＋補足、readerは一覧＋本文。DOMの読み順は常にprimaryが先。 */
export const SplitView = ({
  primary,
  secondary,
  layout = "inspector",
  resizable = false,
  initialSize = layout === "reader" ? 38 : 68,
  id,
  class: className,
  ...attributes
}: SplitViewProps) => {
  const generatedId = useId();
  const viewId = id ?? `ply-split-view-${generatedId}`;
  const size = Number.isFinite(initialSize) ? Math.min(80, Math.max(20, initialSize)) : 50;
  return (
    <div
      {...attributes}
      id={viewId}
      class={classes("ply-split-view", className)}
      data-layout={layout}
      data-resizable={resizable ? "true" : undefined}
      data-controller={resizable ? "splitter" : undefined}
      data-splitter-value-value={resizable ? size : undefined}
      data-splitter-min-value={resizable ? 20 : undefined}
      data-splitter-max-value={resizable ? 80 : undefined}
      data-splitter-orientation-value={resizable ? "vertical" : undefined}
    >
      <div class="panes">
        <div
          class="primary"
          id={`${viewId}-primary`}
          data-splitter-target={resizable ? "primary" : undefined}
        >
          {primary}
        </div>
        {resizable && (
          <div
            class="handle"
            role="separator"
            tabindex={0}
            aria-label="領域の幅を調整"
            aria-controls={`${viewId}-primary`}
            aria-orientation="vertical"
            data-splitter-target="handle"
          >
            <span class="grip" aria-hidden="true">
              <Icon name="grip" />
            </span>
          </div>
        )}
        <div class="secondary">{secondary}</div>
      </div>
    </div>
  );
};
