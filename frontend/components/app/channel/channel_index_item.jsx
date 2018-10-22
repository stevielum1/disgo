import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import VoiceChannelIndexContainer from './voice_channel_index_container';

const ChannelIndexItem = ({ channel, openModal, owner }) => {
  const editTextButton = owner ? (
    <i onClick={() => openModal('editTextChannel')} className="fas fa-cog edit-channel-icon"></i>
  ) : null;
  
  if (channel.type === "TEXT") {
    return (
      <li>
        <NavLink
          className="text-channel-link channel-link"
          activeClassName="text-channel-active"
          to={`/channels/${channel.serverId}/${channel.id}`}>
          <div>
            <div>
              <span><i className="fas fa-hashtag"></i> <span className="text-channel-name">{channel.name}</span>
              </span>
            </div>
            {editTextButton}
          </div>
        </NavLink>
      </li>
    );
  } else {
    return <VoiceChannelIndexContainer
      channel={channel}
      openModal={openModal}
      owner={owner} />;
  }
}

export default ChannelIndexItem;
