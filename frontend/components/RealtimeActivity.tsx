"use client";

import { useEffect, useState } from "react";
import { checkHealth, fetchMetrics, HealthResponse, MetricsResponse } from "@/lib/api";

export default function RealtimeActivity() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);

  useEffect(() => {
    checkHealth().then(setHealth);
    fetchMetrics().then(setMetrics);
  }, []);

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-subtle">
        <h3 className="text-sm font-semibold tracking-tight text-main">
          Pipeline Telemetry
        </h3>
        <span className="text-[10px] font-mono text-muted">FastAPI Service</span>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-subtle">
          <span className="text-sub">Engine Health</span>
          <span className="font-mono font-medium text-main">
            {health?.status === "healthy" ? "Healthy (200 OK)" : "Connecting..."}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-subtle">
          <span className="text-sub">Model & Scaler</span>
          <span className="font-mono font-medium text-main">
            {health?.model_loaded ? "Loaded (In-Memory)" : "Standby"}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-subtle">
          <span className="text-sub">Engine Uptime</span>
          <span className="font-mono font-medium text-main">
            {metrics?.uptime_seconds ? `${Math.round(metrics.uptime_seconds)}s` : "Active"}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-subtle">
          <span className="text-sub">API Release</span>
          <span className="font-mono font-medium text-main">
            v{health?.version || "2.0.0"}
          </span>
        </div>
      </div>
    </div>
  );
}
