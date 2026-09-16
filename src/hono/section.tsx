import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps, type Tone } from "./types";

export type SectionProps = PropsWithChildren<
  ElementProps<"section"> & {
    title: string;
    count?: number;
    tone?: Tone;
    actions?: Child;
  }
>;
export const Section = ({
  title,
  count,
  tone = "neutral",
  actions,
  children,
  class: className,
  ...attributes
}: SectionProps) => (
  <section {...attributes} class={classes("ply-section", className)} data-tone={tone}>
    <header class="heading">
      <h2>{title}</h2>
      {count !== undefined && <span class="count">{count}</span>}
      {actions != null && actions !== false && <div class="actions">{actions}</div>}
    </header>
    {children}
  </section>
);
