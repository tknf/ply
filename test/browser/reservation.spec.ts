import { expect, test } from "@playwright/test";

for (const width of [375, 540, 768, 1280]) {
  test(`CSSのみの予約例が${width}px・文字200%で収まる`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/reservation");
    await expect(page.locator('script[src*="client"]')).toHaveCount(0);
    if (width === 1280) {
      const date = await page.getByLabel("利用日（必須）", { exact: true }).boundingBox();
      const time = await page.getByLabel("開始時刻（必須）", { exact: true }).boundingBox();
      if (!date || !time) throw new Error("日時入力がありません");
      expect(Math.abs(date.y - time.y)).toBeLessThanOrEqual(1);
      expect(Math.abs(date.height - time.height)).toBeLessThanOrEqual(1);
    }
    for (const zoom of [1, 2]) {
      if (zoom === 2)
        await page.evaluate(() => {
          const sizes = Array.from(document.body.querySelectorAll<HTMLElement>("*")).map(
            (element) => ({ element, size: Number.parseFloat(getComputedStyle(element).fontSize) }),
          );
          for (const { element, size } of sizes) element.style.fontSize = `${size * 2}px`;
        });
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        .toBe(true);
      for (const label of ["利用日（必須）", "開始時刻（必須）", "人数（必須）"]) {
        const bounds = await page.getByLabel(label, { exact: true }).boundingBox();
        expect(bounds).not.toBeNull();
        if (bounds) {
          expect(bounds.x).toBeGreaterThanOrEqual(0);
          expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
        }
      }
      await page.screenshot({
        path: testInfo.outputPath(`reservation-${width}-${zoom}.png`),
        fullPage: true,
      });
    }
  });
}

test("CSSのみの予約例で標準検証・リセット・入れ子の開閉を利用できる", async ({ browser }) => {
  // JavaScript無効の画面では、動きの途中の要素が止まるまでの待機が進まない。CSSだけの操作を確かめるため動きを止める。
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 375, height: 1000 },
  });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:5178/reservation");
    const count = page.getByLabel("人数（必須）", { exact: true });
    await count.fill("9");
    await page.getByRole("button", { name: "入力内容をチェック" }).click();
    await expect(count).toBeFocused();
    await expect(page.locator("#reservation-count:invalid")).toHaveCount(1);
    await page.getByText("追加設備", { exact: true }).click();
    await expect(page.getByLabel("プロジェクター", { exact: true })).toBeDisabled();
    await expect(page.getByLabel("大会議室", { exact: false })).toBeDisabled();
    await page.getByText("利用前の確認事項", { exact: true }).click();
    await page.getByText("キャンセル条件の例", { exact: true }).click();
    await expect(page.locator("details[open] details[open]")).toBeVisible();
    await page.getByLabel("集中作業室", { exact: false }).check();
    await page.getByRole("button", { name: "初期値に戻す" }).click();
    await expect(count).toHaveValue("2");
    await expect(page.getByLabel("ミーティングルーム", { exact: false })).toBeChecked();
    await page.getByLabel("確認事項を読みました（必須）", { exact: true }).check();
    await page.getByRole("button", { name: "入力内容をチェック" }).click();
    await expect(page).toHaveURL(/\/reservation\?room=meeting$/);
    await expect(page.getByRole("heading", { name: "利用日時を選ぶ" })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("道具箱からCSSのみの予約例へ移ると文書を読み直す", async ({ page }) => {
  await page.goto("/examples/schedule");
  await page.evaluate(() => (document.documentElement.dataset.turboMarker = "previous-page"));
  await page.getByRole("link", { name: "利用日時を選ぶ", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "利用日時を選ぶ" })).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-turbo-marker", "previous-page");
  await expect(page.locator('script[src*="client"]')).toHaveCount(0);
});
