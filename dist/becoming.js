import {creationOverviewPage,creationElementPage,creationCyclePage,creationSourcesPage} from './creation.js?v=20261014-sources1';
export function becomingPage(){return creationOverviewPage();}
export function becomingElementPage(id){return creationElementPage(id);}
export function becomingReadingPage(kind){return kind==='cases'?creationSourcesPage():creationCyclePage();}
export function initBecoming(params){
 const root=document.querySelector('.becoming-page');if(!root)return;
 const old=params.get('tab'),topic=params.get('topic')||(old==='practice'?'practice':old==='cases'?'cases':null);
 if(root.classList.contains('be-framework')&&topic){
  if(topic==='practice'){location.replace('#/practice/layer/imagination');return;}
  location.replace('#/becoming/'+({loop:'mechanism',conflict:'mechanism',cases:'cases',imagination:'imagination'}[topic]||'imagination'));return;
 }
 const layer=params.get('layer');
 if(['consciousness','template','reality'].includes(layer)){
  const details=root.querySelector('#be-'+layer+'>details');
  if(details){details.open=true;requestAnimationFrame(()=>details.scrollIntoView({block:'start',behavior:'instant'}));}
 }
}
