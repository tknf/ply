import {
  Dialog,
  DropdownMenu,
  Tabs,
  DangerZone,
  FieldGroup,
  Field,
  Input,
  Icon,
} from "../src/hono";

export const interactiveExamples = [
  {
    id: "icon",
    name: "Icon",
    description: "操作や用途の文言を補う小さな図形。",
    render: () => (
      <span>
        <Icon name="pencil" /> 編集する
      </span>
    ),
    usage:
      "Phosphor boldの必要分を外部スプライトからuseで参照します。配布icons.svgを同一オリジンに配置し、spriteでURLを指定できます。装飾は読み上げを省き、用途を伝える文言を添えます。CSSのみでも同じSVG/useを利用できます。",
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "文脈を保ちながら、影響や内容を確認します。",
    render: () => (
      <Dialog
        id="sample-dialog"
        title="変更内容を確認"
        trigger="確認を開く"
        description="このサンプルではデータを変更しません。"
      >
        <p>閉じると元の操作位置へ戻ります。</p>
      </Dialog>
    ),
    usage:
      "DialogControllerをdialogとして登録します。idは画面内で一意にします。Escapeで閉じ、トリガーへフォーカスを戻します。JavaScriptがない場合は通常ページにも確認内容を用意してください。",
  },
  {
    id: "dropdown-menu",
    name: "DropdownMenu",
    description: "現在の対象に関する補助操作をまとめます。",
    render: () => (
      <DropdownMenu
        id="sample-menu"
        label="補助操作"
        items={[
          { label: "複製する", value: "duplicate" },
          { label: "利用できない操作", value: "unavailable", disabled: true },
        ]}
      />
    ),
    usage:
      "DropdownMenuControllerをdropdown-menuとして登録します。dropdown-menu:selectのdetail.valueを利用側で受け取ります。ここには移動リンクを置かず、リンクの集合にはContextBarやFilterBarを使います。",
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "同じ場所で関連するパネルを切り替えます。",
    render: () => (
      <Tabs
        id="sample-tabs"
        label="設定項目"
        items={[
          { value: "content", label: "内容", content: <p>内容のパネルです。</p> },
          { value: "settings", label: "設定", content: <p>設定のパネルです。</p> },
        ]}
      />
    ),
    usage:
      "TabsControllerをtabsとして登録します。idとitemsのvalueは一意にします。矢印キーで選択します。JavaScript未接続では選択済みパネルだけを表示するため、重要情報には通常の導線も用意してください。",
  },
  {
    id: "danger-zone",
    name: "DangerZone",
    description: "通常の保存と、影響のある操作を領域として分けます。",
    render: () => (
      <DangerZone>
        <p>利用中の内容への影響を、ここで説明します。</p>
        <a href="/review">確認画面へ進む</a>
      </DangerZone>
    ),
    usage:
      "表示する影響や人数は利用側から渡します。確認ダイアログと組み合わせる場合も、業務判断はアプリが行います。",
  },
  {
    id: "field-group",
    name: "FieldGroup",
    description: "見出しと説明、入力欄をひとまとまりのフォームとして配置します。",
    render: () => (
      <FieldGroup legend="連絡先" description="予約に関するご連絡に使います。">
        <Field id="sample-group-name" label="名前">
          {(attributes) => <Input {...attributes} name="name" autocomplete="name" />}
        </Field>
        <Field id="sample-group-email" label="メールアドレス">
          {(attributes) => <Input {...attributes} type="email" name="email" autocomplete="email" />}
        </Field>
      </FieldGroup>
    ),
    usage:
      "legendで区切りの見出し、descriptionでグループの説明を指定します。広い配置では説明を左、入力欄を右に揃え、狭い配置では縦に並びます。説明がない場合は入力欄に全幅を使います。配置と区切り線、内部の余白はFieldGroupが持ちます。disabledを渡すと子の入力をまとめて無効化できます。controller登録は不要です。各入力の状態や操作例はFieldのカタログにまとめています。",
  },
] as const;
