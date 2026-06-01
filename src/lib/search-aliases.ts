import {
  getAliasLookupKeys,
  normalizeAliasKey,
  stripSearchQueryNoise,
} from "@/lib/search-query-normalize";

/**
 * Brand nicknames and abbreviations that Google Play search often misses.
 * Maps normalized query → Google Play package id(s).
 */
type SearchAliasEntry = {
  appIds: readonly string[];
  aliases: readonly string[];
};

const SEARCH_ALIAS_ENTRIES: readonly SearchAliasEntry[] = [
  {
    appIds: ["atws.app"],
    aliases: [
      "ibkr",
      "ibkr mobile",
      "interactive brokers",
      "interactivebrokers",
      "盈透",
      "盈透证券",
      "ibkr盈透",
      "ibkr盈透app",
      "ibkr盈透官网",
      "盈透证券app安卓",
      "盈透证券下载链接",
      "ibkr开户",
      "ibkr开户流程",
      "ibkr教程",
      "ibkr入金",
      "ibkr中国怎么开",
      "ibkr还可以开户吗",
      "盈透证券还能开吗",
      "ibkr是什么意思",
      "ibkr.com",
    ],
  },
  {
    appIds: ["com.tigerbrokers.stock"],
    aliases: [
      "老虎",
      "老虎证券",
      "tiger",
      "tiger trade",
      "tiger brokers",
      "itiger",
      "老虎证券app下载",
      "老虎证券app下载安卓",
      "老虎证券app下载官网",
      "老虎证券下载",
      "tigerbrokers",
    ],
  },
  {
    appIds: ["cn.futu.trader"],
    aliases: [
      "富途",
      "富途牛牛",
      "富途证券",
      "futu",
      "futubull",
      "牛牛",
      "富途app下载",
      "富途证券app",
    ],
  },
  {
    appIds: ["com.moomoo.trade"],
    aliases: ["moomoo", "moomoo trade", "moomoo下载", "moomoo app", "富途moomoo"],
  },
  {
    appIds: ["global.longbridge.app.android"],
    aliases: [
      "长桥",
      "长桥证券",
      "长桥券商",
      "长桥券商app",
      "长桥证券app",
      "长桥证券app安卓",
      "长桥app下载",
      "长桥app下载安卓",
      "长桥下载",
      "longbridge",
      "long bridge",
      "longbridge securities",
      "富途老虎长桥",
    ],
  },
  {
    appIds: ["org.dayup.stocks.hk", "org.dayup.stocks"],
    aliases: ["微牛", "webull", "微牛证券", "webull下载", "webull app"],
  },
  {
    appIds: ["com.snowballfinance.android"],
    aliases: ["雪盈", "雪盈证券", "snowball x", "snowballx", "雪盈app", "雪盈下载"],
  },
  {
    appIds: ["com.xueqiu.android"],
    aliases: ["雪球", "xueqiu", "雪球app", "雪球下载"],
  },
  {
    appIds: ["com.eastmoney.android.berlin"],
    aliases: ["东方财富", "东财", "eastmoney", "东方财富app", "东财app"],
  },
  {
    appIds: ["com.hexin.plat.android"],
    aliases: ["同花顺", "ths", "hexin", "同花顺app", "同花顺下载"],
  },
  {
    appIds: ["com.huasheng.stock.gg"],
    aliases: ["华盛", "华盛通", "华盛证券", "huasheng", "valuable capital"],
  },
  {
    appIds: ["com.juniorchina.jcstock"],
    aliases: ["尊嘉", "尊嘉证券", "尊嘉金融", "zinvest"],
  },
  {
    appIds: ["com.usmart.stock"],
    aliases: ["盈立", "盈立证券", "usmart"],
  },
  {
    appIds: ["com.wlsec.app"],
    aliases: ["立桥", "立桥证券", "well link", "welllink"],
  },
  {
    appIds: ["com.htsc.mdc"],
    aliases: ["华泰", "华泰证券", "涨乐", "涨乐财富通", "huatai"],
  },
  {
    appIds: ["com.guosen.stock"],
    aliases: ["国信", "国信证券", "guosen"],
  },
  {
    appIds: ["com.guotai.junan.guiyang"],
    aliases: ["国泰君安", "国君", "guotai junan"],
  },
  {
    appIds: ["com.citics.pbm"],
    aliases: ["中信", "中信证券", "citics"],
  },
  {
    appIds: ["com.cmschina.stock"],
    aliases: ["招商", "招商证券", "cms china"],
  },
  {
    appIds: ["com.gf.gfstocks"],
    aliases: ["广发", "广发证券", "gf securities"],
  },
  {
    appIds: ["com.pingan.stock"],
    aliases: ["平安证券", "ping an securities"],
  },
  {
    appIds: ["com.htsec.android"],
    aliases: ["海通", "海通证券", "haitong"],
  },
  {
    appIds: ["ai.x.grok"],
    aliases: ["grok", "x grok", "grok ai"],
  },
  {
    appIds: ["com.tinder"],
    aliases: ["tinder"],
  },
  {
    appIds: ["com.noyesrun.meeff.kr"],
    aliases: ["meeff", "me eff"],
  },
  {
    appIds: ["com.solomonj.ipynbviewer"],
    aliases: ["ipynb viewer", "ipynb", "jupyter notebook viewer", "notebook viewer"],
  },
  {
    appIds: ["com.android.vending"],
    aliases: [
      "googleplay",
      "google play",
      "google play store",
      "play store",
      "playstore",
      "googleplay商店",
      "谷歌play",
      "谷歌 play",
      "应用商店",
      "安卓应用商店",
      "goodplay",
      "googleplay下载",
      "谷歌商店",
      "google play下载",
    ],
  },
  {
    appIds: ["com.google.android.play.games"],
    aliases: ["google play games", "play games", "play 游戏"],
  },
  {
    appIds: ["com.autonavi.minimap"],
    aliases: ["高德地图", "高德", "amap", "gaode"],
  },
  {
    appIds: ["com.garena.game.nfsm"],
    aliases: ["极品飞车", "极品飞车·集结", "极品飞车集结", "nfsm", "need for speed mobile"],
  },
  {
    appIds: ["com.spisoft.quicknote"],
    aliases: ["carnet", "carnets"],
  },
  {
    appIds: ["com.fau.jupyternotebook"],
    aliases: ["junote", "jupyternotebook", "jupyter notebook"],
  },
  {
    appIds: ["com.openai.chatgpt"],
    aliases: [
      "chatgpt",
      "chatgpt下载",
      "chatgpt怎么下载",
      "下载chatgpt中文版",
      "chatgpt中文版",
      "chatgpt中文",
      "chatgpt中文在线",
      "chatgpt官网",
      "chatgpt入口",
      "chatgpt注册",
      "chatgpt 注册",
      "chatgpt试用",
      "chatgpt账号",
      "chatgpt是啥",
      "chatgpt是什么",
      "chatgpt是什么意思",
      "chatgpt怎么用",
      "chatgpt国内能用吗",
      "国内怎么玩chatgpt",
    ],
  },
  {
    appIds: ["com.moretv.android"],
    aliases: ["电视猫", "电视猫apk", "电视猫tv", "电视猫官方", "电视猫apk官方下载"],
  },
  {
    appIds: ["com.dianshijia.tvlive"],
    aliases: ["电视家", "电视家3.0", "电视家3.0 apk", "电视家3.0 apk下载", "电视家apk", "dianshijia"],
  },
  {
    appIds: ["us.zoom.videomeetings"],
    aliases: [
      "zoom",
      "zoom下载",
      "zoom软件下载",
      "zoom安卓版下载",
      "zoom安卓下载",
      "zoom视频会议",
      "zoom会议",
      "zoom workplace",
      "zoom workplace下载",
      "zoom是什么意思",
      "zoom怎么读",
      "zoom.us",
      "zoom官网",
    ],
  },
  {
    appIds: ["com.whatsapp"],
    aliases: [
      "whatsapp",
      "whatsapp messenger",
      "whatsappmessenger",
      "whatsapp下载",
      "whatsapp官方下载",
      "whatsapp官方网下载",
      "whatsapp官网下载",
      "whatsapp是什么",
      "whatsapp安卓下载",
      "whatsapp.com",
      "whatsapp web",
      "whatsapp网页版",
      "whatsapp网页",
      "wa",
    ],
  },
  {
    appIds: ["com.whatsapp.w4b"],
    aliases: ["whatsapp business", "whatsapp商业版", "whatsapp商家版"],
  },
  {
    appIds: ["com.twitter.android"],
    aliases: [
      "twitter",
      "twitter下载",
      "twitter官网",
      "twitter官网入口",
      "twitter官网登录入口",
      "twitter.com",
      "twitter官方下载",
      "twitter注册",
      "twitter安卓下载",
      "twitter官网下载安卓版",
      "twitter推特官网下载",
      "twitter是什么",
      "twitter是什么意思",
      "twitter中文版",
      "twitter中文",
      "twitter网站",
      "推特",
      "推特下载",
      "x",
      "x app",
      "x.com",
    ],
  },
  {
    appIds: ["com.google.android.youtube"],
    aliases: [
      "youtube",
      "youtube官网",
      "youtube下载",
      "youtube官网app下载",
      "youtube官网app下载安卓",
      "youtube.com",
      "youtube怎么读",
      "youtube是什么",
      "youtube网站",
      "youtube网址",
      "youtube视频",
      "youtube视频下载",
      "下载youtube视频",
      "youtubedownload",
      "youtube视频下载器",
      "如何下载youtube视频",
      "youtube视频怎么下载",
      "油管",
      "油管youtube官网",
      "油管youtube官网入口",
      "优图布",
    ],
  },
  {
    appIds: ["com.zhiliaoapp.musically"],
    aliases: [
      "tiktok",
      "tiktok下载",
      "tiktok国际版下载",
      "tiktok国际版官方下载",
      "tiktok官网入口",
      "tiktok国际版官方入口",
      "tiktok官网",
      "tiktok官网下载",
      "tiktok安卓下载",
      "国际版tiktok下载",
      "tiktok是什么",
      "tiktok是什么意思",
      "tiktok什么意思",
      "tiktok怎么读",
      "tiktok是中国公司吗",
      "tiktok是哪国的软件",
      "tiktok和抖音什么关系",
      "海外抖音",
      "海外抖音tiktok下载教程",
      "抖音国际版",
      "抖音海外版",
      "tiktok.com",
      "提克托克",
    ],
  },
  {
    appIds: ["com.facebook.katana"],
    aliases: [
      "facebook",
      "facebook下载",
      "facebook安卓下载",
      "facebook安卓下载最新版",
      "facebook官方下载",
      "facebook官网",
      "facebook.com",
      "facebook注册",
      "facebook怎么注册",
      "facebook登录",
      "facebook官网登录入口",
      "facebook是什么",
      "facebook是什么意思",
      "facebook怎么用",
      "facebook官方",
      "脸书",
      "fb",
    ],
  },
  {
    appIds: ["com.facebook.orca"],
    aliases: ["facebook messenger", "messenger", "messenger下载", "facebook messenger下载"],
  },
  {
    appIds: ["org.telegram.messenger"],
    aliases: [
      "telegram",
      "tg",
      "电报",
      "telegram下载",
      "telegram apk",
      "telegram安卓下载",
      "telegram官方下载",
      "telegram官网",
      "telegram.com",
      "t.me",
      "org.telegram.messenger",
    ],
  },
  {
    appIds: ["com.instagram.android"],
    aliases: [
      "instagram",
      "ins",
      "ig",
      "instagram下载",
      "instagram apk",
      "instagram安卓下载",
      "instagram官方下载",
      "instagram官网",
      "com.instagram.android",
    ],
  },
  {
    appIds: ["com.google.android.apps.bard"],
    aliases: [
      "gemini",
      "google gemini",
      "gemini ai",
      "gemini下载",
      "gemini apk",
      "gemini安卓下载",
      "谷歌gemini",
      "com.google.android.apps.bard",
    ],
  },
  {
    appIds: ["com.anthropic.claude"],
    aliases: [
      "claude",
      "claude ai",
      "anthropic claude",
      "claude下载",
      "claude apk",
      "claude安卓下载",
      "com.anthropic.claude",
    ],
  },
  {
    appIds: ["com.larus.nova"],
    aliases: ["豆包", "doubao", "字节豆包", "com.larus.nova", "豆包下载", "豆包apk"],
  },
  {
    appIds: ["com.deepseek.chat"],
    aliases: ["deepseek", "deep seek", "deepseek ai", "com.deepseek.chat", "deepseek下载", "deepseek apk"],
  },
  {
    appIds: ["com.moonshot.kimichat"],
    aliases: ["kimi", "kimi智能助手", "kimi 智能助手", "月之暗面", "com.moonshot.kimichat", "kimi下载"],
  },
  {
    appIds: ["ai.qwenlm.chat.android"],
    aliases: ["通义千问", "千问", "qwen", "通义", "com.qwen", "ai.qwenlm.chat.android", "通义千问下载"],
  },
  {
    appIds: ["com.tencent.hunyuan.app.chat"],
    aliases: ["腾讯元宝", "元宝", "yuanbao", "混元", "com.tencent.hunyuan.app.chat", "元宝下载"],
  },
  {
    appIds: ["com.discord"],
    aliases: ["discord", "discord下载", "discord apk", "discord安卓下载", "com.discord"],
  },
  {
    appIds: ["com.netflix.mediaclient"],
    aliases: ["netflix", "netflix下载", "netflix apk", "奈飞", "网飞", "com.netflix.mediaclient"],
  },
  {
    appIds: ["com.spotify.music"],
    aliases: ["spotify", "spotify下载", "spotify apk", "声破天", "com.spotify.music"],
  },
  {
    appIds: ["jp.naver.line.android"],
    aliases: ["line", "line下载", "line apk", "jp.naver.line.android"],
  },
  {
    appIds: ["com.kakao.talk"],
    aliases: ["kakao", "kakaotalk", "kakao talk", "카카오톡", "com.kakao.talk"],
  },
  {
    appIds: ["com.snapchat.android"],
    aliases: ["snapchat", "snap", "snapchat下载", "com.snapchat.android"],
  },
  {
    appIds: ["com.pinterest"],
    aliases: ["pinterest", "pinterest下载", "com.pinterest"],
  },
  {
    appIds: ["com.reddit.frontpage"],
    aliases: ["reddit", "reddit下载", "com.reddit.frontpage"],
  },
  {
    appIds: ["com.linkedin.android"],
    aliases: ["linkedin", "领英", "linkedin下载", "com.linkedin.android"],
  },
  {
    appIds: ["com.shieldmeta.dash.s"],
    aliases: ["shield vpn", "shield", "dash vpn", "com.shieldmeta.dash.s"],
  },
  {
    appIds: ["ch.protonvpn.android"],
    aliases: ["protonvpn", "proton vpn", "proton"],
  },
  {
    appIds: ["com.windscribe.vpn"],
    aliases: ["windscribe", "windscribe vpn"],
  },
  {
    appIds: ["com.google.android.gm"],
    aliases: ["gmail", "google mail", "谷歌邮箱", "gmail下载", "com.google.android.gm"],
  },
  {
    appIds: ["com.xunmeng.pinduoduo"],
    aliases: ["拼多多", "pinduoduo", "pdd", "com.xunmeng.pinduoduo"],
  },
  {
    appIds: ["com.taobao.taobao"],
    aliases: ["淘宝", "taobao", "手机淘宝", "com.taobao.taobao"],
  },
  {
    appIds: ["com.eg.android.AlipayGphone"],
    aliases: ["支付宝", "alipay", "com.eg.android.AlipayGphone"],
  },
  {
    appIds: ["jp.naver.line.android"],
    aliases: ["line", "line下载", "line apk", "com.line", "jp.naver.line.android"],
  },
  {
    appIds: ["com.discord"],
    aliases: ["discord", "discord下载", "discord apk", "com.discord"],
  },
];

