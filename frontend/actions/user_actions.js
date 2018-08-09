import * as UserApiUtil from '../util/user_api_util';

export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";

export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";

const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user
});

const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

const clearUserErrors = () => ({
  type: CLEAR_USER_ERRORS
});

export const updateUser = formData => dispatch => (
  UserApiUtil.updateUser(formData)
    .then(
      user => dispatch({ type: "RECEIVE_CURRENT_USER", user }),
      err => dispatch(receiveUserErrors(err.responseJSON))
  )
);

export const removeUserErrors = () => dispatch => (
  dispatch(clearUserErrors())
)
;
