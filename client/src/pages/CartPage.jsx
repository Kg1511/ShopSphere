import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="container section">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items" id="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item" id={`cart-item-${item._id}`}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <Link to={`/products/${item._id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary" id="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: shipping === 0 ? 'var(--accent-secondary)' : 'inherit' }}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-md)' }}>
              Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
            </p>
          )}
          <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }} id="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
