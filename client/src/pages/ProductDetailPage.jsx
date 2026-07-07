import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${product.name} added to cart (x${quantity})`);
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

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </div>

      <div className="product-detail" id="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="badge badge-accent">{product.category}</span>
          <h1 style={{ marginTop: 'var(--space-md)' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', margin: 'var(--space-md) 0' }}>
            <div className="stars" style={{ fontSize: '1.1rem' }}>
              {renderStars(product.rating)}
            </div>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          <div className="product-detail-price">₹{product.price.toFixed(0)}</div>

          <p className="product-detail-desc">{product.description}</p>

          <div className="stock-status">
            <span className={`stock-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`} />
            <span style={{ fontSize: '0.9rem', color: product.stock > 0 ? 'var(--accent-secondary)' : '#ef4444' }}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  id="qty-minus"
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  id="qty-plus"
                >
                  +
                </button>
              </div>

              <button className="btn btn-primary btn-lg" onClick={handleAddToCart} id="add-to-cart-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to Cart — ₹{(product.price * quantity).toFixed(0)}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
