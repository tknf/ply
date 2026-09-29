import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context, browserName }) => {
  if (browserName === "chromium")
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
});

test("表示したコードを実際にコピーし、成功を知らせる", async ({ page, context, browserName }) => {
  if (browserName === "chromium")
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/components/code-block");
  const example = page.locator('[data-example="hono"] .ply-code-block').first();
  const source = await example.locator("code").textContent();
  await example.evaluate((element) =>
    element.addEventListener("clipboard:copy", (event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (
        detail &&
        typeof detail === "object" &&
        "text" in detail &&
        typeof detail.text === "string"
      )
        element.setAttribute("data-copied", detail.text);
    }),
  );
  await example.getByRole("button", { name: "CSSの読み込みをコピー" }).press("Enter");
  await expect(example.getByRole("status")).toHaveText("CSSの読み込みをコピーしました");
  await expect(example).toHaveAttribute("data-copied", source ?? "");
  if (browserName === "chromium")
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
});

for (const width of [375, 1280])
  test(`コピー通知が${width}pxと文字200%でコードや操作を動かさない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.clock.install();
    await page.goto("/components/code-block");
    const example = page.locator('[data-example="hono"] .ply-code-block').first();
    const button = example.getByRole("button", { name: "CSSの読み込みをコピー" });
    const toast = example.locator(":scope > .ply-toast");
    const bounds = () =>
      example.evaluate((element) =>
        [
          element,
          ...element.querySelectorAll(
            ".ply-layer-card > .heading,pre,[data-code-block-target=copy]",
          ),
        ].map((node) => {
          const rect = node.getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        }),
      );
    for (const zoom of ["100%", "200%"]) {
      await page.evaluate((value) => {
        document.documentElement.style.fontSize = value;
      }, zoom);
      await button.scrollIntoViewIfNeeded();
      const before = await bounds();
      await button.press("Enter");
      await expect(toast).toBeVisible();
      await expect(button).toBeFocused();
      expect(await bounds()).toEqual(before);
      expect(
        await toast.evaluate((element) => {
          const box = element.getBoundingClientRect();
          return box.x >= 0 && box.right <= innerWidth && box.bottom <= innerHeight;
        }),
      ).toBe(true);
      await button.press("Enter");
      await expect(toast.getByRole("status")).toHaveText("CSSの読み込みをコピーしました");
      expect(await bounds()).toEqual(before);
      await toast.hover();
      await page.clock.fastForward(5000);
      await expect(toast).toBeVisible();
      await page.mouse.move(0, 0);
      await page.clock.fastForward(4001);
      await expect(toast).not.toBeVisible();
      expect(await bounds()).toEqual(before);
    }
    await page.evaluate(() =>
      Object.defineProperty(navigator.clipboard, "writeText", {
        value: () => Promise.reject(new DOMException("拒否", "NotAllowedError")),
      }),
    );
    const before = await bounds();
    await button.press("Enter");
    await expect(toast.getByRole("status")).toContainText("コピーできませんでした");
    expect(await bounds()).toEqual(before);
    await page.clock.fastForward(8000);
    await expect(toast).toBeVisible();
    await toast.getByRole("button", { name: "コピー結果の通知を閉じる" }).press("Enter");
    await expect(toast).not.toBeVisible();
    await expect(button).toBeFocused();
    expect(await bounds()).toEqual(before);
  });

test("別のコードを続けてコピーしても通知が重ならずEscで閉じられる", async ({ page }) => {
  await page.goto("/components/code-block");
  const examples = page.locator('[data-example="hono"] .ply-code-block');
  await examples.first().getByRole("button", { name: "CSSの読み込みをコピー" }).press("Enter");
  await expect(examples.first().locator(".ply-toast")).toBeVisible();
  const second = examples.nth(1).getByRole("button", { name: "公開設定の例をコピー" });
  await second.press("Enter");
  await expect(page.locator(".ply-code-block > .ply-toast:popover-open")).toHaveCount(1);
  await expect(examples.nth(1).getByRole("status")).toHaveText("公開設定の例をコピーしました");
  await second.press("Escape");
  await expect(page.locator(".ply-code-block > .ply-toast:popover-open")).toHaveCount(0);
  await expect(second).toBeFocused();
});

test("コピーが拒否されたら失敗を伝え、文字の選択とスクロールを残す", async ({ page }) => {
  await page.goto("/components/code-block");
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new DOMException("拒否", "NotAllowedError")),
    }),
  );
  const example = page.locator('[data-example="hono"] .ply-code-block').nth(1);
  await example.getByRole("button", { name: "公開設定の例をコピー" }).click();
  await expect(example.getByRole("status")).toHaveText(
    "コピーできませんでした。コードを選択してコピーしてください。",
  );
  await page.setViewportSize({ width: 375, height: 900 });
  const pre = example.getByRole("region");
  await pre.focus();
  await expect(pre).toBeFocused();
  await page.keyboard.press("ArrowRight", { delay: 100 });
  await expect.poll(() => pre.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("JavaScriptがなくてもコードを読め、動かないコピー操作を出さない", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5178/components/code-block");
  const examples = page.locator('[data-example="hono"]');
  await expect(examples.locator("code").first()).toContainText("<link");
  await expect(examples.getByRole("button")).toHaveCount(0);
  const html = page
    .getByRole("group", { name: "見本のコード", exact: true })
    .locator("details")
    .first();
  await html.locator("summary").press("Enter");
  await expect(html.locator("pre > code")).toContainText("ply-code-block");
  await context.close();
});
