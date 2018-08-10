import {
  RECEIVE_MEMBERSHIP,
  REMOVE_MEMBERSHIP
} from '../../actions/server_membership_actions';
import merge from 'lodash/merge';

const serverMembershipsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MEMBERSHIP:
      return merge({}, state, { [action.membership.id]: action.membership });
    case REMOVE_MEMBERSHIP:
      let newState = merge({}, state);
      const membershipId = Object.values(state).filter(membership => {
        return membership.serverId === action.serverId;
      })[0];
      delete newState[membershipId];
      return newState;
    default:
      return state;
  }
};

export default serverMembershipsReducer;
