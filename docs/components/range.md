<!-- このファイルはvp run docs:componentsで生成します。直接編集しないでください。 -->

# Range

連続する数値を調整する

## 使いどころ

- 表示倍率や音量のように、正確な数よりも位置の感覚で決める数値に使います。`value` に[下限, 上限]を渡すと、予算のような範囲を選べます。
- 正確な数を打ち込ませる時は `NumberField`、3〜8個の決まった値から選ぶ時は `Dial` を使います。

## 使い方

`value` に数値を渡すと単一値、[下限, 上限]を渡すと範囲指定になります。`min`・`max` はスライダーの両端に数で出します。`step` などの残りの属性は標準の `range` 入力へ渡します。

単一値は `name` で値を送信し、名前の行の終わりに現在値を `unit` を添えて出します。範囲指定は `<name>-start`・`<name>-end` の二つの名前で送信し、スライダーの下に下限・上限の数の入力を並べます。数の入力は送信しません。

範囲指定では、下限が上限を越えないように、動かした側をもう一方の値で止めます。数の入力で確定した値も同じように止めてスライダーへ移します。

`RangeController` を `range` として登録します。上流の `SliderController` の状態管理と上下限の制約に、現在値の表示と数の入力の同期を加えたものです。値はcontrollerの `value`（単一値）、`start`・`end`（範囲指定）で読み書きでき、書いた値は表示にも移します。

操作で値が確定すると `slider:beforechange` と `slider:change` を出します。標準の `input`・`change` もそのまま受け取れます。数の入力の確定は、その入力の標準の `change` で受け取れます。フォームのリセットでは表示も初期値に戻します。

JavaScriptが無い時は、単一値は現在値の表示の無いスライダーになります。範囲指定は「下限」「上限」のラベルが付いた独立した2本のスライダーになり、下限が上限を越えても止めません。受け取った値の前後関係は送信先でも確かめます。

## キーボード

| キー       | 動作                                  |
| ---------- | ------------------------------------- |
| 矢印キー   | stepだけ増減します（標準の操作）。    |
| Home / End | `min`・`max` にします（標準の操作）。 |

## アクセシビリティ

- 単一値のスライダーはラベルを読み上げ名にします。範囲指定は `fieldset` の `legend` に `label` を置き、2本のスライダーと数の入力を「予算（円） 下限」のように名前と下限・上限で読み上げます。
- スライダーは数だけを読み上げ、`unit` や両端の数は読み上げません。単位は `label` にも「表示倍率（%）」のように含めます。
- 現在値の表示は `aria-live="off"` で、動かすたびに重ねて読み上げません。値はスライダー自体が伝えます。

## イベント

| イベント              | 内容                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `slider:beforechange` | ポインターかキーボードの操作で値が確定する前に出します。取り消すと値を操作の前に戻します。detailは `value`・`previousValue`・`reason`（`pointer` か `keyboard`）と、範囲指定では `thumb`（`start` か `end`）です。 |
| `slider:change`       | 値が確定した後に出します。detailは `slider:beforechange` と同じです。                                                                                                                                              |

## API

### Range

連続する数値を調整するスライダー。範囲指定は2本のスライダーと数の入力で下限と上限を選ぶ。残りの属性（stepなど）はスライダーのinputへ渡す。

| 名前            | 型                                    | 既定値 | 説明                                                                                                               |
| --------------- | ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `label`（必須） | `string`                              |        | 名前。単一値ではラベル、範囲指定ではfieldsetのlegendになる。単位はここにも含める。                                 |
| `min`（必須）   | `number`                              |        | 下限。スライダーの始まりの端に数として出す。                                                                       |
| `max`（必須）   | `number`                              |        | 上限。スライダーの終わりの端に数として出す。                                                                       |
| `value`         | `number \| readonly [number, number]` |        | 数値なら単一値、[下限, 上限]なら範囲指定になる。省略すると単一値で、位置はブラウザの既定（minとmaxの中間）になる。 |
| `unit`          | `string`                              | `""`   | 単一値の時、現在値の表示に添える単位。範囲指定では使わない。                                                       |

ほかに、`<input>`へ標準のHTML属性を渡せます。

読み込むCSS：`layers.css`、`reset.css`、`tokens.css`、`base.css`、`layout.css`、`components/field.css`、`components/range.css`

## コード

