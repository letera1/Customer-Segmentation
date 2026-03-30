"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

export default function Dashboard() {
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [predictionData, setPredictionData] = useState({
    age: "",
    income: "",
    spendingScore: "",
  });
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(predictionData.age),
          annual_income: parseInt(predictionData.income),
          spending_score: parseInt(predictionData.spendingScore),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setPredictionResult(result);
        
        // Save to history
        const history = JSON.parse(localStorage.getItem("prediction_history") || "[]");
        history.unshift({
          ...result,
          age: predictionData.age,
          income: predictionData.income,
          spendingScore: predictionData.spendingScore,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("prediction_history", JSON.stringify(history.slice(0, 50)));
      }
    } catch (error) {
      console.error("Prediction failed:", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-sm text-slate-400">Analytics report from 2024 to 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPredictionForm(true)}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/20"
            >
              🔮 New Prediction
            </button>
            <select className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm">
              <option>All devices</option>
            </select>
            <select className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm">
              <option>2024 - 2025</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Page views" value="60.8K" change="+24%" positive={true} />
          <KPICard title="Monthly users" value="20.6K" change="-24%" positive={false} />
          <KPICard title="New subscriptions" value="756" change="+2%" positive={true} />
          <KPICard title="Average visit duration" value="10min" change="+12%" positive={true} />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueChart />
            <div className="grid gap-6 md:grid-cols-2">
              <UsersBySoftware />
              <WebTraffic />
            </div>
            <SubscriptionsTable />
          </div>

          {/* Right Column - 1 col */}
          <div className="space-y-6">
            <SalesTarget />
            <CategoryChart />
            <FeaturedProducts />
            <RecentCustomers />
            <WorldMap />
          </div>
        </div>

        {/* Prediction Modal */}
        {showPredictionForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPredictionForm(false)}
          >
            <div
              className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0B1120] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Customer Segment Prediction</h3>
                <button
                  onClick={() => setShowPredictionForm(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!predictionResult ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Age</label>
                    <input
                      type="number"
                      value={predictionData.age}
                      onChange={(e) => setPredictionData({ ...predictionData, age: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                      placeholder="Enter age (18-70)"
                      min="18"
                      max="70"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Annual Income (k$)</label>
                    <input
                      type="number"
                      value={predictionData.income}
                      onChange={(e) => setPredictionData({ ...predictionData, income: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                      placeholder="Enter income (15-140)"
                      min="15"
                      max="140"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Spending Score (1-100)</label>
                    <input
                      type="number"
                      value={predictionData.spendingScore}
                      onChange={(e) => setPredictionData({ ...predictionData, spendingScore: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                      placeholder="Enter spending score"
                      min="1"
                      max="100"
                    />
                  </div>
                  <button
                    onClick={handlePredict}
                    disabled={loading || !predictionData.age || !predictionData.income || !predictionData.spendingScore}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {loading ? "Predicting..." : "Generate Prediction"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 text-center">
                    <div className="mb-2 text-4xl">
                      {["💰", "👑", "🎯", "👥", "🌱"][predictionResult.cluster_id]}
                    </div>
                    <h4 className="text-xl font-bold">{predictionResult.segment_name}</h4>
                    <p className="mt-2 text-sm text-slate-400">{predictionResult.segment_description}</p>
                  </div>
                  <div className="space-y-2 rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Cluster ID:</span>
                      <span className="font-medium">{predictionResult.cluster_id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Age:</span>
                      <span className="font-medium">{predictionData.age} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Income:</span>
                      <span className="font-medium">${predictionData.income}k</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Spending Score:</span>
                      <span className="font-medium">{predictionData.spendingScore}/100</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPredictionResult(null);
                        setPredictionData({ age: "", income: "", spendingScore: "" });
                      }}
                      className="flex-1 rounded-lg border border-slate-800 px-4 py-2 font-medium hover:bg-slate-800"
                    >
                      New Prediction
                    </button>
                    <button
                      onClick={() => {
                        setPredictionResult(null);
                        setShowPredictionForm(false);
                        setPredictionData({ age: "", income: "", spendingScore: "" });
                      }}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function KPICard({ title, value, change, positive }: any) {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-sm font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Total balance</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">$240.8K</span>
            <span className="text-sm text-emerald-400">+Revenue</span>
            <span className="text-sm text-slate-400">+Expense</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">$48.8K</div>
          <div className="text-sm text-slate-400">Nov 04, 2025</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d="M 0 120 Q 100 100, 200 110 T 400 90 T 600 80 T 800 70 L 800 200 L 0 200 Z"
            fill="url(#areaGradient)"
          />
          
          {/* Line */}
          <path
            d="M 0 120 Q 100 100, 200 110 T 400 90 T 600 80 T 800 70"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Data points */}
          {[0, 200, 400, 600, 800].map((x, i) => {
            const y = [120, 110, 90, 80, 70][i];
            return (
              <circle key={i} cx={x} cy={y} r="5" fill="#3b82f6" stroke="#151B2B" strokeWidth="2" />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="mt-4 flex justify-between text-xs text-slate-500">
          {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersBySoftware() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Users by software</h3>
        <button className="text-sm text-slate-400">All installations</button>
      </div>

      {/* Circular Chart */}
      <div className="flex items-center justify-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90 transform">
            <circle cx="96" cy="96" r="70" stroke="rgb(30 41 59)" strokeWidth="16" fill="none" />
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="#3b82f6"
              strokeWidth="16"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="110"
              strokeLinecap="round"
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="#8b5cf6"
              strokeWidth="16"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="220"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">24,648</span>
            <span className="text-sm text-slate-400">Total users</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-bold">16,264</div>
          <div className="text-xs text-slate-400">Windows users</div>
        </div>
        <div>
          <div className="text-xl font-bold">5,546</div>
          <div className="text-xs text-slate-400">Apple users</div>
        </div>
        <div>
          <div className="text-xl font-bold">2,478</div>
          <div className="text-xs text-slate-400">Linux users</div>
        </div>
      </div>
    </div>
  );
}

function WebTraffic() {
  const data = [65, 85, 70, 95, 75, 88, 72, 90, 68, 82, 78, 92];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Web traffic</h3>
        <div className="flex gap-2 text-xs">
          <button className="rounded-full bg-blue-600 px-3 py-1">Daily</button>
          <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">Month</button>
          <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">Week</button>
          <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">Day</button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between h-40 gap-1">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t"
              style={{ height: `${value}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SalesTarget() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-6 font-semibold">Sales target</h3>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center">
        <div className="relative h-40 w-40">
          <svg className="h-full w-full -rotate-90 transform">
            <circle cx="80" cy="80" r="60" stroke="rgb(30 41 59)" strokeWidth="12" fill="none" />
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="url(#salesGradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray="377"
              strokeDashoffset="94"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="salesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">78%</span>
            <span className="text-xs text-slate-400">Sales target</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-slate-400">Sales target: $2324K</div>
      </div>
    </div>
  );
}

function CategoryChart() {
  const categories = [
    { name: "Desktop Mouse", value: 85 },
    { name: "Wireless Mouse", value: 70 },
    { name: "Gaming Mouse", value: 60 },
    { name: "Office Mouse", value: 45 },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">by category</h3>
        <button className="text-sm text-slate-400">2023 - 2025</button>
      </div>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">{cat.name}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts() {
  const products = [
    { name: "iPhone 15 Pro Max", price: "$1,199.00" },
    { name: "Apple Watch Series 8", price: "$399.00" },
    { name: "MacBook M3", price: "$1,499.00" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <h3 className="mb-4 font-semibold">Featured products</h3>
      <div className="space-y-3">
        {products.map((product, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-800/30 p-3">
            <div className="h-12 w-12 rounded-lg bg-slate-700" />
            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-slate-400">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentCustomers() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Recent customers</h3>
        <button className="text-sm text-slate-400">2023 - 2025</button>
      </div>

      {/* Circular Chart */}
      <div className="flex items-center justify-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform">
            <circle cx="64" cy="64" r="50" stroke="rgb(30 41 59)" strokeWidth="10" fill="none" />
            <circle
              cx="64"
              cy="64"
              r="50"
              stroke="#3b82f6"
              strokeWidth="10"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset="78"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">8,548</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">New customers</span>
          <span className="font-medium">2,123</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Returning</span>
          <span className="font-medium">4,481</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Inactive</span>
          <span className="font-medium">1,944</span>
        </div>
      </div>
    </div>
  );
}

function WorldMap() {
  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">RR by country</h3>
      </div>
      <div className="flex h-48 items-center justify-center rounded-lg bg-slate-900/50">
        <span className="text-slate-500">World Map Visualization</span>
      </div>
    </div>
  );
}

function SubscriptionsTable() {
  const subscriptions = [
    { id: "#9321", name: "John Carter", email: "hello@johncarter.com", date: "Mar 20, 2025", location: "New York, NY", status: "Active", amount: "$2299.00" },
    { id: "#9322", name: "Sophie Moore", email: "info@sophiemoore.com", date: "Mar 25, 2025", location: "Los Angeles, CA", status: "Expired", amount: "$2299.00" },
    { id: "#9323", name: "Matt Cannon", email: "hi@mattcannon.com", date: "Mar 28, 2025", location: "San Diego, CA", status: "Active", amount: "$2299.00" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Subscriptions</h3>
        <div className="flex gap-2">
          <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm">Search subscription</button>
          <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm">Date</button>
          <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm">Location</button>
          <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm">Customer</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr className="text-left text-sm text-slate-400">
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">NAME</th>
              <th className="pb-3 font-medium">EMAIL</th>
              <th className="pb-3 font-medium">DATE</th>
              <th className="pb-3 font-medium">LOCATION</th>
              <th className="pb-3 font-medium">STATUS</th>
              <th className="pb-3 font-medium">REVENUE</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {subscriptions.map((sub, i) => (
              <tr key={i} className="border-b border-slate-800/50">
                <td className="py-4">{sub.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    {sub.name}
                  </div>
                </td>
                <td className="py-4 text-slate-400">{sub.email}</td>
                <td className="py-4">{sub.date}</td>
                <td className="py-4 text-slate-400">{sub.location}</td>
                <td className="py-4">
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    sub.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-4 font-medium">{sub.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
