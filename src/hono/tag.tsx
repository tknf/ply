import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type Accent, type ElementProps } from "./types";
export const TagGroup = ({
  children,
  label,
  class: className,
  ...attributes
}: PropsWithChildren<
  ElementProps<"div"> & {
    /** まとまりの名前。role="group"のaria-labelにする。 */
    label: string;
  }
>) => (
  <div {...attributes} class={classes("ply-tag-group", className)} role="group" aria-label={label}>
    {children}
  </div>
);
export type TagProps = {
  /** 札の文言。長い文言は省略せずに折り返す。 */
  label: string;
  /** 縁と文字の色。分類を見分けるために使う。渡さなければ淡い灰の札にする。 */
  accent?: Accent;
} & (
  | {
      /** 渡すと札を分類へ移るリンクにする。removeButtonとは同時に使えない。 */
      href?: string;
      removeButton?: never;
    }
  | {
      href?: never;
      /**
       * 札の終わりに置く外す操作。空のButton（variant="link"・size="tag"・class="remove"・
       * data-icon-only="true"）に「〇〇を解除」のaria-labelを付けて渡すと、×の印を描く。
       * 外した後の処理は利用側が持つ。
       */
      removeButton: Child;
    }
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
