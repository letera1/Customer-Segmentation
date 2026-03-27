"use client";

import Layout from "@/components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Configure your application preferences
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 font-semibold">Model Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Endpoint</label>
              <input
                type="text"
                defaultValue="http://localhost:8000"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model Version</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2">
                <option>v2.0 (Current)</option>
                <option>v1.5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 font-semibold">Data Management</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg border border-slate-700 py-2 text-sm font-medium hover:bg-slate-800">
              Export All Data
            </button>
            <button className="w-full rounded-lg border border-red-900 py-2 text-sm font-medium text-red-400 hover:bg-red-950">
              Clear All History
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
