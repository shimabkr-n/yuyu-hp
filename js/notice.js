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
      title: '台風13号による臨時休業のお知らせ',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '台風13号の接近に伴い、お客様とスタッフの安全を最優先と考え、下記の通り臨時休業とさせていただきます。\n\n' +
        '・休業日：<strong>8月7日（金）</strong>\n' +
        '・<strong>8月8日（土）</strong>の営業につきましては、当日の朝に判断し、<strong>午前9時まで</strong>に当ホームページとGoogleの店舗情報でお知らせいたします。\n\n' +
        'ご予約をいただいておりますお客様には、当店より順次お電話でご連絡いたします。\n\n' +
        'ご不便をおかけし申し訳ございませんが、何卒ご理解賜りますようお願い申し上げます。皆さまも、どうぞ安全にお過ごしください。',
      titleEn: 'Notice: Temporary Closure due to Typhoon No. 13',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Due to the approach of Typhoon No. 13, and prioritizing the safety of our customers and staff, we will be temporarily closed as follows:\n\n' +
        '• Closed: <strong>Friday, August 7, 2026</strong>\n' +
        '• <strong>Saturday, August 8, 2026</strong>: We will decide on the morning of that day and post an update on this website and our Google listing by <strong>9:00 a.m.</strong>\n\n' +
        'If you have a reservation with us, we will contact you by phone.\n\n' +
        'We sincerely apologize for any inconvenience. Please stay safe.'
    }
  ]

};
