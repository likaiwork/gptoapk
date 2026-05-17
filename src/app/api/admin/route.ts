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
  file_size?: string;
  version?: string;
  success?: boolean;
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

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type DateRangeResult =
  | { startDate: string; endDate: string }
  | { error: string };

function getDateRange(searchParams: URLSearchParams): DateRangeResult {
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  if ((start && !DATE_ONLY_PATTERN.test(start)) || (end && !DATE_ONLY_PATTERN.test(end))) {
    return { error: "Invalid date range" };
  }

  if (start && end && start > end) {
    return { startDate: end, endDate: start };
  }

  return { startDate: start, endDate: end };
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
    const range = getDateRange(searchParams);
    if ("error" in range) {
      return NextResponse.json({ error: range.error }, { status: 400 });
    }
    const { startDate, endDate } = range;

    await initDatabase();

    const [visitors, totalSearches, totalDownloads, topSearches, topDownloads, recentActivity, visitorList] =
      await Promise.all([
        getVisitorStats(startDate, endDate),
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
