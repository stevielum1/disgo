import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE
} from '../../actions/message_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';
import merge from 'lodash/merge';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGE:
      return merge({}, state, { [action.message.id]: action.message });
    case REMOVE_MESSAGE:
      let newState = merge({}, state);
      delete newState[action.messageId];
      return newState;
    case RECEIVE_SERVERS:
      if (action.payload.messages) {
        return action.payload.messages;
      } else {
        return state;
      }
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default messagesReducer;
