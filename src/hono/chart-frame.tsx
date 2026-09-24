import type { Child } from "hono/jsx";

export type ChartLegendItem = {
  label: string;
  tone: "blue" | "green" | "amber" | "coral";
};

export type ChartFrameProps = {
  title: string;
  description?: string;
  graphic: Child;
  table: Child;
  tableLabel: string;
  size?: "measure" | "wide";
  legend?: readonly ChartLegendItem[];
  source?: string;
};

/** グラフ描画は利用側が持ち、同じ値を表で読めるようにする。 */
export const ChartFrame = ({
  title,
  description,
  graphic,
  table,
  tableLabel,
  size = "measure",
  legend = [],
  source,
}: ChartFrameProps) => (
  <figure class="ply-chart-frame" data-size={size}>
    <figcaption>
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </figcaption>
    <div class="graphic" aria-hidden="true">
      {graphic}
    </div>
    {legend.length > 0 && (
      <ul class="legend" aria-label="凡例">
        {legend.map((item) => (
          <li data-tone={item.tone}>
            <span class="mark" aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    )}
    <details class="data ply-table">
      <summary>{tableLabel}</summary>
      {table}
    </details>
    {source && <p class="source">出典：{source}</p>}
  </figure>
);
