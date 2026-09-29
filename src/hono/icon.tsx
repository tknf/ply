import type { IconName } from "../internal/icon-manifest-types";
import { classes } from "./types";

export type { IconName } from "../internal/icon-manifest-types";
export type IconProps = {
  /** 印の名前。使える名前はdocs/icons.mdの「使えるアイコン」を見る。 */
  name: IconName;
  /** 塗りつぶしの版。縦並びの一覧など、太いアイコンで項目を見分ける場所で使う。 */
  fill?: boolean;
  /** スプライトのURL。配布のicons.svgを既定と別の場所に置いた時に指定する。同じオリジンに置く。 */
  sprite?: string;
  /** svgに足すクラス。ルートのply-iconは常に付く。 */
  class?: string;
  /** smallは6em/7の大きさにする。渡さなければ1em（文字と同じ大きさ）。 */
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
