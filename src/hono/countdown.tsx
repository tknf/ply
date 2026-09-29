import { classes, type ElementProps, type Tone } from "./types";

export type CountdownProps = ElementProps<"span"> & {
  /** 大きく書く数。 */
  value: string | number;
  /** 数の上に小さく書く言葉（「あと」「閉じるまで」など）。 */
  before?: string;
  /** 数の下に小さく書く単位（「日」など）。 */
  after?: string;
  /** 読み上げの全文（「自動で閉じるまであと70日」など）。 */
  label: string;
  /** 輪の役割の色。期限が迫る時はdanger、ただの残数はinfoなど、意味に合わせて選ぶ。 */
  tone?: Tone;
};

/**
 * 期限や残りを大きな数で示す丸い印。
 * 役割の色の細い輪で縁取り、紙の影で浮かせる。カードの縁にまたがせる時は、置く側で位置を決める。
 */
export const Countdown = ({
  value,
  before,
  after,
  label,
  tone = "warning",
  class: className,
  ...attributes
}: CountdownProps) => (
  <span
    {...attributes}
    class={classes("ply-countdown", className)}
    data-tone={tone}
    role="img"
    aria-label={label}
  >
    {before && <span class="before">{before}</span>}
    <strong class="value">{value}</strong>
    {after && <span class="after">{after}</span>}
  </span>
);
