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
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: "+12.4%",
      subtext: "vs. last month",
      positive: true,
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      glow: "from-indigo-500/20 to-purple-500/10",
      accent: "border-indigo-500/30",
    },
    {
      title: "Active Segments",
      value: stats.activeSegments.toString(),
      change: "100%",
      subtext: "mapped to strategy",
      positive: true,
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      glow: "from-purple-500/20 to-pink-500/10",
      accent: "border-purple-500/30",
    },
    {
      title: "Avg Confidence",
      value: `${stats.avgConfidence}%`,
      change: "+2.8%",
      subtext: "centroid accuracy",
      positive: true,
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      glow: "from-emerald-500/20 to-teal-500/10",
      accent: "border-emerald-500/30",
    },
    {
      title: "Total Inferences",
      value: stats.predictions.toLocaleString(),
      change: "Real-time",
      subtext: "pipeline latency 3ms",
      positive: true,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      glow: "from-amber-500/20 to-orange-500/10",
      accent: "border-amber-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="panel p-5 card-hover relative overflow-hidden"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {/* Subtle Charcoal Ambient Glow */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.glow} rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none`}
          />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className={`w-10 h-10 rounded-xl bg-elevated flex items-center justify-center border ${card.accent}`}>
              {card.icon}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>{card.change}</span>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sub mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-black tracking-tight text-main">
              {card.value}
            </p>
            <p className="text-[11px] font-medium text-muted mt-1.5">
              {card.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
