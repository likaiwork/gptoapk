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
  getSearchFailureQueries,
  getMissingAppFeedbacks,
  getVisitorDeviceBreakdown,
  getDailyVisitorDeviceStats,
} from "@/lib/db";
import type { DailyVisitorDeviceStat, VisitorDeviceBreakdown } from "@/lib/db";

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
  search_failures: SearchFailureQuery[];
  search_failures_total: number;
  unresolved_search_failures: number;
  missing_app_feedback: import("@/lib/db").MissingAppFeedback[];
  missing_app_feedback_total: number;
  pending_missing_app_feedback: number;
  device_breakdown: VisitorDeviceBreakdown;
  device_daily: DailyVisitorDeviceStat[];
  device_range_label: string;
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

interface SearchFailureQuery {
  query_key: string;
  query: string;
  normalized_query: string;
  query_type: string;
  failure_kind: string;
  last_lang: string;
  last_country: string;
  failure_count: number;
  last_error: string;
  first_failed_at: string;
  last_failed_at: string;
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

function formatDeviceRangeLabel(startDate: string, endDate: string): string {
  if (!startDate && !endDate) return "最近 30 天（Asia/Shanghai）";
  if (startDate && endDate && startDate === endDate) return startDate;
  if (startDate && endDate) return `${startDate} ~ ${endDate}`;
  if (startDate) return `${startDate} 起`;
  if (endDate) return `至 ${endDate}`;
  return "最近 30 天（Asia/Shanghai）";
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
    const searchFailurePage = Math.max(parseInt(searchParams.get("searchFailurePage") || "0") || 0, 0);
    const missingAppFeedbackPage = Math.max(
      parseInt(searchParams.get("missingAppFeedbackPage") || "0") || 0,
      0,
    );

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
      searchFailures,
      missingAppFeedback,
      deviceBreakdown,
      deviceDaily,
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
        getSearchFailureQueries(pageSize, searchFailurePage * pageSize),
        getMissingAppFeedbacks(pageSize, missingAppFeedbackPage * pageSize),
        getVisitorDeviceBreakdown(startDate, endDate),
        getDailyVisitorDeviceStats(startDate, endDate),
      ]);

    return NextResponse.json(
      {
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
        search_failures: searchFailures.rows,
        search_failures_total: searchFailures.total,
        unresolved_search_failures: searchFailures.unresolved,
        missing_app_feedback: missingAppFeedback.rows,
        missing_app_feedback_total: missingAppFeedback.total,
        pending_missing_app_feedback: missingAppFeedback.pending,
        device_breakdown: deviceBreakdown,
        device_daily: deviceDaily,
        device_range_label: formatDeviceRangeLabel(startDate, endDate),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API admin] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
