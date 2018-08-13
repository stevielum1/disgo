import React from 'react';

const Header = ({ channel }) => {
  if (channel === undefined) return <div>Loading...</div>;
  return (
    <div className="header-container">
      <span># <span className="header-channel-name">{channel.name}</span></span>
    </div>
  )
};

export default Header;
