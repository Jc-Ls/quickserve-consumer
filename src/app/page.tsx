"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConsumerApp() {
  const [userLocation, setUserLocation] = useState("Locating...");
  const pathname = usePathname(); // To highlight active bottom nav

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
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-green-600 text-xl">📍</span>
          <h1 className="font-bold text-lg">{userLocation} <span className="text-xs">▼</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center relative active:scale-95 transition-transform">
            <span>🛍️</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </Link>
          <button className="bg-green-800 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 active:scale-95">
            Filter <span>⚙️</span>
          </button>
        </div>
      </header>

      {/* --- QUICKSERVE SPECIAL MEAL BANNER --- */}
      <div className="px-4 mt-2">
        <Link href="/special-meal" className="block">
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

      {/* --- CHOWDECK CATEGORY GRID (Now Fully Clickable!) --- */}
      <div className="px-4 mt-8">
        <h3 className="font-black text-gray-800 mb-4 tracking-wide">Explore Categories</h3>
        <div className="grid grid-cols-3 gap-4">
          <Link href="/category/restaurants" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">🏪</span><span className="text-xs font-bold text-center text-gray-700">Restaurants</span>
          </Link>
          <Link href="/category/shops" className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">🛒</span><span className="text-xs font-bold text-center text-gray-700">Shops</span>
          </Link>
          <Link href="/category/pharmacies" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">💊</span><span className="text-xs font-bold text-center text-gray-700">Pharmacies</span>
          </Link>
          <Link href="/logistics" className="flex flex-col items-center justify-center bg-pink-50 hover:bg-pink-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">📦</span><span className="text-xs font-bold text-center leading-tight text-gray-700">Send Packages</span>
          </Link>
          <Link href="/category/local-markets" className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">🧺</span><span className="text-xs font-bold text-center leading-tight text-gray-700">Local Markets</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 rounded-2xl p-4 aspect-square shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-all">
            <span className="text-4xl mb-2">✨</span><span className="text-xs font-bold text-center text-gray-700">More</span>
          </Link>
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR (Now Fully Functional!) --- */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-20 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
          <span className="text-2xl">🏠</span><span className={`text-[10px] ${pathname === '/' ? 'font-black' : 'font-bold'}`}>Home</span>
        </Link>
        
        <Link href="/search" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/search' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
          <span className="text-2xl">🔍</span><span className={`text-[10px] ${pathname === '/search' ? 'font-black' : 'font-bold'}`}>Search</span>
        </Link>
        
        <Link href="/orders" className={`flex flex-col items-center gap-1 relative transition-colors ${pathname === '/orders' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
          <span className="text-2xl">🛍️</span>
          <span className="absolute -top-1 -right-2 bg-green-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">1</span>
          <span className={`text-[10px] ${pathname === '/orders' ? 'font-black' : 'font-bold'}`}>Orders</span>
        </Link>
        
        <Link href="/support" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/support' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
          <span className="text-2xl">💬</span><span className={`text-[10px] ${pathname === '/support' ? 'font-black' : 'font-bold'}`}>Support</span>
        </Link>
        
        <Link href="/profile" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/profile' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
          <span className="text-2xl">🤡</span><span className={`text-[10px] ${pathname === '/profile' ? 'font-black' : 'font-bold'}`}>Profile</span>
        </Link>
      </nav>
    </main>
  );
}
