import {practiceSearchItems} from './practice-catalog.js?v=20261014-choice11';
import {paths} from './data.js?v=20261014-acceptance4';
import {elements} from './elements.js?v=20261014-choice11';

const svg=(path,cls='')=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
const icons={menu:svg('M3 8h18M3 16h18'),search:svg('M15.5 15.5 21 21M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0'),close:svg('m6 6 12 12M6 18 18 6'),next:svg('m9 5 7 7-7 7'),back:svg('m15 5-7 7 7 7'),arrow:svg('M2 12h19m-7-7 7 7-7 7'),pause:svg('M9 5v14M15 5v14'),play:svg('m8 5 11 7-11 7Z'),muted:svg('m3 10 5 0 5-5v14l-5-5H3ZM17 9l5 6m0-6-5 6'),sound:svg('m3 10 5 0 5-5v14l-5-5H3ZM17 8q5 4 0 8M19 5q8 7 0 14')};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const row=(href,title,desc='')=>`<a class="a16-row" href="#/${href}"><span>${title}${desc?`<small>${desc}</small>`:''}</span>${icons.arrow}</a>`;
const panels={
 paths:{title:'三道体系',items:paths.map(p=>`<button class="a16-row" data-third="${p.id}"><span>${p.name}<small>${p.verb}</small></span>${icons.next}</button>`).join('')+row('map','三道全图','从整体进入每一个思想分支')},
 becoming:{title:'创造自己',items:elements.map((e,i)=>row('becoming/'+e.id,`${String(i+1).padStart(2,'0')}　${e.name}`)).join('')+row('becoming','三层九要素','意识层 · 模板层 · 实相层')},
 readings:{title:'文章与案例',items:row('essay','三道总论','从看见真理，到参与创造')+row('layout','布局','把未来带回现在')+row('case','面对质疑，我如何回应？','一次从觉察到选择的实践')+row('library','浏览文章与案例')},
 practice:{title:'创造实践',items:row('practice','创造自己的实践','从理解到体验，从体验到成为')+row('practice/exercise/from-choice-to-being','从选择到成为','框架预览 · 内容完善中')+row('becoming','回到创造自己','三层九项的理论脉络')}
};
const thirdPanels=Object.fromEntries(paths.map(p=>[p.id,{title:p.name,items:row(p.id,p.name+'篇总览',p.verb)+p.groups.map(g=>row(g.id==='knowing'?'knowing':g.id==='becoming'?'becoming':'map?focus='+g.id,g.name,g.items.map(i=>i[1]).join(' · '))).join('')} ]));
const searchEntries=[...practiceSearchItems.map(({name,summary,href})=>({name,detail:summary,href})),...paths.map(p=>({name:p.name,detail:p.verb,href:p.id})),...elements.map(e=>({name:e.name,detail:'创造自己 · '+e.essence,href:'becoming/'+e.id})),{name:'三道全图',detail:'思想结构与阅读入口',href:'map'},{name:'三道总论',detail:'世界观、人生观与价值观',href:'essay'},{name:'认识自己',detail:'三个“我”',href:'knowing'},{name:'布局',detail:'布先手、据枢纽、留自由',href:'layout'}];

