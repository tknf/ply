import { expect, test } from "@playwright/test";

const components = [
  "avatar",
  "breadcrumb",
  "navigation",
  "steps",
  "toolbar",
  "input-group",
  "switch",
  "range",
  "suggestion",
  "date-picker",
  "tag",
  "statistic",
  "card",
  "timeline",
  "task-list",
  "calendar",
  "board",
  "error-summary",
  "loading",
  "toast",
  "popover",
  "code-block",
  "keycap",
  "divider",
  "icon",
  "surface",
  "context-bar",
  "page-header",
  "button",
  "field",
  "field-group",
  "badge",
  "notice",
  "table",
  "comparison",
  "value-list",
  "file-input",
  "file-item",
  "image-frame",
  "disclosure",
  "progress",
  "pagination",
  "filter-bar",
  "data-list",
  "action-list",
  "empty-state",
  "dialog",
  "dropdown-menu",
  "tabs",
  "danger-zone",
];

for (const width of [375, 540, 768, 1280]) {
  test(`カタログ全変種が${width}pxと文字200%で利用できる`, async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 1000 });
    for (const id of components) {
      await page.goto(`/components/${id}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(
        page.getByRole("region", { name: "Honoの利用例" }).locator(".catalog-code > code").first(),
      ).toContainText('from "ply/hono"');
      const references = await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll("[id]")).map((element) => element.id);
        const broken = Array.from(
          document.querySelectorAll(
            "[aria-labelledby], [aria-describedby], [aria-controls], label[for]",
          ),
        ).flatMap((element) =>
          ["aria-labelledby", "aria-describedby", "aria-controls", "for"].flatMap((attribute) =>
            (element.getAttribute(attribute)?.split(/\s+/) ?? []).filter(
              (id) => id && !document.getElementById(id),
            ),
          ),
        );
        return { duplicates: ids.filter((id, index) => ids.indexOf(id) !== index), broken };
      });
      expect(references, id).toEqual({ duplicates: [], broken: [] });
      for (const zoom of [1, 2]) {
        if (zoom === 2)
          await page.evaluate(() => {
            const sizes = Array.from(document.body.querySelectorAll<HTMLElement>("*")).map(
              (element) => ({
                element,
                size: Number.parseFloat(getComputedStyle(element).fontSize),
              }),
            );
            for (const { element, size } of sizes) element.style.fontSize = `${size * 2}px`;
          });
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), {
            message: `${id}・${zoom}倍`,
          })
          .toBe(true);
        if (width === 375 || width === 1280)
          await page.screenshot({
            path: testInfo.outputPath(`${id}-${width}-${zoom}.png`),
            fullPage: true,
          });
      }
    }
  });
}

test("タブの無効項目を飛ばしメニュー選択と内側部品の状態を保つ", async ({ page }) => {
  await page.goto("/components/tabs");
  const tabs = page.locator('[data-example="hono"]');
  await tabs.getByRole("tab", { name: "内容", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "設定", exact: true })).toBeFocused();
  await expect(tabs.getByRole("tabpanel", { name: "設定", exact: true })).toBeVisible();
  await page.goto("/components/dropdown-menu");
  await page.locator('[data-example="hono"]').evaluate((element) => {
    element.addEventListener("dropdown-menu:select", (event) => {
      if (
        event instanceof CustomEvent &&
        typeof event.detail === "object" &&
        event.detail !== null &&
        "value" in event.detail &&
        typeof event.detail.value === "string"
      ) {
        element.setAttribute("data-selected", event.detail.value);
      }
    });
  });
  await page.getByRole("button", { name: "項目の操作", exact: true }).click();
  await page.keyboard.press("End");
  await expect(page.getByRole("menuitem", { name: "複製する", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-example="hono"]')).toHaveAttribute("data-selected", "copy");
  await expect(page.getByRole("button", { name: "項目の操作", exact: true })).toBeFocused();
  await page.goto("/components/notice");
  const inner = page.getByRole("complementary", { name: "内側の完了", exact: true });
  const standalone = page.getByRole("complementary", { name: "successの通知", exact: true });
  expect(await inner.evaluate((element) => getComputedStyle(element).borderInlineStartColor)).toBe(
    await standalone.evaluate((element) => getComputedStyle(element).borderInlineStartColor),
  );
});

test("検索の0件・ファイル群・進捗の境界値に到達できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/search");
  await page.getByLabel("キーワード", { exact: true }).fill("存在しない記事");
  await expect(page.getByText("見つかりませんでした", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "条件をクリアする" }).click();
  await expect(page.getByRole("status")).toHaveText("6件の記事");
  await page.goto("/components/file-input");
  await page.getByLabel("添付資料", { exact: true }).setInputFiles({
    name: "資料.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("sample"),
  });
  await page.goto("/components/field-group");
  const disabledGroup = page.getByRole("group", { name: "配送先（受付停止中）", exact: true });
  await expect(disabledGroup.getByRole("textbox", { name: "宛名", exact: true })).toBeDisabled();
  await expect(disabledGroup.getByRole("textbox", { name: "住所", exact: true })).toBeDisabled();
  await page.goto("/components/progress");
  await expect(page.getByRole("progressbar", { name: "処理待ち：0%" })).toHaveJSProperty(
    "position",
    0,
  );
  await expect(page.getByRole("progressbar", { name: "完了：100%" })).toHaveJSProperty(
    "position",
    1,
  );
  await expect(page.getByRole("progressbar", { name: "残り時間を確認中" })).toHaveJSProperty(
    "position",
    -1,
  );
});

test("ファイルのドロップが状態・選択・イベントを同期する", async ({ page }) => {
  await page.goto("/components/file-input");
  const root = page.locator(".ply-file-input:has(> #hono-file)");
  await expect(root).toHaveAttribute("data-state", "idle");
  const transfer = await page.evaluateHandle(() => {
    const data = new DataTransfer();
    data.items.add(new File(["sample"], "資料.pdf", { type: "application/pdf" }));
    return data;
  });
  await root.evaluate((element) => {
    element.addEventListener("file-drop:drop", () => element.setAttribute("data-received", "true"));
  });
  await root.dispatchEvent("dragenter", { dataTransfer: transfer });
  await expect(root).toHaveAttribute("data-state", "dragover");
  await root.dispatchEvent("drop", { dataTransfer: transfer });
  await expect(root).toHaveAttribute("data-state", "idle");
  await expect(root).toHaveAttribute("data-received", "true");
  await expect
    .poll(() =>
      root
        .locator("input")
        .evaluate((element) =>
          element instanceof HTMLInputElement ? element.files?.[0]?.name : undefined,
        ),
    )
    .toBe("資料.pdf");
  await transfer.dispose();
});

test("動作部品のフォーカスがforced-colorsでも見える", async ({ page }, testInfo) => {
  await testInfo.attach("browser-version", {
    body: page.context().browser()?.version() ?? "不明",
    contentType: "text/plain",
  });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  for (const { path, selector } of [
    { path: "button", selector: ".ply-button" },
    { path: "field", selector: ".ply-input" },
    { path: "tabs", selector: '[role="tab"]' },
    { path: "dropdown-menu", selector: ".ply-button" },
    { path: "disclosure", selector: "summary" },
  ]) {
    await page.goto(`/components/${path}`);
    const control = page.locator('[data-example="hono"]').locator(selector).first();
    await control.focus();
    await expect(control).toBeFocused();
    const style = await control.evaluate((element) => {
      const computed = getComputedStyle(element);
      return { outline: computed.outlineStyle, width: Number.parseFloat(computed.outlineWidth) };
    });
    expect(style.outline).not.toBe("none");
    expect(style.width).toBeGreaterThanOrEqual(2);
  }
});

test("primaryのhoverで背景が変わり各操作のfocusで輪郭が見える", async ({ page }) => {
  await page.goto("/components/button");
  const buttons = page.locator('[data-example="hono"] .ply-button:not(:disabled)');
  for (const button of await buttons.all()) {
    const colors = () =>
      button.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          color: style.color,
          background: style.backgroundColor,
          border: style.borderInlineStartColor,
        };
      });
    await page.mouse.move(0, 0);
    const before = await colors();
    await button.hover();
    const hovered = await colors();
    if ((await button.getAttribute("data-variant")) === "primary") {
      expect(hovered.background).not.toBe(before.background);
      expect(hovered.color).toBe(before.color);
      await page.mouse.down();
      expect((await colors()).background).not.toBe(hovered.background);
      await page.mouse.move(0, 0);
      await page.mouse.up();
      await button.hover();
    } else expect(hovered).toEqual(before);
    await button.focus();
    expect(await colors()).toEqual(hovered);
    await page.keyboard.press("Tab");
    await button.focus();
    await expect(button).toBeFocused();
    expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe(
      "solid",
    );
  }
});

test("部品CSSの読み込み順と作業面の有無で固有の表示を壊さない", async ({ page }) => {
  for (const id of ["notice", "field", "comparison"]) {
    await page.goto(`/components/${id}`);
    const root = page.locator('[data-example="hono"]');
    const styles = () =>
      root.evaluate((element) =>
        Array.from(element.querySelectorAll<HTMLElement>("[class]")).map((child) => {
          const style = getComputedStyle(child);
          return {
            color: style.color,
            border: style.borderInlineStartColor,
            background: style.backgroundColor,
            font: style.fontSize,
          };
        }),
      );
    const before = await styles();
    await page.evaluate(() => {
      const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[href*="/components/"]'),
      );
      links.reverse().forEach((link) => document.head.append(link));
      document
        .querySelectorAll(".ply-surface")
        .forEach((element) => element.classList.remove("ply-surface"));
    });
    await expect.poll(styles).toEqual(before);
  }
});
