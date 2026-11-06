"use client";

import { useState } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { API_BASE_URL } from "@/lib/config";

export default function Settings() {
  const [apiEndpoint, setApiEndpoint] = useState(API_BASE_URL);
  const [modelVersion, setModelVersion] = useState("v2.0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState("90");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          apiEndpoint,
          modelVersion,
          autoRefresh,
          notifications,
          dataRetention,
        })
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const data = {
      settings: { apiEndpoint, modelVersion, autoRefresh, notifications, dataRetention },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `segmentai-settings-${Date.now()}.json`;
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
              Platform Configuration
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Manage inference telemetry endpoints, cluster parameters, and security credentials
            </p>
          </div>
          <button
            onClick={handleSave}
            className={`self-start sm:self-auto inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-sm ${
              saved ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {saved ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Preferences Saved</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Save Configuration</span>
              </>
            )}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* API Configuration */}
          <div className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-softgray-100 dark:bg-[#20222A] border border-charcoal-700/40 dark:border-white/[0.08] flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-main">Inference Gateway</h2>
                <p className="text-[11px] text-sub">Model serving backend connectivity</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">
                  Backend API Host URL
                </label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                  placeholder="http://localhost:8000"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">
                  Model Pipeline Version
                </label>
                <select
                  value={modelVersion}
                  onChange={(e) => setModelVersion(e.target.value)}
                  className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                >
                  <option value="v2.0">v2.0 — K-Means 5-Cluster Centroids (Production)</option>
                  <option value="v1.5">v1.5 — High-Variance Fallback Model</option>
                  <option value="v1.0">v1.0 — Baseline PCA Pipeline</option>
                </select>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
                <div>
                  <p className="text-xs font-bold text-main">Telemetry Auto-Refresh</p>
                  <p className="text-[11px] text-sub mt-0.5">Poll backend diagnostics every 30 seconds</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    autoRefresh ? "bg-indigo-600" : "bg-charcoal-700 dark:bg-charcoal-800"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      autoRefresh ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* System Telemetry & Preferences */}
          <div className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-softgray-100 dark:bg-[#20222A] border border-charcoal-700/40 dark:border-white/[0.08] flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-main">Diagnostics & Alerts</h2>
                <p className="text-[11px] text-sub">System notifications and monitoring events</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
                <div>
                  <p className="text-xs font-bold text-main">System Event Notifications</p>
                  <p className="text-[11px] text-sub mt-0.5">Emit toast alerts on new cohort classification</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications ? "bg-indigo-600" : "bg-charcoal-700 dark:bg-charcoal-800"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      notifications ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">
                  Telemetry Retention Period
                </label>
                <select
                  value={dataRetention}
                  onChange={(e) => setDataRetention(e.target.value)}
                  className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                >
                  <option value="30">30 days — Standard Retention</option>
                  <option value="90">90 days — Quarterly Compliance</option>
                  <option value="180">180 days — Semi-Annual Audit</option>
                  <option value="365">365 days — Full Fiscal Year</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-softgray-100/70 dark:bg-[#181A20] border border-charcoal-700/30 dark:border-white/[0.05]">
                <p className="text-xs font-bold text-main mb-1">Theme Palette Reference</p>
                <p className="text-[11px] text-sub">
                  Charcoal Gray (<span className="font-mono text-indigo-400">#131418</span>) &amp; Smooth Light Gray (<span className="font-mono text-indigo-400">#ECEEF2</span>) in Lato typeface. Toggle available in the sidebar navigation.
                </p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-softgray-100 dark:bg-[#20222A] border border-charcoal-700/40 dark:border-white/[0.08] flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-main">Data Operations</h2>
                <p className="text-[11px] text-sub">Snapshot export and persistent state controls</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleExport}
                className="w-full inline-flex items-center justify-between rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100/70 dark:bg-[#181A20] px-4 py-2.5 text-xs font-bold text-main hover:border-indigo-500/40 transition-all"
              >
                <span>Export Configuration Backup</span>
                <svg className="w-4 h-4 text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("prediction_history");
                    alert("Prediction history has been cleared.");
                  }
                }}
                className="w-full inline-flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-500 dark:text-rose-400 hover:bg-rose-500/15 transition-all"
              >
                <span>Purge Inference Session Cache</span>
                <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Security & Access */}
          <div className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-softgray-100 dark:bg-[#20222A] border border-charcoal-700/40 dark:border-white/[0.08] flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-main">Security Credentials</h2>
                <p className="text-[11px] text-sub">Session authentication &amp; tokens</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
                <p className="text-xs font-bold text-main">API Access Key</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="password"
                    value="sgmt_live_k8f921a00e572d4"
                    readOnly
                    className="flex-1 rounded-lg border border-charcoal-700/50 dark:border-white/[0.08] bg-white dark:bg-[#20222A] px-3 py-1.5 text-xs font-mono text-sub"
                  />
                  <button
                    onClick={() => alert("API Token copied to clipboard.")}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-muted">
                Endpoint calls require HTTP bearer authorization header with active API key.
              </p>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="panel p-5 border border-charcoal-700/60 dark:border-white/[0.06]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sub mb-3">
            System Environment Diagnostics
          </h2>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
              <span className="text-[10px] uppercase font-bold text-muted">Engine</span>
              <p className="mt-1 text-xs font-bold text-main">FastAPI v0.115</p>
            </div>
            <div className="rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
              <span className="text-[10px] uppercase font-bold text-muted">Frontend Architecture</span>
              <p className="mt-1 text-xs font-bold text-main">Next.js 15 App Router</p>
            </div>
            <div className="rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
              <span className="text-[10px] uppercase font-bold text-muted">Design System</span>
              <p className="mt-1 text-xs font-bold text-main">Lato + Charcoal Gray</p>
            </div>
            <div className="rounded-xl bg-softgray-100/70 dark:bg-[#181A20] p-3 border border-charcoal-700/30 dark:border-white/[0.05]">
              <span className="text-[10px] uppercase font-bold text-muted">Cluster Algorithm</span>
              <p className="mt-1 text-xs font-bold text-main">K-Means (k=5 Centroids)</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutV2>
  );
}
