export type BreadcrumbItem = { label: string; href?: string };
export type BreadcrumbProps = {
  label?: string;
  items: readonly BreadcrumbItem[];
};
export const Breadcrumb = ({ label = "現在の位置", items }: BreadcrumbProps) => (
  <nav class="ply-breadcrumb" aria-label={label}>
    <ol>
      {items.map((item, index) => (
        <li>
          {item.href && index < items.length - 1 ? (
            <a href={item.href} aria-current={index === items.length - 1 ? "page" : undefined}>
              {item.label}
            </a>
          ) : (
            <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
