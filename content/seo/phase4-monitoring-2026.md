# Phase 4 — 索引与监控 Runbook（2026 Q2）

> 对标计划：`content/seo/appteka-compete-plan-2026.md`  
> 印度集群 URL 清单：`content/seo/india-cluster-urls.json`

---

## 1. IndexNow（每次 deploy 后自动 + 可手动）

| 动作 | 命令 / 触发 |
|------|-------------|
| **自动** | `deploy.yml` push main → 等待 Vercel → `npm run indexnow:india` |
| **手动** | `npm run indexnow:india` |
| **单 URL** | `npm run indexnow -- https://www.gptoapk.com/hi/capcut-apk` |
| **博客发布** | `content-post-publish.yml`（带 `[syndicate]` 或 queue published） |

验证 key 文件可访问：`https://www.gptoapk.com/5935b2b9dcd6c981f8b9a5002fb55451.txt`

---

## 2. GSC 每周复盘（约 15 分钟）

**路径：** Google Search Console → 效果 → 网页（筛选 `https://www.gptoapk.com/hi/`）

### 重点查询词

| 查询 | 目标页 | 备注 |
|------|--------|------|
| minecraft apk / minecraft patch | `/hi/minecraft-apk` | patch 意图看博客 `/hi/blog/minecraft-apk-india-2026` |
| capcut apk | `/hi/capcut-apk` | |
| cocobox apk | `/hi/cocobox-apk` | 下架横幅 |
| whatsapp apk | `/hi/whatsapp-apk` | |
| instagram apk | `/hi/instagram-apk` | |
| pubg mobile apk | `/hi/pubg-mobile-apk` | BGMI 另搜 alias |

### 记录模板（每周一行）

```
日期 | 查询 | 展现 | 点击 | CTR | 平均排名 | 备注
```

---

## 3. GA4 着陆页 CTR（每月）

**事件：**

| 事件 | 含义 |
|------|------|
| `download_click` | APK Download 按钮（`app_id`, `path`） |
| `play_store_click` | Play 安装按钮（`app_id`, `landing_slug`, `locale`） |

**探索报告建议：**

1. 探索 → 自由形式 → 维度：`landing_slug` 或 `page_path`（`/hi/*-apk`）
2. 指标：`download_click`、`play_store_click` 计数
3. 计算：Download / (Download + Play) — 免费应用目标 **> 50%**；付费应用（Minecraft）Play 为主属正常

---

## 4. Admin 搜索失败词 → alias（每周）

1. 打开 `/admin` → **Search failures**（未解决）
2. 筛选印度相关：`whatsapp`、`capcut`、`bgmi`、`truecaller`、`jio` 等
3. 有包名 → 写入 `src/lib/search-aliases.ts`
4. 高量词无包 → 补 `SearchBox` fallback 或新建 `*-apk` 配置
5. 标记 resolved

**常用印度补词（已部分入库）：** `bgmi`, `pubg india`, `truecaller apk`, `instagram apk download`

---

## 5. 成功指标（8 周）

| 指标 | 基线 (2026-06) | 目标 |
|------|----------------|------|
| 印度 `*-apk` 索引页 | ~16 hi 页 | 20+ 被索引 |
| `hi/minecraft-apk` 周展现 | — | 进入 Top 50 查询 |
| 着陆页 Download CTR | — | > 5%（相对页面浏览） |
| 印度搜索失败词 | admin 当前数 | −30% |

---

## 6. 快捷命令

```bash
node scripts/phase4-weekly-checklist.mjs   # 打印本周清单
npm run indexnow:india                     # 提交集群 URL
npm run content:today                      # 日常内容队列
```
