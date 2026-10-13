import {withDeepReading} from './reading-depth.js?v=20261011-nine2';
const external=(url,label)=>`<a class="source-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const three=items=>`<div class="be-three identity-three">${items.map(([t,p])=>`<div><h4>${t}</h4><p>${p}</p></div>`).join('')}</div>`;
const fold=(title,body)=>`<details class="identity-fold"><summary>${title}</summary><div class="identity-prose">${body}</div></details>`;
const up=()=>'<button type="button" class="identity-up" data-element-anchor="identity-contents">返回三个核心问题 ↑</button>';
const source=label=>`<button type="button" class="identity-cite" data-element-anchor="identity-sources">${label} · 思想来源 ↓</button>`;

export function identityPage(){return `<div class="page-shell becoming-page be-element identity-page">
<nav class="breadcrumbs" aria-label="当前位置"><a href="#/">首页</a><span>/</span><a href="#/ren">人道</a><span>/</span><a href="#/becoming">三层九要素</a><span>/</span><span aria-current="page">身份</span></nav>
<header class="be-element-head identity-head"><p class="eyebrow">意识层 / 01</p><h1>身份</h1><p class="be-element-essence">通过体验，认识自己；<br>通过选择，创造自己。</p><p class="be-element-intro"><strong>我是谁？我又选择成为谁？</strong><br>身份关注一个正在认识与创造自己的生命：看见已有的自我画像，在体验中发现真实的状态与潜能，再选择愿意活出的品质。认识给选择以起点，选择让新的自己逐渐成为可经历的生活。</p></header>
<nav class="be-element-toc identity-nav" id="identity-contents" aria-label="身份的三个核心问题"><button type="button" data-element-anchor="identity-perceived"><span>01 / 看见自我画像</span>我以为的“我是谁”</button><button type="button" data-element-anchor="identity-actual"><span>02 / 在体验中认识</span>实际上的“我是谁”</button><button type="button" data-element-anchor="identity-chosen"><span>03 / 让选择成为生活</span>我选择的“我是谁”</button></nav>
<p class="identity-orientation">三问相连：我怎样定义自己？体验让我发现什么？我又选择怎样成为？认识与创造，在新的体验中不断往复。</p>

<section class="be-element-section identity-chapter" id="identity-perceived" aria-labelledby="identity-perceived-title">
<div class="identity-chapter-head"><span class="eyebrow">01 / 看见自我画像</span><h2 id="identity-perceived-title">我以为的“我是谁”</h2><p>我怎样形成了对自己的认识，又把哪些部分遗漏了？</p></div>
<div class="identity-prose"><h3>一幅自我画像，是怎样形成的？</h3><p>名字、身体、职业、关系、成长经历与文化期待，慢慢汇成我们对自己的理解。父母怎样评价，朋友怎样回应，自己怎样记住成败，都可能进入这幅画像。它有真实的部分，也会遗漏需要、能力与尚未被看见的可能。</p></div>
<div class="identity-creation" aria-label="经历、解释与身份认定"><div><span>经历</span><h4>一次表达被打断</h4><p>会议中，我还没有说完，对方就转向另一个话题。</p></div><div><span>解释</span><h4>我的想法不重要</h4><p>这是我对经历的读法；时间、议题和对方状态也可能参与其中。</p></div><div><span>认定</span><h4>我就是不会表达的人</h4><p>一次经验被扩大为整体判断，又开始影响下次是否开口。</p></div><p class="identity-feedback">↶ 当认定变得熟悉，我们可能更注意相符的片段，忽略那些曾经表达清楚的时刻。</p></div>
<div class="identity-prose"><p>重新认识自己，可以从一句“我一直如此”开始：这句话来自哪些经历？我当时怎样解释？它适用于什么情境，又遗漏了哪些反例？过去发生过的事不能被抹去，对它的理解仍可随着新经验而更新。</p>
<h3>让角色承载生活，也容得下成长</h3><p>“我是母亲”“我是管理者”“我是创作者”，都可以帮助我们组织责任、学习能力并持续投入。稳定认同使承诺有了延续性；当它只剩“我必须永远如此”，角色就容易变成限制。</p></div>
${three([['角色有边界','我承担某种责任，也有角色之外的需要与面向。关心他人可以与照顾自己并存。'],['经历有范围','在某次压力中没有做到，说明这次的表现与条件；还需要更多观察，才能理解自己的习惯与能力。'],['认同可更新','保留已经真实活出的部分，容纳新的信息。成长可以延续自己，也可以改变曾经认定的自己。']])}
<div class="identity-prose"><h3>怎样听见反馈，又保有自己的判断？</h3><p>他人可以看见我遗漏的部分，但每个人都有观察范围。先询问具体情境、行为和影响，再与自己的体验及其他场景对照。“这次你没有听完”可以成为有用的反馈；“你从不在乎任何人”则需要拆开核实。</p><p>真实认识会越来越具体：我在哪些场景容易防御，哪些条件下更能倾听，哪些能力正在发展。即使反馈表达得笼统，也可以追问其中的事实；既不把评价当作全部定义，也不因听来不舒服便自动拒绝。</p></div>
${fold('小练习：把一个自我标签重新放回生活', '<p><strong>原来的标签：</strong>“我不擅长表达。”</p><p><strong>它的来处：</strong>哪几次经历让我这样想？当时有哪些情境与条件？</p><p><strong>被遗漏的部分：</strong>有没有表达顺畅的时刻？面对熟悉的人、准备充分时是否不同？</p><p><strong>更准确的认识：</strong>“我在陌生会议中容易紧张；准备好一个具体问题后，我更能表达。”这份认识既承认起点，也给实践留下入口。</p>')}
${withDeepReading('identity','perceived','')}
${source('细雨 · 所知与所是；《与神为友》· 自我认识与他人评价')}
<p class="identity-question">我对自己的认识，是否足够具体，也容得下尚未看见的部分？</p>${up()}
</section>

