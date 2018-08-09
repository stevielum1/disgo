import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <footer className="footer-container">
      <div></div>
      <Link className="footer-logo" to="/">DISGO</Link>
      <ul>
        <li className="footer-heading">Product</li>
        <Link to="/in-progress">Features</Link>
        <Link to="/in-progress">Download</Link>
        <Link to="/in-progress">Branding</Link>
        <Link to="/in-progress">Nitro</Link>
      </ul>
      <ul>
        <li className="footer-heading">Developers</li>
        <Link to="/in-progress">Applications</Link>
        <Link to="/in-progress">Documentation</Link>
        <Link to="/in-progress">Status</Link>
        <Link to="/in-progress">Verification</Link>
      </ul>
      <ul>
        <li className="footer-heading">Resources</li>
        <Link to="/in-progress">Help & Support</Link>
        <Link to="/in-progress">Guidelines</Link>
        <Link to="/in-progress">Feedback</Link>
        <Link to="/in-progress">Terms</Link>
        <Link to="/in-progress">Privacy</Link>
      </ul>
      <ul>
        <li className="footer-heading">Company</li>
        <Link to="/in-progress">About</Link>
        <Link to="/in-progress">Blog</Link>
        <Link to="/in-progress">Jobs</Link>
      </ul>
      <ul>
        <li className="footer-heading">More</li>
        <Link to="/in-progress">Partners</Link>
        <Link to="/in-progress">HypeSquad</Link>
        <Link to="/in-progress">Merch Store</Link>
        <Link to="/in-progress">Press Inquiries</Link>
        <Link to="/in-progress">Open Source</Link>
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
