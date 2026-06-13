(function () {
  'use strict';

  function embedSrc(showUrl) {
    return (
      'https://www.mixcloud.com/widget/iframe/?feed=' +
      encodeURIComponent(showUrl) +
      '&hide_cover=0&hide_artwork=0&light=0'
    );
  }

  function renderShows() {
    var root = document.getElementById('sets-list');
    if (!root || typeof EDOMITE_SHOWS === 'undefined') return;

    var frag = document.createDocumentFragment();

    EDOMITE_SHOWS.forEach(function (show) {
      var card = document.createElement('article');
      card.className = 'set-card';

      var media = document.createElement('div');
      media.className = 'set-media';

      if (show.image) {
        var art = document.createElement('img');
        art.className = 'set-art';
        art.src = show.image;
        art.alt = '';
        art.width = 120;
        art.height = 120;
        art.loading = 'lazy';
        art.decoding = 'async';
        media.appendChild(art);
      }

      var body = document.createElement('div');
      body.className = 'set-body';

      var title = document.createElement('h2');
      title.className = 'set-title';
      title.textContent = show.title;

      var iframe = document.createElement('iframe');
      iframe.className = 'set-frame';
      iframe.loading = 'lazy';
      iframe.allow =
        'encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share';
      iframe.src = embedSrc(show.url);
      iframe.title = show.title + ' — Mixcloud player';

      body.appendChild(title);
      body.appendChild(iframe);
      media.appendChild(body);
      card.appendChild(media);
      frag.appendChild(card);
    });

    root.innerHTML = '';
    root.appendChild(frag);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShows);
  } else {
    renderShows();
  }
})();