<section class="be-element-section identity-chapter" id="identity-actual" aria-labelledby="identity-actual-title">
<div class="identity-chapter-head"><span class="eyebrow">02 / 在体验中认识</span><h2 id="identity-actual-title">实际上的“我是谁”</h2><p>当自我画像暂时放下，体验让我看见怎样的状态与可能？</p></div>
<div class="identity-prose"><h3>从五个面向，拓宽对自己的认识</h3><p>我实际做了什么，是重要的认识材料；我正在经历什么、依据什么回应、还有哪些可能，同样需要被看见。下面五个面向是观察的入口，各自回答不同问题。</p></div>
<div class="identity-facets">
<article><span>01</span><div><h4>正在经历的自己</h4><p>我此刻在感受、思考、留意和选择什么？可以觉察一个念头的出现，而不必把这个念头当成整个自己。</p><small>入口：当下觉察</small></div></article>
<article><span>02</span><div><h4>已经显现的状态</h4><p>身体、能力、需要、局限与习惯，构成此刻真实的起点。认真记录我能做什么、需要什么、在哪些条件下表现不同。</p><small>入口：记录、反馈与跨情境观察</small></div></article>
<article><span>03</span><div><h4>正在运作的认同</h4><p>“我必须正确”“我不值得”“我可以学习”——哪些自我理解正在参与判断？从多种线索提出假设，再放回生活核实。</p><small>入口：信念辨认与开放检验</small></div></article>
<article><span>04</span><div><h4>尚待展开的可能</h4><p>未曾尝试的表达、能力与生活方式，需要在探索中变得具体。兴趣与想象可以指引尝试，实际练习帮助认识可行性与所需条件。</p><small>入口：尝试、训练与体验</small></div></article>
<article><span>05</span><div><h4>更广阔的自我观</h4><p>赛斯、细雨与《与神对话》都讨论超出当前角色的生命，但概念与论述各有不同。多维自我、内在意识与神性的解释，为生命打开哲学追问。</p><small>入口：分别理解各体系；不以一次感受确认整体世界观</small></div></article>
</div>
<div class="identity-insight"><p><strong>当下的表现提供起点，潜能需要展开，完整的生命仍向认识敞开。</strong>这五个面向不是固定等级，也不是另一套“我”的结构。一时的状态、某项能力或一句哲学描述，都不足以穷尽自己。</p></div>
${fold('关联背景：三个“我”与当前身份', '<p>《三道哲学》的“认识自己”以外在角色我、内在角色我、内在意识我展开。它讨论生命结构；这里的三个问题讨论我们怎样认识并创造身份。</p><p>身体我、头脑我、情感我指向实相层的外在角色；意识承接、角色运作、生命维系是模板层（电子层）中内在角色我的三个功能面向；主导神格 A 与次级神格 B、C……用于展开内在意识的表达。神格为本体系的命名，相关术语不能直接与其他体系逐项等同。</p><p>在本页，重点是让更广阔的理解支持当下生活，并持续照顾身体、能力、关系与责任。</p><a class="source-link" href="#/knowing">进入“认识自己”：三个“我”的结构 ↗</a>')}

