import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Field, Input } from "./field";
import { Icon } from "./icon";

export type CopyFieldProps = {
  /** 欄のid。ラベルと補足の関連付けに使う。 */
  id: string;
  /** 欄のラベル。 */
  label: string;
  /** 写す値。読み取り専用の欄に出し、送信はしない。 */
  value: string;
  /** 欄の下に出す淡い補足。 */
  help?: string;
  /** 写す印の読み上げ名とツールチップ。 */
  copyLabel?: string;
  /** 写せた時に読み上げる文言。 */
  copiedLabel?: string;
  /** 欄の終わりに置く操作（リンクを作り直すなど）。 */
  actions?: Child;
};

/**
 * 公開リンクや招待リンクのような、写して使う値の欄。写す操作は欄の終わりの丸い印で、
 * 写すとチェックに変わり、しばらくして元に戻る。写す動きはClipboardController、結果の表示はCopyFieldControllerが持つ。
 */
export const CopyField = ({
  id,
  label,
  value,
  help,
  copyLabel = "写す",
  copiedLabel = "写しました",
  actions,
}: CopyFieldProps) => (
  <div
    class="ply-copy-field"
    data-controller="clipboard copy-field"
    data-copy-field-copied-value={copiedLabel}
  >
    <Field id={id} label={label} help={help}>
      {(control) => (
        <div class="row">
          <Input
            {...control}
            value={value}
            readonly
            data-clipboard-target="source"
            data-action="focus->copy-field#select"
          />
          <Button
            data-icon-only="true"
            aria-label={copyLabel}
            title={copyLabel}
            data-clipboard-target="trigger"
            data-copy-field-target="trigger"
          >
            <Icon name="copy" class="copy" />
            <Icon name="check" class="copied" />
          </Button>
          {actions}
        </div>
      )}
    </Field>
    <p class="ply-visually-hidden" role="status" data-copy-field-target="status" />
  </div>
);
