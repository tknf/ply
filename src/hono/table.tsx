import type { Child, PropsWithChildren } from "hono/jsx";
import { Button } from "./button";
import { classes, type ElementProps } from "./types";

export type TableProps = PropsWithChildren<
  ElementProps<"table"> & {
    caption: string;
    density?: "compact" | "comfortable";
    sort?: "local" | "manual";
    selectable?: boolean;
    selectionActions?: Child;
    stickyHeader?: boolean;
    state?: "ready" | "loading" | "empty" | "error";
    stateContent?: Child;
  }
>;
export const Table = ({
  children,
  caption,
  density = "compact",
  sort,
  selectable = false,
  selectionActions,
  stickyHeader = false,
  state = "ready",
  stateContent,
  class: className,
  ...attributes
}: TableProps) => (
  <div
    class="ply-table"
    role="region"
    aria-label={caption}
    tabindex={0}
    data-controller={sort || selectable ? "table" : undefined}
    data-sort-mode={sort}
    data-state={state}
    data-sticky={stickyHeader ? "true" : undefined}
  >
    {selectable && (
      <div class="selection-bar" hidden>
        <span class="count" role="status" aria-live="polite" />
        <div class="actions">
          {selectionActions}
          <Button size="compact" data-table-clear>
            選択を解除
          </Button>
        </div>
      </div>
    )}
    <table
      {...attributes}
      data-controller={classes(
        state === "ready"
          ? [sort ? "table-sort" : "", selectable ? "table-select" : ""].filter(Boolean).join(" ")
          : "",
        attributes["data-controller"],
      )}
      data-density={density}
      class={classes("table", className)}
      aria-busy={state === "loading" ? "true" : undefined}
    >
      <caption>{caption}</caption>
      {children}
    </table>
    {state !== "ready" && (
      <div class="state" role="status">
        {stateContent ??
          (state === "loading"
            ? "読み込んでいます…"
            : state === "error"
              ? "一覧を読み込めませんでした。"
              : "表示する項目はありません。")}
      </div>
    )}
    {(sort || selectable) && (
      <p class="ply-visually-hidden" data-table-announcement role="status" />
    )}
  </div>
);

export type TableSortProps = PropsWithChildren<
  ElementProps<"th"> & {
    column: string;
    type?: "text" | "number" | "date";
    disabled?: boolean;
  }
>;
/** 並べ替え可能な見出しセル。上流controllerの契約に沿ったthを出力する。 */
export const TableSort = ({
  children,
  column,
  type = "text",
  disabled = false,
  ...attributes
}: TableSortProps) => (
  <th
    {...attributes}
    scope="col"
    aria-sort="none"
    data-state="none"
    data-table-sort-target="sortable"
    data-table-sort-column={column}
  >
    <Button
      class="sort"
      data-table-sort={column}
      data-sort-type={type}
      data-sort-disabled={disabled ? "true" : undefined}
      disabled
    >
      {children}
      <span class="indicator" aria-hidden="true">
        ↕
      </span>
    </Button>
  </th>
);

export type TableSelectionProps = Omit<ElementProps<"input">, "type"> & {
  label: string;
  rowId?: string;
};
/** rowIdなしは現在の表の全選択。行のcheckboxは送信用name/value/formも指定できる。 */
export const TableSelection = ({ label, rowId, ...attributes }: TableSelectionProps) => (
  <label class="ply-choice">
    <input
      {...attributes}
      type="checkbox"
      aria-label={label}
      data-table-select={rowId === undefined ? "all" : "row"}
      data-row-id={rowId}
      data-table-select-target={rowId === undefined ? "all" : "item"}
      data-table-select-value={rowId}
    />
  </label>
);