<div class="identity-prose"><h3>体验怎样从“发生过”，变成“认识了”？</h3><p>阅读为我提供视角，想象让我接触一种可能，真实处境让我遇见感受、关系与后果。以为自己有耐心，被质疑时才发现急于控制；以为自己软弱，却在照顾他人时做出了勇敢的回应。</p><p><strong>体验既会显露已有面向，也会发展新的能力。</strong>耐心可能在一次次倾听中养成，勇气可能在仍然害怕时逐步生长。细雨对“所知与所是”“事上练”的讨论，提醒我们让理解进入生活；《与神对话》系列则赋予体验以认识和表达自己的重要位置。</p></div>
${three([['体验本身','会议上被质疑，我心跳加快，急于解释。先描述事件、感受与行为。'],['当时的解释','“这说明我不适合负责。”看见这是即时读法，还需要依据。'],['反思后的认识','我在资料不足时容易防御；有准备、能暂停时更愿意听取意见。下一次可调整准备和回应。']])}
<div class="identity-prose"><p>强烈感受值得倾听，它的含义仍需理解。可以比较不同情境、听取具体反馈，再通过尝试获得新信息。一次反应不能给整个人下结论；反复经历也不会自动变成智慧，关键在于怎样觉察、反思和重新选择。</p><p>认识自己的场域同样包括喜悦、创作、亲密、合作与平常日子。记下让我投入、舒展、有力量的时刻，也能发现真实需要与愿意发展的能力。</p></div>
${fold('体验三栏笔记：让观察与解释分开', '<p><strong>记录：</strong>今天发生了什么？我感受到什么，做了什么？</p><p><strong>读法：</strong>当时我认为“这说明我……”；这句话包含哪些推断？</p><p><strong>核对：</strong>在其他场景中是否也如此？还有哪些解释？我准备怎样进一步了解？</p><p>例如：“我拒绝了额外任务，感到不安”是记录；“我是自私的人”是解释；核对自己的负荷、承诺和表达方式后，可能形成更具体的认识。也允许暂时没有答案。</p>')}

<div class="identity-prose"><h3>身份怎样参与创造？</h3><p>更完整的自我是什么，是持续的探索；此刻实际从怎样的自我理解出发，则可以在具体生活中辨认。<strong>我当真的身份认同，会参与决定哪些可能显得适合我、哪些回应值得尝试。</strong></p></div>
${three([['可能与方向','我允许自己追求什么，注意哪些机会，又把哪些可能提前排除？'],['关系与意义','我怎样理解他人的评价，接受怎样的关系，如何表达需要和边界？'],['未知与回应','遇见不会的事，我选择隐藏、求助、学习还是退出？具体情境仍需具体判断。']])}
<div class="identity-creation" aria-label="身份参与三层创造"><div><span>意识层</span><h4>立场 · 前提 · 方向</h4><p>身份提供自我立场，信念参与判断可能，意图明确这次愿意创造什么。</p></div><div><span>模板层</span><h4>想象 · 聚焦 · 情绪</h4><p>我怎样预演情境、关注线索、感受可能，也反过来影响自我理解。</p></div><div><span>实相层</span><h4>思维 · 话语 · 行动</h4><p>判断、表达和实际参与改变可影响的条件，并接触他人与现实的回应。</p></div><p class="identity-feedback">↶ 新体验经过觉察与反思，强化或修正身份认同、信念与下一次选择。</p></div>
<div class="identity-example"><span class="eyebrow">贯穿情境 / 项目汇报被指出一处数据错误</span><h4>从维护“永远正确”，到实践“求真与承担”。</h4></div>
<div class="identity-compare"><article><h4>“我必须正确，才有价值”</h4><p>可能把指正听成身份否定，预演他人的议论，急于辩解或自责。注意逐渐离开需要修正的数据，体验又可能强化“不能让别人看见错误”的判断。</p></article><article><h4>“我愿意求真、学习并承担”</h4><p>仍可能紧张或羞愧，同时确认问题范围、承认自己的部分、约定核实与反馈。新的回应为合作和修正创造条件，也让选择的品质获得一次表达。</p></article></div>
<p class="identity-method-note">以上为教学示例，不预设对方一定合作或事情必然顺利。身体状态、技能、资源、环境与他人同样参与结果；一次成败不能倒推出一个人的全部身份与价值。</p>
${withDeepReading('identity','actual','')}
${source('细雨 · 事上练；赛斯 · 更广阔的身份；《与神对话》· 体验与表达')}
<p class="identity-question">我的自我描述之外，生活正在让我看见什么？</p>${up()}
</section>

