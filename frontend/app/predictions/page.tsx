"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { batchPredictCustomers, BatchPredictionResponse, CustomerInput } from "@/lib/api";

const SAMPLE_BATCH: CustomerInput[] = [
  { age: 25, annual_income: 28, spending_score: 82 },
  { age: 48, annual_income: 88, spending_score: 22 },
  { age: 36, annual_income: 92, spending_score: 85 },
  { age: 58, annual_income: 34, spending_score: 16 },
  { age: 40, annual_income: 56, spending_score: 52 },
  { age: 22, annual_income: 19, spending_score: 75 },
  { age: 51, annual_income: 110, spending_score: 30 },
  { age: 32, annual_income: 78, spending_score: 79 },
];

export default function Predictions() {
  const [history, setHistory] = useState<any[]>([]);
  const [batchResults, setBatchResults] = useState<BatchPredictionResponse | null>(null);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);

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
        // ignore
      }
    }
  }, []);

  const handleRunSampleBatch = async () => {
    setLoadingBatch(true);
    setBatchError(null);
    try {
      const res = await batchPredictCustomers(SAMPLE_BATCH);
      setBatchResults(res);
    } catch (err: any) {
      setBatchError(err?.message || "Failed to execute batch prediction. Verify API service is reachable.");
    } finally {
      setLoadingBatch(false);
    }
  };

  const handleClearHistory = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("prediction_history");
    }
    setHistory([]);
  };

  const handleExportHistory = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inference_telemetry_history_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Batch Inference & Telemetry Ledger
            </h1>
            <p className="text-xs text-sub mt-0.5">
              High-throughput ML batch predictions and historical classification records
            </p>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={handleExportHistory}
                  className="btn-secondary"
                >
                  Export History (JSON)
                </button>
                <button
                  onClick={handleClearHistory}
                  className="btn-secondary text-sub hover:text-rose-400"
                >
                  Clear Log
                </button>
              </>
            )}
          </div>
        </div>

        {/* Real Batch Prediction Workbench */}
        <div className="panel p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Batch Scoring Workbench (POST /batch-predict)
              </h2>
              <p className="text-xs text-sub">
                Execute array-vectorized inferences in a single HTTP payload
              </p>
            </div>
            <button
              onClick={handleRunSampleBatch}
              disabled={loadingBatch}
              className="btn-primary"
            >
              {loadingBatch ? "Processing Batch..." : "Run Benchmark Batch (8 Records)"}
            </button>
          </div>

          {batchError && (
            <div className="p-3 rounded-lg border border-subtle bg-surface text-xs text-sub">
              <span className="font-semibold text-main">Error:</span> {batchError}
            </div>
          )}

          {batchResults ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-subtle text-xs font-mono">
                <span className="text-sub">
                  Processed: <strong className="text-main">{batchResults.total_processed} records</strong>
                </span>
                <span className="text-sub">
                  Execution Time: <strong className="text-main">{batchResults.processing_time_ms} ms</strong>
                </span>
                <span className="text-sub">
                  Average Latency: <strong className="text-main">{(batchResults.processing_time_ms / batchResults.total_processed).toFixed(2)} ms/record</strong>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-subtle text-muted text-[10px] uppercase font-semibold tracking-wider">
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">Input Demographics</th>
                      <th className="py-2 px-3">Cluster ID</th>
                      <th className="py-2 px-3">Predicted Segment</th>
                      <th className="py-2 px-3">Confidence</th>
                      <th className="py-2 px-3">Recommended Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-subtle">
                    {batchResults.predictions.map((p, idx) => {
                      const input = SAMPLE_BATCH[idx] || { age: "-", annual_income: "-", spending_score: "-" };
                      return (
                        <tr key={idx} className="hover:bg-surface transition-colors">
                          <td className="py-2.5 px-3 font-mono text-muted">{idx + 1}</td>
                          <td className="py-2.5 px-3 font-mono text-main">
                            {input.age} yrs | ${input.annual_income}k | {input.spending_score} score
                          </td>
                          <td className="py-2.5 px-3 font-mono font-medium text-main">#{p.cluster_id}</td>
                          <td className="py-2.5 px-3 font-semibold text-main">{p.segment_name}</td>
                          <td className="py-2.5 px-3 font-mono text-sub">{Math.round(p.confidence * 100)}%</td>
                          <td className="py-2.5 px-3 text-sub truncate max-w-xs">{p.marketing_strategy}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted">
              Click &quot;Run Benchmark Batch&quot; to test the high-throughput inference endpoint with 8 customer vectors.
            </div>
          )}
        </div>

        {/* Historical Inferences Feed */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-subtle">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Single Inference History
              </h2>
              <p className="text-xs text-sub">
                Client session cache of individual model classifications
              </p>
            </div>
            <span className="text-xs font-mono text-muted">
              {history.length} logged
            </span>
          </div>

          {history.length > 0 ? (
            <div className="divide-y divide-subtle">
              {history.map((item, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-muted text-[10px] px-1.5 py-0.5 rounded bg-surface border border-subtle">
                        C{item.cluster_id}
                      </span>
                      <span className="font-semibold text-main">{item.segment_name}</span>
                      <span className="text-muted text-[11px]">
                        ({Math.round((item.confidence || 0.8) * 100)}% centroid match)
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-sub">
                      Age: {item.age} yrs | Income: ${item.income}k | Spending Score: {item.spendingScore}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-muted">
                      {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : "Recent"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-muted">
              No individual predictions recorded in this session. Use the Dashboard to run classifications.
            </div>
          )}
        </div>
      </div>
    </LayoutV2>
  );
}
