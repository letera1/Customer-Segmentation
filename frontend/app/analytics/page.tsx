"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({
    conversionRate: 3.24,
    avgSession: "4m 32s",
    bounceRate: 42.3,
    pageViews: 125400,
  });
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [comparisonMode, setComparisonMode] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        conversionRate: (Math.random() * 5 + 2).toFixed(2) as any,
        avgSession: `${Math.floor(Math.random() * 3 + 3)}m ${Math.floor(Math.random() * 60)}s`,
        bounceRate: (Math.random() * 20 + 35).toFixed(1) as any,
        pageViews: Math.floor(Math.random() * 50000 + 100000),
      });
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
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
    a.download = `analytics-${timeRange}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Simulate data refresh when time range changes
    const timer = setTimeout(() => {
      setMetrics({
        conversionRate: (Math.random() * 5 + 2).toFixed(2) as any,
        avgSession: `${Math.floor(Math.random() * 3 + 3)}m ${Math.floor(Math.random() * 60)}s`,
        bounceRate: (Math.random() * 20 + 35).toFixed(1) as any,
        pageViews: Math.floor(Math.random() * 50000 + 100000),
      });
      setLastUpdated(new Date());
    }, 300);
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <LayoutV2>
        </LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <p className="text-sm text-slate-400">
              Deep insights into customer behavior and trends
              <span className="ml-3 text-xs text-slate-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                comparisonMode
                  ? "border-blue-500 bg-blue-600/20 text-blue-400"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {comparisonMode ? "✓ Compare Mode" : "📊 Compare"}
            </button>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white disabled:opacity-50"
            >
              {isRefreshing ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Refreshing...
                </span>
              ) : (
                "🔄 Refresh"
              )}
            </button>
            <button
              onClick={exportData}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            >
              📥 Export Data
            </button>
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
            comparisonMode={comparisonMode}
            previousValue="2.74%"
          />
          <MetricCard
            title="Avg Session"
            value={metrics.avgSession}
            change="+12s"
            trend="up"
            onClick={() => setSelectedMetric("session")}
            selected={selectedMetric === "session"}
            comparisonMode={comparisonMode}
            previousValue="4m 20s"
          />
          <MetricCard
            title="Bounce Rate"
            value={`${metrics.bounceRate}%`}
            change="-2.1%"
            trend="down"
            onClick={() => setSelectedMetric("bounce")}
            selected={selectedMetric === "bounce"}
            comparisonMode={comparisonMode}
            previousValue="44.4%"
          />
          <MetricCard
            title="Page Views"
            value={`${(metrics.pageViews / 1000).toFixed(1)}K`}
            change="+8.2%"
            trend="up"
            onClick={() => setSelectedMetric("views")}
            selected={selectedMetric === "views"}
            comparisonMode={comparisonMode}
            previousValue="115.8K"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UserFlowChart timeRange={timeRange} />
          <DeviceBreakdown />
        </div>

        {/* AI Insights Panel */}
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered Insights</h3>
              <p className="text-xs text-slate-400">Automated analysis of your data</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="mb-2 text-2xl">📈</div>
              <p className="text-sm font-medium">Peak Traffic Hours</p>
              <p className="mt-1 text-xs text-slate-400">Most activity between 2-4 PM EST</p>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="mb-2 text-2xl">🎯</div>
              <p className="text-sm font-medium">Conversion Opportunity</p>
              <p className="mt-1 text-xs text-slate-400">Mobile users show 15% higher intent</p>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="mb-2 text-2xl">⚠️</div>
              <p className="text-sm font-medium">Attention Needed</p>
              <p className="mt-1 text-xs text-slate-400">Bounce rate increased on /reports page</p>
            </div>
          </div>
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

function MetricCard({ title, value, change, trend, onClick, selected, comparisonMode, previousValue }: any) {
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
      {comparisonMode && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-800/50 p-2">
          <span className="text-xs text-slate-400">Previous:</span>
          <span className="text-xs font-medium">{previousValue}</span>
        </div>
      )}
      {selected && (
        <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
      )}
    </div>
  );
}

function UserFlowChart({ timeRange }: any) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const steps = [
    { name: "Landing Page", value: 85, users: 8500 },
    { name: "Product View", value: 72, users: 7200 },
    { name: "Add to Cart", value: 58, users: 5800 },
    { name: "Checkout", value: 45, users: 4500 },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">User Flow Funnel</h3>
        <span className="text-sm text-slate-400">{timeRange}</span>
      </div>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredStep(i)}
            onMouseLeave={() => setHoveredStep(null)}
            className="relative"
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">{step.name}</span>
              <span className="text-slate-400">{step.users.toLocaleString()} users</span>
            </div>
            <div className="relative h-10 overflow-hidden rounded-lg bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${step.value}%` }}
              />
              {hoveredStep === i && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium">
                  {step.value}% conversion
                </div>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="ml-4 mt-2 text-xs text-red-400">
                ↓ {steps[i].value - steps[i + 1].value}% drop-off
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceBreakdown() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  const devices = [
    { name: "Desktop", value: 45, color: "from-blue-500 to-blue-600", sessions: 45200 },
    { name: "Mobile", value: 35, color: "from-purple-500 to-purple-600", sessions: 35100 },
    { name: "Tablet", value: 20, color: "from-pink-500 to-pink-600", sessions: 20050 },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Device Breakdown</h3>
      <div className="mb-6 flex items-center justify-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90 transform">
            {devices.map((device, i) => {
              const offset = devices.slice(0, i).reduce((sum, d) => sum + d.value, 0);
              const circumference = 2 * Math.PI * 70;
              const strokeDasharray = `${(device.value / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((offset / 100) * circumference);
              
              return (
                <circle
                  key={i}
                  cx="96"
                  cy="96"
                  r="70"
                  stroke={`url(#gradient-${i})`}
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => setSelectedDevice(device.name)}
                />
              );
            })}
            <defs>
              {devices.map((device, i) => (
                <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={device.color.split(" ")[0].replace("from-", "#")} />
                  <stop offset="100%" stopColor={device.color.split(" ")[1].replace("to-", "#")} />
                </linearGradient>
              ))}
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">100K</span>
            <span className="text-xs text-slate-400">Total Sessions</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {devices.map((device, i) => (
          <div
            key={i}
            onClick={() => setSelectedDevice(device.name)}
            className={`cursor-pointer rounded-lg p-3 transition-all ${
              selectedDevice === device.name ? "bg-slate-800" : "bg-slate-800/30 hover:bg-slate-800/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${device.color}`} />
                <span className="font-medium">{device.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{device.value}%</p>
                <p className="text-xs text-slate-400">{device.sessions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrafficTrend({ timeRange }: any) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  
  const generateData = () => {
    const points = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    return Array.from({ length: points }, (_, i) => ({
      label: i,
      value: Math.floor(Math.random() * 5000 + 3000),
    }));
  };

  const [data] = useState(generateData());
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Traffic Trend</h3>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            Visitors
          </span>
        </div>
      </div>
      <div className="relative h-64">
        <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area */}
          <path
            d={`M 0 ${200 - (data[0].value / maxValue) * 180} ${data.map((d, i) => 
              `L ${(i / (data.length - 1)) * 800} ${200 - (d.value / maxValue) * 180}`
            ).join(" ")} L 800 200 L 0 200 Z`}
            fill="url(#trendGradient)"
          />
          
          {/* Line */}
          <path
            d={`M 0 ${200 - (data[0].value / maxValue) * 180} ${data.map((d, i) => 
              `L ${(i / (data.length - 1)) * 800} ${200 - (d.value / maxValue) * 180}`
            ).join(" ")}`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 800}
              cy={200 - (d.value / maxValue) * 180}
              r={hoveredPoint === i ? "6" : "4"}
              fill="#3b82f6"
              stroke="#151B2B"
              strokeWidth="2"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>
        
        {hoveredPoint !== null && (
          <div
            className="absolute rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm shadow-xl"
            style={{
              left: `${(hoveredPoint / (data.length - 1)) * 100}%`,
              top: `${100 - (data[hoveredPoint].value / maxValue) * 90}%`,
              transform: "translate(-50%, -100%)",
              marginTop: "-10px",
            }}
          >
            <p className="font-medium">{data[hoveredPoint].value.toLocaleString()} visitors</p>
            <p className="text-xs text-slate-400">Point {hoveredPoint + 1}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TrafficSources() {
  const sources = [
    { name: "Direct", visitors: 45200, percentage: 38, color: "bg-blue-500" },
    { name: "Organic Search", visitors: 32800, percentage: 28, color: "bg-purple-500" },
    { name: "Social Media", visitors: 24100, percentage: 20, color: "bg-pink-500" },
    { name: "Referral", visitors: 16500, percentage: 14, color: "bg-emerald-500" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Traffic Sources</h3>
      <div className="space-y-4">
        {sources.map((source, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${source.color}`} />
                <span className="text-sm font-medium">{source.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{source.percentage}%</p>
                <p className="text-xs text-slate-400">{source.visitors.toLocaleString()}</p>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full ${source.color} transition-all duration-500 group-hover:opacity-80`}
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopPages() {
  const [sortBy, setSortBy] = useState<"views" | "time">("views");
  
  const pages = [
    { path: "/dashboard", views: 12400, time: "3m 24s", bounce: 32 },
    { path: "/analytics", views: 8200, time: "4m 12s", bounce: 28 },
    { path: "/customers", views: 6800, time: "2m 45s", bounce: 45 },
    { path: "/reports", views: 5100, time: "3m 56s", bounce: 38 },
    { path: "/segments", views: 4200, time: "5m 18s", bounce: 25 },
  ];

  const sorted = [...pages].sort((a, b) => 
    sortBy === "views" ? b.views - a.views : parseInt(b.time) - parseInt(a.time)
  );

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Top Pages</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm"
        >
          <option value="views">By Views</option>
          <option value="time">By Time</option>
        </select>
      </div>
      <div className="space-y-2">
        {sorted.map((page, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-mono text-sm font-medium">{page.path}</p>
              <div className="mt-1 flex gap-4 text-xs text-slate-400">
                <span>{page.views.toLocaleString()} views</span>
                <span>{page.time} avg</span>
                <span>{page.bounce}% bounce</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-600">#{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeographicDistribution() {
  const countries = [
    { name: "United States", code: "US", users: 45200, percentage: 38 },
    { name: "United Kingdom", code: "UK", users: 28100, percentage: 24 },
    { name: "Germany", code: "DE", users: 18500, percentage: 16 },
    { name: "France", code: "FR", users: 14200, percentage: 12 },
    { name: "Canada", code: "CA", users: 11800, percentage: 10 },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Geographic Distribution</h3>
      <div className="space-y-3">
        {countries.map((country, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold">
              {country.code}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-sm">
                <span>{country.name}</span>
                <span className="text-slate-400">{country.users.toLocaleString()}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityHeatmap() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Activity Heatmap</h3>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded bg-blue-500"
                style={{ opacity }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex items-center gap-1">
              <div className="w-12 text-xs text-slate-400">{day}</div>
              <div className="flex gap-1">
                {hours.map((hour) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={hour}
                      onMouseEnter={() => setSelectedDay(dayIndex * 24 + hour)}
                      onMouseLeave={() => setSelectedDay(null)}
                      className={`h-4 w-4 rounded cursor-pointer transition-all ${
                        intensity > 0.7
                          ? "bg-blue-500"
                          : intensity > 0.5
                          ? "bg-blue-500/70"
                          : intensity > 0.3
                          ? "bg-blue-500/40"
                          : "bg-slate-800"
                      } ${selectedDay === dayIndex * 24 + hour ? "ring-2 ring-blue-400" : ""}`}
                      title={`${day} ${hour}:00 - ${Math.floor(intensity * 1000)} events`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RealtimeActivity() {
  const [activities, setActivities] = useState([
    { user: "User #1234", action: "Viewed dashboard", time: "2s ago", type: "view" },
    { user: "User #5678", action: "Made prediction", time: "5s ago", type: "predict" },
    { user: "User #9012", action: "Downloaded report", time: "12s ago", type: "download" },
    { user: "User #3456", action: "Updated segment", time: "18s ago", type: "update" },
  ]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["Viewed dashboard", "Made prediction", "Downloaded report", "Updated segment", "Viewed analytics"];
      const types = ["view", "predict", "download", "update", "view"];
      const newActivity = {
        user: `User #${Math.floor(Math.random() * 9000 + 1000)}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        time: "Just now",
        type: types[Math.floor(Math.random() * types.length)],
      };
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(a => a.type === filter);

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Real-time Activity</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm text-emerald-400">Live</span>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Views", value: "view" },
            { label: "Predictions", value: "predict" },
            { label: "Downloads", value: "download" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-slate-800/30 p-3 animate-fadeIn"
          >
            <div className={`h-8 w-8 rounded-full ${
              activity.type === "predict" ? "bg-gradient-to-br from-purple-500 to-pink-600" :
              activity.type === "download" ? "bg-gradient-to-br from-emerald-500 to-teal-600" :
              activity.type === "update" ? "bg-gradient-to-br from-orange-500 to-red-600" :
              "bg-gradient-to-br from-blue-500 to-purple-600"
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.user}</p>
              <p className="text-xs text-slate-400">{activity.action}</p>
            </div>
            <span className="text-xs text-slate-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
