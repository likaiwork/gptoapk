# gptoapk 内容营销与自动化计划

> 协作方式：**A（你每天说「写今天的」）+ B（GitHub Issue 提醒）**  
> 更新：2026-05-25 · 依据 GA：中国 ~78%、美国 ~10%

## 目标

1. **站内 SEO**：`/zh/blog` 为主（每周 5 篇），`/en/blog` 为辅（每周 2 篇）
2. **外链引流**：摘要 + canonical 指向 gptoapk.com
3. **自动化**：能机器做的机器做；国内平台你复制粘贴发布

## 流量优先级

| 优先级 | 市场 | 路径 | 每周篇数 |
|--------|------|------|----------|
| P0 | 中国大陆 | `/zh` | 5 |
| P1 | 美国/英语 | `/en` | 2 |
| P2 | 港台/日 | zh 段落或 `/ja` | 按需 |
| P3 | 俄印印尼等 | 暂不批量 | 0（有 GSC 数据再开） |

## 每日流水线

```
选题队列 → 写 MD 母版(content/drafts) → 入站内博客 → Vercel 部署
    → IndexNow（自动）→ 百度推送（cron）
    → 外链：Blogger/Substack/Tumblr/Dev.to（自动，有密钥时）
    → 中国：dist/syndication/zh/ 草稿包（你手动发知乎/CSDN）
```

## 协作方式 A

在 Cursor 中说：

- `写今天的 zh` / `写今天的 en`
- `发今天的`（表示母版已定稿，触发发布与外链）

Agent 读取 `content/queue/2026-Q2.json` 中**今天**的条目执行。

## 协作方式 B

- 每天 **北京时间 09:00** GitHub Actions 创建 Issue：`📅 今日内容 YYYY-MM-DD`
- Issue 含：选题、关键词、待办 checklist、外链平台列表
- 完成后在 Issue 评论 `done` 或更新 `content/queue/status.json`

## 自动 vs 手动

| 动作 | 执行方 |
|------|--------|
| 写正文 MD、入站博客 JSX | Agent（你触发或 Issue） |
| git push、Vercel 部署 | 你确认后 push 或 Agent commit |
| IndexNow 新 URL | **自动**（workflow） |
| 百度 sitemap 推送 | **自动**（已有 cron 02:20 UTC） |
| Blogger / Substack / Tumblr / LinkedIn | **自动**（`publish-articles.yml`，需 Secrets） |
| Dev.to / Medium | **自动**（配置 API 后） |
| 知乎 / CSDN / 掘金 / 简书 | **你手动**（用 `content/syndication/zh/` 草稿） |

## 文件位置

| 路径 | 用途 |
|------|------|
| `content/queue/2026-Q2.json` | 90 天选题日历 |
| `content/queue/status.json` | 发布状态追踪 |
| `content/drafts/` | 每日 MD 母版 |
| `content/syndication/zh/` | 国内平台复制用草稿 |
| `content/syndication/en/` | 英文外链摘要 |
| `.github/workflows/daily-content-reminder.yml` | 每日 Issue 提醒 |
| `.github/workflows/content-post-publish.yml` | 发布后 IndexNow + 外链 |

##  Secrets（GitHub）

已用：`BAIDU_TOKEN`, `BLOGGER_*`, `LINKEDIN_*`, `SUBSTACK_*`, `TUMBLR_*`, `GH_PAT`  
建议加：`DEVTO_API_KEY`, `MEDIUM_INTEGRATION_TOKEN`

## 内容规范

- 中文 1200–1800 字；英文 1000–1500 字
- 文末 CTA：链到 `https://www.gptoapk.com/zh` 或 `/en` 搜索
- 内链 3 条：相关 `*-apk` 页 + hub（`china-apk-ai-search`）
- 禁止 33 语机器翻译批量 index

## 90 天主题概览

见 `content/queue/2026-Q2.json`。第 1–4 周偏中国 Play/AI/安装；第 5–8 周加英文教程；第 9–12 周港台段落 + 试点 hi/ja。
