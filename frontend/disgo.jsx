import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

//TEST
import { logout } from './actions/session_actions';
//END TEST

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');

  let store;
    if (window.currentUser) {
      const preloadedState = {
        session: { id: window.currentUser.id },
        entities: {
          users: { [window.currentUser.id]: window.currentUser }
        }
      };
      store = configureStore(preloadedState);
      delete window.currentUser;
    } else {
      store = configureStore();
    }

  //TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.logout = logout;
  //END TEST

  ReactDOM.render(<Root store={store} />, root);
})
