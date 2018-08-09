import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomepageContainer from './homepage/homepage_container';
import SignupFormContainer from './session/signup_container';
import LoginFormContainer from './session/login_container';
import InProgress from './errors/in_progress';

const App = () => {
  return (
    <div>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route path="/in-progress" component={InProgress} />
      <Route path="/" component={HomepageContainer} />
    </div>
  )
}

export default App;
