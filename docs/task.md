# Google Play 链接转 APK 网站任务清单

## 第一阶段：前端基础与 UI 构建
- [x] 初始化 Next.js 项目 (TypeScript, Tailwind CSS, App Router)
- [x] 搭建整体布局与导航栏 (Header)
- [x] 实现首页 (Landing Page)
  - [x] 搜索框支持输入 App 名称、Google Play URL 或包名
  - [x] 搜索按钮与相关动画
  - [x] 简单的 SEO 友好说明文案
- [x] 实现搜索结果列表
  - [x] Google Play URL 和包名输入返回单个产品
  - [x] App 名称输入返回相关产品列表
  - [x] 展示 App 的 Icon、名称、开发者、包名、摘要、评分、版本等信息
  - [x] 每个结果可直接点击 `Download APK`
- [x] 实现结果页/下载页
  - [x] 展示 App 的 Icon、名称、包名、版本
  - [x] 显示 `Download APK` 按钮

## 第二阶段：核心 API 逻辑 (低成本爬虫方案)
- [x] 调研并集成 Node.js 爬虫库 `google-play-scraper` 获取应用信息
- [x] 编写 `/api/fetch-info` 接口，输入包名或 Google Play URL 返回 App 信息
- [x] 编写 `/api/search-apps` 接口，统一支持 App 名称、包名、Google Play URL
- [x] 编写 `/api/download-apk` 接口，实现以下逻辑：
  - [x] 从 Aptoide/APKPure 解析目标 APK 下载源
  - [x] 通过服务端流式代理 APK 下载
  - [x] 返回给前端一个可供用户下载的 URL
- [ ] 实现热门 App 元数据缓存，减少重复请求 Google Play
- [ ] 实现热门 APK 源缓存或可用性预检查

## 第三阶段：联调与优化
- [x] 前端调用后端 API，实现输入 -> 加载状态 -> 展示结果列表 -> 点击下载的完整闭环
- [x] 完善错误处理 (如输入为空、无效 URL、找不到 App、APK 源不可用等)
- [x] 添加网站 SEO 基础标签和结构化数据
- [x] 接入 Google Analytics 4 和 Microsoft Clarity
- [x] 记录搜索、解析、下载准备、下载流式传输相关埋点
