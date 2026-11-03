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
      endAt: '2026-11-09 16:00',
      title: '11月6日（金）〜9日（月）は臨時休業いたします（中城護佐丸まつりに出店します）',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '悠愉樹庵は、11月7日（土）・8日（日）に開催される' +
        '「<strong>第15回中城護佐丸まつり</strong>」に出店いたします。\n' +
        '誠に勝手ながら、11月6日（金）から9日（月）までの4日間、店舗を臨時休業いたします。\n\n' +
        '・<strong>11月6日（金）</strong> まつり出店の仕込みのため\n' +
        '・<strong>11月7日（土）・8日（日）</strong> まつり出店のため\n' +
        '・<strong>11月9日（月）</strong> 代休\n\n' +
        '<strong>11月10日（火）</strong>より通常どおり営業いたします' +
        '（<strong>11:00〜15:00</strong>／日曜定休）。\n\n' +
        '【中城護佐丸まつりのご案内】\n' +
        '・日時：11月7日（土）・8日（日） 14:00〜20:00\n' +
        '・会場：中城村公共駐車場（中城村役場のそば）\n' +
        '・入場無料\n' +
        '・来場者用の駐車場はございません。' +
        '特別運行の循環バス（村内4ルート・13:00からおよそ30分おき）をご利用ください。\n' +
        '・くわしくは<a href="https://www.vill.nakagusuku.okinawa.jp/kanko/culture/festival/gosamarumatsuri/" ' +
        'target="_blank" rel="noopener" class="underline">中城村の案内ページ</a>をご覧ください。\n\n' +
        'お客様にはご不便をおかけいたしますが、' +
        '何卒ご了承くださいますようお願い申し上げます。\n\n' +
        '会場で皆さまにお会いできますことを、スタッフ一同楽しみにしております。',
      titleEn: 'Closed from Friday, November 6 to Monday, November 9 (We Will Be at the Nakagusuku Gosamaru Festival)',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'We will have a booth at the <strong>15th Nakagusuku Gosamaru Festival</strong> ' +
        'on Saturday, November 7 and Sunday, November 8.\n' +
        'Our restaurant will be closed for four days, from Friday, November 6 to Monday, November 9:\n\n' +
        '• <strong>Friday, November 6</strong>: food preparation for the festival\n' +
        '• <strong>Saturday, November 7 and Sunday, November 8</strong>: at the festival\n' +
        '• <strong>Monday, November 9</strong>: day off for our staff\n\n' +
        'We will reopen as usual on <strong>Tuesday, November 10</strong> ' +
        '(<strong>11:00 - 15:00</strong>, closed on Sundays).\n\n' +
        'About the festival:\n' +
        '• Date and time: Saturday, November 7 and Sunday, November 8, 14:00 - 20:00\n' +
        '• Venue: Nakagusuku Village Public Parking Lot (near the Village Office)\n' +
        '• Admission: free\n' +
        '• There is no parking for visitors. ' +
        'Please use the special loop buses (4 routes within the village, about every 30 minutes from 13:00).\n' +
        '• For details, please see the <a href="https://www.vill.nakagusuku.okinawa.jp/kanko/culture/festival/gosamarumatsuri/" ' +
        'target="_blank" rel="noopener" class="underline">Nakagusuku Village website</a> (in Japanese).\n\n' +
        'We apologize for any inconvenience, and thank you for your understanding.\n\n' +
        'We look forward to seeing you at the festival.'
    }
  ]

};
