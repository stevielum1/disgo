import React from 'react';
import { NavLink } from 'react-router-dom';

const ChannelIndexItem = ({ channel, openModal, owner }) => {
  const editButton = owner ? (
    <i onClick={() => openModal('editChannel')} className="fas fa-cog"></i>
  ) : null;

  let symbol, content;
  
  if (channel.type === "TEXT") {
    symbol = "# ";
    content = (
      <li>
        <NavLink
          className="channel-link"
          activeClassName="channel-active"
          to={`/channels/${channel.serverId}/${channel.id}`}>
          <div>
            <div>
              <span>{symbol}<span className="channel-name">{channel.name}</span>
              </span>
            </div>
            {editButton}
          </div>
        </NavLink>
      </li>
    );
  } else {
    symbol = "> ";
    content = (
      <li>
        <Link
          className="channel-link"
          to={"#"}>
          <div>
            <div>
              <span>{symbol}<span className="channel-name">{channel.name}</span>
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
