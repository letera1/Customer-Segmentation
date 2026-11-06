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

  const segmentAccents = [
    {
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-500 dark:text-amber-400",
      pill: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
      border: "hover:border-amber-500/40",
      icon: (
        <svg className="w-5 h-5 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
      pill: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      border: "hover:border-indigo-500/40",
      icon: (
        <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400",
      pill: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      border: "hover:border-cyan-500/40",
      icon: (
        <svg className="w-5 h-5 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
      pill: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      border: "hover:border-emerald-500/40",
      icon: (
        <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      badge: "border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400",
      pill: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
      border: "hover:border-rose-500/40",
      icon: (
        <svg className="w-5 h-5 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <LayoutV2>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Customer Cohort Personas
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Behavioral clusters, telemetry metrics, and targeted go-to-market strategies
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
            5 Distinct Archetypes
          </span>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="panel p-6 animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment, i) => {
              const accent = segmentAccents[i % segmentAccents.length];

              return (
                <div
                  key={segment.cluster_id}
                  className={`panel card-hover p-6 flex flex-col justify-between relative overflow-hidden transition-all border border-charcoal-700/60 dark:border-white/[0.06] ${accent.border}`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl ${accent.badge} border flex items-center justify-center shadow-sm`}>
                        {accent.icon}
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-softgray-100 dark:bg-[#20222A] text-sub border border-charcoal-700/40 dark:border-white/[0.08]">
                        Cluster {segment.cluster_id}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-main tracking-tight">
                      {segment.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-sub leading-relaxed">
                      {segment.description}
                    </p>

                    {segment.characteristics && (
                      <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-semibold text-main">
                        <div className="bg-softgray-100/70 dark:bg-[#181A20] p-2.5 rounded-lg border border-charcoal-700/40 dark:border-white/[0.05]">
                          <span className="text-muted block text-[10px] uppercase font-bold tracking-wider">Income Tier</span>
                          <span className="mt-0.5 block">{segment.characteristics.income_level || "Moderate"}</span>
                        </div>
                        <div className="bg-softgray-100/70 dark:bg-[#181A20] p-2.5 rounded-lg border border-charcoal-700/40 dark:border-white/[0.05]">
                          <span className="text-muted block text-[10px] uppercase font-bold tracking-wider">Price Sensitivity</span>
                          <span className="mt-0.5 block">{segment.characteristics.price_sensitivity || "Medium"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-charcoal-700/40 dark:border-white/[0.06]">
                    <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                        Recommended Playbook
                      </p>
                      <p className="text-xs font-medium text-main leading-snug">
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
