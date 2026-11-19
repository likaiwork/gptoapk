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

const ARTICLE = (
  <>
      <p>换新手机后，抽屉里那台旧安卓机大概率在吃灰。其实一台 3 年前的安卓机，性能足够跑完全部「家庭基础设施」类任务——它比树莓派快，比平板便宜，还自带屏幕、电池和全套传感器。下面按「改造难度 × 实用价值」排序，给你 8 个真正能落地的方案，每个都给出必要条件、具体步骤和坑点。</p>
      <p><strong>核心观点：旧手机的价值不在算力，而在「自带电池 + 屏幕 + 摄像头 + 常驻联网」这套完整硬件。</strong>改造时优先选择「低交互、长期通电、消耗小」的任务，而不是拿它当主力机硬撑。</p>
      <h2>动手前：先做 3 件事</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>确认可用性</strong>：屏幕完好、电池不鼓包、能正常开机充电。电池鼓包的机器不要长期通电，有安全风险。</li>
        <li><strong>恢复出厂设置</strong>，然后跳过 Google 账号登录，用本地账号或直接当离线设备用。</li>
        <li><strong>检查系统版本</strong>：设置 → 关于手机 → Android 版本。低于 Android 8 的机器做安防/监控类改造会遇到 App 兼容问题。</li>
      </ol>
      <h2>方案 1：行车记录仪 / 家庭摄像头（难度 1/5，价值 5/5）</h2>
      <p>最适合旧手机的方案，因为摄像头是旧旗舰机最大的残余优势。必备一个车载支架或窗吸支架、一根长充电线。</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>下载行车记录类 App，或用 APK 安装包装离线版本。</li>
        <li>开启循环录制，每段 3–5 分钟、分辨率 720p（1080p 会过热）。</li>
        <li>关闭自动亮度、关闭屏幕常亮，屏幕熄灭后录制仍在继续。</li>
        <li>插上充电器，车载场景接点烟器，家庭场景接常亮插座。</li>
      </ol>
      <p>坑点：夏天车内高温会触发电池保护导致停止充电，建议放在空调出风口附近并移除厚保护壳。</p>
      <h2>方案 2：专用音乐播放器 / 车载音频终端（难度 1/5，价值 4/5）</h2>
      <p>把旧手机变成离线音乐盒：装本地播放器，导入 MP3/FLAC，开飞行模式、关闭所有后台同步。<strong>飞行模式下旧手机的续航能翻倍</strong>，插上耳机或蓝牙音箱就是一个永不断网的播放终端。设置 → 电池 → 限制后台活动，卸载或停用不需要的预装 App。</p>
      <h2>方案 3：桌面时钟 / 天气相框（难度 1/5，价值 4/5）</h2>
      <p>装一个全屏时钟 App（时钟 + 天气 + 日程），开启「充电时常亮屏幕」，放在床头或玄关。亮度调到 20% 以下，OLED 机型用深色背景可显著延缓烧屏。长期 100% 电量对锂电池不友好，有条件用带定时断电的插座，让电量在 40–80% 之间循环。</p>
      <h2>方案 4：家庭 NAS / 简易文件服务器（难度 3/5，价值 5/5）</h2>
      <p>旧手机存储通常有 64–128GB，做家庭局域网共享盘完全够用。</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>方法 A</strong>：装文件管理器的 FTP/SMB 共享功能，手机连 WiFi，电脑访问 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">ftp://手机IP:2121</code>。</li>
        <li><strong>方法 B</strong>：装 Termux，<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pkg install openssh</code> 后启动 sshd，用 sftp 或 rsync 定时备份。Termux 还支持 Python 与 nginx。</li>
      </ul>
      <p>坑点：安卓会杀后台，需在「电池优化」里把 Termux 设为「不限制」。</p>
      <h2>方案 5：下载机 / 离线缓存盒子（难度 3/5，价值 3/5）</h2>
      <p>旧手机 + 一个闲置 U 盘（OTG）就是一台 7×24 下载机。装支持 HTTP/BT 下载的 App，设置「仅 WiFi 下载」「夜间定时任务」，白天它继续当别的用途。</p>
      <h2>方案 6：儿童机 / 长辈备用机（难度 1/5，价值 5/5）</h2>
      <p>给孩子的旧手机去掉 SIM 卡、只连 WiFi，配合家长控制类 App 限制应用和时长——二手手机做儿童机比买新平板划算得多，摔了也不心疼。给长辈做备用机时重点做三件事：字体和图标调到最大、只保留电话/微信/相册三个图标、关掉所有推送通知。</p>
      <h2>方案 7：专用阅读器（难度 1/5，价值 4/5）</h2>
      <p>装阅读类 App，其余全部关闭，屏幕调成护眼模式。6 寸屏手机的翻页响应比电子墨水屏快得多，适合看 PDF 和漫画。</p>
      <h2>方案 8：复古掌机 / 游戏模拟器（难度 3/5，价值 3/5）</h2>
      <p>旧旗舰机跑 GBA/PSP/NDS 模拟器毫无压力，配一个夹式蓝牙手柄就是一台掌机。<strong>注意：模拟器与 ROM 的合法性因地区而异，仅使用自己拥有的游戏备份。</strong></p>
      <h2>通用优化：让旧手机不卡、不耗电、不乱弹</h2>
      <p>改造后最常见的抱怨是「一会儿就卡死、电量狂掉」。三个动作解决 90% 的问题。</p>
      <p><strong>1. 免 root 卸载预装应用</strong>（先在开发者选项里打开 USB 调试）：</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm list packages | grep -i "厂商前缀"   # 先列出
adb shell pm uninstall -k --user 0 com.example.bloat  # 再卸载`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm uninstall --user 0</code> 只对当前用户生效，恢复出厂即可还原，安全可逆。</p>
      <p><strong>2. 关闭自动同步与推送</strong>：设置 → 账号 → 关闭自动同步；设置 → 通知 → 批量关闭。</p>
      <p><strong>3. 固定电池策略</strong>：设置 → 应用 → 电池 → 对需要常驻的 App 选择「不限制」。</p>
      <h2>该放弃的情况</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li>电池鼓包、屏幕大面积坏点或触摸失灵 → 直接回收。</li>
        <li>Android 6 及以下 → 只适合做时钟/相框。</li>
        <li>锁死后台、无法卸载预装的合约机 → 改造体验会很差。</li>
      </ul>
      <p>旧手机改造的核心不是技术，而是选对任务：选一个「低交互、长时间连续、对性能不敏感」的场景，旧机就能稳定服役好几年。</p>
      <h2>常见问题</h2>
      <p><strong>Q：旧手机长期插电会爆炸吗？</strong><br />正规充电器 + 无鼓包电池 + 通风环境下，风险很低。避免厚壳包裹、避免阳光直射，建议用定时插座。</p>
      <p><strong>Q：改造后还需要 Google 服务吗？</strong><br />时钟、音乐、NAS、下载机、模拟器都不需要。需要 Play 商店时才登录账号，装完可以退出。</p>
      <p><strong>Q：刷第三方 ROM 值得吗？</strong><br />只有追求彻底去预装 + 最新系统时才值得，且需确认机型有活跃维护的 ROM。普通改造用官方系统 + 停用预装就够了。</p>
      <p><strong>Q：怎么把旧手机上的 App 搬到新手机？</strong><br />应用本身建议重新下载安装，只有少数无法获取的旧版应用才需要手动导出 APK 安装包。</p>
  </>
);

export const zhPosts20261119A = [
  {
    slug: "old-android-phone-repurpose-guide",
    title: "旧安卓手机别扔：8 种改造成实用工具的完整方案（2026 实测）",
    description: "旧安卓手机不必吃灰。本文按改造难度与实用价值排序，给出行车记录仪、家庭摄像头、离线音乐终端、桌面时钟、家庭 NAS、下载机、儿童机、掌机 8 个落地方案，附免 root 卸载预装与电池策略等通用优化步骤。",
    date: "2026-11-19",
    readTime: "7 min read",
    tags: ["旧手机改造","Android","Termux","家庭NAS","APK","gptoapk"],
    content: ARTICLE,
  },
];

export const zhPosts20261119AList = toList(zhPosts20261119A);
