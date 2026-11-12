"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { fetchSegments, SegmentProfile } from "@/lib/api";

interface FinanceDetail {
  tier: string;
  creditRisk: string;
  recommendedProducts: string[];
  pricingModel: string;
  projectedLtv: string;
}

const FINANCE_PROFILES: Record<number, FinanceDetail> = {
  0: {
    tier: "Essential / Value Banking",
    creditRisk: "Moderate to Sensitive",
    recommendedProducts: [
      "Zero annual fee debit & starter credit card",
      "Point-of-sale split-payment (0% APR introductory promo)",
      "Automated micro-savings round-up account",
      "Essential retail cash-back partnership (1.5%)",
    ],
    pricingModel: "Transaction-driven / interchange fee model",
    projectedLtv: "$1,850 - $2,400",
  },
  1: {
    tier: "Private Wealth & Platinum Tier",
    creditRisk: "Minimal / Prime Ultra",
    recommendedProducts: [
      "Platinum metal card with $50,000+ revolving limit",
      "Dedicated wealth manager & discretionary portfolio service",
      "Multi-currency treasury with zero FX markups",
      "Complimentary airport concierge & premium lounge membership",
    ],
    pricingModel: "Annual membership fee + AUM management basis points",
    projectedLtv: "$18,500 - $35,000",
  },
  2: {
    tier: "Preferred Growth & Investment Tier",
    creditRisk: "Low / Prime",
    recommendedProducts: [
      "Pre-approved flexible credit line upgrade ($25,000)",
      "High-yield automated certificates of deposit (CD ladders)",
      "Luxury lifestyle cashback rewards (3% on dining & travel)",
      "Mortgage & asset-backed financing pre-qualification",
    ],
    pricingModel: "Interest margin on credit facilities + cross-sell products",
    projectedLtv: "$7,200 - $12,500",
  },
  3: {
    tier: "Standard Commercial / Consumer Banking",
    creditRisk: "Low to Moderate / Near Prime",
    recommendedProducts: [
      "Classic rewards credit card with tiered points catalog",
      "Fixed-rate personal installment loans ($5,000 - $20,000)",
      "Quarterly active user cash reward bonuses",
      "Fee-waived overdraft protection buffer",
    ],
    pricingModel: "Net interest margin + core deposit balance spread",
    projectedLtv: "$3,600 - $5,800",
  },
  4: {
    tier: "Digital Fintech & NextGen Starter Tier",
    creditRisk: "Emerging / Thin File",
    recommendedProducts: [
      "Secured credit builder card with zero annual deposit requirement",
      "High-yield mobile savings with automated weekly deposit sweeps",
      "Commission-free fractional index investing",
      "Peer-to-peer instant digital payment rewards",
    ],
    pricingModel: "Deposit float + future lifecycle product expansion",
    projectedLtv: "$2,200 - $4,500 (High 10-yr CAGR)",
  },
};

export default function Segments() {
  const [segments, setSegments] = useState<SegmentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  useEffect(() => {
    fetchSegments()
      .then((data) => {
        setSegments(data);
        if (data.length > 0) {
          setSelectedCluster(data[0].cluster_id);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const activeSegment = segments.find((s) => s.cluster_id === selectedCluster) || segments[0];
  const activeFinance = activeSegment ? FINANCE_PROFILES[activeSegment.cluster_id] : null;

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Customer Segments & Financial Strategies
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Machine learning archetype profiles calibrated from unsupervised K-Means centroids
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-subtle bg-surface text-xs font-mono text-sub">
            <span>5 Calibrated Clusters</span>
          </div>
        </div>

        {/* Cluster Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {segments.map((seg) => {
            const isSelected = selectedCluster === seg.cluster_id;
            return (
              <button
                key={seg.cluster_id}
                onClick={() => setSelectedCluster(seg.cluster_id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  isSelected
                    ? "bg-elevated border-subtle text-main font-semibold shadow-sm"
                    : "bg-surface border-subtle text-sub hover:text-main"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
                  <span>Cluster #{seg.cluster_id}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />}
                </div>
                <div className="text-xs font-bold truncate text-main">{seg.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Cluster Details Card */}
        {activeSegment && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Archetype Specifications & Marketing Playbook */}
            <div className="lg:col-span-2 space-y-6">
              <div className="panel p-5 space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-subtle">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted px-1.5 py-0.5 rounded bg-surface border border-subtle">
                        Cluster #{activeSegment.cluster_id}
                      </span>
                      <h2 className="text-base font-bold text-main tracking-tight">
                        {activeSegment.name}
                      </h2>
                    </div>
                    <p className="text-xs text-sub leading-relaxed">
                      {activeSegment.description}
                    </p>
                  </div>
                </div>

                {/* Behavioral & Demographic Metrics Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-surface border border-subtle">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                      Income Level
                    </span>
                    <span className="text-xs font-bold text-main block mt-1">
                      {activeSegment.characteristics.income_level || "Moderate"}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-subtle">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                      Spending Pattern
                    </span>
                    <span className="text-xs font-bold text-main block mt-1">
                      {activeSegment.characteristics.spending_pattern || "Standard"}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-subtle">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                      Price Sensitivity
                    </span>
                    <span className="text-xs font-bold text-main block mt-1">
                      {activeSegment.characteristics.price_sensitivity || "Medium"}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-subtle">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                      Loyalty Potential
                    </span>
                    <span className="text-xs font-bold text-main block mt-1">
                      {activeSegment.characteristics.loyalty_potential || "High"}
                    </span>
                  </div>
                </div>

                {/* Marketing & Go-To-Market Execution */}
                <div className="p-3.5 rounded-lg bg-surface border border-subtle space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                    Strategic Marketing Directive
                  </span>
                  <p className="text-xs text-main leading-relaxed">
                    {activeSegment.strategy}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Financial Strategy & Product Recommendations */}
            <div className="space-y-6">
              {activeFinance && (
                <div className="panel p-5 space-y-4">
                  <div className="pb-3 border-b border-subtle">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                      Banking & Credit Blueprint
                    </span>
                    <h3 className="text-sm font-bold text-main mt-0.5">
                      {activeFinance.tier}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-sub">Credit Risk Rating:</span>
                      <span className="font-semibold text-main">{activeFinance.creditRisk}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-sub">Pricing Architecture:</span>
                      <span className="font-semibold text-main text-right truncate max-w-[160px]">
                        {activeFinance.pricingModel}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-sub">Projected 3-Yr LTV:</span>
                      <span className="font-mono font-bold text-main">{activeFinance.projectedLtv}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                      Recommended Financial Products
                    </span>
                    <ul className="space-y-1.5">
                      {activeFinance.recommendedProducts.map((prod, idx) => (
                        <li key={idx} className="text-xs text-sub flex items-start gap-2">
                          <span className="text-muted shrink-0">•</span>
                          <span>{prod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </LayoutV2>
  );
}
