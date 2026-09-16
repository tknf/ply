import { expect, test } from "@playwright/test";
import { redesignedComponentIds } from "../../catalog/redesigned-components";

test("全56ページのコードを改行・色分けしDisclosureの見出しを保つ", async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 375, height: 900 });
  const paths = [
    ...redesignedComponentIds.map((id) => `/components/${id}`),
    "/reservation",
    "/files",
  ];
  let codeHeadings = 0;
  for (const path of paths) {
    await page.goto(path);
    const result = await page.locator(".ply-disclosure > summary").evaluateAll((elements) => {
      const invalid = elements.filter(
        (element) =>
          !element.querySelector(":scope > .marker") ||
          !element.querySelector(":scope > .label > .title"),
      );
      const code = elements.filter((element) =>
        ["HTML", "Hono JSX"].includes(element.textContent?.trim() ?? ""),
      );
      const wrapped = code.filter((element) => {
        const node = element.querySelector(".title");
        if (!node) return true;
        const range = document.createRange();
        range.selectNodeContents(node);
        return (
          range.getBoundingClientRect().height >
          Number.parseFloat(getComputedStyle(node).lineHeight) + 0.5
        );
      });
      return {
        invalid: invalid.map((element) => element.textContent?.trim()),
        wrapped: wrapped.map((element) => element.textContent?.trim()),
        code: code.length,
      };
    });
    expect(result.invalid, path).toEqual([]);
    expect(result.wrapped, path).toEqual([]);
    if (path.startsWith("/components/")) {
      expect(result.code, path).toBe(2);
      const group = page.getByRole("group", { name: "利用例のコード", exact: true });
      await expect(group.locator("code")).toHaveCount(0);
      for (const summary of await group.locator("summary").all()) await summary.press("Enter");
      await expect(group.locator("code")).toHaveCount(2);
      const samples = await page
        .getByRole("group", { name: "利用例のコード", exact: true })
        .locator(".ply-code-block code")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            lines: element.textContent?.split("\n").length ?? 0,
            colors: new Set(
              [...element.querySelectorAll("span[style]")].map((span) =>
                span.getAttribute("style"),
              ),
            ).size,
            tags: element.querySelectorAll("script,input,button").length,
          })),
        );
      expect(samples, path).toHaveLength(2);
      for (const sample of samples) {
        expect(sample.lines, path).toBeGreaterThan(1);
        expect(sample.colors, path).toBeGreaterThan(1);
        expect(sample.tags, path).toBe(0);
      }
    }
    codeHeadings += result.code;
  }
  expect(codeHeadings).toBe(112);
});

for (const width of [375, 1280])
  test(`コード欄を${width}pxと文字200%で開閉しても見出しを一行に保つ`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/components/command-menu");
    const group = page.getByRole("group", { name: "利用例のコード", exact: true });
    for (const zoom of ["100%", "200%"]) {
      await page.evaluate((value) => {
        document.documentElement.style.fontSize = value;
      }, zoom);
      for (const label of ["HTML", "Hono JSX"]) {
        const summary = group.locator("summary").filter({ hasText: new RegExp(`^${label}$`) });
        const details = group.locator("details").filter({
          has: page.locator("summary").filter({ hasText: new RegExp(`^${label}$`) }),
        });
        await summary.press("Enter");
        await expect(details.locator("pre > code")).toBeVisible();
        await expect(details).toHaveAttribute("open", "");
        const geometry = await summary.locator(".title").evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return {
            height: range.getBoundingClientRect().height,
            line: Number.parseFloat(getComputedStyle(element).lineHeight),
          };
        });
        expect(geometry.height).toBeLessThanOrEqual(geometry.line + 0.5);
        await summary.press("Space");
        await expect(details.locator("pre > code")).toBeHidden();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
  });
