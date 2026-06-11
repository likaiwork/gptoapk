import ApkLandingPage from "@/components/ApkLandingPage";
import { idChatgptApkConfig } from "@/lib/apk-landing/configs/id-chatgpt";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idChatgptApkConfig);

export default function ChatgptApkPage() {
  return <ApkLandingPage config={idChatgptApkConfig} />;
}
