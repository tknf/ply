export const Loading = ({ label = "読み込み中…" }: { label?: string }) => (
  <p class="ply-loading" role="status">
    <span aria-hidden="true" />
    {label}
  </p>
);