<section class="be-element-section identity-chapter" id="identity-chosen" aria-labelledby="identity-chosen-title">
<div class="identity-chapter-head"><span class="eyebrow">03 / 让选择成为生活</span><h2 id="identity-chosen-title">我选择的“我是谁”</h2><p>我愿意活出什么品质，又怎样让它成为真实的参与？</p></div>
<div class="identity-prose"><h3>认识自己，与创造自己怎样相连？</h3><p>认识帮助我看清已经发生的状态、需要、能力与局限；创造发生在我怎样回应、怎样实践，以及愿意让什么获得表达。新的选择带来新的体验，又使我对自己的认识更加充分。</p><p>我们无需等到完整答案出现，才开始生活。也不需要用理想身份否认当下的自己。可以同时承认：“此刻我会害怕；这一次，我愿意诚实地承担自己的部分。”</p></div>
${three([['细雨 · 让知见进入所是','从生活中的习气、关系和选择辨认自己，通过“事上练”使理解逐渐成为实际表达。'],['赛斯 · 身份在潜能实现中展开','将当前自我置于更广阔的心灵之中，同时讨论身份随潜能实现而变化，提供持续探索与表达的视角。'],['《与神对话》· 当下选择与创造','强调生命中的自我也在被决定、表达和体验，推动我们从等待某个现成答案转向当下选择。']])}
${fold('深入：发现与创造之间，仍需保留哪些差异？', '<p>赛斯谈论比当前自我概念更广阔的身份；《心灵的本质》同时强调身份的完整性与持续变化。不能仅据一个词就将其归为“完全不变的本体”。</p><p>《与神为友》《与神合一》着重谈选择并创造自己，对“发现一个预先确定的身份”提出挑战。《与神对话》系列也讨论认识、体验与存在的关系；其原有张力不必被改写成和其他体系完全一致。</p><p>细雨以自我认知、价值完成和实际生活中的转化展开相关问题。各家对内在自我、神性、人格等概念的使用，需要分别理解。</p><p>本页采用的实践整合是：诚实认识当下，探索尚未展开的可能，主动选择并实践自己的表达。它不裁定所有本体问题，也不把哲学描述作为能力已具备的证明。</p>')}

<div class="identity-prose"><h3>把理想角色，转化为可实践的品质</h3><p>角色目标可以很具体：成为领导者、作家、伴侣或父母。再向内一步，问这个角色意味着怎样的存在方式：我愿意如何倾听、判断、关怀和承担？品质为角色赋予内容，技能与现实条件帮助内容落地。</p></div>
${three([['选择品质','“我愿意成为能倾听、求真并承担的人。”把愿望翻译成自己认真认可的方向。'],['落实表达','今天先听完一个不同意见，核实一个关键判断，或兑现一次反馈。让品质获得实际形式。'],['建设能力','补足知识、沟通与判断能力，协商时间和资源。品质实践有助于成长，具体职位与结果还涉及共同条件。']])}
<div class="identity-prose"><p><strong>Being，是在当下怎样存在与回应。</strong>我可以带着紧张保持诚实，也可以在尚未熟练时练习倾听。预演帮助进入这种状态，行动让它接触现实；练习的时长、情绪强度或一时失误，都不能单独判定一个人是否真诚。</p><p>“愿意承担”是方向，“已经胜任全部任务”是能力判断，二者需要分开。选择的身份可以稳定，做法、节奏与目标可以随反馈更新；当认识发生变化时，方向本身也可以重新选择。</p></div>
${fold('辨清Being、预演、练习与形象表演', '<p><strong>Being：</strong>此刻以所选品质参与。例如，感到紧张时仍愿意问清事实。</p><p><strong>心理预演：</strong>在内在情境中体验这样回应的可能，同时预留真实阻力。</p><p><strong>有意识的练习：</strong>尚不熟练也愿意尝试，接触反馈并逐步调整。</p><p><strong>形象表演：</strong>主要维护别人眼中的人设，以至于回避承认不知道、修正错误或处理实际影响。</p><p>人的动机可能交织，不靠一次行为贴标签。更有用的追问是：我是否愿意诚实面对能力、感受、后果和需要调整的地方？</p>')}
${fold('多个角色冲突时：品质、责任与边界一起考虑', '<p>工作需要投入，家庭需要在场，自己也需要休息。先明确各方的真实需要、已有承诺和现实限制，再比较可选安排与影响。</p><p>担当可以表现为承担，也可以表现为拒绝超出能力的任务、重新协商期限、请求支持。没有两全选项时，清楚说明取舍，承担自己的部分，并为后续调整留下空间。</p>')}

