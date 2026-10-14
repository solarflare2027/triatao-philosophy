import {wangHeart} from './wang-heart.js?v=20261011-wang1';
import {wangPower} from './wang-power.js?v=20261011-wang1';
import {wangRealm} from './wang-realm.js?v=20261014-change-world1';
import {wangBranches} from './wang-branches.js?v=20261011-wang1';
import {wangGroups,wangOrder,wangRelations,wangOverview,wangClosing} from './wang-framework.js?v=20261014-wang-question1';
import {daoSources} from './dao-content.js?v=20261014-change-world1';
export {wangGroups,wangOrder,wangOverview};
export const wangContent={...wangHeart,...wangPower,...wangRealm,...wangBranches};
export const hasWangReading=id=>Object.hasOwn(wangContent,id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ps=items=>items.map(t=>`<p>${esc(t)}</p>`).join('');
const route=id=>id==='layout'?'layout':'concept/'+id;
const arrow='<span aria-hidden="true">↗</span>';
const link=(id,label)=>`<a href="#/${route(id)}">${esc(label||wangContent[id].name)} ${arrow}</a>`;
const fold=([q,a])=>`<details class="action-fold dao-fold"><summary>${esc(q)}</summary><div class="action-prose">${ps(a)}</div></details>`;
const crumbs=items=>`<nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a>${items.map(([label,url])=>`<span aria-hidden="true">/</span>${url?`<a href="#/${url}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(d,kicker)=>`<header class="page-heading"><p class="eyebrow">${esc(kicker)}</p><h1>${esc(d.name)}</h1><p class="page-intro">${esc(d.thesis)}</p></header><div class="overview-question"><span>这一章的追问</span><p>${esc(d.question)}</p></div>`;
function position(current){return `<nav class="reading-position wang-position" aria-label="在王道九章中的位置">${wangGroups.map(g=>`<div><a href="#/map?focus=${g.id}">${g.name}</a>${g.parts.map(id=>`<a href="#/${route(id)}" ${current===id?'aria-current="location"':''}>${wangContent[id].name}</a>`).join('')}</div>`).join('')}</nav>`;}
function toc(id,d,extra=[]){return `<aside class="article-toc"><span class="eyebrow">本页目录</span>${[[`wang-${id}-definition`,'主线'],...d.sections.map((s,i)=>[`wang-${id}-${i}`,s.title]),...extra,[`wang-${id}-questions`,'深入追问']].map(([key,label])=>`<button type="button" data-scroll="${key}">${esc(label)}</button>`).join('')}</aside>`;}
const sections=(id,d)=>d.sections.map((s,i)=>`<h2 id="wang-${id}-${i}">${esc(s.title)}</h2>${ps(s.paragraphs)}`).join('');
const questions=(id,d)=>`<h2 id="wang-${id}-questions">深入追问</h2>${d.questions.map(fold).join('')}`;
const extraSources={
 xiyuZhuang:{label:'细雨：《庄子·天道》讲解',url:'https://xiyu.love/archives/zhuang-zi-tian-dao',note:'借鉴尊重自身与他人的发展、减少控制和成全不同生命的思想；本篇的组织与治理论述由三道框架展开。'},
 ostrom:{label:'Elinor Ostrom：Beyond Markets and States（2009）',url:'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/?lbw=1',note:'关于复杂经济系统的多中心治理，作为制度、合作与自主组织的延伸阅读；不用于证明本体系的形而上学命题。'}
};
function sources(d){return `<details class="action-fold dao-fold dao-sources"><summary>思想来源与延伸阅读</summary><div class="action-prose"><p>本页以三道哲学的定义与九章结构组织论述。赛斯、细雨与传统思想提供哲学参照；制度安排、现实机制和案例分析是本篇的综合阐释，不作为相关作者的原话或固定分类。</p>${(d.sources||['oldCourages','oldPowers','oldWays']).map(key=>{const s=extraSources[key]||daoSources[key];if(!s)throw new Error('Unknown Wang source: '+key);return `<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a><br>${esc(s.note)}</p>`;}).join('')}</div></details>`;}
function nextNav(url,title,backUrl='wang',backLabel='返回王道总论'){return `<nav class="reading-next wang-reading-nav" aria-label="继续阅读"><a class="reading-next-primary" href="#/${url}">${esc(title)} <span aria-hidden="true">→</span></a><a class="reading-next-back" href="#/${backUrl}">${esc(backLabel)}</a></nav>`;}
function connections(id){const relations=wangRelations.filter(([a,b])=>a===id||b===id);if(!relations.length)return '';return `<div class="wang-connections"><span class="eyebrow">放回整体</span>${relations.map(([a,b,title,text])=>`<p>${link(a===id?b:a,title)}<br>${esc(text)}</p>`).join('')}</div>`;}
export function wangPage(id){
 const d=wangContent[id];if(!d)return '';
 const core=d.parent||id,g=wangGroups.find(g=>g.parts.includes(core));
 const trail=[['王道','wang'],[g.name,'map?focus='+g.id],...(d.parent?[[wangContent[d.parent].name,route(d.parent)]]:[]),[d.name]];
 const siblings=d.parent?wangContent[d.parent].children:wangOrder,i=siblings.indexOf(id),next=siblings[i+1];
 const nextUrl=next?route(next):d.parent?route(d.parent):'wang/closing';
 const nextTitle=next?'继续阅读：'+wangContent[next].name:d.parent?'回看'+wangContent[d.parent].name:'终章：真正的王';
 return `<div class="page-shell dao-reading wang-page">${crumbs(trail)}${heading(d,`王道 / ${g.level} / ${g.name}${d.parent?' / '+wangContent[d.parent].name:''}`)}${position(core)}<div class="article-layout">${toc(id,d,[[`wang-${id}-case`,'同一段现实'],[`wang-${id}-practice`,'带回实践']])}<article class="prose"><h2 id="wang-${id}-definition">理解${esc(d.name)}</h2>${ps(d.definition)}${d.children?`<div class="wang-branches">${d.children.map(c=>`<a href="#/${route(c)}"><h3>${wangContent[c].name} ${arrow}</h3><p>${esc(wangContent[c].thesis)}</p></a>`).join('')}</div>`:''}${sections(id,d)}<h2 id="wang-${id}-case">同一段现实，不同的理解</h2>${fold(['从负责人、服务组织与河谷城，理解'+d.name,['以下为贯穿王道篇的假设情境，用来观察同一问题在个人、组织与公共治理中的不同条件。',...d.case]])}<h2 id="wang-${id}-practice">带回一件正在承担的事</h2><ol class="wang-practice">${d.practice.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>${connections(id)}${questions(id,d)}${sources(d)}</article></div>${nextNav(nextUrl,nextTitle)}</div>`;
}
export function wangOverviewPage(){const d=wangOverview;return `<div class="page-shell dao-reading wang-page wang-overview">${crumbs([['王道']])}<header class="page-heading"><p class="eyebrow">03 / THE PRACTICE OF CREATION</p><h1>王道<span class="heading-separator">/</span>改变世界</h1><p class="page-intro">${d.thesis}</p></header><div class="overview-question"><span>这一道的追问</span><p>${d.question}</p></div><section class="wang-framework" aria-label="王道三层九章">${wangGroups.map(g=>`<div class="wang-framework-row"><div class="wang-group-label"><span class="eyebrow">${g.level} / ${g.purpose}</span><h2>${g.name}</h2><p>${g.desc}</p></div><div class="wang-group-items">${g.parts.map(id=>`<a href="#/${route(id)}"><h3>${wangContent[id].name} ${arrow}</h3><p>${wangContent[id].thesis}</p></a>`).join('')}</div></div>`).join('')}</section><div class="article-layout">${toc('overview',d,[[`wang-overview-relations`,'六组相互支撑的关系']])}<article class="prose"><h2 id="wang-overview-definition">从理解世界，到承担共同创造</h2>${ps(d.definition)}${sections('overview',d)}<h2 id="wang-overview-relations">九章如何相互支撑</h2><p>九章不是逐级取得的身份，也不要求等一种能力完美后才开始下一种。它们共同约束一次真实的创造。</p><div class="wang-relations">${wangRelations.map(([a,b,title,text])=>`<div><h3>${link(a)} <span aria-hidden="true">×</span> ${link(b)}</h3><p>${text}</p></div>`).join('')}</div>${questions('overview',d)}${sources(d)}</article></div>${nextNav('concept/decide','从第一章：决断开始','wang/closing','阅读终章：真正的王')}</div>`;}
export function wangClosingPage(){const d=wangClosing;return `<div class="page-shell dao-reading wang-page">${crumbs([['王道','wang'],['真正的王']])}${heading(d,'王道 / 终章')}${position('')}<div class="article-layout">${toc('closing',d)}<article class="prose"><h2 id="wang-closing-definition">让创造超出一个人的生命</h2>${ps(d.definition)}${sections('closing',d)}${questions('closing',d)}</article></div>${nextNav('tian','回到天道，继续求真')}</div>`;}
