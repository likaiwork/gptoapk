# 应用名称搜索与直接 APK 下载流程

## 概述

首页搜索流程现在通过统一的结果列表体验支持三种输入：

- Google Play 链接：解析链接后返回 1 个精确应用结果。
- Android 包名：按包名返回 1 个精确应用结果。
- 应用名称关键词：搜索 Google Play，返回相关应用列表。

每个搜索结果都会展示应用图标、标题、开发者、包名、简介和可用的元信息。用户可以直接在结果列表里点击 `Download APK` 下载，不需要先进入应用详情页。

## 用户流程

1. 用户在首页搜索框输入应用名称、Google Play 链接或包名。
2. `SearchBox` 调用 `/api/search-apps?q=...&hl=...&gl=...`。
3. API 将输入识别为 `url`、`package` 或 `keyword`。
4. 前端在搜索框下方渲染结果列表。
5. 每一行结果包含：
   - 应用图标
   - 应用标题
   - 开发者
   - 包名
   - 简介
   - 可用时显示评分、版本、大小和价格文本
   - `Download APK` 按钮
   - 详情页链接
6. 点击 `Download APK` 后，复用现有 `/api/download-apk` 下载流程，并传入所选应用的 `appId`。

## API 约定

接口：

```http
GET /api/search-apps?q={query}&hl={locale}&gl={country}
```

成功响应：

```ts
type SearchAppsResponse = {
  query: string;
  queryType: "url" | "package" | "keyword";
  lang: string;
  country: string;
  results: Array<{
    appId: string;
    title: string;
    summary: string | null;
    developer: string | null;
    icon: string | null;
    score: number | null;
    scoreText: string | null;
    priceText: string | null;
    free: boolean | null;
    version: string | null;
    size: string | null;
    updated: string | null;
    url: string | null;
  }>;
};
```

错误响应：

```ts
type SearchAppsError = {
  error: string;
};
```

## 查询识别规则

API 使用以下规则判断输入类型：

- 如果输入包含 `play.google.com`，按 Google Play 链接处理，并读取 `id`、`hl`、`gl` 参数。
- 如果输入匹配类似 `com.openai.chatgpt` 的 Android 包名格式，按精确包名查询处理。
- 其他输入都按应用名称关键词搜索处理。

精确查询使用 `google-play-scraper.app`。

关键词搜索使用 `google-play-scraper.search`，当前最多返回 10 个结果，并按 `appId` 去重。

## 涉及文件

- `src/app/api/search-apps/route.ts`：新增统一搜索 API。
- `src/components/SearchBox.tsx`：改为在当前页面渲染搜索结果列表，不再输入后立即跳转到 `/app/{appId}`。
- `src/components/DownloadButton.tsx`：新增 `compact` 紧凑模式，用于搜索结果行，同时保留详情页原有按钮样式。
- `src/app/layout.tsx`：将 Bing 验证字段移到 `metadata.verification.other.msvalidate`，兼容 Next.js 16 类型要求。

## 兼容说明

旧的详情页流程仍然保留：

```text
/app/{appId}
/zh/app/{appId}
```

搜索结果列表会继续提供详情页入口。用户想看更多应用信息时可以进入详情页；想直接下载时可以在列表里直接点击下载按钮。

## 当前限制

- 搜索结果来自 Google Play 元数据，但 APK 是否能下载仍取决于 `/api/download-apk` 里现有的下载源。
- 部分应用可能能搜索到，但如果 Aptoide/APKPure 没有可用 APK 源，下载准备会失败。
- 超过本站代理大小上限的大 APK 不再报错，会通过 `/api/download-apk?delivery=direct` 安全重定向到已验证的上游 CDN 下载地址。
- 第一版没有对每个搜索结果预先检测下载可用性，目的是保持搜索速度，并减少不必要的上游请求。

## 验证记录

实现后运行过以下检查：

```bash
npx eslint src/components/SearchBox.tsx src/components/DownloadButton.tsx src/app/api/search-apps/route.ts src/app/layout.tsx
npm run build
```

手动 API 检查：

```bash
curl 'http://localhost:3000/api/search-apps?q=chatgpt&hl=en&gl=us'
curl 'http://localhost:3000/api/search-apps?q=com.openai.chatgpt&hl=en&gl=us'
curl 'http://localhost:3000/api/search-apps?q=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.openai.chatgpt%26hl%3Den%26gl%3Dus'
curl -X POST 'http://localhost:3000/api/download-apk' -H 'Content-Type: application/json' --data '{"appId":"com.openai.chatgpt"}'
```
