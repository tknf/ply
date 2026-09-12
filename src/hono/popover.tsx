import type { PropsWithChildren } from "hono/jsx";
export const Popover = ({
  id,
  label,
  children,
}: PropsWithChildren<{ id: string; label: string }>) => (
  <div class="ply-popover-host">
    <button type="button" class="ply-button" popovertarget={id}>
      {label}
    </button>
    <div id={id} popover="auto" class="ply-popover">
      <strong>{label}</strong>
      {children}
      <button type="button" class="ply-button" popovertarget={id} popovertargetaction="hide">
        閉じる
      </button>
    </div>
  </div>
);
