import { NextRequest, NextResponse } from "next/server";
import {
  getAdminApiKey,
  initDatabase,
  updateDownloadFailureMetadata,
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
    const hasResolved = "resolved" in body;
    const resolved = body.resolved === true || body.resolved === "true";
    const lastError = typeof body.error === "string" ? body.error.trim() : "";
    const lastSource = typeof body.source === "string" ? body.source.trim() : "";

    if (!appId) {
      return NextResponse.json({ error: "Missing appId" }, { status: 400 });
    }
    if (!hasResolved && !lastError && !lastSource) {
      return NextResponse.json({ error: "Missing update fields" }, { status: 400 });
    }

    await initDatabase();
    const resolvedUpdated = hasResolved
      ? await updateDownloadFailureResolved(appId, resolved)
      : false;
    const metadataUpdated = lastError || lastSource
      ? await updateDownloadFailureMetadata({ appId, lastError, lastSource })
      : false;
    const updated = resolvedUpdated || metadataUpdated;
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
