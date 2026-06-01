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
    const maxChecksRaw = typeof body.maxChecks === "number"
      ? body.maxChecks
      : typeof body.limit === "number"
        ? body.limit
        : 5000;
    const batchSizeRaw = typeof body.batchSize === "number" ? body.batchSize : 500;
    const maxChecks = Math.min(Math.max(maxChecksRaw, 1), 20000);
    const batchSize = Math.min(Math.max(batchSizeRaw, 50), 1000);

    await initDatabase();
    const result = await reconcileResolvableSearchFailures({ batchSize, maxChecks });

    return NextResponse.json(
      { success: true, ...result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/search-failures/reconcile] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
