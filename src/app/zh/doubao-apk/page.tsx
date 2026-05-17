import { AiAppGuidePage, aiAppGuides, createAiAppMetadata } from "../ai-app-guides";

const app = aiAppGuides.doubao;

export const metadata = createAiAppMetadata(app);

export default function DoubaoApkPage() {
  return <AiAppGuidePage app={app} />;
}
