import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <header>
      <nav>
        <nav className="nav-left">
          <Link to="/">LOGO IMG</Link>
          <ul className="nav-left-ul">
            <li>Download</li>
            <li>Nitro</li>
            <li>Jobs</li>
            <li>Developers</li>
            <li>Community</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </nav>
        <nav className="nav-right">
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
        </nav>
      </nav>
    </header>
  );
};

export default NavBar;
