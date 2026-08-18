'use client';

export default function LegalModal({ isOpen, policyType, onClose }) {
  if (!isOpen) return null;

  const legalTexts = {
    about: {
      title: "About RuchiRush",
      body: `
        <p class="font-semibold text-stone-900 text-base mb-2">Connecting Neighbors Through Good Home Cooking</p>
        <p><strong>RuchiRush</strong> is a Hyderabad-focused marketplace connecting local customers with verified neighborhood home kitchens.</p>
        <p class="mt-3">We are not trying to become another restaurant aggregator. Our mission is to make good home-cooked food easy to discover, try, trust, and subscribe to for regular weekday meals.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">Our 4-Pillar Quality Process:</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Identity & KYC Validation</strong>: Verification of all onboarding home chefs.</li>
          <li><strong>Kitchen Hygiene Auditing</strong>: Assessment of preparation sanitation and clean storage.</li>
          <li><strong>FSSAI Registration Verification</strong>: Ensuring compliance with Indian food safety regulations.</li>
          <li><strong>Small-Batch Cooking Limits</strong>: Enforced daily capacity (10–20 meals) so every dish retains true home taste.</li>
        </ul>
      `
    },
    privacy: {
      title: "Privacy Policy",
      body: `
        <p class="text-xs text-stone-500 mb-3">Last updated: August 2026</p>
        <p>At RuchiRush, protecting your personal information is essential. This policy outlines how we handle data across our website and application.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">1. Information We Collect</h4>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Waitlist & Order Data</strong>: Name, email address, phone number, food preferences, and Hyderabad area.</li>
          <li><strong>Chef Onboarding Details</strong>: Identity verification details, kitchen address, and banking/UPI settlement coordinates.</li>
        </ul>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">2. Data Usage</h4>
        <p class="text-xs">We use your details strictly for coordinating meal deliveries, sending launch alerts, processing payments, and providing support. We never sell your data to third-party marketing brokers.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      body: `
        <p class="text-xs text-stone-500 mb-3">Last updated: August 2026</p>
        <p>By using RuchiRush, you agree to the following terms:</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">1. Meal Subscriptions & Single Trials</h4>
        <p class="text-xs">Customers can order individual trial meals before committing to weekly (6-day) or monthly meal subscriptions. Deliveries take place during designated lunch or dinner windows.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">2. Pause & Skip Policy</h4>
        <p class="text-xs">Subscription subscribers can pause or skip scheduled meals with a minimum of 12 hours advance notice before the preparation window. Skipped meals are credited toward future renewals.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">3. Refund & Support Policy</h4>
        <p class="text-xs">If a delivered meal fails to meet our hygiene or delivery standards, customers are entitled to a replacement or refund credit upon contacting support within 4 hours of delivery.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-sm">4. Chef Partner Terms</h4>
        <p class="text-xs">RuchiRush charges a transparent 10% platform commission on completed orders. Home chefs retain full autonomy over their menu items, pricing, prep slots, and daily capacity limits.</p>
      `
    }
  };

  const doc = legalTexts[policyType] || { title: "Legal Document", body: "<p>Policy details unavailable.</p>" };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#fff8f6] rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col z-10 border border-primary/10 overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-white">
          <h3 className="font-h2 text-xl font-bold text-primary font-['Newsreader']">{doc.title}</h3>
          <button 
            className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div 
          className="p-6 overflow-y-auto font-body-md text-stone-700 space-y-3 max-h-[calc(85vh-130px)] text-xs leading-relaxed"
          dangerouslySetInnerHTML={{ __html: doc.body }}
        />
        <div className="p-4 bg-white border-t border-primary/10 flex justify-end">
          <button 
            className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors shadow-sm cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
