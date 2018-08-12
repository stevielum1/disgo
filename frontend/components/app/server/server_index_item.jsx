import React from 'react';
import { NavLink } from 'react-router-dom';

const ServerIndexItem = ({ server, channel }) => {
  return (
    <li>
      <NavLink
        className="server-link"
        activeClassName="server-active"
        to={`/channels/${server.id}/${channel.id}`}>
        <div className="server-active-icon"></div>
        <img src={server.photoUrl} />
      </NavLink>
    </li>
  )
};

export default ServerIndexItem
