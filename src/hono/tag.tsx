import type { PropsWithChildren } from "hono/jsx";
import { classes, type Accent, type ElementProps } from "./types";
export const TagGroup = ({
  children,
  label,
  class: className,
  ...attributes
}: PropsWithChildren<ElementProps<"div"> & { label: string }>) => (
  <div {...attributes} class={classes("ply-tag-group", className)} role="group" aria-label={label}>
    {children}
  </div>
);
export type TagProps = { label: string; href?: string; accent?: Accent };
export const Tag = ({ label, href, accent }: TagProps) =>
  href ? (
    <a class="ply-tag" data-accent={accent} href={href}>
      {label}
    </a>
  ) : (
    <span class="ply-tag" data-accent={accent}>
      {label}
    </span>
  );
