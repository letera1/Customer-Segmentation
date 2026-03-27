"use client";

export default function Header() {
  return (
    <header className="bg-[#141b2d] border-b border-[#1e293b] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Customer Segmentation Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time AI-powered customer insights and analytics
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1e293b] text-white px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-[#1e293b] text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center space-x-3 bg-[#1e293b] rounded-lg px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
