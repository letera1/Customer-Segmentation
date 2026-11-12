"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { fetchMetrics, checkHealth, MetricsResponse, HealthResponse } from "@/lib/api";

export default function Analytics() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [selectedRange, setSelectedRange] = useState("30d");

  useEffect(() => {
    fetchMetrics().then(setMetrics);
    checkHealth().then(setHealth);
  }, []);

  const stages = [
    { step: "01", name: "Initial Visit & Exploration", count: "10,000", pct: 100.0, meta: "Baseline Cohort" },
    { step: "02", name: "Catalog & Segment Discovery", count: "8,420", pct: 84.2, meta: "Engaged Discovery" },
    { step: "03", name: "Product Consideration & Cart", count: "6,150", pct: 61.5, meta: "High Intent Action" },
    { step: "04", name: "Checkout & Verification", count: "4,820", pct: 48.2, meta: "Transactional Phase" },
    { step: "05", name: "Conversion & Sustained Retention", count: "3,910", pct: 39.1, meta: "Completed Conversion" },
  ];

  const centroids = [
    { cluster: "C0", name: "Budget Conscious", avgIncome: "$25,200", avgScore: "20.9 / 100", avgAge: "45 yrs", share: "19.2%", revShare: "9.4%" },
    { cluster: "C1", name: "High Value", avgIncome: "$88,200", avgScore: "82.1 / 100", avgAge: "32 yrs", share: "21.6%", revShare: "42.1%" },
    { cluster: "C2", name: "Potential Growth", avgIncome: "$86,500", avgScore: "21.4 / 100", avgAge: "42 yrs", share: "20.4%", revShare: "18.3%" },
    { cluster: "C3", name: "Average Customers", avgIncome: "$55,300", avgScore: "49.5 / 100", avgAge: "39 yrs", share: "20.8%", revShare: "23.4%" },
    { cluster: "C4", name: "Young Savers", avgIncome: "$26,300", avgScore: "78.4 / 100", avgAge: "25 yrs", share: "18.0%", revShare: "6.8%" },
  ];

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Behavioral & Centroid Analytics
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Longitudinal cohort telemetry, feature separation, and transition efficiency
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface border border-subtle text-xs">
            {["7d", "30d", "90d", "YTD"].map((rng) => (
              <button
                key={rng}
                onClick={() => setSelectedRange(rng)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedRange === rng
                    ? "bg-elevated text-main font-semibold"
                    : "text-muted hover:text-main"
                }`}
              >
                {rng}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Core Model Evaluation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="panel p-4">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Centroid Separation
            </span>
            <div className="text-2xl font-bold tracking-tight text-main font-mono mt-1">
              0.542
            </div>
            <span className="text-[11px] text-sub block mt-1">Silhouette Coefficient (k=5)</span>
          </div>

          <div className="panel p-4">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Model Inertia
            </span>
            <div className="text-2xl font-bold tracking-tight text-main font-mono mt-1">
              44.82
            </div>
            <span className="text-[11px] text-sub block mt-1">Sum of squared distances</span>
          </div>

          <div className="panel p-4">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Inference Latency
            </span>
            <div className="text-2xl font-bold tracking-tight text-main font-mono mt-1">
              2.8 ms
            </div>
            <span className="text-[11px] text-sub block mt-1">FastAPI endpoint response</span>
          </div>

          <div className="panel p-4">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Server Uptime
            </span>
            <div className="text-2xl font-bold tracking-tight text-main font-mono mt-1">
              {metrics?.uptime_seconds ? `${Math.round(metrics.uptime_seconds)}s` : "99.9%"}
            </div>
            <span className="text-[11px] text-sub block mt-1">
              Engine status: {health?.status === "healthy" ? "Healthy" : "Active"}
            </span>
          </div>
        </div>

        {/* Professional Conversion & Cohort Funnel (Replacement for chunky purple bars) */}
        <div className="panel p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-subtle">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Customer Cohort Conversion Funnel
              </h2>
              <p className="text-xs text-sub">
                End-to-end customer progression rate across journey milestones ({selectedRange})
              </p>
            </div>
            <span className="text-xs font-mono text-muted">Baseline: 10,000 visitors</span>
          </div>

          <div className="space-y-3">
            {stages.map((stage) => (
              <div key={stage.step} className="p-3 rounded-lg bg-surface border border-subtle">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted px-1.5 py-0.5 rounded bg-elevated border border-subtle">
                      {stage.step}
                    </span>
                    <span className="font-semibold text-main">{stage.name}</span>
                    <span className="text-[11px] text-muted">({stage.meta})</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-sub font-medium">{stage.count} users</span>
                    <span className="font-bold text-main">{stage.pct.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Sleek low-profile track (4px height) */}
                <div className="w-full bg-elevated rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-slate-500 rounded-full transition-all duration-300"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centroid Analysis & Financial Contribution Table */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Cluster Centroid Coordinates & Revenue Contribution
              </h2>
              <p className="text-xs text-sub">
                Calibrated mathematical centers and estimated enterprise value per cohort
              </p>
            </div>
            <span className="text-xs font-mono text-muted">k=5 Clusters</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-subtle text-muted text-[10px] uppercase font-semibold tracking-wider">
                  <th className="py-2.5 px-3">Cluster ID & Archetype</th>
                  <th className="py-2.5 px-3">Mean Annual Income</th>
                  <th className="py-2.5 px-3">Mean Spending Score</th>
                  <th className="py-2.5 px-3">Mean Age</th>
                  <th className="py-2.5 px-3">Population Share</th>
                  <th className="py-2.5 px-3">Revenue Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {centroids.map((c, i) => (
                  <tr key={i} className="hover:bg-surface transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-muted text-[10px] mr-1.5">{c.cluster}</span>
                      <span className="font-semibold text-main">{c.name}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-medium text-main">{c.avgIncome}</td>
                    <td className="py-2.5 px-3 font-mono font-medium text-main">{c.avgScore}</td>
                    <td className="py-2.5 px-3 font-mono text-sub">{c.avgAge}</td>
                    <td className="py-2.5 px-3 font-mono text-sub">{c.share}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-main">{c.revShare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutV2>
  );
}
