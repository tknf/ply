import type { Child } from "hono/jsx";
import { classes, type ElementProps } from "./types";

/** currentは今日の列。見出しを塗った楕円で囲む。 */
export type GridColumn = { id: string; label: string; current?: boolean };
export type GridCell = { content: Child; disabled?: boolean };
export type GridRow = { id: string; label: string; cells: readonly GridCell[] };
export type GridProps = ElementProps<"div"> & {
  caption: string;
  rowHeader: string;
  columns: readonly GridColumn[];
  rows: readonly GridRow[];
  pageSize?: number;
  empty?: Child;
};

/** 等列数の native table に上流 GridController の二次元移動を付ける。 */
export const Grid = ({
  caption,
  rowHeader,
  columns,
  rows,
  pageSize = 10,
  empty = "表示できる項目はありません。",
  class: className,
  ...attributes
}: GridProps) => {
  if (!caption.trim() || !rowHeader.trim() || columns.length === 0) {
    throw new Error("Gridにはcaption・rowHeader・1列以上のcolumnsが必要です。");
  }
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error("GridのpageSizeには1以上の整数を指定してください。");
  }
  if (rows.some((row) => row.cells.length !== columns.length)) {
    throw new Error("Gridの各行のcellsはcolumnsと同じ数にしてください。");
  }

  return (
    <div {...attributes} class={classes("ply-grid", className)}>
      <table
        class="table"
        role={rows.length > 0 ? "grid" : undefined}
        data-controller={rows.length > 0 ? "grid" : undefined}
        data-grid-page-size-value={pageSize}
      >
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{rowHeader}</th>
            {columns.map((column) => (
              <th
                scope="col"
                data-column-id={column.id}
                data-current={column.current ? "true" : undefined}
                aria-current={column.current ? "date" : undefined}
              >
                <span class="label">{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr data-row-id={row.id}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td
                  data-column-id={columns[index]?.id}
                  data-disabled={cell.disabled ? "true" : undefined}
                  aria-disabled={cell.disabled ? "true" : undefined}
                >
                  {cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p class="empty" role="status">
          {empty}
        </p>
      )}
    </div>
  );
};
