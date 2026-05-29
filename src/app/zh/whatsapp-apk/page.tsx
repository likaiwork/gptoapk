import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.whatsapp;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "WhatsApp下载：Messenger官方APK、网页版与官网入口（2026）",
  description:
    "whatsapp下载、whatsapp messenger、whatsapp网页版 web.whatsapp.com、whatsapp官方网下载、whatsapp是什么。核对包名 com.whatsapp，在 gptoapk 安全安装。",
  keywords: [
    "whatsapp",
    "whatsapp messenger",
    "whatsapp下载",
    "whatsapp网页版",
    "whatsapp是什么",
    "whatsapp 微信",
    "com.whatsapp",
  ],
};

export default function WhatsAppApkPage() {
  return <PopularAppGuidePage app={app} />;
}
