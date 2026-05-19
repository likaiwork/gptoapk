import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.whatsapp;

export const metadata = createPopularAppMetadata(app);

export default function WhatsAppApkPage() {
  return <PopularAppGuidePage app={app} />;
}
