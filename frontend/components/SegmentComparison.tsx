"use client";

interface SegmentComparisonProps {
  segments: any[];
}

export default function SegmentComparison({ segments }: SegmentComparisonProps) {
  const metrics = [
    { name: "Engagement", values: [75, 92, 58, 68, 81] },
    { name: "Conversion", values: [45, 88, 62, 55, 48] },
    { name: "Retention", values: [82, 95, 71, 78, 65] },
  ];

  return (
    <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Segment Comparison</h2>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">{metric.name}</span>
              <span className="text-white text-sm font-medium">
                {Math.max(...metric.values)}%
              </span>
            </div>
            <div className="flex space-x-1">
              {metric.values.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#1e293b] rounded-full h-2 overflow-hidden"
                >
                  <div
                    className={`h-full ${
                      i === 0
                        ? "bg-yellow-500"
                        : i === 1
                        ? "bg-purple-500"
                        : i === 2
                        ? "bg-blue-500"
                        : i === 3
                        ? "bg-green-500"
                        : "bg-pink-500"
                    }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Radar Chart Placeholder */}
      <div className="mt-6 pt-6 border-t border-[#1e293b]">
        <div className="relative w-full h-40 flex items-center justify-center">
          <div className="absolute w-32 h-32 border-2 border-green-500/30 rounded-full"></div>
          <div className="absolute w-24 h-24 border-2 border-blue-500/30 rounded-full"></div>
          <div className="absolute w-16 h-16 border-2 border-purple-500/30 rounded-full"></div>
          <div className="text-center">
            <p className="text-white font-bold text-2xl">5</p>
            <p className="text-gray-400 text-xs">Segments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
