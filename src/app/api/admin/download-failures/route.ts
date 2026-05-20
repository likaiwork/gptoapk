import { NextRequest, NextResponse } from "next/server";
import {
  getAdminApiKey,
  initDatabase,
  updateDownloadFailureResolved,
} from "@/lib/db";

async function updateDownloadFailureStatus(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const appId = typeof body.appId === "string" ? body.appId.trim() : "";
    const resolved = body.resolved === true || body.resolved === "true";

    if (!appId) {
      return NextResponse.json({ error: "Missing appId" }, { status: 400 });
    }

    await initDatabase();
    const updated = await updateDownloadFailureResolved(appId, resolved);
    if (!updated) {
      return NextResponse.json({ error: "Failure app not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API admin/download-failures] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  return updateDownloadFailureStatus(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return updateDownloadFailureStatus(request);
}
