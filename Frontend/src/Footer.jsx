import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }

    toast.success("Thank you for subscribing👌");
    setEmail(""); // clear input after success
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>
            <Link to="/">MyStore</Link>
          </h2>
          <p>Your favorite place to buy quality products online.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/product">Products</Link></p>
          <p><Link to="/cartlist">Cart</Link></p>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <p><Link to="/helpcenter">Help Center</Link></p>
          <p><Link to="/shippinginfo">Shipping Info</Link></p>
          <p><Link to="/returns">Returns</Link></p>
          <p><Link to="/privacypolicy">Privacy Policy</Link></p>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Subscribe</h4>
          <p>Get updates on new products</p>

          <div className="subscribe">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="button" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>

          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;