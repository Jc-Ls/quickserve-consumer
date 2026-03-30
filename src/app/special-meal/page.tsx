"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SubscriptionGateway() {
  // 📚 TEACHING MOMENT: This state remembers which Tab is clicked. Defaults to 'corporate'.
  const [activeTab, setActiveTab] = useState<"corporate" | "student">("corporate");

  // YOUR EXACT PRICING DATA ARCHITECTURE
  const corporatePlans = [
    { tier: "Basic", week: "10k", month: "40k", meals: "1 Meal / Day", cbMo: "2k", cbWk: "500" },
    { tier: "Standard", week: "15k", month: "60k", meals: "1 Meal / Day", cbMo: "3k", cbWk: "1k" },
    { tier: "Premium", week: "17.5k", month: "70k", meals: "1 Meal / Day", cbMo: "5k", cbWk: "2k" },
  ];

  const studentPlans = [
    { tier: "Basic", week: "12.5k", month: "45k", meals: "2 Meals / Day", cbMo: "2k", cbWk: "500" },
    { tier: "Standard", week: "18k", month: "70k", meals: "2 Meals / Day", cbMo: "3k", cbWk: "1k" },
    { tier: "Premium", week: "25k", month: "100k", meals: "2 Meals / Day", cbMo: "5k", cbWk: "2k" },
  ];

  // Dynamically select which list to show based on the Tab
  const activePlans = activeTab === "corporate" ? corporatePlans : studentPlans;

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-10 shadow-2xl">
      
      {/* --- HERO SECTION WITH WATERMARK --- */}
      <div className="relative bg-qsDark text-white pt-12 pb-8 px-6 overflow-hidden">
        {/* The Watermark Background (Simulating Nigerian Food) */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-qsDark to-transparent"></div>
        
        <Link href="/" className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 z-20">
          <span className="text-xl">←</span>
        </Link>

        <div className="relative z-10 mt-8">
          <span className="bg-qsOrange text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block">Premium Gateway</span>
          <h1 className="text-3xl font-black mb-3 leading-tight">Eat better.<br/>Stress less.</h1>
          <ul className="text-sm text-gray-300 space-y-1 font-medium">
            <li>✅ Affordable Premium Meals</li>
            <li>🚚 On-Time Daily Delivery</li>
            <li>💵 Guaranteed Wallet Cashback</li>
          </ul>
        </div>
      </div>

      {/* --- THE TOGGLE TABS --- */}
      <div className="p-4 sticky top-0 bg-[#F8F9FA] z-30 shadow-sm border-b border-gray-100">
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
      <div className="p-4 space-y-5">
        {activePlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            
            {/* Card Header */}
            <div className={`p-5 text-white ${plan.tier === 'Premium' ? 'bg-qsDark' : plan.tier === 'Standard' ? 'bg-qsOrange' : 'bg-gray-800'}`}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-black uppercase">{plan.tier} PLAN</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded font-bold">{plan.meals}</span>
              </div>
            </div>

            {/* Card Body (Prices & Cashback) */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Weekly</p>
                  <p className="text-2xl font-black text-qsDark">₦{plan.week}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Monthly</p>
                  <p className="text-2xl font-black text-qsDark">₦{plan.month}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-3 mb-5 border border-green-100">
                <p className="text-xs font-bold text-green-800 flex items-center gap-1 mb-1"><span>💵</span> Cashback Rewards</p>
                <div className="flex justify-between text-xs text-green-700">
                  <span>Weekly: ₦{plan.cbWk}</span>
                  <span>Monthly: ₦{plan.cbMo}</span>
                </div>
              </div>

              {/* 📚 TEACHING MOMENT: The Dynamic URL Router */}
              {/* This sends the user to the Menu page and passes their choices in the URL! */}
              <Link 
                href={`/special-meal/menu?type=${activeTab}&tier=${plan.tier.toLowerCase()}`}
                className="block text-center w-full bg-gray-100 text-qsDark font-black py-3 rounded-xl hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Read More →
              </Link>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}
