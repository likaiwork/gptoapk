import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APK 下载器 - 从 Google Play 链接下载 APK | gptoapk.com",
  description: "从 Google Play 商店快速安全地下载 APK 文件。免费在线 APK 下载工具，只需粘贴链接即可。",
  alternates: {
    canonical: "https://gptoapk.com/zh",
    languages: {
      en: "https://gptoapk.com/",
      zh: "https://gptoapk.com/zh",
      "x-default": "https://gptoapk.com/",
    },
  },
};

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
