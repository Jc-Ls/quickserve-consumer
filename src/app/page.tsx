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
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-24 shadow-2xl overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-green-600 text-xl">📍</span>
          <h1 className="font-bold text-lg">{userLocation} <span className="text-xs text-gray-400">▼</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center relative">
            <span>🛍️</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* --- THE FOCUSED SPECIAL MEAL BANNER --- */}
      <div className="p-4 mt-4">
        <Link href="/special-meal" className="block">
          <div className="bg-gradient-to-br from-qsDark to-black rounded-3xl p-6 relative overflow-hidden border-2 border-qsOrange shadow-[0_10px_30px_rgba(255,107,0,0.2)] active:scale-95 transition-transform cursor-pointer">
            
            <div className="relative z-10 w-3/4">
              <div className="flex items-center gap-2 mb-2">
                {/* 📚 TEACHING MOMENT: animate-pulse makes the clock throb like an alarm! */}
                <span className="text-2xl animate-pulse">⏰</span>
                <span className="text-qsOrange font-black tracking-widest text-xs uppercase">Limited Time</span>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight mb-4">
                QuickServe<br/>Special Meal
              </h2>
              <div className="inline-block bg-qsOrange text-white font-black px-5 py-2 rounded-xl shadow-lg">
                Subscribe Now 🚀
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-qsOrange rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-8xl opacity-80 drop-shadow-2xl">
              🍲
            </div>
          </div>
        </Link>
      </div>

      {/* --- BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-1 text-qsOrange"><span className="text-2xl">🏠</span><span className="text-[10px] font-bold">Home</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><span className="text-2xl">🛍️</span><span className="text-[10px] font-medium">Orders</span></div>
        <div className="flex flex-col items-center gap-1 text-gray-400"><span className="text-2xl">🤡</span><span className="text-[10px] font-medium">Profile</span></div>
      </nav>
    </main>
  );
}
