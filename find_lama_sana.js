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
  const l = await getPage('https://lamaretail.com/');
  const s = await getPage('https://sanasafinaz.com/');
  
  const m1 = l.match(/cdn\/shop\/files\/[^"'\s]+\.(?:png|jpg|svg|webp)/gi) || [];
  console.log('Lama CDN files:', m1.slice(0, 10));

  const m2 = s.match(/cdn\/shop\/files\/[^"'\s]+\.(?:png|jpg|svg|webp)/gi) || [];
  console.log('Sana CDN files:', m2.slice(0, 10));
}
run();
