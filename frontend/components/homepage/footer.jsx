import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <footer className="footer-container">
      <div></div>
      <Link className="footer-logo" to="/">DISGO</Link>
      <ul>
        <li className="footer-heading">Product</li>
        <Link to="#">Features</Link>
        <Link to="#">Download</Link>
        <Link to="#">Branding</Link>
        <Link to="#">Nitro</Link>
      </ul>
      <ul>
        <li className="footer-heading">Developers</li>
        <Link to="#">Applications</Link>
        <Link to="#">Documentation</Link>
        <Link to="#">Status</Link>
        <Link to="#">Verification</Link>
      </ul>
      <ul>
        <li className="footer-heading">Resources</li>
        <Link to="#">Help & Support</Link>
        <Link to="#">Guidelines</Link>
        <Link to="#">Feedback</Link>
        <Link to="#">Terms</Link>
        <Link to="#">Privacy</Link>
      </ul>
      <ul>
        <li className="footer-heading">Company</li>
        <Link to="#">About</Link>
        <Link to="#">Blog</Link>
        <Link to="#">Jobs</Link>
      </ul>
      <ul>
        <li className="footer-heading">More</li>
        <Link to="#">Partners</Link>
        <Link to="#">HypeSquad</Link>
        <Link to="#">Merch Store</Link>
        <Link to="#">Press Inquiries</Link>
        <Link to="#">Open Source</Link>
      </ul>
      <div className="footer-last">
        <div>
          <h2>Ready to try Disgo? It's free!</h2>
          <p>Join over 130 million players today</p>
        </div>
        <Link className="footer-signup" to="/signup">Sign Up Now</Link>
      </div>
    </footer>
  );
};

export default Footer;
