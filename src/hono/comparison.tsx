import type { Child } from "hono/jsx";

export type ComparisonProps = {
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
}: ComparisonProps) => (
  <section class="ply-comparison" aria-label={label} data-changed={changed ? "true" : "false"}>
    <h3>
      {label}
      {changed && <span>変更あり</span>}
    </h3>
    <div class="ply-comparison-pair">
      <div>
        <h4>{beforeLabel}</h4>
        {before ?? <p>未登録</p>}
      </div>
      <div>
        <h4>{afterLabel}</h4>
        {after ?? <p>未登録</p>}
      </div>
    </div>
  </section>
);
