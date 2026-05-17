import { AiAppGuidePage, aiAppGuides, createAiAppMetadata } from "../ai-app-guides";

const app = aiAppGuides.kimi;

export const metadata = createAiAppMetadata(app);

export default function KimiApkPage() {
  return <AiAppGuidePage app={app} />;
}
