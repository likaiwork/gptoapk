import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.tiktok;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "TikTok国际版下载：安卓官方APK、官网入口与抖音区别（2026）",
  description:
    "tiktok下载、tiktok国际版下载、tiktok官网入口、tiktok安卓下载、海外抖音安装。核对包名 com.zhiliaoapp.musically 与字节跳动开发者，在 gptoapk 安全安装。",
  keywords: [
    "tiktok",
    "tiktok下载",
    "tiktok国际版下载",
    "tiktok官网",
    "tiktok官网入口",
    "tiktok安卓下载",
    "tiktok是什么",
    "tiktok和抖音什么关系",
    "海外抖音",
    "com.zhiliaoapp.musically",
  ],
};

export default function TiktokApkPage() {
  return <PopularAppGuidePage app={app} />;
}
