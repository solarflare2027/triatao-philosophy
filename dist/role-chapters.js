// One authored essay, three reading pages. Boundaries keep every original section intact.
const route='knowing/external-self';
const parts=[
 {id:'names',number:'第一部',title:'名为相',question:'我以为我是谁？',deck:'名字、故事、身份与评价，怎样组成我们熟悉的“我”。',alt:'同一位人物站在后台的镜子前，将面具从脸前轻轻移开，身旁的衣服、照片与名片提示不同的身份。',caption:'名字让人认出你，角色帮助你生活。它们仍说不完你。'},
 {id:'attachment',number:'第二部',title:'谁在执着于名？',question:'我在为什么奔忙？',deck:'从名相往下看：我想得到什么，又在害怕失去什么？',alt:'人物坐在桌前，一只手想为自己辩解，另一只手停下来；来自画框和奖章的细线牵着衣袖。',caption:'先看见牵动自己的那根线，才有机会改变下一次回应。'},
 {id:'release',number:'第三部',title:'松开',question:'怎样与它相处？',deck:'既不被角色拖着走，也不退出现实。把选择带回眼前的一件事。',alt:'人物在明亮的工作间轻轻放下面具、松开衣袖的细线，桌上的笔记与工作仍在。',caption:'松开束缚之后，仍认真做事，也照顾那个正在生活的人。'}
];
const link=(p)=>`#/${route}/${p.id}`;
const crumbs=(part)=>`<nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a><span>/</span><a href="#/ren">人道</a><span>/</span><a href="#/knowing">认识自己</a><span>/</span>${part?`<a href="#/${route}">外在角色我</a><span>/</span><span aria-current="page">${part.title}</span>`:'<span aria-current="page">外在角色我</span>'}</nav>`;
const photo=(p,card=false)=>`<img src="/assets/role-self/${p.id}-1440.webp" srcset="/assets/role-self/${p.id}-720.webp 720w, /assets/role-self/${p.id}-1440.webp 1440w" sizes="${card?'(max-width:600px) 110px, (max-width:900px) 32vw, 340px':'(max-width:600px) calc(100vw - 48px), 760px'}" width="1440" height="960" alt="${p.alt}" decoding="async" ${card?'loading="eager"':'fetchpriority="high"'}>`;
const chapterNav=(current)=>`<nav class="rc-chapter-nav" aria-label="外在角色我三部"><a class="rc-directory" href="#/${route}">本章导读</a>${parts.map(p=>`<a href="${link(p)}" ${p.id===current?'aria-current="page"':''}><small>${p.number}</small><span>${p.title}</span></a>`).join('')}</nav>`;
function splitEssay(html){
 const at=(s)=>{const i=html.indexOf(s);if(i<0)throw Error('Missing role chapter boundary: '+s);return i;};
 const start=at('<section aria-labelledby="er-prologue"');
 const p1=at('<div class="part" id="er-p1">'),p2=at('<div class="part" id="er-p2">'),p3=at('<div class="part" id="er-p3">');
 const appendix=at('<details class="er-fold" id="er-map">'),end=html.lastIndexOf('</div></article>');
 if(!(start<p1&&p1<p2&&p2<p3&&p3<appendix&&appendix<end))throw Error('Role chapter boundaries out of order');
 const clean=s=>s.replace(/<div class="part" id="er-p[123]">[\s\S]*?<\/div>/,'');
 return {names:clean(html.slice(start,p2)),attachment:clean(html.slice(p2,p3)),release:clean(html.slice(p3,appendix)),appendix:html.slice(appendix,end)};
}
const nameExamples=[
 {name:'名字',example:'“我叫林川。”',work:'让别人能认出、称呼和找到你。',boundary:'名字可以改变；它不是一个人全部的感受与可能。',target:'er-name-1'},
 {name:'故事',example:'“我从小就不擅长表达。”',work:'把过去的经历连起来，帮助理解自己。',boundary:'过去有事实；关于事实的解释，还可以重新检查。',target:'er-name-2'},
 {name:'名分',example:'“我是团队负责人。”',work:'说明你在关系里的位置、职责与边界。',boundary:'担任负责人，是正在承担的工作，不是全部的你。',target:'er-name-3'},
 {name:'名声',example:'“别人觉得我很可靠。”',work:'让你看见自己在别人眼中的形象。',boundary:'别人的看法可以提供反馈，也可能不完整。',target:'er-name-4'},
 {name:'功名',example:'“我应该成为一个成功的人。”',work:'指向未来的目标、期待与理想。',boundary:'检查这个“应该”从哪里来，再决定自己愿意选择什么。',target:'er-name-5'}
];
function namesDiagram(){return `<figure class="rc-visual rc-names" aria-labelledby="rc-names-title"><figcaption><small>换一个名，看看它在做什么</small><strong id="rc-names-title">一张名片，能说完一个人吗？</strong></figcaption><div class="rc-name-person" aria-hidden="true"><svg viewBox="0 0 240 140"><path d="M34 12h172v116H34Z" class="rc-outline"/><circle cx="80" cy="52" r="19"/><path d="M48 108c0-42 64-42 64 0M132 40h50M132 58h35M132 82h50M132 100h35"/></svg></div><div class="rc-controls" role="group" aria-label="选择一种名">${nameExamples.map((e,i)=>`<button type="button" data-rc-name="${i}" aria-controls="rc-name-${i}" aria-pressed="${i===0}">${e.name}</button>`).join('')}</div><div aria-live="polite">${nameExamples.map((e,i)=>`<div class="rc-panel" id="rc-name-${i}" ${i?'hidden':''}><p class="rc-example">${e.example}</p><dl><div><dt>这个名的用处</dt><dd>${e.work}</dd></div><div><dt>给自己留点空间</dt><dd>${e.boundary}</dd></div></dl><a href="#${e.target}" data-scroll="${e.target}">读这一种名的正文 <span aria-hidden="true">↓</span></a></div>`).join('')}</div><p class="rc-small">名可以被看见、被使用，也可以被重新理解。</p></figure>`;}
function loopDiagram(){return `<figure class="rc-visual rc-loop" aria-labelledby="rc-loop-title"><figcaption><small>把自动反应放慢一点看</small><strong id="rc-loop-title">角色为什么总回到老办法？</strong></figcaption><ol><li><span>一件事发生</span><b>方案受到质疑</b></li><li><span>碰到一个名</span><b>“我应该有能力”</b></li><li><span>欲求被牵动</span><b>想获认可，怕被否定</b></li><li><span>旧反应启动</span><b>抢着解释，急于反驳</b></li></ol><div class="rc-loop-return"><span aria-hidden="true">↶</span><p>如果只顾证明自己，就更难听进反馈；下一次遇到质疑，又容易走回这条路。</p></div><div class="rc-pause"><b>在反应之前，留一个问题</b><p>“我现在是在理解问题，还是在保护一个名？”</p></div><p class="rc-small">这是观察日常反应的示意。同一件事可能牵动多种需要。</p></figure>`;}
function choiceDiagram(){return `<figure class="rc-visual rc-choice" aria-labelledby="rc-choice-title"><figcaption><small>还是那一次质疑，下一步可以不同</small><strong id="rc-choice-title">从自动反应，到有意识地回应</strong></figcaption><div class="rc-controls" role="group" aria-label="比较两种回应"><button type="button" data-rc-choice="0" aria-controls="rc-choice-0" aria-pressed="true">被角色牵着走</button><button type="button" data-rc-choice="1" aria-controls="rc-choice-1" aria-pressed="false">留出选择空间</button></div><div aria-live="polite"><div class="rc-panel" id="rc-choice-0"><ol><li><small>收到质疑</small><b>“你这个方案有问题。”</b></li><li><small>替自己下结论</small><b>“他在说我没有能力。”</b></li><li><small>急着保住形象</small><b>先反击，再寻找理由。</b></li></ol><p class="rc-choice-result">注意力落在“我有没有输”，具体问题还没来得及被看清。</p></div><div class="rc-panel" id="rc-choice-1" hidden><ol><li><small>收到质疑</small><b>“你这个方案有问题。”</b></li><li><small>把事实与解释分开</small><b>“有人提出了意见；具体是什么？”</b></li><li><small>认真做好眼前的事</small><b>先问清问题，再核实与改进。</b></li></ol><p class="rc-choice-result">责任仍在，回应的余地也在。你可以改进方案，而不急着否定整个人。</p></div></div><p class="rc-small">留出空间，需要练习。情绪一时没有消失，也可以先选择一个小行动。</p></figure>`;}
function indexPage(fragments){return `<div class="page-shell knowing-page er-page rc-index">${crumbs()}<header class="rc-index-head"><p class="eyebrow">认识自己 / 名字、故事与身份</p><h1>外在角色我</h1><p class="rc-index-question">抛开所有的名，我是谁？<br>又是谁，在抓着所有的名？</p><p class="rc-index-deck">好好演，但你不是这个角色。<br>从认识角色，到看见牵动，再回到自己的选择。</p></header><nav class="rc-cards" aria-label="选择一部开始阅读">${parts.map(p=>`<a class="rc-card" href="${link(p)}">${photo(p,true)}<div><small>${p.number}</small><h2>${p.title}</h2><p>${p.question}</p><span class="rc-card-enter">进入阅读 <i aria-hidden="true">↗</i></span></div></a>`).join('')}</nav><p class="rc-index-tip">可以从第一部顺着读，也可以从此刻最关心的问题开始。</p><div class="er-prose rc-index-appendix"><p class="rc-appendix-label">需要时，再往深处看</p>${fragments.appendix}</div><a class="kn-next" href="#/knowing/inner-consciousness">继续阅读：内在意识我 <span>→</span></a></div>`;}
export function roleChapterPage(html,part=''){
 const fragments=splitEssay(html);if(!part)return indexPage(fragments);
 const index=parts.findIndex(p=>p.id===part),p=parts[index];if(!p)return '';
 let body=fragments[part];
 if(part==='names')body=body.replace(/<figure class="erv-names"[\s\S]*?<\/figure>/,namesDiagram());
 if(part==='attachment')body=body.replace('<section aria-labelledby="er-s04"',loopDiagram()+'<section aria-labelledby="er-s04"');
 if(part==='release')body=body.replace('<h3 id="er-s07">怎样相处</h3>','<h3 id="er-s07">怎样相处</h3>'+choiceDiagram());
 const ids={names:[['er-prologue','序章 · 名的后面'],['er-s01','名可名，非恒名'],['er-s02','五种名']],attachment:[['er-s03','欲求：我要什么，怕什么'],['er-s04','惯性：我习惯怎样做'],['er-s05','认出它']],release:[['er-s06','两种失衡'],['er-s07','怎样相处'],['er-epilogue','尾声 · 本来面目']]};
 const prev=index?parts[index-1]:null,next=parts[index+1];
 return `<div class="page-shell knowing-page er-page rc-reading" data-role-part="${part}">${crumbs(p)}${chapterNav(part)}<header class="rc-part-head"><p class="eyebrow">外在角色我 / ${p.number}</p><h1>${p.title}</h1><p class="rc-part-question">${p.question}</p><p class="rc-part-deck">${p.deck}</p></header><figure class="rc-story">${photo(p)}<figcaption>${p.caption}</figcaption></figure><nav class="action-toc rc-toc" aria-label="本页目录">${ids[part].map(([id,label])=>`<button type="button" data-scroll="${id}">${label}</button>`).join('')}</nav><article aria-label="${p.number} ${p.title}正文"><div class="er-prose">${body}</div></article><p class="rc-source-link"><a href="#/${route}?section=er-refs">本章出处与参考 ↗</a><a href="#/${route}?section=er-cmp">跨体系对照 ↗</a></p><nav class="rc-next" aria-label="篇章导航"><a href="${prev?link(prev):'#/'+route}"><small>${prev?'上一篇':'回到本章'}</small><span>${prev?prev.title:'外在角色我导读'}</span></a><a href="${next?link(next):'#/knowing/inner-consciousness'}"><small>${next?'下一篇':'继续探索'}</small><span>${next?next.title:'内在意识我'} <i aria-hidden="true">→</i></span></a></nav></div>`;
}
export function initRoleChapters(root){
 const controller=new AbortController();
 const setup=(selector,attribute)=>root.querySelectorAll(selector).forEach(button=>button.addEventListener('click',()=>{
  const figure=button.closest('.rc-visual');
  figure.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  figure.querySelectorAll('.rc-panel').forEach((panel,i)=>panel.hidden=String(i)!==button.getAttribute(attribute));
 },{signal:controller.signal}));
 setup('[data-rc-name]','data-rc-name');setup('[data-rc-choice]','data-rc-choice');
 const query=location.hash.startsWith('#/')?location.hash.split('?')[1]||'':location.search;
 const section=new URLSearchParams(query).get('section');let frame=0;
 if(section&&/^er-(?:refs|cmp|map)$/.test(section))frame=requestAnimationFrame(()=>{const target=root.querySelector('#'+section);if(target){target.open=true;target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start'});}});
 return ()=>{controller.abort();cancelAnimationFrame(frame);};
}
