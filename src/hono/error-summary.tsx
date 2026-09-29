import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export type ErrorSummaryProps = ElementProps<"aside"> & {
  title?: string;
  errors: readonly { label: string; href: string }[];
};
/**
 * 直すところを、各欄へ移るリンクの一覧にまとめる。見た目はNoticeの危険の役割そのもの（紙と、印と見出しのピル）で、
 * ErrorSummaryが持つのは直す欄への一覧だけ。
 */
export const ErrorSummary = ({
  title = "入力内容を確認してください",
  errors,
  class: className,
  ...attributes
}: ErrorSummaryProps) =>
  errors.length === 0 ? null : (
    <aside
      {...attributes}
      class={classes("ply-notice ply-error-summary", className)}
      data-tone="danger"
      aria-label={title}
      tabindex={-1}
    >
      <div class="heading">
        <span class="symbol" aria-hidden="true">
          <Icon name="x" />
        </span>
        <h2 class="title">{title}</h2>
      </div>
      <div class="body">
        <ul>
          {errors.map((error) => (
            <li>
              <a href={error.href}>{error.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
