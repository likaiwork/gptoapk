import { getSitemapSectionEntries } from "@/lib/sitemap-sections";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return sitemapResponse(getSitemapSectionEntries("apps"));
}
