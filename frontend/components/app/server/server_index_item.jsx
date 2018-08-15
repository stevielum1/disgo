import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const ServerIndexItem = ({ server, channel, loading, history }) => {
  if (loading) return null;
  return (
    <li onClick={() => {
      history.replace(`/channels/${server.id}/${channel.id}`)
    }} >
      <NavLink
        className="server-link"
        activeClassName="server-active"
        to={`/channels/${server.id}`} >
        <div className="server-active-icon"></div>
        <img src={server.photoUrl} />
      </NavLink>
    </li>
  )
};

export default withRouter(ServerIndexItem);
