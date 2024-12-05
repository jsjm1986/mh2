const https = require('https');
const fs = require('fs');

const url = 'https://unpkg.com/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
const file = fs.createWriteStream('lib/pptxgen.bundle.js');

https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
        file.close();
        console.log('下载完成！');
    });
}).on('error', function(err) {
    fs.unlink('lib/pptxgen.bundle.js');
    console.error('下载失败：', err.message);
}); 