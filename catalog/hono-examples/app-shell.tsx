import { AppShell, ActionLink, CommandMenu, PageHeader, Avatar } from "../../src/hono";
export default () => (
  <AppShell
    home={
      <ActionLink href="/apps/project" variant="link">
        ホーム
      </ActionLink>
    }
    commands={
      <CommandMenu
        id="shell-commands"
        label="つむぐチーム"
        shortcuts={[
          { label: "プロジェクト", href: "/apps/project", icon: "layers", accent: "green" },
          { label: "受信トレイ", href: "/apps/inbox", icon: "mail", accent: "blue" },
          { label: "資料", href: "/apps/files", icon: "file", accent: "amber" },
          { label: "売上", href: "/apps/sales", icon: "chart", accent: "coral" },
        ]}
        groups={[
          {
            label: "移動",
            items: [
              { label: "プロジェクト", href: "/apps/project", icon: "layers" },
              { label: "受信トレイ", href: "/apps/inbox", icon: "mail" },
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
