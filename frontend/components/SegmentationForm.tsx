"use client";

import { useState } from "react";

interface SegmentationFormProps {
  onSubmit: (data: {
    age: number;
    annual_income: number;
    spending_score: number;
  }) => void;
  loading: boolean;
}

export default function SegmentationForm({
  onSubmit,
  loading,
}: SegmentationFormProps) {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(75);
  const [spendingScore, setSpendingScore] = useState(65);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      age,
      annual_income: income,
      spending_score: spendingScore,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Age: {age} years
        </label>
        <input
          type="range"
          id="age"
          min="18"
          max="70"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>18</span>
          <span>70</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="income"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Annual Income: ${income}k
        </label>
        <input
          type="range"
          id="income"
          min="15"
          max="140"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$15k</span>
          <span>$140k</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="spending"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Spending Score: {spendingScore}/100
        </label>
        <input
          type="range"
          id="spending"
          min="1"
          max="100"
          value={spendingScore}
          onChange={(e) => setSpendingScore(Number(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Predict Segment"}
      </button>
    </form>
  );
}
