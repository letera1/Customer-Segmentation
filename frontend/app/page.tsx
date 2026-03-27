"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import SegmentationAnalyzer from "@/components/SegmentationAnalyzer";
import SegmentDistribution from "@/components/SegmentDistribution";
import CustomerInsights from "@/components/CustomerInsights";
import RealtimeActivity from "@/components/RealtimeActivity";
import SegmentComparison from "@/components/SegmentComparison";
import PredictionHistory from "@/components/PredictionHistory";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [segments, setSegments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCustomers: 200,
    activeSegments: 5,
    avgConfidence: 94.5,
    predictions: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSegments();
    loadStats();
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
    }
  };

  const loadStats = () => {
    const stored = localStorage.getItem("segmentation_stats");
    if (stored) {
      const parsed = JSON.parse(stored);
      setStats(prev => ({ ...prev, ...parsed }));
    }
  };

  const updateStats = (newPrediction: any) => {
    setStats(prev => {
      const updated = {
        ...prev,
        predictions: prev.predictions + 1
      };
      localStorage.setItem("segmentation_stats", JSON.stringify(updated));
      return updated;
    });
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#0a0e1a] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <StatsCards stats={stats} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <SegmentationAnalyzer onPredict={updateStats} />
              <SegmentDistribution />
              <CustomerInsights />
            </div>
            
            <div className="space-y-6">
              <RealtimeActivity />
              <SegmentComparison segments={segments} />
              <PredictionHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
