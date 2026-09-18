const https = require('https');
const http = require('http');

const candidates = [
  'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40156-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41221-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-on-a-suit-42358-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-turning-around-wearing-a-silver-dress-41224-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-for-the-camera-in-a-studio-41416-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-setting-41417-large.mp4'
];

candidates.forEach(c => {
  const req = https.request(c, {
    method: 'HEAD',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://mixkit.co/'
    }
  }, res => {
    console.log(res.statusCode, c);
  });
  req.on('error', e => console.log('ERR', c, e.message));
  req.end();
});
