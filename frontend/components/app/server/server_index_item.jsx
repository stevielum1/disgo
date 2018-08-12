import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ServerIndexItem = ({ server, channel }) => {
  if (channel === undefined) return <div>Loading...</div>;
  return (
    <li>
      <NavLink
        className="server-link"
        activeClassName="server-active"
        to={`/channels/${server.id}`}>
          <Link to={`/channels/${server.id}/${channel.id}`}>
          <div className="server-active-icon"></div>
          <img src={server.photoUrl} />
        </Link>
      </NavLink>
    </li>
  )
};

export default ServerIndexItem
