import { expect, test } from "@playwright/test";
import { appPaths, componentIds } from "./catalog-pages";

test("カタログの入口は全部品を分類ごとに重複なく案内する", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('section[id^="group-"] .ply-action-list a');
  await expect(links).toHaveCount(componentIds.length);
  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("href")),
  );
  expect(new Set(hrefs).size).toBe(componentIds.length);
  expect(hrefs).toEqual(componentIds.map((id) => `/components/${id}`));
});

test("カタログのコマンドから部品の名前で探して移れる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "部品を探す" }).click();
  await page.getByRole("combobox").fill("EmojiPicker");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/components\/emoji-picker$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("EmojiPicker");
});

test("設定を保存して再読込で復元し期間エラーでも入力を保つ", async ({ page }) => {
  await page.goto("/apps/settings");
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
  await page.goto("/apps/settings");
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
  await page.goto("/apps/settings");
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
  await page.goto("/apps/settings");
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

test("Switch・Popover・予定の月送りはJavaScript無効でも操作できる", async ({ browser }) => {
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
  await page.goto("/apps/schedule");
  await page.getByRole("link", { name: "前月", exact: true }).click();
  await expect(page).toHaveURL(/month=8/);
  // 月の名前は見出しと表のcaptionの両方にあるので、見出しで確かめる。
  await expect(page.getByRole("heading", { name: "2026年8月", exact: true })).toBeVisible();
  await context.close();
});

for (const width of [375, 768, 1280]) {
  test(`カタログの入口と利用例のアプリの画面が${width}pxで収まる`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/", ...appPaths]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 }), path).toHaveCount(1);
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), {
          message: path,
        })
        .toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(`${path.replace(/[^a-z0-9]+/gi, "-")}-${width}.png`),
        fullPage: true,
      });
    }
  });
}
