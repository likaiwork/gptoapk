/**
 * Smoke test: Play store/search URLs must normalize to the q= term,
 * not to hostname "play.google.com".
 *
 * Run: node scripts/test-play-search-url-normalize.mjs
 */
import assert from "node:assert/strict";

function isLikelyWebHostname(id) {
  const lower = id.toLowerCase();
  if (lower === "play.google.com" || lower.endsWith(".google.com")) return true;
  if (/^(www\.|m\.)/.test(lower)) return true;
  if (/^(github|gitlab|apkpure|apkmirror|uptodown|google|youtube|facebook|instagram)\./i.test(lower)) {
    return true;
  }
  return false;
}

function extractEmbeddedPackageId(query) {
  const matches = query.match(/[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+/g) || [];
  for (const id of matches) {
    if (isLikelyWebHostname(id)) continue;
    const parts = id.split(".");
    if (parts.length >= 2 && parts.every((p) => p.length > 0)) return id;
  }
  return null;
}

function extractPlayStoreSearchTerm(query) {
  const url = new URL(/^https?:\/\//i.test(query) ? query : `https://${query}`);
  if (!url.hostname.endsWith("play.google.com")) return null;
  if (!url.pathname.includes("/store/search")) return null;
  const term = url.searchParams.get("q")?.trim();
  return term ? decodeURIComponent(term.replace(/\+/g, " ")).trim() : null;
}

function normalize(query) {
  const term = extractPlayStoreSearchTerm(query);
  if (term) return term;
  return extractEmbeddedPackageId(query) || query;
}

const searchUrl = "https://play.google.com/store/search?q=Beads%20Out&c=apps";
assert.equal(extractPlayStoreSearchTerm(searchUrl), "Beads Out");
assert.equal(normalize(searchUrl), "Beads Out");
assert.equal(extractEmbeddedPackageId(searchUrl), null);
assert.notEqual(normalize(searchUrl), "play.google.com");

console.log("ok: play search URL normalizes to keyword");
