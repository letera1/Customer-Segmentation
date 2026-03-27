"use client";

import Layout from "@/components/Layout";

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          <p className="mt-1 text-sm text-slate-400">
            Deep insights into customer behavior and trends
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 font-semibold">Customer Distribution</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart visualization here
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 font-semibold">Revenue by Segment</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart visualization here
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 font-semibold">Trend Analysis</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart visualization here
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 font-semibold">Segment Performance</h3>
            <div className="h-64 flex items-center justify-center text-slate-400">
              Chart visualization here
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
