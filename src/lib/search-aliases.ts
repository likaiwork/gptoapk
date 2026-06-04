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
    aliases: ["grok", "x grok", "grok ai", "xai", "x ai"],
  },
  {
    appIds: ["com.microsoft.copilot"],
    aliases: ["copilot", "microsoft copilot", "ms copilot", "com.microsoft.copilot"],
  },
  {
    appIds: ["ai.perplexity.app.android"],
    aliases: ["perplexity", "perplexity ai", "pplx", "ai.perplexity.app.android"],
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
      "play商店",
      "play 商店",
      "play商店下载",
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
      "gpt",
      "openai",
      "openai gpt",
      "chat gpt",
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
    appIds: ["com.tencent.mm"],
    aliases: ["微信", "wechat", "we chat", "com.tencent.mm"],
  },
  {
    appIds: ["com.tencent.mobileqq"],
    aliases: [
      "qq",
      "qq下载",
      "qq apk",
      "qq官方",
      "手机qq",
      "手机QQ",
      "腾讯qq",
      "腾讯QQ",
      "com.tencent.mobileqq",
    ],
  },
  {
    appIds: ["com.ss.android.ugc.aweme"],
    aliases: ["抖音", "douyin", "抖音下载", "com.ss.android.ugc.aweme"],
  },
  {
    appIds: ["com.kwai.video", "com.smile.gifmaker"],
    aliases: [
      "kwai",
      "kwai app",
      "kwai下载",
      "kwai apk",
      "kwai官方",
      "com.kwai.video",
      "快手",
      "kuaishou",
      "快手下载",
      "com.smile.gifmaker",
    ],
  },
  {
    appIds: ["com.baidu.searchbox"],
    aliases: ["百度", "baidu", "手机百度", "com.baidu.searchbox"],
  },
  {
    appIds: ["com.jingdong.app.mall"],
    aliases: ["京东", "jd", "京东商城", "com.jingdong.app.mall"],
  },
  {
    appIds: ["com.sankuai.meituan"],
    aliases: ["美团", "meituan", "美团外卖", "com.sankuai.meituan"],
  },
  {
    appIds: ["tv.danmaku.bili"],
    aliases: ["bilibili", "哔哩哔哩", "b站", "B站", "com.bilibili", "tv.danmaku.bili"],
  },
  {
    appIds: ["com.xingin.xhs"],
    aliases: ["小红书", "xiaohongshu", "红书", "com.xingin.xhs"],
  },
  {
    appIds: ["com.tencent.qqmusic"],
    aliases: ["qq音乐", "qqmusic", "QQ音乐", "com.tencent.qqmusic"],
  },
  {
    appIds: ["com.VCB"],
    aliases: [
      "vietcombank",
      "vietcom bank",
      "vietcom",
      "vcb",
      "vcb digibank",
      "vcb digi",
      "digibank",
      "越南外贸银行",
      "com.vcb",
      "com.VCB",
    ],
  },
  // —— Vietnam & SEA: banks / e-wallets ——
  {
    appIds: ["vn.com.techcombank.bb.app"],
    aliases: [
      "techcombank",
      "techcom",
      "tcb",
      "techcombank mobile",
      "vn.com.techcombank.bb.app",
    ],
  },
  {
    appIds: ["com.vnpay.bidv"],
    aliases: ["bidv", "bidv smartbanking", "smartbanking bidv", "com.vnpay.bidv"],
  },
  {
    appIds: ["com.mbmobile"],
    aliases: ["mb bank", "mbbank", "mbbank app", "military bank", "com.mbmobile"],
  },
  {
    appIds: ["com.vietinbank.ipay"],
    aliases: ["vietinbank", "vietin bank", "vietin", "ipay", "com.vietinbank.ipay"],
  },
  {
    appIds: ["com.vnpay.vpbankonline"],
    aliases: ["vpbank", "vp bank", "vpbank neo", "com.vnpay.vpbankonline"],
  },
  {
    appIds: ["com.tpb.mb.gprsandroid"],
    aliases: ["tpbank", "tp bank", "tiên phong", "com.tpb.mb.gprsandroid"],
  },
  {
    appIds: ["mobile.acb.com.vn"],
    aliases: ["acb", "acb one", "acb bank", "mobile.acb.com.vn"],
  },
  {
    appIds: ["com.vnpay.Agribank3g"],
    aliases: ["agribank", "agri bank", "com.vnpay.agribank3g", "com.vnpay.Agribank3g"],
  },
  {
    appIds: ["vn.shb.mbanking"],
    aliases: ["shb", "shb bank", "shb mobile", "vn.shb.mbanking"],
  },
  {
    appIds: ["vn.com.msb.smartBanking"],
    aliases: ["msb", "msb bank", "maritime bank", "vn.com.msb.smartbanking"],
  },
  {
    appIds: ["com.sacombank.ewallet"],
    aliases: ["sacombank", "saco bank", "com.sacombank.ewallet"],
  },
  {
    appIds: ["com.ocb.omniextra"],
    aliases: ["ocb", "ocb bank", "phuong dong", "com.ocb.omniextra"],
  },
  {
    appIds: ["com.vib.myvib2"],
    aliases: ["vib", "vib bank", "myvib", "com.vib.myvib2"],
  },
  {
    appIds: ["com.mservice.momotransfer"],
    aliases: ["momo", "vi momo", "momo wallet", "com.mservice.momotransfer"],
  },
  {
    appIds: ["vn.com.vng.zalopay"],
    aliases: ["zalopay", "zalo pay", "zalo pay vietnam", "vn.com.vng.zalopay"],
  },
  {
    appIds: ["com.grabtaxi.passenger"],
    aliases: ["grab", "grab app", "com.grabtaxi.passenger"],
  },
  {
    appIds: ["com.gojek.app"],
    aliases: ["gojek", "go-jek", "com.gojek.app"],
  },
  {
    appIds: ["com.shopee.vn"],
    aliases: ["shopee", "shopee vn", "shopee vietnam", "com.shopee.vn"],
  },
  {
    appIds: ["com.shopee.th"],
    aliases: ["shopee th", "shopee thailand", "com.shopee.th"],
  },
  {
    appIds: ["com.shopee.id"],
    aliases: ["shopee id", "shopee indonesia", "com.shopee.id"],
  },
  {
    appIds: ["com.scb.phone"],
    aliases: ["scb", "scb easy", "scb thailand", "ไทยพาณิชย์", "com.scb.phone"],
  },
  {
    appIds: ["com.kasikornbank.kplus"],
    aliases: ["kbank", "k plus", "kasikorn", "kasikornbank", "com.kasikornbank.kplus"],
  },
  {
    appIds: ["com.bbl.mobilebanking"],
    aliases: ["bbl", "bangkok bank", "com.bbl.mobilebanking"],
  },
  {
    appIds: ["com.dbs.sg.dbsmbapp"],
    aliases: ["dbs", "dbs bank", "dbs singapore", "com.dbs.sg.dbsmbapp"],
  },
  {
    appIds: ["com.ocbc.mobile"],
    aliases: ["ocbc", "ocbc bank", "com.ocbc.mobile"],
  },
  {
    appIds: ["com.maybank2u.life"],
    aliases: ["maybank", "maybank2u", "maybank malaysia", "com.maybank2u.life"],
  },
  {
    appIds: ["com.bca"],
    aliases: ["bca", "bca mobile", "bank central asia", "com.bca"],
  },
  {
    appIds: ["com.globe.gcash.android"],
    aliases: ["gcash", "g cash", "com.globe.gcash.android"],
  },
  {
    appIds: ["com.twitter.android"],
    aliases: [
      "twitter",
      "x app",
      "x 11.90",
      "x version 11.90",
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
      "youtobe",
      "you tobe",
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
    appIds: ["com.adobe.lrmobile"],
    aliases: [
      "lightroom",
      "adobe lightroom",
      "lr mobile",
      "lightroom mobile",
      "lightroom下载",
      "com.adobe.lrmobile",
    ],
  },
  {
    appIds: ["com.schwab.mobile"],
    aliases: [
      "schwab",
      "schwab mobile",
      "charles schwab",
      "嘉信",
      "嘉信理财",
      "com.schwab.mobile",
    ],
  },
  {
    appIds: ["com.google.android.googlequicksearchbox"],
    aliases: ["谷歌", "google", "google app", "谷歌搜索"],
  },
  {
    appIds: ["com.apkpure.aegon"],
    aliases: ["apkpure", "apk pure", "com.apkpure.aegon"],
  },
  {
    appIds: ["org.telegram.messenger"],
    aliases: [
      "telegram",
      "飞机",
      "纸飞机",
      "小飞机",
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
      "twlegram",
      "telegrame",
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
      "bard",
      "google bard",
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
      "anthropic",
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
    aliases: ["deepseek", "deep seek", "ds", "deepseek ai", "com.deepseek.chat", "deepseek下载", "deepseek apk"],
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
    appIds: ["cloud.centaur.gojgp"],
    aliases: [
      "狗急",
      "狗急加速",
      "狗急vpn",
      "狗急加速器",
      "gouji",
      "gouji vpn",
      "goujivpn",
      "fastgouji",
      "cloud.centaur.gojgp",
      "cloud.centaur.goj",
    ],
  },
  {
    appIds: ["com.sticktoit"],
    aliases: [
      "老王",
      "老王vpn",
      "老王加速器",
      "laowang",
      "laowang vpn",
      "laowangvpn",
      "wang vpn",
      "com.sticktoit",
    ],
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
    aliases: ["淘宝", "陶宝", "taobao", "手机淘宝", "com.taobao.taobao"],
  },
  {
    appIds: ["com.eg.android.alipaygphone"],
    aliases: ["支付宝", "alipay", "com.eg.android.alipaygphone"],
  },
  {
    appIds: ["jp.naver.line.android"],
    aliases: ["line", "line下载", "line apk", "com.line", "jp.naver.line.android"],
  },
  {
    appIds: ["com.discord"],
    aliases: ["discord", "discord下载", "discord apk", "com.discord"],
  },
  {
    appIds: ["com.mysugr.android.companion"],
    aliases: ["mysugr", "my sugr", "mySugr", "com.mysugr.android.companion"],
  },
  {
    appIds: ["com.tdameritrade.thinkorswim"],
    aliases: [
      "thinkorswim",
      "think or swim",
      "td ameritrade",
      "schwab thinkorswim",
      "com.tdameritrade.thinkorswim",
    ],
  },
  {
    appIds: ["com.cvent.mobile.eventapp"],
    aliases: ["cvent", "cventevent", "cvent event", "com.cvent.mobile.eventapp"],
  },
  {
    appIds: ["com.ewbank.digital"],
    aliases: ["east west", "eastwest", "east west bank", "华美银行", "com.ewbank.digital"],
  },
  {
    appIds: ["com.mi.android.globalFileexplorer"],
    aliases: [
      "小米文件管理器",
      "小米文件",
      "文件管理器",
      "文件浏览器",
      "mi file manager",
      "xiaomi file manager",
      "com.mi.android.globalfileexplorer",
    ],
  },
  {
    appIds: ["com.ss.android.article.news"],
    aliases: ["今日头条", "头条", "toutiao", "jinritoutiao", "今日頭條"],
  },
  {
    appIds: ["com.tencent.qqlive"],
    aliases: ["腾讯视频", "tencent video", "qqlive", "com.tencent.qqlive"],
  },
  {
    appIds: ["com.ea.game.pvzfree"],
    aliases: [
      "植物大战僵尸",
      "植物大战僵尸1",
      "pvz",
      "plants vs zombies",
      "plants vs. zombies",
    ],
  },
  {
    appIds: ["com.niksoftware.snapseed"],
    aliases: [
      "snapseed",
      "snapseed 4.0",
      "snapseed 4",
      "com.niksoftware.snapseed",
      "com.snapseedapp",
    ],
  },
  {
    appIds: ["com.microsoft.teams"],
    aliases: ["teams", "microsoft teams", "ms teams", "com.microsoft.teams"],
  },
  {
    appIds: ["com.zhiliaoapp.musically"],
    aliases: ["titok", "titkok", "tiktok", "抖音国际版", "com.zhiliaoapp.musically"],
  },
  {
    appIds: ["com.flar2.devcheck"],
    aliases: ["devcheck", "dev check", "devcheck device", "com.flar2.devcheck"],
  },
  {
    appIds: ["com.tencent.map"],
    aliases: ["腾讯地图", "腾讯地图车机版", "tencent map", "com.tencent.map"],
  },
  {
    appIds: ["com.sec.android.app.music"],
    aliases: [
      "samsung music",
      "三星音乐",
      "samsung music player",
      "com.sec.android.app.music",
    ],
  },
  {
    appIds: ["com.samsung.android.app.notes"],
    aliases: ["samsung notes", "三星笔记", "s notes", "s notes samsung", "com.samsung.android.app.notes"],
  },
  {
    appIds: ["com.apple.android.music"],
    aliases: ["apple music", "苹果音乐", "com.apple.android.music"],
  },
  {
    appIds: ["bin.mt.plus"],
    aliases: ["mt管理器", "mt manager", "mt管理器2", "mt", "bin.mt.plus"],
  },
  {
    appIds: ["com.chaozh.iReaderFree", "com.zhangyue.iReader"],
    aliases: [
      "ireader",
      "掌阅",
      "ireader eink",
      "com.chaozh.ireaderfree",
      "com.zhangyue.ireader",
      "zhangyue ireader",
    ],
  },
  {
    appIds: ["com.xiaomi.mipicks"],
    aliases: ["小米", "小米应用商店", "xiaomi", "mi store", "com.xiaomi.mipicks"],
  },
  {
    appIds: ["com.alibaba.intl.android.apps.poseidon"],
    aliases: ["accio", "accio app", "com.alibaba.intl.android.apps.poseidon"],
  },
  {
    appIds: ["com.cmcc.cmvideo"],
    aliases: ["移动会议", "中国移动会议", "cmcc meeting"],
  },
  {
    appIds: ["com.google.android.youtube"],
    aliases: ["youtube", "油管", "youtube下载", "com.google.android.youtube"],
  },
  {
    appIds: ["com.google.android.apps.maps"],
    aliases: ["google maps", "谷歌地图", "com.google.android.apps.maps"],
  },
  {
    appIds: ["com.google.android.gm"],
    aliases: ["gmail", "google mail", "谷歌邮箱"],
  },
  {
    appIds: ["com.spotify.music"],
    aliases: ["spotify", "spotify下载"],
  },
  {
    appIds: ["com.netflix.mediaclient"],
    aliases: ["netflix", "奈飞"],
  },
  {
    appIds: ["com.amazon.avod.thirdpartyclient"],
    aliases: ["prime video", "amazon prime video"],
  },
  {
    appIds: ["com.facebook.katana"],
    aliases: ["facebook", "fb", "脸书"],
  },
  {
    appIds: ["com.instagram.android"],
    aliases: ["instagram", "ins", "ig"],
  },
  {
    appIds: ["com.twitter.android"],
    aliases: ["twitter", "x", "推特"],
  },
  {
    appIds: ["com.linkedin.android"],
    aliases: ["linkedin", "领英"],
  },
  {
    appIds: ["com.snapchat.android"],
    aliases: ["snapchat"],
  },
  {
    appIds: ["com.pinterest"],
    aliases: ["pinterest"],
  },
  {
    appIds: ["com.reddit.frontpage"],
    aliases: ["reddit"],
  },
  {
    appIds: ["com.whatsapp"],
    aliases: ["whatsapp", "wa"],
  },
  {
    appIds: ["org.telegram.messenger"],
    aliases: ["telegram", "电报", "tg"],
  },
  {
    appIds: ["com.tencent.mm"],
    aliases: ["微信", "wechat"],
  },
  {
    appIds: ["com.tencent.mobileqq"],
    aliases: ["qq"],
  },
  {
    appIds: ["com.sina.weibo"],
    aliases: ["微博", "weibo"],
  },
  {
    appIds: ["com.baidu.BaiduMap"],
    aliases: ["百度地图", "baidu map"],
  },
  {
    appIds: ["com.autonavi.minimap"],
    aliases: ["高德地图", "amap", "gaode"],
  },
  {
    appIds: ["com.dianping.v1"],
    aliases: ["大众点评", "dianping"],
  },
  {
    appIds: ["com.sankuai.meituan"],
    aliases: ["美团", "meituan"],
  },
  {
    appIds: ["com.jingdong.app.mall"],
    aliases: ["京东", "jd", "jingdong"],
  },
  {
    appIds: ["com.ss.android.ugc.aweme"],
    aliases: ["抖音", "douyin"],
  },
  {
    appIds: ["com.kuaishou.nebula"],
    aliases: ["快手", "kuaishou"],
  },
  {
    appIds: ["com.bilibili.app.in"],
    aliases: ["bilibili", "哔哩哔哩", "b站"],
  },
  {
    appIds: ["tv.danmaku.bili"],
    aliases: ["bilibili hd", "哔哩哔哩hd"],
  },
  {
    appIds: ["com.netease.cloudmusic"],
    aliases: ["网易云音乐", "netease music", "cloudmusic"],
  },
  {
    appIds: ["com.tencent.qqmusic"],
    aliases: ["qq音乐", "qq music"],
  },
  {
    appIds: ["com.kugou.android"],
    aliases: ["酷狗", "kugou"],
  },
  {
    appIds: ["com.kuwo.kwmusiccar"],
    aliases: ["酷我音乐", "kuwo"],
  },
  {
    appIds: ["com.UCMobile"],
    aliases: ["uc浏览器", "uc browser"],
  },
  {
    appIds: ["com.qiyi.video"],
    aliases: ["爱奇艺", "iqiyi"],
  },
  {
    appIds: ["com.youku.phone"],
    aliases: ["优酷", "youku"],
  },
  {
    appIds: ["com.hunantv.imgo.activity"],
    aliases: ["芒果tv", "mgtv"],
  },
  {
    appIds: ["com.ss.android.article.video"],
    aliases: ["西瓜视频", "xigua"],
  },
  {
    appIds: ["com.lemon.lvoverseas"],
    aliases: ["capcut", "剪映国际版", "jianying"],
  },
  {
    appIds: ["com.lemon.lv"],
    aliases: ["剪映", "capcut cn"],
  },
  {
    appIds: ["com.adobe.lrmobile"],
    aliases: ["lightroom", "lr mobile"],
  },
  {
    appIds: ["com.adobe.psmobile"],
    aliases: ["photoshop express", "ps express"],
  },
  {
    appIds: ["com.microsoft.office.outlook"],
    aliases: ["outlook", "微软邮箱"],
  },
  {
    appIds: ["com.microsoft.office.word"],
    aliases: ["word", "microsoft word"],
  },
  {
    appIds: ["com.microsoft.office.excel"],
    aliases: ["excel", "microsoft excel"],
  },
  {
    appIds: ["com.microsoft.office.powerpoint"],
    aliases: ["powerpoint", "ppt", "microsoft powerpoint"],
  },
  {
    appIds: ["com.google.android.apps.docs"],
    aliases: ["google docs", "谷歌文档"],
  },
  {
    appIds: ["com.google.android.apps.photos"],
    aliases: ["google photos", "谷歌相册"],
  },
  {
    appIds: ["com.google.android.apps.translate"],
    aliases: ["google translate", "谷歌翻译"],
  },
  {
    appIds: ["com.google.android.apps.meetings"],
    aliases: ["google meet", "meet"],
  },
  {
    appIds: ["us.zoom.videomeetings"],
    aliases: ["zoom", "zoom meeting"],
  },
  {
    appIds: ["com.skype.raider"],
    aliases: ["skype"],
  },
  {
    appIds: ["com.paypal.android.p2pmobile"],
    aliases: ["paypal"],
  },
  {
    appIds: ["com.venmo"],
    aliases: ["venmo"],
  },
  {
    appIds: ["com.cash.app"],
    aliases: ["cash app"],
  },
  {
    appIds: ["com.chase.sig.android"],
    aliases: ["chase", "chase bank"],
  },
  {
    appIds: ["com.bankofamerica.prepaid"],
    aliases: ["bank of america", "bofa"],
  },
  {
    appIds: ["com.wellsfargo.mobile"],
    aliases: ["wells fargo"],
  },
  {
    appIds: ["com.coinbase.android"],
    aliases: ["coinbase"],
  },
  {
    appIds: ["com.binance.dev"],
    aliases: ["binance", "币安"],
  },
  {
    appIds: ["com.roblox.client"],
    aliases: ["roblox"],
  },
  {
    appIds: ["com.mojang.minecraftpe"],
    aliases: ["minecraft", "我的世界"],
  },
  {
    appIds: ["com.supercell.clashofclans"],
    aliases: ["clash of clans", "部落冲突"],
  },
  {
    appIds: ["com.supercell.clashroyale"],
    aliases: ["clash royale", "皇室战争"],
  },
  {
    appIds: ["com.tencent.ig"],
    aliases: ["pubg", "和平精英", "pubg mobile"],
  },
  {
    appIds: ["com.garena.game.codm"],
    aliases: ["cod mobile", "使命召唤手游"],
  },
  {
    appIds: ["com.mobile.legends"],
    aliases: ["mobile legends", "mlbb"],
  },
  {
    appIds: ["com.activision.callofduty.shooter"],
    aliases: ["call of duty", "cod warzone mobile"],
  },
  {
    appIds: ["com.ea.gp.fifamobile"],
    aliases: ["fifa mobile", "fc mobile"],
  },
  {
    appIds: ["com.nianticlabs.pokemongo"],
    aliases: ["pokemon go"],
  },
  {
    appIds: ["com.nintendo.zara"],
    aliases: ["nintendo switch app"],
  },
  {
    appIds: ["com.duolingo"],
    aliases: ["duolingo", "多邻国"],
  },
  {
    appIds: ["com.google.android.apps.classroom"],
    aliases: ["google classroom", "课堂"],
  },
  {
    appIds: ["com.coursera.android"],
    aliases: ["coursera"],
  },
  {
    appIds: ["com.udemy.android"],
    aliases: ["udemy"],
  },
  {
    appIds: ["com.amazon.kindle"],
    aliases: ["kindle"],
  },
  {
    appIds: ["com.audible.application"],
    aliases: ["audible"],
  },
  {
    appIds: ["com.waze"],
    aliases: ["waze"],
  },
  {
    appIds: ["com.ubercab"],
    aliases: ["uber"],
  },
  {
    appIds: ["com.lyft.android"],
    aliases: ["lyft"],
  },
  {
    appIds: ["com.dd.doordash"],
    aliases: ["doordash"],
  },
  {
    appIds: ["com.ubercab.eats"],
    aliases: ["uber eats"],
  },
  {
    appIds: ["com.grubhub.android"],
    aliases: ["grubhub"],
  },
  {
    appIds: ["com.airbnb.android"],
    aliases: ["airbnb", "爱彼迎"],
  },
  {
    appIds: ["com.booking"],
    aliases: ["booking", "booking.com"],
  },
  {
    appIds: ["com.tripadvisor.tripadvisor"],
    aliases: ["tripadvisor"],
  },
  {
    appIds: ["com.expedia.bookings"],
    aliases: ["expedia"],
  },
  {
    appIds: ["com.ubercab.uberlite"],
    aliases: ["uber lite"],
  },
  {
    appIds: ["com.google.android.apps.walletnfcrel"],
    aliases: ["google wallet", "google pay"],
  },
  {
    appIds: ["com.samsung.android.spay"],
    aliases: ["samsung pay"],
  },
  {
    appIds: ["com.huawei.wallet"],
    aliases: ["huawei wallet"],
  },
  {
    appIds: ["com.miui.securitycenter"],
    aliases: ["小米手机管家", "miui security"],
  },
  {
    appIds: ["com.google.android.apps.nbu.files"],
    aliases: ["files by google", "谷歌文件"],
  },
  {
    appIds: ["com.google.android.calculator"],
    aliases: ["google calculator", "计算器"],
  },
  {
    appIds: ["com.google.android.deskclock"],
    aliases: ["google clock", "时钟"],
  },
  {
    appIds: ["com.google.android.contacts"],
    aliases: ["google contacts", "通讯录"],
  },
  {
    appIds: ["com.android.chrome"],
    aliases: ["chrome", "谷歌浏览器"],
  },
  {
    appIds: ["org.mozilla.firefox"],
    aliases: ["firefox", "火狐"],
  },
  {
    appIds: ["com.brave.browser"],
    aliases: ["brave browser"],
  },
  {
    appIds: ["com.opera.browser"],
    aliases: ["opera"],
  },
  {
    appIds: ["com.microsoft.emmx"],
    aliases: ["edge", "microsoft edge"],
  },
  {
    appIds: ["com.duckduckgo.mobile.android"],
    aliases: ["duckduckgo", "ddg"],
  },
  {
    appIds: ["com.termux"],
    aliases: ["termux"],
  },
  {
    appIds: ["com.github.android"],
    aliases: ["github", "github mobile"],
  },
  {
    appIds: ["com.slack"],
    aliases: ["slack"],
  },
  {
    appIds: ["com.todoist"],
    aliases: ["todoist"],
  },
  {
    appIds: ["com.notion.id"],
    aliases: ["notion"],
  },
  {
    appIds: ["com.evernote"],
    aliases: ["evernote", "印象笔记"],
  },
  {
    appIds: ["com.trello"],
    aliases: ["trello"],
  },
  {
    appIds: ["com.asana.app"],
    aliases: ["asana"],
  },
  {
    appIds: ["com.dropbox.android"],
    aliases: ["dropbox"],
  },
  {
    appIds: ["com.box.android"],
    aliases: ["box"],
  },
  {
    appIds: ["com.microsoft.skydrive"],
    aliases: ["onedrive"],
  },
  {
    appIds: ["com.google.android.apps.docs.editors.sheets"],
    aliases: ["google sheets", "谷歌表格"],
  },
  {
    appIds: ["com.google.android.apps.docs.editors.slides"],
    aliases: ["google slides", "谷歌幻灯片"],
  },
  {
    appIds: ["com.adobe.reader"],
    aliases: ["adobe acrobat", "pdf reader"],
  },
  {
    appIds: ["com.camscanner.documentscanner"],
    aliases: ["camscanner", "扫描全能王"],
  },
  {
    appIds: ["com.intsig.camscanner"],
    aliases: ["camscanner intsig"],
  },
  {
    appIds: ["com.wondershare.filmorago"],
    aliases: ["filmora", "filmorago"],
  },
  {
    appIds: ["com.vsco.cam"],
    aliases: ["vsco"],
  },
  {
    appIds: ["com.picsart.studio"],
    aliases: ["picsart"],
  },
  {
    appIds: ["com.canva.editor"],
    aliases: ["canva"],
  },
  {
    appIds: ["com.shazam.android"],
    aliases: ["shazam"],
  },
  {
    appIds: ["com.soundcloud.android"],
    aliases: ["soundcloud"],
  },
  {
    appIds: ["com.deezer"],
    aliases: ["deezer"],
  },
  {
    appIds: ["com.pandora.android"],
    aliases: ["pandora"],
  },
  {
    appIds: ["com.tidal"],
    aliases: ["tidal"],
  },
  {
    appIds: ["com.amazon.mp3"],
    aliases: ["amazon music"],
  },
  {
    appIds: ["com.google.android.apps.youtube.music"],
    aliases: ["youtube music", "yt music"],
  },
  {
    appIds: ["com.google.android.youtube.tv"],
    aliases: ["youtube tv"],
  },
  {
    appIds: ["com.google.android.apps.youtube.kids"],
    aliases: ["youtube kids"],
  },
  {
    appIds: ["com.google.android.apps.youtube.creator"],
    aliases: ["youtube studio"],
  },
  {
    appIds: ["com.google.android.apps.adm"],
    aliases: ["find my device", "查找我的设备"],
  },
  {
    appIds: ["com.google.android.apps.authenticator2"],
    aliases: ["google authenticator", "谷歌验证器"],
  },
  {
    appIds: ["com.authy.authy"],
    aliases: ["authy"],
  },
  {
    appIds: ["com.lastpass.lpandroid"],
    aliases: ["lastpass"],
  },
  {
    appIds: ["com.onepassword.android"],
    aliases: ["1password", "onepassword"],
  },
  {
    appIds: ["com.bitwarden.app"],
    aliases: ["bitwarden"],
  },
  {
    appIds: ["com.openai.chatgpt"],
    aliases: ["chatgpt", "gpt", "openai"],
  },
  {
    appIds: ["com.anthropic.claude"],
    aliases: ["claude", "anthropic"],
  },
  {
    appIds: ["com.google.android.apps.bard"],
    aliases: ["gemini", "google gemini", "bard"],
  },
  {
    appIds: ["com.microsoft.copilot"],
    aliases: ["copilot", "microsoft copilot", "bing chat"],
  },
  {
    appIds: ["com.deepseek.chat"],
    aliases: ["deepseek", "深度求索"],
  },
  {
    appIds: ["com.larus.nova"],
    aliases: ["豆包", "doubao"],
  },
  {
    appIds: ["com.moonshot.kimichat"],
    aliases: ["kimi", "月之暗面"],
  },
  {
    appIds: ["com.alibaba.aliyun"],
    aliases: ["通义", "qwen", "千问"],
  },
  {
    appIds: ["com.tencent.hunyuan.app.chat"],
    aliases: ["腾讯元宝", "元宝", "hunyuan"],
  },
  {
    appIds: ["com.baidu.newapp"],
    aliases: ["文心一言", "ernie bot"],
  },
  {
    appIds: ["com.iflytek.spark"],
    aliases: ["讯飞星火", "spark"],
  },
  {
    appIds: ["com.zhipuai.qingyan"],
    aliases: ["智谱清言", "chatglm"],
  },
  {
    appIds: ["com.miniclip.eightballpool"],
    aliases: ["8 ball pool", "台球"],
  },
  {
    appIds: ["com.king.candycrushsaga"],
    aliases: ["candy crush", "糖果传奇"],
  },
  {
    appIds: ["com.king.candycrushsodasaga"],
    aliases: ["candy crush soda"],
  },
  {
    appIds: ["com.outfit7.mytalkingtom2"],
    aliases: ["talking tom", "会说话的汤姆猫"],
  },
  {
    appIds: ["com.rovio.baba"],
    aliases: ["angry birds", "愤怒的小鸟"],
  },
  {
    appIds: ["com.gameloft.android.ANMP.GloftA8HM"],
    aliases: ["asphalt", "狂野飙车"],
  },
  {
    appIds: ["com.ea.game.simcitymobile_row"],
    aliases: ["simcity", "模拟城市"],
  },
  {
    appIds: ["com.supercell.brawlstars"],
    aliases: ["brawl stars", "荒野乱斗"],
  },
  {
    appIds: ["com.miHoYo.GenshinImpact"],
    aliases: ["genshin", "原神", "genshin impact"],
  },
  {
    appIds: ["com.HoYoverse.hkrpgoversea"],
    aliases: ["honkai star rail", "星穹铁道"],
  },
  {
    appIds: ["com.HoYoverse.Nap"],
    aliases: ["zenless zone zero", "绝区零"],
  },
  {
    appIds: ["com.lilithgames.roc.gp"],
    aliases: ["rise of kingdoms", "万国觉醒"],
  },
  {
    appIds: ["com.igg.android.lordsmobile"],
    aliases: ["lords mobile", "王国纪元"],
  },
  {
    appIds: ["com.kingsgroup.sos"],
    aliases: ["state of survival"],
  },
  {
    appIds: ["com.plarium.raidlegends"],
    aliases: ["raid shadow legends"],
  },
  {
    appIds: ["com.playrix.township"],
    aliases: ["township", "梦想城镇"],
  },
  {
    appIds: ["com.playrix.gardenscapes"],
    aliases: ["gardenscapes", "梦幻花园"],
  },
  {
    appIds: ["com.playrix.homescapes"],
    aliases: ["homescapes", "梦幻家园"],
  },
  {
    appIds: ["com.vitastudio.solitaire"],
    aliases: ["solitaire", "纸牌"],
  },
  {
    appIds: ["com.kiloo.subwaysurf"],
    aliases: ["subway surfers", "地铁跑酷"],
  },
  {
    appIds: ["com.imangi.templerun2"],
    aliases: ["temple run", "神庙逃亡"],
  },
  {
    appIds: ["com.halfbrick.fruitninjafree"],
    aliases: ["fruit ninja", "水果忍者"],
  },
  {
    appIds: ["com.robtopx.geometryjumplite"],
    aliases: ["geometry dash", "几何冲刺"],
  },
  {
    appIds: ["com.fingersoft.hillclimb"],
    aliases: ["hill climb racing", "登山赛车"],
  },
  {
    appIds: ["com.outfit7.mytalkingangela2"],
    aliases: ["talking angela", "会说话的安吉拉"],
  },
  {
    appIds: ["com.outfit7.mytalkingtomfriends"],
    aliases: ["talking tom friends"],
  },
  {
    appIds: ["com.ea.game.pvz2_row"],
    aliases: ["植物大战僵尸2", "pvz2"],
  },
  {
    appIds: ["com.popcap.pvz2cthd360"],
    aliases: ["植物大战僵尸融合版", "pvz fusion"],
  },
  {
    appIds: ["org.freekiosk.kioskbrowser"],
    aliases: ["freekiosk", "free kiosk", "freekiosk kiosk browser"],
  },
  {
    appIds: ["com.samsung.android.oneconnect"],
    aliases: ["samsung", "smartthings", "三星"],
  },
  {
    appIds: ["com.nintendo.zaca"],
    aliases: [
      "pocket camp",
      "animal crossing pocket camp",
      "口袋营地",
      "动物森友会口袋营地",
    ],
  },
  {
    appIds: ["com.nhn.android.nmap"],
    aliases: ["naver map", "naver maps", "네이버지도", "韩国地图"],
  },
  {
    appIds: ["com.naver.labs.translator"],
    aliases: ["papago", "papago translate", "파파고"],
  },
  {
    appIds: ["com.tencent.tmgp.sgame"],
    aliases: ["王者荣耀", "王者", "honor of kings", "aov"],
  },
  {
    appIds: ["com.v2ray.ang"],
    aliases: ["v2ray", "v2rayng", "v2ray ng"],
  },
  {
    appIds: ["com.tencent.wetype"],
    aliases: ["微信输入法", "wetype", "wechat keyboard"],
  },
  {
    appIds: ["org.aurora.store"],
    aliases: ["aurora store", "aurora", "极光商店"],
  },
  {
    appIds: ["com.android.vending"],
    aliases: ["google play", "play store", "play商店", "谷歌商店"],
  },
  {
    appIds: ["com.newleaf.app.android.victor"],
    aliases: ["reelshort", "reel short"],
  },
  {
    appIds: ["com.mobilshobe.birbank"],
    aliases: ["birbank", "bir bank"],
  },
  {
    appIds: ["xyz.bluesky.android"],
    aliases: ["bluesky", "blue sky", "bsky"],
  },
  {
    appIds: ["com.taobao.idlefish"],
    aliases: ["闲鱼", "xianyu", "idlefish", "com.taobao.idlefish"],
  },
  {
    appIds: ["uk.co.bbc.learningenglish"],
    aliases: [
      "bbc learning english",
      "bbc learning",
      "bbc english",
      "bbc learn english",
    ],
  },
  {
    appIds: ["com.giffgaff.mobile"],
    aliases: ["giffgaff"],
  },
  {
    appIds: ["com.netgear.orbi"],
    aliases: ["orbi", "netgear orbi"],
  },
  {
    appIds: ["com.avira.android"],
    aliases: ["小红伞", "avira", "avira antivirus", "小紅傘"],
  },
  {
    appIds: ["com.kugou.android"],
    aliases: [
      "酷狗",
      "酷狗音乐",
      "酷狗车机版",
      "酷狗音乐车机版",
      "酷狗音乐车机版3.5",
      "kugou",
    ],
  },
  {
    appIds: ["com.openai.chatgpt"],
    aliases: ["codex", "openai codex"],
  },
  {
    appIds: ["com.niksoftware.snapseed"],
    aliases: ["snapseed", "snapseed 4.0", "snap seed"],
  },
  {
    appIds: ["com.coros.coros"],
    aliases: ["coros", "com.coros"],
  },
];

/** Wrong or truncated Play package ids from pasted URLs → canonical id */
const PLAY_PACKAGE_ID_ALIASES: Readonly<Record<string, string>> = {
  "org.carnets": "com.spisoft.quicknote",
  "com.junote.junote": "com.fau.jupyternotebook",
  "cloud.centaur.goj": "cloud.centaur.gojgp",
  "com.snapseedapp": "com.niksoftware.snapseed",
  "com.snpaseedapp": "com.niksoftware.snapseed",
  "ireader_smart6pro_eink.apk": "com.chaozh.iReaderFree",
  "ireader_smart6pro_eink": "com.chaozh.iReaderFree",
  "com.chaozh.ireaderfree": "com.chaozh.iReaderFree",
  "com.zhangyue.ireader": "com.zhangyue.iReader",
  "com.apple.android.music_5.2.1": "com.apple.android.music",
  "com.eg.android.alipaygphone": "com.eg.android.alipaygphone",
  "bluesky.app": "xyz.bluesky.android",
  "com.coros": "com.coros.coros",
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

/** e.g. "vietcom" → vietcombank when only one appId matches prefix aliases. */
function resolveByUniquePrefixAlias(stripped: string): readonly string[] | null {
  if (stripped.length < 3 || isCjkAlias(stripped)) return null;

  const byAppIds = new Map<string, readonly string[]>();

  for (const alias of SORTED_ALIAS_KEYS) {
    if (alias.length < stripped.length) continue;
    if (!alias.startsWith(stripped)) continue;

    const appIds = SEARCH_ALIAS_APP_IDS[alias];
    if (!appIds?.length) continue;
    byAppIds.set(appIds.join("\0"), appIds);
  }

  if (byAppIds.size === 1) return [...byAppIds.values()][0]!;
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
  const contained = resolveByLongestContainedAlias(stripped);
  if (contained?.length) return contained;

  return resolveByUniquePrefixAlias(stripped);
}
