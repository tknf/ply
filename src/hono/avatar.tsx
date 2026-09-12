export type AvatarProps = {
  name: string;
  initials: string;
  src?: string;
  size?: "small" | "default";
};
export const Avatar = ({ name, initials, src, size = "default" }: AvatarProps) => (
  <span class="ply-avatar" data-size={size} role="img" aria-label={name}>
    {src ? <img src={src} alt="" /> : initials}
  </span>
);
