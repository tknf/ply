export type PageLink = { label: string; href?: string; current?: boolean };
export const Pagination = ({
  items,
  label = "ページ送り",
}: {
  items: readonly PageLink[];
  label?: string;
}) => (
  <nav class="ply-pagination" aria-label={label}>
    <ul>
      {items.map(({ label: text, href, current }) => (
        <li>
          {href && !current ? (
            <a href={href}>{text}</a>
          ) : (
            <span
              data-current={current ? "true" : undefined}
              data-disabled={!current && text !== "…" ? "true" : undefined}
              aria-current={current ? "page" : undefined}
              aria-disabled={!current && text !== "…" ? "true" : undefined}
            >
              {text}
            </span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
