import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../../actions/server_actions';
import merge from 'lodash/merge';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';
import { REMOVE_MEMBERSHIP } from '../../actions/server_membership_actions';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_SERVERS:
      if (action.payload.servers) {
        return action.payload.servers;
      } else {
        return state;
      }
    case RECEIVE_SERVER:
      return merge(newState, { [action.server.id]: action.server });
    case REMOVE_SERVER:
      delete newState[action.serverId];
      return newState;
    case REMOVE_MEMBERSHIP:
      delete newState[action.membership.serverId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default serversReducer;
