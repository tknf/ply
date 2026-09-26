import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type CardProps = PropsWithChildren<
  ElementProps<"article"> & {
    title: string;
    href?: string;
    footer?: Child;
    preview?: Child;
    eyebrow?: Child;
    /** 固定した項目。上端をマスキングテープで留めたように示す。 */
    pinned?: boolean;
  }
>;
/** リンクは見出しに限定し、本文や末尾のフォーム操作と競合させない。 */
export const Card = ({
  title,
  href,
  footer,
  preview,
  eyebrow,
  pinned = false,
  children,
  class: className,
  ...attributes
}: CardProps) => (
  <article
    {...attributes}
    class={classes("ply-card", className)}
    data-pinned={pinned ? "true" : undefined}
  >
    {preview != null && preview !== false && <div class="preview">{preview}</div>}
    {eyebrow != null && eyebrow !== false && <div class="eyebrow">{eyebrow}</div>}
    <h3 class="title">{href ? <a href={href}>{title}</a> : title}</h3>
    <div class="body">{children}</div>
    {footer != null && footer !== false && <footer class="meta">{footer}</footer>}
  </article>
);
