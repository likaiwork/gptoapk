import { NextResponse } from "next/server";
import { LEGACY_AD_SW_NOOP_SOURCE } from "@/lib/legacy-ad-sw-noop";

// Path kept stable: older visitors have a third-party push worker registered
// at /sw.js. This route only serves a self-unregistering no-op worker; it
// loads no ads and makes no third-party requests.

export function GET() {
  return new NextResponse(LEGACY_AD_SW_NOOP_SOURCE, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
