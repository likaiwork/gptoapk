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
  getVisitorList,
} from "@/lib/db";

export interface AdminResponse {
  visitors: number;
  total_searches: number;
  total_downloads: number;
  top_searches: SearchStat[];
  top_downloads: DownloadStat[];
  recent_activity: ActivityItem[];
  visitor_list: VisitorInfo[];
}

interface SearchStat {
  app_id: string;
  app_title: string;
  count: number;
}

interface DownloadStat {
  app_id: string;
  app_title: string;
  count: number;
}

interface ActivityItem {
  type: "search" | "download";
  visitor_id: string;
  app_id: string;
  app_title: string;
  query?: string;
  timestamp: string;
}

interface VisitorInfo {
  visitor_id: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  search_count: number;
  download_count: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminResponse | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 时间筛选参数
    const startDate = searchParams.get("start") || "";
    const endDate = searchParams.get("end") || "";

    await initDatabase();

    const [visitors, totalSearches, totalDownloads, topSearches, topDownloads, recentActivity, visitorList] =
      await Promise.all([
        getVisitorStats(),
        getTotalSearches(startDate, endDate),
        getTotalDownloads(startDate, endDate),
        getSearchStats(20, startDate, endDate),
        getDownloadStats(20, startDate, endDate),
        getRecentActivity(50, startDate, endDate),
        getVisitorList(startDate, endDate),
      ]);

    return NextResponse.json({
      visitors: visitors.total,
      total_searches: totalSearches,
      total_downloads: totalDownloads,
      top_searches: topSearches,
      top_downloads: topDownloads,
      recent_activity: recentActivity,
      visitor_list: visitorList,
    });
  } catch (error) {
    console.error("[API admin] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
