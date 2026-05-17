import { AiAppGuidePage, aiAppGuides, createAiAppMetadata } from "../ai-app-guides";

const app = aiAppGuides.yuanbao;

export const metadata = createAiAppMetadata(app);

export default function YuanbaoApkPage() {
  return <AiAppGuidePage app={app} />;
}
