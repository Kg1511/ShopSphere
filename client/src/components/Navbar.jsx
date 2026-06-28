import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="url(#grad)" strokeWidth="2.5" />
            <path d="M10 16l4 4 8-8" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#6c63ff" />
                <stop offset="1" stopColor="#00d4aa" />
              </linearGradient>
            </defs>
          </svg>
          ShopSphere
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="input-field"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-input"
          />
        </form>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <div className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
          <Link to="/products" className="nav-link" id="nav-products">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Products
          </Link>

          <Link to="/cart" className="nav-link" id="nav-cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button
                className="user-menu-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                id="user-menu-btn"
              >
                <span className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name.split(' ')[0]}
              </button>

              <div className={`user-dropdown ${dropdownOpen ? 'show' : ''}`}>
                {user.role === 'admin' && (
                  <>
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                      id="nav-admin"
                    >
                      ⚡ Admin Dashboard
                    </Link>
                    <div className="dropdown-divider" />
                  </>
                )}
                <Link
                  to="/orders"
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  id="nav-orders"
                >
                  📦 My Orders
                </Link>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout} id="logout-btn">
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm" id="nav-login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
