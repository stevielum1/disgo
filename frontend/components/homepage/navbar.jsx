import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <header className="header">
      <nav className="nav-left">
        <Link className="nav-logo" to="/">Disgo</Link>
        <ul>
          <li><Link to="/">Download</Link></li>
          <li><Link to="/">Nitro</Link></li>
          <li><Link to="/">Jobs</Link></li>
          <li><Link to="/">Developers</Link></li>
          <li><Link to="/">Community</Link></li>
          <li><Link to="/">Blog</Link></li>
          <li><Link to="/">Support</Link></li>
        </ul>
      </nav>
      <nav className="nav-right">
        <i className="fab fa-twitter"></i>
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram"></i>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default NavBar;
