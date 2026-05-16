import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  registerVisitor,
} from "@/lib/db";

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    await initDatabase();

    // Get visitor_id from cookie
    const cookies = request.headers.get("cookie") || "";
    const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
    let visitorId = match ? decodeURIComponent(match[1]) : null;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const visitor = await registerVisitor(visitorId);

    const response = NextResponse.json({
      visitor_id: visitor.visitor_id,
      first_visit: visitor.first_visit,
      visit_count: visitor.visit_count,
    });

    // Set cookie if new
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
