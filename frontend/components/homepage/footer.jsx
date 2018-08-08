import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <footer className="footer-container">
      <div></div>
      <Link className="footer-logo" to="/">DISGO</Link>
      <ul>
        <li className="footer-heading">Product</li>
        <li>Features</li>
        <li>Download</li>
        <li>Branding</li>
        <li>Nitro</li>
      </ul>
      <ul>
        <li className="footer-heading">Developers</li>
        <li>Applications</li>
        <li>Documentation</li>
        <li>Status</li>
        <li>Verification</li>
      </ul>
      <ul>
        <li className="footer-heading">Resources</li>
        <li>Help & Support</li>
        <li>Guidelines</li>
        <li>Feedback</li>
        <li>Terms</li>
        <li>Privacy</li>
      </ul>
      <ul>
        <li className="footer-heading">Company</li>
        <li>About</li>
        <li>Blog</li>
        <li>Jobs</li>
      </ul>
      <ul>
        <li className="footer-heading">More</li>
        <li>Partners</li>
        <li>HypeSquad</li>
        <li>Merch Store</li>
        <li>Press Inquiries</li>
        <li>Open Source</li>
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
