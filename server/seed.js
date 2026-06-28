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
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 45,
    rating: 4.7,
    numReviews: 128,
  },
  {
    name: 'Ultra-Slim 4K Laptop',
    description:
      '15.6-inch 4K OLED display laptop with Intel i9 processor, 32GB RAM, 1TB SSD. Perfect for creative professionals and power users.',
    price: 1899.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    stock: 20,
    rating: 4.8,
    numReviews: 89,
  },
  {
    name: 'Smart Fitness Watch Pro',
    description:
      'Advanced fitness tracker with GPS, heart rate monitoring, sleep tracking, and 50+ workout modes. Water-resistant to 50 meters with 14-day battery life.',
    price: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 60,
    rating: 4.5,
    numReviews: 256,
  },
  {
    name: 'Premium Leather Jacket',
    description:
      'Handcrafted genuine leather jacket with a modern slim-fit design. Features YKK zippers, quilted lining, and adjustable waist tabs.',
    price: 449.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    stock: 30,
    rating: 4.6,
    numReviews: 74,
  },
  {
    name: 'Designer Running Sneakers',
    description:
      'Lightweight performance sneakers with responsive foam cushioning, breathable mesh upper, and durable rubber outsole. Available in multiple colorways.',
    price: 179.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 80,
    rating: 4.4,
    numReviews: 312,
  },
  {
    name: 'Classic Aviator Sunglasses',
    description:
      'Polarized aviator sunglasses with UV400 protection, titanium frame, and anti-reflective coating. Includes premium carrying case.',
    price: 159.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    stock: 100,
    rating: 4.3,
    numReviews: 198,
  },
  {
    name: 'Minimalist Desk Lamp',
    description:
      'Modern LED desk lamp with touch-sensitive controls, 5 brightness levels, 3 color temperatures, and wireless phone charging base.',
    price: 89.99,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500',
    stock: 55,
    rating: 4.6,
    numReviews: 143,
  },
  {
    name: 'Artisan Ceramic Vase Set',
    description:
      'Set of 3 handcrafted ceramic vases in complementary earth tones. Each piece is unique with a matte finish and organic shapes.',
    price: 129.99,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
    stock: 35,
    rating: 4.8,
    numReviews: 67,
  },
  {
    name: 'Professional Yoga Mat',
    description:
      'Extra-thick 6mm yoga mat with non-slip texture, alignment guides, and eco-friendly TPE material. Includes carrying strap.',
    price: 69.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 90,
    rating: 4.5,
    numReviews: 421,
  },
  {
    name: 'Carbon Fiber Tennis Racket',
    description:
      'Tournament-grade tennis racket with carbon fiber frame, vibration dampening system, and optimized string pattern for control and power.',
    price: 249.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500',
    stock: 25,
    rating: 4.7,
    numReviews: 56,
  },
  {
    name: 'Bluetooth Portable Speaker',
    description:
      'Waterproof portable speaker with 360-degree sound, 24-hour playback, and built-in microphone. Pairs seamlessly with all devices.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    stock: 70,
    rating: 4.4,
    numReviews: 287,
  },
  {
    name: 'Luxury Scented Candle Collection',
    description:
      'Set of 4 hand-poured soy wax candles in premium scents: Sandalwood, Lavender, Vanilla Bean, and Ocean Breeze. 60+ hours burn time each.',
    price: 79.99,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1602607741969-965ac44e0c94?w=500',
    stock: 40,
    rating: 4.9,
    numReviews: 95,
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
