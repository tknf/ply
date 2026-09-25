import type { Child, PropsWithChildren } from "hono/jsx";
import { classes, type ElementProps } from "./types";
import { Wing, type WingProps } from "./wing";

export type AppShellProps = PropsWithChildren<
  ElementProps<"div"> & {
    commands: Child;
    home?: Child;
    account?: Child;
    wings?: Pick<WingProps, "start" | "end" | "storageKey" | "savedState">;
  }
>;

/** 上部中央の共通コマンドと、中央の作業面を構成する。wingsは作業面の左右に開閉できる補助メニューを付ける。 */
export const AppShell = ({
  commands,
  home,
  account,
  wings,
  children,
  class: className,
  ...attributes
}: AppShellProps) => {
  const workspace = <div class="workspace">{children}</div>;
  return (
    <div {...attributes} class={classes("ply-app-shell", className)}>
      <header class="bar">
        <div class="start">{home}</div>
        <nav class="commands" aria-label="共通コマンド">
          {commands}
        </nav>
        <div class="end">{account}</div>
      </header>
      {wings ? <Wing {...wings}>{workspace}</Wing> : workspace}
    </div>
  );
};
