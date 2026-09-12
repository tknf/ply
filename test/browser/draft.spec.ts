import { expect, test } from "@playwright/test";

const draft = () => ({ title: "窓辺の仕事場", body: "朝の光で読む。\n\n道具を手入れする。" });

test("入力を読み返して保存し、再読み込みと記事一覧から続きを開ける", async ({ page }) => {
  const value = draft();
  await page.goto("/example");
  await page.getByLabel("記事名", { exact: true }).fill(value.title);
  await page.getByLabel("本文", { exact: true }).fill(value.body);
  await expect(page.getByRole("status")).toHaveText("未保存の変更があります");
  await page.getByRole("button", { name: "読み返す", exact: true }).click();
  await expect(page.getByRole("article")).toContainText(value.title);
  await expect(page.locator(".ply-reading-body")).toHaveText(value.body);
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("本文", { exact: true })).toBeFocused();
  await expect(page.getByLabel("本文", { exact: true })).toHaveValue(value.body);
  await page.keyboard.press("ControlOrMeta+s");
  await expect(page.getByRole("status")).toHaveText("✓ このブラウザに保存しました");
  await page.reload();
  await expect(page.getByLabel("記事名", { exact: true })).toHaveValue(value.title);
  await page.getByRole("link", { name: "Plyの道具箱" }).click();
  await expect(page.locator(".catalog-paper strong")).toHaveText(value.title);
  await page.locator(".catalog-paper").click();
  await page.getByRole("link", { name: "記事", exact: true }).click();
  await page.getByLabel("キーワード", { exact: true }).fill("窓辺");
  await expect(page.getByRole("status")).toHaveText("1件の記事");
  await page.getByRole("link", { name: value.title, exact: true }).click();
  await expect(page.getByLabel("本文", { exact: true })).toHaveValue(value.body);
});

test("保存時に戻した変更を復元でき、別の記事へ混ざらない", async ({ page }) => {
  await page.goto("/example?id=workspace");
  const original = await page.getByLabel("本文", { exact: true }).inputValue();
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await page.getByLabel("本文", { exact: true }).fill("一時的な変更");
  await page.getByLabel("本文", { exact: true }).fill(original);
  await expect(page.getByRole("status")).toHaveText("このブラウザに保存済み");
  await page.getByLabel("本文", { exact: true }).fill("保存後の変更");
  await page.getByRole("button", { name: "保存時に戻す", exact: true }).click();
  await expect(page.getByLabel("本文", { exact: true })).not.toHaveValue("保存後の変更");
  await page.getByRole("button", { name: "取り消しを戻す", exact: true }).click();
  await expect(page.getByLabel("本文", { exact: true })).toHaveValue("保存後の変更");
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await page.goto("/example?id=daily");
  await expect(page.getByLabel("本文", { exact: true })).not.toHaveValue("保存後の変更");
});

test("空の記事名は保存せず、保存領域の失敗でも入力を失わない", async ({ page }) => {
  await page.goto("/example");
  await page.getByLabel("記事名", { exact: true }).fill("");
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await expect(page.getByLabel("記事名", { exact: true })).toBeFocused();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByLabel("記事名", { exact: true }).fill("残したい記事");
  await page.getByLabel("本文", { exact: true }).fill("消えてはいけない本文");
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("保存領域なし", "QuotaExceededError");
    };
  });
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await expect(page.getByRole("status")).toContainText("保存できませんでした");
  await expect(page.getByLabel("本文", { exact: true })).toHaveValue("消えてはいけない本文");
});

test("不正な保存値でも画面が開き、入力文字をHTMLとして実行しない", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ply:v3:draft:daily", '{"title":3}'));
  await page.goto("/example");
  await expect(page.getByRole("status")).toHaveText("下書きを読み込めませんでした");
  await page.getByLabel("本文", { exact: true }).fill('<img src=x onerror="alert(1)">');
  await page.getByRole("button", { name: "読み返す", exact: true }).click();
  await expect(page.locator(".ply-reading-body")).toHaveText('<img src=x onerror="alert(1)">');
  await expect(page.locator(".ply-reading-body img")).toHaveCount(0);
  await page.getByRole("button", { name: "書く", exact: true }).click();
  await page.getByLabel("記事名", { exact: true }).fill("");
  await page.getByRole("button", { name: "読み返す", exact: true }).click();
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await expect(page.getByLabel("記事名", { exact: true })).toBeFocused();
});

