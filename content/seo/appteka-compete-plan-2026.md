# gptoapk 对标 Appteka 执行计划（2026 Q2）

> 竞品：[Appteka](https://appteka.store/) — 印度 ~55% 流量，程序化 `/app/{id}` + UGC，Minecraft patch 词族极强。  
> 我方定位：**高意图工具页 + Play 来源 APK**，不做魔改/patch/破解批量页。  
> 状态更新：2026-06-12

---

## 一、已完成（基线）

| 项 | 状态 |
|----|------|
| 关键词清单 20 词 | ✅ `content/seo/india-global-apk-keywords-2026.md` |
| 共享模板 `ApkLandingPage` + Hero + 顶栏 Download CTA | ✅ |
| P0 着陆页 6 个 | ✅ hi/en minecraft, hi cocobox, hi/id capcut, hi chatgpt |
| search-aliases / sitemap / SearchBox fallback | ✅ |
| `?q=` 自动搜索 | ✅ |
| 付费应用（Minecraft）Play 引导 + 说明横幅 | ✅ |

---

## 二、学 Appteka 什么 / 不学什么

### ✅ 学（SEO + 转化）

| Appteka 元素 | gptoapk 对应动作 |
|--------------|------------------|
| Title：`Download {App} APK v{ver} for Android` | 已用 `buildApkLandingMetadata` |
| 首屏：图标 + 开发者 + **顶部大 Download 按钮** | ✅ `ApkLandingHero` 黑色 CTA |
| 版本表：Version / Size / Android | ✅ Hero 底部三列统计条 |
| AI Summary 区块 | ✅ 已有（静态配置文案） |
| About + FAQ | ✅ 已有 + JSON-LD |
| 印度 hi 集群 + 印尼 id 集群 | ✅ Phase 1 完成 |
| 内链到同类 App | 每页 3 条 relatedLinks |

### ❌ 不做（合规与产品边界）

| Appteka 做法 | 我方策略 |
|--------------|----------|
| Minecraft **Patch** 魔改包直链 | 只做官方 `com.mojang.minecraftpe` + **Google Play 购买** |
| 29 万 UGC 薄页 `/app/{id}` | 不做 mass thin pages；**精选高量词 + 配置化着陆页** |
| 假「Verified safe / ClamAV」 | 只用「Play-sourced metadata」，不伪造扫描报告 |
| Premium unlocked / mod apk | 全站禁止 |

---

## 三、分阶段计划

### Phase 1 — 页面扩量（P1）【✅ 已完成 2026-06-12】

**目标：** 覆盖清单里剩余高量词，统一迁到 `ApkLandingPage` 模板。

#### 1A. 新建 hi 着陆页（配置 + 3 行 page.tsx）

| 优先级 | URL | 包名 | 备注 |
|--------|-----|------|------|
| P1 | `/hi/instagram-apk` | com.instagram.android | 60K+ 月搜 |
| P1 | `/hi/pubg-mobile-apk` | com.tencent.ig | 游戏 |
| P1 | `/hi/free-fire-apk` | com.dts.freefireth | 游戏 |
| P1 | `/hi/spotify-apk` | com.spotify.music | 免费版需求 |
| P1 | `/hi/youtube-apk` | com.google.android.youtube | 可与 ru 页对齐 |
| P1 | `/hi/kinemaster-apk` | com.nexstreaming.app.kinemasterfree | 剪辑 |
| P1 | `/hi/google-play-store-apk` | com.android.vending | Play 侧载 |

#### 1B. 迁移旧页 → 新模板（保留 URL，换组件）

| URL | 当前 | 动作 |
|-----|------|------|
| `/hi/whatsapp-apk` | 旧手写页 | → `ApkLandingPage` |
| `/hi/telegram-apk` | 旧 | → 迁移 |
| `/hi/tiktok-apk` | 旧 | → 迁移 |
| `/hi/vpn-apk` | 旧 | → 迁移 |
| `/id/tiktok-apk` 等 | 旧 | → 迁移（id 集群） |

#### 1C. 配套

- [x] `search-aliases.ts` 补 P1 长尾词（pubg / free fire / kinemaster / instagram / spotify）
- [x] `sitemap.ts` 登记新 URL（priority 0.85）
- [x] `SearchBox` fallback 补 instagram / pubg / spotify / youtube / kinemaster / play store
- [x] 各页 `relatedLinks` 互链（印度集群网状内链）

**验收：** ✅ 7 个新 hi 页 + 4 个 hi 迁移 + 5 个 id 迁移；首屏 Download CTA；build 通过。

---

### Phase 2 — 模板增强（对标 Appteka 细节）【✅ 已完成 2026-06-12】

| 任务 | 说明 | 状态 |
|------|------|------|
| Play 图标 SSR | 服务端 `gplay.app()` 拉图标/评分，减少首屏占位 | ✅ `fetch-play-app.ts` |
| Screenshots 区 | 从 Play 拉 3–5 张截图（仅模板页） | ✅ `ApkLandingScreenshots` |
| Permissions 摘要 | 链到 Play Data safety（不造假扫描） | ✅ `ApkLandingPermissionsNote` |
| 付费/下架状态组件 | `ApkLandingPaidBanner` / `ApkLandingDelistedBanner` | ✅ |
| `en/how-to/install-{app}-apk` hreflang | 与 hi 页互链 | 暂缓（Phase 3） |

**验收：** ✅ CapCut / Instagram 页 SSR 真实图标 + 截图；CoCoBox 显示下架横幅。

---

### Phase 3 — 内容与 GEO（P1 博客）【✅ 已完成 2026-06-12】

| 类型 | URL | 状态 |
|------|-----|------|
| hi 博客 | `/hi/blog/minecraft-apk-india-2026` | ✅ |
| hi 博客 | `/hi/blog/capcut-apk-without-play-store` | ✅ |
| en 博客 | `/en/blog/install-apk-india-guide` | ✅ |
| 内链 | 每篇 ≥3 链到 `*-apk` + `google-play-not-working` | ✅ |
| syndication | `content/syndication/{en,hi}/2026-06-12.md` | ✅ |

**验收：** ✅ 2 hi + 1 en 发布；draft + syndication pack 已生成。

---

### Phase 4 — 索引与监控（持续）【已上线自动化 2026-06-12】

| 任务 | 频率 | 实现 |
|------|------|------|
| IndexNow 印度集群 | 每次 deploy | `deploy.yml` → `npm run indexnow:india` |
| IndexNow 博客 | 发布日 | `content-post-publish.yml` |
| GSC 关键词复盘 | 每周一 | `phase4-weekly-reminder.yml` Issue + `phase4:checklist` |
| Admin 失败词 → alias | 每周 | Runbook §4；已补 bgmi/truecaller/snapchat |
| Download vs Play CTR | 每月 GA4 | 事件 `download_click` / `play_store_click` + `landing_slug` |

**文档：** `content/seo/phase4-monitoring-2026.md` · URL 清单 `content/seo/india-cluster-urls.json`

---

## 四、页面 Backlog 总表（按优先级）

| 阶段 | 页面数 | 累计覆盖月搜（估） |
|------|--------|-------------------|
| 已完成 P0 | 6 | ~140K+ |
| Phase 1 新建 | 7 | +200K+ |
| Phase 1 迁移 | 8+ | 存量流量升级 |
| Phase 1 长尾 P2 | 4 | +50K |
| **合计目标** | **~25 着陆页** | **印度集群主要词** |

P2 观察后再做：`truecaller`、`snapchat`、`gcash`、`en/minecraft-beta-apk`。

---

## 五、工程清单（给 Agent 执行顺序）

```
Week 1
  Day 1–2  Phase 1A：instagram + pubg + free-fire 配置与页面
  Day 2–3  Phase 1A：spotify + youtube + kinemaster + play-store
  Day 3–4  Phase 1B：迁移 whatsapp/telegram/tiktok/vpn（hi）
  Day 4–5  Phase 1C：aliases + sitemap + fallback + 互链

Week 2
  Phase 2：SSR 图标 + screenshots 试点（capcut + instagram）
  Phase 3：首篇 hi 博客 + syndication

Ongoing
  Phase 4：IndexNow + GSC 复盘
```

---

## 六、风险与决策点（需你确认）

| # | 问题 | 建议 | 你的选择 |
|---|------|------|----------|
| 1 | Minecraft patch 词是否做独立 URL？ | **不做** patch 页；用 minecraft-apk + 博客解释 | ？ |
| 2 | 付费游戏（PUBG 等）是否尝试镜像下载？ | 先 **Play 引导**；有镜像再开 Download | ？ |
| 3 | 是否批量做 `en/*-apk`？ | Phase 1 只做 **hi + id**；en 用现有 how-to | ？ |
| 4 | Phase 1 是否立即 commit+push？ | 每批 3–5 页一推，便于 Vercel 验证 | ？ |

---

## 七、成功指标（8 周）

| 指标 | 基线 | 目标 |
|------|------|------|
| 印度 `*-apk` 索引页数 | ~6 | 20+ |
| `hi/minecraft-apk` 展现/周 | — | 有展现进入 Top 50 |
| 着陆页 Download 点击率 | — | > 5% |
| 搜索失败词（印度 App） | 当前 admin 数 | 下降 30% |

---

**下一步（持续运维）：** 每周跑 `npm run phase4:checklist`；GSC/GA4 填 runbook 表格；admin 新失败词补 alias。

---

## 八、Phase 5 — 海外关键词扩量【✅ 2026-06-12】

> 详表：`content/seo/appteka-phase5-overseas-keywords-2026.md`（Semrush 竞品词：印度娱乐/游戏、孟加拉 bKash、俄罗斯 ByeByeDPI）

| URL | 包名 | 市场 |
|-----|------|------|
| `/hi/freecine-apk` | com.wx.freecine | IN/PH |
| `/hi/cine-tv-apk` | com.cinefffflix.com | IN |
| `/hi/winlator-apk` | com.winlator | IN |
| `/en/bkash-apk` | com.bkash.customerapp | BD |
| `/ru/bye-bye-dpi-apk` | io.github.romanvht.byedpi | RU |

**不学 Appteka：** Minecraft Patch 页（`com.mojang.minecraftpe.patch`）、成人 APK 词族。  
**验收：** aliases + sitemap + IndexNow 清单已更新；`ApkLandingLocale` 含 `ru`。

---

## 九、Phase 6 — TL/RU 扩量 + patch 博客【✅ 2026-06-12】

| URL | 说明 |
|-----|------|
| `/tl/freecine-apk` | 菲律宾 freecine 词 |
| `/ru/vpn-apk` | 迁 ApkLanding，内链 ByeByeDPI |
| `/en/blog/minecraft-patch-download-official-2026` | 截获 patch 搜索，对比 Appteka |

`ApkLandingLocale` 现含 `tl`。

---

## 十、Phase 7 — Truecaller / Snapchat / AnimoHub【✅ 2026-06-12】

| URL | 包名 |
|-----|------|
| `/hi/truecaller-apk` | com.truecaller |
| `/hi/snapchat-apk` | com.snapchat.android |
| `/hi/animohub-apk` | com.animohub.pro |
