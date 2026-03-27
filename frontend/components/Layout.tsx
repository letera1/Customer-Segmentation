"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Analytics", href: "/analytics", icon: "📈" },
    { name: "Reports", href: "/reports", icon: "📋" },
    { name: "Customers", href: "/customers", icon: "👥" },
    { name: "Segments", href: "/segments", icon: "🎯" },
    { name: "Predictions", href: "/predictions", icon: "🔮" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800/50 bg-[#151B2B]">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center px-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-lg font-bold">S</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SegmentAI Pro
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-800/50 bg-[#151B2B]/95 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                + Create Report
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-lg bg-slate-800/50 p-2.5 hover:bg-slate-800 transition-colors"
                >
                  <span className="text-lg">🔔</span>
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-14 w-80 rounded-xl border border-slate-800/50 bg-[#151B2B] shadow-2xl">
                    <div className="border-b border-slate-800/50 p-4">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto p-2">
                      {[
                        { title: "New prediction completed", time: "2 min ago", type: "success" },
                        { title: "Customer segment updated", time: "1 hour ago", type: "info" },
                        { title: "Report generated", time: "3 hours ago", type: "success" },
                      ].map((notif, i) => (
                        <div key={i} className="rounded-lg p-3 hover:bg-slate-800/50 cursor-pointer">
                          <p className="text-sm font-medium">{notif.title}</p>
                          <p className="text-xs text-slate-400">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
