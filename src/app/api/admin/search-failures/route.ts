import { NextRequest, NextResponse } from "next/server";
import {
  getAdminApiKey,
  initDatabase,
  updateSearchFailureResolved,
} from "@/lib/db";

async function updateSearchFailureStatus(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || key !== getAdminApiKey()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const queryKey = typeof body.queryKey === "string" ? body.queryKey.trim() : "";
    const resolved = body.resolved === true || body.resolved === "true";

    if (!queryKey) {
      return NextResponse.json({ error: "Missing queryKey" }, { status: 400 });
    }

    await initDatabase();
    const updated = await updateSearchFailureResolved(queryKey, resolved);
    if (!updated) {
      return NextResponse.json({ error: "Search failure not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[API admin/search-failures] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  return updateSearchFailureStatus(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return updateSearchFailureStatus(request);
}
