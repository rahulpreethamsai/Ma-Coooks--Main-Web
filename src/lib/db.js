import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Seed default data if needed
  await seedDatabase();

  return cached.conn;
}

// ==========================================
// Mongoose Schemas & Models
// ==========================================

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  role: { type: String, enum: ['customer', 'chef'], default: 'customer' },
  chefId: { type: String },
  verified: { type: Boolean },
  verificationStatus: { type: String }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const ChefSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  cuisine: { type: String },
  area: { type: String },
  bio: { type: String },
  verified: { type: Boolean, default: false },
  hygieneScore: { type: String },
  deliveryTime: { type: String },
  joinedDate: { type: String }
}, { timestamps: true });

const Chef = mongoose.models.Chef || mongoose.model('Chef', ChefSchema);

const DishSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  chefId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  spicyLevel: { type: String },
  available: { type: Boolean, default: true },
  image: { type: String }
}, { timestamps: true });

const Dish = mongoose.models.Dish || mongoose.model('Dish', DishSchema);

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String },
  customerEmail: { type: String },
  chefId: { type: String },
  items: [{
    name: { type: String },
    qty: { type: Number },
    price: { type: Number }
  }],
  total: { type: Number },
  address: { type: String },
  timeSlot: { type: String },
  status: { type: String },
  assignedRider: {
    name: { type: String },
    vehicle: { type: String },
    phone: { type: String }
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

// ==========================================
// Default Seed Data
// ==========================================

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

const defaultMenu = [
  { id: "dish_1", chefId: "chef_1", name: "Spicy Parotta + Egg Curry", price: 120, description: "2 layered fluffy parottas served with a rich, slow-simmered egg gravy spiced with home ground masala.", category: "south", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop" },
  { id: "dish_2", chefId: "chef_1", name: "Andhra Special Veg Thali", price: 150, description: "Authentic meal box containing pappu, sambar, fry, dry curry, pickle, curd, and fresh hot rice.", category: "south", spicyLevel: "🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&h=200&fit=crop" },
  { id: "dish_3", chefId: "chef_1", name: "Tempered Curd Rice", price: 70, description: "Cooling curd rice tempered with mustard seeds, curry leaves, ginger, and green chillies. Served with pickle.", category: "diet", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop" },
  { id: "dish_4", chefId: "chef_2", name: "Paneer Butter Masala + Roti (3pcs)", price: 160, description: "Soft fresh paneer cubes cooked in a buttery tomato gravy, served with 3 fluffy wheat rotis.", category: "north", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop" },
  { id: "dish_5", chefId: "chef_2", name: "Dal Makhani + Basmati Rice", price: 130, description: "Overnight slow-cooked black lentils simmered with cream and butter. Served with fragrant steamed rice.", category: "north", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop" },
  { id: "dish_6", chefId: "chef_2", name: "Aloo Paratha with White Butter", price: 90, description: "2 whole wheat flatbreads stuffed with spicy mashed potato filling. Served with homemade white butter & pickle.", category: "north", spicyLevel: "🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&h=200&fit=crop" },
  { id: "dish_7", chefId: "chef_3", name: "Andhra Pesarattu Upma", price: 80, description: "Healthy whole green gram crepe stuffed with ginger-spiced semolina upma. Served with ginger chutney.", category: "south", spicyLevel: "🌶️", available: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop" },
  { id: "dish_8", chefId: "chef_3", name: "Guntur Karam Podi Idli (4pcs)", price: 70, description: "Super soft steamed idlis tossed in spicy Guntur spice powder and pure ghee. Hot & delicious.", category: "south", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" },
  { id: "dish_9", chefId: "chef_3", name: "Finger Millet (Ragi) Idli (4pcs)", price: 75, description: "Nutritious and light idlis prepared with fermented ragi and black gram batter. High in calcium and fiber.", category: "diet", spicyLevel: "❌", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" },
  { id: "dish_10", chefId: "chef_4", name: "Hyderabadi Chicken Dum Biryani", price: 220, description: "Fragrant basmati rice layered with spice-marinated chicken, cooked in slow handi dum style. Served with raita.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop" },
  { id: "dish_11", chefId: "chef_4", name: "Spicy Old City Chicken Fry", price: 180, description: "Juicy bone-in chicken pieces stir-fried with dry coconut flakes, curry leaves, and local hot spices.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop" },
  { id: "dish_12", chefId: "chef_4", name: "Mirchi Bajji (4pcs)", price: 50, description: "Deep-fried batter-coated large green chillies stuffed with tangy onion-peanut mixture.", category: "hyderabadi", spicyLevel: "🌶️🌶️🌶️", available: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop" }
];

const initialOrders = [
  {
    id: "order_1001",
    customerName: "Rahul Sai",
    chefId: "chef_1",
    items: [{ name: "Spicy Parotta + Egg Curry", qty: 2, price: 120 }],
    total: 280,
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

const defaultUsers = [
  { name: "Rahul Sai", email: "rahul@ruchirush.com", password: "password123", role: "customer" },
  { name: "Priya K.", email: "priya@ruchirush.com", password: "password123", role: "chef", chefId: "chef_1", verified: true, verificationStatus: "Passed" },
  { name: "Meena R.", email: "meena@ruchirush.com", password: "password123", role: "chef", chefId: "chef_2", verified: true, verificationStatus: "Passed" },
  { name: "Lakshmi D.", email: "lakshmi@ruchirush.com", password: "password123", role: "chef", chefId: "chef_3", verified: true, verificationStatus: "Passed" },
  { name: "Srinivas Reddy", email: "srinivas@ruchirush.com", password: "password123", role: "chef", chefId: "chef_4", verified: true, verificationStatus: "Passed" },
  { name: "sunali", email: "testingsunali@gmail.com", role: "customer" }
];

async function seedDatabase() {
  try {
    const chefCount = await Chef.countDocuments();
    if (chefCount === 0) {
      console.log("Seeding default chefs...");
      await Chef.insertMany(defaultChefs);
    }

    const dishCount = await Dish.countDocuments();
    if (dishCount === 0) {
      console.log("Seeding default dishes...");
      await Dish.insertMany(defaultMenu);
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log("Seeding default orders...");
      await Order.insertMany(initialOrders);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("Seeding default users...");
      await User.insertMany(defaultUsers);
    }
  } catch (error) {
    console.error("Database seeding error:", error);
  }
}

// ==========================================
// Database Helpers Interface (Async)
// ==========================================

export const dbHelper = {
  async getChefs() {
    await dbConnect();
    return await Chef.find().lean();
  },
  async saveChef(chef) {
    await dbConnect();
    return await Chef.findOneAndUpdate({ id: chef.id }, chef, { upsert: true, new: true }).lean();
  },
  async getMenu() {
    await dbConnect();
    return await Dish.find().lean();
  },
  async saveDish(dish) {
    await dbConnect();
    return await Dish.findOneAndUpdate({ id: dish.id }, dish, { upsert: true, new: true }).lean();
  },
  async deleteDish(dishId) {
    await dbConnect();
    await Dish.deleteOne({ id: dishId });
  },
  async getOrders() {
    await dbConnect();
    return await Order.find().lean();
  },
  async saveOrder(order) {
    await dbConnect();
    return await Order.findOneAndUpdate({ id: order.id }, order, { upsert: true, new: true }).lean();
  },
  async getUsers() {
    await dbConnect();
    return await User.find().lean();
  },
  async saveUser(user) {
    await dbConnect();
    const cleanEmail = user.email.toLowerCase().trim();
    return await User.findOneAndUpdate({ email: cleanEmail }, user, { upsert: true, new: true }).lean();
  }
};
