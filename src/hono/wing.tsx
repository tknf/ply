import type { Child, PropsWithChildren } from "hono/jsx";
import { Icon, type IconName } from "./icon";
import { classes, type ElementProps } from "./types";
import { parseWingState } from "../internal/wing-state";

export { wingCookieName } from "../internal/wing-state";

export type WingPanel = {
  label: string;
  content: Child;
  icon?: IconName;
  /** 初期状態。既定は展開。 */
  open?: boolean;
};

export type WingProps = PropsWithChildren<
  ElementProps<"div"> & {
    start?: WingPanel;
    end?: WingPanel;
    /** 指定するとWingControllerが開閉状態をcookieへ保存する。サイト内で一意にする。 */
    storageKey?: string;
    /** wingCookieName(storageKey)のcookieの値。渡すと保存した開閉状態でSSRする。 */
    savedState?: string;
  }
>;

/** summaryは外側の持ち手。開くと持ち手から外側へパネルが出る。 */
const Panel = ({
  side,
  panel,
  persist,
  open,
}: {
  side: "start" | "end";
  panel: WingPanel;
  persist: boolean;
  open: boolean;
}) => (
  <details class={side} open={open} data-wing-target={persist ? "panel" : undefined}>
    <summary>
      <span class="marker" aria-hidden="true">
        <Icon name="caret" />
      </span>
      {panel.icon && <Icon name={panel.icon} class="icon" />}
      <span class="label">{panel.label}</span>
    </summary>
    <div class="body">{panel.content}</div>
  </details>
);

/**
 * 中央の作業面の後ろへ、左右から開閉できる補助パネルを差し込む。開閉はdetails/summaryだけで動く。
 * Wingは補足なので、DOMの読み順と狭い配置の表示順は作業面・start・endとする。
 */
export const Wing = ({
  start,
  end,
  storageKey,
  savedState,
  children,
  class: className,
  ...attributes
}: WingProps) => {
  const persist = Boolean(storageKey);
  const saved = persist ? parseWingState(savedState) : {};
  return (
    <div
      {...attributes}
      class={classes("ply-wing", className)}
      data-controller={persist ? "wing" : undefined}
      data-wing-storage-key-value={storageKey}
    >
      <div class="layout">
        <div class="main">{children}</div>
        {start && (
          <Panel
            side="start"
            panel={start}
            persist={persist}
            open={saved.start ?? start.open ?? true}
          />
        )}
        {end && (
          <Panel side="end" panel={end} persist={persist} open={saved.end ?? end.open ?? true} />
        )}
      </div>
    </div>
  );
};