<div class="identity-prose"><h3>让一次选择，接回整个创造循环</h3><p>从一件真实的事开始，用三句话串起本页；需要深入时，再把信念、意图、预演与反馈补全。</p></div>
<div class="identity-practice"><span class="eyebrow">日常简版 / 三句话</span><ol class="be-mini-practice"><li><div><strong>我以为自己是……</strong><p>写一个常用的自我描述，并指出它来自什么经历。</p></div></li><li><div><strong>这次体验让我看见……</strong><p>分开写事实、感受与解释，也记录能力、需要和新的可能。</p></div></li><li><div><strong>接下来，我选择活出……</strong><p>选择一种品质，配上一个可承担的行动。实践后，再回看认识有什么变化。</p></div></li></ol><a class="button" href="#/becoming/practice?step=identity">开始身份练习 ↗</a></div>
${fold('深入版：七行连接身份、信念、意图与行动', '<ol class="identity-seven"><li><strong>我以为自己是：</strong>写下常用标签与来源。</li><li><strong>这次体验让我看见：</strong>区分事实、感受、解释及其他可能。</li><li><strong>我选择活出的品质：</strong>先选一个对这件事重要的方向。</li><li><strong>相关信念：</strong>哪些前提支持它，哪些前提需要检验？</li><li><strong>这一次的意图：</strong>我愿意创造什么体验或促成什么方向？</li><li><strong>准备怎样参与：</strong>预演真实阻力，明确话语、行动与所需支持。</li><li><strong>体验后的更新：</strong>实际发生了什么？认识、方法或条件需要怎样调整？也可以暂时保留未知。</li></ol><p>例如，从“我不会表达”出发，发现自己能在有准备时说明问题；选择求真与担当，检视“出错就会被否定”的前提，带着“把关键数据说清”的意图准备一次发言。后续结果留待真实发生，再据实回看。</p>')}
${fold('再看两个生活情境：表达与关系边界', '<p><strong>表达与自我价值：</strong>我以为“没有正式训练就不算创作者”。实际尝试后，看见自己有持续表达的兴趣，也有需要训练的技能。我选择认真创作，安排练习并征求具体反馈。作品质量可以被讨论，整个人的价值无需交给一次评价决定。</p><p><strong>关系与边界：</strong>我以为“让对方满意才是好的伴侣”。在互动中，看见自己会因对方失望而急于否定自己，也确有需要改进的沟通。我选择关怀与诚实，讨论具体需要、说明能力边界，并观察双方能否协商。</p><p>以上为教学示例。它们与汇报情境一起说明三个问题怎样用于生活，不预设结果，也不代替当事人理解自己的选择。</p>')}
${fold('反复与挫折出现时，怎样继续？', '<p><strong>旧反应又出现：</strong>记录触发条件，辨认自己是否更早看见、更能暂停。也检查练习是否太大、支持是否不足。</p><p><strong>他人不认同：</strong>追问具体事实与影响，理解对方的观察范围；有依据的反馈应认真处理，自我价值不以得到所有人认可为条件。</p><p><strong>持续没有进展：</strong>分别检查方法、能力、资源、状态与方向。继续、调整或暂停，都可以是清楚的选择。</p><p><strong>选择改变了：</strong>诚实说明新的理解，处理已有承诺。认识更充分之后改变方向，本身也属于创造自己。</p>')}
<div class="identity-insight"><p><strong>身份：我愿意以怎样的自己参与。信念：我依据什么理解生活。意图：这一次，我愿意创造什么。</strong>例如，“诚实担当”是一种身份方向，“承认未知仍能负责”是一条信念，“把问题查清并促成下一步”是当下意图。</p></div>
<p class="identity-question">生命的意义在于，通过体验，认识自己；通过选择，创造自己。</p><p class="identity-method-note">《三道哲学》· 核心命题。认识与创造在生活中持续往复。</p>
<div class="be-related"><a href="#/becoming/belief">02 信念 · 检查生活的前提 ↗</a><a href="#/becoming/intention">03 意图 · 明确当下方向 ↗</a><a href="#/becoming/imagination">04 想象 · 进入Being预演 ↗</a></div>${withDeepReading('identity','chosen','')}
${up()}
</section>

