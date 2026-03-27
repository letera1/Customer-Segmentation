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
    <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Customer Insights</h2>
        <select className="bg-[#1e293b] text-white text-sm px-3 py-1 rounded-lg border border-[#334155] focus:outline-none">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-[#0a0e1a] rounded-lg p-4 border border-[#1e293b] hover:border-green-500/30 transition-all"
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
      <div className="mt-6 pt-6 border-t border-[#1e293b]">
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
                    : "bg-[#1e293b]"
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
