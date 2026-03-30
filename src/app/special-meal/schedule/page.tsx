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

  // 📚 TEACHING MOMENT 1: The Date Restrictor
  // We grab today's date in YYYY-MM-DD format. We will plug this into the "min" attribute of our date picker
  // to make it physically impossible for users to select a past date!
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { id: "morning", label: "Breakfast (9:00 AM - 11:30 AM)", icon: "🌅" },
    { id: "afternoon", label: "Lunch (1:00 PM - 3:00 PM)", icon: "☀️" },
    { id: "evening", label: "Dinner (6:00 PM - 8:30 PM)", icon: "🌙" }
  ];

  // Derive available proteins based on tier
  const proteins = tier === "premium" 
    ? ["Turkey", "Chicken", "Beef", "Fish"]
    : tier === "standard"
      ? ["Chicken", "Beef", "Fish"]
      : ["Beef", "Fish"]; // Basic

  // Base Menu without proteins attached
  const baseMenu = [
    "Rice & Stew", "Jollof Rice", "Pasta", "Semo", "Amala", "Eba", "Beans & Bread",
    ...(tier !== "basic" ? ["Fried + Jollof", "Yam Porridge", "Yam + Egg"] : []),
    ...(tier === "premium" ? ["Basmati", "Poundo"] : [])
  ];

  // --- MULTI-STEP STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
  // Stores the meal choice for each selected time slot
  // e.g., { "morning": { meal: "Jollof", protein: "Beef" } }
  const [mealSelections, setMealSelections] = useState<Record<string, {meal: string, protein: string}>>({});

  // 📚 TEACHING MOMENT 2: The Time Slot Enforcer
  const toggleTimeSlot = (timeId: string) => {
    if (selectedTimes.includes(timeId)) {
      setSelectedTimes(selectedTimes.filter(t => t !== timeId));
      // Remove meal selection if time is deselected
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

  // Validation before moving to summary
  const canProceedToSummary = selectedTimes.length === maxMeals && 
    selectedTimes.every(t => mealSelections[t]?.meal && mealSelections[t]?.protein);

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-28 shadow-2xl">
      
      {/* HEADER */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => step > 1 ? setStep(step - 1) : window.history.back()} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90">
          <span className="text-xl">←</span>
        </button>
        <div>
          <h1 className="font-black text-lg text-qsDark uppercase">SCHEDULE MEAL</h1>
          <p className="text-xs text-qsOrange font-bold">Step {step} of 3</p>
        </div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* ================= STEP 1: DATE & TIME ================= */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-4">When do you want to eat?</h2>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Start Date</label>
              <input 
                type="date" 
                min={today} // Restricts past dates!
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-qsDark font-bold focus:outline-none focus:ring-2 focus:ring-qsOrange"
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Time Slots</label>
              <p className="text-xs text-qsOrange mb-4 font-medium">You can select exactly {maxMeals} slot(s).</p>
              
              <div className="space-y-3">
                {timeSlots.map(slot => {
                  const isSelected = selectedTimes.includes(slot.id);
                  return (
                    <div 
                      key={slot.id}
                      onClick={() => toggleTimeSlot(slot.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${isSelected ? 'border-qsOrange bg-orange-50' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <span className="text-2xl">{slot.icon}</span>
                      <span className={`font-bold ${isSelected ? 'text-qsOrange' : 'text-gray-700'}`}>{slot.label}</span>
                      {isSelected && <span className="ml-auto text-qsOrange font-black">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!selectedDate || selectedTimes.length !== maxMeals}
              className={`w-full mt-8 py-4 rounded-xl font-black text-lg transition-all ${selectedDate && selectedTimes.length === maxMeals ? 'bg-qsDark text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}
            >
              Next: Choose Food →
            </button>
          </div>
        )}

        {/* ================= STEP 2: FOOD & PROTEIN ================= */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-4">Build your plate.</h2>
            
            {selectedTimes.map(timeId => {
              const slotDetails = timeSlots.find(t => t.id === timeId);
              const currentSelection = mealSelections[timeId] || { meal: "", protein: "" };
              
              return (
                <div key={timeId} className="bg-white p-5 rounded-2xl border border-qsOrange shadow-sm mb-6 relative">
                  <span className="absolute -top-3 left-4 bg-qsOrange text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    {slotDetails?.label.split(' ')[0]} Meal
                  </span>
                  
                  {/* Base Food Dropdown */}
                  <div className="mt-2 mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Main Dish</label>
                    <select 
                      value={currentSelection.meal}
                      onChange={(e) => updateMealSelection(timeId, "meal", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-qsDark font-bold focus:outline-none focus:ring-2 focus:ring-qsOrange"
                    >
                      <option value="">-- Select a Meal --</option>
                      {baseMenu.map((meal, idx) => (
                        <option key={idx} value={meal}>{meal}</option>
                      ))}
                    </select>
                  </div>

                  {/* 📚 TEACHING MOMENT 3: The strict "OR" Protein radio selection */}
                  {currentSelection.meal && (
                    <div className="animate-in fade-in zoom-in-95 duration-200">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                        <span className="text-red-500">*</span> Choose ONE Protein
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {proteins.map(protein => (
                          <label key={protein} className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer font-bold text-sm ${currentSelection.protein === protein ? 'bg-qsOrange text-white border-qsOrange' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                            <input 
                              type="radio" 
                              name={`protein-${timeId}`} 
                              value={protein}
                              checked={currentSelection.protein === protein}
                              onChange={(e) => updateMealSelection(timeId, "protein", e.target.value)}
                              className="hidden" // Hiding the actual radio button circle for a cleaner look
                            />
                            {protein}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button 
              onClick={() => setStep(3)}
              disabled={!canProceedToSummary}
              className={`w-full mt-4 py-4 rounded-xl font-black text-lg transition-all ${canProceedToSummary ? 'bg-qsDark text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}
            >
              Proceed to Summary →
            </button>
          </div>
        )}

        {/* ================= STEP 3: THE SUMMARY RECEIPT ================= */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-800 shadow-xl relative overflow-hidden">
              
              {/* Receipt Styling */}
              <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4">
                <span className="text-3xl mb-2 block">🧾</span>
                <h2 className="text-2xl font-black text-qsDark uppercase">ORDER SUMMARY</h2>
                <p className="text-xs text-gray-500 font-mono mt-1">ID: QS-{Math.floor(Math.random() * 100000)}</p>
              </div>

              <div className="space-y-4 font-mono text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-bold">PLAN:</span>
                  <span className="text-qsOrange font-black uppercase">{tab} {tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">START DATE:</span>
                  <span>{selectedDate}</span>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <span className="font-bold block mb-2">SCHEDULED SESSIONS:</span>
                  {selectedTimes.map(timeId => {
                    const tLabel = timeSlots.find(t => t.id === timeId)?.label.split(' ')[0];
                    const choice = mealSelections[timeId];
                    return (
                      <div key={timeId} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <span className="text-xs font-black text-gray-500 block mb-1">{tLabel?.toUpperCase()}</span>
                        <span className="font-bold text-qsDark">{choice.meal} + {choice.protein}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Receipt Edge */}
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiNGOEY5RkEiLz48L3N2Zz4=')]"></div>
            </div>

            {/* The Final Action */}
            <button 
              className="w-full mt-8 py-5 rounded-xl font-black text-lg bg-green-600 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              SUBSCRIBE NOW!!! 🚀
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest">
              Payment secured by QuickServe Admin
            </p>
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
