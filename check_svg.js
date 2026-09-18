const https = require('https');
function getSvg(url, brand) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let html = '';
    res.on('data', c => html += c);
    res.on('end', () => {
      const svgs = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
      console.log(brand, 'found svgs:', svgs.length);
      svgs.forEach((s, idx) => {
        if (s.toLowerCase().includes('logo') || s.toLowerCase().includes('brand') || idx === 0) {
          console.log(brand, 'candidate svg:', s.slice(0, 150));
        }
      });
    });
  });
}
getSvg('https://www.breakout.com.pk/', 'Breakout');
getSvg('https://lamaretail.com/', 'Lama');
getSvg('https://baroque.pk/', 'Baroque');