export function home(){return `
 <div class="a16-home">
  <div class="a16-film" aria-hidden="true"><video id="a16-video" muted loop playsinline preload="none" poster="/assets/a16z-study/poster-fast-v1.webp"></video></div>
  <header class="a16-header"><div class="a16-header-inner">
   <button id="a16-menu-open" class="a16-icon" aria-label="打开菜单" aria-expanded="false" aria-controls="a16-menu">${icons.menu}</button>
   <a class="a16-wordmark" href="#/" aria-label="三道哲学 TRIA TAO 首页"><span class="tria-brand-type"><span>三道哲学</span><small lang="en">TRIA TAO</small></span></a>
   <button id="a16-search-open" class="a16-icon" aria-label="搜索三道哲学" aria-expanded="false" aria-controls="a16-search">${icons.search}</button>
  </div></header>
  <section class="a16-stage" aria-labelledby="a16-title"><div class="a16-stage-inner">
   <h1 id="a16-title">看见真理 · 创造自己 · 改变世界</h1>
   <p class="a16-life-motto-cn" lang="zh-CN">生命的意义在于 —— 通过体验，认识自己；通过选择，创造自己。</p>
   <p class="a16-life-motto" lang="en"><span>The meaning of life is to know yourself through experience,</span> <span>and create yourself through choice.</span></p>
   <a class="a16-invitation" href="#/start">走进三道，开始你的探索 ${icons.arrow}</a>
   <div class="a16-media-controls"><button id="a16-pause" class="a16-icon" aria-label="暂停背景视频">${icons.pause}</button><button id="a16-sound" class="a16-icon" aria-label="开启视频声音" aria-pressed="false">${icons.muted}</button></div>
   <span id="a16-media-status" role="status"></span>
  </div></section>
  <footer class="a16-footer"><div class="a16-footer-inner"><div class="a16-footer-brand"><a href="#/" class="tria-footer-lockup"><span>三道哲学</span></a><p>《哲人王》的学习与实践手册</p></div><div class="a16-footer-right">
   <nav class="a16-path-circles" aria-label="三道入口"><a href="#/tian" aria-label="天道：看见真理">天</a><a href="#/ren" aria-label="人道：创造自己">人</a><a href="#/wang" aria-label="王道：改变世界">王</a></nav>
   <div class="a16-footer-links"><span>求真 · 选择 · 创造</span><a href="#/start">走进三道</a><a href="#/map">三道全图</a><a href="#/library">文章与案例</a><a href="#/practice">创造实践</a></div>
  </div></div></footer>
  <dialog id="a16-menu" class="a16-menu" data-depth="0" aria-labelledby="a16-menu-title">
   <h2 id="a16-menu-title" class="a16-sr">三道哲学导航</h2>
   <button id="a16-menu-close" class="a16-icon a16-menu-close" aria-label="关闭菜单">${icons.close}</button>
   <div class="a16-menu-columns">
    <nav class="a16-menu-root" aria-label="主菜单"><a href="#/start">走进三道</a><a href="#/essay">三道总论</a>${Object.entries(panels).map(([id,p])=>`<button data-second="${id}" aria-expanded="false" aria-controls="a16-second"><span>${p.title}</span>${icons.next}</button>`).join('')}<a href="#/map">三道全图</a><p>看见真理<br>创造自己<br>改变世界</p></nav>
    <section id="a16-second" class="a16-menu-panel" hidden><div class="a16-panel-bar"><button class="a16-icon" data-back="0" aria-label="返回主菜单">${icons.back}</button><h3></h3></div><div class="a16-panel-body"></div></section>
    <section id="a16-third" class="a16-menu-panel" hidden><div class="a16-panel-bar"><button class="a16-icon" data-back="1" aria-label="返回三道体系">${icons.back}</button><h3></h3></div><div class="a16-panel-body"></div></section>
   </div>
  </dialog>
  <section id="a16-search" class="a16-search" hidden aria-label="搜索"><div class="a16-search-field"><label class="a16-sr" for="a16-search-input">搜索思想、文章与实践</label><input id="a16-search-input" type="search" placeholder="搜索思想、文章与实践…" autocomplete="off"><button id="a16-search-close" class="a16-icon" aria-label="关闭搜索">${icons.close}</button></div><div class="a16-search-results"><p id="a16-search-count" role="status"></p><div id="a16-search-list"></div></div></section>
 </div>`;}

