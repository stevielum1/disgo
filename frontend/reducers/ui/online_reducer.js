import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../../actions/online_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';

const onlineReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case USER_LOGGED_IN:
      return [...state, action.userId];
    case USER_LOGGED_OUT:
      let idx = state.indexOf(action.userId);
      return state.slice(0, idx).concat(state.slice(idx+1));
    case RECEIVE_SERVERS:
      if (action.payload.onlineUsers) {
        return action.payload.onlineUsers;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default onlineReducer;
