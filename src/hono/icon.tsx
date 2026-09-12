import manifest from "../icon-manifest.json";
export type IconName = keyof typeof manifest;
/** 文言を補う装飾アイコン。同一オリジンに配置した共通スプライトを参照する。 */
export const Icon = ({
  name,
  sprite = "/assets/ply-icons.svg",
}: {
  name: IconName;
  sprite?: string;
}) => (
  <svg
    class="ply-icon"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <use href={`${sprite}#ply-${name}`} />
  </svg>
);
