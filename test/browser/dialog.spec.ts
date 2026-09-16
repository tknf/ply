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
