"use client";

import { useEffect, useState, useCallback } from "react";

// 国家代码 → 中文/英文 映射
const COUNTRY_NAMES: Record<string, [string, string]> = {
  "US": ["美国", "United States"],
  "CN": ["中国", "China"],
  "JP": ["日本", "Japan"],
  "KR": ["韩国", "South Korea"],
  "GB": ["英国", "United Kingdom"],
  "DE": ["德国", "Germany"],
  "FR": ["法国", "France"],
  "CA": ["加拿大", "Canada"],
  "AU": ["澳大利亚", "Australia"],
  "BR": ["巴西", "Brazil"],
  "IN": ["印度", "India"],
  "RU": ["俄罗斯", "Russia"],
  "SG": ["新加坡", "Singapore"],
  "HK": ["香港", "Hong Kong"],
  "TW": ["台湾", "Taiwan"],
  "NL": ["荷兰", "Netherlands"],
  "IT": ["意大利", "Italy"],
  "ES": ["西班牙", "Spain"],
  "SE": ["瑞典", "Sweden"],
  "NO": ["挪威", "Norway"],
  "DK": ["丹麦", "Denmark"],
  "FI": ["芬兰", "Finland"],
  "PL": ["波兰", "Poland"],
  "TR": ["土耳其", "Turkey"],
  "TH": ["泰国", "Thailand"],
  "VN": ["越南", "Vietnam"],
  "ID": ["印度尼西亚", "Indonesia"],
  "MY": ["马来西亚", "Malaysia"],
  "PH": ["菲律宾", "Philippines"],
  "AE": ["阿联酋", "UAE"],
  "SA": ["沙特阿拉伯", "Saudi Arabia"],
  "IL": ["以色列", "Israel"],
  "ZA": ["南非", "South Africa"],
  "MX": ["墨西哥", "Mexico"],
  "AR": ["阿根廷", "Argentina"],
  "CH": ["瑞士", "Switzerland"],
  "AT": ["奥地利", "Austria"],
  "BE": ["比利时", "Belgium"],
  "PT": ["葡萄牙", "Portugal"],
  "GR": ["希腊", "Greece"],
  "CZ": ["捷克", "Czech Republic"],
  "HU": ["匈牙利", "Hungary"],
  "RO": ["罗马尼亚", "Romania"],
  "UA": ["乌克兰", "Ukraine"],
  "EG": ["埃及", "Egypt"],
  "NG": ["尼日利亚", "Nigeria"],
  "PK": ["巴基斯坦", "Pakistan"],
  "BD": ["孟加拉国", "Bangladesh"],
  "IR": ["伊朗", "Iran"],
  "CL": ["智利", "Chile"],
  "CO": ["哥伦比亚", "Colombia"],
  "PE": ["秘鲁", "Peru"],
  "NZ": ["新西兰", "New Zealand"],
  "IE": ["爱尔兰", "Ireland"],
  "KE": ["肯尼亚", "Kenya"],
  "MO": ["澳门", "Macao"],
};

