import { useId } from "hono/jsx";
import { Button } from "./button";
import { Icon } from "./icon";

export type TreeItem = {
  value: string;
  label: string;
  href?: string;
  disabled?: boolean;
  children?: readonly TreeItem[];
};

export type TreeProps = {
  id?: string;
  label: string;
  items: readonly TreeItem[];
  value?: string;
  expanded?: readonly string[];
};

const uniqueItems = (items: readonly TreeItem[], seen: Set<string>): TreeItem[] =>
  items.flatMap((item) => {
    if (item.value.trim() === "" || seen.has(item.value)) return [];
    seen.add(item.value);
    return [{ ...item, children: uniqueItems(item.children ?? [], seen) }];
  });

const renderItem = (item: TreeItem, path: string, rootId: string) => {
  const children = item.children ?? [];
  const itemLabel = item.label.trim() || item.value;
  return (
    <li
      id={`${rootId}-item-${path}`}
      role="treeitem"
      data-tree-target="item"
      data-tree-value={item.value}
      aria-disabled={item.disabled ? "true" : undefined}
    >
      <div class="row">
        {children.length > 0 ? (
          <Button
            class="toggle"
            variant="link"
            type="button"
            data-icon-only="true"
            data-tree-target="toggle"
            aria-label={`${itemLabel}を開閉`}
            disabled={item.disabled}
          >
            <Icon name="caret" />
          </Button>
        ) : (
          <span class="spacer" aria-hidden="true" />
        )}
        {item.href && !item.disabled ? (
          <a href={item.href}>{itemLabel}</a>
        ) : (
          <span class="label">{itemLabel}</span>
        )}
      </div>
      {children.length > 0 && (
        <ul role="group">
          {children.map((child, index) => renderItem(child, `${path}-${index}`, rootId))}
        </ul>
      )}
    </li>
  );
};

/** 中央の作業面で階層を選ぶ。全体移動はCommandMenuが担う。 */
export const Tree = ({ id, label, items, value = "", expanded = [] }: TreeProps) => {
  const generatedId = useId();
  const treeId = id?.trim() ? id : `ply-tree-${generatedId}`;
  const accessibleLabel = label.trim() || "項目一覧";
  const renderedItems = uniqueItems(items, new Set());
  if (renderedItems.length === 0)
    return (
      <div
        id={treeId}
        class="ply-tree"
        data-empty="true"
        role="status"
        aria-label={accessibleLabel}
      >
        項目はありません。
      </div>
    );
  return (
    <ul
      id={treeId}
      class="ply-tree"
      role="tree"
      aria-label={accessibleLabel}
      tabindex={0}
      data-controller="tree tree-presentation"
      data-tree-value-value={value}
      data-tree-expanded-value={JSON.stringify(expanded)}
    >
      {renderedItems.map((item, index) => renderItem(item, String(index), treeId))}
    </ul>
  );
};
