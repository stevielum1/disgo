import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_SERVERS:
      if (action.payload.users) {
        return action.payload.users;
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default usersReducer;
