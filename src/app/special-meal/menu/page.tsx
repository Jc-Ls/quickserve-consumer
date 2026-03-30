"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MenuContent() {
  // 📚 TEACHING MOMENT: This reads the URL to know what the user clicked!
  // E.g., if URL is /menu?tab=student&tier=basic, it grabs "student" and "basic"
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "student"; 
  const tier = searchParams.get("tier") || "basic"; 

  // --- YOUR EXACT MENU DATABASE ---
  const menus = {
    basic: [
      { name: "Rice & Stew", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=400&auto=format&fit=crop" },
      { name: "Jollof Rice", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Pasta", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop" },
      { name: "Semo", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop" },
      { name: "Amala", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop" },
      { name: "Eba", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Beans & Bread", protein: "+ Beef OR Fish", img: "https://images.unsplash.com/photo-14fb865cd09ce-192b02868ff1?q=80&w=400&auto=format&fit=crop" }
    ],
    standard: [
      { name: "Rice & Stew", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=400&auto=format&fit=crop" },
      { name: "Jollof", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Fried + Jollof", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400&auto=format&fit=crop" },
      { name: "Pasta", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop" },
      { name: "Semo", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop" },
      { name: "Amala", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop" },
      { name: "Eba", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Rice & Beans", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=400&auto=format&fit=crop" },
      { name: "Yam Porridge", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?q=80&w=400&auto=format&fit=crop" },
      { name: "Yam + Egg", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=400&auto=format&fit=crop" },
      { name: "Beans & Bread", protein: "+ Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-14fb865cd09ce-192b02868ff1?q=80&w=400&auto=format&fit=crop" }
    ],
    premium: [
      { name: "Rice & Stew", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=400&auto=format&fit=crop" },
      { name: "Jollof", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Jollof + Fried", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400&auto=format&fit=crop" },
      { name: "Pasta", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop" },
      { name: "Basmati", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop" },
      { name: "Semo", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop" },
      { name: "Amala", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop" },
      { name: "Eba", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=400&auto=format&fit=crop" },
      { name: "Rice & Beans", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=400&auto=format&fit=crop" },
      { name: "Poundo", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop" },
      { name: "Yam + Egg", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=400&auto=format&fit=crop" },
      { name: "Beans & Bread", protein: "+ Turkey, Chicken, Beef OR Fish", img: "https://images.unsplash.com/photo-14fb865cd09ce-192b02868ff1?q=80&w=400&auto=format&fit=crop" }
    ]
  };

  // Lock in the correct list based on what they clicked!
  const currentMenu = menus[tier as keyof typeof menus] || menus.basic;

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-28 shadow-2xl">
      
      {/* --- HEADER --- */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <Link href="/special-meal" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </Link>
        <div>
          <h1 className="font-black text-lg text-qsDark uppercase">{tab} {tier} MENU</h1>
          <p className="text-xs text-gray-500">Available Meals for this Plan</p>
        </div>
      </header>

      {/* --- MENU LIST --- */}
      <div className="p-4 space-y-4">
        {currentMenu.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            {/* Food Image */}
            <div className="h-32 w-full bg-gray-200 relative">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Food Details & Protein Legend */}
            <div className="p-4">
              <h3 className="font-black text-lg text-qsDark mb-1">{item.name}</h3>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-2 inline-block">
                <p className="text-xs font-bold text-qsOrange tracking-wide uppercase">
                  {item.protein}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FLOATING SCHEDULE BUTTON --- */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Link 
          href={`/special-meal/schedule?tab=${tab}&tier=${tier}`} 
          className="block text-center w-full bg-qsDark text-white font-black py-4 rounded-xl active:scale-95 transition-transform shadow-[0_8px_20px_rgba(0,0,0,0.15)] text-lg"
        >
          SCHEDULE MEAL 📅
        </Link>
      </div>

    </main>
  );
}

// 📚 TEACHING MOMENT: Next.js requires any component using `useSearchParams` to be wrapped in a <Suspense> boundary to prevent build errors on Vercel!
export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
