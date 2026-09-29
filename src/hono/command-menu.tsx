import { Button } from "./button";
import { ActionTile } from "./action-tile";
import { InputGroup } from "./input-group";
import { Icon, type IconName } from "./icon";
import { Keycap } from "./keycap";

type CommandLabel = {
  label: string;
  description?: string;
  icon?: IconName;
  keywords?: readonly string[];
  disabled?: boolean;
  accent?: "blue" | "green" | "amber" | "coral";
};
export type CommandLink = CommandLabel & { href: string; current?: boolean };
export type CommandItem = CommandLink | (CommandLabel & { value: string });
export type CommandGroup = { label: string; items: readonly CommandItem[] };
export type CommandMenuProps = {
  id: string;
  label: string;
  shortcuts: readonly CommandLink[];
  groups: readonly CommandGroup[];
  columns?: 3 | 4;
  icon?: IconName;
  shortcut?: "shift+j" | "mod+k";
  action?: string;
};

const Destination = ({ item }: { item: CommandLink }) => {
  const content = (
    <>
      <span class="icon">
        <Icon name={item.icon ?? "arrow"} fill />
      </span>
      <span class="name">{item.label}</span>
      {item.description && <span class="context">{item.description}</span>}
      {item.current && (
        <span class="current">
          <Icon name="check" />
          <span class="ply-visually-hidden">現在地</span>
        </span>
      )}
    </>
  );
  return item.disabled ? (
    <span class="link" role="link" aria-disabled="true">
      {content}
    </span>
  ) : (
    <a class="link" href={item.href} tabindex={0} aria-current={item.current ? "page" : undefined}>
      {content}
    </a>
  );
};

/** 主要な入口と、仕事・人・ページへの移動を一つの場所へまとめる。 */
export const CommandMenu = ({
  id,
  label,
  shortcuts,
  groups,
  columns = 4,
  icon = "layers",
  shortcut,
  action,
}: CommandMenuProps) => (
  <div
    class="ply-command-menu"
    data-controller="command-menu"
    data-action={action}
    data-command-menu-shortcut={shortcut}
  >
    <Button
      size="large"
      popovertarget={id}
      data-command-menu-target="trigger"
      aria-haspopup="dialog"
      aria-controls={id}
      aria-expanded="false"
      aria-keyshortcuts={
        shortcut === "mod+k" ? "Control+k Meta+k" : shortcut === "shift+j" ? "Shift+j" : undefined
      }
    >
      <Icon name={icon} fill />
      {label}
      <Icon name="caret" />
    </Button>
    <div
      class="panel"
      popover="auto"
      role="dialog"
      id={id}
      aria-label={`${label}のコマンド`}
      data-command-menu-target="panel"
    >
      <header class="heading">
        <span class="name">{label}</span>
        <Button
          size="compact"
          aria-label="コマンドを閉じる"
          popovertarget={id}
          popovertargetaction="hide"
          data-command-menu-target="close"
        >
          閉じる
        </Button>
      </header>
      {shortcuts.length > 0 && (
        <nav class="shortcuts" aria-label="よく使う場所" data-columns={columns}>
          {shortcuts.map((item) => (
            <div class="shortcut">
              {/* 入口はActionTile。Tableの一括操作と同じタイルを使う。 */}
              <ActionTile
                label={item.label}
                icon={item.icon ?? "arrow"}
                accent={item.accent}
                href={item.href}
                current={item.current}
                disabled={item.disabled}
                tabindex={0}
                aria-description={item.description}
              />
            </div>
          ))}
        </nav>
      )}
      <div class="search">
        <InputGroup
          id={`${id}-search`}
          size="large"
          type="search"
          role="combobox"
          aria-label="仕事・人・ページを探す"
          aria-haspopup="tree"
          aria-autocomplete="list"
          aria-controls={`${id}-results`}
          aria-expanded="false"
          autocomplete="off"
          autofocus
          placeholder="仕事・人・ページを探す…"
          prefix={<Icon name="search" />}
          data-command-menu-target="search"
        />
      </div>
      <div class="results" id={`${id}-results`} role="tree" aria-label="移動先・操作">
        {groups.map((group, groupIndex) => (
          <section
            class="group"
            role="group"
            aria-labelledby={`${id}-group-${groupIndex}`}
            data-command-menu-target="group"
            hidden={group.items.length === 0}
          >
            <h2 id={`${id}-group-${groupIndex}`}>{group.label}</h2>
            <ul class="list" role="none">
              {group.items.map((item, itemIndex) => (
                <li
                  class="entry"
                  role="treeitem"
                  id={`${id}-entry-${groupIndex}-${itemIndex}`}
                  aria-selected="false"
                  aria-disabled={item.disabled ? "true" : undefined}
                  data-disabled={item.disabled ? "true" : undefined}
                  data-accent={item.accent}
                  data-command-menu-target="entry"
                  data-search={[item.label, item.description, ...(item.keywords ?? [])]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {"href" in item ? (
                    <Destination item={item} />
                  ) : (
                    <Button
                      class="command"
                      variant="link"
                      disabled={item.disabled}
                      data-command-value={item.value}
                      aria-description={item.description}
                    >
                      {item.icon && <Icon name={item.icon} />}
                      {item.label}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p class="empty" data-command-menu-target="empty" hidden>
          見つかりませんでした。別の言葉で探してみてください。
        </p>
      </div>
      <footer class="help" aria-label="キーボード操作">
        <span class="hint">
          <Keycap keys={["↑", "↓"]} />
          選択
        </span>
        <span class="hint">
          <Keycap keys={["Enter"]} />
          実行
        </span>
        <span class="hint">
          <Keycap keys={["Esc"]} />
          閉じる
        </span>
        {shortcut && (
          <span class="hint">
            <Keycap keys={shortcut === "shift+j" ? ["Shift", "J"] : ["Ctrl / Cmd", "K"]} />
            開閉
          </span>
        )}
      </footer>
      <span class="ply-visually-hidden" role="status" data-command-menu-target="status" />
    </div>
  </div>
);
