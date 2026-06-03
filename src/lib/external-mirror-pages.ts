/** Last-resort: send users to a public mirror page when direct APK URL resolution fails. */

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

const UPTODOWN_SLUG_BY_APP_ID: Readonly<Record<string, string>> = {
  "com.taobao.taobao": "taobao",
  "com.xunmeng.pinduoduo": "pinduoduo",
  "com.jingdong.app.mall": "jingdong",
  "com.eg.android.alipaygphone": "alipay",
  "com.tencent.mm": "wechat",
};

function apkComboOrgForAppId(appId: string): string {
  const key = appId.trim().toLowerCase();
  if (APKCOMBO_ORG_BY_APP_ID[key]) return APKCOMBO_ORG_BY_APP_ID[key];
  const parts = key.split(".").filter(Boolean);
  return parts[parts.length - 2] || parts[0] || key;
}

export function getExternalMirrorPageForApp(appId: string): { url: string; source: string } | null {
  const id = appId.trim().toLowerCase();
  if (!id || !id.includes(".")) return null;

  const comboOrg = apkComboOrgForAppId(id);
  const uptodownSlug = UPTODOWN_SLUG_BY_APP_ID[id];

  if (comboOrg) {
    return {
      url: `https://apkcombo.app/${comboOrg}/${id}/download/apk`,
      source: "apkcombo-external",
    };
  }

  if (uptodownSlug) {
    return {
      url: `https://${uptodownSlug}.en.uptodown.com/android`,
      source: "uptodown-external",
    };
  }

  return {
    url: `https://apkcombo.com/downloader/?package=${encodeURIComponent(id)}&lang=en`,
    source: "apkcombo-downloader-external",
  };
}
