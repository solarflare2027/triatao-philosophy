// Original commissioned illustrations: me and my higher-dimensional self.
const art = {
  'recognition-hero': ['相识 · 我与本体相认', '小尺度的我站在水边，与同一面容、由星光和金色结构构成的巨大本体相望。', '从角色的视角，望见更完整的自己。'],
  'recognition-witness': ['看见正在经历的自己', '我置身情绪的风暴之中，更大的自己在剧场之外安静观照。', '身在情绪之中，也能看见正在经历的自己。'],
  'recognition-dimensions': ['更宽的视野', '本体手中层层展开的画面，呈现同一个生命在不同尺度下的视角。', '更宽的视野，未必意味着更远的地方。'],
  'dialogue-hero': ['对话 · 穿过面纱的回应', '桥上的我向更高维的自己伸出手，金色的光穿过两者之间的面纱。', '给内在的回应，留出被听见与理解的空间。'],
  'dialogue-veil': ['在面纱上开一扇门', '同一面容的两个自己隔着面纱相望，一道金色的光从门中抵达掌心。', '先留出一扇门，让未被理解的回应进入。'],
  'dialogue-dream': ['梦中的回应', '一个我安静入睡，更大的自己仍然醒着，在梦的窗口之间展开回应。', '白天与梦里，仍是同一个生命的不同视角。'],
  'integration-hero': ['融合 · 与更大的我同行', '现实中的我携着计划向前走，同一面容的本体在更大的尺度上与他朝向同一片光。', '本体引领方向，角色以判断与行动回应。'],
  'integration-direction': ['交还方向，保有能力', '我手中仍有指南针与行动计划，本体以开阔的视野指向远方。', '交还方向，让角色的才智继续发挥。'],
  'integration-life': ['让内在进入生活', '我走回有工作与花园的街道，更高维的自己与日常世界共同出现在画面中。', '把内在的方向，带回此刻的工作、关系与生活。'],
  'matrix-choice': ['红蓝药丸的选择', '莫菲斯坐在红色皮椅中，向尼奥摊开双手，一只手放着红色药丸，另一只手放着蓝色药丸。', 'there is no turning back.']
};

export function innerEpicFigure(key, {hero = false} = {}) {
  const item = art[key];
  if (!item) return '';
  const [title, alt, caption] = item;
  const path = `/assets/inner-consciousness-epic-v1/${key}`;
  const matrix = key === 'matrix-choice';
  return `<figure class="ic-story ${hero ? 'ic-epic-hero' : 'ic-epic-inline'}${matrix ? ' ic-epic-matrix' : ''}" data-ic-art="${key}" aria-label="${title}">
    <img src="${path}-1440.webp" srcset="${path}-720.webp 720w, ${path}-1440.webp 1440w" sizes="(max-width:600px) calc(100vw - 40px), (max-width:1000px) calc(100vw - 80px), 740px" width="1440" height="960" alt="${alt}" loading="${hero ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${hero ? 'high' : 'auto'}">
    <figcaption>${matrix ? '' : `<span>${title}</span>`}<p${matrix ? ' lang="en"' : ''}>${caption}</p></figcaption>
  </figure>`;
}

function beforeHeading(html, phrase, key) {
  let found = false;
  const result = html.replace(/<h3\b[^>]*>[\s\S]*?<\/h3>/g, heading => {
    if (!found && heading.includes(phrase)) {
      found = true;
      return innerEpicFigure(key) + heading;
    }
    return heading;
  });
  if (!found) throw Error('Missing inner illustration heading: ' + phrase);
  return result;
}

export function decorateInnerEpic(part, html) {
  if (part === '') {
    const marker = html.indexOf('重看《黑客帝国》中的红蓝药丸选择');
    const position = html.lastIndexOf('<details', marker);
    if (marker < 0 || position < 0) throw Error('Missing Matrix choice video');
    return html.slice(0, position) + innerEpicFigure('matrix-choice') + html.slice(position);
  }
  const positions = {
    recognition: [['用它做的事来认识它', 'recognition-witness'], ['不是一个地方', 'recognition-dimensions']],
    dialogue: [['这不是谁的错', 'dialogue-veil'], ['直接说话', 'dialogue-dream']],
    integration: [['交出去什么，留下什么', 'integration-direction'], ['谦卑而坚韧，入世而无执', 'integration-life']]
  };
  for (const [heading, key] of positions[part] || []) html = beforeHeading(html, heading, key);
  return html;
}
