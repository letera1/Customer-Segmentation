"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

type ThemeMode = "dark" | "light";

const THEME_KEY = "ui_theme";
const BRIGHTNESS_KEY = "ui_brightness";

// Navigation definition with modern SVG icon components
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Customers",
    href: "/customers",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Segments",
    href: "/segments",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    name: "Predictions",
    href: "/predictions",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/reports",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [brightness, setBrightness] = useState(1);
  const [mounted, setMounted] = useState(false);

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

  const isLight = theme === "light";

  const classes = useMemo(
    () => ({
      shell: isLight ? "bg-[#ECEEF2] text-[#171B23]" : "bg-[#131418] text-[#ECEEF2]",
      sidebar: isLight
        ? "border-[#D9DDE5] bg-[#F4F5F8]"
        : "border-[#272A35] bg-[#181A20]",
      logoBorder: isLight ? "border-[#D9DDE5]" : "border-[#272A35]",
      navInactive: isLight
        ? "text-[#5E6573] hover:bg-[#EAECEF] hover:text-[#171B23]"
        : "text-[#828B9F] hover:bg-[#20222A] hover:text-[#ECEEF2]",
      bottomBorder: isLight ? "border-[#D9DDE5]" : "border-[#272A35]",
      sidebarButton: isLight
        ? "bg-[#EAECEF] text-[#5E6573] hover:bg-[#DFE2E8] hover:text-[#171B23]"
        : "bg-[#20222A] text-[#828B9F] hover:bg-[#282B36] hover:text-white",
      header: isLight
        ? "border-[#D9DDE5] bg-[#F4F5F8]/85"
        : "border-[#272A35] bg-[#181A20]/80",
      title: isLight ? "text-[#171B23]" : "text-[#ECEEF2]",
      search: isLight
        ? "border-[#D9DDE5] bg-[#FFFFFF] text-[#171B23] placeholder-[#8F96A3] focus:border-indigo-500/70 focus:ring-indigo-500/10"
        : "border-[#2E323E] bg-[#20222A] text-[#ECEEF2] placeholder-[#5F667A] focus:border-indigo-500/70 focus:ring-indigo-500/20",
      subtleButton: isLight
        ? "bg-[#EAECEF] text-[#5E6573] hover:bg-[#DFE2E8] hover:text-[#171B23]"
        : "bg-[#20222A] text-[#828B9F] hover:bg-[#282B36] hover:text-white",
      profile: isLight ? "bg-[#EAECEF]" : "bg-[#20222A]",
      profileMeta: isLight ? "text-[#5E6573]" : "text-[#828B9F]",
      main: isLight ? "bg-[#ECEEF2]" : "bg-[#131418]",
      brightnessLabel: isLight ? "text-[#5E6573]" : "text-[#828B9F]",
    }),
    [isLight]
  );

  return (
    <div className={`flex h-screen overflow-hidden font-lato ${classes.shell}`}>
      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col border-r ${classes.sidebar} transition-all duration-300 z-20`}
      >
        {/* Brand Header */}
        <div className={`flex h-16 items-center justify-between px-5 border-b ${classes.logoBorder}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 shadow-md shadow-indigo-600/25">
                <span className="text-xl font-black text-white tracking-wider">S</span>
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight">SegmentAI</h1>
                <p className={`text-[11px] font-medium tracking-wide uppercase ${classes.profileMeta}`}>
                  Pro Studio
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 shadow-md shadow-indigo-600/25">
              <span className="text-xl font-black text-white">S</span>
            </div>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="flex-1 space-y-1.5 p-3.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                    : classes.navInactive
                }`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <div className={`flex items-center justify-center ${isActive ? "text-white" : "opacity-80"}`}>
                  {item.icon}
                </div>
                {sidebarOpen && <span className="tracking-tight">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle Footnote */}
        <div className={`border-t ${classes.bottomBorder} p-3.5`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex w-full items-center justify-center rounded-xl py-2.5 text-xs font-bold transition-all ${classes.sidebarButton}`}
            aria-label="Toggle Sidebar Navigation"
          >
            {sidebarOpen ? (
              <span className="flex items-center gap-2">
                <span>◀</span>
                <span>Collapse</span>
              </span>
            ) : (
              <span>▶</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className={`flex h-16 items-center justify-between border-b px-8 backdrop-blur-md z-10 ${classes.header}`}>
          <div className="flex items-center gap-4">
            <h2 className={`text-xl font-bold tracking-tight ${classes.title}`}>
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border ${
                isLight ? "border-[#D9DDE5]" : "border-[#2E323E]"
              } ${classes.subtleButton}`}
              aria-label="Toggle Charcoal Dark and Smooth Light theme"
            >
              {theme === "dark" ? (
                <>
                  <span>☀️</span>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <span>🌙</span>
                  <span>Charcoal</span>
                </>
              )}
            </button>

            {/* Brightness Adjustment Slider */}
            <div className="hidden items-center gap-2.5 md:flex px-2 py-1">
              <span className={`text-xs font-semibold ${classes.brightnessLabel}`}>Brightness</span>
              <input
                type="range"
                min={0.75}
                max={1.2}
                step={0.05}
                value={brightness}
                onChange={(e) => setBrightness(clampBrightness(Number.parseFloat(e.target.value)))}
                className="h-1.5 w-20 cursor-pointer accent-indigo-500 rounded-lg bg-gray-600/40"
                aria-label="Adjust interface brightness"
              />
              <span className={`w-9 text-right text-xs font-bold ${classes.brightnessLabel}`}>
                {Math.round(brightness * 100)}%
              </span>
            </div>

            {/* Quick Search with shortcut */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search segments..."
                className={`h-9 w-60 rounded-xl border px-4 pl-9 pr-10 text-xs font-medium focus:outline-none focus:ring-2 ${classes.search}`}
              />
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${classes.brightnessLabel}`}>
                ⌕
              </span>
              <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 rounded border px-1.5 py-0.5 text-[10px] font-bold ${
                isLight ? "border-gray-300 text-gray-500" : "border-gray-700 text-gray-400"
              }`}>
                ⌘K
              </span>
            </div>

            {/* Notification Bell */}
            <button
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all border ${
                isLight ? "border-[#D9DDE5]" : "border-[#2E323E]"
              } ${classes.subtleButton}`}
              aria-label="Notifications"
            >
              <span className="text-sm">🔔</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#181A20]"></span>
            </button>

            {/* User Profile Pill */}
            <div className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 border ${
              isLight ? "border-[#D9DDE5]" : "border-[#2E323E]"
            } ${classes.profile}`}>
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold tracking-tight">Admin</p>
                <p className={`text-[10px] ${classes.profileMeta}`}>admin@segmentai.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 ${classes.main}`}>
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
