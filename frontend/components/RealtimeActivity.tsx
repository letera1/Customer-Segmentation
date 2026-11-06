"use client";

import { useState } from "react";

export default function RealtimeActivity() {
  const [activities] = useState([
    { type: "prediction", user: "Inference Engine", action: "Assigned to High Value", time: "just now", icon: "⚡" },
    { type: "segment", user: "K-Means Pipeline", action: "Centroids convergence (k=5)", time: "2m ago", icon: "🎯" },
    { type: "customer", user: "REST API", action: "Bulk dataset ingestion", time: "8m ago", icon: "👥" },
    { type: "report", user: "Analytics Job", action: "Profiling report cached", time: "14m ago", icon: "📊" },
  ]);

  // Fixed static heights for activity trend to prevent hydration mismatches
  const trendHeights = [35, 60, 45, 80, 50, 90, 65, 40, 75, 85, 70, 95];

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white dark:text-[#ECEEF2] tracking-tight">
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
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#181A20] p-2.5 transition-all hover:border-white/[0.12]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#20222A] border border-white/[0.06] flex items-center justify-center text-sm">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#ECEEF2] truncate">{activity.action}</p>
              <p className="text-[10px] font-medium text-[#848CA2]">{activity.user}</p>
            </div>
            <span className="text-[10px] font-semibold text-[#5F667A] whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>

      {/* Activity Trend Frequency Bar Chart */}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#848CA2] mb-3">
          <span>Inference Frequency</span>
          <span className="text-indigo-400">99.8% Uptime</span>
        </div>
        <div className="flex items-end justify-between h-14 gap-1.5">
          {trendHeights.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-indigo-600/40 to-purple-500 rounded-t-sm transition-all hover:opacity-100 opacity-75"
              style={{ height: `${height}%` }}
              title={`Slot ${i + 1}: ${height}% load`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
