import { Hono } from "hono";
import { html } from "hono/html";
import type { Child } from "hono/jsx";
import { expect, test } from "vite-plus/test";
import { TextEditor } from "../src/hono";

const render = async (content: Child) => {
  const app = new Hono().get("/", (c) => c.html(html`${content}`));
  return (await app.request("/")).text();
};

const toolTags = (result: string) => result.match(/<button[^>]*data-text-editor-tool[^>]*>/g) ?? [];

test("道具の並びにtoolbarのcontrollerを付け、全ての道具を矢印キーで移る対象にする", async () => {
  const result = await render(<TextEditor id="note" label="メモ" tools={["bold", "|", "link"]} />);
  expect(result).toMatch(/<div class="toolbar"[^>]*role="toolbar"[^>]*data-controller="toolbar"/);
  const tools = toolTags(result);
  expect(tools).toHaveLength(2);
  for (const tool of tools) expect(tool).toContain('data-toolbar-target="control"');
});

test("controllerが付くまでは道具をTabで止めない", async () => {
  const result = await render(<TextEditor id="note" label="メモ" />);
  const tools = toolTags(result);
  expect(tools.length).toBeGreaterThan(0);
  for (const tool of tools) expect(tool).toContain('tabindex="-1"');
});

test("道具も操作も無い時は道具の並びを描かない", async () => {
  const result = await render(<TextEditor id="note" label="メモ" tools={[]} />);
  expect(result).not.toContain('role="toolbar"');
  expect(result).toContain("<textarea");
});
