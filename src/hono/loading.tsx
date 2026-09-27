import { classes, type ElementProps } from "./types";

export type LoadingProps = ElementProps<"p"> & {
  label?: string;
  /** orbitは回る丸、waveは順に灯る三つの点、haloは広がって消える輪。 */
  variant?: "orbit" | "wave" | "halo";
  layout?: "inline" | "region";
};
export const Loading = ({
  label = "読み込み中…",
  variant = "orbit",
  layout = "inline",
  class: className,
  ...attributes
}: LoadingProps) => (
  <p
    {...attributes}
    class={classes("ply-loading", className)}
    role="status"
    data-variant={variant}
    data-layout={layout}
  >
    <span class="indicator" aria-hidden="true">
      {variant === "wave" && (
        <>
          <i />
          <i />
          <i />
        </>
      )}
    </span>
    <span class="label">{label}</span>
  </p>
);
