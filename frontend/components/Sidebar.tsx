"use client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "👥", label: "Customers", active: false },
    { icon: "🎯", label: "Segments", active: false },
    { icon: "📈", label: "Analytics", active: false },
    { icon: "🔮", label: "Predictions", active: false },
    { icon: "📋", label: "Reports", active: false },
    { icon: "⚙️", label: "Settings", active: false },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#141b2d] border-r border-[#1e293b] transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-[#1e293b]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          {isOpen && (
            <div>
              <h1 className="text-white font-bold text-lg">SegmentAI</h1>
              <p className="text-gray-400 text-xs">v2.0</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border border-green-500/30"
                : "text-gray-400 hover:bg-[#1e293b] hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 border-t border-[#1e293b] text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-xl">{isOpen ? "◀" : "▶"}</span>
      </button>
    </div>
  );
}
