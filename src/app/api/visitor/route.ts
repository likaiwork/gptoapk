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

const CHINA_REGION_CITY_NAMES: Record<string, string> = {
  "Beijing": "Beijing",
  "Shanghai": "Shanghai",
  "Tianjin": "Tianjin",
  "Chongqing": "Chongqing",
};

const CHINA_DISTRICT_CITY_NAMES = new Set([
  "Jinrongjie",
  "Xicheng",
  "Xicheng District",
  "Dongcheng",
  "Dongcheng District",
  "Haidian",
  "Haidian District",
  "Chaoyang",
  "Chaoyang District",
]);

function normalizeCountryCode(country: string): string {
  return country.trim().toUpperCase();
}

function normalizeGeoInfo(geo: GeoInfo): GeoInfo {
  const country = normalizeCountryCode(geo.country);
  if (!country || country === "XX" || country === "T1") {
    return { country: "", city: "", region: "" };
  }

  const region = geo.region.trim();
  let city = geo.city.trim();

  if (country === "CN") {
    city = city.replace(/\s+District$/i, " District");
    if (CHINA_REGION_CITY_NAMES[region] && (!city || CHINA_DISTRICT_CITY_NAMES.has(city))) {
      city = CHINA_REGION_CITY_NAMES[region];
    }
  }

  if ((country === "HK" || country === "MO" || country === "SG") && !city) {
    city = region;
  }

  return {
    country,
    city,
    region,
  };
}

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
    
    const result = normalizeGeoInfo({
      country: data.countryCode || "",
      city: data.city || "",
      region: data.regionName || "",
    });
    if (!result.country) return null;

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

    const cfCountry = normalizeCountryCode(readHeader(request, [
      "cf-ipcountry",
      "cf-ip-country",
    ]));
    const vercelCountry = normalizeCountryCode(readHeader(request, [
      "x-vercel-ip-country",
      "x-country-code",
      "x-geo-country",
    ]));

    let normalizedGeo = normalizeGeoInfo({
      country: cfCountry || vercelCountry,
      city: "",
      region: "",
    });

    // 城市只来自真实客户端 IP 查询，避免混用 CDN / 部署平台边缘节点位置。
    const clientIP = getClientIP(request);
    if (clientIP) {
      const geo = await geoLookupFallback(clientIP);
      if (geo) {
        normalizedGeo = geo;
      }
    }

    const visitor = await registerVisitor(visitorId, {
      ip_country: normalizedGeo.country,
      ip_city: normalizedGeo.city,
      ip_region: normalizedGeo.region,
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
