import { expect, test } from "@playwright/test";

test("Calendarの表示と選択、Overlayの共通構造と狭幅を確認する", async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 800 });

  await page.goto("/components/popover");
  await page.locator('[data-popover-target="trigger"][popovertarget="hono-popover"]').click();
  const popover = page.locator("#hono-popover");
  await expect(popover).toBeVisible();
  await expect(popover.locator(":scope > .heading > .heading-row > .close")).toBeVisible();
  await expect(popover.locator(":scope > .body")).toContainText("この案件に参加");

  await page.goto("/components/hover-card");
  await page
    .locator('[data-example="hono"] .ply-hover-card [data-hover-card-target="trigger"]')
    .first()
    .click();
  const hoverCard = page.locator("#hover-card-summary");
  await expect(hoverCard).toBeVisible();
  await expect(hoverCard.locator(":scope > .heading > .heading-row > .close")).toBeVisible();
  await expect(hoverCard.locator(":scope > .body")).toContainText("田中 遥");
  await expect(hoverCard.locator(":scope > .actions")).toContainText("案件を開く");

  await page.goto("/components/dialog");
  await page.locator('[data-dialog-target="trigger"][aria-controls="hono-dialog"]').click();
  const dialog = page.locator("#hono-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(":scope > .heading > .heading-row > .close")).toBeVisible();
  await expect(dialog.locator(":scope > .body")).toContainText("見出しと本文");

  await page.goto("/components/calendar");
  const week = page.getByRole("region", { name: "9月14日〜20日から選ぶ", exact: true });
  const date = week.locator('[data-calendar-value="2026-09-16"]');
  await date.click();
  await expect(date).toHaveAttribute("aria-pressed", "true");
  const range = page.getByRole("region", { name: "9月21日〜27日から期間を選ぶ", exact: true });
  await range.locator('[data-calendar-value="2026-09-26"]').click();
  await expect(range.locator('[data-calendar-value="2026-09-26"]')).toHaveAttribute(
    "data-state",
    "range-start",
  );
  await expect(
    page.locator('[data-example="hono"] .ply-calendar[data-view="agenda"]').last(),
  ).toContainText("この期間に予定はありません");

  await page.goto("/examples/schedule?year=2026&month=9&view=month");
  const schedule = page.locator(".ply-calendar");
  await schedule.getByRole("link", { name: "翌月" }).click();
  await expect(schedule).toContainText("2026年10月");
  await schedule.getByRole("link", { name: "今日" }).click();
  await schedule.getByRole("link", { name: "一覧" }).click();
  await expect(schedule).toHaveAttribute("data-view", "agenda");
  await expect(schedule.locator(".agenda-group")).toHaveCount(4);
  await expect(schedule.locator(".agenda-group").first()).toContainText("10:00");

  await schedule.getByRole("link", { name: "年" }).click();
  await expect(schedule).toHaveAttribute("data-view", "year");
  await expect(schedule.locator(".year-grid .month-label")).toHaveCount(12);
  await expect(schedule.locator(".year-grid .year-day")).toHaveCount(365);
  await schedule.locator(".year-grid").getByRole("link", { name: "1月", exact: true }).click();
  await expect(schedule).toHaveAttribute("data-view", "month");
  await expect(schedule).toContainText("2026年1月");

  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/components/statistic");
  const statistic = page.locator('[data-example="hono"] .ply-statistic').first();
  await statistic.evaluate((element) => {
    const wrapper = document.createElement("div");
    wrapper.className = "ply-cluster";
    element.parentElement?.insertBefore(wrapper, element);
    wrapper.append(element);
  });
  await expect(statistic).toBeVisible();
  expect(
    await statistic.evaluate((element) => element.getBoundingClientRect().width),
  ).toBeGreaterThan(100);

  for (const view of ["agenda", "year"] as const) {
    await page.goto(`/examples/schedule?view=${view}`);
    const body = page.locator(".ply-surface > .body");
    expect(
      await body.evaluate((element) => element.scrollWidth - element.clientWidth),
    ).toBeLessThanOrEqual(1);
  }
});

test("タッチ画面の補足と確認を操作できる", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("/components/popover");
  await page.locator('[data-popover-target="trigger"][popovertarget="hono-popover"]').click();
  const popover = page.locator("#hono-popover");
  await expect(popover).toBeVisible();
  expect(
    await popover.evaluate((element) => element.getBoundingClientRect().right),
  ).toBeLessThanOrEqual(375);
  await popover.getByRole("button", { name: "閉じる" }).click();
  await expect(popover).toBeHidden();

  await page.goto("/components/dialog");
  await page.locator('[data-dialog-target="trigger"][aria-controls="hono-dialog"]').click();
  const dialog = page.locator("#hono-dialog");
  await expect(dialog).toBeVisible();
  // 下から滑り上げる動きの途中で測らないよう、動きの終わりを待つ。
  await dialog.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
  );
  expect(await dialog.evaluate((element) => element.getBoundingClientRect().bottom)).toBeCloseTo(
    812,
    0,
  );
  await page.goto("/components/field");
  const inputSize = await page
    .locator(".ply-input")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(inputSize).toBeGreaterThanOrEqual(16);
  await context.close();
});

test("全コンポーネントの狭幅で外側にはみ出さない", async ({ page }) => {
  test.setTimeout(300_000);
  await page.goto("/review/components");
  let previousTitleSize: number | undefined;
  for (let width = 320; width <= 1024; width += 1) {
    await page.setViewportSize({ width, height: 800 });
    const { overflow, titleSize } = await page.evaluate(() => {
      const title = document.querySelector("#review-page-header .ply-page-header h1");
      if (!title) throw new Error("PageHeaderの見出しが見つかりません");
      return {
        overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
      };
    });
    expect(overflow, `${width}px幅でページ外へのはみ出し`).toBeLessThanOrEqual(1);
    if (previousTitleSize !== undefined) {
      expect(
        titleSize - previousTitleSize,
        `${width}px幅で見出し寸法の飛び`,
      ).toBeGreaterThanOrEqual(0);
      expect(titleSize - previousTitleSize, `${width}px幅で見出し寸法の飛び`).toBeLessThan(0.03);
    }
    previousTitleSize = titleSize;
  }
});
