"use client";

import { useEffect, useState, useCallback } from "react";

// Types matching the API response
interface SearchStat {
  app_id: string;
  app_title: string;
  count: number;
}

interface DownloadStat {
  app_id: string;
  app_title: string;
  count: number;
}

interface ActivityItem {
  type: "search" | "download";
  visitor_id: string;
  app_id: string;
  app_title: string;
  query?: string;
  timestamp: string;
}

interface AdminData {
  visitors: number;
  total_searches: number;
  total_downloads: number;
  top_searches: SearchStat[];
  top_downloads: DownloadStat[];
  recent_activity: ActivityItem[];
}

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("请输入密码");
      return;
    }
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              管理员密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="请输入管理员密码"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${color}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

function VisitorAvatar({ visitorId }: { visitorId: string }) {
  const initials = visitorId.substring(0, 2).toUpperCase();
  const hue =
    visitorId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: `hsl(${hue}, 60%, 50%)` }}
    >
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
  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ActionBadge({ type }: { type: "search" | "download" }) {
  if (type === "search") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
        搜索
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      下载
    </span>
  );
}

function Dashboard({ data }: { data: AdminData }) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="总访客"
          value={data.visitors}
          color="bg-white border-gray-200"
        />
        <StatCard
          label="总搜索次数"
          value={data.total_searches}
          color="bg-white border-gray-200"
        />
        <StatCard
          label="总下载次数"
          value={data.total_downloads}
          color="bg-white border-gray-200"
        />
      </div>

      {/* Search Rankings */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          搜索排行榜
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  App
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  次数
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.top_searches.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    暂无数据
                  </td>
                </tr>
              )}
              {data.top_searches.map((item, i) => (
                <tr key={item.app_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.app_title || item.app_id}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Rankings */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          下载排行榜
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  App
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  次数
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.top_downloads.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    暂无数据
                  </td>
                </tr>
              )}
              {data.top_downloads.map((item, i) => (
                <tr key={item.app_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.app_title || item.app_id}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">最近活动</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {data.recent_activity.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              暂无活动记录
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.recent_activity.map((item, i) => (
                <li key={`${item.type}-${i}-${item.timestamp}`}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <VisitorAvatar visitorId={item.visitor_id} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <ActionBadge type={item.type} />
                        <span className="truncate text-sm font-medium text-gray-900">
                          {item.app_title || item.app_id || (item.type === "search" ? item.query : "未知")}
                        </span>
                      </div>
                      {item.type === "search" && item.query && (
                        <p className="mt-0.5 truncate text-xs text-gray-400">
                          搜索词: {item.query}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(authToken)}`);
      if (res.status === 401) {
        setError("密码错误");
        setToken(null);
        document.cookie =
          "admin_token=; path=/; max-age=0; SameSite=Lax";
        return;
      }
      if (!res.ok) {
        setError("数据获取失败");
        return;
      }
      const json: AdminData = await res.json();
      setData(json);
      setError("");
    } catch {
      setError("网络错误");
    }
  }, []);

  const handleLogin = useCallback(
    (password: string) => {
      document.cookie = `admin_token=${encodeURIComponent(password)}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
      setToken(password);
      setLoading(true);
      fetchData(password).finally(() => setLoading(false));
    },
    [fetchData]
  );

  // Check cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
    const cookieToken = match ? decodeURIComponent(match[1]) : null;
    if (cookieToken) {
      setToken(cookieToken);
      fetchData(cookieToken).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      fetchData(token);
    }, 60000);
    return () => clearInterval(interval);
  }, [token, fetchData]);

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
            <span className="text-xs text-gray-400">
              每 60 秒自动刷新
            </span>
            <button
              onClick={() => {
                setLoading(true);
                fetchData(token).finally(() => setLoading(false));
              }}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "刷新中..." : "刷新"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {data ? <Dashboard data={data} /> : <LoadingSpinner />}
      </main>
    </div>
  );
}
