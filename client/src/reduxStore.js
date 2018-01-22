import {
  createStore,
  applyMiddleware
} from 'redux'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';

const persistConfig = {
  key: 'root',
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default () => {
  let store = createStore(persistedReducer, undefined, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

