import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.longbridge;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "长桥证券下载：APP安卓APK、官网入口与国家说明（2026）",
  description:
    "长桥证券、长桥券商app、长桥app下载安卓、长桥证券是哪个国家的。核对包名 global.longbridge.app.android，在 gptoapk 安全安装。",
  keywords: [
    "长桥证券",
    "长桥券商app",
    "长桥app下载安卓",
    "长桥证券app安卓",
    "Longbridge",
    "富途老虎长桥",
    "global.longbridge.app.android",
  ],
};

export default function LongbridgeApkPage() {
  return <PopularAppGuidePage app={app} />;
}
