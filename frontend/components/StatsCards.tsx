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
      change: "+12%",
      positive: true,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Segments",
      value: stats.activeSegments,
      change: "5 types",
      positive: true,
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Avg Confidence",
      value: `${stats.avgConfidence}%`,
      change: "+2.5%",
      positive: true,
      icon: "📊",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Predictions",
      value: stats.predictions.toLocaleString(),
      change: "Today",
      positive: true,
      icon: "🔮",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6 card-hover animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
            <span
              className={`text-sm font-medium ${
                card.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {card.change}
            </span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">{card.title}</h3>
          <p className="text-white text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
