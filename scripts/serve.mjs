import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root=resolve(process.cwd(),'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
createServer((req,res)=>{
 let url;
 try {url=new URL(req.url,'http://localhost');} catch {res.writeHead(400).end();return;}
 const path=resolve(root,decodeURIComponent(url.pathname).replace(/^\/+/,'' )||'index.html');
 if(!(path===root||path.startsWith(root+sep))||!existsSync(path)||!statSync(path).isFile()){res.writeHead(404).end('Not found');return;}
 res.writeHead(200,{'content-type':mime[extname(path)]||'application/octet-stream','cache-control':'no-store'});
 res.end(readFileSync(path));
}).listen(4173,'127.0.0.1',()=>console.log('Test server http://127.0.0.1:4173'));
