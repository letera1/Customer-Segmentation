"use client";

import { useState } from "react";

export default function CustomerInsights() {
  const [timeframe, setTimeframe] = useState("Last 30 days");

  const insights = [
    {
      metric: "Median Age",
      value: "41.6",
      unit: "yrs",
      trend: "+1.8%",
      positive: true,
      subtext: "core demographic",
    },
    {
      metric: "Avg Annual Income",
      value: "$68.4",
      unit: "k",
      trend: "+4.9%",
      positive: true,
      subtext: "purchasing power",
    },
    {
      metric: "Mean Spending Score",
      value: "54.7",
      unit: "/ 100",
      trend: "-0.8%",
      positive: false,
      subtext: "index average",
    },
    {
      metric: "Cohort Retention",
      value: "89.2",
      unit: "%",
      trend: "+3.4%",
      positive: true,
      subtext: "30-day active rate",
    },
  ];

  return (
    <div className="panel p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white dark:text-[#ECEEF2]">
            Behavioral Intelligence & Activity Heatmap
          </h2>
          <p className="text-xs text-[#848CA2]">
            High-level demographic indicators and user classification frequency
          </p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-xl border border-white/[0.08] bg-[#181A20] px-3.5 py-1.5 text-xs font-bold text-[#CAD1DE] focus:outline-none focus:border-indigo-500/60"
        >
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* 4 KPI Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.07] bg-[#181A20] p-4 card-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#848CA2]">
                {insight.metric}
              </span>
              <span
                className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
                  insight.positive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
              >
                {insight.trend}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black tracking-tight text-white dark:text-[#ECEEF2]">
                {insight.value}
              </span>
              <span className="text-xs font-bold text-[#848CA2]">{insight.unit}</span>
            </div>

            <p className="text-[10px] font-medium text-[#5F667A] mt-1">{insight.subtext}</p>
          </div>
        ))}
      </div>

      {/* Activity Heatmap Grid */}
      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#848CA2]">
            Segmentation Pipeline Activity Matrix (35-Day Window)
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-[#5F667A] font-bold">
            <span>Low</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded bg-[#20222A]" />
              <div className="w-2.5 h-2.5 rounded bg-emerald-500/30" />
              <div className="w-2.5 h-2.5 rounded bg-emerald-500/60" />
              <div className="w-2.5 h-2.5 rounded bg-emerald-400" />
            </div>
            <span>High</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const intensityIndex = (i * 7 + 13) % 10;
            return (
              <div
                key={i}
                className={`h-7 rounded-lg transition-all hover:scale-105 cursor-pointer border ${
                  intensityIndex > 7
                    ? "bg-emerald-400 border-emerald-300 shadow-sm shadow-emerald-500/20"
                    : intensityIndex > 4
                    ? "bg-emerald-500/50 border-emerald-500/30"
                    : intensityIndex > 2
                    ? "bg-emerald-500/25 border-emerald-500/20"
                    : "bg-[#20222A] border-white/[0.04]"
                }`}
                title={`Day ${i + 1} - Activity Tier ${intensityIndex}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
