import { expect, test } from "@playwright/test";
import { appPaths, componentIds as redesignedComponentIds } from "./catalog-pages";

const overflowOf = (element: Element) => {
  if (element.scrollWidth <= element.clientWidth + 1) return [];
  const edge = element.getBoundingClientRect();
  return Array.from(element.querySelectorAll("*"))
    .filter((child) => {
      const box = child.getBoundingClientRect();
      return (
        box.width > 0 && box.height > 0 && (box.right > edge.right + 1 || box.left < edge.left - 1)
      );
    })
    .slice(0, 6)
    .map((child) => ({
      tag: child.tagName,
      class: String(child.className),
      width: child.getBoundingClientRect().width,
      text: child.textContent?.slice(0, 30),
    }));
};

for (const width of [375, 1280]) {
  test(`全${redesignedComponentIds.length}コンポーネントが${width}pxで収まり参照先と表示を保つ`, async ({
    page,
  }) => {
    test.setTimeout(600_000);
    await page.setViewportSize({ width, height: 1000 });
    for (const id of redesignedComponentIds) {
      await page.goto(`/components/${id}`);
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
              (reference) => reference && !document.getElementById(reference),
            ),
          ),
        );
        return { duplicates: ids.filter((entry, index) => ids.indexOf(entry) !== index), missing };
      });
      expect.soft(references, id).toEqual({ duplicates: [], missing: [] });
      const sample = page.locator('[data-example="hono"]');
      await expect(sample).toBeVisible();
      for (const zoom of ["100%", "200%"]) {
        await page.evaluate((size) => {
          document.documentElement.style.fontSize = size;
        }, zoom);
        const overflow = await sample.evaluate(overflowOf);
        expect.soft(overflow, `${id}・文字${zoom}`).toEqual([]);
        expect
          .soft(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            `${id}・文字${zoom}のページ`,
          )
          .toBe(true);
      }
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
  await expect(sample.getByRole("checkbox", { name: "管理者の確認", exact: true })).toBeDisabled();
});

test("Toastは標準操作で開閉でき長い通知と操作が狭幅に収まる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/toast");
  const sample = page.locator('[data-example="hono"]');
  await sample.getByRole("button", { name: "結果表示を試す", exact: true }).click();
  const toast = sample.locator(".ply-toast").first();
  await expect(toast).toBeVisible();
  // 閉じる操作は角からはみ出させるため、見出し・本文・操作の行がそれぞれ幅に収まるかを測る。
  expect(
    await toast.evaluate((element) =>
      Array.from(element.querySelectorAll(":scope > *")).every(
        (part) => part.scrollWidth <= part.clientWidth + 1,
      ),
    ),
  ).toBe(true);
  const closeBox = await toast.getByRole("button", { name: "閉じる", exact: true }).boundingBox();
  if (!closeBox) throw new Error("閉じる操作がありません");
  expect(closeBox.x + closeBox.width).toBeLessThanOrEqual(375);
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

test("EditablePropertyは確定した時だけ書き終えた印を描き、未登録の色を値に合わせる", async ({
  page,
}) => {
  await page.goto("/components/editable-property");
  const property = page.locator('[data-example="hono"] .ply-editable-property').nth(1);
  const value = property.locator(".value");
  await expect(value).toHaveAttribute("data-empty", "true");
  await property.getByRole("button", { name: "メモを編集" }).click();
  await page.keyboard.type("9月中に確認");
  // 素のEnterでは確定せず、フォームも送らない。
  await page.keyboard.press("Enter");
  await expect(property).toHaveAttribute("data-state", "editing");
  await page.keyboard.press("ControlOrMeta+Enter");
  await expect(value).toHaveText("9月中に確認");
  await expect(value).not.toHaveAttribute("data-empty");
  await expect(property).toHaveAttribute("data-saved", "true");
  await expect(property).not.toHaveAttribute("data-saved", { timeout: 3000 });
  await property.getByRole("button", { name: "メモを編集" }).click();
  await page.keyboard.press("Escape");
  await expect(property).not.toHaveAttribute("data-saved");
});

