import { NextRequest, NextResponse } from "next/server";
import { initDatabase, registerVisitor } from "@/lib/db";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Ensure database is initialized
  initDatabase();

  // Try to get existing visitor_id from cookie
  const existingId = request.cookies.get("visitor_id")?.value;

  let visitorId: string;
  let result: { visitor_id: string; first_visit: string; visit_count: number };

  if (existingId) {
    visitorId = existingId;
    result = registerVisitor(visitorId);
  } else {
    // Generate new visitor ID
    visitorId = crypto.randomUUID();
    result = registerVisitor(visitorId);
  }

  const response = NextResponse.json({
    visitor_id: result.visitor_id,
    first_visit: result.first_visit,
    visit_count: result.visit_count,
  });

  // Set cookie to persist for 365 days
  response.cookies.set("visitor_id", visitorId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
