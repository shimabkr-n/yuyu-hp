/* ============================================================
   notice.js — お知らせモーダル設定
   ============================================================
   【使い方】
   お知らせがある場合 → notices 配列にオブジェクトを追加
   お知らせがない場合 → notices を空配列 [] にする

   編集後は GitHub にプッシュするだけで反映されます。
   npm run build:css は不要です（JSファイルのため）。

   ------------------------------------------------------------
   【表示する期間を決めたいとき（書かなくても構いません）】

     startAt … 掲載を始める日時。書かなければ「すぐ表示」
     endAt   … 掲載を終える日時。書かなければ「無期限」
               （これまでどおり、消したいときに手で消す使い方）

   ・書き方は '2026-08-09 09:00' か '2026-08-09' の2通りだけ。
     時刻を省くと、その日の 00:00 になります。
   ・時刻はすべて日本時間です。海外から見ても日本時間で判定されます。
   ・endAt に書いた時刻ちょうどに消えます。その時刻は含みません。
       例）8月8日いっぱい出したい   → endAt: '2026-08-09 00:00'
       例）8月8日の朝9時で消したい → endAt: '2026-08-08 09:00'
   ・使わないときは startAt / endAt の行ごと消してください。
   ・書き方を間違えると、そのお知らせは念のため表示されません。
     プッシュする前に `npm run validate:notice` で確かめられます。
   ・急ぎのお知らせは startAt / endAt を付けずに出してください。
     書き間違いで消える心配がなく、そのほうが確実です。

   【書き方の例】
     {
       startAt: '2026-08-07 09:00',
       endAt:   '2026-08-09 00:00',
       title:   'お知らせのタイトル',
       body:    '本文',
       titleEn: 'Title in English',
       bodyEn:  'Body in English'
     }
   ============================================================ */

var noticeData = {

  // お知らせ一覧（複数件OK）
  // 空配列 [] にするとモーダルは表示されません
  notices: [
    {
      endAt: '2026-08-21 16:00',
      title: '8月21日（金）・8月27日（木）は臨時休業とさせていただきます',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '誠に勝手ながら、店舗の都合により下記の2日間を' +
        '<strong>臨時休業</strong>とさせていただきます。\n\n' +
        '・<strong>8月21日（金）</strong> 終日休業\n' +
        '・<strong>8月27日（木）</strong> 終日休業\n\n' +
        '上記以外の日は、通常どおり営業いたしております' +
        '（<strong>11:00〜15:00</strong>／日曜定休）。\n\n' +
        'お客様にはご不便をおかけいたしますが、' +
        '何卒ご了承くださいますようお願い申し上げます。\n\n' +
        'スタッフ一同、またのご来店を心よりお待ちしております。',
      titleEn: 'Closed on Friday, August 21 and Thursday, August 27',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Please note that we will be <strong>closed on the following two days</strong>:\n\n' +
        '• <strong>Friday, August 21</strong> — closed all day\n' +
        '• <strong>Thursday, August 27</strong> — closed all day\n\n' +
        'On all other days we are open as usual ' +
        '(<strong>11:00 - 15:00</strong>, closed on Sundays).\n\n' +
        'We apologize for any inconvenience, and thank you for your understanding.\n\n' +
        'We look forward to welcoming you.'
    },
    {
      startAt: '2026-08-21 16:00',
      endAt:   '2026-08-27 16:00',
      title: '8月27日（木）は臨時休業とさせていただきます',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '誠に勝手ながら、店舗の都合により下記のとおり' +
        '<strong>臨時休業</strong>とさせていただきます。\n\n' +
        '・<strong>8月27日（木）</strong> 終日休業\n\n' +
        '上記以外の日は、通常どおり営業いたしております' +
        '（<strong>11:00〜15:00</strong>／日曜定休）。\n\n' +
        'お客様にはご不便をおかけいたしますが、' +
        '何卒ご了承くださいますようお願い申し上げます。\n\n' +
        'スタッフ一同、またのご来店を心よりお待ちしております。',
      titleEn: 'Closed on Thursday, August 27',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'Please note that we will be <strong>closed on the following day</strong>:\n\n' +
        '• <strong>Thursday, August 27</strong> — closed all day\n\n' +
        'On all other days we are open as usual ' +
        '(<strong>11:00 - 15:00</strong>, closed on Sundays).\n\n' +
        'We apologize for any inconvenience, and thank you for your understanding.\n\n' +
        'We look forward to welcoming you.'
    }
  ]

};
