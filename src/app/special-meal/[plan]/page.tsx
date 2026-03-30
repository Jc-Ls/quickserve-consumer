"use client";

import React, { useState, use } from "react";
import Link from "next/link";

// 📚 TEACHING MOMENT 1: The Promise Component Props
// In modern Next.js, dynamic route parameters (like [plan]) are passed as Promises.
// We use React's `use()` hook to unwrap them so we know if they clicked "corporate" or "student".
export default function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  // Unwrap the URL parameter
  const unwrappedParams = use(params);
  const isCorporate = unwrappedParams.plan === "corporate";

  // Set up dynamic data based on the plan they chose
  const planName = isCorporate ? "Corporate Plan" : "Student Plan";
  const planPrice = isCorporate ? "₦15,000" : "₦10,000";
  const availableProteins = isCorporate 
    ? ["Grilled Chicken", "Spicy Beef", "Fried Fish"] 
    : ["Boiled Egg", "Sausage"];

  // 📚 TEACHING MOMENT 2: React State (The "Memory" of the page)
  // useState holds the user's current choice. It starts as an empty string ("").
  // Because we use this state variable to control our Radio Buttons, it is mathematically 
  // IMPOSSIBLE for a user to select more than one protein. The state can only hold one value at a time!
  const [selectedProtein, setSelectedProtein] = useState("");

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-24 shadow-2xl">
      
      {/* --- HEADER --- */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <Link href="/special-meal" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </Link>
        <h1 className="font-bold text-lg text-qsDark">Customize Meal</h1>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Order Summary Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">Selected Plan</p>
            <h2 className="text-xl font-black text-qsDark">{planName}</h2>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-qsOrange">{planPrice}</span>
            <p className="text-xs text-gray-400">/weekly</p>
          </div>
        </div>

        {/* Protein Selection Area */}
        <div>
          <h3 className="font-bold text-lg text-qsDark mb-3 flex items-center gap-2">
            <span>🍗</span> Choose your Protein
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Required</span>
          </h3>
          
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {availableProteins.map((protein, index) => (
              <label key={index} className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${selectedProtein === protein ? 'bg-orange-50' : 'hover:bg-gray-50'} ${index !== availableProteins.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className={`font-medium ${selectedProtein === protein ? 'text-qsOrange font-bold' : 'text-gray-700'}`}>
                  {protein}
                </span>
                
                {/* 📚 TEACHING MOMENT 3: The Radio Button Constraint */}
                {/* Notice type="radio". It checks if this specific protein matches our state memory. */}
                <input 
                  type="radio" 
                  name="protein" 
                  value={protein}
                  checked={selectedProtein === protein}
                  onChange={(e) => setSelectedProtein(e.target.value)}
                  className="w-5 h-5 accent-qsOrange"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Details Placeholder */}
        <div>
          <h3 className="font-bold text-lg text-qsDark mb-3 flex items-center gap-2">
            <span>📍</span> Delivery Address
          </h3>
          <textarea 
            rows={3}
            placeholder="e.g., 123 Main St, Oko Erin..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-qsOrange resize-none shadow-sm"
          ></textarea>
        </div>

      </div>

      {/* --- FLOATING CHECKOUT BUTTON --- */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          disabled={!selectedProtein} // Button is dead until they pick a protein!
          className={`w-full py-4 rounded-xl font-black text-lg transition-all ${
            selectedProtein 
              ? 'bg-qsOrange text-white shadow-[0_8px_20px_rgba(255,107,0,0.2)] active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedProtein ? `Pay ${planPrice}` : 'Select a Protein first'}
        </button>
      </div>

    </main>
  );
}
