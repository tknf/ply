import { classes, type ElementProps } from "./types";
import { Notice } from "./notice";

export type ErrorSummaryProps = ElementProps<"aside"> & {
  title?: string;
  errors: readonly { label: string; href: string }[];
};
export const ErrorSummary = ({
  title = "入力内容を確認してください",
  errors,
  class: className,
  ...attributes
}: ErrorSummaryProps) =>
  errors.length === 0 ? null : (
    <Notice
      {...attributes}
      class={classes("ply-error-summary", className)}
      tone="danger"
      label={title}
      heading
      tabindex={-1}
    >
      <ul>
        {errors.map((error, index) => (
          <li>
            <a href={error.href}>
              <span class="number" aria-hidden="true">
                {index + 1}
              </span>
              <span>{error.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Notice>
  );
