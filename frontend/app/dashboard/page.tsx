"use client";

import { useEffect, useMemo, useState } from "react";
import LayoutV2 from "@/components/LayoutV2";
import StatsCards from "@/components/StatsCards";
import SegmentationAnalyzer from "@/components/SegmentationAnalyzer";
import SegmentDistribution from "@/components/SegmentDistribution";
import PredictionHistory from "@/components/PredictionHistory";
import RealtimeActivity from "@/components/RealtimeActivity";
import CustomerInsights from "@/components/CustomerInsights";
import { API_BASE_URL } from "@/lib/config";

type DashboardStats = {
  totalCustomers: number;
  activeSegments: number;
  avgConfidence: number;
  predictions: number;
};

function safeReadPredictionHistory(): any[] {
  try {
    const stored = localStorage.getItem("prediction_history");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 250,
    activeSegments: 5,
    avgConfidence: 94.2,
    predictions: 0,
  });

  useEffect(() => {
    const history = safeReadPredictionHistory();
    setStats((prev) => ({ ...prev, predictions: history.length }));
  }, []);

  const headerSubtitle = useMemo(
    () => "Real-time AI customer segmentation, behavioral analytics and cohort intelligence",
    []
  );

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Top Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Intelligence Dashboard
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">{headerSubtitle}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] text-xs font-semibold text-main">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sub font-medium">Gateway:</span>
            <span className="font-mono text-[11px] text-main">{API_BASE_URL}</span>
          </div>
        </div>

        {/* Top 4 KPI Metric Cards */}
        <StatsCards stats={stats} />

        {/* Main Grid: Analyzer & Cohort Distribution + Side Feeds */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SegmentationAnalyzer
              onPredict={(result) => {
                setStats((prev) => ({
                  ...prev,
                  predictions: prev.predictions + 1,
                  avgConfidence:
                    typeof result?.confidence === "number"
                      ? Math.round(result.confidence * 1000) / 10
                      : prev.avgConfidence,
                }));
              }}
            />
            <SegmentDistribution />
          </div>

          <div className="space-y-6">
            <PredictionHistory />
            <RealtimeActivity />
          </div>
        </div>

        {/* Bottom Demographic Insights & 35-day Heatmap */}
        <CustomerInsights />
      </div>
    </LayoutV2>
  );
}
