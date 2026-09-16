import { Message, Avatar } from "../../src/hono";
export default () => (
  <Message
    author="森 美咲"
    time="今日 10:24"
    datetime="2026-09-15T10:24:00+09:00"
    avatar={<Avatar name="森 美咲" initials="美" tone="green" size="small" />}
  >
    <p>記事のカテゴリを5つにまとめました。まずはこの形で、実際に探しやすいか試してみたいです。</p>
  </Message>
);
