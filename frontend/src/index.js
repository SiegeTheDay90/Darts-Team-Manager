import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {Wrapper} from '@googlemaps/react-wrapper';
import csrfFetch, { restoreCSRF } from './store/csrf';
import sessionActions from './store/session';
import * as teamActions from './store/teams';
import configureStore from './store';
import App from './App.js';
import './index.css';

const root = createRoot(document.getElementById('root'));
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.teamActions = teamActions;
}


function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
          <App />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );

}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  restoreCSRF().then(renderApp);
} else {
  renderApp();
}