test("EditablePropertyの複数行はEnterで改行し、Control / Meta+Enterで確定して改行を表示に残す", async ({
  page,
}) => {
  await page.goto("/components/editable-property");
  const property = page
    .locator('[data-example="hono"] .ply-editable-property[data-multiline="true"]')
    .first();
  const value = property.locator(".value");
  const rule = () =>
    property.evaluate((element) => {
      const editing = element.getAttribute("data-state") === "editing";
      const row = element.querySelector(editing ? ".editor > textarea" : ".preview");
      return row?.getBoundingClientRect().top;
    });
  const viewing = await rule();
  await property.getByRole("button", { name: "打ち合わせの要点を編集" }).click();
  expect(await rule()).toBe(viewing);
  await property
    .locator("textarea")
    .evaluate((element) =>
      element instanceof HTMLTextAreaElement
        ? element.setSelectionRange(element.value.length, element.value.length)
        : undefined,
    );
  await page.keyboard.press("Enter");
  await page.keyboard.type("資料は前日までに共有する。");
  await expect(property).toHaveAttribute("data-state", "editing");
  await page.keyboard.press("ControlOrMeta+Enter");
  await expect(property).toHaveAttribute("data-state", "viewing");
  expect(await value.textContent()).toBe(
    "カテゴリは5つにまとめる。\n公開は9月30日。\n次回は10月7日の14時から。\n資料は前日までに共有する。",
  );
  // 改行を表示にも残し、4行分の高さで表示する（値の行の上下の余白は除く）。
  const lines = await value.evaluate((element) => {
    const style = getComputedStyle(element);
    return (
      (element.getBoundingClientRect().height -
        Number.parseFloat(style.paddingTop) -
        Number.parseFloat(style.paddingBottom)) /
      Number.parseFloat(style.lineHeight)
    );
  });
  expect(Math.round(lines)).toBe(4);
});

test("EditablePropertyは表示と編集で一行目の高さと書き始めを変えず、書き始めると値を選ぶ", async ({
  page,
}) => {
  await page.goto("/components/editable-property");
  const property = page.locator('[data-example="hono"] .ply-editable-property').first();
  // 表示の値と編集中の欄の、一行目の中心の高さと文字の書き始めを測る。
  const measure = () =>
    property.evaluate((element) => {
      const editing = element.getAttribute("data-state") === "editing";
      const box = element.querySelector(editing ? ".editor > .ply-input" : ".preview > .value");
      if (!(box instanceof HTMLElement)) return null;
      const style = getComputedStyle(box);
      const rect = box.getBoundingClientRect();
      const line = parseFloat(style.lineHeight);
      const edge = editing ? parseFloat(style.borderTopWidth) : 0;
      return {
        middle:
          box instanceof HTMLInputElement
            ? rect.top + rect.height / 2
            : rect.top + edge + parseFloat(style.paddingTop) + line / 2,
        start:
          rect.left +
          (editing ? parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft) : 0),
        size: style.fontSize,
      };
    });
  const viewing = await measure();
  // 鉛筆だけでなく、値そのものを押しても書き始める。
  await property.locator(".value").click();
  await expect(property).toHaveAttribute("data-state", "editing");
  const editing = await measure();
  expect(editing?.middle).toBeCloseTo(viewing?.middle ?? Number.NaN, 0);
  expect(editing?.start).toBeCloseTo(viewing?.start ?? Number.NaN, 0);
  expect(editing?.size).toBe(viewing?.size);
  const input = property.locator("input");
  await expect(input).toBeFocused();
  expect(
    await input.evaluate((element) =>
      element instanceof HTMLInputElement
        ? [element.selectionStart, element.selectionEnd, element.value.length]
        : [],
    ),
  ).toEqual([0, 4, 4]);
  await page.keyboard.press("Escape");
  await expect(property).toHaveAttribute("data-state", "viewing");
});

test("Boardは運んだ項目を置いた列の色に染め、たたんだ列はピルの幅になる", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/board");
  await page
    .locator('[data-example="hono"] details')
    .evaluateAll((elements) => elements.forEach((element) => element.setAttribute("open", "")));
  const approval = page.getByRole("region", { name: "原稿の承認", exact: true });
  // 列の色は紙の地ではなく、斜めの染まり（背景の画像）に出る。
  const fill = (id: string) =>
    approval
      .locator(`[data-board-id="${id}"]`)
      .evaluate((element) => getComputedStyle(element).backgroundImage);
  const approved = await fill("d3");
  expect(await fill("d1")).not.toBe(approved);
  await approval.locator('[data-board-id="d1"]').getByRole("button").focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(approval.locator('[data-column-id="approved"] [data-board-id="d1"]')).toBeVisible();
  await expect.poll(() => fill("d1")).toBe(approved);

  const hiring = page.getByRole("region", { name: "採用の進行", exact: true });
  const widths = await hiring
    .locator(":scope > section")
    .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().width));
  expect(widths[0]).toBeLessThan(64);
  expect(widths[1]).toBeGreaterThan(200);
  await expect(hiring.locator('[data-column-id="closed"] .title > small')).toHaveText("3");
  await expect(hiring.locator('[data-column-id="closed"] .items')).toBeHidden();
});

