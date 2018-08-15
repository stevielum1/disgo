import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const CLEAR_MESSAGE_ERRORS = "CLEAR_MESSAGE_ERRORS";

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const removeMessage = id => ({
  type: REMOVE_MESSAGE,
  messageId: id
});

const receiveMessageErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors
});

const clearMessageErrors = () => ({
  type: CLEAR_MESSAGE_ERRORS
});

export const createMessage = message => dispatch => (
  MessageApiUtil.createMessage(message)
    .then(
      newMessage => dispatch(receiveMessage(newMessage)),
      err => dispatch(receiveMessageErrors(err.responseJSON))
    )
);

export const updateMessage = message => dispatch => (
  MessageApiUtil.updateMessage(message)
    .then(
      newMessage => dispatch(receiveMessage(newMessage)),
      err => dispatch(receiveMessageErrors(err.responseJSON))
    )
);

export const deleteMessage = id => dispatch => (
  MessageApiUtil.deleteMessage(id)
    .then(
      () => dispatch(removeMessage(id)),
      err => dispatch(receiveMessageErrors(err.responseJSON))
    )
);

export const removeMessageErrors = () => dispatch => (
  dispatch(clearMessageErrors())
);
