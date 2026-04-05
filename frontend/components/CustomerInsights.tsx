"use client";

export default function CustomerInsights() {
  const insights = [
    {
      metric: "Average Age",
      value: "42.3",
      unit: "years",
      trend: "+2.1%",
      positive: true,
    },
    {
      metric: "Avg Income",
      value: "$67.5",
      unit: "k",
      trend: "+5.3%",
      positive: true,
    },
    {
      metric: "Avg Spending",
      value: "58.2",
      unit: "/100",
      trend: "-1.2%",
      positive: false,
    },
    {
      metric: "Retention Rate",
      value: "87.4",
      unit: "%",
      trend: "+3.8%",
      positive: true,
    },
  ];

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Customer Insights</h2>
        <select className="rounded-lg border border-slate-800/60 bg-slate-900/50 px-3 py-1 text-sm text-white focus:outline-none">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4 transition-all hover:border-green-500/30"
          >
            <p className="text-gray-400 text-xs mb-2">{insight.metric}</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-white text-2xl font-bold">{insight.value}</span>
              <span className="text-gray-400 text-sm">{insight.unit}</span>
            </div>
            <span
              className={`text-xs font-medium ${
                insight.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {insight.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <h3 className="text-white font-medium mb-4">Activity Heatmap</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className={`h-8 rounded ${
                  intensity > 0.7
                    ? "bg-green-500"
                    : intensity > 0.4
                    ? "bg-green-500/50"
                    : "bg-slate-800/60"
                }`}
                title={`Day ${i + 1}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
