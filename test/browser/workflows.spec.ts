import { expect, test, type Page } from "@playwright/test";

const textZoom = async (page: Page) =>
  page.evaluate(() => {
    const sizes = Array.from(document.body.querySelectorAll<HTMLElement>("*")).map((element) => ({
      element,
      size: Number.parseFloat(getComputedStyle(element).fontSize),
    }));
    for (const { element, size } of sizes) element.style.fontSize = `${size * 2}px`;
  });

for (const width of [375, 540, 768, 1280]) {
  test(`${width}pxで代表画面と文字200%が横にはみ出さない`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/apps/docs?article=export",
      "/apps/sales",
      "/apps/files",
      "/apps/search?q=招待",
      "/apps/search?q=見つからない言葉",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      for (const zoom of [1, 2]) {
        if (zoom === 2) await textZoom(page);
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
          .toBe(true);
        await page.screenshot({
          path: testInfo.outputPath(
            `${path.replace(/[^a-z0-9]+/gi, "-") || "home"}-${width}-${zoom}.png`,
          ),
          fullPage: true,
        });
      }
    }
  });
}

test("ダイアログをキーボードで開閉しトリガーへ戻る", async ({ page }) => {
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "確認画面を開く", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "内容を確認する", exact: true });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("heading", { name: "内容を確認する", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "閉じる", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("操作メニュー・タブが上流controllerで操作できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/apps/files");
  const trigger = page.getByRole("button", {
    name: "ヘルプセンターの構成案.pdfの操作",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menu")).toBeVisible();
  const bounds = await page.getByRole("menu").boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(375);
  }
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.goto("/apps/sales");
  await page.getByRole("tab", { name: "8月" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "7月" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "7月" })).toContainText("¥1,057,000");
});

test("Turbo遷移とDOM再接続後もイベントが重複しない", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => (document.documentElement.dataset.visitMarker = "retained"));
  await page.locator('a[href="/components/dialog"]').first().click();
  await expect(page.getByRole("button", { name: "確認画面を開く", exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-visit-marker", "retained");
  await page.evaluate(() => {
    const root = document.querySelector<HTMLElement>(".ply-dialog");
    if (!root || !root.parentElement) throw new Error("ダイアログなし");
    const parent = root.parentElement;
    document.addEventListener("dialog:open", (event) => {
      if (event.target === root)
        root.dataset.openCount = String(Number(root.dataset.openCount ?? 0) + 1);
    });
    root.remove();
    parent.append(root);
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const trigger = page.getByRole("button", { name: "確認画面を開く", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".ply-dialog:has(#hono-dialog)")).toHaveAttribute(
    "data-open-count",
    "1",
  );
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("ファイル選択・エラー関連・フォーカスが成立する", async ({ page }) => {
  await page.goto("/apps/files");
  await page.getByRole("button", { name: "＋ アップロード" }).click();
  await page.getByLabel("資料", { exact: true }).setInputFiles({
    name: "長い日本語の資料_2026.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("sample"),
  });
  await expect
    .poll(() =>
      page
        .getByLabel("資料", { exact: true })
        .evaluate((input) =>
          input instanceof HTMLInputElement ? input.files?.[0]?.name : undefined,
        ),
    )
    .toBe("長い日本語の資料_2026.pdf");
  await page.goto("/components/field");
  await expect(page.locator("#hono-error")).toHaveAttribute(
    "aria-describedby",
    "hono-error-help hono-error-error",
  );
  await page.locator("#hono-error").focus();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      document.activeElement ? getComputedStyle(document.activeElement).outlineStyle : "none",
    ),
  ).not.toBe("none");
});

test("CSSの順序交換とforced-colorsでコンポーネントが操作可能", async ({ page }) => {
  await page.goto("/apps/docs?article=export");
  const button = page.getByRole("button", { name: "公開する", exact: true });
  const colors = () =>
    button.evaluate((element) => ({
      color: getComputedStyle(element).color,
      background: getComputedStyle(element).backgroundColor,
    }));
  await expect(button).toBeEnabled();
  await page.evaluate(async () => {
    // 読込直後のtransition途中ではなく、確定したスタイルを比較する。
    await Promise.allSettled(
      document
        .getAnimations()
        .filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime))
        .map((animation) => animation.finished),
    );
  });
  const before = await colors();
  await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[href*="/components/"]'),
    );
    links.reverse().forEach((link) => document.head.append(link));
  });
  await expect.poll(colors).toEqual(before);
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await button.focus();
  await expect(button).toBeFocused();
});

test("JavaScriptなしでもフォーム・表・開閉を利用できる", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5178/apps/files");
    await page.getByRole("link", { name: /^PDF/ }).click();
    await expect(page.getByRole("table")).toContainText("公開前チェックリスト.pdf");
    await expect(page.getByRole("table")).not.toContainText("よくある質問の集計.csv");
    await page.goto("http://127.0.0.1:5178/apps/sales");
    await expect(page.getByRole("table").first()).toBeVisible();
    await page.goto("http://127.0.0.1:5178/apps/search");
    await page.getByRole("searchbox", { name: "記事と資料を探す" }).fill("招待");
    await page.getByRole("button", { name: "検索", exact: true }).click();
    await expect(page.getByRole("link", { name: "メンバーを招待する" })).toBeVisible();
    await page.goto("http://127.0.0.1:5178/apps/docs?article=export");
    await page.getByRole("textbox", { name: "題名", exact: true }).fill("JavaScriptなしの入力");
    await expect(page.getByRole("textbox", { name: "題名", exact: true })).toHaveValue(
      "JavaScriptなしの入力",
    );
  } finally {
    await context.close();
  }
});

test("資料のアップロードで選んだファイルを名前と大きさで確かめられる", async ({ page }) => {
  await page.goto("/apps/files");
  await page.getByRole("button", { name: "＋ アップロード" }).click();
  const dialog = page.getByRole("dialog", { name: "資料をアップロード" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("資料", { exact: true }).setInputFiles({
    name: "確認用.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.alloc(2048),
  });
  await expect(dialog.getByRole("listitem")).toHaveText("確認用.pdf2 KB");
  await dialog.getByRole("button", { name: "選択を解除", exact: true }).click();
  await expect(dialog.getByRole("list")).toBeHidden();
});
