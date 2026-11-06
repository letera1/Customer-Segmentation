"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";

interface SegmentationAnalyzerProps {
  onPredict: (data: any) => void;
}

export default function SegmentationAnalyzer({ onPredict }: SegmentationAnalyzerProps) {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(75);
  const [spendingScore, setSpendingScore] = useState(65);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age,
          annual_income: income,
          spending_score: spendingScore,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Prediction failed");
      }

      const result = await response.json();
      setPrediction(result);
      onPredict(result);

      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("prediction_history");
          const history = stored ? JSON.parse(stored) : [];
          const validHistory = Array.isArray(history) ? history : [];
          validHistory.unshift({
            ...result,
            timestamp: new Date().toISOString(),
            age,
            income,
            spendingScore,
          });
          localStorage.setItem("prediction_history", JSON.stringify(validHistory.slice(0, 10)));
        } catch {
          // fallback
        }
      }
    } catch {
      setError("Failed to get prediction. Make sure the API is running and the model is trained.");
    } finally {
      setLoading(false);
    }
  };

  const segmentBadges: Record<number, { bg: string; border: string; text: string; code: string }> = {
    0: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", code: "C0" },
    1: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", code: "C1" },
    2: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", code: "C2" },
    3: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", code: "C3" },
    4: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", code: "C4" },
  };

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-main">
            Customer Segment Classifier
          </h2>
          <p className="mt-0.5 text-xs text-sub">
            Adjust behavioral dimensions for real-time model inference
          </p>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pipeline Online</span>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Input Parameters Controls */}
        <div className="space-y-4 p-4 rounded-xl border border-subtle bg-surface">
          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-sub">
                Customer Age
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-black/20 text-indigo-400 border border-indigo-500/20 font-mono">
                {age} yrs
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-1.5 bg-[#14151A] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-muted mt-1 font-mono">
              <span>18</span>
              <span>70</span>
            </div>
          </div>

          {/* Income Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-sub">
                Annual Income
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-black/20 text-emerald-400 border border-emerald-500/20 font-mono">
                ${income}k
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="140"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-1.5 bg-[#14151A] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-muted mt-1 font-mono">
              <span>$15k</span>
              <span>$140k</span>
            </div>
          </div>

          {/* Spending Score Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-sub">
                Spending Score
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-black/20 text-purple-400 border border-purple-500/20 font-mono">
                {spendingScore} / 100
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={spendingScore}
              onChange={(e) => setSpendingScore(Number(e.target.value))}
              className="w-full h-1.5 bg-[#14151A] rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-muted mt-1 font-mono">
              <span>Conservative (1)</span>
              <span>Generous (100)</span>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-600/20 transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing Dimensions..." : "Execute Segment Prediction"}
          </button>
        </div>

        {/* Prediction Results Panel */}
        <div className="rounded-xl border border-subtle bg-surface p-4 min-h-[250px] flex flex-col justify-center">
          {prediction ? (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Predicted Classification
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {segmentBadges[prediction.cluster_id]?.code || "C0"}
                    </span>
                    <h3 className="text-lg font-black text-main tracking-tight">
                      {prediction.segment_name}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold border border-subtle text-sub">
                  Cluster #{prediction.cluster_id}
                </span>
              </div>

              <p className="text-xs text-sub leading-relaxed">
                {prediction.segment_description}
              </p>

              {/* Confidence Percentage Bar */}
              <div className="space-y-1.5 p-3 rounded-lg border border-subtle bg-black/15">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-sub">Confidence Metric</span>
                  <span className="text-emerald-400 font-mono font-black">
                    {typeof prediction.confidence === "number"
                      ? `${(prediction.confidence * 100).toFixed(1)}%`
                      : String(prediction.confidence)}
                  </span>
                </div>
                <div className="w-full bg-[#14151A] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        typeof prediction.confidence === "number"
                          ? Math.min(100, Math.max(15, prediction.confidence * 100))
                          : 75
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Recommended Action Strategy */}
              <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  Strategic Playbook
                </p>
                <p className="text-xs font-medium text-main leading-snug">
                  {prediction.marketing_strategy}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-muted">
              <svg className="w-8 h-8 text-muted mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xs font-bold text-main mb-1">Awaiting Telemetry Parameters</h4>
              <p className="text-[11px] max-w-xs text-sub">
                Adjust Age, Income, and Spending score to trigger realtime K-Means classification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
