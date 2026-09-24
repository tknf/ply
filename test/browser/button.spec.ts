import { expect, test } from "@playwright/test";

test("Buttonは画面幅で文字サイズが緩やかに変わり文字拡大に寸法が追従する", async ({
  page,
}, testInfo) => {
  const sizes: number[] = [];
  for (const width of [375, 960, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/components/button");
    const example = page.getByRole("region", { name: "Honoの利用例" });
    const buttons = example.getByRole("button", {
      name: /^(保存する|編集する|確定する|プレビュー|削除する)$/,
    });
    const measure = () =>
      buttons.evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            font: Number.parseFloat(style.fontSize),
            height: element.getBoundingClientRect().height,
            width: element.getBoundingClientRect().width,
            iconOnly: element.getAttribute("data-icon-only") === "true",
            padding: Number.parseFloat(style.paddingInlineStart),
          };
        }),
      );
    const before = await measure();
    const normal = before[0];
    if (!normal) throw new Error("通常ボタンがありません");
    sizes.push(normal.font);
    await example.screenshot({ path: testInfo.outputPath(`button-${width}.png`) });
    await buttons.evaluateAll((elements) => {
      for (const element of elements) {
        if (element instanceof HTMLElement)
          element.style.fontSize = `${Number.parseFloat(getComputedStyle(element).fontSize) * 2}px`;
      }
    });
    const after = await measure();
    for (const [index, original] of before.entries()) {
      const enlarged = after[index];
      if (!enlarged) throw new Error("拡大後のボタンがありません");
      expect(enlarged.font / original.font).toBeCloseTo(2, 2);
      expect(enlarged.height / original.height).toBeCloseTo(2, 2);
      expect(enlarged.padding).toBeCloseTo(original.padding * 2, 1);
      if (original.iconOnly) {
        expect(original.width).toBeCloseTo(original.height, 1);
        expect(enlarged.width).toBeCloseTo(enlarged.height, 1);
      }
    }
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
      .toBe(true);
    await example.screenshot({ path: testInfo.outputPath(`button-${width}-200.png`) });
  }
  const [small, medium, large] = sizes;
  if (small === undefined || medium === undefined || large === undefined)
    throw new Error("各幅の測定値がありません");
  expect(small).toBeGreaterThanOrEqual(13.5);
  expect(small).toBeLessThan(medium);
  expect(medium).toBeLessThan(large);
  expect(large).toBeCloseTo(14, 2);
});
