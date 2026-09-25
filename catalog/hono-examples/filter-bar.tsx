import { Disclosure, FilterBar } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <div class="ply-stack" data-space="small">
      <p class="label">予定を月で絞り込む</p>
      <FilterBar
        label="表示する月"
        items={[
          { label: "8月", href: "/examples/schedule/august" },
          { label: "9月", href: "/examples/schedule", current: true },
        ]}
      />
    </div>
    <div class="ply-stack" data-space="small">
      <p class="label">表示を切り替える</p>
      <FilterBar
        label="予定の表示形式"
        appearance="segmented"
        items={[
          { label: "月", href: "/examples/schedule", current: true },
          { label: "週", href: "/examples/schedule?view=week" },
          { label: "年", href: "/examples/schedule?view=year" },
          { label: "一覧", href: "/examples/schedule?view=agenda" },
        ]}
      />
    </div>
    <Disclosure summary="件数・0件・長い条件名">
      <div class="ply-stack">
        <FilterBar
          label="記事の状態"
          items={[
            { label: "すべて", href: "/search", count: 6, current: true },
            { label: "公開中", href: "/search?state=公開中", count: 3 },
            { label: "下書き", href: "/search?state=下書き", count: 3 },
            { label: "該当なし", href: "/search?q=該当なし", count: 0 },
          ]}
        />
        <FilterBar
          label="検索する内容"
          items={[
            { label: "すべて", href: "/search", current: true },
            {
              label: "長く使う道具と日々の暮らしを整える工夫について",
              href: "/search?q=道具",
            },
            { label: "初めての方への申し込み手順", href: "/search?q=申し込み" },
          ]}
        />
      </div>
    </Disclosure>
  </div>
);
