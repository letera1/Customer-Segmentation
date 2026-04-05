"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function DashboardV3() {
  const [showPrediction, setShowPrediction] = useState(false);
  const [stats, setStats] = useState({
    customers: 0,
    segments: 0,
    predictions: 0,
    confidence: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        customers: 2543,
        segments: 5,
        predictions: 127,
        confidence: 94.2,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutV2>
      <div className="space-y-8">
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 animate-scale-in">
          <div className="relative rounded-3xl bg-slate-950 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3 animate-fade-in-up">
                  Welcome Back! 🚀
                </h1>
                <p className="text-xl text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Your customer intelligence dashboard is ready
                </p>
              </div>
              <button
                onClick={() => setShowPrediction(true)}
                className="btn-cosmic group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform">✨</span>
                  <span>New Prediction</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Vibrant Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <VibrantStatCard
            title="Total Customers"
            value={stats.customers.toLocaleString()}
            change="+12.5%"
            icon="👥"
            gradient="from-blue-500 via-cyan-500 to-teal-500"
            delay="0s"
          />
          <VibrantStatCard
            title="Active Segments"
            value={stats.segments}
            change="Optimized"
            icon="🎯"
            gradient="from-purple-500 via-pink-500 to-rose-500"
            delay="0.1s"
          />
          <VibrantStatCard
            title="Predictions Today"
            value={stats.predictions}
            change="+23.1%"
            icon="⚡"
            gradient="from-emerald-500 via-green-500 to-lime-500"
            delay="0.2s"
          />
          <VibrantStatCard
            title="Avg Confidence"
            value={`${stats.confidence}%`}
            change="+2.3%"
            icon="🔥"
            gradient="from-orange-500 via-red-500 to-pink-500"
            delay="0.3s"
          />
        </div>

        {/* Main Content with Exciting Visuals */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Animated Segment Distribution */}
          <div className="lg:col-span-2 card-vibrant hover-lift animate-slide-in-right">
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  🎨 Segment Distribution
                </h3>
                <div className="flex gap-2">
                  {['7D', '30D', '90D'].map((period) => (
                    <button
                      key={period}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:from-purple-600/40 hover:to-pink-600/40 transition-all"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <AnimatedSegmentChart />
            </div>
          </div>

          {/* Quick Actions with Icons */}
          <div className="card-vibrant hover-lift animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            <div className="relative z-10">
              <h3 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                ⚡ Quick Actions
              </h3>
              <div className="space-y-3">
                <QuickActionButton
                  icon="➕"
                  title="Add Customer"
                  description="Register new customer"
                  gradient="from-blue-600 to-cyan-600"
                />
                <QuickActionButton
                  icon="🔮"
                  title="Run Prediction"
                  description="AI-powered insights"
                  gradient="from-purple-600 to-pink-600"
                />
                <QuickActionButton
                  icon="📊"
                  title="Generate Report"
                  description="Export analytics"
                  gradient="from-emerald-600 to-teal-600"
                />
                <QuickActionButton
                  icon="📈"
                  title="View Analytics"
                  description="Deep dive insights"
                  gradient="from-orange-600 to-red-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed & Performance */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LiveActivityFeed />
          <PerformanceMetrics />
        </div>

        {/* Trending Insights */}
        <TrendingInsights />
      </div>

      {/* Stunning Prediction Modal */}
      {showPrediction && (
        <PredictionModalV3 onClose={() => setShowPrediction(false)} />
      )}
    </LayoutV2>
  );
}

function VibrantStatCard({ title, value, change, icon, gradient, delay }: any) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-1 hover-lift animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      <div className="relative rounded-3xl bg-slate-950/90 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
            <p className="text-4xl font-black text-white animate-count-up">{value}</p>
          </div>
          <div className={`text-5xl animate-float bg-gradient-to-br ${gradient} p-4 rounded-2xl`}>
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-emerald-400">{change}</span>
          <div className="h-1 flex-1 rounded-full bg-slate-800 overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${gradient} animate-pulse`} style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedSegmentChart() {
  const segments = [
    { name: "Premium 💎", value: 28, color: "from-blue-500 to-cyan-500", icon: "💎" },
    { name: "Growth 🚀", value: 24, color: "from-purple-500 to-pink-500", icon: "🚀" },
    { name: "Standard ⭐", value: 22, color: "from-emerald-500 to-teal-500", icon: "⭐" },
    { name: "Budget 💰", value: 16, color: "from-orange-500 to-red-500", icon: "💰" },
    { name: "Emerging 🌱", value: 10, color: "from-yellow-500 to-amber-500", icon: "🌱" },
  ];

  return (
    <div className="space-y-5">
      {segments.map((segment, i) => (
        <div key={i} className="group" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse-scale">{segment.icon}</span>
              <span className="text-lg font-bold text-white">{segment.name}</span>
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {segment.value}%
            </span>
          </div>
          <div className="relative h-4 overflow-hidden rounded-full bg-slate-800/50">
            <div
              className={`h-full bg-gradient-to-r ${segment.color} transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${segment.value}%` }}
            >
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuickActionButton({ icon, title, description, gradient }: any) {
  return (
    <button className="group w-full flex items-center gap-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4 hover:from-slate-700/70 hover:to-slate-600/70 transition-all hover-lift border border-slate-700/50 hover:border-slate-600">
      <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="text-left">
        <p className="font-bold text-white text-lg">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <span className="ml-auto text-2xl text-slate-600 group-hover:text-slate-400 transition-colors">›</span>
    </button>
  );
}

function LiveActivityFeed() {
  const activities = [
    { user: "Sarah Chen", action: "Upgraded to Premium", time: "Just now", icon: "💎", color: "from-blue-500 to-cyan-500" },
    { user: "Mike Ross", action: "Completed prediction", time: "2m ago", icon: "🔮", color: "from-purple-500 to-pink-500" },
    { user: "Emma Wilson", action: "Generated report", time: "5m ago", icon: "📊", color: "from-emerald-500 to-teal-500" },
    { user: "John Doe", action: "Updated segment", time: "8m ago", icon: "🎯", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="card-vibrant hover-lift animate-fade-in-up">
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            🔴 Live Activity
          </h3>
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl bg-slate-800/30 p-4 hover:bg-slate-800/50 transition-all animate-slide-in-right"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${activity.color} text-2xl shadow-lg`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{activity.user}</p>
                <p className="text-sm text-slate-400">{activity.action}</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformanceMetrics() {
  const metrics = [
    { label: "Conversion Rate", value: 94, color: "from-blue-500 to-cyan-500", icon: "📈" },
    { label: "Customer Satisfaction", value: 87, color: "from-purple-500 to-pink-500", icon: "😊" },
    { label: "Prediction Accuracy", value: 96, color: "from-emerald-500 to-teal-500", icon: "🎯" },
  ];

  return (
    <div className="card-vibrant hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="relative z-10">
        <h3 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          ⚡ Performance
        </h3>
        <div className="space-y-6">
          {metrics.map((metric, i) => (
            <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{metric.icon}</span>
                  <span className="font-bold text-white">{metric.label}</span>
                </div>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  {metric.value}%
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-slate-800/50">
                <div
                  className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000 relative`}
                  style={{ width: `${metric.value}%` }}
                >
                  <div className="absolute inset-0 shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendingInsights() {
  const insights = [
    { title: "Premium segment growing fast", trend: "+15%", icon: "📈", color: "from-blue-500 to-cyan-500" },
    { title: "High engagement on mobile", trend: "+28%", icon: "📱", color: "from-purple-500 to-pink-500" },
    { title: "Prediction accuracy improved", trend: "+5%", icon: "🎯", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="card-vibrant hover-lift animate-fade-in-up">
      <div className="relative z-10">
        <h3 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
          🔥 Trending Insights
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 hover:from-slate-700/70 hover:to-slate-600/70 transition-all hover-lift border border-slate-700/50 animate-scale-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${insight.color} text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                {insight.icon}
              </div>
              <p className="text-lg font-bold text-white mb-2">{insight.title}</p>
              <p className="text-2xl font-black text-emerald-400">{insight.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictionModalV3({ onClose }: any) {
  const [formData, setFormData] = useState({ age: "", income: "", spending: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        segment: "Premium Customers 💎",
        confidence: 94.2,
        description: "High-value customers with exceptional purchasing power",
        icon: "💎",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
        <div className="relative card-vibrant p-8">
          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                ✨ AI Prediction
              </h3>
              <button
                onClick={onClose}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all hover:rotate-90"
              >
                ✕
              </button>
            </div>

            {!result ? (
              <div className="space-y-5">
                <InputField
                  label="Age"
                  value={formData.age}
                  onChange={(e: any) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter age (18-100)"
                  icon="👤"
                />
                <InputField
                  label="Annual Income (k$)"
                  value={formData.income}
                  onChange={(e: any) => setFormData({ ...formData, income: e.target.value })}
                  placeholder="Enter income"
                  icon="💰"
                />
                <InputField
                  label="Spending Score"
                  value={formData.spending}
                  onChange={(e: any) => setFormData({ ...formData, spending: e.target.value })}
                  placeholder="Enter score (1-100)"
                  icon="⭐"
                />
                <button
                  onClick={handlePredict}
                  disabled={loading || !formData.age || !formData.income || !formData.spending}
                  className="btn-cosmic w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="animate-spin text-2xl">⚡</span>
                      <span>Analyzing...</span>
                    </span>
                  ) : (
                    <span>Generate Prediction</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-scale-in">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 p-8 text-center border-2 border-purple-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="mb-4 text-7xl animate-float">{result.icon}</div>
                    <h4 className="text-3xl font-black text-white mb-3">{result.segment}</h4>
                    <p className="text-lg text-slate-300 mb-6">{result.description}</p>
                    <div className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500/20 px-6 py-3 border border-emerald-500/30">
                      <span className="text-sm font-medium text-emerald-300">Confidence:</span>
                      <span className="text-3xl font-black text-emerald-400">{result.confidence}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 rounded-2xl border-2 border-slate-700 bg-slate-800/50 py-4 font-bold text-white hover:bg-slate-700/50 transition-all"
                  >
                    New Prediction
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 btn-cosmic"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, icon }: any) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-300">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border-2 border-slate-700 bg-slate-800/50 px-5 py-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}
