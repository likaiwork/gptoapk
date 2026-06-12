# Phase 5：Appteka 海外关键词对标（2026-06）

> 数据来源：Semrush 竞品 [appteka.store](https://appteka.store/) 自然搜索词（印度 ~55%、俄罗斯、孟加拉、菲律宾等）。  
> 我方边界：**不做** 成人/piracy/mod 批量页；**不做** Minecraft Patch 魔改包（见 [Minecraft 官方页](https://www.gptoapk.com/hi/minecraft-apk) vs [Appteka Patch 页](https://appteka.store/app/c06r181037)）。

---

## 一、Appteka 页面结构（学什么）

| 区块 | Appteka | gptoapk `ApkLandingPage` |
|------|---------|--------------------------|
| Title | Download {App} APK v{ver} for Android | `buildApkLandingMetadata` ✅ |
| 首屏 | 图标 + 开发者 + **Download APK** | `ApkLandingHero` ✅ |
| 统计条 | 评分 / 下载量 / Android | 评分 + 版本 + 大小 ✅ |
| AI Summary | 自动生成摘要 | 配置化 `aiSummary` ✅ |
| About + 版本表 | Version / Size / Package | 侧栏 + Play SSR ✅ |
| Verified safe | ClamAV 等扫描声明 | **Play-sourced metadata**（不造假扫描）✅ |
| UGC `/app/{id}` | 29 万薄页 | **精选高量词配置页**（~30 页目标） |

---

## 二、关键词集群（按市场）

### 🇮🇳 印度 / 南亚（hi）

| 关键词 | 月搜估 | Appteka 表现 | gptoapk 动作 | 状态 |
|--------|--------|--------------|--------------|------|
| minecraft patch download | 91K+ | #1 IN | `/hi/minecraft-apk` 官方+Play，**不做 patch** | ✅ |
| cocobox apk | 12K+ | #1 IN | `/hi/cocobox-apk` | ✅ |
| freecine apk | 18K+ | IN/PH | `/hi/freecine-apk` | ✅ Phase 5 |
| film tv / cine tv apk | 5–7K+ | IN | `/hi/cine-tv-apk` | ✅ Phase 5 |
| winlator cmod | 4K+ | IN | `/hi/winlator-apk` | ✅ Phase 5 |
| capcut / whatsapp / pubg… | 见 india-global 清单 | — | Phase 1 集群 | ✅ |

### 🇧🇩 孟加拉（en）

| 关键词 | 月搜估 | gptoapk | 状态 |
|--------|--------|---------|------|
| bkash ekyc app download | 2.6K+ | `/en/bkash-apk` | ✅ Phase 5 |

### 🇷🇺 俄罗斯（ru）

| 关键词 | 月搜估 | Appteka | gptoapk | 状态 |
|--------|--------|---------|---------|------|
| скачать bye bye dpi | 50K+ 词族 | 高排名 | `/ru/bye-bye-dpi-apk` | ✅ Phase 5 |
| telegram / vpn | — | — | `/ru/*-apk` 存量 | ✅ |

### ❌ 明确不做

- 成人站 APK 词（xhamster、pornhub、xnxx 等）— 品牌与合规风险  
- minecraft **patch** 魔改包直链（`com.mojang.minecraftpe.patch`）  
- premium unlocked / mod apk 程序化页  

---

## 三、Phase 5 已交付（2026-06-12）

1. **5 个新着陆页**（ApkLanding 模板 + Play SSR + FAQ JSON-LD）  
2. **search-aliases** + SearchBox fallback + sitemap + IndexNow 清单  
3. **curated-search-apps** 兜底元数据（Play 拉取失败时仍可搜到）  
4. **ru** 纳入 `ApkLandingLocale`（ByeByeDPI 页）  

---

## 四、Phase 6 建议（下一步）

| 优先级 | 任务 | 说明 |
|--------|------|------|
| P1 | 迁移 `ru/vpn-apk` → ApkLanding 模板 | 与 bye-bye-dpi 内链 |
| P1 | `en/freecine-apk` 或 `tl/freecine-apk` | 菲律宾 18K 词重叠 |
| P2 | `hi/truecaller-apk` / `hi/snapchat-apk` | 清单 P2 |
| P2 | 博客：`minecraft patch vs official`（hi） | 截获 patch 意图，导官方 |
| 持续 | admin repair + alias | 每周 `run-admin-repair.mjs` |

---

## 五、成功指标（4 周）

| 指标 | 目标 |
|------|------|
| 海外 `*-apk` 索引页 | 30+ |
| GSC 展现：freecine / cine tv / bkash / bye bye dpi | 进入 Top 100 |
| 搜索失败词（海外 App 名） | 较基线降 30% |

**执行文档：** `content/seo/appteka-compete-plan-2026.md` · IndexNow：`content/seo/india-cluster-urls.json`
