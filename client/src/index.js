import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './reduxStore';
let { store, persistor } = configureStore();


injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
