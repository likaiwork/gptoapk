export const analyticsEvents = {
  siteVisit: 'site_visit',
  searchSubmit: 'search_submit',
  parseSuccess: 'parse_success',
  parseFailed: 'parse_failed',
  downloadClick: 'download_click',
  downloadPrepareSuccess: 'download_prepare_success',
  downloadPrepareFailed: 'download_prepare_failed',
  downloadStart: 'download_start',
  downloadSuccess: 'download_success',
  downloadFailed: 'download_failed',
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
