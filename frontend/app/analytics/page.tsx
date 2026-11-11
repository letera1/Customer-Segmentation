"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({
    conversionRate: 3.24,
    avgSession: "4m 32s",
    bounceRate: 41.8,
    pageViews: 125400,
  });
  const [selectedMetric, setSelectedMetric] = useState<string>("conversion");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [comparisonMode, setComparisonMode] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        conversionRate: Number((Math.random() * 2 + 2.8).toFixed(2)),
        avgSession: `${Math.floor(Math.random() * 2 + 3)}m ${Math.floor(Math.random() * 45 + 10)}s`,
        bounceRate: Number((Math.random() * 8 + 38).toFixed(1)),
        pageViews: Math.floor(Math.random() * 30000 + 115000),
      });
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 600);
  };

  const exportData = () => {
    const data = {
      timeRange,
      metrics,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${timeRange}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Top Header & Executive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-subtle">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Behavioral & Cohort Analytics
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Enterprise customer journey telemetry, conversion velocity, and segment retention metrics
              <span className="ml-3 text-[11px] text-muted font-mono">
                Updated: {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`rounded-lg border px-3.5 py-1.5 text-xs font-bold transition-all ${
                comparisonMode
                  ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-400"
                  : "border-subtle bg-surface text-sub hover:text-main"
              }`}
            >
              {comparisonMode ? "Compare Active" : "Compare Benchmarks"}
            </button>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="rounded-lg border border-subtle bg-surface px-3.5 py-1.5 text-xs font-bold text-sub transition-all hover:text-main disabled:opacity-50"
            >
              {isRefreshing ? "Synchronizing..." : "Sync Stream"}
            </button>
            <button
              onClick={exportData}
              className="rounded-lg border border-subtle bg-surface px-3.5 py-1.5 text-xs font-bold text-sub transition-all hover:text-main"
            >
              Export JSON
            </button>

            {/* Time Window Selector Pills */}
            <div className="flex items-center rounded-lg border border-subtle bg-surface p-0.5">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
                    timeRange === range
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-muted hover:text-main"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Performance KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change="+0.52%"
            positive={true}
            subtext="overall cohort average"
            selected={selectedMetric === "conversion"}
            onClick={() => setSelectedMetric("conversion")}
            comparisonMode={comparisonMode}
            previousValue="2.72%"
          />
          <MetricCard
            title="Avg Session Duration"
            value={metrics.avgSession}
            change="+14s"
            positive={true}
            subtext="active engagement dwell"
            selected={selectedMetric === "session"}
            onClick={() => setSelectedMetric("session")}
            comparisonMode={comparisonMode}
            previousValue="4m 18s"
          />
          <MetricCard
            title="Bounce Rate"
            value={`${metrics.bounceRate}%`}
            change="-1.9%"
            positive={true}
            subtext="single-page exit frequency"
            selected={selectedMetric === "bounce"}
            onClick={() => setSelectedMetric("bounce")}
            comparisonMode={comparisonMode}
            previousValue="43.7%"
          />
          <MetricCard
            title="Total Sessions"
            value={`${(metrics.pageViews / 1000).toFixed(1)}k`}
            change="+8.4%"
            positive={true}
            subtext="recorded visits"
            selected={selectedMetric === "views"}
            onClick={() => setSelectedMetric("views")}
            comparisonMode={comparisonMode}
            previousValue="115.8k"
          />
        </div>

        {/* Executive Conversion Funnel (Professional Replacement for Chunky Bars) */}
        <ExecutiveFunnel timeRange={timeRange} />

        {/* Charts Grid: Traffic Trends & Device Telemetry */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrafficTrend timeRange={timeRange} />
          </div>
          <DeviceBreakdown />
        </div>

        {/* Executive Strategic Observations (Replacing emoji AI box) */}
        <ExecutiveInsights />

        {/* Tables: Top Routes & Traffic Sources */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TopPages />
          <TrafficSources />
        </div>

        {/* Geographic Distribution & Activity Frequency Matrix */}
        <div className="grid gap-6 lg:grid-cols-2">
          <GeographicDistribution />
          <SystemActivityStream />
        </div>
      </div>
    </LayoutV2>
  );
}

// ----------------------------------------------------------------------
// 1. MetricCard Component
// ----------------------------------------------------------------------
function MetricCard({
  title,
  value,
  change,
  positive,
  subtext,
  selected,
  onClick,
  comparisonMode,
  previousValue,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  subtext: string;
  selected: boolean;
  onClick: () => void;
  comparisonMode: boolean;
  previousValue?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
        selected
          ? "border-indigo-500/50 bg-elevated shadow-md ring-1 ring-indigo-500/30"
          : "card-bg hover:border-indigo-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sub">
          {title}
        </span>
        <span
          className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
            positive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {change}
        </span>
      </div>

      <div className="text-2xl font-black text-main tracking-tight">
        {value}
      </div>

      <div className="text-[11px] text-muted font-medium mt-1">
        {subtext}
      </div>

      {comparisonMode && previousValue && (
        <div className="mt-3 pt-2 border-t border-subtle flex items-center justify-between text-[11px]">
          <span className="text-muted">Prior Baseline:</span>
          <span className="font-bold text-sub font-mono">{previousValue}</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Executive Conversion Funnel Component (High-End & Professional)
// ----------------------------------------------------------------------
function ExecutiveFunnel({ timeRange }: { timeRange: string }) {
  const funnelStages = [
    { stage: "01", name: "Landing Exposure", visitors: 10000, conversion: 100.0, drop: 0.0, rate: "Entry Baseline" },
    { stage: "02", name: "Catalog & Segment Discovery", visitors: 8200, conversion: 82.0, drop: 18.0, rate: "High Intent" },
    { stage: "03", name: "Product Consideration", visitors: 5600, conversion: 56.0, drop: 26.0, rate: "Cart Action" },
    { stage: "04", name: "Checkout Initiation", visitors: 3800, conversion: 38.0, drop: 18.0, rate: "Billing Phase" },
    { stage: "05", name: "Final Transaction & Retention", visitors: 2950, conversion: 29.5, drop: 8.5, rate: "Success Verified" },
  ];

  return (
    <div className="panel p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-bold tracking-tight text-main">
            Cohort Journey Conversion Funnel
          </h2>
          <p className="text-xs text-sub">
            End-to-end customer transition efficiency across funnel milestones ({timeRange})
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-sub">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Conversion Volume
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-elevated" />
            Drop-off Capacity
          </span>
        </div>
      </div>

      {/* Structured Clean Table List of Stages */}
      <div className="space-y-4">
        {funnelStages.map((stage, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-subtle bg-surface hover:bg-elevated/40 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-elevated text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                  {stage.stage}
                </span>
                <span className="text-xs font-bold text-main tracking-tight">
                  {stage.name}
                </span>
                <span className="text-[10px] uppercase font-bold text-muted bg-elevated px-2 py-0.5 rounded">
                  {stage.rate}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="font-bold text-main">
                  {stage.visitors.toLocaleString()} <span className="text-[11px] font-normal text-muted">users</span>
                </span>
                <span className="font-black text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {stage.conversion.toFixed(1)}%
                </span>
                {stage.drop > 0 && (
                  <span className="text-[11px] font-bold text-rose-500 dark:text-rose-400">
                    -{stage.drop.toFixed(1)}% drop
                  </span>
                )}
              </div>
            </div>

            {/* Precision Dual-Layer Progress Meter (No oversized chunky blocks) */}
            <div className="w-full bg-elevated rounded-full h-2 overflow-hidden flex">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${stage.conversion}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Traffic Trend Area Chart
// ----------------------------------------------------------------------
function TrafficTrend({ timeRange }: { timeRange: string }) {
  const points = [
    { label: "00h", value: 3400 },
    { label: "03h", value: 2800 },
    { label: "06h", value: 4100 },
    { label: "09h", value: 7800 },
    { label: "12h", value: 9600 },
    { label: "15h", value: 10400 },
    { label: "18h", value: 8900 },
    { label: "21h", value: 6200 },
  ];
  const maxValue = 11000;

  return (
    <div className="panel p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-main tracking-tight">
            Traffic Volume Telemetry
          </h2>
          <p className="text-xs text-sub">Continuous session velocity and user throughput</p>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
          Peak: 10,400 req/hr
        </span>
      </div>

      <div className="relative h-56 w-full pt-4">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d={`M 0 ${200 - (points[0].value / maxValue) * 180} ${points
              .map((d, i) => `L ${(i / (points.length - 1)) * 800} ${200 - (d.value / maxValue) * 180}`)
              .join(" ")} L 800 200 L 0 200 Z`}
            fill="url(#areaGradient)"
          />

          {/* Line Stroke */}
          <path
            d={`M 0 ${200 - (points[0].value / maxValue) * 180} ${points
              .map((d, i) => `L ${(i / (points.length - 1)) * 800} ${200 - (d.value / maxValue) * 180}`)
              .join(" ")}`}
            fill="none"
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((d, i) => (
            <circle
              key={i}
              cx={(i / (points.length - 1)) * 800}
              cy={200 - (d.value / maxValue) * 180}
              r="4"
              fill="#6366F1"
              className="stroke-canvas"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between text-[11px] font-mono text-muted mt-3">
          {points.map((p, i) => (
            <span key={i}>{p.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Device Breakdown Component
// ----------------------------------------------------------------------
function DeviceBreakdown() {
  const devices = [
    { name: "Desktop Workstation", share: 52.4, sessions: "65,700", color: "bg-indigo-500" },
    { name: "Mobile Responsive", share: 34.8, sessions: "43,600", color: "bg-purple-500" },
    { name: "Tablet Interface", share: 12.8, sessions: "16,100", color: "bg-cyan-500" },
  ];

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-main tracking-tight">Client Device Ratio</h2>
          <p className="text-xs text-sub">Client browser runtime distribution</p>
        </div>
        <span className="text-xs font-mono font-bold text-sub">125.4k Total</span>
      </div>

      <div className="space-y-4 pt-2">
        {devices.map((device, i) => (
          <div key={i} className="p-3 rounded-lg border border-subtle bg-surface">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-main">{device.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sub">{device.sessions}</span>
                <span className="font-black text-main font-mono">{device.share}%</span>
              </div>
            </div>
            <div className="w-full bg-elevated rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full ${device.color} rounded-full`}
                style={{ width: `${device.share}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 5. Executive Insights (No Emojis)
// ----------------------------------------------------------------------
function ExecutiveInsights() {
  const insights = [
    {
      label: "COHORT RETENTION",
      title: "Elevated High-Value Engagement",
      description: "Cluster #1 (High Value) shows 3.8x higher session depth and consistent weekly recurring interaction.",
      impact: "High Impact",
      impactColor: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "CONVERSION VELOCITY",
      title: "Catalog to Consideration Transition",
      description: "Drop-off occurs primarily between search and checkout initiation. Recommended strategy: inline cart prompts.",
      impact: "Optimization Target",
      impactColor: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "INFRASTRUCTURE TELEMETRY",
      title: "Model Inference Latency Baseline",
      description: "Average feature normalization and centroid prediction executing under 3.5ms across all API instances.",
      impact: "System Healthy",
      impactColor: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <div className="panel p-6">
      <div className="mb-4">
        <h2 className="text-base font-bold text-main tracking-tight">
          Executive AI Observations & Strategic Insights
        </h2>
        <p className="text-xs text-sub">
          Synthesized pattern recognitions and algorithmic pipeline health metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-subtle bg-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-muted font-mono">
                  {item.label}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${item.impactColor}`}>
                  {item.impact}
                </span>
              </div>
              <h3 className="text-xs font-bold text-main mb-1.5">{item.title}</h3>
              <p className="text-[11px] text-sub leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 6. Top Visited Pages
// ----------------------------------------------------------------------
function TopPages() {
  const pages = [
    { path: "/dashboard", views: 48200, avgTime: "3m 42s", bounce: "28.4%", status: "Active" },
    { path: "/analytics", views: 32100, avgTime: "4m 18s", bounce: "24.1%", status: "Active" },
    { path: "/customers", views: 24500, avgTime: "2m 55s", bounce: "35.2%", status: "Active" },
    { path: "/segments", views: 18400, avgTime: "3m 12s", bounce: "22.8%", status: "Active" },
  ];

  return (
    <div className="panel p-6">
      <h2 className="text-base font-bold text-main tracking-tight mb-4">
        Top Traversed Application Endpoints
      </h2>
      <div className="space-y-2.5">
        {pages.map((page, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-subtle bg-surface flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] text-muted">0{idx + 1}</span>
              <span className="font-mono font-bold text-main">{page.path}</span>
            </div>
            <div className="flex items-center gap-4 text-sub font-mono">
              <span>{page.views.toLocaleString()} visits</span>
              <span className="text-muted">{page.avgTime}</span>
              <span className="text-indigo-500 dark:text-indigo-400 font-bold">{page.bounce}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. Traffic Sources
// ----------------------------------------------------------------------
function TrafficSources() {
  const sources = [
    { name: "Direct Application API", share: 44.5, count: "55,800", color: "bg-indigo-500" },
    { name: "Internal Navigation / Portal", share: 32.1, count: "40,250", color: "bg-purple-500" },
    { name: "External Webhook Integration", share: 15.2, count: "19,050", color: "bg-cyan-500" },
    { name: "Batch Job Uploads", share: 8.2, count: "10,300", color: "bg-emerald-500" },
  ];

  return (
    <div className="panel p-6">
      <h2 className="text-base font-bold text-main tracking-tight mb-4">
        Inbound Traffic Ingestion Channels
      </h2>
      <div className="space-y-3.5">
        {sources.map((src, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-subtle bg-surface">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-main">{src.name}</span>
              <span className="font-mono font-bold text-sub">{src.share}%</span>
            </div>
            <div className="w-full bg-elevated rounded-full h-1.5 overflow-hidden">
              <div className={`h-full ${src.color} rounded-full`} style={{ width: `${src.share}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. Geographic Distribution
// ----------------------------------------------------------------------
function GeographicDistribution() {
  const regions = [
    { region: "North America (US/CA)", share: 48.5, code: "NA" },
    { region: "Western Europe (UK/DE/FR)", share: 29.2, code: "EU" },
    { region: "Asia Pacific (SG/JP/AU)", share: 15.3, code: "APAC" },
    { region: "Latin America (BR/MX)", share: 7.0, code: "LATAM" },
  ];

  return (
    <div className="panel p-6">
      <h2 className="text-base font-bold text-main tracking-tight mb-4">
        Regional Ingestion Demographics
      </h2>
      <div className="space-y-3">
        {regions.map((r, i) => (
          <div key={i} className="p-3 rounded-lg border border-subtle bg-surface flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded bg-elevated text-sub border border-subtle">
                {r.code}
              </span>
              <span className="font-bold text-main">{r.region}</span>
            </div>
            <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">{r.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 9. Realtime System Stream (No Emojis)
// ----------------------------------------------------------------------
function SystemActivityStream() {
  const logs = [
    { code: "INFO", message: "Inference batch executed (10 records)", time: "00:02" },
    { code: "AUTH", message: "Session token refreshed successfully", time: "00:14" },
    { code: "SYNC", message: "Centroid report verified with scikit-learn", time: "00:35" },
    { code: "METR", message: "Latency benchmark 3.2ms recorded", time: "01:02" },
  ];

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-main tracking-tight">
          System Audit & Event Stream
        </h2>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>
      </div>

      <div className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="p-2.5 rounded-lg border border-subtle bg-surface flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-indigo-400">{log.code}</span>
              <span className="text-sub truncate max-w-xs">{log.message}</span>
            </div>
            <span className="text-muted text-[10px]">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
