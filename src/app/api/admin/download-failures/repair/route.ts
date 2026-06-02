import { NextRequest, NextResponse } from "next/server";
import { getAdminApiKey, initDatabase } from "@/lib/db";
import { runAdminDownloadFailureRepair } from "@/lib/admin-download-repair";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const failureThreshold = typeof body.failureThreshold === "number" ? body.failureThreshold : 0;
    const maxApps = typeof body.maxApps === "number" ? body.maxApps : 150;

    await initDatabase();
    const report = await runAdminDownloadFailureRepair({ failureThreshold, maxApps });

    return NextResponse.json(
      { success: true, ...report },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/download-failures/repair] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
