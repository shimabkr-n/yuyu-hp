/* ============================================================
   notice.js — お知らせモーダル設定
   ============================================================
   【使い方】
   お知らせがある場合 → notices 配列にオブジェクトを追加
   お知らせがない場合 → notices を空配列 [] にする

   編集後は GitHub にプッシュするだけで反映されます。
   npm run build:css は不要です（JSファイルのため）。
   ============================================================ */

var noticeData = {

  // お知らせ一覧（複数件OK）
  // 空配列 [] にするとモーダルは表示されません
  notices: [
    // ---- ここから編集 ----

    // 例1: 臨時休業
    // {
    //   title: "臨時休業のお知らせ",
    //   body: "4月10日（木）は設備点検のため臨時休業いたします。\nご迷惑をおかけしますが、よろしくお願いいたします。",
    //   titleEn: "Temporary Closure",
    //   bodyEn: "We will be closed on April 10 (Thu) for maintenance.\nWe apologize for the inconvenience."
    // },

    // 例2: GW営業案内
    // {
    //   title: "ゴールデンウィーク営業のご案内",
    //   body: "4/29〜5/6は休まず営業いたします。\n営業時間：11:00〜16:00（L.O. 15:30）\n※混雑が予想されますので、お早めのご来店をおすすめします。",
    //   titleEn: "Golden Week Hours",
    //   bodyEn: "We are open every day from Apr 29 to May 6.\nHours: 11:00-16:00 (Last order 15:30)\nExpect crowds during this period."
    // },

    // ---- ここまで編集 ----
  ]

};
