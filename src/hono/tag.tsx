export type TagProps = { label: string; href?: string };
export const Tag = ({ label, href }: TagProps) =>
  href ? (
    <a class="ply-tag" href={href}>
      {label}
    </a>
  ) : (
    <span class="ply-tag">{label}</span>
  );
