"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊", badge: null },
    { name: "Analytics", href: "/analytics", icon: "📈", badge: null },
    { name: "Reports", href: "/reports", icon: "📋", badge: null },
    { name: "Customers", href: "/customers", icon: "👥", badge: null },
    { name: "Segments", href: "/segments", icon: "🎯", badge: null },
    { name: "Predictions", href: "/predictions", icon: "🔮", badge: null },
    { name: "Settings", href: "/settings", icon: "⚙️", badge: null },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800/50 bg-[#151B2B]">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center px-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold">D</span>
              </div>
              <span className="text-lg font-semibold">Dashbrd X</span>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Dashboard..."
                className="w-full rounded-lg bg-slate-800/50 px-4 py-2 pl-10 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
              />
              <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-800/70 text-white"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-slate-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">John Carter</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
              <button className="text-slate-400 hover:text-white">⚙️</button>
            </div>
            <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700">
              Get template →
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-800/50 bg-[#151B2B]/80 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <span className="text-slate-500">/</span>
              <span className="text-sm text-slate-400">Reports</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
                + Create report
              </button>
              <button className="relative rounded-lg bg-slate-800/50 p-2.5 hover:bg-slate-800">
                <span className="text-lg">🔔</span>
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
