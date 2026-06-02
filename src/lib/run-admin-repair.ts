import { initDatabase, reconcileResolvableSearchFailures } from "@/lib/db";
import {
  runAdminDownloadFailureRepair,
  type DownloadRepairReport,
} from "@/lib/admin-download-repair";

export type AdminRepairSummary = {
  download: DownloadRepairReport;
  search: {
    checked: number;
    resolved: number;
    dismissed: number;
    liveResolved: number;
    totalResolved: number;
  };
};

export async function runAdminRepair(options?: {
  failureThreshold?: number;
  maxApps?: number;
  searchMaxChecks?: number;
  searchBatchSize?: number;
  searchLiveProbeLimit?: number;
}): Promise<AdminRepairSummary> {
  await initDatabase();

  const download = await runAdminDownloadFailureRepair({
    failureThreshold: options?.failureThreshold ?? 0,
    maxApps: options?.maxApps ?? 150,
  });

  const searchResult = await reconcileResolvableSearchFailures({
    batchSize: options?.searchBatchSize ?? 500,
    maxChecks: options?.searchMaxChecks ?? 5000,
    liveProbeLimit: options?.searchLiveProbeLimit ?? 40,
  });

  return {
    download,
    search: {
      ...searchResult,
      totalResolved: searchResult.resolved + searchResult.dismissed,
    },
  };
}
