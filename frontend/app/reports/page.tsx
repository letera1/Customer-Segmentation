"use client";

import { useState } from "react";
import LayoutV2 from "@/components/LayoutV2";

interface ReportTemplate {
  id: string;
  name: string;
  desc: string;
  category: string;
  status: "ready" | "generating";
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [generatedReports, setGeneratedReports] = useState<any[]>([
    { name: "Executive Cohort Summary Q4", date: "Mar 25, 2026", size: "2.4 MB", format: "PDF" },
    { name: "Customer Behavioral Segmentation Matrix", date: "Mar 20, 2026", size: "1.8 MB", format: "PDF" },
    { name: "Monthly Centroid Drift & Performance", date: "Mar 15, 2026", size: "3.2 MB", format: "XLSX" },
  ]);

  const reportTemplates: ReportTemplate[] = [
    { id: "segment", name: "Cohort Segmentation Audit", desc: "Multi-cluster distribution and demographic persona profile", category: "Audits", status: "ready" },
    { id: "customer", name: "Customer Behavioral Insights", desc: "Deep dive telemetry into spending habits and tenure", category: "Telemetry", status: "ready" },
    { id: "performance", name: "Centroid Quality & Silhouette", desc: "Clustering evaluation metrics and dispersion ratio", category: "Model Quality", status: "ready" },
    { id: "trend", name: "Cohort Migration Trends", desc: "Time-series longitudinal tracking of customer shifts", category: "Forecasting", status: "ready" },
    { id: "revenue", name: "Cohort Revenue Impact", desc: "Value contribution per segment archetype and LTV projections", category: "Financial", status: "ready" },
    { id: "prediction", name: "Realtime Inference Telemetry", desc: "Inference response latency, hit rates and accuracy logs", category: "Operations", status: "ready" },
  ];

  const getTemplateIcon = (id: string) => {
    switch (id) {
      case "segment":
        return (
          <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      case "customer":
        return (
          <svg className="w-5 h-5 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "performance":
        return (
          <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "trend":
        return (
          <svg className="w-5 h-5 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "revenue":
        return (
          <svg className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
    }
  };

  const generateReport = (reportId: string, reportName: string) => {
    setGeneratingId(reportId);
    setTimeout(() => {
      const newReport = {
        name: reportName,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        size: `${(Math.random() * 2 + 1.2).toFixed(1)} MB`,
        format: "PDF",
      };
      setGeneratedReports((prev) => [newReport, ...prev]);
      setGeneratingId(null);

      // Automated client download
      const content = `====================================================\n${reportName.toUpperCase()}\nGenerated: ${newReport.date}\nSystem: SegmentAI Enterprise Analytics Suite\n====================================================\n\nExecutive Summary:\nThis report synthesizes customer cohort assignments, centroid dispersion metrics, and automated cluster strategies.\n`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportName.replace(/\s+/g, "_")}_${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const downloadReport = (report: any) => {
    const content = `SegmentAI Report Export\nFile: ${report.name}\nTimestamp: ${report.date}\nSize: ${report.size}\nFormat: ${report.format}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Intelligence Reports
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Automated analytical exports, cohort distributions, and model performance documentation
            </p>
          </div>
          <button
            onClick={() => generateReport("executive-custom", "Custom Ad-Hoc Audit")}
            disabled={generatingId !== null}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate Custom Export
          </button>
        </div>

        {/* Report Templates Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sub">
              Standard Intelligence Packages
            </h2>
            <span className="text-xs text-muted font-medium">6 Ready Templates</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((report) => {
              const isGenerating = generatingId === report.id;

              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`panel card-hover p-5 flex flex-col justify-between cursor-pointer border border-subtle ${
                    selectedReport === report.id ? "ring-2 ring-indigo-500/50" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-elevated border border-subtle flex items-center justify-center">
                        {getTemplateIcon(report.id)}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                        {report.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-main tracking-tight mb-1.5">
                      {report.name}
                    </h3>
                    <p className="text-xs text-sub leading-relaxed mb-4">
                      {report.desc}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      generateReport(report.id, report.name);
                    }}
                    disabled={generatingId !== null}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-surface hover:bg-elevated text-main border border-subtle py-2 text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span>Compiling Data...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Build Report</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Generated Reports Table */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-main">
                Compiled Archives & Downloads
              </h2>
              <p className="text-xs text-sub mt-0.5">Recently exported analytical snapshots available for download</p>
            </div>
            <span className="text-xs font-semibold text-muted">{generatedReports.length} Available</span>
          </div>

          <div className="divide-y divide-subtle border-t border-subtle">
            {generatedReports.map((report, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 hover:bg-surface px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-elevated border border-subtle flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-main">{report.name}</p>
                    <p className="text-[11px] text-muted font-medium mt-0.5">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-elevated text-sub border border-subtle">
                    {report.format}
                  </span>
                  <button
                    onClick={() => downloadReport(report)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-main hover:border-indigo-500/40 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedules & Formats */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-main mb-1">
              Automated Dispatch Schedules
            </h3>
            <p className="text-xs text-sub mb-4">Recurring analytical exports pushed to stakeholder channels</p>
            <div className="space-y-2.5">
              {[
                { name: "Executive Cohort Distribution", schedule: "Every Monday at 08:00 UTC", channel: "Slack & Email" },
                { name: "Silhouette Drift & Retraining Review", schedule: "1st of every month", channel: "Data Science Queue" },
                { name: "Quarterly Cohort Value Realization", schedule: "Quarter end close", channel: "Executive Boardroom" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-surface p-3 border border-subtle">
                  <div>
                    <p className="text-xs font-bold text-main">{item.name}</p>
                    <p className="text-[11px] text-muted font-medium mt-0.5">{item.schedule} • {item.channel}</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer">
                    Configure
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-main mb-1">
              Supported Export Formats
            </h3>
            <p className="text-xs text-sub mb-4">Compliant serialization standards for cross-platform integration</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { format: "Portable Document (PDF)", ext: "PDF", desc: "Executive presentation ready" },
                { format: "Spreadsheet Workbook", ext: "XLSX", desc: "Tabular cohort breakdowns" },
                { format: "Raw Comma Separated", ext: "CSV", desc: "Machine ingestible records" },
                { format: "REST API Schema", ext: "JSON", desc: "Vector centroids & weights" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-subtle bg-surface p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-main">{item.ext}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[11px] text-sub leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutV2>
  );
}
