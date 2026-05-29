import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.facebook;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "Facebook安卓下载最新版：官方APK、注册登录与官网入口（2026）",
  description:
    "facebook下载、facebook安卓下载、facebook官方下载、facebook注册登录、facebook.com 官网入口。核对包名 com.facebook.katana 与 Messenger com.facebook.orca，在 gptoapk 安全安装。",
  keywords: [
    "facebook",
    "facebook下载",
    "facebook安卓下载",
    "facebook安卓下载最新版",
    "facebook官方下载",
    "facebook是什么",
    "facebook注册",
    "facebook登录",
    "facebook messenger",
    "com.facebook.katana",
  ],
};

export default function FacebookApkPage() {
  return <PopularAppGuidePage app={app} />;
}
