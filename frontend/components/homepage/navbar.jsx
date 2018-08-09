import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <header className="header">
      <nav className="nav-left">
        <Link className="nav-logo" to="/">DISGO</Link>
        <ul>
          <li><Link to="/in-progress">Download</Link></li>
          <li><Link to="/in-progress">Nitro</Link></li>
          <li><Link to="/in-progress">Jobs</Link></li>
          <li><Link to="/in-progress">Developers</Link></li>
          <li><Link to="/in-progress">Community</Link></li>
          <li><Link to="/in-progress">Blog</Link></li>
          <li><Link to="/in-progress">Support</Link></li>
        </ul>
      </nav>
      <nav className="nav-right">
        <a href="https://github.com/stevielum1"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/steven-lum-204868141/"><i className="fab fa-linkedin"></i></a>
        <Link to="/login" className="nav-login">Login</Link>
      </nav>
    </header>
  );
};

export default NavBar;
