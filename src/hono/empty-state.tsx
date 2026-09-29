import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export type EmptyStateProps = PropsWithChildren<
  ElementProps<"section"> & {
    title: string;
    kind?: "empty" | "start" | "complete";
    actions?: Child;
    icon?: Child;
  }
>;
/** 検索0件・初回利用・作業完了を、実際の文脈と次の操作に合わせて使い分ける。 */
export const EmptyState = ({
  children,
  title,
  kind = "empty",
  actions,
  icon,
  class: className,
  ...attributes
}: EmptyStateProps) => {
  // 終わった時だけ、ペンで描くチェックを既定の印にする。他の場面は渡された時だけ印を置く。
  const symbol =
    icon != null && icon !== false ? icon : kind === "complete" ? <Icon name="check" /> : null;
  return (
    <section {...attributes} class={classes("ply-empty-state", className)} data-kind={kind}>
      <div class="slip">
        {symbol && (
          <div class="symbol" aria-hidden="true">
            {symbol}
          </div>
        )}
        <h3 class="title">{title}</h3>
        <div class="body">{children}</div>
      </div>
      {actions != null && actions !== false && <div class="actions">{actions}</div>}
    </section>
  );
};
