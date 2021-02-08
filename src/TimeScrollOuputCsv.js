const C = (d, r) => {
  const c =
    'data:text/csv;carset=utf-8,' +
    r
      .map((j) => [j.realtimeTimeOnPageAvg, j.realtimeScrollDepthAvg, j.uuid])
      .map((e) => e.join(','))
      .join('\n');
  const u = encodeURI(c);
  const l = document.createElement('a');
  l.setAttribute('href', u);
  l.setAttribute('download', `${d.split('.')[0]}.csv`);
  document.body.appendChild(l);
  l.click();
};

const E = (h) =>
  Promise.all(
    Array.from(document.querySelector('tbody').querySelectorAll('a'))
      .filter((a) => !a.getAttribute('class'))
      .map((a) => a.getAttribute('href').replace(/\/articles\/(.*)\/24h/, '$1'))
      .map((i) =>
        h == process.env.S
          ? `${process.env.SA}=${i}&timespan=24h&organicOnly=all`
          : `${process.env.AA}=${i}&timespan=24h&organicOnly=all`
      )
      .map((u) => fetch(u, { credentials: 'include', headers: { 'User-Agent': process.env.UA } }))
  )
    .then((r) => Promise.all(r.map((e) => e.json())))
    .then((r) => C(document.domain, r));

if ([process.env.S, process.env.A].includes(location.href)) {
  E(location.href);
} else {
  alert('Visit the Home page dashboard!');
}
