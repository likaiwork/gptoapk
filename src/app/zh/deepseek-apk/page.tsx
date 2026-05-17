import { AiAppGuidePage, aiAppGuides, createAiAppMetadata } from "../ai-app-guides";

const app = aiAppGuides.deepseek;

export const metadata = createAiAppMetadata(app);

export default function DeepSeekApkPage() {
  return <AiAppGuidePage app={app} />;
}
