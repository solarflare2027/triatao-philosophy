// Same-tab route history. Only known in-site entries may use native Back.
const key='triatao.reading-navigation.v1', marker='triataoReadingEntry';
let entries={},active=null,pending=null,restoreFrame=0,restoring=false;
try{entries=JSON.parse(sessionStorage.getItem(key)||'{}');}catch{}
if(!entries||typeof entries!=='object'||Array.isArray(entries))entries={};
for(const [id,e] of Object.entries(entries)){
 if(!e||typeof e!=='object'||typeof e.hash!=='string'||!e.hash.startsWith('#/')||!Number.isFinite(e.time)){delete entries[id];continue;}
 e.y=Number.isFinite(e.y)?Math.max(0,e.y):0;
 e.title=typeof e.title==='string'?e.title:'';
 e.details=Array.isArray(e.details)?e.details:[];
}
history.scrollRestoration='manual';
const routeHash=()=>location.hash.startsWith('#/')?location.hash:'#/'+(document.documentElement.dataset.readRoute||'')+location.search;
function persist(){
 try{
  const ids=Object.keys(entries).sort((a,b)=>entries[b].time-entries[a].time);
  ids.slice(80).forEach(id=>delete entries[id]);
  sessionStorage.setItem(key,JSON.stringify(entries));
 }catch{}
}
function capture(root){
 const entry=entries[active];if(!entry||restoring)return;
 entry.y=scrollY;
 entry.details=[...root.querySelectorAll('details')].map(d=>d.open);
 entry.filter=root.querySelector('[data-map-filter].active')?.dataset.mapFilter;
 entry.tab=root.querySelector('[data-layout-tab][aria-selected="true"]')?.dataset.layoutTab;
}
export function beginNavigation(root){
 cancelAnimationFrame(restoreFrame);capture(root);persist();
 const id=history.state?.[marker],known=typeof id==='string'&&entries[id]?.hash===routeHash();
 if(known){active=id;pending=entries[id];}
 else{
  const previous=active;
  active=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);
  entries[active]={hash:routeHash(),previous,y:0,time:Date.now(),title:''};
  history.replaceState({...history.state,[marker]:active},'');
  pending=null;
 }
 restoring=!!pending;
}
export function finishNavigation(root,path){
 document.querySelector('.return-navigation')?.remove();
 document.body.classList.toggle('has-return-navigation',!!path);
 const entry=entries[active];entry.title=path==='map'?'三道全图':root.querySelector('h1')?.textContent.trim()||'首页';
 if(path){
  const previous=entries[entry.previous],bar=document.createElement('nav');
  bar.className='return-navigation';bar.setAttribute('aria-label','返回导航');
  const control=document.createElement(previous?'button':'a');
  const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');
  const line=document.createElementNS(icon.namespaceURI,'path');line.setAttribute('d','M19 12H5m7-7-7 7 7 7');icon.append(line);
  const label=document.createElement('span');
  if(previous){
   control.type='button';label.textContent='返回上一页';
   const context=document.createElement('small');context.textContent=previous.title||'上一页';
   control.title='返回：'+context.textContent;
   control.onclick=()=>{control.disabled=true;history.back();};
   control.append(icon,label,context);
  }else{
   const parents=[...root.querySelectorAll('.breadcrumbs a[href^="#/"]')].filter(a=>a.hash!==routeHash()&&a.hash!=='#/');
   const parent=parents.at(-1);
   control.href=parent?.hash||'#/map';
   if(control.hash===routeHash())control.href='#/';
   label.textContent=parent?'返回'+parent.textContent.trim():control.hash==='#/'?'返回首页':'返回三道全图';
   control.append(icon,label);
  }
  bar.append(control);document.body.append(bar);
 }
 if(pending){
  const snapshot=pending;pending=null;
  if(snapshot.filter)[...root.querySelectorAll('[data-map-filter]')].find(b=>b.dataset.mapFilter===snapshot.filter)?.click();
  if(snapshot.tab)[...root.querySelectorAll('[data-layout-tab]')].find(b=>b.dataset.layoutTab===snapshot.tab)?.click();
  root.querySelectorAll('details').forEach((d,i)=>{if(typeof snapshot.details?.[i]==='boolean')d.open=snapshot.details[i];});
  const token=active;
  const restore=()=>{
   if(active!==token)return;
   root.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
   scrollTo({top:snapshot.y||0,behavior:'instant'});
   if(snapshot.focus){
    [...root.querySelectorAll('a[href^="#/"]')].find(a=>a.getAttribute('href')===snapshot.focus.href&&a.textContent.trim()===snapshot.focus.text)?.focus({preventScroll:true});
   }
   restoring=false;
  };
  restoreFrame=requestAnimationFrame(()=>{restore();document.fonts.ready.then(()=>{if(active===token)restoreFrame=requestAnimationFrame(restore);});});
 }else restoring=false;
 persist();
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#/"]');
 if(!a||!entries[active]||!document.querySelector('main')?.contains(a))return;
 entries[active].focus={href:a.getAttribute('href'),text:a.textContent.trim()};
});
addEventListener('pagehide',()=>{capture(document.querySelector('main'));persist();});

