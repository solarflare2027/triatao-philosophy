import {practiceExercises,exerciseHref,elementName,theoryHref} from './practice-catalog.js?v=20261103-practice-hub1';
export const practiceModules=[{id:'tian',name:'天道'},{id:'ren',name:'人道'},{id:'wang',name:'王道'}];
export const practiceArticles=[
 ...practiceExercises.map(e=>({id:e.id,title:e.title,summary:e.subtitle,href:exerciseHref(e.id),modules:['ren'],topics:e.elementIds.map(id=>({title:elementName(id),href:theoryHref(id)})),publishedAt:null,kind:'实践指南',stage:null,relatedIds:[]})),
 {id:'inner-discernment',title:'同一句“想”，可能从哪里来？',summary:'从一位创始人想换方向的假设情境，辨认恐惧、认可、热忱与疲惫，连接小的行动与反馈。',href:'#/practice/article/inner-discernment',modules:['ren'],topics:[{title:'内在意识我 · 对话',href:'#/knowing/inner-consciousness/dialogue'},{title:'内在意识我 · 融合',href:'#/knowing/inner-consciousness/integration'}],publishedAt:null,kind:'情境练习',stage:null,relatedIds:[]},
 {id:'responding-to-criticism',title:'面对质疑，我如何回应？',summary:'通过一次创作反馈的情境示例，看清体验、选择身份，并将选择落实为回应。',href:'#/case',modules:['ren'],topics:[{title:'接纳自己',href:'#/acceptance'},{title:'创造自己',href:'#/becoming'}],publishedAt:null,kind:'情境示例',stage:null,relatedIds:[]}
];
export const articlesForRoute=route=>practiceArticles.filter(a=>a.topics.some(t=>t.href==='#/'+route));
// Missing historical dates remain unknown; dated future articles sort newest first.
export const sortedArticles=()=>practiceArticles.map((a,i)=>({a,i})).sort((x,y)=>(y.a.publishedAt||'').localeCompare(x.a.publishedAt||'')||x.i-y.i).map(x=>x.a);
