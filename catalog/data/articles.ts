export const articles = [
  {
    id: "daily",
    title: "日々の暮らしを、少しずつ整える",
    body: "道具の選び方や、長く使い続けるための手入れについてまとめました。\n\nお気に入りを見つけること。使ったあとに、少しだけ手をかけること。\n毎日の小さな工夫から、心地よい暮らしを考えます。",
    category: "暮らしのヒント",
    date: "9月10日",
    state: "下書き",
  },
  {
    id: "workspace",
    title: "小さな仕事場のつくり方",
    body: "机の上に、本当に使うものだけを。\n\n窓からの光と、手が届く範囲の道具。小さな仕事場を整えるところから始めます。",
    category: "仕事のこと",
    date: "9月8日",
    state: "下書き",
  },
  {
    id: "guide",
    title: "初めての方へ。申し込みの手順",
    body: "初めて利用する方へ、申し込みの流れをご案内します。\n\n希望する日時を選び、必要事項を記入してください。",
    category: "お知らせ",
    date: "9月5日",
    state: "公開中",
  },
  {
    id: "tools",
    title: "長く使う道具の、手入れの記録",
    body: "使い終わったら、柔らかい布で拭く。\n\nそんな小さな手入れを続けると、道具は少しずつ手になじみます。",
    category: "暮らしのヒント",
    date: "9月3日",
    state: "公開中",
  },
  {
    id: "autumn",
    title: "秋の営業日について",
    body: "秋の営業日をご案内します。\n\n営業時間は午前10時から午後6時までです。",
    category: "お知らせ",
    date: "9月1日",
    state: "公開中",
  },
  {
    id: "change",
    title: "登録内容を変更する手順",
    body: "登録内容は、設定画面から変更できます。\n\n内容を確認してから保存してください。",
    category: "お知らせ",
    date: "8月28日",
    state: "下書き",
  },
] as const;
export type Draft = { title: string; body: string; category: string };
export const draftKey = (id: string) => `ply:v3:draft:${id}`;
export const articleFor = (id: string | undefined) =>
  articles.find((article) => article.id === id) ?? articles[0];
export const parseDraft = (text: string): Draft | null => {
  try {
    const value: unknown = JSON.parse(text);
    if (
      typeof value !== "object" ||
      value === null ||
      !("title" in value) ||
      !("body" in value) ||
      !("category" in value)
    )
      return null;
    if (
      typeof value.title !== "string" ||
      typeof value.body !== "string" ||
      typeof value.category !== "string"
    )
      return null;
    return { title: value.title, body: value.body, category: value.category };
  } catch {
    return null;
  }
};
