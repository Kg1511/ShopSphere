import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    addToast(`${product.name} added to cart`);
    setTimeout(() => setAdding(false), 700);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(w => !w);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rating) ? '' : 'star-empty'}>★</span>
    ));
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="product-card"
      id={`product-${product._id}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-category">{product.category}</span>

        {/* Wishlist button */}
        <button
          className={`product-wish-btn ${wished ? 'wished' : ''}`}
          onClick={handleWish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wished ? '♥' : '♡'}
        </button>

        {/* Hover overlay */}
        <div className="product-card-overlay">
          <span>View Details →</span>
        </div>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-footer">
          <div className="stars">{renderStars(product.rating)}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            ({product.numReviews.toLocaleString()})
          </span>
        </div>
        <div className="product-card-price">₹{product.price.toLocaleString('en-IN')}</div>
        <button
          className={`btn btn-primary product-add-btn ${adding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          id={`add-cart-${product._id}`}
          disabled={adding}
        >
          {adding ? (
            <span className="btn-spinner" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          )}
          {adding ? 'Adding…' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
