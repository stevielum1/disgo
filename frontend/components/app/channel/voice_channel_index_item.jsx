import React from 'react';

const VoiceChannelIndexItem = ({ user }) => {
  if (!Boolean(user)) return null;

  return (
    <li className="voice-channel-index-item">
      <img src={user.photoUrl} />
      <p>{user.username}</p>
    </li>
  );
};

export default VoiceChannelIndexItem;