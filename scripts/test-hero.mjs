import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {launchBrowser} from './browser-runtime.mjs';
const port=Number(process.env.HERO_TEST_PORT||4188),origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,[fileURLToPath(new URL('./preview.mjs',import.meta.url)),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',()=>reject(Error('Preview failed')));});
const browser=await launchBrowser();
try{
 for(const width of [1440,390])for(const path of ['/','/read/']){
  const c=await browser.newContext({viewport:{width,height:900}}),p=await c.newPage(),requests=[],fonts=[],errors=[];
  p.on('request',r=>{if(r.url().includes('.mp4'))requests.push(r.url());if(r.url().includes('.woff2'))fonts.push(r.url());});p.on('pageerror',e=>errors.push(e.message));
  // Hold the entire app graph: the first frame and media controls must work anyway.
  let release;const held=new Promise(resolve=>{release=resolve;});
  await p.route('**/app.js*',async route=>{await held;await route.continue();});
  try{
   await p.goto(origin+path,{waitUntil:'commit'});
   await p.waitForFunction(()=>{const v=document.querySelector('#a16-video');return v&&!v.paused&&v.currentTime>.1&&v.classList.contains('is-ready');});
   assert(await p.evaluate(()=>!!window.__triataoHeroVideo),'App should still be held');
   assert.equal(new Set(requests).size,1,'Only one responsive asset may load');
   assert(requests.every(url=>url.includes(width===390?'portrait-fast-v2.mp4':'landscape-fast-v2.mp4')));
   await p.locator('#a16-pause').click();await p.waitForFunction(()=>document.querySelector('#a16-video').paused);
   release();await p.waitForFunction(()=>!window.__triataoHeroVideo&&!!document.querySelector('#a16-menu-open')?.onclick);
   assert(!fonts.some(url=>url.includes('/gen-ryu-min.woff2')),'Home should not download the full reading font');
   assert(await p.locator('#a16-video').evaluate(v=>v.paused),'App handoff must preserve an early pause');
   await p.locator('#a16-pause').click();await p.waitForFunction(()=>!document.querySelector('#a16-video').paused);
   await p.locator('#a16-sound').click();assert(await p.locator('#a16-video').evaluate(v=>!v.muted));
   await p.locator('#a16-sound').click();assert(await p.locator('#a16-video').evaluate(v=>v.muted));
   await p.evaluate(()=>{window.__previousHero=document.querySelector('#a16-video');location.hash='#/start';});
   await p.waitForFunction(()=>document.querySelector('main h1')?.textContent==='认识《三道哲学》');
   assert(await p.evaluate(()=>window.__previousHero.paused&&!window.__previousHero.hasAttribute('src')));
   await p.evaluate(()=>{location.hash='#/';});await p.waitForFunction(()=>{const v=document.querySelector('#a16-video');return v&&!v.paused&&v.currentTime>.1;});
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.deepEqual(errors,[]);console.log(`Passed: ${path} ${width}px first frame before app; single asset; controls, handoff and route return.`);
  }finally{release();await c.close();}
 }
 for(const path of ['/','/read/','/#/start','/read/start/']){
  const c=await browser.newContext({reducedMotion:'reduce'}),p=await c.newPage(),requests=[];
  p.on('request',r=>{if(r.url().includes('.mp4'))requests.push(r.url());});
  await p.goto(origin+path,{waitUntil:'networkidle'});assert.deepEqual(requests,[],'Reduced motion / article should not fetch video');
  if(path==='/'||path==='/read/'){
   await p.locator('#a16-pause').click();await p.waitForFunction(()=>!document.querySelector('#a16-video').paused);assert.equal(requests.length,1,'Explicit play remains available');
  }
  await c.close();
 }
 const c=await browser.newContext(),p=await c.newPage(),requests=[];p.on('request',r=>{if(r.url().includes('.mp4'))requests.push(r.url());});
 await p.goto(origin+'/#/start',{waitUntil:'networkidle'});assert.deepEqual(requests,[],'Direct hash article must not preload the home video');await c.close();
 console.log('Passed: reduced motion, explicit play and direct article entry.');
}finally{await browser.close();server.kill();}
