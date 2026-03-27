"use client";

import Layout from "@/components/Layout";

export default function Reports() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Reports</h2>
          <p className="mt-1 text-sm text-slate-400">
            Generate and export detailed reports
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {["Segment Analysis", "Customer Insights", "Performance Metrics", "Trend Report"].map(
            (title) => (
              <div
                key={title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Comprehensive {title.toLowerCase()} report
                </p>
                <button className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium hover:bg-indigo-700">
                  Generate Report
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
