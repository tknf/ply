import type { Child } from "hono/jsx";

export type DataListItem = { title: string; description?: string; href?: string; end?: Child };
export const DataList = ({ items }: { items: readonly DataListItem[] }) => (
  <ul class="ply-data-list">
    {items.map(({ title, description, href, end }) => (
      <li>
        <div>
          {href ? <a href={href}>{title}</a> : <strong>{title}</strong>}
          {description && <p>{description}</p>}
        </div>
        {(end || end === 0) && <div>{end}</div>}
      </li>
    ))}
  </ul>
);
