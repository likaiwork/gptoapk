import { NextRequest, NextResponse } from "next/server";
import { recordSearchFailure } from "@/lib/record-search-failure";
import { buildSearchFailureKey, normalizeSearchQuery, type SearchFailureKind } from "@/lib/search-failure-key";

const ALLOWED_KINDS = new Set<SearchFailureKind>([
  "no_results",
  "search_error",
  "invalid_url",
  "query_too_long",
  "client_error",
]);

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";
    const queryType = typeof body.queryType === "string" ? body.queryType.trim() : "keyword";
    const failureKindRaw = typeof body.failureKind === "string" ? body.failureKind.trim() : "client_error";
    const failureKind = ALLOWED_KINDS.has(failureKindRaw as SearchFailureKind)
      ? (failureKindRaw as SearchFailureKind)
      : "client_error";
    const lastError = typeof body.error === "string" ? body.error.trim() : "Client search failed";
    const lang = typeof body.lang === "string" ? body.lang.trim() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "";

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    await recordSearchFailure({
      query,
      queryType,
      failureKind,
      lastError,
      lang,
      country,
    });

    return NextResponse.json({
      success: true,
      queryKey: buildSearchFailureKey(query, queryType, failureKind),
      normalizedQuery: normalizeSearchQuery(query),
    });
  } catch (error) {
    console.error("[API track-search-failure] Error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
