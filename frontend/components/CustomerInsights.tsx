"use client";

export default function CustomerInsights() {
  const metrics = [
    { label: "Median Age", value: "38.4", unit: "years", sub: "18-70 distribution span" },
    { label: "Mean Annual Income", value: "$60.5", unit: "k USD", sub: "Standard deviation: $26.2k" },
    { label: "Average Spending Index", value: "50.2", unit: "/ 100", sub: "Benchmark midpoint calibration" },
    { label: "High Value Tier Share", value: "21.6", unit: "%", sub: "Top revenue generating segment" },
  ];

  const characteristics = [
    { cluster: "Cluster 0", name: "Budget Conscious", income: "Low to Moderate", spend: "Conservative", priceSens: "High", loyalty: "Medium" },
    { cluster: "Cluster 1", name: "High Value", income: "High ($75k+)", spend: "Generous (70+)", priceSens: "Low", loyalty: "High" },
    { cluster: "Cluster 2", name: "Potential Growth", income: "High ($75k+)", spend: "Conservative (<40)", priceSens: "Medium", loyalty: "High" },
    { cluster: "Cluster 3", name: "Average Customers", income: "Moderate ($40-$70k)", spend: "Balanced (40-60)", priceSens: "Medium", loyalty: "Medium" },
    { cluster: "Cluster 4", name: "Young Savers", income: "Low to Moderate", spend: "Selective / Trend", priceSens: "Medium", loyalty: "High" },
  ];

  return (
    <div className="panel p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-subtle">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-main">
            Cohort Characteristics & Archetype Matrix
          </h2>
          <p className="text-xs text-sub">
            Cluster centroid parameters calibrated from historical customer transactions
          </p>
        </div>
        <span className="text-xs font-mono text-muted">Feature Set: [Age, Income, Spending]</span>
      </div>

      {/* 4 Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {metrics.map((m, i) => (
          <div key={i} className="p-3 rounded-lg bg-surface border border-subtle">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              {m.label}
            </span>
            <div className="flex items-baseline gap-1 mt-1 font-mono">
              <span className="text-xl font-bold text-main">{m.value}</span>
              <span className="text-xs text-sub">{m.unit}</span>
            </div>
            <span className="text-[10px] text-muted block mt-1">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-subtle text-muted text-[10px] uppercase font-semibold tracking-wider">
              <th className="py-2 px-3">Segment Archetype</th>
              <th className="py-2 px-3">Income Level</th>
              <th className="py-2 px-3">Spending Pattern</th>
              <th className="py-2 px-3">Price Sensitivity</th>
              <th className="py-2 px-3">Loyalty Potential</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {characteristics.map((c, i) => (
              <tr key={i} className="hover:bg-surface transition-colors">
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-main">{c.name}</div>
                  <div className="text-[10px] font-mono text-muted">{c.cluster}</div>
                </td>
                <td className="py-2.5 px-3 text-sub font-medium">{c.income}</td>
                <td className="py-2.5 px-3 text-sub font-medium">{c.spend}</td>
                <td className="py-2.5 px-3 text-sub font-medium">{c.priceSens}</td>
                <td className="py-2.5 px-3 text-sub font-medium">{c.loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
