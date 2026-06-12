import { NextRequest, NextResponse } from "next/server";
import { autoResolveDismissibleSearchFailures, getAdminApiKey, initDatabase } from "@/lib/db";

export const maxDuration = 60;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDatabase();
    const dismissed = await autoResolveDismissibleSearchFailures();
    return NextResponse.json(
      { success: true, dismissed, ranAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/search-failures/dismiss-junk] Error:", error);
    return NextResponse.json({ error: "Dismiss failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return POST(request);
}
