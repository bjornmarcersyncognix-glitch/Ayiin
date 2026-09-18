const https = require('https');
function getHeaderHtml(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        // extract <header> or first 20KB
        const header = html.slice(0, 30000);
        const imgs = header.match(/<img[^>]+>/gi) || [];
        resolve(imgs.slice(0, 10));
      });
    }).on('error', () => resolve([]));
  });
}
async function run() {
  console.log('Breakout imgs:', await getHeaderHtml('https://www.breakout.com.pk/'));
  console.log('Lama imgs:', await getHeaderHtml('https://lamaretail.com/'));
  console.log('Sana imgs:', await getHeaderHtml('https://sanasafinaz.com/'));
}
run();
