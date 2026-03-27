"use client";

import { useState } from "react";
import SegmentationForm from "@/components/SegmentationForm";
import ResultCard from "@/components/ResultCard";
import SegmentsList from "@/components/SegmentsList";

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: {
    age: number;
    annual_income: number;
    spending_score: number;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get prediction. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Customer Segmentation Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered customer insights for targeted marketing strategies
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Customer Information
            </h2>
            <SegmentationForm onSubmit={handlePredict} loading={loading} />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Segment Prediction
            </h2>
            {prediction ? (
              <ResultCard prediction={prediction} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <p className="text-lg">
                  Enter customer data to see segment prediction
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Available Customer Segments
          </h2>
          <SegmentsList />
        </div>
      </div>
    </div>
  );
}
