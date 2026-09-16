import { ActionList, Icon, Disclosure } from "../../src/hono";
export default () => (
  <div class="ply-stack">
    <ActionList
      items={[
        {
          title: "記事を書く",
          href: "/example",
          description: "途中まで書いて、下書きとして保存できます。",
          icon: <Icon name="pencil" />,
        },
        {
          title: "予約を確認する",
          href: "/reservation",
          description: "日時と人数、利用する部屋を確認します。",
          icon: <Icon name="calendar" />,
        },
        { title: "すべての添付ファイルと過去に公開した資料を確認する", href: "/files" },
      ]}
    />
    <Disclosure summary="内容の見える道具の入口" open>
      <ActionList
        layout="grid"
        items={[
          {
            title: "記事",
            href: "/search",
            icon: <Icon name="pencil" />,
            accent: "amber",
            preview: (
              <>
                <p>仕事場の案内</p>
                <p>秋の読書会のお知らせ</p>
                <small>下書き2件 · 公開中4件</small>
              </>
            ),
          },
          {
            title: "予定",
            href: "/examples/schedule",
            icon: <Icon name="calendar" />,
            accent: "green",
            preview: (
              <>
                <p>
                  <time datetime="2026-09-25">9月25日</time>　読書会
                </p>
                <p>
                  <time datetime="2026-09-28">9月28日</time>　編集会議
                </p>
              </>
            ),
          },
        ]}
      />
    </Disclosure>
  </div>
);
