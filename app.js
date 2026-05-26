/* ============================================================
   Ruchi Rush — Application Logic & DB (app.js)
   ============================================================ */

// ============================================================
// 1. MOCK DATABASE (localStorage Relational Database)
// ============================================================
const DB = {
    init() {
        if (!localStorage.getItem("ruchirush_chefs")) {
            const defaultChefs = [
                {
                    id: "chef_1",
                    name: "Priya K.",
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                    rating: 4.8,
                    reviewsCount: 142,
                    cuisine: "Andhra & South Indian Meals",
                    area: "Gachibowli",
                    bio: "Passionate home chef sharing ancestral recipes from Godavari districts. Known for authentic spice blends and hygienic small-batch cooking.",
                    verified: true,
                    hygieneScore: "98% (A+ Grade)",
                    deliveryTime: "30-45 mins",
                    joinedDate: "October 2025"
                },
                {
                    id: "chef_2",
                    name: "Meena R.",
                    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
                    rating: 4.9,
                    reviewsCount: 96,
                    cuisine: "Punjabi & North Indian Delights",
                    area: "Madhapur",
                    bio: "Bringing the rich flavors of Punjab straight to your table. Homemade paneer, freshly rolled phulkas, and slow-cooked dals are my specialties.",
                    verified: true,
                    hygieneScore: "96% (A Grade)",
                    deliveryTime: "35-50 mins",
                    joinedDate: "December 2025"
                },
                {
                    id: "chef_3",
                    name: "Lakshmi D.",
                    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop",
                    rating: 4.7,
                    reviewsCount: 81,
                    cuisine: "Traditional Breakfasts & Snacks",
                    area: "Jubilee Hills",
                    bio: "Healthy and traditional breakfast varieties including pesarattu, idli, and millets-based dishes. I grind my batters fresh daily with organic grains.",
                    verified: true,
                    hygieneScore: "99% (A+ Grade)",
                    deliveryTime: "25-35 mins",
                    joinedDate: "January 2026"
                },
                {
                    id: "chef_4",
                    name: "Srinivas Reddy",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                    rating: 4.9,
                    reviewsCount: 218,
                    cuisine: "Hyderabadi Biryanis & Kebabs",
                    area: "Kukatpally",
                    bio: "Born and raised in Old City, I prepare slow-dum biryanis in traditional handis. Prepared using pure ghee, fresh meat, and hand-ground spices.",
                    verified: true,
                    hygieneScore: "95% (A Grade)",
                    deliveryTime: "45-60 mins",
                    joinedDate: "November 2025"
                }
            ];
            localStorage.setItem("ruchirush_chefs", JSON.stringify(defaultChefs));
        }

        if (!localStorage.getItem("ruchirush_menu")) {
            const defaultMenu = [
                // Chef 1 - Priya K.
                { id: "dish_1", chefId: "chef_1", name: "Spicy Parotta + Egg Curry", price: 120, description: "2 layered fluffy parottas served with a rich, slow-simmered egg gravy spiced with home ground masala.", category: "south", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop" },
                { id: "dish_2", chefId: "chef_1", name: "Andhra Special Veg Thali", price: 150, description: "Authentic meal box containing pappu, sambar, fry, dry curry, pickle, curd, and fresh hot rice.", category: "south", spicyLevel: "🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&h=200&fit=crop" },
                { id: "dish_3", chefId: "chef_1", name: "Tempered Curd Rice", price: 70, description: "Cooling curd rice tempered with mustard seeds, curry leaves, ginger, and green chillies. Served with pickle.", category: "diet", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop" },
                // Chef 2 - Meena R.
                { id: "dish_4", chefId: "chef_2", name: "Paneer Butter Masala + Roti (3pcs)", price: 160, description: "Soft fresh paneer cubes cooked in a buttery tomato gravy, served with 3 fluffy wheat rotis.", category: "north", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop" },
                { id: "dish_5", chefId: "chef_2", name: "Dal Makhani + Basmati Rice", price: 130, description: "Overnight slow-cooked black lentils simmered with cream and butter. Served with fragrant steamed rice.", category: "north", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop" },
                { id: "dish_6", chefId: "chef_2", name: "Aloo Paratha with White Butter", price: 90, description: "2 whole wheat flatbreads stuffed with spicy mashed potato filling. Served with homemade white butter & pickle.", category: "north", spicyLevel: "🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=200&fit=crop" },
                // Chef 3 - Lakshmi D.
                { id: "dish_7", chefId: "chef_3", name: "Andhra Pesarattu Upma", price: 80, description: "Healthy whole green gram crepe stuffed with ginger-spiced semolina upma. Served with ginger chutney.", category: "south", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop" },
                { id: "dish_8", chefId: "chef_3", name: "Guntur Karam Podi Idli (4pcs)", price: 70, description: "Super soft steamed idlis tossed in spicy Guntur spice powder and pure ghee. Hot & delicious.", category: "south", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" },
                { id: "dish_9", chefId: "chef_3", name: "Finger Millet (Ragi) Idli (4pcs)", price: 75, description: "Nutritious and light idlis prepared with fermented ragi and black gram batter. High in calcium and fiber.", category: "diet", spicyLevel: "❌", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" },
                // Chef 4 - Srinivas Reddy
                { id: "dish_10", chefId: "chef_4", name: "Hyderabadi Chicken Dum Biryani", price: 220, description: "Fragrant basmati rice layered with spice-marinated chicken, cooked in slow handi dum style. Served with raita.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop" },
                { id: "dish_11", chefId: "chef_4", name: "Spicy Old City Chicken Fry", price: 180, description: "Juicy bone-in chicken pieces stir-fried with dry coconut flakes, curry leaves, and local hot spices.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop" },
                { id: "dish_12", chefId: "chef_4", name: "Mirchi Bajji (4pcs)", price: 50, description: "Deep-fried batter-coated large green chillies stuffed with tangy onion-peanut mixture.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" }
            ];
            localStorage.setItem("ruchirush_menu", JSON.stringify(defaultMenu));
        }

        if (!localStorage.getItem("ruchirush_orders")) {
            const initialOrders = [
                {
                    id: "order_1001",
                    customerName: "Rahul Sai",
                    chefId: "chef_1",
                    items: [{ name: "Spicy Parotta + Egg Curry", qty: 2, price: 120 }],
                    total: 280, // Subtotal 240 + 40 fees
                    address: "Flat 402, Gachibowli Heights, Gachibowli",
                    timeSlot: "12:30 PM - 1:30 PM",
                    status: "Delivered",
                    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
                },
                {
                    id: "order_1002",
                    customerName: "Sneha Reddy",
                    chefId: "chef_1",
                    items: [{ name: "Andhra Special Veg Thali", qty: 1, price: 150 }, { name: "Tempered Curd Rice", qty: 1, price: 70 }],
                    total: 260,
                    address: "Building B, Madhapur Residency, Madhapur",
                    timeSlot: "1:30 PM - 2:30 PM",
                    status: "Delivered",
                    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
                }
            ];
            localStorage.setItem("ruchirush_orders", JSON.stringify(initialOrders));
        }

        if (!localStorage.getItem("ruchirush_users")) {
            const defaultUsers = [
                { name: "Rahul Sai", email: "rahul@ruchirush.com", password: "password123", role: "customer" },
                { name: "Priya K.", email: "priya@ruchirush.com", password: "password123", role: "chef", chefId: "chef_1", verified: true, verificationStatus: "Passed" },
                { name: "Meena R.", email: "meena@ruchirush.com", password: "password123", role: "chef", chefId: "chef_2", verified: true, verificationStatus: "Passed" },
                { name: "Lakshmi D.", email: "lakshmi@ruchirush.com", password: "password123", role: "chef", chefId: "chef_3", verified: true, verificationStatus: "Passed" },
                { name: "Srinivas Reddy", email: "srinivas@ruchirush.com", password: "password123", role: "chef", chefId: "chef_4", verified: true, verificationStatus: "Passed" }
            ];
            localStorage.setItem("ruchirush_users", JSON.stringify(defaultUsers));
        }
    },

    getUsers() {
        return JSON.parse(localStorage.getItem("ruchirush_users")) || [];
    },

    getUserByEmail(email) {
        return this.getUsers().find(u => u.email === email);
    },

    updateUser(updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === updatedUser.email);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem("ruchirush_users", JSON.stringify(users));
        }
    },

    getChefs() {
        return JSON.parse(localStorage.getItem("ruchirush_chefs")) || [];
    },

    getChefById(id) {
        return this.getChefs().find(chef => chef.id === id);
    },

    getMenu() {
        return JSON.parse(localStorage.getItem("ruchirush_menu")) || [];
    },

    getMenuByChef(chefId) {
        return this.getMenu().filter(dish => dish.chefId === chefId);
    },

    addDish(dish) {
        const menu = this.getMenu();
        dish.id = "dish_" + Date.now();
        menu.push(dish);
        localStorage.setItem("ruchirush_menu", JSON.stringify(menu));
        this.broadcastUpdate("ruchirush_menu");
    },

    updateDish(dishId, updatedData) {
        const menu = this.getMenu();
        const index = menu.findIndex(d => d.id === dishId);
        if (index !== -1) {
            menu[index] = { ...menu[index], ...updatedData };
            localStorage.setItem("ruchirush_menu", JSON.stringify(menu));
            this.broadcastUpdate("ruchirush_menu");
        }
    },

    deleteDish(dishId) {
        let menu = this.getMenu();
        menu = menu.filter(d => d.id !== dishId);
        localStorage.setItem("ruchirush_menu", JSON.stringify(menu));
        this.broadcastUpdate("ruchirush_menu");
    },

    getOrders() {
        return JSON.parse(localStorage.getItem("ruchirush_orders")) || [];
    },

    getChefOrders(chefId) {
        return this.getOrders().filter(o => o.chefId === chefId);
    },

    createOrder(orderData) {
        const orders = this.getOrders();
        orderData.id = "order_" + Math.floor(1000 + Math.random() * 9000);
        orderData.createdAt = new Date().toISOString();
        orders.push(orderData);
        localStorage.setItem("ruchirush_orders", JSON.stringify(orders));
        this.broadcastUpdate("ruchirush_orders");
        return orderData;
    },

    getOrderById(id) {
        return this.getOrders().find(o => o.id === id);
    },

    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = status;
            
            // Assign delivery rider if preparing and not yet assigned
            if (status === "Preparing" && !orders[index].assignedRider) {
                const riders = [
                    { name: "Ravi Kumar", vehicle: "Honda Activa (TS09-EX-4521)", phone: "+91 98765 43210" },
                    { name: "Suresh Gowd", vehicle: "Hero Splendor (TS08-AY-8921)", phone: "+91 91234 56789" },
                    { name: "Karthik Raja", vehicle: "TVS Jupiter (TS07-FD-3312)", phone: "+91 99887 76655" }
                ];
                orders[index].assignedRider = riders[Math.floor(Math.random() * riders.length)];
            }
            
            localStorage.setItem("ruchirush_orders", JSON.stringify(orders));
            this.broadcastUpdate("ruchirush_orders");
        }
    },

    broadcastUpdate(key) {
        // Trigger storage event manually for the current window (in addition to cross-tab storage events)
        window.dispatchEvent(new StorageEvent("storage", {
            key: key,
            newValue: localStorage.getItem(key)
        }));
    }
};

// Initialize DB immediately
DB.init();

// ============================================================
// 2. STATE MANAGER & ROUTER
// ============================================================
const state = {
    activeView: "landing", // landing, customer-portal, chef-portal
    currentUser: (() => {
        const user = localStorage.getItem("ruchirush_active_user");
        return user ? JSON.parse(user) : null;
    })(),
    activeChefId: (() => {
        const user = localStorage.getItem("ruchirush_active_user");
        if (user) {
            const u = JSON.parse(user);
            if (u.role === "chef") return u.chefId;
        }
        return "chef_1"; // Default fallback chef
    })(),
    selectedChefForMenu: null,
    cart: [], // Line items in format { dishId, name, price, qty }
    activeTrackingOrderId: null,
    userLocation: "Gachibowli",
    selectedCuisine: "all",
    searchQuery: ""
};

const Router = {
    init() {
        // Bind UI triggers
        document.querySelectorAll('a[href="#hero"], a[href="#"], .logo-trigger').forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                this.navigate("landing");
            });
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", (e) => {
                if (state.activeView !== "landing") {
                    e.preventDefault();
                    this.navigate("landing");
                    // Wait for fade transitions then scroll
                    setTimeout(() => {
                        const targetId = link.getAttribute("href").substring(1);
                        const target = document.getElementById(targetId);
                        if (target) {
                            const offset = 80;
                            const top = target.getBoundingClientRect().top + window.scrollY - offset;
                            window.scrollTo({ top, behavior: "smooth" });
                        }
                    }, 350);
                }
            });
        });

        // Register Global Storage Watcher for Real-time syncing
        window.addEventListener("storage", (e) => {
            if (e.key === "ruchirush_active_user") {
                const newValue = e.newValue;
                if (!newValue) {
                    if (state.currentUser) {
                        state.currentUser = null;
                        state.cart = [];
                        Auth.updateUI();
                        Toast.show("Logged out in another tab", "info");
                    }
                } else {
                    const user = JSON.parse(newValue);
                    if (!state.currentUser || state.currentUser.email !== user.email) {
                        state.currentUser = user;
                        if (user.role === "chef") {
                            state.activeChefId = user.chefId;
                        }
                        Auth.updateUI();
                        Toast.show(`Logged in as ${user.name} in another tab`, "success");
                    }
                }
            }
            if (e.key === "ruchirush_orders") {
                if (state.activeTrackingOrderId) {
                    CustomerPortal.updateTrackingProgress(state.activeTrackingOrderId);
                }
                if (state.activeView === "chef-portal") {
                    ChefPortal.renderOrdersQueue();
                    ChefPortal.renderDashboard();
                }
            }
            if (e.key === "ruchirush_menu" && state.activeView === "customer-portal" && state.selectedChefForMenu) {
                CustomerPortal.renderChefMenu(state.selectedChefForMenu);
            }
        });
    },

    navigate(viewName) {
        // Route Guards
        if (viewName === "customer-portal") {
            if (!state.currentUser) {
                Toast.show("Please login to access the Customer Portal.", "error");
                Auth.openModal("login");
                return;
            }
            if (state.currentUser.role !== "customer") {
                Toast.show("Chef accounts cannot access the Customer Portal.", "error");
                return;
            }
        }
        if (viewName === "chef-portal") {
            if (!state.currentUser) {
                Toast.show("Please login to access the Chef Hub.", "error");
                Auth.openModal("login");
                return;
            }
            if (state.currentUser.role !== "chef") {
                Toast.show("Customer accounts cannot access the Chef Hub.", "error");
                return;
            }
        }

        if (state.activeView === viewName) return;

        const currentViewEl = document.getElementById(`${state.activeView}-view`);
        const targetViewEl = document.getElementById(`${viewName}-view`);

        if (!targetViewEl) return;

        // Smooth GSAP Fading transitions
        gsap.to(currentViewEl, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => {
                currentViewEl.classList.add("hidden");
                targetViewEl.classList.remove("hidden");
                gsap.fromTo(targetViewEl,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
                window.scrollTo({ top: 0, behavior: "instant" });

                // Initialize specific views
                state.activeView = viewName;
                if (viewName === "customer-portal") {
                    CustomerPortal.init();
                } else if (viewName === "chef-portal") {
                    ChefPortal.init();
                }
            }
        });
    }
};

