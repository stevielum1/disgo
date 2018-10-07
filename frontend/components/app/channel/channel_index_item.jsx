import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const ChannelIndexItem = ({ channel, openModal, owner }) => {
  const editTextButton = owner ? (
    <i onClick={() => openModal('editTextChannel')} className="fas fa-cog edit-channel-icon"></i>
  ) : null;

  // TODO somehow get voice channel id to edit_voice_channel_form_container
  const editVoiceButton = owner ? (
    <i onClick={() => openModal('editVoiceChannel')} className="fas fa-cog edit-channel-icon"></i>
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
            {editTextButton}
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
            {editVoiceButton}
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
