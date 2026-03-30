"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ScheduleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "student";
  const tier = searchParams.get("tier") || "basic";

  const isCorporate = tab === "corporate";
  const maxMeals = isCorporate ? 1 : 2;
  
  // 📚 TEACHING MOMENT 1: The Billing Cycle State
  // We now track if they want Weekly or Monthly. 
  // durationDays dynamically updates to 7 or 30 instantly!
  const [cycle, setCycle] = useState<"weekly" | "monthly">("weekly");
  const durationDays = cycle === "weekly" ? 7 : 30;

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { id: "morning", label: "Breakfast (9:00 AM - 11:30 AM)", icon: "🌅" },
    { id: "afternoon", label: "Lunch (1:00 PM - 3:00 PM)", icon: "☀️" },
    { id: "evening", label: "Dinner (6:00 PM - 8:30 PM)", icon: "🌙" }
  ];

  const proteins = tier === "premium" 
    ? ["Turkey", "Chicken", "Beef", "Fish"]
    : tier === "standard"
      ? ["Chicken", "Beef", "Fish"]
      : ["Beef", "Fish"]; 

  const baseMenu = [
    "Rice & Stew", "Jollof Rice", "Pasta", "Semo", "Amala", "Eba", "Beans & Bread",
    ...(tier !== "basic" ? ["Fried + Jollof", "Yam Porridge", "Yam + Egg"] : []),
    ...(tier === "premium" ? ["Basmati", "Poundo"] : [])
  ];

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [mealSelections, setMealSelections] = useState<Record<string, {meal: string, protein: string}>>({});

  const userName = "Jare"; // Mock User Name

  const toggleTimeSlot = (timeId: string) => {
    if (selectedTimes.includes(timeId)) {
      setSelectedTimes(selectedTimes.filter(t => t !== timeId));
      const newSelections = {...mealSelections};
      delete newSelections[timeId];
      setMealSelections(newSelections);
    } else {
      if (selectedTimes.length < maxMeals) {
        setSelectedTimes([...selectedTimes, timeId]);
      } else {
        alert(`Your ${tab} plan only allows ${maxMeals} meal(s) per day!`);
      }
    }
  };

  const updateMealSelection = (timeId: string, field: "meal" | "protein", value: string) => {
    setMealSelections(prev => ({
      ...prev,
      [timeId]: { ...prev[timeId], [field]: value }
    }));
  };

  const getEndDate = (startDate: string) => {
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + (durationDays - 1));
    return date.toISOString().split('T')[0];
  };

  const canProceedToSummary = selectedTimes.length === maxMeals && 
    selectedTimes.every(t => mealSelections[t]?.meal && mealSelections[t]?.protein);

  const handleDownloadPDF = () => {
    window.print();
  };

  // 📚 TEACHING MOMENT 2: The Exact Pricing Engine
  // This reads your exact rules from the blueprint and calculates the correct final price.
  const getFinalPrice = () => {
    if (tier === "basic") {
      if (isCorporate) return cycle === "weekly" ? "10,000" : "40,000";
      return cycle === "weekly" ? "12,500" : "45,000";
    }
    if (tier === "standard") {
      if (isCorporate) return cycle === "weekly" ? "15,000" : "60,000";
      return cycle === "weekly" ? "18,000" : "70,000";
    }
    // Premium
    if (isCorporate) return cycle === "weekly" ? "17,500" : "70,000";
    return cycle === "weekly" ? "25,000" : "100,000";
  };

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-28 shadow-2xl">
      
      {/* HEADER */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm print:hidden">
        <button onClick={() => step > 1 ? setStep(step - 1) : window.history.back()} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90">
          <span className="text-xl">←</span>
        </button>
        <div>
          <h1 className="font-black text-lg text-qsDark uppercase">SCHEDULE MEAL</h1>
          <p className="text-xs text-qsOrange font-bold">Step {step} of 3</p>
        </div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* ================= STEP 1: DATE, CYCLE & TIME ================= */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-4">Set your subscription timeline.</h2>
            
            {/* NEW: THE BILLING CYCLE TOGGLE */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Billing Cycle</label>
              <div className="flex bg-gray-100 rounded-xl p-1 relative">
                <button onClick={() => setCycle("weekly")} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${cycle === "weekly" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}>
                  WEEKLY (7 Days)
                </button>
                <button onClick={() => setCycle("monthly")} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${cycle === "monthly" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}>
                  MONTHLY (30 Days)
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Start Date</label>
              <input 
                type="date" 
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-qsDark font-bold focus:outline-none focus:ring-2 focus:ring-qsOrange"
              />
              {selectedDate && (
                <p className="text-xs text-green-600 mt-2 font-bold">
                  ✓ Your {durationDays}-day cycle will run until {getEndDate(selectedDate)}.
                </p>
              )}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Time Slots</label>
              <p className="text-xs text-qsOrange mb-4 font-medium">You can select exactly {maxMeals} slot(s) per day.</p>
              
              <div className="space-y-3">
                {timeSlots.map(slot => {
                  const isSelected = selectedTimes.includes(slot.id);
                  return (
                    <div key={slot.id} onClick={() => toggleTimeSlot(slot.id)} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${isSelected ? 'border-qsOrange bg-orange-50' : 'border-gray-100 hover:border-gray-300'}`}>
                      <span className="text-2xl">{slot.icon}</span>
                      <span className={`font-bold ${isSelected ? 'text-qsOrange' : 'text-gray-700'}`}>{slot.label}</span>
                      {isSelected && <span className="ml-auto text-qsOrange font-black">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={() => setStep(2)} disabled={!selectedDate || selectedTimes.length !== maxMeals} className={`w-full mt-8 py-4 rounded-xl font-black text-lg transition-all ${selectedDate && selectedTimes.length === maxMeals ? 'bg-qsDark text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}>
              Next: Build Master Menu →
            </button>
          </div>
        )}

        {/* ================= STEP 2: FOOD & PROTEIN ================= */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-2">Build your Master Menu.</h2>
            <p className="text-xs text-gray-500 mb-4">This will be your default delivery for the {durationDays}-day cycle. You can adjust specific days later in your dashboard.</p>
            
            {selectedTimes.map(timeId => {
              const slotDetails = timeSlots.find(t => t.id === timeId);
              const currentSelection = mealSelections[timeId] || { meal: "", protein: "" };
              
              return (
                <div key={timeId} className="bg-white p-5 rounded-2xl border border-qsOrange shadow-sm mb-6 relative">
                  <span className="absolute -top-3 left-4 bg-qsOrange text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    {slotDetails?.label.split(' ')[0]} Master Meal
                  </span>
                  
                  <div className="mt-2 mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Main Dish</label>
                    <select value={currentSelection.meal} onChange={(e) => updateMealSelection(timeId, "meal", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-qsDark font-bold focus:outline-none focus:ring-2 focus:ring-qsOrange">
                      <option value="">-- Select a Meal --</option>
                      {baseMenu.map((meal, idx) => (
                        <option key={idx} value={meal}>{meal}</option>
                      ))}
                    </select>
                  </div>

                  {currentSelection.meal && (
                    <div className="animate-in fade-in zoom-in-95 duration-200">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                        <span className="text-red-500">*</span> Choose ONE Protein
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {proteins.map(protein => (
                          <label key={protein} className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer font-bold text-sm ${currentSelection.protein === protein ? 'bg-qsOrange text-white border-qsOrange' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                            <input type="radio" name={`protein-${timeId}`} value={protein} checked={currentSelection.protein === protein} onChange={(e) => updateMealSelection(timeId, "protein", e.target.value)} className="hidden" />
                            {protein}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button onClick={() => setStep(3)} disabled={!canProceedToSummary} className={`w-full mt-4 py-4 rounded-xl font-black text-lg transition-all ${canProceedToSummary ? 'bg-qsDark text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}>
              Preview Premium Invoice →
            </button>
          </div>
        )}

        {/* ================= STEP 3: THE PREMIUM INVOICE RECEIPT ================= */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            <div className="mb-6 print:hidden">
              <h2 className="text-2xl font-black text-qsDark">Dear {userName},</h2>
              <p className="text-sm text-gray-600">Your Master Schedule is ready for review. Please confirm your details below.</p>
            </div>

            <div className="bg-white p-6 rounded-t-2xl border-x-2 border-t-2 border-gray-200 shadow-xl relative" id="receipt-card">
              
              <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-4">
                <div>
                  <h3 className="text-2xl font-black text-qsOrange tracking-tighter uppercase">QUICKSERVE</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Special Meal Invoice</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase">Invoice ID</p>
                  <p className="text-sm font-mono font-black text-qsDark">QS-{Math.floor(Math.random() * 1000000)}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-800">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Plan Name</span>
                    <span className="font-black uppercase text-qsDark">{tab} {tier} ({cycle})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</span>
                    <span className="font-bold text-qsOrange">{selectedDate} <span className="text-gray-400 font-normal">to</span> {getEndDate(selectedDate)}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Daily Delivery Master Roster</span>
                  {selectedTimes.map(timeId => {
                    const tLabel = timeSlots.find(t => t.id === timeId)?.label;
                    const choice = mealSelections[timeId];
                    return (
                      <div key={timeId} className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                        <div>
                          <span className="font-black text-qsDark block">{choice.meal}</span>
                          <span className="text-xs font-bold text-gray-500 uppercase">+ {choice.protein}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-bold uppercase">{tLabel?.split(' ')[0]}</span>
                          <p className="text-[10px] text-gray-400 mt-1">{tLabel?.split(' ')[1]} {tLabel?.split(' ')[2]} {tLabel?.split(' ')[3]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t-2 border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-600">Subtotal</span>
                    <span className="font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-600">Delivery Fee</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="text-lg font-black text-qsDark">TOTAL AMOUNT</span>
                    <span className="text-xl font-black text-qsOrange">₦{getFinalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==')] mb-6 shadow-xl print:hidden"></div>

            <div className="space-y-3 print:hidden">
              <button onClick={handleDownloadPDF} className="w-full py-4 rounded-xl font-bold text-qsDark bg-gray-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
                <span>📄</span> Download Invoice PDF
              </button>
              
              <button className="w-full py-5 rounded-xl font-black text-lg bg-green-600 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)] active:scale-95 transition-transform">
                SUBSCRIBE NOW!!! 🚀
              </button>
              
              <p className="text-center text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">
                Payment secured by QuickServe Admin
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Loading Wizard...</div>}>
      <ScheduleContent />
    </Suspense>
  );
}
