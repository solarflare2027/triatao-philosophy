// Shared opening for the three existing Dao overview routes.
const portals = {
  tian: {name:'天道',verb:'看见真理',number:'01',en:'THE NATURE OF REALITY',lines:['观天之道，','执天之行，尽矣。'],alt:'人在石台尽头，面对星系与交织的宇宙网络',width:1584,height:672},
  ren: {name:'人道',verb:'创造自己',number:'02',en:'THE ART OF BECOMING',lines:['知人者智，自知者明；','胜人者有力，自胜者强。'],alt:'人沿着悬空阶梯，走向金色光线中的殿堂深处',width:2560,height:1429},
  wang: {name:'王道',verb:'改变世界',number:'03',en:'THE PRACTICE OF CREATION',lines:['日月之行，若出其中；','星汉灿烂，若出其里。'],alt:'王者与鹰立于山巅，面向云海与破晓',width:2560,height:1075}
};

export function daoPortal(id) {
  const p=portals[id];
  return `<header class="dao-portal dao-portal--${id}">
    <div class="dao-portal-heading">
      <div class="dao-portal-title"><p class="eyebrow">${p.number} / ${p.en}</p><h1>${p.name}<span>${p.verb}</span></h1></div>
      <blockquote class="dao-portal-quote">${p.lines.map(line=>`<span>${line}</span>`).join('')}</blockquote>
    </div>
    <figure class="dao-portal-image"><img src="/assets/dao-portals/${id}.jpg" width="${p.width}" height="${p.height}" alt="${p.alt}" fetchpriority="high" decoding="async">${id==='wang'?`<video class="dao-portal-video" muted loop playsinline preload="none" aria-hidden="true" data-src="/assets/dao-portals/wang-v1.mp4"></video><button class="dao-portal-playback" type="button" aria-label="暂停背景视频" hidden><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M7 5v10M13 5v10" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>`:''}</figure>
  </header>`;
}

export function initDaoPortal(root) {
  const video=root.querySelector('.dao-portal-video');
  if(!video)return()=>{};
  const button=root.querySelector('.dao-portal-playback');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false;
  const sync=()=>{
    button.setAttribute('aria-label',video.paused?'播放背景视频':'暂停背景视频');
    button.innerHTML=video.paused?'<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M6 4l10 6-10 6z" fill="currentColor"/></svg>':'<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M7 5v10M13 5v10" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  };
  const play=()=>{
    if(!video.getAttribute('src')){video.muted=true;video.src=video.dataset.src;video.load();}
    video.play().catch(()=>{if(!disposed)sync();});
  };
  const ready=()=>video.classList.add('is-ready');
  const failed=()=>{video.classList.remove('is-ready');button.hidden=true;};
  const preference=()=>{if(reduced.matches)video.pause();else play();};
  button.hidden=false;
  button.onclick=()=>video.paused?play():video.pause();
  video.addEventListener('playing',ready);
  video.addEventListener('play',sync);
  video.addEventListener('pause',sync);
  video.addEventListener('error',failed);
  reduced.addEventListener('change',preference);
  if(!reduced.matches)play();
  sync();
  return()=>{
    disposed=true;reduced.removeEventListener('change',preference);
    video.removeEventListener('playing',ready);video.removeEventListener('play',sync);
    video.removeEventListener('pause',sync);video.removeEventListener('error',failed);
    button.onclick=null;video.pause();video.removeAttribute('src');video.load();
  };
}
