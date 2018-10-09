export const USER_JOINED = "USER_JOINED";
export const USER_LEFT = "USER_LEFT";

export const userJoined = payload => ({
  type: USER_JOINED,
  userId: payload.userId,
  channelId: payload.channelId
});

export const userLeft = id => ({
  type: USER_LEFT,
  id
});