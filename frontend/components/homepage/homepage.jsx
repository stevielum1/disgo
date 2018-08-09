import React from 'react';
import NavBar from './navbar';
import Splash from './splash';
import Footer from './footer';
import Main from '../app/main';
import ServerIndexContainer from '../app/server/server_index_container';
import UserInfoContainer from '../app/user_info/user_info_container';
import { Route } from 'react-router-dom';

const Homepage = ({ loggedIn }) => {
  return (
    loggedIn ? (
      <div className="app-container">
        <Route path="/" component={ServerIndexContainer} />
        <Route path="/" component={Main} />
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
