import React from 'react';
import { NavLink } from 'react-router-dom';

const ChannelIndexItem = ({ channel, openModal, owner }) => {
  const editButton = owner ? (
    <i onClick={() => openModal('editChannel')} className="fas fa-cog"></i>
  ) : null;

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
          {editButton}
        </div>
      </NavLink>
    </li>
  )
}

export default ChannelIndexItem;
