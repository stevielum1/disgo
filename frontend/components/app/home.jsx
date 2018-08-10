import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = props => {
  return (
    <div className="home-container">
      <NavLink
        className="home-link"
        activeClassName="home-active"
        to="/home">
        <div className="home-active-icon"></div>
        <img src="https://s3-us-west-1.amazonaws.com/disgo-dev/server_img.png" />
      </NavLink>
    </div>
  )
};

export default Home;
