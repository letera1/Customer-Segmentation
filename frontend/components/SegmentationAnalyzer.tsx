"use client";

import { useState } from "react";

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
      const response = await fetch("http://localhost:8000/predict", {
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
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("prediction_history") || "[]");
      history.unshift({ ...result, timestamp: new Date().toISOString(), age, income, spendingScore });
      localStorage.setItem("prediction_history", JSON.stringify(history.slice(0, 10)));
    } catch (error) {
      setError("Failed to get prediction. Make sure the API is running and the model is trained.");
    } finally {
      setLoading(false);
    }
  };

  const segmentColors: any = {
    0: "from-yellow-500 to-orange-500",
    1: "from-purple-500 to-pink-500",
    2: "from-blue-500 to-cyan-500",
    3: "from-green-500 to-emerald-500",
    4: "from-pink-500 to-rose-500",
  };

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Customer Analyzer</h2>
          <p className="mt-1 text-sm text-slate-400">Adjust inputs and predict the segment</p>
        </div>
        <span className="text-emerald-400 text-sm">● Live</span>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-slate-400 text-sm">Age</label>
              <span className="text-white font-medium">{age} years</span>
            </div>
            <input
              type="range"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-800/60 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-slate-400 text-sm">Annual Income</label>
              <span className="text-white font-medium">${income}k</span>
            </div>
            <input
              type="range"
              min="15"
              max="140"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-800/60 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-slate-400 text-sm">Spending Score</label>
              <span className="text-white font-medium">{spendingScore}/100</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={spendingScore}
              onChange={(e) => setSpendingScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-800/60 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-sm shadow-blue-500/10 transition-all hover:shadow-md hover:shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "🔮 Predict Segment"}
          </button>
        </div>

        {/* Result Section */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/30 p-6">
          {prediction ? (
            <div className="space-y-4">
              <div
                className={`bg-gradient-to-r ${
                  segmentColors[prediction.cluster_id]
                } p-4 rounded-lg`}
              >
                <h3 className="text-white font-bold text-xl mb-2">
                  {prediction.segment_name}
                </h3>
                <p className="text-white/90 text-sm">{prediction.segment_description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Cluster ID</span>
                  <span className="text-white font-medium">{prediction.cluster_id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence</span>
                  <span className="text-emerald-400 font-medium">
                    {typeof prediction.confidence === "number"
                      ? `${Math.round(prediction.confidence * 100)}%`
                      : String(prediction.confidence)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4">
                <p className="text-slate-400 text-xs mb-2">RECOMMENDED STRATEGY</p>
                <p className="text-white text-sm">{prediction.marketing_strategy}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🎯</span>
                <p>Enter customer data to analyze</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
