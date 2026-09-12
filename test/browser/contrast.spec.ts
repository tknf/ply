import { expect, test } from "@playwright/test";

const cases = [
  {
    id: "surface",
    targets: [
      { selector: '[data-example="hono"] .ply-surface p', property: "color", threshold: 7 },
    ],
  },
  {
    id: "action-list",
    targets: [
      { selector: '[data-example="hono"] .ply-action-title', property: "color", threshold: 7 },
      { selector: '[data-example="hono"] .ply-action-list small', property: "color", threshold: 7 },
      { selector: '[data-example="hono"] .ply-action-preview p', property: "color", threshold: 7 },
    ],
  },
  {
    id: "button",
    targets: [
      { selector: '[data-example="hono"] .ply-button', property: "color", threshold: 4.5 },
      {
        selector: '[data-example="hono"] .ply-button:not([data-variant="link"])',
        property: "border-inline-start-color",
        threshold: 3,
      },
    ],
  },
  {
    id: "badge",
    targets: [{ selector: '[data-example="hono"] .ply-badge', property: "color", threshold: 4.5 }],
  },
  {
    id: "input-group",
    targets: [
      {
        selector: '[data-example="hono"] .ply-input:not(:disabled)',
        property: "color",
        threshold: 7,
      },
      { selector: '[data-example="hono"] .ply-input-affix', property: "color", threshold: 4.5 },
      {
        selector:
          '[data-example="hono"] .ply-input-group-control:has(> .ply-input[data-invalid="true"])',
        property: "border-inline-start-color",
        threshold: 3,
      },
    ],
  },
  {
    id: "switch",
    targets: [
      { selector: '[data-example="hono"] .ply-switch > span', property: "color", threshold: 7 },
      { selector: '[data-example="hono"] .ply-switch small', property: "color", threshold: 7 },
      { selector: '[data-example="hono"] .ply-switch > input', property: "color", threshold: 3 },
    ],
  },
  {
    id: "notice",
    targets: [
      { selector: '[data-example="hono"] .ply-notice', property: "color", threshold: 7 },
      {
        selector:
          '[data-example="hono"] .ply-notice:is([data-tone="warning"], [data-tone="danger"])',
        property: "border-inline-start-color",
        threshold: 3,
      },
    ],
  },
  {
    id: "field",
    targets: [
      {
        selector: '[data-example="hono"] .ply-input:not(:disabled)',
        property: "color",
        threshold: 7,
      },
      { selector: '[data-example="hono"] .ply-input:disabled', property: "color", threshold: 4.5 },
      {
        selector: '[data-example="hono"] .ply-input[data-invalid="true"]',
        property: "border-inline-start-color",
        threshold: 3,
      },
      {
        selector: '[data-example="hono"] .ply-field-help, [data-example="hono"] .ply-field-error',
        property: "color",
        threshold: 7,
      },
      {
        selector: '[data-example="hono"] .ply-field-error > .ply-icon',
        property: "color",
        threshold: 3,
      },
    ],
  },
  {
    id: "image-frame",
    targets: [
      {
        selector: '[data-example="hono"] .ply-image-frame > span',
        property: "color",
        threshold: 4.5,
      },
    ],
  },
  {
    id: "tabs",
    targets: [
      { selector: '[data-example="hono"] [role="tab"]', property: "color", threshold: 4.5 },
    ],
  },
  {
    id: "file-item",
    targets: [
      { selector: '[data-example="hono"] .ply-file-item p', property: "color", threshold: 7 },
    ],
  },
];

for (const { id, targets } of cases)
  test(`${id}の変種を実際の背景でコントラスト測定する`, async ({ page }, testInfo) => {
    await page.goto(`/components/${id}`);
    const measurements = await page.evaluate((targets) => {
      const color = (value: string) => {
        const numbers = value.match(/[\d.]+/g)?.map(Number);
        if (!numbers || numbers.length < 3) throw new Error(`未対応の描画色: ${value}`);
        const [r = 0, g = 0, b = 0, a = 1] = numbers;
        return { r, g, b, a };
      };
      const composite = (front: ReturnType<typeof color>, back: ReturnType<typeof color>) => ({
        r: front.r * front.a + back.r * (1 - front.a),
        g: front.g * front.a + back.g * (1 - front.a),
        b: front.b * front.a + back.b * (1 - front.a),
        a: 1,
      });
      const luminance = (value: ReturnType<typeof color>) => {
        const linear = (channel: number) => {
          const c = channel / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        return linear(value.r) * 0.2126 + linear(value.g) * 0.7152 + linear(value.b) * 0.0722;
      };
      return targets.flatMap(({ selector, property, threshold }) => {
        const elements = Array.from(document.querySelectorAll(selector));
        if (!elements.length) throw new Error(`測定対象がありません: ${selector}`);
        return elements.map((element) => {
          const chain: Element[] = [];
          for (let current: Element | null = element; current; current = current.parentElement)
            chain.unshift(current);
          let background = color("rgb(255 255 255)");
          for (const ancestor of chain) {
            // 境界は外側、文字は要素自身の塗りを含む背景と比較する。
            if (property !== "color" && ancestor === element) continue;
            background = composite(color(getComputedStyle(ancestor).backgroundColor), background);
          }
          const foreground = composite(
            color(getComputedStyle(element).getPropertyValue(property)),
            background,
          );
          const first = luminance(foreground);
          const second = luminance(background);
          return {
            selector,
            label: element.textContent?.trim().slice(0, 60),
            property,
            threshold,
            ratio: (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05),
            foreground,
            background,
          };
        });
      });
    }, targets);
    await testInfo.attach("contrast", {
      body: JSON.stringify(measurements, null, 2),
      contentType: "application/json",
    });
    for (const measurement of measurements)
      expect(measurement.ratio, measurement.selector).toBeGreaterThanOrEqual(measurement.threshold);
  });
