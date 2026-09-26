import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type CardProps = PropsWithChildren<
  ElementProps<"article"> & {
    title: string;
    href?: string;
    footer?: Child;
    preview?: Child;
    eyebrow?: Child;
    /** 分類のつまみ。紙から出たインデックスの見出しとして、墨で塗って示す。 */
    tab?: string;
    /** 固定した項目。上端をマスキングテープで留めたように示す。 */
    pinned?: boolean;
    /** 後ろに続きがある項目（スレッド、フォルダ、子の項目、まとめた通知）。重ねた紙で示す。 */
    stacked?: boolean;
  }
>;
/** リンクは見出しに限定し、本文や末尾のフォーム操作と競合させない。 */
export const Card = ({
  title,
  href,
  footer,
  preview,
  eyebrow,
  tab,
  pinned = false,
  stacked = false,
  children,
  class: className,
  ...attributes
}: CardProps) => (
  <article
    {...attributes}
    class={classes("ply-card", className)}
    data-pinned={pinned ? "true" : undefined}
    data-stacked={stacked ? "true" : undefined}
  >
    {tab && (
      <span class="tab">
        <span>{tab}</span>
      </span>
    )}
    {preview != null && preview !== false && <div class="preview">{preview}</div>}
    {eyebrow != null && eyebrow !== false && <div class="eyebrow">{eyebrow}</div>}
    <h3 class="title">{href ? <a href={href}>{title}</a> : title}</h3>
    <div class="body">{children}</div>
    {footer != null && footer !== false && <footer class="meta">{footer}</footer>}
  </article>
);
