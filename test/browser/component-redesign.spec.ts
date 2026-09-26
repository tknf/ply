import { expect, test } from "@playwright/test";
import { redesignedComponentIds } from "../../catalog/redesigned-components";

for (const width of [375, 1280]) {
  test(`全${redesignedComponentIds.length}コンポーネントが${width}pxで収まり参照先と表示を保つ`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/review/components");
    await page
      .locator("details")
      .evaluateAll((elements) => elements.forEach((element) => element.setAttribute("open", "")));
    const references = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
      const missing = Array.from(
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
      return { duplicates: ids.filter((id, index) => ids.indexOf(id) !== index), missing };
    });
    expect(references).toEqual({ duplicates: [], missing: [] });
    for (const id of redesignedComponentIds) {
      const sample = page.locator(`[data-component="${id}"]`);
      await expect(sample).toBeVisible();
      expect
        .soft(
          await sample.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
          id,
        )
        .toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    for (const id of redesignedComponentIds) {
      const sample = page.locator(`[data-component="${id}"]`);
      const overflow = await sample.evaluate((element) => {
        if (element.scrollWidth <= element.clientWidth + 1) return [];
        const edge = element.getBoundingClientRect();
        return Array.from(element.querySelectorAll("*"))
          .filter((child) => {
            const box = child.getBoundingClientRect();
            return (
              box.width > 0 &&
              box.height > 0 &&
              (box.right > edge.right + 1 || box.left < edge.left - 1)
            );
          })
          .slice(0, 6)
          .map((child) => ({
            tag: child.tagName,
            class: child.className,
            width: child.getBoundingClientRect().width,
            text: child.textContent?.slice(0, 30),
          }));
      });
      expect
        .soft(
          await sample.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
          `${id}・文字200% ${JSON.stringify(overflow)}`,
        )
        .toBe(true);
    }
  });
}

test("TaskListはキーボードで完了を切り替え無効な項目を保持する", async ({ page }) => {
  await page.goto("/components/task-list");
  const sample = page.locator('[data-example="hono"]');
  const task = sample.getByRole("checkbox").first();
  const initial = await task.isChecked();
  await task.focus();
  await page.keyboard.press("Space");
  expect(await task.isChecked()).toBe(!initial);
  await page.keyboard.press("Space");
  expect(await task.isChecked()).toBe(initial);
  await expect(sample.getByRole("checkbox").last()).toBeDisabled();
});

test("Toastは標準操作で開閉でき長い通知と操作が狭幅に収まる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/toast");
  const sample = page.locator('[data-example="hono"]');
  await sample.getByRole("button", { name: "結果表示を試す", exact: true }).click();
  const toast = sample.locator(".ply-toast").first();
  await expect(toast).toBeVisible();
  expect(await toast.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
    true,
  );
  await toast.getByRole("button", { name: "閉じる", exact: true }).click();
  await expect(toast).not.toBeVisible();
});

test("画像の内在サイズにかかわらず指定比率を守り小さな表を広げない", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/image-frame");
  for (const shape of ["portrait", "square", "landscape"] as const) {
    const expected = { portrait: 5 / 7, square: 1, landscape: 16 / 9 }[shape];
    const frames = page.locator(
      `[data-example="hono"] .ply-image-frame[data-shape="${shape}"] > .image`,
    );
    for (const frame of await frames.all()) {
      const ratio = await frame.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width / rect.height;
      });
      expect(ratio).toBeCloseTo(expected, 2);
    }
  }
  await page.goto("/components/table");
  const table = page.getByRole("region", { name: "料金", exact: true });
  expect(await table.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
    true,
  );
  const textCell = page.locator('[data-example="hono"] [data-cell="text"]').first();
  expect(
    await textCell.evaluate((element) => element.getBoundingClientRect().width),
  ).toBeGreaterThanOrEqual(196);
});

test("月カレンダーは狭幅でも日付の列を保ちキーボードでスクロールできる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/calendar");
  const viewport = page.locator('[data-example="hono"] .ply-calendar > .viewport').first();
  await viewport.focus();
  await expect(viewport).toBeFocused();
  await page.keyboard.press("ArrowRight", { delay: 100 });
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});

test("Boardは広い画面内でもコンポーネント幅に応じて横スクロールから縦の棚へ変わる", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/board");
  const board = page.locator('[data-example="hono"] .ply-board').first();
  await board.evaluate((element) => {
    if (element instanceof HTMLElement) element.style.inlineSize = "640px";
  });
  await board.focus();
  await page.keyboard.press("ArrowRight", { delay: 100 });
  await expect.poll(() => board.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await board.evaluate((element) => {
    if (element instanceof HTMLElement) element.style.inlineSize = "320px";
  });
  const shelves = await board.locator(":scope > section").evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { x: box.x, y: box.y, end: box.bottom };
    }),
  );
  const first = shelves[0];
  const second = shelves[1];
  expect(first).toBeDefined();
  expect(second).toBeDefined();
  expect(second?.x).toBe(first?.x);
  expect(second?.y).toBeGreaterThanOrEqual(first?.end ?? Infinity);
  expect(await board.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
    true,
  );
});

