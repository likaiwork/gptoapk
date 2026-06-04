import type { ReactNode } from "react";
import Link from "next/link";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
};

export const posts20260604: BlogPostEntry[] = [
  {
    slug: "apk-signature-verify-practical",
    title: "如何验证 APK 签名：防止下载到假包（2026 实操教程）",
    description:
      "APK 签名怎么验证？用手机 MT 管理器、NP 管理器或电脑 apksigner/jarsigner 核对证书 SHA-256，识别假包、改包与签名冲突，侧载前必做安全检查。",
    date: "2026-06-04",
    readTime: "12 分钟阅读",
    tags: ["APK 签名", "APK 验签", "假包识别", "安卓安全", "gptoapk"],
    content: (
      <>
        <h1>如何验证 APK 签名：防止下载到假包（2026 实操教程）</h1>
        <p className="lead">
          很多人下载 APK 时只看图标和名字，结果装上了<strong>钓鱼包</strong>或<strong>改包</strong>——图标一样，包名却差一个字母，权限却要多读短信和通讯录。Android 用<strong>数字证书签名</strong>标识「是谁发布的这个 App」；验证签名，就是在安装前确认「这份 APK 是否来自你信任的那个开发者」。
        </p>

        <div className="mb-8 border-l-4 border-emerald-600 bg-emerald-50 p-5 dark:bg-emerald-950/30">
          <p className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">快速答案</p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-200">
            下载前在{" "}
            <Link href="/zh" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              gptoapk.com/zh
            </Link>{" "}
            核对<strong>包名 + 开发者</strong>；安装前用 MT 管理器查看 APK 签名证书 SHA-256，与 Play 商店已装版或官方文档对比。签名不一致 = 不要装，或先卸载旧版再覆盖。
          </p>
        </div>

        <hr />

        <h2>为什么 APK 签名这么重要？</h2>
        <p>每个 APK 在打包时都会用开发者的私钥签名。系统在安装和更新时会检查：</p>
        <ul>
          <li><strong>同一包名</strong>的新版本，必须与旧版<strong>同一签名</strong>才能覆盖安装；</li>
          <li>签名不同会提示「与现有应用签名不同」，或静默安装失败；</li>
          <li>恶意软件常仿冒图标，但<strong>无法伪造正版私钥</strong>，证书指纹一对照就会露馅。</li>
        </ul>
        <p>
          更全面的假包识别思路见{" "}
          <Link href="/zh/blog/apk-safe-download-security-guide-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            APK 下载安全与防骗指南
          </Link>
          。
        </p>

        <h2>第一步：下载前核对包名与开发者（零工具）</h2>
        <p>这是最快的一道防线，适合所有用户：</p>
        <ol>
          <li>
            打开{" "}
            <Link href="/zh/china-apk-ai-search" className="text-blue-600 dark:text-blue-400 hover:underline">
              gptoapk 搜索页
            </Link>{" "}
            或对应{" "}
            <Link href="/zh/telegram-apk" className="text-blue-600 dark:text-blue-400 hover:underline">
              专题 APK 页
            </Link>
            。
          </li>
          <li>搜索应用名，记录结果里的<strong>包名</strong>（如 Telegram 为 <code>org.telegram.messenger</code>）和<strong>开发者</strong>。</li>
          <li>与 Google Play 详情页或官网公布信息对比；差一个字母都不要装。</li>
        </ol>
        <p>
          社交类 App 可对照{" "}
          <Link href="/zh/blog/social-apk-safe-install-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            社交 APK 安全安装清单
          </Link>
          里的包名表。
        </p>

        <h2>第二步：手机上查看 APK 签名（推荐 MT 管理器）</h2>
        <p>无需 Root，安装 MT 管理器、NP 管理器等文件工具即可：</p>
        <ol>
          <li>在「下载」目录找到 APK 文件，长按 → <strong>查看</strong> / <strong>APK 信息</strong>。</li>
          <li>进入「签名」或「证书」页，记录 <strong>SHA-256</strong> 或 <strong>MD5</strong> 指纹（建议用 SHA-256）。</li>
          <li>若手机已装 Play 正版，对<strong>已安装应用</strong>同样查看签名，两者应一致（同版本或同开发者渠道）。</li>
        </ol>
        <div className="mb-8 border-l-4 border-amber-600 bg-amber-50 p-5 dark:bg-amber-950/30">
          <p className="leading-relaxed text-slate-700 dark:text-slate-200">
            <strong>提示：</strong>不同镜像站抓取的 APK，只要来自同一开发者密钥签名，指纹应相同。若你之前装的是「破解版」，指纹一定与官方不同——需卸载后才能装正版。
          </p>
        </div>

        <h2>第三步：电脑上用 apksigner / jarsigner 验证</h2>
        <p>开发者或进阶用户可在电脑上精确验签。Android SDK 自带 <code>apksigner</code>：</p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code>{`# 查看 APK 签名方案与证书（Android SDK build-tools）
apksigner verify --verbose --print-certs your-app.apk

# 旧版也可用 jarsigner（JDK 自带）
jarsigner -verify -verbose -certs your-app.apk`}</code></pre>
        <p>输出中的 <code>Signer #1 certificate SHA-256 digest</code> 即为证书指纹。可与 Play 已装版导出的证书对比，或查阅厂商安全公告中的官方指纹（部分银行、钱包 App 会公布）。</p>

        <h2>第四步：VirusTotal 与哈希核对（可选）</h2>
        <p>签名验证解决「是不是这个开发者」；病毒扫描解决「有没有恶意代码」。建议流程：</p>
        <ol>
          <li>计算 APK 的 SHA-256 文件哈希（MT 管理器或 <code>sha256sum</code>）。</li>
          <li>上传至 VirusTotal；多引擎报毒则不要安装。</li>
          <li>注意：0 报毒<strong>不能</strong>代替签名核对——新木马也可能暂时未被收录。</li>
        </ol>

        <h2>常见签名相关安装错误</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">现象</th>
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">含义</th>
                <th className="p-3 text-left border border-gray-200 dark:border-gray-700">处理</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">与现有应用签名不同</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">同包名、不同证书</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">卸载旧版（先备份数据）再装</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 border border-gray-200 dark:border-gray-700">无法降级安装</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">versionCode 更低</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">只装更高版本，或卸载后装旧版</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">解析包出错</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">文件损坏或非 APK</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">重新下载；见{" "}
                  <Link href="/zh/install-apk-guide" className="text-blue-600 dark:text-blue-400 hover:underline">
                    安装指南
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          更多错误代码见{" "}
          <Link href="/zh/blog/android-apk-install-error-fix-2026" className="text-blue-600 dark:text-blue-400 hover:underline">
            15 种 APK 安装错误修复
          </Link>
          。
        </p>

        <h2>哪些情况必须验签？</h2>
        <ul>
          <li>银行、券商、钱包、交易所类 App</li>
          <li>从论坛、网盘、陌生网站拿到的「破解版」「加速版」</li>
          <li>图标像 WhatsApp / Telegram，但包名多后缀的 APK</li>
          <li>覆盖安装失败、提示签名冲突时</li>
        </ul>

        <h2>常见问题</h2>
        <h3>签名一致就 100% 安全吗？</h3>
        <p>说明来自同一开发者密钥，但不代表没有漏洞或恶意更新。仍需从可信渠道下载并保持版本更新。</p>
        <h3>gptoapk 下的包需要再验签吗？</h3>
        <p>建议在安装前核对站点展示的包名/开发者，存疑时用 MT 管理器看 SHA-256。站点提供 Play 元数据辅助核对，最终安装决定权在你。</p>
        <h3>Play 版与官网 APK 签名会不同吗？</h3>
        <p>同一开发者、同一发布密钥时应一致。部分 App 存在 Play App Signing，商店分发包可能由 Google 重签，与官网直链指纹可能不同——此时以 Play 已装版为基准对比更稳妥。</p>

        <hr />
        <h2>总结</h2>
        <ol>
          <li>下载前：gptoapk 核对包名 + 开发者。</li>
          <li>安装前：MT 管理器或 apksigner 看证书 SHA-256。</li>
          <li>签名冲突：卸载同包名旧版后再装；勿轻信破解包。</li>
        </ol>
        <p>
          在{" "}
          <Link href="/zh" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
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

export const zhPosts20260604 = posts20260604;
export const zhPosts20260604List = toList(zhPosts20260604);
