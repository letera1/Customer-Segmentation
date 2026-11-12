"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { predictCustomer, batchPredictCustomers, PredictionResponse } from "@/lib/api";

interface CustomerRecord {
  id: string;
  gender: "Male" | "Female";
  age: number;
  income: number;
  spending: number;
  cluster: number;
  segmentName: string;
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  { id: "1001", gender: "Female", age: 34, income: 78, spending: 82, cluster: 1, segmentName: "High Value" },
  { id: "1002", gender: "Male", age: 52, income: 85, spending: 39, cluster: 2, segmentName: "Potential Growth" },
  { id: "1003", gender: "Female", age: 24, income: 28, spending: 77, cluster: 4, segmentName: "Young Savers" },
  { id: "1004", gender: "Male", age: 41, income: 54, spending: 51, cluster: 3, segmentName: "Average Customers" },
  { id: "1005", gender: "Female", age: 60, income: 30, spending: 14, cluster: 0, segmentName: "Budget Conscious" },
  { id: "1006", gender: "Male", age: 38, income: 92, spending: 88, cluster: 1, segmentName: "High Value" },
  { id: "1007", gender: "Female", age: 46, income: 63, spending: 48, cluster: 3, segmentName: "Average Customers" },
  { id: "1008", gender: "Male", age: 22, income: 20, spending: 79, cluster: 4, segmentName: "Young Savers" },
  { id: "1009", gender: "Female", age: 58, income: 42, spending: 18, cluster: 0, segmentName: "Budget Conscious" },
  { id: "1010", gender: "Male", age: 49, income: 98, spending: 25, cluster: 2, segmentName: "Potential Growth" },
  { id: "1011", gender: "Female", age: 31, income: 81, spending: 74, cluster: 1, segmentName: "High Value" },
  { id: "1012", gender: "Male", age: 37, income: 58, spending: 55, cluster: 3, segmentName: "Average Customers" },
  { id: "1013", gender: "Female", age: 29, income: 35, spending: 85, cluster: 4, segmentName: "Young Savers" },
  { id: "1014", gender: "Male", age: 64, income: 26, spending: 12, cluster: 0, segmentName: "Budget Conscious" },
  { id: "1015", gender: "Female", age: 43, income: 105, spending: 31, cluster: 2, segmentName: "Potential Growth" },
  { id: "1016", gender: "Male", age: 36, income: 89, spending: 91, cluster: 1, segmentName: "High Value" },
];

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"age" | "income" | "spending">("income");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchNotice, setBatchNotice] = useState<string | null>(null);

  // New customer form state
  const [formAge, setFormAge] = useState(30);
  const [formIncome, setFormIncome] = useState(65);
  const [formSpending, setFormSpending] = useState(50);
  const [formGender, setFormGender] = useState<"Male" | "Female">("Female");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search");
      if (q) setSearch(q);
    }
  }, []);

  const filtered = customers
    .filter((c) => {
      const matchesSearch =
        c.id.includes(search) ||
        c.segmentName.toLowerCase().includes(search.toLowerCase()) ||
        c.gender.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = segmentFilter === "all" || c.cluster.toString() === segmentFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (column: "age" | "income" | "spending") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const handleClassifyNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const pred = await predictCustomer({
        age: formAge,
        annual_income: formIncome,
        spending_score: formSpending,
      });

      const newRecord: CustomerRecord = {
        id: (1000 + customers.length + 1).toString(),
        gender: formGender,
        age: formAge,
        income: formIncome,
        spending: formSpending,
        cluster: pred.cluster_id,
        segmentName: pred.segment_name,
      };

      setCustomers([newRecord, ...customers]);
      setIsModalOpen(false);
      setFormAge(30);
      setFormIncome(65);
      setFormSpending(50);
    } catch (err: any) {
      alert("Inference failed: " + (err?.message || "Verify API is operational"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRunBatchVerification = async () => {
    try {
      setBatchNotice("Executing batch prediction against backend...");
      const batchPayload = paginated.map((c) => ({
        age: c.age,
        annual_income: c.income,
        spending_score: c.spending,
      }));

      const res = await batchPredictCustomers(batchPayload);
      setBatchNotice(
        `Batch complete: ${res.total_processed} customer profiles classified in ${res.processing_time_ms}ms`
      );
      setTimeout(() => setBatchNotice(null), 5000);
    } catch (err: any) {
      setBatchNotice("Batch inference error: " + (err?.message || "Gateway offline"));
    }
  };

  const exportCSV = () => {
    const headers = ["Customer ID", "Gender", "Age", "Annual Income ($k)", "Spending Score", "Cluster ID", "Segment Name"];
    const rows = filtered.map((c) => [c.id, c.gender, c.age, c.income, c.spending, c.cluster, c.segmentName]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customer_cohort_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Customer Cohort Registry
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Multi-dimensional customer transaction records with verified ML cluster assignments
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunBatchVerification}
              className="btn-secondary"
            >
              Verify Page Batch
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              + Classify Customer
            </button>
            <button
              onClick={exportCSV}
              className="btn-secondary"
              title="Export filtered records to CSV"
            >
              Export CSV
            </button>
          </div>
        </div>

        {batchNotice && (
          <div className="p-3 rounded-lg border border-subtle bg-surface text-xs font-mono text-main">
            {batchNotice}
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg bg-surface border border-subtle">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Filter by ID, gender, segment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-64 rounded-md border border-subtle bg-elevated px-3 text-xs text-main placeholder:text-muted focus:outline-none"
            />

            <select
              value={segmentFilter}
              onChange={(e) => {
                setSegmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 rounded-md border border-subtle bg-elevated px-2 text-xs text-main focus:outline-none"
            >
              <option value="all">All Clusters (k=5)</option>
              <option value="0">Cluster 0: Budget Conscious</option>
              <option value="1">Cluster 1: High Value</option>
              <option value="2">Cluster 2: Potential Growth</option>
              <option value="3">Cluster 3: Average Customers</option>
              <option value="4">Cluster 4: Young Savers</option>
            </select>
          </div>

          <div className="text-xs text-muted font-mono">
            Displaying {filtered.length} customer records
          </div>
        </div>

        {/* Customer Table */}
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-subtle text-muted text-[10px] uppercase font-semibold tracking-wider bg-surface">
                  <th className="py-2.5 px-4">Customer ID</th>
                  <th className="py-2.5 px-4">Demographics</th>
                  <th
                    className="py-2.5 px-4 cursor-pointer hover:text-main"
                    onClick={() => handleSort("age")}
                  >
                    Age {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="py-2.5 px-4 cursor-pointer hover:text-main"
                    onClick={() => handleSort("income")}
                  >
                    Annual Income ($k) {sortBy === "income" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="py-2.5 px-4 cursor-pointer hover:text-main"
                    onClick={() => handleSort("spending")}
                  >
                    Spending Score (1-100) {sortBy === "spending" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="py-2.5 px-4">Cluster Archetype</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {paginated.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-main">
                      #{c.id}
                    </td>
                    <td className="py-3 px-4 text-sub font-medium">
                      {c.gender}
                    </td>
                    <td className="py-3 px-4 text-main font-mono">
                      {c.age} yrs
                    </td>
                    <td className="py-3 px-4 text-main font-mono font-medium">
                      ${c.income},000
                    </td>
                    <td className="py-3 px-4 text-main font-mono">
                      {c.spending} / 100
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface border border-subtle text-xs">
                        <span className="font-mono text-muted text-[10px]">C{c.cluster}</span>
                        <span className="font-semibold text-main">{c.segmentName}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-3 border-t border-subtle bg-surface text-xs">
              <span className="text-muted">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded border border-subtle bg-elevated text-sub disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 rounded border border-subtle bg-elevated text-sub disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Classify New Customer */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="panel w-full max-w-md p-5 bg-panel border border-subtle space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-subtle">
                <h3 className="text-sm font-bold text-main">
                  Classify New Customer Profile
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted hover:text-main text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleClassifyNewCustomer} className="space-y-3.5">
                <div>
                  <label className="text-xs font-medium text-sub block mb-1">Gender</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-subtle bg-surface px-2 text-xs text-main"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="text-sub font-medium">Age</label>
                    <span className="font-mono text-main">{formAge} yrs</span>
                  </div>
                  <input
                    type="number"
                    min={18}
                    max={85}
                    value={formAge}
                    onChange={(e) => setFormAge(Number(e.target.value))}
                    className="w-full h-8 rounded-md border border-subtle bg-surface px-2.5 text-xs text-main font-mono"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="text-sub font-medium">Annual Income ($k)</label>
                    <span className="font-mono text-main">${formIncome}k</span>
                  </div>
                  <input
                    type="number"
                    min={10}
                    max={250}
                    value={formIncome}
                    onChange={(e) => setFormIncome(Number(e.target.value))}
                    className="w-full h-8 rounded-md border border-subtle bg-surface px-2.5 text-xs text-main font-mono"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="text-sub font-medium">Spending Score (1-100)</label>
                    <span className="font-mono text-main">{formSpending}</span>
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formSpending}
                    onChange={(e) => setFormSpending(Number(e.target.value))}
                    className="w-full h-8 rounded-md border border-subtle bg-surface px-2.5 text-xs text-main font-mono"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-subtle">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                  >
                    {submitting ? "Classifying..." : "Run ML Classification"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LayoutV2>
  );
}
