# Google Play 链接转 APK 网站任务清单

## 第一阶段：前端基础与 UI 构建
- [x] 初始化 Next.js 项目 (TypeScript, Tailwind CSS, App Router)
- [x] 搭建整体布局与导航栏 (Header)
- [x] 实现首页 (Landing Page)
  - [x] 巨大的搜索框 (输入 Google Play URL 或包名)
  - [x] 搜索按钮与相关动画
  - [x] 简单的 SEO 友好说明文案
- [ ] 实现结果页/下载页 (Mock 数据版)
  - [ ] 展示 App 的 Icon、名称、包名、版本
  - [ ] 显示 "Generate Download Link" 按钮

## 第二阶段：核心 API 逻辑 (低成本爬虫方案)
- [ ] 调研并集成 Node.js 爬虫库 (如 `google-play-scraper` 获取应用信息)
- [ ] 调研并集成获取真实 APK 下载链接的方案 (可能需要模拟请求或爬取第三方源)
- [ ] 编写 `/api/fetch-info` 接口，输入包名返回 App 信息
- [ ] 编写 `/api/download-apk` 接口，实现以下逻辑：
  - [ ] 抓取/生成目标 APK
  - [ ] 将 APK 临时保存到服务器本地 `/tmp` 或指定目录
  - [ ] 返回给前端一个可供用户下载的 URL
- [ ] 实现定时清理任务 (Cron Job) 删除服务器上已过期的临时 APK 文件

## 第三阶段：联调与优化
- [ ] 前端调用后端 API，实现输入链接 -> 加载状态 -> 展示结果 -> 点击下载的完整闭环
- [ ] 完善错误处理 (如输入的链接无效、找不到 APK 等)
- [ ] 添加网站 SEO 基础标签和结构化数据
- [ ] (可选) 接入 Google Analytics 4 代码
