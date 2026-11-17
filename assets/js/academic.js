(() => {
  const collection = document.querySelector('[data-collection]');
  if (!collection) return;

  const search = collection.querySelector('[data-search]');
  const select = collection.querySelector('[data-filter]');
  const count = collection.querySelector('[data-count]');
  const kind = collection.querySelector('[data-kind-filter]');
  const records = [...collection.querySelectorAll('[data-record]')];
  const groups = [...collection.querySelectorAll('[data-group]')];
  const field = select.dataset.filter;
  const noun = collection.dataset.collection === 'talks' ? 'talk' : 'paper';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const items = records.map(element => ({
    element,
    tags: (element.dataset[field] || '').split('|').filter(Boolean),
    text: normalize([element.dataset[field], ...[...element.querySelectorAll('h3,h4,.venue,.subtitle,.byline,.paper-meta,.archive-type,time')].map(node => node.textContent)].join(' '))
  }));

  if (field === 'topics') {
    const topics = new Set(items.flatMap(item => item.tags));
    [...topics].sort().forEach(topic => select.add(new Option(topic, topic)));
  }

  function update() {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let found = 0;
    for (const item of items) {
      const visible = words.every(word => item.text.includes(word)) && (!select.value || item.tags.includes(select.value)) && (!kind?.value || kind.value === item.element.dataset.kind);
      item.element.hidden = !visible;
      if (visible) found++;
    }
    for (const group of groups) group.hidden = !group.querySelector('[data-record]:not([hidden])');
    count.textContent = found ? found + ' ' + noun + (found === 1 ? '' : 's') : 'No matches. Try a different search or filter.';
    count.hidden = !words.length && !select.value && !kind?.value;
  }
  collection.querySelector('[data-controls]').hidden = false;
  search.addEventListener('input', update);
  select.addEventListener('change', update);
  kind?.addEventListener('change', update);
  update();

  const panel = document.getElementById('coauthors');
  if (!panel) return;
  const profiles = new Map(JSON.parse(document.getElementById('author-profiles').textContent).map(person => [person.name, person.homepage]));
  const authors = new Map();
  for (const byline of collection.querySelectorAll('.byline')) {
    for (const name of byline.textContent.split(', ')) {
      if (name && name !== 'Arun Kumar Kuchibhotla') authors.set(name, (authors.get(name) || 0) + 1);
    }
  }
  const list = document.createElement('ul');
  [...authors].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).forEach(([name, total]) => {
    const item = document.createElement('li');
    const profile = profiles.get(name);
    const author = document.createElement(profile ? 'a' : 'span');
    if (profile) author.href = profile;
    author.textContent = name;
    item.append(author, ' (' + total + ')');
    list.append(item);
  });
  panel.append(list);
})();
