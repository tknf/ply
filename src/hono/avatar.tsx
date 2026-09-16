import { classes, type ElementProps, type Accent } from "./types";

export type AvatarProps = ElementProps<"span"> & {
  name: string;
  initials: string;
  src?: string;
  size?: "inline" | "small" | "default" | "large";
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
    role="img"
    aria-label={name}
  >
    {src ? <img src={src} alt="" loading="lazy" /> : <span class="initials">{initials}</span>}
  </span>
);
