import { DataList, Badge, Button } from "../../src/hono";
export default () => (
  <DataList
    aria-label="記事の一覧"
    items={[
      {
        title: "暮らしの記録",
        href: "/example",
        description: "季節の移り変わりを、写真と文章で記録しています。",
        meta: "田中 遥 · 9月15日更新",
        end: <Badge tone="success">公開中</Badge>,
      },
      {
        title: "初めての予約から当日の受付まで、仕事場を利用する方への詳しいご案内",
        href: "/example",
        description: "利用方法と料金、キャンセルの条件をまとめています。",
        end: (
          <>
            <Badge tone="info">確認待ち</Badge>
            <Button disabled>公開する</Button>
          </>
        ),
      },
      { title: "今月の問い合わせ", description: "回答を待っている問い合わせの件数です。", end: 0 },
      { title: "まだ公開されていない記事", description: "内容を準備しています。" },
    ]}
  />
);
