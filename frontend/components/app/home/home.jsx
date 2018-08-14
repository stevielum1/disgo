import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = ({ loading }) => {
  if (loading) return (
    <div className="cssload-loader-inner">
      <div className="cssload-cssload-loader-line-wrap-wrap">
        <div className="cssload-loader-line-wrap"></div>
      </div>
      <div className="cssload-cssload-loader-line-wrap-wrap">
        <div className="cssload-loader-line-wrap"></div>
      </div>
      <div className="cssload-cssload-loader-line-wrap-wrap">
        <div className="cssload-loader-line-wrap"></div>
      </div>
      <div className="cssload-cssload-loader-line-wrap-wrap">
        <div className="cssload-loader-line-wrap"></div>
      </div>
      <div className="cssload-cssload-loader-line-wrap-wrap">
        <div className="cssload-loader-line-wrap"></div>
      </div>
    </div>
  );
  
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
