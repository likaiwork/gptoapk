# gptoapk Analytics Events

This document records the custom analytics events added for GA4 and Microsoft Clarity.

## Existing IDs

- GA4 Measurement ID: `G-DB1E6ERNFQ`
- Google Tag Manager ID: `GTM-MXXWHJTP`
- Microsoft Clarity Project ID: `wlqyr64bhf`

The base scripts are loaded in `src/app/layout.tsx`.

## Required Environment Variables

Client-side events work with the existing GA4 script.

Server-side download completion events require a GA4 Measurement Protocol secret:

```bash
GA_API_SECRET=your_ga4_measurement_protocol_api_secret
```

Optional server override:

```bash
GA_MEASUREMENT_ID=G-DB1E6ERNFQ
```

If `GA_API_SECRET` is missing, server events are skipped in production and logged in local development.

## Event Map

| Metric | Event name | Source | Trigger |
| --- | --- | --- | --- |
| Visitors | `page_view` | GA4 base script | Normal page load and client navigation |
| Visitor sessions | `site_visit` | Client | Once per browser tab session |
| Generate button clicks | `search_submit` | Client | User clicks generate or presses Enter |
| Parse success | `parse_success` | Client | `/api/fetch-info` returns an app id |
| Parse failure | `parse_failed` | Client | Empty input, invalid app, timeout, or fetch error |
| Download button clicks | `download_click` | Client | User clicks Download APK |
| Download prepare success | `download_prepare_success` | Client | `/api/download-apk` POST returns a proxied URL |
| Download prepare failure | `download_prepare_failed` | Client | Source unavailable, too large, or API error |
| Download stream start | `download_start` | Server | `/api/download-apk?appId=...` begins streaming |
| Download success | `download_success` | Server | APK stream completes from upstream to browser |
| Download failure | `download_failed` | Server | Source failure, timeout, size limit, proxy error, or client cancellation |

## Key Parameters

Common parameters:

- `app_id`: Android package name.
- `locale`: Current site locale.
- `duration_ms`: Time spent in the current step.
- `reason`: Failure reason when available.
- `stage`: Backend step where a download failed.

Download parameters:

- `source`: `aptoide` or `apkpure`.
- `version`: APK version when available.
- `file_size`: APK byte size when available.
- `proxy`: Currently `vercel-stream`.
- `max_proxy_bytes`: Current proxy size limit for blocked downloads.

Parse parameters:

- `input_type`: `google_play_url`, `package_name`, or `empty`.
- `lang`: Google Play language parameter when available.
- `country`: Google Play country parameter when available.

## Counting Guide

- Incoming traffic: use GA4 `Users`, `Sessions`, and `page_view`.
- Button clicks: count `search_submit` and `download_click`.
- Parse conversion rate: `parse_success / search_submit`.
- Parse failure rate: `parse_failed / search_submit`.
- Download preparation conversion: `download_prepare_success / download_click`.
- True download success: count `download_success`.
- Download stream failure rate: `download_failed / download_start`.

`download_success` is more reliable than a client click event because it is sent only after the stream finishes.

## Files Changed

- `src/lib/analytics-events.ts`: shared event names and event param type.
- `src/lib/client-analytics.ts`: client-side GA4/Clarity event sender.
- `src/lib/server-analytics.ts`: GA4 Measurement Protocol sender for backend events.
- `src/components/AnalyticsRouteEvents.tsx`: route page views and one-per-session `site_visit`.
- `src/components/SearchBox.tsx`: search and parse events.
- `src/components/DownloadButton.tsx`: download click and prepare events.
- `src/app/api/download-apk/route.ts`: server-side stream start/success/failure events.
