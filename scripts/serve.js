// 极简静态文件服务器 —— 给朗朗本地预览新站
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = 'D:\\langlang-mijia-site';
const PORT = 8791;
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url.endsWith('/')) url += 'index.html';
  let fp = path.join(ROOT, url);
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(fp,(e,data)=>{
    if (e){ if(!req.url.includes('favicon')) res.writeHead(404); res.end('404 '+url); return; }
    res.writeHead(200,{'Content-Type': MIME[path.extname(fp).toLowerCase()]||'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT,'127.0.0.1',()=>console.log('serving '+ROOT+' at http://127.0.0.1:'+PORT));
