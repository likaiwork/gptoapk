import { runDownloadMirrorRepair } from "@/lib/admin-download-mirror-repair";
import {
  runAdminDownloadFailureRepair,
  type DownloadRepairReport,
} from "@/lib/admin-download-repair";
import { initDatabase } from "@/lib/db";
import { runSearchDiscoveryRepair, type SearchDiscoveryReport } from "@/lib/admin-search-discovery";

export type AdminRepairSummary = {
  download: DownloadRepairReport;
  mirror: Awaited<ReturnType<typeof runDownloadMirrorRepair>>;
  search: SearchDiscoveryReport & {
    reconcileChecked: number;
    reconcileDismissed: number;
    reconcileLiveResolved: number;
    totalResolved: number;
  };
};

export async function runAdminRepair(options?: {
  failureThreshold?: number;
  maxApps?: number;
  searchMaxChecks?: number;
  searchBatchSize?: number;
  searchLiveProbeLimit?: number;
  feedbackLimit?: number;
  searchFailureDiscoveryLimit?: number;
  mirrorMaxApps?: number;
}): Promise<AdminRepairSummary> {
  await initDatabase();

  const searchDiscovery = await runSearchDiscoveryRepair({
    feedbackLimit: options?.feedbackLimit ?? 40,
    searchFailureLimit: options?.searchFailureDiscoveryLimit ?? 60,
    reconcileMaxChecks: options?.searchMaxChecks ?? 5000,
    reconcileLiveProbeLimit: options?.searchLiveProbeLimit ?? 300,
  });

  const mirror = await runDownloadMirrorRepair({
    maxApps: options?.mirrorMaxApps ?? 80,
  });

  const download = await runAdminDownloadFailureRepair({
    failureThreshold: options?.failureThreshold ?? 0,
    maxApps: options?.maxApps ?? 150,
  });

  return {
    download,
    mirror,
    search: {
      feedbackProcessed: searchDiscovery.feedbackProcessed,
      feedbackResolved: searchDiscovery.feedbackResolved,
      aliasesCreated: searchDiscovery.aliasesCreated,
      searchFailuresResolved: searchDiscovery.searchFailuresResolved,
      discoveryAttempts: searchDiscovery.discoveryAttempts,
      discoveryMisses: searchDiscovery.discoveryMisses,
      reconcileChecked: searchDiscovery.reconcile.checked,
      reconcileDismissed: searchDiscovery.reconcile.dismissed,
      reconcileLiveResolved: searchDiscovery.reconcile.liveResolved,
      totalResolved: searchDiscovery.searchFailuresResolved,
    },
  };
}
