# 内容队列

## 快速命令

```bash
# 查看今天要写什么
node scripts/content-queue.mjs today

# 生成今日提醒 Markdown（也用于 GitHub Issue）
node scripts/content-queue.mjs reminder

# 生成国内半自动分发包（需先有 content/drafts 里今日 MD）
node scripts/generate-syndication-pack.mjs
```

## 状态字段（`status.json`）

- `pending` — 未开始
- `drafted` — 已有 `content/drafts/{date}-{locale}-{slug}.md`
- `published` — 已入站并部署
- `syndicated` — 外链与国内草稿已处理

## 你每天

1. 看 GitHub Issue **📅 今日内容**（约 09:00 北京时间）
2. 在 Cursor 说 **「写今天的 zh」**（或 en）
3. 审阅后 **push**；自动 IndexNow
4. 打开 `content/syndication/zh/YYYY-MM-DD.md` → 复制到知乎/CSDN（约 3 分钟）
