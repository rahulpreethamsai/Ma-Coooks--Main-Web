'use client';
import { useState } from 'react';

export default function ChefPortal({ Toast, navigate }) {
  // Form states
  const [chefName, setChefName] = useState('');
  const [chefPhone, setChefPhone] = useState('');
  const [chefAge, setChefAge] = useState('');
  const [chefArea, setChefArea] = useState('');

  // Cooking states
  const [cuisineSpecialty, setCuisineSpecialty] = useState('Multi cuisine');
  const [ordersPerDay, setOrdersPerDay] = useState('10-20 orders');
  const [bestDishes, setBestDishes] = useState('');
  const [preferredCookingTime, setPreferredCookingTime] = useState('Morning (7am-10am)');

  // Kitchen states
  const [hasPackaging, setHasPackaging] = useState("Yes, I'm ready");
  const [hasSmartphone, setHasSmartphone] = useState('Yes, Android');
  const [whyJoin, setWhyJoin] = useState('');

  // Submission States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('pending'); // 'success' or 'failed'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (chefName.trim().length < 2) {
      Toast.show("Please enter a valid full name.", "error");
      return;
    }
    if (chefPhone.trim().length < 10) {
      Toast.show("Please enter a valid 10-digit phone number.", "error");
      return;
    }
    if (!chefAge.trim()) {
      Toast.show("Please enter your age.", "error");
      return;
    }
    if (!chefArea.trim()) {
      Toast.show("Please enter your area in Hyderabad.", "error");
      return;
    }
    if (!bestDishes.trim()) {
      Toast.show("Please enter your best dishes.", "error");
      return;
    }
    if (!whyJoin.trim()) {
      Toast.show("Please enter why you want to join Ruchirush.", "error");
      return;
    }

    // Compile the message for submission
    const msg = `Hi RuchiRush team! I would like to onboard as a home chef:

--- PERSONAL INFO ---
Full Name: ${chefName}
Phone Number: ${chefPhone}
Age: ${chefAge}
Area in Hyderabad: ${chefArea}

--- YOUR COOKING ---
Cuisine Specialty: ${cuisineSpecialty}
Orders Per Day: ${ordersPerDay}
Best Dishes: ${bestDishes}
Preferred Cooking Time: ${preferredCookingTime}

--- YOUR KITCHEN ---
Do you have packaging?: ${hasPackaging}
Do you have a smartphone?: ${hasSmartphone}
Why do you want to join?: ${whyJoin}`;

    setFormattedMessage(msg);
    setIsSubmitting(true);
    Toast.show("Submitting onboarding application...", "info");

    try {
      const response = await fetch("https://formspree.io/f/mkoybqqy", {
        method: "POST",
        body: JSON.stringify({
          name: chefName,
          phone: chefPhone,
          age: chefAge,
          area: chefArea,
          cuisineSpecialty: cuisineSpecialty,
          ordersPerDay: ordersPerDay,
          bestDishes: bestDishes,
          preferredCookingTime: preferredCookingTime,
          hasPackaging: hasPackaging,
          hasSmartphone: hasSmartphone,
          whyJoin: whyJoin,
          _subject: `New Chef Onboarding - ${chefName} (${chefArea})`
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setSubmissionStatus('success');
        Toast.show("Application submitted successfully!", "success");
      } else {
        throw new Error("Formspree failed");
      }
    } catch (err) {
      console.error(err);
      setSubmissionStatus('failed');
      Toast.show("Direct submission failed. Please use backup options.", "error");
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }
  };

  const handleWhatsAppSubmit = () => {
    const waUrl = `https://wa.me/919908574741?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");
  };

  const handleEmailSubmit = () => {
    const mailtoUrl = `mailto:chrahulpreethamsai@gmail.com?subject=Chef Onboarding Application - ${encodeURIComponent(chefName)}&body=${encodeURIComponent(formattedMessage)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div id="chef-portal-view" className="min-h-screen cook pt-28 pb-12 px-4 sm:px-6">
      
      {/* Chef Portal Header */}
      <div className="max-w-3xl mx-auto flex justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('landing')}
            className="flex items-center gap-1 text-primary hover:opacity-80 font-semibold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Home</span>
          </button>
          <div className="h-6 w-[1px] bg-stone-300"></div>
          <span className="font-h2 text-xl font-bold text-black">Join as Chef</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <section id="chef-verification-panel" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in">
          
          <div className="text-center mb-8">
            <span className="text-2xl font-bold text-primary tracking-tight font-['Newsreader'] block mb-2">RuchiRush</span>
            <h3 className="font-h1 text-2xl font-bold text-stone-900 leading-tight">Turn your kitchen into a business</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Takes 2 minutes. Our team calls you for everything else.
            </p>
            
            {/* Pills row */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Cook from home', 'Your own timings', 'Weekly payouts', 'Zero investment'].map((pill) => (
                <span 
                  key={pill} 
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 text-primary bg-primary/5"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            
            {/* PERSONAL INFO */}
            <div className="space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b pb-1">PERSONAL INFO</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Full name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your name" 
                    value={chefName} 
                    onChange={e => setChefName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Phone number</label>
                  <input 
                    type="tel" 
                    required 
                    maxLength="10"
                    placeholder="10 digit number" 
                    value={chefPhone} 
                    onChange={e => setChefPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Age</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your age" 
                    value={chefAge} 
                    onChange={e => setChefAge(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Area in Hyderabad</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Miyapur, Kondapur" 
                    value={chefArea} 
                    onChange={e => setChefArea(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                  />
                </div>
              </div>
            </div>

            {/* YOUR COOKING */}
            <div className="space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b pb-1">YOUR COOKING</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Cuisine specialty</label>
                  <select 
                    required 
                    value={cuisineSpecialty} 
                    onChange={e => setCuisineSpecialty(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                  >
                    <option value="Multi cuisine">Multi cuisine</option>
                    <option value="South Indian">South Indian</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Biryani & Pulao">Biryani & Pulao</option>
                    <option value="Desserts & Bakes">Desserts & Bakes</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Orders per day you can handle</label>
                  <select 
                    required 
                    value={ordersPerDay} 
                    onChange={e => setOrdersPerDay(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                  >
                    <option value="10-20 orders">10-20 orders</option>
                    <option value="5-10 orders">5-10 orders</option>
                    <option value="20-50 orders">20-50 orders</option>
                    <option value="50+ orders">50+ orders</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-700">Your best dishes</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Biryani, Pesarattu, Gongura curry..." 
                  value={bestDishes} 
                  onChange={e => setBestDishes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-700">Preferred cooking time</label>
                <select 
                  required 
                  value={preferredCookingTime} 
                  onChange={e => setPreferredCookingTime(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                >
                  <option value="Morning (7am-10am)">Morning (7am-10am)</option>
                  <option value="Afternoon (11am-2pm)">Afternoon (11am-2pm)</option>
                  <option value="Evening (5pm-9pm)">Evening (5pm-9pm)</option>
                  <option value="Full day">Full day</option>
                </select>
              </div>
            </div>

            {/* YOUR KITCHEN */}
            <div className="space-y-4">
              <h4 className="font-h3 text-xs font-bold uppercase tracking-wider text-primary border-b pb-1">YOUR KITCHEN</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Do you have packaging?</label>
                  <select 
                    required 
                    value={hasPackaging} 
                    onChange={e => setHasPackaging(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                  >
                    <option value="Yes, I'm ready">Yes, I'm ready</option>
                    <option value="No, need help">No, need help</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-700">Do you have a smartphone?</label>
                  <select 
                    required 
                    value={hasSmartphone} 
                    onChange={e => setHasSmartphone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900 cursor-pointer"
                  >
                    <option value="Yes, Android">Yes, Android</option>
                    <option value="Yes, iOS">Yes, iOS</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-700">Why do you want to join Ruchirush?</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Tell us a little about yourself and your passion for cooking..." 
                  value={whyJoin} 
                  onChange={e => setWhyJoin(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-stone-900" 
                />
              </div>
            </div>

            {/* Notice Box */}
            <div className="flex items-start gap-3 bg-stone-50 border border-stone-200/60 p-4 rounded-2xl text-xs text-stone-600 mt-6 leading-relaxed">
              <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">phone_in_talk</span>
              <span>
                Our team will personally call you within 24 hours. Bank details and documents are only collected after your verification call — not here.
              </span>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3.5 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
            >
              <span>{isSubmitting ? 'Submitting Application...' : 'Submit My Application'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <div className="text-center mt-6 space-y-1">
              <p className="text-xs text-stone-500 font-semibold">
                No fee. No investment. No strangers at your door.
              </p>
              <p className="text-xs text-stone-500 font-semibold">
                Just your cooking, your kitchen, your earning.
              </p>
            </div>
          </form>
        </section>
      </div>

      {/* Submission Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-primary/15 text-center space-y-5 z-10">
            <span className="text-5xl block animate-bounce">🎉</span>
            <h3 className="font-h1 text-2xl font-bold text-primary">
              {submissionStatus === 'success' ? 'Application Submitted!' : 'Onboarding Form Ready!'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {submissionStatus === 'success' 
                ? 'Your onboarding application has been successfully submitted to our team! If you would like to chat with us directly or ask any questions, feel free to use the options below:' 
                : 'Your onboarding information has been compiled and validated. Direct submission had an issue, but you can choose how you would like to submit it to the RuchiRush team below:'}
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.518 2.266 2.27 3.507 5.289 3.507 8.491-.005 6.644-5.342 11.982-11.958 11.982-2.006-.001-3.97-.504-5.717-1.464L0 24zm6.076-4.137l.376.223c1.559.926 3.486 1.415 5.549 1.416 5.706 0 10.347-4.64 10.353-10.353.003-2.767-1.077-5.367-3.04-7.332-1.963-1.964-4.567-3.045-7.34-3.045-5.711 0-10.354 4.643-10.36 10.357-.001 2.052.54 4.053 1.564 5.79l.244.417-.999 3.648 3.737-.98l-.164.264z"/>
                </svg>
                Submit via WhatsApp
              </button>
              
              <button 
                onClick={handleEmailSubmit}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Submit via Email
              </button>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-semibold underline cursor-pointer"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