const CITY_NAMES_ZH: Record<string, string> = {
  "Beijing": "北京",
  "Shanghai": "上海",
  "Guangzhou": "广州",
  "Shenzhen": "深圳",
  "Hangzhou": "杭州",
  "Chengdu": "成都",
  "Nanjing": "南京",
  "Wuhan": "武汉",
  "Tianjin": "天津",
  "Chongqing": "重庆",
  "Hong Kong": "香港",
  "Taipei": "台北",
  "Tokyo": "东京",
  "Osaka": "大阪",
  "Seoul": "首尔",
  "Busan": "釜山",
  "Singapore": "新加坡",
  "Kuala Lumpur": "吉隆坡",
  "Bangkok": "曼谷",
  "Jakarta": "雅加达",
  "Manila": "马尼拉",
  "Hanoi": "河内",
  "Ho Chi Minh City": "胡志明市",
  "Mumbai": "孟买",
  "New Delhi": "新德里",
  "Dubai": "迪拜",
  "Abu Dhabi": "阿布扎比",
  "Riyadh": "利雅得",
  "Tel Aviv": "特拉维夫",
  "New York": "纽约",
  "Los Angeles": "洛杉矶",
  "San Francisco": "旧金山",
  "Chicago": "芝加哥",
  "Houston": "休斯顿",
  "Miami": "迈阿密",
  "Seattle": "西雅图",
  "Boston": "波士顿",
  "Washington": "华盛顿",
  "Washington DC": "华盛顿",
  "London": "伦敦",
  "Paris": "巴黎",
  "Berlin": "柏林",
  "Munich": "慕尼黑",
  "Hamburg": "汉堡",
  "Rome": "罗马",
  "Milan": "米兰",
  "Madrid": "马德里",
  "Barcelona": "巴塞罗那",
  "Lisbon": "里斯本",
  "Amsterdam": "阿姆斯特丹",
  "Rotterdam": "鹿特丹",
  "Brussels": "布鲁塞尔",
  "Vienna": "维也纳",
  "Zurich": "苏黎世",
  "Geneva": "日内瓦",
  "Stockholm": "斯德哥尔摩",
  "Oslo": "奥斯陆",
  "Copenhagen": "哥本哈根",
  "Helsinki": "赫尔辛基",
  "Warsaw": "华沙",
  "Prague": "布拉格",
  "Budapest": "布达佩斯",
  "Bucharest": "布加勒斯特",
  "Athens": "雅典",
  "Moscow": "莫斯科",
  "Saint Petersburg": "圣彼得堡",
  "Kyiv": "基辅",
  "Istanbul": "伊斯坦布尔",
  "Ankara": "安卡拉",
  "Cairo": "开罗",
  "Lagos": "拉各斯",
  "Nairobi": "内罗毕",
  "Cape Town": "开普敦",
  "Johannesburg": "约翰内斯堡",
  "Sydney": "悉尼",
  "Melbourne": "墨尔本",
  "Toronto": "多伦多",
  "Vancouver": "温哥华",
  "Montreal": "蒙特利尔",
  "Mexico City": "墨西哥城",
  "Sao Paulo": "圣保罗",
  "Rio de Janeiro": "里约热内卢",
  "Buenos Aires": "布宜诺斯艾利斯",
  "Santiago": "圣地亚哥",
  "Lima": "利马",
  "Bogota": "波哥大",
  "Krakow": "克拉科夫",
  "Dublin": "都柏林",
  "Edinburgh": "爱丁堡",
  "Manchester": "曼彻斯特",
  "Birmingham": "伯明翰",
  "Frankfurt": "法兰克福",
  "Stuttgart": "斯图加特",
  "Naples": "那不勒斯",
  "Turin": "都灵",
  "Valencia": "巴伦西亚",
  "Yokohama": "横滨",
  "Nagoya": "名古屋",
  "Sapporo": "札幌",
  "Incheon": "仁川",
  "Daegu": "大邱",
  "Daejeon": "大田",
  "Auckland": "奥克兰",
  "Manama": "麦纳麦",
  "Doha": "多哈",
  "Kuwait City": "科威特城",
  "Muscat": "马斯喀特",
};

function displayCountry(code: string, lang: "zh" | "en"): string {
  if (!code) return "";
  const upper = code.toUpperCase();
  const pair = COUNTRY_NAMES[upper];
  if (pair) return lang === "zh" ? pair[0] : pair[1];
  return code;
}

function displayCity(city: string, lang: "zh" | "en"): string {
  if (!city) return "";
  if (lang === "en") return city;
  const zh = CITY_NAMES_ZH[city];
  if (zh) return zh;
  // 未匹配到的城市名保留英文
  return city;
}

function displayLocation(country: string, city: string, lang: "zh" | "en"): string {
  const c = displayCountry(country, lang);
  const ci = displayCity(city, lang);
  if (c && ci) return `${c} ${ci}`;
  if (c) return c;
  if (ci) return ci;
  return "";
}

// Types
interface SearchStat { app_id: string; app_title: string; count: number }
interface DownloadStat { app_id: string; app_title: string; count: number }
interface ActivityItem { type: "search" | "download"; visitor_id: string; app_id: string; app_title: string; query?: string; timestamp: string; ip_country: string; ip_city: string; device_brand: string; device_os: string; device_browser: string; is_mobile: boolean }

interface VisitorInfo {
  visitor_id: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  search_count: number;
  download_count: number;
  ip_country: string;
  ip_city: string;
  ip_region: string;
  user_agent: string;
  device_brand: string;
  device_model: string;
  device_os: string;
  device_browser: string;
  is_mobile: boolean;
}

