import { NextRequest, NextResponse } from "next/server";
import { runSearchDiscoveryRepair } from "@/lib/admin-search-discovery";
import { getAdminApiKey, initDatabase } from "@/lib/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const maxChecksRaw = typeof body.maxChecks === "number"
      ? body.maxChecks
      : typeof body.limit === "number"
        ? body.limit
        : 5000;
    const liveProbeLimitRaw = typeof body.liveProbeLimit === "number" ? body.liveProbeLimit : 40;
    const liveProbeTimeoutMsRaw = typeof body.liveProbeTimeoutMs === "number" ? body.liveProbeTimeoutMs : 12_000;
    const feedbackLimitRaw = typeof body.feedbackLimit === "number" ? body.feedbackLimit : 80;
    const searchFailureDiscoveryLimitRaw = typeof body.searchFailureDiscoveryLimit === "number"
      ? body.searchFailureDiscoveryLimit
      : 120;
    const maxChecks = Math.min(Math.max(maxChecksRaw, 1), 20000);
    const liveProbeLimit = Math.min(Math.max(liveProbeLimitRaw, 0), 2000);
    const liveProbeTimeoutMs = Math.min(Math.max(liveProbeTimeoutMsRaw, 3000), 25_000);
    const feedbackLimit = Math.min(Math.max(feedbackLimitRaw, 1), 100);
    const searchFailureDiscoveryLimit = Math.min(Math.max(searchFailureDiscoveryLimitRaw, 1), 150);
    const skipStaticSync = body.skipStaticSync === true;
    const skipDiscovery = body.skipDiscovery === true;
    const skipFeedback = body.skipFeedback === true;

    await initDatabase();
    const result = await runSearchDiscoveryRepair({
      feedbackLimit,
      searchFailureLimit: searchFailureDiscoveryLimit,
      reconcileMaxChecks: maxChecks,
      reconcileLiveProbeLimit: liveProbeLimit,
      reconcileLiveProbeTimeoutMs: liveProbeTimeoutMs,
      skipStaticSync,
      skipDiscovery,
      skipFeedback,
    });

    return NextResponse.json(
      {
        success: true,
        feedbackProcessed: result.feedbackProcessed,
        feedbackResolved: result.feedbackResolved,
        aliasesCreated: result.aliasesCreated,
        searchFailuresResolved: result.searchFailuresResolved,
        discoveryAttempts: result.discoveryAttempts,
        discoveryMisses: result.discoveryMisses,
        checked: result.reconcile.checked,
        resolved: result.reconcile.resolved,
        dismissed: result.reconcile.dismissed,
        liveResolved: result.reconcile.liveResolved,
        totalResolved: result.searchFailuresResolved,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/search-failures/reconcile] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
