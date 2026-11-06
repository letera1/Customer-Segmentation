"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { API_BASE_URL } from "@/lib/config";

export default function Segments() {
  const [segments, setSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/segments`);
      if (res.ok) {
        setSegments(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch segments", error);
    } finally {
      setLoading(false);
    }
  };

  const segmentIcons = ["💰", "👑", "🎯", "👥", "🌱"];
  const segmentGradients = [
    "from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400",
    "from-indigo-500/20 to-purple-600/5 border-indigo-500/30 text-indigo-400",
    "from-cyan-500/20 to-blue-600/5 border-cyan-500/30 text-cyan-400",
    "from-emerald-500/20 to-teal-600/5 border-emerald-500/30 text-emerald-400",
    "from-rose-500/20 to-pink-600/5 border-rose-500/30 text-rose-400",
  ];

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white dark:text-[#ECEEF2]">
              Customer Cohort Personas
            </h1>
            <p className="mt-1 text-xs text-[#848CA2] font-medium">
              In-depth behavioral profiles and personalized go-to-market strategies
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            5 Distinct Archetypes
          </span>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="panel p-6 animate-pulse h-64 bg-[#181A20]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment, i) => {
              const style = segmentGradients[i % segmentGradients.length];
              const icon = segmentIcons[i % segmentIcons.length];

              return (
                <div
                  key={segment.cluster_id}
                  className="panel card-hover p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style} border flex items-center justify-center text-2xl shadow-sm`}>
                        {icon}
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#20222A] text-[#CAD1DE] border border-white/[0.08]">
                        Cluster #{segment.cluster_id}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white dark:text-[#ECEEF2] tracking-tight">
                      {segment.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#848CA2] leading-relaxed">
                      {segment.description}
                    </p>

                    {/* Characteristics tags if available */}
                    {segment.characteristics && (
                      <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-semibold text-[#CAD1DE]">
                        <div className="bg-[#181A20] p-2 rounded-lg border border-white/[0.05]">
                          <span className="text-[#5F667A] block text-[10px]">Income Level</span>
                          {segment.characteristics.income_level || "Moderate"}
                        </div>
                        <div className="bg-[#181A20] p-2 rounded-lg border border-white/[0.05]">
                          <span className="text-[#5F667A] block text-[10px]">Price Sensitivity</span>
                          {segment.characteristics.price_sensitivity || "Medium"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-indigo-400 mb-1">
                        Recommended Playbook
                      </p>
                      <p className="text-xs font-medium text-white/90 leading-snug">
                        {segment.strategy}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LayoutV2>
  );
}
