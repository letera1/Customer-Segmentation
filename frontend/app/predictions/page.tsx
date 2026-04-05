"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function Predictions() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("prediction_history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Prediction History</h2>
            <p className="mt-1 text-sm text-slate-400">
              All customer segment predictions
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("prediction_history");
              setHistory([]);
            }}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            Clear History
          </button>
        </div>

        <div className="grid gap-4">
          {history.length > 0 ? (
            history.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.segment_name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.segment_description}
                    </p>
                    <div className="mt-4 flex gap-6 text-sm">
                      <div>
                        <span className="text-slate-400">Age:</span>{" "}
                        <span className="font-medium">{item.age}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Income:</span>{" "}
                        <span className="font-medium">${item.income}k</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Spending:</span>{" "}
                        <span className="font-medium">{item.spendingScore}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-indigo-600/20 px-3 py-1 text-xs">
                      Cluster {item.cluster_id}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
              <p className="text-slate-400">No predictions yet</p>
            </div>
          )}
        </div>
      </div>
    </LayoutV2>
  );
}
