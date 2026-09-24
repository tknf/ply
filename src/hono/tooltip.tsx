import type { Child } from "hono/jsx";
import { overlayAnchorName } from "./overlay-content";

export type TooltipTriggerAttributes = {
  "aria-describedby": string;
  "data-tooltip-target": "trigger";
  style: string;
};

export type TooltipProps = {
  id: string;
  text: string;
  trigger: (attributes: TooltipTriggerAttributes) => Child;
  delay?: number;
};

/** 短い非対話的な補足。操作や必須の説明はトリガー側に残す。 */
export const Tooltip = ({ id, text, trigger, delay = 150 }: TooltipProps) => {
  const anchor = overlayAnchorName("tooltip", id);
  const attributes = {
    "aria-describedby": id,
    "data-tooltip-target": "trigger",
    style: `anchor-name: ${anchor}`,
  } satisfies TooltipTriggerAttributes;

  return (
    <span
      class="ply-tooltip"
      data-controller="tooltip"
      data-tooltip-delay-value={Number.isFinite(delay) && delay >= 0 ? delay : 150}
    >
      {trigger(attributes)}
      <span
        id={id}
        class="content ply-overlay"
        role="tooltip"
        popover="manual"
        data-tooltip-target="content"
        style={`position-anchor: ${anchor}`}
      >
        {text}
      </span>
    </span>
  );
};
