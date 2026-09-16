import { expect, test } from "@playwright/test";

test("入力内の表示切替はhoverと文字拡大でも入力の枠内に収まる", async ({ page }) => {
  for (const id of ["field", "date-picker"]) {
    await page.goto("/components/" + id);
    const toggle = page.locator('[data-example="hono"] .toggle').first();
    await expect(toggle).toBeVisible();
    for (const size of ["100%", "200%"]) {
      await page.evaluate((value) => {
        document.documentElement.style.fontSize = value;
      }, size);
      await toggle.hover();
      const bounds = await toggle.evaluate((element) => {
        const input = element.parentElement?.querySelector("input");
        if (!input) throw new Error("入力がありません");
        const control = input.getBoundingClientRect(),
          button = element.getBoundingClientRect();
        return {
          insetTop: button.top - control.top,
          insetBottom: control.bottom - button.bottom,
          insetEnd: control.right - button.right,
        };
      });
      expect(bounds.insetTop).toBeGreaterThanOrEqual(0.75);
      expect(bounds.insetBottom).toBeGreaterThanOrEqual(0.75);
      expect(bounds.insetEnd).toBeGreaterThanOrEqual(0.75);
    }
  }
});

test("主操作とDropdownを接続しメニューを開ける", async ({ page }) => {
  await page.goto("/components/dropdown-menu");
  await page
    .getByText("トリガーのサイズ・アイコンのみ・主要操作との組み合わせ", { exact: true })
    .click();
  const group = page.getByRole("group", { name: "公開操作", exact: true });
  const primary = group.getByRole("button", { name: "公開する", exact: true });
  const trigger = group.getByRole("button", { name: "公開方法を選ぶ", exact: true });
  const left = await primary.boundingBox(),
    right = await trigger.boundingBox();
  if (!left || !right) throw new Error("接続ボタンがありません");
  expect(right.x - left.x - left.width).toBeCloseTo(-1, 1);
  expect(right.y).toBeCloseTo(left.y, 1);
  await trigger.click();
  await expect(
    page.getByRole("menuitem", { name: "日時を指定して公開", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("連続Disclosureは4pxで並び見出しと本文の開始位置を揃える", async ({ page }) => {
  await page.goto("/components/disclosure");
  const group = page.getByRole("group", { name: "提出について", exact: true });
  const rows = group.locator(":scope > details");
  const boxes = await rows.evaluateAll((elements) =>
    elements.map((element) => {
      const r = element.getBoundingClientRect();
      return { y: r.y, bottom: r.bottom };
    }),
  );
  expect((boxes[1]?.y ?? Infinity) - (boxes[0]?.bottom ?? 0)).toBeCloseTo(4, 1);
  await group.getByText("提出できるファイル", { exact: true }).click();
  const alignment = await rows.first().evaluate((element) => {
    const label = element.querySelector("summary > .label"),
      body = element.querySelector(".body > p");
    if (!label || !body) throw new Error("内容がありません");
    return label.getBoundingClientRect().x - body.getBoundingClientRect().x;
  });
  expect(alignment).toBeCloseTo(0, 1);
});

test("Disclosureは単一展開・入力保持・狭幅の長文と入れ子を保つ", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/components/disclosure");
  const faq = page.getByRole("group", { name: "受付について", exact: true });
  await faq.locator("summary").filter({ hasText: "結果の確認" }).press("Enter");
  await expect(faq.locator("details[open]")).toHaveCount(1);
  await expect(faq.getByText("案件の一覧から確認できます。", { exact: true })).toBeVisible();
  const summary = page.locator("summary").filter({ hasText: "通知先を変更する" });
  await summary.press("Space");
  const email = page.getByRole("textbox", { name: "メールアドレス", exact: true });
  await email.fill("member@example.com");
  await summary.press("Space");
  await expect(email).toBeHidden();
  await summary.press("Space");
  await expect(email).toHaveValue("member@example.com");
  for (const title of ["入れ子の条件", "法人の場合", "代理で提出する場合"])
    await page.getByText(title, { exact: true }).click();
  await page.locator("summary").filter({ hasText: "提出前に確認してほしい" }).click();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await expect(page.getByText("委任状も添付してください。", { exact: true })).toBeVisible();
  expect(
    await page
      .locator("main")
      .evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
  ).toBe(true);
});

test("Tableは数値の三段階ソートと上流のShift範囲選択を使う", async ({ page }) => {
  await page.goto("/components/table");
  const table = page.getByRole("region", { name: "記事の公開状況", exact: true });
  const records = table.locator("tbody > tr");
  const original = await records.evaluateAll((rows) =>
    rows.map((row) => row.getAttribute("data-record-id")),
  );
  const sort = table.getByRole("button", { name: "閲覧", exact: true });
  await sort.click();
  await expect(table.locator('[data-table-sort-column="views"]')).toHaveAttribute(
    "aria-sort",
    "ascending",
  );
  await sort.click();
  await expect(records.first()).toHaveAttribute("data-record-id", "reading");
  await sort.click();
  expect(
    await records.evaluateAll((rows) => rows.map((row) => row.getAttribute("data-record-id"))),
  ).toEqual(original);
  const checks = table.locator('input[data-table-select-target="item"]');
  await checks.nth(0).check();
  await checks.nth(2).click({ modifiers: ["Shift"] });
  expect(
    await checks.evaluateAll(
      (inputs) =>
        inputs.filter((input) => input instanceof HTMLInputElement && input.checked).length,
    ),
  ).toBe(3);
  await expect(table.locator('input[data-table-select-target="all"]')).toHaveJSProperty(
    "indeterminate",
    true,
  );
  await table.getByRole("button", { name: "選択したIDを確認", exact: true }).click();
  await expect(page.locator('[data-table-demo-target="result"]')).toContainText(
    "guide, reading, news",
  );
  await table.getByRole("button", { name: "選択を解除", exact: true }).click();
  await expect(table.locator(".selection-bar")).toBeHidden();
  await checks.first().check();
  await checks.first().evaluate((element) => {
    if (!(element instanceof HTMLInputElement) || !element.form)
      throw new Error("送信フォームがありません");
    element.form.reset();
  });
  await expect(checks.first()).not.toBeChecked();
  await expect(table.locator(".selection-bar")).toBeHidden();
});

test("Tableのmanualモードは行を動かさず列と方向を通知する", async ({ page }) => {
  await page.goto("/components/table");
  const table = page.getByRole("region", { name: "記事の公開状況", exact: true });
  const rows = table.locator("tbody > tr");
  const original = await rows.allTextContents();
  await table.evaluate((element) => {
    element.setAttribute("data-sort-mode", "manual");
    element.addEventListener("table:sort", (event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (
        typeof detail !== "object" ||
        detail === null ||
        !("column" in detail) ||
        !("direction" in detail)
      )
        return;
      element.setAttribute(
        "data-last-request",
        `${String(detail.column)}:${String(detail.direction)}`,
      );
    });
  });
  await table.getByRole("button", { name: "閲覧", exact: true }).click();
  await expect(table).toHaveAttribute("data-last-request", "views:ascending");
  expect(await rows.allTextContents()).toEqual(original);
});

test("Tableの欠損は末尾に保ちソート要求の取消を尊重する", async ({ page }) => {
  await page.goto("/components/table");
  await page.getByText("無効な行・数値の欠損・負の値・密度", { exact: true }).click();
  const table = page.getByRole("region", { name: "増減の確認", exact: true });
  const sort = table.getByRole("button", { name: "増減", exact: true });
  await sort.click();
  await expect(table.locator("tbody > tr").last()).toContainText("未確定");
  await sort.click();
  await expect(table.locator("tbody > tr").last()).toContainText("未確定");
  await table.evaluate((element) =>
    element.addEventListener("table:beforesort", (event) => event.preventDefault(), { once: true }),
  );
  await sort.click();
  await expect(table.locator('[data-table-sort-column="amount"]')).toHaveAttribute(
    "aria-sort",
    "descending",
  );
  await table.getByRole("checkbox", { name: "比較行をすべて選択", exact: true }).check();
  await expect(
    table.getByRole("checkbox", { name: "未確定の項目を選択", exact: true }),
  ).not.toBeChecked();
});

test("Boardは任意の内容を保って列間移動しEscapeと取消イベントで戻せる", async ({ page }) => {
  await page.goto("/components/board");
  const board = page.getByRole("region", { name: "制作の進行", exact: true });
  const item = board.locator('[data-board-id="estimate"]');
  const check = item.getByRole("checkbox", { name: "見積金額を確認", exact: true });
  await check.check();
  const handle = item.getByRole("button");
  await handle.focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await expect(board.locator('[data-column-id="doing"] [data-board-id="estimate"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(board.locator('[data-column-id="todo"] [data-board-id="estimate"]')).toBeVisible();
  await expect(check).toBeChecked();
  await board.evaluate((element) =>
    element.addEventListener("board:beforemove", (event) => event.preventDefault(), { once: true }),
  );
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(board.locator('[data-column-id="todo"] [data-board-id="estimate"]')).toBeVisible();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(board.locator('[data-column-id="doing"] [data-board-id="estimate"]')).toBeVisible();
  await expect(check).toBeChecked();
});

test("Boardはポインターで空の列へドロップできる", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/board");
  const board = page.getByRole("region", { name: "制作の進行", exact: true });
  const item = board.locator('[data-board-id="guide"]');
  const source = await item.getByRole("button").boundingBox();
  const column = board.locator('[data-column-id="done"]');
  const target = await column.boundingBox();
  if (!source || !target) throw new Error("移動対象がありません");
  await page.mouse.move(source.x + source.width / 2, source.y + source.height / 2);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, target.y + 70, { steps: 12 });
  await expect(column.locator('[data-board-id="guide"]')).toBeVisible();
  await page.mouse.up();
  await expect(item).not.toHaveAttribute("data-moving", "true");
  await expect(column.locator(".title > small")).toHaveText("1");
  await expect(board.locator(".drag-preview")).toHaveCount(0);
});

test("長いMessageListとTagGroupは狭幅と文字拡大でも領域に収まる", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const id of ["message-list", "tag", "file-item", "comparison"]) {
    await page.goto("/components/" + id);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    const main = page.locator("main");
    expect(await main.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
      true,
    );
  }
  await page.goto("/components/message-list");
  await expect(page.getByText("差出人不明", { exact: true })).toBeVisible();
  await expect(page.getByText("（件名なし）", { exact: true })).toBeVisible();
});

test("MessageListは日時や添付の長さで本文列をずらさない", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/components/message-list");
  const list = page.getByRole("list", { name: "長い内容と不足する情報", exact: true });
  const starts = await list
    .locator(".row > .body")
    .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().x));
  expect(starts.length).toBe(4);
  expect(Math.max(...starts) - Math.min(...starts)).toBeLessThan(0.5);
});

test("Toastの閉じる操作は本文右上に残り操作行へ混ざらない", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/components/toast");
  await page.getByRole("button", { name: "結果表示を試す", exact: true }).click();
  const toast = page.locator(".ply-toast").first();
  const close = await toast.getByRole("button", { name: "閉じる", exact: true }).boundingBox();
  const message = await toast.locator(".message").boundingBox();
  if (!close || !message) throw new Error("通知がありません");
  expect(close.x).toBeGreaterThanOrEqual(message.x + message.width);
  expect(close.y).toBeCloseTo(message.y, 1);
});
