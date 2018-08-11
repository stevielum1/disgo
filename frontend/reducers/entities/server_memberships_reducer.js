import {
  RECEIVE_MEMBERSHIP,
  REMOVE_MEMBERSHIP
} from '../../actions/server_membership_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';
import merge from 'lodash/merge';

const serverMembershipsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MEMBERSHIP:
      return merge({}, state, { [action.membership.id]: action.membership });
    case REMOVE_MEMBERSHIP:
      let newState = merge({}, state);
      delete newState[action.membershipId];
      return newState;
    case RECEIVE_SERVERS:
      if (action.payload.serverMemberships) {
        return action.payload.serverMemberships;
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default serverMembershipsReducer;
