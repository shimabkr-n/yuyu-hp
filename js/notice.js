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
      title: '営業時間変更のお知らせ',
      body:
        '平素より悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '2026年<strong>6月1日（月）</strong>より、営業時間を下記の通り変更させていただきます。\n\n' +
        '・変更後の営業時間：<strong>11:00 〜 15:00</strong>\n' +
        '・※2026年<strong>5月30日（土）</strong>までは、従来通り 11:00 〜 16:00 にて営業いたします。\n\n' +
        'お客様にはご不便をおかけいたしますが、何卒ご理解を賜りますようお願い申し上げます。今後ともより良いひとときをお過ごしいただけるよう努めてまいります。',
      titleEn: 'Notice: Change in Opening Hours',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'From <strong>Monday, June 1, 2026</strong>, our opening hours will change as follows:\n\n' +
        '• New hours: <strong>11:00 – 15:00</strong>\n' +
        '• Until <strong>Saturday, May 30, 2026</strong>, we will remain open as usual from 11:00 to 16:00.\n\n' +
        'We sincerely appreciate your understanding and look forward to welcoming you.'
    }
  ]

};
