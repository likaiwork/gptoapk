import { runAdminRepair } from "../src/lib/run-admin-repair.ts";

const summary = await runAdminRepair({
  feedbackLimit: Number(process.env.REPAIR_FEEDBACK_LIMIT ?? 30),
  searchFailureDiscoveryLimit: Number(process.env.REPAIR_SEARCH_DISCOVERY_LIMIT ?? 40),
  searchLiveProbeLimit: Number(process.env.REPAIR_SEARCH_LIVE_PROBE_LIMIT ?? 80),
  mirrorMaxApps: Number(process.env.REPAIR_MIRROR_MAX_APPS ?? 40),
  maxApps: Number(process.env.REPAIR_MAX_APPS ?? 80),
});

console.log(JSON.stringify(summary, null, 2));
