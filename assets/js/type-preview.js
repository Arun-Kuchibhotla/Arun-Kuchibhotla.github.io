(() => {
  const labels = {
    current: 'DM Sans & Spectral',
    crimson: 'Crimson Text',
    barlow: 'Barlow Semi Condensed',
    instrument: 'Instrument Serif'
  };
  const font = new URLSearchParams(location.search).get('font');
  if (!Object.hasOwn(labels, font)) return;
  document.documentElement.dataset.type = font;
  document.addEventListener('DOMContentLoaded', () => {
    const note = document.querySelector('.preview-note');
    note.querySelector('[data-preview-label]').textContent = 'Font preview · ' + labels[font];
    note.hidden = false;
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const url = new URL(link.href);
      if (url.origin === location.origin && (url.pathname === '/' || url.pathname.startsWith('/docs/') || url.pathname === '/jobtalk/')) {
        url.searchParams.set('font', font);
        link.href = url.href;
      }
    }
  });
})();
