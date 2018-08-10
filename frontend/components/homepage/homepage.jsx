import React from 'react';
import NavBar from './navbar';
import Splash from './splash';
import Footer from './footer';
import Home from '../app/home';
import Main from '../app/main';
import ServerIndexContainer from '../app/server/server_index_container';
import ChannelIndexContainer from '../app/channel/channel_index_container';
import UserInfoContainer from '../app/user_info/user_info_container';
import Modal from '../app/modal/modal';
import { Route } from 'react-router-dom';

const Homepage = ({ loggedIn }) => {
  return (
    loggedIn ? (
      <div className="app-container">
        <Modal />
        <div className="app-server-column">
          <Route path="/" component={Home} />
          <Route path="/" component={ServerIndexContainer} />
        </div>
        <div className="app-channel-column">
          <Route path="/" component={ChannelIndexContainer} />
          <Route path="/" component={UserInfoContainer} />
        </div>
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
