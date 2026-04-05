"use client";

import { useEffect, useMemo, useState } from "react";
import LayoutV2 from "@/components/LayoutV2";
import StatsCards from "@/components/StatsCards";
import SegmentationAnalyzer from "@/components/SegmentationAnalyzer";
import SegmentDistribution from "@/components/SegmentDistribution";
import PredictionHistory from "@/components/PredictionHistory";
import RealtimeActivity from "@/components/RealtimeActivity";
import CustomerInsights from "@/components/CustomerInsights";

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
    totalCustomers: 2543,
    activeSegments: 5,
    avgConfidence: 94.2,
    predictions: 0,
  });

  useEffect(() => {
    const history = safeReadPredictionHistory();
    setStats((prev) => ({ ...prev, predictions: history.length }));
  }, []);

  const headerSubtitle = useMemo(
    () => "Run segmentation predictions and track recent results",
    []
  );

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">{headerSubtitle}</p>
          </div>
          <div className="hidden sm:block text-xs text-slate-500">
            API: http://localhost:8000
          </div>
        </div>

        <StatsCards stats={stats} />

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

        <CustomerInsights />
      </div>
    </LayoutV2>
  );
}
