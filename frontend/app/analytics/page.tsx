"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({
    conversionRate: 3.24,
    avgSession: "4m 32s",
    bounceRate: 42.3,
    pageViews: 125400,
  });
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data refresh when time range changes
    const timer = setTimeout(() => {
      setMetrics({
        conversionRate: (Math.random() * 5 + 2).toFixed(2) as any,
        avgSession: `${Math.floor(Math.random() * 3 + 3)}m ${Math.floor(Math.random() * 60)}s`,
        bounceRate: (Math.random() * 20 + 35).toFixed(1) as any,
        pageViews: Math.floor(Math.random() * 50000 + 100000),
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <p className="text-sm text-slate-400">Deep insights into customer behavior and trends</p>
          </div>
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change="+0.5%"
            trend="up"
            onClick={() => setSelectedMetric("conversion")}
            selected={selectedMetric === "conversion"}
          />
          <MetricCard
            title="Avg Session"
            value={metrics.avgSession}
            change="+12s"
            trend="up"
            onClick={() => setSelectedMetric("session")}
            selected={selectedMetric === "session"}
          />
          <MetricCard
            title="Bounce Rate"
            value={`${metrics.bounceRate}%`}
            change="-2.1%"
            trend="down"
            onClick={() => setSelectedMetric("bounce")}
            selected={selectedMetric === "bounce"}
          />
          <MetricCard
            title="Page Views"
            value={`${(metrics.pageViews / 1000).toFixed(1)}K`}
            change="+8.2%"
            trend="up"
            onClick={() => setSelectedMetric("views")}
            selected={selectedMetric === "views"}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UserFlowChart timeRange={timeRange} />
          <DeviceBreakdown />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrafficTrend timeRange={timeRange} />
          </div>
          <TrafficSources />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TopPages />
          <GeographicDistribution />
        </div>

        {/* Heatmap */}
        <ActivityHeatmap />

        {/* Real-time Activity */}
        <RealtimeActivity />
      </div>
    </Layout>
  );
}

function MetricCard({ title, value, change, trend, onClick, selected }: any) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-6 transition-all hover:scale-105 ${
        selected
          ? "border-blue-500 bg-gradient-to-br from-blue-600/10 to-purple-600/10 shadow-lg shadow-blue-500/20"
          : "border-slate-800/50 bg-[#151B2B] hover:border-slate-700"
      }`}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-sm font-medium ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
          {change}
        </span>
      </div>
      {selected && (
        <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
      )}
    </div>
  );
}

function UserFlowChart() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">User Flow</h3>
      <div className="h-64 flex items-center justify-center">
        <div className="space-y-4 w-full">
          {[85, 72, 58, 45].map((width, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-24 text-sm text-slate-400">Step {i + 1}</div>
              <div className="flex-1 h-8 rounded-lg bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="w-16 text-sm font-medium">{width}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceBreakdown() {
  const devices = [
    { name: "Desktop", value: 45, color: "bg-blue-500" },
    { name: "Mobile", value: 35, color: "bg-purple-500" },
    { name: "Tablet", value: 20, color: "bg-pink-500" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Device Breakdown</h3>
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.name}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{device.name}</span>
              <span className="text-slate-400">{device.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className={`h-full ${device.color}`} style={{ width: `${device.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrafficSources() {
  const sources = [
    { name: "Direct", visitors: "45.2K", percentage: 38 },
    { name: "Organic Search", visitors: "32.8K", percentage: 28 },
    { name: "Social Media", visitors: "24.1K", percentage: 20 },
    { name: "Referral", visitors: "16.5K", percentage: 14 },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Traffic Sources</h3>
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium">{source.name}</p>
              <p className="text-xs text-slate-400">{source.visitors} visitors</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{source.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopPages() {
  const pages = [
    { path: "/dashboard", views: "12.4K", time: "3m 24s" },
    { path: "/analytics", views: "8.2K", time: "4m 12s" },
    { path: "/customers", views: "6.8K", time: "2m 45s" },
    { path: "/reports", views: "5.1K", time: "3m 56s" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Top Pages</h3>
      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.path} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
            <div>
              <p className="text-sm font-medium font-mono">{page.path}</p>
              <p className="text-xs text-slate-400">{page.views} views</p>
            </div>
            <div className="text-sm text-slate-400">{page.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityHeatmap() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Activity Heatmap</h3>
      <div className="grid grid-cols-24 gap-1">
        {Array.from({ length: 168 }).map((_, i) => {
          const intensity = Math.random();
          return (
            <div
              key={i}
              className={`h-4 rounded ${
                intensity > 0.7
                  ? "bg-blue-500"
                  : intensity > 0.4
                  ? "bg-blue-500/50"
                  : "bg-slate-800"
              }`}
              title={`Hour ${i}`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-xs text-slate-400">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}
