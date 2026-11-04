// A reading exercise based on the hypothetical founder in the integration chapter.
// These are possible interpretations to examine, not a test of spiritual authority.
const interpretations = [
  {
    id: 'fear',
    label: '想躲过失败',
    voice: '“只要换了方向，就不用面对这一次失败。”',
    reading: '眼前的挫折，也可能让“离开”显得格外诱人。先看清自己想避开的，究竟是什么。',
    question: '如果眼前的困难能被解决，我还想离开吗？我怕的是业务走不通，还是别人看见我失败？',
    action: '选出最想回避的一个问题，和团队一起核对事实，再做一次能在一周内完成的小验证。',
    feedback: '问题变得具体以后，换方向的念头有何变化？记录仍然成立的理由，也记录与你预想不同的结果。'
  },
  {
    id: 'approval',
    label: '想得到认可',
    voice: '“这样做，投资人和同行会更看得起我。”',
    reading: '认可的需要值得被听见。也可以再问一层：当掌声拿掉，这件事本身还剩下什么吸引力？',
    question: '如果没有人知道这是我做的，我还愿意做吗？这个选择具体帮助了谁，又要付出什么？',
    action: '暂时放下融资叙事，约两位实际用户，听他们讲一次真实使用中的困难。',
    feedback: '用户真正需要的，和我原先想展示的，是不是同一件事？听完不利于自己想法的信息，我是否愿意调整？'
  },
  {
    id: 'creation',
    label: '仍然关心创造',
    voice: '“我还是想让更多普通人，把自己的想法做出来。”',
    reading: '持续的热忱可以成为方向的线索。它怎样进入现实，还需要角色去判断、安排和承担。',
    question: '这份关心在不同处境下都出现过吗？它能为谁带来具体的益处？我愿意承担哪些琐碎的工作？',
    action: '保留现有业务，腾出一小段时间做最小原型，邀请几位目标用户试用。先约定投入的时间和费用上限。',
    feedback: '用户是否获得了实际帮助？做过那些不浪漫的工作后，我是否仍愿意继续？热忱、能力和现实条件，分别需要怎样调整？'
  },
  {
    id: 'uncertain',
    label: '还说不清，也许累了',
    voice: '“我想离开。可我现在太累，还分不清自己在抗拒什么。”',
    reading: '几个动机可以同时存在。暂时说不清，也可以先照顾身体，再把问题放回具体处境。',
    question: '这个念头在充分休息之后还一样强烈吗？此刻最迫切的需要，是改变方向，还是先恢复体力、获得支持？',
    action: '先留出休息时间，把决定拆小：这几天只整理事实、请人讨论，暂缓不可逆的大调整。',
    feedback: '休息后再看，哪些理由留下了？哪些只是当时的疲惫？如果仍不确定，就把它记作待观察的问题。'
  }
];

const defaultInterpretation = interpretations.at(-1);

function readingMarkup(item) {
  return `<div class="ic-dp-selected">
    <p class="ic-dp-voice">${item.voice}</p>
    <p class="ic-dp-reading">${item.reading}</p>
  </div>
  <ol class="ic-dp-path">
    <li><span class="ic-dp-step" aria-hidden="true">01</span><div><h4>先问自己</h4><p>${item.question}</p></div></li>
    <li><span class="ic-dp-step" aria-hidden="true">02</span><div><h4>做一件小事</h4><p>${item.action}</p></div></li>
    <li><span class="ic-dp-step" aria-hidden="true">03</span><div><h4>回来再看</h4><p>${item.feedback}</p></div></li>
  </ol>`;
}

export function dialoguePractice() {
  return `<section class="ic-discernment" data-ic-discernment aria-labelledby="ic-dp-title">
    <header class="ic-dp-heading"><span class="ic-dp-kicker">情境练习</span><h3 id="ic-dp-title">同一句“想”，可能从哪里来？</h3></header>
    <p class="ic-dp-context">一位创始人想让不会写代码的人也能创造。公司做大后，大客户定制越来越多，他心里反复冒出一句话：</p>
    <p class="ic-dp-thought">“我想换个方向。”</p>
    <p class="ic-dp-instruction" id="ic-dp-instruction">点开一种可能的解释，看看接下来可以怎样辨认。几种动机也可能同时存在。</p>
    <div class="ic-dp-choices" role="group" aria-label="查看不同的动机解释" aria-describedby="ic-dp-instruction">
      ${interpretations.map((item, index) => `<button type="button" data-ic-dp-choice="${item.id}" aria-pressed="${item.id === defaultInterpretation.id}" aria-controls="ic-dp-response"><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${item.label}</button>`).join('')}
    </div>
    <div class="ic-dp-response" id="ic-dp-response" aria-live="polite" aria-atomic="true">${readingMarkup(defaultInterpretation)}</div>
    <p class="ic-dp-note">这一步可以停在“不确定”。把感受、解释和实际结果分开记下，留待下一次回应。</p>
    <p class="ic-dp-source">改编自第三部的假设案例 · <a href="#/knowing/inner-consciousness/integration">继续看这位创始人如何做决定</a></p>
  </section>`;
}

export function initDialoguePractice(root) {
  const controller = new AbortController();
  root.querySelectorAll('[data-ic-discernment]').forEach(exercise => {
    const response = exercise.querySelector('.ic-dp-response');
    if (!response) return;
    const buttons = [...exercise.querySelectorAll('[data-ic-dp-choice]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      const item = interpretations.find(entry => entry.id === button.dataset.icDpChoice);
      if (!item || button.getAttribute('aria-pressed') === 'true') return;
      buttons.forEach(peer => peer.setAttribute('aria-pressed', String(peer === button)));
      response.innerHTML = readingMarkup(item);
    }, { signal: controller.signal }));
  });
  return () => controller.abort();
}
