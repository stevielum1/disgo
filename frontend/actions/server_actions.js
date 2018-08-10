import * as ServerApiUtil from '../util/server_api_util';

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const CLEAR_SERVER_ERRORS = "CLEAR_SERVER_ERRORS";

const receiveServers = payload => ({
  type: RECEIVE_SERVERS,
  payload
});

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

const removeServer = id => ({
  type: REMOVE_SERVER,
  serverId: id
});

const receiveServerErrors = errors => ({
  type: RECEIVE_SERVER_ERRORS,
  errors
});

const clearServerErrors = () => ({
  type: CLEAR_SERVER_ERRORS
});

export const fetchServers = () => dispatch => (
  ServerApiUtil.fetchServers()
    .then(
      payload => dispatch(receiveServers(payload)),
      err => dispatch(receiveServerErrors(err.responseJSON))
    )
);

export const createServer = server => dispatch => (
  ServerApiUtil.createServer(server)
    .then(
      newServer => dispatch(receiveServer(newServer)),
      err => dispatch(receiveServerErrors(err.responseJSON))
  )
);

export const updateServer = server => dispatch => (
  ServerApiUtil.updateServer(server)
    .then(
      newServer => dispatch(receiveServer(newServer)),
      err => dispatch(receiveServerErrors(err.responseJSON))
    )
);

export const deleteServer = id => dispatch => (
  ServerApiUtil.deleteServer(id)
    .then(
      () => dispatch(removeServer(id)),
      err => dispatch(receiveServerErrors(err.responseJSON))
    )
);

export const removeServerErrors = () => dispatch => (
  dispatch(clearServerErrors())
);
