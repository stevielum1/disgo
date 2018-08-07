import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignupFormContainer from './session/signup_container';
import LoginFormContainer from './session/login_container';

const App = ({ store }) => {
  return (
    <div>
      {/*
      <Route exact path="/" component={NavBar} />
      <Route exact path="/" component={Splash} />
      <Route exact path="/" component={Footer} />
      */}
      <Route exact path="/login" component={LoginFormContainer} />
      <Route exact path="/signup" component={SignupFormContainer} />
    </div>
  )
}

export default App;
