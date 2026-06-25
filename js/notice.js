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
      title: '台風7号による臨時休業のお知らせ',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '台風7号の接近に伴い、お客様とスタッフの安全を最優先と考え、下記の通り臨時休業とさせていただきます。\n\n' +
        '・休業日：<strong>6月26日（金）</strong>\n' +
        '・営業再開：<strong>6月27日（土）</strong>より通常営業（<strong>11:00 〜 15:00</strong>）\n\n' +
        '台風の進路によっては予定が前後する場合がございます。最新情報はホームページ・Googleマップにてお知らせいたします。\n\n' +
        'ご不便をおかけし申し訳ございませんが、何卒ご理解賜りますようお願い申し上げます。皆さまも、どうぞ安全にお過ごしください。',
      titleEn: 'Notice: Temporary Closure due to Typhoon No. 7',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Due to the approach of Typhoon No. 7, and prioritizing the safety of our customers and staff, we will be temporarily closed as follows:\n\n' +
        '• Closed: <strong>Friday, June 26, 2026</strong>\n' +
        '• Reopening: <strong>Saturday, June 27, 2026</strong>, from <strong>11:00 – 15:00</strong>\n\n' +
        'The schedule may change depending on the typhoon\'s path. Please check our website or Google Maps for the latest information.\n\n' +
        'We sincerely apologize for any inconvenience. Please stay safe.'
    }
  ]

};
