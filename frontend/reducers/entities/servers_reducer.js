import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../../actions/server_actions';
import merge from 'lodash/merge';

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SERVERS:
      return merge({}, state, action.servers);
    case RECEIVE_SERVER:
      return merge({}, state, { [action.server.id]: action.server });
    case REMOVE_SERVER:
      let newState = merge({}, state);
      delete newState[action.serverId];
      return newState;
    default:
      return state;
  }
};

export default serversReducer;