```tsx
import { Disclosure, Button, Range } from "ply/hono";

export default () => (
  <form class="ply-stack" aria-label="表示と予算の設定">
    <Range
      id="hono-range-zoom"
      label="表示倍率（%）"
      name="zoom"
      min={50}
      max={200}
      step={10}
      value={100}
      unit="%"
    />
    <Range
      id="hono-range-budget"
      label="予算（円）"
      name="budget"
      min={0}
      max={10000}
      step={500}
      value={[1000, 5000]}
    />
    <Disclosure summary="最小・最大・小数・利用不可">
      <div class="ply-stack">
        <Range label="音量（最小）" min={0} max={100} value={0} unit="%" />
        <Range label="画質（最大）" min={1} max={5} value={5} />
        <Range
          label="拡大率（小数）"
          min={0.5}
          max={2}
          step={0.1}
          value={1.2}
          unit="倍"
        />
        <Range label="変更できない範囲" min={0} max={10} value={3} disabled />
        <Range
          label="予算（変更不可）"
          min={0}
          max={10000}
          step={500}
          value={[2000, 8000]}
          disabled
        />
      </div>
    </Disclosure>
    <Button type="reset">初期値に戻す</Button>
  </form>
);
```

<details>
<summary>出力されるHTML</summary>

```html
<form class="ply-stack" aria-label="表示と予算の設定">
  <div class="ply-range" data-controller="range" data-mode="single">
    <div class="heading">
      <label class="label" for="hono-range-zoom" id="hono-range-zoom-label"
        >表示倍率（%）</label
      ><output
        class="value"
        for="hono-range-zoom"
        data-range-unit="%"
        aria-live="off"
        hidden=""
      ></output>
    </div>
    <div class="controls">
      <div class="native">
        <input
          step="10"
          id="hono-range-zoom"
          class="input"
          type="range"
          min="50"
          max="200"
          name="zoom"
          value="100"
          aria-labelledby="hono-range-zoom-label"
          data-range-target="input"
        />
      </div>
    </div>
    <div class="limits" aria-hidden="true"><span>50</span><span>200</span></div>
  </div>
  <fieldset class="ply-range" data-controller="range" data-mode="interval">
    <legend class="label" id="hono-range-budget-label">予算（円）</legend>
    <div class="controls">
      <div class="native">
        <label
          class="label"
          id="hono-range-budget-start-label"
          for="hono-range-budget-start"
          >下限</label
        ><input
          step="500"
          id="hono-range-budget-start"
          class="input"
          type="range"
          min="0"
          max="10000"
          name="budget-start"
          value="1000"
          aria-labelledby="hono-range-budget-label hono-range-budget-start-label"
          data-range-target="input"
        />
      </div>
      <div class="native">
        <label
          class="label"
          id="hono-range-budget-end-label"
          for="hono-range-budget-end"
          >上限</label
        ><input
          step="500"
          id="hono-range-budget-end"
          class="input"
          type="range"
          min="0"
          max="10000"
          name="budget-end"
          value="5000"
          aria-labelledby="hono-range-budget-label hono-range-budget-end-label"
          data-range-target="input"
        />
      </div>
    </div>
    <div class="limits" aria-hidden="true"><span>0</span><span>10000</span></div>
    <div class="values" hidden="">
      <label class="ply-field" for="hono-range-budget-start-number"
        ><span class="label" id="hono-range-budget-start-number-label">下限</span
        ><input
          class="ply-input"
          type="number"
          id="hono-range-budget-start-number"
          aria-labelledby="hono-range-budget-label hono-range-budget-start-number-label"
          min="0"
          max="10000"
          step="500"
          value="1000"
          data-range-bound="start" /></label
      ><label class="ply-field" for="hono-range-budget-end-number"
        ><span class="label" id="hono-range-budget-end-number-label">上限</span
        ><input
          class="ply-input"
          type="number"
          id="hono-range-budget-end-number"
          aria-labelledby="hono-range-budget-label hono-range-budget-end-number-label"
          min="0"
          max="10000"
          step="500"
          value="5000"
          data-range-bound="end"
      /></label>
    </div>
  </fieldset>
  <details class="ply-disclosure">
    <summary>
      <span class="marker" aria-hidden="true"
        ><svg
          class="ply-icon"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/assets/ply-icons.svg#ply-caret"></use></svg></span
      ><span class="label"><span class="title">最小・最大・小数・利用不可</span></span>
    </summary>
    <div class="body">
      <div class="ply-stack">
        <div class="ply-range" data-controller="range" data-mode="single">
          <div class="heading">
            <label class="label" for="ply-range-:rg:" id="ply-range-:rg:-label"
              >音量（最小）</label
            ><output
              class="value"
              for="ply-range-:rg:"
              data-range-unit="%"
              aria-live="off"
              hidden=""
            ></output>
          </div>
          <div class="controls">
            <div class="native">
              <input
                id="ply-range-:rg:"
                class="input"
                type="range"
                min="0"
                max="100"
                value="0"
                aria-labelledby="ply-range-:rg:-label"
                data-range-target="input"
              />
            </div>
          </div>
          <div class="limits" aria-hidden="true"><span>0</span><span>100</span></div>
        </div>
        <div class="ply-range" data-controller="range" data-mode="single">
          <div class="heading">
            <label class="label" for="ply-range-:rh:" id="ply-range-:rh:-label"
              >画質（最大）</label
            ><output
              class="value"
              for="ply-range-:rh:"
              data-range-unit=""
              aria-live="off"
              hidden=""
            ></output>
          </div>
          <div class="controls">
            <div class="native">
              <input
                id="ply-range-:rh:"
                class="input"
                type="range"
                min="1"
                max="5"
                value="5"
                aria-labelledby="ply-range-:rh:-label"
                data-range-target="input"
              />
            </div>
          </div>
          <div class="limits" aria-hidden="true"><span>1</span><span>5</span></div>
        </div>
        <div class="ply-range" data-controller="range" data-mode="single">
          <div class="heading">
            <label class="label" for="ply-range-:ri:" id="ply-range-:ri:-label"
              >拡大率（小数）</label
            ><output
              class="value"
              for="ply-range-:ri:"
              data-range-unit="倍"
              aria-live="off"
              hidden=""
            ></output>
          </div>
          <div class="controls">
            <div class="native">
              <input
                step="0.1"
                id="ply-range-:ri:"
                class="input"
                type="range"
                min="0.5"
                max="2"
                value="1.2"
                aria-labelledby="ply-range-:ri:-label"
                data-range-target="input"
              />
            </div>
          </div>
          <div class="limits" aria-hidden="true"><span>0.5</span><span>2</span></div>
        </div>
        <div class="ply-range" data-controller="range" data-mode="single">
          <div class="heading">
            <label class="label" for="ply-range-:rj:" id="ply-range-:rj:-label"
              >変更できない範囲</label
            ><output
              class="value"
              for="ply-range-:rj:"
              data-range-unit=""
              aria-live="off"
              hidden=""
            ></output>
          </div>
          <div class="controls">
            <div class="native">
              <input
                id="ply-range-:rj:"
                class="input"
                type="range"
                min="0"
                max="10"
                value="3"
                disabled=""
                aria-labelledby="ply-range-:rj:-label"
                data-range-target="input"
              />
            </div>
          </div>
          <div class="limits" aria-hidden="true"><span>0</span><span>10</span></div>
        </div>
        <fieldset
          class="ply-range"
          data-controller="range"
          data-mode="interval"
          disabled=""
        >
          <legend class="label" id="ply-range-:rk:-label">予算（変更不可）</legend>
          <div class="controls">
            <div class="native">
              <label
                class="label"
                id="ply-range-:rk:-start-label"
                for="ply-range-:rk:-start"
                >下限</label
              ><input
                step="500"
                id="ply-range-:rk:-start"
                class="input"
                type="range"
                min="0"
                max="10000"
                value="2000"
                disabled=""
                aria-labelledby="ply-range-:rk:-label ply-range-:rk:-start-label"
                data-range-target="input"
              />
            </div>
            <div class="native">
              <label
                class="label"
                id="ply-range-:rk:-end-label"
                for="ply-range-:rk:-end"
                >上限</label
              ><input
                step="500"
                id="ply-range-:rk:-end"
                class="input"
                type="range"
                min="0"
                max="10000"
                value="8000"
                disabled=""
                aria-labelledby="ply-range-:rk:-label ply-range-:rk:-end-label"
                data-range-target="input"
              />
            </div>
          </div>
          <div class="limits" aria-hidden="true"><span>0</span><span>10000</span></div>
          <div class="values" hidden="">
            <label class="ply-field" for="ply-range-:rk:-start-number"
              ><span class="label" id="ply-range-:rk:-start-number-label">下限</span
              ><input
                class="ply-input"
                type="number"
                id="ply-range-:rk:-start-number"
                aria-labelledby="ply-range-:rk:-label ply-range-:rk:-start-number-label"
                min="0"
                max="10000"
                step="500"
                value="2000"
                disabled=""
                data-range-bound="start" /></label
            ><label class="ply-field" for="ply-range-:rk:-end-number"
              ><span class="label" id="ply-range-:rk:-end-number-label">上限</span
              ><input
                class="ply-input"
                type="number"
                id="ply-range-:rk:-end-number"
                aria-labelledby="ply-range-:rk:-label ply-range-:rk:-end-number-label"
                min="0"
                max="10000"
                step="500"
                value="8000"
                disabled=""
                data-range-bound="end"
            /></label>
          </div>
        </fieldset>
      </div>
    </div>
  </details>
  <button class="ply-button" type="reset" data-variant="secondary" data-size="default">
    初期値に戻す
  </button>
</form>
```

</details>
