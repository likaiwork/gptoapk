import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
  faqs?: BlogFaqItem[];
};

const toList = (posts: BlogPostEntry[]) =>
  posts.map(({ slug, title, description, date, readTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readTime,
    tags,
  }));

const ARTICLE1 = (
  <>
    <p>
      装一个 APK，结果出现「应用未安装」，或者装上了却闪退、弹窗、耗电飞快——很多人第一反应是「APK 有问题」。但真正的元凶往往是
      <strong>它和系统里已有的应用撞车了</strong>。
    </p>
    <p>
      APK 与系统应用的冲突分四类，处理方式完全不同。<strong>分不清类型就乱试，最常见的后果是把正常应用卸载了，还丢了数据。</strong>
    </p>
    <p>这篇按类别给判断方法和解决方案，每一步都能自己验证。</p>

    <h2>第 0 步：先确认冲突类型</h2>
    <p>打开设置 → 应用 → 查看已安装列表，或者用 ADB 精确查询：</p>
    <pre>
      <code>{`# 1. 查包名是否已存在（是否重复安装）
adb shell pm list packages | grep com.example.app

# 2. 查这个包的来源：系统分区还是用户安装区
adb shell pm path com.example.app
# 输出 /system/... 或 /product/... → 系统应用
# 输出 /data/app/...            → 用户安装应用

# 3. 查处理某个 intent 的所有应用（看是否有冲突的同类应用）
adb shell cmd package query-activities -a android.intent.action.VIEW -d "https://example.com"`}</code>
    </pre>
    <p>
      <code>pm path</code> 这一步最关键，<strong>它直接告诉你对手是系统应用还是普通应用</strong>，后面的方案就从这里分叉。
    </p>

    <h2>类型一：同包名签名冲突（最高频）</h2>
    <p>
      症状：安装时报 <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>，或者提示「与已安装应用签名不一致」。
    </p>
    <p>
      原因很简单：Android 要求<strong>同一个包名的所有版本必须用同一把签名密钥</strong>。你从第三方站下的 APK，大概率不是官方签名。
    </p>
    <p>判断：</p>
    <pre>
      <code>{`adb shell pm list packages -f | grep com.example.app
# 记下路径，然后拉出来比签名
adb pull /data/app/.../base.apk old.apk
apksigner verify --print-certs old.apk
apksigner verify --print-certs new.apk`}</code>
    </pre>
    <p>
      两边 <code>SHA-256 digest</code> 不同，就是签名冲突。
    </p>
    <p>解决方案（按安全性排序）：</p>
    <ol>
      <li>
        <strong>放弃旧数据、官方源重装</strong>：卸载旧版 → 从官方渠道安装。最省事，但会丢数据。
      </li>
      <li>
        <strong>保留数据覆盖</strong>：需要同签名，通常无解。除非旧版来源是同一个第三方站，直接装那个站的新版本。
      </li>
      <li>
        <strong>双开隔离</strong>：装到工作资料 / 应用克隆里，两个版本共存互不影响。这是唯一「不卸载也不丢数据」的方案。
      </li>
    </ol>
    <p>
      <strong>不要用「删除 signatures 再重签」这类野路子</strong>——重签后系统会认为这是一个全新的应用，旧数据照样访问不到，还可能破坏自动更新能力。
    </p>

    <h2>类型二：系统应用伪装 / 抢占（风险最高）</h2>
    <p>
      症状：装的是看似普通的工具类 APK，装完发现设置里出现「设备管理器」授权、无障碍服务自动开启、HOME 键被替换。
    </p>
    <p>原因：这类 APK 声明了与系统应用相同的 intent-filter 或权限，试图抢占默认角色。</p>
    <p>判断：</p>
    <pre>
      <code>{`# 查它申请了什么危险权限
adb shell dumpsys package com.example.app | grep -A 20 "requested permissions"

# 查是否成为了默认应用
adb shell cmd role get-role-holders android.app.role.HOME
adb shell settings get secure enabled_accessibility_services`}</code>
    </pre>
    <p>如果它是你刚装的应用，而且成了默认桌面 / 无障碍服务，<strong>立刻处理</strong>：</p>
    <ol>
      <li>设置 → 应用 → 该应用 → 权限，全部撤销</li>
      <li>设置 → 无障碍，关闭它的服务</li>
      <li>设置 → 安全 → 设备管理器应用，取消激活</li>
      <li>卸载</li>
    </ol>
    <p>这类 APK 拖时间没有意义，装错了就删，别心疼。</p>

    <h2>类型三：框架与 GMS 冲突</h2>
    <p>症状：装完 Google 服务框架相关 APK 后，Google Play 闪退、无法登录，或整个系统通知异常。</p>
    <p>
      原因：GMS、Google Play 商店、Google 服务框架三者版本必须匹配，且要和系统架构（arm64 / armv7）、Android 版本对齐。混装不同来源的版本，服务端签名校验会失败。
    </p>
    <p>判断：</p>
    <pre>
      <code>{`adb shell dumpsys package com.google.android.gms | grep versionName
adb shell dumpsys package com.android.vending | grep versionName
adb shell getprop ro.product.cpu.abi
adb shell getprop ro.build.version.release`}</code>
    </pre>
    <p>
      确认四个数字：<strong>服务框架版本、商店版本、CPU ABI、Android 版本</strong>。任何一项不匹配，就会出现「装上了但不工作」。
    </p>
    <p>处理顺序：</p>
    <ol>
      <li>卸载三个组件（服务框架、商店、GSF）</li>
      <li>重启</li>
      <li>按「服务框架 → 商店」的顺序装，来源保持同一套</li>
      <li>装完再重启一次，让服务注册完成</li>
    </ol>
    <p>
      如果系统里已经有厂商预装的 GMS 但被禁用，<strong>先尝试在设置里启用，而不是叠加安装</strong>——两套共存是绝大多数「Play 商店用不了」的根源。
    </p>

    <h2>类型四：受限制的 OEM 系统应用</h2>
    <p>症状：小米、华为、OPPO 等机型上，替换系统桌面、电话、短信类 APK 时报 <code>INSTALL_FAILED_INVALID_APK</code> 或直接被拦。</p>
    <p>原因：国产 ROM 有系统应用签名白名单，非白名单签名无法覆盖系统分区应用。</p>
    <p>
      判断：<code>pm path</code> 显示 <code>/system/priv-app/</code> 路径，且安装报错，基本就是这个。
    </p>
    <p>解决方案：</p>
    <ol>
      <li>
        <strong>换个包名装</strong>：很多第三方桌面 / 短信应用本身就有独立包名版本，优先用这个
      </li>
      <li>
        <strong>设为默认而非替换</strong>：系统 → 应用 → 默认应用，把角色切到新应用，原系统应用保留但不再使用
      </li>
      <li>
        <strong>不要尝试强推系统分区</strong>：需要 root + 关闭 dm-verity，风险与收益完全不成比例，会导致 OTA 升级失败
      </li>
    </ol>

    <h2>冲突排查速查表</h2>
    <table>
      <thead>
        <tr>
          <th>报错 / 症状</th>
          <th>冲突类型</th>
          <th>首选方案</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE</td>
          <td>签名冲突</td>
          <td>卸载重装 / 双开隔离</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_ALREADY_EXISTS</td>
          <td>已存在</td>
          <td>加 -r 覆盖，或先卸载</td>
        </tr>
        <tr>
          <td>Play 商店闪退</td>
          <td>GMS 框架不匹配</td>
          <td>三件套统一来源重装</td>
        </tr>
        <tr>
          <td>装完桌面被换 / 无障碍自动开</td>
          <td>系统应用伪装</td>
          <td>立即撤销权限并卸载</td>
        </tr>
        <tr>
          <td>/system/priv-app 路径安装失败</td>
          <td>OEM 白名单</td>
          <td>改默认应用，不替换</td>
        </tr>
      </tbody>
    </table>

    <h2>卸载前的最后一个动作</h2>
    <p>不论哪类冲突，卸载系统应用之前都先做两件事：</p>
    <pre>
      <code>{`# 1. 备份该应用的数据（如果需要）
adb backup -f app_backup.ab -apk com.example.app

# 2. 记录原始 package 信息，方便回滚
adb shell dumpsys package com.example.app > app_info.txt`}</code>
    </pre>
    <p>
      系统应用的卸载在多数机型上可以通过「卸载更新」还原到出厂版本，但<strong>一旦删除系统分区文件，就只能恢复出厂或刷机</strong>。动手前先想清楚：这个应用真的值得你冒这个风险吗？
    </p>
    <p>
      多数情况下，答案是<strong>不值得</strong>——换个包名的同类应用、或者把它设为非默认，就已经解决了 90% 的冲突问题。
    </p>
    <p>
      需要干净的官方签名安装包时，可以在 <Link href="/">gptoapk.com</Link> 按版本下载，避免因为来源混杂导致的签名冲突。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么安装APK提示「与已安装应用签名不一致」？",
    answer:
      "Android 要求同一包名的所有版本使用同一签名密钥。你下载的 APK 如果是第三方重签或改包版本，签名就和已安装的官方版不同，系统会返回 INSTALL_FAILED_UPDATE_INCOMPATIBLE。用 apksigner verify --print-certs 对比两边的 SHA-256 摘要即可确认。",
  },
  {
    question: "签名冲突能不能不卸载旧版就装上？",
    answer:
      "不能直接覆盖安装。三个可行方向：从与旧版相同的来源下载新版本；把新版本装进工作资料或应用分身实现双开共存；或者备份数据后卸载重装。自行删除签名再重签会导致系统视为全新应用，旧数据仍然无法读取。",
  },
  {
    question: "装完APK后桌面被换了、无障碍自动开启，怎么办？",
    answer:
      "立即撤销权限：设置 → 应用 → 该应用，撤销全部权限；设置 → 无障碍关闭其服务；设置 → 安全 → 设备管理器取消激活；然后卸载。这类 APK 通过声明与系统应用相同的 intent-filter 抢占默认角色，属于高风险行为。",
  },
  {
    question: "安装 Google 服务框架后 Play 商店闪退是什么原因？",
    answer:
      "GMS、Play 商店、Google 服务框架三个组件的版本必须互相匹配，并且与设备 CPU 架构和 Android 版本对齐。混装不同来源的版本会导致服务端签名校验失败。处理方式是按「服务框架 → 商店」的顺序、用同一套来源重装，并重启两次。",
  },
  {
    question: "为什么小米、华为手机不能替换系统桌面或电话应用？",
    answer:
      "国产 ROM 对 /system/priv-app 下的系统应用有签名白名单，非白名单签名的 APK 无法覆盖。正确做法是安装独立包名的同类应用，或者在设置 → 默认应用里把角色切换过去，而不是尝试替换系统分区文件。",
  },
];

