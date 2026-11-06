"use client";

import { useState } from "react";

export default function SegmentDistribution() {
  const [segments] = useState([
    { id: 0, name: "Budget Conscious", count: 48, percentage: 19.2, color: "bg-amber-500", barGlow: "from-amber-500 to-amber-600" },
    { id: 1, name: "High Value", count: 54, percentage: 21.6, color: "bg-indigo-500", barGlow: "from-indigo-500 to-indigo-600" },
    { id: 2, name: "Potential Growth", count: 51, percentage: 20.4, color: "bg-cyan-500", barGlow: "from-cyan-500 to-cyan-600" },
    { id: 3, name: "Average Customers", count: 52, percentage: 20.8, color: "bg-emerald-500", barGlow: "from-emerald-500 to-emerald-600" },
    { id: 4, name: "Young Savers", count: 45, percentage: 18.0, color: "bg-rose-500", barGlow: "from-rose-500 to-rose-600" },
  ]);

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white dark:text-[#ECEEF2]">
            Cohort Segment Distribution
          </h2>
          <p className="text-xs text-[#848CA2]">
            Cluster population breakdown across total active records (250 customers)
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
          5 Personas
        </span>
      </div>

      {/* Segment Breakdown Progress Rows */}
      <div className="space-y-3.5">
        {segments.map((segment) => (
          <div key={segment.id} className="space-y-1.5 p-2 rounded-xl hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${segment.color} ring-2 ring-white/10`} />
                <span className="font-bold text-[#CAD1DE] tracking-tight">{segment.name}</span>
                <span className="text-[10px] text-[#5F667A] font-semibold">#{segment.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white dark:text-[#ECEEF2]">{segment.count}</span>
                <span className="text-[11px] font-bold text-[#848CA2] bg-[#20222A] px-2 py-0.5 rounded-md border border-white/[0.05]">
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full bg-[#181A20] dark:bg-[#141519] rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${segment.barGlow} rounded-full transition-all duration-700`}
                style={{ width: `${segment.percentage * 3.5}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Chart Visualization */}
      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        <div className="flex items-end justify-between h-28 gap-3 px-2">
          {segments.map((segment) => (
            <div key={segment.id} className="flex-1 flex flex-col items-center h-full justify-end group">
              <span className="text-[10px] font-black text-[#CAD1DE] mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {segment.percentage}%
              </span>
              <div
                className={`w-full bg-gradient-to-t ${segment.barGlow} rounded-t-lg transition-all duration-500 opacity-85 group-hover:opacity-100 group-hover:scale-y-105`}
                style={{ height: `${segment.percentage * 3.8}%` }}
              />
              <span className="text-[#848CA2] text-[11px] font-bold mt-2">
                C{segment.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
