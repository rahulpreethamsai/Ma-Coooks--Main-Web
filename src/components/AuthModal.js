'use client';
import { useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from '@/lib/firebase';

export default function AuthModal({ isOpen, initialTab, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState(initialTab || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // customer or chef
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [googleUserTemp, setGoogleUserTemp] = useState(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        // Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        const fbUser = userCredential.user;

        // Fetch User profile from backend API
        const userRes = await fetch(`/api/users?email=${encodeURIComponent(fbUser.email)}`);
        let profile = await userRes.json();

        if (!profile) {
          // Fallback if not found in db
          profile = {
            name: fbUser.displayName || name || fbUser.email.split('@')[0],
            email: fbUser.email,
            role: 'customer'
          };
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
          });
        }

        onAuthSuccess(profile);
        onClose();
      } else {
        // Firebase Register
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const fbUser = userCredential.user;

        await updateProfile(fbUser, { displayName: name.trim() });

        // Save User profile to database backend API
        const profile = {
          name: name.trim(),
          email: fbUser.email,
          role: role
        };

        if (role === 'chef') {
          profile.chefId = `chef_${Date.now()}`;
          profile.verified = false;
          profile.verificationStatus = 'Pending';
        }

        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        });

        // If chef, we also want to create a default chef profile in DB
        if (role === 'chef') {
          const chefProfile = {
            id: profile.chefId,
            name: profile.name,
            avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop",
            rating: 5.0,
            reviewsCount: 0,
            cuisine: "Home Cooked Cuisine",
            area: "Hyderabad",
            bio: "Excited home chef ready to serve delicious homemade meals.",
            verified: false,
            hygieneScore: "Pending",
            deliveryTime: "30-45 mins",
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          };
          await fetch('/api/chefs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chefProfile)
          });
        }

        onAuthSuccess(profile);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      // Query database backend to see if user profile exists
      const userRes = await fetch(`/api/users?email=${encodeURIComponent(fbUser.email)}`);
      const profile = await userRes.json();

      if (profile) {
        // User already has profile, complete login
        onAuthSuccess(profile);
        onClose();
      } else {
        // First-time user via Google: Prompt for role selection
        setGoogleUserTemp(fbUser);
        setShowRoleSelection(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const submitGoogleRole = async (selectedRole) => {
    if (!googleUserTemp) return;
    setLoading(true);
    try {
      const profile = {
        name: googleUserTemp.displayName || googleUserTemp.email.split('@')[0],
        email: googleUserTemp.email,
        role: selectedRole
      };

      if (selectedRole === 'chef') {
        profile.chefId = `chef_${Date.now()}`;
        profile.verified = false;
        profile.verificationStatus = 'Pending';
      }

      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (selectedRole === 'chef') {
        const chefProfile = {
          id: profile.chefId,
          name: profile.name,
          avatar: googleUserTemp.photoURL || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop",
          rating: 5.0,
          reviewsCount: 0,
          cuisine: "Home Cooked Cuisine",
          area: "Hyderabad",
          bio: "Excited home chef ready to serve delicious homemade meals.",
          verified: false,
          hygieneScore: "Pending",
          deliveryTime: "30-45 mins",
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        await fetch('/api/chefs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chefProfile)
        });
      }

      onAuthSuccess(profile);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setShowRoleSelection(false);
      setGoogleUserTemp(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#fff8f6] rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-primary/10 overflow-hidden">
        <button className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 text-xl font-bold p-2 cursor-pointer" onClick={onClose}>✕</button>

        {showRoleSelection ? (
          <div className="text-center space-y-6">
            <h3 className="font-h2 text-2xl text-primary font-bold">Pick Your Profile Role</h3>
            <p className="text-sm text-stone-600">Welcome! Please tell us how you would like to participate in RuchiRush.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => submitGoogleRole('customer')}
                className="flex-1 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all cursor-pointer bg-white"
              >
                <span className="text-4xl">🍽️</span>
                <span className="font-bold text-stone-800">I want to Eat</span>
              </button>
              <button 
                onClick={() => submitGoogleRole('chef')}
                className="flex-1 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 rounded-2xl p-6 flex flex-col items-center gap-2 transition-all cursor-pointer bg-white"
              >
                <span className="text-4xl">👨‍🍳</span>
                <span className="font-bold text-stone-800">I want to Cook</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-h2 text-3xl text-primary font-bold font-['Newsreader']">Welcome to RuchiRush</h3>
              <p className="text-xs text-stone-500 mt-1">Experience real home-cooked food by local chefs</p>
            </div>

            <div className="flex border-b border-primary/10">
              <button 
                onClick={() => setTab('login')}
                className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors cursor-pointer ${tab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-stone-400 hover:text-stone-600'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setTab('register')}
                className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors cursor-pointer ${tab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-stone-400 hover:text-stone-600'}`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {tab === 'register' && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Your Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya K."
                    className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    required
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  required
                />
              </div>

              {tab === 'register' && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">I am joining to...</label>
                  <div className="flex gap-2 mt-1">
                    <label className="flex-1 flex items-center justify-center gap-2 border border-primary/20 rounded-full py-2 cursor-pointer transition-all hover:bg-orange-50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary font-semibold text-xs text-stone-700 shadow-sm bg-white">
                      <input 
                        type="radio" 
                        name="role" 
                        value="customer" 
                        checked={role === 'customer'}
                        onChange={() => setRole('customer')}
                        className="hidden"
                      />
                      🍽️ Eat Food
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 border border-primary/20 rounded-full py-2 cursor-pointer transition-all hover:bg-orange-50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary font-semibold text-xs text-stone-700 shadow-sm bg-white">
                      <input 
                        type="radio" 
                        name="role" 
                        value="chef" 
                        checked={role === 'chef'}
                        onChange={() => setRole('chef')}
                        className="hidden"
                      />
                      👨‍🍳 Cook & Sell
                    </label>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
              >
                {loading ? 'Processing...' : tab === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-primary/10"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-stone-400">or</span>
              <div className="flex-grow border-t border-primary/10"></div>
            </div>

            <button 
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 py-3 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
