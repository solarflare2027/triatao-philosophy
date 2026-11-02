// The diagrams explain this site's framework; they are not anatomical models.
const note = '<p class="icv-note">本体系的理解示意 · 图中的位置与连线，用来说明同一生命中的关系。</p>';

function recognitionDiagram() {
  return `<figure class="icv-diagram icv-recognition" aria-labelledby="icv-recognition-title">
    <figcaption><span class="icv-eyebrow">相识 · 看清关系</span><strong id="icv-recognition-title">同一个生命，三个面向</strong></figcaption>
    <div class="icv-life">
      <span class="icv-life-label">完整的我</span>
      <div class="icv-self icv-self-inner"><span class="icv-self-work">方向与全局</span><strong>内在意识我</strong><span>为什么而活，想创造什么</span></div>
      <div class="icv-two-way"><span><i aria-hidden="true">↓</i> 热忱 · 灵感</span><span><i aria-hidden="true">↑</i> 经历 · 回应</span></div>
      <div class="icv-self icv-self-role"><span class="icv-self-work">理解、选择与执行</span><strong>外在角色我</strong><span>看清处境，把方向化为行动</span></div>
      <div class="icv-two-way"><span><i aria-hidden="true">↓</i> 安排 · 照顾</span><span><i aria-hidden="true">↑</i> 状态 · 需要</span></div>
      <div class="icv-self icv-self-body"><span class="icv-self-work">生理调节与行动承载</span><strong>身体载具我</strong><span>接收感官信息，支持现实行动</span></div>
    </div>
    <p class="icv-takeaway">方向有人回应，行动有人承担，身体也被照顾。</p>${note}
  </figure>`;
}

const filterDrawing = (second = false) => `<svg class="icv-filter-drawing${second ? ' icv-filter-second' : ''}" viewBox="0 0 88 88" aria-hidden="true" focusable="false">
  <path class="icv-filter-trace" d="M44 0v22M44 66v22"/>
  <circle class="icv-signal" cx="44" cy="14" r="4"/>
  <path class="icv-mesh" d="M14 30h60M14 40h60M14 50h60M14 60h60M24 30v30M34 30v30M44 30v30M54 30v30M64 30v30"/>
  <path class="icv-open-path" d="M44 24v40"/>
  <path class="icv-filter-trace" d="m39 76 5 6 5-6"/>
</svg>`;

function dialogueDiagram() {
  return `<figure class="icv-diagram icv-dialogue" data-icv-diagram="dialogue" data-icv-mode="habit" aria-labelledby="icv-dialogue-title">
    <figcaption><span class="icv-eyebrow">对话 · 看见经过</span><strong id="icv-dialogue-title">一个念头，怎样来到面前</strong></figcaption>
    <div class="icv-controls" role="group" aria-label="比较两种回应方式">
      <button type="button" data-icv-mode-choice="habit" aria-pressed="true">原有的反应</button>
      <button type="button" data-icv-mode-choice="space" aria-pressed="false">试着留出空间</button>
    </div>
    <div class="icv-filter-source"><span class="icv-signal-dot" aria-hidden="true"></span><span>一个反复浮现的念头</span><strong>“我想重新做最初的产品。”</strong></div>
    <div class="icv-filter-row">
      ${filterDrawing()}
      <div><span class="icv-step-label">第一层滤网</span><strong>潜意识的审查</strong><p>一部分内容，未进入显意识。</p></div>
    </div>
    <div class="icv-filter-row">
      ${filterDrawing(true)}
      <div><span class="icv-step-label">第二层滤网</span><strong>已有认知的审查</strong><p data-icv-filter-thought>“不现实，先别想了。”</p></div>
    </div>
    <div class="icv-filter-destination"><span class="icv-destination-mark" aria-hidden="true">↓</span><div><span class="icv-step-label">外在角色我的回应</span><p data-icv-filter-result aria-live="polite">念头被收起，还没有机会被理解。</p></div></div>
    <p class="icv-takeaway">留出空间之后，仍要辨认、核实，再决定怎样行动。</p>${note}
  </figure>`;
}

