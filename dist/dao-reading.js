import {daoContent,daoSources} from './dao-content.js?v=20261014-change-world1';
import {hasTianVisual,tianVisual} from './tian-visuals.js?v=20261012-tian-depth1';
const p=paragraphs=>paragraphs.map(t=>`<p>${t}</p>`).join('');
const fold=([question,answer])=>`<details class="action-fold dao-fold"><summary>${question}</summary><div class="action-prose">${p(answer)}</div></details>`;
export const hasDaoReading=id=>Boolean(daoContent[id]);
export function daoReadingToc(id){
 const d=daoContent[id];if(!d)return '';
 return [[`dao-${id}-definition`,'理解'],...(hasTianVisual(id)?[[`dao-${id}-visual`,'图解']]:[]),...d.sections.map((s,i)=>[`dao-${id}-${i}`,s.title]),[`dao-${id}-questions`,'深入追问'],[`dao-${id}-practice`,'带回生活']].map(([anchor,label])=>`<button type="button" data-scroll="${anchor}">${label}</button>`).join('');
}
export function daoReadingBody(id){
 const d=daoContent[id];if(!d)return '';
 return tianVisual(id)+d.sections.map((s,i)=>`<h2 id="dao-${id}-${i}">${s.title}</h2>${p(s.paragraphs)}`).join('')+`<h2 id="dao-${id}-questions">继续追问</h2>${d.questions.map(fold).join('')}`;
}
export function daoReadingSources(id){
 const d=daoContent[id];if(!d)return '';
 return `<details class="action-fold dao-fold dao-sources"><summary>思想来源与延伸阅读</summary><div class="action-prose"><p>${d.sourceNote}</p>${d.sources.map(key=>{const s=daoSources[key];return `<p>${s.url?`<a class="source-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ↗</a>`:s.label}<br>${s.note}</p>`;}).join('')}<p>${['emptiness','chaos','polarity','flux','probability','alltime','mirror','blueprint','generation'].includes(id)?'九理是三道对存在、变化与创造的哲学解释。赛斯、细雨的实相机制按其形而上语境理解；佛道经典保留各自原义，科学材料按其可检验的范围使用。':'本页保留《三道哲学》现有定义与分层，相关概念的连接、领导实践和生活情境由本体系展开。来源中的世界观命题按其思想语境理解；这里的整理不意味着不同作者使用同一套分类，也不将形而上学解释当作实验结论。'}</p></div></details>`;
}
export function daoReadingPractice(id){return daoContent[id]?.practice||'';}
