import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.name} added to cart`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rating) ? '' : 'star-empty'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card" id={`product-${product._id}`}>
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-footer">
          <div className="stars">{renderStars(product.rating)}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            ({product.numReviews})
          </span>
        </div>
        <div className="product-card-price">₹{product.price.toFixed(0)}</div>
        <button className="btn btn-primary" onClick={handleAddToCart} id={`add-cart-${product._id}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
