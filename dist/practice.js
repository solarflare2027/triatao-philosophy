import {creationOrder,creationLayers,elementName,practiceTitles,practiceExercises,exercisesFor,practiceAvailability,theoryHref,elementPracticeHref,exerciseHref} from './practice-catalog.js?v=20261014-sources1';
import {practiceDetails} from './practice-details.js?v=20261014-practice1';

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
const footer=()=>`<nav class="cp-footer" aria-label="理论与实践">${link('#/practice','返回创造实践')}${link('#/becoming','回到创造自己总论')}</nav>`;

export function practiceHomePage(){
 const sections=[['cp-intro','实践体系总论'],['cp-cycle','创造实践的循环'],['cp-elements','九项实践入口'],['cp-exercises','实践练习完整目录']];
 return `<div class="page-shell creation-practice cp-home">${crumbs([['创造实践']])}${heading('创造自己 / 实践','创造自己的实践','从理解到体验，从体验到成为。')}<p class="cp-position">通过体验与行动，让对哲学的理解逐渐转化为真实的生命经验。</p><div class="article-layout">${toc(sections)}<article class="cp-body">
  <section class="cp-section" id="cp-intro">${sectionHead('01 / 理解与体验','让理解，进入真实生活。')}<div class="cp-prose"><p>认知上的理解，不等于内在模式已经改变。我们可以选择新的身份，旧有的信念、情绪反应和行为习惯却仍可能在熟悉的情境中出现。</p><p>创造实践从这段距离开始：通过想象与感受熟悉新的可能，通过现实行动尝试新的选择，再让真实反馈参与修正。新的身份由此逐渐成为稳定的生命经验。</p><p>实践沿着创造自己的三层九项展开，帮助哲学认知进入体验与行动；它不是第十项，也不是三道之外的第四道。</p>${link('#/becoming','阅读创造自己总论')}</div></section>
  <section class="cp-section" id="cp-cycle">${sectionHead('02 / 一条实践路径','让选择，成为经验。','九项协同运作，反馈回到新的选择。')}<figure class="cp-cycle"><figcaption class="eyebrow">创造实践的核心循环</figcaption><ol>${[['选择身份','愿意成为怎样的自己'],['想象体验','熟悉新的感受与回应'],['现实行动','在生活中作出选择'],['获得反馈','看见真实发生的结果'],['身份内化','让新经验逐渐稳定']].map(([title,desc],i)=>`<li><span class="cp-cycle-number">0${i+1}</span><strong>${title}</strong><p>${desc}</p></li>`).join('')}</ol><p class="cp-cycle-return"><span aria-hidden="true">↶</span> 带着经验，继续选择、体验与修正。</p></figure><p class="cp-note">这是理解创造九项如何协同的一条实践路径，并非五个新的理论层次，也不要求每一次体验都按同一顺序发生。</p></section>
  <section class="cp-section" id="cp-elements">${sectionHead('03 / 三层九项','从与你有关的一处开始。','每一项都有自己的实践入口，也可以在同一个练习中彼此连接。')}<div class="cp-layers">${creationLayers.map((layer,i)=>`<section class="cp-layer"><div class="cp-layer-label"><span class="eyebrow">0${i+1}</span><h3>${layer.name}</h3></div><div class="cp-grid">${layer.parts.map(id=>`<a class="cp-element-card" href="${elementPracticeHref(id)}"><span class="cp-element-top"><span class="eyebrow">${String(creationOrder.indexOf(id)+1).padStart(2,'0')}</span><span aria-hidden="true">↗</span></span><h4>${elementName(id)}</h4><p>${practiceTitles[id]}</p><small>${practiceAvailability(id)}</small></a>`).join('')}</div></section>`).join('')}</div></section>
  <section class="cp-section" id="cp-exercises">${sectionHead('04 / 逐步展开','实践练习完整目录','先看见路径，再一起打磨其中的体验。')}<div class="cp-exercise-list">${practiceExercises.map(exerciseCard).join('')}</div></section>
 </article></div><nav class="cp-footer" aria-label="回到理论">${link('#/becoming','回到创造自己总论')}</nav></div>`;
}

export function practiceElementPage(id){
 if(!creationOrder.includes(id))return '';
 const layer=creationLayers.find(layer=>layer.parts.includes(id)),exercises=exercisesFor(id);
 return `<div class="page-shell creation-practice cp-directory">${crumbs([['创造实践','#/practice'],[elementName(id)+'实践']])}${heading(layer.name+' / 创造实践',elementName(id)+'的实践',practiceTitles[id])}<div class="cp-directory-intro"><span class="cp-status">${practiceAvailability(id)}</span><p>这里将逐步展开与「${elementName(id)}」相关的练习。你可以先回看理论${exercises.length?'，或查看下方关联练习':''}。</p>${link(theoryHref(id),'返回'+elementName(id)+'理论')}</div><section class="cp-section"><h2>相关练习</h2>${exercises.length?`<div class="cp-exercise-list">${exercises.map(exerciseCard).join('')}</div>`:'<div class="cp-empty"><p>这一项的实践内容正在完善。</p><p>具体方法与引导文案确定后，将在这里逐步加入。</p></div>'}</section>${footer()}</div>`;
}

