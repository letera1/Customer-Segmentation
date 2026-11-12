"use client";

interface SegmentItem {
  id: number;
  name: string;
  count: number;
  percentage: number;
  profile: string;
}

export default function SegmentDistribution() {
  const segments: SegmentItem[] = [
    { id: 0, name: "Budget Conscious", count: 48, percentage: 19.2, profile: "Low income, high price sensitivity" },
    { id: 1, name: "High Value", count: 54, percentage: 21.6, profile: "High income, generous expenditure" },
    { id: 2, name: "Potential Growth", count: 51, percentage: 20.4, profile: "High income, conservative spending" },
    { id: 3, name: "Average Customers", count: 52, percentage: 20.8, profile: "Moderate income, balanced spending" },
    { id: 4, name: "Young Savers", count: 45, percentage: 18.0, profile: "Emerging demographic, selective spend" },
  ];

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-main">
            Cohort Population Breakdown
          </h2>
          <p className="text-xs text-sub">
            Relative distribution across 250 active benchmark profiles
          </p>
        </div>
        <span className="text-xs font-mono font-medium text-muted px-2 py-0.5 rounded bg-surface border border-subtle">
          Total: 250 records
        </span>
      </div>

      <div className="space-y-3">
        {segments.map((seg) => (
          <div key={seg.id} className="p-2.5 rounded-lg bg-surface border border-subtle">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted px-1.5 py-0.2 rounded bg-elevated border border-subtle">
                  C{seg.id}
                </span>
                <span className="font-semibold text-main">{seg.name}</span>
                <span className="text-[11px] text-muted hidden md:inline">
                  — {seg.profile}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sub font-medium">{seg.count} users</span>
                <span className="font-bold text-main">{seg.percentage.toFixed(1)}%</span>
              </div>
            </div>

            {/* Precision Sleek Bar (4px height) */}
            <div className="w-full bg-elevated rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-slate-500 rounded-full transition-all duration-300"
                style={{ width: `${seg.percentage * 3.5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
