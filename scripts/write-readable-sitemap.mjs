import {readFile,writeFile,access} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const root=new URL('../dist/',import.meta.url);
export async function writeReadableSitemap(previousXml=''){
 const manifest=JSON.parse(await readFile(new URL('readable-manifest.json',root),'utf8'));
 const urls=new Set(manifest.pages.map(p=>p.url));
 // Keep independently authored static articles that the SPA intentionally redirects to.
 for(const match of previousXml.matchAll(/<loc>(https:\/\/www\.triatao\.com\/read\/[^<]*)<\/loc>/g)){
  const url=new URL(match[1]);const relative=url.pathname.slice(1);
  if(relative.split('/').includes('..'))continue;
  try{await access(new URL(relative+'index.html',root));urls.add(url.href);}catch{}
 }
 await writeFile(new URL('sitemap.xml',root),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...urls].sort().map(url=>'  <url><loc>'+url+'</loc></url>').join('\n')+'\n</urlset>\n');
 return urls.size;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const path=process.argv[2];console.log('Sitemap URLs:',await writeReadableSitemap(path?await readFile(path,'utf8'):await readFile(new URL('sitemap.xml',root),'utf8')));
}
