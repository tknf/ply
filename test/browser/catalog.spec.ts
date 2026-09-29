import { expect, test } from "@playwright/test";
test.use({ reducedMotion: "reduce" });

import { componentIds as components } from "./catalog-pages";

for (const width of [375, 768, 1280]) {
  test(`カタログ全変種が${width}pxと文字200%で利用できる`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 1000 });
    for (const id of components) {
      await page.goto(`/components/${id}`);
      await expect(
        page.locator("main > .ply-app-shell > .workspace > .ply-page-header h1"),
      ).toHaveCount(1);
      await page.getByText("Hono JSX", { exact: true }).click();
      await expect(
        page
          .locator("details")
          .filter({ has: page.locator("summary", { hasText: "Hono JSX" }) })
          .locator("code"),
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
      }
    }
  });
}

test("タブの無効項目を飛ばしメニュー選択と内側コンポーネントの状態を保つ", async ({ page }) => {
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
  await page.getByText("入れ子の通知", { exact: true }).click();
  const inner = page.getByRole("complementary", { name: "内側の完了", exact: true });
  const standalone = page.getByRole("complementary", { name: "招待を送りました", exact: true });
  expect(await inner.evaluate((element) => getComputedStyle(element).borderInlineStartColor)).toBe(
    await standalone.evaluate((element) => getComputedStyle(element).borderInlineStartColor),
  );
});

test("検索の0件・ファイル群・進捗の境界値に到達できる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/apps/search");
  await page.getByRole("searchbox", { name: "記事と資料を探す" }).fill("存在しない記事");
  await page.getByRole("button", { name: "検索", exact: true }).click();
  await expect(page.getByText("見つかりませんでした", { exact: true })).toBeVisible();
  await page.getByRole("searchbox", { name: "記事と資料を探す" }).fill("");
  await page.getByRole("button", { name: "検索", exact: true }).click();
  await expect(
    page.getByRole("list", { name: "記事の検索結果" }).getByRole("listitem"),
  ).toHaveCount(6);
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
  await expect(page.getByRole("progressbar", { name: "処理待ち" })).toHaveJSProperty("position", 0);
  await expect(page.getByRole("progressbar", { name: "送信が完了しました" })).toHaveJSProperty(
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

test("動作コンポーネントのフォーカスがforced-colorsでも見える", async ({ page }, testInfo) => {
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

test("押す操作は浮かせず、指を載せると面が濃くなり、押すと内側へへこみ、focusで輪郭が見える", async ({
  page,
}) => {
  await page.goto("/components/button");
  const buttons = page.locator('[data-example="hono"] .ply-button:not(:disabled)');
  for (const button of await buttons.all()) {
    const look = () =>
      button.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          color: style.color,
          border: style.borderInlineStartColor,
          surface: `${style.backgroundColor} ${style.backgroundImage}`,
          shadow: style.boxShadow,
        };
      });
    await page.mouse.move(0, 0);
    const before = await look();
    // 普段は影を持たない（浮かせない）。
    expect(before.shadow).toBe("none");
    await button.hover();
    const hovered = await look();
    // 指を載せると面だけが変わり、文字と縁の色は変えない。影は付けない。
    expect({ color: hovered.color, border: hovered.border }).toEqual({
      color: before.color,
      border: before.border,
    });
    expect(hovered.surface).not.toBe(before.surface);
    expect(hovered.shadow).toBe("none");
    const variant = await button.getAttribute("data-variant");
    if (variant === "link") {
      // 文字だけの操作は下線を引かず、指を載せると淡い青のピルの面が現れる。
      expect(before.surface.startsWith("rgba(0, 0, 0, 0)")).toBe(true);
    } else {
      await page.mouse.down();
      const pressed = await look();
      expect(pressed.shadow.split("),")[0]).toContain("inset");
      await page.mouse.move(0, 0);
      await page.mouse.up();
    }
    await button.focus();
    await page.keyboard.press("Tab");
    await button.focus();
    await expect(button).toBeFocused();
    expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe(
      "solid",
    );
  }
});

test("コンポーネントCSSの読み込み順と作業面の有無で固有の表示を壊さない", async ({ page }) => {
  for (const id of ["notice", "field", "comparison"]) {
    await page.goto(`/components/${id}`);
    const root = page.locator('[data-example="hono"]');
    const styles = () =>
      root.evaluate((element) =>
        Array.from(element.querySelectorAll<HTMLElement>("[class]")).map((child) => {
          const style = getComputedStyle(child);
          return {
            element: `${child.tagName}.${child.getAttribute("class")}`,
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
    await expect
      .poll(styles, { message: `${id}のコンポーネントCSSは読み込み順に依存しない` })
      .toEqual(before);
  }
});
