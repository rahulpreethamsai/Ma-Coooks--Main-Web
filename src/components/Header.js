'use client';
import { useState, useEffect } from 'react';

export default function Header({ activeView, navigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
        <span className="text-2xl font-bold text-primary tracking-tight font-['Newsreader']">Ruchi Rush</span>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        <a
          href="#"
          className="text-primary font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => { e.preventDefault(); navigate('landing'); }}
        >
          Home
        </a>
        <a
          href="#why-us"
          className="text-primary font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => handleLinkClick(e, 'why-us')}
        >
          Why Us
        </a>
        <a
          href="#what-we-offer"
          className="text-primary font-semibold font-['Newsreader'] transition-opacity hover:opacity-80"
          onClick={(e) => handleLinkClick(e, 'what-we-offer')}
        >
          Explore
        </a>
        <button
          onClick={() => navigate('chef-portal')}
          className="cook-trigger bg-primary text-white hover:bg-orange-700 px-6 py-2 rounded-full font-semibold text-xs transition-all duration-200 cursor-pointer"
        >
          Join as Chef
        </button>
      </nav>

      {/* Hamburger */}
      <button
        id="menuBtn"
        onClick={toggleMenu}
        className="md:hidden text-primary z-[10000] focus:outline-none p-2"
        aria-label="Toggle menu"
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

      {/* Mobile Menu - uses absolute positioning with fade/scale animation, preventing offscreen horizontal overflow */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 w-full h-screen bg-stone-950/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 z-[9998] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="flex flex-col gap-8 text-center text-2xl text-stone-100 font-['Newsreader']">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); closeMenu(); navigate('landing'); }}
            className="hover:text-primary transition-colors py-2"
          >
            Home
          </a>
          <a
            href="#why-us"
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="hover:text-primary transition-colors py-2"
          >
            Why Us
          </a>
          <a
            href="#what-we-offer"
            onClick={(e) => handleLinkClick(e, 'what-we-offer')}
            className="hover:text-primary transition-colors py-2"
          >
            Explore
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); closeMenu(); navigate('chef-portal'); }}
            className="hover:text-primary font-bold text-primary transition-colors py-2"
          >
            Chef Portal
          </a>
          <button
            onClick={() => { closeMenu(); navigate('customer-portal'); }}
            className="bg-primary text-white px-8 py-3 rounded-full text-base font-bold shadow-lg hover:bg-orange-700 transition-colors mt-4 cursor-pointer"
          >
            Order Home Food
          </button>
        </div>
      </div>
    </header>
  );
}

