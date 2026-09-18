const https = require('https');

function getPage(url) {
  return new Promise(res => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(d));
    }).on('error', () => res(''));
  });
}

async function run() {
  const b = await getPage('https://www.breakout.com.pk/');
  const l = await getPage('https://lamaretail.com/');
  const s = await getPage('https://sanasafinaz.com/');
  const bq = await getPage('https://baroque.pk/');

  const findImg = (html, name) => {
    const m = html.match(/\/\/[^"']+\.(?:png|jpg|svg|webp)/gi) || [];
    const candidates = m.filter(x => /logo|brand/i.test(x));
    console.log(name, candidates.slice(0, 5));
  };

  findImg(b, 'Breakout');
  findImg(l, 'Lama');
  findImg(s, 'Sana');
  findImg(bq, 'Baroque');
}
run();
