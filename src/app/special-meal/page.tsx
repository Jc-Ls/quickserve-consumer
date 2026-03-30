import React from "react";
import Link from "next/link";

export default function SpecialMealPage() {
  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-10 shadow-2xl overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <Link href="/" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </Link>
        <h1 className="font-bold text-lg text-qsDark">Special Meal Plans</h1>
      </header>

      {/* --- HERO BANNER --- */}
      <div className="bg-qsDark text-white p-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-qsOrange text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block">Premium Subscription</span>
          <h2 className="text-3xl font-black mb-2 leading-tight">Never worry about food again.</h2>
          <p className="text-sm text-gray-300">Choose a plan. Pick your protein. We handle the rest.</p>
        </div>
        {/* Abstract design elements */}
        <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-qsOrange rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* --- THE PRICING CARDS --- */}
      <div className="p-4 space-y-5 mt-4">
        
        {/* Corporate Plan Card */}
        <div className="bg-white rounded-2xl p-5 border-2 border-qsOrange shadow-[0_8px_30px_rgba(255,107,0,0.12)] relative">
          <div className="absolute -top-3 right-5 bg-qsOrange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Most Popular
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-black text-qsDark">Corporate Plan</h3>
              <p className="text-xs text-gray-500 mt-1">1 Meal / Day (Mon - Fri)</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-qsDark">₦15k</span>
              <p className="text-xs text-gray-400">/weekly</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority afternoon delivery</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 1 Premium Protein (Chicken/Beef/Fish)</li>
            </ul>
          </div>
          
          <button className="w-full bg-qsDark text-white font-bold py-3 rounded-xl hover:bg-black transition-colors">
            Select Corporate Plan
          </button>
        </div>

        {/* Student Plan Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-black text-qsDark">Student Plan</h3>
              <p className="text-xs text-gray-500 mt-1">2 Meals / Day (Mon - Fri)</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-qsDark">₦10k</span>
              <p className="text-xs text-gray-400">/weekly</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Campus delivery routing</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Base Protein (Egg/Sausage)</li>
            </ul>
          </div>
          
          <button className="w-full bg-gray-100 text-qsDark font-bold py-3 rounded-xl border border-gray-200 hover:bg-gray-200 transition-colors">
            Select Student Plan
          </button>
        </div>

      </div>

    </main>
  );
}
