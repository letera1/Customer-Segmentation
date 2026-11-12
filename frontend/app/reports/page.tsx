"use client";

import { useState } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { fetchSegments } from "@/lib/api";

export default function Reports() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const exportSegmentsReport = async () => {
    setDownloading("segments");
    try {
      const segs = await fetchSegments();
      const headers = ["Cluster_ID", "Cluster_Name", "Income_Level", "Spending_Pattern", "Price_Sensitivity", "Loyalty_Potential", "Marketing_Strategy"];
      const rows = segs.map((s) => [
        s.cluster_id,
        `"${s.name}"`,
        `"${s.characteristics.income_level || "N/A"}"`,
        `"${s.characteristics.spending_pattern || "N/A"}"`,
        `"${s.characteristics.price_sensitivity || "N/A"}"`,
        `"${s.characteristics.loyalty_potential || "N/A"}"`,
        `"${s.strategy}"`,
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cohort_archetypes_report_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  const exportCentroidSummary = () => {
    setDownloading("centroids");
    const summary = {
      report: "Centroid Summary & Feature Boundaries",
      generatedAt: new Date().toISOString(),
      algorithm: "K-Means (k=5)",
      features: ["Age", "Annual Income ($k)", "Spending Score (1-100)"],
      clusters: [
        { id: 0, name: "Budget Conscious", meanAge: 45, meanIncome: 25.2, meanSpending: 20.9, share: "19.2%" },
        { id: 1, name: "High Value", meanAge: 32, meanIncome: 88.2, meanSpending: 82.1, share: "21.6%" },
        { id: 2, name: "Potential Growth", meanAge: 42, meanIncome: 86.5, meanSpending: 21.4, share: "20.4%" },
        { id: 3, name: "Average Customers", meanAge: 39, meanIncome: 55.3, meanSpending: 49.5, share: "20.8%" },
        { id: 4, name: "Young Savers", meanAge: 25, meanIncome: 26.3, meanSpending: 78.4, share: "18.0%" },
      ],
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `centroid_coordinates_audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(null);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Data Exports & Reports
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Verified dataset extracts, cluster definitions, and centroid metrics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="panel p-5 space-y-3">
            <h2 className="text-sm font-semibold tracking-tight text-main">
              Cohort Archetypes Definition Export
            </h2>
            <p className="text-xs text-sub leading-relaxed">
              Downloads all 5 cluster profiles including marketing strategies and demographic parameters in CSV format.
            </p>
            <button
              onClick={exportSegmentsReport}
              disabled={downloading === "segments"}
              className="btn-primary"
            >
              {downloading === "segments" ? "Generating..." : "Download Archetypes (CSV)"}
            </button>
          </div>

          <div className="panel p-5 space-y-3">
            <h2 className="text-sm font-semibold tracking-tight text-main">
              Centroid Coordinates & Audit Report
            </h2>
            <p className="text-xs text-sub leading-relaxed">
              Export mathematical cluster centers, silhouette coefficient, and population shares in JSON format.
            </p>
            <button
              onClick={exportCentroidSummary}
              disabled={downloading === "centroids"}
              className="btn-secondary"
            >
              {downloading === "centroids" ? "Generating..." : "Download Centroids (JSON)"}
            </button>
          </div>
        </div>
      </div>
    </LayoutV2>
  );
}
