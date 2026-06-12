# 印度 / 全球高量 APK 关键词对标清单（2026 Q2）

> 供 gptoapk 程序化着陆页与 en/hi/id 内容规划使用。搜索量为 Ahrefs / 行业经验量级，用于优先级排序，非精确值。
> 对标站点：[Appteka](https://appteka.store/)（印度 55% 流量、Minecraft patch 词族为主）。

## 优先级说明

| 标记 | 含义 |
|------|------|
| P0 | 立即做 en/hi 着陆页 + search-aliases |
| P1 | 第二季：博客长文 + 内链 |
| P2 | 观察流量后再投入 |

## 20 个对标关键词

| # | 关键词 | 预估月搜 | 主市场 | 目标包名 | 建议 URL | 优先级 | 备注 |
|---|--------|----------|--------|----------|----------|--------|------|
| 1 | minecraft patch download | 40K+ | IN | com.mojang.minecraftpe | `/hi/minecraft-apk` `/en/minecraft-apk` ✅ | P0 | Appteka #1 流量词；只做**官方/预览版**说明，不做魔改 patch |
| 2 | minecraft apk download | 25K+ | IN, ID | com.mojang.minecraftpe | 同上 ✅ | P0 | 与 patch 共用 hub，H1 区分 intent |
| 3 | cocobox apk | 11K+ | IN | com.coco.drive | `/hi/cocobox-apk` ✅ | P0 | Appteka #3；Play 已下架，包名实为 com.coco.drive |
| 4 | whatsapp apk download | 80K+ | IN, BR, ID | com.whatsapp | `/hi/whatsapp-apk` ✅ | P1 | 已迁 ApkLanding 模板 |
| 5 | instagram apk download | 60K+ | IN, BR | com.instagram.android | `/hi/instagram-apk` ✅ | P1 | Phase 1A |
| 6 | telegram apk download | 45K+ | IN, RU | org.telegram.messenger | `/hi/telegram-apk` ✅ | P1 | 已迁模板 |
| 7 | tiktok apk download | 50K+ | IN, ID | com.zhiliaoapp.musically | `/hi/tiktok-apk` ✅ | P1 | hi/id 已迁模板 |
| 8 | capcut apk download | 35K+ | IN, ID | com.lemon.lvoverseas | `/hi/capcut-apk` `/id/capcut-apk` ✅ | P0 | 南亚剪辑刚需 |
| 9 | pubg mobile apk download | 30K+ | IN | com.tencent.ig | `/hi/pubg-mobile-apk` ✅ | P1 | Phase 1A |
| 10 | free fire apk download | 28K+ | IN, BR | com.dts.freefireth | `/hi/free-fire-apk` ✅ | P1 | Phase 1A |
| 11 | spotify apk download | 25K+ | IN, BR | com.spotify.music | `/hi/spotify-apk` ✅ | P1 | Phase 1A |
| 12 | youtube apk download | 22K+ | IN | com.google.android.youtube | `/hi/youtube-apk` ✅ | P1 | Phase 1A |
| 13 | vpn apk download | 20K+ | IN, RU | (多包名) | `/hi/vpn-apk` ✅ | P1 | 已迁模板 |
| 14 | gcash apk download | 15K+ | PH, IN diaspora | com.globe.gcash.android | `/en/gcash-apk` ✅ | P2 | 菲律宾钱包 |
| 15 | chatgpt apk download | 18K+ | IN, Global | com.openai.chatgpt | `/hi/chatgpt-apk` ✅ | P0 | 模板试点页 |
| 16 | minecraft beta download | 8K+ | IN | com.mojang.minecraftpreview | `/en/minecraft-beta-apk` ✅ | P1 | 官方 Preview 包 |
| 17 | kinemaster apk | 12K+ | IN, ID | com.nexstreaming.app.kinemasterfree | `/hi/kinemaster-apk` ✅ | P1 | Phase 1A |
| 18 | truecaller apk download | 10K+ | IN | com.truecaller | `/hi/truecaller-apk` ✅ | P2 | 印度本地超级 App |
| 19 | snapchat apk download | 12K+ | IN, US | com.snapchat.android | `/hi/snapchat-apk` ✅ | P2 | |
| 20 | google play store apk | 15K+ | IN | com.android.vending | `/hi/google-play-store-apk` ✅ | P1 | Phase 1A |

## 区域策略摘要

| 国家 | 份额参考 (Appteka) | gptoapk 建议 |
|------|-------------------|--------------|
| 印度 (IN) | ~55% | **hi/** 着陆页 + 游戏/社交 APK 为主 |
| 印尼 (ID) | ~12% | **id/** 11 页：CapCut/TikTok/IG/FF/PUBG/Spotify/KineMaster 等 ✅ |
| 菲律宾 (PH) | ~5% | GCash、社交；可用 en 页 |
| 孟加拉 (BD) | ~5% | 与 IN 词重叠，hi/en 即可 |
| 俄罗斯 (RU) | ~4% | 已有 ru/*-apk，Telegram / VPN |

## Title 模板（对齐 Appteka）

```
Download {AppName} APK v{Version} for Android | gptoapk
```

印度语 (hi) 页面 browser title 可保留印地语，但 **H1 建议含 `APK` + `Download` 英文词**（印度用户常混搜）。

## 内链规则

- 每个 `*-apk` 页 → 链到 `/{locale}/install-apk-guide`、`/{locale}/google-play-not-working`
- 游戏类 →  Feb 博客 `apk-install-errors` GEO 页
- 与 zh 现有 hub 不冲突：印度/en 独立集群

## 不建议做的词（合规）

- minecraft patch mod / shader 魔改包（版权与误导风险）
- 破解、premium unlocked、mod apk 批量页

## 下一步执行（工程）

1. ✅ 共享 `ApkLandingPage` 模板（Appteka 区块结构）
2. ✅ 试点：`/hi/chatgpt-apk` 迁移模板
3. ✅ P0 着陆页：`/hi/minecraft-apk`、`/en/minecraft-apk`、`/hi/cocobox-apk`、`/hi/capcut-apk`、`/id/capcut-apk`
4. ✅ `search-aliases.ts` + sitemap + SearchBox fallback
