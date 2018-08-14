import React from 'react';

const ServerInfo = ({ server, openModal, loading }) => {
  if (loading) return null;
  return (
    <div
      className="server-info-container"
      onClick={() => openModal('serverInfo')}>
      <h2>{server.name}</h2>
      <i className="fas fa-angle-down"></i>
    </div>
  )
};

export default ServerInfo;
