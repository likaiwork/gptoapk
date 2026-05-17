import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  registerVisitor,
} from "@/lib/db";

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

/** 获取客户端真实 IP */
function getClientIP(request: NextRequest): string {
  // 按优先级获取：CF → X-Forwarded-For → X-Real-IP
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;
  
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // 取第一个（最原始的客户端IP）
    const ips = forwarded.split(",").map(i => i.trim());
    return ips[0];
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  
  return "";
}

/** 用免费 API 查询 IP 地理位置（后备方案） */
let geoLookupCache = new Map<string, { country: string; city: string; region: string }>();

async function geoLookupFallback(ip: string): Promise<{ country: string; city: string; region: string } | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.16.")) return null;
  
  const cached = geoLookupCache.get(ip);
  if (cached) return cached;
  
  try {
    // 使用 ip-api.com 免费接口（限速45次/分钟，够了）
    const resp = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,countryCode`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data.status !== "success") return null;
    
    const result = {
      country: data.countryCode || "",
      city: data.city || "",
      region: data.regionName || "",
    };
    geoLookupCache.set(ip, result);
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
    let ipCountry = readHeader(request, [
      "x-vercel-ip-country",
      "cf-ipcountry",
      "x-country-code",
      "x-geo-country",
    ]).toUpperCase();
    let ipCity = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-city",
      "cf-ipcity",
      "x-city",
      "x-geo-city",
    ]));
    let ipRegion = decodeHeaderValue(readHeader(request, [
      "x-vercel-ip-country-region",
      "cf-region",
      "x-region",
      "x-geo-region",
    ]));

    // 如果 CDN header 没提供地域信息，用后备 geo lookup
    if (!ipCountry) {
      const clientIP = getClientIP(request);
      if (clientIP) {
        const geo = await geoLookupFallback(clientIP);
        if (geo) {
          ipCountry = geo.country.toUpperCase();
          ipCity = ipCity || geo.city;
          ipRegion = ipRegion || geo.region;
        }
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