/** Wrong or truncated Play package ids from pasted URLs → canonical id */
const PLAY_PACKAGE_ID_ALIASES: Readonly<Record<string, string>> = {
  "org.carnets": "com.spisoft.quicknote",
  "com.junote.junote": "com.fau.jupyternotebook",
};

const SEARCH_ALIAS_APP_IDS = buildAliasMap();
const SORTED_ALIAS_KEYS = Object.keys(SEARCH_ALIAS_APP_IDS).sort(
  (a, b) => b.length - a.length,
);

const PACKAGE_LIKE_ALIAS = /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+$/i;

function pickAliasDisplayLabel(aliases: readonly string[]): string {
  const human = aliases.find(
    (alias) => alias.length >= 2 && !PACKAGE_LIKE_ALIAS.test(alias.trim()),
  );
  if (!human) return aliases[0] ?? "";
  const trimmed = human.trim();
  if (/^[\u4e00-\u9fff]/.test(trimmed)) return trimmed;
  return trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildAliasDisplayNameMap(): Readonly<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const entry of SEARCH_ALIAS_ENTRIES) {
    const label = pickAliasDisplayLabel(entry.aliases);
    if (!label) continue;
    for (const appId of entry.appIds) {
      const key = appId.trim().toLowerCase();
      if (!map[key]) map[key] = label;
    }
  }
  return map;
}

