import type { Child } from "hono/jsx";
import { Icon } from "./icon";
import { classes, type ElementProps } from "./types";

export type FileItemProps = ElementProps<"div"> & {
  name: string;
  description: string;
  href?: string;
  state?: "ready" | "pending" | "error";
  actions?: Child;
  /** 画像やPDFの1ページ目の縮小。渡すとファイルの印の代わりに中身を見せる（HEYのファイル一覧と同じ）。 */
  preview?: Child;
};
export const FileItem = ({
  name,
  description,
  href,
  state = "ready",
  actions,
  preview,
  class: className,
  ...attributes
}: FileItemProps) => (
  <div {...attributes} class={classes("ply-file-item", className)} data-state={state}>
    {preview != null && preview !== false ? (
      <span class="preview">{preview}</span>
    ) : (
      <span class="icon">
        <Icon name="file" />
      </span>
    )}
    <div class="body">
      <p class="title">{href ? <a href={href}>{name}</a> : <strong>{name}</strong>}</p>
      <p class="description">
        {state === "pending" && <span class="state">待機中 · </span>}
        {state === "error" && <span class="state">送信失敗 · </span>}
        {description}
      </p>
    </div>
    {actions != null && actions !== false && <div class="actions">{actions}</div>}
  </div>
);
