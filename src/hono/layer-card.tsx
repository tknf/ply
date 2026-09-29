import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type LayerCardProps = PropsWithChildren<
  ElementProps<"section"> & {
    title: string;
    actions?: Child;
  }
>;

/**
 * 見出しを淡い面の層に置き、中身を一段上の白い紙に載せる。
 * 見出しを紙の中に書かないので、題名が中身と競わない。
 */
export const LayerCard = ({
  title,
  actions,
  children,
  class: className,
  ...attributes
}: LayerCardProps) => (
  <section {...attributes} class={classes("ply-layer-card", className)}>
    <header class="heading">
      <h3 class="title">{title}</h3>
      {actions != null && actions !== false && <div class="actions">{actions}</div>}
    </header>
    <div class="body">{children}</div>
  </section>
);
