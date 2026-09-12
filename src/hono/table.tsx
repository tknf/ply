import type { PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type TableProps = PropsWithChildren<ElementProps<"table"> & { caption: string }>;
/** 列や行の業務モデルを持たず、標準のthead/tbody/tfootを受け取る。 */
export const Table = ({ children, caption, class: className, ...attributes }: TableProps) => (
  <div class="ply-table-scroll" role="region" aria-label={caption} tabindex={0}>
    <table {...attributes} class={classes("ply-table", className)}>
      <caption>{caption}</caption>
      {children}
    </table>
  </div>
);
