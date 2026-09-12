import type { PropsWithChildren } from "hono/jsx";

export const EmptyState = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <div class="ply-empty-state">
    <p>
      <strong>{title}</strong>
    </p>
    {children}
  </div>
);
