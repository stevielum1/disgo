import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isMember } from '../reducers/selectors';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    )} />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )} />
  );
};

const Member = ({ component: Component, path, loggedIn, exact, member }) => {
  return (
    <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        member ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <Redirect to="/" />
      )
    )} />
  )
};

const mapStateToProps = (state, ownProps) => {
  const serverId = ownProps.location.pathname.match(/\d+/) ? ownProps.location.pathname.match(/\d+/)[0] : -1;
  const loggedIn = Boolean(state.session.id);
  const member = loggedIn ? isMember(state, serverId, state.session.id) : false;
  return {
    loggedIn,
    member
  }
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const MemberRoute = withRouter(connect(mapStateToProps)(Member));
