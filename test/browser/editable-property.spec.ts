import { expect, test } from "@playwright/test";

test("EditablePropertyは値そのものを押しても鉛筆と同じイベントを出し、取り消せば書き始めない", async ({
  page,
}) => {
  await page.goto("/components/editable-property");
  const property = page.locator('[data-example="hono"] .ply-editable-property').first();
  await property.evaluate((element) => {
    const log: string[] = [];
    element.setAttribute("data-log", "");
    for (const name of ["editable:beforeedit", "editable:edit"])
      element.addEventListener(name, (event) => {
        if (!(event instanceof CustomEvent)) return;
        const detail: unknown = event.detail;
        const reason =
          detail && typeof detail === "object" && "reason" in detail ? String(detail.reason) : "";
        log.push(`${name}:${reason}`);
        element.setAttribute("data-log", log.join(","));
        if (name === "editable:beforeedit" && element.hasAttribute("data-block"))
          event.preventDefault();
      });
  });
  const value = property.locator(".value");
  // 取り消すと書き始めず、editable:editも出さない。
  await property.evaluate((element) => element.setAttribute("data-block", ""));
  await value.click();
  await expect(property).toHaveAttribute("data-state", "viewing");
  await expect(property).toHaveAttribute("data-log", "editable:beforeedit:pointer");
  // 取り消さなければ書き始め、鉛筆と同じ順にイベントを出して値の全体を選ぶ。
  await property.evaluate((element) => element.removeAttribute("data-block"));
  await value.click();
  await expect(property).toHaveAttribute("data-state", "editing");
  await expect(property).toHaveAttribute(
    "data-log",
    "editable:beforeedit:pointer,editable:beforeedit:pointer,editable:edit:pointer",
  );
  const input = property.getByRole("textbox", { name: "担当者" });
  await expect(input).toBeFocused();
  expect(
    await input.evaluate((element) =>
      element instanceof HTMLInputElement
        ? element.selectionEnd === element.value.length && element.selectionStart === 0
        : false,
    ),
  ).toBe(true);
});
