/** Last-resort: send users to a public mirror page when direct APK URL resolution fails. */

const CHINESE_RETAIL_APP_IDS = new Set([
  "com.taobao.taobao",
  "com.taobao.idlefish",
  "com.xunmeng.pinduoduo",
  "com.jingdong.app.mall",
  "com.eg.android.alipaygphone",
  "com.tencent.mm",
  "com.ss.android.ugc.aweme",
  "com.smile.gifmaker",
  "com.kwai.video",
  "com.kugou.android",
]);

const APKPURE_SLUG_BY_APP_ID: Readonly<Record<string, string>> = {
  "com.taobao.taobao": "taobao",
  "com.taobao.idlefish": "idlefish",
  "com.xunmeng.pinduoduo": "pinduoduo",
  "com.jingdong.app.mall": "jd",
  "com.eg.android.alipaygphone": "alipay",
  "com.tencent.mm": "wechat",
  "com.ss.android.ugc.aweme": "tik-tok",
  "com.smile.gifmaker": "kuaishou",
  "com.kwai.video": "kwai",
  "com.kugou.android": "kugou",
  "com.openai.chatgpt": "chatgpt",
  "org.telegram.messenger": "telegram",
  "com.tdameritrade.thinkorswim": "thinkorswim",
  "com.niksoftware.snapseed": "snapseed",
  "xyz.bluesky.android": "bluesky",
};

const APKCOMBO_ORG_BY_APP_ID: Readonly<Record<string, string>> = {
  "com.taobao.taobao": "taobao",
  "com.xunmeng.pinduoduo": "pinduoduo",
  "com.jingdong.app.mall": "jd-com-jingdong",
  "com.eg.android.alipaygphone": "alipay",
  "com.tencent.mm": "wechat",
  "com.ss.android.ugc.aweme": "tik-tok",
  "com.smile.gifmaker": "kuaishou",
  "com.kwai.video": "kwai",
  "com.openai.chatgpt": "chatgpt",
  "org.telegram.messenger": "telegram",
};

function apkpureSlugForAppId(appId: string): string {
  const key = appId.trim().toLowerCase();
  if (APKPURE_SLUG_BY_APP_ID[key]) return APKPURE_SLUG_BY_APP_ID[key];
  const parts = key.split(".").filter(Boolean);
  return parts[parts.length - 2] || parts[0] || key;
}

function apkComboOrgForAppId(appId: string): string {
  const key = appId.trim().toLowerCase();
  if (APKCOMBO_ORG_BY_APP_ID[key]) return APKCOMBO_ORG_BY_APP_ID[key];
  const parts = key.split(".").filter(Boolean);
  return parts[parts.length - 2] || parts[0] || key;
}

export function getExternalMirrorPageForApp(appId: string): { url: string; source: string } | null {
  const id = appId.trim().toLowerCase();
  if (!id || !id.includes(".")) return null;

  const apkpureSlug = apkpureSlugForAppId(id);
  if (apkpureSlug) {
    return {
      url: `https://apkpure.com/${apkpureSlug}/${id}/download`,
      source: "apkpure-external",
    };
  }

  const comboOrg = apkComboOrgForAppId(id);
  if (comboOrg) {
    return {
      url: `https://apkcombo.app/${comboOrg}/${id}/download/apk`,
      source: "apkcombo-external",
    };
  }

  if (CHINESE_RETAIL_APP_IDS.has(id)) {
    return {
      url: `https://apkpure.com/search?q=${encodeURIComponent(id)}`,
      source: "apkpure-search-external",
    };
  }

  return {
    url: `https://apkpure.com/search?q=${encodeURIComponent(id)}`,
    source: "apkpure-search-external",
  };
}
