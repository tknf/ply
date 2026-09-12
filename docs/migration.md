# 段階導入

現在はローカルの開発版で、既存アプリへの導入は行っていません。採用時は検証済み成果物を固定し、意図しない更新を流さないでください。この作業場所はGit未初期化なので、現時点ではコミット番号を版識別に使えません。

| 旧実装の概念                | Ply                                                                     |
| --------------------------- | ----------------------------------------------------------------------- |
| sheet                       | Surface＋ContextBar＋PageHeader。旧祖先セレクタと負marginを持ち込まない |
| pill-btn、buttonの変種      | Button / ActionLink。移動はa、操作はbutton                              |
| field / fld / flds-col      | Field / FieldGroup＋ply-stack                                           |
| 現在値を入れたnote          | ValueList、Comparison                                                   |
| badge / st-pill             | Badge。業務名からdata-toneへの変換は利用側                              |
| data-feedback / flash       | Notice。通知の寿命・読み上げ・更新は利用側                              |
| table / sumtable / scroller | Table、data-cellによる列の役割                                          |
| imgfld / preview            | ImageFrame、Comparison、FileInput                                       |
| counts / filters            | FilterBar。パネル切り替えはTabs                                         |

1. 既存画面の複製または独立した検証ルートへ導入する。reset・baseはページ全体へ効くため、旧CSSと同じページで無条件に併用しない。
2. CSSの読み込み、作業面、上部文脈表示を置き換え、入力・状態・表を順に移す。
3. controllerは既存のStimulus Applicationへ必要なものだけ登録する。同じ識別子の二重登録を避ける。
4. 画面固有のデータ・権限・保存先を接続し、旧画面と判断・操作の結果を比較する。見た目の差分ゼロは条件にしない。
5. 元のルート・CSS読み込みを保持して、問題があれば画面単位で戻す。旧クラスは参照がなくなってから削除する。

運営マスタ版の自己完結CSS、リスナーの表紙由来パレット、DB・認証・ストレージ・決済は移行対象に含めません。#81の完了やアプリ全体の移行完了を、このライブラリの実装だけで宣言しません。

## ローカル版の固定と復元

`vp run build`と`vp run check:package`に成功した成果物を、日付付きの保管用アーカイブにします。同名のアーカイブを上書きせず、変更のたびに別名で保存します。

```sh
tar -czf /tmp/ply-20260909-v2-local.tgz package.json pnpm-lock.yaml dist/hono dist/controllers dist/css
shasum -a 256 /tmp/ply-20260909-v2-local.tgz
```

これは保管用アーカイブで、npmの公開用tarballではありません。表示されたSHA-256と検証記録を採用側で保存し、復元前に一致を確認します。別の空ディレクトリに展開し、CSS利用なら`dist/css`をコピー、Hono利用なら展開したディレクトリをローカル依存として参照します。Honoと必要なcontrollerのpeer依存は採用側で用意します。

戻すときは旧アーカイブを別ディレクトリへ展開し、静的CSSの配信先またはローカル依存の参照先を旧版へ戻します。現在のソースを上書きして戻す運用は避けます。公開APIの旧名aliasは現時点でありません。

## 第一版から第二版への差分

PageHeaderは左揃えが初期値になるため、中央揃えを保持したい場所には`align="center"`を指定します。primaryは墨から青へ、ボタンの角はピルから6pxへ変更しました。背景・本文色・境界・書体のウェイト・作業面の内側余白も変わるので、旧画像との差分ゼロを期待しません。

`Surface kind/tone`、`Button size`、`ActionList layout/icon/accent/preview`、`Icon`は追加APIです。旧名aliasやアプリ固有のスタイル上書きは追加していません。独立CSSを選んで読む場合、Iconを使うページは`components/icon.css`も読み込みます。
