import type { ButtonProps } from "./button";
import { Button } from "./button";
import { Icon, type IconName } from "./icon";
import { Keycap } from "./keycap";
import { overlayAnchorName } from "./overlay-content";

export type FilterMenuOption = {
  value: string;
  label: string;
  icon?: IconName;
  /** 表示用の補助表記。ショートカットの登録は利用側で行う。 */
  shortcut?: string;
  selected?: boolean;
  disabled?: boolean;
};
export type FilterMenuProps = {
  id: string;
  /** 開く操作の名前。 */
  label: string;
  /** 紙の見出し（「ラベルを選ぶ」「担当を決める」など）。 */
  title: string;
  options: readonly FilterMenuOption[];
  /** 複数を選べる時（ラベル・タグ）。一つだけの時（担当）は選ぶと閉じる。 */
  multiple?: boolean;
  /** 渡すと、選んだ値をこの名前の隠し入力で送る。 */
  name?: string;
  placeholder?: string;
  /** 渡すと、絞り込みの欄の隣に「新しく作る」を置き、押すとfilter-menu:createで打った文字を知らせる。 */
  createLabel?: string;
  emptyLabel?: string;
  icon?: IconName;
  iconOnly?: boolean;
  variant?: ButtonProps["variant"];
  align?: "start" | "end";
  disabled?: boolean;
};

/**
 * ラベル付けや担当の割り当てのように、候補を打って絞り込みながら選ぶ小さな紙。
 * 見た目はDropdownMenuと同じ青の面だが、中に文字の欄を持つので、メニューではなく
 * コンボボックス（絞り込みの欄）とリストボックス（候補）の組み合わせにする。
 * 選ぶとfilter-menu:selectで値と選んだかどうかを知らせる。
 */
export const FilterMenu = ({
  id,
  label,
  title,
  options,
  multiple = false,
  name,
  placeholder = "絞り込む…",
  createLabel,
  emptyLabel = "当てはまる候補はありません",
  icon,
  iconOnly = false,
  variant = "secondary",
  align = "start",
  disabled,
}: FilterMenuProps) => {
  const anchor = overlayAnchorName("popover", id);
  return (
    <div
      class="ply-filter-menu"
      data-controller="filter-menu"
      data-filter-menu-multiple-value={multiple ? "true" : "false"}
      data-align={align}
    >
      <Button
        variant={variant}
        disabled={disabled}
        popovertarget={`${id}-panel`}
        style={`anchor-name: ${anchor}`}
        aria-haspopup="dialog"
        aria-controls={`${id}-panel`}
        aria-label={iconOnly ? label : undefined}
        data-icon-only={iconOnly ? "true" : undefined}
      >
        {icon && <Icon name={icon} />}
        {!iconOnly && label}
        {!iconOnly && <Icon name="caret" />}
      </Button>
      <div
        id={`${id}-panel`}
        popover="auto"
        class="panel ply-overlay"
        data-placement="anchor"
        data-align={align}
        style={`--ply-overlay-anchor: ${anchor}`}
        role="dialog"
        aria-labelledby={`${id}-title`}
        data-filter-menu-target="panel"
        data-action="toggle->filter-menu#opened"
      >
        <div class="search">
          <span class="field">
            <Icon name="search" />
            <input
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={`${id}-list`}
              aria-autocomplete="list"
              aria-label={placeholder}
              placeholder={placeholder}
              autocomplete="off"
              data-filter-menu-target="input"
              data-action="input->filter-menu#filter keydown->filter-menu#key"
            />
          </span>
          {createLabel && (
            <Button class="create" size="compact" data-action="filter-menu#create">
              <Icon name="plus" />
              {createLabel}
            </Button>
          )}
        </div>
        <p class="title" id={`${id}-title`}>
          {title}
        </p>
        <ul
          class="options"
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-title`}
          aria-multiselectable={multiple ? "true" : undefined}
        >
          {options.map((option, index) => (
            <li
              id={`${id}-option-${index}`}
              class="option"
              role="option"
              aria-selected={option.selected ? "true" : "false"}
              aria-disabled={option.disabled ? "true" : undefined}
              data-selected={option.selected ? "true" : "false"}
              data-disabled={option.disabled ? "true" : undefined}
              data-value={option.value}
              data-label={option.label}
              data-filter-menu-target="option"
              data-action="click->filter-menu#choose"
            >
              <span class="mark" aria-hidden="true">
                {option.icon ? <Icon name={option.icon} /> : <Icon name="check" />}
              </span>
              <span class="label">{option.label}</span>
              {option.shortcut && (
                <Keycap
                  class="shortcut"
                  keys={[option.shortcut]}
                  size="small"
                  inverse
                  aria-hidden="true"
                />
              )}
              {option.icon && (
                <span class="check" aria-hidden="true">
                  <Icon name="check" />
                </span>
              )}
              {name && (
                <input type="hidden" name={name} value={option.value} disabled={!option.selected} />
              )}
            </li>
          ))}
        </ul>
        <p class="empty" data-filter-menu-target="empty" hidden>
          {emptyLabel}
        </p>
      </div>
    </div>
  );
};
