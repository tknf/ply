import type { Child } from "hono/jsx";
import { Disclosure } from "./disclosure";

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
    {/* 数値の表は他の開閉と同じDisclosureで畳む。表の見た目はply-tableの枠が持つ。 */}
    <Disclosure class="data" summary={tableLabel}>
      <div class="ply-table">{table}</div>
    </Disclosure>
    {source && <p class="source">出典：{source}</p>}
  </figure>
);
