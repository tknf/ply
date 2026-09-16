import { classes, type ElementProps } from "./types";
import { Icon } from "./icon";

export type ErrorSummaryProps = ElementProps<"section"> & {
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
    <section
      {...attributes}
      class={classes("ply-error-summary", className)}
      tabindex={-1}
      aria-label={title}
    >
      <span class="symbol" aria-hidden="true">
        <Icon name="x-circle" />
      </span>
      <h2 class="title">{title}</h2>
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
    </section>
  );
