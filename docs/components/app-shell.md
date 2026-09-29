<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# AppShell

上部中央のコマンドメニューと中央の作業面を持つ、アプリの基本の画面構成です。

## 使いどころ

- アプリの各画面に共通する画面構成として、上部中央のコマンドメニューと中央の作業面を置く時に使います。
- 画面の端に固定するサイドバーは持ちません。画面全体の移動は`commands`の`CommandMenu`、作業面に付属する補助パネルは`wings`（`Wing`）で扱います。
- `AppShell`を使わない画面で作業面だけを置く時は`Surface`を使います。

## 使い方

`commands`に`CommandMenu`を一つ渡し、`home`・`account`を上部のバーの左右に置きます。バーは画面の上端に留まり、左右の内容の幅に関わらず`commands`を画面の中央に置きます。`home`・`account`を省略すると、その枠を出しません。

`children`は中央の作業面に置きます。作業面は白い面で、幅の上限は`--ply-page`（既定は68rem）です。横に広い画面では、ルートの`style`で`--ply-page`を上書きします。作業面の列は作業面の幅に収まるので、広い表などは中身の側で横にスクロールさせます。

`AppShell`の幅が45rem未満では作業面の外側と内側の余白を詰め、28rem未満では`commands`を一段目、`home`・`account`を二段目の左右に置きます。

`wings`に`start`・`end`を渡すと、作業面を`Wing`で包み、左右に開閉できる補助パネルを付けます。開閉の状態を保存する時は`storageKey`・`savedState`も渡し、`WingController`を`wing`として登録します（詳しくは`Wing`のページ）。

`AppShell`自身はcontrollerを使わず、JavaScriptなしでも同じ配置で表示します。

## アクセシビリティ

- 上部のバーは`header`で、`commands`は`aria-label="共通コマンド"`の`nav`に置きます。
- 作業面は`div`で、`main`を持ちません。画面の本文は`children`の中で利用側が`main`で包みます。
- `home`・`account`に文字のないリンクや操作を置く時は、読み上げ名を利用側で付けます。

## API

### AppShell

上部中央の共通コマンドと、中央の作業面を構成する。wingsは作業面の左右に開閉できる補助メニューを付ける。

| 名前               | 型                                                                  | 既定値 | 説明                                                                                                                               |
| ------------------ | ------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `commands`（必須） | `Child`                                                             |        | 上部のバーの中央に置く共通コマンド。通常はCommandMenuを一つ渡す。                                                                  |
| `home`             | `Child`                                                             |        | 上部のバーの先頭側に置く、ホームへのリンクなど。省略すると枠ごと出さない。                                                         |
| `account`          | `Child`                                                             |        | 上部のバーの末尾側に置く、利用者のAvatarやアカウントへのリンクなど。省略すると枠ごと出さない。                                     |
| `wings`            | `Pick<WingProps, "start" \| "end" \| "storageKey" \| "savedState">` |        | 作業面の左右に付ける補助パネル。Wingのstart・end・storageKey・savedStateと同じ値を渡す。省略するとWingを使わず、作業面だけを置く。 |
| `children`         | `Child`                                                             |        | 中央の作業面に置く、画面の中身。                                                                                                   |

ほかに、`<div>`へ標準のHTML属性を渡せます。

