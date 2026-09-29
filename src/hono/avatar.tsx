import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Accent } from "./types";

export type AvatarProps = ElementProps<"span"> & {
  /** 人やチームの名前。円の読み上げの名前（role="img"のaria-label）にする。 */
  name: string;
  /** 画像がない時と読み込めない時に円に書く略称。一、二文字にする。 */
  initials: string;
  /** 顔写真などのURL。AvatarControllerが読み込めたと確かめてから表示し、それまでは略称を見せる。 */
  src?: string;
  /** 円の大きさ。inlineは20px、smallは28px、defaultは36px、largeは48px。 */
  size?: "inline" | "small" | "default" | "large";
  /** 略称の円の塗り。人を見分ける補助で、名前の代わりにはしない。 */
  tone?: Accent;
};
export const Avatar = ({
  name,
  initials,
  src,
  size = "default",
  tone = "blue",
  class: className,
  ...attributes
}: AvatarProps) => (
  <span
    {...attributes}
    class={classes("ply-avatar", className)}
    data-size={size}
    data-tone={tone}
    data-controller={src ? "avatar" : undefined}
    role="img"
    aria-label={name}
  >
    {src && <img src={src} alt="" loading="lazy" data-avatar-target="image" />}
    <span class="initials" data-avatar-target={src ? "fallback" : undefined}>
      {initials}
    </span>
  </span>
);

export type AvatarGroupProps = PropsWithChildren<
  ElementProps<"span"> & {
    /** まとまりの名前。読み上げで「誰と誰か」を伝える。 */
    label: string;
    /** 並べきれない残りの人数。最後に「+n」の円で示す。 */
    more?: number;
    /** 並べるAvatarと同じ大きさ。残りの人数の円をこの大きさにする。 */
    size?: "small" | "default" | "large";
  }
>;
/** 人の円を少しずつ重ねて並べる。childrenにはAvatarだけを置く。 */
export const AvatarGroup = ({
  label,
  more,
  size = "default",
  children,
  class: className,
  ...attributes
}: AvatarGroupProps) => (
  <span
    {...attributes}
    class={classes("ply-avatar-group", className)}
    data-size={size}
    role="group"
    aria-label={label}
  >
    {children}
    {more != null && more > 0 && (
      <span class="more" aria-hidden="true">
        +{more}
      </span>
    )}
  </span>
);
