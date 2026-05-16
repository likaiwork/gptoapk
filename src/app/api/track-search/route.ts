import { NextRequest, NextResponse } from "next/server";
import { initDatabase, logSearch } from "@/lib/db";

interface TrackSearchBody {
  query: string;
  queryType: string;
  appId: string;
  appTitle: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Ensure database is initialized
  initDatabase();

  // Get visitor_id from cookie
  const visitorId = request.cookies.get("visitor_id")?.value;
  if (!visitorId) {
    return NextResponse.json({ error: "No visitor session" }, { status: 400 });
  }

  let body: TrackSearchBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  logSearch({
    visitorId,
    query: body.query || "",
    queryType: body.queryType || "",
    appId: body.appId || "",
    appTitle: body.appTitle || "",
  });

  return NextResponse.json({ success: true });
}
