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
      title: '台風6号による臨時休業のお知らせ',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '台風6号の接近に伴い、お客様とスタッフの安全を最優先と考え、下記の2日間を臨時休業とさせていただきます。\n\n' +
        '・休業日：<strong>6月1日（月）・6月2日（火）</strong>\n' +
        '・営業再開：<strong>6月3日（水）</strong>より通常営業（<strong>11:00 〜 15:00</strong>）\n\n' +
        'なお、6月3日（水）より営業時間を <strong>11:00 〜 15:00</strong> に変更いたします。\n' +
        '台風の進路によっては再開日が前後する場合がございます。最新情報はホームページ・Googleマップにてお知らせいたします。\n\n' +
        'ご不便をおかけし申し訳ございませんが、何卒ご理解賜りますようお願い申し上げます。皆さまも、どうぞ安全にお過ごしください。',
      titleEn: 'Notice: Temporary Closure due to Typhoon No. 6',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Due to the approach of Typhoon No. 6, and prioritizing the safety of our customers and staff, we will be temporarily closed on the following two days:\n\n' +
        '• Closed: <strong>Monday, June 1 &amp; Tuesday, June 2, 2026</strong>\n' +
        '• Reopening: <strong>Wednesday, June 3, 2026</strong>, from <strong>11:00 – 15:00</strong>\n\n' +
        'Please note that from Wednesday, June 3, our opening hours will change to <strong>11:00 – 15:00</strong>. The reopening date may change depending on the typhoon\'s path. Please check our website or Google Maps for the latest information.\n\n' +
        'We sincerely apologize for any inconvenience. Please stay safe.'
    }
  ]

};
