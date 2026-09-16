import manifest from "../icon-manifest.json";
import { classes } from "./types";

export type IconName = keyof typeof manifest;
export type IconProps = {
  name: IconName;
  sprite?: string;
  class?: string;
  "data-size"?: "small";
};
/** 装飾アイコン。意味と操作名は隣の文言または操作部品のaria-labelで伝える。 */
export const Icon = ({
  name,
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
    <use href={`${sprite}#ply-${name}`} />
  </svg>
);
