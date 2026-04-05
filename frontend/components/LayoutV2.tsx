"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "▦" },
  { name: "Analytics", href: "/analytics", icon: "◧" },
  { name: "Customers", href: "/customers", icon: "◉" },
  { name: "Segments", href: "/segments", icon: "◈" },
  { name: "Predictions", href: "/predictions", icon: "◆" },
  { name: "Reports", href: "/reports", icon: "▤" },
  { name: "Settings", href: "/settings", icon: "⚙" },
];

export default function LayoutV2({ children }: LayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col border-r border-slate-800/60 bg-slate-950 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800/60">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">SegmentAI</h1>
                <p className="text-xs text-slate-400">Pro Edition</p>
              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-xl font-bold text-white">S</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-sm shadow-blue-500/10"
                    : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="border-t border-slate-800/60 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex w-full items-center justify-center rounded-xl bg-slate-900/50 py-3 text-slate-400 transition-all hover:bg-slate-900 hover:text-white"
          >
            <span className="text-xl">{sidebarOpen ? "‹" : "›"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800/60 bg-slate-950/80 px-8 backdrop-blur">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-64 rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 pl-10 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
            </div>

            {/* Notifications */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/40 text-slate-400 transition-all hover:bg-slate-900/70 hover:text-white">
              <span className="text-lg">🔔</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 rounded-xl bg-slate-900/40 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="text-sm">
                <p className="font-medium text-white">Admin</p>
                <p className="text-xs text-slate-400">admin@segmentai.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
