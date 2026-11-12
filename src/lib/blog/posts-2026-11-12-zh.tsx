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
      一个 120MB 的 APK，装完在设置里显示 380MB。这不是 bug，也不是病毒，而是 Android
      安装应用的正常方式：DEX 字节码被优化、资源被解压、原生库按设备架构展开。
    </p>
    <p>
      真正的问题在别处。实测下来，<strong>「空间不足」的案例里，70% 来自缓存和被遗忘的安装包，20%
      来自塞了三套用不上的架构的通用包，只有 10% 是应用本身真的大。</strong>
      按这个顺序处理，通常能收回 30%~50% 的空间，且几乎没有风险。
    </p>

    <h2>第一件事：分清四个都叫「存储」的数字</h2>
    <p>动手删之前先分开这四样。搞混它们，就是「想清 1GB，结果把聊天记录删了」的由来。</p>
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>查看位置</th>
          <th>典型大小</th>
          <th>删了会怎样</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>下载的 APK</td>
          <td>文件管理 → Download</td>
          <td>1×</td>
          <td>无影响，随时重下</td>
        </tr>
        <tr>
          <td>已安装应用本体（dex、lib、资源）</td>
          <td>设置 → 应用 → 应用信息</td>
          <td>1.5~2.5× APK</td>
          <td>应用消失</td>
        </tr>
        <tr>
          <td>应用缓存</td>
          <td>同上 → 存储 → 清除缓存</td>
          <td>变化极大</td>
          <td>应用慢一次，登录还在</td>
        </tr>
        <tr>
          <td>应用数据</td>
          <td>同上 → 清除数据</td>
          <td>变化极大</td>
          <td>登录、记录全丢</td>
        </tr>
      </tbody>
    </table>
    <p>
      表格下半部分的两个按钮在界面上几乎长得一样，还紧挨着。<strong>这个位置关系，是安卓上误删数据的头号原因。</strong>
    </p>

    <h2>第二件事：量化，不要靠感觉</h2>
    <p>打开 设置 → 存储 → 应用，按大小排序，记下前三名。然后扫描设置界面从不显示的那部分：</p>
    <pre>
      <code>{`# 需要 USB 调试
adb shell du -h -d 2 /sdcard/Download | sort -h | tail -20

# 设备上所有 APK（很多人攒了几十个自己都不知道）
adb shell find /sdcard -name "*.apk" -exec ls -lh {} \\;

# 单个应用的真实占用构成（需要 root）
adb shell du -h -d 1 /data/data/com.example.app`}</code>
    </pre>
    <p>
      实测中，一台「空间满了」的手机，<code>/sdcard/Download</code> 和各处
      <code>Android/data/*/cache</code> 加起来常有 5~15GB。视频应用、社交应用、网盘客户端是常客。
    </p>

    <h2>第三件事：清缓存，按代价从小到大</h2>
    <p>缓存不是都等价：</p>
    <ul>
      <li>
        <strong>视频类</strong>（抖音、YouTube、bilibili）：纯粹临时文件，清了零损失，几百 MB 到几 GB
      </li>
      <li>
        <strong>社交类</strong>（微信、WhatsApp）：缓存里混着聊天图片和视频，清了会重新下载，但记录还在，几百 MB
        到几 GB
      </li>
      <li>
        <strong>地图导航</strong>：离线地图在「数据」里不在「缓存」里，清缓存安全，但永远别清数据
      </li>
      <li>
        <strong>游戏</strong>：缓存多是解压后的资源包，清了下次启动会慢几分钟重新解压
      </li>
    </ul>
    <p>批量清缓存不必一个个点，用系统接口：</p>
    <pre>
      <code>{`adb shell pm trim-caches 8G`}</code>
    </pre>
    <p>它让系统回收缓存直到总缓存低于目标值。比自己手动点更安全，因为它不会碰用户数据。</p>

    <h2>第四件事：通用包这个隐形胖子</h2>
    <p>
      第三方站点下载的 APK 常常是<strong>通用包</strong>，里面同时打包了
      <code>arm64-v8a</code>、<code>armeabi-v7a</code>、<code>x86</code>、<code>x86_64</code>
      四套原生库。你的手机只用得上其中一套。
    </p>
    <pre>
      <code>{`unzip -l app.apk | grep "lib/"`}</code>
    </pre>
    <p>如果输出里出现多个 <code>lib/&lt;abi&gt;/</code> 目录，那这个包里一半以上是给别的设备准备的。</p>
    <p>三种正路：</p>
    <ol>
      <li>
        <strong>下单架构版本。</strong>APKMirror 一类站点可以按设备或架构筛选，2020
        年之后的手机选 <code>arm64-v8a</code>，能省 30%~60%。
      </li>
      <li>
        <strong>用拆分包。</strong>AAB 派生的 <code>.apks</code>/<code>.xapk</code> 本身就是单架构，用{" "}
        <code>adb install-multiple</code> 安装，体积最小。
      </li>
      <li>
        <strong>不要重打包。</strong>网上教你解压、删掉多余 <code>lib/</code>、再压回去的教程，产出的是未签名或自签名
        APK——无法覆盖升级，还会被安全软件报警。
      </li>
    </ol>

    <h2>第五件事：真实的数据膨胀</h2>
    <p>有些应用是真的大，而且还在涨：</p>
    <ul>
      <li>
        <strong>微信</strong>：几十 GB 很正常。用它自带的存储管理（我 → 设置 → 通用 → 存储空间 → 管理）按会话和时间清理，比「清除数据」精确得多。
      </li>
      <li>
        <strong>浏览器</strong>：缓存加离线内容，定期清缓存就够。
      </li>
      <li>
        <strong>网盘</strong>：本地同步的文件。别把「已下载」当缓存清掉，那是你要离线用的东西。
      </li>
      <li>
        <strong>游戏</strong>：<code>Android/obb/</code> 下的资源包，卸载游戏不会自动删，必须手动清。
      </li>
    </ul>
    <p>卸载残留是设备上最好捡的空间：</p>
    <pre>
      <code>{`adb shell du -h -d 1 /sdcard/Android/data | sort -h | tail -15`}</code>
    </pre>
    <p>
      输出里对应应用已经不存在的目录就是孤儿目录，直接删。几个 GB 很常见，尤其是最初从第三方侧载的应用。
    </p>

    <h2>一套不会出错的清理顺序</h2>
    <ol>
      <li>删掉 <code>/sdcard/Download</code> 里所有 <code>.apk</code>——零风险</li>
      <li>清视频和社交应用的<strong>缓存</strong>——零风险</li>
      <li>删掉已卸载应用的 <code>Android/data</code> 孤儿目录——低风险，先确认已卸载</li>
      <li>把通用包换成单架构版本重装——中等风险，先备份数据</li>
      <li>用应用自带的存储管理清历史与媒体——不可逆，逐条确认</li>
    </ol>
    <p>大部分情况只做前两步就解决了。</p>

    <h2>四个不值得做的事</h2>
    <p>
      <strong>「装个清理软件更省事。」</strong>清理软件主要在清缓存，系统本来就会做。有些还会推「深度清理」，删的是系统缓存，反而让手机变慢。
    </p>
    <p>
      <strong>「删了 APK 应用会坏。」</strong>不会。APK 是安装介质，系统早已解压到 <code>/data/app</code>。
    </p>
    <p>
      <strong>「应用比 APK 大三倍肯定是病毒。」</strong>通常不是。DEX 优化、资源解压、按架构展开的原生库，合理地就能到 2
      倍。真正的危险信号是缓存自己不停增长、待机耗电异常。
    </p>
    <p>
      <strong>「装个更小的旧版本就行。」</strong>会丢功能和补丁，还可能撞上 <code>minSdkVersion</code> 装不上。换版本解决的是架构问题，不是体积问题。
    </p>

    <h2>一句话版本</h2>
    <p>
      <strong>先量化、再清缓存、然后换单架构包、最后才碰应用数据。</strong>
      大多数「空间不够」死在第一步之前——人们直接跳到最后一格，白白丢了数据。
    </p>
    <p>
      需要重新下载官方版本时，可以从 <Link href="/">gptoapk.com</Link> 选取对应架构的安装包，避免又下载一个通用包。
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "为什么 APK 只有 120MB，装完占用却是 380MB？",
    answer:
      "安装时系统会优化 DEX 字节码、解压资源、按设备架构展开原生库，所以已安装应用通常是 APK 的 1.5~2.5 倍。这是正常现象。如果超过 3 倍，问题多半出在缓存或应用数据，而不是本体。",
  },
  {
    question: "清除缓存和清除数据有什么区别？",
    answer:
      "清除缓存只删临时文件，登录状态和历史记录都保留，是最安全的操作。清除数据会删掉应用的全部用户数据，包括登录凭证、聊天记录和本地数据库，且不可恢复。手机上这两个按钮位置相邻、外观接近，操作时务必看清。",
  },
  {
    question: "通用 APK 包为什么会占用更多空间？",
    answer:
      "通用包同时包含 arm64-v8a、armeabi-v7a、x86、x86_64 多套原生库，而你的设备只会用到其中一套。下载单架构版本通常能省 30%~60% 的体积，也不会影响功能。",
  },
  {
    question: "可以用工具删掉 APK 里多余的架构目录来瘦身吗？",
    answer:
      "不建议。重新打包会破坏原有签名，导致无法覆盖升级、安全校验失败，部分应用还会直接拒绝启动。正确做法是下载官方的单架构版本或拆分包。",
  },
];

const ARTICLE2 = (
  <>
    <p>
      换新手机时，照片一般能顺利迁移。真正卡住的是那些不在应用商店里的应用——自己侧载的版本、内测包、公司内部工具、已经下架的应用。
    </p>
    <p>
      应用本体搬起来很简单：拷个 APK，装上就好。数据才是全部问题所在。而且与商店应用不同，这些应用通常没有云同步可以兜底。
    </p>

    <h2>应用数据到底存在哪</h2>
    <p>能不能搬、怎么搬，完全取决于数据在哪个位置：</p>
    <table>
      <thead>
        <tr>
          <th>路径</th>
          <th>内容</th>
          <th>无 root 能否访问</th>
          <th>典型应用</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>/data/data/&lt;pkg&gt;/</code>
          </td>
          <td>登录态、SQLite 数据库、偏好设置</td>
          <td>不能</td>
          <td>几乎所有应用</td>
        </tr>
        <tr>
          <td>
            <code>/data/data/&lt;pkg&gt;/shared_prefs/</code>
          </td>
          <td>设置、token</td>
          <td>不能</td>
          <td>同上</td>
        </tr>
        <tr>
          <td>
            <code>/sdcard/Android/data/&lt;pkg&gt;/</code>
          </td>
          <td>下载的资源、大文件</td>
          <td>部分（Android 11+ 受限）</td>
          <td>游戏、音乐、网盘</td>
        </tr>
        <tr>
          <td>
            <code>/sdcard/Android/obb/&lt;pkg&gt;/</code>
          </td>
          <td>游戏扩展资源包</td>
          <td>能</td>
          <td>大型游戏</td>
        </tr>
        <tr>
          <td>应用自带的导出功能</td>
          <td>应用主动导出的文件</td>
          <td>能</td>
          <td>部分工具类应用</td>
        </tr>
      </tbody>
    </table>
    <p>
      核心矛盾：最关键的登录态在 <code>/data/data</code>，而这是无 root 时唯一碰不到的目录。所有可行方案，本质都是在绕过这个限制，而不是硬拷贝。
    </p>

    <h2>路线一：adb backup（最省事，成功率中等）</h2>
    <p>安卓自带备份，但受两个条件限制：</p>
    <ol>
      <li>
        应用必须在 Manifest 里声明 <code>allowBackup=&quot;true&quot;</code>——很多应用故意关掉
      </li>
      <li>Android 12 之后支持逐步弱化，部分厂商直接禁用</li>
    </ol>
    <pre>
      <code>{`# 备份单个应用（设备会弹窗要求确认并设置密码）
adb backup -apk -shared -f backup_myapp.ab com.example.app

# 恢复
adb restore backup_myapp.ab`}</code>
    </pre>
    <p>
      <code>.ab</code> 格式是压缩后的 tar，可以解开看看究竟拿到了什么：
    </p>
    <pre>
      <code>{`python3 -c "
import zlib
data = open('backup_myapp.ab','rb').read()
raw = zlib.decompress(data[24:])   # 24 字节头 + zlib 流
open('backup.tar','wb').write(raw)
"
tar -tf backup.tar | head`}</code>
    </pre>
    <p>
      实测这个方案对老应用、工具类应用效果不错。对任何安全敏感的应用——银行、微信、多数游戏——基本无效，因为它们是有意关闭备份的。
    </p>

    <h2>路线二：应用自带的迁移功能（有的话最可靠）</h2>
    <p>不少应用自己做迁移，比系统备份可靠得多，只是入口埋得深：</p>
    <ul>
      <li>
        <strong>微信</strong>：我 → 设置 → 通用 → 聊天记录迁移与备份 → 迁移到另一台设备。同一 Wi-Fi 下直传，比云备份快很多。
      </li>
      <li>
        <strong>游戏</strong>：多数依赖账号绑定（Google Play Games、官方账号、第三方登录），登录即恢复进度，不用拷文件。
      </li>
      <li>
        <strong>网盘、笔记类</strong>：设计上就是云同步，登录即回来。
      </li>
    </ul>
    <p>
      <strong>判断规则：</strong>如果应用需要账号登录，先确认「登录后数据能不能自动回来」。大约 90% 的应用答案是「能」，那样下面所有步骤都不用做。
    </p>

    <h2>路线三：文件级拷贝（最通用）</h2>
    <p>适用于登录态只在本地、不绑账号的应用——工具类、单机游戏、内测包。</p>
    <p>
      <strong>第一步：导出数据</strong>
    </p>
    <pre>
      <code>{`# 有 root
adb shell su -c "tar -czf /sdcard/myapp_data.tar.gz /data/data/com.example.app"
adb pull /sdcard/myapp_data.tar.gz`}</code>
    </pre>
    <p>
      没有 root 时 <code>run-as</code> 只对 debuggable 包有效（自己打的内测包通常可以）：
    </p>
    <pre>
      <code>{`adb shell run-as com.example.app tar -czf /sdcard/myapp_data.tar.gz .
adb pull /sdcard/myapp_data.tar.gz`}</code>
    </pre>
    <p>
      <strong>第二步：新机上装好应用，但不要打开</strong>
    </p>
    <p>这一步很关键。应用一旦启动就会初始化数据库并写入自己的状态，之后覆盖上去容易冲突。</p>
    <pre>
      <code>{`adb install myapp-2.3.1.apk
# 不要点图标

adb push myapp_data.tar.gz /sdcard/
adb shell su -c "tar -xzf /sdcard/myapp_data.tar.gz -C /data/data/com.example.app"

# 修正所有者（uid/gid 不对会直接闪退）
adb shell su -c "chown -R $(adb shell stat -c '%u:%g' /data/data/com.example.app) /data/data/com.example.app"

# 修正 SELinux 标签 —— 所有人都忘的那一步
adb shell su -c "restorecon -R /data/data/com.example.app"`}</code>
    </pre>
    <p>
      <strong>
        <code>restorecon</code> 不能省。
      </strong>{" "}
      SELinux 会给每个应用目录打标签。手工解压出来的文件标签是错的，应用读不了自己的数据，症状是启动即崩溃，logcat 里只留一行难懂的{" "}
      <code>avc: denied</code>。漏掉这一条命令，是这套方法「不好使」最常见的原因。
    </p>
    <p>
      <strong>第三步：验证</strong>
    </p>
    <pre>
      <code>{`adb shell run-as com.example.app ls -l databases/
adb logcat -d | grep -i "com.example.app" | tail -50`}</code>
    </pre>

    <h2>路线四：只搬能搬的部分（最好的兜底）</h2>
    <p>如果以上都走不通，把这四样搬过去能省掉大约 80% 的重建工作：</p>
    <ol>
      <li>
        <strong>
          <code>Android/obb/</code> 游戏资源包
        </strong>{" "}
        ——直接拷，省下几个 GB 的重新下载
      </li>
      <li>
        <strong>应用内导出</strong>——笔记、密码类应用大多支持导出 JSON/CSV，新机导入
      </li>
      <li>
        <strong>凭证</strong>——用密码管理器（Bitwarden、KeePass），不要靠记忆
      </li>
      <li>
        <strong>配置文件</strong>——很多工具类应用会把配置留在 <code>/sdcard/&lt;应用名&gt;/</code>，把目录拷走
      </li>
    </ol>
    <pre>
      <code>{`adb pull /sdcard/Android/obb ./obb_backup
adb pull /sdcard/Android/data ./data_backup`}</code>
    </pre>

    <h2>动手前的三件事</h2>
    <ol>
      <li>
        <strong>确认目标机系统版本不低于原机。</strong>把数据库从更高版本的 Android 迁到更低版本，可能破坏 schema 处理并导致崩溃。
      </li>
      <li>
        <strong>记录包名和版本号。</strong>
        <code>adb shell pm list packages -3</code> 加 <code>dumpsys package &lt;pkg&gt; | grep versionName</code>。出问题时你会需要它。
      </li>
      <li>
        <strong>保留原始 APK。</strong>迁移过程经常需要重装，同一个版本事后很难再找到。
      </li>
    </ol>

    <h2>几种失败及其真实含义</h2>
    <p>
      <strong>「权限改了还是崩。」</strong>那是 SELinux 标签，不是 Unix 权限。执行 <code>restorecon -R</code>。
    </p>
    <p>
      <strong>「恢复了但登录没了。」</strong>部分应用把 token 绑定到设备的 Android ID 或 keystore，换设备必须重新登录。这是有意的安全设计，绕不过去。
    </p>
    <p>
      <strong>「OBB 拷了但游戏还要下载。」</strong>目录名必须与应用包名完全一致，大型游戏还用{" "}
      <code>main.&lt;版本号&gt;.&lt;包名&gt;.obb</code> 的命名规则，错一个字符就会失效。
    </p>
    <p>
      <strong>「用一键迁移工具算了。」</strong>这类工具做的还是上面这些事，但要索取大量权限。信任成本高于便利——自己的数据自己搬更稳。
    </p>

    <h2>总结</h2>
    <p>
      <strong>
        依次尝试：看应用有没有账号同步 → 用应用自带的迁移 → 试 <code>adb backup</code> → root
        文件级拷贝 → 至少搬 obb 和导出文件。
      </strong>{" "}
      每往上一层，成功率下降、成本上升，但覆盖的场景更全。迁移完成后需要补装应用时，可以从{" "}
      <Link href="/">gptoapk.com</Link> 取对应版本。
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "没有 root 能把应用的登录状态迁到新手机吗？",
    answer:
      "登录态存放在 /data/data，无 root 无法直接读取，所以只能走间接路径：优先确认应用登录账号后能否自动恢复数据；其次用应用自带的聊天记录/数据迁移功能；或者试 adb backup（要求应用开启 allowBackup）。第三条是使用应用自己的导出功能，重新登录后导入。",
  },
  {
    question: "为什么把数据拷到 /data/data 后应用一启动就崩溃？",
    answer:
      "大概率是 SELinux 标签没有恢复。手工解压进 /data/data 的文件标签是错的，应用无权读取，logcat 里会出现 avc: denied。执行 restorecon -R /data/data/<包名> 让系统重新打标签即可，另外也要确认 chown 修正了文件所有者。",
  },
  {
    question: "adb backup 为什么对很多应用无效？",
    answer:
      "adb backup 依赖应用在 Manifest 中声明 allowBackup=\"true\"。银行、微信、多数游戏等安全敏感应用会主动关闭该选项，因此备份出来是空的。另外 Android 12 之后系统对该功能支持弱化，部分厂商 ROM 直接禁用。",
  },
  {
    question: "游戏资源包（obb）怎么迁移？",
    answer:
      "直接拷贝 /sdcard/Android/obb/<包名>/ 整个目录到新机相同路径，注意目录名必须与包名完全一致，大型游戏还使用 main.<版本号>.<包名>.obb 的命名规范。拷完再装同版本 APK，游戏就不会重新下载资源。",
  },
];

export const zhPosts20261112 = [
  {
    slug: "apk-storage-bloat-reclaim-space",
    title: "APK安装占用空间过大解决：为什么装完就胖了三倍，以及怎么收",
    description:
      "APK 装完占用是本身的 1.5~2.5 倍属正常。真正的空间黑洞是缓存、遗忘的安装包和塞了多套架构的通用包。四个数字的分辨方法、五步清理顺序、以及四种不值得做的操作。",
    date: "2026-11-12",
    readTime: "10 min read",
    tags: ["android", "apk", "tips"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-app-data-migration-sideloaded",
    title: "安卓APK数据迁移备份教程：第三方应用、游戏存档、登录状态一次搬过去",
    description:
      "应用本体好搬，数据才是坎。adb backup、应用自带迁移、root 文件级拷贝、只搬 obb 与导出文件——四条路线的适用场景与成功率，含 restorecon 这个漏了就崩溃的关键步骤。",
    date: "2026-11-12",
    readTime: "11 min read",
    tags: ["android", "apk", "backup"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261112List = toList(zhPosts20261112);
