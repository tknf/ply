import { ActionTile, type ActionTileProps } from "./action-tile";
import { classes, type ElementProps } from "./types";

export type ActionDockProps = ElementProps<"nav"> & {
  /** 棚の名前。`nav`の`aria-label`として読み上げる。 */
  label: string;
  /** 並べる操作。ActionTileと同じ指定で、hrefがあればリンク、無ければボタンになる。 */
  items: readonly ActionTileProps[];
  /** fixedは画面の下の中央に浮かべ、stickyは置いた場所の下端に留める（既定）。 */
  placement?: "sticky" | "fixed";
};

/**
 * 内容の下に浮かぶ操作の棚。白い紙を画面の下の中央に浮かべ、印・名前・キーの印を縦に積んだ操作を横に並べる。
 * 操作はActionTileで、棚の中では浮き上がりを消して平らにする。
 */
export const ActionDock = ({
  label,
  items,
  placement = "sticky",
  class: className,
  ...attributes
}: ActionDockProps) => (
  <nav
    {...attributes}
    class={classes("ply-action-dock", className)}
    aria-label={label}
    data-placement={placement}
  >
    <ul>
      {items.map((item) => (
        <li>
          <ActionTile {...item} />
        </li>
      ))}
    </ul>
  </nav>
);
