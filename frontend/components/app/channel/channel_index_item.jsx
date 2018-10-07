import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const ChannelIndexItem = ({ channel, openModal, owner }) => {
  const editButton = owner ? (
    <i onClick={() => openModal('editChannel')} className="fas fa-cog edit-channel-icon"></i>
  ) : null;

  let symbol, content;
  
  if (channel.type === "TEXT") {
    symbol = <i className="fas fa-hashtag"></i>;
    content = (
      <li>
        <NavLink
          className="text-channel-link channel-link"
          activeClassName="text-channel-active"
          to={`/channels/${channel.serverId}/${channel.id}`}>
          <div>
            <div>
              <span>{symbol} <span className="text-channel-name">{channel.name}</span>
              </span>
            </div>
            {editButton}
          </div>
        </NavLink>
      </li>
    );
  } else {
    symbol = <i className="fas fa-volume-up"></i>;
    content = (
      <li>
        <Link
          className="voice-channel-link channel-link"
          to={"#"}>
          <div>
            <div>
              <span>{symbol} <span className="voice-channel-name">{channel.name}</span>
              </span>
            </div>
            {editButton}
          </div>
        </Link>
      </li>
    );
  }

  return (
    content
  )
}

export default ChannelIndexItem;
