"use client";

import { useEffect, useState } from "react";
import LayoutV2 from "@/components/LayoutV2";
import StatsCards from "@/components/StatsCards";
import SegmentationAnalyzer from "@/components/SegmentationAnalyzer";
import SegmentDistribution from "@/components/SegmentDistribution";
import PredictionHistory from "@/components/PredictionHistory";
import RealtimeActivity from "@/components/RealtimeActivity";
import CustomerInsights from "@/components/CustomerInsights";
import { API_BASE_URL } from "@/lib/config";
import { PredictionResponse } from "@/lib/api";

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

  const handlePredictCallback = (result: PredictionResponse) => {
    setStats((prev) => ({
      ...prev,
      predictions: prev.predictions + 1,
      avgConfidence:
        typeof result?.confidence === "number"
          ? Math.round(result.confidence * 1000) / 10
          : prev.avgConfidence,
    }));
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Customer Segmentation Platform
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Production K-Means machine learning model serving & demographic classification
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-surface text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-muted">Target:</span>
            <span className="font-mono text-main">{API_BASE_URL}</span>
          </div>
        </div>

        {/* 4 Core KPI Cards */}
        <StatsCards stats={stats} />

        {/* Grid: Predictor & Distribution + Telemetry Feeds */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SegmentationAnalyzer onPredict={handlePredictCallback} />
            <SegmentDistribution />
          </div>

          <div className="space-y-6">
            <RealtimeActivity />
            <PredictionHistory />
          </div>
        </div>

        {/* Archetype Matrix & Benchmarks */}
        <CustomerInsights />
      </div>
    </LayoutV2>
  );
}