test("Boardのたたんだ列は押すと開き、たためて、取り消せるboard:toggleで知らせる", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/board");
  await page
    .locator('[data-example="hono"] details')
    .evaluateAll((elements) => elements.forEach((element) => element.setAttribute("open", "")));
  const hiring = page.getByRole("region", { name: "採用の進行", exact: true });
  const backlog = hiring.locator('[data-column-id="backlog"]');
  const toggle = backlog.getByRole("button", { name: "「応募」の列を開閉", exact: true });
  await page.evaluate(() => {
    const events: unknown[] = [];
    Object.assign(window, { boardToggles: events });
    document.addEventListener("board:toggle", (event) => {
      if (event instanceof CustomEvent) events.push(event.detail);
    });
  });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(backlog).not.toHaveAttribute("data-collapsed", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(backlog.locator(".items")).toBeVisible();
  expect(
    await backlog.evaluate((element) => element.getBoundingClientRect().width),
  ).toBeGreaterThan(200);
  await toggle.click();
  await expect(backlog).toHaveAttribute("data-collapsed", "true");
  await expect(backlog.locator(".items")).toBeHidden();
  expect(await page.evaluate(() => Reflect.get(window, "boardToggles"))).toEqual([
    { column: "backlog", collapsed: false },
    { column: "backlog", collapsed: true },
  ]);
  // 利用アプリが取り消した時は、表示を変えない。
  await page.evaluate(() =>
    document.addEventListener("board:toggle", (event) => event.preventDefault(), { once: true }),
  );
  await toggle.click();
  await expect(backlog).toHaveAttribute("data-collapsed", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  // たたんだピルは、名前など「開く」以外の場所を押しても開く。
  await backlog.locator(".title > .label").click();
  await expect(backlog).not.toHaveAttribute("data-collapsed", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
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
  test(`利用例のアプリの全画面が${width}pxで収まる`, async ({ page }) => {
    for (const path of appPaths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(path);
      const workspace = page.locator(".ply-app-shell > .workspace");
      await expect(workspace, path).toBeVisible();
      expect.soft(await workspace.evaluate(overflowOf), path).toEqual([]);
      expect
        .soft(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path)
        .toBe(true);
    }
  });
}

test("コンポーネントの入れ子とCSSの読み込み順が文字と固有の状態を変えない", async ({ page }) => {
  // 読込直後のtransition途中ではなく、確定したスタイル同士を比較する。
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["card", "notice", "comparison", "button", "badge", "tag"]) {
    await page.goto(`/components/${id}`);
    const samples = page.locator('[data-example="hono"]');
    const signatures = () =>
      samples.evaluate((element) =>
        Array.from(
          element.querySelectorAll(
            ".ply-card > .title, .ply-notice > .heading > .title, .ply-comparison > .title, .ply-button, .ply-badge, .ply-tag",
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
    await expect.poll(signatures, { message: id }).toEqual(original);
  }
});

test("RTLと動きを減らす設定でも配置と操作の意味を保つ", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  for (const id of ["loading", "icon"]) {
    await page.goto(`/components/${id}`);
    await page.evaluate(() => {
      document.documentElement.dir = "rtl";
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id).toBe(
      true,
    );
  }
  await page.goto("/components/loading");
  const loading = page.locator('[data-example="hono"] .ply-loading > .indicator').first();
  expect(await loading.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await page.goto("/components/icon");
  const button = page.locator('[data-example="hono"] .ply-button:not(:disabled)').first();
  await button.focus();
  await expect(button).toBeFocused();
  expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
});

test("文章・数値・操作の文字寸法を親からの継承で変えない", async ({ page }) => {
  for (const [id, selector] of [
    ["table", '[data-example="hono"] tbody td'],
    ["card", '[data-example="hono"] .ply-card > .body > p'],
    ["notice", '[data-example="hono"] .ply-notice > .body > p'],
  ] as const) {
    await page.goto(`/components/${id}`);
    const element = page.locator(selector).first();
    const style = await element.evaluate((node) => ({
      font: getComputedStyle(node).fontSize,
      line: getComputedStyle(node).lineHeight,
    }));
    expect(style, selector).toEqual({ font: "14px", line: "20px" });
  }
  await page.goto("/components/icon");
  const button = page.locator('[data-example="hono"] .ply-button').first();
  const dimensions = await button.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      font: style.fontSize,
      line: style.lineHeight,
      block: Math.round(element.getBoundingClientRect().height),
      paddingStart: style.paddingBlockStart,
      paddingEnd: style.paddingBlockEnd,
    };
  });
  expect(dimensions).toEqual({
    font: "14px",
    line: "20px",
    block: 36,
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
