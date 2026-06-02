import { NextRequest, NextResponse } from "next/server";
import { runAdminRepair } from "@/lib/run-admin-repair";

export const runtime = "nodejs";
export const maxDuration = 300;

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret) return false;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;

  const queryKey = new URL(request.url).searchParams.get("key");
  const adminKey = process.env.ADMIN_API_KEY?.trim();
  return Boolean(adminKey && queryKey === adminKey);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await runAdminRepair();
    return NextResponse.json(
      { success: true, ...summary, ranAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API cron/repair-failures] Error:", error);
    return NextResponse.json({ error: "Repair failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return GET(request);
}
