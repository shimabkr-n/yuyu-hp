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
      endAt: '2026-08-08 15:00',
      title: '本日8月8日（土）は通常どおり営業いたします（沖縄そばとじゅーしーのみのご提供）',
      body:
        'いつも悠愉樹庵をご利用いただき、誠にありがとうございます。\n\n' +
        '台風13号の影響により8月7日（金）は臨時休業とさせていただきましたが、' +
        '本日<strong>8月8日（土）は通常どおり営業</strong>いたします。\n\n' +
        'なお、<strong>本日は沖縄そばとじゅーしーのみのご提供</strong>となります。' +
        '定食・チャンプルー・デザートなど、そのほかのお料理はご用意がございません。\n\n' +
        '・営業時間：<strong>11:00 〜 15:00</strong>\n' +
        '・8月9日（日）は<strong>通常どおり定休日</strong>です\n\n' +
        '提供メニューを限らせていただくことになり申し訳ございません。\n\n' +
        'スタッフ一同、皆さまのご来店を心よりお待ちしております。',
      titleEn: 'Open Today (Saturday, August 8) — Okinawa Soba & Jushii Only',
      bodyEn:
        'Thank you very much for your continued patronage of Yuyu-Juan.\n\n' +
        'We were closed on Friday, August 7 due to Typhoon No. 13. ' +
        'Today, <strong>Saturday, August 8, we are open as usual</strong>.\n\n' +
        'Please note that <strong>today we are serving only Okinawa Soba and ' +
        'Jushii (Okinawan mixed rice)</strong>. Set meals, champuru stir-fries, ' +
        'side sets and desserts are not available.\n\n' +
        'Both our soba and our jushii are prepared with pork and pork-bone broth, ' +
        'so <strong>we have no vegetarian options today</strong>. We sincerely apologize.\n\n' +
        '• Hours: <strong>11:00 - 15:00</strong>\n' +
        '• We are closed on Sunday, August 9, as usual\n\n' +
        'Thank you for your understanding. We look forward to welcoming you.'
    }
  ]

};
