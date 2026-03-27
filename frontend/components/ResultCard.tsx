"use client";

interface ResultCardProps {
  prediction: {
    cluster_id: number;
    segment_name: string;
    segment_description: string;
    marketing_strategy: string;
    confidence: string;
  };
}

const segmentColors: { [key: number]: string } = {
  0: "bg-yellow-100 border-yellow-400 text-yellow-800",
  1: "bg-purple-100 border-purple-400 text-purple-800",
  2: "bg-blue-100 border-blue-400 text-blue-800",
  3: "bg-green-100 border-green-400 text-green-800",
  4: "bg-pink-100 border-pink-400 text-pink-800",
};

export default function ResultCard({ prediction }: ResultCardProps) {
  const colorClass =
    segmentColors[prediction.cluster_id] || "bg-gray-100 border-gray-400";

  return (
    <div className="space-y-4">
      <div
        className={`${colorClass} border-l-4 p-6 rounded-lg shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{prediction.segment_name}</h3>
          <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
            Cluster {prediction.cluster_id}
          </span>
        </div>

        <p className="text-sm mb-4 opacity-90">
          {prediction.segment_description}
        </p>

        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
            Recommended Strategy
          </h4>
          <p className="text-sm">{prediction.marketing_strategy}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Confidence
          </p>
          <p className="text-lg font-semibold text-gray-800 capitalize">
            {prediction.confidence}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Cluster ID
          </p>
          <p className="text-lg font-semibold text-gray-800">
            {prediction.cluster_id}
          </p>
        </div>
      </div>
    </div>
  );
}
