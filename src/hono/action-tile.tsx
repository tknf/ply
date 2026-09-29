import type { JSX } from "hono/jsx";
import { Badge } from "./badge";
import { Icon, type IconName } from "./icon";
import { Keycap } from "./keycap";
import { classes, type Accent } from "./types";

type TileContent = {
  label: string;
  icon: IconName;
  /** 印の色。既定は青。 */
  accent?: Accent;
  disabled?: boolean;
  class?: string;
  /** 表示用のキーの印。Keycapの小さい形で、印の終わりの側の上に添える。登録は利用側で行う。 */
  shortcut?: string;
  /** 状態の札（「下書き」など）。Badgeの小さい形で、印の上に重ねる。 */
  badge?: string;
};
export type ActionTileProps =
  | (TileContent & { href: string; current?: boolean } & Omit<
        JSX.IntrinsicElements["a"],
        "class" | "children"
      >)
  | (TileContent & { href?: never } & Omit<JSX.IntrinsicElements["button"], "class" | "children">);

/**
 * 塗りつぶしの印を上・名前を下に置いた、格子に並べる入口や操作のタイル。
 * HEYのメニューの上段と同じ形で、CommandMenuの入口やTableの一括操作に使う。hrefを渡すと移動のリンク、渡さなければボタンになる。
 */
export const ActionTile = (props: ActionTileProps) => {
  const { label, icon, accent, disabled, class: className, shortcut, badge } = props;
  const content = (
    <>
      <span class="icon">
        <Icon name={icon} fill />
        {badge && (
          <Badge tone="info" size="small">
            {badge}
          </Badge>
        )}
      </span>
      <span class="name">{label}</span>
      {shortcut && <Keycap class="shortcut" keys={[shortcut]} size="small" aria-hidden="true" />}
    </>
  );
  if (props.href !== undefined) {
    const {
      href,
      current,
      label: _l,
      icon: _i,
      accent: _a,
      disabled: _d,
      class: _c,
      shortcut: _s,
      badge: _b,
      ...attributes
    } = props;
    return disabled ? (
      <span
        class={classes("ply-action-tile", className)}
        data-accent={accent}
        data-disabled="true"
        role="link"
        aria-disabled="true"
      >
        {content}
      </span>
    ) : (
      <a
        {...attributes}
        class={classes("ply-action-tile", className)}
        data-accent={accent}
        href={href}
        aria-current={current ? "page" : undefined}
      >
        {content}
      </a>
    );
  }
  const {
    label: _l,
    icon: _i,
    accent: _a,
    disabled: _d,
    class: _c,
    href: _h,
    shortcut: _s,
    badge: _b,
    ...attributes
  } = props;
  return (
    <button
      type="button"
      {...attributes}
      class={classes("ply-action-tile", className)}
      data-accent={accent}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
