import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import loadingReducer from './loading_reducer';
import onlineReducer from './online_reducer';

const uiReducer = combineReducers({
  modal: modalReducer,
  loading: loadingReducer,
  online: onlineReducer
});

export default uiReducer;
