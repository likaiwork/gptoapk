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
    aliases: ["ibkr", "ibkr mobile", "interactive brokers", "interactivebrokers", "盈透", "盈透证券"],
  },
  {
    appIds: ["com.tigerbrokers.stock"],
    aliases: ["老虎", "老虎证券", "tiger", "tiger trade", "tiger brokers", "itiger"],
  },
  {
    appIds: ["cn.futu.trader"],
    aliases: ["富途", "富途牛牛", "futu", "futubull", "牛牛"],
  },
  {
    appIds: ["com.moomoo.trade"],
    aliases: ["moomoo", "moomoo trade"],
  },
  {
    appIds: ["global.longbridge.app.android"],
    aliases: ["长桥", "长桥证券", "longbridge", "long bridge"],
  },
  {
    appIds: ["org.dayup.stocks.hk", "org.dayup.stocks"],
    aliases: ["微牛", "webull"],
  },
  {
    appIds: ["com.snowballfinance.android"],
    aliases: ["雪盈", "雪盈证券", "snowball x", "snowballx"],
  },
  {
    appIds: ["com.xueqiu.android"],
    aliases: ["雪球", "xueqiu"],
  },
  {
    appIds: ["com.eastmoney.android.berlin"],
    aliases: ["东方财富", "东财", "eastmoney"],
  },
  {
    appIds: ["com.hexin.plat.android"],
    aliases: ["同花顺", "ths", "hexin"],
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
];

/** Wrong or truncated Play package ids from pasted URLs → canonical id */
const PLAY_PACKAGE_ID_ALIASES: Readonly<Record<string, string>> = {
  "org.carnets": "com.spisoft.quicknote",
  "com.junote.junote": "com.fau.jupyternotebook",
};

const SEARCH_ALIAS_APP_IDS = buildAliasMap();

function normalizeAliasKey(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

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

export function resolveSearchAliasAppIds(query: string): readonly string[] | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const normalized = normalizeAliasKey(trimmed);
  const appIds = SEARCH_ALIAS_APP_IDS[normalized];
  if (appIds?.length) return appIds;

  // Chinese aliases are unchanged by toLowerCase; keep a direct trimmed lookup too.
  if (trimmed !== normalized) {
    const direct = SEARCH_ALIAS_APP_IDS[trimmed];
    if (direct?.length) return direct;
  }

  return null;
}
