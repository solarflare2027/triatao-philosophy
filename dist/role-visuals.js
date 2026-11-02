// Reading aids for this chapter. Examples invite observation, not personality diagnosis.
const icon = (kind) => {
 const paths={mask:'M22 12Q40 4 58 12V34Q57 55 40 65Q23 55 22 34Z M29 28q5-7 10 0m4 0q5-7 10 0M31 43q9 9 18 0',thread:'M17 14h46M25 14v20m30-20v20M30 49a10 10 0 1 0 20 0a10 10 0 1 0-20 0M40 59v10M28 69h24',hand:'M22 51V29q0-7 6-7q6 0 6 7v11V15q0-6 6-6q6 0 6 6v25V23q0-6 6-6q6 0 6 6v28q0 18-19 18q-13 0-20-13L9 43q-3-5 2-8q4-2 8 4l6 7',eye:'M8 40Q40 5 72 40Q40 75 8 40Z M51 40a11 11 0 1 0-22 0a11 11 0 1 0 22 0',story:'M17 10h36l11 11v49H17ZM53 10v14h11M27 35h25M27 46h25M27 57h15',mirror:'M20 12h40v45H20ZM40 57v13M27 70h26M27 41l24-22',star:'m40 8 9 20 23 3-17 16 4 23-19-11-19 11 4-23L8 31l23-3Z'};
 return `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><path d="${paths[kind]||paths.mask}"/></svg>`;
};
const road=()=>`<aside class="erv-road" aria-label="本篇阅读路线"><p class="erv-kicker">先看这条线，再读正文</p><ol><li>${icon('mask')}<a href="#er-p1" data-scroll="er-p1"><small>第一部 · 名为相</small><b>看见角色</b><span>名字、故事与身份<br>怎样组成熟悉的“我”</span></a></li><li>${icon('thread')}<a href="#er-p2" data-scroll="er-p2"><small>第二部 · 谁在执着于名？</small><b>看见牵动</b><span>想得到什么、怕失去什么<br>怎样带出习惯反应</span></a></li><li>${icon('hand')}<a href="#er-p3" data-scroll="er-p3"><small>第三部 · 松开</small><b>重新选择</b><span>认真承担眼前的事<br>给自己留下转身的余地</span></a></li></ol></aside>`;
const painting=()=>`<figure class="erv-painting"><img src="/assets/role-self/roles-triptych.webp" width="2172" height="724" alt="同一个人在三幕中戴上角色面具、被外界评价的细线牵动，最后放下面具、松开手，仍留在生活之中。" decoding="async" fetchpriority="high"><figcaption><span>穿上角色</span><span>看见牵动</span><span>松开，继续生活</span></figcaption><p>角色让我们参与世界；看见角色，便多了一点选择。</p></figure>`;
const names=()=>`<figure class="erv-names" aria-labelledby="erv-names-title"><figcaption id="erv-names-title">五种名，连起一条“我是谁”的故事</figcaption><ol>${[['名字','最早被叫出的我','mask','er-name-1'],['故事','从过去解释我','story','er-name-2'],['名分','在关系里定位我','mask','er-name-3'],['名声','从别人眼里看我','mirror','er-name-4'],['功名','向未来要求我','star','er-name-5']].map(([t,d,i,id])=>`<li><a href="#${id}" data-scroll="${id}">${icon(i)}<b>${t}</b><span>${d}</span></a></li>`).join('')}</ol><p>这些名都能帮助生活。留意的是：什么时候，一个名开始替全部的我下结论？</p></figure>`;
const examples=[
 {name:'方案被否定',fact:'会上，同事指出方案的两处问题。',identity:'“我是一个有能力的人。”',want:'想被认可，怕显得无能。',habit:'急着解释，没听完就反驳。',choice:'先问清两处问题，区分对方案的意见与对自己的评价。',action:'“你最担心哪一处？我们先看具体依据。”'},
 {name:'消息没回复',fact:'昨天发出的消息，到现在还没有回复。',identity:'“我是一个被重视的人。”',want:'想确认关系，怕被忽略。',habit:'反复看手机，把沉默解释成不在乎。',choice:'承认自己在意，也承认对方没回复的原因尚不清楚。',action:'如果事情紧急，说明需要回复的时间；否则约个合适的时点再问。'},
 {name:'身份发生变化',fact:'工作调整后，自己不再担任原来的职务。',identity:'“我是这个团队的负责人。”',want:'想保有位置，怕失去价值。',habit:'反复比较前后待遇，用头衔判断自己的分量。',choice:'辨认哪些职责变了，哪些能力、关系与热忱仍在。',action:'列出可以继续贡献的一件事，再为新的角色确认边界。'}
];
const cases=()=>`<section class="erv-case" aria-labelledby="erv-case-title"><p class="erv-kicker">把三个入口放进同一件事</p><h4 id="erv-case-title">一件小事，怎样牵动整个角色</h4><p>试着换一个场景，沿着线索往下看。</p><div class="erv-controls" role="group" aria-label="选择日常场景">${examples.map((e,i)=>`<button type="button" data-erv-scene="${i}" aria-pressed="${i===0}" aria-controls="erv-scene-${i}">${e.name}</button>`).join('')}</div><div aria-live="polite">${examples.map((e,i)=>`<div class="erv-case-panel" id="erv-scene-${i}" ${i?'hidden':''}><p class="erv-event"><span>发生的事</span><strong>${e.fact}</strong></p><ol class="erv-cascade"><li><span>01 · 名相</span><b>${e.identity}</b></li><li><span>02 · 欲求</span><b>${e.want}</b></li><li><span>03 · 惯性</span><b>${e.habit}</b></li></ol><div class="erv-choice"><span>停一下，换一种回应</span><p>${e.choice}</p><b>${e.action}</b></div></div>`).join('')}</div><p class="erv-note">日常情境示例。动机可能交织；这条线用来帮助观察，不替你判定内心。</p></section>`;
const balance=()=>`<figure class="erv-balance" aria-labelledby="erv-balance-title"><figcaption id="erv-balance-title">把责任留下，把束缚松开</figcaption><div class="erv-balance-stage"><div>${icon('thread')}<b>入戏太深</b><span>一个名受挫<br>整个人都被否定</span></div><div class="erv-balance-center">${icon('hand')}<b>好好演</b><span>认真做事<br>仍能调整与选择</span></div><div>${icon('mask')}<b>拒绝上台</b><span>说自己放下了<br>却避开眼前责任</span></div></div><p>看见自己偏向哪一端，下一步就从眼前一件具体的事开始。</p></figure>`;
export function enhanceRole(html){
 const insert=(anchor,value)=>{if(!html.includes(anchor))throw Error('Missing role visual anchor: '+anchor);html=html.replace(anchor,value+anchor);};
 const journey=html.match(/<nav class="er-journey"[\s\S]*?<\/nav>/);
 if(!journey)throw Error('Missing chapter journey');html=html.replace(journey[0],painting()+road());
 // Replace two existing summaries with drawings while retaining the essay itself.
 const oldNames=html.match(/<ol class="er-names">[\s\S]*?<\/ol>/);
 if(!oldNames)throw Error('Missing five-name navigation');html=html.replace(oldNames[0],names());
 insert('<h4>它们都有用</h4>',cases());
 const oldBalance=html.match(/<figure class="er-balance">[\s\S]*?<\/figure>/);
 if(!oldBalance)throw Error('Missing balance summary');html=html.replace(oldBalance[0],balance());
 return html;
}
export function initRoleVisuals(root){
 const controller=new AbortController();
 root.querySelectorAll('.erv-controls [data-erv-scene]').forEach(button=>button.addEventListener('click',()=>{
  const container=button.closest('.erv-case');
  container.querySelectorAll('[data-erv-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  container.querySelectorAll('.erv-case-panel').forEach((panel,i)=>panel.hidden=String(i)!==button.dataset.ervScene);
 },{signal:controller.signal}));
 return ()=>controller.abort();
}
