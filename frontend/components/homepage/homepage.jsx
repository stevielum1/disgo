import React from 'react';
import NavBar from './navbar';
import Splash from './splash';
import Footer from './footer';
import Header from '../app/header';
import ServerIndex from '../app/server_index';
import UserInfo from '../app/user_info';
import { Route } from 'react-router-dom';

const Homepage = ({ loggedIn }) => {
  return (
    loggedIn ? (
      <div>
        <Route path="/" component={Header} />
        <Route path="/" component={ServerIndex} />
        <Route path="/" component={UserInfo} />
      </div>
    ) : (
      <div>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/" component={Splash} />
        <Route exact path="/" component={Footer} />
      </div>
    )
  )
}

export default Homepage;
