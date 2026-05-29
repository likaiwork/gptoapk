import { NextRequest, NextResponse } from "next/server";
import { getAdminApiKey, initDatabase, reconcileResolvableSearchFailures } from "@/lib/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const limitRaw = typeof body.limit === "number" ? body.limit : 500;
    const limit = Math.min(Math.max(limitRaw, 1), 2000);

    await initDatabase();
    const result = await reconcileResolvableSearchFailures(limit);

    return NextResponse.json(
      { success: true, ...result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/search-failures/reconcile] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
