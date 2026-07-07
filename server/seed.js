const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res audio support. Features adaptive sound control and speak-to-chat technology.',
    price: 24999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    stock: 45,
    rating: 4.7,
    numReviews: 128,
  },
  {
    name: 'Ultra-Slim 4K Laptop',
    description:
      '15.6-inch 4K OLED display laptop with Intel i9 processor, 32GB RAM, 1TB SSD. Perfect for creative professionals and power users.',
    price: 149999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format',
    stock: 20,
    rating: 4.8,
    numReviews: 89,
  },
  {
    name: 'Smart Fitness Watch Pro',
    description:
      'Advanced fitness tracker with GPS, heart rate monitoring, sleep tracking, and 50+ workout modes. Water-resistant to 50 meters with 14-day battery life.',
    price: 29999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    stock: 60,
    rating: 4.5,
    numReviews: 256,
  },
  {
    name: 'Premium Leather Jacket',
    description:
      'Handcrafted genuine leather jacket with a modern slim-fit design. Features YKK zippers, quilted lining, and adjustable waist tabs.',
    price: 12999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format',
    stock: 30,
    rating: 4.6,
    numReviews: 74,
  },
  {
    name: 'Designer Running Sneakers',
    description:
      'Lightweight performance sneakers with responsive foam cushioning, breathable mesh upper, and durable rubber outsole. Available in multiple colorways.',
    price: 4999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
    stock: 80,
    rating: 4.4,
    numReviews: 312,
  },
  {
    name: 'Classic Aviator Sunglasses',
    description:
      'Polarized aviator sunglasses with UV400 protection, titanium frame, and anti-reflective coating. Includes premium carrying case.',
    price: 3499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format',
    stock: 100,
    rating: 4.3,
    numReviews: 198,
  },
  {
    name: 'Minimalist Desk Lamp',
    description:
      'Modern LED desk lamp with touch-sensitive controls, 5 brightness levels, 3 color temperatures, and wireless phone charging base.',
    price: 2999,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format',
    stock: 55,
    rating: 4.6,
    numReviews: 143,
  },
  {
    name: 'Artisan Ceramic Vase Set',
    description:
      'Set of 3 handcrafted ceramic vases in complementary earth tones. Each piece is unique with a matte finish and organic shapes.',
    price: 1899,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&auto=format',
    stock: 35,
    rating: 4.8,
    numReviews: 67,
  },
  {
    name: 'Professional Yoga Mat',
    description:
      'Extra-thick 6mm yoga mat with non-slip texture, alignment guides, and eco-friendly TPE material. Includes carrying strap.',
    price: 1499,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format',
    stock: 90,
    rating: 4.5,
    numReviews: 421,
  },
  {
    name: 'Carbon Fiber Tennis Racket',
    description:
      'Tournament-grade tennis racket with carbon fiber frame, vibration dampening system, and optimized string pattern for control and power.',
    price: 8999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&auto=format',
    stock: 25,
    rating: 4.7,
    numReviews: 56,
  },
  {
    name: 'Bluetooth Portable Speaker',
    description:
      'Waterproof portable speaker with 360-degree sound, 24-hour playback, and built-in microphone. Pairs seamlessly with all devices.',
    price: 5999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format',
    stock: 70,
    rating: 4.4,
    numReviews: 287,
  },
  {
    name: 'Luxury Scented Candle Collection',
    description:
      'Set of 4 hand-poured soy wax candles in premium scents: Sandalwood, Lavender, Vanilla Bean, and Ocean Breeze. 60+ hours burn time each.',
    price: 1299,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1603905485916-49c4d4adbc49?w=500&auto=format',
    stock: 40,
    rating: 4.9,
    numReviews: 95,
  },
  // 8 new products
  {
    name: 'Mechanical Gaming Keyboard',
    description:
      'RGB backlit mechanical keyboard with Cherry MX Blue switches, N-key rollover, and programmable macros. Built for competitive gaming and heavy typing.',
    price: 7499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format',
    stock: 50,
    rating: 4.6,
    numReviews: 204,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description:
      'Double-wall vacuum insulated 1L bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof lid, and scratch-resistant matte finish.',
    price: 999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format',
    stock: 120,
    rating: 4.5,
    numReviews: 538,
  },
  {
    name: 'Casual Linen Shirt',
    description:
      'Breathable 100% linen shirt with a relaxed fit, button-down collar, and subtle texture. Perfect for summer outings and casual office wear.',
    price: 1799,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format',
    stock: 65,
    rating: 4.3,
    numReviews: 189,
  },
  {
    name: 'Wireless Ergonomic Mouse',
    description:
      'Vertical ergonomic mouse with 7 programmable buttons, 4000 DPI precision sensor, silent clicks, and 60-day battery life.',
    price: 3299,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format',
    stock: 75,
    rating: 4.4,
    numReviews: 312,
  },
  {
    name: 'Non-Stick Cookware Set',
    description:
      'Premium 5-piece non-stick cookware set with granite coating, heat-resistant handles, and induction-compatible base. Dishwasher safe.',
    price: 4499,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format',
    stock: 30,
    rating: 4.7,
    numReviews: 156,
  },
  {
    name: 'Leather Bifold Wallet',
    description:
      'Slim genuine leather bifold wallet with RFID blocking, 6 card slots, and a bill compartment. Minimalist design, built to last.',
    price: 1299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format',
    stock: 90,
    rating: 4.5,
    numReviews: 267,
  },
  {
    name: 'Badminton Racket Set',
    description:
      'High-quality carbon graphite badminton racket set (2 rackets + shuttlecocks + carry bag). Lightweight at 85g with an isometric head for maximum sweet spot.',
    price: 2499,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format',
    stock: 45,
    rating: 4.4,
    numReviews: 143,
  },
  // Books
  {
    name: 'Atomic Habits',
    description:
      'James Clear\'s #1 New York Times bestseller on building good habits and breaking bad ones. Tiny changes, remarkable results. A must-read for personal development.',
    price: 499,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format',
    stock: 150,
    rating: 4.9,
    numReviews: 2341,
  },
  {
    name: 'The Psychology of Money',
    description:
      'Morgan Housel\'s timeless lessons on wealth, greed, and happiness. Understand how people think about money and make smarter financial decisions.',
    price: 449,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format',
    stock: 120,
    rating: 4.8,
    numReviews: 1876,
  },
  {
    name: 'Deep Work',
    description:
      'Cal Newport\'s guide to focused success in a distracted world. Rules for focused success in a distracted world — perfect for students and professionals.',
    price: 399,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format',
    stock: 95,
    rating: 4.7,
    numReviews: 943,
  },
  // More Electronics
  {
    name: '4K Action Camera',
    description:
      'Waterproof 4K action camera with image stabilization, wide-angle lens, and 2-inch touchscreen. Includes mounting accessories for sports and travel.',
    price: 15999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format',
    stock: 35,
    rating: 4.5,
    numReviews: 412,
  },
  {
    name: 'Noise Cancelling Earbuds',
    description:
      'True wireless earbuds with ANC, 8-hour battery (32hr with case), IPX5 water resistance, and multipoint connection. Crystal-clear call quality.',
    price: 8499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format',
    stock: 80,
    rating: 4.6,
    numReviews: 567,
  },
  // Fashion
  {
    name: 'Classic Denim Jacket',
    description:
      'Vintage-washed 100% cotton denim jacket with chest pockets and adjustable waistband. A timeless wardrobe staple for all seasons.',
    price: 2999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format',
    stock: 55,
    rating: 4.4,
    numReviews: 234,
  },
  // Home & Living
  {
    name: 'Bamboo Cutting Board Set',
    description:
      'Set of 3 organic bamboo cutting boards with juice grooves and non-slip feet. Naturally antibacterial, eco-friendly, and dishwasher safe.',
    price: 1199,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format',
    stock: 70,
    rating: 4.6,
    numReviews: 389,
  },
  // Accessories
  {
    name: 'Smart Watch Band (Leather)',
    description:
      'Premium genuine leather watch band compatible with Apple Watch and Samsung Galaxy Watch. Soft, breathable, and adjustable for all wrist sizes.',
    price: 799,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&auto=format',
    stock: 110,
    rating: 4.3,
    numReviews: 178,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopsphere.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create test user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    // Create products
    await Product.insertMany(products);

    console.log('Data seeded successfully!');
    console.log('Admin: admin@shopsphere.com / admin123');
    console.log('User:  john@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
