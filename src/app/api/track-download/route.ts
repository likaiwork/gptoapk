import { NextRequest, NextResponse } from "next/server";
import { initDatabase, logDownload } from "@/lib/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { appId, appTitle, source, downloadUrl, version, fileSize, success } = body;

    if (!appId) {
      return NextResponse.json({ error: "Missing appId" }, { status: 400 });
    }

    const cookies = request.headers.get("cookie") || "";
    const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
    const visitorId = match ? decodeURIComponent(match[1]) : "unknown";

    await initDatabase();
    await logDownload({
      visitorId,
      appId: String(appId),
      appTitle: String(appTitle || ""),
      source: String(source || ""),
      downloadUrl: String(downloadUrl || ""),
      version: String(version || ""),
      fileSize: fileSize ? String(fileSize) : "",
      success: success !== false, // 默认 true
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API track-download] Error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
