import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      Processing: 'badge-warning',
      Shipped: 'badge-accent',
      Delivered: 'badge-success',
      Cancelled: 'badge-danger',
    };
    return map[status] || 'badge-accent';
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>Place your first order and it will appear here</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card" id={`order-${order._id}`}>
            <div className="order-header">
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Order #{order._id.slice(-8).toUpperCase()}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px', color: 'var(--accent-primary)' }}>
                  ₹{order.totalPrice.toFixed(0)}
                </div>
              </div>
            </div>

            <div className="order-items">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="order-item">
                  <div className="order-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                      Qty: {item.quantity} × ₹{item.price.toFixed(0)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              📍 {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
