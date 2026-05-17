import { AiAppGuidePage, aiAppGuides, createAiAppMetadata } from "../ai-app-guides";

const app = aiAppGuides.qianwen;

export const metadata = createAiAppMetadata(app);

export default function QianwenApkPage() {
  return <AiAppGuidePage app={app} />;
}
