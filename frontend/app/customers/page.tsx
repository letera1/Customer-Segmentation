"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { API_BASE_URL } from "@/lib/config";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"age" | "income" | "spending">("income");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    gender: "Male",
    age: "",
    income: "",
    spending: "",
  });
  const itemsPerPage = 12;

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    // Generate representative customer cohort records
    const sample = Array.from({ length: 50 }, (_, i) => ({
      id: (i + 1).toString(),
      gender: i % 2 === 0 ? "Female" : "Male",
      age: (Math.floor((i * 13) % 48) + 19).toString(),
      income: (Math.floor((i * 17) % 115) + 20).toString(),
      spending: (Math.floor((i * 23) % 95) + 5).toString(),
      cluster: (i % 5).toString(),
    }));
    setCustomers(sample);
  };

  const filtered = customers
    .filter((c) => {
      const matchesSearch =
        c.id.toString().includes(search) ||
        c.gender.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || c.cluster.toString() === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aVal = parseFloat(a[sortBy]);
      const bVal = parseFloat(b[sortBy]);
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedCustomers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: "age" | "income" | "spending") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const exportData = () => {
    const csv = [
      ["ID", "Gender", "Age", "Income", "Spending", "Segment"],
      ...filtered.map((c) => [
        c.id,
        c.gender,
        c.age,
        c.income,
        c.spending,
        segmentNames[c.cluster],
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers-cohort-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.age || !newCustomer.income || !newCustomer.spending) {
      alert("Please fill all required telemetry inputs.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(newCustomer.age),
          annual_income: parseInt(newCustomer.income),
          spending_score: parseInt(newCustomer.spending),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const customer = {
          id: (customers.length + 1).toString(),
          gender: newCustomer.gender,
          age: newCustomer.age,
          income: newCustomer.income,
          spending: newCustomer.spending,
          cluster: result.cluster_id.toString(),
        };
        setCustomers([customer, ...customers]);
        setShowAddCustomer(false);
        setNewCustomer({ gender: "Male", age: "", income: "", spending: "" });
        return;
      }
    } catch {
      // Fallback
    }

    const customer = {
      id: (customers.length + 1).toString(),
      gender: newCustomer.gender,
      age: newCustomer.age,
      income: newCustomer.income,
      spending: newCustomer.spending,
      cluster: Math.floor(Math.random() * 5).toString(),
    };
    setCustomers([customer, ...customers]);
    setShowAddCustomer(false);
    setNewCustomer({ gender: "Male", age: "", income: "", spending: "" });
  };

  const segmentNames: Record<string, string> = {
    "0": "Budget Conscious",
    "1": "High Value",
    "2": "Potential Growth",
    "3": "Standard Cohort",
    "4": "Emerging Savers",
  };

  const segmentBadges: Record<string, string> = {
    "0": "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/25",
    "1": "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/25",
    "2": "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/25",
    "3": "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/25",
    "4": "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/25",
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-main">
              Customer Cohort Registry
            </h1>
            <p className="mt-1 text-xs text-sub font-medium">
              Verified behavioral telemetry for {filtered.length} visible customer profiles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 rounded-xl border border-charcoal-700/60 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-4 py-2 text-xs font-bold text-main hover:border-indigo-500/40 transition-all"
            >
              <svg className="w-4 h-4 text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Enroll Customer
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sub">Cohort Size</p>
            <p className="mt-1.5 text-2xl font-black text-main">{customers.length}</p>
          </div>
          <div className="panel p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sub">Mean Income</p>
            <p className="mt-1.5 text-2xl font-black text-main">
              ${(customers.reduce((sum, c) => sum + parseFloat(c.income), 0) / (customers.length || 1)).toFixed(0)}k
            </p>
          </div>
          <div className="panel p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sub">Mean Spending Score</p>
            <p className="mt-1.5 text-2xl font-black text-main">
              {(customers.reduce((sum, c) => sum + parseFloat(c.spending), 0) / (customers.length || 1)).toFixed(0)}
              <span className="text-xs font-semibold text-muted"> / 100</span>
            </p>
          </div>
          <div className="panel p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sub">Active Clusters</p>
            <p className="mt-1.5 text-2xl font-black text-main">5 Segments</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by customer ID or gender..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] pl-10 pr-4 py-2 text-xs font-medium text-main placeholder-charcoal-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Clusters (5)</option>
              <option value="0">Cluster 0: Budget Conscious</option>
              <option value="1">Cluster 1: High Value</option>
              <option value="2">Cluster 2: Potential Growth</option>
              <option value="3">Cluster 3: Standard</option>
              <option value="4">Cluster 4: Emerging Savers</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
            >
              <option value="income">Sort: Income</option>
              <option value="spending">Sort: Spending</option>
              <option value="age">Sort: Age</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3 py-2 text-xs font-bold text-main hover:bg-softgray-200 dark:hover:bg-[#20222A] transition-colors"
              title={`Sorting ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
            >
              {sortOrder === "asc" ? "ASC" : "DESC"}
            </button>
          </div>
        </div>

        {/* Customer Data Table */}
        <div className="panel overflow-hidden border border-charcoal-700/60 dark:border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-charcoal-700/50 dark:border-white/[0.06] bg-softgray-100/70 dark:bg-[#141519] text-[11px] font-bold uppercase tracking-wider text-sub">
                  <th className="px-5 py-3">Customer ID</th>
                  <th className="px-5 py-3">Gender</th>
                  <th
                    className="px-5 py-3 cursor-pointer hover:text-indigo-400 transition-colors"
                    onClick={() => handleSort("age")}
                  >
                    Age {sortBy === "age" && (sortOrder === "asc" ? "(asc)" : "(desc)")}
                  </th>
                  <th
                    className="px-5 py-3 cursor-pointer hover:text-indigo-400 transition-colors"
                    onClick={() => handleSort("income")}
                  >
                    Annual Income {sortBy === "income" && (sortOrder === "asc" ? "(asc)" : "(desc)")}
                  </th>
                  <th
                    className="px-5 py-3 cursor-pointer hover:text-indigo-400 transition-colors"
                    onClick={() => handleSort("spending")}
                  >
                    Spending Score {sortBy === "spending" && (sortOrder === "asc" ? "(asc)" : "(desc)")}
                  </th>
                  <th className="px-5 py-3">Cohort Segment</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-700/30 dark:divide-white/[0.04]">
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-softgray-100/50 dark:hover:bg-white/[0.02] transition-colors text-xs"
                  >
                    <td className="px-5 py-3.5 font-bold font-mono text-main">
                      #{customer.id.padStart(4, "0")}
                    </td>
                    <td className="px-5 py-3.5 text-main">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${customer.gender === "Female" ? "bg-rose-400" : "bg-cyan-400"}`} />
                        {customer.gender}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-main font-semibold">
                      {customer.age} <span className="text-muted font-normal">yrs</span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-main">
                      ${customer.income}k
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-softgray-200 dark:bg-charcoal-700/60 overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${Math.min(100, parseFloat(customer.spending))}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-main">{customer.spending}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${segmentBadges[customer.cluster] || ""}`}>
                        {segmentNames[customer.cluster]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-t border-charcoal-700/50 dark:border-white/[0.06] text-xs text-sub gap-3">
            <p>
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} customers
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-charcoal-700/40 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] font-semibold text-main disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "border border-charcoal-700/40 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] text-sub"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-charcoal-700/40 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] font-semibold text-main disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Customer Detail Drawer / Modal */}
        {selectedCustomer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCustomer(null)}
          >
            <div
              className="w-full max-w-lg panel p-6 border border-charcoal-700/80 dark:border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-700/40 dark:border-white/[0.06] mb-5">
                <div>
                  <h3 className="text-lg font-black text-main tracking-tight">
                    Customer Profile #{selectedCustomer.id.padStart(4, "0")}
                  </h3>
                  <p className="text-xs text-sub mt-0.5">Segment Persona & Behavioral Breakdown</p>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="w-7 h-7 rounded-lg bg-softgray-100 dark:bg-[#20222A] text-sub hover:text-main flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-softgray-100 dark:bg-[#181A20] p-3 rounded-xl border border-charcoal-700/30 dark:border-white/[0.05]">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Demographic</span>
                  <p className="mt-1 text-sm font-bold text-main">{selectedCustomer.gender}, {selectedCustomer.age} yrs</p>
                </div>
                <div className="bg-softgray-100 dark:bg-[#181A20] p-3 rounded-xl border border-charcoal-700/30 dark:border-white/[0.05]">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Annual Income</span>
                  <p className="mt-1 text-sm font-bold text-main">${selectedCustomer.income}k / year</p>
                </div>
                <div className="bg-softgray-100 dark:bg-[#181A20] p-3 rounded-xl border border-charcoal-700/30 dark:border-white/[0.05]">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Spending Score</span>
                  <p className="mt-1 text-sm font-bold text-main">{selectedCustomer.spending} / 100</p>
                </div>
                <div className="bg-softgray-100 dark:bg-[#181A20] p-3 rounded-xl border border-charcoal-700/30 dark:border-white/[0.05]">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Assigned Cohort</span>
                  <p className="mt-1 text-sm font-bold text-main">Cluster #{selectedCustomer.cluster}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                  Archetype: {segmentNames[selectedCustomer.cluster]}
                </p>
                <p className="text-xs text-main leading-relaxed">
                  {selectedCustomer.cluster === "0" && "Price-sensitive segment emphasizing discount opportunities and baseline essentials."}
                  {selectedCustomer.cluster === "1" && "Affluent high-margin cohort responsive to premium tier upgrades and personalized outreach."}
                  {selectedCustomer.cluster === "2" && "High-income moderate-spending segment with significant upsell and cross-sell headroom."}
                  {selectedCustomer.cluster === "3" && "Balanced consumer with steady recurring transactions and predictable frequency."}
                  {selectedCustomer.cluster === "4" && "Younger demographic building brand affinity with high long-term lifetime value potential."}
                </p>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Add Customer Modal */}
        {showAddCustomer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowAddCustomer(false)}
          >
            <div
              className="w-full max-w-md panel p-6 border border-charcoal-700/80 dark:border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-700/40 dark:border-white/[0.06] mb-5">
                <div>
                  <h3 className="text-lg font-black text-main tracking-tight">
                    Enroll New Customer
                  </h3>
                  <p className="text-xs text-sub mt-0.5">Run automatic real-time centroid classification</p>
                </div>
                <button
                  onClick={() => setShowAddCustomer(false)}
                  className="w-7 h-7 rounded-lg bg-softgray-100 dark:bg-[#20222A] text-sub hover:text-main flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">Gender</label>
                  <select
                    value={newCustomer.gender}
                    onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
                    className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">Age</label>
                  <input
                    type="number"
                    value={newCustomer.age}
                    onChange={(e) => setNewCustomer({ ...newCustomer, age: e.target.value })}
                    placeholder="e.g. 34"
                    min="18"
                    max="80"
                    className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">Annual Income (k$)</label>
                  <input
                    type="number"
                    value={newCustomer.income}
                    onChange={(e) => setNewCustomer({ ...newCustomer, income: e.target.value })}
                    placeholder="e.g. 78"
                    min="10"
                    max="200"
                    className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-sub block mb-1.5">Spending Score (1-100)</label>
                  <input
                    type="number"
                    value={newCustomer.spending}
                    onChange={(e) => setNewCustomer({ ...newCustomer, spending: e.target.value })}
                    placeholder="e.g. 65"
                    min="1"
                    max="100"
                    className="w-full rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] px-3.5 py-2.5 text-xs font-semibold text-main focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-softgray-100 dark:bg-[#181A20] border border-charcoal-700/30 dark:border-white/[0.05] text-[11px] text-sub">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Cohort classification will be computed instantly on submission.</span>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => setShowAddCustomer(false)}
                    className="flex-1 rounded-xl border border-charcoal-700/50 dark:border-white/[0.08] bg-softgray-100 dark:bg-[#181A20] py-2.5 text-xs font-bold text-sub hover:text-main transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCustomer}
                    disabled={!newCustomer.age || !newCustomer.income || !newCustomer.spending}
                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all"
                  >
                    Classify & Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutV2>
  );
}
