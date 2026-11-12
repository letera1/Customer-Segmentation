"use client";

interface StatsCardsProps {
  stats: {
    totalCustomers: number;
    activeSegments: number;
    avgConfidence: number;
    predictions: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Dataset Records",
      value: stats.totalCustomers.toLocaleString(),
      change: "+12.4%",
      subtext: "active customer profiles",
      metric: "Cohort Population",
    },
    {
      title: "Centroid Clusters",
      value: stats.activeSegments.toString(),
      change: "k = 5",
      subtext: "converged clusters",
      metric: "K-Means Partition",
    },
    {
      title: "Inference Confidence",
      value: `${stats.avgConfidence}%`,
      change: "± 1.2%",
      subtext: "centroid proximity",
      metric: "Distance Metric",
    },
    {
      title: "Total Inferences",
      value: stats.predictions.toLocaleString(),
      change: "3.2ms",
      subtext: "average API latency",
      metric: "Model Serving",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="panel p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium text-sub tracking-tight">{card.title}</span>
            <span className="text-[11px] font-mono font-medium text-muted px-1.5 py-0.5 rounded bg-surface border border-subtle">
              {card.change}
            </span>
          </div>

          <div className="text-2xl font-bold tracking-tight text-main font-mono">
            {card.value}
          </div>

          <div className="mt-2 pt-2 border-t border-subtle flex items-center justify-between text-[11px] text-muted">
            <span>{card.subtext}</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-sub">
              {card.metric}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
