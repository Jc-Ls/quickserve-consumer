"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Define the structure of a single Delivery Day
type Selection = { timeId: string; meal: string; protein: string };
type DayConfig = { id: number; date: string; selections: Selection[] };

function ScheduleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "student";
  const tier = searchParams.get("tier") || "basic";

  const isCorporate = tab === "corporate";
  const maxMeals = isCorporate ? 1 : 2;
  
  const [cycle, setCycle] = useState<"weekly" | "monthly">("weekly");
  const durationDays = cycle === "weekly" ? 7 : 30;

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { id: "morning", label: "Breakfast (9-11:30 AM)", icon: "🌅" },
    { id: "afternoon", label: "Lunch (1-3:00 PM)", icon: "☀️" },
    { id: "evening", label: "Dinner (6-8:30 PM)", icon: "🌙" }
  ];

  const proteins = tier === "premium" ? ["Turkey", "Chicken", "Beef", "Fish"] : tier === "standard" ? ["Chicken", "Beef", "Fish"] : ["Beef", "Fish"]; 
  const baseMenu = ["Rice & Stew", "Jollof Rice", "Pasta", "Semo", "Amala", "Eba", "Beans & Bread", ...(tier !== "basic" ? ["Fried + Jollof", "Yam Porridge", "Yam + Egg"] : []), ...(tier === "premium" ? ["Basmati", "Poundo"] : [])];

  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  
  // 📚 TEACHING MOMENT 1: The Roster State
  // This holds the 7 or 30 days. We use an Isolated Editor to modify it.
  const [roster, setRoster] = useState<DayConfig[]>([]);
  
  // These control the "Mini-Screen" when a user clicks Edit on a specific day
  const [editingDayId, setEditingDayId] = useState<number | null>(null);
  const [tempDay, setTempDay] = useState<DayConfig | null>(null);

  const userName = "Jare"; // Mock User

  // --- ENGINE: GENERATE DEFAULT ROSTER ---
  const handleGenerateRoster = () => {
    let current = new Date(startDate);
    const newRoster: DayConfig[] = [];

    for (let i = 0; i < durationDays; i++) {
      // Auto-skip Saturdays (6) and Sundays (0) to save user time!
      while (current.getDay() === 0 || current.getDay() === 6) {
        current.setDate(current.getDate() + 1);
      }

      newRoster.push({
        id: i,
        date: current.toISOString().split('T')[0],
        selections: isCorporate 
          ? [{ timeId: "afternoon", meal: baseMenu[0], protein: proteins[0] }] 
          : [{ timeId: "morning", meal: baseMenu[0], protein: proteins[0] }, { timeId: "evening", meal: baseMenu[0], protein: proteins[0] }]
      });
      current.setDate(current.getDate() + 1);
    }
    setRoster(newRoster);
    setStep(2);
  };

  // --- ENGINE: DAY EDITOR FUNCTIONS ---
  const openDayEditor = (day: DayConfig) => {
    setTempDay(JSON.parse(JSON.stringify(day))); // Create a safe copy to edit
    setEditingDayId(day.id);
  };

  const saveDayEdit = () => {
    if (tempDay) {
      if (tempDay.selections.length === 0) {
        alert("You must select at least one meal time!");
        return;
      }
      // Update the master roster with the modified day
      setRoster(roster.map(d => d.id === editingDayId ? tempDay : d));
      setEditingDayId(null);
    }
  };

  // 📚 TEACHING MOMENT 2: Strict Golden Rule Enforcer
  // This lives INSIDE the Day Editor. It ensures you can't pick 2 times if you are Corporate.
  const toggleTempTimeSlot = (timeId: string) => {
    if (!tempDay) return;
    
    const exists = tempDay.selections.find(s => s.timeId === timeId);
    if (exists) {
      setTempDay({ ...tempDay, selections: tempDay.selections.filter(s => s.timeId !== timeId) });
    } else {
      if (tempDay.selections.length < maxMeals) {
        setTempDay({ ...tempDay, selections: [...tempDay.selections, { timeId, meal: baseMenu[0], protein: proteins[0] }] });
      } else {
        alert(`Golden Rule: ${tab.toUpperCase()} plan only allows ${maxMeals} meal(s) per day!`);
      }
    }
  };

  const updateTempSelection = (timeId: string, field: "meal" | "protein", value: string) => {
    if (!tempDay) return;
    setTempDay({
      ...tempDay,
      selections: tempDay.selections.map(s => s.timeId === timeId ? { ...s, [field]: value } : s)
    });
  };

  const getFinalPrice = () => {
    if (tier === "basic") return isCorporate ? (cycle === "weekly" ? "10,000" : "40,000") : (cycle === "weekly" ? "12,500" : "45,000");
    if (tier === "standard") return isCorporate ? (cycle === "weekly" ? "15,000" : "60,000") : (cycle === "weekly" ? "18,000" : "70,000");
    return isCorporate ? (cycle === "weekly" ? "17,500" : "70,000") : (cycle === "weekly" ? "25,000" : "100,000");
  };

  const handleDownloadPDF = () => window.print();

  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-28 shadow-2xl">
      
      {/* HEADER */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm print:hidden">
        <button onClick={() => step > 1 && editingDayId === null ? setStep(step - 1) : editingDayId !== null ? setEditingDayId(null) : window.history.back()} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90">
          <span className="text-xl">←</span>
        </button>
        <div>
          <h1 className="font-black text-lg text-qsDark uppercase">SCHEDULE MEAL</h1>
          <p className="text-xs text-qsOrange font-bold">{editingDayId !== null ? "Customizing Day" : `Step ${step} of 3`}</p>
        </div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* ================= STEP 1: INITIALIZE ================= */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-4">Set your subscription timeline.</h2>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Billing Cycle</label>
              <div className="flex bg-gray-100 rounded-xl p-1 relative">
                <button onClick={() => setCycle("weekly")} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${cycle === "weekly" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}>WEEKLY (7 Days)</button>
                <button onClick={() => setCycle("monthly")} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${cycle === "monthly" ? 'bg-white text-qsDark shadow-sm' : 'text-gray-500'}`}>MONTHLY (30 Days)</button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Start Date</label>
              <input type="date" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-qsDark font-bold focus:outline-none focus:ring-2 focus:ring-qsOrange" />
              <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase leading-relaxed">
                We will automatically generate {durationDays} consecutive delivery days (skipping weekends). You can modify dates, times, and meals on the next screen!
              </p>
            </div>

            <button onClick={handleGenerateRoster} disabled={!startDate} className={`w-full mt-4 py-4 rounded-xl font-black text-lg transition-all ${startDate ? 'bg-qsDark text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}>
              Auto-Generate Roster →
            </button>
          </div>
        )}

        {/* ================= STEP 2: ROSTER VIEW & DAY EDITOR ================= */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* VIEW A: THE MASTER ROSTER LIST */}
            {editingDayId === null ? (
              <>
                <h2 className="text-xl font-black text-qsDark mb-2">Your {durationDays}-Day Delivery Roster.</h2>
                <p className="text-xs text-gray-500 mb-6">Review your schedule. Tap "Customize" to change dates, times, or food for any specific day.</p>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pb-4 pr-1">
                  {roster.map((day, idx) => (
                    <div key={day.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                        <span className="font-black text-qsDark">{new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        <button onClick={() => openDayEditor(day)} className="text-xs bg-orange-50 text-qsOrange font-black px-3 py-1 rounded-lg border border-orange-100">
                          Customize ⚙️
                        </button>
                      </div>
                      <div className="space-y-2">
                        {day.selections.map(sel => (
                          <div key={sel.timeId} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                            <span className="font-bold text-gray-700">{sel.meal} <span className="text-qsOrange text-xs">+ {sel.protein}</span></span>
                            <span className="text-[10px] font-black text-gray-500 uppercase">{sel.timeId}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep(3)} className="w-full mt-6 py-4 rounded-xl font-black text-lg bg-qsDark text-white active:scale-95 transition-transform">
                  Approve Roster & Proceed →
                </button>
              </>
            ) : 
            
            /* VIEW B: THE ISOLATED DAY EDITOR (Mini-Screen) */
            tempDay && (
              <div className="animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-black text-qsDark mb-4">Editing Day {roster.findIndex(d => d.id === editingDayId) + 1}</h2>
                
                {/* Edit Date (Allows Skipping Days!) */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Delivery Date</label>
                  <input type="date" min={today} value={tempDay.date} onChange={(e) => setTempDay({...tempDay, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-qsDark font-bold focus:outline-none" />
                  <p className="text-[10px] text-gray-400 mt-2">Traveling? Change this to a future date to push this meal forward.</p>
                </div>

                {/* Edit Time Slots */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Time Slots (Max {maxMeals})</label>
                  <div className="flex gap-2">
                    {timeSlots.map(slot => {
                      const isSelected = tempDay.selections.some(s => s.timeId === slot.id);
                      return (
                        <button key={slot.id} onClick={() => toggleTempTimeSlot(slot.id)} className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${isSelected ? 'bg-orange-50 border-qsOrange text-qsOrange' : 'bg-white border-gray-200 text-gray-500'}`}>
                          {slot.icon} {slot.id.charAt(0).toUpperCase() + slot.id.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Edit Food per Selected Time */}
                {tempDay.selections.map(sel => (
                  <div key={sel.timeId} className="bg-white p-5 rounded-xl border-l-4 border-qsOrange shadow-sm mb-4">
                    <span className="text-xs font-black text-qsOrange uppercase tracking-widest mb-3 block">{sel.timeId} MEAL</span>
                    
                    <select value={sel.meal} onChange={(e) => updateTempSelection(sel.timeId, "meal", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold mb-3">
                      {baseMenu.map((meal, idx) => <option key={idx} value={meal}>{meal}</option>)}
                    </select>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {proteins.map(p => (
                        <button key={p} onClick={() => updateTempSelection(sel.timeId, "protein", p)} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap border ${sel.protein === p ? 'bg-qsDark text-white border-qsDark' : 'bg-white text-gray-600 border-gray-200'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={saveDayEdit} className="w-full mt-4 py-4 rounded-xl font-black text-lg bg-green-600 text-white shadow-lg active:scale-95">
                  Save Changes ✔️
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: THE PREMIUM INVOICE RECEIPT ================= */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-6 print:hidden">
              <h2 className="text-2xl font-black text-qsDark">Dear {userName},</h2>
              <p className="text-sm text-gray-600">Your Custom Delivery Roster is secured. Review your final invoice.</p>
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
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Deliveries</span>
                    <span className="font-bold text-qsOrange">{durationDays} Days</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Customized Roster Log</span>
                  {roster.map(day => (
                    <div key={day.id} className="border-b border-gray-100 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      {day.selections.map(sel => (
                        <div key={sel.timeId} className="flex justify-between items-center pl-2 border-l-2 border-qsOrange mb-1">
                          <span className="font-bold text-qsDark text-xs">{sel.meal} <span className="text-gray-500">+ {sel.protein}</span></span>
                          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold uppercase">{sel.timeId}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-1"><span className="font-bold text-gray-600">Subtotal</span><span className="font-bold">Included</span></div>
                  <div className="flex justify-between items-center mb-1"><span className="font-bold text-gray-600">Delivery Fee</span><span className="font-bold text-green-600">Free</span></div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="text-lg font-black text-qsDark">TOTAL AMOUNT</span>
                    <span className="text-xl font-black text-qsOrange">₦{getFinalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==')] mb-6 shadow-xl print:hidden"></div>

            <div className="space-y-3 print:hidden">
              <button onClick={handleDownloadPDF} className="w-full py-4 rounded-xl font-bold text-qsDark bg-gray-200 active:scale-95 transition-transform flex items-center justify-center gap-2">📄 Download Invoice PDF</button>
              <button className="w-full py-5 rounded-xl font-black text-lg bg-green-600 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)] active:scale-95 transition-transform">SUBSCRIBE NOW!!! 🚀</button>
              <p className="text-center text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Payment secured by QuickServe Admin</p>
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
