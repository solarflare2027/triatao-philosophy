import {withDeepReading} from './reading-depth.js?v=20261011-nine2';
const triad=items=>`<div class="action-triad">${items.map(([t,p])=>`<div><h4>${t}</h4><p>${p}</p></div>`).join('')}</div>`;
const insight=p=>`<div class="action-insight"><p>${p}</p></div>`;
const cite=label=>`<button type="button" class="action-cite" data-element-anchor="belief-sources">${label} · 思想来源 ↓</button>`;
const chapter=(n,id,title,lead,body)=>`<section class="be-element-section action-section belief-chapter" id="belief-${id}" aria-labelledby="belief-${id}-title"><header><span class="eyebrow">${n} / 信念与创造</span><h2 id="belief-${id}-title">${title}</h2><p class="action-lead">${lead}</p></header>${withDeepReading('belief',id,body)}<button type="button" class="action-up" data-element-anchor="belief-contents">返回目录 ↑</button></section>`;
const groups=[
 {name:'看见自己的信念',intro:'哪些判断，已经被我当成了不必再问的真实？',items:[['premise','01','认出默认的前提'],['structure','02','理解信念的结构'],['observe','03','从线索走向理解']]},
 {name:'理解创造的机制',intro:'这些前提怎样组织体验，又怎样被体验强化？',items:[['consciousness','04','身份、信念与意图'],['cycle','05','经验怎样形成闭环'],['conflict','06','旧模式与新的选择']]},
 {name:'在体验中转化',intro:'我怎样打开新的可能，并允许真实经验更新理解？',items:[['change','07','建立更合适的前提'],['practice','08','完成一次小步实践'],['feedback','09','接回反馈，走向意图']]}
];

