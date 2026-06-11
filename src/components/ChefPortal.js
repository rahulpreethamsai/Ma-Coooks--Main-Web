'use client';
import { useState, useEffect } from 'react';

export default function ChefPortal({ currentUser, Toast, navigate, onAuthSuccess, openAuthModal }) {
  const [chefProfile, setChefProfile] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subsections navigation
  const [subView, setSubView] = useState('dashboard'); // 'dashboard', 'orders', 'menu'

  // Verification Form States
  const [fssai, setFssai] = useState('');
  const [pan, setPan] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [upiId, setUpiId] = useState('');
  const [gstin, setGstin] = useState('');
  const [kitchenAddress, setKitchenAddress] = useState('');
  const [submitVerificationLoading, setSubmitVerificationLoading] = useState(false);

  // Food safety quiz states
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');

  // Add/Edit Dish Modal States
  const [showDishModal, setShowDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishDesc, setDishDesc] = useState('');
  const [dishCategory, setDishCategory] = useState('south');
  const [dishSpicy, setDishSpicy] = useState('🌶️');
  const [dishImage, setDishImage] = useState('');

  // Fetch initial chef details, menu items and orders
  const loadData = async () => {
    if (!currentUser?.chefId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [chefsRes, dishesRes, ordersRes] = await Promise.all([
        fetch('/api/chefs'),
        fetch('/api/dishes'),
        fetch('/api/orders')
      ]);

      const chefsData = await chefsRes.json();
      const dishesData = await dishesRes.json();
      const ordersData = await ordersRes.json();

      const myChefProfile = chefsData.find(c => c.id === currentUser.chefId);
      setChefProfile(myChefProfile || null);

      // Filter dishes and orders for this chef
      setDishes(dishesData.filter(d => d.chefId === currentUser.chefId) || []);
      setOrders(ordersData.filter(o => o.chefId === currentUser.chefId) || []);
    } catch (error) {
      console.error("Error loading chef data:", error);
      Toast.show("Failed to sync chef data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Handle KYC Verification Submit
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (fssai.length !== 14 || isNaN(fssai)) {
      Toast.show("FSSAI License must be exactly 14 digits.", "error");
      return;
    }
    if (pan.length !== 10) {
      Toast.show("PAN Card must be exactly 10 characters.", "error");
      return;
    }
    if (bankAccount.length < 9 || bankAccount.length > 18 || isNaN(bankAccount)) {
      Toast.show("Bank Account Number must be between 9 and 18 digits.", "error");
      return;
    }
    if (bankIfsc.length !== 11) {
      Toast.show("Bank IFSC Code must be a valid 11-character code.", "error");
      return;
    }
    if (!upiId.includes('@')) {
      Toast.show("UPI ID must be a valid format (e.g. name@okaxis).", "error");
      return;
    }
    if (kitchenAddress.length < 15) {
      Toast.show("Please enter a full, valid address (minimum 15 characters).", "error");
      return;
    }

    // Verify qualification test answers
    if (q1 !== 'A') {
      Toast.show("Qualification Test Q1 answer is incorrect. Minimum hot holding temperature is 60°C.", "error");
      return;
    }
    if (q2 !== 'B') {
      Toast.show("Qualification Test Q2 answer is incorrect. Prep surfaces must be sanitized before and after every batch.", "error");
      return;
    }
    if (q3 !== 'A') {
      Toast.show("Qualification Test Q3 answer is incorrect. Eco-friendly insulated packaging is required.", "error");
      return;
    }

    setSubmitVerificationLoading(true);

    try {
      // Upgrade role to chef and assign chefId
      const chefId = currentUser.chefId || `chef_${Date.now()}`;
      const updatedUser = {
        ...currentUser,
        role: 'chef',
        chefId: chefId,
        verified: true,
        verificationStatus: 'Passed'
      };

      // Save user status to API
      const userRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });

      if (userRes.ok) {
        // Update chef record in chefs DB
        const updatedChef = {
          id: chefId,
          name: updatedUser.name,
          avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop",
          rating: 5.0,
          reviewsCount: 0,
          cuisine: "Home Cooked Cuisine",
          verified: true,
          hygieneScore: "97% (A Grade)",
          area: kitchenAddress.split(',')[0] || "Hyderabad",
          bio: "Excited home chef ready to serve delicious homemade meals.",
          deliveryTime: "30-45 mins",
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        await fetch('/api/chefs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedChef)
        });

        onAuthSuccess(updatedUser);
        Toast.show("Kitchen Verification Passed! Welcome aboard.", "success");
        loadData();
      } else {
        throw new Error("Failed to save verification status");
      }
    } catch (err) {
      console.error(err);
      Toast.show("Error saving KYC data.", "error");
    } finally {
      setSubmitVerificationLoading(false);
    }
  };

  // Change Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrder = { ...order, status: newStatus };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder)
      });

      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
        Toast.show(`Updated Order #${orderId.replace("order_", "")} status to ${newStatus}`, "info");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      Toast.show("Error updating status in backend.", "error");
    }
  };

  // Dish availability toggle
  const toggleDishAvailability = async (dish) => {
    const updatedDish = { ...dish, available: !dish.available };
    try {
      const res = await fetch('/api/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDish)
      });

      if (res.ok) {
        setDishes(dishes.map(d => d.id === dish.id ? updatedDish : d));
        Toast.show(updatedDish.available ? "Item marked available!" : "Item marked out of stock!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Dish
  const handleDeleteDish = async (dishId) => {
    if (!confirm("Are you sure you want to delete this dish from your menu?")) return;
    try {
      const res = await fetch(`/api/dishes?id=${dishId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setDishes(dishes.filter(d => d.id !== dishId));
        Toast.show("Dish deleted successfully!", "info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Save Dish (Add or Edit)
  const handleSaveDish = async (e) => {
    e.preventDefault();
    const priceNum = parseFloat(dishPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      Toast.show("Please enter a valid price.", "error");
      return;
    }

    const dishData = {
      id: editingDish ? editingDish.id : `dish_${Date.now()}`,
      chefId: currentUser.chefId,
      name: dishName.trim(),
      price: priceNum,
      description: dishDesc.trim(),
      category: dishCategory,
      spicyLevel: dishSpicy,
      available: editingDish ? editingDish.available : true,
      image: dishImage.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop"
    };

    try {
      const res = await fetch('/api/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dishData)
      });

      if (res.ok) {
        if (editingDish) {
          setDishes(dishes.map(d => d.id === editingDish.id ? dishData : d));
          Toast.show("Dish updated successfully!");
        } else {
          setDishes([...dishes, dishData]);
          Toast.show("New dish added to menu!");
        }
        setShowDishModal(false);
        setEditingDish(null);
        setDishName('');
        setDishPrice('');
        setDishDesc('');
        setDishImage('');
      }
    } catch (error) {
      console.error(error);
      Toast.show("Failed to save dish.", "error");
    }
  };

  const openEditDishModal = (dish) => {
    setEditingDish(dish);
    setDishName(dish.name);
    setDishPrice(dish.price);
    setDishDesc(dish.description);
    setDishCategory(dish.category);
    setDishSpicy(dish.spicyLevel);
    setDishImage(dish.image);
    setShowDishModal(true);
  };

  const openAddDishModal = () => {
    setEditingDish(null);
    setDishName('');
    setDishPrice('');
    setDishDesc('');
    setDishCategory('south');
    setDishSpicy('🌶️');
    setDishImage('');
    setShowDishModal(true);
  };

  return (
    <div id="chef-portal-view" className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      
      {/* Chef Portal Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate('landing')}
            className="flex items-center gap-1 text-primary hover:opacity-80 font-semibold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Home</span>
          </button>
          <div className="h-6 w-[1px] bg-stone-300"></div>
          <span className="font-h2 text-xl font-bold text-stone-800 dark:text-stone-100">Chef Dashboard</span>
        </div>

        {currentUser?.verified && (
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button 
              onClick={() => setSubView('dashboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${subView === 'dashboard' ? 'bg-primary text-white' : 'bg-stone-50 border text-stone-600 hover:bg-stone-100'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setSubView('orders')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${subView === 'orders' ? 'bg-primary text-white' : 'bg-stone-50 border text-stone-600 hover:bg-stone-100'}`}
            >
              Orders
            </button>
            <button 
              onClick={() => setSubView('menu')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${subView === 'menu' ? 'bg-primary text-white' : 'bg-stone-50 border text-stone-600 hover:bg-stone-100'}`}
            >
              Menu Manager
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        
        {loading ? (
          <div className="py-20 text-center space-y-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-stone-500 text-sm">Syncing kitchen details...</p>
          </div>
        ) : !currentUser ? (
          <section className="max-w-md mx-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
            <span className="text-5xl block">👨‍🍳</span>
            <h3 className="font-h2 text-3xl font-bold text-primary font-['Newsreader']">Join as a Home Chef</h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Share your traditional recipes, connect with food lovers in your neighborhood, and grow your local home kitchen business.
            </p>
            <div className="pt-4 space-y-3">
              <button 
                onClick={() => openAuthModal('register')}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer shadow-md"
              >
                Sign Up as Chef
              </button>
              <button 
                onClick={() => openAuthModal('login')}
                className="w-full border border-stone-300 dark:border-stone-750 text-stone-700 dark:text-stone-300 py-3 rounded-full font-bold text-sm hover:bg-stone-50 dark:hover:bg-stone-850 cursor-pointer"
              >
                Log In to Dashboard
              </button>
            </div>
          </section>
        ) : !currentUser?.verified ? (
          // Verification / Onboarding Section
          <section id="chef-verification-panel" className="max-w-2xl mx-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-4xl">👨‍🍳</span>
              <h3 className="font-h2 text-2xl font-bold text-primary mt-2">Kitchen Verification</h3>
              <p className="text-xs text-stone-500 mt-1">To ensure safety and quality, all chefs must complete KYC check to go live.</p>
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">FSSAI License No (14 Digits)</label>
                  <input type="text" required maxLength="14" placeholder="12345678901234" value={fssai} onChange={e => setFssai(e.target.value)}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">PAN Card Number</label>
                  <input type="text" required maxLength="10" placeholder="ABCDE1234F" value={pan} onChange={e => setPan(e.target.value.toUpperCase())}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Bank Account Number</label>
                  <input type="text" required placeholder="123456789012" value={bankAccount} onChange={e => setBankAccount(e.target.value)}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Bank IFSC Code</label>
                  <input type="text" required maxLength="11" placeholder="SBIN0001234" value={bankIfsc} onChange={e => setBankIfsc(e.target.value.toUpperCase())}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Settlement UPI ID</label>
                  <input type="text" required placeholder="chefname@okaxis" value={upiId} onChange={e => setUpiId(e.target.value)}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">GSTIN (Optional)</label>
                  <input type="text" maxLength="15" placeholder="36ABCDE1234F1Z5" value={gstin} onChange={e => setGstin(e.target.value.toUpperCase())}
                         className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Kitchen Street Address</label>
                <textarea required rows="3" placeholder="Gachibowli Street No 2, Near Police Station, Hyderabad" value={kitchenAddress} onChange={e => setKitchenAddress(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750" />
              </div>

              {/* Food Safety & Hygiene Quiz */}
              <div className="border-t border-stone-200 pt-6 mt-6 space-y-4">
                <h4 className="font-h3 text-sm font-bold text-stone-850 uppercase tracking-wider">Food Safety Qualification Test</h4>
                <p className="text-[11px] text-stone-500">Answer these safety questions correctly to qualify as a verified home chef on Ruchi Rush.</p>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-700">1. What is the correct temperature range for food storage?</label>
                  <select required value={q1} onChange={e => setQ1(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750 cursor-pointer text-stone-800"
                  >
                    <option value="">-- Select Answer --</option>
                    <option value="A">Under 5°C (Refrigerated) or above 60°C (Hot holding)</option>
                    <option value="B">Room temperature (20°C - 25°C) for all foods</option>
                    <option value="C">Keeping food warm at 40°C in open containers</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-700">2. How often must kitchen prep surfaces be cleaned and sanitized?</label>
                  <select required value={q2} onChange={e => setQ2(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750 cursor-pointer text-stone-800"
                  >
                    <option value="">-- Select Answer --</option>
                    <option value="A">Once at the end of every week</option>
                    <option value="B">Before and after preparing every batch of food</option>
                    <option value="C">Only when food spills or stains are visible</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-700">3. Which packaging materials are required for delivery orders?</label>
                  <select required value={q3} onChange={e => setQ3(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-stone-800 dark:border-stone-750 cursor-pointer text-stone-800"
                  >
                    <option value="">-- Select Answer --</option>
                    <option value="A">Leak-proof, food-grade, and temperature-insulated containers</option>
                    <option value="B">Standard plastic bags or aluminum wrap</option>
                    <option value="C">Open boxes to allow steam to escape</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={submitVerificationLoading}
                      className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
              >
                {submitVerificationLoading ? 'Validating credentials...' : 'Verify & Go Live'}
              </button>
            </form>
          </section>
        ) : (
          // Verified Dashboard UI
          <div className="space-y-8 animate-fade-in">
            
            {subView === 'dashboard' && (
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Stats cards */}
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Active Dishes</span>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-4xl font-black text-stone-900 dark:text-white">{dishes.filter(d => d.available).length}</span>
                    <span className="text-xs text-stone-500">Total: {dishes.length}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Ongoing Orders</span>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-4xl font-black text-primary">{orders.filter(o => o.status !== 'Delivered').length}</span>
                    <span className="text-xs text-stone-500">Total Complete: {orders.filter(o => o.status === 'Delivered').length}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Estimated Revenue</span>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-4xl font-black text-green-600">₹{orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.total, 0)}</span>
                    <span className="text-xs text-stone-500">Processed</span>
                  </div>
                </div>

                {/* Profile detail card */}
                <div className="col-span-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-4 items-center">
                    <img src={chefProfile?.avatar} className="w-16 h-16 rounded-full object-cover border border-stone-200" alt="avatar" />
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-lg">{chefProfile?.name}</h4>
                      <p className="text-xs text-stone-500 font-semibold">{chefProfile?.cuisine} • verified live</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-stone-600 dark:text-stone-300">
                    <div className="text-center bg-stone-50 border dark:bg-stone-850 dark:border-stone-700 px-4 py-2 rounded-xl">
                      <p className="text-stone-400 font-semibold text-[10px] uppercase">Rating</p>
                      <p className="text-lg text-primary mt-1">⭐️ {chefProfile?.rating}</p>
                    </div>
                    <div className="text-center bg-stone-50 border dark:bg-stone-850 dark:border-stone-700 px-4 py-2 rounded-xl">
                      <p className="text-stone-400 font-semibold text-[10px] uppercase">Reviews</p>
                      <p className="text-lg text-stone-800 dark:text-stone-200 mt-1">{chefProfile?.reviewsCount}</p>
                    </div>
                    <div className="text-center bg-stone-50 border dark:bg-stone-850 dark:border-stone-700 px-4 py-2 rounded-xl">
                      <p className="text-stone-400 font-semibold text-[10px] uppercase">Hygiene</p>
                      <p className="text-lg text-green-600 mt-1">{chefProfile?.hygieneScore.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {subView === 'orders' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <h4 className="font-h3 text-xl font-bold border-b border-primary/10 pb-2 text-stone-900 dark:text-white">Active Dispatch Queue</h4>
                
                {orders.filter(o => o.status !== 'Delivered').length === 0 ? (
                  <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500">No active incoming orders in your queue.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders
                      .filter(o => o.status !== 'Delivered')
                      .map(order => (
                        <div key={order.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3 text-xs">
                            <div>
                              <p className="font-bold text-stone-900 dark:text-white">Order #{order.id.replace("order_", "")}</p>
                              <p className="text-stone-400 text-[10px]">Customer: {order.customerName}</p>
                            </div>
                            <span className="bg-orange-50 text-orange-700 border border-orange-100 px-3 py-0.5 rounded-full font-bold text-[10px] uppercase">
                              {order.status}
                            </span>
                          </div>

                          <div className="text-xs space-y-1 text-stone-600 dark:text-stone-300">
                            {order.items.map((i, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{i.name} (x{i.qty})</span>
                                <span>₹{i.price * i.qty}</span>
                              </div>
                            ))}
                            <div className="flex justify-between font-bold text-stone-900 dark:text-white pt-2 border-t">
                              <span>Subtotal</span>
                              <span>₹{order.total}</span>
                            </div>
                            <p className="text-[10px] text-stone-400 pt-1">Address: {order.address}</p>
                          </div>

                          <div className="flex gap-2 pt-2">
                            {order.status === 'Placed' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                                className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-full cursor-pointer hover:bg-orange-600"
                              >
                                Accept & Start Preparing
                              </button>
                            )}
                            {order.status === 'Preparing' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'On Its Way')}
                                className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-full cursor-pointer hover:bg-orange-600"
                              >
                                Handover to Courier Rider
                              </button>
                            )}
                            {order.status === 'On Its Way' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                                className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded-full cursor-pointer hover:bg-green-700"
                              >
                                Mark as Delivered
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {subView === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                  <h4 className="font-h3 text-xl font-bold text-stone-900 dark:text-white">Kitchen Menu List</h4>
                  <button 
                    onClick={openAddDishModal}
                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-md flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">add</span>
                    Add New Dish
                  </button>
                </div>

                {dishes.length === 0 ? (
                  <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500">Your menu is currently empty. Click "Add New Dish" to list your first treat!</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dishes.map(dish => (
                      <div key={dish.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                        <img src={dish.image} className="w-full h-40 object-cover" alt={dish.name} />
                        <div className="p-5 space-y-3">
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold text-stone-900 dark:text-white truncate flex-1">{dish.name}</h5>
                            <span className="text-sm font-black text-primary ml-2">₹{dish.price}</span>
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-2">{dish.description}</p>
                          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 pt-2 border-t">
                            <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full dark:bg-stone-850 dark:text-stone-300">Spicy: {dish.spicyLevel}</span>
                            <div className="flex items-center gap-2">
                              <span>Available:</span>
                              <input 
                                type="checkbox"
                                checked={dish.available}
                                onChange={() => toggleDishAvailability(dish)}
                                className="cursor-pointer accent-primary"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex border-t border-stone-150 dark:border-stone-800">
                          <button 
                            onClick={() => openEditDishModal(dish)}
                            className="flex-1 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 dark:hover:bg-stone-850 border-r border-stone-150 dark:border-stone-800 text-center cursor-pointer dark:text-stone-300"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteDish(dish.id)}
                            className="flex-1 py-3 text-xs font-bold text-red-600 hover:bg-red-50 text-center cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Add/Edit Dish Modal Dialog */}
      {showDishModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowDishModal(false)}></div>
          <div className="relative bg-[#fff8f6] rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-primary/10 max-h-[90vh] overflow-y-auto">
            <button className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 text-xl font-bold p-2 cursor-pointer" onClick={() => setShowDishModal(false)}>✕</button>

            <h3 className="font-h2 text-2xl text-primary font-bold mb-4">{editingDish ? 'Update Dish' : 'Add New Menu Item'}</h3>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Dish Title</label>
                <input type="text" required placeholder="Spicy Chicken Dum Biryani" value={dishName} onChange={e => setDishName(e.target.value)}
                       className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Price (INR)</label>
                  <input type="number" required placeholder="180" value={dishPrice} onChange={e => setDishPrice(e.target.value)}
                         className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Cuisine Region</label>
                  <select value={dishCategory} onChange={e => setDishCategory(e.target.value)}
                          className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="south">South Indian</option>
                    <option value="north">North Indian</option>
                    <option value="diet">Diet Friendly</option>
                    <option value="hyderabadi">Hyderabadi</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Spice Level</label>
                <select value={dishSpicy} onChange={e => setDishSpicy(e.target.value)}
                        className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="❌">No Spice (❌)</option>
                  <option value="🌶️">Mild (🌶️)</option>
                  <option value="🌶️🌶️">Medium (🌶️🌶️)</option>
                  <option value="🌶️🌶️🌶️">Spicy (🌶️🌶️🌶️)</option>
                  <option value="🌶️🌶️🌶️🌶️">Extra Hot (🌶️🌶️🌶️🌶️)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Description / Details</label>
                <textarea required rows="3" placeholder="Describe the ingredients, preparation method, and allergen warning..." value={dishDesc} onChange={e => setDishDesc(e.target.value)}
                          className="w-full bg-white text-stone-900 border border-primary/20 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Dish Image URL (Optional)</label>
                <input type="text" placeholder="https://unsplash.com/yourdishimage.jpg" value={dishImage} onChange={e => setDishImage(e.target.value)}
                       className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm" />
              </div>

              <button type="submit"
                      className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
              >
                Save Menu Item
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
