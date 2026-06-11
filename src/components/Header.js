'use client';
import { useState, useRef, useEffect } from 'react';

export default function Header({ activeView, navigate, currentUser, onLogout, openAuthModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    if (activeView !== 'landing') {
      navigate('landing');
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 350);
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="nav-anim fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-6 py-4 backdrop-filter backdrop-blur-lg border-b border-primary/5 bg-inherit">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('landing')}>
        <img
          src="https://res.cloudinary.com/dt79nhjkc/image/upload/v1780987405/samples/woman-on-a-football-field.png"
          alt="Ruchi Rush logo"
          className="w-12 h-12 rounded-full shadow-md object-cover"
        />
        <span className="text-2xl font-bold text-primary tracking-tight font-['Newsreader']">Ruchi Rush</span>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        <a
          href="#"
          className="text-orange-600 font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => { e.preventDefault(); navigate('landing'); }}
        >
          Home
        </a>
        <a
          href="#why-us"
          className="text-orange-600 font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => handleLinkClick(e, 'why-us')}
        >
          Why Us
        </a>
        <a
          href="#what-we-offer"
          className="text-orange-600 font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => handleLinkClick(e, 'what-we-offer')}
        >
          Explore
        </a>
        <button
          onClick={() => navigate('chef-portal')}
          className="cook-trigger relative overflow-hidden bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full font-semibold text-xs transition-all duration-200"
        >
          Join as Chef
        </button>
        <div className="h-6 w-[1px] bg-stone-300 dark:bg-stone-700"></div>

        {currentUser ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              {currentUser.role === 'chef' ? (
                <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-orange-600 flex items-center justify-center text-lg shadow-sm hover:scale-105 transition-transform" title="Chef Profile">
                  👨‍🍳
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-orange-600 border border-orange-500 flex items-center justify-center font-bold text-white text-sm shadow-sm hover:bg-orange-700 hover:scale-105 transition-transform" title="User Profile">
                  {(currentUser.name || currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-150 py-3 z-[99999] flex flex-col animate-none">
                <div className="px-4 py-2 border-b border-stone-100 mb-2">
                  <p className="text-xs font-black text-stone-900 truncate">{currentUser.name || currentUser.displayName || 'User'}</p>
                  <p className="text-[10px] font-semibold text-stone-400 truncate mt-0.5">{currentUser.email}</p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-orange-100 text-orange-700">
                    {currentUser.role}
                  </span>
                </div>
                
                {currentUser.role === 'chef' ? (
                  <button
                    onClick={() => { setIsProfileOpen(false); navigate('chef-portal'); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm text-stone-400">dashboard</span>
                    Chef Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => { setIsProfileOpen(false); navigate('customer-portal'); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm text-stone-400">restaurant</span>
                    Order Home Food
                  </button>
                )}

                <button
                  onClick={() => { setIsProfileOpen(false); navigate('landing'); }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-stone-400">home</span>
                  Home Page
                </button>

                <div className="h-[1px] bg-stone-100 my-2"></div>

                <button
                  onClick={() => { setIsProfileOpen(false); onLogout(); }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-red-500">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-full text-xs font-['Newsreader'] transition-all border-none"
          >
            Login / Signup
          </button>
        )}
      </nav>

      {/* Hamburger */}
      <button
        id="menuBtn"
        onClick={toggleMenu}
        className="md:hidden text-3xl text-primary z-[10000] focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Menu - Fixed bug by removing offscreen overflow width, using translate-x-full & pointer-events */}
      <div
        id="mobileMenu"
        className={`fixed top-0 right-0 w-full h-full bg-stone-950/95 backdrop-blur-lg flex flex-col transition-transform duration-300 z-[9998] ${
          isMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-start p-5">
          <button onClick={closeMenu} className="text-3xl text-red-500 font-bold p-2">
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-6 p-8 text-xl text-white">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); closeMenu(); navigate('landing'); }}
            className="hover:underline font-['Newsreader']"
          >
            Home
          </a>
          <a
            href="#why-us"
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="hover:underline font-['Newsreader']"
          >
            Why Us
          </a>
          <a
            href="#what-we-offer"
            onClick={(e) => handleLinkClick(e, 'what-we-offer')}
            className="hover:underline font-['Newsreader']"
          >
            What We Offer
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); closeMenu(); navigate('chef-portal'); }}
            className="hover:underline font-bold text-orange-400 font-['Newsreader']"
          >
            Chef Portal
          </a>
          <div className="h-[1px] bg-white/10 my-2"></div>

          {currentUser ? (
            <div className="flex flex-col gap-3">
              <span className="text-sm text-stone-300">
                Logged in as: <strong>{currentUser.name || currentUser.displayName || 'User'}</strong>
              </span>
              <button
                onClick={() => { closeMenu(); onLogout(); }}
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-sm font-bold w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { closeMenu(); openAuthModal('login'); }}
              className="bg-primary hover:bg-primary-container text-white py-3 rounded-full text-sm font-bold w-full"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
