import React from 'react';
import NavBar from './navbar';
import Splash from './splash';
import Footer from './footer';
import HomeContainer from '../app/home/home_container';
import ServerIndexContainer from '../app/server/server_index_container';
import SearchContainer from '../app/home/search_container';
import ServerInfoContainer from '../app/server/server_info_container';
import ChannelIndexContainer from '../app/channel/channel_index_container';
import UserInfoContainer from '../app/user_info/user_info_container';
import MainContainer from '../app/main/main_container';
import HeaderContainer from '../app/header/header_container';
import MessageIndexContainer from '../app/message/message_index_container';
import MembershipIndexContainer from '../app/membership/membership_index_container';
import Modal from '../app/modal/modal';
import { Route } from 'react-router-dom';

const Homepage = ({ loggedIn }) => {
  return (
    loggedIn ? (
      <div className="app-container">
        <Modal />
        <div className="app-server-column">
          <Route path="/" component={HomeContainer} />
          <Route path="/" component={ServerIndexContainer} />
        </div>
        <div className="app-channel-column">
          <div className="app-server-channel">
            <Route path="/home" component={SearchContainer} />
            <Route path="/channels/:serverId/:channelId" component={ServerInfoContainer} />
            <Route path="/channels/:serverId/:channelId" component={ChannelIndexContainer} />
          </div>
          <Route path="/" component={UserInfoContainer} />
        </div>
        <div className="app-main-column">
          <Route path="/home" component={MainContainer} />
          <Route path="/channels/:serverId/:channelId" component={HeaderContainer} />
          <div className="app-message-membership">
            <Route path="/channels/:serverId/:channelId" component={MessageIndexContainer} />
            <Route path="/channels/:serverId/:channelId" component={MembershipIndexContainer} />
          </div>
        </div>
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
