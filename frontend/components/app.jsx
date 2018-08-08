import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomepageContainer from './homepage/homepage_container';
import SignupFormContainer from './session/signup_container';
import LoginFormContainer from './session/login_container';

const App = () => {
  return (
    <div>
      <Route path="/" component={HomepageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </div>
  )
}

export default App;
