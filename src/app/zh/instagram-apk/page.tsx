import { PopularAppGuidePage, popularAppGuides, createPopularAppMetadata } from "../popular-app-guides";

const app = popularAppGuides.instagram;

export const metadata = createPopularAppMetadata(app);

export default function InstagramApkPage() {
  return <PopularAppGuidePage app={app} />;
}
