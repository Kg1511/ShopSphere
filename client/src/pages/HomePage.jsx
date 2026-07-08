import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const categories = [
  { name: 'Electronics', icon: '⚡', desc: 'Gadgets & Tech' },
  { name: 'Fashion', icon: '👔', desc: 'Style & Trends' },
  { name: 'Home & Living', icon: '🏠', desc: 'Décor & Comfort' },
  { name: 'Sports', icon: '🏆', desc: 'Gear & Fitness' },
  { name: 'Accessories', icon: '⌚', desc: 'Watches & More' },
  { name: 'Books', icon: '📚', desc: 'Read & Learn' },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: '👩🏽',
    rating: 5,
    review: 'Absolutely love ShopSphere! The noise-cancelling headphones I ordered arrived in perfect condition. The quality exceeded my expectations and the checkout was so smooth.',
    product: 'Wireless Headphones',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    location: 'Bangalore',
    avatar: '👨🏽',
    rating: 5,
    review: 'Best online shopping experience I have had. The Smart Fitness Watch is exactly as described — incredible build quality and the delivery was super fast!',
    product: 'Smart Fitness Watch',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    avatar: '👩🏾',
    rating: 5,
    review: 'The premium leather jacket fits perfectly and the quality is top-notch. Customer support was very helpful when I had a size query. Will definitely shop again!',
    product: 'Premium Leather Jacket',
  },
  {
    id: 4,
    name: 'Rahul Gupta',
    location: 'Delhi',
    avatar: '👨🏻',
    rating: 5,
    review: 'Bought the 4K Laptop and the Mechanical Keyboard together. Both are outstanding products. Fast shipping, great packaging, and the prices are unbeatable.',
    product: 'Ultra-Slim 4K Laptop',
  },
  {
    id: 5,
    name: 'Kavya Nair',
    location: 'Kochi',
    avatar: '👩🏼',
    rating: 5,
    review: 'ShopSphere is my go-to store now. Got the Bamboo Cutting Board Set and the candle collection — perfect gifts for my family. Packaging was gorgeous!',
    product: 'Home & Living Collection',
  },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState('next');
  const autoPlayRef = useRef(null);

  const goToSlide = (index, dir = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDir(dir);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const next = () => goToSlide((activeSlide + 1) % testimonials.length, 'next');
  const prev = () => goToSlide((activeSlide - 1 + testimonials.length) % testimonials.length, 'prev');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products?sort=rating');
        setFeatured(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isAnimating) return;
    const interval = setInterval(() => {
      goToSlide((activeSlide + 1) % testimonials.length, 'next');
    }, 4000);
    return () => clearInterval(interval);
  }, [activeSlide, isAnimating]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              ✨ Premium Shopping Experience
            </div>
            <h1>
              Discover Your<br />
              <span className="gradient-text">Perfect Style</span>
            </h1>
            <p>
              Explore curated collections of premium products. From cutting-edge
              electronics to timeless fashion — everything you need, all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg" id="hero-shop-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                Shop Now
              </Link>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Browse Catalog →
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>500+</h3>
                <p>Premium Products</p>
              </div>
              <div className="hero-stat">
                <h3>50K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="hero-stat">
                <h3>4.9★</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Browse our curated categories to find exactly what you need</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                className="category-card"
                id={`category-${cat.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" id="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Our highest-rated products, loved by thousands of customers</p>
          </div>
          {loading ? (
            <div className="products-grid">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="products-grid">
              {featured.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/products" className="btn btn-secondary btn-lg">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="section testimonials-section" id="reviews-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Thousands of happy shoppers trust ShopSphere every day</p>
          </div>

          <div className="testimonials-wrapper">
            <button className="testimonial-nav prev" onClick={prev} aria-label="Previous review">
              ‹
            </button>

            <div className="testimonials-track">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`testimonial-card ${
                    i === activeSlide ? 'active' : ''
                  } ${i === activeSlide && slideDir === 'next' ? 'slide-in-right' : ''} ${
                    i === activeSlide && slideDir === 'prev' ? 'slide-in-left' : ''
                  }`}
                >
                  <div className="testimonial-stars">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="testimonial-review">"{t.review}"</p>
                  <div className="testimonial-footer">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-meta">{t.location} · {t.product}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="testimonial-nav next" onClick={next} aria-label="Next review">
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(i, i > activeSlide ? 'next' : 'prev')}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section" id="trust-section">
        <div className="container">
          <div className="categories-grid" style={{ textAlign: 'center' }}>
            <div className="category-card" style={{ cursor: 'default' }}>
              <div className="category-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over ₹5,000</p>
            </div>
            <div className="category-card" style={{ cursor: 'default' }}>
              <div className="category-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>SSL encrypted checkout</p>
            </div>
            <div className="category-card" style={{ cursor: 'default' }}>
              <div className="category-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="category-card" style={{ cursor: 'default' }}>
              <div className="category-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
