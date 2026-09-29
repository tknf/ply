import {
  ProfileHeader,
  Avatar,
  Tag,
  ActionLink,
  DropdownMenu,
  Disclosure,
  DisclosureGroup,
} from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <ProfileHeader
      headingLevel={3}
      name="田中 遥"
      avatar={<Avatar name="田中 遥" initials="遥" size="large" />}
      detail="haruka@example.com"
      badge={<Tag label="@example.com" />}
      actions={<ActionLink href="/">編集</ActionLink>}
      preferences={
        <>
          <DropdownMenu
            id="profile-notify"
            label="通知しない"
            icon="bell"
            items={[
              { kind: "radio", name: "notify", value: "off", label: "通知しない", checked: true },
              { kind: "radio", name: "notify", value: "on", label: "通知する" },
            ]}
          />
          <DropdownMenu
            id="profile-deliver"
            label="Imboxに届ける"
            icon="mail"
            items={[
              { kind: "radio", name: "deliver", value: "imbox", label: "Imbox", checked: true },
              { kind: "radio", name: "deliver", value: "feed", label: "The Feed" },
            ]}
          />
          <DropdownMenu
            id="profile-note"
            label="メモを書く"
            icon="pencil"
            items={[{ value: "note", label: "メモを書く" }]}
          />
        </>
      }
    />
    <DisclosureGroup label="内容の違い">
      <Disclosure summary="名前だけ">
        <ProfileHeader
          headingLevel={3}
          name="佐藤 健"
          avatar={<Avatar name="佐藤 健" initials="健" size="large" tone="green" />}
        />
      </Disclosure>
      <Disclosure summary="狭い場所：長い名前と設定の帯を折り返す">
        <div style="max-inline-size: 18rem">
          <ProfileHeader
            headingLevel={3}
            name="秋の読書会の実行委員会"
            avatar={<Avatar name="秋の読書会" initials="秋" size="large" tone="amber" />}
            detail="reading-club-committee@example.com"
            preferences={
              <>
                <DropdownMenu
                  id="narrow-notify"
                  label="通知しない"
                  icon="bell"
                  items={[{ value: "on", label: "通知する" }]}
                />
                <DropdownMenu
                  id="narrow-deliver"
                  label="Imboxに届ける"
                  icon="mail"
                  items={[{ value: "feed", label: "The Feed" }]}
                />
              </>
            }
          />
        </div>
      </Disclosure>
      <Disclosure summary="右から左に読む場合">
        <div dir="rtl" lang="ar">
          <ProfileHeader
            headingLevel={3}
            name="هارو تاناكا"
            avatar={<Avatar name="هارو" initials="ه" size="large" />}
            detail="haruka@example.com"
            actions={<ActionLink href="/">تعديل</ActionLink>}
          />
        </div>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
