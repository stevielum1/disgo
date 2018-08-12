import {
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from '../../actions/channel_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';
import merge from 'lodash/merge';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHANNEL:
      return merge({}, state, action.channel);
    case REMOVE_CHANNEL:
      let newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    case RECEIVE_SERVERS:
      if (action.payload.channels) {
        return action.payload.channels;
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default channelsReducer;
