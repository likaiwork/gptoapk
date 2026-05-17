import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  registerVisitor,
} from "@/lib/db";

function readHeader(request: NextRequest, names: string[]): string {
  for (const name of names) {
    const value = request.headers.get(name);
    if (value) return value;
  }
  return "";
}

function decodeHeaderValue(value: string): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  } catch {
    return value;
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    await initDatabase();

    const cookies = request.headers.get("cookie") || "";
    const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
    let visitorId = match ? decodeURIComponent(match[1]) : null;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    // 收集设备/IP信息
    const userAgent = request.headers.get("user-agent") || "";
    const ipCountry = readHeader(request, [
      "x-vercel-ip-country",
      "cf-ipcountry",
      "x-country-code",
      "x-geo-country",
    ]).toUpperCase();
    const ipCity = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-city",
      "cf-ipcity",
      "x-city",
      "x-geo-city",
    ]));
    const ipRegion = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-country-region",
      "cf-region",
      "x-region",
      "x-geo-region",
    ]));

    const visitor = await registerVisitor(visitorId, {
      ip_country: ipCountry,
      ip_city: ipCity,
      ip_region: ipRegion,
      user_agent: userAgent,
    });

    const response = NextResponse.json({
      visitor_id: visitor.visitor_id,
      first_visit: visitor.first_visit,
      visit_count: visitor.visit_count,
    });

    if (!match) {
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      response.headers.set(
        "Set-Cookie",
        `visitor_id=${visitorId}; path=/; expires=${expires}; SameSite=Lax`
      );
    }

    return response;
  } catch (error) {
    console.error("[API visitor] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
