import React from 'react';

const ServerIndexItem = ({ server }) => {
  return (
    <li>
      <img
        src={server.photoUrl}
        className="server-photo" />
    </li>
  )
};

export default ServerIndexItem
