import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../dist/',import.meta.url),hash=s=>createHash('sha256').update(s).digest('hex');
const manifest=JSON.parse(await readFile(new URL('readable-manifest.json',root),'utf8'));
for(const [name,expected] of Object.entries(manifest.sourceFiles)){
 if(hash(await readFile(new URL(name,root)))!==expected)throw Error('Readable pages are stale; regenerate after editing '+name);
}
const routes=new Set(manifest.pages.map(p=>p.route));
for(const path of ['index.html','read/index.html']){
 const html=await readFile(new URL(path,root),'utf8');
 const video=html.match(/<video\b[^>]*id="a16-video"[^>]*>/)?.[0];
 if(!video||/\ssrc=|\sautoplay(?:\s|=|>)|is-ready/.test(video))throw Error('Home snapshot must not preload a captured desktop video: '+path);
 if(!html.includes('id="triatao-hero-boot"'))throw Error('Missing early home video bootstrap: '+path);
}
for(const p of manifest.pages){
 const html=await readFile(new URL('read/'+(p.route?p.route+'/':'')+'index.html',root),'utf8');
 if(hash(html)!==p.htmlHash)throw Error('Generated HTML changed: '+p.route);
 if(!html.includes(`<link rel="canonical" href="${p.url}">`))throw Error('Missing canonical '+p.route);
 if(!html.includes('data-read-route="'+p.route+'"'))throw Error('Missing route '+p.route);
 if(p.textLength<100)throw Error('Empty content '+p.route);
 for(const match of html.matchAll(/href="\/read\/([^"?#]*)(?:[?#][^"]*)?"/g)){
  const target=match[1].replace(/\/$/,'');if(!routes.has(target))throw Error(`Broken readable link ${p.route} -> ${target}`);
 }
}
console.log(`通过：${manifest.pages.length} 篇静态页面、生成输入新鲜度、文件完整性与独立页面链接。`);
const practice=await readFile(new URL('practice/index.html',root),'utf8');
const practiceCanonical=await readFile(new URL('read/practice/index.html',root),'utf8');
if(practice!==practiceCanonical)throw Error('The /practice static alias is stale');
