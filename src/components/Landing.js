'use client';
import { useEffect, useRef, useState } from 'react';
import ConnectionCanvas from './ConnectionCanvas';
import MobileAppShowcase from './MobileAppShowcase';
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

  const [howWorksTab, setHowWorksTab] = useState('customer');

  // Contact & Launch Registration Form State
  const [formTab, setFormTab] = useState('customer'); // 'customer' or 'chef'
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('Gachibowli, Hyd');
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  // How It Works State
  const [activeStep, setActiveStep] = useState(0);

  const faqs = [
    {
      q: "What is RuchiRush?",
      a: "RuchiRush connects customers with near by local home kitchens offering wholesome home-cooked meals and recurring weekly or monthly meal plans in Hyderabad."
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


  // const testimonials = [
  //   {
  //     name: "Nagamani Kamatam",
  //     role: "Customer from Gachibowli",
  //     avatar: "https://static.vecteezy.com/system/resources/previews/029/197/032/non_2x/icon-of-social-media-avatar-girl-indian-girl-from-india-indian-culture-portrait-of-a-young-woman-of-national-image-flat-graphic-illustration-vector.jpg",
  //     rating: 5,
  //     date: "May 28, 2026",
  //     quote: "The spicy parotta and egg curry from Priya's Godavari Kitchen was amazing. Tasted exactly like the meals my grandmother cooks back home in Godavari. Verified hygiene scores give me total peace of mind!"
  //   },
  //   {
  //     name: "Nasleen Sheik",
  //     role: "Customer from Madhapur",
  //     avatar: "https://img.freepik.com/premium-vector/beautiful-indian-woman-sari-indian-woman-wearing-saree_726899-98.jpg",
  //     rating: 5,
  //     date: "June 2, 2026",
  //     quote: "As a busy software engineer working in Madhapur, I was tired of ordering oily restaurant food. Finding Lakshmi's millet breakfasts was a lifesaver. Extremely light, fresh, and delivered hot daily."
  //   },
  //   {
  //     name: "Arjun",
  //     role: "Customer from Jubilee Hills",
  //     avatar: "https://static.vecteezy.com/system/resources/thumbnails/051/187/635/small_2x/demure-indian-man-in-cardigan-with-white-shirt-2d-linear-avatar-illustration-south-asian-guy-cartoon-character-face-portrait-head-and-shoulders-round-frame-flat-user-profile-image-isolated-vector.jpg",
  //     rating: 5,
  //     date: "June 5, 2026",
  //     quote: "Arjun's Hyderabadi Dum Biryani is authentic slow-cooked gold. You can smell the pure ghee and whole spices the moment you unbox it. The live courier tracking is super reliable."
  //   }
  // ];
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
      const whyLeft = whyUsRef.current?.querySelector(".why-left");
      const whyRight = whyUsRef.current?.querySelector(".why-right");

      if (whyLeft) {
        gsap.from(whyLeft, {
          x: -100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: whyLeft,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        });
      }

      if (whyRight) {
        gsap.from(whyRight, {
          x: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: whyRight,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        });
      }
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

    // ── 4. How It Works Scroll-Pinned Step Reveal ──
    const howCtx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      const section = howWorksRef.current;
      if (!section) return;

      const pinTarget = section.querySelector('.how-works-pin-wrapper');
      const stepPanels = gsap.utils.toArray('.how-works-step-panel');

      if (!pinTarget || stepPanels.length === 0) return;

      // Pin the two-column layout for the full scroll journey
      ScrollTrigger.create({
        trigger: pinTarget,
        start: 'top top',
        end: () => `+=${stepPanels.length * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Reveal each step panel one at a time
      stepPanels.forEach((panel, index) => {
        const totalSteps = stepPanels.length;
        const segmentSize = 1 / totalSteps;
        const startProgress = index * segmentSize;
        const endProgress = startProgress + segmentSize;

        ScrollTrigger.create({
          trigger: pinTarget,
          start: 'top top',
          end: () => `+=${totalSteps * window.innerHeight}`,
          onUpdate: (self) => {
            const p = self.progress;
            const isActive = p >= startProgress && (index === totalSteps - 1 ? p <= 1 : p < endProgress);
            panel.classList.toggle('how-step-active', isActive);
            panel.classList.toggle('how-step-inactive', !isActive);
            if (isActive) setActiveStep(index);
          }
        });
      });
    }, howWorksRef);

    // How Works Mouse Parallax & Interaction
    const handleHowWorksMouseMove = (e) => {
      const el = howWorksRef.current;
      if (!el) return;
      const mediaWrapper = el.querySelector(".how-works-media-wrapper");
      if (!mediaWrapper) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(mediaWrapper, {
        rotateY: x * 10,
        rotateX: -y * 10,
        y: y * 12,
        transformPerspective: 900,
        ease: "power1.out",
        duration: 0.5
      });
    };

    const howEl = howWorksRef.current;
    if (howEl) {
      howEl.addEventListener("mousemove", handleHowWorksMouseMove);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener("mousemove", handleMouseMove);
      }
      if (howEl) {
        howEl.removeEventListener("mousemove", handleHowWorksMouseMove);
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
    // On mobile fall back to scroll-into-view
    if (window.innerWidth < 1024) {
      const card = document.querySelectorAll('.how-works-step-card')[index];
      if (card) {
        const offset = window.innerHeight / 2 - card.offsetHeight / 2;
        const top = card.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Contact Form Submission AJAX (Supporting Customer & Chef Submissions)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) {
      Toast.show("Please fill in your name and phone number.", "error");
      return;
    }
    setSending(true);
    setFormSuccess(false);
    setFormError(false);

    const isChef = formTab === 'chef';
    const roleTitle = isChef ? "Home Chef Partner Application" : "Customer Meal Waitlist Inquiry";
    const subject = isChef
      ? `New Chef Application: ${fullName} - ${area}`
      : `New Customer Order Waitlist: ${fullName} - ${area}`;

    try {
      const response = await fetch("https://formspree.io/f/mkoybqqy", {
        method: "POST",
        body: JSON.stringify({
          role: roleTitle,
          name: fullName,
          phone: phoneNumber,
          email: email || "Not provided",
          neighborhood: area,
          specialties_or_requirements: details,
          _subject: subject
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setFormSuccess(true);
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setDetails('');
        Toast.show(isChef ? "Chef application submitted successfully!" : "Waitlist inquiry submitted successfully!", "success");
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (err) {
      console.error(err);
      setFormError(true);
      Toast.show("Submission failed. Opening WhatsApp...", "error");
      const msg = isChef
        ? `Hi RuchiRush! I would like to apply as a Home Chef:\n\n*Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Email:* ${email || 'N/A'}\n*Neighborhood:* ${area}\n*Kitchen Details:* ${details}`
        : `Hi RuchiRush! I want to order home meals / join waitlist:\n\n*Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Email:* ${email || 'N/A'}\n*Neighborhood:* ${area}\n*Preferences:* ${details}`;
      window.open(`https://wa.me/919063400520?text=${encodeURIComponent(msg)}`, "_blank");
    } finally {
      setSending(false);
    }
  };

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div id="landing-view" className="transition-all duration-300">

      {/* SECTION 1: STORYTELLING HERO */}
      <section
        ref={heroRef}
        id="hero-storytelling"
        className="relative overflow-hidden pt-28 pb-15 px-6 flex items-center justify-center min-h-[95vh] bg-radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%)"
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
              <span className="hero-word-from-home font-h1 text-5xl md:text-6xl lg:text-7xl font-bold opacity-0">HOME COOKED</span>
              <span className="hero-word-kitchens font-h1 text-6xl md:text-7xl lg:text-8xl font-black text-primary block my-1 md:my-2 opacity-0">MEALS</span>
              <span className="hero-word-to-home font-h1 text-5xl md:text-6xl lg:text-7xl font-bold opacity-0">AT YOUR DOOR</span>
            </h1>

            <p className="hero-subheading font-body-lg text-body-lg text-on-surface-variant my-8 max-w-xl mx-auto leading-relaxed opacity-0">
              Tired of eating restaurant food every day? Find home-cooked meals from kitchens near you </p>

            <div className="hero-cta-buttons flex flex-row flex-wrap sm:flex-nowrap gap-3.5 justify-center items-center w-full sm:w-auto opacity-0 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('explore-kitchens');
                  if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto bg-[#b84704] hover:bg-[#a23d02] text-white px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Kitchens & Try 1 Meal</span>
                <svg className="w-4 h-4 inline-block stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => navigate('chef-portal')}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 whitespace-nowrap shadow-sm hover:shadow-md hover:border-stone-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 text-[#b84704] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 15h13a3 3 0 0 1 3 3v0a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v0a3 3 0 0 1 0-3z" />
                  <path d="M19 16h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2" />
                  <path d="M6 10c.5-1.5 0-2.5.5-4" />
                  <path d="M10 10c.5-1.5 0-2.5.5-4" />
                  <path d="M14 10c.5-1.5 0-2.5.5-4" />
                </svg>
                <span>Join as Home Chef</span>
              </button>
            </div>

            <div className="hero-trust-indicators mt-9 w-full max-w-3xl flex flex-wrap justify-center items-center gap-3 md:gap-4 border-t border-primary/10 pt-8 opacity-0">
              <div className="trust-badge flex items-center gap-2 bg-white/80 border border-primary/10 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-stone-800 shadow-xs">
                <span className="material-symbols-outlined text-xl text-[#b84704]">verified</span>
                <span>Verified Kitchens</span>
              </div>
              <div className="trust-badge flex items-center gap-2 bg-white/80 border border-primary/10 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-stone-800 shadow-xs">
                <span className="material-symbols-outlined text-xl text-[#b84704]">female</span>
                <span>Women-led Home Businesses</span>
              </div>
              <div className="trust-badge flex items-center gap-2 bg-white/80 border border-primary/10 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-stone-800 shadow-xs">
                <span className="material-symbols-outlined text-xl text-[#b84704]">soup_kitchen</span>
                <span>Fresh Small–Batch Cooking</span>
              </div>
              <div className="trust-badge flex items-center gap-2 bg-white/80 border border-primary/10 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-stone-800 shadow-xs">
                <span className="material-symbols-outlined text-xl text-[#b84704]">percent</span>
                <span>10% Commission = Better Value</span>
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

      {/* SECTION 2: HYDERABAD IT CORRIDOR PRE-LAUNCH BANNER (IMAGE 2) */}
      <div className="w-full bg-[#181412] text-white py-3.5 px-6 border-y border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center lg:text-left">
            <span className="material-symbols-outlined text-[#ff7f32] text-2xl shrink-0">location_on</span>
            <div>
              <h4 className="font-bold text-white text-sm md:text-base leading-tight">Launching First in Hyderabad IT Corridor</h4>
              <p className="text-xs md:text-sm text-stone-400 mt-0.5">Onboarding verified home kitchens across Gachibowli, Kondapur, Madhapur & Hi-Tech City</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-stone-900/90 border border-stone-700/80 px-4 py-2 rounded-full shadow-inner text-xs md:text-sm">
            <span className="text-base leading-none">🚀</span>
            <span className="text-amber-400 font-bold">Pre–Launch Phase:</span>
            <span className="text-stone-300 font-medium">Join 30+ early waitlist subscribers receiving launch meal invites</span>
          </div>
        </div>
      </div>
      {/* SECTION 3: WHY RUCHIRUSH IS DIFFERENT (IMAGE 3) */}
      <div ref={whyUsRef} className="why-choose-us bg-white">
        <section id="why-us" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">WHY RUCHIRUSH IS DIFFERENT</span>
            <h2 className="font-h2 text-3xl md:text-5xl font-bold text-stone-900 font-['Newsreader'] my-3 leading-tight">
              Built for your daily lunch & dinner, not occasional restaurant cravings
            </h2>
            <p className="font-body-md text-stone-600 text-sm md:text-base leading-relaxed">
              We redesigned home food delivery from the ground up to solve daily health, price, and trust issues.
            </p>
          </div>

          {/* Dual-Win 10% Commission Feature Banner */}
          <div className="bg-[#fff8f5] border border-orange-200/90 rounded-3xl p-6 md:p-8 mb-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="bg-[#b84704] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
                CUSTOMER & CHEF DUAL WIN
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-stone-900 font-['Newsreader'] leading-snug">
                Why 10% Commission Means Better Quality & Pricing For You
              </h3>
              <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-body-md">
                Traditional restaurant aggregators charge 30% commission, forcing places to cut portion sizes or markup prices. RuchiRush charges home chefs only 10% commission. Because cooks keep 90% of earnings, they pass the savings straight to you through generous portions, uncompromised ingredients, and lower daily meal prices.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white border border-stone-200/80 rounded-2xl p-6 text-center shadow-md space-y-1.5">
              <h4 className="text-[#b84704] text-3xl md:text-4xl font-black font-['Newsreader']">90% Payout</h4>
              <p className="text-stone-800 text-xs font-bold">Retained by your local cook</p>
              <div className="pt-3 mt-2 border-t border-stone-100 flex justify-center items-center gap-3 text-[11px] text-stone-500 font-medium">
                <span>Standard Apps: <strong className="text-stone-700">30% Cut</strong></span>
                <span className="text-stone-300">•</span>
                <span className="text-[#b84704] font-bold">RuchiRush: 10% Cut</span>
              </div>
            </div>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">Hyperlocal Kitchens (2–4 km)</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Food arrives hot because your chef lives in your neighborhood cluster (Gachibowli, Kondapur, Madhapur).
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">Know Your Cook</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Transparent kitchen profiles show who is preparing your meal, their hygiene standards, and signature home dishes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">bento</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">Try 1 Meal First</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Zero lock-in anxiety. Order a single trial lunch or dinner meal before committing to a weekly or monthly subscription.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">calendar_month</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">Subscribe & Save</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Weekly and monthly subscription plans offer up to 45% savings compared to daily restaurant food delivery.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">Fair 10% Commission</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Chefs spend money on fresh, high-quality ingredients instead of exorbitant platform commissions.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-stone-50/80 border border-stone-200/80 p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-primary/25 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">pause_circle</span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-['Solway',serif]">1–Click Pause & Skip</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-body-md">
                Travelling or eating out? Pause your subscription anytime before 9 AM and get instant meal roll-over credits.
              </p>
            </div>

          </div>
        </section>
      </div>

      {/* SECTION 4: WHAT WE OFFER */}
      <section ref={offerRef} id="what-we-offer" className="what-we-offer py-20 px-6 bg-stone-50 border-t border-primary/5">
        <div className="offer-card max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">OUR MEAL SOLUTIONS</span>
            <h2 className="font-h2 text-4xl font-bold text-stone-900 font-['Newsreader'] my-2">What We Offer</h2>
            <p className="font-body-md text-stone-600 text-sm">Wholesome meal subscriptions, office lunch catering, single trial orders, and certified home chefs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

            {/* 1. Daily Meal Subscriptions */}
            <div className="bg-white rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-sm border border-stone-200 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">dinner_dining</span>
                </div>
                <h3 className="font-h3 text-lg font-bold text-stone-900">Daily Meal Subscriptions</h3>
                <p className="font-body-md text-stone-600 text-xs leading-relaxed">
                  Wholesome 6-day and monthly lunch or dinner subscriptions prepared fresh in small batches by verified local home cooks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-primary flex items-center gap-1">
                <span>6-Day & Monthly Plans</span>
                <span>→</span>
              </div>
            </div>

            {/* 2. Office Meal Plans */}
            <div className="bg-white rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-sm border border-orange-200/80 hover:shadow-xl transition-all bg-gradient-to-b from-orange-50/40 to-white">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">corporate_fare</span>
                </div>
                <h3 className="font-h3 text-lg font-bold text-stone-900">Office & Team Meal Plans</h3>
                <p className="font-body-md text-stone-600 text-xs leading-relaxed">
                  Scheduled 1:00 PM hot desk delivery across Gachibowli, Madhapur & Hi-Tech City. Flexible corporate billing and healthy non-restaurant food.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-orange-100 text-[11px] font-bold text-primary flex items-center gap-1">
                <span>Corporate Desk Delivery</span>
                <span>→</span>
              </div>
            </div>

            {/* 3. Single Trial Meals */}
            <div className="bg-white rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-sm border border-stone-200 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                </div>
                <h3 className="font-h3 text-lg font-bold text-stone-900">Single Trial Meals</h3>
                <p className="font-body-md text-stone-600 text-xs leading-relaxed">
                  Taste authentic home flavors before subscribing. Order a single lunch or dinner trial meal from any verified kitchen near you.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-primary flex items-center gap-1">
                <span>Zero Lock-In Commitment</span>
                <span>→</span>
              </div>
            </div>

            {/* 4. Audited Chef Kitchens */}
            {/* <div className="bg-white rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-sm border border-stone-200 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <h3 className="font-h3 text-lg font-bold text-stone-900">Audited Kitchen Profiles</h3>
                <p className="font-body-md text-stone-600 text-xs leading-relaxed">
                  Complete hygiene transparency, FSSAI certifications, cook biographies, and authentic heritage recipes you can trust.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-primary flex items-center gap-1">
                <span>FSSAI Verified & Audited</span>
                <span>→</span>
              </div>
            </div> */}

          </div>
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
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${howWorksTab === 'customer'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-stone-700 hover:text-stone-900'
                    }`}
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>For Customers</span>
                </button>
                <button
                  onClick={() => setHowWorksTab('chef')}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${howWorksTab === 'chef'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-stone-700 hover:text-stone-900'
                    }`}
                >
                  <span className="material-symbols-outlined text-base">skillet</span>
                  <span>For Home Chefs</span>
                </button>
              </div>
            </div>

            {/* Customer 4-Step Flow */}
            {howWorksTab === 'customer' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">travel_explore</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">01</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Find</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Enter your area and discover home kitchens near your home or office.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">location_on</span>
                    <span>Hyperlocal discovery</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">restaurant</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">02</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Try</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Order one lunch or dinner before committing to a plan.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">lunch_dining</span>
                    <span>Single meal trial</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">calendar_month</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">03</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Subscribe</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Choose a weekly or monthly meal plan from the kitchen you like.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">event_repeat</span>
                    <span>Weekly / Monthly routine</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">pause_circle</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">04</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Pause or skip</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Going out or travelling? Pause or skip according to the subscription policy.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">tune</span>
                    <span>Total schedule flexibility</span>
                  </div>
                </div>
              </div>
            )}

            {/* Chef 4-Step Flow */}
            {howWorksTab === 'chef' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">edit_document</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">01</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Apply</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Tell us about your kitchen and food.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">assignment</span>
                    <span>Quick online form</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">verified_user</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">02</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Get verified</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Complete the required identity, food-safety and kitchen verification process.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">health_and_safety</span>
                    <span>FSSAI &amp; Hygiene checks</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">soup_kitchen</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">03</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Set your menu</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Choose your dishes, pricing, availability and daily capacity.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">restaurant_menu</span>
                    <span>Complete autonomy</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">payments</span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono tracking-wider">04</span>
                    </div>
                    <h3 className="font-h3 text-lg font-bold text-stone-900">Cook &amp; earn</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Receive orders, prepare meals and get paid through RuchiRush.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-sm shrink-0 leading-none">percent</span>
                    <span>10% low commission</span>
                  </div>
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
                  className="bg-primary text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Find Home Food in Hyderabad</span>
                  <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('chef-portal')}
                  className="bg-primary text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Start Your Kitchen Onboarding</span>
                  <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
                </button>
              )}
            </div>

          </div>
        </section>

      {/* SECTION 5: OPERATIONAL FOUNDATION & TRANSPARENCY */}
      <div className="trust-section bg-gradient-to-br from-orange-50 to-orange-100/50 text-stone-900 border-y border-primary/10 py-20 px-6">
        <section className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Operational Foundation</span>
            <h2 className="font-h2 text-3xl md:text-5xl my-3 font-bold text-stone-900 font-['Newsreader']">
              How We Build Trust
            </h2>
            <p className="font-body-lg text-stone-700 text-sm md:text-base leading-relaxed">
              Most food startups fail because of chaotic delivery costs or poor quality control. Here is how RuchiRush solves both:
            </p>
          </div>

          {/* 6 Operational Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Pillar 1: Quality & Delay Policy */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">100% Quality & Delay Policy</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  If food arrives more than 30 mins late, damaged, or unsatisfactory, you get an immediate 100% refund, meal credit, or backup kitchen dispatch.
                </p>
              </div>
            </div>

            {/* Pillar 2: Missing Chef Protocol */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">health_and_safety</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">Missing Chef Protocol</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  If a cook falls ill, subscribers get an automated morning alert before 9 AM with an auto-refund or seamless backup kitchen routing.
                </p>
              </div>
            </div>

            {/* Pillar 3: Batch Cooking Customization */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">skillet</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">Batch Cooking Customization</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  To keep food authentic and affordable, meals are cooked in small daily batches. We don't do per-order requests like "no onions".
                </p>
              </div>
            </div>

            {/* Pillar 4: Milk-Run Route Batching */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">local_shipping</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">Milk-Run Route Batching</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  Delivery couriers pick up multiple orders in one neighborhood route. This keeps delivery costs low without charging huge fees.
                </p>
              </div>
            </div>

            {/* Pillar 5: Guaranteed Monday Payouts */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">payments</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">Guaranteed Monday Payouts</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  Home chefs receive their 90% revenue directly via Bank/UPI every Monday on time. Reliable payouts build lasting kitchen trust.
                </p>
              </div>
            </div>

            {/* Pillar 6: Centralized Support Desk */}
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-primary/15 flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-2xl">support_agent</span>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-['Solway',serif]">Centralized Support Desk</h3>
                <p className="text-stone-600 text-xs md:text-sm mt-2 leading-relaxed font-body-md">
                  A central support team handles customer calls and delivery alerts so chefs can focus 100% on cooking great food.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>


      {/* TESTIMONIALS SECTION */}
      {/* <section className="py-20 px-6 bg-gradient-to-br from-stone-50 to-orange-50/20" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">What Our Customers Say</span>
            <h2 className="font-h2 text-4xl font-bold mt-2 text-black font-['Newsreader']">Loved by Neighbors, Made by Hand</h2>
            <p className="text-sm text-stone-500 mt-3 font-body-md">See why families and professionals across Hyderabad trust RuchiRush for daily home cooking.</p>
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
      </section> */}

      {/* SECTION 7: QUOTE BAR */}
      <section className="relative h-[360px] flex items-center justify-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover scale-110"
          src="https://img.magnific.com/free-photo/healthy-lunch-meal-with-cooked-beef-curry-generated-by-ai_188544-38833.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Delicious table spread" />
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[4px]"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <blockquote className="font-h1 text-4xl italic mb-4">"Food is not just eaten. It is felt."</blockquote>
          <p className="font-bold tracking-widest text-xs uppercase text-orange-200">— THE RUCHIRUSH PHILOSOPHY</p>
        </div>
      </section>

      {/* SECTION 8: OUR PROMISE TO HOME CHEFS */}
      <div id="chef-promise">
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-primary/10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Keep more of what you earn.</span>
            <h2 className="font-h2 text-4xl font-bold mt-2 text-black font-['Newsreader']">Our Promise to Home Chefs</h2>
            <p className="text-sm text-stone-500 mt-3 font-body-md">You decide your menu, price, availability and daily capacity. We bring repeat subscription customers to your door.</p>
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
                    <span>RuchiRush Commission</span>
                    <span className="text-primary">10%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 text-center">
                <span className="text-xs font-black text-primary">Chefs Retain 90% of Sales Payouts!</span>
              </div>
            </div>

            {/* Right Side: Promise Items Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-2xl transition-shadow">
                <span className="material-symbols-outlined text-3xl text-primary">account_balance_wallet</span>
                <h4 className="font-bold text-sm text-stone-900 uppercase tracking-wider">90% Chef Payouts</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-body-md">You keep 90% of your hard-earned revenue. No listing fees, no setup charges, and zero hidden operational costs.</p>
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
            <span className="text-primary font-bold uppercase tracking-widest text-xs">RuchiRush Mobile App — Launching Soon</span>
            <h2 className="font-h2 text-4xl lg:text-5xl font-bold font-['Newsreader'] leading-tight text-stone-900">Homemade Warmth, Delivered in a Tap</h2>
            <p className="text-sm text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body-md">
              Download our mobile app to track deliveries live, chat directly with home chefs, and easily pre-order custom meals for your family.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              {/* Mock PlayStore Button */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); Toast.show("RuchiRush mobile app is launching soon! Join our waitlist for beta access.", "info"); }}
                className="bg-black border border-stone-800 hover:bg-stone-900 text-white flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3.00005C4.7 3.00005 4.4 3.10005 4.2 3.30005L13.8 12.9L18.4 8.30005L5.7 1.20005C5.4 1.00005 5.2 3.00005 5 3.00005ZM3.2 4.30005C3.1 4.50005 3 4.70005 3 5.00005V19C3 19.3 3.1 19.5 3.2 19.7L12.4 11.5L3.2 4.30005ZM14.8 13.9L4.2 20.7C4.4 20.9 4.7 21 5 21C5.2 21 5.4 20.9 5.7 20.8L18.4 13.7L14.8 13.9ZM14.8 12.5L20.1 9.50005C20.6 9.20005 21 8.60005 21 8.00005C21 7.40005 20.6 6.80005 20.1 6.50005L14.8 9.50005L13.8 10.5L14.8 12.5Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-amber-400 uppercase leading-none font-bold">APP LAUNCHES SOON</p>
                  <p className="text-sm font-black mt-1 leading-none">Google Play</p>
                </div>
              </a>

              {/* Mock AppStore Button */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); Toast.show("RuchiRush mobile app is launching soon! Join our waitlist for beta access.", "info"); }}
                className="bg-black border border-stone-800 hover:bg-stone-900 text-white flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5ZM15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-amber-400 uppercase leading-none font-bold">APP LAUNCHES SOON</p>
                  <p className="text-sm font-black mt-1 leading-none">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: PlayStore App Download Mockup Animation */}
          <div className="lg:col-span-5 flex justify-center">
            <MobileAppShowcase />
          </div>
        </div>
      </section>

      {/* FAQ's Section */}
      <section id="faq" className="py-20 px-6 bg-[#fffaf5] border-t border-primary/10" style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255, 253, 250, 0.75) 0%, rgba(253, 245, 237, 0.9) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover'
      }}>
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

      {/* SECTION 9: CONTACT & LAUNCH REGISTRATION */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="contact">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
          {/* Left Column: Get In Touch Details */}
          <div className="get-in-touch p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white rounded-2xl md:rounded-r-none">
            <div className="space-y-4">
              <span className="bg-[#b84704]/25 text-[#9e4300] border border-orange-500/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
                GET IN TOUCH & PRE-ORDER
              </span>
              <h2 className="font-h2 text-3xl md:text-4xl font-bold font-['Newsreader'] text-white leading-tight">
                Join the RuchiRush Launch
              </h2>
              <p className="font-body-md text-stone-700 text-sm leading-relaxed">
                Whether you want wholesome daily home food delivered to your desk or want to start earning from your home kitchen in Hyderabad — connect with us today.
              </p>
            </div>

            <div className="space-y-5 my-8">
              <div className="flex items-start gap-3.5 text-stone-200">
                <span className="material-symbols-outlined text-[#b84704] text-2xl shrink-0 mt-0.5">location_on</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">Service Corridor</h4>
                  <p className="text-sm font-semibold text-[#9e4300]">Hyderabad IT Corridor (Gachibowli, Kondapur, Madhapur, Hi-Tech City)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-200">
                <span className="material-symbols-outlined text-[#b84704] text-2xl shrink-0 mt-0.5">chat</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">Direct WhatsApp</h4>
                  <p className="text-sm font-semibold text-white">Official WhatsApp: <a href="https://wa.me/919063400520" target="_blank" rel="noopener noreferrer" className="text-[#9e4300] hover:underline">+91 90634 00520</a></p>
                  <p className="text-xs text-white">Alternative: <a href="https://wa.me/919908574741" target="_blank" rel="noopener noreferrer" className="text-[#9e4300] hover:underline">+91 99085 74741</a></p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-200">
                <span className="material-symbols-outlined text-[#b84704] text-2xl shrink-0 mt-0.5">mail</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-sm font-semibold text-black">
                    <a href="mailto:helloruchirush@gmail.com" className="text-[#9e4300] hover:text-orange-300 transition-colors">helloruchirush@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://wa.me/919063400520?text=Hi%20RuchiRush!%20I%20would%20like%20to%20connect%20with%20your%20team%20regarding%20home%20food%20and%20chef%20partnerships."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tabbed Registration Form (Images 5 & 6) */}
          <div className="p-8 md:p-10 bg-white flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">I WANT TO:</p>
                <div className="grid grid-cols-2 p-1 bg-stone-100/90 rounded-full border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setFormTab('customer')}
                    className={`py-2 text-xs md:text-sm font-bold rounded-full transition-all cursor-pointer ${formTab === 'customer'
                      ? 'bg-white text-[#b84704] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                      }`}
                  >
                    Order Home Meals
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTab('chef')}
                    className={`py-2 text-xs md:text-sm font-bold rounded-full transition-all cursor-pointer ${formTab === 'chef'
                      ? 'bg-white text-[#b84704] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                      }`}
                  >
                    Cook as Home Chef
                  </button>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600" htmlFor="fullName">
                      FULL NAME *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600" htmlFor="phoneNumber">
                      PHONE NUMBER *
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="10–digit Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600" htmlFor="email">
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600" htmlFor="area">
                      NEIGHBORHOOD / AREA *
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-stone-50/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer"
                    >
                      <option value="Gachibowli, Hyd">Gachibowli, Hyd</option>
                      <option value="Kondapur, Hyd">Kondapur, Hyd</option>
                      <option value="Madhapur, Hyd">Madhapur, Hyd</option>
                      <option value="Hi-Tech City, Hyd">Hi-Tech City, Hyd</option>
                      <option value="Jubilee Hills, Hyd">Jubilee Hills, Hyd</option>
                      <option value="Kukatpally, Hyd">Kukatpally, Hyd</option>
                      <option value="Financial District, Hyd">Financial District, Hyd</option>
                      <option value="Other Hyderabad Area">Other Hyderabad Area</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600" htmlFor="details">
                    {formTab === 'chef' ? 'KITCHEN DETAILS & SPECIALTIES' : 'DIETARY PREFERENCES / MEAL REQUIREMENTS'}
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows="3"
                    placeholder={
                      formTab === 'chef'
                        ? 'Tell us what you cook best and how many meals you can prepare daily...'
                        : 'Tell us what meals you are looking for (Lunch/Dinner, Veg/Non-Veg, Office Delivery)...'
                    }
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-stone-50/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#b84704] hover:bg-[#a23d02] text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>
                    {sending
                      ? 'Submitting...'
                      : formTab === 'chef'
                        ? 'Submit Chef Application'
                        : 'Join Customer Waitlist'}
                  </span>
                  {sending && (
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  )}
                </button>

                {formSuccess && (
                  <div className="text-center py-2.5 px-4 bg-green-50 text-green-700 rounded-xl text-xs font-semibold border border-green-200 animate-fade-in">
                    ✅ Application submitted successfully! We will reach out to you shortly.
                  </div>
                )}
                {formError && (
                  <div className="text-center py-2.5 px-4 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-200 animate-fade-in">
                    ❌ Submission error. Opening WhatsApp for direct assistance...
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (IMAGE 4) */}
      <footer className="footer w-full py-10 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-primary/10 bg-[#fff8f6] text-stone-750">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-3xl font-bold text-stone-900 font-['Newsreader']">RuchiRush</span>
          <span className="text-stone-500 text-sm font-['Newsreader']">© 2026 RuchiRush. Made with love.</span>
          <span className="text-stone-600 text-xs font-semibold">helloruchirush@gmail.com</span>
        </div>
        <div>
          <h1 className="text-stone-900 text-xs font-bold uppercase tracking-wider mb-2 text-center md:text-left">Follow Us</h1>
          <div className="flex gap-3 items-center justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/company/ruchirush/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-[#0077b5] transition-colors p-2 bg-white/80 hover:bg-white rounded-full shadow-xs"
              aria-label="LinkedIn"
              title="RuchiRush on LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ruchirush_india?igsh=MWttZ3Z1dmlweWhlOA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-pink-600 transition-colors p-2 bg-white/80 hover:bg-white rounded-full shadow-xs"
              aria-label="Instagram"
              title="RuchiRush on Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex gap-6 font-semibold text-sm text-stone-700">
          <button onClick={() => openLegalModal('about')} className="hover:text-primary transition-colors cursor-pointer">About Us</button>
          <button onClick={() => openLegalModal('privacy')} className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => openLegalModal('terms')} className="hover:text-primary transition-colors cursor-pointer">Terms of Service</button>
        </div>
        <div className="text-center md:text-right text-stone-700">
          <h1 className="text-stone-900 text-xs font-bold uppercase tracking-wider mb-1">RuchiRush Hyderabad Hub</h1>
          <p className="text-stone-600 text-xs leading-relaxed max-w-xs">
            DLF Cyber City, Gachibowli & Madhapur Cluster, Hyderabad, TS 500032
          </p>
          <p className="text-stone-600 text-xs font-semibold mt-1">
            WhatsApp: +91 90634 00520 / +91 99085 74741
          </p>
        </div>
      </footer>
    </div>
  );
}
