import { expect, test, type Page } from "@playwright/test";

/** Toastに届いたtoast:*のイベントを、名前とreasonの組で記録する。 */
const recordEvents = (page: Page, id: string) =>
  page.evaluate((id) => {
    const toast = document.getElementById(id);
    const events: string[] = [];
    Reflect.set(window, "toastEvents", events);
    for (const name of ["beforeshow", "show", "beforehide", "hide"])
      toast?.addEventListener(`toast:${name}`, (event) => {
        const reason = event instanceof CustomEvent ? String(event.detail?.reason) : "";
        events.push(`${name}:${reason}`);
      });
  }, id);
const recordedEvents = (page: Page) =>
  page.evaluate(() => {
    const events = Reflect.get(window, "toastEvents");
    return Array.isArray(events) ? events.map(String) : [];
  });

test("popovertargetのボタンと閉じるボタンで開閉すると、Dialogと同じく開閉を知らせる", async ({
  page,
}) => {
  await page.goto("/components/toast");
  await recordEvents(page, "hono-toast-short");
  const toast = page.locator("#hono-toast-short");
  const open = page.getByRole("button", { name: "短い知らせ", exact: true });
  await open.click();
  await expect(toast).toBeVisible();
  await toast.getByRole("button", { name: "閉じる", exact: true }).click();
  await expect(toast).not.toBeVisible();
  await open.focus();
  await page.keyboard.press("Enter");
  await expect(toast).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(toast).not.toBeVisible();
  expect(await recordedEvents(page)).toEqual([
    "beforeshow:pointer",
    "show:pointer",
    "beforehide:pointer",
    "hide:pointer",
    "beforeshow:keyboard",
    "show:keyboard",
    "beforehide:keyboard",
    "hide:keyboard",
  ]);
});

test("toast:beforeshow・toast:beforehideを取り消すと、標準の開閉も起きない", async ({ page }) => {
  await page.goto("/components/toast");
  const toast = page.locator("#hono-toast-short");
  await page.evaluate(() => {
    document
      .getElementById("hono-toast-short")
      ?.addEventListener("toast:beforeshow", (event) => event.preventDefault(), { once: true });
  });
  const open = page.getByRole("button", { name: "短い知らせ", exact: true });
  await open.click();
  await expect(toast).not.toBeVisible();
  await open.click();
  await expect(toast).toBeVisible();
  await page.evaluate(() => {
    document
      .getElementById("hono-toast-short")
      ?.addEventListener("toast:beforehide", (event) => event.preventDefault(), { once: true });
  });
  const close = toast.getByRole("button", { name: "閉じる", exact: true });
  await close.click();
  await expect(toast).toBeVisible();
  await close.click();
  await expect(toast).not.toBeVisible();
});

test("スクリプトとdurationで開閉した時はtoast:*を出さず、標準のtoggleで受け取れる", async ({
  page,
}) => {
  await page.goto("/components/toast");
  await recordEvents(page, "hono-toast-timed");
  await page.evaluate(() => {
    const toast = document.getElementById("hono-toast-timed");
    const states: string[] = [];
    Reflect.set(window, "toastToggles", states);
    toast?.addEventListener("toggle", (event) => {
      if (event instanceof ToggleEvent) states.push(event.newState);
    });
    toast?.showPopover();
  });
  const toast = page.locator("#hono-toast-timed");
  await expect(toast).toBeVisible();
  await expect(toast).not.toBeVisible({ timeout: 8000 });
  expect(await recordedEvents(page)).toEqual([]);
  expect(
    await page.evaluate(() => {
      const states = Reflect.get(window, "toastToggles");
      return Array.isArray(states) ? states.map(String) : [];
    }),
  ).toEqual(["open", "closed"]);
});

test("JavaScriptがなくても、popovertargetのボタンで開き閉じるボタンで閉じる", async ({
  browser,
}) => {
  // JavaScriptを切ると、出る動きの途中に押した時にPlaywrightが止まるのを待ち続けるので、動きを止めて確かめる。
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5178/components/toast");
    const toast = page.locator("#hono-toast-short");
    await page.getByRole("button", { name: "短い知らせ", exact: true }).click();
    await expect(toast).toBeVisible();
    await toast.getByRole("button", { name: "閉じる", exact: true }).click();
    await expect(toast).not.toBeVisible();
  } finally {
    await context.close();
  }
});
