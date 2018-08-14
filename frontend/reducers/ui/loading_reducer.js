import { RECEIVE_LOADING } from '../../actions/loading_actions';

const loadingReducer = (state = true, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loadingReducer;
