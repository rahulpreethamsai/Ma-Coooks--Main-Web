'use client';
import { useEffect, useRef, useState } from 'react';
import ConnectionCanvas from './ConnectionCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing({ navigate, openAuthModal, openLegalModal, Toast }) {
  const heroRef = useRef(null);
  const whyUsRef = useRef(null);
  const offerRef = useRef(null);
  const howWorksRef = useRef(null);

  // Contact Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  // How It Works State
  const [activeStep, setActiveStep] = useState(0);

  const testimonials = [
    {
      name: "Nagamani Kamatam",
      role: "Customer from Gachibowli",
      avatar: "https://static.vecteezy.com/system/resources/previews/029/197/032/non_2x/icon-of-social-media-avatar-girl-indian-girl-from-india-indian-culture-portrait-of-a-young-woman-of-national-image-flat-graphic-illustration-vector.jpg",
      rating: 5,
      date: "May 28, 2026",
      quote: "The spicy parotta and egg curry from Priya's Godavari Kitchen was amazing. Tasted exactly like the meals my grandmother cooks back home in Godavari. Verified hygiene scores give me total peace of mind!"
    },
    {
      name: "Nasleen Sheik",
      role: "Customer from Madhapur",
      avatar: "https://img.freepik.com/premium-vector/beautiful-indian-woman-sari-indian-woman-wearing-saree_726899-98.jpg",
      rating: 5,
      date: "June 2, 2026",
      quote: "As a busy software engineer working in Madhapur, I was tired of ordering oily restaurant food. Finding Lakshmi's millet breakfasts was a lifesaver. Extremely light, fresh, and delivered hot daily."
    },
    {
      name: "Srinivas Reddy",
      role: "Customer from Jubilee Hills",
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/051/187/635/small_2x/demure-indian-man-in-cardigan-with-white-shirt-2d-linear-avatar-illustration-south-asian-guy-cartoon-character-face-portrait-head-and-shoulders-round-frame-flat-user-profile-image-isolated-vector.jpg",
      rating: 5,
      date: "June 5, 2026",
      quote: "Srinivas Reddy's Hyderabadi Dum Biryani is authentic slow-cooked gold. You can smell the pure ghee and whole spices the moment you unbox it. The live courier tracking is super reliable."
    }
  ];
  const stepVideos = [
    "https://videos.pexels.com/video-files/13441336/13441336-sd_360_640_24fps.mp4",
    "https://videos.pexels.com/video-files/8279561/8279561-hd_1080_1920_24fps.mp4",
    "https://videos.pexels.com/video-files/4253725/4253725-uhd_2732_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/4440916/4440916-hd_1920_1080_25fps.mp4"
  ];
  const videoRefs = useRef([]);

  useEffect(() => {
    // ── 1. Hero Entrance Animations ──
    const heroCtx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl.fromTo(".hero-word-from-home",
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
      );

      heroTl.fromTo(".hero-word-kitchens",
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      );

      heroTl.fromTo(".hero-word-to-home",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.6"
      );

      heroTl.fromTo(".hero-media-col.chef-side",
        { x: -120, opacity: 0, rotate: -20 },
        { x: 0, opacity: 1, rotate: -5, duration: 1.2, ease: "power4.out" },
        "-=0.7"
      );

      heroTl.fromTo(".hero-media-col.customer-side",
        { x: 120, opacity: 0, rotate: 20 },
        { x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power4.out" },
        "-=1.2"
      );

      heroTl.fromTo(".hero-subheading",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      );

      heroTl.fromTo(".hero-cta-buttons",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      heroTl.fromTo(".trust-badge",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );

      heroTl.fromTo(".hero-trust-indicators",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.8"
      );

      // Floating animations
      gsap.to(".chef-hat-wrapper", {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      gsap.to(".plate-wrapper", {
        y: 12,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
    }, heroRef);

    // ── 2. Hero Mouse Parallax Effect ──
    const handleMouseMove = (e) => {
      const heroSection = heroRef.current;
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(heroSection.querySelectorAll(".parallax-bg"), {
        x: x * 35,
        y: y * 35,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(heroSection.querySelector(".hero-text-col"), {
        x: x * 12,
        y: y * 12,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(heroSection.querySelectorAll(".hero-media-col"), {
        x: x * -20,
        y: y * -20,
        duration: 1,
        ease: "power2.out"
      });
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener("mousemove", handleMouseMove);
    }

    // ── 3. ScrollTrigger Animations ──
    const whyUsCtx = gsap.context(() => {
      gsap.from(".why-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".why-left",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });
      gsap.from(".why-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".why-right",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });
    }, whyUsRef);

    const offerCtx = gsap.context(() => {
      gsap.from(".offer-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".offer-card",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      });
    }, offerRef);

    // ── 4. How It Works Interactive Scroll Trigger ──
    const howCtx = gsap.context(() => {
      const cards = gsap.utils.toArray(".how-works-step-card");
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            setActiveStep(index);
          },
          onEnterBack: () => {
            setActiveStep(index);
          }
        });
      });
    }, howWorksRef);

    return () => {
      if (heroEl) {
        heroEl.removeEventListener("mousemove", handleMouseMove);
      }
      heroCtx.revert();
      whyUsCtx.revert();
      offerCtx.revert();
      howCtx.revert();
    };
  }, []);

  // Handle active video playback transitions
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeStep) {
        vid.classList.add("active-media");
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      } else {
        vid.classList.remove("active-media");
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeStep]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    const card = document.querySelectorAll('.how-works-step-card')[index];
    if (card) {
      const offset = window.innerHeight / 2 - card.offsetHeight / 2;
      const top = card.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Contact Form Submission AJAX
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormSuccess(false);
    setFormError(false);

    try {
      const response = await fetch("https://formspree.io/f/mkoybqqy", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
          _subject: "New contact message from Ruchi Rush Next.js App"
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setFormSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        Toast.show("Message sent! We'll reply within 24 hours.", "success");
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (err) {
      console.error(err);
      setFormError(true);
      Toast.show("Failed to send message. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="landing-view" className="transition-all duration-300">

      {/* SECTION 1: STORYTELLING HERO */}
      <section
        ref={heroRef}
        id="hero-storytelling"
        className="relative overflow-hidden pt-28 pb-12 px-6 flex items-center justify-center min-h-[95vh] bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%)"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover'
        }}
      >
        <svg width="0" height="0" className="absolute w-0 h-0">
          <defs>
            <clipPath id="chef-hat-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.28,0.85 C 0.45,0.92 0.60,0.92 0.78,0.83 L 0.78,0.55 C 0.92,0.55 0.98,0.42 0.88,0.30 C 0.80,0.20 0.70,0.08 0.60,0.08 C 0.45,0.08 0.35,0.18 0.28,0.22 C 0.18,0.25 0.05,0.38 0.08,0.50 C 0.10,0.58 0.20,0.58 0.28,0.58 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Connection Canvas particle simulation */}
        <ConnectionCanvas />

        {/* Parallax elements */}
        <div className="parallax-bg absolute top-20 left-10 w-24 h-24 opacity-[0.04] pointer-events-none transform -rotate-12 text-primary">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M25,50 C25,35 35,25 50,25 C65,25 75,35 75,50 C80,50 85,55 85,62 C85,70 78,75 70,75 L30,75 C22,75 15,70 15,62 C15,55 20,50 25,50 Z" />
            <path d="M30,75 L30,85 C30,87 32,89 35,89 L65,89 C68,89 70,87 70,85 L70,75" />
            <line x1="30" y1="80" x2="70" y2="80" />
          </svg>
        </div>
        <div className="parallax-bg absolute bottom-20 left-20 w-28 h-28 opacity-[0.04] pointer-events-none transform rotate-15 text-primary">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20,50 C20,65 30,75 50,75 C70,75 80,65 80,50 L20,50 Z" />
            <path d="M25,75 L35,90 C36,92 38,93 40,93 L60,93 C62,93 64,92 65,90 L75,75" />
            <path d="M40,40 C40,30 45,35 45,25 M50,42 C50,32 55,37 55,27 M60,40 C60,30 65,35 65,25" />
          </svg>
        </div>
        <div className="parallax-bg absolute top-24 right-16 w-24 h-24 opacity-[0.04] pointer-events-none transform rotate-45 text-primary">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50,15 C50,15 35,35 35,55 C35,70 42,75 50,85 C58,75 65,70 65,55 C65,35 50,15 50,15 Z" />
            <path d="M50,15 L50,85" />
            <path d="M50,35 C42,40 40,48 40,48" />
            <path d="M50,50 C58,55 60,63 60,63" />
            <path d="M50,60 C42,65 40,73 40,73" />
          </svg>
        </div>
        <div className="parallax-bg absolute bottom-16 right-24 w-28 h-28 opacity-[0.04] pointer-events-none transform -rotate-15 text-primary">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M35,25 L65,25 C70,25 72,28 72,32 L68,40 C80,45 85,55 85,67 C85,82 72,92 50,92 C28,92 15,82 15,67 C15,55 20,45 32,40 L28,32 C28,28 30,25 35,25 Z" />
            <ellipse cx="50" cy="25" rx="15" ry="4" />
            <path d="M16,65 C16,65 30,70 50,70 C70,70 84,65 84,65" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto hero-container">
          {/* Left Column: Chef Side (Hidden on Mobile) */}
          <div className="hero-media-col chef-side parallax-mid opacity-0 hidden xl:block">
            <div className="chef-hat-wrapper">
              <svg className="chef-hat-svg-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 28,85 C 45,92 60,92 78,83 L 78,55 C 92,55 98,42 88,30 C 80,20 70,8 60,8 C 45,8 35,18 28,22 C 18,25 5,38 8,50 C 10,58 20,58 28,58 Z"
                  fill="none" stroke="rgba(255, 127, 50, 0.4)" strokeWidth="1.5" strokeDasharray="2,2" className="chef-hat-dashed-outline" />
                <path d="M 28,58 C 45,65 60,65 78,55" fill="none" stroke="rgba(255, 127, 50, 0.3)" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M 38,59 C 34,45 38,30 42,22" fill="none" stroke="rgba(255, 127, 50, 0.25)" strokeWidth="1.2" strokeDasharray="2,2" />
                <path d="M 48,61 C 46,42 50,30 52,15" fill="none" stroke="rgba(255, 127, 50, 0.25)" strokeWidth="1.2" strokeDasharray="2,2" />
                <path d="M 58,60 C 58,45 62,32 68,20" fill="none" stroke="rgba(255, 127, 50, 0.25)" strokeWidth="1.2" strokeDasharray="2,2" />
                <path d="M 68,57 C 70,45 74,38 80,32" fill="none" stroke="rgba(255, 127, 50, 0.25)" strokeWidth="1.2" strokeDasharray="2,2" />
              </svg>
              <div className="chef-hat-video-container">
                <video className="chef-hat-video" autoPlay muted loop playsInline preload="metadata">
                  <source src="https://res.cloudinary.com/dt79nhjkc/video/upload/v1781166372/samples/elephants.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="chef-hat-label">Verified Home Chef</div>
            </div>
          </div>

          {/* Center Column: Text Content */}
          <div className="hero-text-col text-center flex flex-col items-center">
            <h1 className="hero-title flex flex-col items-center leading-[1.05] tracking-tight text-on-surface">
              <span className="hero-word-from-home font-h1 text-5xl md:text-6xl lg:text-7xl font-bold opacity-0">FROM HOME</span>
              <span className="hero-word-kitchens font-h1 text-6xl md:text-7xl lg:text-8xl font-black text-primary block my-1 md:my-2 opacity-0">KITCHENS</span>
              <span className="hero-word-to-home font-h1 text-5xl md:text-6xl lg:text-7xl font-bold opacity-0">TO YOUR HOME</span>
            </h1>

            <p className="hero-subheading font-body-lg text-body-lg text-on-surface-variant my-8 max-w-xl mx-auto leading-relaxed opacity-0">
              Not restaurant food. Real home food made by real people. Experience the warmth of a kitchen that cares.
            </p>

            <div className="hero-cta-buttons flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto opacity-0 z-10">
              <button
                onClick={() => navigate('customer-portal')}
                className="eat-trigger flex items-center justify-center gap-2 bg-primary p-4 px-8 rounded-full text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-primary/20 cursor-pointer"
              >
                I WANT TO EAT
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3J1N3o2cmE0YWkxNXF5NGFwNmF1eHM4ZHJ5NTF0dGxpajkzMHBxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jUuhj2J2sYgV7VsW5h/giphy.gif"
                  width="30" height="30" className="brightness-0 invert" alt="eat icon" />
              </button>
              <button
                onClick={() => navigate('chef-portal')}
                className="cook-trigger flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-4 px-8 rounded-full text-primary font-bold border border-primary/25 transition-transform hover:scale-105 active:scale-95 shadow-xl hover:bg-white cursor-pointer"
              >
                I WANT TO COOK
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG44YWZta2l3bWNzeGxxMmh3aHRvOTdneDR3YXRqaDJ1MGlrbzAzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SJJhxzipvPyi5zyOvT/giphy.gif"
                  width="30" height="30" alt="cook icon" />
              </button>
            </div>

            <div className="hero-trust-indicators mt-9 w-full max-w-2xl flex flex-wrap justify-center items-center gap-x-8 gap-y-4 border-t border-primary/10 pt-8 opacity-0">
              <div className="trust-badge flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl text-primary">verified</span>
                <span>Verified Kitchens</span>
              </div>
              <div className="trust-badge flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl text-primary">female</span>
                <span>Women-led Home Businesses</span>
              </div>
              <div className="trust-badge flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl text-primary">soup_kitchen</span>
                <span>Freshly Cooked</span>
              </div>
              <div className="trust-badge flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl text-primary">diversity_3</span>
                <span>Community Driven</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Side (Hidden on Mobile) */}
          <div className="hero-media-col customer-side parallax-mid opacity-0 hidden xl:block">
            <div className="plate-wrapper">
              <div className="plate-rim-circle-1"></div>
              <div className="plate-rim-circle-2"></div>
              <div className="plate-inner">
                <video className="plate-video" autoPlay muted loop playsInline preload="metadata">
                  <source src="https://videos.pexels.com/video-files/8811044/8811044-sd_640_360_25fps.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="plate-label">Happy Family Dining</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <div ref={whyUsRef} className="why-choose-us bg-white">
        <section id="why-us" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="font-h2 text-4xl text-center mb-12 font-bold text-on-primary-fixed-variant">Why choose Ruchi Rush?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Other Apps */}
            <div className="why-left bg-stone-100 p-8 rounded-2xl border border-stone-200 flex flex-col gap-4 opacity-75 grayscale">
              <h3 className="font-h2 text-2xl text-stone-700 font-bold">Standard Delivery Apps</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 font-body-md text-stone-600">
                  <span className="material-symbols-outlined text-red-500 font-bold">close</span>
                  High 30% commission per order
                </li>
                <li className="flex items-center gap-2 font-body-md text-stone-600">
                  <span className="material-symbols-outlined text-red-500 font-bold">close</span>
                  Industrial kitchen mass production
                </li>
                <li className="flex items-center gap-2 font-body-md text-stone-600">
                  <span className="material-symbols-outlined text-red-500 font-bold">close</span>
                  Anonymous, transactional experience
                </li>
              </ul>
            </div>

            {/* Ruchi Rush */}
            <div className="why-right bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-2xl border-2 border-primary/20 shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h3 className="font-h2 text-2xl text-primary font-bold">Ruchi Rush Connection</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">RECOMMENDED</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 font-body-md font-semibold text-stone-800">
                  <span className="material-symbols-outlined text-green-600 font-bold">check</span>
                  Low 8% commission — Chefs keep more
                </li>
                <li className="flex items-center gap-2 font-body-md font-semibold text-stone-800">
                  <span className="material-symbols-outlined text-green-600 font-bold">check</span>
                  Real homemade food, small batches
                </li>
                <li className="flex items-center gap-2 font-body-md font-semibold text-stone-800">
                  <span className="material-symbols-outlined text-green-600 font-bold">check</span>
                  Human stories behind every recipe
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: WHAT WE OFFER */}
      <section ref={offerRef} id="what-we-offer" className="what-we-offer py-20 px-6 bg-stone-50">
        <div className="offer-card max-w-7xl mx-auto">
          <h2 className="font-h2 text-4xl text-center mb-12 font-bold text-on-primary-fixed-variant">What we offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-6 overflow-hidden flex flex-col shadow-sm border border-stone-200 group">
              <img className="w-full h-2/3 object-cover rounded-xl mb-4 transition-transform"
                src="https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg"
                alt="Authentic home cooked stews and curries" />
              <h3 className="font-h3 text-xl mb-1">Pre-order meals</h3>
              <p className="font-body-md text-stone-600">Reserve authentic dishes 24h in advance for peak freshness and personalization.</p>
            </div>

            <div className="md:col-span-2 bg-orange-100/40 rounded-2xl p-6 flex items-center justify-between border border-primary/5">
              <div>
                <h3 className="font-h3 text-xl mb-1 text-primary">Office meal plans</h3>
                <p className="font-body-md text-stone-600">Bring home-cooked warmth to your workspace lunch daily.</p>
              </div>
              <span className="material-symbols-outlined text-5xl text-primary/80">corporate_fare</span>
            </div>

            <div className="bg-primary/90 rounded-2xl p-6 flex flex-col justify-end text-white shadow-lg">
              <span className="material-symbols-outlined text-4xl mb-2">groups</span>
              <h3 className="font-bold uppercase mb-1 text-xs tracking-wider">Community Circles</h3>
              <p className="text-sm text-orange-50">Join local neighborhood food swaps and cookouts.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 flex flex-col justify-end shadow-sm">
              <img className="w-12 h-12 rounded-full object-cover mb-3"
                src="https://thumbs.dreamstime.com/b/cartoon-chef-hat-orange-background-playful-cartoon-chef-hat-bright-orange-background-424160968.jpg"
                alt="Verified chef badge" />
              <h3 className="font-bold uppercase mb-1 text-xs tracking-wider text-stone-500">Chef Profiles</h3>
              <p className="text-sm text-stone-600">Meet the local hands and hearts that prepare your food.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST & TRANSPARENCY */}
      <div className="trust-section bg-gradient-to-br from-orange-50 to-orange-100/50 text-stone-900 border-y border-primary/5">
        <section className="py-20 px-6 text-center max-w-4xl mx-auto">
          <h2 className="font-h2 text-4xl mb-4 font-bold text-stone-900">Transparency You Can Feel</h2>
          <p className="font-body-lg text-stone-700 mb-8 max-w-2xl mx-auto">
            We don't just vet the food; we know the people. Every kitchen is inspected and every chef is certified for safety, passion, and heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="premium-glow-btn flex items-center gap-2 bg-white border border-primary/15 px-6 py-3 rounded-full shadow-sm"
              style={{ animationDelay: '0s' }}
            >
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <span className="font-semibold text-sm text-stone-800">Inspected Kitchens</span>
            </button>
            <button
              className="premium-glow-btn flex items-center gap-2 bg-white border border-primary/15 px-6 py-3 rounded-full shadow-sm"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="material-symbols-outlined text-primary">health_and_safety</span>
              <span className="font-semibold text-sm text-stone-800">Hygiene Certified</span>
            </button>
            <button
              className="premium-glow-btn flex items-center gap-2 bg-white border border-primary/15 px-6 py-3 rounded-full shadow-sm"
              style={{ animationDelay: '0.8s' }}
            >
              <span className="material-symbols-outlined text-primary">contact_page</span>
              <span className="font-semibold text-sm text-stone-800">Identity Verified</span>
            </button>
          </div>
        </section>
      </div>

      {/* SECTION 6: HOW IT WORKS CAROUSEL */}
      <section ref={howWorksRef} className="pt-20 pb-12 px-6 bg-white" id="how-it-works">
        <div className="max-w-7xl p-6 mx-auto">
          <h2 className="how-works-title text-4xl font-bold font-['Newsreader'] text-center mb-10 text-on-primary-fixed-variant">How Ruchi Rush Works</h2>

          <div className="how-works-grid">
            {/* Sticky Media Column */}
            <div className="how-works-media-col">
              <div className="how-works-media-wrapper">
                {stepVideos.map((url, idx) => (
                  <video
                    key={idx}
                    ref={el => videoRefs.current[idx] = el}
                    className="how-works-video"
                    muted
                    playsInline
                    preload="none"
                  >
                    <source src={url} type="video/mp4" />
                  </video>
                ))}
              </div>
            </div>

            {/* Steps Column */}
            <div className="how-works-steps-col">
              <div className={`how-works-step-card ${activeStep === 0 ? 'active-step' : ''}`} onClick={() => handleStepClick(0)}>
                <div className="step-badge">1</div>
                <h3 className="font-h3 text-xl mb-1 font-semibold text-stone-900">Browse & Order</h3>
                <p className="font-body-md text-stone-600">Explore authentic meals from certified home chefs in your local neighborhood and place your order instantly.</p>
              </div>

              <div className={`how-works-step-card ${activeStep === 1 ? 'active-step' : ''}`} onClick={() => handleStepClick(1)}>
                <div className="step-badge">2</div>
                <h3 className="font-h3 text-xl mb-1 font-semibold text-stone-900">Chef Prepares</h3>
                <p className="font-body-md text-stone-600">Our checked home chefs source fresh ingredients and prepare your meal with traditional home-cooked love and care.</p>
              </div>

              <div className={`how-works-step-card ${activeStep === 2 ? 'active-step' : ''}`} onClick={() => handleStepClick(2)}>
                <div className="step-badge">3</div>
                <h3 className="font-h3 text-xl mb-1 font-semibold text-stone-900">Packed Clean</h3>
                <p className="font-body-md text-stone-600">Meals are packed in premium, eco-friendly, and temperature-insulated containers to preserve peak freshness.</p>
              </div>

              <div className={`how-works-step-card ${activeStep === 3 ? 'active-step' : ''}`} onClick={() => handleStepClick(3)}>
                <div className="step-badge">4</div>
                <h3 className="font-h3 text-xl mb-1 font-semibold text-stone-900">Hot Delivery</h3>
                <p className="font-body-md text-stone-600">Our delivery partners pick up and deliver the hot meal directly to your doorstep with live order tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-stone-50 to-orange-50/20" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">What Our Customers Say</span>
            <h2 className="font-h2 text-4xl font-bold mt-2 text-black font-['Newsreader']">Loved by Neighbors, Made by Hand</h2>
            <p className="text-sm text-stone-500 mt-3 font-body-md">See why families and professionals across Hyderabad trust Ruchi Rush for daily home cooking.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 rounded-2xl shadow-2xl flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <span className="text-6xl text-yellow-500 absolute top-4 right-6 font-serif">“</span>
                <div className="space-y-4">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined fill-current text-sm">star</span>
                    ))}
                  </div>
                  <p className="text-black text-sm leading-relaxed font-medium italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-orange-700">
                  <img src={t.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-primary/10" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-black text-sm">{t.name}</h4>
                    <p className="text-[11px] text-stone-500 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: QUOTE BAR */}
      <section className="relative h-[360px] flex items-center justify-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover scale-110"
          src="https://img.magnific.com/free-photo/healthy-lunch-meal-with-cooked-beef-curry-generated-by-ai_188544-38833.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Delicious table spread" />
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[4px]"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <blockquote className="font-h1 text-4xl italic mb-4">"Food is not just eaten. It is felt."</blockquote>
          <p className="font-bold tracking-widest text-xs uppercase text-orange-200">— THE RUCHI RUSH PHILOSOPHY</p>
        </div>
      </section>

      {/* SECTION 8: OUR PROMISE TO HOME CHEFS */}
      <div id="chef-promise">
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-primary/10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Commitment</span>
            <h2 className="font-h2 text-4xl font-bold mt-2 text-black font-['Newsreader']">Our Promise to Home Chefs</h2>
            <p className="text-sm text-stone-500 mt-3 font-body-md">We believe in a fair, community-first food economy. Here is our pledge to every culinary partner on our platform.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Side: Visual Commission Graph Card */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-stone-200 shadow-xl space-y-6">
              <h3 className="font-h3 text-xl font-bold text-stone-900">Why Chefs Earn More</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                We keep our operational costs low and pass the savings back to our neighborhood partners.
              </p>

              {/* Commission bars comparison */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-500">
                    <span>Other Apps Commission</span>
                    <span className="text-red-600">30%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-850">
                    <span>Ruchi Rush Commission</span>
                    <span className="text-primary">8%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 text-center">
                <span className="text-xs font-black text-primary">Chefs Retain 92% of Sales Payouts!</span>
              </div>
            </div>

            {/* Right Side: Promise Items Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-2xl transition-shadow">
                <span className="material-symbols-outlined text-3xl text-primary">account_balance_wallet</span>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">92% Chef Payouts</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-body-md">You keep 92% of your hard-earned revenue. No listing fees, no setup charges, and zero hidden operational costs.</p>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-2xl transition-shadow">
                <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">Vetted Culinary Trust</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-body-md">We verify your kitchen safety and FSSAI credentials to build premium neighborhood trust and brand recognition.</p>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-2xl transition-shadow">
                <span className="material-symbols-outlined text-3xl text-primary">schedule</span>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">Complete Autonomy</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-body-md">You decide your own menu, set your own pricing, select prep slots, and open/close your kitchen at your convenience.</p>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-2xl transition-shadow">
                <span className="material-symbols-outlined text-3xl text-primary">local_shipping</span>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">Doorstep Courier Pickup</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-body-md">Focus purely on cooking. Vetted local couriers pick up orders directly from your doorstep and deliver them in insulated bags.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 8.5: DOWNLOAD APP NOW (PLAYSTORE APP ANIMATION) */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#ffeae0] to-[#fff8f6] text-stone-900 relative overflow-hidden border-t border-primary/5" id="download-app">
        {/* Subtle orange circular glows in background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: CTA details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Ruchi Rush Mobile App</span>
            <h2 className="font-h2 text-4xl lg:text-5xl font-bold font-['Newsreader'] leading-tight text-stone-900">Homemade Warmth, Delivered in a Tap</h2>
            <p className="text-sm text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body-md">
              Download our mobile app to track deliveries live, chat directly with home chefs, and easily pre-order custom meals for your family.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              {/* Mock PlayStore Button */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); Toast.show("App downloading starts shortly...", "success"); }}
                className="bg-black border border-stone-850 hover:bg-stone-900 text-white flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3.00005C4.7 3.00005 4.4 3.10005 4.2 3.30005L13.8 12.9L18.4 8.30005L5.7 1.20005C5.4 1.00005 5.2 3.00005 5 3.00005ZM3.2 4.30005C3.1 4.50005 3 4.70005 3 5.00005V19C3 19.3 3.1 19.5 3.2 19.7L12.4 11.5L3.2 4.30005ZM14.8 13.9L4.2 20.7C4.4 20.9 4.7 21 5 21C5.2 21 5.4 20.9 5.7 20.8L18.4 13.7L14.8 13.9ZM14.8 12.5L20.1 9.50005C20.6 9.20005 21 8.60005 21 8.00005C21 7.40005 20.6 6.80005 20.1 6.50005L14.8 9.50005L13.8 10.5L14.8 12.5Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase leading-none font-bold">GET IT ON</p>
                  <p className="text-sm font-black mt-0.5 leading-none">Google Play</p>
                </div>
              </a>

              {/* Mock AppStore Button */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); Toast.show("App downloading starts shortly...", "success"); }}
                className="bg-black border border-stone-850 hover:bg-stone-900 text-white flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5ZM15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase leading-none font-bold">Download on the</p>
                  <p className="text-sm font-black mt-0.5 leading-none">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: PlayStore App Download Mockup Animation */}
          <div className="lg:col-span-5 flex justify-center">
            {/* CSS Phone Frame */}
            <div className="relative w-[240px] h-[480px] bg-white rounded-[40px] border-4 border-stone-200 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
              {/* Speaker notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-200 rounded-full z-25"></div>

              {/* In-app mockup wrapper */}
              <div className="relative w-full h-full bg-[#fff8f6] rounded-[30px] overflow-hidden flex flex-col p-4 z-10 justify-between border border-stone-100">

                {/* Mock header */}
                <div className="flex justify-between items-center text-[10px] text-stone-500">
                  <span className="font-bold">Ruchi Rush Live</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    <span className="text-green-600 font-bold uppercase tracking-wider">Active</span>
                  </div>
                </div>

                {/* Radar tracking map animation */}
                <div className="relative w-full h-[180px] bg-orange-50/50 rounded-2xl overflow-hidden border border-primary/10 flex items-center justify-center">
                  {/* Grid lines pattern */}
                  <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                  {/* Pulsing radar rings */}
                  <div className="absolute w-24 h-24 rounded-full border border-primary/30 bg-primary/10 ani-radar"></div>
                  <div className="absolute w-36 h-36 rounded-full border border-primary/25 bg-primary/5 ani-radar" style={{ animationDelay: '0.8s' }}></div>

                  {/* Map Pin Point (Chef Location) */}
                  <div className="absolute left-6 top-12 flex flex-col items-center">
                    <span className="text-base">🏡</span>
                    <span className="text-[7px] bg-primary text-white px-1 rounded-full font-bold">Priya's</span>
                  </div>

                  {/* Dashed Route Path */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 180">
                    <path d="M 40,80 Q 90,40 120,90 T 160,110" fill="none" stroke="rgba(158,67,0,0.4)" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>

                  {/* Animated Delivery Bike Emoji traveling the path */}
                  <div className="absolute left-6 top-12 text-base ani-bike">🛵</div>

                  {/* Map Pin Point (Customer Location) */}
                  <div className="absolute right-6 bottom-10 flex flex-col items-center">
                    <span className="text-base text-primary animate-bounce">📍</span>
                    <span className="text-[7px] bg-stone-200 text-stone-850 px-1 rounded-full font-bold">You</span>
                  </div>
                </div>

                {/* Simulated Order Status Slide-up card */}
                <div className="bg-white border border-primary/10 rounded-xl p-3 space-y-2 text-left ani-status-card shadow-sm">
                  <div className="flex justify-between items-center text-[7px] text-stone-500 uppercase tracking-widest font-bold">
                    <span>Order Tracking</span>
                    <span className="text-primary">On Its Way</span>
                  </div>
                  <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-[9px] font-bold text-stone-800 truncate">Rider Ramesh is 2 mins away</p>
                </div>

                {/* Action button inside app mock */}
                <button
                  onClick={() => Toast.show("PWA installation triggered!", "info")}
                  className="w-full bg-primary text-white text-[9px] py-2 rounded-full font-bold shadow-md active:scale-95 transition-transform cursor-pointer"
                >
                  Download Native App
                </button>
              </div>

              {/* Bottom home button bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-stone-300 rounded-full z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CONTACT */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="contact">
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
          <div className="get-in-touch p-10 flex flex-col justify-between text-stone-850">
            <div>
              <h2 className="font-h2 text-3xl mb-4 text-primary font-bold">Get in touch</h2>
              <p className="font-body-md text-stone-700">Have questions about becoming a chef or ordering? We're here to help.</p>
            </div>
            <div className="space-y-4 mt-8 md:mt-0">
              <div className="flex items-center gap-3 text-stone-700">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="font-body-md font-semibold">hello@ruchirush.com</span>
              </div>
              <div className="flex items-center gap-3 text-stone-700">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="font-body-md font-semibold">Hyderabad, Telangana</span>
              </div>
              <a href="https://wa.me/919999999999?text=Hi%20Ruchi%20Rush!%20I%20have%20a%20question."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 mt-6 bg-[#25D366] text-white px-6 py-3 rounded-full w-fit transition-transform hover:scale-105 active:scale-95 shadow-md font-semibold text-sm cursor-pointer"
              >
                <span className="material-symbols-outlined">chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="p-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500" htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" required placeholder="Jane"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500" htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" required placeholder="Doe"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="jane@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500" htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows="4" placeholder="Tell us what's on your mind..."
                value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <button id="submitBtn" type="submit" disabled={sending}
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm transition-transform active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              {sending && (
                <span id="submitSpinner">
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                </span>
              )}
            </button>

            {formSuccess && (
              <div className="text-center py-2 px-4 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100 animate-fade-in">
                ✅ Message sent! We'll reply within 24 hours.
              </div>
            )}
            {formError && (
              <div className="text-center py-2 px-4 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100 animate-fade-in">
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-primary/10 bg-[#fff8f6] text-stone-750">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-3xl font-bold text-stone-900 font-['Newsreader']">Ruchi Rush</span>
          <span className="text-stone-500 text-sm font-['Newsreader']">© 2026 Ruchi Rush. Made with love.</span>
        </div>
        <div>
          <h1 className="text-stone-900 text-md font-bold uppercase tracking-wider mb-2">Follow Us</h1>
          <div className="flex gap-2 items-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-primary transition-colors p-2" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/ruchirush_india?igsh=MWttZ3Z1dmlweWhlOA==" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-primary transition-colors p-2" aria-label="Instagram">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-primary transition-colors p-2" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex gap-6 font-semibold text-sm text-stone-700">
          <button onClick={() => openLegalModal('about')} className="hover:text-primary transition-colors cursor-pointer">About Us</button>
          <button onClick={() => openLegalModal('privacy')} className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => openLegalModal('terms')} className="hover:text-primary transition-colors cursor-pointer">Terms of Service</button>
        </div>
        <div className="text-center md:text-right text-stone-700 font-medium">
          <h1 className="text-stone-900 text-md font-bold uppercase tracking-wider mb-1">Address</h1>
          <p className="text-stone-650 text-sm">Gachibowli, Hyderabad, TS</p>
        </div>
      </footer>
    </div>
  );
}
