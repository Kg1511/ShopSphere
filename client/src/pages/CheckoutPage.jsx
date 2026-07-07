import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../api';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice > 5000 ? 0 : 99;
  const tax = totalPrice * 0.18;
  const orderTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>Nothing to Checkout</h2>
          <p>Add some items to your cart first</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/orders', {
        shippingAddress: { address, city, postalCode, country },
      });
      clearCart();
      addToast('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/cart">Cart</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Checkout</span>
      </div>

      <h1 className="page-title">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="checkout-layout">
          <div>
            <div className="checkout-section" id="shipping-section">
              <h2>Shipping Address</h2>
              <div className="input-group">
                <label htmlFor="checkout-address">Street Address</label>
                <input
                  type="text"
                  id="checkout-address"
                  className="input-field"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label htmlFor="checkout-city">City</label>
                  <input
                    type="text"
                    id="checkout-city"
                    className="input-field"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="checkout-postal">Postal Code</label>
                  <input
                    type="text"
                    id="checkout-postal"
                    className="input-field"
                    placeholder="10001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="checkout-country">Country</label>
                <input
                  type="text"
                  id="checkout-country"
                  className="input-field"
                  placeholder="United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Order Items ({items.length})</h2>
              {items.map((item) => (
                <div key={item._id} className="order-item" style={{ marginBottom: 'var(--space-md)' }}>
                  <div className="order-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary" id="checkout-summary">
            <h3>Payment Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? 'var(--accent-secondary)' : 'inherit' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(0)}`}
              </span>
            </div>
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{orderTotal.toFixed(0)}</span>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={loading}
              id="place-order-btn"
            >
              {loading ? 'Placing Order...' : `Place Order — ₹${orderTotal.toFixed(0)}`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-md)' }}>
              🔒 Your payment info is secure
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
