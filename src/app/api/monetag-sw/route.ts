import { NextResponse } from "next/server";
import { MONETAG_SW_NOOP_SOURCE } from "@/lib/monetag-sw-noop";

export function GET() {
  return new NextResponse(MONETAG_SW_NOOP_SOURCE, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
