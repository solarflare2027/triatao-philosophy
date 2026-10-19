import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {launchBrowser} from './browser-runtime.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const port=Number(process.env.READABLE_PORT||4186),origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,[fileURLToPath(new URL('./preview.mjs',import.meta.url)),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',()=>reject(Error('Preview failed to start')));});
const browser=await launchBrowser();
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>createHash('sha256').update(s).digest('hex');
const snapshots=new Map(),pending=['','map','library','practice','becoming/mechanism','becoming/cases','wang/closing'];
try{
 for(let i=0;i<pending.length;i++){
  const route=pending[i];if(snapshots.has(route))continue;
  if(route&&!/^[a-z0-9/-]+$/.test(route))throw Error('Unsafe route '+route);
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/#/'+route,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#main h1'));
  if(page.url().split('#/')[1]!==route){await context.close();continue;}
  if(errors.length)throw Error(route+': '+errors.join('; '));
  // Turn generated TOC controls into native anchors for the no-JS document only.
  const anchors=await page.evaluate(()=>{
   const pairs=[];const original=Element.prototype.scrollIntoView;
   Element.prototype.scrollIntoView=function(){window.__readingTarget=this.id;};
   document.querySelectorAll('.reading-contents button').forEach(b=>{window.__readingTarget=null;b.click();pairs.push(window.__readingTarget);});
   Element.prototype.scrollIntoView=original;return pairs;
  });
  // Reload to undo TOC clicks, focus, opened disclosures and generated return state.
  await context.close();
  const fresh=await browser.newContext({viewport:{width:1440,height:1000}}),p=await fresh.newPage();
  await p.goto(origin+'/#/'+route,{waitUntil:'networkidle'});await p.waitForFunction(()=>document.querySelector('#main h1'));
  const snapshot=await p.evaluate(({route,anchors})=>{
   const links=[...document.querySelectorAll('a[href^="#/"]')].map(a=>a.getAttribute('href').slice(2).split('?')[0]);
   const text=document.querySelector('main').textContent.replace(/\s+/g,' ').trim();
   const doc=document.documentElement.cloneNode(true);
   doc.dataset.readRoute=route;
   doc.querySelectorAll('script').forEach(s=>s.remove());
   // A snapshot must not hard-code the desktop video or a transient ready state:
   // otherwise the HTML parser downloads it in addition to the responsive hero.
   if (route === '') {
    const hero = doc.querySelector('#a16-video');
    hero?.removeAttribute('src'); hero?.removeAttribute('autoplay');
    hero?.classList.remove('is-ready'); hero?.setAttribute('preload', 'none');
    const boot = document.querySelector('#triatao-hero-boot');
    if (boot) doc.querySelector('head').insertBefore(boot.cloneNode(true), doc.querySelector('head link'));
   }
   doc.querySelector('#triatao-home-noscript')?.remove();
   doc.querySelectorAll('.return-navigation').forEach(n=>n.remove());
   doc.querySelector('body').classList.remove('has-return-navigation');
   doc.removeAttribute('style');
   // Snapshot the current full document, not only visible text or the viewport.
   doc.querySelectorAll('.reading-contents button').forEach((b,i)=>{
    if(!anchors[i])return;const a=document.createElement('a');a.href='#'+anchors[i];a.textContent=b.textContent;b.replaceWith(a);
   });
   doc.querySelectorAll('button[data-scroll],button[data-element-anchor]').forEach(b=>{
    const a=document.createElement('a');a.className=b.className;a.href='#'+(b.dataset.scroll||b.dataset.elementAnchor);a.innerHTML=b.innerHTML;b.replaceWith(a);
   });
   doc.querySelectorAll('[href],[src],[poster]').forEach(el=>{
    for(const attr of ['href','src','poster']){const value=el.getAttribute(attr);if(value&&!/^(?:#|\/|[a-z][a-z0-9+.-]*:)/i.test(value))el.setAttribute(attr,'/'+value);}
   });
   // The existing app recreates interactive DOM when JS runs. These styles only
   // make the pre-rendered fallback usable when it does not run.
   const ns=document.createElement('noscript');ns.innerHTML='<style>.reveal{opacity:1!important;transform:none!important}.reading-contents nav a{display:block;padding:.6em 0;color:inherit;text-decoration:none}#search-open,#menu-toggle,.back-top,.map-toolbar{display:none!important}[role="tabpanel"][hidden]{display:block!important}</style>';
   doc.querySelector('head').append(ns);
   const script=document.createElement('script');script.type='module';script.src='/readable.js?v=20261019-hero2';doc.querySelector('head').append(script);
   return {html:'<!doctype html>\n'+doc.outerHTML,title:document.title,text,links,description:document.querySelector('.page-intro,.be-element-essence,.be-element-intro')?.textContent.trim()||document.title};
  },{route,anchors});
  if(snapshot.text.includes('这条路径尚未展开'))throw Error('Unknown reachable route: '+route);
  snapshots.set(route,snapshot);
  for(const link of snapshot.links)if(!snapshots.has(link)&&!pending.includes(link))pending.push(link);
  await fresh.close();console.log('Captured',route||'(home)');
 }
 const routes=[...snapshots.keys()].sort();
 const sourceFiles=[];
 // Hash all authored runtime inputs; generated files never feed their own hash.
 const {readdir}=await import('node:fs/promises');
 for(const name of (await readdir(root)).sort())if(/\.(?:js|css|html)$/.test(name)&&name!=='readable-routes.js')sourceFiles.push([name,hash(await readFile(root+name))]);
 const manifest={version:1,sourceFiles:Object.fromEntries(sourceFiles),pages:[]};
 for(const [route,s] of snapshots){
  const url='https://www.triatao.com/read/'+(route?route+'/':'');
  let html=s.html.replace(/href="#\/([^"?]*)(\?[^\"]*)?"/g,(_,target,query='')=>`href="${snapshots.has(target)?'/read/'+(target?target+'/':''):'/#/'+target}${query}"`);
  html=html.replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${escape(s.description.slice(0,180))}">`);
  html=html.replace(/<link rel="canonical"[^>]*>/g,'').replace('</head>',`<link rel="canonical" href="${url}"></head>`);
  const dir=root+'read/'+(route?route+'/':'');await mkdir(dir,{recursive:true});await writeFile(dir+'index.html',html+'\n');
  if(route==='practice'){await mkdir(root+'practice/',{recursive:true});await writeFile(root+'practice/index.html',html+'\n');}
  manifest.pages.push({route,url,title:s.title,textHash:hash(s.text),textLength:s.text.length,htmlHash:hash(html+'\n')});
 }
 const homeMain=snapshots.get('').html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
 if(!homeMain)throw Error('Cannot prerender the home page main content');
 let homeHtml=await readFile(root+'index.html','utf8');
 homeHtml=homeHtml.replace(/<main\b[\s\S]*?<\/main>/,homeMain);
 if(!homeHtml.includes('id=\"triatao-home-noscript\"'))homeHtml=homeHtml.replace('</head>','<noscript id=\"triatao-home-noscript\"><style>.reveal{opacity:1!important;transform:none!important}</style></noscript></head>');
 if(!homeHtml.includes('rel=\"canonical\"'))homeHtml=homeHtml.replace('</head>','<link rel=\"canonical\" href=\"https://www.triatao.com/\"></head>');
 await writeFile(root+'index.html',homeHtml);
 const finalSources=[];for(const name of (await readdir(root)).sort())if(/\.(?:js|css|html)$/.test(name)&&name!=='readable-routes.js')finalSources.push([name,hash(await readFile(root+name))]);
 manifest.sourceFiles=Object.fromEntries(finalSources);
 await writeFile(root+'readable-routes.js',`// Generated by scripts/generate-readable-pages.mjs\nexport const readableRoutes=${JSON.stringify(routes)};\n`);
 await writeFile(root+'readable-manifest.json',JSON.stringify(manifest,null,2)+'\n');
 await writeFile(root+'sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+manifest.pages.map(p=>`  <url><loc>${p.url}</loc></url>`).join('\n')+'\n</urlset>\n');
 console.log(`Generated ${snapshots.size} complete pages. Existing pages were not removed.`);
}finally{await browser.close();server.kill();}
