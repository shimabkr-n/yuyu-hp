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
    {
      title: "ゴールデンウィーク期間中の営業日のお知らせ",
      body: "日頃よりご愛顧いただき誠にありがとうございます。\nGW期間中は下記日程で営業いたします。\n\n<span style=\"font-weight:bold; font-size:1.125em;\">■営業日\n4/29（水） 〜 5/4（月）\n　GW期間中は5/3（日）も営業いたします。\n\n■休業日\n5/5（火） 〜 5/7（木）\n　5/8（金）より通常営業となります。\n　5/10（日）以降は、通常通り毎週日曜日を定休日とさせていただきます。</span>\n\n皆さまのご来店をスタッフ一同、心よりお待ちしております。",
      titleEn: "Golden Week Opening Hours",
      bodyEn: "Thank you for your continued support.\nPlease see our schedule during the Golden Week holiday period.\n\n<span style=\"font-weight:bold; font-size:1.125em;\">■ Open\nApr 29 (Wed) – May 4 (Mon)\n　We will also be open on Sun, May 3 (normally closed on Sundays).\n\n■ Closed\nMay 5 (Tue) – May 7 (Thu)\n　Regular hours resume from Fri, May 8.\n　From May 10 onward, we will be closed every Sunday as usual.</span>\n\nWe look forward to welcoming you."
    }
  ]

};
