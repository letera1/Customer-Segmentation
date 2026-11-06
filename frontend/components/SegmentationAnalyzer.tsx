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

      // Save to prediction history in localStorage
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
          // localStorage failure fallback
        }
      }
    } catch {
      setError("Failed to get prediction. Make sure the API is running and the model is trained.");
    } finally {
      setLoading(false);
    }
  };

  const segmentBadges: Record<number, { bg: string; border: string; text: string; icon: string }> = {
    0: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: "💰" },
    1: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", icon: "👑" },
    2: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", icon: "🎯" },
    3: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", icon: "👥" },
    4: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", icon: "🌱" },
  };

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white dark:text-[#ECEEF2]">
            AI Customer Segment Analyzer
          </h2>
          <p className="mt-0.5 text-xs text-[#848CA2]">
            Adjust behavioral and demographic dimensions for real-time model inference
          </p>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Inference Ready</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Parameters Controls */}
        <div className="space-y-5 bg-[#181A20] dark:bg-[#181A20] p-5 rounded-xl border border-white/[0.06]">
          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#848CA2]">
                Customer Age
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#22242C] text-indigo-400 border border-indigo-500/20">
                {age} yrs
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-1.5 bg-[#262934] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-[#5F667A] mt-1 font-semibold">
              <span>18 yrs</span>
              <span>70 yrs</span>
            </div>
          </div>

          {/* Income Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#848CA2]">
                Annual Income
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#22242C] text-emerald-400 border border-emerald-500/20">
                ${income}k
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="140"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-1.5 bg-[#262934] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-[#5F667A] mt-1 font-semibold">
              <span>$15k</span>
              <span>$140k</span>
            </div>
          </div>

          {/* Spending Score Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#848CA2]">
                Spending Score
              </label>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#22242C] text-purple-400 border border-purple-500/20">
                {spendingScore} / 100
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={spendingScore}
              onChange={(e) => setSpendingScore(Number(e.target.value))}
              className="w-full h-1.5 bg-[#262934] rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-[#5F667A] mt-1 font-semibold">
              <span>Conservative (1)</span>
              <span>Generous (100)</span>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-indigo-600/25 transition-all hover:shadow-lg hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "🔮 Execute Prediction"}
          </button>
        </div>

        {/* Prediction Results Panel */}
        <div className="rounded-xl border border-white/[0.07] bg-[#181A20] p-5 min-h-[280px] flex flex-col justify-center">
          {prediction ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#848CA2]">
                    Predicted Segment
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl">
                      {segmentBadges[prediction.cluster_id]?.icon || "🎯"}
                    </span>
                    <h3 className="text-xl font-black text-white dark:text-[#ECEEF2] tracking-tight">
                      {prediction.segment_name}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#22242C] text-[#CAD1DE] border border-white/[0.08]">
                  Cluster #{prediction.cluster_id}
                </span>
              </div>

              <p className="text-xs text-[#848CA2] leading-relaxed">
                {prediction.segment_description}
              </p>

              {/* Confidence Percentage Bar */}
              <div className="space-y-1.5 p-3 rounded-lg bg-[#20222A] border border-white/[0.05]">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#848CA2]">Confidence Score</span>
                  <span className="text-emerald-400 font-black">
                    {typeof prediction.confidence === "number"
                      ? `${(prediction.confidence * 100).toFixed(1)}%`
                      : String(prediction.confidence)}
                  </span>
                </div>
                <div className="w-full bg-[#141519] rounded-full h-1.5 overflow-hidden">
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
              <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  Target Strategy
                </p>
                <p className="text-xs font-medium text-white/90 leading-snug">
                  {prediction.marketing_strategy}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-[#5F667A]">
              <div className="w-14 h-14 rounded-2xl bg-[#20222A] flex items-center justify-center text-2xl mb-3 border border-white/[0.05]">
                🎯
              </div>
              <h4 className="text-sm font-bold text-[#CAD1DE] mb-1">Awaiting Parameters</h4>
              <p className="text-xs max-w-xs text-[#848CA2]">
                Configure customer Age, Income, and Spending score to generate real-time AI classification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
