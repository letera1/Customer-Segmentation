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
        // fallback
      }
    }
  }, []);

  const segmentBadges: Record<number, { dot: string; border: string }> = {
    0: { dot: "bg-amber-400", border: "border-amber-400/30" },
    1: { dot: "bg-indigo-400", border: "border-indigo-400/30" },
    2: { dot: "bg-cyan-400", border: "border-cyan-400/30" },
    3: { dot: "bg-emerald-400", border: "border-emerald-400/30" },
    4: { dot: "bg-rose-400", border: "border-rose-400/30" },
  };

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-main tracking-tight">
          Recent Predictions
        </h2>
        {history.length > 0 && (
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("prediction_history");
              }
              setHistory([]);
            }}
            className="text-xs font-semibold text-sub hover:text-rose-400 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-2.5">
          {history.map((item, index) => {
            const badge = segmentBadges[item.cluster_id] || { dot: "bg-indigo-400", border: "border-indigo-400/30" };
            return (
              <div
                key={index}
                className="rounded-xl border border-subtle bg-surface p-3 transition-all hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    <span className="text-xs font-bold text-main">
                      {item.segment_name}
                    </span>
                    <span className="text-[10px] text-muted font-bold">
                      C{item.cluster_id}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-sub">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-sub bg-elevated px-2.5 py-1.5 rounded-lg border border-subtle">
                  <span>Age: <strong className="text-main">{item.age}</strong></span>
                  <span>Inc: <strong className="text-main">${item.income}k</strong></span>
                  <span>Score: <strong className="text-main">{item.spendingScore}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl border border-subtle bg-surface flex items-center justify-center text-sub">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-main">No predictions recorded yet</p>
          <p className="text-[11px] text-muted mt-0.5">Use the analyzer to generate classifications</p>
        </div>
      )}
    </div>
  );
}
