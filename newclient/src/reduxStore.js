import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import {connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './Reducers/rootReducer.js';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    connectRouter(history)(persistedReducer), 
    {}, 
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      )
    )
  );

export default () => {
  let persistor = persistStore(store);
  return { store, persistor, history };
};

