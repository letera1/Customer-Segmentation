"use client";

import { useEffect, useState } from "react";

export default function SegmentDistribution() {
  const [segments, setSegments] = useState([
    { id: 0, name: "Budget Conscious", count: 45, percentage: 22.5, color: "bg-yellow-500" },
    { id: 1, name: "High Value", count: 38, percentage: 19, color: "bg-purple-500" },
    { id: 2, name: "Potential Growth", count: 42, percentage: 21, color: "bg-blue-500" },
    { id: 3, name: "Average", count: 50, percentage: 25, color: "bg-green-500" },
    { id: 4, name: "Young Savers", count: 25, percentage: 12.5, color: "bg-pink-500" },
  ]);

  return (
    <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Segment Distribution</h2>
        <button className="text-gray-400 hover:text-white text-sm">View All →</button>
      </div>

      <div className="space-y-4">
        {segments.map((segment) => (
          <div key={segment.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                <span className="text-white font-medium">{segment.name}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">{segment.count}</span>
                <span className="text-gray-400 text-sm ml-2">({segment.percentage}%)</span>
              </div>
            </div>
            <div className="w-full bg-[#1e293b] rounded-full h-2">
              <div
                className={`${segment.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${segment.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="mt-6 pt-6 border-t border-[#1e293b]">
        <div className="flex items-end justify-between h-32 space-x-2">
          {segments.map((segment) => (
            <div key={segment.id} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full ${segment.color} rounded-t-lg transition-all duration-500 hover:opacity-80`}
                style={{ height: `${segment.percentage * 3}%` }}
              ></div>
              <span className="text-gray-400 text-xs mt-2">{segment.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
