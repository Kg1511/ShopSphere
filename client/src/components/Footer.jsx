import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">ShopSphere</div>
            <p className="footer-desc">
              Your premium destination for curated products across electronics,
              fashion, home & living, and sports. Discover quality, embrace style.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Home & Living">Home & Living</Link></li>
              <li><Link to="/products?category=Sports">Sports</Link></li>
            </ul>
          </div>

          <div>
            <h4>Account</h4>
            <ul className="footer-links">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 ShopSphere. All rights reserved.</span>
          <span>Built with ❤️ using MERN Stack</span>
        </div>
      </div>
    </footer>
  );
}
