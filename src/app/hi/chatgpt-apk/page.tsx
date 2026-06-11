import ApkLandingPage from "@/components/ApkLandingPage";
import { hiChatgptApkConfig } from "@/lib/apk-landing/configs/hi-chatgpt";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiChatgptApkConfig);

export default function ChatGPTApkPage() {
  return <ApkLandingPage config={hiChatgptApkConfig} />;
}
