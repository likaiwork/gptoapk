import { analyticsEvents, type AnalyticsEventName, type AnalyticsParams } from "@/lib/analytics-events";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID ?? "G-DB1E6ERNFQ";
const GA_API_SECRET = process.env.GA_API_SECRET;
const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";

function cleanParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as Record<string, string | number | boolean>;
}

function parseCookie(header: string | null) {
  if (!header) return new Map<string, string>();

  return new Map(
    header.split(";").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, decodeURIComponent(rest.join("="))] as const;
    })
  );
}

function getGaClientId(request: Request) {
  const cookies = parseCookie(request.headers.get("cookie"));
  const gaCookie = cookies.get("_ga");
  const match = gaCookie?.match(/^GA\d+\.\d+\.(.+)$/);

  if (match?.[1]) return match[1];
  return `server.${Date.now()}.${Math.random().toString(36).slice(2)}`;
}

export async function trackServerEvent(
  request: Request,
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {}
) {
  if (!GA_API_SECRET) {
    if (process.env.NODE_ENV === "development") {
      console.log("[analytics]", eventName, cleanParams(params));
    }
    return;
  }

  try {
    const url = new URL(GA_ENDPOINT);
    url.searchParams.set("measurement_id", GA_MEASUREMENT_ID);
    url.searchParams.set("api_secret", GA_API_SECRET);

    await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: getGaClientId(request),
        events: [
          {
            name: eventName,
            params: {
              engagement_time_msec: 1,
              ...cleanParams(params),
            },
          },
        ],
      }),
    });
  } catch (error) {
    console.error(
      `[analytics] Failed to send ${eventName}:`,
      error instanceof Error ? error.message : error
    );
  }
}

export { analyticsEvents };
