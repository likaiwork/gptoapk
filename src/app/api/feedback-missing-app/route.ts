import { NextRequest, NextResponse } from "next/server";
import { initDatabase, logMissingAppFeedback } from "@/lib/db";

function getVisitorIdFromRequest(request: NextRequest): string {
  const cookies = request.headers.get("cookie") || "";
  const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "unknown";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json({ success: false, error: "Missing query" }, { status: 400 });
    }

    if (query.length > 500) {
      return NextResponse.json({ success: false, error: "Query too long" }, { status: 400 });
    }

    await initDatabase();
    const id = await logMissingAppFeedback({
      query,
      queryType: typeof body.queryType === "string" ? body.queryType : "keyword",
      errorMessage: typeof body.error === "string" ? body.error : "",
      locale: typeof body.locale === "string" ? body.locale : "",
      country: typeof body.country === "string" ? body.country : "",
      pagePath: typeof body.pagePath === "string" ? body.pagePath : "",
      visitorId: getVisitorIdFromRequest(request),
    });

    if (!id) {
      return NextResponse.json({ success: false, error: "Failed to save feedback" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[API feedback-missing-app] Error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
