import { Button } from "./button";
import { Input } from "./field";
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
};

/** 値の位置で短い文字列を編集する。保存処理は利用側がeditable:commitで受け取る。 */
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
}: EditablePropertyProps) => (
  <div
    class="ply-editable-property"
    data-controller="editable editable-property"
    data-action="editable:commit->editable-property#sync"
    data-editable-property-empty-value={emptyLabel}
  >
    <span class="label" id={`${id}-label`}>
      {label}
    </span>
    <div class="preview" data-editable-target="preview" hidden>
      <span class="value" data-editable-property-target="value">
        {value || emptyLabel}
      </span>
      <Button
        class="edit"
        type="button"
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
      <Input
        id={`${id}-input`}
        aria-labelledby={`${id}-label`}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        form={form}
        maxLength={maxLength}
        data-editable-target="input"
        data-editable-property-target="input"
      />
      <div class="actions">
        <Button type="button" variant="primary" data-editable-target="save">
          確定
        </Button>
        <Button type="button" data-editable-target="cancel">
          取消
        </Button>
      </div>
    </div>
  </div>
);
