"use client";

import { useEffect, useState } from "react";

export default function PredictionHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("prediction_history");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setHistory(parsed.slice(0, 5));
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleClear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("prediction_history");
    }
    setHistory([]);
  };

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-subtle">
        <h3 className="text-sm font-semibold tracking-tight text-main">
          Recent Inferences
        </h3>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-[11px] text-muted hover:text-main transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index} className="p-2.5 rounded-lg bg-surface border border-subtle text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-main">{item.segment_name}</span>
                <span className="text-[10px] font-mono text-muted">
                  C{item.cluster_id}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-sub font-mono">
                <span>Age: {item.age}</span>
                <span>Inc: ${item.income}k</span>
                <span>Score: {item.spendingScore}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-muted">
          No recent inferences logged yet.
        </div>
      )}
    </div>
  );
}
