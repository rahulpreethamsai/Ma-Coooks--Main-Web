'use client';

export default function LegalModal({ isOpen, policyType, onClose }) {
  if (!isOpen) return null;

  const legalTexts = {
    about: {
      title: "About Ruchi Rush",
      body: `
        <p class="font-semibold text-stone-900 text-lg mb-2">Connecting Neighbors Through Homemade Food</p>
        <p><strong>Ruchi Rush</strong> is a premium, community-first platform designed to bridge the gap between verified home chefs and local customers seeking clean, authentic, and wholesome homemade meals.</p>
        <p class="mt-4">Unlike commercial kitchen aggregators that mass-produce food using generic ingredients and industrial setups, RuchiRush empowers local culinary creators—many of whom are skilled homemakers—to share their cooking heritage in small, fresh batches.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">Our 5-Step Verification Standards:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>ID & KYC Auditing</strong>: Complete identity verification of all chefs.</li>
          <li><strong>Kitchen Hygiene Audit</strong>: Physical inspection of preparation zones.</li>
          <li><strong>FSSAI Registration Validation</strong>: Verification of government food safety license compliance.</li>
          <li><strong>Quality and Freshness Check</strong>: Regular food sampling of listed menu items.</li>
          <li><strong>Secure Payments</strong>: Local settlement routing straight to the chef's banking portal.</li>
        </ul>
        <p class="mt-4">By choosing Ruchi Rush, you support women-led micro-businesses while feeding your family fresh, wholesome, and delicious meals made with genuine care.</p>
      `
    },
    privacy: {
      title: "Privacy Policy",
      body: `
        <p class="text-xs text-stone-500 mb-4">Last updated: June 9, 2026</p>
        <p>At Ruchi Rush, protecting your privacy is our core commitment. This policy describes how we collect, store, and utilize data across our platform and Web App Portals.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">1. Data Collection Scope</h4>
        <p>We only request and store information vital for core application functionality:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>User Profiles</strong>: Name, email address, phone number, and account roles.</li>
          <li><strong>Delivery Addresses</strong>: Saved locally or securely linked to estimate delivery estimates and list close-by home chefs.</li>
          <li><strong>Order Cart Items</strong>: Kept locally to avoid state resets on page reloads.</li>
        </ul>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">2. Cookies and Storage</h4>
        <p>We use local storage keys and browser session state cookies. We do not integrate tracking pixels or sell profile details to advertisers.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">3. Information Security</h4>
        <p>All sensitive transactions, simulated UPI payloads, and chef KYC details are handled locally and insulated from public access.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      body: `
        <p class="text-xs text-stone-500 mb-4">Last updated: June 9, 2026</p>
        <p>By accessing the RuchiRush platform, you agree to comply with and be bound by the following Terms of Service:</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">1. User Account Terms</h4>
        <p>Users must provide authentic profile info. Home chefs are required to hold a valid FSSAI license or obtain one during their onboarding flow to activate public storefronts.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">2. Order Operations</h4>
        <p>Payment operations on this platform are fully simulated for prototype demonstration. Home chefs must list accurate preparation times, menu descriptions, and allergen disclosures.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">3. Platform Limitations</h4>
        <p>RuchiRush acts as a connecting facilitator between customers, home chefs, and couriers. We are not liable for direct quality discrepancies, though we run active verification and sample testing to maintain premium standards.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">4. Cancellation and Refund Policy</h4>
        <p>Orders can be cancelled free of charge up to 12 hours prior to the start of the scheduled delivery time slot. Cancellations requested less than 12 hours before the delivery slot incur a 50% ingredient recovery fee to compensate the home chef for purchased produce. If an order is not delivered, or the delivered food fails to meet verified hygiene or quality standards, customers are entitled to a full 100% refund. Approved refunds are credited back to the customer's UPI or bank account within 2-3 business days. Refund claims must be submitted to our support team within 4 hours of the delivery slot.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">5. Customer Support Operations</h4>
        <p>Customer and chef support is active daily from 8:00 AM to 10:00 PM IST. Support assistance includes resolving delivery discrepancies, refund escalations, chef onboarding, and kitchen hygiene compliance. You can reach us for instant help via WhatsApp chat, or submit general inquiries to helloruchirush@gmail.com, which carries a response time policy of under 24 hours.</p>
        <h4 class="font-bold text-stone-900 mt-4 mb-2 text-md">6. Service Fees & Pricing Model</h4>
        <p>For customers, ordering carries no hidden subscription or registration fees. Each order total is structured as: (1) Chef's listed dish price, (2) A flat ₹30 courier delivery fee, and (3) A ₹10 platform handling fee for secure payment routing. For chefs, the platform charges a simple 10% commission per completed order, meaning chefs retain 90% of their payouts. There are no monthly chef listing or subscription charges.</p>
      `
    }
  };

  const doc = legalTexts[policyType] || { title: "Legal Document", body: "<p>Policy details unavailable.</p>" };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#fff8f6] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col z-10 border border-primary/10 overflow-hidden">
        <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-gradient-to-r from-orange-50 to-orange-100/30">
          <h3 className="font-h2 text-2xl font-bold text-primary font-['Solway',serif]">{doc.title}</h3>
          <button className="text-stone-500 hover:text-stone-850 text-xl font-bold p-2 cursor-pointer" onClick={onClose}>✕</button>
        </div>
        <div className="p-8 overflow-y-auto font-body-md text-stone-700 space-y-6 max-h-[calc(85vh-140px)]">
          <div dangerouslySetInnerHTML={{ __html: doc.body }} className="space-y-4" />
          
          {policyType === 'about' && (
            <div className="border-t border-primary/10 pt-6 mt-6">
              <h4 className="font-bold text-stone-900 mb-6 text-base font-['Solway',serif]">Platform Creators</h4>
              <div className="flex items-center gap-12 mt-4 pb-4 select-none">
                
                {/* Member 1: Rahul Preetham Sai */}
                <div className="relative group flex flex-col items-center cursor-pointer">
                  {/* Default State */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group-hover:border-primary group-hover:scale-105 transition-all duration-300 ease-out">
                    <img 
                      src="/rp_passport_size_photo.jpeg" 
                      alt="Rahul Preetham Sai" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-stone-800 mt-2 text-sm group-hover:text-primary transition-colors duration-250">RP</span>

                  {/* Pop-up Tooltip Card */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md border border-primary/10 rounded-2xl p-4 shadow-2xl flex flex-col items-center text-center opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-primary/10 shadow-md mb-3">
                      <img 
                        src="/rp_passport_size_photo.jpeg" 
                        alt="Rahul Preetham Sai" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="font-bold text-stone-900 text-sm leading-tight font-['Solway',serif]">Rahul Preetham Sai</h5>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-xs font-semibold text-stone-500 bg-stone-100/80 px-2 py-0.5 rounded-full">19 yr</span>
                      <a 
                        href="https://www.linkedin.com/in/ch-rahul-preetham-sai/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0077b5] hover:text-[#0077b5]/85 transition-colors p-1 rounded-md hover:bg-stone-50"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/95"></div>
                  </div>
                </div>

                {/* Member 2: Arief Hussain Shaik */}
                <div className="relative group flex flex-col items-center cursor-pointer">
                  {/* Default State */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group-hover:border-primary group-hover:scale-105 transition-all duration-300 ease-out">
                    <img 
                      src="/arief.jpeg" 
                      alt="Arief Hussain Shaik" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-stone-800 mt-2 text-sm group-hover:text-primary transition-colors duration-250">Arief</span>

                  {/* Pop-up Tooltip Card */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md border border-primary/10 rounded-2xl p-4 shadow-2xl flex flex-col items-center text-center opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-primary/10 shadow-md mb-3">
                      <img 
                        src="/arief.jpeg" 
                        alt="Arief Hussain Shaik" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="font-bold text-stone-900 text-sm leading-tight font-['Solway',serif]">Arief Hussain Shaik</h5>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-xs font-semibold text-stone-500 bg-stone-100/80 px-2 py-0.5 rounded-full">19 yr</span>
                      <a 
                        href="https://www.linkedin.com/in/arief-hussain-shaik/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0077b5] hover:text-[#0077b5]/85 transition-colors p-1 rounded-md hover:bg-stone-50"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/95"></div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-orange-50/20 border-t border-primary/10 flex justify-end">
          <button 
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
