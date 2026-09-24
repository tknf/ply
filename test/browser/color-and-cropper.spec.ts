import { expect, test } from "@playwright/test";

test("ColorPickerの色相操作がフォーム値と表示色を同期する", async ({ page }) => {
  await page.goto("/components/color-picker");
  const picker = page.locator("#color-picker-brand");
  const hue = picker.getByRole("slider", { name: "色相" });

  await expect(picker).toHaveAttribute("data-state", "idle");
  await hue.press("ArrowRight");
  const nextHue = await hue.inputValue();
  expect(Number(nextHue)).toBeGreaterThan(215);
  await expect(picker).toHaveCSS("--color-picker-hue", nextHue);
  await expect(picker.getByRole("slider", { name: "彩度" })).toHaveValue("68");
});

test("ImageCropperの移動操作が位置スライダーを同期する", async ({ page }) => {
  await page.goto("/components/image-cropper");
  const cropper = page.locator("#hono-image-cropper");

  await expect(cropper).toHaveAttribute("data-state", "idle");
  await cropper.getByRole("button", { name: "選択範囲を移動" }).press("ArrowRight");
  await expect(cropper).toHaveCSS("--image-cropper-x", "13");
  await expect(cropper.locator('[data-image-cropper-target="xControl"]')).toHaveValue("13");
});
