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
      title: '7月25日（土）貸切営業のお知らせ',
      body:
        'いつも悠愉樹庵をご利用いただきありがとうございます。\n\n' +
        '誠に勝手ながら、<strong>7月25日（土）は貸切営業</strong>とさせていただきます。\n\n' +
        '当日はご予約のお客様のみのご案内となりますので、ご予約のお客様以外のご入店はお受けできません。\n\n' +
        'ご不便をおかけいたしますが、何卒ご理解を賜りますようお願い申し上げます。\n\n' +
        'なお7月26日（日）は定休日のため、<strong>7月27日（月）より通常営業</strong>いたします。皆様のご来店を心よりお待ちしております。',
      titleEn: 'Notice: Private Event on Saturday, July 25',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Please note that on <strong>Saturday, July 25, 2026</strong>, the restaurant will be reserved for a private event.\n\n' +
        'On this day we can only serve guests with a reservation, and we are unable to accept general or walk-in customers.\n\n' +
        'We sincerely apologize for any inconvenience and thank you for your understanding.\n\n' +
        'Please note that we are closed on Sundays. We will resume normal business on <strong>Monday, July 27</strong>. We look forward to welcoming you.'
    }
  ]

};
