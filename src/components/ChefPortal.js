'use client';
import { useState } from 'react';

export default function ChefPortal({ Toast, navigate }) {
  // Form states
  const [chefName, setChefName] = useState('');
  const [chefPhone, setChefPhone] = useState('');
  const [chefEmail, setChefEmail] = useState('');
  const [kitchenName, setKitchenName] = useState('');
  const [kitchenAddress, setKitchenAddress] = useState('');

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
      Toast.show("FSSAI License must be exactly 14 digits.", "error");
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
      Toast.show("UPI ID must be a valid format (e.g. name@okaxis).", "error");
      return;
    }
    if (kitchenAddress.length < 15) {
      Toast.show("Please enter a full, valid address (minimum 15 characters).", "error");
      return;
    }

    // Verify qualification test answers
    if (q1 !== 'A') {
      Toast.show("Safety Test Q1 answer is incorrect. Minimum hot holding temperature is 60°C.", "error");
      return;
    }
    if (q2 !== 'B') {
      Toast.show("Safety Test Q2 answer is incorrect. Prep surfaces must be sanitized before and after every batch.", "error");
      return;
    }
    if (q3 !== 'A') {
      Toast.show("Safety Test Q3 answer is incorrect. Eco-friendly insulated packaging is required.", "error");
      return;
    }

    // Compile the message for submission
    const msg = `Hi Ruchi Rush team! I would like to onboard as a home chef:

--- CHEF DETAILS ---
Full Name: ${chefName}
Phone Number: ${chefPhone}
Email Address: ${chefEmail}
Kitchen Name: ${kitchenName}
Street Address: ${kitchenAddress}

--- KYC & REGULATORY ---
FSSAI License No: ${fssai}
PAN Card Number: ${pan}
GSTIN: ${gstin || 'N/A'}

--- SETTLEMENTS & BANKING ---
Bank Account No: ${bankAccount}
Bank IFSC Code: ${bankIfsc}
UPI ID: ${upiId}

--- SAFETY QUALIFICATION ---
Food Safety Quiz: Completed & Passed (A, B, A)`;

    setFormattedMessage(msg);
    setShowSuccessModal(true);
    Toast.show("Form validated successfully!", "success");
  };

  const handleWhatsAppSubmit = () => {
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");
  };

  const handleEmailSubmit = () => {
    const mailtoUrl = `mailto:chrahulpreethamsai@gmail.com?subject=Chef Onboarding Application - ${encodeURIComponent(chefName)}&body=${encodeURIComponent(formattedMessage)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div id="chef-portal-view" className="min-h-screen cook pt-28 pb-12 px-4 sm:px-6">
      
      {/* Chef Portal Header */}
      <div className="max-w-3xl mx-auto flex justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('landing')}
            className="flex items-center gap-1 text-primary hover:opacity-80 font-semibold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Home</span>
          </button>
          <div className="h-6 w-[1px] bg-stone-300"></div>
          <span className="font-h2 text-xl font-bold text-black">Join as Chef</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <section id="chef-verification-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in">
          <div className="text-center mb-8">
            <span className="text-5xl block animate-bounce">👨‍🍳</span>
            <h3 className="font-h2 text-2xl font-bold text-primary mt-2">Kitchen Verification & Onboarding</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              To ensure safety and quality, all chefs must complete this onboarding form. Your details will be sent directly to our team for quick verification.
            </p>
          </div>

          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            
            {/* Core Chef Details */}
            <div className="space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1">1. Contact & Kitchen Info</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={chefName} 
                    onChange={e => setChefName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Phone Number (10 Digits)</label>
                  <input 
                    type="tel" 
                    required 
                    maxLength="10"
                    placeholder="9908574741" 
                    value={chefPhone} 
                    onChange={e => setChefPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    value={chefEmail} 
                    onChange={e => setChefEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Kitchen / Brand Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Priya's Godavari Kitchen" 
                    value={kitchenName} 
                    onChange={e => setKitchenName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Kitchen Street Address</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Gachibowli Street No 2, Near Police Station, Hyderabad" 
                  value={kitchenAddress} 
                  onChange={e => setKitchenAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                />
              </div>
            </div>

            {/* KYC & Identity verification */}
            <div className="space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1">2. Regulatory & KYC Details</h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">FSSAI License No (14 Digits)</label>
                  <input 
                    type="text" 
                    required 
                    maxLength="14" 
                    placeholder="12345678901234" 
                    value={fssai} 
                    onChange={e => setFssai(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">PAN Card Number</label>
                  <input 
                    type="text" 
                    required 
                    maxLength="10" 
                    placeholder="ABCDE1234F" 
                    value={pan} 
                    onChange={e => setPan(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Bank Account Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="123456789012" 
                    value={bankAccount} 
                    onChange={e => setBankAccount(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Bank IFSC Code</label>
                  <input 
                    type="text" 
                    required 
                    maxLength="11" 
                    placeholder="SBIN0001234" 
                    value={bankIfsc} 
                    onChange={e => setBankIfsc(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Settlement UPI ID</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="chefname@okaxis" 
                    value={upiId} 
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">GSTIN (Optional)</label>
                  <input 
                    type="text" 
                    maxLength="15" 
                    placeholder="36ABCDE1234F1Z5" 
                    value={gstin} 
                    onChange={e => setGstin(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>
            </div>

            {/* Food Safety & Hygiene Quiz */}
            <div className="border-t border-stone-200 pt-6 mt-6 space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1">3. Food Safety Qualification Test</h4>
              <p className="text-[11px] text-stone-500">Answer these safety questions correctly to qualify as a verified home chef on Ruchi Rush.</p>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-700">1. What is the correct temperature range for food storage?</label>
                <select 
                  required 
                  value={q1} 
                  onChange={e => setQ1(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Under 5°C (Refrigerated) or above 60°C (Hot holding)</option>
                  <option value="B">Room temperature (20°C - 25°C) for all foods</option>
                  <option value="C">Keeping food warm at 40°C in open containers</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-700">2. How often must kitchen prep surfaces be cleaned and sanitized?</label>
                <select 
                  required 
                  value={q2} 
                  onChange={e => setQ2(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none  text-stone-900"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Once at the end of every week</option>
                  <option value="B">Before and after preparing every batch of food</option>
                  <option value="C">Only when food spills or stains are visible</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-700">3. Which packaging materials are required for delivery orders?</label>
                <select 
                  required 
                  value={q3} 
                  onChange={e => setQ3(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer text-stone-900"
                >
                  <option value="">-- Select Answer --</option>
                  <option value="A">Leak-proof, food-grade, and temperature-insulated containers</option>
                  <option value="B">Standard plastic bags or aluminum wrap</option>
                  <option value="C">Open boxes to allow steam to escape</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
            >
              Verify & Submit Application
            </button>
          </form>
        </section>
      </div>

      {/* Submission Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-primary/15 text-center space-y-5 z-10">
            <span className="text-5xl block animate-bounce">🎉</span>
            <h3 className="font-h1 text-2xl font-bold text-primary">Onboarding Form Ready!</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Your onboarding information has been successfully compiled and validated. Choose how you would like to submit it to the Ruchi Rush team:
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.518 2.266 2.27 3.507 5.289 3.507 8.491-.005 6.644-5.342 11.982-11.958 11.982-2.006-.001-3.97-.504-5.717-1.464L0 24zm6.076-4.137l.376.223c1.559.926 3.486 1.415 5.549 1.416 5.706 0 10.347-4.64 10.353-10.353.003-2.767-1.077-5.367-3.04-7.332-1.963-1.964-4.567-3.045-7.34-3.045-5.711 0-10.354 4.643-10.36 10.357-.001 2.052.54 4.053 1.564 5.79l.244.417-.999 3.648 3.737-.98l-.164.264z"/>
                </svg>
                Submit via WhatsApp
              </button>
              
              <button 
                onClick={handleEmailSubmit}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Submit via Email
              </button>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-semibold underline cursor-pointer"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
