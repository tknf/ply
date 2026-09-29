import type { Child, PropsWithChildren } from "hono/jsx";
import { Button, type ButtonProps } from "./button";
import { Icon, type IconName } from "./icon";
import { OverlayClose, OverlayContent, overlayAnchorName } from "./overlay-content";
import { Tooltip } from "./tooltip";

export type PopoverProps = PropsWithChildren<{
  /** 紙のid。画面内で一意にする。開く操作の`popovertarget`と、CSSのアンカー名の元になる。 */
  id: string;
  /** 開く操作の文言。iconOnlyの時は`aria-label`として読み上げる。 */
  label: string;
  /** 紙の見出し。省略するとlabelを使う。 */
  title?: string;
  /** 見出しの下に置く短い説明。紙の説明（`aria-describedby`）になる。 */
  description?: string;
  /** 紙を開く操作のどちらの端に揃えるか。 */
  align?: "start" | "end";
  /** 紙の幅。compactは16rem、defaultは20rem、wideは28remを上限にする。 */
  size?: "compact" | "default" | "wide";
  /** 開く操作の文言の前に置く印。 */
  icon?: IconName;
  /** 開く操作を印だけにする。iconが無ければinfoの印を出す。 */
  iconOnly?: boolean;
  /** 開く操作を押せなくする。 */
  disabled?: boolean;
  /** 開く操作の見た目。値の意味はButtonと同じ。 */
  triggerVariant?: ButtonProps["variant"];
  /** 見出しの横の閉じる操作の名前。 */
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
  /** 紙の下の操作欄に並べる操作。 */
  actions?: Child;
  /** 文字の向き。rtlでは始端と末端が入れ替わる。 */
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
