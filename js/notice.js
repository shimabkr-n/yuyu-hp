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
