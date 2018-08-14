import React from 'react';

const Header = ({ channel, loading }) => {
  if (loading) return null;
  return (
    <div className="header-container">
      <span># <span className="header-channel-name">{channel.name}</span></span>
    </div>
  )
};

export default Header;
