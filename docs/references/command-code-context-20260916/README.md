# CommandMenu・ContextBar・コード表示の記録

ユーザーの元画像と、この修正中に取得した画像を保存した。加工・再圧縮はしていない。元の取得先、記録行、SHA-256は[manifest.json](manifest.json)に記載する。

| ファイル                        | 内容                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- |
| user-command-header.png         | ユーザー提供の、記号と閉じる操作の大きさが揃わない状態                    |
| user-html-minified.png          | ユーザー提供の、改行されていないHTML例                                    |
| code-intermediate-strict.jpg    | 整形方法を調整する前の途中段階                                            |
| code-formatted-intermediate.jpg | HTMLの改行と色分け。コード背景を白へ直す前の段階                          |
| command-keyboard.jpg            | Tabと矢印でTableを選択した状態。共通Button・Keycapと8pxの角丸             |
| context-actions.jpg             | 現在地、主要操作、Dialog、外部フォームの操作の組み合わせ                  |
| copy-toast.jpg                  | 本文を動かさないコピー結果のToast。通知の閉じる操作にフォーカスがある状態 |
| browser-failures/               | 調整中に失敗したテストの自動撮影画像。成功を示す画像として扱わない        |

コピー結果の撮影時、見出し・ボタン・コード・外枠のコピー前後の矩形が一致することをDOMでも確認した。通知へフォーカスを移し、撮影中に自動消去されない状態にした。