const ALIAS_PACKAGE_DISPLAY_NAMES = buildAliasDisplayNameMap();

function buildAliasMap(): Readonly<Record<string, readonly string[]>> {
  const map: Record<string, readonly string[]> = {};

  for (const entry of SEARCH_ALIAS_ENTRIES) {
    for (const alias of entry.aliases) {
      map[normalizeAliasKey(alias)] = entry.appIds;
    }
  }

  return map;
}

export function resolvePlayPackageIdAlias(appId: string): string {
  const trimmed = appId.trim();
  if (!trimmed) return appId;
  return PLAY_PACKAGE_ID_ALIASES[trimmed.toLowerCase()] ?? trimmed;
}

/** Human-readable title when Google Play metadata is unavailable. */
export function getAliasPackageDisplayName(appId: string): string | null {
  const resolved = resolvePlayPackageIdAlias(appId).trim().toLowerCase();
  return ALIAS_PACKAGE_DISPLAY_NAMES[resolved] ?? null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isCjkAlias(alias: string): boolean {
  return /[\u4e00-\u9fff]/.test(alias);
}

function resolveByLongestContainedAlias(stripped: string): readonly string[] | null {
  if (stripped.length < 2) return null;

  for (const alias of SORTED_ALIAS_KEYS) {
    if (alias.length < 2) continue;

    if (stripped === alias) {
      return SEARCH_ALIAS_APP_IDS[alias];
    }

    // Short aliases (x, fb, wa) only match exactly — avoid false positives.
    if (alias.length <= 2) continue;

    if (stripped.startsWith(alias)) {
      const rest = stripped.slice(alias.length).trim();
      if (!rest || stripSearchQueryNoise(rest) === "") {
        return SEARCH_ALIAS_APP_IDS[alias];
      }
    }

    if (isCjkAlias(alias) && stripped.includes(alias)) {
      return SEARCH_ALIAS_APP_IDS[alias];
    }

    if (!isCjkAlias(alias) && alias.length >= 3) {
      const tokenPattern = new RegExp(`(?:^|\\s)${escapeRegExp(alias)}(?:\\s|$)`);
      if (tokenPattern.test(stripped)) {
        return SEARCH_ALIAS_APP_IDS[alias];
      }
    }
  }

  return null;
}

export function resolveSearchAliasAppIds(query: string): readonly string[] | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  for (const key of getAliasLookupKeys(trimmed)) {
    const appIds = SEARCH_ALIAS_APP_IDS[key];
    if (appIds?.length) return appIds;
  }

  const stripped = stripSearchQueryNoise(trimmed);
  return resolveByLongestContainedAlias(stripped);
}
