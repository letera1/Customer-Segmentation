"use client";

import { useEffect, useState } from "react";

export default function RealtimeActivity() {
  const [activities, setActivities] = useState([
    { type: "prediction", user: "System", action: "New prediction", time: "2s ago", icon: "🔮" },
    { type: "segment", user: "Admin", action: "Updated segment", time: "1m ago", icon: "🎯" },
    { type: "customer", user: "API", action: "New customer added", time: "3m ago", icon: "👤" },
    { type: "report", user: "System", action: "Generated report", time: "5m ago", icon: "📊" },
  ]);

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Real-time Activity</h2>
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm">Live</span>
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-xl border border-slate-800/60 bg-slate-950/30 p-3 transition-all hover:border-green-500/30"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-xl">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{activity.action}</p>
              <p className="text-gray-400 text-xs">{activity.user}</p>
            </div>
            <span className="text-gray-500 text-xs">{activity.time}</span>
          </div>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <h3 className="text-white font-medium mb-4 text-sm">Activity Trend</h3>
        <div className="flex items-end justify-between h-20 space-x-1">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-green-500 to-blue-500 rounded-t opacity-70 hover:opacity-100 transition-all"
                style={{ height: `${height}%` }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
