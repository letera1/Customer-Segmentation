"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

type ThemeMode = "dark" | "light";

const THEME_KEY = "ui_theme";
const BRIGHTNESS_KEY = "ui_brightness";

// Navigation definition with clean vector SVG iconography
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Customers",
    href: "/customers",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Segments",
    href: "/segments",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    name: "Predictions",
    href: "/predictions",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function clampBrightness(value: number): number {
  if (Number.isNaN(value)) return 1;
  return Math.min(1.2, Math.max(0.75, value));
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

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const savedBrightness = localStorage.getItem(BRIGHTNESS_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedBrightness) {
      const parsedBrightness = Number.parseFloat(savedBrightness);
      if (!Number.isNaN(parsedBrightness)) {
        setBrightness(clampBrightness(parsedBrightness));
      }
    }

    setMounted(true);
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

  return (
    <div className="flex h-screen overflow-hidden font-lato bg-canvas text-main">
      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col border-r border-subtle bg-sidebar transition-all duration-300 z-20`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-subtle">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm text-white font-black text-sm">
                S
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight leading-none text-main">SegmentAI</h1>
                <p className="text-[10px] font-bold tracking-wider uppercase text-muted mt-1">
                  Enterprise ML
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl bg-indigo-600 shadow-sm text-white font-black text-sm">
              S
            </div>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-sub hover:bg-surface hover:text-main"
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <div className={`flex items-center justify-center ${isActive ? "text-white" : "text-sub"}`}>
                  {item.icon}
                </div>
                {sidebarOpen && <span className="tracking-tight">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Collapse Action */}
        <div className="border-t border-subtle p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-[11px] font-bold transition-all bg-surface text-sub hover:text-main"
            aria-label="Toggle Sidebar Navigation"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {sidebarOpen && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-subtle px-8 bg-sidebar/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold tracking-tight text-main">
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border border-subtle bg-surface text-sub hover:text-main"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Charcoal</span>
                </>
              )}
            </button>

            {/* Brightness Adjustment Slider */}
            <div className="hidden items-center gap-2 md:flex px-2 py-1">
              <span className="text-[11px] font-bold text-sub">Brightness</span>
              <input
                type="range"
                min={0.75}
                max={1.2}
                step={0.05}
                value={brightness}
                onChange={(e) => setBrightness(clampBrightness(Number.parseFloat(e.target.value)))}
                className="h-1.5 w-16 cursor-pointer accent-indigo-500 rounded-lg bg-gray-500/30"
                aria-label="Adjust interface brightness"
              />
              <span className="w-8 text-right text-[11px] font-mono font-bold text-sub">
                {Math.round(brightness * 100)}%
              </span>
            </div>

            {/* Quick Search */}
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-52 rounded-xl border border-subtle bg-surface px-3 pl-8 pr-8 text-xs font-medium text-main placeholder-muted focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <svg className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-sub hover:text-main"
              >
                ↵
              </button>
            </form>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 rounded-xl px-2.5 py-1 border border-subtle bg-surface">
              <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-main leading-tight">Admin</p>
                <p className="text-[10px] text-muted leading-none">Superuser</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-canvas">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
