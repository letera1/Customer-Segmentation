"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

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
  const itemsPerPage = 15;

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
    a.download = `customers-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.age || !newCustomer.income || !newCustomer.spending) {
      alert("Please fill all fields");
      return;
    }

    // Predict segment for new customer
    try {
      const res = await fetch("http://localhost:8000/predict", {
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
          id: customers.length + 1,
          gender: newCustomer.gender,
          age: newCustomer.age,
          income: newCustomer.income,
          spending: newCustomer.spending,
          cluster: result.cluster_id.toString(),
        };
        setCustomers([customer, ...customers]);
        setShowAddCustomer(false);
        setNewCustomer({ gender: "Male", age: "", income: "", spending: "" });
      }
    } catch (error) {
      // If API fails, add without prediction
      const customer = {
        id: customers.length + 1,
        gender: newCustomer.gender,
        age: newCustomer.age,
        income: newCustomer.income,
        spending: newCustomer.spending,
        cluster: Math.floor(Math.random() * 5).toString(),
      };
      setCustomers([customer, ...customers]);
      setShowAddCustomer(false);
      setNewCustomer({ gender: "Male", age: "", income: "", spending: "" });
    }
  };

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
              {filtered.length} customers • {customers.length} total
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium transition-all hover:bg-slate-800"
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40"
            >
              + Add Customer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-4">
            <p className="text-sm text-slate-400">Total Customers</p>
            <p className="mt-2 text-2xl font-bold">{customers.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-4">
            <p className="text-sm text-slate-400">Avg Income</p>
            <p className="mt-2 text-2xl font-bold">
              ${(customers.reduce((sum, c) => sum + parseFloat(c.income), 0) / customers.length || 0).toFixed(0)}k
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-4">
            <p className="text-sm text-slate-400">Avg Spending</p>
            <p className="mt-2 text-2xl font-bold">
              {(customers.reduce((sum, c) => sum + parseFloat(c.spending), 0) / customers.length || 0).toFixed(0)}/100
            </p>
          </div>
          <div className="rounded-xl border border-slate-800/50 bg-[#151B2B] p-4">
            <p className="text-sm text-slate-400">Segments</p>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Search by ID or gender..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">All Segments</option>
            <option value="0">Budget Conscious</option>
            <option value="1">High Value</option>
            <option value="2">Potential Growth</option>
            <option value="3">Average</option>
            <option value="4">Young Savers</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
          >
            <option value="income">Sort by Income</option>
            <option value="spending">Sort by Spending</option>
            <option value="age">Sort by Age</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 hover:bg-slate-800"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#151B2B]">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Gender</th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-sm font-medium hover:text-blue-400"
                  onClick={() => handleSort("age")}
                >
                  Age {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-sm font-medium hover:text-blue-400"
                  onClick={() => handleSort("income")}
                >
                  Income {sortBy === "income" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-sm font-medium hover:text-blue-400"
                  onClick={() => handleSort("spending")}
                >
                  Spending {sortBy === "spending" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">Segment</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">#{customer.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={customer.gender === "Male" ? "text-blue-400" : "text-pink-400"}>
                      {customer.gender === "Male" ? "👨" : "👩"} {customer.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{customer.age} yrs</td>
                  <td className="px-6 py-4 text-sm font-medium text-emerald-400">${customer.income}k</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          style={{ width: `${customer.spending}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{customer.spending}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      customer.cluster === "0" ? "bg-blue-600/20 text-blue-400" :
                      customer.cluster === "1" ? "bg-purple-600/20 text-purple-400" :
                      customer.cluster === "2" ? "bg-emerald-600/20 text-emerald-400" :
                      customer.cluster === "3" ? "bg-orange-600/20 text-orange-400" :
                      "bg-pink-600/20 text-pink-400"
                    }`}>
                      {segmentNames[customer.cluster]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <p>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} customers
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-800 px-4 py-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-800 px-4 py-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCustomer(null)}
          >
            <div
              className="w-full max-w-2xl rounded-xl border border-slate-800 bg-[#0B1120] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Customer #{selectedCustomer.id}</h3>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                  <p className="text-sm text-slate-400">Gender</p>
                  <p className="mt-2 text-lg font-medium">{selectedCustomer.gender}</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                  <p className="text-sm text-slate-400">Age</p>
                  <p className="mt-2 text-lg font-medium">{selectedCustomer.age} years</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                  <p className="text-sm text-slate-400">Annual Income</p>
                  <p className="mt-2 text-lg font-medium text-emerald-400">${selectedCustomer.income}k</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                  <p className="text-sm text-slate-400">Spending Score</p>
                  <p className="mt-2 text-lg font-medium">{selectedCustomer.spending}/100</p>
                </div>
                <div className="md:col-span-2 rounded-lg border border-slate-800 bg-[#151B2B] p-4">
                  <p className="text-sm text-slate-400">Customer Segment</p>
                  <p className="mt-2 text-lg font-medium">{segmentNames[selectedCustomer.cluster]}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    {selectedCustomer.cluster === "0" && "Price-sensitive customers who prefer value deals"}
                    {selectedCustomer.cluster === "1" && "High-income customers with high spending potential"}
                    {selectedCustomer.cluster === "2" && "Moderate income with growth opportunities"}
                    {selectedCustomer.cluster === "3" && "Average income and spending patterns"}
                    {selectedCustomer.cluster === "4" && "Young customers building their financial base"}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700">
                  Edit Customer
                </button>
                <button className="flex-1 rounded-lg border border-slate-800 px-4 py-2 font-medium hover:bg-slate-800">
                  View History
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Customer Modal */}
        {showAddCustomer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddCustomer(false)}
          >
            <div
              className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0B1120] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Add New Customer</h3>
                <button
                  onClick={() => setShowAddCustomer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Gender</label>
                  <select
                    value={newCustomer.gender}
                    onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Age</label>
                  <input
                    type="number"
                    value={newCustomer.age}
                    onChange={(e) => setNewCustomer({ ...newCustomer, age: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                    placeholder="Enter age (18-70)"
                    min="18"
                    max="70"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Annual Income (k$)</label>
                  <input
                    type="number"
                    value={newCustomer.income}
                    onChange={(e) => setNewCustomer({ ...newCustomer, income: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                    placeholder="Enter income (15-140)"
                    min="15"
                    max="140"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Spending Score (1-100)</label>
                  <input
                    type="number"
                    value={newCustomer.spending}
                    onChange={(e) => setNewCustomer({ ...newCustomer, spending: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-[#151B2B] px-4 py-2 focus:border-blue-600 focus:outline-none"
                    placeholder="Enter spending score"
                    min="1"
                    max="100"
                  />
                </div>
                <div className="rounded-lg bg-blue-600/10 p-3 text-sm text-blue-400">
                  ℹ️ Customer segment will be automatically predicted based on the provided data
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddCustomer(false)}
                    className="flex-1 rounded-lg border border-slate-800 px-4 py-2 font-medium hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCustomer}
                    disabled={!newCustomer.age || !newCustomer.income || !newCustomer.spending}
                    className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
