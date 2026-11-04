// Reading gateway only. Chapter names and routes come from the existing self catalogue.
const chapters = [
  {id:'body-self',symbol:'身',en:'THE BODY',tone:'body',place:'通过体验，认识自己',question:'你经由什么认识自己？<br>又经由什么创造自己？',text:'身体是生命体验、表达和行动的活的载具。世界经由它成为体验，选择经由它进入现实；身体带回的感受，也帮助我们重新认识自己。',facets:'认识身体 · 理解身体 · 与身体合作',thesis:'让身体进入自己的人生安排。'},
  {id:'external-self',symbol:'名',en:'THE ROLE',tone:'role',place:'看见你最熟悉的自己',question:'抛开所有的名，我是谁？<br>又是谁，在抓着这些名？',text:'名字、故事与身份，让你在世界中拥有位置。看见名相背后的欲求与惯性，才能认真扮演角色，也记得自己不止于角色。',facets:'名相 · 欲求 · 惯性',thesis:'让角色成为表达自己的方式。'},
  {id:'inner-consciousness',symbol:'觉',en:'THE INNER SELF',tone:'inner',place:'走向那个一直在场的自己',question:'矩阵模拟之外，是什么？<br>不是“什么”，是“谁”。',text:'当你开始看见自己的念头与反应，关于“我”的追问便有了更深的方向。从相识、对话到融合，重新认识内在意识我。',facets:'相识 · 对话 · 融合',thesis:'让内在的王归位，活出生命的最高版本。'}
];

function illustration(chapter) {
  return `<figure class="ks-illustration ks-illustration--${chapter.tone}" aria-hidden="true"><img src="assets/knowing-gateway/${chapter.tone}-v1.jpg" alt="" width="960" height="640" decoding="async" loading="lazy"><span>${chapter.symbol}</span></figure>`;
}

export function knowingLanding(layers,sources) {
  return `<div class="page-shell knowing-landing">
    <nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a><span aria-hidden="true">/</span><a href="#/ren">人道</a><span aria-hidden="true">/</span><span aria-current="page">认识自己</span></nav>
    <header class="ks-intro">
      <div class="ks-title"><p class="ks-kicker">人道 · 第一步 <span aria-hidden="true">/</span> KNOW YOURSELF</p><h1>认识自己</h1><p class="ks-question">你说“我”的时候，<br>指的是谁？</p></div>
      <div class="ks-opening"><p class="ks-overline">通过体验，认识自己</p><p>我们习惯用名字、经历与身份，<br class="ks-desktop-break">回答“我是谁”。</p><p>但一个完整的自己，不止于这些答案。身体让你感受世界，角色使你走入生活，内在意识让你觉察、选择与创造。</p><p>沿着三个彼此相连的层面，<br>从最切近的身体，走向对完整生命的认识。</p></div>
    </header>
    <section class="ks-chapters" aria-labelledby="ks-chapters-title">
      <div class="ks-section-heading"><h2 id="ks-chapters-title">三个入口，同一个自己</h2><span class="ks-section-number" aria-hidden="true">01 — 03</span></div>
      <div class="ks-grid">${chapters.map((chapter,i)=>{
        const layer=layers.find(layer=>layer.id===chapter.id);
        return `<a class="ks-card ks-card--${chapter.tone}" href="#/knowing/${layer.id}" aria-labelledby="ks-name-${chapter.id}">
          <div class="ks-card-index"><span>0${i+1}</span><span>${chapter.en}</span></div>
          ${illustration(chapter)}
          <div class="ks-card-copy"><p class="ks-place">${chapter.place}</p><h3 id="ks-name-${chapter.id}">${layer.name}</h3><p class="ks-card-question">${chapter.question}</p><p class="ks-card-text">${chapter.text}</p><p class="ks-facets">${chapter.facets}</p></div>
          <div class="ks-card-footer"><p>${chapter.thesis}</p><span class="ks-card-link">阅读第${['一','二','三'][i]}章 <span aria-hidden="true">↗</span></span></div>
        </a>`;
      }).join('')}</div>
    </section>
    <section class="ks-reading-note" aria-label="阅读建议"><p>三个层面，<br>在同一次生命中相遇。</p><div><p>身体的感受、角色的回应与内在的选择，在每一次真实经历中彼此联系。</p><p>你可以从最贴近当下的一章读起，再回到日常的关系与行动中，观察这些层面如何共同参与自己的生活。</p></div></section>
    ${sources}
    <nav class="ks-exits" aria-label="继续阅读"><a href="#/ren" class="ks-back"><span aria-hidden="true">←</span> 返回人道</a><a href="#/acceptance" class="ks-forward"><small>认识之后，学会站在自己这一边</small><span>走向接纳自己 <span aria-hidden="true">→</span></span></a></nav>
  </div>`;
}
