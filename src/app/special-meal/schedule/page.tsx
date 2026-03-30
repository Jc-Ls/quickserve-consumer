
"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Selection = { timeId: string; meal: string; protein: string };
type DayConfig = { id: number; date: string; selections: Selection[] };

function ScheduleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "student";
  const tier = searchParams.get("tier") || "basic";

  const isCorporate = tab === "corporate";
  const maxMealsPerDay = isCorporate ? 1 : 2;
  
  const [cycle, setCycle] = useState<"weekly" | "monthly">("weekly");
  const maxDays = cycle === "weekly" ? 7 : 30;

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { id: "morning", label: "Breakfast (9-11:30 AM)", icon: "🌅" },
    { id: "afternoon", label: "Lunch (1-3:00 PM)", icon: "☀️" },
    { id: "evening", label: "Dinner (6-8:30 PM)", icon: "🌙" }
  ];

  const proteins = tier === "premium" ? ["Turkey", "Chicken", "Beef", "Fish"] : tier === "standard" ? ["Chicken", "Beef", "Fish"] : ["Beef", "Fish"]; 
  const baseMenu = ["Rice & Stew", "Jollof Rice", "Pasta", "Semo", "Amala", "Eba", "Beans & Bread", ...(tier !== "basic" ? ["Fried + Jollof", "Yam Porridge", "Yam + Egg"] : []), ...(tier === "premium" ? ["Basmati", "Poundo"] : [])];

  const [step, setStep] = useState(1);
  const [roster, setRoster] = useState<DayConfig[]>([]);
  const [tempDay, setTempDay] = useState<DayConfig | null>(null);

  const userName = "Jare";

  const autoFillRemainingDays = () => {
    let current = new Date();
    if (roster.length > 0) {
      const maxDateStr = roster.reduce((max, day) => day.date > max ? day.date : max, roster[0].date);
      current = new Date(maxDateStr);
    }
    current.setDate(current.getDate() + 1);

    const newRoster = [...roster];
    while (newRoster.length < maxDays) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        const dateStr = current.toISOString().split('T')[0];
        if (!newRoster.find(d => d.date === dateStr)) {
          newRoster.push({
            id: Date.now() + Math.random(),
            date: dateStr,
            selections: isCorporate ? [{ timeId: "afternoon", meal: baseMenu[0], protein: proteins[0] }] : [{ timeId: "morning", meal: baseMenu[0], protein: proteins[0] }, { timeId: "evening", meal: baseMenu[0], protein: proteins[0] }]
          });
        }
      }
      current.setDate(current.getDate() + 1);
    }
    setRoster(newRoster.sort((a,b) => a.date.localeCompare(b.date)));
  };

  const openNewDayEditor = () => setTempDay({ id: Date.now(), date: "", selections: [] });
  const openEditExistingDay = (day: DayConfig) => setTempDay(JSON.parse(JSON.stringify(day)));

  const saveDayEdit = () => {
    if (!tempDay || !tempDay.date) { alert("Please select a date!"); return; }
    if (tempDay.selections.length === 0) { alert(`You must select at least one time slot!`); return; }
    
    const existingDateIndex = roster.findIndex(d => d.date === tempDay.date && d.id !== tempDay.id);
    if (existingDateIndex !== -1) {
      alert("You already have a delivery scheduled for this date.");
      return;
    }

    const existingIndex = roster.findIndex(d => d.id === tempDay.id);
    let updatedRoster = [...roster];
    
    if (existingIndex !== -1) updatedRoster[existingIndex] = tempDay;
    else updatedRoster.push(tempDay);
    
    setRoster(updatedRoster.sort((a,b) => a.date.localeCompare(b.date)));
    setTempDay(null);
  };

  const toggleTempTimeSlot = (timeId: string) => {
    if (!tempDay) return;
    const exists = tempDay.selections.find(s => s.timeId === timeId);
    if (exists) {
      setTempDay({ ...tempDay, selections: tempDay.selections.filter(s => s.timeId !== timeId) });
    } else {
      if (tempDay.selections.length < maxMealsPerDay) {
        setTempDay({ ...tempDay, selections: [...tempDay.selections, { timeId, meal: baseMenu[0], protein: proteins[0] }] });
      } else {
        alert(`Golden Rule: Plan allows max ${maxMealsPerDay} meal(s) per day!`);
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

  const removeDay = (id: number) => setRoster(roster.filter(d => d.id !== id));

  const getFinalPrice = () => {
    if (tier === "basic") return isCorporate ? (cycle === "weekly" ? "10,000" : "40,000") : (cycle === "weekly" ? "12,500" : "45,000");
    if (tier === "standard") return isCorporate ? (cycle === "weekly" ? "15,000" : "60,000") : (cycle === "weekly" ? "18,000" : "70,000");
    return isCorporate ? (cycle === "weekly" ? "17,500" : "70,000") : (cycle === "weekly" ? "25,000" : "100,000");
  };
  return (
    <main className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative pb-28 shadow-2xl">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm print:hidden">
        <button onClick={() => step > 1 && !tempDay ? setStep(step - 1) : tempDay ? setTempDay(null) : window.history.back()} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mr-4 active:scale-90"><span className="text-xl">←</span></button>
        <div>
          <h1 className="font-black text-lg text-qsDark uppercase">SCHEDULE MEAL</h1>
          <p className="text-xs text-qsOrange font-bold">{tempDay ? "Customizing Day" : `Step ${step} of 3`}</p>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black text-qsDark mb-4">Choose your Meal Credits.</h2>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Select Billing Cycle</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setCycle("weekly")} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${cycle === "weekly" ? 'border-qsOrange bg-orange-50 text-qsOrange' : 'border-gray-100 text-gray-500'}`}><span className="text-2xl font-black mb-1">7</span><span className="text-[10px] uppercase font-bold tracking-widest">Delivery Days</span></button>
                <button onClick={() => setCycle("monthly")} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${cycle === "monthly" ? 'border-qsOrange bg-orange-50 text-qsOrange' : 'border-gray-100 text-gray-500'}`}><span className="text-2xl font-black mb-1">30</span><span className="text-[10px] uppercase font-bold tracking-widest">Delivery Days</span></button>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-4 py-4 rounded-xl font-black text-lg bg-qsDark text-white active:scale-95 transition-transform">Next: Pick Delivery Dates →</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {!tempDay ? (
              <>
                <div className="bg-qsDark text-white p-5 rounded-2xl shadow-lg mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Days Scheduled</h2>
                    <p className="text-3xl font-black"><span className={roster.length === maxDays ? "text-green-400" : "text-qsOrange"}>{roster.length}</span> <span className="text-lg text-gray-400"> / {maxDays}</span></p>
                  </div>
                  {roster.length < maxDays && (
                    <button onClick={autoFillRemainingDays} className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors border border-white/20">⚡ Quick Fill</button>
                  )}
                </div>
                
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pb-4 pr-1">
                  {roster.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl"><span className="text-4xl block mb-2">📅</span><p className="text-gray-500 font-bold">Your schedule is empty.</p></div>
                  )}
                  {roster.map((day) => (
                    <div key={day.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                        <span className="font-black text-qsDark">{new Date(day.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        <div className="flex gap-2">
                          <button onClick={() => openEditExistingDay(day)} className="text-xs bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-lg">Edit</button>
                          <button onClick={() => removeDay(day.id)} className="text-xs bg-red-50 text-red-500 font-bold px-2 py-1 rounded-lg">✕</button>
                        </div>
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

                {roster.length < maxDays ? (
                  <button onClick={openNewDayEditor} className="w-full mt-4 py-4 rounded-xl font-black text-qsOrange bg-orange-50 border-2 border-dashed border-qsOrange active:scale-95 transition-transform flex items-center justify-center gap-2"><span className="text-2xl leading-none">+</span> Add a Delivery Day</button>
                ) : (
                  <button onClick={() => setStep(3)} className="w-full mt-6 py-4 rounded-xl font-black text-lg bg-green-600 text-white shadow-[0_10px_20px_rgba(22,163,74,0.3)] active:scale-95 transition-transform">Proceed to Checkout →</button>
                )}
              </>
            ) : (
              <div className="animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-black text-qsDark mb-4">Customize Delivery Day</h2>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Any Future Date</label>
                  <input type="date" min={today} value={tempDay.date} onChange={(e) => setTempDay({...tempDay, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-qsDark font-bold focus:outline-none" />
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Time Slots (Max {maxMealsPerDay})</label>
                  <div className="flex gap-2">
                    {timeSlots.map(slot => {
                      const isSelected = tempDay.selections.some(s => s.timeId === slot.id);
                      return <button key={slot.id} onClick={() => toggleTempTimeSlot(slot.id)} className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${isSelected ? 'bg-orange-50 border-qsOrange text-qsOrange' : 'bg-white border-gray-200 text-gray-500'}`}>{slot.icon} {slot.id.charAt(0).toUpperCase() + slot.id.slice(1)}</button>;
                    })}
                  </div>
                </div>
                {tempDay.selections.map(sel => (
                  <div key={sel.timeId} className="bg-white p-5 rounded-xl border-l-4 border-qsOrange shadow-sm mb-4">
                    <span className="text-xs font-black text-qsOrange uppercase tracking-widest mb-3 block">{sel.timeId} MEAL</span>
                    <select value={sel.meal} onChange={(e) => updateTempSelection(sel.timeId, "meal", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold mb-3"><option value="">-- Choose Meal --</option>{baseMenu.map((meal, idx) => <option key={idx} value={meal}>{meal}</option>)}</select>
                    {sel.meal && <div className="flex gap-2 overflow-x-auto pb-1">{proteins.map(p => <button key={p} onClick={() => updateTempSelection(sel.timeId, "protein", p)} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap border ${sel.protein === p ? 'bg-qsDark text-white border-qsDark' : 'bg-white text-gray-600 border-gray-200'}`}>{p}</button>)}</div>}
                  </div>
                ))}
                <button onClick={saveDayEdit} className="w-full mt-4 py-4 rounded-xl font-black text-lg bg-green-600 text-white shadow-lg active:scale-95">Save Delivery Day ✔️</button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-6 print:hidden">
              <h2 className="text-2xl font-black text-qsDark">Dear {userName},</h2>
              <p className="text-sm text-gray-600">Your Custom Delivery Roster is secured. Review your final invoice.</p>
            </div>
            <div className="bg-white p-6 rounded-t-2xl border-x-2 border-t-2 border-gray-200 shadow-xl relative" id="receipt-card">
              <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-4">
                <div><h3 className="text-2xl font-black text-qsOrange tracking-tighter uppercase">QUICKSERVE</h3><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Special Meal Invoice</p></div>
                <div className="text-right"><p className="text-xs text-gray-500 font-bold uppercase">Invoice ID</p><p className="text-sm font-mono font-black text-qsDark">QS-{Math.floor(Math.random() * 1000000)}</p></div>
              </div>
              <div className="space-y-4 text-sm text-gray-800">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Plan Name</span><span className="font-black uppercase text-qsDark">{tab} {tier}</span></div>
                  <div className="flex justify-between"><span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Deliveries</span><span className="font-bold text-qsOrange">{maxDays} Days Scheduled</span></div>
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
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200"><span className="text-lg font-black text-qsDark">TOTAL AMOUNT</span><span className="text-xl font-black text-qsOrange">₦{getFinalPrice()}</span></div>
                </div>
              </div>
            </div>
            <div className="w-full border-b-4 border-dashed border-gray-300 mb-6 print:hidden"></div>
            <div className="space-y-3 print:hidden">
              <button onClick={() => window.print()} className="w-full py-4 rounded-xl font-bold text-qsDark bg-gray-200 active:scale-95 transition-transform flex items-center justify-center gap-2">📄 Download Invoice PDF</button>
              <button className="w-full py-5 rounded-xl font-black text-lg bg-green-600 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)] active:scale-95 transition-transform">SUBSCRIBE NOW!!! 🚀</button>
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
