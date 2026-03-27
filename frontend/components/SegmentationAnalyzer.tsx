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

  const handlePredict = async () => {
    setLoading(true);
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

      if (!response.ok) throw new Error("Prediction failed");

      const result = await response.json();
      setPrediction(result);
      onPredict(result);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("prediction_history") || "[]");
      history.unshift({ ...result, timestamp: new Date().toISOString(), age, income, spendingScore });
      localStorage.setItem("prediction_history", JSON.stringify(history.slice(0, 10)));
    } catch (error) {
      alert("Failed to get prediction. Make sure API is running and model is trained.");
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
    <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Customer Analyzer</h2>
        <span className="text-green-400 text-sm">● Live</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Age</label>
              <span className="text-white font-medium">{age} years</span>
            </div>
            <input
              type="range"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Annual Income</label>
              <span className="text-white font-medium">${income}k</span>
            </div>
            <input
              type="range"
              min="15"
              max="140"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Spending Score</label>
              <span className="text-white font-medium">{spendingScore}/100</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={spendingScore}
              onChange={(e) => setSpendingScore(Number(e.target.value))}
              className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "🔮 Predict Segment"}
          </button>
        </div>

        {/* Result Section */}
        <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#1e293b]">
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
                  <span className="text-gray-400">Cluster ID</span>
                  <span className="text-white font-medium">{prediction.cluster_id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Confidence</span>
                  <span className="text-green-400 font-medium">{prediction.confidence}</span>
                </div>
              </div>

              <div className="bg-[#141b2d] p-4 rounded-lg border border-[#1e293b]">
                <p className="text-gray-400 text-xs mb-2">RECOMMENDED STRATEGY</p>
                <p className="text-white text-sm">{prediction.marketing_strategy}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
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