const ARTICLE2 = (
  <>
    <p>
      换新机、刷机后重装应用、给测试机群部署几十个 APK——只要涉及「多个 APK」，手动一个个点就是在浪费生命。
    </p>
    <p>
      这篇不讲理论，直接给<strong>四种可落地的批量安装方案</strong>，按「是否需要电脑」分类，每种都附完整命令和实测注意事项。
    </p>

    <h2>先量化一下你到底要装多少</h2>
    <p>不同数量对应不同策略，先选对工具能省一半时间：</p>
    <ul>
      <li>
        <strong>少于 10 个</strong> → 逐个点其实不慢，硬上脚本反而折腾
      </li>
      <li>
        <strong>10-50 个</strong> → ADB 批量推送，效率最高
      </li>
      <li>
        <strong>50 个以上 / 多设备</strong> → 需要脚本 + 并行，单线程会等到崩溃
      </li>
      <li>
        <strong>无电脑</strong> → 第三方批量安装器 + 本地 APK 文件夹
      </li>
    </ul>

    <h2>方案一：ADB 一条命令装整批（最推荐）</h2>
    <p>ADB 的 install-multiple 是给 split APK 用的，批量装独立 APK 要用循环：</p>
    <pre>
      <code>{`cd ~/Downloads/apks

for f in *.apk; do
  echo "Installing: $f"
  adb install -r -d "$f" || echo "FAILED: $f"
done`}</code>
    </pre>
    <p>关键参数说明：</p>
    <ul>
      <li>
        <code>-r</code> 覆盖安装（保留数据），不加这个遇到已安装的会报 ALREADY_EXISTS
      </li>
      <li>
        <code>-d</code> 允许降级，实测装旧版本时会用到
      </li>
      <li>
        <code>-g</code> 一次性授予所有运行时权限，只在测试机上用，日常慎用
      </li>
    </ul>
    <p>
      <strong>实测要点：</strong>adb install 每次调用约有 1-2 秒固定开销。装 30 个应用，光开销就一分钟。想更快可以绕过这个开销：
    </p>
    <pre>
      <code>{`for f in *.apk; do
  adb push "$f" /data/local/tmp/tmp.apk >/dev/null
  adb shell pm install -r /data/local/tmp/tmp.apk
done
adb shell rm /data/local/tmp/tmp.apk`}</code>
    </pre>
    <p>
      速度提升主要来自不用反复走 adb 的 install 会话握手。注意 <code>pm install</code> 不解析 <code>-g</code>，需要单独 <code>pm grant</code>。
    </p>

    <h2>方案二：脚本化 + 失败自动重试</h2>
    <p>真实场景里总有几个包因为签名冲突、空间不足、版本问题失败。写个带重试和汇总的脚本：</p>
    <pre>
      <code>{`#!/bin/bash
LOG="install-$(date +%H%M%S).log"
FAILED=()

for f in *.apk; do
  for attempt in 1 2; do
    if adb install -r "$f" 2>&1 | grep -q "Success"; then
      echo "OK   $f" | tee -a "$LOG"
      break
    fi
    if [ "$attempt" = "2" ]; then
      echo "FAIL $f" | tee -a "$LOG"
      FAILED+=("$f")
    fi
  done
done

echo "----"
echo "失败 \"$COUNT\" 个"`}</code>
    </pre>
    <p>
      先把 adb install 的原始输出重定向到日志，<strong>失败原因一目了然</strong>（比如{" "}
      <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> 就是签名不一致，<code>INSUFFICIENT_STORAGE</code> 就是空间不足）。分类看日志比一个个试快得多。
    </p>

    <h2>方案三：多设备并行推送</h2>
    <p>给测试机群部署时，串行是最大的浪费。用 &amp; 并行：</p>
    <pre>
      <code>{`adb devices

for serial in $(adb devices | awk 'NR>1 && $2=="device"{print $1}'); do
  (
    echo "=== $serial ==="
    for f in *.apk; do
      adb -s "$serial" install -r "$f" 2>&1 | grep -E "Success|Failure"
    done
  ) &
done

wait
echo "全部设备完成"`}</code>
    </pre>
    <p>
      <strong>注意事项：</strong>
    </p>
    <ul>
      <li>USB 2.0 集线器带 5 台以上设备时会成瓶颈，尽量直连或用带独立供电的 HUB</li>
      <li>并行数别超过设备数，否则 adb server 会成为新瓶颈</li>
      <li>每台设备都要单独确认 USB 调试已授权，一台没授权会卡住整个流程</li>
    </ul>

    <h2>方案四：无电脑的批量安装（手机端）</h2>
    <p>没有电脑时，靠第三方批量安装器 + 本地文件夹：</p>
    <ol>
      <li>
        把 APK 全部放进手机里同一个目录（<code>Download/apk-batch/</code>）
      </li>
      <li>安装一个支持「目录批量安装」的应用安装器</li>
      <li>指向该目录，它会列出所有 APK 并逐个调起系统安装界面</li>
      <li>部分安装器支持自动点击「下一步」，需要开启无障碍权限</li>
    </ol>
    <p>
      <strong>限制：</strong>Android 8 之后系统对「未知来源」的限制让自动点击变得不可靠，国产 ROM 上经常被弹窗打断。50 个以上不建议用这条路。
    </p>

    <h2>换机场景的替代思路：直接恢复而非重装</h2>
    <p>
      如果你只是换手机，<strong>批量安装 APK 其实是下策</strong>。更好的做法是：
    </p>
    <ol>
      <li>备份时用「桌面布局 + 应用数据」完整备份工具</li>
      <li>新机登录同一账号，先让系统自动恢复已购 / 已装应用</li>
      <li>只对剩下的第三方 APK 手动补装（通常只剩 5-10 个）</li>
    </ol>
    <p>这样能省掉 80% 的批量安装工作量，还不用担心签名版本对不上。</p>

    <h2>常见失败与对应处理</h2>
    <table>
      <thead>
        <tr>
          <th>失败信息</th>
          <th>原因</th>
          <th>处理</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE</td>
          <td>签名与已装版本不同</td>
          <td>先卸载再装，或用双开工具隔离</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_INSUFFICIENT_STORAGE</td>
          <td>空间不足</td>
          <td>清理后重试，注意需要约 2 倍 APK 体积</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_VERSION_DOWNGRADE</td>
          <td>装的版本更旧</td>
          <td>加 -d 允许降级</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_TEST_ONLY</td>
          <td>APK 打了 testOnly 标记</td>
          <td>加 -t</td>
        </tr>
        <tr>
          <td>INSTALL_PARSE_FAILED_NO_CERTIFICATES</td>
          <td>APK 签名被破坏</td>
          <td>重新下载，别用这个包</td>
        </tr>
      </tbody>
    </table>

    <h2>一个能省事的收尾动作</h2>
    <p>批量装完之后，建议顺手导出一次已验证可用的应用清单：</p>
    <pre>
      <code>{`adb shell pm list packages -3 > my-apps.txt`}</code>
    </pre>
    <p>这份清单在下次刷机 / 换机时就是你的采购单，直接对着它去找对应 APK，不用靠回忆。</p>
    <p>
      <strong>最后一条经验：</strong>批量安装的难点从来不是「怎么批量」，而是「怎么处理那 10% 装不上的」——所以务必把日志留下来，按错误码分类处理，比反复重试整个列表高效得多。
    </p>
    <p>
      批量安装前先在 <Link href="/">gptoapk.com</Link> 按包名和版本核对一遍安装包，能提前排除大部分签名与架构不匹配的失败。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "安卓怎么一次性批量安装多个APK？",
    answer:
      "有电脑时最稳妥的方式是用 ADB：进入 APK 所在目录执行 for f in *.apk; do adb install -r -d \"$f\"; done。10 到 50 个应用用这种方式效率最高；超过 50 个建议加失败重试和日志收集，多设备场景用并行脚本。",
  },
  {
    question: "adb install 批量装很慢怎么提速？",
    answer:
      "每次 adb install 约有 1-2 秒固定会话开销。改用 adb push 到 /data/local/tmp 再用 adb shell pm install 安装，通常能快 30% 到 50%，因为省掉了反复的 install 会话握手。",
  },
  {
    question: "批量安装时部分APK失败怎么快速定位？",
    answer:
      "把 adb install 的完整输出写入日志，然后按错误码分类：INSTALL_FAILED_UPDATE_INCOMPATIBLE 是签名冲突，INSTALL_FAILED_INSUFFICIENT_STORAGE 是空间不足，INSTALL_FAILED_VERSION_DOWNGRADE 需要加 -d，INSTALL_FAILED_TEST_ONLY 需要加 -t。分类处理比整体重试快得多。",
  },
  {
    question: "没有电脑能不能批量安装APK？",
    answer:
      "可以用支持目录批量安装的第三方安装器：把所有 APK 放进同一目录，指向该目录后逐个调起系统安装界面。但 Android 8 以后未知来源限制使自动点击不可靠，国产 ROM 上容易被弹窗打断，数量超过 50 个不建议使用。",
  },
  {
    question: "换新手机后怎么最快恢复几十个应用？",
    answer:
      "不要用批量安装 APK 硬装。先在旧机做包含桌面布局和应用数据的完整备份，新机登录同一账号让系统自动恢复已装应用，最后只对剩下的少量第三方 APK 手动补装，通常能省掉八成工作量。",
  },
];

export const zhPosts20261111 = [
  {
    slug: "apk-system-app-conflict-fix",
    title: "APK与系统应用冲突解决：先分清是哪一类冲突，再动手",
    description:
      "签名冲突、系统应用伪装、GMS 框架不匹配、OEM 白名单——四类 APK 与系统应用的冲突判断方法和处理方案，附排查速查表与卸载前的备份动作。",
    date: "2026-11-11",
    readTime: "10 min read",
    tags: ["android", "apk", "troubleshoot"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-batch-install-tips",
    title: "安卓APK批量安装技巧：从 2 小时到 15 分钟的完整方案",
    description:
      "ADB 循环、失败重试脚本、多设备并行、手机端批量安装器——四种可落地的批量安装方案，附常见失败错误码对照表和提速技巧。",
    date: "2026-11-11",
    readTime: "9 min read",
    tags: ["android", "apk", "tips"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261111List = toList(zhPosts20261111);
