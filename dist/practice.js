import {practiceArticles,practiceModules,sortedArticles,articlesForRoute} from './practice-articles.js?v=20261103-practice-hub1';
import {dialoguePracticeReadings} from './inner-dialogue-practice.js?v=20261103-practice-hub1';
import {creationOrder,creationLayers,elementName,practiceTitles,practiceExercises,exercisesFor,practiceAvailability,theoryHref,elementPracticeHref,exerciseHref} from './practice-catalog.js?v=20261103-practice-hub1';
import {practiceDetails} from './practice-details.js?v=20261029-inner-tagline';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paragraphs=items=>(items||[]).map(text=>`<p>${esc(text)}</p>`).join('');
const link=(href,label)=>`<a class="text-link" href="${href}">${esc(label)} <span aria-hidden="true">→</span></a>`;
const crumbs=items=>`<nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a><span aria-hidden="true">/</span>${items.map(([name,href])=>href?`<a href="${href}">${esc(name)}</a><span aria-hidden="true">/</span>`:`<span aria-current="page">${esc(name)}</span>`).join('')}</nav>`;
const heading=(eyebrow,title,subtitle)=>`<header class="page-heading cp-heading"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="page-intro">${esc(subtitle)}</p></header>`;
const status=exercise=>exercise.status==='published'?'实践练习':'框架预览 · 内容完善中';
const toc=items=>`<aside class="article-toc"><span class="eyebrow">本页目录</span>${items.map(([id,title])=>`<button type="button" data-scroll="${esc(id)}">${esc(title)}</button>`).join('')}</aside>`;
const sectionHead=(number,title,desc='')=>`<div class="cp-section-head"><span class="eyebrow">${number}</span><div><h2>${title}</h2>${desc?`<p>${desc}</p>`:''}</div></div>`;
const exerciseCard=exercise=>`<a class="cp-exercise-card" href="${exerciseHref(exercise.id)}"><div><span class="cp-status">${status(exercise)}</span><h3>${esc(exercise.title)}</h3><p>${esc(exercise.subtitle)}</p><span class="cp-elements">${exercise.elementIds.map(elementName).join(' · ')}</span></div><span class="cp-card-arrow" aria-hidden="true">↗</span></a>`;
const theoryLinks=ids=>`<nav class="cp-theory-links" aria-label="关联理论">${ids.map(id=>link(theoryHref(id),elementName(id)+'理论')).join('')}</nav>`;
const footer=()=>`<nav class="cp-footer" aria-label="理论与实践">${link('#/practice','返回实践')}${link('#/becoming','回到创造自己总论')}</nav>`;

const articleCard=a=>`<article class="ph-card" data-practice-article data-modules="${a.modules.join(' ')}" data-topics="${a.topics.map(t=>esc(t.href)).join(' ')}"><div class="ph-meta"><span>${esc(a.kind)}</span>${a.stage?`<span>${esc(a.stage)}</span>`:''}${a.publishedAt?`<time datetime="${esc(a.publishedAt)}">${esc(a.publishedAt)}</time>`:'<span>发布日期未记录</span>'}</div><h2><a href="${a.href}">${esc(a.title)} <span aria-hidden="true">↗</span></a></h2><p>${esc(a.summary)}</p><nav class="ph-topics" aria-label="关联章节">${a.topics.map(t=>link(t.href,t.title)).join('')}</nav></article>`;
export function practiceHomePage(){
 const topics=[...new Map(practiceArticles.flatMap(a=>a.topics).map(t=>[t.href,t])).values()];
 return `<div class="page-shell creation-practice ph-home">${crumbs([['实践']])}${heading('PRACTICE / 三道哲学','实践','记录我们如何将三道哲学付诸行动，在现实反馈中不断探索、修正与创造。')}<section aria-label="实践文章"><div class="ph-tools"><div class="filter-tabs" role="group" aria-label="按所属模块筛选"><button type="button" data-practice-module="all" aria-pressed="true" class="active">全部</button>${practiceModules.map(m=>`<button type="button" data-practice-module="${m.id}" aria-pressed="false">${m.name}</button>`).join('')}</div><label class="ph-select">关联章节 <select data-practice-topic><option value="all">全部章节</option>${topics.map(t=>`<option value="${esc(t.href)}">${esc(t.title)}</option>`).join('')}</select></label></div><p class="ph-order">按发布日期由新到旧排列；未记录日期的内容列于其后。<span data-practice-count aria-live="polite">${practiceArticles.length} 篇文章</span></p><div class="ph-list">${sortedArticles().map(articleCard).join('')}</div><p class="cp-empty" data-practice-empty hidden>这个模块暂未收录实践文章。</p></section><nav class="cp-footer" aria-label="单项实践入口"><details><summary>创造九项 · 单项实践目录</summary><nav class="cp-theory-links">${creationOrder.map(id=>link(elementPracticeHref(id),elementName(id))).join('')}</nav></details>${link('#/map','回到三道全图')}</nav></div>`;
}

