import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.twitter;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "Twitter下载：推特官网入口、安卓APK与注册中文版（2026）",
  description:
    "twitter下载、twitter官网入口、twitter.com、twitter安卓下载、twitter注册、twitter中文版。核对包名 com.twitter.android，在 gptoapk 安全安装；访问网络请自行合规。",
  keywords: [
    "twitter",
    "twitter下载",
    "twitter官网",
    "twitter注册",
    "推特",
    "twitter安卓下载",
    "国内怎么上twitter",
    "com.twitter.android",
  ],
};

export default function TwitterApkPage() {
  return <PopularAppGuidePage app={app} />;
}
