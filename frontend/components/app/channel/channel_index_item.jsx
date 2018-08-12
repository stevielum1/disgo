import React from 'react';
import { NavLink } from 'react-router-dom';

const ChannelIndexItem = ({ channel, openModal }) => {
  return (
    <li>
      <NavLink
        className="channel-link"
        activeClassName="channel-active"
        to={`/channels/${channel.serverId}/${channel.id}`}>
        <div>
          <div>
            <span># <span className="channel-name">{channel.name}</span>
            </span>
          </div>
          <i onClick={() => openModal('editChannel')} className="fas fa-cog"></i>
        </div>
      </NavLink>
    </li>
  )
}

export default ChannelIndexItem;
