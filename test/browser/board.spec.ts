import { expect, test } from "@playwright/test";

const openCollapsedExample = async (page: import("@playwright/test").Page) => {
  await page
    .getByText("たたんだ列：件数と縦書きの名前のピル、押すと開いてたためる", { exact: true })
    .click();
  return page.getByRole("region", { name: "採用の進行" });
};

test("Boardの開閉ボタンは、controllerが接続すると出て列を開閉する", async ({ page }) => {
  await page.goto("/components/board");
  const board = await openCollapsedExample(page);
  const toggle = board.getByRole("button", { name: "「面接」の列を開閉", exact: true });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("JavaScriptがない時は、押しても働かない開閉ボタンを出さない", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5178/components/board");
    const board = await openCollapsedExample(page);
    await expect(board.locator("button[data-board-toggle]")).toHaveCount(4);
    for (const toggle of await board.locator("button[data-board-toggle]").all())
      await expect(toggle).toBeHidden();
    await expect(board.getByRole("list", { name: "面接" })).toBeVisible();
  } finally {
    await context.close();
  }
});
