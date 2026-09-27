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

/**
 * summaryは作業面の縁から出る持ち手。共通Buttonの主操作のアイコンだけの形を中に置き、
 * アイコンを指定しない時だけ開閉の印を出す。押す要素はsummaryで、ボタンの見た目は読み上げない。
 * 広い配置で閉じている間は名前を画面に出さず、指を載せた時にツールチップで示す（読み上げの名前は中の文言）。
 * 開くと、ボタンと名前が上端の見出しになる。
 */
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
      <span
        class="handle ply-button"
        data-variant="primary"
        data-icon-only="true"
        data-fallback={panel.icon ? undefined : "caret"}
        aria-hidden="true"
      >
        <Icon name={panel.icon ?? "caret"} />
      </span>
      <span class="label">{panel.label}</span>
      <span class="tip ply-overlay" aria-hidden="true">
        {panel.label}
      </span>
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
