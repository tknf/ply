import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type DangerZoneProps = PropsWithChildren<
  ElementProps<"section"> & {
    title?: string;
    description?: string;
    actions?: Child;
  }
>;

/** 影響の説明と操作をまとめる。確認や実行には利用側のButton・Dialogを渡す。 */
export const DangerZone = ({
  children,
  title = "影響のある操作",
  description,
  actions,
  class: className,
  ...attributes
}: DangerZoneProps) => (
  <section {...attributes} class={classes("ply-danger-zone", className)}>
    <header class="heading">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
    <div class="body">{children}</div>
    <div class="actions">{actions}</div>
  </section>
);
