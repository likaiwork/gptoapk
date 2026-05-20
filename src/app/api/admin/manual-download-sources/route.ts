import { NextRequest, NextResponse } from "next/server";
import {
  deleteManualDownloadSource,
  getAdminApiKey,
  initDatabase,
  upsertManualDownloadSource,
} from "@/lib/db";

function isPublicHttpsUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") return false;

    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal")
    ) {
      return false;
    }

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      const [a, b] = hostname.split(".").map(Number);
      return !(
        a === 10 ||
        a === 127 ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 168) ||
        (a === 169 && b === 254)
      );
    }

    return true;
  } catch {
    return false;
  }
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function requireAdmin(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  return Boolean(key && key === getAdminApiKey());
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const appId = normalizeText(body.appId);
    const appTitle = normalizeText(body.appTitle);
    const downloadUrl = normalizeText(body.downloadUrl);
    const fileName = normalizeText(body.fileName);
    const sourceLabel = normalizeText(body.sourceLabel) || "manual";

    if (!appId) {
      return NextResponse.json({ error: "Missing appId" }, { status: 400 });
    }
    if (!isPublicHttpsUrl(downloadUrl)) {
      return NextResponse.json({ error: "Download URL must be a public HTTPS URL" }, { status: 400 });
    }

    await initDatabase();
    const source = await upsertManualDownloadSource({
      appId,
      appTitle,
      downloadUrl,
      fileName,
      sourceLabel,
      active: body.active !== false,
    });

    return NextResponse.json(
      { success: true, source },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API admin/manual-download-sources] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let appId = normalizeText(searchParams.get("appId"));
    if (!appId) {
      const body = await request.json().catch(() => null);
      appId = normalizeText(body?.appId);
    }

    if (!appId) {
      return NextResponse.json({ error: "Missing appId" }, { status: 400 });
    }

    await initDatabase();
    await deleteManualDownloadSource(appId);

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API admin/manual-download-sources] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
