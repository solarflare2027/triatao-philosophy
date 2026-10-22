// Enhancement only for generated /read/ pages. The original Hash site is unchanged.
import {readableRoutes} from './readable-routes.js?v=20261014-readable1';
const known=new Set(readableRoutes);
function convertLinks(){
 document.querySelectorAll('a[href^="#/"]').forEach(a=>{
  const [route,query]=a.getAttribute('href').slice(2).split('?');
  a.href=known.has(route)?'/read/'+(route?route+'/':'')+(query?'?'+query:''):'/#/'+route+(query?'?'+query:'');
 });
}
// Keep all original page initializers, animation, search and mobile menu behavior.
await import('./app.js?v=20261021-portals2');
convertLinks();
new MutationObserver(convertLinks).observe(document.body,{childList:true,subtree:true});
