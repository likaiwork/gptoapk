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
} from "@/lib/db";

export interface AdminResponse {
  visitors: number;
  total_searches: number;
  total_downloads: number;
  top_searches: SearchStat[];
  top_downloads: DownloadStat[];
  recent_activity: ActivityItem[];
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

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminResponse | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDatabase();

    const [visitors, totalSearches, totalDownloads, topSearches, topDownloads, recentActivity] =
      await Promise.all([
        getVisitorStats(),
        getTotalSearches(),
        getTotalDownloads(),
        getSearchStats(20),
        getDownloadStats(20),
        getRecentActivity(50),
      ]);

    return NextResponse.json({
      visitors: visitors.total,
      total_searches: totalSearches,
      total_downloads: totalDownloads,
      top_searches: topSearches,
      top_downloads: topDownloads,
      recent_activity: recentActivity,
    });
  } catch (error) {
    console.error("[API admin] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
