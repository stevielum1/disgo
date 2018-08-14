export const RECEIVE_LOADING = "RECEIVE_LOADING";

const receiveLoading = loading => ({
  type: RECEIVE_LOADING,
  loading
});

export const updateLoading = loading => dispatch => (
  dispatch(receiveLoading(loading))
);
