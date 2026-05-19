import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.tiktok;

export const metadata = createPopularAppMetadata(app);

export default function TiktokApkPage() {
  return <PopularAppGuidePage app={app} />;
}
