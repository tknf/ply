import type { Child, PropsWithChildren } from "hono/jsx";
export type CardProps = PropsWithChildren<{ title: string; href?: string; footer?: Child }>;
export const Card = ({ title, href, footer, children }: CardProps) => (
  <article class="ply-card">
    <h3>{href ? <a href={href}>{title}</a> : title}</h3>
    <div>{children}</div>
    {footer && <footer>{footer}</footer>}
  </article>
);
