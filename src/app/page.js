'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
// import CustomerPortal from '@/components/CustomerPortal';
import ChefPortal from '@/components/ChefPortal';
// import AuthModal from '@/components/AuthModal';
import LegalModal from '@/components/LegalModal';

export default function Home() {
  const [activeView, setActiveView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null); // Keep as null since login/signup is removed
  
  // Modal states
  const [legalModal, setLegalModal] = useState({ isOpen: false, policyType: 'privacy' });

  // Cookie banner state
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Floating action button scroll state
  const [fabScale, setFabScale] = useState(1);

  // Coming Soon Form State
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistLocation, setWaitlistLocation] = useState('Gachibowli');

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
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('eat_portal') === 'true') {
        setActiveView('customer-portal');
      } else if (params.get('portal')) {
        setActiveView(params.get('portal'));
      }
    }

    const cookieAccepted = localStorage.getItem('ruchirush_cookies_accepted');
    if (!cookieAccepted) {
      // Show banner after short delay
      setTimeout(() => setShowCookieBanner(true), 2500);
    }

    // Scroll listener for WhatsApp FAB
    let lastScroll = 0;
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr < 100) {
        setFabScale(1);
      } else if (curr > lastScroll) {
        setFabScale(0.85); // Shrink slightly on scroll down
      } else {
        setFabScale(1); // Restore size on scroll up
      }
      lastScroll = curr;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!waitlistName || !waitlistEmail) {
      showToast("Please fill in all details.", "error");
      return;
    }
    
    showToast("Submitting waitlist application...", "info");
    
    try {
      const response = await fetch("https://formspree.io/f/mkoybqqy", {
        method: "POST",
        body: JSON.stringify({
          name: waitlistName,
          email: waitlistEmail,
          location: waitlistLocation,
          _subject: `New Customer Waitlist Sign-up - ${waitlistName}`
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      if (response.ok) {
        showToast("Joined waitlist successfully!", "success");
        setWaitlistName('');
        setWaitlistEmail('');
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (err) {
      console.error(err);
      showToast("Submission failed. Opening WhatsApp...", "error");
      const body = `Hi Ruchi Rush team! I would like to join the customer waitlist:\n\nName: ${waitlistName}\nEmail: ${waitlistEmail}\nLocation: ${waitlistLocation}`;
      const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(body)}`;
      window.open(waUrl, "_blank");
      setWaitlistName('');
      setWaitlistEmail('');
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('ruchirush_cookies_accepted', 'true');
    setShowCookieBanner(false);
    showToast("Cookies preference saved.", "info");
  };

  const declineCookies = () => {
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen">
      {/* Background noise grain texture */}
      <div className="fixed inset-0 grain-texture z-0 pointer-events-none"></div>

      {/* Global Navigation Header */}
      <Header 
        activeView={activeView}
        navigate={setActiveView}
        currentUser={null} // No logged-in user
        onLogout={() => {}}
        openAuthModal={() => {}}
      />

      {/* Main portal render view router */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <Landing 
            navigate={setActiveView}
            openAuthModal={() => showToast("Login is currently disabled.", "info")}
            openLegalModal={(policyType) => setLegalModal({ isOpen: true, policyType })}
            Toast={ToastHelper}
          />
        )}
        
        {activeView === 'customer-portal' && (
          <section className="eat min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%)">
            <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-fade-in hover:shadow-2xl transition-shadow">
              <span className="text-6xl block">🍲</span>
              <h2 className="font-h1 text-3xl font-bold text-primary font-['Newsreader']">Coming Soon!</h2>
              <p className="text-sm text-black leading-relaxed">
                We are currently onboarding the finest certified home chefs in Hyderabad to bring authentic, warm homemade food to your table.
              </p>
              
              <div className="border-t border-[#9E3400] pt-6 space-y-4">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Join our launch waitlist</p>
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    required 
                    value={waitlistName}
                    onChange={e => setWaitlistName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-full px-5 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email Address" 
                    required 
                    value={waitlistEmail}
                    onChange={e => setWaitlistEmail(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-full px-5 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900"
                  />
                  <select 
                    value={waitlistLocation} 
                    onChange={e => setWaitlistLocation(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-full px-5 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                  >
                    <option value="Gachibowli">Gachibowli, Hyd</option>
                    <option value="Madhapur">Madhapur, Hyd</option>
                    <option value="Jubilee Hills">Jubilee Hills, Hyd</option>
                    <option value="Kondapur">Kondapur, Hyd</option>
                    <option value="Hi-Tech City">Hi-Tech City, Hyd</option>
                  </select>
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white py-2.5 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer shadow-md"
                  >
                    Get Notified on Launch
                  </button>
                </form>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setActiveView('landing')}
                  className="text-stone-500 hover:text-stone-700 text-xs font-semibold underline cursor-pointer"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          </section>
        )}
        
        {activeView === 'chef-portal' && (
          <ChefPortal 
            currentUser={currentUser}
            Toast={ToastHelper}
            navigate={setActiveView}
            onAuthSuccess={() => {}}
            openAuthModal={() => {}}
          />
        )}
      </main>

      {/* Floating Action Button (WhatsApp) */}
      <a 
        href="https://wa.me/919908574741?text=Hi%20Ruchi%20Rush!%20I%20have%20a%20question%20about%20ordering%20or%20joining." 
        target="_blank" 
        rel="noopener noreferrer"
        id="whatsappFab" 
        title="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-[9997] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg transition-all"
        style={{ 
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          transform: `scale(${fabScale})`
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"></span>
      </a>

      {/* Cookie Consent Legal Banner */}
      {showCookieBanner && (
        <div 
          id="cookieBanner"
          className="fixed bottom-6 left-6 max-w-sm z-[9999] bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-2xl border border-stone-800 transition-transform duration-500"
        >
          <p className="text-xs leading-relaxed mb-3">
            RuchiRush uses local cookies to save your settings for peak usability. Learn more in our{' '}
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
              Decline
            </button>
          </div>
        </div>
      )}

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

      {/* Legal Document Modal */}
      <LegalModal 
        isOpen={legalModal.isOpen}
        policyType={legalModal.policyType}
        onClose={() => setLegalModal({ isOpen: false, policyType: 'privacy' })}
      />
    </div>
  );
}