export function practiceExercisePage(id){
 const exercise=practiceExercises.find(exercise=>exercise.id===id);
 if(!exercise)return '';
 const detail=practiceDetails[id]||{},sections=detail.sections||[],draft=exercise.status!=='published';
 const items=[...(detail.goal||detail.scenarios?.length||detail.introduction?.length?[['cp-exercise-intro','练习概览']]:[]),...sections.map(s=>['cp-step-'+s.id,s.title])];
 return `<div class="page-shell creation-practice cp-detail">${crumbs([['创造实践','#/practice'],[exercise.title]])}${heading('创造实践 / '+status(exercise),exercise.title,exercise.subtitle)}<nav class="cp-related" aria-label="关联实践层次"><span>关联层次</span>${exercise.elementIds.map(id=>`<a href="${elementPracticeHref(id)}">${elementName(id)} <span aria-hidden="true">↗</span></a>`).join('')}</nav>${draft?'<div class="cp-draft-notice"><span class="cp-status">实践内容完善中</span><p>当前展示的是练习框架。具体方法与引导文案将逐步打磨，尚未形成可正式使用的完整练习。</p></div>':''}<div class="article-layout">${toc(items)}<article class="cp-body">${items.some(([id])=>id==='cp-exercise-intro')?`<section id="cp-exercise-intro" class="cp-section cp-prose">${detail.goal?`<h2>核心目标</h2><p>${esc(detail.goal)}</p>`:''}${detail.scenarios?.length?`<h3>适用场景</h3><ul>${detail.scenarios.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}${paragraphs(detail.introduction)}</section>`:''}<div class="cp-steps">${sections.map((section,i)=>`<section class="cp-step" id="cp-step-${esc(section.id)}"><span class="cp-step-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(section.title)}</h2>${section.subtitle?`<p class="cp-step-subtitle">${esc(section.subtitle)}</p>`:''}<div class="cp-prose">${paragraphs(section.paragraphs)}${section.prompts?.length?`<ul>${section.prompts.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:''}${section.actions?.length?`<ol>${section.actions.map(text=>`<li>${esc(text)}</li>`).join('')}</ol>`:''}${(section.questions||[]).map(([question,answer])=>`<details class="action-fold dao-fold"><summary>${esc(question)}</summary><div class="action-prose">${paragraphs(answer)}</div></details>`).join('')}</div>${section.placeholder?`<p class="cp-placeholder">${esc(section.placeholder)}</p>`:''}</div></section>`).join('')}</div><section class="cp-section cp-connected"><h2>让体验与理解相互照应</h2><p>回到关联的理论篇章，理解每一项在这条路径中的作用。</p>${theoryLinks(exercise.elementIds)}</section></article></div>${footer()}</div>`;
}

export function practiceRoute(path){
 if(path==='practice')return practiceHomePage();
 const parts=path.split('/');
 if(parts.length!==3||parts[0]!=='practice')return '';
 if(parts[1]==='layer')return practiceElementPage(parts[2]);
 if(parts[1]==='exercise')return practiceExercisePage(parts[2]);
 return '';
}

// Quiet additions to the existing theory renderers; no theory data is rewritten.
export function practiceEntryCard(id){
 return `<a class="cp-theory-entry" href="${elementPracticeHref(id)}"><span><span class="eyebrow">创造实践</span><strong>实践 · ${practiceTitles[id]}</strong><small>${practiceAvailability(id)} · 查看对应入口</small></span><span aria-hidden="true">→</span></a>`;
}
export function practiceOverviewModule(){
 return `<section class="cp-theory-bridge" id="creation-practice-bridge"><p class="eyebrow">创造自己的实践</p><h2>从理解到体验，从体验到成为</h2><p>一个人可以在意识上选择新的身份，却不意味着旧有的信念、情绪反应和行为习惯会立即消失。理解打开了新的可能，改变还需要在具体生活中逐渐发生。</p><p>想象与体验，让我们有机会熟悉自己选择的身份：置身一个情境时，会怎样感受、关注什么、如何回应。它们为新的选择作准备，也允许不熟悉与不确定暂时存在。</p><p>现实行动把这种准备带入生活。一次表达、一次选择、一个可以承担的小步骤，让身份不只停留在内在设想，也逐渐成为可以亲身经历的事实。</p><p>现实反馈帮助我们看见预想与实际之间的差异。回看发生了什么、哪些地方需要调整，让新的经验参与修正理解、方法与下一次选择，身份也在这一过程中逐渐内化。</p>${link('#/practice','进入创造实践')}</section>`;
}
