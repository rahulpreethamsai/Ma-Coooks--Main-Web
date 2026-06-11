'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
import CustomerPortal from '@/components/CustomerPortal';
import ChefPortal from '@/components/ChefPortal';
import AuthModal from '@/components/AuthModal';
import LegalModal from '@/components/LegalModal';
import { auth, signOut, onAuthStateChanged } from '@/lib/firebase';

export default function Home() {
  const [activeView, setActiveView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Modal states
  const [authModal, setAuthModal] = useState({ isOpen: false, tab: 'login' });
  const [legalModal, setLegalModal] = useState({ isOpen: false, policyType: 'privacy' });

  // Cookie banner state
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Floating action button scroll state
  const [fabScale, setFabScale] = useState(1);

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
    // 1. Initial State checks from localStorage & URL parameters
    const cachedUser = localStorage.getItem('ruchirush_active_user');
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (e) {
        localStorage.removeItem('ruchirush_active_user');
      }
    }

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

    // 2. Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          // Fetch custom user profile (role, chefId, etc.) from backend
          const res = await fetch(`/api/users?email=${encodeURIComponent(fbUser.email)}`);
          if (res.ok) {
            const profile = await res.json();
            if (profile) {
              setCurrentUser(profile);
              localStorage.setItem('ruchirush_active_user', JSON.stringify(profile));
            }
          }
        } catch (e) {
          console.error("Auth listener backend sync error:", e);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('ruchirush_active_user');
      }
    });

    // 3. Scroll listener for WhatsApp FAB
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
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const oldName = currentUser?.name || 'User';
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem('ruchirush_active_user');
      setActiveView('landing');
      showToast(`Logged out successfully. See you again, ${oldName}!`, 'info');
    } catch (err) {
      console.error(err);
      showToast("Logout failed.", "error");
    }
  };

  const handleAuthSuccess = (profile) => {
    setCurrentUser(profile);
    localStorage.setItem('ruchirush_active_user', JSON.stringify(profile));
    showToast(`Welcome back, ${profile.name}!`, 'success');
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
        currentUser={currentUser}
        onLogout={handleLogout}
        openAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
      />

      {/* Main portal render view router */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <Landing 
            navigate={setActiveView}
            openAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
            openLegalModal={(policyType) => setLegalModal({ isOpen: true, policyType })}
            Toast={ToastHelper}
          />
        )}
        
        {activeView === 'customer-portal' && (
          <CustomerPortal 
            currentUser={currentUser}
            Toast={ToastHelper}
            navigate={setActiveView}
            openAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
          />
        )}
        
        {activeView === 'chef-portal' && (
          <ChefPortal 
            currentUser={currentUser}
            Toast={ToastHelper}
            navigate={setActiveView}
            onAuthSuccess={handleAuthSuccess}
            openAuthModal={(tab) => setAuthModal({ isOpen: true, tab })}
          />
        )}
      </main>

      {/* Floating Action Button (WhatsApp) */}
      <a 
        href="https://wa.me/919999999999?text=Hi%20Ruchi%20Rush!%20I%20have%20a%20question." 
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
            Ruchi Rush uses local cookies to save your home delivery address, active cart selections, and secure chef session profiles for peak usability. Learn more in our{' '}
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

      {/* Auth Modal Trigger */}
      <AuthModal 
        isOpen={authModal.isOpen}
        initialTab={authModal.tab}
        onClose={() => setAuthModal({ isOpen: false, tab: 'login' })}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Legal Document Modal */}
      <LegalModal 
        isOpen={legalModal.isOpen}
        policyType={legalModal.policyType}
        onClose={() => setLegalModal({ isOpen: false, policyType: 'privacy' })}
      />
    </div>
  );
}
