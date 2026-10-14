import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {launchBrowser} from './browser-runtime.mjs';
const manifest=JSON.parse(await readFile(new URL('../dist/readable-manifest.json',import.meta.url),'utf8'));
const port=Number(process.env.READABLE_TEST_PORT||4187),origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,[fileURLToPath(new URL('./preview.mjs',import.meta.url)),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',()=>reject(Error('Preview failed')));});
const browser=await launchBrowser(),results=[];
const hash=s=>createHash('sha256').update(s).digest('hex');
try{
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const page=await nojs.newPage();
 for(const entry of manifest.pages){
  const response=await page.goto(origin+'/read/'+(entry.route?entry.route+'/':''));assert.equal(response.status(),200);
  const body=await page.locator('main').textContent();const text=body.replace(/\s+/g,' ').trim();
  assert.equal(hash(text),entry.textHash,'Full text differs: '+entry.route);
  assert.equal(await page.title(),entry.title);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),entry.url);
  // Every local article link must point to a generated page; section anchors must exist.
  const anchors=await page.locator('a[href^="#"]').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),exists:!!document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))})));
  for(const a of anchors)assert(a.href==='#'||a.exists,'Missing anchor '+entry.route+' '+a.href);
  assert(await page.locator('main h1').isVisible(),'No-JS heading hidden '+entry.route);
  results.push({route:entry.route,noJavaScript:true,fullTextMatch:true,characters:text.length});
 }
 const practiceAlias=await page.goto(origin+'/practice/');assert.equal(practiceAlias.status(),200);
 const aliasText=(await page.locator('main').textContent()).replace(/\s+/g,' ').trim();
 assert.equal(hash(aliasText),manifest.pages.find(e=>e.route==='practice').textHash,'No-JS /practice alias text');
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.triatao.com/read/practice/');
 const homeResponse=await page.goto(origin+'/');assert.equal(homeResponse.status(),200);
 const homeText=(await page.locator('main').textContent()).replace(/\s+/g,' ').trim();
 assert.equal(hash(homeText),manifest.pages.find(e=>e.route==='').textHash,'No-JS home page text');
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.triatao.com/');
 await nojs.close();
 for(const width of [1440,390]){
  for(const route of ['practice','becoming/identity','wang','practice/layer/identity','practice/exercise/from-choice-to-being']){
   for(const mode of ['hash','read']){
    const c=await browser.newContext({viewport:{width,height:900}}),p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
    const res=await p.goto(origin+(mode==='hash'?'/#/'+route:'/read/'+route+'/'),{waitUntil:'networkidle'});
    assert.equal(res.status(),200);assert.equal(errors.length,0,errors.join('; '));
    assert(await p.locator('main h1').isVisible());
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+mode+' '+route+' '+width);
    const expected=manifest.pages.find(e=>e.route===route);assert.equal(await p.title(),expected.title);
    const text=(await p.locator('main').textContent()).replace(/\s+/g,' ').trim();assert.equal(hash(text),expected.textHash,'JS text '+mode+' '+route);
    const details=p.locator('main details').first();if(await details.count()){
     const old=await details.evaluate(e=>e.open);await details.locator('summary').first().click();assert.equal(await details.evaluate(e=>e.open),!old);
    }
    if(width===390){await p.locator('#menu-toggle').click();assert(await p.locator('#mobile-nav').isVisible());await p.keyboard.press('Escape');assert(!(await p.locator('#mobile-nav').isVisible()));}
    if(route==='practice'||route==='becoming/identity'){
     await mkdir(new URL('../outputs/readable/',import.meta.url),{recursive:true});
     await p.screenshot({path:fileURLToPath(new URL(`../outputs/readable/${mode}-${route.replaceAll('/','-')}-${width}.png`,import.meta.url)),fullPage:false});
    }
    results.push({route,mode,width,interactive:true,overflow:false});await c.close();
   }
  }
 }
 // Exercise the actual theory -> practice -> theory journey on new and old URLs.
 for(const prefix of ['/read/becoming/identity/','/#/becoming/identity']){
  const c=await browser.newContext(),p=await c.newPage();await p.goto(origin+prefix,{waitUntil:'networkidle'});
  const isRead=prefix.startsWith('/read/');const practice=isRead?'/read/practice/layer/identity/':'#/practice/layer/identity';
  await p.locator(`main a[href="${practice}"]`).first().click();await p.waitForURL(isRead?'**/read/practice/layer/identity/':'**/#/practice/layer/identity');
  await p.waitForLoadState('networkidle');
  await p.locator(`main a[href="${isRead?'/read/becoming/identity/':'#/becoming/identity'}"]`).first().click();await p.waitForLoadState('networkidle');
  assert((await p.locator('h1').textContent()).includes('身份'));await c.close();
 }
 const c=await browser.newContext(),p=await c.newPage();assert.equal((await p.goto(origin+'/read/does-not-exist/')).status(),404);await c.close();
 await mkdir(new URL('../outputs/readable/',import.meta.url),{recursive:true});
 await writeFile(new URL('../outputs/readable/verification.json',import.meta.url),JSON.stringify({pages:manifest.pages.length,results},null,2));
 console.log(`Passed: ${manifest.pages.length} complete no-JS texts; desktop/mobile old/new routes, interactions, round-trip links, real 404.`);
}finally{await browser.close();server.kill();}
