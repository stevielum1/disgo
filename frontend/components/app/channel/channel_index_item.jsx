import React from 'react';
import { NavLink } from 'react-router-dom';

const ChannelIndexItem = ({ channel }) => {
  return (
    <li>
      <NavLink
        className="channel-link"
        activeClassName="channel-active"
        to={`/channels/${channel.serverId}/${channel.id}`}>
        <span># <span className="channel-name">{channel.name}</span></span>
      </NavLink>
    </li>
  )
}

export default ChannelIndexItem;
