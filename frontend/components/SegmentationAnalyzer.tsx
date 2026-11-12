"use client";

import { useState } from "react";
import { predictCustomer, PredictionResponse } from "@/lib/api";

interface SegmentationAnalyzerProps {
  onPredict: (data: PredictionResponse) => void;
}

const FINANCE_STRATEGIES: Record<number, { title: string; options: string[] }> = {
  0: {
    title: "Budget Conscious Financial Advisory",
    options: [
      "Zero-annual-fee debit & credit products",
      "Tiered cashback on essential household expenses",
      "Flexible split-payment financing (0% APR promo)",
      "Automated bill-pay discount incentives",
    ],
  },
  1: {
    title: "High Value Wealth & Credit Management",
    options: [
      "Dedicated relationship manager & VIP concierge",
      "High-limit platinum revolving lines & travel perks",
      "Private equity & wealth management consultation",
      "Zero foreign transaction fee multi-currency accounts",
    ],
  },
  2: {
    title: "Potential Growth Expansion Strategy",
    options: [
      "Pre-approved credit line enhancements",
      "Targeted luxury retail partnership cash-back (up to 5%)",
      "Wealth accumulation starter portfolios & CD ladders",
      "Premium tier upgrade with fee waiver upon qualifying spend",
    ],
  },
  3: {
    title: "Average Customer Engagement & Retention",
    options: [
      "Standard balanced reward points program",
      "Installment loans for mid-tier consumer purchases",
      "Quarterly loyalty bonuses upon sustained account activity",
      "Consolidated banking package with reduced ATM fees",
    ],
  },
  4: {
    title: "Young Savers Digital Growth Pipeline",
    options: [
      "High-yield digital savings with automated round-ups",
      "Secured credit builder card with zero security deposit",
      "Micro-investing fractional share access with educational tools",
      "Student & young professional referral reward bonuses",
    ],
  },
};

export default function SegmentationAnalyzer({ onPredict }: SegmentationAnalyzerProps) {
  const [age, setAge] = useState(36);
  const [income, setIncome] = useState(72);
  const [spendingScore, setSpendingScore] = useState(58);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictCustomer({
        age,
        annual_income: income,
        spending_score: spendingScore,
      });

      setPrediction(result);
      onPredict(result);

      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("prediction_history");
          const history = stored ? JSON.parse(stored) : [];
          const validHistory = Array.isArray(history) ? history : [];
          validHistory.unshift({
            ...result,
            age,
            income,
            spendingScore,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem("prediction_history", JSON.stringify(validHistory.slice(0, 15)));
        } catch {
          // ignore localStorage error
        }
      }
    } catch (err: any) {
      setError(err?.message || "Prediction request failed. Verify the backend API is running.");
    } finally {
      setLoading(false);
    }
  };

  const currentFinance = prediction ? FINANCE_STRATEGIES[prediction.cluster_id] : null;

  return (
    <div className="panel p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-subtle">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-main">
            Realtime Segment Classifier
          </h2>
          <p className="text-xs text-sub">
            Infer demographic cluster and automated financial strategy via ML
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-sub bg-surface border border-subtle">
          <span>Model: K-Means (k=5)</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-subtle bg-surface text-xs text-sub">
          <span className="font-semibold text-main">Notice:</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Parameters Controls */}
        <div className="space-y-4 p-4 rounded-lg bg-surface border border-subtle">
          <div className="text-xs font-semibold text-main tracking-tight uppercase">
            Feature Telemetry Inputs
          </div>

          {/* Age Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-sub font-medium">Customer Age</label>
              <span className="font-mono font-semibold text-main">{age} yrs</span>
            </div>
            <input
              type="range"
              min={18}
              max={85}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-elevated cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>18 yrs</span>
              <span>50 yrs</span>
              <span>85 yrs</span>
            </div>
          </div>

          {/* Income Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-sub font-medium">Annual Income ($k)</label>
              <span className="font-mono font-semibold text-main">${income},000</span>
            </div>
            <input
              type="range"
              min={15}
              max={150}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-elevated cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>$15k</span>
              <span>$80k</span>
              <span>$150k</span>
            </div>
          </div>

          {/* Spending Score Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-sub font-medium">Spending Score (1-100)</label>
              <span className="font-mono font-semibold text-main">{spendingScore} / 100</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={spendingScore}
              onChange={(e) => setSpendingScore(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-elevated cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>1 (Conservative)</span>
              <span>50</span>
              <span>100 (Generous)</span>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="btn-primary w-full mt-2"
          >
            {loading ? (
              <span>Running Inference...</span>
            ) : (
              <span>Execute ML Classification</span>
            )}
          </button>
        </div>

        {/* Prediction Results & Financial Strategy Output */}
        <div className="p-4 rounded-lg bg-surface border border-subtle flex flex-col justify-between">
          {prediction ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-subtle">
                <div>
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                    Assigned Cluster
                  </span>
                  <h3 className="text-base font-bold text-main tracking-tight">
                    {prediction.segment_name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-muted block">Cluster ID</span>
                  <span className="text-xs font-mono font-bold text-main px-2 py-0.5 rounded bg-elevated border border-subtle">
                    #{prediction.cluster_id}
                  </span>
                </div>
              </div>

              <div className="text-xs text-sub leading-relaxed">
                {prediction.segment_description}
              </div>

              <div className="p-2.5 rounded bg-elevated border border-subtle space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                  Recommended Marketing Strategy
                </span>
                <p className="text-xs font-medium text-main">
                  {prediction.marketing_strategy}
                </p>
              </div>

              {currentFinance && (
                <div className="p-2.5 rounded bg-elevated border border-subtle space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                    {currentFinance.title}
                  </span>
                  <ul className="space-y-1">
                    {currentFinance.options.map((opt, i) => (
                      <li key={i} className="text-[11px] text-sub flex items-start gap-1.5">
                        <span className="text-muted">•</span>
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-subtle text-[11px]">
                <span className="text-muted">Centroid Confidence</span>
                <span className="font-mono font-bold text-main">
                  {Math.round(prediction.confidence * 100)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8 text-sub">
              <svg className="w-8 h-8 text-muted mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium text-main">Model Idle</span>
              <p className="text-[11px] text-muted mt-1 max-w-xs">
                Adjust features on the left and click &quot;Execute ML Classification&quot; to inspect real-time cluster assignments and financial recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
