"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SubscriptionGateway() {
  const [activeTab, setActiveTab] = useState<"corporate" | "student">("corporate");

  // YOUR EXACT PRICING ARCHITECTURE
  const corporatePlans = [
    { tier: "Basic", week: "10,000", month: "40,000", meals: "1 Meal Per Day", cbMo: "2,000", cbWk: "500" },
    { tier: "Standard", week: "15,000", month: "60,000", meals: "1 Meal Per Day", cbMo: "3,000", cbWk: "1,000" },
    { tier: "Premium", week: "17,500", month: "70,000", meals: "1 Meal Per Day", cbMo: "5,000", cbWk: "2,000" },
  ];

  const studentPlans = [
    { tier: "Basic", week: "12,500", month: "45,000", meals: "2 Meals Per Day", cbMo: "2,000", cbWk: "500" },
    { tier: "Standard", week: "18,000", month: "70,000", meals: "2 Meals Per Day", cbMo: "3,000", cbWk: "1,000" },
    { tier: "Premium", week: "25,000", month: "100,000", meals: "2 Meals Per Day", cbMo: "5,000", cbWk: "2,000" },
  ];

  const activePlans = activeTab === "corporate" ? corporatePlans : studentPlans;

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-10 shadow-2xl">
      
      {/* --- HERO SECTION WITH NIGERIA FOOD WATERMARK --- */}
      <div className="relative bg-black text-white pt-14 pb-10 px-6 overflow-hidden" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop')", // Rich food background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.75)" // Dark overlay to make text readable
      }}>
        
        <Link href="/" className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 z-20">
          <span className="text-xl">←</span>
        </Link>

        <div className="relative z-10 mt-4">
          <h1 className="text-3xl font-black mb-4 leading-tight text-qsOrange">QuickServe<br/>Special Meal</h1>
          {/* YOUR EXACT COPY */}
          <p className="text-sm text-gray-200 leading-relaxed font-medium">
            Quickserve Special meal offers affordable meals, on time delivery 🚚, Cashback 💵, and zero daily ordering stress. Subscribe today and let us handle your nutrition.
          </p>
        </div>
      </div>

      {/* --- THE CORPORATE / STUDENT TABS --- */}
      <div className="p-4 sticky top-0 bg-[#F8F9FA] z-30 shadow-sm border-b border-gray-200">
        <div className="flex bg-gray-200 rounded-xl p-1 relative">
          <button 
            onClick={() => setActiveTab("corporate")}
            className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${activeTab === "corporate" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}
          >
            CORPORATE
          </button>
          <button 
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${activeTab === "student" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}
          >
            STUDENT
          </button>
        </div>
      </div>

      {/* --- THE PRICING CARDS --- */}
      <div className="p-4 space-y-6">
        {activePlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
            
            {/* Header: Basic, Standard, or Premium */}
            <div className={`p-4 text-white text-center font-black tracking-widest uppercase ${
              plan.tier === 'Basic' ? 'bg-gray-800' : 
              plan.tier === 'Standard' ? 'bg-qsOrange' : 
              'bg-yellow-600'
            }`}>
              {plan.tier} PLAN
            </div>

            <div className="p-5">
              {/* Pricing & Meals */}
              <ul className="space-y-3 mb-6 text-sm font-bold text-gray-700">
                <li className="flex items-center gap-2"><span>💳</span> ₦{plan.week} PER WEEK</li>
                <li className="flex items-center gap-2"><span>💳</span> ₦{plan.month} PER MONTH</li>
                <li className="flex items-center gap-2"><span>🍽️</span> {plan.meals}</li>
              </ul>

              {/* Cashback Section */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6">
                <p className="text-xs font-black text-green-800 uppercase mb-2 flex items-center gap-1">
                  <span>💵</span> Cashback Rewards
                </p>
                <ul className="text-xs text-green-700 space-y-1 font-bold">
                  <li>• ₦{plan.cbMo} CASHBACK ON MONTHLY SUB</li>
                  <li>• ₦{plan.cbWk} CASHBACK ON WEEKLY SUB</li>
                </ul>
              </div>

              {/* Action Button */}
              <Link 
                href={`/special-meal/menu?tab=${activeTab}&tier=${plan.tier.toLowerCase()}`}
                className="block text-center w-full bg-qsDark text-white font-black py-4 rounded-xl active:scale-95 transition-transform"
              >
                READ MORE
              </Link>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}
