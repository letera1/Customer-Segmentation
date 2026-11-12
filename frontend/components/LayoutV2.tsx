"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { checkHealth, HealthResponse } from "@/lib/api";

interface LayoutProps {
  children: React.ReactNode;
}

type ThemeMode = "dark" | "light";

const THEME_KEY = "ui_theme";
const BRIGHTNESS_KEY = "ui_brightness";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Clusters & Finance",
    href: "/segments",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    name: "Customer Explorer",
    href: "/customers",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Behavioral Analytics",
    href: "/analytics",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Batch Inference",
    href: "/predictions",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "System Settings",
    href: "/settings",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function clampBrightness(value: number): number {
  if (Number.isNaN(value)) return 1;
  return Math.min(1.2, Math.max(0.8, value));
}

function applyRootTheme(theme: ThemeMode, brightness: number): void {
  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  root.style.setProperty("--app-brightness", clampBrightness(brightness).toString());
}

export default function LayoutV2({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [brightness, setBrightness] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiHealth, setApiHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const savedBrightness = localStorage.getItem(BRIGHTNESS_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedBrightness) {
      const parsed = Number.parseFloat(savedBrightness);
      if (!Number.isNaN(parsed)) {
        setBrightness(clampBrightness(parsed));
      }
    }

    setMounted(true);

    checkHealth().then((health) => {
      setApiHealth(health);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyRootTheme(theme, brightness);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(BRIGHTNESS_KEY, brightness.toString());
  }, [theme, brightness, mounted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/customers?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentPage = navigation.find((item) => item.href === pathname)?.name || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden font-lato bg-canvas text-main">
      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } flex flex-col border-r border-subtle bg-sidebar transition-all duration-200 z-20 shrink-0`}
      >
        {/* Brand */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-subtle">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-elevated border border-subtle text-main font-bold text-xs tracking-wider">
                CS
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold tracking-tight text-main block">
                  SEGMENT.AI
                </span>
                <span className="text-[10px] font-medium text-muted block">
                  ML Cohort Platform
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-7 w-7 mx-auto items-center justify-center rounded-md bg-elevated border border-subtle text-main font-bold text-xs">
              CS
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-2.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-elevated text-main font-semibold border border-subtle"
                    : "text-sub hover:bg-surface hover:text-main"
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <span className="shrink-0 text-sub">{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* API Gateway Status Pill & Collapse */}
        <div className="border-t border-subtle p-2.5 space-y-2">
          {sidebarOpen && (
            <div className="p-2 rounded-lg bg-surface border border-subtle text-[11px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted font-medium">Gateway</span>
                <span className="flex items-center gap-1.5 font-medium text-sub">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      apiHealth?.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  {apiHealth?.status === "healthy" ? "Online" : "Connecting"}
                </span>
              </div>
              <div className="text-[10px] font-mono text-muted truncate">
                k=5 Clusters | ML Ready
              </div>
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-[11px] font-medium transition-colors bg-surface text-sub hover:text-main border border-subtle"
            aria-label="Toggle Sidebar"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${!sidebarOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-14 items-center justify-between border-b border-subtle px-6 bg-sidebar z-10 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold tracking-tight text-main">
              {currentPage}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search customers or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-56 rounded-lg border border-subtle bg-surface px-3 pl-8 text-xs text-main placeholder:text-muted focus:outline-none focus:border-subtle"
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {/* Brightness Adjustment */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-subtle bg-surface text-[11px] text-sub">
              <span className="text-muted">Brightness</span>
              <input
                type="range"
                min={0.8}
                max={1.15}
                step={0.05}
                value={brightness}
                onChange={(e) => setBrightness(clampBrightness(Number.parseFloat(e.target.value)))}
                className="h-1 w-14 cursor-pointer"
                aria-label="Brightness"
              />
            </div>

            {/* Theme Toggle (Dark Charcoal vs Light Gray) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border border-subtle bg-surface text-sub hover:text-main transition-colors"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? (
                <>
                  <svg className="w-3.5 h-3.5 text-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Operator Identifier */}
            <div className="flex items-center gap-2 rounded-lg px-2.5 py-1 border border-subtle bg-surface text-xs">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="text-sub font-medium">ML Admin</span>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-canvas">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
