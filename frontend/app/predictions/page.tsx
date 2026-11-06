"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function Predictions() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("prediction_history");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
          }
        }
      } catch {
        // fallback
      }
    }
  }, []);

  const clearHistory = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("prediction_history");
      setHistory([]);
    }
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Inference Telemetry Log
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Historical ledger of customer segmentation classifications and feature telemetry
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-charcoal-700/60 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2 text-xs font-bold text-sub hover:text-rose-400 hover:border-rose-500/30 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Log History
            </button>
          )}
        </div>

        <div className="grid gap-3.5">
          {history.length > 0 ? (
            history.map((item, i) => (
              <div
                key={i}
                className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <h3 className="text-base font-bold text-main">{item.segment_name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-softgray-100 dark:bg-[#20222A] text-sub border border-charcoal-700/40 dark:border-white/[0.08]">
                        Cluster #{item.cluster_id}
                      </span>
                    </div>
                    <p className="text-xs text-sub leading-relaxed max-w-2xl">
                      {item.segment_description}
                    </p>

                    <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs">
                      <div className="bg-softgray-100 dark:bg-[#181A20] px-3 py-1.5 rounded-lg border border-charcoal-700/30 dark:border-white/[0.05]">
                        <span className="text-muted text-[10px] uppercase font-bold tracking-wider mr-1.5">Age</span>
                        <strong className="text-main">{item.age} yrs</strong>
                      </div>
                      <div className="bg-softgray-100 dark:bg-[#181A20] px-3 py-1.5 rounded-lg border border-charcoal-700/30 dark:border-white/[0.05]">
                        <span className="text-muted text-[10px] uppercase font-bold tracking-wider mr-1.5">Annual Income</span>
                        <strong className="text-main">${item.income}k</strong>
                      </div>
                      <div className="bg-softgray-100 dark:bg-[#181A20] px-3 py-1.5 rounded-lg border border-charcoal-700/30 dark:border-white/[0.05]">
                        <span className="text-muted text-[10px] uppercase font-bold tracking-wider mr-1.5">Spending Score</span>
                        <strong className="text-main">{item.spendingScore} / 100</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-[11px] font-mono text-muted">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="panel p-12 text-center border border-charcoal-700/60 dark:border-white/[0.06]">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl border border-charcoal-700/60 dark:border-white/10 bg-softgray-100 dark:bg-[#181A20] flex items-center justify-center text-sub">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-main">No Inference Logs Recorded</p>
              <p className="text-xs text-sub mt-1">Classifications generated from the dashboard will be chronologically logged here</p>
            </div>
          )}
        </div>
      </div>
    </LayoutV2>
  );
}
