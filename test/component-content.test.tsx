import { expect, test } from "vite-plus/test";
import { html } from "hono/html";
import { Calendar, Card, DataList, ErrorSummary, FileItem, Icon } from "../src/hono";

const makeDay = () => ({
  day: 1,
  date: "2026-09-01",
  events: [{ label: "<script>例</script>", href: "/event?a=1&b=2" }],
});

test("一覧の選択先を伝え主情報・補足・件数0を別の読み順で保つ", async () => {
  const markup = String(
    await html`${(
      <DataList
        items={[
          {
            title: "資料",
            href: "/files",
            current: true,
            start: <Icon name="file" />,
            description: "共有する資料",
            meta: 0,
            end: 0,
          },
        ]}
      />
    )}`,
  );
  expect(markup).toContain('aria-current="true"');
  expect(markup).toContain('class="meta">0</div>');
  expect(markup).toContain('class="end">0</div>');
  expect(markup.indexOf('class="start"')).toBeLessThan(markup.indexOf('class="body"'));
});

test("月カレンダーは不足するセルを補い予定の文字列をエスケープする", async () => {
  const result = await html`${<Calendar label="予定" weeks={[[null, makeDay()]]} />}`;
  const markup = String(result);
  expect(markup.match(/<td/g)).toHaveLength(7);
  expect(markup).toContain("&lt;script&gt;例&lt;/script&gt;");
  expect(markup).toContain('href="/event?a=1&amp;b=2"');
});

test("エラーがないときは空の修正案内やフォーカス先を出さない", async () => {
  expect(String(await html`${<ErrorSummary errors={[]} />}`)).toBe("");
});

test("件数0を補足として保持しファイルの状態を文言でも示す", async () => {
  const card = String(await html`${<Card title="予約" footer={0} />}`);
  expect(card).toContain('class="meta">0</footer>');
  const file = String(
    await html`${<FileItem name="資料.pdf" description="接続を確認してください。" state="error" />}`,
  );
  expect(file).toContain("送信失敗");
  expect(file).toContain("接続を確認してください。");
});

test("共有Iconへ局所の役割名を付けても装飾としての属性を保つ", async () => {
  const icon = String(await html`${<Icon name="file" class="icon" />}`);
  expect(icon).toContain('class="ply-icon icon"');
  expect(icon).toContain('aria-hidden="true"');
  expect(icon).toContain('focusable="false"');
});
