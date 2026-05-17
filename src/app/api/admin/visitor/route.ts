import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  getAdminApiKey,
  getVisitorList,
  getVisitorLogs,
} from "@/lib/db";

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const vid = searchParams.get("vid");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!vid) {
      return NextResponse.json({ error: "Missing vid parameter" }, { status: 400 });
    }

    await initDatabase();

    // 获取该访客信息
    const { rows: allVisitors } = await getVisitorList(1, 0);
    const visitorInfo = allVisitors.length > 0 ? allVisitors[0] : null;

    // If not in first page, search by direct SQL or fallback
    if (!visitorInfo || visitorInfo.visitor_id !== vid) {
      // Fallback: fetch a larger batch to find the visitor
      const { rows: searchResult } = await getVisitorList(1000, 0);
      const found = searchResult.find((v: { visitor_id: string }) => v.visitor_id === vid) || null;
      if (found) {
        const logs = await getVisitorLogs(vid);
        return NextResponse.json({ visitor: found, logs });
      }
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    if (!visitorInfo) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    // 获取该访客的操作日志
    const logs = await getVisitorLogs(vid);

    return NextResponse.json({
      visitor: visitorInfo,
      logs,
    });
  } catch (error) {
    console.error("[API admin/visitor] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