<section class="identity-source-section" id="identity-sources"><details class="be-source-note identity-sources"><summary>思想来源、摘录归属与阐释说明</summary>
<div class="identity-source-entry"><h3>深化阅读与本页主线</h3><p>本轮深化参照《01身份·深化补充研究2》所整理的自我保护、角色结束与身份选择材料。自我画像、实际体验与所选品质构成本页主线；保护功能与角色转换的日常情境是本页展开，不据个案推定每个人的心理成因。私人课中尚待版式核定的课文与评论，未合并署为赛斯原话。</p></div><div class="identity-source-entry"><h3>细雨本人文字 · 自我认知、所知与所是</h3><p>《思想的阶梯》第一季第四册第23、24篇讨论理解与实际状态的落差；第二季第一册有关“事上练”的文字为体验与实践提供阅读线索，具体篇次仍待版式复核。《已知的实相III》第四册第117节附近的解读，涉及既有认知对信息的筛选。本文以主题转述为主，相关解读与赛斯课文分开理解。</p><p>《观影说多维实相》第八册的自我价值与角色认知讨论，以及《思想的阶梯》第二季第四册有关关系与自我价值的答复，为表达、边界与角色提供参考。本页不使用群友观感、编者读后感作为理论依据，也不把电影解读当作已核定的传记事实。</p>${external('https://xiyu.love/archives/y','《已知的实相》系列导读')}</div>
<div class="identity-source-entry"><h3>赛斯资料 · 当前认同与更广阔的身份</h3><p>《个人实相的本质》第615、653节讨论信念、自我意象与可能性的关系。《心灵的本质》的出版方介绍引述身份在潜能实现中不断变化的观点。本页据此转述，没有将“完整性”直接等同于一个永远不变的本体。</p><p>《未知的实相》第682节的或然能力论述可作进一步阅读；本页保留探索潜能的方向，不将“跨系统支取能力”写成已经验证的方法。</p>${external('https://nowdictation.com/q/book%3Anopr%2Bsession%3A615%2Bbeliefs/','第615节 · 英文摘录')} ${external('https://nowdictation.com/q/book%3Anopr%2Bsession%3A653%2Bdefined/','第653节 · 自我意象')} ${external('https://penguinrandomhouselibrary.com/book/?isbn=9781878424228','《心灵的本质》· 出版方介绍')}</div>
<div class="identity-source-entry"><h3>《与神对话》系列 · 选择、表达与体验</h3><p>《与神为友》关于重新选择身份的讨论、《与神合一》关于创造与体验自身的论述，以及《与神对话》第一册对经验的重视，是本页的主要思想来源之一。不同译本及合订电子页码不能直接互换，本文采用转述，不标未经原书核定的印刷页码。</p><p>沃尔什在官方答读者文章中进一步强调选择并创造身份，也以神性的个体化表达理解生命。下列链接为作者后来的阐释，不作为原著逐字引文。我们保留它与“认识自己”的张力，由本体系提出体验与选择循环的实践整合。</p>${external('https://www.cwg.org/blog/101925-L','作者答读者 · 创造与体验身份')} ${external('https://www.cwg.org/blog/061022-L','作者答读者 · 自我表达与体验')}</div>
<div class="identity-source-entry"><h3>《三道哲学》· 三个问题与实践整合</h3><p>本页的三大部分、五个观察面向、生活情境、练习及“生命的意义在于，通过体验，认识自己；通过选择，创造自己”，采用本体系的表达。三大来源分别提供启发，不宣称它们原本共享这一固定框架。</p><p>多维自我、神性与意识直接生成物质实相，属于相关资料的哲学与形而上学论述。一次体验不能确认整个世界观；可检验的具体判断仍应接受事实与反馈。生活练习不以恐惧消失、某种体感或固定时长为转化的证明。</p></div>
</details></section>
<nav class="be-element-footer" aria-label="继续阅读"><a href="#/becoming">← 返回三层九要素</a><a href="#/becoming/belief">下一要素：信念 →</a></nav></div>`;}
