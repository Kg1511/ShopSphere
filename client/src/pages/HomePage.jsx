import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';

const categories = [
  { name: 'Electronics', icon: '⚡', desc: 'Gadgets & Tech' },
  { name: 'Fashion', icon: '👔', desc: 'Style & Trends' },
  { name: 'Home & Living', icon: '🏠', desc: 'Décor & Comfort' },
  { name: 'Sports', icon: '🏆', desc: 'Gear & Fitness' },
  { name: 'Accessories', icon: '⌚', desc: 'Watches & More' },
  { name: 'Books', icon: '📚', desc: 'Read & Learn' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : (
            <div className="products-grid">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
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
