import {
  RECEIVE_MEMBERSHIP_ERRORS,
  CLEAR_MEMBERSHIP_ERRORS
} from '../../actions/server_membership_actions';

const serverMembershipErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MEMBERSHIP_ERRORS:
      return action.errors;
    case CLEAR_MEMBERSHIP_ERRORS:
      return [];
    default:
      return state;
  }
};

export default serverMembershipErrorsReducer;
