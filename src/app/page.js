'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
import ChefPortal from '@/components/ChefPortal';
import LegalModal from '@/components/LegalModal';

export default function Home() {
  const [activeView, setActiveView] = useState('landing');
  
  // Modal states
  const [legalModal, setLegalModal] = useState({ isOpen: false, policyType: 'privacy' });

  // Cookie banner state
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Floating WhatsApp button scroll scale
  const [fabScale, setFabScale] = useState(1);

  // Customer Portal Waitlist Form State
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistLocation, setWaitlistLocation] = useState('Gachibowli');
  const [waitlistDiet, setWaitlistDiet] = useState('Both Veg & Non-Veg');

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

  const ToastHelper = {
    show: showToast
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('eat_portal') === 'true' || params.get('portal') === 'customer-portal') {
          setActiveView('customer-portal');
        } else if (params.get('portal') === 'chef-portal') {
          setActiveView('chef-portal');
        }
      }
    }, 0);

    const cookieAccepted = localStorage.getItem('ruchirush_cookies_accepted');
    if (!cookieAccepted) {
      setTimeout(() => setShowCookieBanner(true), 2500);
    }

    let lastScroll = 0;
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr < 100) {
        setFabScale(1);
      } else if (curr > lastScroll) {
        setFabScale(0.88);
      } else {
        setFabScale(1);
      }
      lastScroll = curr;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!waitlistName || !waitlistEmail) {
      showToast("Please fill in all details.", "error");
      return;
    }
    
    const body = `Hi RuchiRush team! I would like to join the customer food waitlist:\n\nName: ${waitlistName}\nEmail: ${waitlistEmail}\nCorridor: ${waitlistLocation}, Hyderabad\nPreference: ${waitlistDiet}`;
    showToast("Opening WhatsApp to register...", "success");
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(body)}`;
    window.open(waUrl, "_blank");
    
    setWaitlistName('');
    setWaitlistEmail('');
  };

  const acceptCookies = () => {
    localStorage.setItem('ruchirush_cookies_accepted', 'true');
    setShowCookieBanner(false);
    showToast("Preferences saved.", "info");
  };

  const declineCookies = () => {
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background subtle noise grain */}
      <div className="fixed inset-0 grain-texture z-0 pointer-events-none"></div>

      {/* Global Navigation Header */}
      <Header 
        activeView={activeView}
        navigate={setActiveView}
      />

      {/* Main View Router */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <Landing 
            navigate={setActiveView}
            openLegalModal={(policyType) => setLegalModal({ isOpen: true, policyType })}
            Toast={ToastHelper}
          />
        )}
        
        {activeView === 'customer-portal' && (
          <section className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.85) 0%, rgba(253, 245, 237, 0.95) 100%)">
            <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-fade-in">
              <span className="text-6xl block">🍲</span>
              <h1 className="font-h1 text-3xl font-bold text-primary font-['Newsreader']">
                Find Home Food in Hyderabad
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-body-md">
                We are onboarding verified local home kitchens across Gachibowli, Kondapur, Madhapur, and Hi-Tech City. Register to receive your first trial meal upon launch.
              </p>
              
              <div className="border-t border-primary/10 pt-6 space-y-4 text-left">
                <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider text-center">
                  Join the Early Customer Launch
                </p>
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      value={waitlistName}
                      onChange={e => setWaitlistName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={waitlistEmail}
                      onChange={e => setWaitlistEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Corridor / Neighborhood
                    </label>
                    <select 
                      value={waitlistLocation} 
                      onChange={e => setWaitlistLocation(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                    >
                      <option value="Gachibowli">Gachibowli, Hyderabad</option>
                      <option value="Kondapur">Kondapur, Hyderabad</option>
                      <option value="Madhapur">Madhapur, Hyderabad</option>
                      <option value="Hi-Tech City">Hi-Tech City, Hyderabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Meal Preference
                    </label>
                    <select 
                      value={waitlistDiet} 
                      onChange={e => setWaitlistDiet(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                    >
                      <option value="Both Veg & Non-Veg">Both Veg & Non-Veg</option>
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Diet / Millets / Low Oil">Diet / Millets / Low Oil</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors cursor-pointer shadow-md mt-2"
                  >
                    Get Early Trial Access
                  </button>
                </form>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setActiveView('landing')}
                  className="text-stone-500 hover:text-stone-800 text-xs font-semibold underline cursor-pointer"
                >
                  ← Back to Homepage
                </button>
              </div>
            </div>
          </section>
        )}
        
        {activeView === 'chef-portal' && (
          <ChefPortal 
            Toast={ToastHelper}
            navigate={setActiveView}
          />
        )}
      </main>

      {/* Floating Action Button (WhatsApp Support) */}
      <a 
        href="https://wa.me/919908574741?text=Hi%20RuchiRush!%20I%20have%20a%20question%20about%20subscribing%20or%20joining." 
        target="_blank" 
        rel="noopener noreferrer"
        id="whatsappFab" 
        title="Chat with RuchiRush on WhatsApp"
        aria-label="Chat with RuchiRush on WhatsApp"
        className="fixed bottom-6 right-6 z-[9997] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
        style={{ 
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transform: `scale(${fabScale})`
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Cookie Notice Banner */}
      {showCookieBanner && (
        <div 
          id="cookieBanner"
          className="fixed bottom-6 left-6 max-w-sm z-[9999] bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-2xl border border-stone-800 animate-fade-in"
        >
          <p className="text-xs leading-relaxed mb-3">
            RuchiRush uses local preferences to ensure smooth browsing. Learn more in our{' '}
            <button 
              onClick={() => setLegalModal({ isOpen: true, policyType: 'privacy' })}
              className="underline text-orange-400 font-semibold cursor-pointer"
            >
              Privacy Policy
            </button>.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={acceptCookies}
              className="flex-1 bg-primary text-white py-2 rounded-full text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Accept
            </button>
            <button 
              onClick={declineCookies}
              className="px-4 border border-stone-600 rounded-full text-xs font-bold hover:bg-stone-800 transition-colors text-stone-300 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Global Toast Container */}
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
              <span className="font-body-md font-semibold text-xs">{toast.message}</span>
            </div>
          );
        })}
      </div>

      {/* Legal Modal */}
      <LegalModal 
        isOpen={legalModal.isOpen}
        policyType={legalModal.policyType}
        onClose={() => setLegalModal({ isOpen: false, policyType: 'privacy' })}
      />
    </div>
  );
}
