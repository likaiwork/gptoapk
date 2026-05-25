import { NextResponse } from "next/server";

const SW_CONTENT = `self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11053828
}
self.lary = ""
importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')
`;

export function GET() {
  return new NextResponse(SW_CONTENT, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
