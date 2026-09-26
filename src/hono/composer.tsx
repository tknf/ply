import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Field, Textarea } from "./field";
import { classes, type ElementProps } from "./types";

export type ComposerProps = Omit<ElementProps<"form">, "children"> & {
  id: string;
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  submitLabel: string;
  busy?: boolean;
  error?: string;
  attachments?: Child;
  actions?: Child;
  /** 便箋の頭に、名前の隣へ置く宛先（人やチャンネル）。 */
  to?: Child;
  /** 便箋の頭の右端に置く状態（下書きの保存など）。 */
  status?: Child;
  /**
   * 本文の欄の代わりに置く編集部品（リッチテキストの編集部品やcontenteditableなど）。
   * 渡すと便箋の罫線と紙全体の輪はこの部品にかかり、送信する値の受け渡しは部品の側で行う。
   */
  editor?: Child;
};

/** 便箋の頭の、宛先と状態。 */
const letterhead = (to: Child, status: Child) => (
  <>
    {to != null && to !== false && <span class="to">{to}</span>}
    {status != null && status !== false && <span class="status">{status}</span>}
  </>
);

/** 本文と添付、送信操作の配置。送信先と保存処理は利用側が指定する。 */
export const Composer = ({
  id,
  label,
  name,
  value,
  placeholder,
  rows = 4,
  required,
  submitLabel,
  busy = false,
  error,
  attachments,
  actions,
  to,
  status,
  editor,
  class: className,
  ...attributes
}: ComposerProps) => (
  <form {...attributes} id={id} class={classes("ply-composer", className)} aria-busy={busy}>
    {editor != null && editor !== false ? (
      <div class="ply-field">
        <div class="heading">
          <span class="label" id={`${id}-body-label`}>
            {label}
          </span>
          {letterhead(to, status)}
        </div>
        <div class="editor" role="group" aria-labelledby={`${id}-body-label`}>
          {editor}
        </div>
      </div>
    ) : (
      <Field id={`${id}-body`} label={label} error={error} status={letterhead(to, status)}>
        {(field) => (
          <Textarea
            {...field}
            name={name}
            rows={rows}
            required={required}
            placeholder={placeholder}
          >
            {value}
          </Textarea>
        )}
      </Field>
    )}
    {attachments && <div class="attachments">{attachments}</div>}
    <div class="footer">
      {actions && <div class="actions">{actions}</div>}
      <Button type="submit" variant="primary" busy={busy} busyLabel="送信中…">
        {submitLabel}
      </Button>
    </div>
  </form>
);
