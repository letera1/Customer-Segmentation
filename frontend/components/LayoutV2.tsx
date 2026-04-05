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

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "▦" },
  { name: "Analytics", href: "/analytics", icon: "◧" },
  { name: "Customers", href: "/customers", icon: "◉" },
  { name: "Segments", href: "/segments", icon: "◈" },
  { name: "Predictions", href: "/predictions", icon: "◆" },
  { name: "Reports", href: "/reports", icon: "▤" },
  { name: "Settings", href: "/settings", icon: "⚙" },
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
      shell: isLight ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-slate-100",
      sidebar: isLight
        ? "border-slate-200 bg-white"
        : "border-slate-800/60 bg-slate-950",
      logoBorder: isLight ? "border-slate-200" : "border-slate-800/60",
      navInactive: isLight
        ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        : "text-slate-400 hover:bg-slate-900/60 hover:text-white",
      bottomBorder: isLight ? "border-slate-200" : "border-slate-800/60",
      sidebarButton: isLight
        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
        : "bg-slate-900/50 text-slate-400 hover:bg-slate-900 hover:text-white",
      header: isLight
        ? "border-slate-200 bg-white/90"
        : "border-slate-800/60 bg-slate-950/80",
      title: isLight ? "text-slate-900" : "text-white",
      search: isLight
        ? "border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20"
        : "border-slate-800/60 bg-slate-900/40 text-white placeholder-slate-500 focus:border-blue-500/60 focus:ring-blue-500/20",
      subtleButton: isLight
        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
        : "bg-slate-900/40 text-slate-400 hover:bg-slate-900/70 hover:text-white",
      profile: isLight ? "bg-slate-100" : "bg-slate-900/40",
      profileMeta: isLight ? "text-slate-500" : "text-slate-400",
      main: isLight ? "bg-slate-100" : "bg-slate-950",
      brightnessLabel: isLight ? "text-slate-600" : "text-slate-400",
    }),
    [isLight]
  );

  return (
    <div className={`flex h-screen overflow-hidden ${classes.shell}`}>
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} flex flex-col border-r ${classes.sidebar} transition-all duration-300`}
      >
        <div className={`flex h-16 items-center justify-between px-6 border-b ${classes.logoBorder}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">SegmentAI</h1>
                <p className={`text-xs ${classes.profileMeta}`}>Pro Edition</p>
              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-xl font-bold text-white">S</span>
            </div>
          )}
        </div>

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
                    : classes.navInactive
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t ${classes.bottomBorder} p-4`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex w-full items-center justify-center rounded-xl py-3 transition-all ${classes.sidebarButton}`}
          >
            <span className="text-xl">{sidebarOpen ? "<" : ">"}</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className={`flex h-16 items-center justify-between border-b px-8 backdrop-blur ${classes.header}`}>
          <div className="flex items-center gap-4">
            <h2 className={`text-xl font-semibold ${classes.title}`}>
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${classes.subtleButton}`}
              aria-label="Toggle light and dark mode"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <div className="hidden items-center gap-2 md:flex">
              <span className={`text-xs ${classes.brightnessLabel}`}>Brightness</span>
              <input
                type="range"
                min={0.75}
                max={1.2}
                step={0.05}
                value={brightness}
                onChange={(e) => setBrightness(clampBrightness(Number.parseFloat(e.target.value)))}
                className="h-2 w-24 cursor-pointer accent-blue-500"
                aria-label="Adjust interface brightness"
              />
              <span className={`w-10 text-right text-xs ${classes.brightnessLabel}`}>
                {Math.round(brightness * 100)}%
              </span>
            </div>

            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search..."
                className={`h-10 w-56 rounded-xl border px-4 pl-10 text-sm focus:outline-none focus:ring-2 ${classes.search}`}
              />
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${classes.brightnessLabel}`}>⌕</span>
            </div>

            <button
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${classes.subtleButton}`}
              aria-label="Notifications"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className={`flex items-center gap-3 rounded-xl px-3 py-2 ${classes.profile}`}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="text-sm">
                <p className="font-medium">Admin</p>
                <p className={`text-xs ${classes.profileMeta}`}>admin@segmentai.com</p>
              </div>
            </div>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto p-8 ${classes.main}`}>
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
