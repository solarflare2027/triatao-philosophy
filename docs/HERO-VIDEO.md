# 首页视频

首页仍使用同一段 11 秒影片，提供横版和竖版 H.264/AAC MP4。静态封面、暂停、声音、减少动态效果偏好继续有效。原始影片和旧版资源保留。

## 启动路径

- `index.html` 的 `triatao-hero-boot` 在全站文章模块加载前选择屏幕对应的视频，连接到现有首页并播放。封面保留至真实视频帧可用。
- `home.js` 接管同一个视频节点和播放进度，不重新下载；也尊重提前点击暂停的选择。站内返回首页时由该模块正常初始化视频。
- 两处均使用 `/assets/a16z-study/landscape-fast-v2.mp4` 和 `portrait-fast-v2.mp4`，按 `(max-aspect-ratio:5/4)` 选择。
- 非首页与开启减少动态效果的访客不自动下载视频。
- 首页使用从原有正文宋体裁出的 `gen-ryu-home.woff2`，减少首屏字体与视频的带宽竞争；字形轮廓不变，缺字仍回退到原有完整字体。正文页面继续使用原有字体。修改首页文案后，用安装了 `fonttools[woff]` 的 Python 运行 `scripts/subset-home-font.py` 更新首页字集。
- `generate-readable-pages.mjs` 在快照中清除视频的 `src`、`autoplay` 和 `is-ready` 状态，并只为 `/read/` 首页保留提前启动脚本。不要把运行时桌面视频地址写回静态 HTML；否则手机会同时下载横、竖两版。

## 媒体处理

v2 从原片重新编码，保留完整时长与音轨；横版 1280×720，竖版 720×1280，24 帧/秒。采用每秒关键帧、前置 MP4 元数据与受控码率。无需新增运行时依赖。

```sh
ffmpeg -i dist/assets/a16z-study/landscape.mp4 -vf 'scale=1280:720:flags=lanczos,fps=24' -c:v libx264 -preset slow -crf 27 -maxrate 850k -bufsize 850k -g 24 -keyint_min 24 -sc_threshold 0 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart dist/assets/a16z-study/landscape-fast-v2.mp4
ffmpeg -i dist/assets/a16z-study/portrait.mp4 -vf 'scale=720:1280:flags=lanczos,fps=24' -c:v libx264 -preset slow -crf 28 -maxrate 650k -bufsize 650k -g 24 -keyint_min 24 -sc_threshold 0 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart dist/assets/a16z-study/portrait-fast-v2.mp4
```

更新影片时使用新文件名，避免旧缓存；同步上述两个入口、生成静态页面，再运行常规检查与首页视频验收。

验收命令：`npm run check`、`BROWSER_CHANNEL=chrome npm run test:hero`、`BROWSER_CHANNEL=chrome npm run test:readable`。