test("入れ子の局所クラスへ外側の見出しと状態の指定が漏れない", async ({ page }) => {
  await page.goto("/components/comparison");
  const sample = page.locator('[data-example="hono"]');
  const comparisons = sample.locator(".ply-comparison");
  const first = comparisons.first().locator(":scope > .title");
  const nested = comparisons.last().locator(":scope > .title");
  const font = (element: HTMLElement) => ({
    size: getComputedStyle(element).fontSize,
    weight: getComputedStyle(element).fontWeight,
  });
  expect(await nested.evaluate(font)).toEqual(await first.evaluate(font));
  await page.goto("/components/notice");
  await page.getByText("入れ子の通知", { exact: true }).click();
  const standalone = page.getByRole("complementary", { name: "招待を送りました", exact: true });
  const inner = page.getByRole("complementary", { name: "内側の完了", exact: true });
  expect(await inner.evaluate((element) => getComputedStyle(element).borderInlineStartColor)).toBe(
    await standalone.evaluate((element) => getComputedStyle(element).borderInlineStartColor),
  );
});

for (const width of [375, 1280]) {
  test(`6領域の組み合わせが${width}pxで収まり本文と操作の基準を保つ`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/review/applications");
    for (const application of ["mail", "crm", "projects", "documents", "finance", "chat"]) {
      const example = page.locator(`[data-application="${application}"]`);
      await expect(example).toBeVisible();
      expect(
        await example.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        application,
      ).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test("コンポーネントの入れ子とCSSの読み込み順が文字と固有の状態を変えない", async ({ page }) => {
  // 読込直後のtransition途中ではなく、確定したスタイル同士を比較する。
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/review/components");
  const samples = page.locator(".catalog-review");
  const signatures = () =>
    samples.evaluate((element) =>
      Array.from(
        element.querySelectorAll(
          ".ply-card > .title, .ply-notice > .title, .ply-comparison > .title, .ply-button, .ply-badge, .ply-tag",
        ),
        (child) => {
          const style = getComputedStyle(child);
          return {
            component: child.closest("[data-component]")?.getAttribute("data-component"),
            label: child.textContent?.trim(),
            color: style.color,
            background: style.backgroundColor,
            image: style.backgroundImage,
            border: style.borderColor,
            shadow: style.boxShadow,
            font: style.fontFamily,
            size: style.fontSize,
            line: style.lineHeight,
            weight: style.fontWeight,
            padding: style.paddingBlock,
          };
        },
      ),
    );
  const original = await signatures();
  await page.evaluate(() =>
    Array.from(document.querySelectorAll('link[href*="/components/"]'))
      .reverse()
      .forEach((link) => document.head.append(link)),
  );
  await expect.poll(signatures).toEqual(original);
});

test("RTLと動きを減らす設定でも配置と操作の意味を保つ", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/review/components");
  await page.evaluate(() => {
    document.documentElement.dir = "rtl";
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const loading = page.locator(".ply-loading > .indicator").first();
  expect(await loading.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  const button = page.locator('[data-component="icon"] .ply-button:not(:disabled)').first();
  await button.focus();
  await expect(button).toBeFocused();
  expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
});

test("文章・数値・操作の文字寸法を親からの継承で変えない", async ({ page }) => {
  await page.goto("/review/components");
  for (const selector of [
    '[data-component="table"] tbody td',
    '[data-component="card"] .ply-card > .body > p',
    '[data-component="notice"] .ply-notice > .body > p',
  ]) {
    const element = page.locator(selector).first();
    const style = await element.evaluate((node) => ({
      font: getComputedStyle(node).fontSize,
      line: getComputedStyle(node).lineHeight,
    }));
    expect(style, selector).toEqual({ font: "14px", line: "20px" });
  }
  const button = page.locator('[data-component="icon"] .ply-button').first();
  const dimensions = await button.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      font: style.fontSize,
      line: style.lineHeight,
      block: element.getBoundingClientRect().height,
      paddingStart: style.paddingBlockStart,
      paddingEnd: style.paddingBlockEnd,
    };
  });
  expect(dimensions).toEqual({
    font: "14px",
    line: "20px",
    block: 32,
    paddingStart: "0px",
    paddingEnd: "0px",
  });
});

test("SplitViewは持ち手のドラッグと矢印キーで主領域の幅を変える", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/split-view");
  const view = page.locator('[data-example="hono"] .ply-split-view').first();
  await expect(view).toHaveAttribute("data-state", /.+/);
  const handle = view.locator(":scope > .panes > .handle");
  const primary = view.locator(":scope > .panes > .primary");
  const width = async () => (await primary.boundingBox())?.width ?? 0;
  const before = await width();
  const box = await handle.boundingBox();
  if (!box) throw new Error("持ち手がありません");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x - 150, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  const dragged = await width();
  expect(dragged).toBeLessThan(before - 50);
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  expect(await width()).toBeGreaterThan(dragged);
});
