# 创造实践 V1.0

本次是现有静态网站的增量升级。天道／人道／王道的理论结构不变；人道仍为认识自己 → 接纳自己 → 创造自己。实践依附于创造自己的三层九项，不构成第十项或第四道。

## 页面与入口

| 路由 | 页面 |
| --- | --- |
| `#/practice` | 创造自己的实践：首页总论、核心循环、三层九项导航、练习列表 |
| `#/practice/layer/:elementId` | 某一项的实践目录、关联练习、返回对应理论 |
| `#/practice/exercise/:exerciseId` | 通用练习详情页 |
| `#/practice/exercise/from-choice-to-being` | 《从选择到成为》框架预览 |
| `#/becoming` | 原总论，仅新增“从理解到体验，从体验到成为”模块 |
| `#/becoming/:elementId` | 原九篇正文，原练习区替换为克制的实践入口 |

`elementId` 沿用已有理论：

- 意识层：`identity`、`belief`、`intention`
- 模板层：`imagination`、`focus`、`emotion`
- 实相层：`thinking`、`words`、`action`

旧链接只转到新体系，不再提供旧练习界面：

- `#/practice` 原址直接展示新首页。
- `#/becoming/practice` → `#/practice`。
- `#/becoming/practice?step=identity` 等有效九项参数 → 对应实践目录。
- `#/awareness` → `#/practice/layer/focus`。
- `#/becoming?tab=practice`、`#/becoming?topic=practice` → 想象实践目录。

按照作者最新要求，旧日用三步、九项记录、觉察工具及想象记录表已撤下，没有旧实践入口或归档页面，也不再读取、保存旧工具的浏览器记录。旧版本浏览器存储不作为新体系的数据来源。

## 文件职责

- `dist/practice-catalog.js`：练习列表元数据、关联关系、状态、搜索条目、旧链接映射。三层和九项名称／顺序直接引用 `creation-framework.js`。
- `dist/practice-details.js`：练习正文配置，不包含列表展示逻辑。
- `dist/practice.js`：首页、各项目录、通用详情模板，以及嵌入理论页的入口模块。
- `dist/practice.css`：仅新实践页面和入口卡片的样式，沿用已有字体、颜色、目录与返回导航。
- `dist/elements.js`：从当前理论正文派生导航和搜索资料，不再重复保存旧理论简稿或旧练习。
- `scripts/check-practice.mjs`：配置合法性、双向链接、目录目标、旧路由和占位发布检查，已纳入 `npm run check`。

## 新增练习

1. 在 `practice-catalog.js` 的 `practiceExercises` 中增加一条：

```js
{
 id: 'your-exercise-id',
 title: '练习名称',
 subtitle: '简短副标题',
 elementIds: ['identity', 'action'],
 status: 'draft'
}
```

2. 在 `practice-details.js` 的 `practiceDetails` 中用同一 ID 增加正文：

```js
'your-exercise-id': {
 goal: '核心目标待确定。',
 // scenarios 和 introduction 可省略；填写时使用文本数组。
 sections: [
  {
   id: 'opening',
   title: '环节名称',
   subtitle: '可选副标题',
   placeholder: '具体内容待共同完善。'
  }
 ]
}
```

首页列表、关联项目录、详情路由、搜索和返回理论链接会自动生成，无须修改页面架构。一个练习可以关联多个项目；一个项目下也可以有任意多个练习。

`goal`（字符串）、`scenarios`（字符串数组）、`introduction`（字符串数组）、`sections`（环节数组）均可选。环节不限制数量、名称或顺序，每个环节的 `id` 唯一且稳定，`title` 必填，其余内容按需使用：

| 字段 | 类型与用途 |
| --- | --- |
| `subtitle` | 字符串，环节说明 |
| `paragraphs` | 字符串数组，说明或引导式体验 |
| `prompts` | 字符串数组，无序提示 |
| `actions` | 字符串数组，有序的现实行动 |
| `questions` | `[问题, [回答段落]]` 数组，沿用现有默认收起的问答样式 |
| `placeholder` | 字符串，明确尚待打磨的内容 |

正文以纯文本填写，模板会转义 HTML。练习 ID、环节 ID 使用小写英文字母、数字和短横线，且以字母开头。ID 发布后保持稳定，以兼容旧书签。

文案经作者确认、练习已完整时，移除占位说明，再将元数据 `status` 改为 `published`。关联入口会自动更新状态。检查工具会拒绝把仍有 `placeholder` 或空环节的练习标记为完成。技术检查不代替作者对内容的确认。

## 当前占位范围

九项实践全部仍在完善。唯一示范《从选择到成为》关联身份、想象、情绪、行动，只确定了看清、成为、行动、反馈四个环节；核心目标和短占位说明已提供，具体流程、提问、引导词及行动安排尚未编写。

没有注册、数据库、打卡、记录历史、计时器、音频或 AI 教练。下一步建议先共同确认《从选择到成为》的目标、适用情境与四环节文案，再逐项扩展。

## 验证与发布

运行 `npm run check`，并在本地预览检查桌面与手机布局、目录跳转、返回导航、九项理论和实践的相互链接、旧书签兼容。项目仍不需要构建或安装依赖。修改文件时同步更新 `?v=` 引用链。正式发布继续遵循 `AGENTS.md` 中的发布边界。


## 公开阅读指南 V1.1

`practiceDetails` 支持 `layout: 'guide'`：`introductionTitle`／`introduction` 为引言，`sections` 为阶段，每阶段可有 `paragraphs` 与 `steps`；步骤包含稳定的 `id`、`title`、`paragraphs`。`criteria` 包含标题、前文、名称/问题二元数组与后文；`closing` 包含标题和段落。段落仅支持 `**重点**` 与 `*提示*`，渲染前转义正文，不接受原始 HTML。此布局保留连续滚动阅读，不添加表单、评分或进度要求。

《从选择到成为》公开版继续使用 `#/practice/exercise/from-choice-to-being`。独立的 `#/practice/exercise/from-choice-to-being/philosopher-king` 仅为占位页，不是另一项已发布练习，不进入关联练习目录。两页均由现有静态正文生成器发现并输出 `/read/` 版本。