export function initPracticeHub(root,path){
 const controller=new AbortController();
 let module='all';const topic=root.querySelector('[data-practice-topic]');
 const apply=()=>{let count=0;root.querySelectorAll('[data-practice-article]').forEach(card=>{card.hidden=!(module==='all'||card.dataset.modules.split(' ').includes(module))||!(topic.value==='all'||card.dataset.topics.split(' ').includes(topic.value));if(!card.hidden)count++;});root.querySelector('[data-practice-count]').textContent=count+' 篇文章';root.querySelector('[data-practice-empty]').hidden=count!==0;};
 if(topic){topic.addEventListener('change',apply,{signal:controller.signal});root.querySelectorAll('[data-practice-module]').forEach(button=>button.addEventListener('click',()=>{module=button.dataset.practiceModule;root.querySelectorAll('[data-practice-module]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});apply();},{signal:controller.signal}));}
 const current=practiceArticles.find(a=>a.href==='#/'+path);
 if(current){const nav=document.createElement('nav');nav.className='cp-theory-links';nav.setAttribute('aria-label','关联章节与后续文章');nav.innerHTML=current.topics.map(t=>link(t.href,'返回'+t.title)).join('')+(current.relatedIds||[]).map(id=>practiceArticles.find(a=>a.id===id)).filter(Boolean).map(a=>link(a.href,'后续文章：'+a.title)).join('');root.querySelector('.page-shell')?.append(nav);}
 const related=articlesForRoute(path);
 if(related.length){const section=document.createElement('section');section.className='ph-related';section.setAttribute('aria-label','本节相关实践文章');section.innerHTML=`<p class="eyebrow">实践 / 将理解带入生活</p><h2>相关实践文章</h2><div class="ph-list">${related.map(articleCard).join('')}</div>${link('#/practice','查看全部实践文章')}`;const target=root.querySelector('article')||root.querySelector('.page-shell');target?.append(section);}
 return ()=>controller.abort();
}
function practiceArticlePage(id){
 const a=practiceArticles.find(a=>a.id===id);if(!a||id!=='inner-discernment')return '';
 return `<div class="page-shell creation-practice cp-detail">${crumbs([['实践','#/practice'],[a.title]])}${heading(a.kind,a.title,a.summary)}${dialoguePracticeReadings()}<nav class="cp-theory-links" aria-label="返回关联章节">${a.topics.map(t=>link(t.href,'返回'+t.title)).join('')}</nav>${link('#/practice','返回实践')}</div>`;
}

export function practiceElementPage(id){
 if(!creationOrder.includes(id))return '';
 const layer=creationLayers.find(layer=>layer.parts.includes(id)),exercises=exercisesFor(id);
 return `<div class="page-shell creation-practice cp-directory">${crumbs([['实践','#/practice'],[elementName(id)+'实践']])}${heading(layer.name+' / 实践',elementName(id)+'的实践',practiceTitles[id])}<div class="cp-directory-intro"><span class="cp-status">${practiceAvailability(id)}</span><p>这里将逐步展开与「${elementName(id)}」相关的练习。你可以先回看理论${exercises.length?'，或查看下方关联练习':''}。</p>${link(theoryHref(id),'返回'+elementName(id)+'理论')}</div><section class="cp-section"><h2>相关练习</h2>${exercises.length?`<div class="cp-exercise-list">${exercises.map(exerciseCard).join('')}</div>`:'<div class="cp-empty"><p>这一项的实践内容正在完善。</p><p>具体方法与引导文案确定后，将在这里逐步加入。</p></div>'}</section>${footer()}</div>`;
}

// Only simple emphasis is accepted; author text is escaped before formatting.
const guideInline=text=>esc(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
const guideParagraphs=items=>(items||[]).map(text=>`<p${/^\*\*.*\*\*$/.test(text)?' class="cp-guide-emphasis"':/^\*[^*].*\*$/.test(text)?' class="cp-guide-note"':''}>${guideInline(text)}</p>`).join('');

function practiceGuidePage(exercise,detail){
 const sections=detail.sections||[],criteria=detail.criteria,closing=detail.closing;
 const items=[['cp-guide-intro',detail.introductionTitle],...sections.map(s=>['cp-phase-'+s.id,s.title]),['cp-guide-criteria',criteria.title],['cp-guide-closing',closing.title]];
 return `<div class="page-shell creation-practice cp-detail cp-guide">${crumbs([['实践','#/practice'],[exercise.title]])}${heading('身份实践工具 V1.1 / 公开版',exercise.title,exercise.subtitle)}<nav class="cp-related" aria-label="关联实践层次"><span>关联层次</span>${exercise.elementIds.map(id=>`<a href="${elementPracticeHref(id)}">${elementName(id)} <span aria-hidden="true">↗</span></a>`).join('')}</nav><div class="article-layout">${toc(items)}<article class="cp-guide-body"><section class="cp-guide-intro" id="cp-guide-intro"><h2>${esc(detail.introductionTitle)}</h2>${guideParagraphs(detail.introduction)}</section>${sections.map(s=>`<section class="cp-guide-phase" id="cp-phase-${esc(s.id)}"><h2>${esc(s.title)}</h2>${guideParagraphs(s.paragraphs)}${s.steps.map(step=>`<section class="cp-guide-step" id="cp-${esc(step.id)}"><h3>${esc(step.title)}</h3>${guideParagraphs(step.paragraphs)}</section>`).join('')}</section>`).join('')}<section class="cp-guide-criteria" id="cp-guide-criteria"><h2>${esc(criteria.title)}</h2>${guideParagraphs(criteria.before)}<table><thead><tr><th scope="col">判断标准</th><th scope="col">核心问题</th></tr></thead><tbody>${criteria.criteria.map(([name,question])=>`<tr><th scope="row">${esc(name)}</th><td>${esc(question)}</td></tr>`).join('')}</tbody></table>${guideParagraphs(criteria.paragraphs)}</section><section class="cp-guide-closing" id="cp-guide-closing"><h2>${esc(closing.title)}</h2>${guideParagraphs(closing.paragraphs)}</section></article></div><footer class="cp-guide-footer"><nav class="cp-theory-links" aria-label="关联理论">${exercise.elementIds.map(id=>link(theoryHref(id),elementName(id)+'理论')).join('')}</nav>${link('#/practice','返回实践')}<div class="cp-guide-edition">${link(exerciseHref(exercise.id)+'/philosopher-king','哲人王版')}</div></footer></div>`;
}

export function practicePhilosopherKingPage(){
 return `<div class="page-shell creation-practice cp-edition-placeholder">${crumbs([['实践','#/practice'],['从选择到成为',exerciseHref('from-choice-to-being')],['哲人王版']])}${heading('实践','从选择到成为 · 哲人王版','个人身份创造与日常实践')}<div class="cp-prose"><p>这一版本将用于长期的身份实践，包括每日觉察、身份连接、现实行动、经验反馈与深度身份冥想。</p><p>内容正在完善中。</p>${link(exerciseHref('from-choice-to-being'),'返回公开版')}</div></div>`;
}

export function practiceExercisePage(id){
 const exercise=practiceExercises.find(exercise=>exercise.id===id);
 if(!exercise)return '';
 const detail=practiceDetails[id]||{},sections=detail.sections||[],draft=exercise.status!=='published';
 if(detail.layout==='guide')return practiceGuidePage(exercise,detail);
 const items=[...(detail.goal||detail.scenarios?.length||detail.introduction?.length?[['cp-exercise-intro','练习概览']]:[]),...sections.map(s=>['cp-step-'+s.id,s.title])];
 return `<div class="page-shell creation-practice cp-detail">${crumbs([['实践','#/practice'],[exercise.title]])}${heading('实践 / '+status(exercise),exercise.title,exercise.subtitle)}<nav class="cp-related" aria-label="关联实践层次"><span>关联层次</span>${exercise.elementIds.map(id=>`<a href="${elementPracticeHref(id)}">${elementName(id)} <span aria-hidden="true">↗</span></a>`).join('')}</nav>${draft?'<div class="cp-draft-notice"><span class="cp-status">实践内容完善中</span><p>当前展示的是练习框架。具体方法与引导文案将逐步打磨，尚未形成可正式使用的完整练习。</p></div>':''}<div class="article-layout">${toc(items)}<article class="cp-body">${items.some(([id])=>id==='cp-exercise-intro')?`<section id="cp-exercise-intro" class="cp-section cp-prose">${detail.goal?`<h2>核心目标</h2><p>${esc(detail.goal)}</p>`:''}${detail.scenarios?.length?`<h3>适用场景</h3><ul>${detail.scenarios.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}${paragraphs(detail.introduction)}</section>`:''}<div class="cp-steps">${sections.map((section,i)=>`<section class="cp-step" id="cp-step-${esc(section.id)}"><span class="cp-step-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(section.title)}</h2>${section.subtitle?`<p class="cp-step-subtitle">${esc(section.subtitle)}</p>`:''}<div class="cp-prose">${paragraphs(section.paragraphs)}${section.prompts?.length?`<ul>${section.prompts.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}${section.actions?.length?`<ol>${section.actions.map(text=>`<li>${esc(text)}</li>`).join('')}</ol>`:''}${(section.questions||[]).map(([question,answer])=>`<details class="action-fold dao-fold"><summary>${esc(question)}</summary><div class="action-prose">${paragraphs(answer)}</div></details>`).join('')}</div>${section.placeholder?`<p class="cp-placeholder">${esc(section.placeholder)}</p>`:''}</div></section>`).join('')}</div><section class="cp-section cp-connected"><h2>让体验与理解相互照应</h2><p>回到关联的理论篇章，理解每一项在这条路径中的作用。</p>${theoryLinks(exercise.elementIds)}</section></article></div>${footer()}</div>`;
}

export function practiceRoute(path){
 if(path==='practice')return practiceHomePage();
 if(path==='practice/exercise/from-choice-to-being/philosopher-king')return practicePhilosopherKingPage();
 const parts=path.split('/');
 if(parts.length!==3||parts[0]!=='practice')return '';
 if(parts[1]==='article')return practiceArticlePage(parts[2]);
 if(parts[1]==='layer')return practiceElementPage(parts[2]);
 if(parts[1]==='exercise')return practiceExercisePage(parts[2]);
 return '';
}

// Quiet additions to the existing theory renderers; no theory data is rewritten.
export function practiceEntryCard(id){
 return `<a class="cp-theory-entry" href="${elementPracticeHref(id)}"><span><span class="eyebrow">实践</span><strong>实践 · ${practiceTitles[id]}</strong><small>${practiceAvailability(id)} · 查看对应入口</small></span><span aria-hidden="true">→</span></a>`;
}
export function practiceOverviewModule(){
 return `<section class="cp-theory-bridge" id="creation-practice-bridge"><p class="eyebrow">创造自己的实践</p><h2>从理解到体验，从体验到成为</h2><p>一个人可以在意识上选择新的身份，却不意味着旧有的信念、情绪反应和行为习惯会立即消失。理解打开了新的可能，改变还需要在具体生活中逐渐发生。</p><p>想象与体验，让我们有机会熟悉自己选择的身份：置身一个情境时，会怎样感受、关注什么、如何回应。它们为新的选择作准备，也允许不熟悉与不确定暂时存在。</p><p>现实行动把这种准备带入生活。一次表达、一次选择、一个可以承担的小步骤，让身份不只停留在内在设想，也逐渐成为可以亲身经历的事实。</p><p>现实反馈帮助我们看见预想与实际之间的差异。回看发生了什么、哪些地方需要调整，让新的经验参与修正理解、方法与下一次选择，身份也在这一过程中逐渐内化。</p>${link('#/practice','进入实践')}</section>`;
}