interface VisitorDetailLog {
  id: number;
  type: "search" | "download";
  app_id: string;
  app_title: string;
  query?: string;
  query_type?: string;
  timestamp: string;
}

interface AdminData {
  visitors: number;
  total_searches: number;
  total_downloads: number;
  top_searches: SearchStat[];
  top_downloads: DownloadStat[];
  recent_activity: ActivityItem[];
  visitor_list: VisitorInfo[];
}

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) { setError("请输入密码"); return; }
    onLogin(password.trim());
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">后台管理</h1>
          <p className="mt-2 text-sm text-gray-500">GPT Apk 数据统计</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">管理员密码</label>
            <input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="请输入管理员密码" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800">登录</button>
        </form>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${color}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

function VisitorAvatar({ visitorId, title }: { visitorId: string; title?: string }) {
  const initials = visitorId.substring(0, 2).toUpperCase();
  const hue = visitorId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white cursor-default"
      style={{ backgroundColor: `hsl(${hue}, 60%, 50%)` }} title={title || visitorId}>
      {initials}
    </span>
  );
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${diffMin} 分钟前`;
  if (diffHours < 24) return `${diffHours} 小时前`;
  if (diffDays < 7) return `${diffDays} 天前`;
  return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function ActionBadge({ type }: { type: "search" | "download" }) {
  return type === "search"
    ? <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">搜索</span>
    : <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">下载</span>;
}

function DeviceTag({ label, icon }: { label: string; icon: string }) {
  if (!label) return null;
  return <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{icon} {label}</span>;
}

function tr(visitorId: string): string {
  return visitorId.substring(0, 8) + "…";
}

function TimeFilterBar({
  dateStart, dateEnd, onDateChange,
}: {
  dateStart: string; dateEnd: string;
  onDateChange: (start: string, end: string) => void;
}) {
  const today = new Date().toISOString().slice(0, 10);

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);

  const quickBtns = [
    { label: "今天", onClick: () => onDateChange(today, today) },
    { label: "最近7天", onClick: () => onDateChange(sevenDaysAgo, today) },
    { label: "最近30天", onClick: () => onDateChange(thirtyDaysAgo, today) },
    { label: "全部", onClick: () => onDateChange("", "") },
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <span className="text-sm font-medium text-gray-700">时间筛选：</span>
      <input type="date" value={dateStart}
        onChange={(e) => onDateChange(e.target.value, dateEnd)}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" />
      <span className="text-gray-400">—</span>
      <input type="date" value={dateEnd}
        onChange={(e) => onDateChange(dateStart, e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" />
      {quickBtns.map((btn) => (
        <button key={btn.label} onClick={btn.onClick}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
          {btn.label}
        </button>
      ))}
    </div>
  );
}

function VisitorDetailModal({
  visitor,
  onClose,
  token,
  lang,
}: {
  visitor: VisitorInfo;
  onClose: () => void;
  token: string;
  lang: "zh" | "en";
}) {
  const [logs, setLogs] = useState<VisitorDetailLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/visitor?key=${encodeURIComponent(token)}&vid=${encodeURIComponent(visitor.visitor_id)}`)
      .then((r) => r.json())
      .then((d) => setLogs(d.logs || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [visitor.visitor_id, token]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="mx-4 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* 头部 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VisitorAvatar visitorId={visitor.visitor_id} title={visitor.visitor_id} />
            <div>
              <h2 className="text-lg font-bold text-gray-900">{lang === "zh" ? "用户详情" : "User Details"}</h2>
              <p className="text-xs text-gray-400 font-mono">{visitor.visitor_id}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">✕</button>
        </div>

        {/* 基本信息卡片 */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoItem label={lang === "zh" ? "访问次数" : "Visits"} value={lang === "zh" ? `${visitor.visit_count} 次` : `${visitor.visit_count} visits`} />
          <InfoItem label={lang === "zh" ? "搜索次数" : "Searches"} value={lang === "zh" ? `${visitor.search_count} 次` : `${visitor.search_count}`} />
          <InfoItem label={lang === "zh" ? "下载次数" : "Downloads"} value={lang === "zh" ? `${visitor.download_count} 次` : `${visitor.download_count}`} />
          <InfoItem label={lang === "zh" ? "设备" : "Device"} value={visitor.is_mobile ? (lang === "zh" ? "📱 移动端" : "📱 Mobile") : (lang === "zh" ? "💻 桌面端" : "💻 Desktop")} />
          <InfoItem label={lang === "zh" ? "国家" : "Country"} value={visitor.ip_country ? displayCountry(visitor.ip_country, lang) : (lang === "zh" ? "未知" : "Unknown")} />
          <InfoItem label={lang === "zh" ? "城市" : "City"} value={displayCity(visitor.ip_city, lang) || (lang === "zh" ? "未知" : "Unknown")} />
          <InfoItem label={lang === "zh" ? "地区" : "Region"} value={visitor.ip_region || (lang === "zh" ? "未知" : "Unknown")} />
          <InfoItem label={lang === "zh" ? "首次访问" : "First Visit"} value={formatTime(visitor.first_visit)} />
          <InfoItem label={lang === "zh" ? "最近访问" : "Last Visit"} value={formatTime(visitor.last_visit)} />
        </div>

        {/* 设备详情 */}
        <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">📱 {lang === "zh" ? "设备信息" : "Device Info"}</h3>
          <div className="flex flex-wrap gap-2">
            <DeviceTag label={visitor.device_brand} icon="🏭" />
            <DeviceTag label={visitor.device_model} icon="📟" />
            <DeviceTag label={visitor.device_os} icon="⚙️" />
            <DeviceTag label={visitor.device_browser} icon="🌐" />
          </div>
          {visitor.user_agent && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600">UA 详情</summary>
              <p className="mt-1 break-all text-xs text-gray-400">{visitor.user_agent}</p>
            </details>
          )}
        </div>

        {/* 操作日志 */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-700">📋 {lang === "zh" ? `操作记录（共 ${logs.length} 条）` : `Activity (${logs.length})`}</h3>
          {loading ? (
            <div className="py-8 text-center text-sm text-gray-400">加载中...</div>
          ) : logs.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">暂无记录</div>
          ) : (
            <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs text-gray-500">类型</th>
                    <th className="px-3 py-2 text-left text-xs text-gray-500">内容</th>
                    <th className="px-3 py-2 text-right text-xs text-gray-500">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {logs.map((log) => (
                    <tr key={`${log.type}-${log.id}`} className="hover:bg-gray-50">
                      <td className="px-3 py-2"><ActionBadge type={log.type} /></td>
                      <td className="px-3 py-2 text-gray-700">
                        {log.type === "search"
                          ? (log.query || log.app_title || log.app_id)
                          : (log.app_title || log.app_id)}
                        <span className="ml-1 text-xs text-gray-400">
                          {log.type === "search" && log.app_title ? `→ ${log.app_title}` : ""}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right text-xs text-gray-400">{formatTime(log.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  if (!value || value === "未知") return null;
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function Dashboard({ data, token, onViewVisitor, lang, onLangChange }: { data: AdminData; token: string; onViewVisitor: (v: VisitorInfo) => void; lang: "zh" | "en"; onLangChange: (l: "zh" | "en") => void }) {
  const [visitorPage, setVisitorPage] = useState(0);
  const [searchTopPage, setSearchTopPage] = useState(0);
  const [activityPage, setActivityPage] = useState(0);

  const VISITORS_PER_PAGE = 20;

  // Reset pages when data changes
  useEffect(() => { setVisitorPage(0); }, [data.visitor_list.length]);
  useEffect(() => { setSearchTopPage(0); }, [data.top_searches.length]);
  useEffect(() => { setActivityPage(0); }, [data.recent_activity.length]);

  const paginatedVisitorList = data.visitor_list.slice(visitorPage * VISITORS_PER_PAGE, (visitorPage + 1) * VISITORS_PER_PAGE);
  const paginatedSearchList = data.top_searches.slice(searchTopPage * VISITORS_PER_PAGE, (searchTopPage + 1) * VISITORS_PER_PAGE);
  const paginatedActivityList = data.recent_activity.slice(activityPage * VISITORS_PER_PAGE, (activityPage + 1) * VISITORS_PER_PAGE);
  const maxVisitorPage = Math.max(0, Math.ceil(data.visitor_list.length / VISITORS_PER_PAGE) - 1);
  const maxSearchPage = Math.max(0, Math.ceil(data.top_searches.length / VISITORS_PER_PAGE) - 1);
  const maxActivityPage = Math.max(0, Math.ceil(data.recent_activity.length / VISITORS_PER_PAGE) - 1);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="总访客" value={data.visitors} color="bg-white border-gray-200" />
        <StatCard label="总搜索次数" value={data.total_searches} color="bg-white border-gray-200" />
        <StatCard label="总下载次数" value={data.total_downloads} color="bg-white border-gray-200" />
      </div>

      {/* Visitor List */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">👥 访客用户列表</h2>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5 text-xs">
            <button onClick={() => onLangChange("zh")}
              className={`rounded-md px-2.5 py-1 transition ${lang === "zh" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>中文</button>
            <button onClick={() => onLangChange("en")}
              className={`rounded-md px-2.5 py-1 transition ${lang === "en" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>EN</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">#</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">用户</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:table-cell">地区</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden md:table-cell">设备</th>
                <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">访次</th>
                <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">搜索</th>
                <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">下载</th>
                <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:table-cell">最近</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedVisitorList.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-400">暂无访客数据</td></tr>
              )}
              {paginatedVisitorList.map((v, i) => (
                <tr key={v.visitor_id}
                  className="cursor-pointer transition hover:bg-blue-50"
                  onClick={() => onViewVisitor(v)}>
                  <td className="px-3 py-3 text-sm text-gray-400">{visitorPage * VISITORS_PER_PAGE + i + 1}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <VisitorAvatar visitorId={v.visitor_id} title={v.visitor_id} />
                      <span className="font-mono text-xs text-gray-700" title={v.visitor_id}>{tr(v.visitor_id)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500 hidden sm:table-cell">
                    {displayLocation(v.ip_country, v.ip_city, lang) || "—"}
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {v.is_mobile ? (
                        <>
                          {v.device_brand && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{v.device_brand}</span>}
                          {v.device_model && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{v.device_model}</span>}
                          {v.device_os && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{v.device_os}</span>}
                        </>
                      ) : (
                        <>
                          <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-600">PC</span>
                          {v.device_os && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{v.device_os}</span>}
                          {v.device_browser && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600">{v.device_browser}</span>}
                        </>
                      )}
                      {!v.device_brand && !v.device_os && !v.device_browser && <span className="text-xs text-gray-300">—</span>}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center text-sm font-medium text-gray-900">{v.visit_count}</td>
                  <td className="px-3 py-3 text-center text-sm text-blue-600">{v.search_count}</td>
                  <td className="px-3 py-3 text-center text-sm text-green-600">{v.download_count}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-400 hidden sm:table-cell">{formatTime(v.last_visit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
            <span className="text-xs text-gray-400">共 {data.visitor_list.length} 个访客用户 · 点击可查看详情</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setVisitorPage(p => Math.max(0, p - 1))} disabled={visitorPage === 0}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">上一页</button>
              <span className="text-xs text-gray-500">{visitorPage + 1} / {Math.ceil(data.visitor_list.length / VISITORS_PER_PAGE) || 1}</span>
              <button onClick={() => setVisitorPage(p => Math.min(maxVisitorPage, p + 1))} disabled={visitorPage >= maxVisitorPage}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Rankings */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">🔍 搜索排行榜</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">App</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">次数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSearchList.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-400">暂无数据</td></tr>}
              {paginatedSearchList.map((item, i) => (
                <tr key={item.app_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-400">{searchTopPage * VISITORS_PER_PAGE + i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.app_title || item.app_id}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
            <span className="text-xs text-gray-400">共 {data.top_searches.length} 条</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchTopPage(p => Math.max(0, p - 1))} disabled={searchTopPage === 0}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">上一页</button>
              <span className="text-xs text-gray-500">{searchTopPage + 1} / {Math.ceil(data.top_searches.length / VISITORS_PER_PAGE) || 1}</span>
              <button onClick={() => setSearchTopPage(p => Math.min(maxSearchPage, p + 1))} disabled={searchTopPage >= maxSearchPage}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">下一页</button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Rankings */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">📥 下载排行榜</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">App</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">次数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.top_downloads.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-400">暂无数据</td></tr>}
              {data.top_downloads.map((item, i) => (
                <tr key={item.app_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.app_title || item.app_id}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">🕐 最近活动</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {paginatedActivityList.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">暂无活动记录</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {paginatedActivityList.map((item, i) => (
                <li key={`${item.type}-${i}-${item.timestamp}`}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <VisitorAvatar visitorId={item.visitor_id} title={item.visitor_id} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <ActionBadge type={item.type} />
                        <span className="truncate text-sm font-medium text-gray-900">
                          {item.app_title || item.app_id || (item.type === "search" ? item.query : "未知")}
                        </span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                        {(item.ip_country || item.ip_city) && (
                          <span className="text-[10px] text-gray-400">📍{displayLocation(item.ip_country, item.ip_city, lang)}</span>
                        )}
                        {item.is_mobile ? (
                          <>
                            {item.device_brand && <span className="text-[10px] text-gray-400">📱{item.device_brand}</span>}
                            {item.device_os && <span className="text-[10px] text-gray-400">⚙️{item.device_os}</span>}
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] text-gray-400">💻PC</span>
                            {item.device_os && <span className="text-[10px] text-gray-400">{item.device_os}</span>}
                            {item.device_browser && <span className="text-[10px] text-gray-400">🌐{item.device_browser}</span>}
                          </>
                        )}
                        {item.type === "search" && item.query && (
                          <span className="text-[10px] text-gray-400">🔍{item.query}</span>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">{formatTime(item.timestamp)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
            <span className="text-xs text-gray-400">共 {data.recent_activity.length} 条</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setActivityPage(p => Math.max(0, p - 1))} disabled={activityPage === 0}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">上一页</button>
              <span className="text-xs text-gray-500">{activityPage + 1} / {Math.ceil(data.recent_activity.length / VISITORS_PER_PAGE) || 1}</span>
              <button onClick={() => setActivityPage(p => Math.min(maxActivityPage, p + 1))} disabled={activityPage >= maxActivityPage}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" /></div>;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [dateStart, setDateStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [dateEnd, setDateEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorInfo | null>(null);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const fetchData = useCallback(async (authToken: string, start?: string, end?: string) => {
    try {
      const params = new URLSearchParams();
      params.set("key", authToken);
      if (start) params.set("start", start);
      if (end) params.set("end", end);
      const res = await fetch(`/api/admin?${params}`);
      if (res.status === 401) {
        setError("密码错误");
        setToken(null);
        document.cookie = "admin_token=; path=/; max-age=0; SameSite=Lax";
        return;
      }
      if (!res.ok) { setError("数据获取失败"); return; }
      setData(await res.json());
      setError("");
    } catch {
      setError("网络错误");
    }
  }, []);

  const handleLogin = useCallback((password: string) => {
    document.cookie = `admin_token=${encodeURIComponent(password)}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
    setToken(password);
    setLoading(true);
    fetchData(password, dateStart, dateEnd).finally(() => setLoading(false));
  }, [fetchData, dateStart, dateEnd]);

  const handleDateChange = useCallback((start: string, end: string) => {
    setDateStart(start);
    setDateEnd(end);
    if (token) {
      setLoading(true);
      fetchData(token, start, end).finally(() => setLoading(false));
    }
  }, [token, fetchData]);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
    const cookieToken = match ? decodeURIComponent(match[1]) : null;
    if (cookieToken) {
      setToken(cookieToken);
      fetchData(cookieToken, dateStart, dateEnd).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchData, dateStart, dateEnd]);

  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => { fetchData(token, dateStart, dateEnd); }, 60000);
    return () => clearInterval(interval);
  }, [token, fetchData, dateStart, dateEnd]);

  if (!token) {
    if (loading) return <LoadingSpinner />;
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">GPT Apk 后台</h1>
            <p className="text-xs text-gray-400">数据统计面板</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">每 60 秒自动刷新</span>
            <button onClick={() => { setLoading(true); fetchData(token, dateStart, dateEnd).finally(() => setLoading(false)); }}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">
              {loading ? "刷新中..." : "刷新"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <TimeFilterBar dateStart={dateStart} dateEnd={dateEnd} onDateChange={handleDateChange} />

        {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
        {data ? <Dashboard data={data} token={token} onViewVisitor={setSelectedVisitor} lang={lang} onLangChange={setLang} /> : <LoadingSpinner />}
      </main>

      {selectedVisitor && (
        <VisitorDetailModal visitor={selectedVisitor} token={token} lang={lang} onClose={() => setSelectedVisitor(null)} />
      )}
    </div>
  );
}
