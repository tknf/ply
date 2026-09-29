import { expect, test } from "@playwright/test";

test("backdropのクリックで閉じるが本文のクリックや内側からのドラッグでは閉じない", async ({
  page,
}) => {
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "確認画面を開く", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "内容を確認する", exact: true });
  const body = dialog.locator(".body");
  await body.click();
  await expect(dialog).toBeVisible();
  const bounds = await body.boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    await page.mouse.move(bounds.x + 8, bounds.y + 8);
    await page.mouse.down();
    await page.mouse.move(4, 4);
    await page.mouse.up();
  }
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("見出しにフォーカスしEscapeで元のトリガーへ戻る", async ({ page }) => {
  await page.goto("/components/dialog");
  const trigger = page.getByRole("button", { name: "確認画面を開く", exact: true });
  await trigger.click();
  await expect(page.getByRole("heading", { name: "内容を確認する", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("フォームの必須入力を検証してから閉じる", async ({ page }) => {
  await page.goto("/components/dialog");
  await page.getByText("フォーム・必須入力・入力欄への初期フォーカス", { exact: true }).click();
  await page.getByRole("button", { name: "登録フォームを開く", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "担当者を登録する", exact: true });
  const input = dialog.getByRole("textbox", { name: "名前", exact: true });
  await expect(input).toBeFocused();
  await dialog.getByRole("button", { name: "登録する", exact: true }).click();
  await expect(dialog).toBeVisible();
  await input.fill("山田 太郎");
  await dialog.getByRole("button", { name: "登録する", exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test("狭い画面で長文をスクロールしても閉じる操作が見える", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/components/dialog");
  await page.getByText("長文・本文スクロール・広いダイアログ", { exact: true }).click();
  await page.getByRole("button", { name: "長文の例を開く", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "公開前の確認事項", exact: true });
  const body = dialog.locator(".body");
  expect(await body.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await body.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(dialog.getByRole("button", { name: "閉じる", exact: true })).toBeInViewport();
  await expect(
    dialog.getByRole("heading", { name: "公開前の確認事項", exact: true }),
  ).toBeInViewport();
});

test("背景のクリックで閉じた時はclosedbyの対応によらずreasonをpointerで知らせる", async ({
  page,
}) => {
  await page.goto("/components/dialog");
  await page.evaluate(() => {
    const reasons: string[] = [];
    Reflect.set(window, "dialogReasons", reasons);
    for (const name of ["dialog:beforeclose", "dialog:close"])
      document.addEventListener(name, (event) => {
        if (event instanceof CustomEvent) reasons.push(`${name}:${event.detail.reason}`);
      });
  });
  await page.getByRole("button", { name: "確認画面を開く", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "内容を確認する", exact: true });
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => Reflect.get(window, "dialogReasons"))).toEqual([
    "dialog:beforeclose:pointer",
    "dialog:close:pointer",
  ]);
});

test('method="dialog"の送信で閉じる時も閉じる前後のイベントを出し、取り消せる', async ({
  page,
}) => {
  await page.goto("/components/dialog");
  await page.evaluate(() => {
    const events: string[] = [];
    Reflect.set(window, "dialogEvents", events);
    Reflect.set(window, "keepDialogOpen", true);
    document.addEventListener("dialog:beforeclose", (event) => {
      if (!(event instanceof CustomEvent)) return;
      events.push(`beforeclose:${event.detail.reason}`);
      if (Reflect.get(window, "keepDialogOpen") === true) event.preventDefault();
    });
    document.addEventListener("dialog:close", (event) => {
      if (event instanceof CustomEvent) events.push(`close:${event.detail.reason}`);
    });
  });
  await page.getByText("フォーム・必須入力・入力欄への初期フォーカス", { exact: true }).click();
  const trigger = page.getByRole("button", { name: "登録フォームを開く", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "担当者を登録する", exact: true });
  await dialog.getByRole("textbox", { name: "名前", exact: true }).fill("山田 太郎");
  const submit = dialog.getByRole("button", { name: "登録する", exact: true });
  await submit.click();
  await expect(dialog).toBeVisible();
  await page.evaluate(() => Reflect.set(window, "keepDialogOpen", false));
  await submit.click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => Reflect.get(window, "dialogEvents"))).toEqual([
    "beforeclose:submit",
    "beforeclose:submit",
    "close:submit",
  ]);
});
