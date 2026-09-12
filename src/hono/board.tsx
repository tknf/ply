import type { Child } from "hono/jsx";
export type BoardProps = {
  label: string;
  columns: readonly { title: string; count: number; content: Child }[];
};
export const Board = ({ label, columns }: BoardProps) => (
  <div class="ply-board" role="region" aria-label={label} tabindex={0}>
    {columns.map((column) => (
      <section>
        <h3>
          {column.title}
          <small>{column.count}</small>
        </h3>
        <div>{column.content}</div>
      </section>
    ))}
  </div>
);
