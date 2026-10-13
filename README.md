# 三道哲学 V2.0

看见真理，创造自己，改变世界。

本仓库保存网站当前版本的完整静态源码、字体、视频与交接说明，供新的 Codex 会话继续修改。初始导入整理于 2026-10-14，对应原工作目录的最新网站文件。

线上地址：[www.triatao.com](https://www.triatao.com/)。

## 开始修改

需要 Node.js 20 或更新版本；没有需要安装的 npm 依赖。

```sh
npm run dev
```

打开终端显示的本地地址，默认是 `http://127.0.0.1:4173/`。如端口被占用：

```sh
npm run dev -- --port 4174
```

不要直接双击 `index.html`；浏览器模块需要通过 HTTP 预览。

**`dist/` 就是本项目实际编辑的源码，同时也是发布目录。** 当前项目使用原生 HTML、CSS 和 JavaScript ES 模块，没有需要重新生成 `dist/` 的构建步骤。不要删除或忽略这个目录，也不要为了启动项目而迁移到其他框架。

修改后执行：

```sh
npm run check
```

该命令检查 JavaScript 语法、静态模块引用与 HTML/CSS 本地资源引用；页面交互、视觉效果仍需在浏览器检查。

## 交给新 Codex

在新账号中连接有本仓库访问权限的 GitHub 账号，选择此仓库；也可以把仓库克隆到本机，再让 Codex 打开该文件夹。无需沿用原来的 Codex 会话。

可以发送这段指令开始：

> 请先阅读仓库根目录的 AGENTS.md、README.md 和 docs/HANDOFF.md，运行本地预览。这是《三道哲学》V2.0 的现有网站，请在既有框架、正文与风格基础上继续完成我接下来提出的修改。dist 是可编辑源码，不是可以清空的构建产物。先说明你找到了哪些相关文件，再动手修改。

本仓库为公开仓库，任何人都可以读取和克隆。要直接把修改推送回此仓库，需要连接仓库所有者的 GitHub 账号，或由所有者为另一个 GitHub 账号添加协作者权限；也可以先 Fork 到自己的账号后继续修改。

## 文件导航

| 内容 | 主要文件 |
| --- | --- |
| 页面入口、路由、菜单、搜索 | `dist/index.html`、`dist/app.js` |
| 首页 | `dist/home.js`、`dist/home.css` |
| 通用数据、样式、字体 | `dist/data.js`、`dist/styles.css`、`dist/typography.css` |
| 天道九要素 | `dist/dao-content.js`、`dist/dao-reading.js` |
| 天道可视化 | `dist/tian-visuals.js`、`dist/tian-visuals.css` |
| 认识自己、人格篇 | `dist/knowing.js`、`dist/personality.js` |
| 接纳自己总论和三篇 | `dist/acceptance.js`、`dist/acceptance.css` |
| 创造自己总论、分层、循环 | `dist/creation-framework.js`、`dist/creation.js` |
| 身份、信念、意图 | `dist/creation-consciousness.js` |
| 想象、聚焦、情绪 | `dist/creation-template.js` |
| 思维、话语、行动 | `dist/creation-reality.js` |
| 创造自己入口与样式 | `dist/becoming.js`、`dist/creation.css` |
| 王道 | `dist/wang.js`、`dist/wang-*.js`、`dist/wang.css` |
| 返回导航、目录、阅读交互 | `dist/navigation.js`、`dist/reading-ui.js` 及对应 CSS |
| 三道全图 | `dist/app.js`、`dist/atlas.css` |
| 图片、视频、字体及来源记录 | `dist/assets/` |

同名旧模块可能仍作为兼容内容保留；修改前沿当前路由和导入链确认实际使用的模块，不要只按文件名猜测。

## 发布

现有正式站由腾讯云服务器和 EdgeOne 提供服务。**提交到 GitHub 本身不会自动更新正式站。** 本次导入未配置 GitHub Pages 或自动发布，也不改变线上域名、证书和缓存设置。

要发布时，将经过检查的 `dist/` 内容交给现有静态站部署流程。服务器凭据、SSH 私钥、账号令牌和旧账号的托管配置不在仓库内；在新环境中需要单独配置发布权限。不要把它们提交到 Git。

字体和视频来源说明保留在 `dist/assets/`。本仓库没有新增开源许可证；第三方资源的来源与许可证按各自附带说明保留。
