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
    const allVisitors = await getVisitorList();
    const visitorInfo = allVisitors.find((v) => v.visitor_id === vid);

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
