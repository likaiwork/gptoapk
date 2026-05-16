import { NextRequest, NextResponse } from "next/server";
import { initDatabase, logDownload } from "@/lib/db";

interface TrackDownloadBody {
  appId: string;
  appTitle: string;
  source: string;
  downloadUrl: string;
  version: string;
  fileSize: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Ensure database is initialized
  initDatabase();

  // Get visitor_id from cookie
  const visitorId = request.cookies.get("visitor_id")?.value;
  if (!visitorId) {
    return NextResponse.json({ error: "No visitor session" }, { status: 400 });
  }

  let body: TrackDownloadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  logDownload({
    visitorId,
    appId: body.appId || "",
    appTitle: body.appTitle || "",
    source: body.source || "",
    downloadUrl: body.downloadUrl || "",
    version: body.version || "",
    fileSize: body.fileSize || "",
  });

  return NextResponse.json({ success: true, downloadUrl: body.downloadUrl });
}
