"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Segments() {
  const [segments, setSegments] = useState<any[]>([]);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const res = await fetch("http://localhost:8000/segments");
      if (res.ok) {
        setSegments(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch segments");
    }
  };

  const colors = ["amber", "purple", "blue", "emerald", "pink"];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Customer Segments</h2>
          <p className="mt-1 text-sm text-slate-400">
            Detailed analysis of each customer segment
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment, i) => (
            <div
              key={segment.cluster_id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-lg bg-${colors[i]}-600/10 p-3`}>
                  <span className="text-2xl">
                    {["💰", "👑", "🎯", "👥", "🌱"][i]}
                  </span>
                </div>
                <span className="text-2xl font-bold text-slate-600">
                  #{segment.cluster_id}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{segment.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{segment.description}</p>
              <div className="mt-4 rounded-lg bg-slate-800 p-4">
                <p className="text-xs font-medium text-slate-400">STRATEGY</p>
                <p className="mt-1 text-sm">{segment.strategy}</p>
              </div>
              <button className="mt-4 w-full rounded-lg border border-slate-700 py-2 text-sm font-medium hover:bg-slate-800">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
