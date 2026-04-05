/* ============================================================
   instagram.js — Instagram投稿の自動表示
   data/instagram.json を読み込んでグリッド表示
   ============================================================ */

(function() {
  var container = document.getElementById('instagram-embed');
  if (!container) return;

  fetch('/data/instagram.json', { cache: 'no-cache' })
    .then(function(res) {
      if (!res.ok) throw new Error('Failed to load Instagram feed');
      return res.json();
    })
    .then(function(data) {
      if (!data.posts || data.posts.length === 0) {
        // 投稿がない場合は何も表示しない（CTAボタンのみ）
        container.style.display = 'none';
        return;
      }

      var html = '';
      data.posts.slice(0, 6).forEach(function(post) {
        // VIDEO の場合は thumbnail_url、それ以外は media_url を使う
        var imgUrl = post.thumbnail_url || post.media_url;
        var caption = (post.caption || '').substring(0, 80).replace(/\n/g, ' ');
        html +=
          '<a href="' + post.permalink + '" target="_blank" rel="noopener" ' +
          'class="block relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow group">' +
            '<img src="' + imgUrl + '" alt="' + caption.replace(/"/g, '&quot;') + '" ' +
            'loading="lazy" class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300">' +
            (post.media_type === 'VIDEO' ?
              '<div class="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">▶ Video</div>'
              : '') +
          '</a>';
      });
      container.innerHTML = html;
    })
    .catch(function(err) {
      // エラー時はセクションを非表示（CTAボタンのみ表示）
      console.warn('Instagram feed load failed:', err);
      container.style.display = 'none';
    });
})();
