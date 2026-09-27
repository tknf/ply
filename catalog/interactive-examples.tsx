import {
  Dialog,
  DropdownMenu,
  Tabs,
  DangerZone,
  ActionLink,
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
      "Phosphor regularを共通で使います。標準は1em、小型は6em/7。名前によるサイズ・ウェイトの分岐はありません。配布icons.svgを同一オリジンに配置し、spriteでURLを指定できます。装飾は読み上げを省き、用途を伝える文言を添えます。CSSのみでも同じSVG/useを利用でき、CSS背景・mask用の単独SVGも同じ素材から生成します。",
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
      "DialogControllerをdialogとして登録します。idは画面内で一意にします。見出し・本文・操作欄を分け、長文では本文をスクロールします。sizeはcompact/default/wide、closeLabelで閉じる操作の文言、actionsで追加操作を指定できます。初期フォーカスは見出しです。フォームではinitialFocusをcontentにし、必要な入力にautofocusを指定します。Escapeと閉じる操作で元のトリガーへ戻ります。狭いタッチ画面では下端に寄せたシートとして表示し、上端のハンドルと見出しを下へ引くと閉じます（dialog:beforecloseのdetail.reasonはswipe）。保存・削除は利用側で処理してください。",
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
      "DropdownMenuControllerをdropdown-menuとして登録します。メニューは青の面に白い文字で、開いた操作の側から膨らんで現れます。通常操作・リンク・区切り・見出し・チェック・単一選択・多段サブメニューに対応します。dropdown-menu:selectのdetail.value、checked、nameを利用側で受け取ります。beforeselectはpreventDefaultで取り消せます。上下矢印・Home/Endで項目移動、左右矢印で階層移動、Escapeで一段戻り、Tabで閉じます。チェックと単一選択は既定で開いたままです。idは画面内で一意、radioのnameは同じ階層の選択グループごとに指定します。ショートカットの補助表記はキー登録を行いません。",
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
    description: "削除や公開の取り消しなど、影響のある操作を説明と一緒にまとめます。",
    render: () => (
      <DangerZone
        title="記事を削除する"
        description="この記事と添付ファイルを削除します。削除した内容は元に戻せません。"
        actions={
          <ActionLink href="#hono-danger-zone" variant="danger">
            削除の確認へ進む
          </ActionLink>
        }
      />
    ),
    usage:
      "titleで操作名、descriptionで影響、childrenで追加の説明やフォーム、actionsでButton・ActionLink・Dialogを渡します。通常の保存とは区切り線で分け、説明の下に操作を置きます。複数の操作は折り返します。DangerZone自体にcontroller登録は不要です。確認にDialogを使う場合はDialogControllerを登録してください。このHTML例のリンクは下の確認例へ移動します。削除処理・権限判定・状態の更新は利用側が行います。",
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
