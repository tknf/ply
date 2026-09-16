import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type CardProps = PropsWithChildren<
  ElementProps<"article"> & {
    title: string;
    href?: string;
    footer?: Child;
    preview?: Child;
    eyebrow?: Child;
  }
>;
/** リンクは見出しに限定し、本文や末尾のフォーム操作と競合させない。 */
export const Card = ({
  title,
  href,
  footer,
  preview,
  eyebrow,
  children,
  class: className,
  ...attributes
}: CardProps) => (
  <article {...attributes} class={classes("ply-card", className)}>
    {preview != null && preview !== false && <div class="preview">{preview}</div>}
    {eyebrow != null && eyebrow !== false && <div class="eyebrow">{eyebrow}</div>}
    <h3 class="title">{href ? <a href={href}>{title}</a> : title}</h3>
    <div class="body">{children}</div>
    {footer != null && footer !== false && <footer class="meta">{footer}</footer>}
  </article>
);
