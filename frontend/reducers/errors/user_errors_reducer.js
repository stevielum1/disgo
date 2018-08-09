import {
  RECEIVE_USER_ERRORS,
  CLEAR_USER_ERRORS
} from '../../actions/user_actions';

const userErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case CLEAR_USER_ERRORS:
      return [];
    default:
      return state;
  }
};

export default userErrorsReducer;
