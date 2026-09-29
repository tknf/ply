import type { Child } from "hono/jsx";
import { Button } from "./button";
import { Icon, type IconName } from "./icon";
import { classes, type ElementProps } from "./types";

export type TextEditorTool =
  | "bold"
  | "italic"
  | "strike"
  | "link"
  | "heading"
  | "quote"
  | "code"
  | "bullets"
  | "numbers"
  | "attach"
  | "undo"
  | "redo";

/** 道具の名前と印。どのエディターとも、ボタンのdata-text-editor-toolの名前でつなぐ。 */
const tools: Record<TextEditorTool, { label: string; icon: IconName }> = {
  bold: { label: "太字", icon: "bold" },
  italic: { label: "斜体", icon: "italic" },
  strike: { label: "取り消し線", icon: "strike" },
  link: { label: "リンク", icon: "link" },
  heading: { label: "見出し", icon: "heading" },
  quote: { label: "引用", icon: "quote" },
  code: { label: "コード", icon: "code" },
  bullets: { label: "箇条書き", icon: "bullets" },
  numbers: { label: "番号付きの箇条書き", icon: "numbers" },
  attach: { label: "ファイルを添える", icon: "attach" },
  undo: { label: "元に戻す", icon: "undo" },
  redo: { label: "やり直す", icon: "redo" },
};

export type TextEditorProps = Omit<ElementProps<"textarea">, "children"> & {
  /**
   * 書く面のID。textareaに付け、道具の並びのaria-controlsが指す。
   * editorを渡す時は、その書く面の要素に同じIDを付ける。
   */
  id: string;
  /** 書く面の読み上げ名。道具の並びの名前（「〜の書式」）にも使う。editorを渡した時は書く面に付かない。 */
  label: string;
  /** 道具の並び。"|"で区切りを入れる。 */
  tools?: readonly (TextEditorTool | "|")[];
  /** 道具を書く面の上（コメントなど、既定）と下（返信・日記など）のどちらに置くか。 */
  placement?: "top" | "bottom";
  /**
   * 書く面の代わりに置く編集部品（リッチテキストのエディターが描くcontenteditableの要素）。渡さなければtextareaを置く。
   * 道具の並びのidは`${id}-toolbar`。エディターとのつなぎ方は、下のTextEditorの説明を参照。
   */
  editor?: Child;
  /** 道具の並びの終わりに置く操作（送信・下書きの保存など）。 */
  actions?: Child;
};

/**
 * 返信や日記、コメントに使う、書式の道具を並べた書く面。
 * 見た目と道具の並びだけを持ち、特定のエディターには依存しない。書式を付ける動きは利用側のエディターに任せ、
 * 道具のボタンのdata-text-editor-tool（"bold"など）を読んでエディターの操作を呼び、今の書式の道具には
 * data-active="true"を付ける。textareaのままの時も、道具を働かせるのは利用側（記号を差し込むなど）。
 * 道具を働かせない時はtoolsを空にする。道具も操作も無い時は、道具の並びを描かない。
 * 道具の並びはToolbarControllerで一つのTab停止点にし、矢印キーで道具の間を移る。
 * 道具はJavaScriptで動くものなので、controllerが付くまではTabで止めない。
 */
export const TextEditor = ({
  id,
  label,
  tools: items = [
    "bold",
    "italic",
    "strike",
    "link",
    "|",
    "heading",
    "quote",
    "code",
    "bullets",
    "numbers",
    "|",
    "attach",
    "|",
    "undo",
    "redo",
  ],
  placement = "top",
  editor,
  actions,
  value,
  class: className,
  ...attributes
}: TextEditorProps) => {
  const groups: TextEditorTool[][] = [[]];
  for (const item of items) {
    if (item === "|") groups.push([]);
    else groups.at(-1)?.push(item);
  }
  const hasActions = actions != null && actions !== false;
  const hasTools = groups.some((group) => group.length > 0);
  return (
    <div class={classes("ply-text-editor", className)} data-placement={placement}>
      {(hasTools || hasActions) && (
        <div
          class="toolbar"
          id={`${id}-toolbar`}
          role="toolbar"
          aria-label={`${label}の書式`}
          aria-controls={id}
          data-controller="toolbar"
        >
          {groups
            .filter((group) => group.length > 0)
            .map((group) => (
              <span class="group">
                {group.map((tool) => {
                  const { label: name, icon } = tools[tool];
                  return (
                    <Button
                      variant="link"
                      data-icon-only="true"
                      size="compact"
                      aria-label={name}
                      title={name}
                      tabindex={-1}
                      disabled={attributes.disabled}
                      data-toolbar-target="control"
                      data-text-editor-tool={tool}
                    >
                      <Icon name={icon} />
                    </Button>
                  );
                })}
              </span>
            ))}
          {hasActions && <span class="actions">{actions}</span>}
        </div>
      )}
      <div class="area">
        {editor != null && editor !== false ? (
          editor
        ) : (
          // textareaのvalue属性はブラウザが初期値として読まないので、中身として書く。
          <textarea {...attributes} id={id} class="input" aria-label={label}>
            {value}
          </textarea>
        )}
      </div>
    </div>
  );
};
