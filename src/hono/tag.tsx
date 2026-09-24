import type { Child, PropsWithChildren } from "hono/jsx";
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
export type TagProps = { label: string; accent?: Accent } & (
  | { href?: string; removeButton?: never }
  | { href?: never; removeButton: Child }
);
export const Tag = ({ label, href, accent, removeButton }: TagProps) =>
  href ? (
    <a class="ply-tag" data-accent={accent} href={href}>
      {label}
    </a>
  ) : removeButton ? (
    <span class="ply-tag removable" data-accent={accent}>
      <span class="label">{label}</span>
      {removeButton}
    </span>
  ) : (
    <span class="ply-tag" data-accent={accent}>
      {label}
    </span>
  );
