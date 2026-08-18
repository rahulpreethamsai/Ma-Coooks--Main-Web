'use client';
import { useState, useEffect } from 'react';

export default function CustomerPortal({ currentUser, Toast, navigate, openAuthModal }) {
  const [chefs, setChefs] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [userLocation, setUserLocation] = useState('Gachibowli');

  // Navigation Substates
  const [viewState, setViewState] = useState('chefs'); // 'chefs', 'menu', 'orders', 'tracker'
  const [selectedChef, setSelectedChef] = useState(null);
  const [activeTrackerOrderId, setActiveTrackerOrderId] = useState(null);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('12:30 PM - 1:30 PM');
  const [upiId, setUpiId] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // UPI / Paytm / PhonePe payment options
  const [paymentMethod, setPaymentMethod] = useState('upi-apps'); // 'upi-apps', 'upi-id', 'cod'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe'); // 'phonepe', 'paytm', 'gpay'
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'connecting', 'waiting', 'success'
  const [paymentCountdown, setPaymentCountdown] = useState(4);

  // Fetch initial data from APIs
  const loadData = async () => {
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

      setChefs(chefsData || []);
      setDishes(dishesData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Error loading portal data:", error);
      Toast.show("Failed to sync backend data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
      // Load cart from localStorage
      const savedCart = localStorage.getItem('ruchirush_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          setCart([]);
        }
      }

      // Inspect URL area pre-filters (from city pages)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlArea = params.get('area');
        const cachedFilter = localStorage.getItem('ruchirush_delivery_area_filter');
        const targetArea = urlArea || cachedFilter;
        if (targetArea) {
          const validAreas = ["Gachibowli", "Madhapur", "Jubilee Hills", "Kukatpally", "Kondapur"];
          const matched = validAreas.find(a => a.toLowerCase() === targetArea.toLowerCase());
          if (matched) {
            setUserLocation(matched);
          }
          localStorage.removeItem('ruchirush_delivery_area_filter');
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save cart changes
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('ruchirush_cart', JSON.stringify(newCart));
  };

  const addToCart = (dish, chefId) => {
    // If cart contains items from a different chef, prompt to clear
    if (cart.length > 0 && cart[0].chefId !== chefId) {
      if (confirm("Your cart contains items from another chef. Clear cart to add this item?")) {
        const newCart = [{ ...dish, qty: 1, chefId }];
        saveCart(newCart);
        Toast.show(`Added "${dish.name}" to cart!`);
      }
      return;
    }

    const index = cart.findIndex(item => item.id === dish.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].qty += 1;
      saveCart(newCart);
    } else {
      const newCart = [...cart, { ...dish, qty: 1, chefId }];
      saveCart(newCart);
    }
    Toast.show(`Added "${dish.name}" to cart!`);
  };

  const updateQty = (id, change) => {
    const index = cart.findIndex(item => item.id === id);
    if (index === -1) return;
    const newCart = [...cart];
    newCart[index].qty += change;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    saveCart(newCart);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return subtotal > 0 ? subtotal + 40 : 0; // ₹40 delivery/handling fee
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (paymentMethod === 'upi-id' && !upiId.includes('@')) {
      Toast.show("Please enter a valid UPI ID (e.g. name@okaxis)", "error");
      return;
    }

    setCheckoutLoading(true);

    if (paymentMethod === 'cod') {
      // Direct placement for COD
      setPaymentStatus('success');
      setTimeout(async () => {
        await executeOrderPlacement();
      }, 1200);
      return;
    }

    // UPI Apps or Manual UPI ID Payment Simulation
    setPaymentStatus('connecting');
    
    // Step 1: Connecting to Gateways
    setTimeout(() => {
      setPaymentStatus('waiting');
      setPaymentCountdown(4);
      
      // Step 2: Countdown tick-down
      let count = 4;
      const interval = setInterval(() => {
        count -= 1;
        setPaymentCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          setPaymentStatus('success');
          
          // Step 3: Success and placement
          setTimeout(async () => {
            await executeOrderPlacement();
          }, 1200);
        }
      }, 1000);
    }, 1500);

    const executeOrderPlacement = async () => {
      try {
        const orderId = `order_${Date.now()}`;
        const newOrder = {
          id: orderId,
          customerName: currentUser.name || currentUser.displayName || currentUser.email.split('@')[0],
          customerEmail: currentUser.email,
          chefId: cart[0].chefId,
          items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: getCartTotal(),
          address: deliveryAddress,
          timeSlot: deliverySlot,
          status: 'Placed',
          createdAt: new Date().toISOString()
        };

        // Assign a mock rider
        const riders = [
          { name: "Ramesh Kumar", vehicle: "Ather 450X (TS 09 EQ 4210)", phone: "+919999999999" },
          { name: "Kiran Naik", vehicle: "Honda Activa (TS 07 ED 9582)", phone: "+919888888888" },
          { name: "Mohammed Ali", vehicle: "Hero Electric (TS 11 EF 3321)", phone: "+919777777777" }
        ];
        newOrder.assignedRider = riders[Math.floor(Math.random() * riders.length)];

        // Save order to backend API
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });

        if (res.ok) {
          saveCart([]);
          setShowCheckoutModal(false);
          setUpiId('');
          setDeliveryAddress('');
          setPaymentStatus('idle');
          
          // Refresh local orders list
          const ordersRes = await fetch('/api/orders');
          const ordersData = await ordersRes.json();
          setOrders(ordersData);

          setActiveTrackerOrderId(orderId);
          setViewState('tracker');
          Toast.show("Order placed successfully!", "success");
        } else {
          throw new Error("Failed to save order");
        }
      } catch (err) {
        console.error(err);
        Toast.show("Error submitting order to backend.", "error");
        setPaymentStatus('idle');
      } finally {
        setCheckoutLoading(false);
      }
    };
  };

  // Order progression tracker loop (for customer view helper)
  useEffect(() => {
    if (viewState !== 'tracker' || !activeTrackerOrderId) return;

    const interval = setInterval(async () => {
      // Fetch latest order state from database API
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      const activeOrder = ordersData.find(o => o.id === activeTrackerOrderId);
      if (!activeOrder) {
        clearInterval(interval);
        return;
      }

      // If active order gets updated, trigger local updates
      if (activeOrder.status === 'Delivered') {
        clearInterval(interval);
      } else {
        // Automatically progress state for prototype testing
        let nextStatus = '';
        if (activeOrder.status === 'Placed') nextStatus = 'Preparing';
        else if (activeOrder.status === 'Preparing') nextStatus = 'On Its Way';
        else if (activeOrder.status === 'On Its Way') nextStatus = 'Delivered';

        if (nextStatus) {
          const updatedOrder = { ...activeOrder, status: nextStatus };
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrder)
          });
        }
      }
    }, 15000); // Progress automatically every 15s for visual simulation

    return () => clearInterval(interval);
  }, [viewState, activeTrackerOrderId]);

  // Filters
  const cuisines = [
    { label: 'All Cuisines', id: 'all' },
    { label: 'South Indian', id: 'south' },
    { label: 'North Indian', id: 'north' },
    { label: 'Diet Friendly', id: 'diet' },
    { label: 'Hyderabadi', id: 'hyderabadi' }
  ];

  const filteredChefs = chefs.filter(chef => {
    const matchesCuisine = selectedCuisine === 'all' || chef.cuisine.toLowerCase().includes(selectedCuisine) ||
      dishes.some(d => d.chefId === chef.id && d.category === selectedCuisine);
    
    const matchesSearch = chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dishes.some(d => d.chefId === chef.id && d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCuisine && matchesSearch;
  });

  const activeChefMenu = dishes.filter(d => d.chefId === selectedChef?.id);
  const activeTrackerOrder = orders.find(o => o.id === activeTrackerOrderId);
  const activeTrackerChef = chefs.find(c => c.id === activeTrackerOrder?.chefId);

  return (
    <div id="customer-portal-view" className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      
      {/* Customer Portal Sub-Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => {
              if (viewState === 'menu') setViewState('chefs');
              else if (viewState === 'orders' || viewState === 'tracker') setViewState('chefs');
              else navigate('landing');
            }}
            className="flex items-center gap-1 text-primary hover:opacity-80 font-semibold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back</span>
          </button>
          <div className="h-6 w-[1px] bg-stone-300"></div>
          <span className="font-h2 text-xl font-bold text-stone-800 dark:text-stone-100">Customer Portal</span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          {/* Location selector */}
          <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 dark:bg-stone-850 dark:border-stone-700">
            <span className="material-symbols-outlined text-primary text-lg">location_on</span>
            <select 
              value={userLocation} 
              onChange={(e) => {
                setUserLocation(e.target.value);
                Toast.show(`Switched delivery location to ${e.target.value}`, "info");
              }}
              className="bg-transparent text-xs font-semibold text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer border-none"
            >
              <option value="Gachibowli">Gachibowli, Hyd</option>
              <option value="Madhapur">Madhapur, Hyd</option>
              <option value="Jubilee Hills">Jubilee Hills, Hyd</option>
              <option value="Kukatpally">Kukatpally, Hyd</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setViewState('orders');
              loadData();
            }}
            className="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            My Orders
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Pane */}
        <div className="lg:col-span-2 space-y-6">
          
          {loading ? (
            <div className="py-20 text-center space-y-2">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-stone-500 text-sm">Syncing home kitchens...</p>
            </div>
          ) : viewState === 'chefs' ? (
            <div className="space-y-6">
              {/* Search & Cuisine filters */}
              <div className="space-y-4">
                <input 
                  type="text"
                  placeholder="Search kitchens, dishes, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm dark:bg-stone-900 dark:border-stone-850"
                />

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {cuisines.map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setSelectedCuisine(pill.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                        selectedCuisine === pill.id 
                          ? 'bg-primary text-white' 
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 dark:bg-stone-900 dark:border-stone-850 dark:text-stone-300'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chefs Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredChefs.length === 0 ? (
                  <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500 font-semibold">No verified home chefs matching your criteria.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedCuisine('all'); }}
                      className="mt-4 bg-primary text-white px-5 py-2 rounded-full text-xs font-bold"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredChefs.map(chef => {
                    const chefDishes = dishes.filter(d => d.chefId === chef.id);
                    const specialties = chefDishes.slice(0, 2).map(d => d.name).join(", ");
                    return (
                      <div 
                        key={chef.id}
                        onClick={() => { setSelectedChef(chef); setViewState('menu'); }}
                        className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-shadow dark:border-stone-850"
                      >
                        <div>
                          <div className="flex gap-4 items-center mb-4">
                            <img src={chef.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-primary/25" alt={chef.name} />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-h3 text-lg font-bold text-stone-900 dark:text-white">{chef.name}</h3>
                                {chef.verified && (
                                  <span className="material-symbols-outlined text-green-600 text-lg" title="Verified Chef">verified</span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 font-medium">{chef.area} • {chef.deliveryTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <span className="material-symbols-outlined text-yellow-500 fill-current text-sm">star</span>
                            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{chef.rating}</span>
                            <span className="text-[10px] text-stone-500">({chef.reviewsCount} reviews)</span>
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-400 font-semibold mb-3">{chef.cuisine}</p>
                          {specialties && (
                            <p className="text-[11px] text-stone-500 italic">Specialties: {specialties}</p>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-primary/5 flex justify-between items-center text-xs font-bold text-primary">
                          <span>View Menu</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : viewState === 'menu' && selectedChef ? (
            <div className="space-y-6">
              {/* Chef Profile Summary */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/40 border border-primary/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center dark:from-stone-900 dark:to-stone-950 dark:border-stone-800">
                <img src={selectedChef.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md dark:border-stone-800" alt={selectedChef.name} />
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-h2 text-2xl font-bold text-stone-900 dark:text-white">{selectedChef.name}</h3>
                    {selectedChef.verified && (
                      <span className="material-symbols-outlined text-green-600 text-xl">verified</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 font-semibold">{selectedChef.cuisine}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{selectedChef.bio}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs font-semibold text-stone-500 pt-1">
                    <span>🏆 Hygiene Score: {selectedChef.hygieneScore}</span>
                    <span>📅 Onboarded: {selectedChef.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Menu List */}
              <div className="space-y-4">
                <h4 className="font-h3 text-xl font-bold border-b border-primary/10 pb-2 text-stone-900 dark:text-white">Active Dishes</h4>
                {activeChefMenu.length === 0 ? (
                  <div className="py-12 text-center bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500">This chef has no active dishes listed today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeChefMenu.map(dish => (
                      <div 
                        key={dish.id}
                        className="bg-white dark:bg-stone-900 rounded-2xl p-4 flex gap-4 border border-stone-200 dark:border-stone-800 shadow-sm items-center"
                      >
                        <img src={dish.image} className="w-20 h-20 rounded-xl object-cover border border-stone-100 dark:border-stone-800 shrink-0" alt={dish.name} />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-bold text-stone-900 dark:text-white truncate text-sm">{dish.name}</h5>
                            <span className="text-sm font-black text-primary shrink-0">₹{dish.price}</span>
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-2">{dish.description}</p>
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold dark:bg-stone-850 dark:text-stone-300">
                              Spicy: {dish.spicyLevel}
                            </span>
                            
                            {dish.available ? (
                              <button 
                                onClick={() => addToCart(dish, selectedChef.id)}
                                className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                              >
                                <span className="material-symbols-outlined text-xs">add_shopping_cart</span>
                                Add to Cart
                              </button>
                            ) : (
                              <span className="text-xs text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : viewState === 'orders' ? (
            <div className="space-y-6">
              <h4 className="font-h3 text-xl font-bold border-b border-primary/10 pb-2 text-stone-900 dark:text-white">Order History</h4>
              
              {orders.filter(o => o.customerEmail === currentUser?.email).length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
                  <p className="text-stone-500">You haven&apos;t placed any orders yet!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders
                    .filter(o => o.customerEmail === currentUser?.email)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(order => {
                      const chef = chefs.find(c => c.id === order.chefId);
                      return (
                        <div 
                          key={order.id}
                          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-primary/5 pb-3">
                            <div>
                              <h5 className="font-bold text-sm text-stone-900 dark:text-white">Kitchen: {chef?.name || 'Chef'}</h5>
                              <p className="text-[10px] text-stone-400">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-50 text-green-700 border border-green-100' 
                                  : 'bg-orange-50 text-orange-700 border border-orange-100 tracker-pulse'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="text-xs space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-stone-600 dark:text-stone-300">
                                <span>{item.name} (x{item.qty})</span>
                                <span>₹{item.price * item.qty}</span>
                              </div>
                            ))}
                            <div className="flex justify-between font-bold pt-2 border-t border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white">
                              <span>Total Amount</span>
                              <span>₹{order.total}</span>
                            </div>
                          </div>

                          {order.status !== 'Delivered' && (
                            <button 
                              onClick={() => {
                                setActiveTrackerOrderId(order.id);
                                setViewState('tracker');
                              }}
                              className="w-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold py-2 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                            >
                              Track Live Status
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ) : viewState === 'tracker' && activeTrackerOrder ? (
            <div className="space-y-6">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="text-center">
                  <h4 className="font-h3 text-xl font-bold text-stone-900 dark:text-white">Order Track Progress</h4>
                  <p className="text-xs text-stone-400 mt-1">ID: #{activeTrackerOrder.id.replace("order_", "")} • Kitchen: {activeTrackerChef?.name}</p>
                </div>

                {/* Progress Indicators */}
                <div className="relative flex items-center justify-between mt-4">
                  <div className="absolute left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 z-0">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${
                          activeTrackerOrder.status === 'Placed' ? 0 
                          : activeTrackerOrder.status === 'Preparing' ? 33 
                          : activeTrackerOrder.status === 'On Its Way' ? 66 
                          : 100
                        }%`
                      }}
                    ></div>
                  </div>

                  {['Placed', 'Preparing', 'On Its Way', 'Delivered'].map((step, idx) => {
                    const stages = ['Placed', 'Preparing', 'On Its Way', 'Delivered'];
                    const currentIdx = stages.indexOf(activeTrackerOrder.status);
                    const isActive = idx <= currentIdx;
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border-2 ${
                          isActive 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-stone-100 text-stone-400 border-stone-200 dark:bg-stone-850 dark:border-stone-700'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className={`text-[10px] mt-2 font-bold ${isActive ? 'text-primary' : 'text-stone-400'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Courier rider card */}
                {activeTrackerOrder.assignedRider && (
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center gap-4 dark:bg-stone-950/20">
                    <span className="text-3xl">🛵</span>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-primary">Your Delivery Courier</h5>
                      <p className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">{activeTrackerOrder.assignedRider.name}</p>
                      <p className="text-xs text-stone-500">{activeTrackerOrder.assignedRider.vehicle}</p>
                    </div>
                    <a 
                      href={`tel:${activeTrackerOrder.assignedRider.phone}`}
                      className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-transform"
                    >
                      Call
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-xs space-y-2">
                  <h5 className="font-bold text-stone-900 dark:text-white">Order Summary:</h5>
                  {activeTrackerOrder.items.map((i, index) => (
                    <div key={index} className="flex justify-between text-stone-600 dark:text-stone-300">
                      <span>{i.name} (x{i.qty})</span>
                      <span>₹{i.price * i.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-white pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span>Total Settled</span>
                    <span>₹{activeTrackerOrder.total}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setViewState('chefs')}
                  className="w-full bg-stone-100 text-stone-800 py-3 rounded-full text-xs font-bold hover:bg-stone-250 dark:bg-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Return to Browse
                </button>
              </div>
            </div>
          ) : null}

        </div>

        {/* Sidebar Cart Column */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-6 sticky top-28">
            <h4 className="font-h3 text-xl font-bold border-b border-primary/10 pb-2 text-stone-900 dark:text-white flex justify-between items-center">
              <span>My Basket</span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-black">{cart.length} items</span>
            </h4>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <span className="material-symbols-outlined text-4xl block text-stone-300">shopping_bag</span>
                <p className="text-xs">Your basket is empty. Browse kitchens to add homemade treats.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-stone-400">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer dark:border-stone-700">-</button>
                        <span className="font-bold text-xs text-stone-800 dark:text-stone-200">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer dark:border-stone-700">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 dark:border-stone-800 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>₹{cart.reduce((acc, item) => acc + (item.price * item.qty), 0)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Delivery & Handling Fee</span>
                    <span>₹40</span>
                  </div>
                  <div className="flex justify-between font-black text-stone-900 dark:text-white text-sm pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span>Estimated Total</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!currentUser) {
                      Toast.show("Please login or create an account to place orders.", "info");
                      openAuthModal('login');
                    } else {
                      setShowCheckoutModal(true);
                    }
                  }}
                  className="w-full bg-primary text-white py-3 rounded-full text-sm font-bold hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => !checkoutLoading && setShowCheckoutModal(false)}></div>
          <div className="relative bg-[#fff8f6] rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-primary/10 overflow-hidden">
            {!checkoutLoading && (
              <button className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 text-xl font-bold p-2 cursor-pointer" onClick={() => setShowCheckoutModal(false)}>✕</button>
            )}
            
            {paymentStatus !== 'idle' ? (
              // Secure Payment Gateway Simulation Overlay
              <div className="py-8 text-center space-y-6 animate-none">
                {paymentStatus === 'connecting' && (
                  <div className="space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <h4 className="font-h3 text-lg font-bold text-stone-800">Connecting to secure gateway...</h4>
                    <p className="text-xs text-stone-500">Contacting {selectedUpiApp === 'phonepe' ? 'PhonePe' : selectedUpiApp === 'paytm' ? 'Paytm' : selectedUpiApp === 'gpay' ? 'Google Pay' : 'UPI'} payment services.</p>
                  </div>
                )}

                {paymentStatus === 'waiting' && (
                  <div className="space-y-4">
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-orange-100 rounded-full text-3xl animate-bounce">
                      {selectedUpiApp === 'phonepe' ? '🟣' : selectedUpiApp === 'paytm' ? '🔵' : '🟢'}
                    </div>
                    <h4 className="font-h3 text-lg font-bold text-stone-800">Approve payment on your phone</h4>
                    <p className="text-xs text-stone-600 px-4 leading-relaxed">
                      We sent a payment request of <strong>₹{getCartTotal()}</strong> to your mobile device. Please open your 
                      <span className="font-black text-primary"> {selectedUpiApp === 'phonepe' ? 'PhonePe' : selectedUpiApp === 'paytm' ? 'Paytm' : 'Google Pay'}</span> app and approve the request.
                    </p>
                    <div className="text-sm font-black text-primary mt-2">
                      Waiting for approval... (T-minus {paymentCountdown}s)
                    </div>
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-4xl text-green-600 mx-auto">
                      ✓
                    </div>
                    <h4 className="font-h3 text-xl font-bold text-green-600">Payment Successful!</h4>
                    <p className="text-xs text-stone-500">Transaction completed via secure UPI gateway. Placing your order...</p>
                  </div>
                )}
              </div>
            ) : (
              // Main Checkout Form
              <>
                <h3 className="font-h2 text-2xl text-primary font-bold mb-4">Finalize Checkout</h3>
                
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Delivery Address</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Flat No, Apartment Name, Street Name"
                      value={deliveryAddress} 
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Preferred Delivery Slot</label>
                    <select 
                      value={deliverySlot} 
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
                    >
                      <option value="12:30 PM - 1:30 PM">Lunch (12:30 PM - 1:30 PM)</option>
                      <option value="1:35 PM - 2:35 PM">Late Lunch (1:35 PM - 2:35 PM)</option>
                      <option value="7:30 PM - 8:30 PM">Dinner (7:30 PM - 8:30 PM)</option>
                      <option value="8:35 PM - 9:35 PM">Late Dinner (8:35 PM - 9:35 PM)</option>
                    </select>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Payment Method</label>
                    <div className="flex border border-primary/10 rounded-full overflow-hidden text-[10px] font-bold">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi-apps')}
                        className={`flex-1 py-2 text-center cursor-pointer transition-colors ${paymentMethod === 'upi-apps' ? 'bg-primary text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                      >
                        UPI Apps
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi-id')}
                        className={`flex-1 py-2 text-center cursor-pointer transition-colors ${paymentMethod === 'upi-id' ? 'bg-primary text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                      >
                        UPI ID
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex-1 py-2 text-center cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-primary text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                      >
                        Cash on Delivery
                      </button>
                    </div>

                    {/* Payment details depending on method */}
                    {paymentMethod === 'upi-apps' && (
                      <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                        <button 
                          type="button"
                          onClick={() => setSelectedUpiApp('phonepe')}
                          className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedUpiApp === 'phonepe' ? 'border-purple-600 bg-purple-50/20 text-purple-700 font-bold' : 'border-stone-200 bg-white hover:bg-stone-50'}`}
                        >
                          <span className="text-lg">🟣</span>
                          <span>PhonePe</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSelectedUpiApp('paytm')}
                          className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedUpiApp === 'paytm' ? 'border-sky-500 bg-sky-50/20 text-sky-700 font-bold' : 'border-stone-200 bg-white hover:bg-stone-50'}`}
                        >
                          <span className="text-lg">🔵</span>
                          <span>Paytm</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSelectedUpiApp('gpay')}
                          className={`py-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedUpiApp === 'gpay' ? 'border-green-600 bg-green-50/20 text-green-700 font-bold' : 'border-stone-200 bg-white hover:bg-stone-50'}`}
                        >
                          <span className="text-lg">🟢</span>
                          <span>GPay</span>
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'upi-id' && (
                      <div className="flex flex-col gap-1 pt-1">
                        <input 
                          type="text" 
                          required={paymentMethod === 'upi-id'}
                          placeholder="yourname@okaxis"
                          value={upiId} 
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-white text-stone-900 border border-primary/20 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                        />
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[10px] text-stone-600 leading-relaxed text-center font-medium">
                        💵 Keep cash ready or scan QR code on delivery. Handling fees are included in the subtotal.
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-primary/10 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-sm text-stone-900">
                      <span>Grand Total (with fees)</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={checkoutLoading}
                    className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
                  >
                    {paymentMethod === 'cod' ? 'Place Cash Order' : `Pay ₹${getCartTotal()} & Order`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
