import { expect, test } from "@playwright/test";

test("Tableの選択の棚は表の後にあり、行を選んだ後にTabで一括操作へ進める", async ({ page }) => {
  await page.goto("/components/table");
  const table = page.getByRole("region", { name: "記事の公開状況", exact: true });
  const bar = table.locator(".selection-bar");
  expect(
    await table.evaluate((element) => {
      const grid = element.querySelector(":scope > table"),
        shelf = element.querySelector(":scope > .selection-bar");
      return Boolean(
        grid && shelf && grid.compareDocumentPosition(shelf) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    }),
  ).toBe(true);
  await expect(bar).toHaveAttribute("popover", "manual");
  await table.locator('input[data-table-select-target="item"]').last().check();
  await expect(bar).toBeVisible();
  // 表の最後の行のリンクから、Shift+Tabで戻らずにTabで棚へ進む。
  await table.locator("tbody > tr").last().getByRole("link").focus();
  await page.keyboard.press("Tab");
  expect(await bar.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Tab");
  await expect(bar.getByRole("button", { name: "選択したIDを確認", exact: true })).toBeFocused();
});

test("JavaScriptがなくてもTableの一括操作を表の下に置き、選んだ行を送れる", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5178/components/table");
  const table = page.getByRole("region", { name: "記事の公開状況", exact: true });
  const bar = table.getByRole("group", { name: "選択した行の操作", exact: true });
  await expect(bar).toBeVisible();
  // 動かない件数と解除の×は出さない。
  await expect(bar.getByRole("button", { name: "選択を解除", exact: true })).toBeHidden();
  const submit = bar.getByRole("button", { name: "選択したIDを確認", exact: true });
  await expect(submit).toBeVisible();
  const grid = await table.locator(":scope > table").boundingBox(),
    shelf = await bar.boundingBox();
  if (!grid || !shelf) throw new Error("表か棚がありません");
  expect(shelf.y).toBeGreaterThanOrEqual(grid.y + grid.height - 1);
  await table.locator('input[data-table-select-target="item"]').first().check();
  await submit.click();
  await expect(page).toHaveURL(/[?&]ids=/);
  await context.close();
});
