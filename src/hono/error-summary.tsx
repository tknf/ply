import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export type ErrorSummaryProps = ElementProps<"aside"> & {
  title?: string;
  errors: readonly { label: string; href: string }[];
};
/** 直すところを、校正の余白のように朱の余白線の外へ番号を振って並べる。 */
export const ErrorSummary = ({
  title = "入力内容を確認してください",
  errors,
  class: className,
  ...attributes
}: ErrorSummaryProps) =>
  errors.length === 0 ? null : (
    <aside
      {...attributes}
      class={classes("ply-error-summary", className)}
      aria-label={title}
      tabindex={-1}
    >
      <h2 class="title">
        <Icon name="x-circle" />
        <span>{title}</span>
      </h2>
      <ul>
        {errors.map((error, index) => (
          <li>
            <a href={error.href}>
              <span class="number" aria-hidden="true">
                {index + 1}
              </span>
              <span class="label">{error.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