// ============================================================
// 3. TOAST NOTIFICATIONS
// ============================================================
const Toast = {
    show(message, type = "success") {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast-msg ${type}`;
        
        let icon = "info";
        if (type === "success") icon = "check_circle";
        if (type === "error") icon = "error";

        toast.innerHTML = `
            <span class="material-symbols-outlined">${icon}</span>
            <span class="font-body-md font-semibold">${message}</span>
        `;

        container.appendChild(toast);

        // Slide out and remove toast after 3s
        setTimeout(() => {
            toast.classList.add("toast-slide-out");
            toast.addEventListener("animationend", () => {
                toast.remove();
            });
        }, 3000);
    }
};

// ============================================================
// 3.5. AUTHENTICATION MANAGER & PWA INSTALLATION
// ============================================================
const Auth = {
    mode: "login", // login or register

    init() {
        // Close modal button
        document.getElementById("btn-close-auth")?.addEventListener("click", () => this.closeModal());
        
        // Tab switching
        document.getElementById("auth-tab-login")?.addEventListener("click", () => this.switchMode("login"));
        document.getElementById("auth-tab-register")?.addEventListener("click", () => this.switchMode("register"));

        // Auth Form submit
        const form = document.getElementById("auth-form");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Header click listener for login button
        document.getElementById("btn-landing-auth")?.addEventListener("click", () => this.openModal("login"));
        document.getElementById("btn-landing-logout")?.addEventListener("click", () => this.logout());

        // Mobile header auth
        document.getElementById("btn-mobile-auth")?.addEventListener("click", () => {
            this.openModal("login");
        });
        document.getElementById("btn-mobile-logout")?.addEventListener("click", () => {
            this.logout();
        });

        // Customer header logout
        document.getElementById("btn-customer-logout")?.addEventListener("click", () => this.logout());

        // Chef header logout
        document.getElementById("btn-chef-logout")?.addEventListener("click", () => this.logout());

        // Role select visual toggles
        const customerRadio = document.getElementById("auth-role-customer");
        const chefRadio = document.getElementById("auth-role-chef");
        const customerLabel = document.getElementById("auth-role-customer-label");
        const chefLabel = document.getElementById("auth-role-chef-label");

        customerRadio?.addEventListener("change", () => {
            if (customerRadio.checked) {
                customerLabel.className = "border-2 border-primary rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative";
                customerLabel.querySelector(".role-selector-dot").className = "role-selector-dot absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary";
                
                chefLabel.className = "border-2 border-stone-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative";
                chefLabel.querySelector(".role-selector-dot").className = "role-selector-dot absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-stone-200";
            }
        });

        chefRadio?.addEventListener("change", () => {
            if (chefRadio.checked) {
                chefLabel.className = "border-2 border-primary rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative";
                chefLabel.querySelector(".role-selector-dot").className = "role-selector-dot absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary";
                
                customerLabel.className = "border-2 border-stone-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative";
                customerLabel.querySelector(".role-selector-dot").className = "role-selector-dot absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-stone-200";
            }
        });

        // Call updateUI once to reflect initial state
        this.updateUI();
    },

    openModal(mode = "login") {
        document.getElementById("auth-modal")?.classList.remove("hidden");
        this.switchMode(mode);
    },

    closeModal() {
        document.getElementById("auth-modal")?.classList.add("hidden");
        document.getElementById("auth-form")?.reset();
    },

    switchMode(mode) {
        this.mode = mode;
        const nameContainer = document.getElementById("auth-name-container");
        const roleContainer = document.getElementById("auth-role-container");
        const submitBtn = document.getElementById("btn-auth-submit");
        const nameInput = document.getElementById("auth-name-input");

        const tabLogin = document.getElementById("auth-tab-login");
        const tabRegister = document.getElementById("auth-tab-register");

        if (mode === "login") {
            nameContainer?.classList.add("hidden");
            roleContainer?.classList.add("hidden");
            nameInput?.removeAttribute("required");
            if (submitBtn) submitBtn.textContent = "Login";

            tabLogin?.classList.remove("border-transparent", "text-stone-500");
            tabLogin?.classList.add("border-primary", "text-primary");
            tabRegister?.classList.remove("border-primary", "text-primary");
            tabRegister?.classList.add("border-transparent", "text-stone-500");
        } else {
            nameContainer?.classList.remove("hidden");
            roleContainer?.classList.remove("hidden");
            nameInput?.setAttribute("required", "required");
            if (submitBtn) submitBtn.textContent = "Register Account";

            tabRegister?.classList.remove("border-transparent", "text-stone-500");
            tabRegister?.classList.add("border-primary", "text-primary");
            tabLogin?.classList.remove("border-primary", "text-primary");
            tabLogin?.classList.add("border-transparent", "text-stone-500");
        }
    },

    handleSubmit() {
        const email = document.getElementById("auth-email-input").value.toLowerCase().trim();
        const password = document.getElementById("auth-password-input").value;
        const name = document.getElementById("auth-name-input").value.trim();
        const role = document.querySelector('input[name="auth-role"]:checked')?.value || "customer";

        const formEl = document.getElementById("auth-form");
        const loaderEl = document.getElementById("auth-loading");

        // Hide form, show loader
        if (formEl) formEl.classList.add("hidden");
        if (loaderEl) loaderEl.classList.remove("hidden");

        setTimeout(() => {
            if (this.mode === "login") {
                const user = DB.getUserByEmail(email);
                if (!user || user.password !== password) {
                    Toast.show("Invalid email or password", "error");
                    if (formEl) formEl.classList.remove("hidden");
                    if (loaderEl) loaderEl.classList.add("hidden");
                    return;
                }

                // Set user
                state.currentUser = user;
                if (user.role === "chef") {
                    state.activeChefId = user.chefId;
                }
                localStorage.setItem("ruchirush_active_user", JSON.stringify(user));
                DB.broadcastUpdate("ruchirush_active_user");

                Toast.show(`Welcome back, ${user.name}!`, "success");
                this.closeModal();
                this.updateUI();

                // Navigate to their portal
                if (user.role === "customer") {
                    Router.navigate("customer-portal");
                } else if (user.role === "chef") {
                    Router.navigate("chef-portal");
                }

            } else {
                // Register
                const existing = DB.getUserByEmail(email);
                if (existing) {
                    Toast.show("Email is already registered", "error");
                    if (formEl) formEl.classList.remove("hidden");
                    if (loaderEl) loaderEl.classList.add("hidden");
                    return;
                }

                let newChefId = null;
                if (role === "chef") {
                    newChefId = "chef_" + Date.now();
                    // Add Chef profile
                    const chefs = DB.getChefs();
                    chefs.push({
                        id: newChefId,
                        name: name,
                        avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop", // Default chef avatar
                        rating: 5.0,
                        reviewsCount: 0,
                        cuisine: "Traditional Home Kitchen",
                        area: "Hyderabad",
                        bio: "Newly registered home kitchen. Fresh ingredients only.",
                        verified: false,
                        hygieneScore: "Pending Onboarding",
                        deliveryTime: "30-45 mins",
                        joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                    });
                    localStorage.setItem("ruchirush_chefs", JSON.stringify(chefs));
                    DB.broadcastUpdate("ruchirush_chefs");
                }

                const newUser = {
                    name,
                    email,
                    password,
                    role,
                    chefId: newChefId,
                    verified: false,
                    verificationStatus: role === "chef" ? "Unverified" : "Passed"
                };

                const users = DB.getUsers();
                users.push(newUser);
                localStorage.setItem("ruchirush_users", JSON.stringify(users));

                state.currentUser = newUser;
                if (role === "chef") {
                    state.activeChefId = newChefId;
                }
                localStorage.setItem("ruchirush_active_user", JSON.stringify(newUser));
                DB.broadcastUpdate("ruchirush_active_user");

                Toast.show(`Account registered! Welcome, ${name}.`, "success");
                this.closeModal();
                this.updateUI();

                if (role === "customer") {
                    Router.navigate("customer-portal");
                } else if (role === "chef") {
                    Router.navigate("chef-portal");
                }
            }

            // Restore modal UI
            if (formEl) formEl.classList.remove("hidden");
            if (loaderEl) loaderEl.classList.add("hidden");

        }, 1500);
    },

    logout() {
        if (!state.currentUser) return;
        const name = state.currentUser.name;
        state.currentUser = null;
        state.cart = [];
        localStorage.removeItem("ruchirush_active_user");
        DB.broadcastUpdate("ruchirush_active_user");

        Toast.show(`Logged out successfully. See you again, ${name}!`, "info");
        this.updateUI();
        Router.navigate("landing");
    },

    updateUI() {
        const user = state.currentUser;
        
        // Elements from landing header
        const authBtn = document.getElementById("btn-landing-auth");
        const profileDiv = document.getElementById("landing-user-profile");
        const userNameSpan = document.getElementById("landing-user-name");

        // Elements from mobile menu
        const mobileAuthBtn = document.getElementById("btn-mobile-auth");
        const mobileProfileDiv = document.getElementById("mobile-user-profile");
        const mobileUserNameSpan = document.getElementById("mobile-user-name");

        // Elements from customer header
        const customerProfileDiv = document.getElementById("customer-user-profile");
        const customerUserNameSpan = document.getElementById("customer-user-name");

        if (user) {
            if (authBtn) authBtn.classList.add("hidden");
            if (profileDiv) profileDiv.classList.remove("hidden");
            if (userNameSpan) userNameSpan.textContent = user.name;

            if (mobileAuthBtn) mobileAuthBtn.classList.add("hidden");
            if (mobileProfileDiv) mobileProfileDiv.classList.remove("hidden");
            if (mobileUserNameSpan) mobileUserNameSpan.textContent = user.name;

            if (customerProfileDiv) customerProfileDiv.classList.remove("hidden");
            if (customerUserNameSpan) customerUserNameSpan.textContent = user.name;
        } else {
            if (authBtn) authBtn.classList.remove("hidden");
            if (profileDiv) profileDiv.classList.add("hidden");

            if (mobileAuthBtn) mobileAuthBtn.classList.remove("hidden");
            if (mobileProfileDiv) mobileProfileDiv.classList.add("hidden");

            if (customerProfileDiv) customerProfileDiv.classList.add("hidden");
        }
    }
};

const PWA = {
    deferredPrompt: null,

    init() {
        // Register Service Worker for PWA installation and offline caching
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("./sw.js")
                    .then((reg) => console.log("Service Worker registered scope:", reg.scope))
                    .catch((err) => console.log("Service Worker registration failed:", err));
            });
        }

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButtons();
        });

        window.addEventListener("appinstalled", (e) => {
            console.log("Ruchi Rush installed.");
            this.hideInstallButtons();
            Toast.show("Thank you for installing Ruchi Rush!", "success");
        });

        document.getElementById("btn-install-pwa")?.addEventListener("click", () => {
            this.triggerPrompt();
        });

        document.getElementById("btn-mobile-install-pwa")?.addEventListener("click", () => {
            closeMenu();
            this.triggerPrompt();
        });
    },

    showInstallButtons() {
        const desktopBtn = document.getElementById("btn-install-pwa");
        const mobileBtn = document.getElementById("btn-mobile-install-pwa");
        desktopBtn?.classList.remove("hidden");
        mobileBtn?.classList.remove("hidden");
    },

    hideInstallButtons() {
        const desktopBtn = document.getElementById("btn-install-pwa");
        const mobileBtn = document.getElementById("btn-mobile-install-pwa");
        desktopBtn?.classList.add("hidden");
        mobileBtn?.classList.add("hidden");
    },

    triggerPrompt() {
        if (!this.deferredPrompt) {
            Toast.show("PWA installation is not supported or already installed.", "info");
            return;
        }
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            }
            this.deferredPrompt = null;
            this.hideInstallButtons();
        });
    }
};

// ============================================================
// 4. CUSTOMER PORTAL CONTROLLER
// ============================================================
const CustomerPortal = {
    init() {
        this.renderChefCards();
        this.setupFilters();
        this.setupCartUI();
        
        // Return to Browse Button
        document.getElementById("btn-back-to-chefs").addEventListener("click", () => {
            document.getElementById("chef-menu-container").classList.add("hidden");
            document.getElementById("chefs-browser-container").classList.remove("hidden");
            state.selectedChefForMenu = null;
        });

        // Quick Checkout Inputs
        document.getElementById("location-select").value = state.userLocation;
        document.getElementById("location-select").addEventListener("change", (e) => {
            state.userLocation = e.target.value;
            Toast.show(`Switched delivery location to ${state.userLocation}`, "info");
            this.renderChefCards();
        });

        // My Orders Button
        const ordersBtn = document.getElementById("btn-customer-orders");
        if (ordersBtn) {
            ordersBtn.addEventListener("click", () => {
                document.getElementById("chefs-browser-container").classList.add("hidden");
                document.getElementById("chef-menu-container").classList.add("hidden");
                document.getElementById("order-tracker-container").classList.add("hidden");
                document.getElementById("customer-orders-container").classList.remove("hidden");
                this.renderOrdersHistory();
            });
        }

        // Back from Orders Button
        const backOrdersBtn = document.getElementById("btn-back-to-chefs-from-orders");
        if (backOrdersBtn) {
            backOrdersBtn.addEventListener("click", () => {
                document.getElementById("customer-orders-container").classList.add("hidden");
                document.getElementById("chefs-browser-container").classList.remove("hidden");
            });
        }
    },

    setupFilters() {
        const queryInput = document.getElementById("search-input");
        queryInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            this.renderChefCards();
        });

        const filterPills = document.querySelectorAll(".cuisine-pill");
        filterPills.forEach(pill => {
            pill.addEventListener("click", () => {
                filterPills.forEach(p => p.classList.remove("bg-primary", "text-on-primary"));
                filterPills.forEach(p => p.classList.add("bg-surface-container-high", "text-on-surface-variant"));
                
                pill.classList.remove("bg-surface-container-high", "text-on-surface-variant");
                pill.classList.add("bg-primary", "text-on-primary");
                
                state.selectedCuisine = pill.dataset.cuisine;
                this.renderChefCards();
            });
        });
    },

    renderChefCards() {
        const listContainer = document.getElementById("chefs-grid-container");
        listContainer.innerHTML = "";

        const chefs = DB.getChefs();
        const menu = DB.getMenu();

        const filteredChefs = chefs.filter(chef => {
            // Match location distance loosely
            const locationMatch = true; // All listed are Hyderabad chefs

            // Match cuisine category selection
            const hasCuisineMatch = state.selectedCuisine === "all" || chef.cuisine.toLowerCase().includes(state.selectedCuisine) ||
                menu.some(dish => dish.chefId === chef.id && dish.category === state.selectedCuisine);

            // Match search keywords (chef name or specialty)
            const matchesSearch = chef.name.toLowerCase().includes(state.searchQuery) ||
                chef.cuisine.toLowerCase().includes(state.searchQuery) ||
                menu.some(dish => dish.chefId === chef.id && dish.name.toLowerCase().includes(state.searchQuery));

            return locationMatch && hasCuisineMatch && matchesSearch;
        });

        if (filteredChefs.length === 0) {
            listContainer.innerHTML = `
                <div class="col-span-full py-12 text-center">
                    <p class="text-xl text-on-surface-variant">No home chefs found matching details.</p>
                    <button class="mt-4 bg-primary text-white px-6 py-2 rounded-full" onclick="CustomerPortal.clearFilters()">Clear Search</button>
                </div>
            `;
            return;
        }

        filteredChefs.forEach(chef => {
            const specialties = DB.getMenuByChef(chef.id).slice(0, 2).map(dish => dish.name).join(", ");
            const card = document.createElement("div");
            card.className = "glass-card rounded-lg p-5 flex flex-col justify-between h-full cursor-pointer hover:shadow-lg transition-all";
            card.innerHTML = `
                <div>
                    <div class="flex gap-4 items-center mb-4">
                        <img src="${chef.avatar}" class="w-16 h-16 rounded-full object-cover border-2 border-primary/20" alt="${chef.name}" />
                        <div>
                            <div class="flex items-center gap-1.5">
                                <h3 class="font-h3 text-lg font-bold">${chef.name}</h3>
                                ${chef.verified ? '<span class="material-symbols-outlined text-green-600 text-lg" title="Verified Home Kitchen">verified</span>' : ''}
                            </div>
                            <p class="text-xs text-on-surface-variant">${chef.area} • ${chef.deliveryTime}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 mb-2">
                        <span class="material-symbols-outlined text-yellow-500 fill-current text-sm">star</span>
                        <span class="text-xs font-bold">${chef.rating} (${chef.reviewsCount} ratings)</span>
                    </div>
                    <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">${chef.cuisine}</p>
                    ${specialties ? `<p class="text-xs text-on-surface-variant italic line-clamp-1 mb-4">Featured: ${specialties}</p>` : ''}
                </div>
                <button class="w-full bg-primary-container text-primary font-bold py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-colors" onclick="CustomerPortal.selectChef('${chef.id}')">
                    View Menu & Order
                </button>
            `;
            listContainer.appendChild(card);
        });
    },

    clearFilters() {
        document.getElementById("search-input").value = "";
        state.searchQuery = "";
        state.selectedCuisine = "all";
        const pills = document.querySelectorAll(".cuisine-pill");
        pills.forEach(p => {
            p.classList.remove("bg-primary", "text-on-primary");
            p.classList.add("bg-surface-container-high", "text-on-surface-variant");
        });
        pills[0].classList.add("bg-primary", "text-on-primary");
        this.renderChefCards();
    },

    selectChef(chefId) {
        state.selectedChefForMenu = chefId;
        document.getElementById("chefs-browser-container").classList.add("hidden");
        document.getElementById("chef-menu-container").classList.remove("hidden");
        this.renderChefMenu(chefId);
    },

    renderChefMenu(chefId) {
        const chef = DB.getChefById(chefId);
        if (!chef) return;

        // Render Chef Header Details
        document.getElementById("menu-chef-name").textContent = chef.name;
        document.getElementById("menu-chef-area").textContent = `${chef.area} • Home Chef`;
        document.getElementById("menu-chef-avatar").src = chef.avatar;
        document.getElementById("menu-chef-bio").textContent = chef.bio;
        document.getElementById("menu-chef-rating").innerHTML = `⭐ ${chef.rating} (${chef.reviewsCount} reviews)`;
        document.getElementById("menu-chef-hygiene").textContent = chef.hygieneScore;

        // Render Menu Items
        const menuContainer = document.getElementById("chef-dishes-grid");
        menuContainer.innerHTML = "";

        const menuItems = DB.getMenuByChef(chefId);

        if (menuItems.length === 0) {
            menuContainer.innerHTML = `
                <div class="col-span-full py-8 text-center text-on-surface-variant">
                    No dishes available on menu yet. Check back soon!
                </div>
            `;
            return;
        }

        menuItems.forEach(dish => {
            const card = document.createElement("div");
            card.className = `glass-card rounded-lg overflow-hidden flex flex-col justify-between border ${dish.available ? 'border-outline-variant/30' : 'opacity-60 border-red-200'}`;
            
            const cartQty = this.getCartItemQty(dish.id);
            const actionButton = dish.available 
                ? (cartQty > 0 
                    ? `<div class="flex items-center justify-between bg-primary text-white rounded-full overflow-hidden w-28 h-9 shadow-sm">
                            <button class="px-3 h-full hover:bg-black/10 text-lg font-bold" onclick="CustomerPortal.updateCartQty('${dish.id}', -1)">-</button>
                            <span class="font-bold">${cartQty}</span>
                            <button class="px-3 h-full hover:bg-black/10 text-lg font-bold" onclick="CustomerPortal.updateCartQty('${dish.id}', 1)">+</button>
                       </div>`
                    : `<button class="bg-primary text-on-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all" onclick="CustomerPortal.addToCart('${dish.id}', '${dish.name}', ${dish.price}, '${chefId}')">Add to Cart</button>`)
                : `<span class="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase">Out of Stock</span>`;

            card.innerHTML = `
                <img src="${dish.image}" class="w-full h-44 object-cover" alt="${dish.name}" />
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start gap-2 mb-1">
                            <h4 class="font-h3 text-base font-bold line-clamp-1">${dish.name}</h4>
                            <span class="font-semibold text-primary text-base shrink-0">₹${dish.price}</span>
                        </div>
                        <div class="flex gap-2 items-center mb-2">
                            <span class="text-xs font-medium text-stone-500 uppercase">${dish.category}</span>
                            <span class="text-xs shrink-0">${dish.spicyLevel}</span>
                        </div>
                        <p class="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2">${dish.description}</p>
                    </div>
                    <div class="flex justify-end pt-2">
                        ${actionButton}
                    </div>
                </div>
            `;
            menuContainer.appendChild(card);
        });
    },

    addToCart(dishId, name, price, chefId) {
        // Enforce ordering from one chef at a time
        if (state.cart.length > 0 && state.cart[0].chefId !== chefId) {
            const prevChef = DB.getChefById(state.cart[0].chefId);
            const acceptClear = confirm(`You already have items from ${prevChef.name} in your cart. Clear cart to order from current chef instead?`);
            if (acceptClear) {
                state.cart = [];
            } else {
                return;
            }
        }

        state.cart.push({ dishId, name, price, qty: 1, chefId });
        this.renderChefMenu(chefId);
        this.updateCartDrawer();
        Toast.show(`Added "${name}" to cart!`);
    },

    updateCartQty(dishId, delta) {
        const itemIndex = state.cart.findIndex(i => i.dishId === dishId);
        if (itemIndex === -1) return;

        state.cart[itemIndex].qty += delta;

        if (state.cart[itemIndex].qty <= 0) {
            state.cart.splice(itemIndex, 1);
        }

        this.renderChefMenu(state.selectedChefForMenu);
        this.updateCartDrawer();
    },

    getCartItemQty(dishId) {
        const item = state.cart.find(i => i.dishId === dishId);
        return item ? item.qty : 0;
    },

    setupCartUI() {
        const drawer = document.getElementById("cart-drawer");
        const backdrop = document.getElementById("cart-backdrop");
        const openBtn = document.getElementById("btn-open-cart");
        const closeBtn = document.getElementById("btn-close-cart");

        openBtn.addEventListener("click", () => {
            drawer.classList.remove("translate-x-full");
            backdrop.classList.remove("hidden");
            this.updateCartDrawer();
        });

        const closeCartFn = () => {
            drawer.classList.add("translate-x-full");
            backdrop.classList.add("hidden");
        };

        closeBtn.addEventListener("click", closeCartFn);
        backdrop.addEventListener("click", closeCartFn);

        // Address Autocomplete mock
        const addrInput = document.getElementById("delivery-address-input");
        addrInput.value = `Flat ${Math.floor(100+Math.random()*800)}, Sector 4, Hitec City, Hyderabad`;

        // Checkout Button Click
        document.getElementById("btn-proceed-checkout").addEventListener("click", () => {
            if (state.cart.length === 0) {
                Toast.show("Your cart is empty!", "error");
                return;
            }
            closeCartFn();
            this.openCheckoutModal();
        });
    },

    updateCartDrawer() {
        const container = document.getElementById("cart-items-container");
        const countBadge = document.getElementById("cart-count-badge");
        container.innerHTML = "";

        // Update Nav Badge
        const totalItemsCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
        countBadge.textContent = totalItemsCount;
        countBadge.classList.toggle("hidden", totalItemsCount === 0);

        if (state.cart.length === 0) {
            container.innerHTML = `
                <div class="py-12 text-center text-on-surface-variant flex flex-col items-center gap-3">
                    <span class="material-symbols-outlined text-5xl opacity-45">shopping_cart</span>
                    <p class="font-semibold text-stone-500">Your cart is empty</p>
                    <p class="text-xs max-w-[200px] leading-relaxed">Add tasty home cooked dishes from your favorite local chef to start.</p>
                </div>
            `;
            document.getElementById("cart-price-summary").classList.add("hidden");
            document.getElementById("btn-proceed-checkout").disabled = true;
            return;
        }

        document.getElementById("cart-price-summary").classList.remove("hidden");
        document.getElementById("btn-proceed-checkout").disabled = false;

        // Render List items
        let subtotal = 0;
        state.cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            const div = document.createElement("div");
            div.className = "flex justify-between items-center py-3 border-b border-outline-variant/10";
            div.innerHTML = `
                <div class="flex-1 min-w-0 pr-4">
                    <h5 class="font-bold text-sm text-on-surface truncate">${item.name}</h5>
                    <p class="text-xs text-on-surface-variant">₹${item.price} x ${item.qty}</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center bg-stone-100 rounded-full overflow-hidden h-7 border border-stone-200">
                        <button class="px-2.5 h-full hover:bg-stone-200 font-bold" onclick="CustomerPortal.updateCartQty('${item.dishId}', -1)">-</button>
                        <span class="text-xs font-semibold px-1">${item.qty}</span>
                        <button class="px-2.5 h-full hover:bg-stone-200 font-bold" onclick="CustomerPortal.updateCartQty('${item.dishId}', 1)">+</button>
                    </div>
                    <span class="text-sm font-bold text-on-surface min-w-[50px] text-right">₹${itemTotal}</span>
                </div>
            `;
            container.appendChild(div);
        });

        // Price details
        const platformFee = 10;
        const deliveryFee = 30;
        const total = subtotal + platformFee + deliveryFee;

        document.getElementById("summary-subtotal").textContent = `₹${subtotal}`;
        document.getElementById("summary-total").textContent = `₹${total}`;
    },

    openCheckoutModal() {
        const modal = document.getElementById("checkout-modal");
        modal.classList.remove("hidden");

        const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const platformFee = 10;
        const deliveryFee = 30;
        const total = subtotal + platformFee + deliveryFee;

        document.getElementById("checkout-amount").textContent = `₹${total}`;

        // UPI verification flow
        const payBtn = document.getElementById("btn-complete-payment");
        const address = document.getElementById("delivery-address-input").value;
        const timeSlot = document.getElementById("delivery-time-select").value;

        // Reset state
        payBtn.disabled = false;
        payBtn.innerHTML = `Pay ₹${total} via UPI`;
        document.getElementById("upi-input-container").classList.remove("hidden");
        document.getElementById("payment-loading").classList.add("hidden");

        // Clear previous event listener
        const newPayBtn = payBtn.cloneNode(true);
        payBtn.parentNode.replaceChild(newPayBtn, payBtn);

        newPayBtn.addEventListener("click", () => {
            const upiId = document.getElementById("upi-address-input").value;
            if (!upiId.includes("@")) {
                Toast.show("Please enter a valid UPI ID (e.g. name@okhdfc)", "error");
                return;
            }

            document.getElementById("upi-input-container").classList.add("hidden");
            document.getElementById("payment-loading").classList.remove("hidden");
            newPayBtn.disabled = true;

            // Step 1: Simulate Payment Server check (2 seconds)
            setTimeout(() => {
                // Success - Create database record
                const newOrder = DB.createOrder({
                    customerName: state.currentUser ? state.currentUser.name : "Rahul Sai",
                    chefId: state.cart[0].chefId,
                    items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
                    total: total,
                    address: address,
                    timeSlot: timeSlot,
                    status: "Placed"
                });

                modal.classList.add("hidden");
                state.cart = [];
                this.updateCartDrawer();
                if (state.selectedChefForMenu) {
                    this.renderChefMenu(state.selectedChefForMenu);
                }

                Toast.show("Order placed successfully! Redirecting to tracker...", "success");
                this.launchOrderTracker(newOrder.id);

            }, 2500);
        });

        document.getElementById("btn-close-checkout").addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    },

    launchOrderTracker(orderId) {
        state.activeTrackingOrderId = orderId;
        document.getElementById("chefs-browser-container").classList.add("hidden");
        document.getElementById("chef-menu-container").classList.add("hidden");
        document.getElementById("order-tracker-container").classList.remove("hidden");

        this.updateTrackingProgress(orderId);

        // Simulated Auto-progression for testing alone (if not manually updated by a chef)
        let simInterval = setInterval(() => {
            const order = DB.getOrderById(orderId);
            if (!order) {
                clearInterval(simInterval);
                return;
            }

            if (state.activeTrackingOrderId !== orderId) {
                clearInterval(simInterval);
                return;
            }

            if (order.status === "Placed") {
                DB.updateOrderStatus(orderId, "Preparing");
            } else if (order.status === "Preparing") {
                DB.updateOrderStatus(orderId, "On Its Way");
            } else if (order.status === "On Its Way") {
                DB.updateOrderStatus(orderId, "Delivered");
                clearInterval(simInterval);
            } else {
                clearInterval(simInterval);
            }
        }, 12000); // Progress automatically every 12 seconds if chef remains idle
    },

    updateTrackingProgress(orderId) {
        const order = DB.getOrders().find(o => o.id === orderId);
        if (!order) return;

        const chef = DB.getChefById(order.chefId);

        document.getElementById("tracker-order-id").textContent = `Order #${order.id.replace("order_", "")}`;
        document.getElementById("tracker-chef-name").textContent = chef.name;
        document.getElementById("tracker-delivery-slot").textContent = order.timeSlot;
        document.getElementById("tracker-delivery-address").textContent = order.address;

        const orderItemsList = document.getElementById("tracker-items-list");
        orderItemsList.innerHTML = order.items.map(i => `<li class="text-xs text-on-surface-variant flex justify-between"><span>${i.name} (x${i.qty})</span><span>₹${i.price * i.qty}</span></li>`).join("");
        document.getElementById("tracker-total-amount").textContent = `₹${order.total}`;

        // Render Rider details if assigned
        const riderBox = document.getElementById("tracker-rider-box");
        if (order.assignedRider) {
            if (riderBox) {
                riderBox.classList.remove("hidden");
                document.getElementById("tracker-rider-name").textContent = order.assignedRider.name;
                document.getElementById("tracker-rider-vehicle").textContent = order.assignedRider.vehicle;
                const phoneLink = document.getElementById("tracker-rider-phone");
                if (phoneLink) {
                    phoneLink.setAttribute("href", `tel:${order.assignedRider.phone}`);
                }
            }
        } else {
            if (riderBox) {
                riderBox.classList.add("hidden");
            }
        }

        // Reset indicator node styles
        const stages = ["Placed", "Preparing", "On Its Way", "Delivered"];
        const currentStageIndex = stages.indexOf(order.status);

        // Update progress bar width
        const progressBar = document.getElementById("tracker-line-progress");
        const progressPercentage = (currentStageIndex / (stages.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Update Node Visuals
        stages.forEach((stage, i) => {
            const node = document.getElementById(`track-node-${stage.replace(/\s+/g, '')}`);
            const dot = node.querySelector(".track-dot");
            const label = node.querySelector(".track-label");

            // Reset
            dot.className = "track-dot w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center font-bold text-sm z-10 transition-all";
            label.className = "track-label text-xs mt-2 font-medium transition-colors text-stone-400";
            dot.innerHTML = i + 1;

            if (i < currentStageIndex) {
                // Completed stages
                dot.className = "track-dot w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm z-10 shadow-sm";
                dot.innerHTML = "✓";
                label.className = "track-label text-xs mt-2 font-bold text-green-600";
            } else if (i === currentStageIndex) {
                // Active stage
                dot.className = "track-dot w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm z-10 shadow-md tracker-pulse";
                label.className = "track-label text-xs mt-2 font-bold text-primary";
            }
        });

        // Toggle simmering cookstove view depending on state
        const stoveBox = document.getElementById("cooking-simmer-graphic");
        if (order.status === "Preparing") {
            stoveBox.classList.remove("hidden");
        } else {
            stoveBox.classList.add("hidden");
        }

        // Action when delivered
        const backBtn = document.getElementById("btn-tracker-finish");
        if (order.status === "Delivered") {
            backBtn.classList.remove("hidden");
            backBtn.onclick = () => {
                state.activeTrackingOrderId = null;
                document.getElementById("order-tracker-container").classList.add("hidden");
                document.getElementById("chefs-browser-container").classList.remove("hidden");
            };
        } else {
            backBtn.classList.add("hidden");
        }
    },

    renderOrdersHistory() {
        const listContainer = document.getElementById("customer-orders-list");
        if (!listContainer) return;
        listContainer.innerHTML = "";

        if (!state.currentUser) return;

        const orders = DB.getOrders();
        // Filter orders belonging to the current logged in customer
        const myOrders = orders.filter(o => o.customerName === state.currentUser.name);

        if (myOrders.length === 0) {
            listContainer.innerHTML = `
                <div class="py-12 text-center text-on-surface-variant flex flex-col items-center gap-3">
                    <span class="material-symbols-outlined text-5xl opacity-45">receipt_long</span>
                    <p class="font-semibold text-stone-500">No orders placed yet</p>
                    <p class="text-xs max-w-[200px] leading-relaxed">Your order history will appear here once you place your first order.</p>
                </div>
            `;
            return;
        }

        // Sort by date descending
        myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        myOrders.forEach(order => {
            const chef = DB.getChefById(order.chefId);
            const chefName = chef ? chef.name : "Local Kitchen";
            const itemsString = order.items.map(i => `${i.name} (x${i.qty})`).join(", ");
            const dateStr = new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            const isCompleted = order.status === "Delivered" || order.status === "Cancelled";
            const trackBtn = !isCompleted 
                ? `<button class="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all" onclick="CustomerPortal.launchOrderTracker('${order.id}')">Track Active Order</button>` 
                : "";

            const reorderBtn = `<button class="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all" onclick="CustomerPortal.reorder('${order.id}')">Reorder</button>`;

            const div = document.createElement("div");
            div.className = "glass-card border border-stone-200 rounded-lg p-5 flex flex-col justify-between gap-4 hover:shadow-md transition-shadow";
            div.innerHTML = `
                <div class="flex justify-between items-start gap-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="font-bold text-sm text-primary">#${order.id.replace("order_", "")}</span>
                            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                order.status === 'Placed' ? 'bg-orange-100 text-orange-700' : 
                                order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 
                                order.status === 'On Its Way' ? 'bg-yellow-100 text-yellow-700' : 
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                'bg-stone-100 text-stone-700'
                            }">${order.status}</span>
                        </div>
                        <p class="text-xs text-stone-400 font-bold mb-1">${dateStr}</p>
                        <p class="text-xs text-on-surface-variant font-bold">Kitchen: <span class="text-on-surface">${chefName}</span></p>
                        <p class="text-xs text-on-surface-variant mt-1">Items: <span class="font-semibold text-on-surface">${itemsString}</span></p>
                    </div>
                    <div class="text-right">
                        <span class="font-bold text-base text-on-surface block">₹${order.total}</span>
                        <span class="text-[10px] text-stone-400 block">${order.timeSlot}</span>
                    </div>
                </div>
                <div class="flex justify-end gap-2 border-t border-stone-100 pt-3">
                    ${trackBtn}
                    ${reorderBtn}
                </div>
            `;
            listContainer.appendChild(div);
        });
    },

    reorder(orderId) {
        const order = DB.getOrders().find(o => o.id === orderId);
        if (!order) return;

        const chef = DB.getChefById(order.chefId);
        if (!chef) {
            Toast.show("This kitchen is no longer active.", "error");
            return;
        }

        // Clear current cart
        state.cart = [];
        const menuItems = DB.getMenuByChef(order.chefId);

        let addedSome = false;
        order.items.forEach(orderItem => {
            const menuItem = menuItems.find(d => d.name.toLowerCase() === orderItem.name.toLowerCase() && d.available);
            if (menuItem) {
                state.cart.push({
                    dishId: menuItem.id,
                    name: menuItem.name,
                    price: menuItem.price,
                    qty: orderItem.qty,
                    chefId: order.chefId
                });
                addedSome = true;
            }
        });

        if (addedSome) {
            state.selectedChefForMenu = order.chefId;
            document.getElementById("chefs-browser-container").classList.add("hidden");
            document.getElementById("customer-orders-container").classList.add("hidden");
            document.getElementById("chef-menu-container").classList.remove("hidden");
            
            this.renderChefMenu(order.chefId);
            this.updateCartDrawer();
            
            const drawer = document.getElementById("cart-drawer");
            const backdrop = document.getElementById("cart-backdrop");
            drawer.classList.remove("translate-x-full");
            backdrop.classList.remove("hidden");

            Toast.show("Items added to your basket!", "success");
        } else {
            Toast.show("All items in this order are currently unavailable.", "error");
        }
    }
};

// ============================================================
// 5. CHEF PORTAL CONTROLLER
// ============================================================
const ChefPortal = {
    simulating: false,

    init() {
        this.checkLoginState();
        
        // Tab routing inside Chef Portal
        const tabs = document.querySelectorAll(".chef-tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                if (state.currentUser && state.currentUser.verificationStatus !== "Passed") {
                    Toast.show("Please complete verification onboarding first.", "error");
                    return;
                }

                tabs.forEach(t => t.classList.remove("bg-primary", "text-on-primary", "font-bold"));
                tabs.forEach(t => t.classList.add("text-stone-600", "hover:bg-primary/5"));
                tab.classList.remove("text-stone-600", "hover:bg-primary/5");
                tab.classList.add("bg-primary", "text-on-primary", "font-bold");

                const panel = tab.dataset.panel;
                document.querySelectorAll(".chef-panel").forEach(p => p.classList.add("hidden"));
                document.getElementById(`chef-panel-${panel}`).classList.remove("hidden");

                if (panel === "dashboard") this.renderDashboard();
                if (panel === "orders") this.renderOrdersQueue();
                if (panel === "menu") this.renderMenuManager();
            });
        });

        // Photo upload filename display
        const photoInput = document.getElementById("chef-photo-input");
        const filenameSpan = document.getElementById("kitchen-photo-filename");
        photoInput?.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                filenameSpan.textContent = `Selected: ${e.target.files[0].name}`;
            } else {
                filenameSpan.textContent = "Click or Drag to Upload Kitchen Photo";
            }
        });

        // GST toggle visibility
        const gstRadios = document.querySelectorAll('input[name="chef-gst-turnover"]');
        const gstInputContainer = document.getElementById("gst-input-container");
        const gstNotRequiredMessage = document.getElementById("gst-not-required-message");
        const gstInput = document.getElementById("chef-gst-input");

        gstRadios.forEach(radio => {
            radio.addEventListener("change", (e) => {
                if (e.target.value === "yes") {
                    gstInputContainer?.classList.remove("hidden");
                    gstNotRequiredMessage?.classList.add("hidden");
                    if (gstInput) gstInput.required = true;
                } else {
                    gstInputContainer?.classList.add("hidden");
                    gstNotRequiredMessage?.classList.remove("hidden");
                    if (gstInput) {
                        gstInput.required = false;
                        gstInput.value = "";
                    }
                }
            });
        });

        // Verification Form Submit
        const verificationForm = document.getElementById("chef-verification-form");
        if (verificationForm) {
            verificationForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.submitVerification();
            });
        }
    },

    checkLoginState() {
        const user = state.currentUser;
        if (!user || user.role !== "chef") return;

        const chef = DB.getChefById(user.chefId);
        if (!chef) return;

        // Render Sidebar Info
        document.getElementById("chef-profile-sidebar-name").textContent = chef.name;
        document.getElementById("chef-profile-sidebar-area").textContent = `${chef.area}, HYD`;
        document.getElementById("chef-profile-sidebar-avatar").src = chef.avatar;

        const verifiedBadge = document.getElementById("chef-verified-badge");
        const pendingBadge = document.getElementById("chef-pending-badge");
        const unverifiedBadge = document.getElementById("chef-unverified-badge");

        // Hide all badges initially
        verifiedBadge?.classList.add("hidden");
        pendingBadge?.classList.add("hidden");
        unverifiedBadge?.classList.add("hidden");

        const verificationPanel = document.getElementById("chef-verification-panel");
        const verificationForm = document.getElementById("chef-verification-form");
        const progressBox = document.getElementById("verification-progress-box");
        const tabBtns = document.querySelectorAll(".chef-tab-btn");

        if (user.verificationStatus === "Passed") {
            verifiedBadge?.classList.remove("hidden");
            verificationPanel?.classList.add("hidden");
            
            // Enable tabs
            tabBtns.forEach(btn => btn.classList.remove("opacity-50", "pointer-events-none"));

            // Show active panel (by default, dashboard or whichever tab is active)
            const activeTab = document.querySelector(".chef-tab-btn.bg-primary");
            const panelName = activeTab ? activeTab.dataset.panel : "dashboard";
            document.querySelectorAll(".chef-panel").forEach(p => {
                if (p.id === `chef-panel-${panelName}`) p.classList.remove("hidden");
                else p.classList.add("hidden");
            });

            this.renderDashboard();
            this.renderOrdersQueue();
            this.renderMenuManager();

        } else if (user.verificationStatus === "Pending") {
            pendingBadge?.classList.remove("hidden");
            verificationPanel?.classList.remove("hidden");
            verificationForm?.classList.add("hidden");
            progressBox?.classList.remove("hidden");

            // Disable tabs
            tabBtns.forEach(btn => btn.classList.add("opacity-50", "pointer-events-none"));
            document.querySelectorAll(".chef-panel").forEach(p => p.classList.add("hidden"));

            // Run verification check simulation
            if (!this.simulating) {
                this.startVerificationSimulation();
            }
        } else {
            // Unverified
            unverifiedBadge?.classList.remove("hidden");
            verificationPanel?.classList.remove("hidden");
            verificationForm?.classList.remove("hidden");
            progressBox?.classList.add("hidden");

            // Disable tabs
            tabBtns.forEach(btn => btn.classList.add("opacity-50", "pointer-events-none"));
            document.querySelectorAll(".chef-panel").forEach(p => p.classList.add("hidden"));
        }
    },

    submitVerification() {
        const fssai = document.getElementById("chef-fssai-input").value.trim();
        const pan = document.getElementById("chef-pan-input").value.trim();
        const bankAccount = document.getElementById("chef-bank-account-input").value.trim();
        const bankIfsc = document.getElementById("chef-bank-ifsc-input").value.trim();
        const upi = document.getElementById("chef-upi-input").value.trim();
        const address = document.getElementById("chef-address-input").value.trim();

        // GST Fields
        const turnover = document.querySelector('input[name="chef-gst-turnover"]:checked')?.value || "no";
        const gst = document.getElementById("chef-gst-input")?.value.trim() || "";

        if (!/^\d{14}$/.test(fssai)) {
            Toast.show("FSSAI License must be exactly 14 digits.", "error");
            return;
        }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
            Toast.show("PAN Card must be in the format ABCDE1234F (10 characters).", "error");
            return;
        }
        if (!/^\d{9,18}$/.test(bankAccount)) {
            Toast.show("Bank Account Number must be between 9 and 18 digits.", "error");
            return;
        }
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(bankIfsc)) {
            Toast.show("Bank IFSC Code must be a valid 11-character code (e.g. SBIN0001234).", "error");
            return;
        }
        if (!/^[\w.-]+@[\w.-]+$/.test(upi)) {
            Toast.show("UPI ID must be a valid format (e.g. businessname@okaxis).", "error");
            return;
        }
        if (turnover === "yes") {
            if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst)) {
                Toast.show("GSTIN must be a valid 15-character Indian GST Number (e.g. 36ABCDE1234F1Z5).", "error");
                return;
            }
        }
        if (address.length < 15) {
            Toast.show("Please enter a full, valid address (minimum 15 characters).", "error");
            return;
        }

        // Set state to Pending and save
        state.currentUser.verificationStatus = "Pending";
        DB.updateUser(state.currentUser);
        localStorage.setItem("ruchirush_active_user", JSON.stringify(state.currentUser));
        DB.broadcastUpdate("ruchirush_active_user");

        this.checkLoginState();
    },

    startVerificationSimulation() {
        this.simulating = true;
        const progressBar = document.getElementById("verification-progress-bar");
        const progressStep = document.getElementById("verification-progress-step");

        if (!progressBar || !progressStep) return;

        let progress = 0;
        progressBar.style.width = "0%";
        progressStep.textContent = "Initializing checks...";

        const steps = [
            { threshold: 20, text: "Step 1/5: Querying FSSAI government registry for license validity..." },
            { threshold: 40, text: "Step 2/5: Validating PAN card identity and proprietor records..." },
            { threshold: 60, text: "Step 3/5: Checking bank account routing & IFSC clearing code..." },
            { threshold: 80, text: "Step 4/5: Verifying UPI merchant handle and payment gateway connection..." },
            { threshold: 95, text: "Step 5/5: Checking GST compliance status..." },
            { threshold: 99, text: "Onboarding Complete! Setting up your kitchen dashboard..." }
        ];

        const intervalTime = 45; // ~4.5s total
        const timer = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;

            const activeStep = steps.find(s => progress <= s.threshold);
            if (activeStep) {
                progressStep.textContent = activeStep.text;
            }

            if (progress >= 100) {
                clearInterval(timer);
                this.simulating = false;

                // Set status to Passed
                state.currentUser.verificationStatus = "Passed";
                state.currentUser.verified = true;
                DB.updateUser(state.currentUser);

                // Update associated Chef object
                const chefs = DB.getChefs();
                const chefIndex = chefs.findIndex(c => c.id === state.currentUser.chefId);
                if (chefIndex !== -1) {
                    chefs[chefIndex].verified = true;
                    chefs[chefIndex].hygieneScore = "99% (A+ Grade)";
                    localStorage.setItem("ruchirush_chefs", JSON.stringify(chefs));
                    DB.broadcastUpdate("ruchirush_chefs");
                }

                localStorage.setItem("ruchirush_active_user", JSON.stringify(state.currentUser));
                DB.broadcastUpdate("ruchirush_active_user");

                Toast.show("Kitchen Verification Passed! Welcome aboard.", "success");
                this.checkLoginState();
            }
        }, intervalTime);
    },

    renderDashboard() {
        const chef = DB.getChefById(state.activeChefId);
        const orders = DB.getChefOrders(state.activeChefId);

        // Math calculations
        const totalEarnings = orders
            .filter(o => o.status === "Delivered")
            .reduce((sum, o) => sum + (o.total - 40) * 0.92, 0);

        const pendingCount = orders.filter(o => ["Placed", "Preparing", "On Its Way"].includes(o.status)).length;

        // Update dashboard numbers
        document.getElementById("metric-earnings").textContent = `₹${Math.round(totalEarnings)}`;
        document.getElementById("metric-orders-count").textContent = orders.length;
        document.getElementById("metric-chef-rating").textContent = `${chef.rating} ⭐`;
        document.getElementById("metric-active-orders").textContent = pendingCount;

        this.drawAnalyticsChart(orders);
    },

    drawAnalyticsChart(orders) {
        const chartBox = document.getElementById("analytics-chart-svg");
        chartBox.innerHTML = "";

        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const data = [0, 0, 0, 0, 0, 0, 0];

        orders.forEach(order => {
            const dayIndex = new Date(order.createdAt).getDay();
            const mapIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            data[mapIndex] += 1;
        });

        const maxVal = Math.max(...data, 4);

        const width = 500;
        const height = 180;
        const padding = 30;

        let barsSvg = "";
        const colWidth = (width - padding * 2) / labels.length;

        labels.forEach((label, i) => {
            const barVal = data[i];
            const barHeight = (barVal / maxVal) * (height - padding * 2);
            const x = padding + i * colWidth + (colWidth - 28) / 2;
            const y = height - padding - barHeight;

            barsSvg += `
                <g class="group">
                    <rect x="${x}" y="${y}" width="28" height="${barHeight}" rx="4" fill="#9e4300" opacity="0.85" class="transition-all hover:opacity-100 hover:fill-[#ff7f32]">
                        <title>Orders: ${barVal}</title>
                    </rect>
                    <text x="${x + 14}" y="${height - 10}" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="10" fill="#8b7266">${label}</text>
                    <text x="${x + 14}" y="${y - 6}" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#9e4300" opacity="0">${barVal}</text>
                </g>
            `;
        });

        const gridLines = `
            <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#dfc0b2" stroke-width="1"/>
            <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="#dfc0b2" stroke-dasharray="4" opacity="0.3"/>
            <line x1="${padding}" y1="${padding + (height - padding * 2) / 2}" x2="${width - padding}" y2="${padding + (height - padding * 2) / 2}" stroke="#dfc0b2" stroke-dasharray="4" opacity="0.3"/>
        `;

        chartBox.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" class="w-full h-full">
                ${gridLines}
                ${barsSvg}
            </svg>
        `;
    },

    renderOrdersQueue() {
        const queueContainer = document.getElementById("chef-orders-list");
        queueContainer.innerHTML = "";

        const orders = DB.getChefOrders(state.activeChefId);
        const activeOrders = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled");

        if (activeOrders.length === 0) {
            queueContainer.innerHTML = `
                <div class="py-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                    <span class="material-symbols-outlined text-4xl opacity-35">inbox</span>
                    <p class="font-bold text-stone-500">No active orders</p>
                    <p class="text-xs">When customers order food, they will appear here in real-time.</p>
                </div>
            `;
            return;
        }

        activeOrders.forEach(order => {
            const itemsString = order.items.map(i => `${i.name} (x${i.qty})`).join(", ");
            
            let actionBtn = "";
            if (order.status === "Placed") {
                actionBtn = `<button class="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all" onclick="ChefPortal.changeOrderStatus('${order.id}', 'Preparing')">Accept & Cook</button>`;
            } else if (order.status === "Preparing") {
                actionBtn = `<button class="bg-[#ff7f32] text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all" onclick="ChefPortal.changeOrderStatus('${order.id}', 'On Its Way')">Ship Order</button>`;
            } else if (order.status === "On Its Way") {
                actionBtn = `<button class="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all" onclick="ChefPortal.changeOrderStatus('${order.id}', 'Delivered')">Mark Completed</button>`;
            }

            let riderInfoHtml = "";
            if (order.assignedRider) {
                riderInfoHtml = `<div class="mt-2 text-[11px] text-green-700 font-bold bg-green-50/50 px-2.5 py-1 rounded border border-green-200 w-fit flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[12px]">directions_bike</span>
                    <span>Rider: ${order.assignedRider.name} (${order.assignedRider.vehicle})</span>
                </div>`;
            }

            const div = document.createElement("div");
            div.className = "glass-card border border-primary/10 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow";
            div.innerHTML = `
                <div>
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="font-bold text-sm text-primary">#${order.id.replace("order_", "")}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full font-bold uppercase ${order.status === 'Placed' ? 'bg-orange-100 text-orange-700' : order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}">${order.status}</span>
                        <span class="text-xs text-on-surface-variant font-medium">• ${order.timeSlot}</span>
                    </div>
                    <h5 class="font-bold text-sm text-on-surface mb-0.5">${order.customerName}</h5>
                    <p class="text-xs text-on-surface-variant line-clamp-1 mb-1">Items: <span class="font-semibold text-on-surface">${itemsString}</span></p>
                    <p class="text-[11px] text-stone-500 italic max-w-sm truncate mb-1">Deliver to: ${order.address}</p>
                    ${riderInfoHtml}
                </div>
                <div class="flex items-center gap-3 shrink-0">
                    <span class="font-bold text-base text-on-surface">₹${order.total}</span>
                    ${actionBtn}
                </div>
            `;
            queueContainer.appendChild(div);
        });
    },

    changeOrderStatus(orderId, newStatus) {
        DB.updateOrderStatus(orderId, newStatus);
        Toast.show(`Updated Order #${orderId.replace("order_", "")} status to ${newStatus}`, "info");
        this.renderOrdersQueue();
        this.renderDashboard();
    },

    renderMenuManager() {
        const menuContainer = document.getElementById("chef-menu-grid");
        menuContainer.innerHTML = "";

        const menuItems = DB.getMenuByChef(state.activeChefId);

        menuItems.forEach(dish => {
            const card = document.createElement("div");
            card.className = "glass-card border border-outline-variant/20 rounded-lg overflow-hidden flex flex-col justify-between h-full";
            card.innerHTML = `
                <img src="${dish.image}" class="w-full h-36 object-cover" alt="${dish.name}" />
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start gap-1 mb-1">
                            <h4 class="font-bold text-sm text-on-surface line-clamp-1">${dish.name}</h4>
                            <span class="font-bold text-primary text-sm shrink-0">₹${dish.price}</span>
                        </div>
                        <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">${dish.description}</p>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-outline-variant/15">
                        <div class="flex items-center gap-1.5">
                            <input type="checkbox" id="toggle-${dish.id}" class="hidden switch-checkbox" ${dish.available ? 'checked' : ''} onchange="ChefPortal.toggleAvailability('${dish.id}', this.checked)" />
                            <label for="toggle-${dish.id}" class="switch-label w-9 h-5 bg-stone-300 rounded-full flex items-center p-0.5 cursor-pointer transition-colors relative">
                                <span class="switch-toggle w-4 h-4 bg-white rounded-full transition-transform shadow"></span>
                            </label>
                            <span class="text-[11px] text-on-surface-variant font-medium">${dish.available ? 'In Stock' : 'Sold Out'}</span>
                        </div>
                        <div class="flex gap-2">
                            <button class="text-xs font-semibold text-stone-700 hover:text-primary transition-colors" onclick="ChefPortal.editDish('${dish.id}')">Edit</button>
                            <button class="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors" onclick="ChefPortal.deleteDish('${dish.id}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            menuContainer.appendChild(card);
        });

        // Initialize/reset form submission event
        const form = document.getElementById("chef-add-dish-form");
        form.onsubmit = (e) => {
            e.preventDefault();
            const id = document.getElementById("form-dish-id").value;
            const name = document.getElementById("form-dish-name").value;
            const price = parseInt(document.getElementById("form-dish-price").value);
            const desc = document.getElementById("form-dish-desc").value;
            const category = document.getElementById("form-dish-category").value;
            const spicy = document.getElementById("form-dish-spicy").value;
            const img = document.getElementById("form-dish-image").value || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";

            if (id) {
                // Edit
                DB.updateDish(id, { name, price, description: desc, category, spicyLevel: spicy, image: img });
                Toast.show("Dish updated successfully!");
            } else {
                // Add new
                DB.addDish({ chefId: state.activeChefId, name, price, description: desc, category, spicyLevel: spicy, available: true, image: img });
                Toast.show("New dish added to menu!");
            }

            // Reset form
            form.reset();
            document.getElementById("form-dish-id").value = "";
            document.getElementById("form-submit-btn").textContent = "Add Dish to Menu";
            this.renderMenuManager();
        };

        // Bind Reset button
        document.getElementById("btn-reset-dish-form").onclick = () => {
            form.reset();
            document.getElementById("form-dish-id").value = "";
            document.getElementById("form-submit-btn").textContent = "Add Dish to Menu";
        };
    },

    toggleAvailability(dishId, available) {
        DB.updateDish(dishId, { available });
        Toast.show(available ? "Item is now marked available!" : "Item marked out of stock!");
        this.renderMenuManager();
    },

    editDish(dishId) {
        const dish = DB.getMenu().find(d => d.id === dishId);
        if (!dish) return;

        // Fill form fields
        document.getElementById("form-dish-id").value = dish.id;
        document.getElementById("form-dish-name").value = dish.name;
        document.getElementById("form-dish-price").value = dish.price;
        document.getElementById("form-dish-desc").value = dish.description;
        document.getElementById("form-dish-category").value = dish.category;
        document.getElementById("form-dish-spicy").value = dish.spicyLevel;
        document.getElementById("form-dish-image").value = dish.image;

        document.getElementById("form-submit-btn").textContent = "Update Dish Details";
        window.scrollTo({
            top: document.getElementById("chef-add-dish-form").getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth"
        });
    },

    deleteDish(dishId) {
        if (confirm("Are you sure you want to delete this dish from your menu?")) {
            DB.deleteDish(dishId);
            Toast.show("Dish deleted successfully!", "info");
            this.renderMenuManager();
        }
    }
};

// ============================================================
// 6. GLOBAL INITIALIZATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    Router.init();
    Auth.init();
    PWA.init();
    
    // Bind main action routes
    document.querySelectorAll(".eat-trigger, [onclick=\"openWaitlist('customer')\"]").forEach(el => {
        el.removeAttribute("onclick"); // Override dummy waitlist triggers
        el.addEventListener("click", (e) => {
            e.preventDefault();
            Router.navigate("customer-portal");
        });
    });

    document.querySelectorAll(".cook-trigger, [onclick=\"openWaitlist('chef')\"]").forEach(el => {
        el.removeAttribute("onclick");
        el.addEventListener("click", (e) => {
            e.preventDefault();
            Router.navigate("chef-portal");
        });
    });

    // Custom form close triggers override
    document.querySelectorAll("#waitlistModal, #modalBackdrop, #closeModal").forEach(el => {
        // Safe to leave dummy waitlist modal as fallback
    });
});
