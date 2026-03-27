"use client";

import { useEffect, useState } from "react";

interface Segment {
  cluster_id: number;
  name: string;
  description: string;
  strategy: string;
}

const segmentIcons: { [key: number]: string } = {
  0: "💰",
  1: "👑",
  2: "🎯",
  3: "👥",
  4: "🌱",
};

export default function SegmentsList() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await fetch("http://localhost:8000/segments");
      if (response.ok) {
        const data = await response.json();
        setSegments(data);
      }
    } catch (error) {
      console.error("Error fetching segments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {segments.map((segment) => (
        <div
          key={segment.cluster_id}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">
              {segmentIcons[segment.cluster_id] || "📊"}
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {segment.name}
              </h3>
              <p className="text-xs text-gray-500">
                Cluster {segment.cluster_id}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{segment.description}</p>

          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Strategy
            </p>
            <p className="text-sm text-gray-700">{segment.strategy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
