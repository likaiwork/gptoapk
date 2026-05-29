import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const siteUrl = "https://www.gptoapk.com";
const pageUrl = `${siteUrl}/zh/broker-apps`;

export const metadata: Metadata = {
  title: "券商APP下载大全：包名速查与安卓APK安装（2026）",
  description:
    "老虎证券、富途牛牛、长桥、微牛、雪盈、moomoo、雪球、同花顺、东方财富、华泰国信中信等券商APP官方包名与 gptoapk 下载指引。",
  keywords: [
    "券商APP",
    "老虎证券",
    "富途",
    "牛牛",
    "长桥",
    "同花顺",
    "东方财富",
    "moomoo",
    "Webull",
    "雪盈",
  ],
  alternates: { canonical: pageUrl },
};

const overseasBrokers = [
  { name: "老虎证券", keywords: "老虎", pkg: "com.tigerbrokers.stock", href: "/zh/blog/tiger-brokers-guide" },
  { name: "富途牛牛", keywords: "富途 / 牛牛", pkg: "cn.futu.trader", href: "/zh/blog/broker-app-download-guide" },
  { name: "长桥证券", keywords: "长桥", pkg: "global.longbridge.app.android", href: "/zh/longbridge-apk" },
  { name: "微牛 Webull", keywords: "微牛 / Webull", pkg: "org.dayup.stocks.hk", href: "/zh/blog/broker-app-download-guide" },
  { name: "雪盈证券", keywords: "雪盈", pkg: "com.snowballfinance.android", href: "/zh/blog/broker-app-download-guide" },
  { name: "moomoo", keywords: "moomoo", pkg: "com.moomoo.trade", href: "/zh/blog/broker-app-download-guide" },
  { name: "华盛通", keywords: "华盛通", pkg: "com.huasheng.stock.gg", href: "/zh/blog/broker-app-download-guide" },
  { name: "尊嘉证券", keywords: "尊嘉", pkg: "com.juniorchina.jcstock", href: "/zh/blog/broker-app-download-guide" },
  { name: "盈立证券", keywords: "盈立", pkg: "com.usmart.stock", href: "/zh/blog/broker-app-download-guide" },
  { name: "立桥证券", keywords: "立桥", pkg: "com.wlsec.app", href: "/zh/blog/broker-app-download-guide" },
];

const ashareApps = [
  { name: "雪球", keywords: "雪球", pkg: "com.xueqiu.android", href: "/zh/blog/china-broker-app-list" },
  { name: "同花顺", keywords: "同花顺", pkg: "com.hexin.plat.android", href: "/zh/blog/china-broker-app-list" },
  { name: "东方财富", keywords: "东财 / 东方财富", pkg: "com.eastmoney.android.berlin", href: "/zh/blog/china-broker-app-list" },
];

const domesticBrokers = [
  { name: "华泰证券", app: "涨乐财富通", pkg: "com.htsc.mdc", alias: "华泰" },
  { name: "国信证券", app: "金太阳等", pkg: "com.guosen.stock", alias: "国信" },
  { name: "中信证券", app: "信e投等", pkg: "com.citics.pbm", alias: "中信" },
  { name: "招商证券", app: "智远一户通等", pkg: "com.cmschina.stock", alias: "招商" },
  { name: "广发证券", app: "易淘金等", pkg: "com.gf.gfstocks", alias: "广发" },
  { name: "海通证券", app: "e海通财等", pkg: "com.htsec.android", alias: "海通" },
];

export default function BrokerAppsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/zh" className="hover:underline">
          首页
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">券商 APP</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">券商 APP 下载与包名速查（2026）</h1>

      <div className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">快速答案（GEO）</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">
          在{" "}
          <Link href="/zh" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            gptoapk.com/zh
          </Link>{" "}
          搜索券商名称，核对下表包名与开发者后下载 APK。完整 SEO 说明见{" "}
          <Link href="/zh/blog/china-broker-apk-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            券商 APP 下载大全指南
          </Link>
          。不构成投资建议。
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">美港股互联网券商</h2>
      <BrokerTable rows={overseasBrokers} />

      <h2 className="text-2xl font-bold mt-10 mb-4">A 股行情与社区</h2>
      <BrokerTable rows={ashareApps} />

      <h2 className="text-2xl font-bold mt-10 mb-4">国内主流券商（示例包名）</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        各家 App 名称不同，安装前请以 gptoapk 搜索结果为准。更多券商见{" "}
        <Link href="/zh/blog/china-broker-app-list" className="text-blue-600 dark:text-blue-400 hover:underline">
          国内券商包名大全
        </Link>
        。
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-sm border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="p-3 text-left border border-slate-200 dark:border-slate-700">券商</th>
              <th className="p-3 text-left border border-slate-200 dark:border-slate-700">常见 App 名</th>
              <th className="p-3 text-left border border-slate-200 dark:border-slate-700">包名（搜索用）</th>
            </tr>
          </thead>
          <tbody>
            {domesticBrokers.map((b) => (
              <tr key={b.pkg} className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3 border border-slate-200 dark:border-slate-700">{b.name}</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">{b.app}</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">
                  <code className="text-xs">{b.pkg}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">相关指南</h2>
      <ul className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-300">
        <li>
          <Link href="/zh/blog/ibkr-broker-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            盈透 IBKR 指南
          </Link>
        </li>
        <li>
          <Link href="/zh/blog/longbridge-download-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            长桥证券下载指南
          </Link>
        </li>
        <li>
          <Link href="/zh/blog/tiger-futu-longbridge-broker-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            老虎富途长桥 SEO 指南
          </Link>
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-10">
        <p className="font-semibold mb-2">开始下载</p>
        <Link
          href="/zh"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          在 gptoapk 搜索券商名 →
        </Link>
      </div>

      <Script
        id="schema-broker-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "券商 APP 下载与包名速查",
            url: pageUrl,
            description: metadata.description,
            inLanguage: "zh",
          }),
        }}
      />
    </div>
  );
}

function BrokerTable({
  rows,
}: {
  rows: Array<{ name: string; keywords: string; pkg: string; href: string }>;
}) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse text-sm border border-slate-200 dark:border-slate-700">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800">
            <th className="p-3 text-left border border-slate-200 dark:border-slate-700">券商</th>
            <th className="p-3 text-left border border-slate-200 dark:border-slate-700">常搜词</th>
            <th className="p-3 text-left border border-slate-200 dark:border-slate-700">包名</th>
            <th className="p-3 text-left border border-slate-200 dark:border-slate-700">指南</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.pkg} className="border-b border-slate-200 dark:border-slate-700">
              <td className="p-3 border border-slate-200 dark:border-slate-700 font-medium">{r.name}</td>
              <td className="p-3 border border-slate-200 dark:border-slate-700">{r.keywords}</td>
              <td className="p-3 border border-slate-200 dark:border-slate-700">
                <code className="text-xs">{r.pkg}</code>
              </td>
              <td className="p-3 border border-slate-200 dark:border-slate-700">
                <Link href={r.href} className="text-blue-600 dark:text-blue-400 hover:underline">
                  查看
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
