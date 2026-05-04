export default function Loading() {
  return (
    <div className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="shrink-0">
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-3xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="h-8 sm:h-10 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="pt-6">
            <div className="h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
      <div className="mt-12 w-full">
        <div className="h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4" />
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
