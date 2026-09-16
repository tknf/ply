import { expect, test } from "@playwright/test";

test("数値の操作と読み上げに接頭辞・単位を関連付ける", async ({ page }) => {
  await page.goto("/components/input-group");
  const example = page.locator('[data-example="hono"]');
  const price = example.getByRole("spinbutton", { name: "料金（円）", exact: true });
  await expect(price).toHaveAccessibleDescription("100円単位で設定できます。 ¥");
  await price.press("PageUp");
  await expect(price).toHaveValue("2200");
  await price.fill("0");
  await expect(price).toHaveAttribute("data-state", "min");
  const capacity = example.getByRole("spinbutton", { name: "定員（人）", exact: true });
  await expect(capacity).toHaveAccessibleDescription("人");
  await capacity.fill("20");
  await expect(capacity).toHaveAttribute("data-state", "max");
  await expect(
    example.getByRole("textbox", { name: "サイトのURL", exact: true }),
  ).toHaveAccessibleDescription("https:// .example.jp");
});

test("枠全体にフォーカスとエラーを反映して入力と操作を無効化する", async ({ page }) => {
  await page.goto("/components/input-group");
  await page.getByText("エラー・閲覧専用・利用不可・大きい入力", { exact: true }).click();
  const error = page.getByRole("spinbutton", { name: "料金（入力エラー）", exact: true });
  const frame = page.locator(".control").filter({ has: error });
  await error.focus();
  await error.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(error).toHaveCSS("outline-style", "none");
  await expect(frame).toHaveCSS("outline-style", "solid");
  await expect(frame).toHaveCSS("border-top-color", "rgb(168, 35, 27)");
  await expect(error).toHaveAccessibleDescription("料金を入力してください。 ¥");
  const readonly = page.getByRole("textbox", { name: "公開済みのURL", exact: true });
  await expect(readonly).not.toBeEditable();
  await readonly.focus();
  await readonly.press("Tab");
  await expect(
    page.getByRole("searchbox", { name: "記事を検索（大きい入力）", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("searchbox", { name: "停止中の検索", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "検索する", exact: true })).toBeDisabled();
});

test("入力に添えた操作で実際の検索結果へ進める", async ({ page }) => {
  await page.goto("/components/input-group");
  await page.getByRole("searchbox", { name: "記事を検索", exact: true }).fill("仕事場");
  await page.getByRole("button", { name: "検索", exact: true }).click();
  await expect(page).toHaveURL(/\/search\?q=/);
  await expect(page.getByRole("status")).toHaveText("1件の記事");
  await expect(
    page.getByRole("link", { name: "小さな仕事場のつくり方", exact: true }),
  ).toBeVisible();
});

for (const width of [375, 1280]) {
  test(`InputGroupが${width}pxと文字拡大で入力・単位・操作を収める`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/components/input-group");
    await page.getByText("エラー・閲覧専用・利用不可・大きい入力", { exact: true }).click();
    const example = page.locator('[data-example="hono"]');
    for (const [name, height] of [
      ["記事を検索", 32],
      ["記事を検索（大きい入力）", 40],
    ] as const) {
      const input = page.getByRole("searchbox", { name, exact: true });
      const group = example.locator(".ply-input-group").filter({ has: input });
      const control = await group.locator(".control").boundingBox();
      const button = await group.getByRole("button").boundingBox();
      if (!control || !button) throw new Error("入力とボタンが描画されていません");
      expect(control.height).toBeCloseTo(height, 1);
      expect(button.height).toBeCloseTo(height, 1);
      expect(control.y).toBeCloseTo(button.y, 1);
    }
    await example.screenshot({ path: testInfo.outputPath(`input-group-${width}.png`) });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    for (const input of await example.locator("input").all()) {
      const bounds = await input.boundingBox();
      if (!bounds) throw new Error("文字拡大後の入力が描画されていません");
      expect(bounds.width).toBeGreaterThan(40);
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      const textSpace = await input.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          width:
            element.getBoundingClientRect().width -
            Number.parseFloat(style.paddingInlineStart) -
            Number.parseFloat(style.paddingInlineEnd),
          fontSize: Number.parseFloat(style.fontSize),
        };
      });
      expect(textSpace.width).toBeGreaterThanOrEqual(textSpace.fontSize * 2);
    }
    await example.screenshot({ path: testInfo.outputPath(`input-group-${width}-200.png`) });
  });
}