function kingdomDrawing() {
  return `<svg class="icv-kingdom-drawing" viewBox="0 0 320 300" role="img" aria-labelledby="icv-kingdom-svg-title icv-kingdom-svg-desc">
    <title id="icv-kingdom-svg-title">王权交接前后的分工</title>
    <desc id="icv-kingdom-svg-desc">交接前，角色独自把持方向，内在热忱与身体需要未被充分回应。交接后，内在引领方向，角色仍然判断、选择、组织和执行，身体的状态与需要进入安排。</desc>
    <defs><marker id="icv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="m1 1 7 4-7 4" fill="none" stroke="currentColor" stroke-width="1.4"/></marker></defs>
    <path class="icv-kingdom-boundary" d="M160 9C225 9 300 150 307 226c6 55-74 66-147 66S6 281 13 226C20 150 95 9 160 9Z"/>
    <g class="icv-kingdom-before">
      <path class="icv-connection icv-connection-muted" d="M78 183Q71 100 118 76"/>
      <path class="icv-connection icv-connection-muted" d="M126 229h66"/>
      <path class="icv-unheard-mark" d="m91 117 10 10m0-10-10 10M151 224l10 10m0-10-10 10"/>
    </g>
    <g class="icv-kingdom-after">
      <path class="icv-connection" d="M125 104 88 175" marker-end="url(#icv-arrow)"/>
      <path class="icv-connection icv-return" d="M59 174Q62 104 111 75" marker-end="url(#icv-arrow)"/>
      <path class="icv-connection" d="M127 215h62" marker-end="url(#icv-arrow)"/>
      <path class="icv-connection icv-return" d="M190 237h-61" marker-end="url(#icv-arrow)"/>
    </g>
    <g class="icv-kingdom-node icv-kingdom-inner"><circle cx="160" cy="65" r="47"/><text x="160" y="61">内在意识我</text><text class="icv-kingdom-sub" x="160" y="84">方向</text></g>
    <g class="icv-kingdom-node icv-kingdom-role"><circle cx="77" cy="226" r="48"/><text x="77" y="222">外在角色我</text><text class="icv-kingdom-sub" x="77" y="245">判断与行动</text></g>
    <g class="icv-kingdom-node icv-kingdom-body"><circle cx="243" cy="226" r="48"/><text x="243" y="222">身体载具我</text><text class="icv-kingdom-sub" x="243" y="245">生理与承载</text></g>
  </svg>`;
}

function integrationDiagram() {
  return `<figure class="icv-diagram icv-integration" data-icv-diagram="integration" data-icv-state="after" aria-labelledby="icv-integration-title">
    <figcaption><span class="icv-eyebrow">融合 · 看清交接</span><strong id="icv-integration-title">交还方向，发挥全部能力</strong></figcaption>
    <div class="icv-controls" role="group" aria-label="比较王权交接前后的分工">
      <button type="button" data-icv-state-choice="before" aria-pressed="false">交接之前</button>
      <button type="button" data-icv-state-choice="after" aria-pressed="true">交接之后</button>
    </div>
    ${kingdomDrawing()}
    <div class="icv-integration-summary" aria-live="polite"><strong data-icv-integration-heading>方向、判断与承载，彼此相通。</strong><p data-icv-integration-result>内在引领方向；角色判断、选择、组织与执行；身体的真实需要被排进生活。</p></div>
    <p class="icv-takeaway">摄政王仍在。他的才智与责任，继续让方向成为现实。</p>${note}
  </figure>`;
}

export function innerDiagram(part) {
  return ({recognition: recognitionDiagram, dialogue: dialogueDiagram, integration: integrationDiagram}[part]?.() || '');
}

export function initInnerVisuals(root) {
  const controller = new AbortController();
  root.querySelectorAll('[data-icv-diagram="dialogue"]').forEach(figure => {
    figure.querySelectorAll('[data-icv-mode-choice]').forEach(button => {
      button.addEventListener('click', () => {
        const isSpace = button.dataset.icvModeChoice === 'space';
        figure.dataset.icvMode = isSpace ? 'space' : 'habit';
        figure.querySelectorAll('[data-icv-mode-choice]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
        figure.querySelector('[data-icv-filter-thought]').textContent = isSpace ? '“先记下来：它在回应什么？”' : '“不现实，先别想了。”';
        figure.querySelector('[data-icv-filter-result]').textContent = isSpace ? '把热忱、事实与处境一起看，再选择下一步。' : '念头被收起，还没有机会被理解。';
      }, {signal: controller.signal});
    });
  });
  root.querySelectorAll('[data-icv-diagram="integration"]').forEach(figure => {
    figure.querySelectorAll('[data-icv-state-choice]').forEach(button => {
      button.addEventListener('click', () => {
        const isAfter = button.dataset.icvStateChoice === 'after';
        figure.dataset.icvState = isAfter ? 'after' : 'before';
        figure.querySelectorAll('[data-icv-state-choice]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
        figure.querySelector('[data-icv-integration-heading]').textContent = isAfter ? '方向、判断与承载，彼此相通。' : '角色独自把持方向，也独自承担。';
        figure.querySelector('[data-icv-integration-result]').textContent = isAfter ? '内在引领方向；角色判断、选择、组织与执行；身体的真实需要被排进生活。' : '眼前的得失占住了注意，热忱被放在一旁，身体的需要也一再推迟。';
      }, {signal: controller.signal});
    });
  });
  return () => controller.abort();
}
