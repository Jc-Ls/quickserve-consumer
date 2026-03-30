import React from "react";

export default function ConsumerApp() {
  return (
    // 📚 TEACHING MOMENT 1: The Mobile Shell
    // max-w-md mx-auto makes it look exactly like a phone screen even if you view it on a laptop.
    // pb-24 adds padding at the bottom so the content doesn't get hidden behind the Bottom Nav.
    <main className="max-w-md mx-auto bg-white min-h-screen relative pb-24 shadow-2xl overflow-hidden">
      
      {/* --- 1. THE HEADER --- */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-green-600 text-xl">📍</span>
          <h1 className="font-bold text-lg">Kwara <span className="text-xs">▼</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center relative">
            <span>🛍️</span>
            {/* Notification Dot */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>
          <button className="bg-green-800 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            Filter <span>⚙️</span>
          </button>
        </div>
      </header>

      {/* --- 2. QUICKSERVE SPECIAL MEAL BANNER --- */}
      <div className="px-4 mt-2">
        <div className="bg-gradient-to-r from-qsBanner to-orange-100 rounded-2xl p-5 relative overflow-hidden border border-orange-200 shadow-sm cursor-pointer">
          <div className="w-2/3 relative z-10">
            <h2 className="text-2xl font-black text-qsDark leading-tight mb-3">
              Get the QuickServe<br/>Special Meal now
            </h2>
            <div className="inline-block bg-orange-200 border border-qsOrange text-qsDark font-black px-4 py-2 rounded-lg shadow-sm">
              <span className="text-xs mr-1 opacity-70">Starting at</span> 
              ₦2,200 <span className="text-xs opacity-70">Only</span>
            </div>
          </div>
          {/* Decorative Background Element (Simulating the food picture) */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-qsOrange rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center text-6xl">
            🍲
          </div>
        </div>
      </div>

      {/* --- 3. THE TEMU-STYLE CATEGORY GRID --- */}
      {/* 📚 TEACHING MOMENT 2: The Grid */}
      {/* grid-cols-3 creates 3 equal columns. gap-4 spaces them out perfectly. */}
      <div className="px-4 mt-8">
        <div className="grid grid-cols-3 gap-4">
          
          {/* Category Card 1 */}
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">🏪</span>
            <span className="text-xs font-medium text-center">Restaurants</span>
          </div>

          {/* Category Card 2 */}
          <div className="flex flex-col items-center justify-center bg-yellow-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">🛒</span>
            <span className="text-xs font-medium text-center">Shops</span>
          </div>

          {/* Category Card 3 */}
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">💊</span>
            <span className="text-xs font-medium text-center">Pharmacies</span>
          </div>

          {/* Category Card 4 */}
          <div className="flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">📦</span>
            <span className="text-xs font-medium text-center leading-tight">Send Packages</span>
          </div>

          {/* Category Card 5 */}
          <div className="flex flex-col items-center justify-center bg-green-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">🧺</span>
            <span className="text-xs font-medium text-center leading-tight">Local Markets</span>
          </div>

          {/* Category Card 6 */}
          <div className="flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer">
            <span className="text-4xl mb-2">✨</span>
            <span className="text-xs font-medium text-center">More</span>
          </div>

        </div>
      </div>

      {/* --- 4. EXPLORE SECTION (Placeholder) --- */}
      <div className="px-4 mt-10">
        <h3 className="text-xl font-medium mb-4">Explore</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">🍗</div>
            <span className="text-xs text-center leading-tight text-gray-600">Iya Basira</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">📱</div>
            <span className="text-xs text-center leading-tight text-gray-600">Gadget Hub</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">🌶️</div>
            <span className="text-xs text-center leading-tight text-gray-600">Oja Oba</span>
          </div>
        </div>
      </div>

      {/* --- 5. BOTTOM NAVIGATION BAR --- */}
      {/* 📚 TEACHING MOMENT 3: Fixed Positioning */}
      {/* fixed bottom-0 left-0 w-full ensures this bar NEVER moves from the bottom of the screen */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 h-20">
        
        <div className="flex flex-col items-center gap-1 cursor-pointer text-green-700">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-bold">Home</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-800">
          <span className="text-2xl">🔍</span>
          <span className="text-[10px] font-medium">Search</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-800 relative">
          <span className="text-2xl">🛍️</span>
          <span className="absolute -top-1 -right-2 bg-green-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          <span className="text-[10px] font-medium">Orders</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-800">
          <span className="text-2xl">💬</span>
          <span className="text-[10px] font-medium">Support</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-800">
          <span className="text-2xl">🤡</span>
          <span className="text-[10px] font-medium">Profile</span>
        </div>

      </nav>

    </main>
  );
}
