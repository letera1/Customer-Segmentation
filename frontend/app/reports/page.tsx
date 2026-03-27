"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    { id: "segment", name: "Segment Analysis Report", desc: "Comprehensive segment breakdown", icon: "🎯", status: "ready" },
    { id: "customer", name: "Customer Insights Report", desc: "Detailed customer behavior analysis", icon: "👥", status: "ready" },
    { id: "performance", name: "Performance Metrics", desc: "KPI and performance tracking", icon: "📊", status: "generating" },
    { id: "trend", name: "Trend Analysis", desc: "Historical trends and forecasts", icon: "📈", status: "ready" },
    { id: "revenue", name: "Revenue Report", desc: "Financial performance overview", icon: "💰", status: "ready" },
    { id: "prediction", name: "Prediction Accuracy", desc: "Model performance metrics", icon: "🔮", status: "ready" },
  ];

  const recentReports = [
    { name: "Q4 2024 Segment Report", date: "Mar 25, 2025", size: "2.4 MB", format: "PDF" },
    { name: "Customer Behavior Analysis", date: "Mar 20, 2025", size: "1.8 MB", format: "PDF" },
    { name: "Monthly Performance", date: "Mar 15, 2025", size: "3.2 MB", format: "XLSX" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Reports Center</h2>
            <p className="text-sm text-slate-400">Generate and manage your reports</p>
          </div>
          <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 font-medium shadow-lg shadow-blue-500/20">
            + New Custom Report
          </button>
        </div>

        {/* Report Templates */}
        <div>
          <h3 className="mb-4 font-semibold">Report Templates</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="group rounded-xl border border-slate-800/50 bg-[#151B2B] p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-2xl">
                    {report.icon}
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    report.status === "ready"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {report.status}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{report.name}</h4>
                <p className="text-sm text-slate-400 mb-4">{report.desc}</p>
                <button className="w-full rounded-lg bg-slate-800/50 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
                  Generate Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h3 className="mb-4 font-semibold">Recent Reports</h3>
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B]">
            <div className="divide-y divide-slate-800/50">
              {recentReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
                      <span className="text-lg">📄</span>
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-slate-400">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">{report.format}</span>
                    <button className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-800">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Reports */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 font-semibold">Scheduled Reports</h3>
            <div className="space-y-3">
              {["Weekly Performance", "Monthly Segment Analysis", "Quarterly Review"].map((name, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-slate-400">Every {["Monday", "1st", "Quarter end"][i]}</p>
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300">Edit</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 font-semibold">Export Options</h3>
            <div className="space-y-3">
              {["PDF Document", "Excel Spreadsheet", "CSV Data", "JSON Format"].map((format, i) => (
                <button
                  key={i}
                  className="w-full rounded-lg border border-slate-700 p-3 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <p className="text-sm font-medium">{format}</p>
                  <p className="text-xs text-slate-400">Export report as {format.toLowerCase()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
