import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  registerVisitor,
} from "@/lib/db";

type GeoInfo = { country: string; city: string; region: string };

type IpApiResponse = {
  status?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
  proxy?: boolean;
  hosting?: boolean;
};

function readHeader(request: NextRequest, names: string[]): string {
  for (const name of names) {
    const value = request.headers.get(name);
    if (value) return value;
  }
  return "";
}

function decodeHeaderValue(value: string): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  } catch {
    return value;
  }
}

function stripPort(value: string): string {
  if (!value) return "";
  const trimmed = value.trim().replace(/^"|"$/g, "");
  if (trimmed.startsWith("[")) {
    const end = trimmed.indexOf("]");
    return end > 0 ? trimmed.slice(1, end) : trimmed;
  }
  const colonCount = (trimmed.match(/:/g) || []).length;
  if (colonCount === 1) return trimmed.split(":")[0];
  return trimmed;
}

function isPrivateOrReservedIP(ip: string): boolean {
  const normalized = ip.replace(/^::ffff:/i, "");
  if (
    normalized === "127.0.0.1" ||
    normalized === "0.0.0.0" ||
    normalized === "::1" ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    normalized.startsWith("169.254.") ||
    normalized.startsWith("100.64.") ||
    normalized.toLowerCase().startsWith("fc") ||
    normalized.toLowerCase().startsWith("fd") ||
    normalized.toLowerCase().startsWith("fe80:")
  ) {
    return true;
  }

  const parts = normalized.split(".");
  if (parts.length === 4) {
    const first = Number(parts[0]);
    const second = Number(parts[1]);
    return first === 172 && second >= 16 && second <= 31;
  }

  return false;
}

function isUsableIP(value: string): boolean {
  const ip = stripPort(value);
  if (!ip || isPrivateOrReservedIP(ip)) return false;
  return /^[0-9a-f:.]+$/i.test(ip);
}

function getForwardedFor(request: NextRequest): string {
  const forwardedHeader = request.headers.get("forwarded");
  if (!forwardedHeader) return "";

  for (const part of forwardedHeader.split(",")) {
    const match = part.match(/(?:^|;)\s*for=([^;]+)/i);
    if (match && isUsableIP(match[1])) return stripPort(match[1]);
  }

  return "";
}

function getXForwardedFor(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) return "";

  for (const ip of forwarded.split(",")) {
    if (isUsableIP(ip)) return stripPort(ip);
  }

  return "";
}

/** 获取客户端真实 IP，优先使用 CDN 传递的访客 IP，最后才看通用代理头。 */
function getClientIP(request: NextRequest): string {
  const directHeaderIP = readHeader(request, [
    "true-client-ip",
    "cf-connecting-ip",
    "cf-connecting-ipv6",
    "fastly-client-ip",
    "x-client-ip",
    "x-real-ip",
  ]);
  if (isUsableIP(directHeaderIP)) return stripPort(directHeaderIP);

  return getForwardedFor(request) || getXForwardedFor(request);
}

/** 用免费 API 查询 IP 地理位置（后备方案） */
const geoLookupCache = new Map<string, GeoInfo>();

async function geoLookupFallback(ip: string): Promise<GeoInfo | null> {
  const lookupIP = stripPort(ip);
  if (!isUsableIP(lookupIP)) return null;
  
  const cached = geoLookupCache.get(lookupIP);
  if (cached) return cached;
  
  try {
    // 使用 ip-api.com 免费接口（限速45次/分钟，够了）
    const resp = await fetch(`http://ip-api.com/json/${lookupIP}?fields=status,country,regionName,city,countryCode,proxy,hosting`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!resp.ok) return null;
    const data = (await resp.json()) as IpApiResponse;
    if (data.status !== "success") return null;
    if (data.proxy || data.hosting) return null;
    
    const result = {
      country: data.countryCode || "",
      city: data.city || "",
      region: data.regionName || "",
    };
    if (!result.country && !result.city && !result.region) return null;

    geoLookupCache.set(lookupIP, result);
    // 缓存最多200条
    if (geoLookupCache.size > 200) {
      const firstKey = geoLookupCache.keys().next().value;
      if (firstKey) geoLookupCache.delete(firstKey);
    }
    return result;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    await initDatabase();

    const cookies = request.headers.get("cookie") || "";
    const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
    let visitorId = match ? decodeURIComponent(match[1]) : null;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    // 收集设备/IP信息
    const userAgent = request.headers.get("user-agent") || "";

    const cfCountry = readHeader(request, [
      "cf-ipcountry",
      "cf-ip-country",
    ]);
    const cfCity = decodeHeaderValue(readHeader(request, [
      "cf-ipcity",
      "cf-ip-city",
    ]));
    const cfRegion = decodeHeaderValue(readHeader(request, [
      "cf-region",
      "cf-ipregion",
      "cf-ip-region",
    ]));
    const vercelCountry = readHeader(request, [
      "x-vercel-ip-country",
      "x-country-code",
      "x-geo-country",
    ]);
    const vercelCity = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-city",
      "x-city",
      "x-geo-city",
    ]));
    const vercelRegion = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-country-region",
      "x-region",
      "x-geo-region",
    ]));

    const hasCloudflareGeo = Boolean(cfCountry || cfCity || cfRegion);
    let ipCountry = hasCloudflareGeo ? cfCountry.toUpperCase() : vercelCountry.toUpperCase();
    let ipCity = hasCloudflareGeo ? cfCity : vercelCity;
    let ipRegion = hasCloudflareGeo ? cfRegion : vercelRegion;

    // 不混用 CDN / 部署平台的 geo 字段；缺少城市时用真实访客 IP 做后备校正。
    const clientIP = getClientIP(request);
    if (clientIP && (!ipCountry || !ipCity || !ipRegion)) {
      const geo = await geoLookupFallback(clientIP);
      if (geo) {
        ipCountry = (geo.country || ipCountry).toUpperCase();
        ipCity = geo.city || ipCity;
        ipRegion = geo.region || ipRegion;
      }
    }

    const visitor = await registerVisitor(visitorId, {
      ip_country: ipCountry,
      ip_city: ipCity,
      ip_region: ipRegion,
      user_agent: userAgent,
    });

    const response = NextResponse.json({
      visitor_id: visitor.visitor_id,
      first_visit: visitor.first_visit,
      visit_count: visitor.visit_count,
    });

    if (!match) {
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      response.headers.set(
        "Set-Cookie",
        `visitor_id=${visitorId}; path=/; expires=${expires}; SameSite=Lax`
      );
    }

    return response;
  } catch (error) {
    console.error("[API visitor] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
