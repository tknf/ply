import { expect, test } from "@playwright/test";

test("部品一覧は56種類を重複なく案内する", async ({ page }) => {
  await page.goto("/components");
  const links = page.locator(".catalog-component-index a");
  await expect(links).toHaveCount(56);
  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("href")),
  );
  expect(new Set(hrefs).size).toBe(56);
});

test("案件で追加した仕事を移動しても名前と件数を保つ", async ({ page }) => {
  await page.goto("/examples/project");
  await page.getByRole("textbox", { name: "仕事を追加" }).fill("公開前の読み合わせ");
  await page.getByRole("button", { name: "追加する", exact: true }).click();
  const board = page.getByRole("region", { name: "案内制作の進行" });
  await expect(board.locator("section").nth(0).locator("h3 > small")).toHaveText("2");
  await page.getByRole("combobox", { name: "公開前の読み合わせの状態" }).selectOption("2");
  await expect(board.locator("section").nth(2)).toContainText("公開前の読み合わせ");
  await expect(board.locator("section").nth(0).locator("h3 > small")).toHaveText("1");
  await expect(board.locator("section").nth(2).locator("h3 > small")).toHaveText("1");
  await expect(page.getByRole("combobox", { name: "公開前の読み合わせの状態" })).toBeFocused();
});

test("設定を保存して再読込で復元し期間エラーでも入力を保つ", async ({ page }) => {
  await page.goto("/examples/settings");
  await page.getByRole("textbox", { name: "仕事場の名前" }).fill("編集の仕事場");
  const category = page.getByRole("combobox", { name: "分類（自由入力可）", exact: true });
  await page.getByRole("button", { name: "分類（自由入力可）の候補を開閉", exact: true }).click();
  await page.getByRole("option", { name: "編集", exact: true }).click();
  await expect(category).toHaveValue("編集");
  await page
    .getByRole("textbox", { name: "作業期間", exact: true })
    .fill("2026/09/05 – 2026/09/20");
  await page.getByRole("switch", { name: "完了した仕事も表示" }).check();
  await page.getByRole("slider", { name: "一覧の表示件数" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".ply-range output")).toHaveText("30件ずつ表示");
  await page.getByRole("button", { name: "設定を保存", exact: true }).click();
  await expect(page.locator(".ply-toast")).toBeVisible();
  await page.getByRole("button", { name: "閉じる", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("textbox", { name: "仕事場の名前" })).toHaveValue("編集の仕事場");
  await expect(category).toHaveValue("編集");
  await expect(page.getByRole("textbox", { name: "作業期間", exact: true })).toHaveValue(
    "2026/09/05 – 2026/09/20",
  );
  await expect(page.getByRole("switch", { name: "完了した仕事も表示" })).toBeChecked();
  await expect(page.locator(".ply-range output")).toHaveText("30件ずつ表示");
  await page
    .getByRole("textbox", { name: "作業期間", exact: true })
    .fill("2026/09/01 – 2026/08/01");
  await page.getByRole("button", { name: "設定を保存", exact: true }).click();
  await expect(page.locator('[data-settings-demo-target="status"]')).toContainText(
    "終了日は開始日以降",
  );
  await expect(page.getByRole("textbox", { name: "作業期間", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "初期値に戻す", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "仕事場の名前" })).toHaveValue("小さな仕事場");
  await expect(category).toHaveValue("制作");
  await expect(page.locator(".ply-range output")).toHaveText("20件ずつ表示");
});

test("設定の再保存に失敗しても入力と前回保存を保ち成功通知を残さない", async ({ page }) => {
  await page.goto("/examples/settings");
  const name = page.getByRole("textbox", { name: "仕事場の名前" });
  const save = page.getByRole("button", { name: "設定を保存", exact: true });
  await name.fill("保存済みの仕事場");
  await save.click();
  await expect(page.locator(".ply-toast")).toBeVisible();
  await name.fill("保存できない変更");
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("保存領域なし", "QuotaExceededError");
    };
  });
  await save.click();
  await expect(page.locator('[data-settings-demo-target="status"]')).toContainText(
    "保存できませんでした",
  );
  await expect(page.locator(".ply-toast")).not.toBeVisible();
  await expect(name).toHaveValue("保存できない変更");
  await page.reload();
  await expect(name).toHaveValue("保存済みの仕事場");
});

test("設定の期間エラーでは前の成功通知を閉じる", async ({ page }) => {
  await page.goto("/examples/settings");
  const save = page.getByRole("button", { name: "設定を保存", exact: true });
  await save.click();
  await expect(page.locator(".ply-toast")).toBeVisible();
  await page
    .getByRole("textbox", { name: "作業期間", exact: true })
    .fill("2026/09/01 – 2026/08/01");
  await save.click();
  await expect(page.locator(".ply-toast")).not.toBeVisible();
  await expect(page.getByRole("textbox", { name: "作業期間", exact: true })).toBeFocused();
  await expect(page.locator('[data-settings-demo-target="status"]')).toContainText(
    "終了日は開始日以降",
  );
});

test("Popoverの表示APIがなくても設定の保存と初期値への復帰ができる", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLElement.prototype, "showPopover", { value: undefined });
    Object.defineProperty(HTMLElement.prototype, "hidePopover", { value: undefined });
  });
  await page.goto("/examples/settings");
  const name = page.getByRole("textbox", { name: "仕事場の名前" });
  const status = page.locator('[data-settings-demo-target="status"]');
  await name.fill("通知なしで保存する仕事場");
  await page.getByRole("button", { name: "設定を保存", exact: true }).click();
  await expect(status).toHaveText("設定をこのブラウザに保存しました。");
  await page.reload();
  await expect(name).toHaveValue("通知なしで保存する仕事場");
  await page.getByRole("button", { name: "初期値に戻す", exact: true }).click();
  await expect(name).toHaveValue("小さな仕事場");
  await expect(status).toContainText("初期値に戻しました");
});

test("追加した標準部品はJavaScript無効でも操作できる", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/components/switch");
  const example = page.locator('[data-example="hono"]');
  await example.getByRole("switch", { name: "週次のまとめ" }).uncheck();
  await expect(example.getByRole("switch", { name: "週次のまとめ" })).not.toBeChecked();
  await page.goto("/components/popover");
  await example.getByRole("button", { name: "共有範囲", exact: true }).click();
  await expect(example.locator("#hono-popover")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(example.locator("#hono-popover")).not.toBeVisible();
  await page.goto("/examples/schedule");
  await page.getByRole("link", { name: "8月", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("8月の予定");
  await context.close();
});

for (const width of [375, 768, 1280]) {
  test(`部品一覧と組み合わせ事例が${width}pxで収まる`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "components",
      "examples/project",
      "examples/settings",
      "examples/schedule",
    ]) {
      await page.goto(`/${route}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        .toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(`${route.replaceAll("/", "-")}-${width}.png`),
        fullPage: true,
      });
    }
  });
}
