import * as ServerApiUtil from '../util/server_api_util';

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

const removeServer = id => ({
  type: REMOVE_SERVER,
  serverId: id
});

export const fetchServers = () => dispatch => (
  ServerApiUtil.fetchServers()
    .then(servers => dispatch(receiveServers(servers)))
);

export const createServer = server => dispatch => (
  ServerApiUtil.createServer(server)
    .then(newServer => dispatch(receiveServer(newServer)))
);

export const updateServer = server => dispatch => (
  ServerApiUtil.updateServer(server)
    .then(newServer => dispatch(receiveServer(newServer)))
);

export const deleteServer = id => dispatch => (
  ServerApiUtil.deleteServer(id)
    .then(() => dispatch(removeServer(id)))
);
