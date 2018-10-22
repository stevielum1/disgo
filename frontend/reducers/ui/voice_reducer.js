import { USER_JOINED, USER_LEFT } from '../../actions/voice_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';

const voiceReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case USER_JOINED:
      return Object.assign({}, state, { [action.userId]: action.channelId });
    case USER_LEFT:
      let newState = Object.assign({}, state);
      delete newState[action.userId];
      return newState;
    case RECEIVE_SERVERS:
      if (action.payload.voiceUsers) {
        return action.payload.voiceUsers;
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default voiceReducer;
