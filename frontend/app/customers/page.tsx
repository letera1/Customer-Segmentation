"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await fetch("/data/processed/customers_with_clusters.csv");
      if (res.ok) {
        const text = await res.text();
        const rows = text.split("\n").slice(1);
        const data = rows.map((row) => {
          const [id, gender, age, income, spending, cluster] = row.split(",");
          return { id, gender, age, income, spending, cluster };
        }).filter(c => c.id);
        setCustomers(data);
      }
    } catch (error) {
      // Generate sample data if file not found
      const sample = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        age: Math.floor(Math.random() * 52) + 18,
        income: Math.floor(Math.random() * 125) + 15,
        spending: Math.floor(Math.random() * 99) + 1,
        cluster: Math.floor(Math.random() * 5),
      }));
      setCustomers(sample);
    }
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.id.toString().includes(search) ||
      c.gender.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.cluster === filter;
    return matchesSearch && matchesFilter;
  });

  const segmentNames: any = {
    0: "Budget Conscious",
    1: "High Value",
    2: "Potential Growth",
    3: "Average",
    4: "Young Savers",
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Customer Database</h2>
            <p className="mt-1 text-sm text-slate-400">
              Manage and analyze your customer base
            </p>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-700">
            + Add Customer
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 focus:border-indigo-600 focus:outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 focus:border-indigo-600 focus:outline-none"
          >
            <option value="all">All Segments</option>
            <option value="0">Budget Conscious</option>
            <option value="1">High Value</option>
            <option value="2">Potential Growth</option>
            <option value="3">Average</option>
            <option value="4">Young Savers</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Age</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Income</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Spending</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Segment</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.slice(0, 20).map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-sm">{customer.id}</td>
                  <td className="px-6 py-4 text-sm">{customer.gender}</td>
                  <td className="px-6 py-4 text-sm">{customer.age}</td>
                  <td className="px-6 py-4 text-sm">${customer.income}k</td>
                  <td className="px-6 py-4 text-sm">{customer.spending}/100</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="rounded-full bg-indigo-600/20 px-2 py-1 text-xs">
                      {segmentNames[customer.cluster]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-indigo-400 hover:text-indigo-300">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <p>Showing {Math.min(20, filtered.length)} of {filtered.length} customers</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-800 px-3 py-1 hover:bg-slate-800">
              Previous
            </button>
            <button className="rounded-lg border border-slate-800 px-3 py-1 hover:bg-slate-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
