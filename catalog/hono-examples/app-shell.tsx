import { AppShell, ActionLink, CommandMenu, PageHeader, Avatar } from "../../src/hono";
export default () => (
  <AppShell
    home={
      <ActionLink href="/review/workspace" variant="link">
        ホーム
      </ActionLink>
    }
    commands={
      <CommandMenu
        id="shell-commands"
        label="つむぐチーム"
        shortcuts={[
          { label: "プロジェクト", href: "/review/workspace", icon: "layers", accent: "green" },
          { label: "受信トレイ", href: "/review/mail", icon: "mail", accent: "blue" },
          { label: "資料", href: "/files", icon: "file", accent: "amber" },
          { label: "売上", href: "/sales", icon: "chart", accent: "coral" },
        ]}
        groups={[
          {
            label: "移動",
            items: [
              { label: "プロジェクト", href: "/review/workspace", icon: "layers" },
              { label: "受信トレイ", href: "/review/mail", icon: "mail" },
            ],
          },
        ]}
      />
    }
    account={<Avatar name="田中 遥" initials="遥" size="small" tone="coral" />}
  >
    <PageHeader
      title="今日の仕事"
      description="上部中央のコマンドメニューから移動し、中央の作業面で仕事を進めます。"
    />
  </AppShell>
);
