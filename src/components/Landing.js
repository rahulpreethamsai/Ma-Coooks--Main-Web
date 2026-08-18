'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ConnectionCanvas from './ConnectionCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing({ navigate, openLegalModal, Toast }) {
  const heroRef = useRef(null);

  // Active tab for How It Works (Customer vs Chef)
  const [howWorksTab, setHowWorksTab] = useState('customer');

  // Active tab for Join Launch Waitlist (Customer vs Chef)
  const [waitlistRole, setWaitlistRole] = useState('customer');
  const [wlName, setWlName] = useState('');
  const [wlEmail, setWlEmail] = useState('');
  const [wlLocation, setWlLocation] = useState('Gachibowli');
  const [wlDiet, setWlDiet] = useState('Both Veg & Non-Veg');
  const [wlChefSpecialty, setWlChefSpecialty] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);

  // Open FAQ accordion items
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const heroCtx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );
    }, heroRef);

    return () => heroCtx.revert();
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!wlName || !wlEmail) {
      Toast.show("Please enter your name and email address.", "error");
      return;
    }

    const roleText = waitlistRole === 'customer' ? 'Customer Meal Waitlist' : 'Home Chef Application';
    const extraDetails = waitlistRole === 'customer' 
      ? `Diet Preference: ${wlDiet}`
      : `Specialty / Kitchen Concept: ${wlChefSpecialty || 'Traditional Home Meals'}`;

    const body = `Hi RuchiRush team! I would like to join the ${roleText}:\n\nName: ${wlName}\nEmail: ${wlEmail}\nLocation: ${wlLocation}, Hyderabad\n${extraDetails}`;
    
    Toast.show("Opening WhatsApp to confirm your spot...", "success");
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(body)}`;
    window.open(waUrl, "_blank");

    setWlName('');
    setWlEmail('');
    setWlChefSpecialty('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);

    try {
      const response = await fetch("https://formspree.io/f/mkoybqqy", {
        method: "POST",
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: "New contact message from RuchiRush Web App"
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        Toast.show("Thank you! We received your message and will reply within 24 hours.", "success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      Toast.show("Could not send message. Please reach out via WhatsApp.", "error");
    } finally {
      setContactSending(false);
    }
  };

  const faqs = [
    {
      q: "What is RuchiRush?",
      a: "RuchiRush connects customers with local home kitchens offering wholesome home-cooked meals and recurring weekly or monthly meal plans in Hyderabad."
    },
    {
      q: "Is RuchiRush another Swiggy/Zomato?",
      a: "No. RuchiRush focuses specifically on nearby home kitchens and regular home meal subscriptions, not on commercial restaurant delivery."
    },
    {
      q: "Can I try food before subscribing?",
      a: "Yes. Customers can try an individual meal before choosing a weekly or monthly plan."
    },
    {
      q: "Where are you launching?",
      a: "We are initially onboarding kitchens in Hyderabad's IT corridor, starting with Gachibowli, Kondapur, Madhapur, and Hi-Tech City."
    },
    {
      q: "Can I pause my subscription?",
      a: "Yes, according to the pause/skip rules of your selected plan. You can easily skip meals when travelling or dining out."
    },
    {
      q: "How are kitchens verified?",
      a: "Home chefs undergo government FSSAI registration validation, identity verification, kitchen hygiene audits, and food safety qualification before onboarding."
    },
    {
      q: "How do home chefs join?",
      a: "Home chefs can apply, complete verification, create their menu, and set their pricing, availability, and daily cooking capacity."
    },
    {
      q: "Do you deliver everywhere in Hyderabad?",
      a: "Not initially. RuchiRush is starting hyperlocally and expanding area by area to maintain food warmth and practical delivery costs."
    }
  ];

  return (
    <div id="landing-view" className="transition-all duration-300">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (Priority 0)
      ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden pt-32 pb-20 px-6 flex items-center justify-center min-h-[90vh] bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.85) 0%, rgba(253, 245, 237, 0.95) 100%)"
      >
        <ConnectionCanvas />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Location corridor badge */}
          <div className="hero-content-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/70 border border-primary/20 text-primary text-xs md:text-sm font-bold mb-6 shadow-sm">
            <span>📍 Gachibowli · Kondapur · Madhapur · Hi-Tech City</span>
          </div>

          {/* Primary H1 */}
          <h1 className="hero-content-anim font-h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.1] max-w-3xl">
            Home-cooked meals from kitchens near you.
          </h1>

          {/* Supporting text */}
          <p className="hero-content-anim font-body-lg text-base sm:text-lg md:text-xl text-stone-600 mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            Find trusted home kitchens in Hyderabad, try a meal first, and subscribe to weekly or monthly lunch and dinner plans.
          </p>

          {/* CTAs */}
          <div className="hero-content-anim flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('join-launch');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('customer-portal');
              }}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-700 p-4 px-8 rounded-full text-white font-bold text-sm sm:text-base transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-primary/25 cursor-pointer"
            >
              <span>Find Home Food</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            
            <button
              onClick={() => navigate('chef-portal')}
              className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md p-4 px-8 rounded-full text-primary font-bold text-sm sm:text-base border border-primary/30 transition-transform hover:scale-105 active:scale-95 shadow-md hover:bg-white cursor-pointer"
            >
              <span>Become a Home Chef</span>
              <span className="material-symbols-outlined text-lg">soup_kitchen</span>
            </button>
          </div>

          {/* Micro-copy promise */}
          <p className="hero-content-anim text-xs sm:text-sm font-semibold text-stone-500 mt-5">
            Try 1 meal first. Subscribe only if you love it.
          </p>

          {/* Value badges */}
          <div className="hero-content-anim mt-12 w-full max-w-2xl flex flex-wrap justify-center items-center gap-x-8 gap-y-3 border-t border-primary/10 pt-6">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <span className="material-symbols-outlined text-base text-primary">verified</span>
              <span>Verified Home Cooks</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <span className="material-symbols-outlined text-base text-primary">skillet</span>
              <span>Small-Batch Cooking</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <span className="material-symbols-outlined text-base text-primary">pause_circle</span>
              <span>Flexible Pause/Skip</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE PROBLEM / WHY WE EXIST (Priority 0 & 4)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white border-y border-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">The Problem We Solve</span>
          <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Restaurant food every day gets expensive and heavy.
          </h2>
          <p className="font-body-md text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Good home cooks are right around the corner in Hyderabad, but they are hard to discover, trust, and organize daily. 
            <span className="block font-semibold text-stone-900 mt-1">RuchiRush connects you with them for regular, wholesome home meals.</span>
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: HOW IT WORKS (Priority 1)
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6 bg-[#fffaf5]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Simple &amp; Transparent</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              How RuchiRush Works
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-body-md">
              Whether you are looking for wholesome daily food or sharing your family recipes, our loop is built for routine.
            </p>

            {/* Toggle switch between customer & chef flows */}
            <div className="inline-flex p-1 bg-stone-200/80 rounded-full mt-4">
              <button
                onClick={() => setHowWorksTab('customer')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  howWorksTab === 'customer' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                For Customers
              </button>
              <button
                onClick={() => setHowWorksTab('chef')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  howWorksTab === 'chef' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                For Home Chefs
              </button>
            </div>
          </div>

          {/* Customer 4-Step Flow */}
          {howWorksTab === 'customer' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Find</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Enter your area and discover home kitchens near your home or office.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">📍 Hyperlocal discovery</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Try</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Order one lunch or dinner before committing to a plan.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">🍱 Single meal trial</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Subscribe</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Choose a weekly or monthly meal plan from the kitchen you like.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">📅 Weekly / Monthly routine</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    4
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Pause or skip</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Going out or travelling? Pause or skip according to the subscription policy.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">⏸️ Total schedule flexibility</span>
              </div>
            </div>
          )}

          {/* Chef 4-Step Flow */}
          {howWorksTab === 'chef' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Apply</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Tell us about your kitchen and food.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">📝 Quick online form</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Get verified</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Complete the required identity, food-safety and kitchen verification process.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">🛡️ FSSAI &amp; Hygiene checks</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Set your menu</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Choose your dishes, pricing, availability and daily capacity.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">🍲 Complete autonomy</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-sm">
                    4
                  </div>
                  <h3 className="font-h3 text-lg font-bold text-stone-900">Cook &amp; earn</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Receive orders, prepare meals and get paid through RuchiRush.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-primary pt-4 block">💰 10% low commission</span>
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            {howWorksTab === 'customer' ? (
              <button
                onClick={() => {
                  const el = document.getElementById('join-launch');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Find Home Food in Hyderabad
              </button>
            ) : (
              <button
                onClick={() => navigate('chef-portal')}
                className="bg-primary text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Start Your Kitchen Onboarding
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: WHY RUCHIRUSH (Priority 4)
      ───────────────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20 px-6 bg-white border-t border-primary/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Difference</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              Why RuchiRush?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-body-md">
              We are not trying to replace restaurant delivery. We are solving a different problem: regular, nourishing home food from nearby cooks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Home kitchens */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">🏠</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Home kitchens</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Food prepared by local home cooks in small batches with genuine care and home-grade ingredients.
              </p>
            </div>

            {/* 2. Nearby */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">📍</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Nearby</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Start with kitchens within practical delivery distance of your area for hot, punctual deliveries.
              </p>
            </div>

            {/* 3. Know your cook */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">👩‍🍳</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Know your cook</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                See the cook, kitchen profile, menu, availability, and real hygiene verification before ordering.
              </p>
            </div>

            {/* 4. Try first */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">🍱</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Try first</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Order one trial meal before subscribing to make sure the spices, portions, and flavor suit your taste.
              </p>
            </div>

            {/* 5. Weekly & monthly plans */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">📅</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Weekly &amp; monthly plans</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Make home food part of your daily routine instead of ordering from random restaurants every day.
              </p>
            </div>

            {/* 6. Flexible subscriptions */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-3">
              <span className="text-3xl block">⏸️</span>
              <h3 className="font-h3 text-lg font-bold text-stone-900">Flexible subscriptions</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Pause, resume, or skip meals according to plan rules whenever you have office outings or travel plans.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: SUBSCRIPTIONS / MEAL PLANS & REALISTIC DEMO (Priority 2 & 6 & 24)
      ───────────────────────────────────────────────────────────── */}
      <section id="meal-plans" className="py-20 px-6 bg-gradient-to-b from-[#fffaf5] to-[#fff1eb] border-t border-primary/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">The Core Product</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              Your weekly meals, sorted.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-body-md">
              Stop deciding what to eat every day. Choose a nearby home kitchen and make lunch or dinner part of your weekly routine.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: How a RuchiRush kitchen will look (Demo Card) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Mandatory Demo Badge */}
              <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase border border-amber-300">
                  DEMO PROFILE — EXAMPLE ONLY
                </span>
                <span className="text-xs font-semibold text-stone-500">Gachibowli Corridor</span>
              </div>

              {/* Kitchen Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl shadow-sm">
                  👩‍🍳
                </div>
                <div>
                  <h3 className="font-h3 text-xl font-bold text-stone-900">Lakshmi&apos;s Home Kitchen</h3>
                  <p className="text-xs text-stone-500 font-medium">📍 Gachibowli, Hyderabad</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">Specialty: Homestyle Telugu Thali &amp; Phulkas</p>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="grid grid-cols-2 gap-4 bg-[#fff8f6] p-4 rounded-2xl border border-primary/10">
                <div>
                  <p className="text-[11px] uppercase font-bold text-stone-500">Single Trial</p>
                  <p className="text-xl font-black text-stone-900 mt-1">₹120 <span className="text-xs font-normal text-stone-500">/ meal</span></p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Test 1 lunch or dinner</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-primary">6-Day Weekly Plan</p>
                  <p className="text-xl font-black text-primary mt-1">₹700 <span className="text-xs font-normal text-stone-500">/ week</span></p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Mon–Sat regular meal</p>
                </div>
              </div>

              {/* Operational details */}
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">group</span>
                  <span>Daily capacity: <strong>15 meals</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">schedule</span>
                  <span>Lunch slot: <strong>12:00–2:00 PM</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('join-launch');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded-full text-xs font-bold hover:bg-orange-700 transition-colors cursor-pointer shadow-md text-center"
                >
                  Try 1 Meal
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('join-launch');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 border border-primary text-primary bg-white py-3 rounded-full text-xs font-bold hover:bg-orange-50 transition-colors cursor-pointer shadow-sm text-center"
                >
                  View Weekly Plan
                </button>
              </div>

            </div>

            {/* Right: Plan Options Overview */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Single Trial Card */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-h3 text-base font-bold text-stone-900">1. Single Meal Trial</h4>
                  <span className="text-xs font-bold text-stone-600">₹120 – ₹150</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                  Order one lunch or dinner to taste the cook&apos;s spices, fresh phulkas, and portion sizes. No subscription commitment required.
                </p>
              </div>

              {/* Weekly Plan Card (Recommended) */}
              <div className="bg-white p-5 rounded-2xl border-2 border-primary/30 shadow-md space-y-2 relative">
                <span className="absolute top-3 right-3 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Most Popular
                </span>
                <div className="flex justify-between items-center">
                  <h4 className="font-h3 text-base font-bold text-primary">2. 6-Day Weekly Plan</h4>
                  <span className="text-xs font-bold text-primary mr-16">₹700 – ₹850 / week</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                  Six days of wholesome lunch or dinner delivered hot. Pause or skip individual days with simple 12h advance notice.
                </p>
              </div>

              {/* Monthly Plan Card */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-h3 text-base font-bold text-stone-900">3. Monthly Routine Plan</h4>
                  <span className="text-xs font-bold text-stone-600">₹2,600 – ₹3,200 / mo</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                  Month-long peace of mind for busy professionals and students. Includes pause flexibility and rollover meal credits.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: TRY BEFORE YOU SUBSCRIBE (Priority 3)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-h1 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Don&apos;t commit to a month of food you&apos;ve never tried.
          </h2>
          <div className="space-y-1 text-base sm:text-lg text-orange-100 font-body-md">
            <p>Order one meal first.</p>
            <p>Like it? Subscribe.</p>
            <p>Don&apos;t like it? Try another kitchen.</p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('join-launch');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary font-bold py-3.5 px-8 rounded-full text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl cursor-pointer"
            >
              Try 1 Meal
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HYPERLOCAL HYDERABAD LAUNCH (Priority 16 & 22)
      ───────────────────────────────────────────────────────────── */}
      <section id="hyderabad-launch" className="py-20 px-6 bg-white border-t border-primary/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Hyperlocal Strategy</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              Starting small. Starting local.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-body-md">
              We&apos;re building RuchiRush neighborhood by neighborhood in Hyderabad to ensure quick delivery and genuine home-cooked quality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Gachibowli */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Corridor 1</span>
                <h3 className="font-h3 text-xl font-bold text-stone-900">Gachibowli</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Serving DLF Cyber City, IIIT, Financial District, and surrounding apartment communities.
                </p>
              </div>
              <Link 
                href="/home-food-gachibowli"
                className="text-primary text-xs font-bold underline hover:opacity-80 pt-2 block"
              >
                Explore Gachibowli Kitchens →
              </Link>
            </div>

            {/* Kondapur */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Corridor 2</span>
                <h3 className="font-h3 text-xl font-bold text-stone-900">Kondapur</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Serving Botanical Garden Rd, Raghavendra Colony, Whitefields, and residential towers.
                </p>
              </div>
              <Link 
                href="/home-food-kondapur"
                className="text-primary text-xs font-bold underline hover:opacity-80 pt-2 block"
              >
                Explore Kondapur Kitchens →
              </Link>
            </div>

            {/* Madhapur */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Corridor 3</span>
                <h3 className="font-h3 text-xl font-bold text-stone-900">Madhapur</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Serving Cyber Towers, Image Gardens, Mindspace, and paying guest hubs.
                </p>
              </div>
              <Link 
                href="/home-food-madhapur"
                className="text-primary text-xs font-bold underline hover:opacity-80 pt-2 block"
              >
                Explore Madhapur Kitchens →
              </Link>
            </div>

            {/* Hi-Tech City */}
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Corridor 4</span>
                <h3 className="font-h3 text-xl font-bold text-stone-900">Hi-Tech City</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Serving Knowledge City, Inorbit Mall zone, and IT workplaces with daily lunch boxes.
                </p>
              </div>
              <Link 
                href="/home-food-hi-tech-city"
                className="text-primary text-xs font-bold underline hover:opacity-80 pt-2 block"
              >
                Explore Hi-Tech City Kitchens →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: HOW WE BUILD TRUST (Priority 6 & 10 & 23)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#fffaf5] border-t border-primary/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Quality &amp; Reliability</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              How We Build Trust
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-body-md">
              Real safety and operational standards so you can make home food a worry-free daily habit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">Kitchen Verification</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Identity check, government FSSAI registration validation, and kitchen sanitation audits before any cook goes live.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">skillet</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">Small-Batch Cooking</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Home kitchens cook within a defined daily capacity (10–20 meals), preventing commercial mass production.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">local_shipping</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">Reliable Delivery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nearby kitchens and grouped local deliveries keep transit times short, food warm, and delivery costs practical.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">Support Guarantee</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear pause/skip rules and a transparent refund or credit policy if a delivery ever fails to meet standards.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: FOR HOME CHEFS (Priority 1 & 5 & 21)
      ───────────────────────────────────────────────────────────── */}
      <section id="for-chefs" className="py-20 px-6 bg-white border-t border-primary/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">For Culinary Creators</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              For Home Chefs
            </h2>
            <p className="text-xl font-semibold text-primary font-['Newsreader']">
              Keep more of what you earn.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm font-body-md">
              You decide your menu, price, availability and daily capacity. We bring repeat subscription customers to your door.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">percent</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">RuchiRush Commission: 10%</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Chefs retain 90% of order payouts. No listing fees, no hidden onboarding deductions, and zero monthly subscriptions.
              </p>
            </div>

            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">tune</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">You Set Your Capacity</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Cook 5 meals or 20 meals a day. Open slots when you want, close when you need rest. Total control over your schedule.
              </p>
            </div>

            <div className="bg-[#fff8f6] p-6 rounded-2xl border border-primary/15 space-y-3">
              <span className="material-symbols-outlined text-3xl text-primary">moped</span>
              <h3 className="font-h3 text-base font-bold text-stone-900">Doorstep Pickup</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Focus 100% on cooking. Couriers pick up warm, packed meals straight from your home kitchen for delivery.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('chef-portal')}
              className="bg-primary text-white font-bold py-3.5 px-8 rounded-full text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              Become a Home Chef
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: EARLY FEEDBACK & WAITLIST (Priority 7 & 8)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#fffaf5] border-t border-primary/10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Community Insights</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              Early feedback
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-body-md">
              Real feedback from our early users and Hyderabad community interviews.
            </p>
          </div>

          {/* Real launch waitlist metric */}
          <div className="bg-white border-2 border-primary/20 rounded-3xl p-6 text-center max-w-xl mx-auto shadow-sm">
            <p className="text-2xl sm:text-3xl font-black text-primary font-['Newsreader']">
              340+ people have joined the Hyderabad launch waitlist
            </p>
            <p className="text-xs text-stone-500 mt-2 font-medium">
              Connecting IT corridor professionals and families with neighborhood home cooks.
            </p>
          </div>

          {/* Authentic Interview Quotes */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <p className="text-xs text-stone-700 italic leading-relaxed">
                &ldquo;Ordering restaurant food 5 days a week was making me feel sluggish. Having a neighbor prepare fresh phulkas and dal on a weekly lunch plan is exactly what I&apos;ve been looking for.&rdquo;
              </p>
              <p className="text-[11px] font-bold text-stone-500">— Tech Lead &amp; Resident, Gachibowli</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="space-y-3">
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  &ldquo;I love cooking traditional Godavari recipes, but standard food apps take too much commission and demand commercial volume. RuchiRush&apos;s 15-meal daily limit lets me maintain true home taste.&rdquo;
                </p>
                <p className="text-[11px] font-bold text-stone-500">— Home Cook, Kondapur</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11: RUCHIRUSH IS COMING TO MOBILE (Priority 12)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">Mobile Road Map</span>
          <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
            RuchiRush is coming to mobile.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-body-md">
            We&apos;re starting with our web experience and direct onboarding while we build the first Hyderabad kitchen network.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('join-launch');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-white font-bold py-3.5 px-8 rounded-full text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform shadow-md cursor-pointer"
            >
              Join the Launch
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: FREQUENTLY ASKED QUESTIONS (Priority 20)
      ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 bg-[#fffaf5] border-t border-primary/10">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Got Questions?</span>
            <h2 className="font-h2 text-3xl sm:text-4xl font-bold text-stone-900 font-['Newsreader']">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-stone-900 cursor-pointer hover:text-primary transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-primary text-xl">
                    {openFaq === index ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-body-md border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 13: JOIN THE LAUNCH / CONVERSION FORM (Priority 8 & 21)
      ───────────────────────────────────────────────────────────── */}
      <section id="join-launch" className="py-20 px-6 bg-white border-t border-primary/10">
        <div className="max-w-xl mx-auto bg-[#fff8f6] rounded-3xl p-8 border-2 border-primary/20 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-2xl block">🍲</span>
            <h2 className="font-h2 text-3xl font-bold text-primary font-['Newsreader']">
              Join the RuchiRush Launch
            </h2>
            <p className="text-xs text-stone-600 font-body-md">
              Be the first to order or cook when kitchens go live in your Hyderabad neighborhood.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex bg-white p-1 rounded-full border border-stone-200">
            <button
              type="button"
              onClick={() => setWaitlistRole('customer')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                waitlistRole === 'customer' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              I Want Home Food
            </button>
            <button
              type="button"
              onClick={() => setWaitlistRole('chef')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                waitlistRole === 'chef' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              I Want to Sell My Cooking
            </button>
          </div>

          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={wlName}
                onChange={e => setWlName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={wlEmail}
                onChange={e => setWlEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Neighborhood / Corridor
              </label>
              <select
                value={wlLocation}
                onChange={e => setWlLocation(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Gachibowli">Gachibowli, Hyderabad</option>
                <option value="Kondapur">Kondapur, Hyderabad</option>
                <option value="Madhapur">Madhapur, Hyderabad</option>
                <option value="Hi-Tech City">Hi-Tech City, Hyderabad</option>
              </select>
            </div>

            {waitlistRole === 'customer' ? (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Food Preference
                </label>
                <select
                  value={wlDiet}
                  onChange={e => setWlDiet(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Both Veg & Non-Veg">Both Veg &amp; Non-Veg</option>
                  <option value="Diet / Millets / Low Oil">Diet / Millets / Low Oil</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Kitchen Specialty / Concept
                </label>
                <input
                  type="text"
                  placeholder="e.g. Authentic Telugu Thali, Andhra Curries"
                  value={wlChefSpecialty}
                  onChange={e => setWlChefSpecialty(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors shadow-md cursor-pointer mt-2"
            >
              {waitlistRole === 'customer' ? 'Join Customer Launch Waitlist' : 'Submit Chef Application'}
            </button>
          </form>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 14: CONTACT SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
          
          <div className="p-8 sm:p-10 flex flex-col justify-between bg-[#fff8f6]">
            <div>
              <h2 className="font-h2 text-3xl mb-3 text-primary font-bold font-['Newsreader']">
                Get in touch
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-stone-700 leading-relaxed">
                Have questions about subscribing, pausing meals, or onboarding as a home chef? We&apos;re here to help.
              </p>
            </div>
            
            <div className="space-y-4 my-8">
              <div className="flex items-center gap-3 text-stone-800 text-xs sm:text-sm font-semibold">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span>hello@ruchirush.com</span>
              </div>
              <div className="flex items-center gap-3 text-stone-800 text-xs sm:text-sm font-semibold">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>Gachibowli, Hyderabad, Telangana</span>
              </div>
            </div>

            <div>
              <a
                href="https://wa.me/919908574741?text=Hi%20RuchiRush!%20I%20have%20a%20question%20about%20ordering%20or%20joining."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full shadow hover:scale-105 active:scale-95 transition-transform font-bold text-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="p-8 sm:p-10 space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-stone-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-stone-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Message
              </label>
              <textarea
                required
                rows="3"
                placeholder="Tell us what you&apos;d like to know..."
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-stone-900"
              />
            </div>

            <button
              type="submit"
              disabled={contactSending}
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:bg-orange-700 transition-colors shadow-md cursor-pointer"
            >
              {contactSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 15: FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="w-full py-12 px-8 border-t border-primary/10 bg-[#fff8f6] text-stone-700">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <span className="text-3xl font-bold text-stone-900 font-['Newsreader'] block">
              RuchiRush
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Hyderabad&apos;s home kitchen marketplace. Wholesome daily meals, trial lunches, and flexible subscriptions.
            </p>
            <p className="text-[11px] text-stone-400">© 2026 RuchiRush. All rights reserved.</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Hyderabad Hubs</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/home-food-gachibowli" className="hover:text-primary transition-colors">Gachibowli</Link></li>
              <li><Link href="/home-food-kondapur" className="hover:text-primary transition-colors">Kondapur</Link></li>
              <li><Link href="/home-food-madhapur" className="hover:text-primary transition-colors">Madhapur</Link></li>
              <li><Link href="/home-food-hi-tech-city" className="hover:text-primary transition-colors">Hi-Tech City</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Company &amp; Legal</p>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => openLegalModal('about')} className="hover:text-primary transition-colors cursor-pointer text-left">About Us</button></li>
              <li><button onClick={() => openLegalModal('privacy')} className="hover:text-primary transition-colors cursor-pointer text-left">Privacy Policy</button></li>
              <li><button onClick={() => openLegalModal('terms')} className="hover:text-primary transition-colors cursor-pointer text-left">Terms of Service</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Connect</p>
            <p className="text-xs text-stone-600">hello@ruchirush.com</p>
            <p className="text-xs text-stone-600">Gachibowli, Hyderabad, TS 500032</p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/ruchirush_india?igsh=MWttZ3Z1dmlweWhlOA==" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-primary" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
