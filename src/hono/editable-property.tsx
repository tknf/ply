import { Button } from "./button";
import { Input, Textarea } from "./field";
import { Icon } from "./icon";

export type EditablePropertyProps = {
  id: string;
  label: string;
  name: string;
  value?: string;
  emptyLabel?: string;
  required?: boolean;
  disabled?: boolean;
  form?: string;
  maxLength?: number;
  /** 複数行の値。複数行の欄で書き、改行はそのまま表示する。 */
  multiline?: boolean;
};

/**
 * 値の位置で文字列を編集する。保存処理は利用側がeditable:commitで受け取る。
 * 一行・複数行とも、確定はControl+Enter / Meta+Enter、取消はEscapeにそろえる。
 */
export const EditableProperty = ({
  id,
  label,
  name,
  value = "",
  emptyLabel = "未登録",
  required,
  disabled,
  form,
  maxLength,
  multiline = false,
}: EditablePropertyProps) => {
  const field = {
    id: `${id}-input`,
    "aria-labelledby": `${id}-label`,
    name,
    required,
    disabled,
    form,
    maxLength,
    "data-editable-target": "input",
    "data-editable-property-target": "input",
  };
  return (
    <div
      class="ply-editable-property"
      data-multiline={multiline ? "true" : undefined}
      data-controller="editable editable-property"
      data-editable-commit-key-value="modifier-enter"
      data-action="editable:commit->editable-property#commit editable:edit->editable-property#select"
      data-editable-property-empty-value={emptyLabel}
    >
      <span class="label" id={`${id}-label`}>
        {label}
      </span>
      <div class="preview" data-editable-target="preview" hidden>
        <span
          class="value"
          data-editable-property-target="value"
          data-action="click->editable-property#start"
          data-empty={value ? undefined : "true"}
        >
          {value || emptyLabel}
        </span>
        <Button
          class="edit"
          type="button"
          variant="link"
          data-icon-only="true"
          aria-label={`${label}を編集`}
          data-editable-target="edit"
          aria-controls={`${id}-editor`}
          aria-expanded="false"
          disabled={disabled}
        >
          <Icon name="pencil" />
        </Button>
      </div>
      <div class="editor" id={`${id}-editor`} data-editable-target="editor">
        {/* textareaの初期値は属性ではなく中身に書く。 */}
        {multiline ? <Textarea {...field}>{value}</Textarea> : <Input {...field} value={value} />}
        <div class="actions">
          {/* 確定は小さい主操作、取消は文字だけの操作にして、書いている値より重くしない。面の下に並べる。 */}
          <Button
            type="button"
            variant="primary"
            size="compact"
            data-editable-target="save"
            aria-keyshortcuts="Control+Enter Meta+Enter"
          >
            確定
          </Button>
          <Button type="button" variant="link" size="compact" data-editable-target="cancel">
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};
