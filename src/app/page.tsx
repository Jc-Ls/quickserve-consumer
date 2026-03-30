"use client"; // 📚 TEACHING MOMENT: This tells Next.js to run this code in the user's browser so we can use Location APIs and Buttons.

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Next.js built-in routing for instant page transitions

export default function ConsumerApp() {
  // State to hold the live location
  const [userLocation, setUserLocation] = useState("Locating...");

  // 📚 TEACHING MOMENT: The Geolocation Hook
  // This runs automatically exactly once when the app opens.
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Free Reverse Geocoding: Turns GPS numbers into a real street/city name!
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            // Try to get the most accurate local name (Suburb, City, or State)
            const exactLocation = data.address.suburb || data.address.city || data.address.state || "Nigeria";
            setUserLocation(exactLocation);
          } catch (error) {
            setUserLocation("Location Error");
          }
        },
        () => {
          setUserLocation("Location Denied"); // If the user clicks "Block"
        }
      );
    } else {
      setUserLocation("Not Supported");
    }
  }, []);

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen relative pb-24 shadow-2xl overflow-hidden">
      
      {/* --- 1. THE LIVE HEADER --- */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-green-600 text-xl">📍</span>
          {/* Automatically injects the real location here */}
          <h1 className="font-bold text-lg">{userLocation} <span className="text-xs text-gray-400">▼</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center relative">
            <span>🛍️</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>
          <button className="bg-green-800 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            Filter <span>⚙️</span>
          </button>
        </div>
      </header>

      {/* --- 2. CLICKABLE SPECIAL MEAL BANNER --- */}
      <div className="px-4 mt-2">
        {/* We wrap the whole banner in a <Link> so it acts as a massive button */}
        <Link href="/special-meal" className="block">
          <div className="bg-gradient-to-r from-qsBanner to-orange-100 rounded-2xl p-5 relative overflow-hidden border border-orange-200 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95">
            <div className="w-2/3 relative z-10">
              <h2 className="text-2xl font-black text-qsDark leading-tight mb-3">
                Get the QuickServe<br/>Special Meal now
              </h2>
              <div className="inline-block bg-orange-200 border border-qsOrange text-qsDark font-black px-4 py-2 rounded-lg shadow-sm">
                <span className="text-xs mr-1 opacity-70">Starting at</span> 
                ₦2,200 <span className="text-xs opacity-70">Only</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-qsOrange rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center text-6xl">
              🍲
            </div>
          </div>
        </Link>
      </div>

      {/* --- 3. CATEGORY GRID (Unchanged) --- */}
      <div className="px-4 mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">🏪</span><span className="text-xs font-medium text-center">Restaurants</span></div>
          <div className="flex flex-col items-center justify-center bg-yellow-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">🛒</span><span className="text-xs font-medium text-center">Shops</span></div>
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">💊</span><span className="text-xs font-medium text-center">Pharmacies</span></div>
          <div className="flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">📦</span><span className="text-xs font-medium text-center leading-tight">Send Packages</span></div>
          <div className="flex flex-col items-center justify-center bg-green-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">🧺</span><span className="text-xs font-medium text-center leading-tight">Local Markets</span></div>
          <div className="flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl p-4 aspect-square border border-gray-100"><span className="text-4xl mb-2">✨</span><span className="text-xs font-medium text-center">More</span></div>
        </div>
      </div>

      {/* --- 4. EXPLORE SECTION (Unchanged) --- */}
      <div className="px-4 mt-10">
        <h3 className="text-xl font-medium mb-4">Explore</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex flex-col items-center min-w-[80px]"><div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">🍗</div><span className="text-xs text-center leading-tight text-gray-600">Iya Basira</span></div>
          <div className="flex flex-col items-center min-w-[80px]"><div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">📱</div><span className="text-xs text-center leading-tight text-gray-600">Gadget Hub</span></div>
          <div className="flex flex-col items-center min-w-[80px]"><div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">🌶️</div><span className="text-xs text-center leading-tight text-gray-600">Oja Oba</span></div>
        </div>
      </div>

      {/* --- BOTTOM NAV (Unchanged) --- */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-20">
        <div className="flex flex-col items-center gap-1 text-green-700"><span className="text-2xl">🏠</span><span className="text-[10px] font-bold">Home</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><span className="text-2xl">🔍</span><span className="text-[10px] font-medium">Search</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400 relative"><span className="text-2xl">🛍️</span><span className="absolute -top-1 -right-2 bg-green-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span><span className="text-[10px] font-medium">Orders</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><span className="text-2xl">💬</span><span className="text-[10px] font-medium">Support</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><span className="text-2xl">🤡</span><span className="text-[10px] font-medium">Profile</span></div>
      </nav>
    </main>
  );
}
