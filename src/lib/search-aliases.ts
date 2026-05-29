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
];

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
