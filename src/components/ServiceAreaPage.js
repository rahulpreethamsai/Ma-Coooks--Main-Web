'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import LegalModal from './LegalModal';

export default function ServiceAreaPage({ 
  areaName, 
  title, 
  metaDescription, 
  landmarks = [], 
  cuisineHighlight, 
  localStory,
  sampleKitchens = [],
  faqs = []
}) {
  const [activeView, setActiveView] = useState('landing');
  const [legalModal, setLegalModal] = useState({ isOpen: false, policyType: 'privacy' });
  const [toasts, setToasts] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  // Waitlist form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [diet, setDiet] = useState('Both Veg & Non-Veg');

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

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      showToast("Please enter your name and email.", "error");
      return;
    }

    const body = `Hi RuchiRush team! I would like to join the ${areaName} home food launch waitlist:\n\nName: ${name}\nEmail: ${email}\nCorridor: ${areaName}, Hyderabad\nPreference: ${diet}`;
    showToast("Opening WhatsApp to register...", "success");
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(body)}`;
    window.open(waUrl, "_blank");

    setName('');
    setEmail('');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const canonicalSlug = `home-food-${areaName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="min-h-screen bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.85) 0%, rgba(253, 245, 237, 0.95) 100%)">
      
      <Header 
        activeView={activeView}
        navigate={(view) => {
          if (view === 'landing') window.location.href = '/';
          else window.location.href = `/?portal=${view}`;
        }}
      />

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">{areaName} Home Food</span>
        </nav>

        {/* Local Hero Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-primary/20 text-primary text-xs font-bold">
            <span>📍 Hyderabad Corridor: {areaName}</span>
          </div>

          <h1 className="font-h1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-tight max-w-3xl mx-auto">
            {title}
          </h1>

          <p className="text-stone-600 font-body-lg text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {metaDescription}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const el = document.getElementById('local-waitlist');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-orange-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              Join {areaName} Food Waitlist
            </button>
            <Link
              href="/"
              className="border border-primary text-primary bg-white hover:bg-orange-50 font-bold py-3.5 px-8 rounded-full shadow-sm transition-transform hover:scale-105 active:scale-95 text-xs sm:text-sm text-center"
            >
              Explore All Hyderabad Hubs
            </Link>
          </div>
        </section>

        {/* Local Context & Landmarks */}
        <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="font-h2 text-2xl font-bold text-stone-900 font-['Newsreader']">
            Home-Cooked Food in {areaName}
          </h2>
          <div className="text-stone-600 text-sm leading-relaxed space-y-4 font-body-md">
            <p>{localStory}</p>
            <p className="font-semibold text-stone-800">
              Planned delivery coverage for {areaName} residential communities and workplaces near:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {landmarks.map((landmark, idx) => (
                <span key={idx} className="bg-orange-50 text-primary border border-primary/15 rounded-full px-3.5 py-1 text-xs font-semibold">
                  📍 {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How Subscriptions & Trials Work in this area */}
        <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="font-h2 text-2xl font-bold text-stone-900 font-['Newsreader']">
            Try 1 Meal First, Subscribe When Ready
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-xs text-stone-600">
            <div className="p-4 rounded-2xl bg-[#fff8f6] border border-primary/10 space-y-2">
              <h3 className="font-bold text-sm text-stone-900">1. Single Trial</h3>
              <p>Order one lunch or dinner to your home or office in {areaName}. Taste test the quality with zero long-term commitment.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#fff8f6] border border-primary/10 space-y-2">
              <h3 className="font-bold text-sm text-stone-900">2. Weekly Lunch / Dinner</h3>
              <p>Make wholesome food your routine (Mon–Sat). Grouped neighborhood routing keeps meals hot and on time.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#fff8f6] border border-primary/10 space-y-2">
              <h3 className="font-bold text-sm text-stone-900">3. Pause / Skip Anytime</h3>
              <p>Going out or travelling? Easily pause or skip according to plan rules with advance notice.</p>
            </div>
          </div>
        </section>

        {/* Sample Kitchen Profiles (Clearly marked as Demo) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="font-h2 text-2xl font-bold text-stone-900 font-['Newsreader']">
                How Kitchens in {areaName} Will Look
              </h2>
              <p className="text-xs text-stone-500">Representative profiles currently in onboarding.</p>
            </div>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              DEMO PROFILE — EXAMPLE ONLY
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {sampleKitchens.map((kitchen, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                      👩‍🍳
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-base">{kitchen.name}</h3>
                      <p className="text-[11px] text-stone-500 font-medium">📍 {areaName} · {kitchen.specialty}</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 italic">&ldquo;{kitchen.bio}&rdquo;</p>

                  <div className="bg-[#fff8f6] p-3 rounded-xl border border-primary/10 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-semibold">Single Trial</span>
                      <span className="font-black text-stone-900">{kitchen.trialPrice}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase block font-semibold">6-Day Weekly</span>
                      <span className="font-black text-primary">{kitchen.weeklyPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      const el = document.getElementById('local-waitlist');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-primary/10 hover:bg-primary hover:text-white text-primary border border-primary/20 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Request Notification for this Kitchen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Area FAQs */}
        {faqs.length > 0 && (
          <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6">
            <h2 className="font-h2 text-2xl font-bold text-stone-900 font-['Newsreader']">
              Frequently Asked Questions in {areaName}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-stone-100 rounded-2xl p-4 bg-[#fffaf5]">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left font-bold text-xs sm:text-sm text-stone-900 flex justify-between items-center cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-base text-primary">
                      {openFaq === index ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <p className="text-xs text-stone-600 mt-2 pt-2 border-t border-stone-200/50 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Waitlist Form */}
        <section id="local-waitlist" className="bg-[#fff8f6] border-2 border-primary/20 rounded-3xl p-8 shadow-md space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="font-h2 text-2xl font-bold text-primary font-['Newsreader']">
              Join the {areaName} Launch Waitlist
            </h2>
            <p className="text-xs text-stone-600">
              Get notified the moment home kitchens begin deliveries in {areaName}.
            </p>
          </div>

          <form onSubmit={handleWaitlistSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Full Name
              </label>
              <input 
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Email Address
              </label>
              <input 
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Meal Preference
              </label>
              <select
                value={diet}
                onChange={e => setDiet(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Both Veg & Non-Veg">Both Veg & Non-Veg</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Diet / Low Oil / Millets">Diet / Low Oil / Millets</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors shadow-md cursor-pointer mt-2"
            >
              Get Notified for {areaName}
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-primary/10 bg-[#fff8f6] text-stone-700 text-center text-xs space-y-3">
        <p className="font-bold text-stone-900 text-lg font-['Newsreader']">RuchiRush</p>
        <p className="text-stone-500">Connecting local home cooks and food lovers in Hyderabad.</p>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/home-food-gachibowli" className="hover:text-primary">Gachibowli</Link>
          <span>•</span>
          <Link href="/home-food-kondapur" className="hover:text-primary">Kondapur</Link>
          <span>•</span>
          <Link href="/home-food-madhapur" className="hover:text-primary">Madhapur</Link>
          <span>•</span>
          <Link href="/home-food-hi-tech-city" className="hover:text-primary">Hi-Tech City</Link>
        </div>
        <p className="text-stone-400 text-[11px] pt-2">© 2026 RuchiRush. All rights reserved.</p>
      </footer>

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
              <span className="font-body-md font-semibold text-xs">{toast.message}</span>
            </div>
          );
        })}
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen}
        policyType={legalModal.policyType}
        onClose={() => setLegalModal({ isOpen: false, policyType: 'privacy' })}
      />
    </div>
  );
}
