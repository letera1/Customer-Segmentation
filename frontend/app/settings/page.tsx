"use client";

import { useState } from "react";
import LayoutV2 from "@/components/LayoutV2";

export default function Settings() {
  const [apiEndpoint, setApiEndpoint] = useState("http://localhost:8000");
  const [modelVersion, setModelVersion] = useState("v2.0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dataRetention, setDataRetention] = useState("90");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify({
      apiEndpoint,
      modelVersion,
      autoRefresh,
      notifications,
      darkMode,
      dataRetention,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const data = {
      settings: { apiEndpoint, modelVersion, autoRefresh, notifications, darkMode, dataRetention },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutV2>
        </LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-sm text-slate-400">Configure your application preferences</p>
          </div>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2.5 font-medium transition-all ${
              saved
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
            }`}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* API Configuration */}
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <span className="text-xl">🔌</span>
              API Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">API Endpoint</label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 focus:border-blue-600 focus:outline-none"
                  placeholder="http://localhost:8000"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Model Version</label>
                <select
                  value={modelVersion}
                  onChange={(e) => setModelVersion(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 focus:border-blue-600 focus:outline-none"
                >
                  <option value="v2.0">v2.0 (Current - Recommended)</option>
                  <option value="v1.5">v1.5 (Stable)</option>
                  <option value="v1.0">v1.0 (Legacy)</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
                <div>
                  <p className="text-sm font-medium">Auto Refresh Data</p>
                  <p className="text-xs text-slate-400">Automatically refresh every 30s</p>
                </div>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    autoRefresh ? "bg-blue-600" : "bg-slate-700"
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

          {/* Appearance */}
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <span className="text-xl">🎨</span>
              Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-slate-400">Use dark theme</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    darkMode ? "bg-blue-600" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      darkMode ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-slate-400">Show system notifications</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications ? "bg-blue-600" : "bg-slate-700"
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
                <label className="mb-2 block text-sm font-medium">Theme Accent</label>
                <div className="flex gap-2">
                  {["blue", "purple", "emerald", "pink", "orange"].map((color) => (
                    <button
                      key={color}
                      className={`h-10 w-10 rounded-lg bg-${color}-600 hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <span className="text-xl">💾</span>
              Data Management
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Data Retention Period</label>
                <select
                  value={dataRetention}
                  onChange={(e) => setDataRetention(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 focus:border-blue-600 focus:outline-none"
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="forever">Forever</option>
                </select>
              </div>
              <button
                onClick={handleExport}
                className="w-full rounded-lg border border-slate-700 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                📥 Export All Data
              </button>
              <button className="w-full rounded-lg border border-slate-700 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors">
                📤 Import Data
              </button>
              <button className="w-full rounded-lg border border-red-900 py-2.5 text-sm font-medium text-red-400 hover:bg-red-950 transition-colors">
                🗑️ Clear All History
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <span className="text-xl">🔒</span>
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-800/30 p-3">
                <p className="text-sm font-medium">API Key</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="password"
                    value="••••••••••••••••"
                    readOnly
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2"
                  />
                  <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">
                    Regenerate
                  </button>
                </div>
              </div>
              <button className="w-full rounded-lg border border-slate-700 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors">
                🔑 Change Password
              </button>
              <button className="w-full rounded-lg border border-slate-700 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors">
                📱 Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <span className="text-xl">ℹ️</span>
            System Information
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Version</p>
              <p className="mt-1 font-mono text-lg font-medium">v2.0.1</p>
            </div>
            <div className="rounded-lg bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Last Updated</p>
              <p className="mt-1 text-lg font-medium">Mar 30, 2026</p>
            </div>
            <div className="rounded-lg bg-slate-800/30 p-4">
              <p className="text-sm text-slate-400">Storage Used</p>
              <p className="mt-1 text-lg font-medium">24.5 MB</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6">
          <h3 className="mb-2 font-semibold">About SegmentAI Pro</h3>
          <p className="text-sm text-slate-400">
            Advanced customer segmentation platform powered by machine learning. Built with Next.js, FastAPI, and scikit-learn.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-800">
              📖 Documentation
            </button>
            <button className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-800">
              🐛 Report Issue
            </button>
            <button className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-800">
              ⭐ Rate Us
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
