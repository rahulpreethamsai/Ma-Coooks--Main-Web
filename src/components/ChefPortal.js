'use client';
import { useState } from 'react';

export default function ChefPortal({ Toast, navigate }) {
  // Form states
  const [chefName, setChefName] = useState('');
  const [chefPhone, setChefPhone] = useState('');
  const [chefEmail, setChefEmail] = useState('');
  const [kitchenName, setKitchenName] = useState('');
  const [kitchenAddress, setKitchenAddress] = useState('');
  const [corridor, setCorridor] = useState('Gachibowli');
  const [dailyCapacity, setDailyCapacity] = useState('15');

  // KYC Verification Form States
  const [fssai, setFssai] = useState('');
  const [pan, setPan] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [upiId, setUpiId] = useState('');
  const [gstin, setGstin] = useState('');

  // Food safety quiz states
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');

  // Submission States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    if (chefName.trim().length < 2) {
      Toast.show("Please enter a valid full name.", "error");
      return;
    }
    if (chefPhone.trim().length < 10) {
      Toast.show("Please enter a valid 10-digit phone number.", "error");
      return;
    }
    if (fssai.length !== 14 || isNaN(fssai)) {
      Toast.show("FSSAI Registration/License number must be 14 digits.", "error");
      return;
    }
    if (pan.length !== 10) {
      Toast.show("PAN Card must be exactly 10 characters.", "error");
      return;
    }
    if (bankAccount.length < 9 || bankAccount.length > 18 || isNaN(bankAccount)) {
      Toast.show("Bank Account Number must be between 9 and 18 digits.", "error");
      return;
    }
    if (bankIfsc.length !== 11) {
      Toast.show("Bank IFSC Code must be a valid 11-character code.", "error");
      return;
    }
    if (!upiId.includes('@')) {
      Toast.show("UPI ID must be a valid format (e.g. name@okhdfcbank).", "error");
      return;
    }
    if (kitchenAddress.length < 15) {
      Toast.show("Please enter a full, valid address (minimum 15 characters).", "error");
      return;
    }

    // Verify qualification test answers
    if (q1 !== 'A') {
      Toast.show("Safety Test Q1 answer is incorrect. Safe storage is < 5°C (refrigerated) or > 60°C (hot holding).", "error");
      return;
    }
    if (q2 !== 'B') {
      Toast.show("Safety Test Q2 answer is incorrect. Prep surfaces must be sanitized before and after every batch.", "error");
      return;
    }
    if (q3 !== 'A') {
      Toast.show("Safety Test Q3 answer is incorrect. Food-grade, temperature-insulated containers are required.", "error");
      return;
    }

    // Compile the message for submission
    const msg = `Hi RuchiRush team! I would like to onboard as a home chef:

--- CHEF & KITCHEN DETAILS ---
Full Name: ${chefName}
Phone Number: ${chefPhone}
Email Address: ${chefEmail}
Kitchen Name: ${kitchenName}
Corridor: ${corridor}, Hyderabad
Street Address: ${kitchenAddress}
Daily Meal Capacity: ${dailyCapacity} meals

--- KYC & REGULATORY ---
FSSAI License/Reg No: ${fssai}
PAN Card Number: ${pan}
GSTIN: ${gstin || 'N/A (Exempt)'}

--- SETTLEMENTS & BANKING ---
Bank Account No: ${bankAccount}
Bank IFSC Code: ${bankIfsc}
UPI ID: ${upiId}

--- SAFETY QUALIFICATION ---
Food Safety Quiz: Completed & Passed (A, B, A)`;

    setFormattedMessage(msg);
    setShowSuccessModal(true);
    Toast.show("Application details verified! Choose how to submit.", "success");
  };

  const handleWhatsAppSubmit = () => {
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");
  };

  const handleEmailSubmit = () => {
    const mailtoUrl = `mailto:hello@ruchirush.com?subject=Home Chef Application - ${encodeURIComponent(chefName)}&body=${encodeURIComponent(formattedMessage)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div id="chef-portal-view" className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.85) 0%, rgba(253, 245, 237, 0.95) 100%)">
      
      {/* Chef Portal Top Bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('landing')}
            className="flex items-center gap-1 text-primary hover:opacity-80 font-bold text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back to Home</span>
          </button>
          <div className="h-4 w-[1px] bg-stone-300"></div>
          <span className="font-h2 text-lg font-bold text-stone-900">RuchiRush Chef Onboarding</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <section id="chef-verification-panel" className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200 animate-fade-in">
          
          <div className="text-center mb-8 space-y-2">
            <span className="text-5xl block">👩‍🍳</span>
            <h1 className="font-h1 text-2xl sm:text-3xl font-bold text-primary">
              Become a Verified RuchiRush Home Chef
            </h1>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Keep 90% of your earnings (10% RuchiRush commission). Set your own dishes, prices, and daily capacity.
            </p>
          </div>

          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            
            {/* Core Chef Details */}
            <div className="space-y-4">
              <h3 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">
                1. Kitchen & Contact Information
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Lakshmi Devi" 
                    value={chefName} 
                    onChange={e => setChefName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    WhatsApp Phone Number (10 Digits)
                  </label>
                  <input 
                    type="tel" 
                    required 
                    maxLength="10"
                    placeholder="9908574741" 
                    value={chefPhone} 
                    onChange={e => setChefPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    value={chefEmail} 
                    onChange={e => setChefEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Kitchen / Brand Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Lakshmi's Home Kitchen" 
                    value={kitchenName} 
                    onChange={e => setKitchenName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Hyderabad Corridor
                  </label>
                  <select
                    value={corridor}
                    onChange={e => setCorridor(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                  >
                    <option value="Gachibowli">Gachibowli</option>
                    <option value="Kondapur">Kondapur</option>
                    <option value="Madhapur">Madhapur</option>
                    <option value="Hi-Tech City">Hi-Tech City</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Daily Capacity (Meals / Day)
                  </label>
                  <select
                    value={dailyCapacity}
                    onChange={e => setDailyCapacity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                  >
                    <option value="10">10 meals / day</option>
                    <option value="15">15 meals / day (Recommended)</option>
                    <option value="20">20 meals / day</option>
                    <option value="25">25 meals / day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Full Kitchen Street Address (for courier pickups)
                </label>
                <textarea 
                  required 
                  rows="2" 
                  placeholder="Apartment/House No, Street, Landmark, Area, Hyderabad" 
                  value={kitchenAddress} 
                  onChange={e => setKitchenAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                />
              </div>
            </div>

            {/* KYC & Identity verification */}
            <div className="space-y-4 pt-2">
              <h3 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">
                2. Regulatory & Banking Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    FSSAI Registration/License No (14 Digits)
                  </label>
                  <input 
                    type="text" 
                    required 
                    maxLength="14" 
                    placeholder="12345678901234" 
                    value={fssai} 
                    onChange={e => setFssai(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    PAN Card Number
                  </label>
                  <input 
                    type="text" 
                    required 
                    maxLength="10" 
                    placeholder="ABCDE1234F" 
                    value={pan} 
                    onChange={e => setPan(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Payout Bank Account Number
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="123456789012" 
                    value={bankAccount} 
                    onChange={e => setBankAccount(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Bank IFSC Code
                  </label>
                  <input 
                    type="text" 
                    required 
                    maxLength="11" 
                    placeholder="SBIN0001234" 
                    value={bankIfsc} 
                    onChange={e => setBankIfsc(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Settlement UPI ID
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="name@okaxis" 
                    value={upiId} 
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    GSTIN (Optional)
                  </label>
                  <input 
                    type="text" 
                    maxLength="15" 
                    placeholder="36ABCDE1234F1Z5" 
                    value={gstin} 
                    onChange={e => setGstin(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Food Safety & Hygiene Quiz */}
            <div className="space-y-4 pt-2">
              <h3 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">
                3. Food Safety Qualification
              </h3>
              <p className="text-[11px] text-stone-500">
                Answer these 3 safety questions to verify food-handling compliance:
              </p>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  1. What is the correct safe temperature range for prepared meals?
                </label>
                <select 
                  required 
                  value={q1} 
                  onChange={e => setQ1(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Under 5°C (Refrigerated) or above 60°C (Hot holding)</option>
                  <option value="B">Room temperature (20°C - 25°C) for all foods</option>
                  <option value="C">Keeping food warm at 40°C in open containers</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  2. How frequently must preparation surfaces and cutting boards be sanitized?
                </label>
                <select 
                  required 
                  value={q2} 
                  onChange={e => setQ2(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Once at the end of every week</option>
                  <option value="B">Before and after preparing every batch of food</option>
                  <option value="C">Only when food spills or stains are visible</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  3. What packaging is required for RuchiRush courier delivery?
                </label>
                <select 
                  required 
                  value={q3} 
                  onChange={e => setQ3(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Food-grade, leak-proof, and temperature-insulated containers</option>
                  <option value="B">Standard thin plastic carry bags</option>
                  <option value="C">Open unsealed paper covers</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors shadow-lg cursor-pointer mt-4"
            >
              Verify Application & Proceed
            </button>
          </form>
        </section>
      </div>

      {/* Submission Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center space-y-4 z-10 animate-fade-in">
            <span className="text-5xl block">🎉</span>
            <h3 className="font-h1 text-2xl font-bold text-primary">Onboarding Ready!</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your kitchen details and safety answers have been compiled. Send them directly to the RuchiRush team to initiate your kitchen verification:
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Submit via WhatsApp
              </button>
              
              <button 
                onClick={handleEmailSubmit}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Submit via Email (hello@ruchirush.com)
              </button>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-semibold underline cursor-pointer"
              >
                Edit Form Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
