import React from 'react';
import NavBar from './navbar';
import Splash from './splash';
import Footer from './footer';
import Home from '../app/home';
import Main from '../app/main';
import ServerIndexContainer from '../app/server/server_index_container';
import ServerInfoContainer from '../app/server/server_info_container';
import ChannelIndexContainer from '../app/channel/channel_index_container';
import UserInfoContainer from '../app/user_info/user_info_container';
import Modal from '../app/modal/modal';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';

const Homepage = ({ loggedIn }) => {
  return (
    loggedIn ? (
      <div className="app-container">
        <Modal />
        <div className="app-server-column">
          <ProtectedRoute path="/" component={Home} />
          <ProtectedRoute path="/" component={ServerIndexContainer} />
        </div>
        <div className="app-channel-column">
          <div>
            <ProtectedRoute path="/channels/:serverId" component={ServerInfoContainer} />
            <ProtectedRoute path="/channels/:serverId" component={ChannelIndexContainer} />
          </div>
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
