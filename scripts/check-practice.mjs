import assert from 'node:assert/strict';
import {creationOrder,creationLayers,practiceExercises,practiceRedirect,practiceSearchItems,practiceTitles} from '../dist/practice-catalog.js?v=20261014-practice1';
import {practiceDetails} from '../dist/practice-details.js?v=20261014-practice1';
import {practiceRoute,practiceElementPage,practiceExercisePage} from '../dist/practice.js?v=20261014-practice1';
import {creationElementPage,creationOverviewPage} from '../dist/creation.js?v=20261014-practice1';

// Editorial configuration checks: catch broken associations and incomplete publication.
const slug=/^[a-z][a-z0-9-]*$/;
const text=value=>typeof value==='string'&&value.trim().length>0;
const strings=(value,label)=>assert(value===undefined||Array.isArray(value)&&value.every(text),label);
const unique=(values,label)=>assert.equal(new Set(values).size,values.length,label);
assert.deepEqual(creationLayers.flatMap(layer=>layer.parts),creationOrder);
unique(practiceExercises.map(e=>e.id),'练习 ID 不能重复');
for(const e of practiceExercises){
 assert(slug.test(e.id)&&text(e.title)&&text(e.subtitle),'练习需要有效 ID、名称与副标题');
 assert(['draft','published'].includes(e.status),`${e.id}: 无效发布状态`);
 assert(Array.isArray(e.elementIds)&&e.elementIds.length>0,`${e.id}: 缺少关联层次`);
 unique(e.elementIds,`${e.id}: 重复关联层次`);
 assert(e.elementIds.every(id=>creationOrder.includes(id)),`${e.id}: 未知关联层次`);
 const d=practiceDetails[e.id];
 assert(d,`${e.id}: 缺少详情配置`);
 assert(d.goal===undefined||text(d.goal),`${e.id}: 核心目标应为文本`);
 strings(d.scenarios,`${e.id}: 适用场景应为文本数组`);
 strings(d.introduction,`${e.id}: 说明应为文本数组`);
 assert(d.sections===undefined||Array.isArray(d.sections),`${e.id}: 环节应为数组`);
 const sections=d.sections||[];
 unique(sections.map(s=>s.id),`${e.id}: 环节 ID 不能重复`);
 if(d.layout==='guide'){
  assert(text(d.introductionTitle),`${e.id}: 缺少导读标题`);
  unique(sections.flatMap(s=>(s.steps||[]).map(step=>step.id)),`${e.id}: 全页步骤 ID 不能重复`);
  assert(d.criteria&&text(d.criteria.title)&&Array.isArray(d.criteria.criteria)&&d.criteria.criteria.every(row=>Array.isArray(row)&&row.length===2&&row.every(text)),`${e.id}: 判断标准应包含名称与问题`);
  assert(d.closing&&text(d.closing.title),`${e.id}: 缺少结语`);
  strings(d.criteria.before,`${e.id}: 判断标准引言格式错误`);strings(d.criteria.paragraphs,`${e.id}: 判断标准正文格式错误`);strings(d.closing.paragraphs,`${e.id}: 结语正文格式错误`);
 }

 for(const s of sections){
  assert(slug.test(s.id)&&text(s.title),`${e.id}: 环节需要有效 ID 和标题`);
  for(const key of ['paragraphs','prompts','actions'])strings(s[key],`${e.id}/${s.id}: ${key} 应为文本数组`);
  if(s.steps!==undefined){
   assert(Array.isArray(s.steps),`${e.id}: 步骤应为数组`);
   unique(s.steps.map(step=>step.id),`${e.id}/${s.id}: 步骤 ID 不能重复`);
   for(const step of s.steps){assert(slug.test(step.id)&&text(step.title),`${e.id}: 步骤需要有效 ID 与标题`);strings(step.paragraphs,`${e.id}/${step.id}: 步骤正文应为文本数组`);}
  }
  assert(s.questions===undefined||Array.isArray(s.questions),`${e.id}: 问答应为数组`);
  for(const q of s.questions||[]){assert(Array.isArray(q)&&q.length===2&&text(q[0]),`${e.id}: 问答格式错误`);assert(Array.isArray(q[1])&&q[1].every(text),`${e.id}: 回答应为文本数组`);}
 }
 if(e.status==='published'){
  assert(sections.length>0,`${e.id}: 完整练习需要具体环节`);
  assert(sections.every(s=>!s.placeholder&&(['paragraphs','prompts','actions','questions'].some(key=>s[key]?.length)||s.steps?.length&&s.steps.every(step=>step.paragraphs?.length))),`${e.id}: 占位内容不能标记为已完成`);
 }
}
for(const id of Object.keys(practiceDetails))assert(practiceExercises.some(e=>e.id===id),`${id}: 详情缺少目录条目`);

// Integration checks cover every new route, two-way theory links and old bookmarks.
for(const id of creationOrder){
 assert(text(practiceTitles[id]));
 assert(creationElementPage(id).includes(`href="#/practice/layer/${id}"`),`${id}: 缺少理论到实践入口`);
 assert(practiceElementPage(id).includes(`href="#/becoming/${id}"`),`${id}: 缺少返回理论入口`);
}
assert.equal((creationOverviewPage().match(/id="creation-practice-bridge"/g)||[]).length,1);
const pages=['practice','practice/exercise/from-choice-to-being/philosopher-king',...creationOrder.map(id=>'practice/layer/'+id),...practiceExercises.map(e=>'practice/exercise/'+e.id)];
let links=0;
for(const route of pages){
 const html=practiceRoute(route);assert(html,`${route}: 页面为空`);
 for(const [,href] of html.matchAll(/href="#\/(.*?)"/g)){
  links++;
  assert(href===''||href==='becoming'||href.startsWith('practice')&&practiceRoute(href)||href.startsWith('becoming/')&&creationOrder.includes(href.slice(9)),`${route}: 失效链接 ${href}`);
 }
 for(const [,id] of html.matchAll(/data-scroll="([^"]+)"/g))assert(html.includes(`id="${id}"`),`${route}: 无效目录 ${id}`);
}
for(const item of practiceSearchItems)assert(practiceRoute(item.href),`搜索入口无效: ${item.href}`);
for(const e of practiceExercises)for(const id of e.elementIds)assert(practiceElementPage(id).includes(`href="#/practice/exercise/${e.id}"`));
assert.equal(practiceRoute('practice/layer/missing'),'');
assert.equal(practiceRoute('practice/exercise/missing'),'');
assert.equal(practiceRoute('practice/exercise/from-choice-to-being/unknown'),'');
assert.equal(practiceRoute('practice/layer/identity/extra'),'');
assert.equal(practiceRoute('other/layer/identity'),'');
assert.equal(practiceRedirect('becoming/practice',new URLSearchParams()),'#/practice');
for(const id of creationOrder)assert.equal(practiceRedirect('becoming/practice',new URLSearchParams({step:id})),`#/practice/layer/${id}`);
assert.equal(practiceRedirect('awareness',new URLSearchParams()),'#/practice/layer/focus');
assert.equal(practiceRedirect('wang',new URLSearchParams()),null);
console.log(`通过：创造实践 ${pages.length} 个页面、${links} 个内部链接、九项双向入口、占位发布保护与旧链接兼容。`);
