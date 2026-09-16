import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";

export type AppShellProps = PropsWithChildren<
  ElementProps<"div"> & {
    commands: Child;
    home?: Child;
    account?: Child;
  }
>;

/** 上部中央の共通コマンドと、中央の作業面を構成する。 */
export const AppShell = ({
  commands,
  home,
  account,
  children,
  class: className,
  ...attributes
}: AppShellProps) => (
  <div {...attributes} class={classes("ply-app-shell", className)}>
    <header class="bar">
      <div class="start">{home}</div>
      <nav class="commands" aria-label="共通コマンド">
        {commands}
      </nav>
      <div class="end">{account}</div>
    </header>
    <div class="workspace">{children}</div>
  </div>
);
