import { FilterMenu, Disclosure, DisclosureGroup } from "../../src/hono";

export default () => (
  <div class="ply-stack">
    <div class="ply-cluster">
      <FilterMenu
        id="label-menu"
        label="ラベル"
        icon="layers"
        title="ラベルを選ぶ"
        multiple
        name="labels"
        createLabel="新しく作る"
        options={[
          { value: "guide", label: "案内", selected: true },
          { value: "invoice", label: "請求" },
          { value: "event", label: "イベント" },
          { value: "later", label: "あとで読む" },
        ]}
      />
      <FilterMenu
        id="assign-menu"
        label="担当"
        title="担当を決める"
        name="assignee"
        options={[
          { value: "me", label: "自分", shortcut: "M", selected: true },
          { value: "tanaka", label: "田中 遥" },
          { value: "sato", label: "佐藤 健" },
          { value: "mori", label: "森 美咲", disabled: true },
        ]}
      />
    </div>
    <DisclosureGroup label="候補と置き場所の違い">
      <Disclosure summary="候補にアイコンとキーを添える・終わりの側に開く">
        <div class="ply-cluster" style="justify-content: end">
          <FilterMenu
            id="move-menu"
            label="移動"
            title="移動する先"
            align="end"
            options={[
              { value: "imbox", label: "Imbox", icon: "mail", shortcut: "1", selected: true },
              { value: "feed", label: "The Feed", icon: "files", shortcut: "2" },
              { value: "paper", label: "Paper Trail", icon: "file", shortcut: "3" },
            ]}
          />
        </div>
      </Disclosure>
      <Disclosure summary="当てはまる候補がない時">
        <FilterMenu
          id="empty-menu"
          label="タグ"
          title="タグを選ぶ"
          multiple
          createLabel="新しく作る"
          emptyLabel="まだタグがありません"
          options={[]}
        />
      </Disclosure>
      <Disclosure summary="使えない時・右から左に読む場合">
        <div class="ply-cluster">
          <FilterMenu
            id="disabled-menu"
            label="ラベル"
            title="ラベルを選ぶ"
            disabled
            options={[]}
          />
          <div dir="rtl" lang="ar">
            <FilterMenu
              id="rtl-menu"
              label="التسمية"
              title="اختر تسمية"
              placeholder="تصفية…"
              options={[
                { value: "a", label: "دليل", selected: true },
                { value: "b", label: "فاتورة" },
              ]}
            />
          </div>
        </div>
      </Disclosure>
    </DisclosureGroup>
  </div>
);
