import { expect, test } from "@playwright/test";

test("↑↓は空き（null）をまたいでも同じ曜日の前後の週へ移る", async ({ page }) => {
  await page.goto("/components/calendar");
  const calendar = page.getByRole("region", { name: "2026年9月の平日から選ぶ", exact: true });
  const day = (date: string) => calendar.locator(`[data-calendar-value="${date}"]`);
  await day("2026-09-15").focus();
  // 並んだボタンの7つ後（9月24日）ではなく、7日後の同じ火曜日へ移る。
  await page.keyboard.press("ArrowDown");
  await expect(day("2026-09-22")).toBeFocused();
  await expect(day("2026-09-22")).toHaveAttribute("tabindex", "0");
  await page.keyboard.press("ArrowDown");
  await expect(day("2026-09-29")).toBeFocused();
  // 表示の外（10月6日）には移らない。
  await page.keyboard.press("ArrowDown");
  await expect(day("2026-09-29")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(day("2026-09-08")).toBeFocused();

  // 7日後の日が選べない時（9月23日）は動かない。
  await day("2026-09-16").focus();
  await page.keyboard.press("ArrowDown");
  await expect(day("2026-09-16")).toBeFocused();
});
