import type { Child, PropsWithChildren } from "hono/jsx";
import { Button, type ButtonProps } from "./button";
import { Icon, type IconName } from "./icon";
import { OverlayClose, OverlayContent, overlayAnchorName } from "./overlay-content";
import { Tooltip } from "./tooltip";

export type PopoverProps = PropsWithChildren<{
  id: string;
  label: string;
  title?: string;
  description?: string;
  align?: "start" | "end";
  size?: "compact" | "default" | "wide";
  icon?: IconName;
  iconOnly?: boolean;
  disabled?: boolean;
  triggerVariant?: ButtonProps["variant"];
  closeLabel?: string;
  /**
   * 開いた時に移る先。titleは見出し（既定）。contentは中身のautofocusを付けた欄へ移り、
   * 開いてすぐ打ち始める物（EmojiPickerの探す欄など）に使う。
   */
  initialFocus?: "title" | "content";
  /** 見出しを読み上げだけに残し、画面には出さない。開く操作の名前で中身が分かる小さな板に使う。 */
  titleHidden?: boolean;
  /** 印だけの開く操作に、指を載せた時とフォーカスした時の名前をTooltipで出す。既定は出さない。 */
  tooltip?: boolean;
  actions?: Child;
  dir?: "ltr" | "rtl";
}>;

/** 非モーダルの補足表示。開閉は標準Popover API、位置指定はCSSを優先する。 */
export const Popover = ({
  id,
  label,
  title = label,
  description,
  align = "start",
  size = "default",
  icon,
  iconOnly = false,
  disabled,
  triggerVariant = "secondary",
  closeLabel = "閉じる",
  initialFocus = "title",
  tooltip = false,
  titleHidden = false,
  actions,
  dir,
  children,
}: PopoverProps) => {
  const anchor = overlayAnchorName("popover", id);
  const trigger = (extra?: { style: string; "data-tooltip-target": "trigger" }) => (
    <Button
      variant={triggerVariant}
      disabled={disabled}
      popovertarget={id}
      style={extra ? `${extra.style}, ${anchor}` : `anchor-name: ${anchor}`}
      data-popover-target="trigger"
      data-tooltip-target={extra?.["data-tooltip-target"]}
      aria-haspopup="dialog"
      aria-controls={id}
      aria-label={iconOnly ? label : undefined}
      data-icon-only={iconOnly ? "true" : undefined}
    >
      {icon && <Icon name={icon} />}
      {iconOnly ? !icon && <Icon name="info" /> : label}
    </Button>
  );
  return (
    <div class="ply-popover" data-controller="popover" data-align={align} dir={dir}>
      {tooltip && iconOnly ? (
        // 名前はaria-labelで読むので、Tooltipの説明の関連付けは付けず、見た目の名前だけを出す。
        <Tooltip
          id={`${id}-tooltip`}
          text={label}
          trigger={({ style, "data-tooltip-target": target }) =>
            trigger({ style, "data-tooltip-target": target })
          }
        />
      ) : (
        trigger()
      )}
      <div
        id={id}
        popover="auto"
        class="panel ply-overlay"
        data-placement="anchor"
        style={`--ply-overlay-anchor: ${anchor}`}
        data-popover-target="panel"
        data-align={align}
        data-size={size}
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        <OverlayContent
          title={
            <h3
              id={`${id}-title`}
              class={titleHidden ? "ply-visually-hidden" : undefined}
              tabindex={-1}
              autofocus={initialFocus === "title"}
            >
              {title}
            </h3>
          }
          description={description && <p id={`${id}-description`}>{description}</p>}
          close={<OverlayClose label={closeLabel} popovertarget={id} popovertargetaction="hide" />}
          actions={actions}
        >
          {children}
        </OverlayContent>
      </div>
    </div>
  );
};
