import { expect, test } from "@playwright/test";

test("共通部品の仕事場で検索・追加・状態変更・完了を操作できる", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/review/workspace");
  await expect(page.getByRole("heading", { name: "ヘルプセンターのリニューアル" })).toBeVisible();
  if (testInfo.project.name === "chromium")
    await page.screenshot({ path: testInfo.outputPath("workspace-desktop.png"), fullPage: true });
  const search = page.getByRole("searchbox", { name: "タスクを探す" });
  await search.fill("スマートフォン");
  await expect(page.locator(".ply-board .ply-card:visible")).toHaveCount(1);
  await search.fill("存在しないタスク");
  await expect(page.locator(".ply-board .ply-card:visible")).toHaveCount(0);
  await expect(page.getByText("0件のタスクが見つかりました。", { exact: true })).toBeVisible();
  await search.fill("");
  await page.getByRole("button", { name: "＋ タスクを追加" }).click();
  await page
    .getByRole("textbox", { name: "何をしますか？" })
    .fill("公開前にアクセシビリティを確認する");
  await page.getByRole("button", { name: "追加する", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("追加しました");
  await page.getByRole("button", { name: "閉じる", exact: true }).click();
  const card = page
    .locator(".ply-card")
    .filter({ has: page.getByRole("heading", { name: "公開前にアクセシビリティを確認する" }) });
  await expect(card).toBeVisible();
  await card.getByRole("combobox").selectOption("2");
  await expect(
    page
      .locator(".ply-board > section")
      .last()
      .getByRole("heading", { name: "公開前にアクセシビリティを確認する" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "今週のチェック" }).click();
  await page.getByRole("checkbox", { name: "スマートフォンで読んでみる" }).check();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "2");
  await page.getByRole("tab", { name: "会話" }).click();
  await expect(page.locator(".ply-message:visible")).toHaveCount(2);
});

test("中央のコマンドと作業面は狭幅・埋め込み・文字拡大でも中心を保つ", async ({
  page,
}, testInfo) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/review/mail");
    const shell = page.locator(".ply-app-shell");
    await expect(shell.locator(".sidebar")).toHaveCount(0);
    const commands = await shell.locator(":scope > .bar > .commands").boundingBox();
    const workspace = await shell.locator(":scope > .workspace").boundingBox();
    expect(commands).not.toBeNull();
    expect(workspace).not.toBeNull();
    if (!commands || !workspace) throw new Error("中央の構造がありません");
    expect(Math.abs(commands.x + commands.width / 2 - width / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs(workspace.x + workspace.width / 2 - width / 2)).toBeLessThanOrEqual(1);
    expect(workspace.width).toBeLessThanOrEqual(1024);
    expect(workspace.y).toBeGreaterThan(commands.y + commands.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.getByRole("button", { name: "つむぐチーム", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    if (!bounds) throw new Error("コマンドパネルがありません");
    expect(bounds.x).toBeGreaterThanOrEqual(8);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width - 8);
    if (width === 1440 && testInfo.project.name === "chromium")
      await page.screenshot({ path: testInfo.outputPath("command-menu.png") });
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "つむぐチーム", exact: true })).toBeFocused();
    await page.getByRole("link", { name: /カテゴリ案をまとめました/ }).click();
    await expect(page.getByRole("textbox", { name: "森 美咲への返信の下書き" })).toBeVisible();
    const byline = await page.locator(".ply-message > .heading").boundingBox();
    const body = await page.locator(".ply-message > .body").boundingBox();
    if (!byline || !body) throw new Error("投稿者と本文がありません");
    expect(body.y - byline.y - byline.height).toBeLessThanOrEqual(17);

    if (width === 375 && testInfo.project.name === "chromium")
      await page.screenshot({ path: testInfo.outputPath("mail-mobile.png"), fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.locator(".ply-app-shell").evaluate((element) => {
    if (element instanceof HTMLElement) element.style.inlineSize = "650px";
  });
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const overflow = await page
    .locator(".ply-app-shell")
    .evaluate((element) => element.scrollWidth - element.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("連絡を読み下書きを残して整理し、元の受信トレイへ戻せる", async ({ page }) => {
  await page.goto("/review/mail");
  await expect(page.getByRole("tab", { name: "受信トレイ 3", exact: true })).toBeVisible();
  await page.getByRole("link", { name: /カテゴリ案をまとめました/ }).click();
  const draft = page.getByRole("textbox", { name: "森 美咲への返信の下書き" });
  await draft.fill("カテゴリ案を確認しました。こちらで記事を入れてみます。");
  await page.getByRole("button", { name: "下書きを保存", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("下書きを保存しました");
  await page.reload();
  await expect(draft).toHaveValue("カテゴリ案を確認しました。こちらで記事を入れてみます。");
  await draft.fill("火曜日に確認します。");
  await page.getByRole("button", { name: "あとで読む", exact: true }).click();
  await expect(page.getByRole("tab", { name: "受信トレイ 2", exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "あとで 1", exact: true }).click();
  const later = page.getByRole("tabpanel", { name: "あとで 1", exact: true });
  await expect(later.locator('[data-message-id="categories"]')).toHaveAttribute(
    "data-unread",
    "false",
  );
  await later.getByRole("link", { name: /カテゴリ案をまとめました/ }).click();
  await expect(draft).toHaveValue("火曜日に確認します。");
  await page.getByRole("button", { name: "確認を終える", exact: true }).click();
  await page.getByRole("tab", { name: "確認済み 1", exact: true }).click();
  await page
    .getByRole("tabpanel", { name: "確認済み 1", exact: true })
    .getByRole("link", { name: /カテゴリ案をまとめました/ })
    .click();
  await page.getByRole("button", { name: "受信トレイに戻す", exact: true }).click();
  await expect(page.getByRole("tab", { name: "受信トレイ 3", exact: true })).toBeVisible();
  await expect(page.locator('[data-message-id="categories"]')).toHaveAttribute(
    "data-unread",
    "false",
  );
  for (const title of [
    "カテゴリ案をまとめました",
    "来週の打ち合わせについて",
    "公開前のチェックをお願いします",
  ]) {
    await page.getByRole("link", { name: new RegExp(title) }).click();
    await page.getByRole("button", { name: "確認を終える", exact: true }).click();
  }
  await expect(page.getByText("ひとまず、ひと区切り。", { exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "確認済み 3", exact: true })).toBeVisible();
});
