import type { PropsWithChildren } from "hono/jsx";
export const Toast = ({ id, children }: PropsWithChildren<{ id: string }>) => (
  <aside id={id} class="ply-toast" popover="manual">
    <p role="status">{children}</p>
    <button type="button" class="ply-button" popovertarget={id} popovertargetaction="hide">
      閉じる
    </button>
  </aside>
);
