# gptoapk 埋点事件说明

本文档记录当前接入 GA4 和 Microsoft Clarity 的自定义埋点事件。

## 现有 ID

- GA4 Measurement ID：`G-DB1E6ERNFQ`
- Google Tag Manager ID：`GTM-MXXWHJTP`
- Microsoft Clarity Project ID：`wlqyr64bhf`

基础脚本在 `src/app/layout.tsx` 中加载。

## 所需环境变量

客户端事件可以直接使用现有 GA4 脚本。

服务端下载完成事件需要配置 GA4 Measurement Protocol secret：

```bash
GA_API_SECRET=your_ga4_measurement_protocol_api_secret
```

可选服务端覆盖项：

```bash
GA_MEASUREMENT_ID=G-DB1E6ERNFQ
```

如果缺少 `GA_API_SECRET`，生产环境会跳过服务端事件；本地开发环境会输出日志。

## 事件映射

| 指标 | 事件名 | 来源 | 触发时机 |
| --- | --- | --- | --- |
| 访问量 | `page_view` | GA4 基础脚本 | 页面正常加载和客户端路由切换 |
| 访问会话 | `site_visit` | 客户端 | 每个浏览器标签页会话触发一次 |
| 搜索按钮点击 | `search_submit` | 客户端 | 用户点击生成按钮或按 Enter |
| 解析成功 | `parse_success` | 客户端 | `/api/search-apps` 返回一个或多个应用结果 |
| 解析失败 | `parse_failed` | 客户端 | 空输入、无效应用、超时或请求错误 |
| 下载按钮点击 | `download_click` | 客户端 | 用户点击 `Download APK` |
| 下载准备成功 | `download_prepare_success` | 客户端 | `/api/download-apk` POST 返回代理下载 URL |
| 下载准备失败 | `download_prepare_failed` | 客户端 | 下载源不可用、文件过大或 API 错误 |
| 下载流开始 | `download_start` | 服务端 | `/api/download-apk?appId=...` 开始流式传输 |
| 下载成功 | `download_success` | 服务端 | APK 从上游完整传输到浏览器 |
| 下载失败 | `download_failed` | 服务端 | 下载源失败、超时、大小限制、代理错误或用户取消 |

## 关键参数

通用参数：

- `app_id`：Android 包名。
- `locale`：当前网站语言。
- `duration_ms`：当前步骤耗时。
- `reason`：失败原因。
- `stage`：后端下载失败发生在哪个阶段。

下载参数：

- `source`：`aptoide` 或 `apkpure`。
- `version`：可用时记录 APK 版本。
- `file_size`：可用时记录 APK 文件字节大小。
- `proxy`：当前为 `vercel-stream`。
- `max_proxy_bytes`：因文件过大被拦截时记录当前代理大小限制。

搜索和解析参数：

- `input_type`：`google_play_url`、`package_name`、`app_name` 或 `empty`。
- `query_type`：API 识别出的查询类型，可为 `url`、`package` 或 `keyword`。
- `result_count`：`/api/search-apps` 返回的应用结果数量。
- `lang`：可用时记录 Google Play 语言参数。
- `country`：可用时记录 Google Play 国家/地区参数。

## 统计口径

- 访问流量：看 GA4 的 `Users`、`Sessions` 和 `page_view`。
- 按钮点击：统计 `search_submit` 和 `download_click`。
- 搜索解析转化率：`parse_success / search_submit`。
- 搜索解析失败率：`parse_failed / search_submit`。
- 下载准备转化率：`download_prepare_success / download_click`。
- 真实下载成功数：统计 `download_success`。
- 下载流失败率：`download_failed / download_start`。

`download_success` 比客户端点击事件更可靠，因为它只会在文件流真正完成后发送。

## 涉及文件

- `src/lib/analytics-events.ts`：共享事件名和事件参数类型。
- `src/lib/client-analytics.ts`：客户端 GA4/Clarity 事件发送逻辑。
- `src/lib/server-analytics.ts`：服务端 GA4 Measurement Protocol 发送逻辑。
- `src/components/AnalyticsRouteEvents.tsx`：路由页面浏览和每会话一次的 `site_visit`。
- `src/components/SearchBox.tsx`：搜索、解析和结果列表相关事件。
- `src/components/DownloadButton.tsx`：下载点击和下载准备事件。
- `src/app/api/search-apps/route.ts`：统一的 Google Play 链接、包名、应用名称搜索 API。
- `src/app/api/download-apk/route.ts`：服务端下载流开始、成功、失败事件。
