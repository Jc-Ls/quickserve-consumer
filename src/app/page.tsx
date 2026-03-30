"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ConsumerApp() {
  const [userLocation, setUserLocation] = useState("Locating...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const exactLocation = data.address.suburb || data.address.city || data.address.state || "Nigeria";
            setUserLocation(exactLocation);
          } catch (error) {
            setUserLocation("Location Error");
          }
        },
        () => setUserLocation("Location Denied")
      );
    } else {
      setUserLocation("Not Supported");
    }
  }, []);

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen relative pb-24 shadow-2xl overflow-hidden">
      
      {/* --- HEADER (Chowdeck Style) --- */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-green-600 text-xl">📍</span>
          <h1 className="font-bold text-lg">{userLocation} <span className="text-xs">▼</span></h1>
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

      {/* --- QUICKSERVE SPECIAL MEAL BANNER (With Ticking Clock) --- */}
      <div className="px-4 mt-2">
        <Link href="/special-meal" className="block">
          {/* We use a background image for the watermark feel */}
          <div className="bg-black rounded-2xl p-5 relative overflow-hidden shadow-md cursor-pointer active:scale-95 transition-transform" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.85)"
          }}>
            <div className="relative z-10 w-3/4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl animate-bounce">⏰</span>
                <span className="text-qsOrange font-black tracking-widest text-xs uppercase">Limited Time</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight mb-3">
                QuickServe<br/>Special Meal
              </h2>
              <div className="inline-block bg-qsOrange text-white font-black px-4 py-2 rounded-lg shadow-sm text-sm">
                Subscribe Now 🚀
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* --- CHOWDECK CATEGORY GRID --- */}
      <div className="px-4 mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">🏪</span><span className="text-xs font-medium text-center">Restaurants</span></div>
          <div className="flex flex-col items-center justify-center bg-yellow-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">🛒</span><span className="text-xs font-medium text-center">Shops</span></div>
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">💊</span><span className="text-xs font-medium text-center">Pharmacies</span></div>
          <div className="flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">📦</span><span className="text-xs font-medium text-center leading-tight">Send Packages</span></div>
          <div className="flex flex-col items-center justify-center bg-green-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">🧺</span><span className="text-xs font-medium text-center leading-tight">Local Markets</span></div>
          <div className="flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer"><span className="text-4xl mb-2">✨</span><span className="text-xs font-medium text-center">More</span></div>
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-20">
        <div className="flex flex-col items-center gap-1 cursor-pointer text-green-700"><span className="text-2xl">🏠</span><span className="text-[10px] font-bold">Home</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"><span className="text-2xl">🔍</span><span className="text-[10px] font-medium">Search</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 relative"><span className="text-2xl">🛍️</span><span className="absolute -top-1 -right-2 bg-green-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span><span className="text-[10px] font-medium">Orders</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"><span className="text-2xl">💬</span><span className="text-[10px] font-medium">Support</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400"><span className="text-2xl">🤡</span><span className="text-[10px] font-medium">Profile</span></div>
      </nav>
    </main>
  );
}
