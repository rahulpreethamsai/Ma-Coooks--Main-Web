'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MobileAppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const screens = [
    { src: '/screen1.png', label: '1. Welcome & Home', title: 'Home Screen', desc: 'Welcome page showing home kitchen offers, top rated spots, and recommendations.' },
    { src: '/screen2.png', label: '2. Search & Browse', title: 'Explore Chefs', desc: 'Search page with filters like Near You, Meals, Tiffins, and Snacks.' },
    { src: '/screen3.png', label: '3. Chef Kitchens', title: 'Chef Profile', desc: 'View Lakshmi\'s Kitchen, read reviews, see ratings, and take a kitchen tour.' },
    { src: '/screen4.png', label: '4. Dish Details', title: 'Chicken Biryani Page', desc: 'Select spice levels, view preparation details, and add authentic dishes to cart.' },
    { src: '/screen5.png', label: '5. Quick Checkout', title: 'Checkout Page', desc: 'Simulated checkout showing addresses, delivery times, and payment routing.' },
    { src: '/screen6.png', label: '6. Live Tracking', title: 'My Orders Tracking', desc: 'Real-time order tracking map showing live prep progress and delivery status.' },
    { src: '/screen7.png', label: '7. Chef Dashboard', title: 'Kitchen Dashboard', desc: 'Empowering home chefs with daily earnings summary, active orders, and statistics.' },
  ];

  const DURATION = 4000; // 4 seconds per screen
  const STEP = 50; // Progress bar updates every 50ms

  const startTimer = () => {
    stopTimer();
    
    // Timer to change active screen
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screens.length);
      setProgress(0);
    }, DURATION);

    // Timer to animate progress bar
    const increment = (STEP / DURATION) * 100;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + increment;
      });
    }, STEP);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [activeIndex]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[280px] sm:max-w-[320px] mx-auto animate-none">
      {/* CSS Phone Frame */}
      <div className="relative w-full aspect-[1/2] max-h-[580px] bg-white rounded-[40px] border-4 border-stone-250 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
        {/* Speaker notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-200 rounded-full z-30 flex items-center justify-center">
          {/* Camera dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-stone-850 ml-4"></div>
        </div>

        {/* In-app mockup wrapper */}
        <div className="relative w-full h-full bg-stone-900 rounded-[30px] overflow-hidden flex flex-col z-10 border border-stone-100/5">
          {/* Story-style Progress Indicator bars */}
          <div className="flex gap-1 w-full px-4 pt-4 pb-2 z-30 absolute top-0 left-0 bg-gradient-to-b from-stone-900/70 to-transparent">
            {screens.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ 
                    width: `${activeIndex === i ? progress : activeIndex > i ? 100 : 0}%`,
                    transition: activeIndex === i ? 'none' : 'width 0.2s ease-out'
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Screen transition slides */}
          <div className="relative w-full h-full">
            {screens.map((screen, i) => (
              <div 
                key={i}
                className={`absolute inset-0 transition-opacity duration-550 ease-in-out ${activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={screen.src} 
                  alt={screen.title} 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom home button bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-stone-350 rounded-full z-20"></div>
      </div>

      {/* Step Indicator Dot Controls */}
      <div className="flex justify-center gap-1.5 mt-5">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === i ? 'bg-primary w-4' : 'bg-stone-300 hover:bg-stone-400'}`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Active Step Description Card (glassmorphic layout) */}
      <div className="w-full mt-4 bg-orange-50/40 border border-primary/5 rounded-2xl p-4 shadow-sm text-center min-h-[105px] flex flex-col justify-center">
        <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1 font-['Solway',serif]">
          {screens[activeIndex].label}
        </p>
        <h4 className="font-bold text-stone-900 text-sm font-['Solway',serif]">
          {screens[activeIndex].title}
        </h4>
        <p className="text-xs text-stone-500 mt-1 leading-relaxed font-body-md">
          {screens[activeIndex].desc}
        </p>
      </div>
    </div>
  );
}
