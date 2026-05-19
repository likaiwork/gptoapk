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
  getAllVisitorStats,
  getTodayNewVisitors,
  getTodayDownloads,
  getDownloadFailureApps,
} from "@/lib/db";

export interface AdminResponse {
  visitors: number;
  total_users: number;
  today_new_users: number;
  total_searches: number;
  total_downloads: number;
  all_downloads: number;
  today_downloads: number;
  top_searches: SearchStat[];
  top_searches_total: number;
  top_downloads: DownloadStat[];
  top_downloads_total: number;
  recent_activity: ActivityItem[];
  recent_activity_total: number;
  visitor_list: VisitorInfo[];
  visitor_list_total: number;
  download_failures: DownloadFailureApp[];
  download_failures_total: number;
  unresolved_download_failures: number;
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

interface DownloadFailureApp {
  app_id: string;
  app_title: string;
  failure_count: number;
  first_failed_at: string;
  last_failed_at: string;
  last_error: string;
  last_source: string;
  resolved: boolean;
  resolved_at: string | null;
  updated_at: string;
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

    // 分页参数
    const pageSize = Math.min(Math.max(parseInt(searchParams.get("pageSize") || "20") || 20, 5), 100);
    const searchPage = Math.max(parseInt(searchParams.get("searchPage") || "0") || 0, 0);
    const downloadPage = Math.max(parseInt(searchParams.get("downloadPage") || "0") || 0, 0);
    const activityPage = Math.max(parseInt(searchParams.get("activityPage") || "0") || 0, 0);
    const visitorPage = Math.max(parseInt(searchParams.get("visitorPage") || "0") || 0, 0);
    const failurePage = Math.max(parseInt(searchParams.get("failurePage") || "0") || 0, 0);

    await initDatabase();

    const [
      visitors,
      allVisitors,
      todayNewUsers,
      totalSearches,
      totalDownloads,
      allDownloads,
      todayDownloads,
      topSearches,
      topDownloads,
      recentActivity,
      visitorList,
      downloadFailures,
    ] =
      await Promise.all([
        getVisitorStats(startDate, endDate),
        getAllVisitorStats(),
        getTodayNewVisitors(),
        getTotalSearches(startDate, endDate),
        getTotalDownloads(startDate, endDate),
        getTotalDownloads(),
        getTodayDownloads(),
        getSearchStats(pageSize, searchPage * pageSize, startDate, endDate),
        getDownloadStats(pageSize, downloadPage * pageSize, startDate, endDate),
        getRecentActivity(pageSize, activityPage * pageSize, startDate, endDate),
        getVisitorList(pageSize, visitorPage * pageSize, startDate, endDate),
        getDownloadFailureApps(pageSize, failurePage * pageSize),
      ]);

    return NextResponse.json({
      visitors: visitors.total,
      total_users: allVisitors.total,
      today_new_users: todayNewUsers,
      total_searches: totalSearches,
      total_downloads: totalDownloads,
      all_downloads: allDownloads,
      today_downloads: todayDownloads,
      top_searches: topSearches.rows,
      top_searches_total: topSearches.total,
      top_downloads: topDownloads.rows,
      top_downloads_total: topDownloads.total,
      recent_activity: recentActivity.rows,
      recent_activity_total: recentActivity.total,
      visitor_list: visitorList.rows,
      visitor_list_total: visitorList.total,
      download_failures: downloadFailures.rows,
      download_failures_total: downloadFailures.total,
      unresolved_download_failures: downloadFailures.unresolved,
    });
  } catch (error) {
    console.error("[API admin] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
