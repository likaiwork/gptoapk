import { chinaSeoUrls, renderSitemapXml } from "@/lib/china-seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderSitemapXml(chinaSeoUrls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