export function initHome(){
 const warmVideo=window.__triataoHeroVideo;
 if(warmVideo){warmVideo.__heroCleanup?.();warmVideo.autoplay=false;document.querySelector('#a16-video').replaceWith(warmVideo);delete window.__triataoHeroVideo;}

 const $=s=>document.querySelector(s),dialog=$('#a16-menu'),open=$('#a16-menu-open'),search=$('#a16-search'),searchOpen=$('#a16-search-open'),input=$('#a16-search-input'),video=$('#a16-video'),pause=$('#a16-pause'),sound=$('#a16-sound'),second=$('#a16-second'),third=$('#a16-third');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),portrait=matchMedia('(max-aspect-ratio:5/4)'),compact=matchMedia('(max-width:1023px)');let depth=0,disposed=false,activeSecond='paths';
 function setDepth(value){depth=value;dialog.dataset.depth=String(value);second.hidden=value<1;third.hidden=value<2;dialog.style.setProperty('--layers',value+1);dialog.querySelector('.a16-menu-root').inert=compact.matches&&value>0;second.inert=compact.matches&&value>1;if(value===0)dialog.querySelectorAll('[data-second]').forEach(b=>b.setAttribute('aria-expanded','false'));}
 const layoutChange=()=>{setDepth(depth);if(dialog.open&&compact.matches&&depth>0)(depth===2?third:second).querySelector('[data-back]').focus({preventScroll:true});};compact.addEventListener('change',layoutChange);
 function closeMenu(){dialog.close();}
 const onClose=()=>{open.setAttribute('aria-expanded','false');document.body.classList.remove('a16-menu-open');open.focus({preventScroll:true});};
 dialog.addEventListener('close',onClose);
 open.onclick=()=>{closeSearch(false);setDepth(0);dialog.showModal();open.setAttribute('aria-expanded','true');document.body.classList.add('a16-menu-open');$('#a16-menu-close').focus({preventScroll:true});};
 $('#a16-menu-close').onclick=closeMenu;
 dialog.onclick=e=>{
  const rect=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)){closeMenu();return;}
  const b=e.target.closest('[data-second]'),t=e.target.closest('[data-third]'),back=e.target.closest('[data-back]');
  if(b){activeSecond=b.dataset.second;const p=panels[activeSecond];second.querySelector('h3').textContent=p.title;second.querySelector('.a16-panel-body').innerHTML=p.items;dialog.querySelectorAll('[data-second]').forEach(x=>x.setAttribute('aria-expanded',String(x===b)));setDepth(1);second.querySelector('.a16-panel-body').scrollTop=0;if(innerWidth<1024)second.querySelector('[data-back]').focus({preventScroll:true});}
  if(t){const p=thirdPanels[t.dataset.third];third.querySelector('h3').textContent=p.title;third.querySelector('.a16-panel-body').innerHTML=p.items;setDepth(2);third.querySelector('.a16-panel-body').scrollTop=0;if(innerWidth<1024)third.querySelector('[data-back]').focus({preventScroll:true});}
  if(back){const next=Number(back.dataset.back);setDepth(next);if(next===0)dialog.querySelector(`[data-second="${activeSecond}"]`)?.focus({preventScroll:true});else second.querySelector('[data-third]')?.focus({preventScroll:true});}
  if(e.target.closest('a[href^="#/"]'))closeMenu();
 };
 function results(){const q=input.value.trim().toLowerCase(),items=q?searchEntries.filter(e=>(e.name+' '+e.detail).toLowerCase().includes(q)):searchEntries.filter(e=>['map','essay','knowing','practice'].includes(e.href));$('#a16-search-count').textContent=q?`${items.length} 个结果`:'从这些入口开始';$('#a16-search-list').innerHTML=items.length?items.map(e=>row(e.href,esc(e.name),esc(e.detail))).join(''):'<p class="a16-empty">没有找到相关内容。试试“身份”“信念”或“三道全图”。</p>';}
 function closeSearch(returnFocus=true){search.hidden=true;searchOpen.setAttribute('aria-expanded','false');if(returnFocus)searchOpen.focus({preventScroll:true});}
 function showSearch(){search.hidden=false;searchOpen.setAttribute('aria-expanded','true');results();input.focus({preventScroll:true});}
 searchOpen.onclick=()=>search.hidden?showSearch():closeSearch();$('#a16-search-close').onclick=()=>closeSearch();input.oninput=results;
 const outside=e=>{if(!search.hidden&&!search.contains(e.target)&&!searchOpen.contains(e.target))closeSearch(false);};
 const keys=e=>{const typing=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName);if((e.key==='/'&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();e.stopImmediatePropagation();if(dialog.open)closeMenu();showSearch();}else if(e.key==='Escape'&&!search.hidden){e.preventDefault();e.stopImmediatePropagation();closeSearch();}};
 document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keys,true);
 function syncVideo(){const stopped=video.paused;pause.innerHTML=stopped?icons.play:icons.pause;pause.setAttribute('aria-label',stopped?'播放背景视频':'暂停背景视频');sound.innerHTML=video.muted?icons.muted:icons.sound;sound.setAttribute('aria-label',video.muted?'开启视频声音':'关闭视频声音');sound.setAttribute('aria-pressed',String(!video.muted));}
 const play=()=>{video.play().catch(()=>{if(!disposed)syncVideo();});};
 function loadVideo(){
  if(disposed)return;
  const src=portrait.matches?'/assets/a16z-study/portrait-fast-v2.mp4':'/assets/a16z-study/landscape-fast-v2.mp4';
  const wasPlaying=!video.paused;
  if(video.getAttribute('src')!==src){video.classList.remove('is-ready');video.src=src;video.load();}
  if((!reduce.matches&&!video.__heroUserPaused)||wasPlaying)play();syncVideo();
 }
 let frameCallback=null;
 const reveal=()=>{if(!disposed)video.classList.add('is-ready');};
 const ready=()=>{
  if(disposed)return;
  if(video.requestVideoFrameCallback&&!video.paused){
   if(frameCallback!==null)video.cancelVideoFrameCallback(frameCallback);
   frameCallback=video.requestVideoFrameCallback(()=>{frameCallback=null;reveal();});
  }else reveal();
 };
 video.addEventListener('loadeddata',ready);
 video.addEventListener('playing',ready);

 pause.onclick=()=>{if(!video.getAttribute('src'))loadVideo();video.__heroUserPaused=!video.paused;video.paused?play():video.pause();syncVideo();};sound.onclick=()=>{video.muted=!video.muted;if(video.paused){video.__heroUserPaused=false;play();}syncVideo();};
 const preference=()=>{if(reduce.matches)video.pause();else if(!video.getAttribute('src'))loadVideo();else play();syncVideo();};
 const failure=()=>{video.classList.remove('is-ready');$('#a16-media-status').textContent='当前显示静态画面';pause.disabled=true;sound.disabled=true;};
 video.addEventListener('play',syncVideo);video.addEventListener('pause',syncVideo);video.addEventListener('volumechange',syncVideo);video.addEventListener('error',failure);portrait.addEventListener('change',loadVideo);reduce.addEventListener('change',preference);
 if(!reduce.matches)loadVideo();if(video.readyState>=2)ready();syncVideo();
 return()=>{disposed=true;if(frameCallback!==null)video.cancelVideoFrameCallback(frameCallback);video.removeEventListener('loadeddata',ready);video.removeEventListener('playing',ready);video.pause();video.removeAttribute('src');video.load();dialog.removeEventListener('close',onClose);if(dialog.open)dialog.close();document.body.classList.remove('a16-menu-open');document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keys,true);portrait.removeEventListener('change',loadVideo);compact.removeEventListener('change',layoutChange);reduce.removeEventListener('change',preference);video.removeEventListener('play',syncVideo);video.removeEventListener('pause',syncVideo);video.removeEventListener('volumechange',syncVideo);video.removeEventListener('error',failure);};
}
