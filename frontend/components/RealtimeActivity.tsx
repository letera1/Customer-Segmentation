"use client";

import { useState } from "react";

interface ActivityItem {
  type: "prediction" | "segment" | "customer" | "report";
  user: string;
  action: string;
  time: string;
}

export default function RealtimeActivity() {
  const [activities] = useState<ActivityItem[]>([
    { type: "prediction", user: "Inference Engine", action: "Assigned to High Value", time: "just now" },
    { type: "segment", user: "K-Means Pipeline", action: "Centroids convergence (k=5)", time: "2m ago" },
    { type: "customer", user: "REST API", action: "Bulk dataset ingestion", time: "8m ago" },
    { type: "report", user: "Analytics Job", action: "Profiling report cached", time: "14m ago" },
  ]);

  // Fixed static heights for activity trend to prevent hydration mismatches
  const trendHeights = [35, 60, 45, 80, 50, 90, 65, 40, 75, 85, 70, 95];

  const renderIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "prediction":
        return (
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "segment":
        return (
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "customer":
        return (
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "report":
        return (
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-main tracking-tight">
          System Activity
        </h2>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-charcoal-700/60 dark:border-white/[0.06] bg-softgray-100/60 dark:bg-[#181A20] p-2.5 transition-all hover:border-indigo-500/30"
          >
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#20222A] border border-charcoal-700/40 dark:border-white/[0.06] flex items-center justify-center shrink-0">
              {renderIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-main truncate">{activity.action}</p>
              <p className="text-[10px] font-medium text-sub">{activity.user}</p>
            </div>
            <span className="text-[10px] font-semibold text-muted whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>

      {/* Activity Trend Frequency Bar Chart */}
      <div className="mt-5 pt-4 border-t border-charcoal-700/40 dark:border-white/[0.06]">
        <div className="flex items-center justify-between text-[11px] font-bold text-sub mb-3">
          <span>Inference Frequency</span>
          <span className="text-indigo-400 font-semibold">99.8% Uptime</span>
        </div>
        <div className="flex items-end justify-between h-14 gap-1.5">
          {trendHeights.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-indigo-600/40 to-indigo-500 rounded-t-sm transition-all hover:opacity-100 opacity-75"
              style={{ height: `${height}%` }}
              title={`Slot ${i + 1}: ${height}% load`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
