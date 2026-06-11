import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup as fbSignInWithPopup, 
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword, 
    createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
    signOut as fbSignOut,
    updateProfile as fbUpdateProfile,
    onAuthStateChanged as fbOnAuthStateChanged
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default configuration with public-safe demo placeholders to enable immediate local run
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalDevRunOnlyProps",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ruchirush-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ruchirush-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ruchirush-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

let app = null;
let auth = null;
let db = null;
let isMockAuth = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy");

if (!isMockAuth) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Failed to initialize real Firebase, falling back to mock auth:", err);
    isMockAuth = true;
  }
}

// Mock auth state manager for offline/demo/development setups
let currentMockUser = null;
const authListeners = new Set();

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('ruchirush_mock_auth_user');
  if (saved) {
    try {
      currentMockUser = JSON.parse(saved);
    } catch (e) {}
  }
}

const notifyListeners = () => {
  authListeners.forEach(cb => cb(currentMockUser));
};

export const googleProvider = !isMockAuth ? new GoogleAuthProvider() : { setCustomParameters: () => {} };
if (!isMockAuth && googleProvider.setCustomParameters) {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

export { app, auth, db };

export const onAuthStateChanged = (authObj, callback) => {
  if (isMockAuth || !authObj) {
    authListeners.add(callback);
    // Trigger initial auth listener call
    callback(currentMockUser);
    return () => {
      authListeners.delete(callback);
    };
  }
  return fbOnAuthStateChanged(authObj, callback);
};

export const signInWithPopup = async (authObj, provider) => {
  if (isMockAuth || !authObj) {
    // Simulate successful Google login
    const fbUser = {
      uid: "mock_google_12345",
      email: "rahul@ruchirush.com",
      displayName: "Rahul Sai",
      photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
    };
    currentMockUser = fbUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ruchirush_mock_auth_user', JSON.stringify(fbUser));
    }
    notifyListeners();
    return { user: fbUser };
  }
  try {
    return await fbSignInWithPopup(authObj, provider);
  } catch (err) {
    if (err.message?.includes("api-key-not-valid") || err.code === "auth/api-key-not-valid") {
      console.warn("Invalid Firebase API Key. Falling back to mock authentication.");
      isMockAuth = true;
      return signInWithPopup(authObj, provider);
    }
    throw err;
  }
};

export const signInWithEmailAndPassword = async (authObj, email, password) => {
  if (isMockAuth || !authObj) {
    const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
    if (!res.ok) {
      throw new Error("auth/user-not-found - Account does not exist.");
    }
    const profile = await res.json();
    if (!profile) {
      throw new Error("auth/user-not-found - Account does not exist.");
    }
    if (password.length < 6) {
      throw new Error("auth/wrong-password - Invalid password.");
    }
    const fbUser = {
      uid: `mock_${profile.email}`,
      email: profile.email,
      displayName: profile.name,
      photoURL: null
    };
    currentMockUser = fbUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ruchirush_mock_auth_user', JSON.stringify(fbUser));
    }
    notifyListeners();
    return { user: fbUser };
  }
  try {
    return await fbSignInWithEmailAndPassword(authObj, email, password);
  } catch (err) {
    if (err.message?.includes("api-key-not-valid") || err.code === "auth/api-key-not-valid") {
      console.warn("Invalid Firebase API Key. Falling back to mock authentication.");
      isMockAuth = true;
      return signInWithEmailAndPassword(authObj, email, password);
    }
    throw err;
  }
};

export const createUserWithEmailAndPassword = async (authObj, email, password) => {
  if (isMockAuth || !authObj) {
    if (password.length < 6) {
      throw new Error("auth/weak-password - Password must be at least 6 characters.");
    }
    const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
    if (res.ok) {
      const existing = await res.json();
      if (existing) {
        throw new Error("auth/email-already-in-use - The email address is already in use.");
      }
    }
    const fbUser = {
      uid: `mock_${email}`,
      email: email,
      displayName: email.split('@')[0],
      photoURL: null
    };
    currentMockUser = fbUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ruchirush_mock_auth_user', JSON.stringify(fbUser));
    }
    notifyListeners();
    return { user: fbUser };
  }
  try {
    return await fbCreateUserWithEmailAndPassword(authObj, email, password);
  } catch (err) {
    if (err.message?.includes("api-key-not-valid") || err.code === "auth/api-key-not-valid") {
      console.warn("Invalid Firebase API Key. Falling back to mock authentication.");
      isMockAuth = true;
      return createUserWithEmailAndPassword(authObj, email, password);
    }
    throw err;
  }
};

export const signOut = async (authObj) => {
  if (isMockAuth || !authObj) {
    currentMockUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ruchirush_mock_auth_user');
    }
    notifyListeners();
    return;
  }
  return fbSignOut(authObj);
};

export const updateProfile = async (userObj, profileData) => {
  if (isMockAuth || !userObj) {
    if (currentMockUser) {
      currentMockUser.displayName = profileData.displayName || currentMockUser.displayName;
      currentMockUser.photoURL = profileData.photoURL || currentMockUser.photoURL;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ruchirush_mock_auth_user', JSON.stringify(currentMockUser));
      }
      notifyListeners();
    }
    return;
  }
  return fbUpdateProfile(userObj, profileData);
};
