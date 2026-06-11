'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import LegalModal from './LegalModal';
import AuthModal from './AuthModal';
import { auth, signOut } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ServiceAreaPage({ 
  areaName, 
  title, 
  metaDescription, 
  landmarks, 
  cuisineHighlight, 
  localStory,
  chefIds
}) {
  const [activeView, setActiveView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [chefs, setChefs] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [authModal, setAuthModal] = useState({ isOpen: false, tab: 'login' });
  const [legalModal, setLegalModal] = useState({ isOpen: false, policyType: 'privacy' });
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const ToastHelper = { show: showToast };

  useEffect(() => {
    // Sync active user
    const cachedUser = localStorage.getItem('ruchirush_active_user');
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (e) {}
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(fbUser.email)}`);
          if (res.ok) {
            const profile = await res.json();
            if (profile) {
              setCurrentUser(profile);
              localStorage.setItem('ruchirush_active_user', JSON.stringify(profile));
            }
          }
        } catch (e) {}
      } else {
        setCurrentUser(null);
      }
    });

    // Fetch Chefs and Dishes
    const fetchVettedData = async () => {
      try {
        const [chefsRes, dishesRes] = await Promise.all([
          fetch('/api/chefs'),
          fetch('/api/dishes')
        ]);
        const chefsData = await chefsRes.json();
        const dishesData = await dishesRes.json();
        setChefs(chefsData || []);
        setDishes(dishesData || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchVettedData();

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem('ruchirush_active_user');
      showToast("Logged out successfully.", "info");
    } catch (err) {
      showToast("Logout failed.", "error");
    }
  };

  const handleAuthSuccess = (profile) => {
    setCurrentUser(profile);
    localStorage.setItem('ruchirush_active_user', JSON.stringify(profile));
    showToast(`Welcome back, ${profile.name}!`, 'success');
  };

  const areaChefs = chefs.filter(c => chefIds.includes(c.id));

  // Localized Schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FoodDeliveryService",
    "name": `Ruchi Rush ${areaName}`,
    "description": metaDescription,
    "url": `https://ruchirush.netlify.app/${areaName.toLowerCase().replace(' ', '-')}-food-delivery`,
    "telephone": "+919999999999",
    "priceRange": "$$",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": areaName
    },
    "provider": {
      "@type": "Organization",
      "name": "Ruchi Rush",
      "url": "https://ruchirush.netlify.app"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Homemade Meals Catalog",
      "itemListElement": areaChefs.map(chef => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Home Cooked Meal Delivery by ${chef.name}`,
          "description": chef.bio
        }
      }))
    }
  };

  const handleOrderRedirect = () => {
    // Pre-set location filter to this area
    localStorage.setItem('ruchirush_delivery_area_filter', areaName);
    // Redirect to root landing and open eat view
    window.location.href = `/?eat_portal=true&area=${encodeURIComponent(areaName)}`;
  };

  return (
    <div className="min-h-screen bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%)">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="fixed inset-0 grain-texture z-0 pointer-events-none"></div>

      <Header 
        activeView={activeView}
        navigate={(view) => {
          if (view === 'landing') window.location.href = '/';
          else window.location.href = `/?portal=${view}`;
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        openAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
      />

      <main className="relative z-10 pt-28 pb-20 px-6 max-w-5xl mx-auto space-y-16">
        {/* Local Hero Header */}
        <section className="text-center space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">Verified Local Kitchens</span>
          <h1 className="font-h1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-tight">
            {title}
          </h1>
          <p className="text-stone-500 font-body-lg text-lg max-w-2xl mx-auto leading-relaxed">
            {metaDescription}
          </p>
          <div className="pt-6">
            <button 
              onClick={handleOrderRedirect}
              className="bg-primary hover:bg-orange-600 text-white font-bold p-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer text-sm"
            >
              ORDER FRESH HOME FOOD IN {areaName.toUpperCase()}
            </button>
          </div>
        </section>

        {/* Landmarks and Area Scope */}
        <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm space-y-6">
          <h2 className="font-h2 text-2xl font-bold text-stone-900 dark:text-white">Serving Neighbors Around {areaName}</h2>
          <div className="prose dark:prose-invert text-stone-600 dark:text-stone-300 text-sm leading-relaxed max-w-none space-y-4 font-body-md">
            <p>{localStory}</p>
            <p>
              We provide prompt, fresh, and temperature-controlled home meal deliveries across all residential communities, hostels, and offices near:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {landmarks.map((landmark, idx) => (
                <span key={idx} className="bg-orange-50 text-primary border border-primary/15 rounded-full px-3 py-1 text-xs font-bold dark:bg-stone-850 dark:text-orange-350">
                  📍 {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Local Chefs Section */}
        <section className="space-y-6">
          <h2 className="font-h2 text-2xl font-bold text-stone-900 dark:text-white">Verified Home Chefs Near {areaName}</h2>
          
          {areaChefs.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-2xl border">
              <p className="text-stone-500 text-sm">Syncing local home kitchens in {areaName}...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {areaChefs.map(chef => {
                const chefDishes = dishes.filter(d => d.chefId === chef.id);
                return (
                  <div key={chef.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex gap-4 items-center mb-4">
                        <img src={chef.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-primary/10" alt={chef.name} />
                        <div>
                          <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-1">
                            {chef.name}
                            <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                          </h3>
                          <p className="text-[10px] text-stone-400 font-semibold">{chef.deliveryTime} delivery • {chef.area}</p>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-medium italic mb-2">"{chef.bio}"</p>
                      <p className="text-xs text-stone-500 font-bold">Specialty: {chef.cuisine}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <span className="material-symbols-outlined text-yellow-500 fill-current text-sm">star</span>
                        <span className="font-bold text-stone-850 dark:text-stone-200">{chef.rating}</span>
                        <span className="text-[10px] text-stone-500">({chef.reviewsCount} reviews)</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleOrderRedirect}
                      className="mt-6 w-full bg-primary/10 border border-primary/20 text-primary py-2 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      View Full Menu
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Localized Trust & Social Proof */}
        <section className="bg-gradient-to-br from-orange-50 to-orange-100/30 dark:from-stone-900 dark:to-stone-950/20 border border-primary/10 rounded-2xl p-8 space-y-6 shadow-sm">
          <h2 className="font-h2 text-2xl font-bold text-primary font-['Newsreader']">What Neighbors Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 border p-5 rounded-xl space-y-2">
              <div className="flex text-yellow-500">
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic">"Ordering breakfast idli and upma from Lakshmi's kitchen near here is our weekly ritual. Tastes absolutely light and fresh, far better than any commercial hotel breakfasts!"</p>
              <p className="text-[10px] text-stone-400 font-bold text-right">— Resident, {areaName}</p>
            </div>
            <div className="bg-white dark:bg-stone-900 border p-5 rounded-xl space-y-2">
              <div className="flex text-yellow-500">
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic">"Clean food, zero heavy oils, and slow-dum spices. It feels great to support neighborhood chefs directly. Highly recommend pre-ordering 24h in advance!"</p>
              <p className="text-[10px] text-stone-400 font-bold text-right">— Professional, {areaName}</p>
            </div>
          </div>
        </section>

        {/* OUR PROMISE TO HOME CHEFS */}
        <section className="border-theme border-primary/10 pt-16" id="chef-promise">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Commitment</span>
            <h2 className="font-h2 text-3xl font-bold mt-2 text-black font-['Newsreader']">Our Promise to Home Chefs</h2>
            <p className="text-xs text-stone-500 mt-2 font-body-md">We believe in a fair, community-first food economy. Here is our pledge to every culinary partner on our platform.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: Visual Commission Graph Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-h3 text-lg font-bold text-stone-900">Why Chefs Earn More</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                We keep our operational costs low and pass the savings back to our neighborhood partners.
              </p>
              
              {/* Commission bars comparison */}
              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-500">
                    <span>Other Apps Commission</span>
                    <span className="text-red-600">30%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-850">
                    <span>Ruchi Rush Commission</span>
                    <span className="text-primary">8%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 text-center">
                <span className="text-xs font-black text-primary">Chefs Retain 92% of Sales Payouts!</span>
              </div>
            </div>

            {/* Right Side: Promise Items Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl text-primary">account_balance_wallet</span>
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">92% Chef Payouts</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-body-md">You keep 92% of your hard-earned revenue. No listing fees, no setup charges, and zero hidden operational costs.</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl text-primary">verified_user</span>
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">Vetted Culinary Trust</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-body-md">We verify your kitchen safety and FSSAI credentials to build premium neighborhood trust and brand recognition.</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl text-primary">schedule</span>
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">Complete Autonomy</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-body-md">You decide your own menu, set your own pricing, select prep slots, and open/close your kitchen at your convenience.</p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl text-primary">local_shipping</span>
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider">Doorstep Courier Pickup</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-body-md">Focus purely on cooking. Vetted local couriers pick up orders directly from your doorstep and deliver them in insulated bags.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD APP NOW (PLAYSTORE APP ANIMATION) */}
        <section className="bg-gradient-to-br from-[#ffeae0] to-[#fff8f6] text-stone-900 border border-primary/15 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden" id="download-app">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: CTA details */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Ruchi Rush Mobile App</span>
              <h2 className="font-h2 text-3xl md:text-4xl font-bold font-['Newsreader'] leading-tight text-stone-900">Homemade Warmth, Delivered in a Tap</h2>
              <p className="text-xs text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body-md">
                Download our mobile app to track deliveries live, chat directly with home chefs, and easily pre-order custom meals for your family.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); showToast("App downloading starts shortly...", "success"); }}
                  className="bg-black border border-stone-850 hover:bg-stone-900 text-white flex items-center gap-3 px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3.00005C4.7 3.00005 4.4 3.10005 4.2 3.30005L13.8 12.9L18.4 8.30005L5.7 1.20005C5.4 1.00005 5.2 3.00005 5 3.00005ZM3.2 4.30005C3.1 4.50005 3 4.70005 3 5.00005V19C3 19.3 3.1 19.5 3.2 19.7L12.4 11.5L3.2 4.30005ZM14.8 13.9L4.2 20.7C4.4 20.9 4.7 21 5 21C5.2 21 5.4 20.9 5.7 20.8L18.4 13.7L14.8 13.9ZM14.8 12.5L20.1 9.50005C20.6 9.20005 21 8.60005 21 8.00005C21 7.40005 20.6 6.80005 20.1 6.50005L14.8 9.50005L13.8 10.5L14.8 12.5Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[8px] text-stone-400 uppercase leading-none font-bold">GET IT ON</p>
                    <p className="text-xs font-black mt-0.5 leading-none">Google Play</p>
                  </div>
                </a>

                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); showToast("App downloading starts shortly...", "success"); }}
                  className="bg-black border border-stone-850 hover:bg-stone-900 text-white flex items-center gap-3 px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5ZM15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[8px] text-stone-400 uppercase leading-none font-bold">Download on the</p>
                    <p className="text-xs font-black mt-0.5 leading-none">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: PlayStore App Download Mockup Animation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[210px] h-[420px] bg-white rounded-[35px] border-4 border-stone-200 shadow-xl p-2.5 flex flex-col justify-between overflow-hidden animate-none">
                {/* Speaker notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-stone-200 rounded-full z-25"></div>

                {/* In-app mockup wrapper */}
                <div className="relative w-full h-full bg-[#fff8f6] rounded-[28px] overflow-hidden flex flex-col p-3 z-10 justify-between border border-stone-100">
                  <div className="flex justify-between items-center text-[9px] text-stone-500">
                    <span className="font-bold">Ruchi Rush Live</span>
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                      <span className="text-green-600 font-bold uppercase tracking-wider">Active</span>
                    </div>
                  </div>

                  <div className="relative w-full h-[150px] bg-orange-50/50 rounded-2xl overflow-hidden border border-primary/10 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:14px_14px]"></div>

                    <div className="absolute w-20 h-20 rounded-full border border-primary/30 bg-primary/10 ani-radar"></div>
                    <div className="absolute w-30 h-30 rounded-full border border-primary/25 bg-primary/5 ani-radar" style={{ animationDelay: '0.8s' }}></div>

                    <div className="absolute left-4 top-10 flex flex-col items-center">
                      <span className="text-sm">🏡</span>
                      <span className="text-[6px] bg-primary text-white px-1 rounded-full font-bold">Chef</span>
                    </div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 180 150">
                      <path d="M 30,70 Q 75,35 100,75 T 140,95" fill="none" stroke="rgba(158,67,0,0.4)" strokeWidth="2" strokeDasharray="3,3" />
                    </svg>

                    <div className="absolute left-4 top-10 text-sm ani-bike">🛵</div>

                    <div className="absolute right-4 bottom-8 flex flex-col items-center">
                      <span className="text-sm text-primary animate-bounce">📍</span>
                      <span className="text-[6px] bg-stone-200 text-stone-850 px-1 rounded-full font-bold">You</span>
                    </div>
                  </div>

                  <div className="bg-white border border-primary/10 rounded-xl p-2 space-y-1.5 text-left ani-status-card shadow-sm">
                    <div className="flex justify-between items-center text-[6px] text-stone-500 uppercase tracking-widest font-bold">
                      <span>Order Tracking</span>
                      <span className="text-primary">On Its Way</span>
                    </div>
                    <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-[8px] font-bold text-stone-800 truncate">Rider Ramesh is 2 mins away</p>
                  </div>

                  <button 
                    onClick={() => showToast("PWA installation triggered!", "info")}
                    className="w-full bg-primary text-white text-[8px] py-1.5 rounded-full font-bold shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    Download Native App
                  </button>
                </div>

                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-stone-300 rounded-full z-20"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-primary/10 bg-[#fff8f6] text-stone-750 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-3xl font-bold text-stone-900 font-['Newsreader']">Ruchi Rush</span>
          <span className="text-stone-500 text-sm font-['Newsreader']">© 2026 Ruchi Rush. Made with love in Hyderabad.</span>
        </div>
        <div className="flex gap-6 font-semibold text-sm text-stone-700">
          <button onClick={() => setLegalModal({ isOpen: true, policyType: 'about' })} className="hover:text-primary transition-colors cursor-pointer">About Us</button>
          <button onClick={() => setLegalModal({ isOpen: true, policyType: 'privacy' })} className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => setLegalModal({ isOpen: true, policyType: 'terms' })} className="hover:text-primary transition-colors cursor-pointer">Terms of Service</button>
        </div>
      </footer>

      <AuthModal 
        isOpen={authModal.isOpen}
        initialTab={authModal.tab}
        onClose={() => setAuthModal({ isOpen: false, tab: 'login' })}
        onAuthSuccess={handleAuthSuccess}
      />

      <LegalModal 
        isOpen={legalModal.isOpen}
        policyType={legalModal.policyType}
        onClose={() => setLegalModal({ isOpen: false, policyType: 'privacy' })}
      />

      {/* Global Toast notifications */}
      <div id="toast-container">
        {toasts.map(toast => {
          let icon = "info";
          if (toast.type === "success") icon = "check_circle";
          if (toast.type === "error") icon = "error";
          return (
            <div 
              key={toast.id} 
              className={`toast-msg ${toast.type}`}
              onClick={() => removeToast(toast.id)}
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-body-md font-semibold">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
