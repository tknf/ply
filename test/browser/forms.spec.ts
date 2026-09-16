import { expect, test } from "@playwright/test";

for (const width of [375, 768, 1280]) {
  test(`${width}pxで予約の見出し・入力・選択肢が整列する`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/reservation");
    const heading = await page.getByRole("heading", { name: "利用日時を選ぶ" }).boundingBox();
    const fields = await page.locator(".fields").boundingBox();
    const date = await page.getByLabel("利用日（必須）", { exact: true }).boundingBox();
    const count = await page.getByLabel("人数（必須）", { exact: true }).boundingBox();
    if (!heading || !fields || !date || !count) throw new Error("フォームが描画されていません");
    expect(date.x).toBeGreaterThanOrEqual(heading.x);
    expect(Math.abs(fields.x - date.x)).toBeLessThanOrEqual(1);
    expect(count.width).toBeLessThanOrEqual(128);
    for (const option of await page.locator(".ply-choice").all()) {
      const box = await option.locator("input").boundingBox();
      const text = await option.locator("span").boundingBox();
      if (!box || !text) throw new Error("選択肢がありません");
      expect(box.x + box.width).toBeLessThan(text.x);
      expect(Math.abs(box.y - text.y)).toBeLessThan(8);
    }
    await page.screenshot({
      path: testInfo.outputPath(`reservation-form-${width}.png`),
      fullPage: true,
    });
  });
}

test("独自のチェックとラジオをラベル・キーボードで操作できる", async ({ page }) => {
  await page.goto("/components/field");
  const check = page.getByLabel("条件を確認しました", { exact: true });
  await expect(check).toHaveCSS("appearance", "none");
  await page.getByText("条件を確認しました", { exact: true }).click();
  await expect(check).toBeChecked();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Space");
  await expect(check).not.toBeChecked();
  await expect(check).toBeFocused();
  await expect(check).toHaveCSS("outline-style", "solid");
  await expect(page.getByLabel("選択済みの停止項目", { exact: true })).toBeChecked();
  await expect(page.getByLabel("選択済みの停止項目", { exact: true })).toBeDisabled();
  const radio = page.getByRole("radio", { name: /^標準/ });
  await radio.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: /^静かな部屋/ })).toBeChecked();
  await expect(radio).not.toBeChecked();
  await page.emulateMedia({ forcedColors: "active" });
  await expect(check).toHaveCSS("appearance", "auto");
  await check.check();
  await expect(check).toBeChecked();
});

test("長い選択肢は文字200%でも印と重ならず無効なfieldsetを操作できない", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/reservation");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await expect(page.getByLabel("プロジェクター", { exact: true })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const option = page.locator('.ply-choice[data-kind="option"]').first();
  const box = await option.locator("input").boundingBox();
  const text = await option.locator("span").boundingBox();
  if (!box || !text) throw new Error("選択肢がありません");
  expect(box.x + box.width).toBeLessThan(text.x);
  await page.screenshot({ path: testInfo.outputPath("form-375-text-200.png"), fullPage: true });
});

test("検索の上部バーを作業面の縁に揃え、狭幅の見出しを一文字だけ折り返さない", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/search");
  const sheet = await page.locator("main > .ply-surface").boundingBox();
  const bar = await page.locator(".ply-context-bar").boundingBox();
  if (!sheet || !bar) throw new Error("作業面がありません");
  expect(Math.abs(bar.x - sheet.x - 1)).toBeLessThanOrEqual(1);
  expect(Math.abs(bar.width - sheet.width + 2)).toBeLessThanOrEqual(1);
  await page.goto("/files");
  const lines = await page
    .locator("h1")
    .evaluate(
      (element) =>
        element.getBoundingClientRect().height /
        Number.parseFloat(getComputedStyle(element).lineHeight),
    );
  expect(lines).toBeLessThan(1.2);
});

for (const width of [375, 768, 1280]) {
  test(`${width}pxでContextBarはリンク・ボタンの有無で高さが変わらない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const heights: number[] = [];
    for (const path of ["/example", "/search", "/sales", "/files"]) {
      await page.goto(path);
      const bar = page.locator(".ply-context-bar");
      const bounds = await bar.boundingBox();
      if (!bounds) throw new Error("ContextBarがありません");
      heights.push(bounds.height);
      if (path === "/files") {
        await page.getByRole("button", { name: "操作", exact: true }).click();
        await expect(page.getByRole("menu")).toBeVisible();
        expect((await bar.boundingBox())?.height).toBe(bounds.height);
      }
    }
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
  });
}
