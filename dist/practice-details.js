// Optional fields: goal, scenarios[], introduction[], sections[].
// Sections have stable IDs and custom titles; no fixed number, order or required phases.
// Optional section content: paragraphs[], prompts[], actions[], questions:[[question, paragraphs[]]].
// A placeholder is editorial status, never an invitation to start a finished exercise.
export const practiceDetails={
 'from-choice-to-being':{
  goal:'让自己选择的身份，通过体验与行动逐渐进入真实生活。',
  sections:[
   {id:'notice',title:'看清',subtitle:'觉察旧有模式',placeholder:'这一环节将帮助我们辨认旧有的身份理解与惯常反应。具体问题与说明待共同完善。'},
   {id:'become',title:'成为',subtitle:'体验自己选择的身份',placeholder:'这一环节将围绕所选择的身份，设计想象与感受的体验。引导方式与文案待共同完善。'},
   {id:'act',title:'行动',subtitle:'在现实中实践新的选择',placeholder:'这一环节将把新的选择连接到现实中的具体行动。行动设计与说明待共同完善。'},
   {id:'reflect',title:'反馈',subtitle:'让新的经验逐渐内化',placeholder:'这一环节将帮助我们回看实际经验，修正理解与下一次选择。回顾问题与反馈方式待共同完善。'}
  ]
 }
};
