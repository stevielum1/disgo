import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const removeErrors = () => ({
  type: CLEAR_ERRORS
});

export const signup = user => dispatch => (
  SessionApiUtil.signup(user)
    .then(
      newUser => dispatch(receiveCurrentUser(newUser)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    )
);

export const login = user => dispatch => (
  SessionApiUtil.login(user)
    .then(
      newUser => dispatch(receiveCurrentUser(newUser)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    )
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(
      () => dispatch(logoutCurrentUser()),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    )
);

export const clearErrors = () => dispatch => (
  dispatch(removeErrors())
);
