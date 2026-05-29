import type { Metadata } from "next";
import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.zoom;

export const metadata: Metadata = {
  ...createPopularAppMetadata(app),
  title: "Zoom下载：安卓版视频会议APK、官网与易混词说明（2026）",
  description:
    "zoom软件下载、zoom安卓版下载、zoom视频会议。核对包名 us.zoom.videomeetings；zoom与人性、zoomlion、zoomin 等见 SEO 辨析指南。",
  keywords: [
    "zoom",
    "zoom下载",
    "zoom安卓版下载",
    "zoom视频会议",
    "zoom是什么意思",
    "zoom与人性",
    "us.zoom.videomeetings",
  ],
};

export default function ZoomApkPage() {
  return <PopularAppGuidePage app={app} />;
}
