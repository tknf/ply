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
      "/example",
      "/sales",
      "/files",
      "/review",
      "/search",
      "/search/empty",
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
            `${(path.slice(1) || "home").replaceAll("/", "-")}-${width}-${zoom}.png`,
          ),
          fullPage: true,
        });
      }
    }
  });
}

test("ダイアログをキーボードで開閉しトリガーへ戻る", async ({ page }) => {
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "確認を開く" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "閉じる", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => document.querySelector("dialog")?.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.locator("#sample-dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("操作メニュー・タブが上流controllerで操作できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/files");
  const trigger = page.getByRole("button", { name: "操作", exact: true });
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
  await page.goto("/sales");
  await page.getByRole("tab", { name: "8月" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "7月" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "7月" })).toContainText("¥105,700");
});

test("Turbo遷移とDOM再接続後もイベントが重複しない", async ({ page }) => {
  await page.goto("/");
  await page.locator("#components summary").click();
  await page.evaluate(() => (document.documentElement.dataset.visitMarker = "retained"));
  await page.locator('a[href="/components/dialog"]').first().click();
  await expect(page.getByRole("button", { name: "確認を開く" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-visit-marker", "retained");
  await page.evaluate(() => {
    const root = document.querySelector(".ply-dialog-root");
    if (!root || !root.parentElement) throw new Error("ダイアログなし");
    const parent = root.parentElement;
    root.addEventListener("dialog:open", () => {
      if (root instanceof HTMLElement)
        root.dataset.openCount = String(Number(root.dataset.openCount ?? 0) + 1);
    });
    root.remove();
    setTimeout(() => parent.append(root), 0);
  });
  const trigger = page.getByRole("button", { name: "確認を開く" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".ply-dialog-root").first()).toHaveAttribute("data-open-count", "1");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("ファイル選択・エラー関連・フォーカスが成立する", async ({ page }) => {
  await page.goto("/files");
  await page.getByLabel("差し替えるファイル").setInputFiles({
    name: "長い日本語の資料_2026.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("sample"),
  });
  await expect
    .poll(() =>
      page
        .getByLabel("差し替えるファイル")
        .evaluate((input) =>
          input instanceof HTMLInputElement ? input.files?.[0]?.name : undefined,
        ),
    )
    .toBe("長い日本語の資料_2026.pdf");
  await page.goto("/components/field");
  await expect(page.locator("#error-title")).toHaveAttribute(
    "aria-describedby",
    "error-title-help error-title-error",
  );
  await page.locator("#error-title").focus();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      document.activeElement ? getComputedStyle(document.activeElement).outlineStyle : "none",
    ),
  ).not.toBe("none");
});

test("CSSの順序交換とforced-colorsで部品が操作可能", async ({ page }) => {
  await page.goto("/example");
  const button = page.getByRole("button", { name: "下書きを保存" });
  const colors = () =>
    button.evaluate((element) => ({
      color: getComputedStyle(element).color,
      background: getComputedStyle(element).backgroundColor,
    }));
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
    await page.goto("http://127.0.0.1:5178/files");
    await page.getByText("ファイル選択について", { exact: true }).click();
    await expect(page.getByText("ファイルは送信されません。", { exact: false })).toBeVisible();
    await page.getByText("利用案内を差し替える", { exact: true }).click();
    await expect(page.getByLabel("差し替えるファイル")).toBeVisible();
    await page.goto("http://127.0.0.1:5178/sales");
    await expect(page.getByRole("table")).toBeVisible();
    await page.goto("http://127.0.0.1:5178/example");
    await page.getByLabel("記事名", { exact: true }).fill("JavaScriptなしの入力");
    await expect(page.getByRole("button", { name: "下書きを保存" })).toBeDisabled();
    await page.getByText("記事の設定", { exact: true }).click();
    await expect(page.getByLabel("カテゴリー", { exact: true })).toBeVisible();
    await expect(
      page.getByText("入力と設定の開閉は利用できます。", { exact: false }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("ファイルの選択・反映・取り消しが実際の入力と連動する", async ({ page }) => {
  await page.goto("/files");
  const input = page.getByLabel("差し替えるファイル");
  await input.setInputFiles({
    name: "確認用.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("sample"),
  });
  await expect(page.getByRole("status")).toContainText("確認用.pdf");
  await page.getByRole("button", { name: "この画面に反映" }).click();
  await expect(page.locator('[data-file-preview-target="current"] strong')).toHaveText(
    "確認用.pdf",
  );
  await expect(page.getByRole("status")).toHaveText("この画面に反映しました。");
  await expect(page.getByRole("button", { name: "この画面に反映" })).toBeDisabled();
  await input.setInputFiles({
    name: "別の画像.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from("photo"),
  });
  await page.getByRole("button", { name: "選択を取り消す" }).click();
  expect(
    await input.evaluate((element) =>
      element instanceof HTMLInputElement ? element.files?.length : -1,
    ),
  ).toBe(0);
  await expect(page.locator('[data-file-preview-target="current"] strong')).toHaveText(
    "確認用.pdf",
  );
  await page.reload();
  await expect(page.locator('[data-file-preview-target="current"] strong')).toHaveText(
    "利用案内と申し込み手順.pdf",
  );
});