export function beliefPage(){return `<div class="page-shell becoming-page be-element action-page belief-page">
<nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a><span>/</span><a href="#/ren">人道</a><span>/</span><a href="#/becoming">三层九要素</a><span>/</span><span aria-current="page">信念</span></nav>
<header class="be-element-head action-head"><p class="eyebrow">意识层 / 02</p><h1>信念</h1><p class="be-element-essence">看见默认的真实，打开可以选择的可能。</p><p class="be-element-intro"><strong>我把什么当作真实，它怎样塑造我的体验？</strong><br>信念为经验赋予含义，也使某些可能显得可行、危险或不值得。看见这些前提怎样彼此支撑、怎样进入生活，再让新的体验帮助我们形成更充分的理解。</p></header>
<nav class="action-toc" id="belief-contents" aria-label="信念的三条主线">${groups.map((g,i)=>`<div><span class="eyebrow">0${i+1} / ${['识别','机制','转化'][i]}</span><h2>${g.name}</h2><p>${g.intro}</p>${g.items.map(([id,n,t])=>`<button type="button" data-element-anchor="belief-${id}"><span>${n}</span>${t}<b aria-hidden="true">↘</b></button>`).join('')}</div>`).join('')}</nav>
<blockquote class="action-quote"><p>认出前提，理解它怎样参与经验，<br>再让经验打开新的理解。</p><cite>01 身份 → 02 信念 → 03 意图 · 三者相互影响，也共同接受体验的更新。</cite></blockquote>

<div class="action-part"><span>第一篇</span><p>看见自己的信念</p></div>
${chapter('01','premise','认出默认的前提','信念，是我接受为真实，并据以理解和回应生活的认知前提。',`
<div class="action-prose"><p>它不一定以“我相信”开头，也可能藏在一句“本来就是这样”里：表达不同意见会失去关系；只有表现完美才值得被尊重；承认不知道会失去权威。前提一旦被当真，接下来的解释和选择就容易顺着它展开。</p><p>同事说“这里还需要核实”，我可能听成“他在帮助我们查清问题”，也可能听成“他认为我没有能力”。话语相同，进入我的体验却不同。看见信念，首先是分清：<strong>发生了什么，以及我给发生的事赋予了什么含义。</strong></p></div>
${triad([['知道','我理解一个观点，也可以复述它。它是否进入生活，还要看具体处境中的回应。'],['相信','我把某个前提当真，用它判断自己、他人与可能性；有时甚至忘了它仍是一种判断。'],['活出','理解参与了实际选择，也接受行动后果与新信息的调整。它可以在练习中逐渐成为习惯。']])}
${insight('信念既可能打开空间，也可能过早关闭空间。我们要培养的，是能够支持生活、也愿意接受检验的理解。')}
<details class="action-fold"><summary>展开辨析：事实、解释、信念、预期与愿望</summary><div class="action-prose"><p><strong>事实描述：</strong>“对方两天没有回复。”需要尽量明确、可以核对。</p><p><strong>解释：</strong>“他不重视我。”这是对事实含义的判断，也存在其他解释。</p><p><strong>信念：</strong>“重视我的人一定会立即回复。”这是解释背后的前提。</p><p><strong>预期：</strong>“他接下来还会忽略我。”这是对未来的预测。</p><p><strong>愿望：</strong>“我希望得到及时回应。”这是想要的结果。<strong>意图：</strong>“我愿意把沟通需要说清，并了解双方能做到什么。”这是准备投入的方向。</p><p>这些区分是本页的工作定义，帮助辨认不同问题；资料中的相近用词仍须结合语境理解。</p></div></details>
${cite('细雨 ·《思想的阶梯》第一季第四册，第23篇')}`)}

${chapter('02','structure','理解信念的结构','一个判断，连着怎样一整组关于自己与世界的前提？',`
<div class="action-prose"><p>信念来自亲身经历，也可能来自家庭、文化、权威和反复的自我解释。有些曾经适合当时的处境，后来被延伸到所有关系；有些从未亲自检验，却因听得太多而显得理所当然。理解来历有帮助，但不必找到唯一的起因，才能开始改变。</p><p>赛斯在《个人实相的本质》第617节讨论核心信念及其派生信念：较根本的自我与世界判断，能够把看似分散的想法组织到一起。我们可以借此观察一组判断之间的关联。</p></div>
${triad([['根本判断','“只有表现完美，我才有价值。”它为多种处境设下了同一个条件。'],['派生规则','“不能求助”“不能承认不知道”“必须获得所有人的认可”。这些规则彼此支撑。'],['具体预期','会议前，我预测“只要答不上一个问题，别人就会否定我”。它把整组判断带进当下。']])}
<div class="action-prose"><p>这个例子是我们的教学展开，并非固定的三层分类。一个人也可能同时相信“探索值得鼓励”和“犯错不可接受”，在不同情境中启动不同规则。整理信念，就是看见它们怎样支持、限制或彼此冲突。</p><p><strong>深层不一定意味着不可接近。</strong>一些前提只是太熟悉，以至于我们把它当作现实本身。从此刻反复出现的一句话开始，便可能找到入口。</p></div>
${cite('赛斯 ·《个人实相的本质》第615、617节')}`)}

${chapter('03','observe','从线索走向理解','从反复出现的感受与选择中，我可以辨认哪些前提？',`
${triad([['听见语言','“我总是”“他们一定”“我不配”“如果……就会……”——记录反复出现的判断。'],['看见反应','注意靠近与回避、紧张与松动，以及不同关系中重复出现的应对。'],['放回情境','当时有哪些事实、需要、能力与条件？换一个对象或场合，反应是否不同？']])}
<div class="action-prose"><p>同一次迟迟没有行动，可能涉及害怕评价，也可能是目标不清、缺少技能、资源不足，或需要重新衡量风险。情绪、身体、梦境与行为都可以带来观察线索；它们不能单独替我们判定某条信念。</p></div>
<ol class="action-stages"><li><h3>描述与记录</h3><p>写下具体发生的事、自己的反应和当时条件。尽量保留原话，暂缓给自己贴标签。</p></li><li><h3>提出与比较</h3><p>“如果我默认相信……，这次反应就比较容易理解。”同时写下其他可能解释，寻找支持与反例。</p></li><li><h3>验证与修正</h3><p>在合适的小情境中观察，或询问、尝试，再判断哪个解释更贴近实际。候选前提可以被修订。</p></li></ol>
${insight('觉察的价值，是让我多看见一些选择。一次退缩不定义我的身份，一次恐惧也不等于我希望坏事发生。')}`)}

<div class="action-part"><span>第二篇</span><p>理解创造的机制</p></div>
${chapter('04','consciousness','身份、信念与意图','身份给出立场，信念提供前提，意图明确这一次的方向。',`
${triad([['身份 ↔ 信念','我怎样理解自己，影响什么显得可信；关于可能性的信念，又影响我怎样活出身份。自我比任何一组自我描述都更丰富。'],['信念 ↔ 意图','信念影响我敢不敢想、愿不愿尝试；真正重视的方向，又促使我检查“为什么我认定这不可能”。'],['意图 ↔ 身份','这一次选择怎样参与，会让理想身份获得具体表达；新的体验又帮助我认识自己。']])}
<div class="action-cycle" aria-label="意识层的互动"><p><a href="#/becoming/identity">我愿意诚实担当</a><span>↔</span><b>不知道也可以学习</b><span>↔</span><a href="#/becoming/intention">这次把问题查清</a></p><p>↶ 在行动与体验中，身份得到实践，信念得到检验，意图得到澄清。</p></div>
<div class="action-prose"><p>若同时相信“承认未知就不配负责”，便会出现冲突。可以重新理解担当：它包含认真核实、及时反馈，也包含对不足负责。信念的调整，使选择的身份与当下意图更能相互支持。</p><p>信念属于意识层，作用可以贯穿三层。想象、情绪、语言与行动也会反过来影响它。九要素是相互连接的实践入口，阅读顺序不要求我们先把每一项彻底完成。</p></div>`)}

${chapter('05','cycle','经验怎样形成闭环','为什么不同的经历，有时仍被我读成同一个结论？',`
<div class="action-cycle" aria-label="信念与体验的反馈闭环"><p><b>信念</b><span>→</span><b>解读</b><span>→</span><a href="#/becoming/imagination">想象与聚焦</a><span>→</span><a href="#/becoming/emotion">情绪</a><span>→</span><a href="#/becoming/action">回应与行动</a><span>→</span><b>体验</b></p><p>↶ 体验经过解释，强化或修正信念。情绪、行动也能先成为改变的入口；他人、资源与环境持续参与其中。</p></div>
<div class="action-prose"><p>相信“提出不同意见就会破坏关系”，我便预演冲突、紧盯不悦的表情，带着紧张保持沉默。对方没有机会了解我，关系也难以加深。我又把这段疏远解释成“果然不能表达”。</p><p>这个循环可以从任何一处松动：重新检查前提，询问对方的真实意思，预演一次有边界的表达，或直接说清一个小分歧。新的回应增加了不同体验出现的机会。</p></div>
<details class="action-fold"><summary>案例：罗的卖画——想象怎样接到行动</summary><div class="action-prose"><p>《已知的实相IX》第475节以卖画为情境，引导罗体验创作、作品被欣赏与生活改善的可能。第478节继续讨论限制性判断及刊登卖画广告的建议。</p><p>这一案例的关键是：既看见关于艺术家与市场的前提，也让作品真正进入与人的接触。可以进一步询问：作品让谁受益？我依据什么认定无人愿意购买？准备采取什么行动来了解实际需求？</p><p>这里呈现的是课程中的问题与建议。所据材料没有给出这些建议之后立即售出的记录，因此不补写结果，也不把1967年的出版书款作为1969年卖画练习的成效。</p></div></details>
<details class="action-fold"><summary>深入理解：“信念创造实相”的两个讨论层面</summary><div class="action-prose"><p><strong>日常经验层面：</strong>信念参与信息选择、意义理解、关系回应与行动。我们可以具体观察某个前提如何改变自己的参与方式，并据反馈修正。</p><p><strong>形而上学层面：</strong>赛斯与细雨赋予意识、信念更广泛的实相生成作用，包括物质经验与多维存在。这是其世界观，需要按原有语境理解；它不能由一次愿望实现或某项心理学研究直接证实。</p><p>我们将两种讨论分别呈现。外部事件涉及多种条件，不能由遭遇倒推一个人暗中想要什么；伴侣协作也不被换算成固定倍数的效果。</p><a class="source-link" href="#/becoming/cases">继续阅读：灾难性想象的夫妻 ↗</a></div></details>
${cite('赛斯 · 第475、478节；细雨 · 第335节解读')}`)}

${chapter('06','conflict','旧模式与新的选择','先出现的反应，不必成为最后的回应。',`
<div class="action-prose"><p>熟悉的处境容易唤起熟悉的判断。“我愿意坦诚”刚刚出现，“说错了会被否定”就已先一步接管想象。新旧理解并存，可以成为练习的起点。</p><p>主导此刻回应的，不只是某条信念有多旧、多强。情境是否安全、注意放在哪里、怎样反复练习、有没有支持、能否暂停并重新选择，都在改变接下来的可能。</p></div>
${triad([['觉知 · 认出正在发生','我又想用回避来保护自己了。先让自动反应进入意识，不急着责备自己。'],['觉察 · 看清具体关系','我预测了什么？这个预测与哪些经验有关？此刻真的一样吗？我需要什么支持？'],['重新选择 · 落下一步','允许紧张还在，选择一句更准确的表达、一个问题，或一次有边界的尝试。']])}
${insight('新的选择可以与旧情绪同时存在。转化体现在我逐渐拥有更多合适的回应，也更能根据处境作判断。')}
<div class="action-prose"><p>如果旧模式曾帮助我避免冲突，可以保留对关系与安全的重视，再学习清楚表达、选择对象与时机。若环境确实不利，也可以先建设条件或退出不合适的情境。怀疑有时提醒旧习惯，有时带来应认真核实的信息。</p></div>
${cite('细雨 ·《思想的阶梯》第一季第10篇；第二季第5.2节')}`)}

<div class="action-part"><span>第三篇</span><p>在体验中转化</p></div>
${chapter('07','change','建立更合适的前提','怎样形成一个既容得下真实、又打开可能的新前提？',`
<ol class="action-stages"><li><h3>看见前提，理解它的作用</h3><p>把“我就是做不到”展开为具体判断：“如果我请教，就会被认为无能。”它可能曾帮助我维护形象、减少被评价的风险；也可能只是沿用的习惯，不必强行为它寻找深层故事。</p></li><li><h3>提出可以尝试的新理解</h3><p>“向合适的人提出具体问题，可以帮助我完成工作；我也会承担准备与核实。”它承认条件、保留未知，并指向可实践的回应。</p></li><li><h3>用行动与反馈继续修订</h3><p>准备一个问题，向合适对象请教，观察实际回应。若没有得到帮助，继续检查对象、表达、时机与资源；更新具体判断。</p></li></ol>
${triad([['准确','分清已经知道、合理推断与仍然未知。新前提无需承诺所有人都会支持我。'],['开放','“过去几次如此”可以保留，“永远只能如此”需要重新检视。给条件与变化留位置。'],['可实践','它是否帮助我明确下一步，并接触此前被回避的信息？新的理解需要有生活中的落点。']])}
<details class="action-fold"><summary>可选练习：一句话、一个情境、一种回应</summary><div class="action-prose"><p><strong>话语：</strong>用自己愿意认真对待的表达提醒方向，例如“我可以在学习中承担”。不需要机械重复，也不要求把怀疑压下去。</p><p><strong>想象：</strong>预演一个具体场景，让它包含真实阻力：我提出问题，听到不同意见，仍能保持好奇并核实。进入愿意活出的Being状态，再带回一个行动。</p><p><strong>情绪：</strong>辨认感受，允许紧张与愿意并存。平静、兴奋或身体舒展都可以发生，练习不以某种体感为成功凭据。</p><a class="source-link" href="#/becoming/imagination">想象：画面、情境体验与Being ↗</a></div></details>
${cite('细雨 ·《思想的阶梯》第二季第三册，第5.2节')}`)}

${chapter('08','practice','完成一次小步实践','以一件真实的事，走过识别、尝试与回看。',`
<div class="action-case"><article><span class="eyebrow">教学情境 / 明天需要回应一次质疑</span><h3>我愿意担当，却怕承认不知道。</h3><p><strong>身份：</strong>我选择做一个诚实、求真且愿意承担的人。<strong>旧前提：</strong>“答不上来，别人就会认为我不配负责。”<strong>线索：</strong>想到会议便反复准备辩解，迟迟不敢向同事确认信息。</p><p><strong>核对：</strong>过去有过被讥讽的经历，也有过认真请教得到帮助的经历；这次仍有资料没有查清。紧张可能同时涉及旧经验和准备不足。</p><p><strong>新理解：</strong>“可靠包括知道什么、承认不知道什么，并负责查清。”<strong>意图：</strong>这次把关键问题说明白，与对方约定下一步。</p><p><strong>实际准备：</strong>想象自己听完质疑，把注意放在问题依据上；允许紧张，说“这一点我需要核实，明天下午反馈”，随后完成核实。若无法按时完成，就提前说明新情况。</p><p><strong>回看：</strong>分别记录自己的回应、对方的实际反应与事情的进展。它们可能并不同时改善。这个示例展示实践路径，不预设结局。</p></article></div>
<div class="action-plan"><article><span class="eyebrow">练习前</span><h3>看见与选择</h3><ol><li><strong>发生了什么？</strong><p>先写事实，再写自己的解释。</p></li><li><strong>我默认了什么？</strong><p>列出候选前提、支持、反例与其他解释。</p></li><li><strong>愿意尝试什么理解？</strong><p>让它与选择的身份、当下条件相容。</p></li></ol></article><article><span class="eyebrow">练习中</span><h3>进入与体验</h3><ol><li><strong>落下哪一步？</strong><p>选具体、可承担且能带回信息的行动。</p></li><li><strong>旧反应出现时呢？</strong><p>觉知、觉察，再选择一次回应。</p></li><li><strong>需要什么支持？</strong><p>准备信息、能力、对象与时间。</p></li></ol></article><article><span class="eyebrow">练习后</span><h3>记录与修正</h3><ol><li><strong>实际发生了什么？</strong><p>记录结果，保留未知。</p></li><li><strong>哪项判断需要更新？</strong><p>分别看内在变化与外部成效。</p></li><li><strong>下一步怎样调整？</strong><p>可以修改前提、方法，也可以建设条件。</p></li></ol></article></div>
<div class="action-practice-entry"><div><span class="eyebrow">进入实际应用</span><h3>把自己的情境写下来。</h3><p>沿用九要素练习中的「信念」一格，把旧前提、证据、新理解与小行动放在一起；实践后再回到反馈区。</p></div><a class="button" href="#/becoming/practice?step=belief">开始信念练习 ↗</a></div>`)}

${chapter('09','feedback','接回反馈，走向意图','让经验更新判断，也让方向变得更清楚。',`
<div class="action-prose"><p>一次好结果，不能证明所有设想都成立；一次受挫，也不能判定自己不值得。先分清正在检验的是什么，再决定怎样使用反馈。</p></div>
<div class="belief-checks"><article><h3>关于自我价值</h3><p>“我值得被尊重”是一种对待生命的立场。能力可以评估，行为需要负责；被谁认可、某次成功与否，都不决定一个人的全部价值。</p></article><article><h3>关于具体预测</h3><p>“他会拒绝这个请求”可以与实际回应核对。一次回应提供这次情境的信息；要形成更广泛判断，还需要更多观察。</p></article><article><h3>关于方法与效果</h3><p>观察“这个做法，在这些条件下是否帮助了事情”。过程更从容与结果更有效可以分开记录，必要时调整方法、技能和条件。</p></article><article><h3>关于世界观</h3><p>意识与多维实相的哲学解释，不能由单次成败确认。若某个具体主张提出了可检验的预测，仍应接受相应检验，而不把反例自动归为信念不足。</p></article></div>
${insight('回看时写三句话：我原先预测……实际发生……下一次我准备调整……。可以约定一个适合这件事的回看时间，无需等待固定天数，也没有统一的转化周期。')}
<div class="action-prose"><p>有时，新体验会松动旧前提；有时，它会说明原有判断有合理依据，需要改变的是方法或环境。两种发现都让认识更清楚。一次没能做到，也可以帮助看见练习还需要哪些条件。</p><p><strong>01让我选择愿意成为谁，02让我看见据以生活的前提。</strong>接下来，03将这个认识带到当下：我真正愿意创造什么，又愿意为此投入什么？</p></div>
<p class="action-closing">不必等到所有怀疑消失，<br>才开始一次清楚、可承担的选择。</p>
<div class="be-related"><a href="#/becoming/identity">回看01 · 身份 ↗</a><a href="#/becoming/intention">继续03 · 意图 ↗</a><a href="#/becoming/mechanism">深入创造机制 ↗</a></div>`)}

<section class="action-source-section" id="belief-sources"><details class="be-source-note action-sources belief-sources"><summary>思想来源、摘录归属与阐释说明</summary><div class="action-source-list">
<article><h3>《与神对话》· 支撑思想与共同生活</h3><p>本轮深化加入《与神对话》第一卷关于支撑思想与经验解释的讨论，以及《与神合一》关于资格、条件与文化故事的讨论。参考《02信念·深化补充研究》所整理的相关材料，以主题转述使用；工作与关系中的不同前提、经验被当作例外、共同安排维持前提等情境，属于本页整合。</p></article><article><h3>赛斯 · 意识中的信念与核心信念</h3><p>《个人实相的本质》第615节讨论有意识地检查信念及其矛盾，第617节明确使用core beliefs与subsidiary beliefs。这里据英文摘录转述其关系；“根本判断—派生规则—具体预期”的例子是本页教学展开。</p><a class="source-link" href="https://www.nowdictation.com/q/book%3Anopr%2Bsession%3A615%2Bbeliefs/" target="_blank" rel="noopener noreferrer">第615节 · 英文摘录 ↗</a> <a class="source-link" href="https://nowdictation.com/q/book%3Anopr%2Bsession%3A617%2Bcore/" target="_blank" rel="noopener noreferrer">第617节 · 核心与派生信念 ↗</a></article>
<article><h3>赛斯 · 期望、想象与行动</h3><p>《已知的实相VIII》第一册第335节，以及《已知的实相IX》第四册第475、478节，是关于期望、卖画想象与行动的阅读线索。本页以主题转述为主，不拼接赛斯译文与细雨评论，也不将未见后续记录的建议写成已经实现的效果。</p></article>
<article><h3>细雨 · 从所知到所是</h3><p>《思想的阶梯》第一季第四册第10篇涉及觉察习气与局部改变，第23篇评说讨论信念、经验理解及所知与所是；第二季第三册第5.2节涉及新行为的练习，第二季第四册第38问讨论愿望与实现之间的“作为”。第23篇当事人的个人记录，与细雨的评说分别理解。</p><p>《已知的实相IX》第475节的夫妻例子按细雨解读处理，其译文与评论的版式分界仍待复核。本页没有采用编者读后感或群友观感作为理论依据。</p></article>
<article><h3>《三道哲学》· 框架与实践整合</h3><p>三层九要素、三条阅读主线、观察流程、会议示例及实践九问，是本体系的整合设计。信念属于意识层，其影响与反馈贯穿九要素；身份、信念与意图相互作用。</p><p>资料中的物质化、多维实相与情绪能量属于其形而上学解释。本文不将个人体验、倍数说法或身体感受转化为科学定论；日常练习以具体情境、行动与反馈为依托。</p></article>
</div></details></section>
<nav class="be-element-footer" aria-label="继续阅读"><a href="#/becoming/identity">← 上一要素：身份</a><a href="#/becoming/intention">下一要素：意图 →</a></nav>
</div>`;}
