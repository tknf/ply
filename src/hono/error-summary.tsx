export type ErrorSummaryProps = {
  title?: string;
  errors: readonly { label: string; href: string }[];
};
export const ErrorSummary = ({
  title = "入力内容を確認してください",
  errors,
}: ErrorSummaryProps) => (
  <section class="ply-error-summary" tabindex={-1} aria-label={title}>
    <strong>{title}</strong>
    <ul>
      {errors.map((error) => (
        <li>
          <a href={error.href}>{error.label}</a>
        </li>
      ))}
    </ul>
  </section>
);
