import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type ComparisonProps = ElementProps<"section"> & {
  label: string;
  before: Child;
  after: Child;
  beforeLabel?: string;
  afterLabel?: string;
  changed?: boolean;
};
export const Comparison = ({
  label,
  before,
  after,
  beforeLabel = "現在",
  afterLabel = "変更後",
  changed = true,
  class: className,
  ...attributes
}: ComparisonProps) => (
  <section
    {...attributes}
    class={classes("ply-comparison", className)}
    aria-label={label}
    data-changed={changed ? "true" : "false"}
  >
    <h3 class="title">
      {label}
      <span class="state">{changed ? "変更あり" : "変更なし"}</span>
    </h3>
    <div class="pair">
      <div class="before">
        <h4>{beforeLabel}</h4>
        <div class="body">{before ?? <p>未登録</p>}</div>
      </div>
      <div class="after">
        <h4>{afterLabel}</h4>
        <div class="body">{after ?? <p>未登録</p>}</div>
      </div>
    </div>
  </section>
);
