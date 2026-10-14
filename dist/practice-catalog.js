import {creationOrder,creationNames,creationLayers} from './creation-framework.js?v=20261012-ren-depth1';

// The theory remains the single source of truth for names, order and layers.
export {creationOrder,creationLayers};
export const practiceTitles={
 identity:'从选择到成为',belief:'探索限制性信念',intention:'澄清自己的方向',
 imagination:'体验未来的自己',focus:'让注意回到选择',emotion:'理解感受，练习回应',
 thinking:'看清自己的解释',words:'让表达体现选择',action:'让选择进入生活'
};
export const elementName=id=>creationNames[creationOrder.indexOf(id)]||'';
export const theoryHref=id=>`#/becoming/${id}`;
export const elementPracticeHref=id=>`#/practice/layer/${id}`;
export const exerciseHref=id=>`#/practice/exercise/${id}`;

// Catalogue metadata only. Full, optional sections live in practice-details.js.
// One exercise can belong to several elements; each element can have many exercises.
export const practiceExercises=[{
 id:'from-choice-to-being',
 title:'从选择到成为',
 subtitle:'让理想中的自己，逐渐成为真实的自己。',
 elementIds:['identity','imagination','emotion','action'],
 status:'draft'
}];
export const exercisesFor=id=>practiceExercises.filter(exercise=>exercise.elementIds.includes(id));
export const practiceAvailability=id=>exercisesFor(id).some(exercise=>exercise.status==='published')?'查看实践练习':'实践内容完善中';
export const practiceSearchItems=[
 {name:'创造自己的实践',summary:'从理解到体验，从体验到成为。三层九项实践入口。',href:'practice',group:'创造实践'},
 ...creationOrder.map(id=>({name:elementName(id)+'实践',summary:practiceTitles[id]+' · '+practiceAvailability(id),href:'practice/layer/'+id,group:'创造实践'})),
 ...practiceExercises.map(e=>({name:e.title,summary:e.subtitle+(e.status==='draft'?' · 框架预览，内容完善中':''),href:'practice/exercise/'+e.id,group:'创造实践'}))
];

// Redirect old practice bookmarks into the new system.
export function practiceRedirect(path,params){
 if(path==='becoming/practice'){
  const step=params.get('step');
  return creationOrder.includes(step)?elementPracticeHref(step):'#/practice';
 }
 if(path==='awareness')return elementPracticeHref('focus');
 if(path.startsWith('practice/legacy/'))return '#/practice';
 return null;
}
