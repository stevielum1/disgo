export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const userLoggedIn = id => ({
  type: USER_LOGGED_IN,
  userId: id
});

export const userLoggedOut = id => ({
  type: USER_LOGGED_OUT,
  userId: id
});
