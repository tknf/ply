import { expect, test } from "vite-plus/test";
import { html } from "hono/html";
import { CodeBlock } from "../src/hono/code-block";
import { formatExample } from "../catalog/code-format";

test("整形は文中の空白とpre内の改行を保ち、着色した文字を欠落させない", async () => {
  const code =
    '<section><p>前<span>中</span>後 <a href="/">次</a></p><pre> a\n  b</pre><input aria-label="入力" value="a &amp; b"></section>';
  const result = await formatExample(code, "html");
  expect(result.code).toContain("前<span>中</span>後 ");
  // HTMLパーサーはpre開始タグ直後の最初の改行を読み飛ばす。
  expect(result.code.match(/<pre>([\s\S]*?)<\/pre>/)?.[1]?.replace(/^\n/, "")).toBe(" a\n  b");
  expect(result.code).toContain('value="a &amp; b"');
  expect(result.code.split("\n").length).toBeGreaterThan(3);
  expect(result.tokens.map((token) => token.content).join("")).toBe(result.code);
});

test("着色したHTMLも文字として表示し、異なるコードのトークンは採用しない", async () => {
  const code = '<script>alert("例")</script>';
  const colored =
    await html`${<CodeBlock label="HTML" code={code} tokens={[{ content: code, color: "#123456" }]} copy />}`;
  expect(String(colored)).toContain("&lt;script&gt;");
  expect(String(colored)).not.toContain("<script>");
  const mismatch =
    await html`${<CodeBlock label="HTML" code={code} tokens={[{ content: "別のコード", color: "red" }]} />}`;
  expect(String(mismatch)).not.toContain("別のコード");
  expect(String(mismatch)).toContain("&lt;script&gt;");
});
