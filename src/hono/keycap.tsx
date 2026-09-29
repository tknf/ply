import type { ElementProps } from "./types";
import { classes } from "./types";

export type KeycapProps = ElementProps<"span"> & {
  keys: readonly string[];
  /** smallはタイルの角やメニューの行の終わりに添える小さな印。 */
  size?: "default" | "small";
  /** 青のメニューや塗った面の上に置く時。地を塗らず、文字と同じ色の淡い縁にする。 */
  inverse?: boolean;
};
export const Keycap = ({
  keys,
  size = "default",
  inverse = false,
  class: className,
  ...attributes
}: KeycapProps) => (
  <span
    {...attributes}
    class={classes("ply-keycap", className)}
    data-size={size === "default" ? undefined : size}
    data-inverse={inverse ? "true" : undefined}
  >
    {keys.map((key) => (
      <kbd>{key}</kbd>
    ))}
  </span>
);
