'use client';
import { useState, useEffect } from 'react';

export default function Header({ activeView, navigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

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
    <header className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-6 py-4 backdrop-filter backdrop-blur-md border-b border-primary/10 bg-[#fff8f6]/90 transition-all duration-300">
      <div 
        className="flex items-center gap-2 cursor-pointer select-none" 
        onClick={() => {
          if (activeView !== 'landing') navigate('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <span className="text-2xl font-bold text-primary tracking-tight font-['Newsreader']">RuchiRush</span>
      </div>

      <nav className="hidden md:flex gap-7 items-center" aria-label="Main Navigation">
        <a
          href="#"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => { 
            e.preventDefault(); 
            if (activeView !== 'landing') navigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </a>
        <a
          href="#how-it-works"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => handleLinkClick(e, 'how-it-works')}
        >
          How It Works
        </a>
        <a
          href="#why-us"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => handleLinkClick(e, 'why-us')}
        >
          Why RuchiRush
        </a>
        <a
          href="#meal-plans"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => handleLinkClick(e, 'meal-plans')}
        >
          Meal Plans
        </a>
        <a
          href="#for-chefs"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => handleLinkClick(e, 'for-chefs')}
        >
          For Home Chefs
        </a>
        <a
          href="#faq"
          className="text-stone-800 font-semibold font-body-md text-sm transition-colors hover:text-primary"
          onClick={(e) => handleLinkClick(e, 'faq')}
        >
          FAQ
        </a>
        
        <button
          onClick={() => navigate('chef-portal')}
          className="bg-primary text-white hover:bg-orange-700 px-5 py-2 rounded-full font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer"
        >
          Become a Home Chef
        </button>
      </nav>

      {/* Hamburger Toggle Button */}
      <button
        id="menuBtn"
        onClick={toggleMenu}
        className="md:hidden text-primary z-[10000] focus:outline-none p-2 rounded-lg hover:bg-primary/5 cursor-pointer"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Mobile Drawer Menu */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 w-full h-screen bg-[#fff8f6]/98 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-300 z-[9998] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-6 text-center text-xl text-stone-900 font-['Newsreader']">
          <a
            href="#"
            onClick={(e) => { 
              e.preventDefault(); 
              closeMenu(); 
              if (activeView !== 'landing') navigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-primary transition-colors py-1 font-bold text-2xl"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
            className="hover:text-primary transition-colors py-1"
          >
            How It Works
          </a>
          <a
            href="#why-us"
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="hover:text-primary transition-colors py-1"
          >
            Why RuchiRush
          </a>
          <a
            href="#meal-plans"
            onClick={(e) => handleLinkClick(e, 'meal-plans')}
            className="hover:text-primary transition-colors py-1"
          >
            Meal Plans
          </a>
          <a
            href="#for-chefs"
            onClick={(e) => handleLinkClick(e, 'for-chefs')}
            className="hover:text-primary transition-colors py-1"
          >
            For Home Chefs
          </a>
          <a
            href="#faq"
            onClick={(e) => handleLinkClick(e, 'faq')}
            className="hover:text-primary transition-colors py-1"
          >
            FAQ
          </a>
          
          <div className="flex flex-col gap-3 mt-4 w-64">
            <button
              onClick={() => { closeMenu(); navigate('customer-portal'); }}
              className="bg-primary text-white py-3 rounded-full text-sm font-bold shadow-lg hover:bg-orange-700 transition-colors cursor-pointer"
            >
              Find Home Food
            </button>
            <button
              onClick={() => { closeMenu(); navigate('chef-portal'); }}
              className="border border-primary text-primary bg-white py-3 rounded-full text-sm font-bold shadow hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Become a Home Chef
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
