const https = require('https');
function getLogo(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const matches = html.match(/cdn\.shopify\.com\/s\/files\/[^"'\s]+(?:logo|brand)[^"'\s]*\.(?:png|jpg|svg|webp)/gi);
        resolve(matches ? matches.slice(0, 3) : []);
      });
    }).on('error', () => resolve([]));
  });
}
async function run() {
  console.log('Breakout:', await getLogo('https://www.breakout.com.pk/'));
  console.log('LAMA:', await getLogo('https://lamaretail.com/'));
  console.log('Sana Safinaz:', await getLogo('https://sanasafinaz.com/'));
  console.log('Baroque:', await getLogo('https://baroque.pk/'));
}
run();
