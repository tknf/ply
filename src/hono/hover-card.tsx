import type { Child, PropsWithChildren } from "hono/jsx";
import { ActionLink, Button } from "./button";
import { Icon } from "./icon";
import { OverlayClose, OverlayContent, overlayAnchorName } from "./overlay-content";

export type HoverCardProps = PropsWithChildren<{
  id: string;
  label: string;
  title?: string;
  description?: string;
  size?: "compact" | "default" | "wide";
  href?: string;
  closeLabel?: string;
  actions?: Child;
}>;

/** リンクや操作の対象を、hover・focusで開く操作可能なプレビュー。 */
export const HoverCard = ({
  id,
  label,
  title = label,
  description,
  size = "default",
  href,
  closeLabel = "閉じる",
  actions,
  children,
}: HoverCardProps) => {
  const anchor = overlayAnchorName("hover-card", id);
  return (
    <div class="ply-hover-card" data-controller="hover-card">
      {href ? (
        <>
          <ActionLink
            href={href}
            data-hover-card-target="trigger"
            aria-controls={id}
            aria-expanded="false"
            style={`anchor-name: ${anchor}`}
          >
            {label}
          </ActionLink>
          <Button
            class="preview"
            data-hover-card-target="preview"
            data-icon-only="true"
            aria-label={`${label}のプレビューを開く`}
            aria-controls={id}
            aria-expanded="false"
          >
            <Icon name="eye" />
          </Button>
        </>
      ) : (
        <Button
          data-hover-card-target="trigger"
          aria-controls={id}
          aria-expanded="false"
          style={`anchor-name: ${anchor}`}
        >
          {label}
        </Button>
      )}
      <div
        id={id}
        class="panel ply-overlay"
        data-placement="anchor"
        popover="manual"
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
        data-hover-card-target="content"
        data-size={size}
        style={`--ply-overlay-anchor: ${anchor}`}
      >
        <OverlayContent
          title={<strong id={`${id}-title`}>{title}</strong>}
          description={description && <p id={`${id}-description`}>{description}</p>}
          close={<OverlayClose label={closeLabel} data-hover-card-target="close" />}
          actions={actions}
        >
          {children}
        </OverlayContent>
      </div>
    </div>
  );
};
