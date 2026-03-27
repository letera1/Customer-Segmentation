"use client";

import { useEffect, useState } from "react";

export default function PredictionHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("prediction_history");
    if (stored) {
      setHistory(JSON.parse(stored).slice(0, 5));
    }
  }, []);

  const segmentColors: any = {
    0: "bg-yellow-500",
    1: "bg-purple-500",
    2: "bg-blue-500",
    3: "bg-green-500",
    4: "bg-pink-500",
  };

  return (
    <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Predictions</h2>
        <button
          onClick={() => {
            localStorage.removeItem("prediction_history");
            setHistory([]);
          }}
          className="text-gray-400 hover:text-white text-sm"
        >
          Clear
        </button>
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-[#0a0e1a] rounded-lg border border-[#1e293b] hover:border-green-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      segmentColors[item.cluster_id]
                    }`}
                  ></div>
                  <span className="text-white text-sm font-medium">
                    {item.segment_name}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Age: {item.age}</span>
                <span>Income: ${item.income}k</span>
                <span>Score: {item.spendingScore}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-2 block">📋</span>
          <p className="text-sm">No predictions yet</p>
        </div>
      )}
    </div>
  );
}
