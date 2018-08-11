import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import serverErrorsReducer from './server_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import serverMembershipErrorsReducer from './server_membership_errors_reducer';
import channelErrorsReducer from './channel_errors_reducer';

const errorsReducer = combineReducers({
  sessionErrors: sessionErrorsReducer,
  serverErrors: serverErrorsReducer,
  userErrors: userErrorsReducer,
  membershipErrors: serverMembershipErrorsReducer,
  channelErrors: channelErrorsReducer
});

export default errorsReducer;
