export type BreadcrumbProps = {
  label?: string;
  items: readonly { label: string; href?: string }[];
};
export const Breadcrumb = ({ label = "現在の位置", items }: BreadcrumbProps) => (
  <nav aria-label={label}>
    <ol class="ply-breadcrumb-list">
      {items.map((item) => (
        <li>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
