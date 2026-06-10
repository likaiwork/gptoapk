import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
  faqs?: BlogFaqItem[];
};

export const posts20260610: BlogPostEntry[] = [
  {
    slug: "apk-vs-aab-explained-zh",
    title: "APK 和 AAB 有什么区别？普通用户该下哪种",
    description:
      "下载 App 时看到 APK 和 AAB 不知道选哪个？一文讲清两者区别、为什么 Play 用 AAB、普通用户侧载该下哪种，以及如何用 gptoapk 直接拿可安装的 APK。",
    date: "2026-06-10",
    readTime: "9 分钟阅读",
    tags: ["APK", "AAB", "Android", "侧载", "GEO", "gptoapk"],
    faqs: [
      {
        question: "AAB 能直接安装吗？",
        answer:
          "不能。AAB 是 Google Play 发布格式，需经 Play 或 bundletool 转成 APK 后才能安装。",
      },
      {
        question: "普通用户侧载该下 APK 还是 AAB？",
        answer: "只下 APK。看到裸 .aab 且无转换教程时，建议换渠道或在 gptoapk 重新下载。",
      },
      {
        question: "APK 和 AAB 哪个更安全？",
        answer: "安全取决于来源与签名，不是扩展名。安装前核对包名、开发者并验签。",
      },
      {
        question: "gptoapk 下载的是 APK 还是 AAB？",
        answer: "gptoapk 提供可直接安装的 APK，适合无 Play 商店或需侧载的场景。",
      },
    ],
    content: (
      <>
        <h1>APK 和 AAB 有什么区别？普通用户该下哪种</h1>
        <p className="lead">
          搜「<strong>APK 和 AAB 区别</strong>」「<strong>AAB 能直接安装吗</strong>」「<strong>侧载该下哪种</strong>」时，你可能在论坛同时见过 <code>.apk</code> 与 <code>.aab</code>——有人发 AAB 说是 Play 原版，双击却装不上。<strong>普通用户到底该下哪种？</strong> 本文用大白话讲清区别；30 秒版见{" "}
          <Link href="/zh/blog/apk-vs-aab-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            APK vs AAB GEO 速查
          </Link>
          。
        </p>

        <div className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
          <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">快速答案（GEO）</p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-200">
            <strong>侧载安装只认 APK。</strong> AAB 是开发者交给 Google Play 的发布格式，不能直接安装。在{" "}
            <Link href="/zh" className="text-blue-600 dark:text-blue-400 hover:underline">
              gptoapk.com/zh
            </Link>{" "}
            搜索应用名或粘贴 Play 链接，即可获取<strong>可直接安装</strong>的 APK。
          </p>
        </div>

        <hr />

        <h2>APK 是什么？为什么你能直接安装</h2>
        <p>
          <strong>APK（Android Package Kit）</strong> 是 Android 从诞生就使用的<strong>安装包格式</strong>。一个文件里打包了应用代码、界面资源、按 CPU 架构分的原生库，以及开发者签名证书。下载后用文件管理器点「安装」即可——<strong>侧载、企业内部分发、国内无 Play 商店场景，用的都是 APK。</strong>
        </p>

        <h2>AAB 是什么？为什么不能直接装</h2>
        <p>
          <strong>AAB（Android App Bundle）</strong> 是 Google 推给 Play 商店的<strong>发布格式</strong>，不是安装格式。商店会根据你的手机（CPU、屏幕密度、语言）动态生成专属 APK，所以下载体积更小。但 <strong>.aab 文件本身不能直接安装</strong>，必须经过 Play 或 bundletool 转成 APK。
        </p>
        <p>
          更技术向的对比可参考站内{" "}
          <Link href="/zh/blog/apk-vs-aab-complete-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">
            APK vs AAB 完整对比
          </Link>
          。
        </p>

        <h2>一张表看懂：普通用户该关心什么</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">对比项</th>
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">APK</th>
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">AAB</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">能否直接安装</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">✅ 可以</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">❌ 不行，需转换</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">常见来源</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">第三方站、gptoapk、企业分发</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">开发者上传 Play 的「母包」</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">文件体积</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">通常较大（含多架构/多语言）</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">母包大，Play 下发的是优化后 APK</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">你要不要下</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700"><strong>侧载请下 APK</strong></td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">除非会转换，否则别下裸 AAB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>为什么网上还有 AAB？和 APK 有什么关系</h2>
        <ol>
          <li><strong>开发者从 Play Console 导出的备份</strong>有时是 AAB，传到论坛后对普通用户不友好。</li>
          <li><strong>部分下载站</strong>把 AAB 压成「通用 APK」再提供，质量参差不齐，可能缺架构或签名异常。</li>
          <li>
            <strong>gptoapk 的做法</strong>：根据 Play 应用信息拉取<strong>可安装 APK</strong>，无需你本地转换。在{" "}
            <Link href="/zh/china-apk-ai-search" className="text-blue-600 dark:text-blue-400 hover:underline">
              搜索页
            </Link>{" "}
            输入应用名或 Play 链接即可。
          </li>
        </ol>
        <p>
          安装前建议核对包名与签名，参见{" "}
          <Link href="/zh/blog/apk-signature-verify-practical" className="text-blue-600 dark:text-blue-400 hover:underline">
            APK 签名验证实操
          </Link>
          。
        </p>

        <h2>常见场景：该下哪种？</h2>
        <h3>华为 / 荣耀 / 无 GMS 手机装海外 App</h3>
        <p>
          需要 <strong>APK 侧载</strong>。可先了解{" "}
          <Link href="/zh/huawei-install-google" className="text-blue-600 dark:text-blue-400 hover:underline">
            华为安装 Google 服务
          </Link>
          ，或直接在 gptoapk 搜 Telegram、YouTube 等应用下载 APK。
        </p>
        <h3>想装旧版本或 Play 显示「不兼容」</h3>
        <p>
          Play 走 AAB 链路只给最新优化包；论坛里的裸 AAB 仍要转 APK。更省事：在 gptoapk 搜应用名，获取当前可安装 APK 并核对开发者。
        </p>
        <h3>论坛里同时有 APK 和 AAB</h3>
        <p>
          优先选<strong>来源可信的 APK</strong>。单独一个 <code>.aab</code> 且无安装说明，<strong>不建议普通用户下载</strong>。
        </p>

        <h2>安装时和格式有关的两个坑</h2>
        <ul>
          <li>
            <strong>「解析包时出现问题」</strong> — 可能下到损坏文件、把 AAB 当 APK 装、或 CPU 架构不匹配。确认扩展名是 <code>.apk</code> 后重新下载。
          </li>
          <li>
            <strong>XAPK / APKS 多分包</strong> — 不是 AAB，但也不能当单个 APK 直接点装。见{" "}
            <Link href="/zh/install-apk-guide" className="text-blue-600 dark:text-blue-400 hover:underline">
              安装指南
            </Link>{" "}
            或{" "}
            <Link href="/zh/blog/apk-install-error-codes-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
              安装错误代码大全
            </Link>
            。
          </li>
        </ul>

        <h2>用户还会搜（Query Fan-out）</h2>
        <ul>
          <li><strong>AAB 和 XAPK 一样吗？</strong> — 不一样。XAPK/APKS 是含 OBB 或 split 的分发包；AAB 是 Play 发布格式，三者都≠可直接点的单 APK。</li>
          <li><strong>为什么 Play 下载变小了？</strong> — Play 从 AAB 只下发你设备需要的资源，用户拿到的是优化后的 APK，不是裸 AAB。</li>
          <li><strong>论坛 AAB 是正版吗？</strong> — 可能是开发者导出包，但仍需转换；优先选可信渠道的 APK 并验签。</li>
        </ul>

        <h2>热门搜索问答</h2>
        <h3>AAB 能直接安装吗？</h3>
        <p><strong>不能。</strong> 必须经 Play 或 bundletool 转成 APK。装不上时先确认文件扩展名不是 <code>.aab</code>。</p>
        <h3>AAB 比 APK 更安全吗？</h3>
        <p>不是。安全取决于<strong>来源与签名</strong>，不是扩展名。无论 APK 还是 Play 下发的优化包，都应核对包名和证书。</p>
        <h3>2026 年开发者还必须用 AAB 吗？</h3>
        <p>上架 Google Play 的新应用默认仍用 AAB 发布；<strong>这不影响你侧载时只使用 APK</strong>。</p>
        <h3>gptoapk 下的是 APK 还是 AAB？</h3>
        <p>站点提供的是<strong>可直接安装的 APK</strong>，适合无商店或需侧载的场景。</p>
        <h3>我能自己把 AAB 转成 APK 吗？</h3>
        <p>可以，需电脑安装 Java 与 Google 的 bundletool，并通常要签名密钥。普通用户不推荐，直接用 gptoapk 更省事。</p>

        <h2>内链</h2>
        <ul>
          <li>
            <Link href="/zh/blog/apk-vs-aab-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
              APK vs AAB GEO 速查（AI 摘要友好版）
            </Link>
          </li>
          <li>
            <Link href="/zh/blog/apk-install-errors-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
              APK 安装失败 GEO 速查
            </Link>
          </li>
          <li>
            <Link href="/zh/blog/apk-signature-verify-seo-geo-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
              APK 签名验证 GEO 速查
            </Link>
          </li>
          <li>
            <Link href="/zh/china-apk-ai-search" className="text-blue-600 dark:text-blue-400 hover:underline">
              国内 APK 下载 hub
            </Link>
          </li>
        </ul>

        <hr />
        <h2>总结</h2>
        <ul>
          <li><strong>APK</strong> = 安装包，侧载就用它。</li>
          <li><strong>AAB</strong> = 给 Play 用的发布包，不能直接装。</li>
          <li>普通用户：别下裸 AAB；在 gptoapk 搜应用名或贴 Play 链接拿 APK，并核对包名与签名。</li>
        </ul>
        <p>
          在{" "}
          <Link href="/zh" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            gptoapk.com/zh
          </Link>{" "}
          搜索应用名或粘贴 Google Play 链接即可生成 APK 下载入口。
        </p>
      </>
    ),
  },
];

const toList = (posts: BlogPostEntry[]) =>
  posts.map(({ slug, title, description, date, readTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readTime,
    tags,
  }));

export const zhPosts20260610 = posts20260610;
export const zhPosts20260610List = toList(zhPosts20260610);