登録するcontroller：`wing`（`WingController`）

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/app-shell.css`、`components/wing.css`、`components/button.css`、`components/overlay.css`、`components/icon.css`

#### `WingProps`

[Wing](wing.md)のpropsと同じです。

## コード

```tsx
import { AppShell, ActionLink, CommandMenu, PageHeader, Avatar } from "@tknf/ply/hono";
export default () => (
  <AppShell
    home={
      <ActionLink href="/apps/project" variant="link">
        ホーム
      </ActionLink>
    }
    commands={
      <CommandMenu
        id="shell-commands"
        label="つむぐチーム"
        shortcuts={[
          {
            label: "プロジェクト",
            href: "/apps/project",
            icon: "layers",
            accent: "green",
          },
          { label: "受信トレイ", href: "/apps/inbox", icon: "mail", accent: "blue" },
          { label: "資料", href: "/apps/files", icon: "file", accent: "amber" },
          { label: "売上", href: "/apps/sales", icon: "chart", accent: "coral" },
        ]}
        groups={[
          {
            label: "移動",
            items: [
              { label: "プロジェクト", href: "/apps/project", icon: "layers" },
              { label: "受信トレイ", href: "/apps/inbox", icon: "mail" },
            ],
          },
        ]}
      />
    }
    account={<Avatar name="田中 遥" initials="遥" size="small" tone="coral" />}
  >
    <PageHeader
      title="今日の仕事"
      description="上部中央のコマンドメニューから移動し、中央の作業面で仕事を進めます。"
    />
  </AppShell>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<div class="ply-app-shell">
  <header class="bar">
    <div class="start">
      <a href="/apps/project" class="ply-button" data-variant="link" data-size="default"
        >ホーム</a
      >
    </div>
    <nav class="commands" aria-label="共通コマンド">
      <div class="ply-command-menu" data-controller="command-menu">
        <button
          popovertarget="shell-commands"
          data-command-menu-target="trigger"
          aria-haspopup="dialog"
          aria-controls="shell-commands"
          aria-expanded="false"
          class="ply-button"
          type="button"
          data-variant="secondary"
          data-size="large"
        >
          <svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-layers-fill"></use></svg
          >つむぐチーム<svg
            class="ply-icon"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/assets/ply-icons.svg#ply-caret"></use>
          </svg>
        </button>
        <div
          class="panel"
          popover="auto"
          role="dialog"
          id="shell-commands"
          aria-label="つむぐチームのコマンド"
          data-command-menu-target="panel"
        >
          <header class="heading">
            <span class="name">つむぐチーム</span
            ><button
              aria-label="コマンドを閉じる"
              popovertarget="shell-commands"
              popovertargetaction="hide"
              data-command-menu-target="close"
              class="ply-button"
              type="button"
              data-variant="secondary"
              data-size="compact"
            >
              閉じる
            </button>
          </header>
          <nav class="shortcuts" aria-label="よく使う場所" data-columns="4">
            <div class="shortcut">
              <a
                tabindex="0"
                class="ply-action-tile"
                data-accent="green"
                href="/apps/project"
                ><span class="icon"
                  ><svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-layers-fill"></use></svg></span
                ><span class="name">プロジェクト</span></a
              >
            </div>
            <div class="shortcut">
              <a
                tabindex="0"
                class="ply-action-tile"
                data-accent="blue"
                href="/apps/inbox"
                ><span class="icon"
                  ><svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-mail-fill"></use></svg></span
                ><span class="name">受信トレイ</span></a
              >
            </div>
            <div class="shortcut">
              <a
                tabindex="0"
                class="ply-action-tile"
                data-accent="amber"
                href="/apps/files"
                ><span class="icon"
                  ><svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-file-fill"></use></svg></span
                ><span class="name">資料</span></a
              >
            </div>
            <div class="shortcut">
              <a
                tabindex="0"
                class="ply-action-tile"
                data-accent="coral"
                href="/apps/sales"
                ><span class="icon"
                  ><svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-chart-fill"></use></svg></span
                ><span class="name">売上</span></a
              >
            </div>
          </nav>
          <div class="search">
            <div class="ply-input-group">
              <div class="control" data-size="large">
                <span class="affix" id="shell-commands-search-prefix"
                  ><svg
                    class="ply-icon"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/assets/ply-icons.svg#ply-search"></use></svg></span
                ><input
                  type="search"
                  role="combobox"
                  aria-label="仕事・人・ページを探す"
                  aria-haspopup="tree"
                  aria-autocomplete="list"
                  aria-controls="shell-commands-results"
                  aria-expanded="false"
                  autocomplete="off"
                  autofocus=""
                  placeholder="仕事・人・ページを探す…"
                  data-command-menu-target="search"
                  id="shell-commands-search"
                  data-size="large"
                  aria-describedby="shell-commands-search-prefix"
                  class="ply-input"
                />
              </div>
            </div>
          </div>
          <div
            class="results"
            id="shell-commands-results"
            role="tree"
            aria-label="移動先・操作"
          >
            <section
              class="group"
              role="group"
              aria-labelledby="shell-commands-group-0"
              data-command-menu-target="group"
            >
              <h2 id="shell-commands-group-0">移動</h2>
              <ul class="list" role="none">
                <li
                  class="entry"
                  role="treeitem"
                  id="shell-commands-entry-0-0"
                  aria-selected="false"
                  data-command-menu-target="entry"
                  data-search="プロジェクト"
                >
                  <a class="link" href="/apps/project" tabindex="0"
                    ><span class="icon"
                      ><svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use
                          href="/assets/ply-icons.svg#ply-layers-fill"
                        ></use></svg></span
                    ><span class="name">プロジェクト</span></a
                  >
                </li>
                <li
                  class="entry"
                  role="treeitem"
                  id="shell-commands-entry-0-1"
                  aria-selected="false"
                  data-command-menu-target="entry"
                  data-search="受信トレイ"
                >
                  <a class="link" href="/apps/inbox" tabindex="0"
                    ><span class="icon"
                      ><svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use
                          href="/assets/ply-icons.svg#ply-mail-fill"
                        ></use></svg></span
                    ><span class="name">受信トレイ</span></a
                  >
                </li>
              </ul>
            </section>
            <p class="empty" data-command-menu-target="empty" hidden="">
              見つかりませんでした。別の言葉で探してみてください。
            </p>
          </div>
          <footer class="help" aria-label="キーボード操作">
            <span class="hint"
              ><span class="ply-keycap"><kbd>↑</kbd><kbd>↓</kbd></span
              >選択</span
            ><span class="hint"
              ><span class="ply-keycap"><kbd>Enter</kbd></span
              >実行</span
            ><span class="hint"
              ><span class="ply-keycap"><kbd>Esc</kbd></span
              >閉じる</span
            >
          </footer>
          <span
            class="ply-visually-hidden"
            role="status"
            data-command-menu-target="status"
          ></span>
        </div>
      </div>
    </nav>
    <div class="end">
      <span
        class="ply-avatar"
        data-size="small"
        data-tone="coral"
        role="img"
        aria-label="田中 遥"
        ><span class="initials">遥</span></span
      >
    </div>
  </header>
  <div class="workspace">
    <header class="ply-page-header" data-align="start">
      <hgroup class="heading">
        <h1>今日の仕事</h1>
        <p>上部中央のコマンドメニューから移動し、中央の作業面で仕事を進めます。</p>
      </hgroup>
    </header>
  </div>
</div>
```

</details>
