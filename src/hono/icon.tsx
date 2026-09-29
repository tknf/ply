import type { IconName } from "../internal/icon-manifest-types";
import { classes } from "./types";

export type { IconName } from "../internal/icon-manifest-types";
export type IconProps = {
  name: IconName;
  /** 塗りつぶしの版。縦並びの一覧など、太いアイコンで項目を見分ける場所で使う。 */
  fill?: boolean;
  sprite?: string;
  class?: string;
  "data-size"?: "small";
};
/** 装飾アイコン。意味と操作名は隣の文言または操作コンポーネントのaria-labelで伝える。 */
export const Icon = ({
  name,
  fill = false,
  sprite = "/assets/ply-icons.svg",
  class: className,
  ...attributes
}: IconProps) => (
  <svg
    {...attributes}
    class={classes("ply-icon", className)}
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <use href={`${sprite}#ply-${name}${fill ? "-fill" : ""}`} />
  </svg>
);
