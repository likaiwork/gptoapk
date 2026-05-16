import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  getVisitorStats,
  getTotalSearches,
  getTotalDownloads,
  getSearchStats,
  getDownloadStats,
  getRecentActivity,
  getAdminApiKey,
  SearchStat,
  DownloadStat,
  ActivityItem,
} from "@/lib/db";

export interface AdminResponse {
  visitors: number;
  total_searches: number;
  total_downloads: number;
  top_searches: SearchStat[];
  top_downloads: DownloadStat[];
  recent_activity: ActivityItem[];
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminResponse | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key || key !== getAdminApiKey()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure database is initialized
  initDatabase();

  const visitors = getVisitorStats();
  const totalSearches = getTotalSearches();
  const totalDownloads = getTotalDownloads();
  const topSearches = getSearchStats(20);
  const topDownloads = getDownloadStats(20);
  const recentActivity = getRecentActivity(50);

  return NextResponse.json({
    visitors: visitors.total,
    total_searches: totalSearches,
    total_downloads: totalDownloads,
    top_searches: topSearches,
    top_downloads: topDownloads,
    recent_activity: recentActivity,
  });
}
