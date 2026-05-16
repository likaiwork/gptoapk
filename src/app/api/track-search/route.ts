import { NextRequest, NextResponse } from "next/server";
import { initDatabase, logSearch } from "@/lib/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { query, queryType, appId, appTitle } = body;

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const cookies = request.headers.get("cookie") || "";
    const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
    const visitorId = match ? decodeURIComponent(match[1]) : "unknown";

    await initDatabase();
    await logSearch({
      visitorId,
      query: String(query).slice(0, 500),
      queryType: String(queryType || ""),
      appId: String(appId || ""),
      appTitle: String(appTitle || ""),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API track-search] Error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
