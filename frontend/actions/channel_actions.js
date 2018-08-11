import * as ChannelApiUtil from '../util/channel_api_util';

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
export const CLEAR_CHANNEL_ERRORS = "CLEAR_CHANNEL_ERRORS";

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

const removeChannel = id => ({
  type: REMOVE_CHANNEL,
  channelId: id
});

const receiveChannelErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

const clearChannelErrors = () => ({
  type: CLEAR_CHANNEL_ERRORS
});

export const createChannel = channel => dispatch => (
  ChannelApiUtil.createChannel(channel)
    .then(
      newChannel => dispatch(receiveChannel(newChannel)),
      err => dispatch(receiveChannelErrors(err.responseJSON))
    )
);

export const updateChannel = channel => dispatch => (
  ChannelApiUtil.updateChannel(channel)
    .then(
      newChannel => dispatch(receiveChannel(newChannel)),
      err => dispatch(receiveChannelErrors(err.responseJSON))
    )
);

export const deleteChannel = id => dispatch => (
  ChannelApiUtil.deleteChannel(id)
    .then(
      () => dispatch(removeChannel(id)),
      err => dispatch(receiveChannelErrors(err.responseJSON))
    )
);
