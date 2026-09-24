import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Icon } from "./icon";

export type TreegridColumn = {
  heading: string;
  cell?: "text" | "short" | "numeric";
};

export type TreegridItem = {
  value: string;
  label: string;
  /** 葉の行だけに設定する移動先。 */
  href?: string;
  /** 行のリンクを利用できない状態。行とセルのキーボード移動は維持する。 */
  disabled?: boolean;
  cells?: readonly Child[];
  children?: readonly TreegridItem[];
};

export type TreegridProps = {
  caption: string;
  columns: readonly TreegridColumn[];
  items: readonly TreegridItem[];
  expanded?: readonly string[];
  selection?: "none" | "single" | "multiple";
  selected?: readonly string[];
  pageSize?: number;
  density?: "compact" | "comfortable";
  state?: "ready" | "loading" | "empty" | "error";
  stateContent?: Child;
};

const uniqueItems = (items: readonly TreegridItem[], seen: Set<string>): TreegridItem[] =>
  items.flatMap((item) => {
    if (!item.value.trim() || seen.has(item.value)) return [];
    seen.add(item.value);
    return [{ ...item, children: uniqueItems(item.children ?? [], seen) }];
  });

const renderRows = (
  items: readonly TreegridItem[],
  columns: readonly TreegridColumn[],
  expanded: ReadonlySet<string>,
  selected: ReadonlySet<string>,
  selection: TreegridProps["selection"],
  level = 1,
): Child[] =>
  items.flatMap((item, index) => {
    const children = item.children ?? [];
    const expandable = children.length > 0;
    const label = item.label.trim() || item.value;
    const row = (
      <tr
        data-treegrid-target="row"
        data-treegrid-value={item.value}
        data-treegrid-level={level}
        data-state={expandable ? (expanded.has(item.value) ? "expanded" : "collapsed") : undefined}
        data-selected={selection !== "none" && selected.has(item.value) ? "true" : undefined}
        data-disabled={item.disabled ? "true" : undefined}
        aria-level={level}
        aria-posinset={index + 1}
        aria-setsize={items.length}
        aria-expanded={expandable ? (expanded.has(item.value) ? "true" : "false") : undefined}
        aria-selected={
          selection === "multiple"
            ? selected.has(item.value)
              ? "true"
              : "false"
            : selection === "single" && selected.has(item.value)
              ? "true"
              : undefined
        }
        style={`--ply-treegrid-depth: ${level - 1}`}
      >
        <th scope="row" data-cell="text" tabindex={level === 1 && index === 0 ? 0 : -1}>
          <span class="node">
            {expandable ? (
              <Button
                class="toggle"
                variant="link"
                type="button"
                data-icon-only="true"
                data-treegrid-target="toggle"
                aria-label={`${label}を開閉`}
                tabindex={-1}
              >
                <Icon name="caret" />
              </Button>
            ) : (
              <span class="spacer" aria-hidden="true" />
            )}
            {item.href && !item.disabled && !expandable ? (
              <a href={item.href}>{label}</a>
            ) : (
              <span class="label">{label}</span>
            )}
          </span>
        </th>
        {columns.slice(1).map((column, cellIndex) => (
          <td data-cell={column.cell} tabindex={-1}>
            {item.cells?.[cellIndex] ?? "—"}
          </td>
        ))}
      </tr>
    );
    return [row, ...renderRows(children, columns, expanded, selected, selection, level + 1)];
  });

/** Tableの表面・階層表示を共有し、開閉と二次元移動は上流TreegridControllerに委ねる。 */
export const Treegrid = ({
  caption,
  columns,
  items,
  expanded = [],
  selection = "none",
  selected = [],
  pageSize = 10,
  density = "compact",
  state = "ready",
  stateContent,
}: TreegridProps) => {
  const renderedItems = uniqueItems(items, new Set());
  const renderedColumns = columns.length > 0 ? columns : [{ heading: "項目" }];
  const accessibleCaption = caption.trim() || "階層表";
  const navigationPageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 10;
  const currentState = state === "ready" && renderedItems.length === 0 ? "empty" : state;
  const interactive = currentState === "ready";
  return (
    <div class="ply-table ply-treegrid" data-state={currentState}>
      <table
        class="table"
        role={interactive ? "treegrid" : undefined}
        aria-label={accessibleCaption}
        aria-multiselectable={interactive && selection === "multiple" ? "true" : undefined}
        aria-busy={currentState === "loading" ? "true" : undefined}
        data-density={density}
        data-controller={interactive ? "treegrid" : undefined}
        data-treegrid-expanded-value={interactive ? JSON.stringify(expanded) : undefined}
        data-treegrid-selection-value={interactive ? selection : undefined}
        data-treegrid-selected-value={interactive ? JSON.stringify(selected) : undefined}
        data-treegrid-page-size-value={interactive ? navigationPageSize : undefined}
      >
        <caption>{accessibleCaption}</caption>
        <thead>
          <tr>
            {renderedColumns.map((column) => (
              <th scope="col" data-cell={column.cell}>
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        {interactive && (
          <tbody>
            {renderRows(
              renderedItems,
              renderedColumns,
              new Set(expanded),
              new Set(selected),
              selection,
            )}
          </tbody>
        )}
      </table>
      {!interactive && (
        <div class="state" role="status">
          {stateContent ??
            (currentState === "loading"
              ? "読み込んでいます…"
              : currentState === "error"
                ? "一覧を読み込めませんでした。"
                : "表示する項目はありません。")}
        </div>
      )}
    </div>
  );
};
