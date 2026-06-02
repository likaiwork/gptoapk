import { NextRequest, NextResponse } from "next/server";
import { getAdminApiKey, initDatabase, updateMissingAppFeedbackStatus } from "@/lib/db";

async function authorize(request: NextRequest): Promise<NextResponse | null> {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key || key !== getAdminApiKey()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  const denied = await authorize(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = body.status === "done" ? "done" : body.status === "pending" ? "pending" : null;

    if (!Number.isFinite(id) || id <= 0 || !status) {
      return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
    }

    await initDatabase();
    const updated = await updateMissingAppFeedbackStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API admin/missing-app-feedback] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return PATCH(request);
}
