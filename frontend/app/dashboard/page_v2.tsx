"use client";

import { useState } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function DashboardV2() {
  const [showPrediction, setShowPrediction] = useState(false);

  return (
    <LayoutV2>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, Admin
              </h1>
              <p className="text-slate-400">
                Here's what's happening with your customer segments today
              </p>
            </div>
            <button
              onClick={() => setShowPrediction(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <span>◆</span>
              <span>New Prediction</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Customers"
            value="2,543"
            change="+12.5%"
            trend="up"
            icon="◉"
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Active Segments"
            value="5"
            change="Stable"
            trend="neutral"
            icon="◈"
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Predictions Today"
            value="127"
            change="+23.1%"
            trend="up"
            icon="◆"
            gradient="from-emerald-500 to-teal-500"
          />
          <StatCard
            title="Avg Confidence"
            value="94.2%"
            change="+2.3%"
            trend="up"
            icon="✓"
            gradient="from-orange-500 to-red-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Segment Distribution */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Segment Distribution</h3>
              <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            <SegmentChart />
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Actions</h3>
            <div className="space-y-3">
              <QuickAction
                icon="◉"
                title="Add Customer"
                description="Register new customer"
                color="blue"
              />
              <QuickAction
                icon="◆"
                title="Run Prediction"
                description="Predict segment"
                color="purple"
              />
              <QuickAction
                icon="▤"
                title="Generate Report"
                description="Export analytics"
                color="emerald"
              />
              <QuickAction
                icon="◧"
                title="View Analytics"
                description="Detailed insights"
                color="orange"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity & Top Segments */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <TopSegments />
        </div>
      </div>

      {/* Prediction Modal */}
      {showPrediction && (
        <PredictionModal onClose={() => setShowPrediction(false)} />
      )}
    </LayoutV2>
  );
}

function StatCard({ title, value, change, trend, icon, gradient }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <div className="mt-2 flex items-center gap-1">
            <span
              className={`text-sm font-medium ${
                trend === "up"
                  ? "text-emerald-400"
                  : trend === "down"
                  ? "text-red-400"
                  : "text-slate-400"
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-2xl text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function SegmentChart() {
  const segments = [
    { name: "Premium", value: 28, color: "from-blue-500 to-cyan-500" },
    { name: "Growth", value: 24, color: "from-purple-500 to-pink-500" },
    { name: "Standard", value: 22, color: "from-emerald-500 to-teal-500" },
    { name: "Budget", value: 16, color: "from-orange-500 to-red-500" },
    { name: "Emerging", value: 10, color: "from-yellow-500 to-amber-500" },
  ];

  return (
    <div className="space-y-4">
      {segments.map((segment, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">{segment.name}</span>
            <span className="text-slate-400">{segment.value}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full bg-gradient-to-r ${segment.color} transition-all duration-500`}
              style={{ width: `${segment.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function QuickAction({ icon, title, description, color }: any) {
  const colors: any = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    emerald: "from-emerald-500 to-teal-500",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <button className="flex w-full items-center gap-4 rounded-xl bg-white/5 p-4 text-left transition-all hover:bg-white/10">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors[color]} text-xl text-white`}
      >
        {icon}
      </div>
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </button>
  );
}

function RecentActivity() {
  const activities = [
    { user: "John Doe", action: "Added to Premium segment", time: "2 min ago", icon: "◉" },
    { user: "Jane Smith", action: "Prediction completed", time: "5 min ago", icon: "◆" },
    { user: "Mike Johnson", action: "Report generated", time: "12 min ago", icon: "▤" },
    { user: "Sarah Williams", action: "Segment updated", time: "18 min ago", icon: "◈" },
  ];

  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <h3 className="mb-6 text-lg font-semibold text-white">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{activity.user}</p>
              <p className="text-xs text-slate-400">{activity.action}</p>
            </div>
            <span className="text-xs text-slate-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopSegments() {
  const segments = [
    { name: "Premium Customers", count: 712, growth: "+15%", color: "blue" },
    { name: "Growth Potential", count: 611, growth: "+8%", color: "purple" },
    { name: "Standard", count: 559, growth: "+3%", color: "emerald" },
  ];

  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <h3 className="mb-6 text-lg font-semibold text-white">Top Performing Segments</h3>
      <div className="space-y-4">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
            <div>
              <p className="font-medium text-white">{segment.name}</p>
              <p className="text-sm text-slate-400">{segment.count} customers</p>
            </div>
            <span className="text-sm font-medium text-emerald-400">{segment.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PredictionModal({ onClose }: any) {
  const [formData, setFormData] = useState({ age: "", income: "", spending: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        segment: "Premium Customers",
        confidence: 94.2,
        description: "High-value customers with strong purchasing power",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-md rounded-2xl border border-white/10 p-8 animate-fade-in">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">New Prediction</h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter age (18-100)"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Annual Income (k$)</label>
              <input
                type="number"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter income"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Spending Score</label>
              <input
                type="number"
                value={formData.spending}
                onChange={(e) => setFormData({ ...formData, spending: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter score (1-100)"
              />
            </div>
            <button
              onClick={handlePredict}
              disabled={loading || !formData.age || !formData.income || !formData.spending}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            >
              {loading ? "Predicting..." : "Generate Prediction"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 text-center border border-blue-500/30">
              <div className="mb-4 text-5xl">◆</div>
              <h4 className="text-xl font-bold text-white">{result.segment}</h4>
              <p className="mt-2 text-sm text-slate-300">{result.description}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm text-slate-400">Confidence:</span>
                <span className="text-lg font-bold text-emerald-400">{result.confidence}%</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                New Prediction
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
