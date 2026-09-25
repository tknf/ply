import { html } from "hono/html";

// CSSだけの利用例。PlyのSSRコンポーネントやcontrollerを必要としない標準HTML。
export const reservationExample = html`
  <section class="ply-surface" data-layout="document">
    <nav class="ply-context-bar" aria-label="現在の位置">
      <ol class="ply-breadcrumb">
        <li><a href="/">道具箱</a></li>
        <li><span aria-hidden="true">／ </span><span aria-current="page">予約</span></li>
      </ol>
    </nav>
    <div class="body">
      <header class="ply-page-header">
        <h1>利用日時を選ぶ</h1>
        <p>ミーティングルーム・集中作業室の利用受付です。</p>
      </header>
      <form action="/reservation" method="get" class="ply-form">
        <fieldset class="ply-field-group">
          <legend>日時と人数</legend>
          <div class="layout">
            <p class="description">日時と参加人数を指定します。</p>
            <div class="fields">
              <div class="ply-fields-inline">
                <div class="ply-field">
                  <div class="heading">
                    <label for="reservation-date">利用日（必須）</label>
                  </div>
                  <input
                    class="ply-input"
                    id="reservation-date"
                    type="date"
                    required
                    value="2026-09-15"
                  />
                </div>
                <div class="ply-field">
                  <div class="heading">
                    <label for="reservation-time">開始時刻（必須）</label>
                  </div>
                  <input
                    class="ply-input"
                    id="reservation-time"
                    type="time"
                    required
                    value="10:00"
                    step="1800"
                    aria-describedby="reservation-time-help"
                  />
                  <div class="messages">
                    <p class="help" id="reservation-time-help">
                      <svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/assets/ply-icons.svg#ply-info" /></svg
                      ><span>30分単位</span>
                    </p>
                  </div>
                </div>
                <div class="ply-field">
                  <div class="heading">
                    <label for="reservation-count">人数（必須）</label>
                  </div>
                  <input
                    class="ply-input"
                    data-size="short"
                    id="reservation-count"
                    type="number"
                    required
                    min="1"
                    max="8"
                    value="2"
                    aria-describedby="reservation-count-help"
                  />
                  <div class="messages">
                    <p class="help" id="reservation-count-help">
                      <svg
                        class="ply-icon"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use href="/assets/ply-icons.svg#ply-info" /></svg
                      ><span>1〜8人</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="ply-choice-group">
          <legend>利用場所</legend>
          <div class="ply-stack" data-space="small">
            <label class="ply-choice" data-kind="option"
              ><input type="radio" name="room" value="meeting" checked /><span
                ><strong>ミーティングルーム</strong
                ><small>打ち合わせと共同作業に。1〜8人で利用できます。</small></span
              ></label
            >
            <label class="ply-choice" data-kind="option"
              ><input type="radio" name="room" value="quiet" /><span
                ><strong>集中作業室</strong
                ><small>読書や個人作業など、会話を伴わない利用に。</small></span
              ></label
            >
            <label class="ply-choice" data-kind="option"
              ><input type="radio" name="room" value="large" disabled /><span
                >大会議室（受付停止中）</span
              ></label
            >
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
                <use href="/assets/ply-icons.svg#ply-caret" /></svg></span
            ><span class="label"><span class="title">追加設備</span></span>
          </summary>
          <div>
            <fieldset class="ply-choice-group" disabled>
              <legend>受付停止中</legend>
              <label class="ply-choice"><input type="checkbox" /><span>プロジェクター</span></label>
            </fieldset>
          </div>
        </details>
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
                <use href="/assets/ply-icons.svg#ply-caret" /></svg></span
            ><span class="label"><span class="title">利用前の確認事項</span></span>
          </summary>
          <div class="ply-stack">
            <p>
              利用後は机と椅子を元に戻してください。時間の延長が必要な場合は、次の予約を確認してください。
            </p>
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
                    <use href="/assets/ply-icons.svg#ply-caret" /></svg></span
                ><span class="label"><span class="title">キャンセル条件の例</span></span>
              </summary>
              <div>
                <p>このサンプルでは予約は作成されないため、キャンセルの手続きは不要です。</p>
              </div>
            </details>
          </div>
        </details>
        <div class="ply-form-actions">
          <label class="ply-choice"
            ><input type="checkbox" required /><span>確認事項を読みました（必須）</span></label
          >
          <div class="ply-cluster">
            <button class="ply-button" data-variant="primary" type="submit">
              入力内容をチェック
            </button>
            <button class="ply-button" data-variant="link" type="reset">初期値に戻す</button>
          </div>
          <p class="catalog-footnote">入力のチェックまで試せます。予約は作成されません。</p>
        </div>
      </form>
    </div>
  </section>
`;