test("未保存での移動を取り消すと本文が残る", async ({ page }) => {
  await page.goto("/example");
  await page.getByLabel("本文", { exact: true }).fill("まだ保存していない本文");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("link", { name: "記事", exact: true }).click();
  await expect(page).toHaveURL(/\/example$/);
  await expect(page.getByLabel("本文", { exact: true })).toHaveValue("まだ保存していない本文");
});

test("検索条件を組み合わせて0件から復帰し、再読み込みでも条件を保つ", async ({ page }) => {
  await page.goto("/search");
  await page.getByLabel("キーワード", { exact: true }).fill("手順");
  await expect(page.getByRole("status")).toHaveText("2件の記事");
  await page.getByLabel("状態", { exact: true }).selectOption("下書き");
  await expect(page.getByRole("status")).toHaveText("1件の記事");
  await page.reload();
  await expect(page.getByLabel("キーワード", { exact: true })).toHaveValue("手順");
  await expect(page.getByRole("status")).toHaveText("1件の記事");
  await page.getByLabel("キーワード", { exact: true }).fill("該当なし");
  await expect(page.getByRole("heading", { name: "見つかりませんでした" })).toBeVisible();
  await page.getByRole("link", { name: "条件をクリアする" }).click();
  await expect(page.getByLabel("キーワード", { exact: true })).toBeFocused();
  await expect(page.getByRole("status")).toHaveText("6件の記事");
});

for (const width of [375, 1280]) {
  test(`${width}pxで書く画面と読む画面の操作が収まる`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/example");
    const title = page.getByLabel("記事名", { exact: true });
    expect(
      await title.evaluate((element) => element.scrollHeight <= element.clientHeight + 2),
    ).toBe(true);
    const positions = await page
      .locator(".ply-mode-switch > button")
      .evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().y));
    expect(Math.max(...positions) - Math.min(...positions)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: testInfo.outputPath(`writing-${width}.png`), fullPage: true });
    await page.getByRole("button", { name: "読み返す", exact: true }).click();
    await expect(page.getByRole("article")).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: testInfo.outputPath(`reading-${width}.png`), fullPage: true });
  });
}

test("保存前後を比較して入力に戻り、検索条件も引き継ぐ", async ({ page }) => {
  await page.goto("/search?q=手順&state=下書き");
  await page.locator("[data-article-title]:visible").first().click();
  const body = page.getByLabel("本文", { exact: true });
  const original = await body.inputValue();
  await body.fill("比較する本文");
  await page.getByRole("button", { name: "変更を確認", exact: true }).click();
  const comparison = page.getByRole("region", { name: "保存前後の比較" });
  await expect(comparison).toBeFocused();
  await expect(page.locator('[data-draft-target="beforeBody"]')).toHaveText(original);
  await expect(page.locator('[data-draft-target="afterBody"]')).toHaveText("比較する本文");
  await page.keyboard.press("Escape");
  await expect(body).toHaveValue("比較する本文");
  await page.getByRole("button", { name: "下書きを保存" }).click();
  await page.getByRole("link", { name: "記事", exact: true }).click();
  await expect(page.getByLabel("キーワード", { exact: true })).toHaveValue("手順");
  await expect(page.getByLabel("状態", { exact: true })).toHaveValue("下書き");
});

test("共通スプライトの参照が実際に描画され操作に名前が付く", async ({ page }) => {
  await page.goto("/example");
  const icons = page.locator(".ply-icon");
  expect(await icons.count()).toBeGreaterThan(0);
  await expect(page.locator(".ply-icon path")).toHaveCount(0);
  for (const icon of await icons.all()) {
    await expect(icon.locator("use")).toHaveAttribute("href", /^\/assets\/ply-icons\.svg#ply-/);
    await expect
      .poll(() =>
        icon.evaluate((element) =>
          element instanceof SVGGraphicsElement ? element.getBBox().width : 0,
        ),
      )
      .toBeGreaterThan(0);
  }
  await expect(page.getByRole("button", { name: "下書きを保存" })).toBeEnabled();
});
